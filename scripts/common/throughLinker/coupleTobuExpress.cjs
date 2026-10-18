const fs = require('fs');
const path = require('path');
const config = require('../../lines/tobu_skytree/config.cjs');
const YahooTimetableBuilder = require('../yahoo/YahooTimetableBuilder.cjs');

/**
 * tobu_skytree の globalTimetable.json をキャッシュから再ビルド
 * （deduplicateLineTrips で消去されていた 25154 等の併結列車を復元）
 */
function restoreSkytreeTrips() {
  const cachePath = path.resolve('scripts/cache/yahoo/tobu_skytree/all_train_details.json');
  if (!fs.existsSync(cachePath)) {
    console.warn('[coupleTobuExpress] tobu_skytree cache not found:', cachePath);
    return;
  }
  const details = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  const builder = new YahooTimetableBuilder(config);
  const trips = builder.buildGlobalTimetable(details);
  const outPath = path.resolve('src/data/lines/tobu_skytree/globalTimetable.json');
  fs.writeFileSync(outPath, JSON.stringify(trips, null, 2), 'utf8');
  console.log(`[coupleTobuExpress] Restored ${trips.length} trips in tobu_skytree/globalTimetable.json`);
}

/**
 * 東武特急の併結ペア定義
 */
const DOWN_PAIRS = [
  { nikkoId: '25128', otherId: '25154', otherDest: '会津田島' },
  { nikkoId: '25116', otherId: '25151', otherDest: '会津田島' },
  { nikkoId: '25120', otherId: '25152', otherDest: '会津田島' },
  { nikkoId: '25123', otherId: '116490', otherDest: '鬼怒川温泉' },
  { nikkoId: '25124', otherId: '25153', otherDest: '会津田島' },
];

const UP_PAIRS = [
  { nikkoId: '38046', otherId: '116504' },
  { nikkoId: '38050', otherId: '42865' },
  { nikkoId: '38055', otherId: '42866' },
  { nikkoId: '38065', otherId: '42868' },
  { nikkoId: '38060', otherId: '116501' },
];

