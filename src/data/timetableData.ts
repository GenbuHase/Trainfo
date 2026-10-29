import type {
  TimetableTrip,
  TrainTypeKey,
  Direction,
  LineId,
  StationTimetableStore,
  RawStationDeparture,
  ThroughChainStop,
  ThroughChainSummary,
  CustomTrainTypeConfig,
} from '../types';
import { STATION_MAP } from './stations';
import { getCombinedStationTimetables, getCombinedGlobalTimetable, getLine } from './linesRegistry';
import { timeStringToSeconds, secondsToTimeString } from '../utils/timeUtils';

export { timeStringToSeconds, secondsToTimeString };

/**
 * 公式列車番号のTrainfo標準表記への正規化
 * - アルファベット末尾（576F, 9028M, E151K, B2303S等）: そのまま
 * - すでに「レ」付き（1001レ, 3235レ等）: そのまま
 * - 6桁の純数字（東急・相鉄直通・地下鉄等: 例 022241）: 3桁-3桁にハイフンを挿入し「レ」を付与 (例: 022-241レ)
 * - すでにハイフン付きの3桁-3桁数字（022-241等）: 末尾に「レ」を付与 (022-241レ)
 * - その他の純数字（相鉄4桁 2099、JR短数字 546、秩父 105等）: 末尾に「レ」を付与 (2099レ, 546レ, 105レ)
 * - 併結表記（8078M + 9028M等）: 各パートを個別に正規化して結合
 */
export function normalizeTrainNumber(rawNo?: string): string {
  if (!rawNo) return '';
  const trimmed = rawNo.trim();
  if (trimmed.includes('+')) {
    return trimmed
      .split('+')
      .map((part) => normalizeTrainNumber(part.trim()))
      .join(' + ');
  }
  // すでに末尾に「レ」が付いている場合はそのまま
  if (trimmed.endsWith('レ')) {
    return trimmed;
  }
  // 末尾が英字（JR・メトロ・直通記号など）の場合はそのまま
  if (/[a-zA-Z]$/.test(trimmed)) {
    return trimmed;
  }
  // 6桁の純数字（東急・みなとみらい線・東急新横浜線・相鉄直通等）: XXX-XXXレ にフォーマット
  if (/^\d{6}$/.test(trimmed)) {
    return `${trimmed.slice(0, 3)}-${trimmed.slice(3)}レ`;
  }
  // すでにハイフン付きの純数字（051-071等）: 末尾に「レ」を付与
  if (/^\d{3}-\d{3}$/.test(trimmed)) {
    return `${trimmed}レ`;
  }
  // その他の数字のみ（相鉄4桁 2099、JR 546、秩父 105、東武TJ Y2476等）: 末尾に「レ」を付与
  if (/^\d+$/.test(trimmed) || /^Y\d+$/i.test(trimmed)) {
    return `${trimmed}レ`;
  }
  return trimmed;
}

/**
 * 列車番号の表示用フォーマッター
 * 公式列車番号（trainNumber）を優先。未登録時は trainId または tripId をフォールバック表示。
 * 呼び出しシグネチャの互換性:
 * - formatTrainNumber(trainNumber, tripId)
 * - formatTrainNumber(trainNumber, trainId, tripId)
 */
export function formatTrainNumber(
  trainNumber?: string,
  trainIdOrTripId?: string,
  tripId?: string
): string {
  // 1. 公式列車番号（trainNumber）が存在する場合
  if (trainNumber && !trainNumber.includes('_')) {
    return normalizeTrainNumber(trainNumber);
  }

  // 引数解決（第2引数がtripId形式かtrainId形式かを判定）
  let resolvedTrainId: string | undefined;
  let resolvedTripId: string | undefined;

  if (tripId) {
    resolvedTrainId = trainIdOrTripId;
    resolvedTripId = tripId;
  } else if (trainIdOrTripId) {
    if (trainIdOrTripId.includes('_')) {
      resolvedTripId = trainIdOrTripId;
    } else {
      resolvedTrainId = trainIdOrTripId;
    }
  }

  // 2. trainId がある場合
  if (resolvedTrainId) {
    return resolvedTrainId;
  }

  // 3. tripId からのフォールバック抽出
  const target = resolvedTripId || trainNumber || '';
  if (target.includes('_')) {
    const parts = target.split('_');
    return parts[parts.length - 1];
  }
  return target;
}


