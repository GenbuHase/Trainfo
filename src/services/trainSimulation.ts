// リアルタイム列車位置計算シミュレーションエンジン
import type { ActiveTrain, TimetableTrip, LineId } from '../types';
import { STATION_MAP } from '../data/stations';
import {
  interpolateTrackPosition,
  calculateHeading,
  calculateDistanceKm,
  getTrackDistanceKm,
} from '../data/trackGeometry';
import {
  timeStringToSeconds,
  formatTrainNumber,
  getGlobalTripMap,
} from '../data/timetableData';
import { getCombinedGlobalTimetable } from '../data/linesRegistry';


export interface SimulationState {
  currentSec: number;        // シミュレーション時刻（秒）0〜86399
  isPlaying: boolean;        // 再生中フラグ
  speedMultiplier: number;   // 再生倍速 (1, 2, 5, 10, 30, 60, 120, 300, 600, 1200, 1800, 3600)
  isHoliday: boolean;        // 平日/土休日
  globalDelayMinutes: number;// 全体遅延シミュレーション(分)
  randomDelays: Record<string, number>; // 個別列車の遅延
  incidentMessage?: string;  // 運行情報メッセージ
  selectedLineIds?: LineId[];// 表示・シミュレーション対象の路線IDリスト
}

/**
 * 現在走行中の駅位置に応じた列車番号および種別・両数を動的に解決
 * - 区間別列車番号（trainNumberSections）が存在する場合、現在の駅位置に応じた番号を返却
 * - 併結運転（coupling）の場合、併結区間内であれば相手編成の番号を "+" で結合
 */