function coupleTobuExpress() {
  console.log('\n=== 🔗 東武併結特急（リバティけごん・会津・きぬ等）カップリング設定 ===');

  // 1. スカイツリーラインのトリップ復元
  restoreSkytreeTrips();

  const skytreePath = path.resolve('src/data/lines/tobu_skytree/globalTimetable.json');
  const nikkoPath = path.resolve('src/data/lines/tobu_nikko/globalTimetable.json');

  const skytree = JSON.parse(fs.readFileSync(skytreePath, 'utf8'));
  const nikko = JSON.parse(fs.readFileSync(nikkoPath, 'utf8'));

  let coupledCount = 0;

  for (const isHoliday of [false, true]) {
    // ---------------- 下り列車 ----------------
    for (const pair of DOWN_PAIRS) {
      // 1. スカイツリーライン側 (浅草 -> 東武動物公園)
      const skyNikko = skytree.find(t => t.isHoliday === isHoliday && t.direction === 'outbound' && t.trainNumber === pair.nikkoId);
      const skyOther = skytree.find(t => t.isHoliday === isHoliday && t.direction === 'outbound' && t.trainNumber === pair.otherId);

      if (skyNikko && skyOther) {
        skyNikko.cars = 3;
        skyOther.cars = 3;
        skyNikko.coupling = {
          role: 'PRIMARY',
          fromStationId: 'TSK-01',
          toStationId: 'TSK-30',
          coupledTripId: skyOther.tripId,
          coupledTrainNumber: skyOther.trainNumber,
          coupledCars: 3,
          coupledDestination: pair.otherDest,
        };
        skyOther.coupling = {
          role: 'SECONDARY',
          fromStationId: 'TSK-01',
          toStationId: 'TSK-30',
          coupledTripId: skyNikko.tripId,
          coupledTrainNumber: skyNikko.trainNumber,
          coupledCars: 3,
          coupledDestination: '東武日光',
        };
        coupledCount += 2;
      }

      // 2. 日光線側 (東武動物公園 -> 下今市)
      const nikkoTrip = nikko.find(t => t.isHoliday === isHoliday && t.direction === 'outbound' && t.trainNumber === pair.nikkoId);
      const otherTrip = nikko.find(t => t.isHoliday === isHoliday && t.direction === 'outbound' && t.trainNumber === pair.otherId);

      if (nikkoTrip && otherTrip) {
        nikkoTrip.cars = 3;
        otherTrip.cars = 3;
        nikkoTrip.coupling = {
          role: 'PRIMARY',
          fromStationId: 'TSK-30',
          toStationId: 'TN-23',
          coupledTripId: otherTrip.tripId,
          coupledTrainNumber: otherTrip.trainNumber,
          coupledCars: 3,
          coupledDestination: pair.otherDest,
        };
        otherTrip.coupling = {
          role: 'SECONDARY',
          fromStationId: 'TSK-30',
          toStationId: 'TN-23',
          coupledTripId: nikkoTrip.tripId,
          coupledTrainNumber: nikkoTrip.trainNumber,
          coupledCars: 3,
          coupledDestination: '東武日光',
        };
        coupledCount += 2;
      }
    }

    // ---------------- 上り列車 ----------------
    for (const pair of UP_PAIRS) {
      // 1. 日光線側 (下今市 -> 東武動物公園)
      const nikkoTrip = nikko.find(t => t.isHoliday === isHoliday && t.direction === 'inbound' && t.trainNumber === pair.nikkoId);
      const otherTrip = nikko.find(t => t.isHoliday === isHoliday && t.direction === 'inbound' && t.trainNumber === pair.otherId);

      if (nikkoTrip && otherTrip) {
        nikkoTrip.cars = 3;
        otherTrip.cars = 3;
        nikkoTrip.coupling = {
          role: 'PRIMARY',
          fromStationId: 'TN-23',
          toStationId: 'TSK-30',
          coupledTripId: otherTrip.tripId,
          coupledTrainNumber: otherTrip.trainNumber,
          coupledCars: 3,
          coupledDestination: '浅草',
        };
        otherTrip.coupling = {
          role: 'SECONDARY',
          fromStationId: 'TN-23',
          toStationId: 'TSK-30',
          coupledTripId: nikkoTrip.tripId,
          coupledTrainNumber: nikkoTrip.trainNumber,
          coupledCars: 3,
          coupledDestination: '浅草',
        };
        coupledCount += 2;
      }

      // 2. スカイツリーライン側 (東武動物公園 -> 浅草)
      const skyNikko = skytree.find(t => t.isHoliday === isHoliday && t.direction === 'inbound' && t.trainNumber === pair.nikkoId);
      const skyOther = skytree.find(t => t.isHoliday === isHoliday && t.direction === 'inbound' && t.trainNumber === pair.otherId);

      if (skyNikko && skyOther) {
        skyNikko.cars = 3;
        skyOther.cars = 3;
        skyNikko.coupling = {
          role: 'PRIMARY',
          fromStationId: 'TSK-30',
          toStationId: 'TSK-01',
          coupledTripId: skyOther.tripId,
          coupledTrainNumber: skyOther.trainNumber,
          coupledCars: 3,
          coupledDestination: '浅草',
        };
        skyOther.coupling = {
          role: 'SECONDARY',
          fromStationId: 'TSK-30',
          toStationId: 'TSK-01',
          coupledTripId: skyNikko.tripId,
          coupledTrainNumber: skyNikko.trainNumber,
          coupledCars: 3,
          coupledDestination: '浅草',
        };
        coupledCount += 2;
      }
    }
  }

  fs.writeFileSync(skytreePath, JSON.stringify(skytree, null, 2), 'utf8');
  fs.writeFileSync(nikkoPath, JSON.stringify(nikko, null, 2), 'utf8');
  console.log(`✅ 東武併結特急カップリング完了: 合計 ${coupledCount} トリップに coupling 設定を付与しました`);
}

module.exports = {
  coupleTobuExpress,
};