// 全登録路線の統合各駅時刻表ストア（静的アクセス互換用）
export const STATION_TIMETABLES: StationTimetableStore = getCombinedStationTimetables();

// 全登録路線の統合ダイヤ（静的アクセス互換用）
export const GLOBAL_TIMETABLE: TimetableTrip[] = getCombinedGlobalTimetable();

// 動的に生成された試運転・臨時列車トリップの保持リスト（直通チェーン探索・駅発車標統合用）
let _dynamicTestTrainTrips: TimetableTrip[] = [];

export function setDynamicTestTrainTrips(trips: TimetableTrip[]) {
  _dynamicTestTrainTrips = trips;
  invalidateGlobalTripMaps();
}

export function getDynamicTestTrainTrips(): TimetableTrip[] {
  return _dynamicTestTrainTrips;
}

// 路線ID指定でダイヤを取得するヘルパー関数
export function getTimetableTrips(selectedLineIds?: LineId[]): TimetableTrip[] {
  return getCombinedGlobalTimetable(selectedLineIds);
}

/**
 * 動的試運転・臨時列車から特定駅の発車データを抽出
 */
function extractDynamicStationDepartures(
  stationId: string,
  isHoliday: boolean,
  lineId?: LineId
): { inbound: RawStationDeparture[]; outbound: RawStationDeparture[] } {
  const inbound: RawStationDeparture[] = [];
  const outbound: RawStationDeparture[] = [];

  for (const trip of _dynamicTestTrainTrips) {
    if (trip.isHoliday !== isHoliday) continue;
    if (lineId && trip.lineId !== lineId) continue;

    // 該当駅の停車インデックスを検索
    const stopIdx = trip.stops.findIndex((s) => s.stationId === stationId);
    if (stopIdx === -1) continue;
    const stop = trip.stops[stopIdx];
    if (stop.isPassing) continue;

    // 終着駅（トリップの最後の駅）の場合は発車しないので除外
    if (stopIdx === trip.stops.length - 1) continue;

    const depTimeStr = stop.departureTime || stop.arrivalTime;
    if (!depTimeStr) continue;

    const [rawH, rawM] = depTimeStr.split(':').map(Number);
    const sec = timeStringToSeconds(depTimeStr);
    const destSt = STATION_MAP.get(trip.destinationStationId);
    const destName = trip.customDestination || destSt?.name || '終着';

    const rawDep: RawStationDeparture = {
      h: rawH,
      m: rawM,
      time: String(rawM).padStart(2, '0'),
      t: trip.trainType,
      d: destName,
      no: trip.trainNumber || '試運転',
      sec,
      tripId: trip.tripId,
      trainName: trip.trainName,
      customTrainType: trip.customTrainType,
    };

    if (trip.direction === 'inbound') {
      inbound.push(rawDep);
    } else {
      outbound.push(rawDep);
    }
  }

  return { inbound, outbound };
}

/**
 * 駅時刻表データと所属路線IDを解決し、動的試運転・臨時列車の停車情報をマージして返す内部ヘルパー
 */
function resolveStationTimetableData(
  stationId: string,
  isHoliday: boolean,
  lineId?: LineId
): {
  resolvedLineId: LineId;
  targetData: { inbound: RawStationDeparture[]; outbound: RawStationDeparture[] };
} {
  const dayKey = isHoliday ? 'holiday' : 'weekday';
  let resolvedLineId = lineId;
  let stData: { inbound: RawStationDeparture[]; outbound: RawStationDeparture[] } | undefined;

  // 1. 指定路線から駅時刻表を取得
  if (resolvedLineId) {
    const line = getLine(resolvedLineId);
    if (line?.stationTimetables?.[dayKey]?.[stationId]) {
      stData = line.stationTimetables[dayKey][stationId];
    }
  }

  // 2. 指定路線にない、または未指定の場合は STATION_MAP から駅所属路線を取得して試行
  if (!stData) {
    const currentSt = STATION_MAP.get(stationId);
    if (currentSt?.lineId) {
      resolvedLineId = resolvedLineId || currentSt.lineId;
      const line = getLine(currentSt.lineId);
      if (line?.stationTimetables?.[dayKey]?.[stationId]) {
        stData = line.stationTimetables[dayKey][stationId];
      }
    }
  }

  // 3. それでも見つからない場合のフォールバック（統合ストア）
  if (!stData) {
    const timetables = getCombinedStationTimetables();
    stData = timetables[dayKey]?.[stationId] || { inbound: [], outbound: [] };
  }

  const finalLineId = resolvedLineId || 'tojo';
  const baseData = stData || { inbound: [], outbound: [] };

  // 4. 動的試運転・臨時列車の停車発車をマージ
  const dynamicDeps = extractDynamicStationDepartures(stationId, isHoliday, finalLineId);
  return {
    resolvedLineId: finalLineId,
    targetData: {
      inbound: [...baseData.inbound, ...dynamicDeps.inbound],
      outbound: [...baseData.outbound, ...dynamicDeps.outbound],
    },
  };
}