export function resolveActiveTrainInfo(
  trip: TimetableTrip,
  currentStationId?: string,
  nextStationId?: string
): {
  trainId: string;
  trainNumber?: string;
  trainType: TimetableTrip['trainType'];
  cars: number;
  isCoupledActive: boolean;
  totalCars?: number;
  customDestination?: string;
} {
  const trainId = trip.trainId || trip.trainNumber || (trip.tripId ? trip.tripId.split('_').pop() || '' : '');
  let resolvedNumber = trip.trainNumber;
  let resolvedType = trip.trainType;
  let isCoupledActive = false;
  let totalCars = trip.cars;
  let resolvedCustomDest = trip.customDestination;

  // 1. 区間別列車番号（trainNumberSections）の解決
  if (trip.trainNumberSections && trip.trainNumberSections.length > 0 && currentStationId) {
    const stopIndex = trip.stops.findIndex((s) => s.stationId === currentStationId);
    if (stopIndex !== -1) {
      for (const sec of trip.trainNumberSections) {
        const secStartIndex = trip.stops.findIndex((s) => s.stationId === sec.fromStationId);
        if (secStartIndex !== -1 && stopIndex >= secStartIndex) {
          resolvedNumber = sec.trainNumber;
          if (sec.trainType) {
            resolvedType = sec.trainType;
          }
        }
      }
    }
  }

  // 2. 併結運転（coupling）の解決
  if (trip.coupling && currentStationId) {
    const fromIdx = trip.stops.findIndex((s) => s.stationId === trip.coupling!.fromStationId);
    const toIdx = trip.stops.findIndex((s) => s.stationId === trip.coupling!.toStationId);
    const curIdx = trip.stops.findIndex((s) => s.stationId === currentStationId);

    if (fromIdx !== -1 && toIdx !== -1 && curIdx !== -1) {
      const minIdx = Math.min(fromIdx, toIdx);
      const maxIdx = Math.max(fromIdx, toIdx);

      // 併結有効区間の判定:
      // minIdx <= curIdx < maxIdx の場合、走行中（解結駅 maxIdx へ向かう区間を含む）および途中停車中は併結走行中
      // 解結駅（maxIdx）に到着・停車した時点、または解結駅より先へ走行している場合は原則として解結済み
      // ただし直通先（throughTripId）へ併結が継続している場合（直通先トリップも coupling を持つ場合）のみ、解結駅停車中も併結状態を維持
      let inCoupledRange = false;
      if (curIdx < minIdx) {
        inCoupledRange = false;
      } else if (curIdx < maxIdx) {
        // 併結開始駅から解結駅の手前まで（新花巻〜盛岡間など、次の駅が解結駅 maxIdx であっても走行中は併結中）
        inCoupledRange = true;
      } else if (curIdx === maxIdx) {
        // 解結駅に到着・停車中、または解結駅を出発後
        const isRunningBeyond = nextStationId
          ? trip.stops.findIndex((s) => s.stationId === nextStationId) > maxIdx
          : false;

        if (isRunningBeyond) {
          inCoupledRange = false;
        } else {
          // 解結駅停車中: 直通先でも併結が継続しているか判定
          let nextHasCoupling = false;
          if (trip.throughTripId) {
            const tripMap = getGlobalTripMap();
            const nextTrip = tripMap.get(trip.throughTripId);
            nextHasCoupling = Boolean(nextTrip?.coupling);
          }
          inCoupledRange = nextHasCoupling;
        }
      } else {
        inCoupledRange = false;
      }

      if (inCoupledRange) {
        isCoupledActive = true;
        totalCars = trip.cars + (trip.coupling.coupledCars || 0);
        if (resolvedNumber && trip.coupling.coupledTrainNumber) {
          if (!resolvedNumber.includes(trip.coupling.coupledTrainNumber)) {
            resolvedNumber = `${resolvedNumber} + ${trip.coupling.coupledTrainNumber}`;
          }
        }
        if (trip.coupling.coupledDestination && resolvedCustomDest) {
          if (!resolvedCustomDest.includes(trip.coupling.coupledDestination)) {
            resolvedCustomDest =
              trip.coupling.role === 'SECONDARY'
                ? `${trip.coupling.coupledDestination}・${resolvedCustomDest}`
                : `${resolvedCustomDest}・${trip.coupling.coupledDestination}`;
          }
        }
      } else {
        // 単独運行時（解結後または併結前）: 相手列車の行先や列車番号が混入していれば除去して自列車本来の単独行先に戻す
        if (trip.coupling!.coupledDestination && resolvedCustomDest) {
          const parts = resolvedCustomDest.split(/[・/]/).map((p) => p.trim());
          if (parts.length > 1 && parts.includes(trip.coupling!.coupledDestination)) {
            const filtered = parts.filter((p) => p !== trip.coupling!.coupledDestination);
            if (filtered.length > 0) {
              resolvedCustomDest = filtered.join('・');
            }
          }
        }
        if (trip.coupling!.coupledTrainNumber && resolvedNumber) {
          const parts = resolvedNumber.split('+').map((p) => p.trim());
          if (parts.length > 1 && parts.includes(trip.coupling!.coupledTrainNumber)) {
            const filtered = parts.filter((p) => p !== trip.coupling!.coupledTrainNumber);
            if (filtered.length > 0) {
              resolvedNumber = filtered.join(' + ');
            }
          }
        }
      }
    }
  }

  return {
    trainId,
    trainNumber: resolvedNumber,
    trainType: resolvedType,
    cars: isCoupledActive ? totalCars : trip.cars,
    isCoupledActive,
    totalCars: isCoupledActive ? totalCars : undefined,
    customDestination: resolvedCustomDest,
  };
}

/**
 * 2つの駅IDが同一の物理駅（または境界接続駅）かどうかを判定
 */
export function isSamePhysicalStation(idA?: string, idB?: string): boolean {
  if (!idA || !idB) return false;
  if (idA === idB) return true;
  const stA = STATION_MAP.get(idA);
  const stB = STATION_MAP.get(idB);
  if (!stA || !stB) return false;
  if (stA.name === stB.name) return true;
  return calculateDistanceKm(stA.lat, stA.lng, stB.lat, stB.lng) <= 0.5;
}

/**
 * スムーズステップ関数 (Hermite interpolation)
 * 入力 x: 0.0〜1.0 -> 出力 0.0〜1.0 (端点での微分係数 0)
 */
function smoothstep(x: number): number {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}

