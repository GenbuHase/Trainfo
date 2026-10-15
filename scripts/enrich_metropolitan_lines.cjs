// 首都圏主要8路線の公式列車番号エンリッチメントスクリプト
// Yahoo!路線情報の station キャッシュに含まれる vendorTrainId (例: 1621M, 1838E, 4520Y, 423S 等) を
// globalTimetable.json および stationTimetables.json に注入します。

const fs = require('fs');
const path = require('path');

function normalizeTrainNumber(rawNo) {
  if (!rawNo) return '';
  const trimmed = rawNo.trim();
  if (trimmed.includes('+')) {
    return trimmed
      .split('+')
      .map((p) => normalizeTrainNumber(p.trim()))
      .join(' + ');
  }
  if (trimmed.endsWith('レ')) return trimmed;
  if (/[a-zA-Z]$/.test(trimmed)) return trimmed;
  if (/^\d{6}$/.test(trimmed)) return `${trimmed.slice(0, 3)}-${trimmed.slice(3)}レ`;
  if (/^\d{3}-\d{3}$/.test(trimmed)) return `${trimmed}レ`;
  if (/^\d+$/.test(trimmed) || /^Y\d+$/i.test(trimmed)) return `${trimmed}レ`;
  return trimmed;
}

function enrichLine(lineId, lineName) {
  console.log(`\n=== [${lineId}] ${lineName} 公式列車番号エンリッチメント ===`);

  const globalPath = path.resolve(`src/data/lines/${lineId}/globalTimetable.json`);
  const stationPath = path.resolve(`src/data/lines/${lineId}/stationTimetables.json`);
  const cacheDir = path.resolve(`scripts/cache/yahoo/${lineId}/stations`);

  if (!fs.existsSync(globalPath)) {
    console.warn(`  ⚠️ globalTimetable.json が存在しません: ${lineId} (スキップ)`);
    return;
  }
  if (!fs.existsSync(cacheDir)) {
    console.warn(`  ⚠️ station cacheDir が存在しません: ${cacheDir} (スキップ)`);
    return;
  }

  const files = fs.readdirSync(cacheDir).filter(f => f.endsWith('.json'));
  const trainMap = new Map(); // `${dayKey}_${trainId}` -> vendorTrainId
  const fallbackMap = new Map(); // trainId -> vendorTrainId

  for (const f of files) {
    const isHoliday = f.includes('_k4');
    const dayKey = isHoliday ? 'holiday' : 'weekday';
    try {
      const data = JSON.parse(fs.readFileSync(path.join(cacheDir, f), 'utf8'));
      const tt = data?.timetableItem;
      for (const h of tt?.hourTimeTable || []) {
        for (const t of h.minTimeTable || []) {
          if (t.trainId && t.vendorTrainId) {
            const key = `${dayKey}_${t.trainId}`;
            if (!trainMap.has(key)) {
              trainMap.set(key, t.vendorTrainId);
            }
            if (!fallbackMap.has(t.trainId)) {
              fallbackMap.set(t.trainId, t.vendorTrainId);
            }
          }
        }
      }
    } catch (e) {}
  }

  console.log(`  Collected ${trainMap.size} unique vendorTrainIds from ${files.length} cache files.`);

  // globalTimetable.json の更新
  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const stationTimetables = fs.existsSync(stationPath)
    ? JSON.parse(fs.readFileSync(stationPath, 'utf8'))
    : null;

  let matchedCount = 0;
  let fallbackCount = 0;
  const trainIdToOfficialNo = new Map();

  for (const trip of trips) {
    const originalId = trip.trainId || trip.trainNumber;
    trip.trainId = originalId;

    const dayKey = trip.isHoliday ? 'holiday' : 'weekday';
    const key = `${dayKey}_${originalId}`;

    if (trainMap.has(key)) {
      const vendorNo = trainMap.get(key);
      trip.trainNumber = normalizeTrainNumber(vendorNo);
      trainIdToOfficialNo.set(originalId, trip.trainNumber);
      matchedCount++;
    } else if (fallbackMap.has(originalId)) {
      const vendorNo = fallbackMap.get(originalId);
      trip.trainNumber = normalizeTrainNumber(vendorNo);
      trainIdToOfficialNo.set(originalId, trip.trainNumber);
      matchedCount++;
    } else {
      fallbackCount++;
      trip.trainNumber = originalId;
      trainIdToOfficialNo.set(originalId, originalId);
    }
  }

  fs.writeFileSync(globalPath, JSON.stringify(trips, null, 2), 'utf8');
  console.log(`  GlobalTimetable: 全 ${trips.length} 便 (突合: ${matchedCount}, 未突合: ${fallbackCount})`);

  // stationTimetables.json の更新
  if (stationTimetables) {
    let stUpdatedCount = 0;
    for (const day of ['weekday', 'holiday']) {
      const dayData = stationTimetables[day] || {};
      for (const stId of Object.keys(dayData)) {
        for (const dir of ['inbound', 'outbound']) {
          const deps = dayData[stId]?.[dir] || [];
          for (const dep of deps) {
            const lookupId = dep.trainId || dep.no;
            if (lookupId && trainIdToOfficialNo.has(lookupId)) {
              dep.trainId = lookupId;
              dep.no = trainIdToOfficialNo.get(lookupId);
              stUpdatedCount++;
            }
          }
        }
      }
    }
    fs.writeFileSync(stationPath, JSON.stringify(stationTimetables, null, 2), 'utf8');
    console.log(`  StationTimetables: 同期更新 ${stUpdatedCount} 件`);
  }
  console.log(`  ✅ [${lineId}] エンリッチメント完了！`);
}

const targetLines = [
  { id: 'ito', name: 'JR伊東線' },
  { id: 'tokaido', name: 'JR東海道線' },
  { id: 'yokosuka', name: 'JR横須賀線' },
  { id: 'sobu_rapid', name: 'JR総武快速線' },
  { id: 'utsunomiya', name: 'JR宇都宮線' },
  { id: 'takasaki', name: 'JR高崎線' },
  { id: 'shonan_shinjuku', name: 'JR湘南新宿ライン' },
  { id: 'ueno_tokyo', name: 'JR上野東京ライン' },
  { id: 'ryomo', name: 'JR両毛線' },
];

function main() {
  const lineArg = process.argv[2];
  if (lineArg) {
    const found = targetLines.find(l => l.id === lineArg);
    if (found) {
      enrichLine(found.id, found.name);
    } else {
      enrichLine(lineArg, lineArg);
    }
    return;
  }
  for (const line of targetLines) {
    enrichLine(line.id, line.name);
  }
}

main();