/**
 * 特定駅において運行・発車便が存在する進行方向（上り/下り）を判定
 * 終着駅や起点駅、支線末端などで片方向しか運行がない場合のUI制御に使用
 */
export function getStationAvailableDirections(
  stationId: string,
  lineId?: LineId
): { hasInbound: boolean; hasOutbound: boolean } {
  const wd = resolveStationTimetableData(stationId, false, lineId);
  const hd = resolveStationTimetableData(stationId, true, lineId);
  return {
    hasInbound: wd.targetData.inbound.length > 0 || hd.targetData.inbound.length > 0,
    hasOutbound: wd.targetData.outbound.length > 0 || hd.targetData.outbound.length > 0,
  };
}

// 特定駅の時刻表一覧（直近の発車情報）を取得
export function getStationDepartures(
  stationId: string,
  currentTimeSec: number,
  isHoliday: boolean,
  limit: number = 6,
  lineId?: LineId
): { inbound: TimetableTrip[]; outbound: TimetableTrip[] } {
  const { resolvedLineId: finalLineId, targetData } = resolveStationTimetableData(
    stationId,
    isHoliday,
    lineId
  );

  function convertToTrips(deps: RawStationDeparture[], direction: Direction): TimetableTrip[] {
    const valid = deps.filter((d) => {
      let sec = d.sec;
      if ((d.h === 0 || d.h === 1) && d.sec < 86400 && currentTimeSec >= 20 * 3600) {
        sec += 86400;
      }
      return sec >= currentTimeSec - 180 && sec <= currentTimeSec + 7200;
    });
    valid.sort((a, b) => {
      const secA = (a.h === 0 || a.h === 1) && a.sec < 86400 && currentTimeSec >= 20 * 3600 ? a.sec + 86400 : a.sec;
      const secB = (b.h === 0 || b.h === 1) && b.sec < 86400 && currentTimeSec >= 20 * 3600 ? b.sec + 86400 : b.sec;
      return secA - secB;
    });

    const lineDef = getLine(finalLineId);
    const lineOriginStationId = lineDef?.stations[0]?.id || '';
    const lineTerminusStationId = lineDef?.stations[lineDef.stations.length - 1]?.id || '';
    const defaultCars = lineDef?.defaultCars ?? 10;

    return valid.slice(0, limit).map((d, idx) => {
      // 動的トリップやフルTimetableTripがMapにあれば両数・カスタム種別等を引き継ぐ
      const mappedTrip = d.tripId ? getGlobalTripMap().get(d.tripId) : undefined;
      const destSt = Array.from(STATION_MAP.values()).find((s) => s.name === d.d);
      let destId = mappedTrip?.destinationStationId || (destSt ? destSt.id : '');
      if (!destId) {
        destId = direction === 'outbound' ? lineTerminusStationId : lineOriginStationId;
      }
      const depTime = `${d.h.toString().padStart(2, '0')}:${d.m.toString().padStart(2, '0')}:00`;
      const trainName = resolveDepartureTrainName(d);

      return {
        tripId: d.tripId || `DEP_${stationId}_${direction}_${d.h}_${d.m}_${idx}`,
        lineId: finalLineId,
        trainNumber: d.no,
        trainType: d.t,
        customTrainType: d.customTrainType || mappedTrip?.customTrainType,
        isTestTrain: Boolean(mappedTrip?.isTestTrain || d.tripId?.startsWith('TEST_')),
        trainName,
        direction,
        originStationId: stationId,
        destinationStationId: destId,
        customDestination: d.d,
        cars: mappedTrip?.cars ?? defaultCars,
        isHoliday,
        stops: [
          {
            stationId,
            arrivalTime: depTime,
            departureTime: depTime,
            isPassing: false,
          },
        ],
      };
    });
  }

  return {
    inbound: convertToTrips(targetData.inbound, 'inbound'),
    outbound: convertToTrips(targetData.outbound, 'outbound'),
  };
}

