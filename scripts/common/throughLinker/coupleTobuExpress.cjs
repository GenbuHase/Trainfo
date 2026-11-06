// 東武特急（リバティけごん・会津・きぬ・スペーシア等）併結・編成両数設定エンジン
const fs = require('fs');
const path = require('path');
const skytreeLineConfig = require('../../lines/tobu_skytree/config.cjs');
const YahooTimetableBuilder = require('../yahoo/YahooTimetableBuilder.cjs');
const { tobu: tobuConfig } = require('./couplingRulesConfig.cjs');
const {
  safeReadJson,
  safeWriteJson,
  extractTrainId,
  applySymmetricCoupling,
} = require('../timetableUtils.cjs');

const LIBERTY_ID_SET = new Set(tobuConfig.libertyTrainIds);

/**
 * tobu_skytree の globalTimetable.json に併結列車が欠落している場合、キャッシュから再ビルド
 */
function restoreSkytreeTrips() {
  const outPath = path.resolve('src/data/lines/tobu_skytree/globalTimetable.json');
  if (fs.existsSync(outPath)) {
    const existing = safeReadJson(outPath, []);
    const sampleId = tobuConfig.downPairs[0]?.otherId || '25154';
    const hasBranchTrip = existing.some(t =>
      t.trainId === sampleId ||
      t.trainNumber === sampleId ||
      t.trainNumber === '1101レ' ||
      (t.tripId && t.tripId.includes(sampleId))
    );
    if (hasBranchTrip) {
      console.log('[coupleTobuExpress] tobu_skytree trips already intact, skipping rebuild');
      return;
    }
  }

  const cachePath = path.resolve('scripts/cache/yahoo/tobu_skytree/all_train_details.json');
  if (!fs.existsSync(cachePath)) {
    console.warn('[coupleTobuExpress] tobu_skytree cache not found:', cachePath);
    return;
  }
  const details = safeReadJson(cachePath, []);
  const builder = new YahooTimetableBuilder(skytreeLineConfig);
  const trips = builder.buildGlobalTimetable(details);
  safeWriteJson(outPath, trips);
  console.log(`[coupleTobuExpress] Restored ${trips.length} trips in tobu_skytree/globalTimetable.json`);
}

function matchesTripId(trip, isHoliday, direction, targetId) {
  if (!trip || trip.isHoliday !== isHoliday || trip.direction !== direction) return false;
  return (
    trip.trainId === targetId ||
    trip.trainNumber === targetId ||
    (trip.tripId && trip.tripId.endsWith(`_${targetId}`))
  );
}

function isLibertyTrip(trip) {
  if (!trip) return false;
  const id = extractTrainId(trip);
  if (id && LIBERTY_ID_SET.has(id)) return true;
  if (trip.trainNumber && tobuConfig.libertyTrainNumberPatterns.some(re => re.test(trip.trainNumber))) {
    return true;
  }
  if (trip.trainName && trip.trainName.includes('リバティ')) return true;
  return false;
}