/**
 * 駅間走行中の進行割合（progress）に応じた動的瞬時速度 (km/h) を計算
 * - 発車時の滑らかな加速（0 -> 巡航速度）
 * - 巡航区間
 * - 停車前の滑らかな減速（巡航速度 -> 0）
 * - 通過駅（isPassing: true）では減速せず巡航速度を維持
 * - 所要時間 0 秒や負の値・NaN・Infinity を防護
 */
export function calculateDynamicSpeed({
  progress,
  avgSpeedKmh,
  isDepPassing = false,
  isArrPassing = false,
}: {
  progress: number;
  avgSpeedKmh: number;
  isDepPassing?: boolean;
  isArrPassing?: boolean;
}): number {
  // ゼロ除算・非有限数（Infinity / NaN）・負値の防止ガード
  if (!Number.isFinite(avgSpeedKmh) || avgSpeedKmh <= 0) {
    return 0;
  }

  // 加速・減速区間の進捗割合（駅間の25%を使用）
  const pAccel = isDepPassing ? 0 : 0.25;
  const pDecel = isArrPassing ? 0 : 0.25;

  // 平均速度係数: 加減速中の平均係数は 0.5（smoothstepの積分特性）
  const avgFactor = 1 - 0.5 * pAccel - 0.5 * pDecel;
  const cruiseSpeed = avgFactor > 0 ? avgSpeedKmh / avgFactor : avgSpeedKmh;

  if (!Number.isFinite(cruiseSpeed) || cruiseSpeed <= 0) {
    return 0;
  }

  let factor = 1.0;
  if (pAccel > 0 && progress < pAccel) {
    factor = smoothstep(progress / pAccel);
  } else if (pDecel > 0 && progress > 1 - pDecel) {
    factor = smoothstep((1 - progress) / pDecel);
  }

  // 走行中（RUNNING）の瞬間速度
  let speed = cruiseSpeed * factor;

  // 走行中は最低でも 5 km/h を下限とし、発車直後や停止直前にも「走行中」の動きを表現
  speed = Math.max(5, speed);

  return Math.round(speed * 10) / 10;
}