// 特定駅の全日時刻表（1時間ごと）を取得
export interface HourlyStationTimetableItem {
  time: string;
  tripId: string;
  trainNumber: string;
  type: TrainTypeKey;
  customTrainType?: CustomTrainTypeConfig;
  destination: string;
  trainName?: string;
}

export interface HourlyStationTimetable {
  hour: number;
  displayHour: string;
  inbound: HourlyStationTimetableItem[];
  outbound: HourlyStationTimetableItem[];
}

export function getFullDayStationTimetable(
  stationId: string,
  isHoliday: boolean,
  lineId?: LineId
): HourlyStationTimetable[] {
  const { targetData } = resolveStationTimetableData(stationId, isHoliday, lineId);

  const hourly: HourlyStationTimetable[] = [];
  for (let h = 4; h <= 27; h++) {
    const displayHour = h >= 24 ? String(h - 24).padStart(2, '0') : String(h);
    hourly.push({
      hour: h,
      displayHour,
      inbound: [],
      outbound: [],
    });
  }

  const mapTo24hCycle = (h: number) => (h < 4 ? h + 24 : h);

  for (const dep of targetData.inbound) {
    const targetHour = mapTo24hCycle(dep.h);
    const target = hourly.find((item) => item.hour === targetHour);
    if (target) {
      const trainName = resolveDepartureTrainName(dep);
      target.inbound.push({
        time: dep.time,
        tripId: dep.tripId || `IN_${stationId}_${dep.h}_${dep.m}_${dep.no}`,
        trainNumber: dep.no,
        trainName,
        type: dep.t,
        customTrainType: dep.customTrainType,
        destination: dep.d,
      });
    }
  }

  for (const dep of targetData.outbound) {
    const targetHour = mapTo24hCycle(dep.h);
    const target = hourly.find((item) => item.hour === targetHour);
    if (target) {
      const trainName = resolveDepartureTrainName(dep);
      target.outbound.push({
        time: dep.time,
        tripId: dep.tripId || `OUT_${stationId}_${dep.h}_${dep.m}_${dep.no}`,
        trainNumber: dep.no,
        trainName,
        type: dep.t,
        customTrainType: dep.customTrainType,
        destination: dep.d,
      });
    }
  }

  for (const item of hourly) {
    item.inbound.sort((a, b) => Number(a.time) - Number(b.time));
    item.outbound.sort((a, b) => Number(a.time) - Number(b.time));
  }

  return hourly;
}

// 全路線の全トリップの高速ルックアップ用Map（動的初期化）
let _globalTripMap: Map<string, TimetableTrip> | null = null;
let _globalTrainIdMap: Map<string, TimetableTrip[]> | null = null;
let _globalTrainNameByNumberMap: Map<string, string> | null = null;

export function invalidateGlobalTripMaps() {
  _globalTripMap = null;
  _globalTrainIdMap = null;
  _globalTrainNameByNumberMap = null;
}

function ensureGlobalMaps() {
  if (!_globalTripMap || !_globalTrainIdMap || !_globalTrainNameByNumberMap) {
    _globalTripMap = new Map();
    _globalTrainIdMap = new Map();
    _globalTrainNameByNumberMap = new Map();
    const trips = [...getCombinedGlobalTimetable(), ..._dynamicTestTrainTrips];
    for (const trip of trips) {
      _globalTripMap.set(trip.tripId, trip);
      if (trip.trainName && trip.trainNumber) {
        _globalTrainNameByNumberMap.set(trip.trainNumber, trip.trainName);
      }
      if (trip.trainId) {
        if (!_globalTrainIdMap.has(trip.trainId)) {
          _globalTrainIdMap.set(trip.trainId, []);
        }
        _globalTrainIdMap.get(trip.trainId)!.push(trip);
      }
    }
  }
}

/**
 * 発車標・全日時刻表データから固有列車名称（愛称・号数）を高速解決
 */
