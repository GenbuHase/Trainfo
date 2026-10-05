const fs = require('fs');
const path = require('path');

const globalPath = path.resolve('src/data/lines/kawagoe/globalTimetable.json');
const stationPath = path.resolve('src/data/lines/kawagoe/stationTimetables.json');

const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
const stationTimetables = JSON.parse(fs.readFileSync(stationPath, 'utf8'));

// 1. キャッシュから trainId -> vendorTrainId の辞書を構築
const cacheDir = path.resolve('scripts/cache/yahoo/kawagoe/stations');
const files = fs.readdirSync(cacheDir).filter(f => f.endsWith('.json'));

const trainIdToVendorNo = new Map(); // `${dayKey}_${trainId}` -> vendorTrainId

for (const file of files) {
  const filePath = path.join(cacheDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const isHoliday = file.includes('_k4.json');
  const dayKey = isHoliday ? 'holiday' : 'weekday';

  for (const h of data.timetableItem?.hourTimeTable || []) {
    for (const t of h.minTimeTable || []) {
      if (t.trainId && t.vendorTrainId) {
        trainIdToVendorNo.set(`${dayKey}_${t.trainId}`, t.vendorTrainId);
        trainIdToVendorNo.set(t.trainId, t.vendorTrainId);
      }
    }
  }
}

console.log(`収集した vendorTrainId マッピング数: ${trainIdToVendorNo.size}`);

// 2. globalTimetable.json のエンリッチメント
let westEnriched = 0;
for (const trip of trips) {
  const oNum = parseInt(trip.originStationId.replace('JA-', ''), 10);
  const dNum = parseInt(trip.destinationStationId.replace('JA-', ''), 10);
  // 川越以西 (JA-31〜JA-36) のみ対象
  if (oNum >= 31 && dNum >= 31) {
    const rawId = trip.trainId || trip.trainNumber;
    trip.trainId = rawId;

    const dayKey = trip.isHoliday ? 'holiday' : 'weekday';
    const vendorNo = trainIdToVendorNo.get(`${dayKey}_${rawId}`) || trainIdToVendorNo.get(rawId);
    if (vendorNo) {
      trip.trainNumber = vendorNo;
      westEnriched++;
    }
  }
}

console.log(`GlobalTimetable 西区間エンリッチ完了: ${westEnriched} / 180 本`);

// 3. stationTimetables.json のエンリッチメント (JA-31 outbound および JA-32〜JA-36)
let stEnriched = 0;
for (const day of ['weekday', 'holiday']) {
  const dayData = stationTimetables[day] || {};

  // JA-31 outbound
  if (dayData['JA-31']?.outbound) {
    for (const dep of dayData['JA-31'].outbound) {
      const rawId = dep.trainId || dep.no;
      dep.trainId = rawId;
      const vendorNo = trainIdToVendorNo.get(`${day}_${rawId}`) || trainIdToVendorNo.get(rawId);
      if (vendorNo) {
        dep.no = vendorNo;
        stEnriched++;
      }
    }
  }

  // JA-32 〜 JA-36
  for (let n = 32; n <= 36; n++) {
    const stId = `JA-${n}`;
    if (dayData[stId]) {
      for (const dir of ['inbound', 'outbound']) {
        for (const dep of dayData[stId][dir] || []) {
          const rawId = dep.trainId || dep.no;
          dep.trainId = rawId;
          const vendorNo = trainIdToVendorNo.get(`${day}_${rawId}`) || trainIdToVendorNo.get(rawId);
          if (vendorNo) {
            dep.no = vendorNo;
            stEnriched++;
          }
        }
      }
    }
  }
}

console.log(`StationTimetables 西区間エンリッチ完了: ${stEnriched} 件`);

fs.writeFileSync(globalPath, JSON.stringify(trips, null, 2), 'utf8');
fs.writeFileSync(stationPath, JSON.stringify(stationTimetables, null, 2), 'utf8');
console.log('✅ 川越線 (川越〜高麗川) の公式列車番号エンリッチメントが完了しました！');