function coupleTobuExpress() {
  console.log('\n=== 🔗 東武併結特急（リバティけごん・会津・きぬ等）カップリング設定 ===');

  restoreSkytreeTrips();

  const linePaths = {
    tobu_skytree: path.resolve('src/data/lines/tobu_skytree/globalTimetable.json'),
    tobu_nikko: path.resolve('src/data/lines/tobu_nikko/globalTimetable.json'),
    tobu_kinugawa: path.resolve('src/data/lines/tobu_kinugawa/globalTimetable.json'),
    yagan: path.resolve('src/data/lines/yagan/globalTimetable.json'),
    aizu: path.resolve('src/data/lines/aizu/globalTimetable.json'),
  };

  const lineTrips = {};
  for (const [lineId, filePath] of Object.entries(linePaths)) {
    lineTrips[lineId] = safeReadJson(filePath, []);
  }

  let coupledCount = 0;

  for (const isHoliday of [false, true]) {
    // 1. 下り併結ペア設定
    for (const pair of tobuConfig.downPairs) {
      for (const seg of tobuConfig.segments) {
        const trips = lineTrips[seg.lineId];
        const pri = trips.find(t => matchesTripId(t, isHoliday, 'outbound', pair.nikkoId));
        const sec = trips.find(t => matchesTripId(t, isHoliday, 'outbound', pair.otherId));
        if (pri && sec) {
          pri.customDestination = seg.primaryDestOut;
          sec.customDestination = pair.otherDest;
          applySymmetricCoupling(pri, sec, {
            fromStationId: seg.fromStationId,
            toStationId: seg.toStationId,
            primaryCars: seg.cars,
            secondaryCars: seg.cars,
            primaryDest: seg.primaryDestOut,
            secondaryDest: pair.otherDest,
          });
          coupledCount += 2;
        }
      }
    }

    // 2. 上り併結ペア設定
    for (const pair of tobuConfig.upPairs) {
      for (const seg of [...tobuConfig.segments].reverse()) {
        const trips = lineTrips[seg.lineId];
        const pri = trips.find(t => matchesTripId(t, isHoliday, 'inbound', pair.nikkoId));
        const sec = trips.find(t => matchesTripId(t, isHoliday, 'inbound', pair.otherId));
        if (pri && sec) {
          applySymmetricCoupling(pri, sec, {
            fromStationId: seg.toStationId,
            toStationId: seg.fromStationId,
            primaryCars: seg.cars,
            secondaryCars: seg.cars,
            primaryDest: seg.destIn,
            secondaryDest: seg.destIn,
          });
          coupledCount += 2;
        }
      }
    }
  }

  // 3. 特急編成両数の正規化（リバティ3両・スペーシア等6両）
  console.log('[coupleTobuExpress] 特急列車の編成両数（リバティ3両・スペーシア6両）の正常化開始...');
  const fixedCounts = { tobu_skytree: 0, tobu_nikko: 0, tobu_kinugawa: 0, yagan: 0, aizu: 0 };

  for (const t of lineTrips.tobu_skytree) {
    if (t.trainType === 'limitedExp') {
      if (t.coupling) {
        t.cars = 3;
      } else if (isLibertyTrip(t)) {
        t.cars = 3;
        fixedCounts.tobu_skytree++;
      } else {
        t.cars = 6;
        fixedCounts.tobu_skytree++;
      }
    }
  }

  for (const t of lineTrips.tobu_nikko) {
    if (t.trainType === 'limitedExp' && !t.coupling && isLibertyTrip(t)) {
      t.cars = 3;
      fixedCounts.tobu_nikko++;
    }
  }

  for (const t of lineTrips.tobu_kinugawa) {
    if (t.trainType === 'limitedExp' && isLibertyTrip(t)) {
      t.cars = 3;
      fixedCounts.tobu_kinugawa++;
    }
  }

  for (const lineId of ['yagan', 'aizu']) {
    for (const t of lineTrips[lineId]) {
      if (t.trainType === 'limitedExp' || isLibertyTrip(t)) {
        t.cars = 3;
        fixedCounts[lineId]++;
      }
    }
  }

  console.log(
    `[coupleTobuExpress] 特急両数是正完了: スカイツリー=${fixedCounts.tobu_skytree}, 日光=${fixedCounts.tobu_nikko}, 鬼怒川=${fixedCounts.tobu_kinugawa}, 野岩=${fixedCounts.yagan}, 会津=${fixedCounts.aizu}`
  );

  for (const [lineId, filePath] of Object.entries(linePaths)) {
    safeWriteJson(filePath, lineTrips[lineId]);
  }

  console.log(`✅ 東武併結特急カップリング完了: 合計 ${coupledCount} トリップに coupling 設定を付与しました`);
}

module.exports = {
  coupleTobuExpress,
};
