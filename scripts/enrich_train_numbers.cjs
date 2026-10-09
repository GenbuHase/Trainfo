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
  if (trimmed.endsWith('レ')) {
    return trimmed;
  }
  if (/^[A-Za-z]?\d+$/.test(trimmed) || /^Y\d+$/i.test(trimmed)) {
    return `${trimmed}レ`;
  }
  if (/[a-zA-Zレ]$/.test(trimmed) || trimmed.includes('-')) {
    return trimmed;
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

/**
 * JR埼京線のエンリッチメント処理
 */
function enrichSaikyo() {
  console.log('=== JR埼京線 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/saikyo/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/saikyo/stationTimetables.json');
  const ekitanPath = path.resolve('scripts/ekitan_saikyo_raw_timetables.json');

  if (!fs.existsSync(globalPath) || !fs.existsSync(ekitanPath) || !fs.existsSync(stationPath)) {
    throw new Error('JR埼京線の必要なデータファイルが見つかりません。');
  }

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const ekitanData = JSON.parse(fs.readFileSync(ekitanPath, 'utf8'));
  const stationTimetables = JSON.parse(fs.readFileSync(stationPath, 'utf8'));

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
  console.log('✅ JR埼京線の globalTimetable.json および stationTimetables.json を正常に更新しました！\n');
}

/**
 * JR川越線のエンリッチメント処理
 */
function enrichKawagoe() {
  console.log('=== JR川越線 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/kawagoe/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/kawagoe/stationTimetables.json');
  const ekitanPath = path.resolve('scripts/ekitan_saikyo_raw_timetables.json');

  if (!fs.existsSync(globalPath) || !fs.existsSync(ekitanPath) || !fs.existsSync(stationPath)) {
    throw new Error('JR川越線の必要なデータファイルが見つかりません。');
  }

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const ekitanData = JSON.parse(fs.readFileSync(ekitanPath, 'utf8'));
  const stationTimetables = JSON.parse(fs.readFileSync(stationPath, 'utf8'));

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

  // 特急海浜公園コキア号特別指定
  const SPECIAL_KAWAGOE = {
    '43294': { trainNumber: '9024M', section: { trainNumber: '9025M', fromStationId: 'JA-26' } },
    '43295': { trainNumber: '9027M' },
  };

  let matchedSpecial = 0;
  let matchedCount = 0;
  let fallbackCount = 0;
  const trainIdToOfficialNo = new Map();

  for (const trip of trips) {
    const originalId = trip.trainId || trip.trainNumber || '';
    trip.trainId = originalId;

    if (SPECIAL_KAWAGOE[originalId]) {
      const spec = SPECIAL_KAWAGOE[originalId];
      trip.trainNumber = spec.trainNumber;
      if (spec.section) {
        trip.trainNumberSections = [
          {
            trainNumber: spec.section.trainNumber,
            fromStationId: spec.section.fromStationId,
            reason: 'DIRECTION_REVERSAL',
          },
        ];
      }
      trainIdToOfficialNo.set(originalId, trip.trainNumber);
      matchedSpecial++;
      continue;
    }

    const dayKey = trip.isHoliday ? 'holiday' : 'weekday';
    const firstStop = trip.stops[0];
    const [hStr, mStr] = firstStop.departureTime.split(':');
    let h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    if (h >= 24) h -= 24;

    const key = `${dayKey}:${trip.originStationId}:${trip.direction}:${h}:${m}`;
    let ekItem = ekitanMap.get(key);

    if (!ekItem) {
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
  console.log(`  特急特別指定: ${matchedSpecial} 便`);
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
  console.log('✅ JR川越線の globalTimetable.json および stationTimetables.json を正常に更新しました！\n');
}

/**
 * JR武蔵野線のエンリッチメント処理
 */
function enrichMusashino() {
  console.log('=== JR武蔵野線 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/musashino/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/musashino/stationTimetables.json');
  const ekitanPath = path.resolve('scripts/ekitan_musashino_raw_timetables.json');

  if (!fs.existsSync(globalPath) || !fs.existsSync(ekitanPath) || !fs.existsSync(stationPath)) {
    throw new Error('JR武蔵野線の必要なデータファイルが見つかりません。');
  }

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const ekitanData = JSON.parse(fs.readFileSync(ekitanPath, 'utf8'));
  const stationTimetables = JSON.parse(fs.readFileSync(stationPath, 'utf8'));

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

  // 特急鎌倉・特急コキア号特別指定
  const SPECIAL_MUSASHINO = {
    '43294': { trainNumber: '9025M' }, // 特急コキア (勝田行)
    '43295': { trainNumber: '9026M' }, // 特急コキア (川越行)
    '42063': { trainNumber: '8066M' }, // 特急鎌倉 (鎌倉行)
    '42061': { trainNumber: '8068M' }, // 特急鎌倉 (吉川美南行)
  };

  let matchedSpecial = 0;
  let matchedCount = 0;
  let fallbackCount = 0;
  const trainIdToOfficialNo = new Map();

  for (const trip of trips) {
    const originalId = trip.trainId || trip.trainNumber || '';
    trip.trainId = originalId;

    if (SPECIAL_MUSASHINO[originalId]) {
      const spec = SPECIAL_MUSASHINO[originalId];
      trip.trainNumber = spec.trainNumber;
      trainIdToOfficialNo.set(originalId, trip.trainNumber);
      matchedSpecial++;
      continue;
    }

    const dayKey = trip.isHoliday ? 'holiday' : 'weekday';
    const firstStop = trip.stops[0];
    const [hStr, mStr] = firstStop.departureTime.split(':');
    let h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    if (h >= 24) h -= 24;

    const key = `${dayKey}:${trip.originStationId}:${trip.direction}:${h}:${m}`;
    let ekItem = ekitanMap.get(key);

    if (!ekItem) {
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
  console.log(`  特急特別指定: ${matchedSpecial} 便`);
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
  console.log('✅ JR武蔵野線の globalTimetable.json および stationTimetables.json を正常に更新しました！\n');
}

/**
 * 東京臨海高速鉄道りんかい線のエンリッチメント処理
 */
function enrichRinkai() {
  console.log('=== 東京臨海高速鉄道りんかい線 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/rinkai/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/rinkai/stationTimetables.json');
  const ekitanPath = path.resolve('scripts/ekitan_rinkai_timetables.json');

  if (!fs.existsSync(globalPath) || !fs.existsSync(ekitanPath) || !fs.existsSync(stationPath)) {
    throw new Error('りんかい線の必要なデータファイルが見つかりません。');
  }

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const ekitanData = JSON.parse(fs.readFileSync(ekitanPath, 'utf8'));
  const stationTimetables = JSON.parse(fs.readFileSync(stationPath, 'utf8'));

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
  console.log('✅ 東京臨海高速鉄道りんかい線の globalTimetable.json および stationTimetables.json を正常に更新しました！\n');
}

/**
 * JR八高線のエンリッチメント処理
 */
function enrichHachiko() {
  console.log('=== JR八高線 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/hachiko/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/hachiko/stationTimetables.json');
  const ekitanPath = path.resolve('scripts/ekitan_hachiko_timetables.json');

  if (!fs.existsSync(globalPath) || !fs.existsSync(ekitanPath) || !fs.existsSync(stationPath)) {
    throw new Error('JR八高線の必要なデータファイルが見つかりません。');
  }

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const ekitanData = JSON.parse(fs.readFileSync(ekitanPath, 'utf8'));
  const stationTimetables = JSON.parse(fs.readFileSync(stationPath, 'utf8'));

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
  console.log('✅ JR八高線の globalTimetable.json および stationTimetables.json を正常に更新しました！\n');
}

// 中央本線系統（中央線快速・中央本線・篠ノ井線・大糸線）共通の特急・臨時列車特別指定
const SPECIAL_CHUO_LIMITED_EXP = {
  // 特急 アルプス (新宿 -> 白馬)
  '42781': { trainNumber: '9011M' },

  // 特急 あずさ (臨時)
  '6839': { trainNumber: '9071M' }, // あずさ71号
  '6845': { trainNumber: '9077M' }, // あずさ77号
  '6851': { trainNumber: '9083M' }, // あずさ83号
  '6860': { trainNumber: '9085M' }, // あずさ85号
  '6917': { trainNumber: '9076M' }, // あずさ76号
  '6928': { trainNumber: '9084M' }, // あずさ84号
  '6916': { trainNumber: '9086M' }, // あずさ86号
  '6918': { trainNumber: '9088M' }, // あずさ88号

  // 特急 富士回遊 (新宿 -> 大月・河口湖)
  '39460': { trainNumber: '2103M' }, // 富士回遊3号 (休日)
  '39461': { trainNumber: '2103M' }, // 富士回遊3号 (平日)
  '38797': { trainNumber: '2107M' }, // 富士回遊7号 (休日)
  '38799': { trainNumber: '2107M' }, // 富士回遊7号 (平日)
  '38800': { trainNumber: '8111M' }, // 富士回遊81号 (臨時・休日)
  '38802': { trainNumber: '2111M' }, // 富士回遊11号 (休日)
  '38804': { trainNumber: '2111M' }, // 富士回遊11号 (平日)
  '38805': { trainNumber: '2115M' }, // 富士回遊15号 (休日)
  '38807': { trainNumber: '2115M' }, // 富士回遊15号 (平日)
  '38808': { trainNumber: '9193M' }, // 富士回遊93号 (臨時)
};

/**
 * JR中央線快速のエンリッチメント処理
 */
function enrichChuo() {
  console.log('=== JR中央線快速 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/chuo/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/chuo/stationTimetables.json');
  const ekitanPath = path.resolve('scripts/ekitan_chuo_timetables.json');

  if (!fs.existsSync(globalPath) || !fs.existsSync(ekitanPath) || !fs.existsSync(stationPath)) {
    throw new Error('JR中央線快速の必要なデータファイルが見つかりません。');
  }

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const ekitanData = JSON.parse(fs.readFileSync(ekitanPath, 'utf8'));
  const stationTimetables = JSON.parse(fs.readFileSync(stationPath, 'utf8'));

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

  let matchedSpecial = 0;
  let matchedCount = 0;
  let fallbackCount = 0;
  const trainIdToOfficialNo = new Map();

  for (const trip of trips) {
    const originalId = trip.trainId || trip.trainNumber || '';
    trip.trainId = originalId;

    if (SPECIAL_CHUO_LIMITED_EXP[originalId]) {
      trip.trainNumber = SPECIAL_CHUO_LIMITED_EXP[originalId].trainNumber;
      trainIdToOfficialNo.set(originalId, trip.trainNumber);
      matchedSpecial++;
      continue;
    }

    const dayKey = trip.isHoliday ? 'holiday' : 'weekday';
    let ekItem = null;

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
  console.log(`  特急特別指定: ${matchedSpecial} 便`);
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
  console.log('✅ JR中央線快速の globalTimetable.json および stationTimetables.json を正常に更新しました！\n');
}

/**
 * JR中央本線のエンリッチメント処理
 */
function enrichChuoMain() {
  console.log('=== JR中央本線 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/chuo_main/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/chuo_main/stationTimetables.json');
  const ekitanPath = path.resolve('scripts/ekitan_chuo_main_timetables.json');

  if (!fs.existsSync(globalPath) || !fs.existsSync(ekitanPath) || !fs.existsSync(stationPath)) {
    throw new Error('JR中央本線の必要なデータファイルが見つかりません。');
  }

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const ekitanData = JSON.parse(fs.readFileSync(ekitanPath, 'utf8'));
  const stationTimetables = JSON.parse(fs.readFileSync(stationPath, 'utf8'));

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

  let matchedSpecial = 0;
  let matchedCount = 0;
  let fallbackCount = 0;
  const trainIdToOfficialNo = new Map();

  for (const trip of trips) {
    const originalId = trip.trainId || trip.trainNumber || '';
    trip.trainId = originalId;

    if (SPECIAL_CHUO_LIMITED_EXP[originalId]) {
      trip.trainNumber = SPECIAL_CHUO_LIMITED_EXP[originalId].trainNumber;
      trainIdToOfficialNo.set(originalId, trip.trainNumber);
      matchedSpecial++;
      continue;
    }

    const dayKey = trip.isHoliday ? 'holiday' : 'weekday';
    let ekItem = null;

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
  console.log(`  特急特別指定: ${matchedSpecial} 便`);
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
  console.log('✅ JR中央本線の globalTimetable.json および stationTimetables.json を正常に更新しました！\n');
}

/**
 * JR篠ノ井線のエンリッチメント処理
 */
function enrichShinonoi() {
  console.log('=== JR篠ノ井線 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/shinonoi/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/shinonoi/stationTimetables.json');
  const ekitanPath = path.resolve('scripts/ekitan_shinonoi_timetables.json');

  if (!fs.existsSync(globalPath) || !fs.existsSync(ekitanPath) || !fs.existsSync(stationPath)) {
    throw new Error('JR篠ノ井線の必要なデータファイルが見つかりません。');
  }

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const ekitanData = JSON.parse(fs.readFileSync(ekitanPath, 'utf8'));
  const stationTimetables = JSON.parse(fs.readFileSync(stationPath, 'utf8'));

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

  let matchedSpecial = 0;
  let matchedCount = 0;
  let fallbackCount = 0;
  const trainIdToOfficialNo = new Map();

  for (const trip of trips) {
    const originalId = trip.trainId || trip.trainNumber || '';
    trip.trainId = originalId;

    if (SPECIAL_CHUO_LIMITED_EXP[originalId]) {
      trip.trainNumber = SPECIAL_CHUO_LIMITED_EXP[originalId].trainNumber;
      trainIdToOfficialNo.set(originalId, trip.trainNumber);
      matchedSpecial++;
      continue;
    }

    const dayKey = trip.isHoliday ? 'holiday' : 'weekday';
    let ekItem = null;

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
  console.log(`  特急特別指定: ${matchedSpecial} 便`);
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
  console.log('✅ JR篠ノ井線の globalTimetable.json および stationTimetables.json を正常に更新しました！\n');
}

/**
 * JR大糸線（東区間・西区間）のエンリッチメント処理
 */
function enrichOito() {
  console.log('=== JR大糸線 公式列車番号エンリッチメント開始 ===');

  const ekitanPath = path.resolve('scripts/ekitan_oito_timetables.json');
  if (!fs.existsSync(ekitanPath)) {
    throw new Error('JR大糸線の駅探データファイルが見つかりません。');
  }

  const ekitanData = JSON.parse(fs.readFileSync(ekitanPath, 'utf8'));
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

  for (const section of ['oito_east', 'oito_west']) {
    const secName = section === 'oito_east' ? 'JR大糸線 (東区間・JR東日本)' : 'JR大糸線 (西区間・JR西日本)';
    console.log(`--- ${secName} 処理中 ---`);

    const globalPath = path.resolve(`src/data/lines/${section}/globalTimetable.json`);
    const stationPath = path.resolve(`src/data/lines/${section}/stationTimetables.json`);

    if (!fs.existsSync(globalPath) || !fs.existsSync(stationPath)) {
      console.warn(`[WARN] ${secName} のデータファイルが見つかりません。スキップします。`);
      continue;
    }

    const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
    const stationTimetables = JSON.parse(fs.readFileSync(stationPath, 'utf8'));

    let matchedSpecial = 0;
    let matchedCount = 0;
    let fallbackCount = 0;
    const trainIdToOfficialNo = new Map();

    for (const trip of trips) {
      const originalId = trip.trainId || trip.trainNumber || '';
      trip.trainId = originalId;

      if (SPECIAL_CHUO_LIMITED_EXP[originalId]) {
        trip.trainNumber = SPECIAL_CHUO_LIMITED_EXP[originalId].trainNumber;
        trainIdToOfficialNo.set(originalId, trip.trainNumber);
        matchedSpecial++;
        continue;
      }

      const dayKey = trip.isHoliday ? 'holiday' : 'weekday';
      let ekItem = null;

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
    console.log(`  特急特別指定: ${matchedSpecial} 便`);
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
    console.log(`✅ ${secName} の globalTimetable.json および stationTimetables.json を正常に更新しました！\n`);
  }
}

/**
 * 秩父鉄道秩父本線のエンリッチメント処理
 */
const SPECIAL_CHICHIBU_TRAINS = {
  // SLパレオエクスプレス (熊谷 ↔ 三峰口)
  '133343': '5001レ', // 下り (熊谷 10:15発 -> 三峰口 12:54着)
  '133503': '5002レ', // 上り (三峰口 14:05発 -> 熊谷 16:20着)
};

function enrichChichibu() {
  console.log('=== 秩父鉄道秩父本線 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/chichibu/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/chichibu/stationTimetables.json');
  const ekitanPath = path.resolve('scripts/ekitan_chichibu_timetables.json');

  if (!fs.existsSync(globalPath) || !fs.existsSync(stationPath) || !fs.existsSync(ekitanPath)) {
    throw new Error('秩父鉄道の必要なデータファイルが見つかりません。');
  }

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const stationTimetables = JSON.parse(fs.readFileSync(stationPath, 'utf8'));
  const ekitanData = JSON.parse(fs.readFileSync(ekitanPath, 'utf8'));

  // 駅探インデックスマップ構築: `${dayKey}:${stationId}:${direction}:${h}:${m}` -> item
  const ekitanMap = new Map();
  for (const dayKey of ['weekday', 'holiday']) {
    const dayData = ekitanData[dayKey] || {};
    for (const stId of Object.keys(dayData)) {
      const dirs = dayData[stId] || {};
      for (const dir of ['outbound', 'inbound']) {
        const deps = dirs[dir] || [];
        for (const dep of deps) {
          const key = `${dayKey}:${stId}:${dir}:${dep.h}:${dep.m}`;
          if (!ekitanMap.has(key)) {
            ekitanMap.set(key, dep);
          }
        }
      }
    }
  }

  let matchedSpecial = 0;
  let matchedEkitan = 0;
  let fallbackCount = 0;
  const trainIdToOfficialNo = new Map();

  for (const trip of trips) {
    const originalId = trip.trainId || trip.trainNumber;
    trip.trainId = originalId;

    let officialNo = null;

    // 1. 特別指定（SLパレオエクスプレス等）
    if (SPECIAL_CHICHIBU_TRAINS[originalId]) {
      officialNo = SPECIAL_CHICHIBU_TRAINS[originalId];
      matchedSpecial++;
    }

    // 2. 駅探データからの突合
    if (!officialNo) {
      const dayKey = trip.isHoliday ? 'holiday' : 'weekday';
      for (const stop of trip.stops) {
        if (stop.isPassing || !stop.departureTime) continue;
        const [sh, sm] = stop.departureTime.split(':').map(Number);
        const normH = sh >= 24 ? sh - 24 : sh;
        const key = `${dayKey}:${stop.stationId}:${trip.direction}:${normH}:${sm}`;
        const matched = ekitanMap.get(key);
        if (matched && matched.no) {
          officialNo = normalizeTrainNumber(matched.no);
          matchedEkitan++;
          break;
        }
      }
    }

    if (officialNo) {
      trip.trainNumber = officialNo;
      trainIdToOfficialNo.set(originalId, officialNo);
    } else {
      fallbackCount++;
      // 純数字IDならレ付与、それ以外はそのまま
      const fallbackNo = normalizeTrainNumber(originalId);
      trip.trainNumber = fallbackNo;
      trainIdToOfficialNo.set(originalId, fallbackNo);
    }
  }

  console.log(`GlobalTimetable 処理完了: 全 ${trips.length} 便`);
  console.log(`  特別指定(SL等): ${matchedSpecial} 便`);
  console.log(`  駅探データより突合: ${matchedEkitan} 便`);
  console.log(`  フォールバック: ${fallbackCount} 便`);

  // 駅発車標（stationTimetables.json）の同期
  let stUpdatedCount = 0;
  for (const day of ['weekday', 'holiday']) {
    const dayData = stationTimetables[day] || {};
    for (const stId of Object.keys(dayData)) {
      const stDirs = dayData[stId] || {};
      for (const dir of ['inbound', 'outbound']) {
        const deps = stDirs[dir] || [];
        for (const dep of deps) {
          const rawId = dep.trainId || dep.no;
          dep.trainId = rawId;
          if (trainIdToOfficialNo.has(rawId)) {
            dep.no = trainIdToOfficialNo.get(rawId);
            stUpdatedCount++;
          }
        }
      }
    }
  }

  console.log(`StationTimetables 同期更新完了: ${stUpdatedCount} 件`);

  fs.writeFileSync(globalPath, JSON.stringify(trips, null, 2), 'utf8');
  fs.writeFileSync(stationPath, JSON.stringify(stationTimetables, null, 2), 'utf8');
  console.log('✅ 秩父鉄道秩父本線の公式列車番号エンリッチメントが正常に完了しました！\n');
}

/**
 * 東武越生線のエンリッチメント処理
 */
function enrichOgose() {
  console.log('=== 東武越生線 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/ogose/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/ogose/stationTimetables.json');
  const ekitanPath = path.resolve('scripts/cache/ekitan_ogose_timetables.json');

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

// 実行エントリーポイント
const target = process.argv[2] || 'all';

if (target === 'tojo' || target === 'all') {
  enrichTojo();
}
if (target === 'ogose' || target === 'all') {
  enrichOgose();
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
if (target === 'saikyo' || target === 'jr' || target === 'all') {
  enrichSaikyo();
}
if (target === 'kawagoe' || target === 'jr' || target === 'all') {
  enrichKawagoe();
}
if (target === 'musashino' || target === 'jr' || target === 'all') {
  enrichMusashino();
}
if (target === 'rinkai' || target === 'all') {
  enrichRinkai();
}
if (target === 'hachiko' || target === 'jr' || target === 'all') {
  enrichHachiko();
}
if (target === 'chuo' || target === 'jr' || target === 'all') {
  enrichChuo();
}
if (target === 'chuo_main' || target === 'jr' || target === 'all') {
  enrichChuoMain();
}
if (target === 'shinonoi' || target === 'jr' || target === 'all') {
  enrichShinonoi();
}
if (target === 'oito' || target === 'jr' || target === 'all') {
  enrichOito();
}
if (target === 'chichibu' || target === 'all') {
  enrichChichibu();
}

/**
 * 小田急路線の共通エンリッチメント処理
 */
function enrichOdakyuLine(lineName, globalPath, stationPath, ekitanPath) {
  console.log(`=== ${lineName} 公式列車番号エンリッチメント開始 ===`);

  if (!fs.existsSync(globalPath) || !fs.existsSync(ekitanPath)) {
    console.warn(`必要なデータファイルが見つかりません: ${lineName}`);
    return;
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

    // 駅探データからの突合
    // 1. 各停車駅の発車時刻で照合
    for (const stop of trip.stops) {
      if (stop.isPassing || !stop.departureTime) continue;
      const stId = stop.stationId;
      const [hStr, mStr] = stop.departureTime.split(':');
      const h = parseInt(hStr, 10);
      const m = parseInt(mStr, 10);
      const ekitanDeps = ekitanData[dayKey]?.[stId]?.[trip.direction] || [];
      const matched = ekitanDeps.find((d) => d.h === h && d.m === m);
      if (matched && matched.no) {
        officialNo = matched.no;
        matchedFromEkitan++;
        break;
      }
    }

    // 2. もし見つからず終着駅の到着時刻がある場合、終着駅で照合
    if (!officialNo) {
      const lastStop = trip.stops[trip.stops.length - 1];
      if (lastStop && lastStop.arrivalTime) {
        const stId = lastStop.stationId;
        const [hStr, mStr] = lastStop.arrivalTime.split(':');
        const h = parseInt(hStr, 10);
        const m = parseInt(mStr, 10);
        const ekitanDeps = ekitanData[dayKey]?.[stId]?.[trip.direction] || [];
        const matched = ekitanDeps.find((d) => d.h === h && d.m === m);
        if (matched && matched.no) {
          officialNo = matched.no;
          matchedFromEkitan++;
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
  console.log(`  駅探データより突合: ${matchedFromEkitan} 便`);
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
  console.log(`✅ ${lineName} の globalTimetable.json および stationTimetables.json を正常に更新しました！\n`);
}

function enrichOdakyuTama() {
  enrichOdakyuLine(
    '小田急多摩線',
    path.resolve('src/data/lines/odakyu_tama/globalTimetable.json'),
    path.resolve('src/data/lines/odakyu_tama/stationTimetables.json'),
    path.resolve('scripts/ekitan_odakyu_tama_timetables.json')
  );
}

function enrichOdakyuEnoshima() {
  enrichOdakyuLine(
    '小田急江ノ島線',
    path.resolve('src/data/lines/odakyu_enoshima/globalTimetable.json'),
    path.resolve('src/data/lines/odakyu_enoshima/stationTimetables.json'),
    path.resolve('scripts/ekitan_odakyu_enoshima_timetables.json')
  );
}

function enrichOdakyuOdawara() {
  enrichOdakyuLine(
    '小田急小田原線',
    path.resolve('src/data/lines/odakyu_odawara/globalTimetable.json'),
    path.resolve('src/data/lines/odakyu_odawara/stationTimetables.json'),
    path.resolve('scripts/ekitan_odakyu_odawara_timetables.json')
  );
}

function enrichTokyuToyokoAndMinatomirai(targetLine) {
  const ekitanCachePath = path.resolve('scripts/cache/ekitan_toyoko_mm_train_numbers.json');
  if (!fs.existsSync(ekitanCachePath)) {
    console.warn(`[WARN] 駅探キャッシュが見つかりません: ${ekitanCachePath}`);
    return;
  }
  const ekitan = JSON.parse(fs.readFileSync(ekitanCachePath, 'utf8'));

  const STATION_NAME_TO_ID = {
    '渋谷': 'TY-01',
    '中目黒': 'TY-03',
    '武蔵小杉': 'TY-11',
    '日吉': 'TY-13',
    '菊名': 'TY-16',
    '横浜': 'TY-21',
    'みなとみらい': 'MM-03',
    '元町・中華街': 'MM-06',
  };

  function timeToSec(t) {
    if (!t) return null;
    const parts = t.split(':').map(Number);
    let h = parts[0];
    if (h < 4) h += 24;
    return h * 3600 + parts[1] * 60 + (parts[2] || 0);
  }

  const ekitanByStation = new Map();
  for (const row of ekitan) {
    const stId = STATION_NAME_TO_ID[row.stationName];
    if (!stId) continue;
    const isHoli = row.dw !== 1;
    let h = row.hour;
    if (h < 4) h += 24;
    const sec = h * 3600 + row.minute * 60;
    const groupKey = `${stId}_${isHoli ? 'H' : 'W'}_${row.direction}`;
    if (!ekitanByStation.has(groupKey)) ekitanByStation.set(groupKey, []);
    ekitanByStation.get(groupKey).push({ ...row, normSec: sec });
  }

  function findBestEkitanNo(trip) {
    const isHoli = trip.isHoliday;
    let bestCandidate = null;
    let minDiff = Infinity;

    for (const stop of trip.stops) {
      if (stop.isPassing || !stop.departureTime) continue;
      const stopSec = timeToSec(stop.departureTime);
      const stIds = (stop.stationId === 'MM-01' || stop.stationId === 'TY-21') ? ['TY-21', 'MM-01'] : [stop.stationId];

      for (const stId of stIds) {
        const groupKey = `${stId}_${isHoli ? 'H' : 'W'}_${trip.direction}`;
        const candidates = ekitanByStation.get(groupKey);
        if (!candidates) continue;

        for (const cand of candidates) {
          const diff = Math.abs(cand.normSec - stopSec);
          if (diff <= 180 && diff < minDiff) {
            minDiff = diff;
            bestCandidate = cand.trainNo;
            if (diff === 0) return cand.trainNo;
          }
        }
      }
    }
    return bestCandidate;
  }

  const lines = targetLine === 'all' ? ['tokyu_toyoko', 'minatomirai'] : [targetLine];
  for (const lineId of lines) {
    const globalPath = path.resolve(`src/data/lines/${lineId}/globalTimetable.json`);
    const stationPath = path.resolve(`src/data/lines/${lineId}/stationTimetables.json`);
    if (!fs.existsSync(globalPath)) continue;

    console.log(`=== [${lineId}] 公式列車番号エンリッチメント開始 ===`);
    const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
    let updatedCount = 0;

    for (const trip of trips) {
      const rawNo = trip.trainNumber;
      if (!trip.trainId && rawNo) {
        trip.trainId = rawNo;
      }
      const officialNo = findBestEkitanNo(trip);
      if (officialNo) {
        trip.trainNumber = officialNo;
        updatedCount++;
      }
    }
    fs.writeFileSync(globalPath, JSON.stringify(trips, null, 2), 'utf8');
    console.log(`✅ [${lineId}] globalTimetable: ${updatedCount} / ${trips.length} trips updated`);

    if (fs.existsSync(stationPath)) {
      const stationData = JSON.parse(fs.readFileSync(stationPath, 'utf8'));
      const depKeyToNumber = new Map();
      for (const trip of trips) {
        const dayKey = trip.isHoliday ? 'holiday' : 'weekday';
        const dirKey = trip.direction;
        for (const stop of trip.stops) {
          if (stop.isPassing || !stop.departureTime) continue;
          const [hStr, mStr] = stop.departureTime.split(':');
          const h = parseInt(hStr, 10);
          const m = parseInt(mStr, 10);
          const k = `${dayKey}_${stop.stationId}_${dirKey}_${h}_${m}`;
          depKeyToNumber.set(k, { trainNumber: trip.trainNumber, trainId: trip.trainId, tripId: trip.tripId });
        }
      }

      let stDepUpdated = 0;
      for (const dayKey of ['weekday', 'holiday']) {
        const dayObj = stationData[dayKey];
        if (!dayObj) continue;
        for (const stId of Object.keys(dayObj)) {
          const stObj = dayObj[stId];
          for (const dirKey of ['inbound', 'outbound']) {
            const departures = stObj[dirKey];
            if (!Array.isArray(departures)) continue;
            for (const dep of departures) {
              const rawNo = dep.no;
              if (!dep.trainId && rawNo) {
                dep.trainId = rawNo;
              }
              const k = `${dayKey}_${stId}_${dirKey}_${dep.h}_${dep.m}`;
              const matched = depKeyToNumber.get(k);
              if (matched) {
                dep.no = matched.trainNumber;
                dep.trainId = matched.trainId;
                dep.tripId = matched.tripId;
                stDepUpdated++;
              }
            }
          }
        }
      }
      fs.writeFileSync(stationPath, JSON.stringify(stationData, null, 2), 'utf8');
      console.log(`✅ [${lineId}] stationTimetables: ${stDepUpdated} departures updated`);
    }
  }
}

if (target === 'tokyu_toyoko' || target === 'toyoko' || target === 'all') {
  enrichTokyuToyokoAndMinatomirai('tokyu_toyoko');
}
if (target === 'minatomirai' || target === 'all') {
  enrichTokyuToyokoAndMinatomirai('minatomirai');
}

function enrichSotetsuAndTokyu(targetLine) {
  const ekitanCachePath = path.resolve('scripts/cache/ekitan_sotetsu_tokyu.json');
  if (!fs.existsSync(ekitanCachePath)) {
    console.warn(`[WARN] 駅探キャッシュが見つかりません: ${ekitanCachePath}`);
    return;
  }
  const ekitan = JSON.parse(fs.readFileSync(ekitanCachePath, 'utf8'));

  function timeToSec(t) {
    if (!t) return null;
    const parts = t.split(':').map(Number);
    let h = parts[0];
    if (h < 4) h += 24;
    return h * 3600 + parts[1] * 60 + (parts[2] || 0);
  }

  const ekitanByStation = new Map();
  for (const row of ekitan) {
    const isHoli = row.dw !== 1;
    let h = row.hour;
    if (h < 4) h += 24;
    const sec = h * 3600 + row.minute * 60;
    const groupKey = `${row.line}_${row.stationId}_${isHoli ? 'H' : 'W'}_${row.direction}`;
    if (!ekitanByStation.has(groupKey)) ekitanByStation.set(groupKey, []);
    ekitanByStation.get(groupKey).push({ ...row, normSec: sec });
  }

  const allLines = ['tokyu_shin_yokohama', 'sotetsu_shin_yokohama', 'sotetsu_main', 'sotetsu_izumino'];
  const lines = (targetLine === 'all' || targetLine === 'sotetsu') ? allLines : [targetLine];

  function findBestEkitanNo(lineId, trip) {
    const isHoli = trip.isHoliday;
    let bestCandidate = null;
    let minDiff = Infinity;

    for (const stop of trip.stops) {
      if (stop.isPassing || !stop.departureTime) continue;
      const stopSec = timeToSec(stop.departureTime);

      const groupKey = `${lineId}_${stop.stationId}_${isHoli ? 'H' : 'W'}_${trip.direction}`;
      const candidates = ekitanByStation.get(groupKey);
      if (!candidates) continue;

      for (const cand of candidates) {
        const diff = Math.abs(cand.normSec - stopSec);
        if (diff <= 180 && diff < minDiff) {
          minDiff = diff;
          bestCandidate = cand.trainNo;
          if (diff === 0) return cand.trainNo;
        }
      }
    }
    return bestCandidate;
  }

  for (const lineId of lines) {
    const globalPath = path.resolve(`src/data/lines/${lineId}/globalTimetable.json`);
    const stationPath = path.resolve(`src/data/lines/${lineId}/stationTimetables.json`);
    if (!fs.existsSync(globalPath)) continue;

    console.log(`=== [${lineId}] 公式列車番号エンリッチメント開始 ===`);
    const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
    let updatedCount = 0;

    for (const trip of trips) {
      const rawNo = trip.trainNumber;
      if (!trip.trainId && rawNo) {
        trip.trainId = rawNo;
      }
      const officialNo = findBestEkitanNo(lineId, trip);
      if (officialNo) {
        trip.trainNumber = officialNo;
        updatedCount++;
      }
    }
    fs.writeFileSync(globalPath, JSON.stringify(trips, null, 2), 'utf8');
    console.log(`✅ [${lineId}] globalTimetable: ${updatedCount} / ${trips.length} trips updated`);

    if (fs.existsSync(stationPath)) {
      const stationData = JSON.parse(fs.readFileSync(stationPath, 'utf8'));
      const depKeyToNumber = new Map();
      for (const trip of trips) {
        const dayKey = trip.isHoliday ? 'holiday' : 'weekday';
        const dirKey = trip.direction;
        for (const stop of trip.stops) {
          if (stop.isPassing || !stop.departureTime) continue;
          const [hStr, mStr] = stop.departureTime.split(':');
          const h = parseInt(hStr, 10);
          const m = parseInt(mStr, 10);
          const k = `${dayKey}_${stop.stationId}_${dirKey}_${h}_${m}`;
          depKeyToNumber.set(k, { trainNumber: trip.trainNumber, trainId: trip.trainId, tripId: trip.tripId });
        }
      }

      let stDepUpdated = 0;
      for (const dayKey of ['weekday', 'holiday']) {
        const dayObj = stationData[dayKey];
        if (!dayObj) continue;
        for (const stId of Object.keys(dayObj)) {
          const stObj = dayObj[stId];
          for (const dirKey of ['inbound', 'outbound']) {
            const departures = stObj[dirKey];
            if (!Array.isArray(departures)) continue;
            for (const dep of departures) {
              const rawNo = dep.no;
              if (!dep.trainId && rawNo) {
                dep.trainId = rawNo;
              }
              const k = `${dayKey}_${stId}_${dirKey}_${dep.h}_${dep.m}`;
              const matched = depKeyToNumber.get(k);
              if (matched) {
                dep.no = matched.trainNumber;
                dep.trainId = matched.trainId;
                dep.tripId = matched.tripId;
                stDepUpdated++;
              }
            }
          }
        }
      }
      fs.writeFileSync(stationPath, JSON.stringify(stationData, null, 2), 'utf8');
      console.log(`✅ [${lineId}] stationTimetables: ${stDepUpdated} departures updated`);
    }
  }
}

if (
  target === 'sotetsu' ||
  target === 'tokyu_shin_yokohama' ||
  target === 'sotetsu_shin_yokohama' ||
  target === 'sotetsu_main' ||
  target === 'sotetsu_izumino' ||
  target === 'all'
) {
  enrichSotetsuAndTokyu(target);
}







