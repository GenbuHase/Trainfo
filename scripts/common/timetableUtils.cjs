// 時刻表・直通リンカー・カップリング共通ユーティリティ基盤
const fs = require('fs');
const path = require('path');

/**
 * 時刻文字列 ("HH:MM:SS" / "HH:MM") を秒数に変換（深夜0:00〜3:59は翌日24:00〜27:59として扱う）
 */
function timeToSec(t) {
  if (!t) return null;
  const parts = t.split(':').map(Number);
  let h = parts[0];
  if (h < 4) h += 24;
  return h * 3600 + parts[1] * 60 + (parts[2] || 0);
}

/**
 * 深夜オフセットなしの単純秒数変換
 */
function rawTimeToSec(t) {
  if (!t) return 0;
  const [h, m, s] = t.split(':').map(Number);
  return h * 3600 + m * 60 + (s || 0);
}

/**
 * 秒数を "HH:MM:SS" 形式（24時間制正規化）に変換
 */
function secToTime(sec) {
  const norm = (Math.floor(sec) + 86400 * 2) % 86400;
  const h = Math.floor(norm / 3600).toString().padStart(2, '0');
  const m = Math.floor((norm % 3600) / 60).toString().padStart(2, '0');
  const s = (norm % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

/**
 * 安全なJSONファイル読み込み
 */
function safeReadJson(filePath, fallback = []) {
  const resolved = path.resolve(filePath);
  if (!fs.existsSync(resolved)) return fallback;
  return JSON.parse(fs.readFileSync(resolved, 'utf8'));
}

/**
 * globalTimetable の trip オブジェクトにおける固定キー順序（カノニカル順）
 */
const TRIP_KEY_ORDER = [
  'tripId',
  'lineId',
  'trainId',
  'trainNumber',
  'trainType',
  'trainName',
  'direction',
  'originStationId',
  'destinationStationId',
  'customOrigin',
  'customDestination',
  'cars',
  'isHoliday',
  'isClonedBranch',
  'stops',
  'throughTripId',
  'throughLineId',
  'prevTripId',
  'prevLineId',
  'coupling',
];

const STOP_KEY_ORDER = [
  'stationId',
  'arrivalTime',
  'departureTime',
  'isPassing',
  'track',
  'distance',
];

const COUPLING_KEY_ORDER = [
  'role',
  'coupledTripId',
  'coupledTrainNumber',
  'couplingStationId',
  'decouplingStationId',
  'splitStationId',
  'mergeStationId',
];

const STATION_ENTRY_KEY_ORDER = [
  'h',
  'm',
  'time',
  'sec',
  't',
  'n',
  'd',
  'no',
  'tripId',
];

/**
 * オブジェクトのキーを指定された優先順序（未知のキーは末尾アルファベット順）でソート
 */
function sortObjectKeys(obj, preferredOrder) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj;
  const sorted = {};
  const orderMap = new Map(preferredOrder.map((k, i) => [k, i]));
  const keys = Object.keys(obj).sort((a, b) => {
    const idxA = orderMap.has(a) ? orderMap.get(a) : 999;
    const idxB = orderMap.has(b) ? orderMap.get(b) : 999;
    if (idxA !== idxB) return idxA - idxB;
    return a.localeCompare(b);
  });
  for (const k of keys) {
    sorted[k] = obj[k];
  }
  return sorted;
}

function canonicalizeStop(stop) {
  return sortObjectKeys(stop, STOP_KEY_ORDER);
}

function canonicalizeCoupling(coupling) {
  return sortObjectKeys(coupling, COUPLING_KEY_ORDER);
}

function canonicalizeTrip(trip) {
  if (!trip || typeof trip !== 'object') return trip;
  const sorted = sortObjectKeys(trip, TRIP_KEY_ORDER);
  if (Array.isArray(sorted.stops)) {
    sorted.stops = sorted.stops.map(canonicalizeStop);
  }
  if (sorted.coupling && typeof sorted.coupling === 'object') {
    sorted.coupling = canonicalizeCoupling(sorted.coupling);
  }
  return sorted;
}

function canonicalizeStationEntry(entry) {
  return sortObjectKeys(entry, STATION_ENTRY_KEY_ORDER);
}

function canonicalizeStationTimetables(store) {
  if (!store || typeof store !== 'object') return store;
  const sortedStore = {};
  for (const dayKey of ['weekday', 'holiday']) {
    if (!store[dayKey]) continue;
    sortedStore[dayKey] = {};
    const stationIds = Object.keys(store[dayKey]).sort();
    for (const stId of stationIds) {
      sortedStore[dayKey][stId] = {
        outbound: (store[dayKey][stId].outbound || []).map(canonicalizeStationEntry),
        inbound: (store[dayKey][stId].inbound || []).map(canonicalizeStationEntry),
      };
    }
  }
  return sortedStore;
}

/**
 * ファイルパスや構造から自動判定してキー順序を正規化（カノニカル化）
 */
function canonicalizeData(filePath, data) {
  if (!data) return data;
  const normalizedPath = filePath ? filePath.replace(/\\/g, '/') : '';
  if (normalizedPath.endsWith('globalTimetable.json') || (Array.isArray(data) && data.length > 0 && data[0]?.tripId)) {
    return data.map(canonicalizeTrip);
  }
  if (normalizedPath.endsWith('stationTimetables.json') || (typeof data === 'object' && ('weekday' in data || 'holiday' in data))) {
    return canonicalizeStationTimetables(data);
  }
  return data;
}

/**
 * Windows環境でのファイルロック競合（EBUSY等）に耐性のあるJSONファイル書き出し
 * （自動的にカノニカルなキー順序に正規化して保存）
 */
function safeWriteJson(filePath, data, maxAttempts = 15) {
  const resolved = path.resolve(filePath);
  const normalizedData = canonicalizeData(resolved, data);
  const content = JSON.stringify(normalizedData, null, 2);
  let attempts = 0;
  while (attempts < maxAttempts) {
    try {
      fs.writeFileSync(resolved, content, 'utf8');
      return;
    } catch (e) {
      attempts++;
      if (attempts >= maxAttempts) throw e;
      const start = Date.now();
      while (Date.now() - start < 200) {}
    }
  }
}

/**
 * trip オブジェクトまたは tripId 文字列からベース列車IDを抽出
 */
function extractTrainId(tripOrId) {
  if (!tripOrId) return null;
  if (typeof tripOrId === 'object') {
    if (tripOrId.trainId) return String(tripOrId.trainId);
    if (!tripOrId.tripId) return null;
    tripOrId = tripOrId.tripId;
  }
  const cleanId = String(tripOrId).replace(/_(fuji|branch)$/, '');
  const parts = cleanId.split('_');
  return parts[parts.length - 1];
}

/**
 * 特急種別判定
 */
function isLimitedExpress(type) {
  return type === 'limitedExp' || type === 'limited_express';
}

/**
 * 優等列車（快速・急行・準急等、各停・普通・特急以外）判定
 */
function isExpressType(type) {
  return Boolean(type && !isLimitedExpress(type) && type !== 'local' && type !== 'regular' && type !== 'each');
}

/**
 * 数字のみの内部管理IDではなく公式列車番号（例: 9078M, 1101レ）であるか判定
 */
function isOfficialTrainNumber(no) {
  return Boolean(no && !/^\d+$/.test(String(no)));
}

/**
 * 併結の子系統（SECONDARY）または分割支線用クローントリップであるか汎用判定
 */
function isBranchOrSecondaryTrip(trip) {
  if (!trip) return false;
  if (trip.isClonedBranch) return true;
  if (trip.coupling && (trip.coupling.role === 'SECONDARY' || trip.coupling.role === 'child')) return true;
  if (trip.tripId && /_(fuji|branch)$/.test(trip.tripId)) return true;
  return false;
}

/**
 * 駅名・行先文字列から括弧書き（路線名・会社名・都道府県名など）を除去して正規化
 */
function cleanStationName(name) {
  if (!name) return '';
  return String(name).replace(/\([^)]*\)/g, '').trim();
}

