const fs = require('fs');
const path = require('path');
const config = require('../../lines/tobu_skytree/config.cjs');
const YahooTimetableBuilder = require('../yahoo/YahooTimetableBuilder.cjs');

/**
 * tobu_skytree の globalTimetable.json をキャッシュから再ビルド
 * （deduplicateLineTrips で消去されていた 25154 等の併結列車を復元）
 */
function restoreSkytreeTrips() {
  const outPath = path.resolve('src/data/lines/tobu_skytree/globalTimetable.json');
  if (fs.existsSync(outPath)) {
    const existing = JSON.parse(fs.readFileSync(outPath, 'utf8'));
    const hasLibertyAizu = existing.some(t =>
      t.trainId === '25154' ||
      t.trainNumber === '25154' ||
      t.trainNumber === '1101レ' ||
      (t.tripId && t.tripId.includes('25154'))
    );
    if (hasLibertyAizu) {
      console.log('[coupleTobuExpress] tobu_skytree trips already intact, skipping rebuild');
      return;
    }
  }

  const cachePath = path.resolve('scripts/cache/yahoo/tobu_skytree/all_train_details.json');
  if (!fs.existsSync(cachePath)) {
    console.warn('[coupleTobuExpress] tobu_skytree cache not found:', cachePath);
    return;
  }
  const details = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  const builder = new YahooTimetableBuilder(config);
  const trips = builder.buildGlobalTimetable(details);
  fs.writeFileSync(outPath, JSON.stringify(trips, null, 2), 'utf8');
  console.log(`[coupleTobuExpress] Restored ${trips.length} trips in tobu_skytree/globalTimetable.json`);
}

/**
 * トリップが指定したYahoo trainIdに一致するか判定
 */