export function resolveDepartureTrainName(d: RawStationDeparture): string | undefined {
  if (d.trainName) return d.trainName;
  if (d.tripId) {
    const fullTrip = getGlobalTripMap().get(d.tripId);
    if (fullTrip?.trainName) return fullTrip.trainName;
  }
  ensureGlobalMaps();
  if (d.no && _globalTrainNameByNumberMap?.has(d.no)) {
    return _globalTrainNameByNumberMap.get(d.no);
  }
  return undefined;
}

export function getGlobalTripMap(): Map<string, TimetableTrip> {
  ensureGlobalMaps();
  return _globalTripMap!;
}


/**
 * 2つのトリップが同一運行チェーン（直通・スイッチバック）として接続可能か汎用判定
 */
function areTripsConnectable(tripA: TimetableTrip, tripB: TimetableTrip): boolean {
  if (tripA.isHoliday !== tripB.isHoliday) return false;

  const firstA = tripA.stops[0];
  const lastA = tripA.stops[tripA.stops.length - 1];
  const firstB = tripB.stops[0];
  const lastB = tripB.stops[tripB.stops.length - 1];

  if (!firstA || !lastA || !firstB || !lastB) return false;

  const startA = timeStringToSeconds(firstA.departureTime || firstA.arrivalTime);
  const endA = timeStringToSeconds(lastA.arrivalTime || lastA.departureTime);
  const startB = timeStringToSeconds(firstB.departureTime || firstB.arrivalTime);
  const endB = timeStringToSeconds(lastB.arrivalTime || lastB.departureTime);

  // A -> B の順序の場合
  const nameEndA = STATION_MAP.get(lastA.stationId)?.name;
  const nameStartB = STATION_MAP.get(firstB.stationId)?.name;
  const isSameStationAtoB = nameEndA && nameStartB && nameEndA === nameStartB;
  const diffAtoB = startB - endA;

  // B -> A の順序の場合
  const nameEndB = STATION_MAP.get(lastB.stationId)?.name;
  const nameStartA = STATION_MAP.get(firstA.stationId)?.name;
  const isSameStationBtoA = nameEndB && nameStartA && nameEndB === nameStartA;
  const diffBtoA = startA - endB;

  // 1) 同一接続駅（スイッチバック・長時間停車等）の場合: -15分〜120分以内の接続を許容
  if (isSameStationAtoB && diffAtoB >= -900 && diffAtoB <= 7200) return true;
  if (isSameStationBtoA && diffBtoA >= -900 && diffBtoA <= 7200) return true;

  // 2) 同一駅名が直接一致しない場合でも時間的に連続している場合（-10分〜45分以内）
  if (diffAtoB >= -600 && diffAtoB <= 2700) return true;
  if (diffBtoA >= -600 && diffBtoA <= 2700) return true;

  // 3) 運転区間が重なっている場合（部分重複登録）
  const overlap = Math.min(endA, endB) - Math.max(startA, startB);
  if (overlap > 0 && Math.abs(startA - startB) <= 3600) return true;

  return false;
}

/**
 * 指定したtripIdが属する直通運行チェーン全体（祖先トリップから子孫トリップまでの全リスト、時系列順）を取得
 * - throughTripId / prevTripId ポインタによるリンク
 * - 同一 trainId（Yahoo路線情報の同一列車）を持つ他路線トリップの統合（特急列車・スイッチバック便等）
 */
