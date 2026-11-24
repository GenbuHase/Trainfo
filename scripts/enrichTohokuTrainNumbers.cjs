// 駅探キャッシュ（scripts/cache/ekitan_tohoku_6lines.json）を用いて
// 仙台市地下鉄南北線・東西線、弘南鉄道弘南線・大鰐線、津軽鉄道線、福島交通飯坂線の
// globalTimetable.json / stationTimetables.json に公式列車番号を注入するスクリプト
const fs = require('fs');
const path = require('path');

const TARGET_LINES = [
  'sendai_subway_namboku',
  'sendai_subway_tozai',
  'konan_konan',
  'konan_owani',
  'tsugaru_railway',
  'fukushima_iizaka',
];

function normName(s) {
  return (s || '')
    .replace(/\([^)]*\)/g, '')
    .replace(/（[^）]*）/g, '')
    .replace(/ヶ/g, 'ケ')
    .replace(/駅$/g, '')
    .trim();
}

function normalizeTrainNumber(rawNo) {
  if (!rawNo) return '';
  const trimmed = rawNo.trim();
  if (trimmed.endsWith('レ') || /[a-zA-Z]$/.test(trimmed)) return trimmed;
  if (/^\d+$/.test(trimmed)) return `${trimmed}レ`;
  return trimmed;
}

function extractStationIdToName(stationsTsPath) {
  const src = fs.readFileSync(stationsTsPath, 'utf8');
  const arr = JSON.parse(src.slice(src.indexOf('= [') + 2, src.lastIndexOf(']') + 1));
  const map = new Map();
  for (const s of arr) map.set(s.id, normName(s.name));
  return map;
}

function main() {
  const ekitanPath = path.resolve(__dirname, 'cache/ekitan_tohoku_6lines.json');
  if (!fs.existsSync(ekitanPath)) {
    throw new Error(`Missing Ekitan cache: ${ekitanPath}`);
  }
  const ekitanAll = JSON.parse(fs.readFileSync(ekitanPath, 'utf8'));

  for (const lineId of TARGET_LINES) {
    const dir = path.resolve(__dirname, `../src/data/lines/${lineId}`);
    const globalPath = path.join(dir, 'globalTimetable.json');
    const stPath = path.join(dir, 'stationTimetables.json');
    const stationsTsPath = path.join(dir, 'stations.ts');

    if (!fs.existsSync(globalPath) || !fs.existsSync(stPath)) {
      console.log(`⚠️ Skipping ${lineId}: timetable JSON not ready yet`);
      continue;
    }

    const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
    const stTimetables = JSON.parse(fs.readFileSync(stPath, 'utf8'));
    const stIdToName = extractStationIdToName(stationsTsPath);
    const lineEkitan = ekitanAll[lineId] || { weekday: {}, holiday: {} };

    const trainIdToOfficialNo = new Map();
    let matchedCount = 0;
    let fallbackCount = 0;

    for (const trip of trips) {
      const originalId = trip.trainId || trip.trainNumber;
      trip.trainId = originalId;
      const dayKey = trip.isHoliday ? 'holiday' : 'weekday';
      const dayEkitan = lineEkitan[dayKey] || {};
      const destNorm = normName(trip.customDestination || stIdToName.get(trip.stops[trip.stops.length - 1]?.stationId) || '');

      let officialNo = '';
      for (const stop of trip.stops) {
        if (stop.isPassing || !stop.departureTime) continue;
        const stName = stIdToName.get(stop.stationId);
        const hhmm = stop.departureTime.slice(0, 5);
        const list = dayEkitan[stName] || [];
        const cands = list.filter((e) => e.departureTime === hhmm && e.rawTrainNo);
        if (cands.length === 1) {
          officialNo = cands[0].rawTrainNo;
          break;
        } else if (cands.length > 1) {
          const exactDest = cands.find((c) => c.destination === destNorm || c.destination.includes(destNorm) || destNorm.includes(c.destination));
          officialNo = (exactDest || cands[0]).rawTrainNo;
          break;
        }
      }

      if (officialNo) {
        trip.trainNumber = normalizeTrainNumber(officialNo);
        trainIdToOfficialNo.set(originalId, trip.trainNumber);
        matchedCount++;
      } else {
        trainIdToOfficialNo.set(originalId, trip.trainNumber || originalId);
        fallbackCount++;
      }
    }

    let stUpdated = 0;
    for (const day of ['weekday', 'holiday']) {
      const dayData = stTimetables[day] || {};
      for (const stId of Object.keys(dayData)) {
        for (const d of ['inbound', 'outbound']) {
          for (const dep of dayData[stId][d] || []) {
            const lookupId = dep.trainId || dep.no;
            if (lookupId && trainIdToOfficialNo.has(lookupId)) {
              dep.trainId = lookupId;
              dep.no = trainIdToOfficialNo.get(lookupId);
              stUpdated++;
            }
          }
        }
      }
    }

    fs.writeFileSync(globalPath, JSON.stringify(trips, null, 2), 'utf8');
    fs.writeFileSync(stPath, JSON.stringify(stTimetables, null, 2), 'utf8');
    console.log(`✅ ${lineId}: ${trips.length} trips (matched=${matchedCount}, fallback=${fallbackCount}), stationTimetables=${stUpdated} updated`);
  }
}

main();