// 指定時刻における走行中の全列車を算出
export function calculateActiveTrains(
  simState: SimulationState,
  customTimetable?: TimetableTrip[]
): ActiveTrain[] {
  const timetable = customTimetable || getCombinedGlobalTimetable(simState.selectedLineIds);
  const currentSec = simState.currentSec;
  const isHoliday = simState.isHoliday;
  const activeTrains: ActiveTrain[] = [];

  for (const trip of timetable) {
    if (trip.isHoliday !== isHoliday) continue;
    if (trip.stops.length < 2) continue;

    const lineId: LineId = trip.lineId || 'tojo';
    if (simState.selectedLineIds && simState.selectedLineIds.length > 0 && !simState.selectedLineIds.includes(lineId)) {
      continue;
    }

    const trainDelay =
      (simState.randomDelays[trip.tripId] || 0) + simState.globalDelayMinutes;
    const adjustedCurrentSec = currentSec - trainDelay * 60;

    // トリップ内の各駅の時刻（秒数）を計算し、日跨ぎ（深夜〜早朝4時跨ぎ等）で減少した場合は +86400 して単調増加を保証
    let prevStopSec = -1;
    let dayOffset = 0;
    const stopTimes: { arrSec: number; depSec: number }[] = [];
    for (let i = 0; i < trip.stops.length; i++) {
      const s = trip.stops[i];
      let arrSec = timeStringToSeconds(s.arrivalTime) + dayOffset;
      let depSec = timeStringToSeconds(s.departureTime) + dayOffset;

      // 正当な日跨ぎ（深夜24〜27時台から早朝4時台以降への跨ぎ等）の場合のみ +86400
      // （timeStringToSeconds は 0〜3時を 24〜27時に正規化するため、減少するのは4時跨ぎの約24時間巻き戻りのみ）
      if (prevStopSec >= 0 && (prevStopSec - arrSec) > 12 * 3600) {
        dayOffset += 86400;
        arrSec += 86400;
        depSec += 86400;
      } else if (prevStopSec >= 0 && arrSec < prevStopSec) {
        // 微小な時刻逆転（データ誤差・直通接続ズレ等）の場合は日跨ぎ（+24時間）と誤認させず前駅時刻でクランプ
        arrSec = prevStopSec;
        if (depSec < arrSec) {
          depSec = arrSec;
        }
      }

      if (depSec < arrSec) {
        depSec = arrSec;
      }

      prevStopSec = depSec;
      stopTimes.push({ arrSec, depSec });
    }

    // 始発駅に入線・停車時刻（arrivalTime）がある場合はその時刻から運行開始（直通列車の境界駅停車中も有効化）
    const tripStartSec = stopTimes[0].arrSec !== undefined ? Math.min(stopTimes[0].arrSec, stopTimes[0].depSec) : stopTimes[0].depSec;
    const tripEndSec = stopTimes[stopTimes.length - 1].depSec || stopTimes[stopTimes.length - 1].arrSec;

    // 現在時刻 adjustedCurrentSec をトリップの時間軸に合わせる
    // トリップが深夜〜翌朝に跨がる場合（tripEndSec >= 86400）、adjustedCurrentSec が朝方（< 12:00）なら +86400 して比較
    let checkSec = adjustedCurrentSec;
    if (tripStartSec >= 20 * 3600 || tripEndSec >= 86400) {
      if (checkSec < 12 * 3600 && checkSec + 86400 <= tripEndSec + 3600) {
        checkSec += 86400;
      }
    }

    // 運行時間帯外ならスキップ
    if (checkSec < tripStartSec || checkSec > tripEndSec) {
      continue;
    }

    // 各ストップ間を精査
    for (let i = 0; i < trip.stops.length; i++) {
      const curStop = trip.stops[i];
      const curStopTimes = stopTimes[i];
      const curArrSec = curStopTimes.arrSec;
      const curDepSec = curStopTimes.depSec;

      const stObj = STATION_MAP.get(curStop.stationId);
      if (!stObj) continue;

      // 1. 駅停車中（または通過駅での通過中）の判定
      if (checkSec >= curArrSec && checkSec <= curDepSec) {
        let heading = 0;
        const nextStop = trip.stops[i + 1];
        if (nextStop) {
          // これから進む実線路の向き（発車時の進行方向）に同期させることで発車時の角度跳ねを防止
          const trackPos = interpolateTrackPosition(curStop.stationId, nextStop.stationId, 0);
          heading = trackPos.heading;
          if (heading === 0) {
            const nextSt = STATION_MAP.get(nextStop.stationId);
            if (nextSt) {
              heading = calculateHeading(stObj.lat, stObj.lng, nextSt.lat, nextSt.lng);
            }
          }
        } else {
          // 終着駅では入線時の線路進入角度を維持
          const prevStop = trip.stops[i - 1];
          if (prevStop) {
            const trackPos = interpolateTrackPosition(prevStop.stationId, curStop.stationId, 1);
            heading = trackPos.heading;
            if (heading === 0) {
              const prevSt = STATION_MAP.get(prevStop.stationId);
              if (prevSt) {
                heading = calculateHeading(prevSt.lat, prevSt.lng, stObj.lat, stObj.lng);
              }
            }
          }
        }

        const nextStopStation = trip.stops.slice(i + 1).find((s) => !s.isPassing);
        const trainInfo = resolveActiveTrainInfo(trip, curStop.stationId);

        activeTrains.push({
          tripId: trip.tripId,
          lineId,
          trainId: trainInfo.trainId,
          trainNumber: trainInfo.trainNumber,
          trainNumberSections: trip.trainNumberSections,
          coupling: trip.coupling,
          isCoupledActive: trainInfo.isCoupledActive,
          totalCars: trainInfo.totalCars,
          trainType: trainInfo.trainType,
          direction: trip.direction,
          originStationId: trip.originStationId,
          destinationStationId: trip.destinationStationId,
          customOrigin: trip.customOrigin,
          customDestination: trainInfo.customDestination,
          throughTripId: trip.throughTripId,
          throughLineId: trip.throughLineId,
          prevTripId: trip.prevTripId,
          prevLineId: trip.prevLineId,
          cars: trainInfo.cars,
          status: 'STOPPING',
          currentLat: stObj.lat,
          currentLng: stObj.lng,
          heading,
          currentStationId: curStop.stationId,
          nextStationId: nextStop ? nextStop.stationId : curStop.stationId,
          nextStopStationId: nextStopStation ? nextStopStation.stationId : curStop.stationId,
          progressPercent: 0,
          speedKmh: 0,
          delayMinutes: trainDelay,
          departureTime: curStop.departureTime,
          arrivalTimeNext: nextStop ? nextStop.arrivalTime : curStop.arrivalTime,
          stops: trip.stops,
        });
        break;
      }

      // 2. 駅間走行中の判定
      if (i < trip.stops.length - 1) {
        const nextStop = trip.stops[i + 1];
        const nextStopTimes = stopTimes[i + 1];
        const nextArrSec = nextStopTimes.arrSec;

        if (checkSec > curDepSec && checkSec < nextArrSec) {
          const totalDuration = nextArrSec - curDepSec;
          const elapsed = checkSec - curDepSec;
          const progress = totalDuration > 0 ? elapsed / totalDuration : 0;

          // 線路ポリラインに沿った座標・方位角の精密補間
          const interpolated = interpolateTrackPosition(
            curStop.stationId,
            nextStop.stationId,
            progress
          );

          // 速度計算 (km/h)
          const stNextObj = STATION_MAP.get(nextStop.stationId);
          let avgSpeedKmh = 70;
          if (stObj && stNextObj && totalDuration > 0) {
            const trackDistKm = getTrackDistanceKm(curStop.stationId, nextStop.stationId);
            const dist = trackDistKm !== null
              ? trackDistKm
              : calculateDistanceKm(stObj.lat, stObj.lng, stNextObj.lat, stNextObj.lng);
            const calculated = dist / (totalDuration / 3600);
            if (Number.isFinite(calculated) && calculated > 0) {
              avgSpeedKmh = calculated;
            }
          }

          const nextStopStation = trip.stops.slice(i + 1).find((s) => !s.isPassing);
          const trainInfo = resolveActiveTrainInfo(trip, curStop.stationId, nextStop.stationId);

          const dynamicSpeedKmh = calculateDynamicSpeed({
            progress,
            avgSpeedKmh,
            isDepPassing: Boolean(curStop.isPassing),
            isArrPassing: Boolean(nextStop.isPassing),
          });


          activeTrains.push({
            tripId: trip.tripId,
            lineId,
            trainId: trainInfo.trainId,
            trainNumber: trainInfo.trainNumber,
            trainNumberSections: trip.trainNumberSections,
            coupling: trip.coupling,
            isCoupledActive: trainInfo.isCoupledActive,
            totalCars: trainInfo.totalCars,
            trainType: trainInfo.trainType,
            direction: trip.direction,
            originStationId: trip.originStationId,
            destinationStationId: trip.destinationStationId,
            customOrigin: trip.customOrigin,
            customDestination: trainInfo.customDestination,
            throughTripId: trip.throughTripId,
            throughLineId: trip.throughLineId,
            prevTripId: trip.prevTripId,
            prevLineId: trip.prevLineId,
            cars: trainInfo.cars,
            status: 'RUNNING',
            currentLat: interpolated.lat,
            currentLng: interpolated.lng,
            heading: interpolated.heading,
            currentStationId: curStop.stationId,
            nextStationId: nextStop.stationId,
            nextStopStationId: nextStopStation ? nextStopStation.stationId : nextStop.stationId,
            progressPercent: progress,
            speedKmh: dynamicSpeedKmh,
            delayMinutes: trainDelay,
            departureTime: curStop.departureTime,
            arrivalTimeNext: nextStop.arrivalTime,
            stops: trip.stops,
          });
          break;
        }
      }
    }
  }

  // 1. 併結運転中の従属編成（SECONDARY）のマップピン重複描画を排除
  const coupledFilteredTrains = activeTrains.filter((train) => {
    if (train.isCoupledActive && train.coupling?.role === 'SECONDARY') {
      return false;
    }
    return true;
  });


  // 2. 複数路線選択時の直通列車（むさしの号等）の重複排除
  // 同一列車番号（またはtrainId）かつ共通駅を持つ列車が存在する場合、より停車駅数の多い（全区間通しの）列車を優先
  const candidateTrains: ActiveTrain[] = [];
  for (const train of coupledFilteredTrains) {
    const formattedNo = formatTrainNumber(train.trainNumber, train.trainId, train.tripId);
    if (!formattedNo) {
      candidateTrains.push(train);
      continue;
    }

    const stationIds = new Set(train.stops.map((s) => s.stationId));
    const hasBetterThroughTrain = coupledFilteredTrains.some((other) => {
      if (other === train) return false;

      // 境界駅において直通ペア（throughTripId / prevTripId 照合）が同一駅に停車中の場合、
      // 終着駅に到着した先行トリップよりも、これから出発する後続トリップを優先して描画する
      const isDirectThroughPair =
        (train.throughTripId && train.throughTripId === other.tripId) ||
        (other.throughTripId && other.throughTripId === train.tripId) ||
        (train.prevTripId && train.prevTripId === other.tripId) ||
        (other.prevTripId && other.prevTripId === train.tripId);

      if (isDirectThroughPair) {
        if (isSamePhysicalStation(train.currentStationId, other.currentStationId)) {
          const isTrainEnding = train.stops[train.stops.length - 1].stationId === train.currentStationId;
          const isOtherStarting = other.stops[0].stationId === other.currentStationId;
          if (isTrainEnding && isOtherStarting) {
            return true;
          }
        }
        // 【最重要】直通ペア同士は異なる路線区間を担当する別トリップであるため、
        // 停車駅数比較等で互いを除外しては絶対にならない
        return false;
      }

      const otherFormattedNo = formatTrainNumber(other.trainNumber, other.trainId, other.tripId);
      if (otherFormattedNo !== formattedNo) return false;

      // 行先が異なる場合（分割併結列車等）や、内部列車IDが異なる独立編成の場合は重複とみなさない
      const destA = train.customDestination || train.destinationStationId;
      const destB = other.customDestination || other.destinationStationId;
      if (destA !== destB) return false;
      if (train.trainId && other.trainId && train.trainId !== other.trainId) return false;

      // 異なる路線間で、共有駅が境界駅1駅のみの場合は直通接続であり同一区間重複ではない
      const sharedStationCount = other.stops.filter((s) => stationIds.has(s.stationId)).length;
      if (train.lineId !== other.lineId && sharedStationCount <= 1) {
        return false;
      }

      const hasSharedStation = sharedStationCount > 0;
      if (!hasSharedStation) return false;

      if (other.stops.length > train.stops.length) return true;
      if (other.stops.length === train.stops.length && other.tripId < train.tripId) return true;
      return false;
    });

    if (!hasBetterThroughTrain) {
      candidateTrains.push(train);
    }
  }

  // 3. 同一運行（路線・進行方向・同一列車ID・行先）の重複表示を安全に排除
  const uniqueTrains: ActiveTrain[] = [];
  const seenTrainKeys = new Set<string>();

  for (const train of candidateTrains) {
    const primaryId = train.trainId || train.trainNumber || formatTrainNumber(train.trainNumber, train.trainId, train.tripId);
    const dest = train.customDestination || train.destinationStationId;
    const key = `${train.lineId}_${train.direction}_${primaryId}_${dest}`;

    if (seenTrainKeys.has(key)) {
      continue;
    }
    seenTrainKeys.add(key);
    uniqueTrains.push(train);
  }

  return uniqueTrains;
}

// 現在のリアルタイム時刻（秒）を取得（深夜0〜3時は翌日24〜27時として計算）
export function getRealCurrentSeconds(): number {
  const now = new Date();
  const h = now.getHours();
  const normalizedHour = h < 4 ? h + 24 : h;
  return normalizedHour * 3600 + now.getMinutes() * 60 + now.getSeconds();
}

// 指定駅を通過中または直近に停車する列車を検索
export function getTrainsNearStation(activeTrains: ActiveTrain[], stationId: string): ActiveTrain[] {
  return activeTrains.filter(
    (t) => t.currentStationId === stationId || t.nextStationId === stationId
  );
}