export function getThroughChainTrips(initialTripId: string): TimetableTrip[] {
  if (!initialTripId) return [];
  ensureGlobalMaps();
  const map = _globalTripMap!;
  const trainIdMap = _globalTrainIdMap!;

  const initialTrip = map.get(initialTripId);
  if (!initialTrip) return [];

  const visitedTripIds = new Set<string>([initialTrip.tripId]);
  const queue: TimetableTrip[] = [initialTrip];
  const chain: TimetableTrip[] = [];

  while (queue.length > 0) {
    const cur = queue.shift()!;
    chain.push(cur);

    // トリップ候補がチェーン内の既存トリップと同一路線で2駅以上重複（区間重複）していないか判定
    const isHeavyOverlap = (candidate: TimetableTrip) => {
      const candidateStationIds = new Set(candidate.stops.map((s) => s.stationId));
      return chain.some((existing) => {
        if (existing.lineId !== candidate.lineId) return false;
        const overlapCount = existing.stops.filter((s) => candidateStationIds.has(s.stationId)).length;
        return overlapCount > 1;
      });
    };

    // 1. 同一 trainId のトリップを収集 (汎用接続判定により、スイッチバックや路線間上下反転も正しく統合)
    if (cur.trainId) {
      const sameTrainIdTrips = trainIdMap.get(cur.trainId) || [];
      for (const st of sameTrainIdTrips) {
        if (!visitedTripIds.has(st.tripId) && areTripsConnectable(cur, st)) {
          // すでに cur.prevTripId が明示されている場合、st が先行トリップ（st -> cur）なら誤接続を防ぐためスキップ
          const firstCur = cur.stops[0];
          const lastSt = st.stops[st.stops.length - 1];
          const isStBeforeCur = Boolean(
            firstCur &&
            lastSt &&
            (firstCur.stationId === lastSt.stationId ||
              STATION_MAP.get(firstCur.stationId)?.name === STATION_MAP.get(lastSt.stationId)?.name)
          );
          if (cur.prevTripId && isStBeforeCur) {
            continue;
          }

          // すでに cur.throughTripId が明示されている場合、st が後続トリップ（cur -> st）なら誤接続を防ぐためスキップ
          const lastCur = cur.stops[cur.stops.length - 1];
          const firstSt = st.stops[0];
          const isStAfterCur = Boolean(
            lastCur &&
            firstSt &&
            (lastCur.stationId === firstSt.stationId ||
              STATION_MAP.get(lastCur.stationId)?.name === STATION_MAP.get(firstSt.stationId)?.name)
          );
          if (cur.throughTripId && isStAfterCur) {
            continue;
          }

                    // すでに収集済みのトリップ群と区間駅が大幅に重複しているトリップは別系統の重複とみなしスキップ
          if (isHeavyOverlap(st)) {
            continue;
          }

          visitedTripIds.add(st.tripId);
          queue.push(st);
        }
      }
    }

    // 2. prevTripId を遡る
    if (cur.prevTripId && !visitedTripIds.has(cur.prevTripId)) {
      const prev = map.get(cur.prevTripId);
      if (prev && !isHeavyOverlap(prev)) {
        visitedTripIds.add(prev.tripId);
        queue.push(prev);
      }
    }

    // 3. throughTripId を辿る
    if (cur.throughTripId && !visitedTripIds.has(cur.throughTripId)) {
      const next = map.get(cur.throughTripId);
      if (next && !isHeavyOverlap(next)) {
        visitedTripIds.add(next.tripId);
        queue.push(next);
      }
    }
  }

  // 有向直通リンク (prevTripId / throughTripId) と日付跨ぎを考慮したトポロジカル整列
  return sortThroughChainTrips(chain);
}

/**
 * 直通運行チェーン内のトリップ群を、有向直通リンク (prevTripId / throughTripId) と
 * 日付跨ぎを考慮した正しい運行順序（始発路線 -> 終着路線）にトポロジカル整列
 */