function matchesTripId(trip, isHoliday, direction, targetId) {
  if (!trip || trip.isHoliday !== isHoliday || trip.direction !== direction) return false;
  return (
    trip.trainId === targetId ||
    trip.trainNumber === targetId ||
    (trip.tripId && trip.tripId.endsWith(`_${targetId}`))
  );
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
      const skyNikko = skytree.find(t => matchesTripId(t, isHoliday, 'outbound', pair.nikkoId));
      const skyOther = skytree.find(t => matchesTripId(t, isHoliday, 'outbound', pair.otherId));

      if (skyNikko && skyOther) {
        skyNikko.cars = 3;
        skyOther.cars = 3;
        skyNikko.customDestination = '東武日光';
        skyOther.customDestination = pair.otherDest;
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
      const nikkoTrip = nikko.find(t => matchesTripId(t, isHoliday, 'outbound', pair.nikkoId));
      const otherTrip = nikko.find(t => matchesTripId(t, isHoliday, 'outbound', pair.otherId));

      if (nikkoTrip && otherTrip) {
        nikkoTrip.cars = 3;
        otherTrip.cars = 3;
        nikkoTrip.customDestination = '東武日光';
        otherTrip.customDestination = pair.otherDest;
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
      const nikkoTrip = nikko.find(t => matchesTripId(t, isHoliday, 'inbound', pair.nikkoId));
      const otherTrip = nikko.find(t => matchesTripId(t, isHoliday, 'inbound', pair.otherId));

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
      const skyNikko = skytree.find(t => matchesTripId(t, isHoliday, 'inbound', pair.nikkoId));
      const skyOther = skytree.find(t => matchesTripId(t, isHoliday, 'inbound', pair.otherId));

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

  // ---------------- 特急両数の正常化（リバティ3両化・スペーシア6両化） ----------------
  console.log('[coupleTobuExpress] 特急列車の編成両数（リバティ3両・スペーシア6両）の正常化開始...');
  const kinugawaPath = path.resolve('src/data/lines/tobu_kinugawa/globalTimetable.json');
  const yaganPath = path.resolve('src/data/lines/yagan/globalTimetable.json');
  const aizuPath = path.resolve('src/data/lines/aizu/globalTimetable.json');

  const kinugawa = JSON.parse(fs.readFileSync(kinugawaPath, 'utf8'));
  const yagan = JSON.parse(fs.readFileSync(yaganPath, 'utf8'));
  const aizu = JSON.parse(fs.readFileSync(aizuPath, 'utf8'));

  const LIBERTY_IDS = new Set([
    // 会津
    '25154', '25151', '25152', '25153', '42865', '42866', '42868', '42867',
    // きぬ
    '116490', '116504', '116501', '116488', '116489', '116499', '116500',
    // けごん
    '25109', '25116', '25120', '25123', '25124', '25126', '25128', '25129', '25130', '25131', '25132',
    '38046', '38047', '38050', '38055', '38060', '38065',
    // りょうもう
    '116453', '116454'
  ]);

  function isLibertyTrip(trip) {
    if (!trip) return false;
    const id = trip.trainId || (trip.tripId && trip.tripId.split('_').pop());
    if (id && LIBERTY_IDS.has(id)) return true;
    if (trip.trainNumber && /^(1001|1003|1013|1014|1018|1019|1027|1028|1031|1035|1036|1042|1043|1046|1047|1049|1101|1105|1109|1113|1114|1119|1122|1124|1127|1128|1131|1136|1142|1146|1154|1255)レ?$/.test(trip.trainNumber)) return true;
    if (trip.trainNumber && /^(1101|1113|1119|1131|1128|1136|1142|1154)M$/.test(trip.trainNumber)) return true;
    if (trip.trainName && trip.trainName.includes('リバティ')) return true;
    return false;
  }

  // 1. スカイツリーラインの特急両数是正（デフォルト10両から、リバティ3両・他特急6両へ）
  let skyExpFixed = 0;
  for (const t of skytree) {
    if (t.trainType === 'limitedExp') {
      if (t.coupling) {
        t.cars = 3;
      } else if (isLibertyTrip(t)) {
        t.cars = 3;
        skyExpFixed++;
      } else {
        t.cars = 6;
        skyExpFixed++;
      }
    }
  }

  // 2. 日光線の特急両数是正（単独リバティを3両へ）
  let nikkoExpFixed = 0;
  for (const t of nikko) {
    if (t.trainType === 'limitedExp' && !t.coupling && isLibertyTrip(t)) {
      t.cars = 3;
      nikkoExpFixed++;
    }
  }

  // 3. 鬼怒川線の特急両数是正（リバティを3両へ）
  let kinuExpFixed = 0;
  for (const t of kinugawa) {
    if (t.trainType === 'limitedExp' && isLibertyTrip(t)) {
      t.cars = 3;
      kinuExpFixed++;
    }
  }

  // 4. 野岩鉄道の特急両数是正（デフォルト2両からリバティ3両へ）
  let yaganExpFixed = 0;
  for (const t of yagan) {
    if (t.trainType === 'limitedExp' || isLibertyTrip(t)) {
      t.cars = 3;
      yaganExpFixed++;
    }
  }

  // 5. 会津鉄道の特急両数是正（デフォルト2両からリバティ3両へ）
  let aizuExpFixed = 0;
  for (const t of aizu) {
    if (t.trainType === 'limitedExp' || isLibertyTrip(t)) {
      t.cars = 3;
      aizuExpFixed++;
    }
  }

  console.log(`[coupleTobuExpress] 特急両数是正完了: スカイツリー=${skyExpFixed}, 日光=${nikkoExpFixed}, 鬼怒川=${kinuExpFixed}, 野岩=${yaganExpFixed}, 会津=${aizuExpFixed}`);

  fs.writeFileSync(skytreePath, JSON.stringify(skytree, null, 2), 'utf8');
  fs.writeFileSync(nikkoPath, JSON.stringify(nikko, null, 2), 'utf8');
  fs.writeFileSync(kinugawaPath, JSON.stringify(kinugawa, null, 2), 'utf8');
  fs.writeFileSync(yaganPath, JSON.stringify(yagan, null, 2), 'utf8');
  fs.writeFileSync(aizuPath, JSON.stringify(aizu, null, 2), 'utf8');

  console.log(`✅ 東武併結特急カップリング完了: 合計 ${coupledCount} トリップに coupling 設定を付与しました`);
}

module.exports = {
  coupleTobuExpress,
};
