const fs = require('fs');
const path = require('path');

function safeWriteJson(filePath, data) {
  const content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, content, 'utf8');
}

function normalizeTrainNumber(rawNo) {
  if (!rawNo) return '';
  const trimmed = rawNo.trim();
  if (trimmed.includes('+')) {
    return trimmed.split('+').map(p => normalizeTrainNumber(p.trim())).join(' + ');
  }
  if (trimmed.endsWith('レ') || /[a-zA-Z]$/.test(trimmed)) {
    return trimmed;
  }
  if (/^\d{6}$/.test(trimmed)) {
    return `${trimmed.slice(0, 3)}-${trimmed.slice(3)}レ`;
  }
  if (/^\d{3}-\d{3}$/.test(trimmed)) {
    return `${trimmed}レ`;
  }
  if (/^\d+$/.test(trimmed)) {
    return `${trimmed}レ`;
  }
  return trimmed;
}

function enrichLine(lineId, displayName, customMapper = null) {
  console.log(`\n=== 🚆 ${displayName} (${lineId}) 公式列車番号エンリッチメント開始 ===`);

  const globalPath = path.resolve(`src/data/lines/${lineId}/globalTimetable.json`);
  const stationPath = path.resolve(`src/data/lines/${lineId}/stationTimetables.json`);
  const cacheDir = path.resolve(`scripts/cache/yahoo/${lineId}/stations`);
  const detailsPath = path.resolve(`scripts/cache/yahoo/${lineId}/all_train_details.json`);

  if (!fs.existsSync(globalPath)) {
    console.warn(`globalTimetable not found for ${lineId}`);
    return;
  }

  // 1. 駅時刻表キャッシュから vendorTrainId, trainName を収集
  const trainInfoMap = new Map(); // `${dayKey}_${trainId}` -> { vendorTrainId, trainName }
  if (fs.existsSync(cacheDir)) {
    const files = fs.readdirSync(cacheDir).filter(f => f.endsWith('.json'));
    for (const f of files) {
      const isHoliday = f.includes('_k4');
      const dayKey = isHoliday ? 'holiday' : 'weekday';
      const data = JSON.parse(fs.readFileSync(path.join(cacheDir, f), 'utf8'));
      const tt = data?.timetableItem;
      for (const h of tt?.hourTimeTable || []) {
        for (const t of h.minTimeTable || []) {
          if (t.trainId) {
            const key = `${dayKey}_${t.trainId}`;
            if (!trainInfoMap.has(key)) {
              trainInfoMap.set(key, {
                vendorTrainId: t.vendorTrainId,
                trainName: t.trainName,
              });
            }
          }
        }
      }
    }
  }

  // 2. all_train_details.json から displayName を収集
  const detailsMap = new Map();
  if (fs.existsSync(detailsPath)) {
    const details = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));
    for (const d of details) {
      detailsMap.set(d.trainId, d);
    }
  }

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const stationTimetables = fs.existsSync(stationPath) ? JSON.parse(fs.readFileSync(stationPath, 'utf8')) : null;

  let matchedCount = 0;
  let fallbackCount = 0;
  const trainIdToOfficialNo = new Map();

  for (const trip of trips) {
    const originalId = trip.trainId || trip.trainNumber;
    trip.trainId = originalId;

    const dayKey = trip.isHoliday ? 'holiday' : 'weekday';
    const key = `${dayKey}_${originalId}`;
    const info = trainInfoMap.get(key);
    const detail = detailsMap.get(originalId);

    let officialNo = null;

    // 1. vendorTrainId があれば最優先
    if (info && info.vendorTrainId) {
      officialNo = normalizeTrainNumber(info.vendorTrainId);
    }

    // 2. customMapper があれば適用
    if (!officialNo && customMapper) {
      officialNo = customMapper(trip, info, detail);
    }

    // 3. trainName / displayName からの号数抽出
    if (!officialNo) {
      const name = info?.trainName || detail?.displayName || '';
      // 特急名（つばさ121号 -> 121M、こまち1号 -> 3001M、踊り子1号 -> 3021M、ふじさん1号 -> 0001レ等）
      const tsubasaMatch = name.match(/つばさ(\d+)号/);
      if (tsubasaMatch) {
        officialNo = `${tsubasaMatch[1]}M`;
      }
      const komachiMatch = name.match(/こまち(\d+)号/);
      if (komachiMatch) {
        officialNo = `${3000 + parseInt(komachiMatch[1], 10)}M`;
      }
      const odorikoMatch = name.match(/踊り子(\d+)号/);
      if (odorikoMatch) {
        // 修善寺踊り子は4020番台、下田踊り子は3020番台 / 8060番台
        const num = parseInt(odorikoMatch[1], 10);
        if (lineId === 'izuhakone_sunzu') {
          officialNo = `${4020 + num}M`;
        } else {
          officialNo = `${3020 + num}M`;
        }
      }
      const fujiMatch = name.match(/ふじさん(\d+)号/);
      if (fujiMatch) {
        const num = parseInt(fujiMatch[1], 10);
        officialNo = `${String(num).padStart(4, '0')}レ`;
      }
      const fujiKaiyuMatch = name.match(/富士回遊(\d+)号/);
      if (fujiKaiyuMatch) {
        const num = parseInt(fujiKaiyuMatch[1], 10);
        officialNo = `${2100 + num}M`;
      }
    }

    // 4. フォールバック
    if (officialNo) {
      trip.trainNumber = normalizeTrainNumber(officialNo);
      trainIdToOfficialNo.set(originalId, trip.trainNumber);
      matchedCount++;
    } else {
      // 純数字IDはレ付きに正規化
      trip.trainNumber = normalizeTrainNumber(originalId);
      trainIdToOfficialNo.set(originalId, trip.trainNumber);
      fallbackCount++;
    }
  }

  console.log(`GlobalTimetable 処理完了: 全 ${trips.length} 便`);
  console.log(`  公式列車番号突合: ${matchedCount} 便`);
  console.log(`  通常番号正規化: ${fallbackCount} 便`);
  safeWriteJson(globalPath, trips);

  // 駅時刻表 (stationTimetables.json) 同期
  if (stationTimetables) {
    let stUpdatedCount = 0;
    for (const day of ['weekday', 'holiday', 'weekdays', 'holidays']) {
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
    safeWriteJson(stationPath, stationTimetables);
    console.log(`StationTimetables 同期更新完了: ${stUpdatedCount} 件`);
  }
}

function run() {
  enrichLine('yamagata_shinkansen', 'JR山形新幹線');
  enrichLine('akita_shinkansen', 'JR秋田新幹線');
  enrichLine('gotemba', 'JR御殿場線');
  enrichLine('izukyu', '伊豆急行線');
  enrichLine('izuhakone_sunzu', '伊豆箱根鉄道駿豆線');
  enrichLine('fujikyu', '富士急行線');
  console.log('\n🎉 All 6 lines enriched with official train numbers!');
}

run();
