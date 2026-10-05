const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const config = require('./lines/kawagoe/config.cjs');
const YahooTimetableBuilder = require('./common/yahoo/YahooTimetableBuilder.cjs');

console.log('=== 川越線 タイムテーブル統合開始 ===');

// 1. Gitのコミット済みデータ（大宮〜川越の埼京線連携データ 280本）をロード
const gitGlobalRaw = execSync('git show HEAD~1:src/data/lines/kawagoe/globalTimetable.json', {
  maxBuffer: 50 * 1024 * 1024,
  encoding: 'utf8'
});
const bakTrips = JSON.parse(gitGlobalRaw);

const gitStationRaw = execSync('git show HEAD~1:src/data/lines/kawagoe/stationTimetables.json', {
  maxBuffer: 50 * 1024 * 1024,
  encoding: 'utf8'
});
const bakStations = JSON.parse(gitStationRaw);

// 2. all_train_details.json から川越線全列車をフレッシュビルド
const detailsPath = path.resolve('scripts/cache/yahoo/kawagoe/all_train_details.json');
const details = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));

const builder = new YahooTimetableBuilder(config);
const freshTrips = builder.buildGlobalTimetable(details);

console.log(`Git HEAD トリップ数: ${bakTrips.length} 本`);
console.log(`フレッシュビルド全トリップ数: ${freshTrips.length} 本`);

// 南古谷発の八高線・高麗川直通出庫列車 (JA-30 -> JA-36)
const crossTrainIds = new Set(['24551', '24549', '24553', '24550', '27902', '24552']);

// 既存トリップから切断された古い出庫便を除外
const validBakTrips = bakTrips.filter(t => !crossTrainIds.has(t.trainId || t.trainNumber));

// 新規ビルドデータから、川越以西完結トリップ (JA-31〜JA-36) および 南古谷発直通出庫便 (JA-30〜JA-36) を抽出
const westAndCrossTrips = freshTrips.filter(t => {
  const oNum = parseInt(t.originStationId.replace('JA-', ''), 10);
  const dNum = parseInt(t.destinationStationId.replace('JA-', ''), 10);
  const tId = t.trainId || t.trainNumber;
  return (oNum >= 31 && dNum >= 31) || crossTrainIds.has(tId);
});

console.log(`新規 川越〜高麗川 区間・出庫直通トリップ: ${westAndCrossTrips.length} 本`);

// トリップの整形 (cars: 4, trainId保持, isHoliday設定)
for (const trip of westAndCrossTrips) {
  trip.cars = 4;
  trip.trainId = trip.trainId || trip.trainNumber;
  if (trip.isHoliday === undefined) {
    trip.isHoliday = trip.tripId.startsWith('HD_');
  }
}

// 既存トリップ + 新規トリップ を結合
const mergedTrips = [...validBakTrips, ...westAndCrossTrips];

// 出発時刻順にソート
mergedTrips.sort((a, b) => {
  if (a.isHoliday !== b.isHoliday) return a.isHoliday ? 1 : -1;
  const aTime = a.stops[0]?.departureTime || '00:00:00';
  const bTime = b.stops[0]?.departureTime || '00:00:00';
  return aTime.localeCompare(bTime);
});

console.log(`統合後 全トリップ数: ${mergedTrips.length} 本 (既存大宮側: ${validBakTrips.length} + 新規高麗川側: ${westAndCrossTrips.length})`);

// 3. 駅時刻表の統合
const currentStations = JSON.parse(fs.readFileSync('src/data/lines/kawagoe/stationTimetables.json', 'utf8'));
const mergedStationTimetables = { weekday: {}, holiday: {} };

for (const day of ['weekday', 'holiday']) {
  const bakDay = bakStations[day] || {};
  const curDay = currentStations[day] || {};

  // JA-26 〜 JA-30: 既存の完成データを使用
  for (let n = 26; n <= 30; n++) {
    const stId = `JA-${n}`;
    if (bakDay[stId]) {
      mergedStationTimetables[day][stId] = bakDay[stId];
    }
  }

  // JA-31 (川越駅): inbound は既存(大宮方面)、outbound は新規(高麗川方面)
  mergedStationTimetables[day]['JA-31'] = {
    inbound: bakDay['JA-31']?.inbound || [],
    outbound: curDay['JA-31']?.outbound || [],
  };

  // JA-32 〜 JA-36: 新規データを使用
  for (let n = 32; n <= 36; n++) {
    const stId = `JA-${n}`;
    if (curDay[stId]) {
      mergedStationTimetables[day][stId] = curDay[stId];
    }
  }
}

// ファイル書き出し
fs.writeFileSync('src/data/lines/kawagoe/globalTimetable.json', JSON.stringify(mergedTrips, null, 2), 'utf8');
fs.writeFileSync('src/data/lines/kawagoe/stationTimetables.json', JSON.stringify(mergedStationTimetables, null, 2), 'utf8');
console.log('✅ 川越線の globalTimetable.json および stationTimetables.json を正常に統合・更新しました！\n');