/**
 * 全路線の stations.ts を走査し、全駅の ID -> 駅名 マップを自動抽出
 */
function buildUniversalStationMap() {
  const stationMap = new Map();
  const linesDir = path.resolve('src/data/lines');
  if (!fs.existsSync(linesDir)) return stationMap;

  const entries = fs.readdirSync(linesDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const stationsPath = path.join(linesDir, entry.name, 'stations.ts');
    if (!fs.existsSync(stationsPath)) continue;

    const content = fs.readFileSync(stationsPath, 'utf8');
    const regex = /id['"]?:\s*['"]([^'"]+)['"][\s\S]*?name['"]?:\s*['"]([^'"]+)['"]/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      stationMap.set(match[1], match[2]);
    }
  }
  return stationMap;
}

/**
 * PRIMARY と SECONDARY の両トリップに双方向・対称な coupling オブジェクトを設定する汎用ヘルパー
 */
function applySymmetricCoupling(pri, sec, {
  fromStationId,
  toStationId,
  primaryCars,
  secondaryCars,
  primaryDest,
  secondaryDest,
}) {
  if (primaryCars !== undefined) pri.cars = primaryCars;
  if (secondaryCars !== undefined) sec.cars = secondaryCars;

  pri.coupling = {
    role: 'PRIMARY',
    fromStationId,
    toStationId,
    coupledTripId: sec.tripId,
    coupledTrainNumber: sec.trainNumber,
    coupledCars: sec.cars,
    coupledDestination: secondaryDest,
  };

  sec.coupling = {
    role: 'SECONDARY',
    fromStationId,
    toStationId,
    coupledTripId: pri.tripId,
    coupledTrainNumber: pri.trainNumber,
    coupledCars: pri.cars,
    coupledDestination: primaryDest,
  };
}

/**
 * 2つのトリップ間に双方向の直通リンク（throughTripId / prevTripId 等）を設定する汎用ヘルパー
 */