function sortThroughChainTrips(chain: TimetableTrip[]): TimetableTrip[] {
  if (chain.length <= 1) return chain;

  const chainSet = new Map<string, TimetableTrip>(chain.map((t) => [t.tripId, t]));
  const nextMap = new Map<string, Set<string>>();
  const prevMap = new Map<string, Set<string>>();
  const inDegree = new Map<string, number>();

  for (const t of chain) {
    nextMap.set(t.tripId, new Set());
    prevMap.set(t.tripId, new Set());
    inDegree.set(t.tripId, 0);
  }

  for (const t of chain) {
    // 1. throughTripId による後続関係
    if (t.throughTripId && chainSet.has(t.throughTripId)) {
      nextMap.get(t.tripId)!.add(t.throughTripId);
      prevMap.get(t.throughTripId)!.add(t.tripId);
    }
    // 2. prevTripId による先行関係
    if (t.prevTripId && chainSet.has(t.prevTripId)) {
      nextMap.get(t.prevTripId)!.add(t.tripId);
      prevMap.get(t.tripId)!.add(t.prevTripId);
    }
  }

  for (const [id, prevs] of prevMap.entries()) {
    inDegree.set(id, prevs.size);
  }

  // 入次数0（最上流・始発路線）のノードをキューに追加
  const queue = chain.filter((t) => (inDegree.get(t.tripId) || 0) === 0);
  queue.sort((a, b) => {
    const depA = a.stops[0]?.departureTime ? timeStringToSeconds(a.stops[0].departureTime) : 0;
    const depB = b.stops[0]?.departureTime ? timeStringToSeconds(b.stops[0].departureTime) : 0;
    return depA - depB;
  });

  const sorted: TimetableTrip[] = [];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const cur = queue.shift()!;
    if (visited.has(cur.tripId)) continue;
    visited.add(cur.tripId);
    sorted.push(cur);

    const nexts = Array.from(nextMap.get(cur.tripId) || [])
      .map((id) => chainSet.get(id))
      .filter((t): t is TimetableTrip => Boolean(t));

    for (const next of nexts) {
      const curDeg = (inDegree.get(next.tripId) || 0) - 1;
      inDegree.set(next.tripId, curDeg);
      if (curDeg <= 0 && !visited.has(next.tripId)) {
        queue.push(next);
      }
    }
  }

  // サイクルや未接続ノードが存在する場合のフォールバック
  if (sorted.length < chain.length) {
    const remaining = chain.filter((t) => !visited.has(t.tripId));
    let lastSec = 0;
    if (sorted.length > 0) {
      const lastStops = sorted[sorted.length - 1].stops;
      if (lastStops.length > 0) {
        const lastStop = lastStops[lastStops.length - 1];
        lastSec = timeStringToSeconds(lastStop.arrivalTime || lastStop.departureTime);
      }
    }

    remaining.sort((a, b) => {
      let depA = a.stops[0]?.departureTime ? timeStringToSeconds(a.stops[0].departureTime) : 0;
      let depB = b.stops[0]?.departureTime ? timeStringToSeconds(b.stops[0].departureTime) : 0;
      if (depA < lastSec && depA + 86400 >= lastSec) depA += 86400;
      if (depB < lastSec && depB + 86400 >= lastSec) depB += 86400;
      return depA - depB;
    });

    for (const r of remaining) {
      sorted.push(r);
    }
  }

  return sorted;
}

/**
 * 指定したtripIdが属する直通運行チェーンに含まれるすべてのtripIdのSetを取得
 */
export function getThroughChainTripIds(initialTripId: string): Set<string> {
  const trips = getThroughChainTrips(initialTripId);
  return new Set(trips.map((t) => t.tripId));
}

/**
 * 直通運転チェーンのTimetableTrip群から、境界駅を統合した全区間タイムラインサマリーを生成
 */
