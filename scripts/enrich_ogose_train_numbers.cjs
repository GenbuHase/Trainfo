// 東武越生線 公式列車番号エンリッチメントスクリプト
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
  if (trimmed.endsWith('レ')) {
    return trimmed;
  }
  // A589, B581, 1001 など
  if (/^[A-Za-z]?\d+$/.test(trimmed)) {
    return `${trimmed}レ`;
  }
  return trimmed;
}

function enrichOgose() {
  console.log('=== 東武越生線 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve(__dirname, '../src/data/lines/ogose/globalTimetable.json');
  const stationPath = path.resolve(__dirname, '../src/data/lines/ogose/stationTimetables.json');
  const ekitanPath = path.resolve(__dirname, 'cache/ekitan_ogose_timetables.json');

  if (!fs.existsSync(globalPath) || !fs.existsSync(ekitanPath)) {
    throw new Error('東武越生線の必要なデータファイルが見つかりません。');
  }

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const ekitanData = JSON.parse(fs.readFileSync(ekitanPath, 'utf8'));
  const stationTimetables = JSON.parse(fs.readFileSync(stationPath, 'utf8'));

  let matchedFromEkitan = 0;
  let fallbackCount = 0;

  const trainIdToOfficialNo = new Map();

  for (const trip of trips) {
    const originalId = trip.trainId || trip.trainNumber;
    trip.trainId = originalId;

    const isHoliday = trip.isHoliday;
    const dayKey = isHoliday ? 'holiday' : 'weekday';

    let officialNo = '';

    // 1. 始発駅での突合
    const firstStop = trip.stops.find((s) => !s.isPassing && s.departureTime);
    if (firstStop) {
      const stId = firstStop.stationId;
      const [hStr, mStr] = firstStop.departureTime.split(':');
      const h = parseInt(hStr, 10);
      const m = parseInt(mStr, 10);
      const ekitanDeps = ekitanData[stId]?.[dayKey]?.[trip.direction] || [];
      const matched = ekitanDeps.find((d) => d.h === h && d.m === m);
      if (matched && matched.no) {
        officialNo = matched.no;
        matchedFromEkitan++;
      }
    }

    // 2. 途中駅での突合フォールバック
    if (!officialNo) {
      for (const stop of trip.stops) {
        if (stop.isPassing || !stop.departureTime) continue;
        const stId = stop.stationId;
        const [hStr, mStr] = stop.departureTime.split(':');
        const h = parseInt(hStr, 10);
        const m = parseInt(mStr, 10);
        const ekitanDeps = ekitanData[stId]?.[dayKey]?.[trip.direction] || [];
        const matched = ekitanDeps.find((d) => d.h === h && d.m === m);
        if (matched && matched.no) {
          officialNo = matched.no;
          matchedFromEkitan++;
          break;
        }
      }
    }

    if (officialNo) {
      trip.trainNumber = normalizeTrainNumber(officialNo);
      trainIdToOfficialNo.set(originalId, trip.trainNumber);
    } else {
      fallbackCount++;
      trip.trainNumber = originalId;
      trainIdToOfficialNo.set(originalId, originalId);
    }
  }

  console.log(`GlobalTimetable 処理完了: 全 ${trips.length} 便`);
  console.log(`  駅探データより突合: ${matchedFromEkitan} 便`);
  console.log(`  未突合(フォールバック): ${fallbackCount} 便`);

  // stationTimetables.json の同期更新
  let stUpdatedCount = 0;
  for (const day of ['weekday', 'holiday']) {
    const dayData = stationTimetables[day] || {};
    for (const stId of Object.keys(dayData)) {
      const stDirs = dayData[stId] || {};
      for (const dir of ['inbound', 'outbound']) {
        const deps = stDirs[dir] || [];
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
  console.log(`StationTimetables 同期更新完了: ${stUpdatedCount} 件`);

  fs.writeFileSync(globalPath, JSON.stringify(trips, null, 2), 'utf8');
  fs.writeFileSync(stationPath, JSON.stringify(stationTimetables, null, 2), 'utf8');
  console.log('✅ 東武越生線の globalTimetable.json および stationTimetables.json を正常に更新しました！\n');
}

enrichOgose();
