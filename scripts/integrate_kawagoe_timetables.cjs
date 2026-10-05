const fs = require('fs');
const path = require('path');

// 1. バックアップ（既存）データのロード
const bakTrips = JSON.parse(fs.readFileSync('src/data/lines/kawagoe/globalTimetable.bak.json', 'utf8'));
const bakStations = JSON.parse(fs.readFileSync('src/data/lines/kawagoe/stationTimetables.bak.json', 'utf8'));

// 2. 新規スクレイピングデータのロード
const freshTrips = JSON.parse(fs.readFileSync('src/data/lines/kawagoe/globalTimetable.json', 'utf8'));
const freshStations = JSON.parse(fs.readFileSync('src/data/lines/kawagoe/stationTimetables.json', 'utf8'));

console.log('=== 川越線 タイムテーブル統合開始 ===');
console.log(`既存トリップ (大宮〜川越): ${bakTrips.length} 本`);
console.log(`新規スクレイピング全トリップ: ${freshTrips.length} 本`);

// 川越以西 (JA-31〜JA-36) のトリップを抽出
const westTrips = freshTrips.filter(t => {
  const oNum = parseInt(t.originStationId.replace('JA-', ''), 10);
  const dNum = parseInt(t.destinationStationId.replace('JA-', ''), 10);
  return oNum >= 31 && dNum >= 31;
});

console.log(`新規 川越〜高麗川 区間トリップ: ${westTrips.length} 本`);

// West trips の整形 (cars: 4, trainId保持, isHoliday設定)
for (const trip of westTrips) {
  trip.cars = 4;
  trip.trainId = trip.trainId || trip.trainNumber;
  if (trip.isHoliday === undefined) {
    trip.isHoliday = trip.tripId.startsWith('HD_');
  }
}

// 既存トリップ + Westトリップ を結合
const mergedTrips = [...bakTrips, ...westTrips];

// 出発時刻順にソート
mergedTrips.sort((a, b) => {
  if (a.isHoliday !== b.isHoliday) return a.isHoliday ? 1 : -1;
  const aTime = a.stops[0]?.departureTime || '00:00:00';
  const bTime = b.stops[0]?.departureTime || '00:00:00';
  return aTime.localeCompare(bTime);
});

console.log(`統合後 全トリップ数: ${mergedTrips.length} 本`);

// 3. 駅時刻表の統合
const mergedStationTimetables = { weekday: {}, holiday: {} };

for (const day of ['weekday', 'holiday']) {
  const bakDay = bakStations[day] || {};
  const freshDay = freshStations[day] || {};

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
    outbound: freshDay['JA-31']?.outbound || [],
  };

  // JA-32 〜 JA-36: 新規データを使用
  for (let n = 32; n <= 36; n++) {
    const stId = `JA-${n}`;
    if (freshDay[stId]) {
      mergedStationTimetables[day][stId] = freshDay[stId];
    }
  }
}

console.log('統合後 駅時刻表の駅リスト (平日):', Object.keys(mergedStationTimetables.weekday));

// ファイル書き出し
fs.writeFileSync('src/data/lines/kawagoe/globalTimetable.json', JSON.stringify(mergedTrips, null, 2), 'utf8');
fs.writeFileSync('src/data/lines/kawagoe/stationTimetables.json', JSON.stringify(mergedStationTimetables, null, 2), 'utf8');
console.log('✅ 川越線の globalTimetable.json および stationTimetables.json を正常に統合・更新しました！\n');