export function buildThroughChainSummary(chainTrips: TimetableTrip[]): ThroughChainSummary {
  if (!chainTrips || chainTrips.length === 0) {
    return {
      trips: [],
      stops: [],
      lines: [],
      hasMultipleLines: false,
    };
  }

  // 経由路線リストの収集
  const linesMap = new Map<
    string,
    {
      lineId: LineId;
      name: string;
      shortName: string;
      lineColor: string;
      initialTrainType: TrainTypeKey;
      initialCustomTrainType?: CustomTrainTypeConfig;
      initialTrainNumber?: string;
    }
  >();

  for (const trip of chainTrips) {
    if (!linesMap.has(trip.lineId)) {
      const line = getLine(trip.lineId);
      linesMap.set(trip.lineId, {
        lineId: trip.lineId,
        name: line?.name || trip.lineId,
        shortName: line?.shortName || line?.name || trip.lineId,
        lineColor: line?.lineColor || '#004b97',
        initialTrainType: trip.trainType,
        initialCustomTrainType: trip.customTrainType,
        initialTrainNumber: trip.trainNumber,
      });
    }
  }

  const lines = Array.from(linesMap.values());
  const hasMultipleLines = chainTrips.length > 1 || lines.length > 1;

  const stops: ThroughChainStop[] = [];

  for (let tripIdx = 0; tripIdx < chainTrips.length; tripIdx++) {
    const trip = chainTrips[tripIdx];
    const prevTrip = tripIdx > 0 ? chainTrips[tripIdx - 1] : undefined;
    const nextTrip = tripIdx < chainTrips.length - 1 ? chainTrips[tripIdx + 1] : undefined;

    const line = getLine(trip.lineId);
    const lineName = line?.name || trip.lineId;
    const lineShortName = line?.shortName || line?.name || trip.lineId;
    const lineColor = line?.lineColor || '#004b97';

    // 先行トリップから併結が継続しているか判定
    const continuesCouplingFromPrev = Boolean(prevTrip?.coupling && trip.coupling);
    // 後続トリップへ併結が継続するか判定
    const continuesCouplingToNext = Boolean(trip.coupling && nextTrip?.coupling);

    for (let stopIdx = 0; stopIdx < trip.stops.length; stopIdx++) {
      const s = trip.stops[stopIdx];
      const station = STATION_MAP.get(s.stationId);
      const stationName = station?.name || s.stationId;
      const isTripFirstStop = stopIdx === 0;
      const isTripLastStop = stopIdx === trip.stops.length - 1;
      const isChainLastStop = tripIdx === chainTrips.length - 1 && isTripLastStop;

      // 区間別列車番号
      let currentTrainNumber = trip.trainNumber;
      let trainNumberChange: string | undefined;
      if (trip.trainNumberSections) {
        const sec = trip.trainNumberSections.find((ts) => ts.fromStationId === s.stationId);
        if (sec) {
          trainNumberChange = sec.trainNumber;
          currentTrainNumber = sec.trainNumber;
        }
      }

      // 併結開始 / 解結（切り離し）
      // 1) 境界駅で先行トリップから併結が継続している場合は「併結開始」を抑制
      let couplingStart = Boolean(trip.coupling?.fromStationId === s.stationId);
      if (isTripFirstStop && continuesCouplingFromPrev) {
        couplingStart = false;
      }

      // 2) 境界駅で後続トリップへ併結が継続している場合は「切り離し」を抑制
      // 3) 運行の最終駅（終着駅）での到着時は切り離し作業ではない（終着）ため抑制
      let couplingEnd = Boolean(trip.coupling?.toStationId === s.stationId);
      if ((isTripLastStop && continuesCouplingToNext) || isChainLastStop) {
        couplingEnd = false;
      }

      // 直前の駅との境界判定 (先行トリップの末尾駅と後続トリップの先頭駅)
      if (tripIdx > 0 && isTripFirstStop && stops.length > 0) {
        const prevStop = stops[stops.length - 1];
        const isSameStation =
          prevStop.stationId === s.stationId ||
          prevStop.stationName === stationName;

        if (isSameStation) {
          // 境界駅の統合: 直前に追加された先行トリップの末尾駅を更新
          prevStop.departureTime = s.departureTime || s.arrivalTime || prevStop.departureTime;
          // 両方が通過の場合のみ通過、どちらかが停車なら停車
          prevStop.isPassing = Boolean(prevStop.isPassing && s.isPassing);
          prevStop.isBoundary = true;
          prevStop.boundaryInfo = {
            prevLineId: prevStop.lineId,
            nextLineId: trip.lineId,
            prevLineName: prevStop.lineShortName,
            nextLineName: lineShortName,
            prevTrainType: prevStop.trainType,
            nextTrainType: trip.trainType,
            prevCustomTrainType: prevStop.customTrainType,
            nextCustomTrainType: trip.customTrainType,
            prevTrainNumber: prevStop.trainNumber,
            nextTrainNumber: trip.trainNumber,
          };
          if (couplingEnd) {
            prevStop.couplingEnd = true;
          }
          if (!prevStop.trainName && trip.trainName) {
            prevStop.trainName = trip.trainName;
          }
          // 先頭駅は統合されたのでスキップ
          continue;
        }
      }

      // 同一路線・同一駅の重複登録抑止（先行区間ですでに登録済みの駅が再描画されるのを完全防止）
      if (stops.some((existing) => existing.stationId === s.stationId && existing.lineId === trip.lineId)) {
        continue;
      }

      stops.push({
        stationId: s.stationId,
        stationName,
        stationNumber: station?.stationNumber,
        lineId: trip.lineId,
        lineName,
        lineShortName,
        lineColor,
        arrivalTime: s.arrivalTime,
        departureTime: s.departureTime,
        isPassing: Boolean(s.isPassing),
        tripId: trip.tripId,
        trainType: trip.trainType,
        customTrainType: trip.customTrainType,
        trainNumber: currentTrainNumber,
        trainName: trip.trainName,
        isBoundary: false,
        trainNumberChange,
        couplingStart,
        couplingEnd,
      });
    }
  }

  return {
    trips: chainTrips,
    stops,
    lines,
    hasMultipleLines,
  };
}
