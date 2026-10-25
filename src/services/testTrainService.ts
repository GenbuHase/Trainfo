// 試験走行（試運転）・臨時列車クリエイター＆スケジュール生成サービス
import type {
  TimetableTrip,
  LineId,
  Direction,
  StationStopTime,
  TrainTypeKey,
  CustomTrainTypeConfig,
  Station,
  LineDefinition,
} from '../types';
import { getLine, getAllLines } from '../data/linesRegistry';
import { getTrackDistanceKm, calculateDistanceKm } from '../data/trackGeometry';
import { STATION_MAP } from '../data/stations';

export function secondsToTimeString(sec: number): string {
  const normalized = ((Math.floor(sec) % 86400) + 86400) % 86400;
  const h = Math.floor(normalized / 3600);
  const m = Math.floor((normalized % 3600) / 60);
  const s = normalized % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function secondsToHHMM(sec: number): string {
  return secondsToTimeString(sec).slice(0, 5);
}

export function hhmmToSeconds(hhmm: string, referenceSec?: number): number {
  const parts = hhmm.trim().split(':').map(Number);
  if (parts.length < 2 || Number.isNaN(parts[0]) || Number.isNaN(parts[1])) {
    return referenceSec ?? 12 * 3600;
  }
  const h = parts[0];
  const m = parts[1];
  const s = parts[2] || 0;
  const normalizedH = h < 4 ? h + 24 : h;
  let result = normalizedH * 3600 + m * 60 + s;
  if (referenceSec !== undefined && result < referenceSec - 12 * 3600) {
    result += 86400;
  }
  return result;
}

/**
 * 各駅の停車・通過および時刻設定
 */
export interface CustomTrainStopSetting {
  stationId: string;
  isPassing: boolean;
  arrivalSec: number;
  departureSec: number;
  stopDurationSec: number;
  manualArrivalSec?: number;       // ユーザーが到着時刻を手動指定した場合の秒数（4:00起算サイクル）
  manualStopDurationSec?: number;  // ユーザーが停車時間（または発車時刻）を手動指定した場合の秒数
}

/**
 * 路線ごとの運行セグメント設定
 */
export interface CustomTrainSegment {
  id: string;
  lineId: LineId;
  fromStationId: string;
  toStationId: string;
  direction: Direction;
  trainType: TrainTypeKey;
  useCustomType?: boolean;
  customTrainType?: CustomTrainTypeConfig;
  trainNumber?: string;
  speedKmh: number;
  stops: CustomTrainStopSetting[];
}

/**
 * 試運転・臨時列車プラン全体の設定（プリセット保存対応）
 */
export interface CustomTrainPlan {
  id: string;
  presetName?: string;
  trainName: string;                      // 固有列車名称（デフォルト: '' = なし）
  defaultTrainNumber: string;             // 代表列車番号（例: '試9001レ'）
  cars: number;                           // 両数（例: 10）
  useCustomType: boolean;                 // 任意種別名を使用するか（デフォルト: true で '試運転'）
  customTrainType: CustomTrainTypeConfig; // デフォルト: { name: '試運転', shortName: '試', color: '#0284c7' }
  departureMode: 'now' | 'scheduled';     // 現在時刻発車 or 時刻指定発車
  scheduledStartSec: number;              // 時刻指定時の発車秒数
  seekToStartOnLaunch: boolean;           // 時刻指定時に発車時刻へシークするか
  defaultStopSec: number;                 // 標準停車時間（秒）
  speedMultiplier: number;                // 発車時の再生倍速
  segments: CustomTrainSegment[];
}

export interface ConnectingStationPair {
  stationA: Station;
  stationB: Station;
  isExactName: boolean;
  distKm: number;
  score: number;
}

/**
 * 2つの駅が直通・乗換接続可能か判定（同名駅または半径0.45km以内の近接乗換駅）
 */
export function areStationsConnectable(stA: Station, stB: Station): boolean {
  if (stA.id === stB.id) return true;
  if (stA.name === stB.name) return true;
  const dist = calculateDistanceKm(stA.lat, stA.lng, stB.lat, stB.lng);
  return dist <= 0.45;
}

/**
 * 2つの路線間の接続駅ペアを検出し、直通境界駅として最適な順にソートして返す
 */
export function findConnectingStationPairs(
  lineIdA: LineId,
  lineIdB: LineId,
  preferOriginOfA?: string
): ConnectingStationPair[] {
  const lineA = getLine(lineIdA);
  const lineB = getLine(lineIdB);
  if (!lineA || !lineB) return [];

  const pairs: ConnectingStationPair[] = [];

  for (let idxA = 0; idxA < lineA.stations.length; idxA++) {
    const stA = lineA.stations[idxA];
    const isSameAsOriginA = preferOriginOfA ? stA.id === preferOriginOfA : false;

    for (let idxB = 0; idxB < lineB.stations.length; idxB++) {
      const stB = lineB.stations[idxB];
      const isExactName = stA.name === stB.name;
      const distKm = calculateDistanceKm(stA.lat, stA.lng, stB.lat, stB.lng);

      if (!isExactName && distKm > 0.45) continue;

      const isTerminalA = idxA === 0 || idxA === lineA.stations.length - 1;
      const isTerminalB = idxB === 0 || idxB === lineB.stations.length - 1;

      let score = 0;
      if (isExactName) score += 100;
      if (isTerminalB) score += 80;
      if (isTerminalA) score += 50;
      if (stA.isMajor || stB.isMajor) score += 15;
      score -= distKm * 20;
      if (isSameAsOriginA) score -= 500;

      pairs.push({
        stationA: stA,
        stationB: stB,
        isExactName,
        distKm,
        score,
      });
    }
  }

  pairs.sort((a, b) => b.score - a.score);
  return pairs;
}

/**
 * 指定した路線から直通接続可能な他路線の一覧を取得
 */
export function getConnectableLines(
  fromLineId: LineId,
  currentEndStationId?: string,
  currentStartStationId?: string
): {
  line: LineDefinition;
  bestPair: ConnectingStationPair;
  isDirectAtCurrentEnd: boolean;
}[] {
  const allLines = getAllLines();
  const currentEndSt = currentEndStationId ? STATION_MAP.get(currentEndStationId) : undefined;
  const results: {
    line: LineDefinition;
    bestPair: ConnectingStationPair;
    isDirectAtCurrentEnd: boolean;
  }[] = [];

  for (const candidateLine of allLines) {
    if (candidateLine.id === fromLineId) continue;
    const pairs = findConnectingStationPairs(fromLineId, candidateLine.id, currentStartStationId);
    if (pairs.length === 0) continue;

    const directPair = currentEndSt
      ? pairs.find(
          (p) =>
            p.stationA.id === currentEndSt.id ||
            p.stationA.name === currentEndSt.name ||
            areStationsConnectable(p.stationA, currentEndSt)
        )
      : undefined;

    results.push({
      line: candidateLine,
      bestPair: directPair || pairs[0],
      isDirectAtCurrentEnd: Boolean(directPair),
    });
  }

  results.sort((a, b) => {
    if (a.isDirectAtCurrentEnd !== b.isDirectAtCurrentEnd) {
      return a.isDirectAtCurrentEnd ? -1 : 1;
    }
    return b.bestPair.score - a.bestPair.score;
  });

  return results;
}

/**
 * 路線内の開始駅IDと終了駅IDから、順序付きの駅配列と進行方向を算出
 */
export function getOrderedStationsForRange(
  lineId: LineId,
  fromStationId: string,
  toStationId: string
): { stations: Station[]; direction: Direction } {
  const line = getLine(lineId);
  if (!line || line.stations.length === 0) {
    return { stations: [], direction: 'outbound' };
  }

  let fromIdx = line.stations.findIndex((s) => s.id === fromStationId);
  let toIdx = line.stations.findIndex((s) => s.id === toStationId);

  if (fromIdx === -1) fromIdx = 0;
  if (toIdx === -1) toIdx = line.stations.length - 1;

  if (fromIdx === toIdx) {
    if (toIdx < line.stations.length - 1) {
      toIdx = line.stations.length - 1;
    } else if (fromIdx > 0) {
      fromIdx = 0;
    }
  }

  if (fromIdx <= toIdx) {
    return {
      stations: line.stations.slice(fromIdx, toIdx + 1),
      direction: 'outbound',
    };
  } else {
    return {
      stations: line.stations.slice(toIdx, fromIdx + 1).reverse(),
      direction: 'inbound',
    };
  }
}

/**
 * 指定した種別において該当駅が停車駅か通過駅かを判定
 */
export function shouldStationStopByType(
  station: Station,
  trainType: TrainTypeKey,
  isEndpoint: boolean,
  lineStations?: Station[]
): boolean {
  if (isEndpoint) return true;
  if (trainType === 'local' || trainType === 'regular' || trainType === 'test_run') {
    return true;
  }

  if (lineStations && lineStations.length > 0) {
    const hasAnyDefined = lineStations.some((s) => s.stoppingTypes.includes(trainType));
    if (hasAnyDefined) {
      return station.stoppingTypes.includes(trainType);
    }
  }

  if (station.stoppingTypes && station.stoppingTypes.length > 0) {
    if (station.stoppingTypes.includes(trainType)) return true;
    return false;
  }

  return Boolean(station.isMajor);
}

/**
 * 路線セグメントの駅リストを生成（既存のカスタム停車・手動時刻設定があれば可能な限り保持）
 */
export function buildSegmentStops(
  lineId: LineId,
  fromStationId: string,
  toStationId: string,
  trainType: TrainTypeKey,
  defaultStopSec: number = 20,
  existingStops?: CustomTrainStopSetting[],
  preserveStoppingPattern: boolean = false
): { stops: CustomTrainStopSetting[]; direction: Direction } {
  const line = getLine(lineId);
  const { stations, direction } = getOrderedStationsForRange(lineId, fromStationId, toStationId);
  const existingMap = new Map<string, CustomTrainStopSetting>();
  if (existingStops) {
    for (const s of existingStops) {
      existingMap.set(s.stationId, s);
    }
  }

  const stops: CustomTrainStopSetting[] = stations.map((st, idx) => {
    const isEndpoint = idx === 0 || idx === stations.length - 1;
    const prev = existingMap.get(st.id);

    let isPassing: boolean;
    if (isEndpoint) {
      isPassing = false;
    } else if (preserveStoppingPattern && prev !== undefined) {
      isPassing = prev.isPassing;
    } else {
      isPassing = !shouldStationStopByType(st, trainType, isEndpoint, line?.stations);
    }

    const stopDurationSec = isPassing
      ? 0
      : prev?.manualStopDurationSec ?? (prev && !prev.isPassing ? prev.stopDurationSec : defaultStopSec);

    return {
      stationId: st.id,
      isPassing,
      arrivalSec: prev?.arrivalSec ?? 0,
      departureSec: prev?.departureSec ?? 0,
      stopDurationSec,
      manualArrivalSec: prev?.manualArrivalSec,
      manualStopDurationSec: isPassing ? undefined : prev?.manualStopDurationSec,
    };
  });

  return { stops, direction };
}

/**
 * 2駅間の実軌道距離（または直線距離）と巡航速度から標準走行秒数を算出
 */
function calcStationRunSeconds(stationIdA: string, stationIdB: string, speedKmh: number): number {
  const safeSpeed = Math.max(20, speedKmh || 75);
  const trackDist = getTrackDistanceKm(stationIdA, stationIdB);
  const stA = STATION_MAP.get(stationIdA);
  const stB = STATION_MAP.get(stationIdB);

  let distKm = trackDist !== null ? trackDist : 1.5;
  if (trackDist === null && stA && stB) {
    distKm = calculateDistanceKm(stA.lat, stA.lng, stB.lat, stB.lng);
  }

  const runHours = distKm / safeSpeed;
  return Math.max(25, Math.round(runHours * 3600));
}

/**
 * プラン全体の各駅着発時刻を自動計算＋手動オーバーライド連動で再計算するハイブリッドエンジン
 */
export function recalculatePlanSchedule(
  plan: CustomTrainPlan,
  currentSimSec: number
): CustomTrainPlan {
  const startSec =
    plan.departureMode === 'scheduled' ? plan.scheduledStartSec : Math.floor(currentSimSec);
  const defaultStopSec = Math.max(0, plan.defaultStopSec ?? 20);

  let cursorSec = startSec;

  const updatedSegments: CustomTrainSegment[] = plan.segments.map((seg, segIdx) => {
    const speedKmh = seg.speedKmh || (seg.lineId.includes('shinkansen') ? 210 : 75);
    const stops: CustomTrainStopSetting[] = seg.stops.map((s) => ({ ...s }));

    if (stops.length === 0) {
      return { ...seg, stops };
    }

    let lastStopIndex = 0;

    for (let i = 0; i < stops.length; i++) {
      const cur = stops[i];
      const isFirstInSeg = i === 0;
      const isLastInSeg = i === stops.length - 1;
      const isLastInPlan = segIdx === plan.segments.length - 1 && isLastInSeg;

      if (isFirstInSeg) {
        if (segIdx === 0) {
          const arr = cur.manualArrivalSec !== undefined ? cur.manualArrivalSec : cursorSec;
          cur.arrivalSec = arr;
          cur.stopDurationSec = 0;
          cur.departureSec = arr;
          cursorSec = arr;
        } else {
          const prevSeg = plan.segments[segIdx - 1];
          const prevLastStop = prevSeg?.stops[prevSeg.stops.length - 1];
          const prevSt = prevLastStop ? STATION_MAP.get(prevLastStop.stationId) : undefined;
          const curSt = STATION_MAP.get(cur.stationId);
          const isSameBoundary =
            prevSt && curSt && areStationsConnectable(prevSt, curSt);

          if (!isSameBoundary && prevLastStop) {
            cursorSec += calcStationRunSeconds(prevLastStop.stationId, cur.stationId, speedKmh);
          }

          const arr =
            cur.manualArrivalSec !== undefined && cur.manualArrivalSec >= cursorSec
              ? cur.manualArrivalSec
              : cursorSec;
          cur.arrivalSec = arr;
          const stopDur = cur.isPassing
            ? 0
            : cur.manualStopDurationSec !== undefined
            ? cur.manualStopDurationSec
            : defaultStopSec;
          cur.stopDurationSec = stopDur;
          cur.departureSec = arr + stopDur;
          cursorSec = cur.departureSec;
        }
        lastStopIndex = 0;
        continue;
      }

      const prev = stops[i - 1];
      const segRunSec = calcStationRunSeconds(prev.stationId, cur.stationId, speedKmh);
      let arrSec = cursorSec + segRunSec;

      if (cur.manualArrivalSec !== undefined) {
        const anchorStop = stops[lastStopIndex];
        const minRequiredSec = anchorStop.departureSec + (i - lastStopIndex) * 15;
        const targetArrSec = Math.max(minRequiredSec, cur.manualArrivalSec);

        if (i - lastStopIndex > 1) {
          const intervalRuns: number[] = [];
          let totalStdRun = 0;
          for (let k = lastStopIndex; k < i; k++) {
            const r = calcStationRunSeconds(stops[k].stationId, stops[k + 1].stationId, speedKmh);
            intervalRuns.push(r);
            totalStdRun += r;
          }
          const availableSpan = targetArrSec - anchorStop.departureSec;
          let accSpan = 0;
          for (let k = lastStopIndex + 1; k < i; k++) {
            const ratio = totalStdRun > 0 ? intervalRuns[k - lastStopIndex - 1] / totalStdRun : 1 / (i - lastStopIndex);
            accSpan += availableSpan * ratio;
            const interpSec = Math.round(anchorStop.departureSec + accSpan);
            stops[k].arrivalSec = interpSec;
            stops[k].departureSec = interpSec;
            stops[k].stopDurationSec = 0;
          }
        }

        arrSec = targetArrSec;
      }

      cur.arrivalSec = arrSec;

      if (cur.isPassing || isLastInPlan || (isLastInSeg && segIdx < plan.segments.length - 1)) {
        if (isLastInSeg && segIdx < plan.segments.length - 1) {
          const stopDur = cur.manualStopDurationSec ?? 0;
          cur.stopDurationSec = stopDur;
          cur.departureSec = arrSec + stopDur;
        } else {
          cur.stopDurationSec = 0;
          cur.departureSec = arrSec;
        }
      } else {
        const stopDur =
          cur.manualStopDurationSec !== undefined ? cur.manualStopDurationSec : defaultStopSec;
        cur.stopDurationSec = stopDur;
        cur.departureSec = arrSec + stopDur;
      }

      cursorSec = cur.departureSec;
      if (!cur.isPassing) {
        lastStopIndex = i;
      }
    }

    return {
      ...seg,
      stops,
    };
  });

  // 境界駅の時刻同期
  for (let segIdx = 0; segIdx < updatedSegments.length - 1; segIdx++) {
    const curSeg = updatedSegments[segIdx];
    const nextSeg = updatedSegments[segIdx + 1];
    if (curSeg.stops.length > 0 && nextSeg.stops.length > 0) {
      const lastStop = curSeg.stops[curSeg.stops.length - 1];
      const firstNext = nextSeg.stops[0];
      const stA = STATION_MAP.get(lastStop.stationId);
      const stB = STATION_MAP.get(firstNext.stationId);
      if (stA && stB && areStationsConnectable(stA, stB)) {
        lastStop.departureSec = firstNext.departureSec;
        lastStop.stopDurationSec = firstNext.stopDurationSec;
      }
    }
  }

  return {
    ...plan,
    segments: updatedSegments,
  };
}

/**
 * 新しい路線セグメントを作成するヘルパー
 */
export function createRouteSegment(
  lineId: LineId,
  options: {
    fromStationId?: string;
    toStationId?: string;
    trainType?: TrainTypeKey;
    defaultStopSec?: number;
    trainNumber?: string;
  } = {}
): CustomTrainSegment {
  const line = getLine(lineId);
  const stations = line?.stations || [];
  const fromStationId = options.fromStationId || stations[0]?.id || '';
  const toStationId =
    options.toStationId || stations[stations.length - 1]?.id || '';
  const trainType: TrainTypeKey = options.trainType || 'test_run';
  const isShinkansen = lineId.includes('shinkansen');
  const speedKmh = isShinkansen ? 210 : 75;

  const { stops, direction } = buildSegmentStops(
    lineId,
    fromStationId,
    toStationId,
    trainType,
    options.defaultStopSec ?? 20
  );

  return {
    id: `seg_${lineId}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    lineId,
    fromStationId,
    toStationId,
    direction,
    trainType,
    trainNumber: options.trainNumber,
    speedKmh,
    stops,
  };
}

/**
 * 既存のセグメントリストの末尾に新しい直通路線セグメントをスマートに接続して追加する
 */
export function appendConnectedSegment(
  plan: CustomTrainPlan,
  nextLineId: LineId,
  currentSimSec: number
): CustomTrainPlan {
  const nextLine = getLine(nextLineId);
  if (!nextLine || nextLine.stations.length < 2) return plan;

  if (plan.segments.length === 0) {
    const firstSeg = createRouteSegment(nextLineId, {
      defaultStopSec: plan.defaultStopSec,
    });
    return recalculatePlanSchedule({ ...plan, segments: [firstSeg] }, currentSimSec);
  }

  const prevSegments = [...plan.segments];
  const lastSegIdx = prevSegments.length - 1;
  const lastSeg = { ...prevSegments[lastSegIdx] };

  const pairs = findConnectingStationPairs(lastSeg.lineId, nextLineId, lastSeg.fromStationId);

  let nextFromStationId = nextLine.stations[0].id;
  let nextToStationId = nextLine.stations[nextLine.stations.length - 1].id;

  if (pairs.length > 0) {
    const curEndSt = STATION_MAP.get(lastSeg.toStationId);
    const directMatch = curEndSt
      ? pairs.find((p) => areStationsConnectable(p.stationA, curEndSt))
      : undefined;

    const chosenPair = directMatch || pairs[0];

    if (lastSeg.toStationId !== chosenPair.stationA.id) {
      let adjustedFromId = lastSeg.fromStationId;
      if (adjustedFromId === chosenPair.stationA.id) {
        const prevLine = getLine(lastSeg.lineId);
        if (prevLine && prevLine.stations.length >= 2) {
          const firstId = prevLine.stations[0].id;
          const lastId = prevLine.stations[prevLine.stations.length - 1].id;
          adjustedFromId = chosenPair.stationA.id === firstId ? lastId : firstId;
        }
      }
      const rebuilt = buildSegmentStops(
        lastSeg.lineId,
        adjustedFromId,
        chosenPair.stationA.id,
        lastSeg.trainType,
        plan.defaultStopSec,
        lastSeg.stops,
        false
      );
      lastSeg.fromStationId = adjustedFromId;
      lastSeg.toStationId = chosenPair.stationA.id;
      lastSeg.direction = rebuilt.direction;
      lastSeg.stops = rebuilt.stops;
      prevSegments[lastSegIdx] = lastSeg;
    }

    nextFromStationId = chosenPair.stationB.id;
    const bIdx = nextLine.stations.findIndex((s) => s.id === nextFromStationId);
    if (bIdx <= nextLine.stations.length / 2) {
      nextToStationId = nextLine.stations[nextLine.stations.length - 1].id;
    } else {
      nextToStationId = nextLine.stations[0].id;
    }
  }

  let nextTrainType: TrainTypeKey = lastSeg.trainType;
  if (
    nextTrainType !== 'test_run' &&
    nextTrainType !== 'local' &&
    !nextLine.trainTypes[nextTrainType]
  ) {
    if (nextLine.trainTypes.express) {
      nextTrainType = 'express';
    } else if (nextLine.trainTypes.rapid) {
      nextTrainType = 'rapid';
    } else {
      nextTrainType = 'local';
    }
  }

  const newSeg = createRouteSegment(nextLineId, {
    fromStationId: nextFromStationId,
    toStationId: nextToStationId,
    trainType: nextTrainType,
    defaultStopSec: plan.defaultStopSec,
  });

  return recalculatePlanSchedule(
    {
      ...plan,
      segments: [...prevSegments, newSeg],
    },
    currentSimSec
  );
}

/**
 * CustomTrainPlan から実際にシミュレーションで走行可能な TimetableTrip[]（平日・土休日ペア × セグメント数）を生成
 */
export function createCustomTrainTrips(
  plan: CustomTrainPlan,
  currentSimSec: number
): { trips: TimetableTrip[]; initialTripIdWeekday: string; initialTripIdHoliday: string; startSec: number } {
  const calculatedPlan = recalculatePlanSchedule(plan, currentSimSec);
  const validSegments = calculatedPlan.segments.filter((s) => s.stops.length >= 2);

  if (validSegments.length === 0) {
    throw new Error('有効な走行区間が設定されていません（最低2駅以上必要です）');
  }

  const firstSeg = validSegments[0];
  const lastSeg = validSegments[validSegments.length - 1];
  const globalOriginSt = STATION_MAP.get(firstSeg.stops[0].stationId);
  const globalDestSt = STATION_MAP.get(lastSeg.stops[lastSeg.stops.length - 1].stationId);

  const globalOriginName = globalOriginSt?.name || '始発';
  const globalDestName = globalDestSt?.name || '終着';
  const startSec = firstSeg.stops[0].departureSec;

  const baseId = `TEST_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const allTrips: TimetableTrip[] = [];

  for (const isHoliday of [false, true]) {
    const daySuffix = isHoliday ? 'HD' : 'WD';
    const chainId = `${baseId}_${daySuffix}`;

    const segTripIds = validSegments.map(
      (seg, idx) => `${baseId}_SEG${idx}_${seg.lineId}_${daySuffix}`
    );

    for (let idx = 0; idx < validSegments.length; idx++) {
      const seg = validSegments[idx];
      const tripId = segTripIds[idx];
      const prevTripId = idx > 0 ? segTripIds[idx - 1] : undefined;
      const prevLineId = idx > 0 ? validSegments[idx - 1].lineId : undefined;
      const throughTripId = idx < validSegments.length - 1 ? segTripIds[idx + 1] : undefined;
      const throughLineId = idx < validSegments.length - 1 ? validSegments[idx + 1].lineId : undefined;

      const stops: StationStopTime[] = seg.stops.map((s) => ({
        stationId: s.stationId,
        arrivalTime: secondsToTimeString(s.arrivalSec),
        departureTime: secondsToTimeString(s.departureSec),
        isPassing: s.isPassing,
      }));

      let resolvedCustomType: CustomTrainTypeConfig | undefined;
      if (seg.useCustomType && seg.customTrainType?.name?.trim()) {
        resolvedCustomType = seg.customTrainType;
      } else if (calculatedPlan.useCustomType && calculatedPlan.customTrainType?.name?.trim()) {
        resolvedCustomType = calculatedPlan.customTrainType;
      }

      const trainNumber =
        seg.trainNumber?.trim() ||
        calculatedPlan.defaultTrainNumber?.trim() ||
        (seg.direction === 'outbound' ? '試9001レ' : '試9002レ');

      const trip: TimetableTrip = {
        tripId,
        lineId: seg.lineId,
        trainId: chainId,
        trainNumber,
        trainType: seg.trainType,
        customTrainType: resolvedCustomType,
        trainName: calculatedPlan.trainName?.trim() || undefined,
        isTestTrain: true,
        direction: seg.direction,
        originStationId: seg.stops[0].stationId,
        destinationStationId: seg.stops[seg.stops.length - 1].stationId,
        customOrigin: globalOriginName,
        customDestination: globalDestName,
        prevTripId,
        prevLineId,
        throughTripId,
        throughLineId,
        cars: calculatedPlan.cars || 10,
        isHoliday,
        stops,
      };

      allTrips.push(trip);
    }
  }

  const wdFirst = allTrips.find((t) => !t.isHoliday)!;
  const hdFirst = allTrips.find((t) => t.isHoliday)!;

  return {
    trips: allTrips,
    initialTripIdWeekday: wdFirst.tripId,
    initialTripIdHoliday: hdFirst.tripId,
    startSec,
  };
}

/**
 * デフォルトの初期プランを作成
 */
export function createDefaultCustomTrainPlan(
  currentSimSec: number,
  initialLineId: LineId = 'tojo'
): CustomTrainPlan {
  const firstSeg = createRouteSegment(initialLineId, {
    trainType: 'test_run',
    defaultStopSec: 20,
  });

  const basePlan: CustomTrainPlan = {
    id: `plan_${Date.now()}`,
    trainName: '',
    defaultTrainNumber: '試9001レ',
    cars: getLine(initialLineId)?.defaultCars || 10,
    useCustomType: true,
    customTrainType: {
      name: '試運転',
      shortName: '試',
      color: '#0284c7',
    },
    departureMode: 'now',
    scheduledStartSec: Math.floor(currentSimSec / 60) * 60,
    seekToStartOnLaunch: true,
    defaultStopSec: 20,
    speedMultiplier: 5,
    segments: [firstSeg],
  };

  return recalculatePlanSchedule(basePlan, currentSimSec);
}

// LocalStorage プリセット管理
const STORAGE_KEY = 'trainfo_custom_train_presets_v1';

export function loadSavedCustomTrainPresets(): CustomTrainPlan[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

export function saveCustomTrainPreset(plan: CustomTrainPlan, presetName: string): CustomTrainPlan[] {
  const existing = loadSavedCustomTrainPresets();
  const toSave: CustomTrainPlan = {
    ...plan,
    id: plan.id || `preset_${Date.now()}`,
    presetName: presetName.trim() || 'マイ臨時列車',
  };
  const filtered = existing.filter((p) => p.id !== toSave.id && p.presetName !== toSave.presetName);
  const updated = [toSave, ...filtered].slice(0, 30);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ストレージ上限時等は無視
  }
  return updated;
}

export function deleteCustomTrainPreset(presetId: string): CustomTrainPlan[] {
  const existing = loadSavedCustomTrainPresets();
  const updated = existing.filter((p) => p.id !== presetId);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // 無視
  }
  return updated;
}

// ----------------------------------------------------------------------
// 後方互換用 API (createTestTrainTrip)
// ----------------------------------------------------------------------
export interface CreateTestTrainOptions {
  speedKmh?: number;
  stopSeconds?: number;
  trainNumber?: string;
}

export function createTestTrainTrip(
  lineId: LineId,
  direction: Direction = 'outbound',
  currentSec: number,
  options: CreateTestTrainOptions = {}
): TimetableTrip[] {
  const line = getLine(lineId);
  if (!line || line.stations.length < 2) {
    throw new Error(`路線 ${lineId} の駅データが見つかりません`);
  }

  const fromSt = direction === 'outbound' ? line.stations[0] : line.stations[line.stations.length - 1];
  const toSt = direction === 'outbound' ? line.stations[line.stations.length - 1] : line.stations[0];

  const seg = createRouteSegment(lineId, {
    fromStationId: fromSt.id,
    toStationId: toSt.id,
    trainType: 'test_run',
    defaultStopSec: options.stopSeconds ?? 15,
    trainNumber: options.trainNumber,
  });
  if (options.speedKmh) {
    seg.speedKmh = options.speedKmh;
  }

  const plan: CustomTrainPlan = {
    id: `legacy_${lineId}_${direction}_${Math.floor(currentSec)}`,
    trainName: '',
    defaultTrainNumber: options.trainNumber || (direction === 'outbound' ? '試9001レ' : '試9002レ'),
    cars: line.defaultCars || 8,
    useCustomType: true,
    customTrainType: { name: '試運転', shortName: '試', color: '#0284c7' },
    departureMode: 'now',
    scheduledStartSec: currentSec,
    seekToStartOnLaunch: false,
    defaultStopSec: options.stopSeconds ?? 15,
    speedMultiplier: 5,
    segments: [seg],
  };

  return createCustomTrainTrips(plan, currentSec).trips;
}