function linkThroughTrips(tripA, lineIdA, tripB, lineIdB, options = {}) {
  if (!tripA || !tripB) return;
  const {
    withLegacyObjects = false,
    legacyTrainNumber,
    trainNumber,
    trainName,
    customOrigin,
    customDestination,
    cars,
  } = options;

  tripA.throughTripId = tripB.tripId;
  tripA.throughLineId = lineIdB;
  tripB.prevTripId = tripA.tripId;
  tripB.prevLineId = lineIdA;

  const num = legacyTrainNumber || trainNumber || tripA.trainNumber || tripB.trainNumber;
  if (withLegacyObjects) {
    tripA.through = { lineId: lineIdB, tripId: tripB.tripId, trainNumber: num };
    tripB.previousTrip = { lineId: lineIdA, tripId: tripA.tripId, trainNumber: num };
  }

  if (trainName) {
    tripA.trainName = trainName;
    tripB.trainName = trainName;
  }
  if (trainNumber) {
    tripA.trainNumber = trainNumber;
    tripB.trainNumber = trainNumber;
  }
  if (customOrigin) {
    tripA.customOrigin = customOrigin;
    tripB.customOrigin = customOrigin;
  }
  if (customDestination) {
    tripA.customDestination = customDestination;
    tripB.customDestination = customDestination;
  }
  if (cars !== undefined) {
    tripA.cars = cars;
    tripB.cars = cars;
  }
}

/**
 * 区間内の主要停車駅リスト (stopTimesMap) の間にある中間駅を通過駅 (isPassing: true) として等間隔線形補間
 */
function buildFullStops(allStationIds, stopTimesMap, useRawTime = true) {
  const toSecFn = useRawTime ? rawTimeToSec : timeToSec;
  const stops = [];
  const startIdx = allStationIds.indexOf(stopTimesMap[0].stationId);
  const endIdx = allStationIds.indexOf(stopTimesMap[stopTimesMap.length - 1].stationId);
  const dir = startIdx <= endIdx ? 1 : -1;

  let currentKeyIdx = 0;
  for (let i = startIdx; dir > 0 ? i <= endIdx : i >= endIdx; i += dir) {
    const stId = allStationIds[i];
    const keyStop = stopTimesMap.find((s) => s.stationId === stId);
    if (keyStop) {
      stops.push({
        stationId: stId,
        arrivalTime: keyStop.arrivalTime,
        departureTime: keyStop.departureTime,
        isPassing: Boolean(keyStop.isPassing),
      });
      currentKeyIdx = stopTimesMap.indexOf(keyStop);
    } else {
      const prevKey = stopTimesMap[currentKeyIdx];
      const nextKey = stopTimesMap[currentKeyIdx + 1];
      const prevIdx = allStationIds.indexOf(prevKey.stationId);
      const nextIdx = allStationIds.indexOf(nextKey.stationId);
      const totalSteps = Math.abs(nextIdx - prevIdx);
      const step = Math.abs(i - prevIdx);

      const t1 = toSecFn(prevKey.departureTime || prevKey.arrivalTime);
      const t2 = toSecFn(nextKey.arrivalTime || nextKey.departureTime);
      const curTimeSec = t1 + (t2 - t1) * (step / totalSteps);
      const tStr = secToTime(curTimeSec);

      stops.push({
        stationId: stId,
        arrivalTime: tStr,
        departureTime: tStr,
        isPassing: true,
      });
    }
  }
  return stops;
}

/**
 * 距離定義付き駅リスト (stationsWithDists) に基づき、開始秒〜終了秒の間を距離比例で通過補間
 */
function buildPassingStopsWithDistances(stationsWithDists, tStartSec, tEndSec, startPassing = false, endPassing = false) {
  const n = stationsWithDists.length;
  if (n === 0) return [];
  if (n === 1) {
    const t = secToTime(tStartSec);
    return [{ stationId: stationsWithDists[0].stationId, arrivalTime: t, departureTime: t, isPassing: startPassing }];
  }
  const totalDist = stationsWithDists[n - 1].dist - stationsWithDists[0].dist;
  const totalDuration = tEndSec - tStartSec;

  return stationsWithDists.map((st, i) => {
    const frac = totalDist > 0 ? (st.dist - stationsWithDists[0].dist) / totalDist : i / (n - 1);
    const curSec = tStartSec + totalDuration * frac;
    const t = secToTime(curSec);
    const isPassing = i === 0 ? startPassing : i === n - 1 ? endPassing : true;
    return {
      stationId: st.stationId,
      arrivalTime: t,
      departureTime: t,
      isPassing,
    };
  });
}



module.exports = {
  timeToSec,
  rawTimeToSec,
  secToTime,
  safeReadJson,
  safeWriteJson,
  canonicalizeData,
  canonicalizeTrip,
  canonicalizeStationTimetables,
  extractTrainId,
  isLimitedExpress,
  isExpressType,
  isOfficialTrainNumber,
  isBranchOrSecondaryTrip,
  cleanStationName,
  buildUniversalStationMap,
  applySymmetricCoupling,
  linkThroughTrips,
  buildFullStops,
  buildPassingStopsWithDistances,
};
