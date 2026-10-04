// リアルタイム列車位置計算シミュレーションエンジン
import type { ActiveTrain, TimetableTrip, LineId } from '../types';
import { STATION_MAP } from '../data/stations';
import {
  interpolateTrackPosition,
  calculateHeading,
  calculateDistanceKm,
} from '../data/trackGeometry';
import {
  timeStringToSeconds,
  formatTrainNumber,
} from '../data/timetableData';
import { getCombinedGlobalTimetable } from '../data/linesRegistry';

export interface SimulationState {
  currentSec: number;        // シミュレーション時刻（秒）0〜86399
  isPlaying: boolean;        // 再生中フラグ
  speedMultiplier: number;   // 再生倍速 (1, 2, 5, 10, 30)
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
  currentStationId?: string
): {
  trainId: string;
  trainNumber?: string;
  trainType: TimetableTrip['trainType'];
  cars: number;
  isCoupledActive: boolean;
  totalCars?: number;
} {
  const trainId = trip.trainId || trip.trainNumber || (trip.tripId ? trip.tripId.split('_').pop() || '' : '');
  let resolvedNumber = trip.trainNumber;
  let resolvedType = trip.trainType;
  let isCoupledActive = false;
  let totalCars = trip.cars;

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
      if (curIdx >= minIdx && curIdx <= maxIdx) {
        isCoupledActive = true;
        totalCars = trip.cars + (trip.coupling.coupledCars || 0);
        if (resolvedNumber && trip.coupling.coupledTrainNumber) {
          if (!resolvedNumber.includes(trip.coupling.coupledTrainNumber)) {
            resolvedNumber = `${resolvedNumber} + ${trip.coupling.coupledTrainNumber}`;
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
  };
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
      if (prevStopSec >= 0 && arrSec < prevStopSec) {
        dayOffset += 86400;
        arrSec += 86400;
        depSec += 86400;
      } else if (prevStopSec >= 0 && depSec < arrSec) {
        dayOffset += 86400;
        depSec += 86400;
      }
      prevStopSec = depSec;
      stopTimes.push({ arrSec, depSec });
    }

    const tripStartSec = stopTimes[0].depSec;
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
          customDestination: trip.customDestination,
          throughTripId: trip.throughTripId,
          throughLineId: trip.throughLineId,
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
          let speedKmh = 70;
          if (stObj && stNextObj) {
            const dist = calculateDistanceKm(stObj.lat, stObj.lng, stNextObj.lat, stNextObj.lng);
            if (totalDuration > 0) {
              speedKmh = Math.round((dist / (totalDuration / 3600)) * 10) / 10;
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
            customDestination: trip.customDestination,
            throughTripId: trip.throughTripId,
            throughLineId: trip.throughLineId,
            cars: trainInfo.cars,
            status: 'RUNNING',
            currentLat: interpolated.lat,
            currentLng: interpolated.lng,
            heading: interpolated.heading,
            currentStationId: curStop.stationId,
            nextStationId: nextStop.stationId,
            nextStopStationId: nextStopStation ? nextStopStation.stationId : nextStop.stationId,
            progressPercent: progress,
            speedKmh: Math.min(105, Math.max(25, speedKmh)),
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
      const otherFormattedNo = formatTrainNumber(other.trainNumber, other.trainId, other.tripId);
      if (otherFormattedNo !== formattedNo) return false;

      const hasSharedStation = other.stops.some((s) => stationIds.has(s.stationId));
      if (!hasSharedStation) return false;

      if (other.stops.length > train.stops.length) return true;
      if (other.stops.length === train.stops.length && other.tripId < train.tripId) return true;
      return false;
    });

    if (!hasBetterThroughTrain) {
      candidateTrains.push(train);
    }
  }

  // 3. 同一運行（路線・進行方向・同一列車ID）の重複表示を安全に排除
  const uniqueTrains: ActiveTrain[] = [];
  const seenTrainKeys = new Set<string>();

  for (const train of candidateTrains) {
    const primaryId = train.trainId || train.trainNumber || formatTrainNumber(train.trainNumber, train.trainId, train.tripId);
    const key = `${train.lineId}_${train.direction}_${primaryId}`;

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
