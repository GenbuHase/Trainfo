// 公式列車番号エンリッチメントスクリプト
// Yahoo!路線情報ベースのダイヤデータ（globalTimetable.json / stationTimetables.json）に
// 駅探データおよびYahoo guideCommentから公式列車番号を注入し、trainIdとtrainNumberを分離・更新します。

const fs = require('fs');
const path = require('path');

// 列車番号の正規化ルール
function normalizeTrainNumber(rawNo) {
  if (!rawNo) return '';
  const trimmed = rawNo.trim();
  if (trimmed.includes('+')) {
    return trimmed
      .split('+')
      .map((p) => normalizeTrainNumber(p.trim()))
      .join(' + ');
  }
  if (/[a-zA-Zレ]$/.test(trimmed) || trimmed.includes('-')) {
    return trimmed;
  }
  if (/^\d+$/.test(trimmed) || /^Y\d+$/i.test(trimmed)) {
    return `${trimmed}レ`;
  }
  return trimmed;
}

function cleanTrainNo(rawNo) {
  if (!rawNo) return '';
  return rawNo.replace(/^[HK][YF]/, '').replace(/_\d+$/, '').trim();
}

/**
 * 東武東上線のエンリッチメント処理
 */
function enrichTojo() {
  console.log('=== 東武東上線 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/tojo/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/tojo/stationTimetables.json');
  const ekitanPath = path.resolve('scripts/ekitan_all_stations_timetables.json');
  const yahooCachePath = path.resolve('scripts/cache/yahoo/tojo/all_train_details.json');

  if (!fs.existsSync(globalPath) || !fs.existsSync(ekitanPath) || !fs.existsSync(yahooCachePath)) {
    throw new Error('東武東上線の必要なデータファイルが見つかりません。');
  }

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const ekitanData = JSON.parse(fs.readFileSync(ekitanPath, 'utf8'));
  const yahooCache = JSON.parse(fs.readFileSync(yahooCachePath, 'utf8'));
  const stationTimetables = JSON.parse(fs.readFileSync(stationPath, 'utf8'));

  const yahooMap = new Map(yahooCache.map((t) => [t.trainId, t]));

  let matchedFromGuide = 0;
  let matchedFromEkitan = 0;
  let fallbackCount = 0;

  // trainId -> official trainNumber Map (stationTimetables同期用)
  const trainIdToOfficialNo = new Map();

  for (const trip of trips) {
    const originalId = trip.trainId || trip.trainNumber;
    trip.trainId = originalId; // trainId として明示保存

    const isHoliday = trip.isHoliday;
    const dayKey = isHoliday ? 'holiday' : 'weekday';
    const yahooDetail = yahooMap.get(originalId);

    let officialNo = '';

    // 1. Yahoo! guideComment からの区間別列車番号抽出 (直通便)
    if (yahooDetail && yahooDetail.guideComment) {
      const comment = yahooDetail.guideComment;
      const regex = /([^\s−-]+)−([^\s−-]+)間は([A-Za-z0-9-]+)(.+?)で運転/g;
      let m;
      while ((m = regex.exec(comment)) !== null) {
        const fromName = m[1].replace(/^[。、\s]+/, '');
        const toName = m[2];
        const num = m[3];

        if (
          fromName.includes('森林公園') ||
          fromName.includes('小川町') ||
          fromName.includes('川越市') ||
          fromName.includes('志木') ||
          (fromName.includes('和光市') && (toName.includes('森林公園') || toName.includes('小川町') || toName.includes('川越市') || toName.includes('志木')))
        ) {
          officialNo = num;
        }
      }

      if (officialNo) {
        matchedFromGuide++;
      }
    }

    // 2. 駅探データからの突合 (発車駅・発車時刻)
    if (!officialNo) {
      const firstStop = trip.stops.find((s) => !s.isPassing);
      if (firstStop) {
        const stId = firstStop.stationId;
        const [hStr, mStr] = firstStop.departureTime.split(':');
        const h = parseInt(hStr, 10);
        const m = parseInt(mStr, 10);
        const ekitanDeps = ekitanData[dayKey]?.[stId]?.[trip.direction] || [];
        const matched = ekitanDeps.find((d) => d.hour === h && d.minute === m);
        if (matched && matched.trainNo) {
          officialNo = matched.trainNo;
          matchedFromEkitan++;
        }
      }
    }

    // 3. 途中駅での突合
    if (!officialNo) {
      for (const stop of trip.stops) {
        if (stop.isPassing) continue;
        const stId = stop.stationId;
        const [hStr, mStr] = stop.departureTime.split(':');
        const h = parseInt(hStr, 10);
        const m = parseInt(mStr, 10);
        const ekitanDeps = ekitanData[dayKey]?.[stId]?.[trip.direction] || [];
        const matched = ekitanDeps.find((d) => d.hour === h && d.minute === m);
        if (matched && matched.trainNo) {
          officialNo = matched.trainNo;
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
      trainIdToOfficialNo.set(originalId, originalId);
    }
  }

  console.log(`GlobalTimetable 処理完了: 全 ${trips.length} 便`);
  console.log(`  guideComment より抽出: ${matchedFromGuide} 便`);
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
  console.log('✅ 東武東上線の globalTimetable.json および stationTimetables.json を正常に更新しました！\n');
}

/**
 * 東京メトロ有楽町線のエンリッチメント処理
 */
function enrichYurakucho() {
  console.log('=== 東京メトロ有楽町線 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/yurakucho/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/yurakucho/stationTimetables.json');
  const ekitanPath = path.resolve('scripts/ekitan_yurakucho_timetables.json');
  const yahooCachePath = path.resolve('scripts/cache/yahoo/yurakucho/all_train_details.json');

  if (!fs.existsSync(globalPath) || !fs.existsSync(ekitanPath) || !fs.existsSync(yahooCachePath)) {
    throw new Error('東京メトロ有楽町線の必要なデータファイルが見つかりません。');
  }

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const ekitanData = JSON.parse(fs.readFileSync(ekitanPath, 'utf8'));
  const yahooCache = JSON.parse(fs.readFileSync(yahooCachePath, 'utf8'));
  const stationTimetables = JSON.parse(fs.readFileSync(stationPath, 'utf8'));

  const yahooMap = new Map(yahooCache.map((t) => [t.trainId, t]));

  // 有料座席指定列車 S-TRAIN の公式列車番号特別辞書
  // 102号: A602M, 104号: A904M
  const S_TRAIN_SPECIAL = {
    '144439': 'A602M',
    '144440': 'A904M',
  };

  let matchedFromSpecial = 0;
  let matchedFromGuide = 0;
  let matchedFromEkitan = 0;
  let fallbackCount = 0;

  const trainIdToOfficialNo = new Map();

  for (const trip of trips) {
    const originalId = trip.trainId || trip.trainNumber;
    trip.trainId = originalId;

    const isHoliday = trip.isHoliday;
    const dayKey = isHoliday ? 'holiday' : 'weekday';
    const yahooDetail = yahooMap.get(originalId);

    let officialNo = '';

    // 0. S-TRAIN 特別辞書
    if (S_TRAIN_SPECIAL[originalId]) {
      officialNo = S_TRAIN_SPECIAL[originalId];
      matchedFromSpecial++;
    }

    // 1. Yahoo! guideComment からの抽出 (メトロ線内かつ ^[AB] で始まるもの)
    if (!officialNo && yahooDetail && yahooDetail.guideComment) {
      const comment = yahooDetail.guideComment;
      const regex = /([^\s−-]+)−([^\s−-]+)間は([A-Za-z0-9-]+)(.+?)で運転/g;
      let m;
      while ((m = regex.exec(comment)) !== null) {
        const fromName = m[1].replace(/^[。、\s]+/, '');
        const toName = m[2];
        const num = m[3];
        const isMetroSection =
          (fromName.includes('和光市') && toName.includes('新木場')) ||
          (fromName.includes('小竹向原') && toName.includes('新木場')) ||
          (fromName.includes('森林公園') && toName.includes('新木場')) ||
          (fromName.includes('和光市') && toName.includes('有楽町'));
        if (isMetroSection && /^[AB]\d+/.test(num)) {
          officialNo = cleanTrainNo(num);
          matchedFromGuide++;
          break;
        }
      }
    }

    // 2. 駅探データからの突合 (全停車駅)
    if (!officialNo) {
      for (const stop of trip.stops) {
        if (stop.isPassing) continue;
        const [h, m] = stop.departureTime.split(':').map(Number);
        const deps = ekitanData[dayKey]?.[stop.stationId]?.[trip.direction] || [];
        const matched = deps.find((d) => d.hour === h && d.minute === m);
        if (matched && matched.trainNo) {
          officialNo = cleanTrainNo(matched.trainNo);
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
      trainIdToOfficialNo.set(originalId, originalId);
    }
  }

  console.log(`GlobalTimetable 処理完了: 全 ${trips.length} 便`);
  console.log(`  S-TRAIN特別指定: ${matchedFromSpecial} 便`);
  console.log(`  guideComment より抽出: ${matchedFromGuide} 便`);
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
  console.log('✅ 東京メトロ有楽町線の globalTimetable.json および stationTimetables.json を正常に更新しました！\n');
}

/**
 * 東京メトロ副都心線のエンリッチメント処理
 */
function enrichFukutoshin() {
  console.log('=== 東京メトロ副都心線 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/fukutoshin/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/fukutoshin/stationTimetables.json');
  const ekitanPath = path.resolve('scripts/ekitan_fukutoshin_timetables.json');
  const yahooCachePath = path.resolve('scripts/cache/yahoo/fukutoshin/all_train_details.json');

  if (!fs.existsSync(globalPath) || !fs.existsSync(ekitanPath) || !fs.existsSync(yahooCachePath)) {
    throw new Error('東京メトロ副都心線の必要なデータファイルが見つかりません。');
  }

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const ekitanData = JSON.parse(fs.readFileSync(ekitanPath, 'utf8'));
  const yahooCache = JSON.parse(fs.readFileSync(yahooCachePath, 'utf8'));
  const stationTimetables = JSON.parse(fs.readFileSync(stationPath, 'utf8'));

  const yahooMap = new Map(yahooCache.map((t) => [t.trainId, t]));

  let matchedFromGuide = 0;
  let matchedFromEkitan = 0;
  let fallbackCount = 0;

  const trainIdToOfficialNo = new Map();

  for (const trip of trips) {
    const originalId = trip.trainId || trip.trainNumber;
    trip.trainId = originalId;

    const isHoliday = trip.isHoliday;
    const dayKey = isHoliday ? 'holiday' : 'weekday';
    const yahooDetail = yahooMap.get(originalId);

    let officialNo = '';

    // 1. Yahoo! guideComment からの抽出 (メトロ線内かつ ^[AB] で始まるもの)
    if (yahooDetail && yahooDetail.guideComment) {
      const comment = yahooDetail.guideComment;
      const regex = /([^\s−-]+)−([^\s−-]+)間は([A-Za-z0-9-]+)(.+?)で運転/g;
      let m;
      while ((m = regex.exec(comment)) !== null) {
        const fromName = m[1].replace(/^[。、\s]+/, '');
        const toName = m[2];
        const num = m[3];
        const isMetroSection =
          (fromName.includes('和光市') && toName.includes('渋谷')) ||
          (fromName.includes('小竹向原') && toName.includes('渋谷')) ||
          (fromName.includes('森林公園') && toName.includes('渋谷')) ||
          (fromName.includes('志木') && toName.includes('渋谷'));
        if (isMetroSection && /^[AB]\d+/.test(num)) {
          officialNo = cleanTrainNo(num);
          matchedFromGuide++;
          break;
        }
      }
    }

    // 2. 駅探データからの突合 (全停車駅)
    if (!officialNo) {
      for (const stop of trip.stops) {
        if (stop.isPassing) continue;
        const [h, m] = stop.departureTime.split(':').map(Number);
        const deps = ekitanData[dayKey]?.[stop.stationId]?.[trip.direction] || [];
        const matched = deps.find((d) => d.hour === h && d.minute === m);
        if (matched && matched.trainNo) {
          officialNo = cleanTrainNo(matched.trainNo);
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
      trainIdToOfficialNo.set(originalId, originalId);
    }
  }

  console.log(`GlobalTimetable 処理完了: 全 ${trips.length} 便`);
  console.log(`  guideComment より抽出: ${matchedFromGuide} 便`);
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
  console.log('✅ 東京メトロ副都心線の globalTimetable.json および stationTimetables.json を正常に更新しました！\n');
}

// 西武線S-TRAIN特別指定辞書
const SEIBU_SPECIAL = {
  // 平日 S-TRAIN
  '77814': '501M',
  '144439': '502M',
  '77815': '503M',
  '144440': '504M',
  '77816': '505M',
  '77817': '507M',
  '77818': '509M',
  // 休日 S-TRAIN
  '172007': '401レ',
  '144626': '402レ',
  '105731': '403レ',
  '172006': '404レ',
  '105730': '405レ',
};

/**
 * 西武有楽町線のエンリッチメント処理
 */
function enrichSeibuYurakucho() {
  console.log('=== 西武有楽町線 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/seibu_yurakucho/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/seibu_yurakucho/stationTimetables.json');
  const ekitanPath = path.resolve('scripts/ekitan_seibu_yurakucho_timetables.json');
  const yahooCachePath = path.resolve('scripts/cache/yahoo/seibu_yurakucho/all_train_details.json');

  if (!fs.existsSync(globalPath) || !fs.existsSync(ekitanPath) || !fs.existsSync(yahooCachePath)) {
    throw new Error('西武有楽町線の必要なデータファイルが見つかりません。');
  }

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const ekitanData = JSON.parse(fs.readFileSync(ekitanPath, 'utf8'));
  const yahooCache = JSON.parse(fs.readFileSync(yahooCachePath, 'utf8'));
  const stationTimetables = JSON.parse(fs.readFileSync(stationPath, 'utf8'));

  const yahooMap = new Map(yahooCache.map((t) => [t.trainId, t]));

  let matchedSpecial = 0;
  let matchedGuide = 0;
  let matchedEkitan = 0;
  let fallbackCount = 0;

  const trainIdToOfficialNo = new Map();

  for (const trip of trips) {
    const originalId = trip.trainId || trip.trainNumber;
    trip.trainId = originalId;

    const isHoliday = trip.isHoliday;
    const dayKey = isHoliday ? 'holiday' : 'weekday';
    const yahooDetail = yahooMap.get(originalId);

    let officialNo = '';

    // 0. S-TRAIN 特別辞書
    if (SEIBU_SPECIAL[originalId]) {
      officialNo = SEIBU_SPECIAL[originalId];
      matchedSpecial++;
    }

    // 1. guideComment
    if (!officialNo && yahooDetail && yahooDetail.guideComment) {
      const comment = yahooDetail.guideComment;
      const regex = /([^\s−-]+)−([^\s−-]+)間は([A-Za-z0-9-]+)(.+?)で運転/g;
      let m;
      while ((m = regex.exec(comment)) !== null) {
        const fromName = m[1].replace(/^[。、\s]+/, '');
        const toName = m[2];
        const num = m[3];
        const isSeibu =
          fromName.includes('小竹向原') || toName.includes('小竹向原') ||
          fromName.includes('練馬') || toName.includes('練馬') ||
          fromName.includes('清瀬') || toName.includes('清瀬') ||
          fromName.includes('所沢') || toName.includes('所沢') ||
          fromName.includes('小手指') || toName.includes('小手指') ||
          fromName.includes('飯能') || toName.includes('飯能');
        const isMetroTokyu =
          (fromName.includes('和光市') && toName.includes('渋谷')) ||
          (fromName.includes('渋谷') && toName.includes('元町')) ||
          (fromName.includes('新木場') && toName.includes('小竹向原'));
        if (isSeibu && !isMetroTokyu) {
          officialNo = /^\d+$/.test(num) ? `${num}レ` : num;
          matchedGuide++;
          break;
        }
      }
    }

    // 2. 駅探データ
    if (!officialNo) {
      for (const stop of trip.stops) {
        if (stop.isPassing) continue;
        const [h, m] = stop.departureTime.split(':').map(Number);
        const deps = ekitanData[dayKey]?.[stop.stationId]?.[trip.direction] || [];
        const matched = deps.find((d) => d.hour === h && d.minute === m);
        if (matched && matched.trainNo) {
          officialNo = matched.trainNo;
          matchedEkitan++;
          break;
        }
      }
    }

    if (officialNo) {
      trip.trainNumber = normalizeTrainNumber(officialNo);
      trainIdToOfficialNo.set(originalId, trip.trainNumber);
    } else {
      fallbackCount++;
      trainIdToOfficialNo.set(originalId, originalId);
    }
  }

  console.log(`GlobalTimetable 処理完了: 全 ${trips.length} 便`);
  console.log(`  S-TRAIN特別指定: ${matchedSpecial} 便`);
  console.log(`  guideComment より抽出: ${matchedGuide} 便`);
  console.log(`  駅探データより突合: ${matchedEkitan} 便`);
  console.log(`  未突合(フォールバック): ${fallbackCount} 便`);

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
  console.log('✅ 西武有楽町線の globalTimetable.json および stationTimetables.json を正常に更新しました！\n');
}

/**
 * 西武池袋線のエンリッチメント処理
 */
function enrichSeibuIkebukuro() {
  console.log('=== 西武池袋線 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/seibu_ikebukuro/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/seibu_ikebukuro/stationTimetables.json');
  const ekitanPath = path.resolve('scripts/ekitan_seibu_ikebukuro_timetables.json');
  const yahooCachePath = path.resolve('scripts/cache/yahoo/seibu_ikebukuro/all_train_details.json');

  if (!fs.existsSync(globalPath) || !fs.existsSync(ekitanPath) || !fs.existsSync(yahooCachePath)) {
    throw new Error('西武池袋線の必要なデータファイルが見つかりません。');
  }

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const ekitanData = JSON.parse(fs.readFileSync(ekitanPath, 'utf8'));
  const yahooCache = JSON.parse(fs.readFileSync(yahooCachePath, 'utf8'));
  const stationTimetables = JSON.parse(fs.readFileSync(stationPath, 'utf8'));

  const yahooMap = new Map(yahooCache.map((t) => [t.trainId, t]));

  let matchedSpecial = 0;
  let matchedGuide = 0;
  let matchedEkitan = 0;
  let fallbackCount = 0;

  const trainIdToOfficialNo = new Map();

  for (const trip of trips) {
    const originalId = trip.trainId || trip.trainNumber;
    trip.trainId = originalId;

    const isHoliday = trip.isHoliday;
    const dayKey = isHoliday ? 'holiday' : 'weekday';
    const yahooDetail = yahooMap.get(originalId);

    let officialNo = '';

    // 0. S-TRAIN 特別辞書
    if (SEIBU_SPECIAL[originalId]) {
      officialNo = SEIBU_SPECIAL[originalId];
      matchedSpecial++;
    }

    // 1. guideComment
    if (!officialNo && yahooDetail && yahooDetail.guideComment) {
      const comment = yahooDetail.guideComment;
      const regex = /([^\s−-]+)−([^\s−-]+)間は([A-Za-z0-9-]+)(.+?)で運転/g;
      let m;
      while ((m = regex.exec(comment)) !== null) {
        const fromName = m[1].replace(/^[。、\s]+/, '');
        const toName = m[2];
        const num = m[3];
        const isSeibu =
          fromName.includes('小竹向原') || toName.includes('小竹向原') ||
          fromName.includes('練馬') || toName.includes('練馬') ||
          fromName.includes('清瀬') || toName.includes('清瀬') ||
          fromName.includes('所沢') || toName.includes('所沢') ||
          fromName.includes('小手指') || toName.includes('小手指') ||
          fromName.includes('飯能') || toName.includes('飯能');
        const isMetroTokyu =
          (fromName.includes('和光市') && toName.includes('渋谷')) ||
          (fromName.includes('渋谷') && toName.includes('元町')) ||
          (fromName.includes('新木場') && toName.includes('小竹向原'));
        if (isSeibu && !isMetroTokyu) {
          officialNo = /^\d+$/.test(num) ? `${num}レ` : num;
          matchedGuide++;
          break;
        }
      }
    }

    // 2. 駅探データ
    if (!officialNo) {
      for (const stop of trip.stops) {
        if (stop.isPassing) continue;
        const [h, m] = stop.departureTime.split(':').map(Number);
        const deps = ekitanData[dayKey]?.[stop.stationId]?.[trip.direction] || [];
        const matched = deps.find((d) => d.hour === h && d.minute === m);
        if (matched && matched.trainNo) {
          officialNo = matched.trainNo;
          matchedEkitan++;
          break;
        }
      }
    }

    if (officialNo) {
      trip.trainNumber = normalizeTrainNumber(officialNo);
      trainIdToOfficialNo.set(originalId, trip.trainNumber);
    } else {
      fallbackCount++;
      trainIdToOfficialNo.set(originalId, originalId);
    }
  }

  console.log(`GlobalTimetable 処理完了: 全 ${trips.length} 便`);
  console.log(`  S-TRAIN特別指定: ${matchedSpecial} 便`);
  console.log(`  guideComment より抽出: ${matchedGuide} 便`);
  console.log(`  駅探データより突合: ${matchedEkitan} 便`);
  console.log(`  未突合(フォールバック): ${fallbackCount} 便`);

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
  console.log('✅ 西武池袋線の globalTimetable.json および stationTimetables.json を正常に更新しました！\n');
}

/**
 * 首都圏新都市鉄道つくばエクスプレス（TX）のエンリッチメント処理
 */
function enrichTx() {
  console.log('=== つくばエクスプレス 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/tsukuba_express/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/tsukuba_express/stationTimetables.json');
  const ekitanPath = path.resolve('scripts/ekitan_tx_raw_timetables.json');

  if (!fs.existsSync(globalPath) || !fs.existsSync(ekitanPath) || !fs.existsSync(stationPath)) {
    throw new Error('つくばエクスプレスの必要なデータファイルが見つかりません。');
  }

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const ekitanData = JSON.parse(fs.readFileSync(ekitanPath, 'utf8'));
  const stationTimetables = JSON.parse(fs.readFileSync(stationPath, 'utf8'));

  // 駅探データのマップ作成: (dayKey:stId:dir:h:m) -> ekitan item
  const ekitanMap = new Map();
  for (const day of ['weekday', 'holiday']) {
    for (const stId of Object.keys(ekitanData[day] || {})) {
      for (const dir of ['inbound', 'outbound']) {
        for (const item of ekitanData[day][stId][dir] || []) {
          const key = `${day}:${stId}:${dir}:${item.h}:${item.m}`;
          ekitanMap.set(key, item);
        }
      }
    }
  }

  let matchedCount = 0;
  let fallbackCount = 0;
  const trainIdToOfficialNo = new Map();

  for (const trip of trips) {
    const originalId = trip.trainId || trip.trainNumber || '';
    trip.trainId = originalId;

    const dayKey = trip.isHoliday ? 'holiday' : 'weekday';
    const firstStop = trip.stops[0];
    const [hStr, mStr] = firstStop.departureTime.split(':');
    let h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    if (h >= 24) h -= 24;

    const key = `${dayKey}:${trip.originStationId}:${trip.direction}:${h}:${m}`;
    let ekItem = ekitanMap.get(key);

    if (!ekItem) {
      // 始発駅で見つからない場合は途中停車駅から走査
      for (const stop of trip.stops) {
        if (stop.isPassing) continue;
        const [sh, sm] = stop.departureTime.split(':').map(Number);
        const normH = sh >= 24 ? sh - 24 : sh;
        const midKey = `${dayKey}:${stop.stationId}:${trip.direction}:${normH}:${sm}`;
        const item = ekitanMap.get(midKey);
        if (item) {
          ekItem = item;
          break;
        }
      }
    }

    if (ekItem && ekItem.no) {
      trip.trainNumber = normalizeTrainNumber(ekItem.no);
      trainIdToOfficialNo.set(originalId, trip.trainNumber);
      matchedCount++;
    } else {
      fallbackCount++;
      trip.trainNumber = originalId;
      trainIdToOfficialNo.set(originalId, originalId);
    }
  }

  console.log(`GlobalTimetable 処理完了: 全 ${trips.length} 便`);
  console.log(`  駅探データより突合: ${matchedCount} 便`);
  console.log(`  未突合(フォールバック): ${fallbackCount} 便`);

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
  console.log('✅ つくばエクスプレスの globalTimetable.json および stationTimetables.json を正常に更新しました！\n');
}

// 実行エントリーポイント
const target = process.argv[2] || 'all';

if (target === 'tojo' || target === 'all') {
  enrichTojo();
}
if (target === 'yurakucho' || target === 'all') {
  enrichYurakucho();
}
if (target === 'fukutoshin' || target === 'all') {
  enrichFukutoshin();
}
if (target === 'seibu_yurakucho' || target === 'all') {
  enrichSeibuYurakucho();
}
if (target === 'seibu_ikebukuro' || target === 'all') {
  enrichSeibuIkebukuro();
}
if (target === 'tsukuba_express' || target === 'tx' || target === 'all') {
  enrichTx();
}


