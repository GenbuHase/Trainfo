// 公式列車番号エンリッチメントスクリプト
// Yahoo!路線情報ベースのダイヤデータ（globalTimetable.json / stationTimetables.json）に
// 駅探データおよびYahoo guideCommentから公式列車番号を注入し、trainIdとtrainNumberを分離・更新します。

const fs = require('fs');
const path = require('path');

function safeWriteJson(filePath, data) {
  const content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  let attempts = 0;
  while (attempts < 5) {
    try {
      fs.writeFileSync(filePath, content, 'utf8');
      return;
    } catch (e) {
      attempts++;
      if (attempts >= 5) throw e;
      const start = Date.now();
      while (Date.now() - start < 100) {}
    }
  }
}


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
  // すでに末尾に「レ」が付いている場合はそのまま
  if (trimmed.endsWith('レ')) {
    return trimmed;
  }
  // 末尾が英字（JR・メトロ・直通記号など）の場合はそのまま
  if (/[a-zA-Z]$/.test(trimmed)) {
    return trimmed;
  }
  // 6桁の純数字（東急・みなとみらい線・東急新横浜線・相鉄直通等）: XXX-XXXレ にフォーマット
  if (/^\d{6}$/.test(trimmed)) {
    return `${trimmed.slice(0, 3)}-${trimmed.slice(3)}レ`;
  }
  // すでにハイフン付きの純数字（051-071等）: 末尾に「レ」を付与
  if (/^\d{3}-\d{3}$/.test(trimmed)) {
    return `${trimmed}レ`;
  }
  // その他の数字のみ（相鉄4桁 2099、JR 546、秩父 105、東武TJ Y2476等）: 末尾に「レ」を付与
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

  safeWriteJson(globalPath, trips);
  safeWriteJson(stationPath, stationTimetables);
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
    '77814': 'A501M',
    '77815': 'A703M',
    '77816': 'A805M',
    '77817': 'A907M',
    '77818': 'A009M',
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

  safeWriteJson(globalPath, trips);
  safeWriteJson(stationPath, stationTimetables);
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

  safeWriteJson(globalPath, trips);
  safeWriteJson(stationPath, stationTimetables);
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

  safeWriteJson(globalPath, trips);
  safeWriteJson(stationPath, stationTimetables);
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

  safeWriteJson(globalPath, trips);
  safeWriteJson(stationPath, stationTimetables);
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
        const lookupStationId = stop.stationId.replace(/^OIE-/, 'OE-');
        const midKey = `${dayKey}:${lookupStationId}:${trip.direction}:${normH}:${sm}`;
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

  safeWriteJson(globalPath, trips);
  safeWriteJson(stationPath, stationTimetables);
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

  // 駅探データを駅・曜日・方向ごとの秒数付きリストに構造化
  const ekitanByStation = new Map();
  for (const day of ['weekday', 'holiday']) {
    for (const stId of Object.keys(ekitanData[day] || {})) {
      for (const dir of ['inbound', 'outbound']) {
        const groupKey = `${day}:${stId}:${dir}`;
        if (!ekitanByStation.has(groupKey)) ekitanByStation.set(groupKey, []);
        for (const item of ekitanData[day][stId][dir] || []) {
          if (!item.no) continue;
          let h = item.h;
          if (h < 4) h += 24;
          const sec = h * 3600 + item.m * 60;
          ekitanByStation.get(groupKey).push({ ...item, sec });
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
    let bestNo = null;
    let minDiff = Infinity;

    for (const stop of trip.stops) {
      if (stop.isPassing || !stop.departureTime) continue;
      const [hStr, mStr] = stop.departureTime.split(':');
      let h = parseInt(hStr, 10);
      const m = parseInt(mStr, 10);
      if (h < 4) h += 24;
      const stopSec = h * 3600 + m * 60;

      const groupKey = `${dayKey}:${stop.stationId}:${trip.direction}`;
      const candidates = ekitanByStation.get(groupKey);
      if (!candidates) continue;

      for (const cand of candidates) {
        const diff = Math.abs(cand.sec - stopSec);
        if (diff <= 120 && diff < minDiff) {
          minDiff = diff;
          bestNo = cand.no;
          if (diff === 0) break;
        }
      }
      if (minDiff === 0) break;
    }

    if (bestNo) {
      trip.trainNumber = normalizeTrainNumber(bestNo);
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

  safeWriteJson(globalPath, trips);
  safeWriteJson(stationPath, stationTimetables);
  console.log('✅ JR埼京線の globalTimetable.json および stationTimetables.json を正常に更新しました！\n');
}

/**
 * JR川越線のエンリッチメント処理
 */
function enrichKawagoe() {
  console.log('=== JR川越線 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/kawagoe/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/kawagoe/stationTimetables.json');
  const ekitanPath = path.resolve('scripts/ekitan_kawagoe_all_timetables.json');

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

    // 八高線直通便の公式列車番号マップ作成
  const hachikoPath = path.resolve('src/data/lines/hachiko/globalTimetable.json');
  const hachikoMap = new Map();
  if (fs.existsSync(hachikoPath)) {
    try {
      const hachikoTrips = JSON.parse(fs.readFileSync(hachikoPath, 'utf8'));
      for (const ht of hachikoTrips) {
        const hId = ht.trainId || ht.tripId?.split('_').pop();
        if (hId && ht.trainNumber && ht.trainNumber !== hId && !/^\d+$/.test(ht.trainNumber)) {
          hachikoMap.set(hId, ht.trainNumber);
        }
      }
    } catch (e) {
      console.warn('八高線データの読み込みに失敗しました:', e);
    }
  }

  let matchedSpecial = 0;
  let matchedCount = 0;
  let matchedHachiko = 0;
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
    } else if (hachikoMap.has(originalId)) {
      trip.trainNumber = hachikoMap.get(originalId);
      trainIdToOfficialNo.set(originalId, trip.trainNumber);
      matchedHachiko++;
    } else {
      fallbackCount++;
      trip.trainNumber = originalId;
      trainIdToOfficialNo.set(originalId, originalId);
    }
  }

  console.log(`GlobalTimetable 処理完了: 全 ${trips.length} 便`);
  console.log(`  特急特別指定: ${matchedSpecial} 便`);
  console.log(`  駅探データより突合: ${matchedCount} 便`);
  console.log(`  八高線直通より同期: ${matchedHachiko} 便`);
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

  safeWriteJson(globalPath, trips);
  safeWriteJson(stationPath, stationTimetables);
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

  safeWriteJson(globalPath, trips);
  safeWriteJson(stationPath, stationTimetables);
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

  safeWriteJson(globalPath, trips);
  safeWriteJson(stationPath, stationTimetables);
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

  safeWriteJson(globalPath, trips);
  safeWriteJson(stationPath, stationTimetables);
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

  // 特急 しなの (臨時)
  '25078': { trainNumber: '8083M' }, // しなの83号 (名古屋 -> 長野)
  '25201': { trainNumber: '8086M' }, // しなの86号 (長野 -> 名古屋)

  // 飯田線直通普通 (天竜峡 -> 松本)
  '43237': { trainNumber: '1437M' }, // 辰野以北 1437M
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

  safeWriteJson(globalPath, trips);
  safeWriteJson(stationPath, stationTimetables);
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

  safeWriteJson(globalPath, trips);
  safeWriteJson(stationPath, stationTimetables);
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

  safeWriteJson(globalPath, trips);
  safeWriteJson(stationPath, stationTimetables);
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
        const lookupStationId = stop.stationId.replace(/^OIE-/, 'OE-');
        const midKey = `${dayKey}:${lookupStationId}:${trip.direction}:${normH}:${sm}`;
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

    safeWriteJson(globalPath, trips);
    safeWriteJson(stationPath, stationTimetables);
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

  safeWriteJson(globalPath, trips);
  safeWriteJson(stationPath, stationTimetables);
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

  safeWriteJson(globalPath, trips);
  safeWriteJson(stationPath, stationTimetables);
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
if (target === 'hachiko' || target === 'jr' || target === 'all') {
  enrichHachiko();
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
if (target === 'chuo' || target === 'jr' || target === 'all') {
  enrichChuo();
}
if (target === 'ome' || target === 'jr' || target === 'all') {
  enrichOme();
}
if (target === 'itsukaichi' || target === 'jr' || target === 'all') {
  enrichItsukaichi();
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
if (target === 'chiyoda' || target === 'all') {
  enrichChiyoda();
}
if (target === 'joban' || target === 'joban_local' || target === 'jr' || target === 'all') {
  enrichJobanLocal();
}
if (target === 'joban_rapid' || target === 'jr' || target === 'all') {
  enrichJobanRapid();
}
if (target === 'joban_north' || target === 'joban_toride_iwaki' || target === 'jr' || target === 'all') {
  enrichJobanTorideIwaki();
}
if (target === 'joban_sendai' || target === 'joban_iwaki_sendai' || target === 'jr' || target === 'all') {
  enrichJobanIwakiSendai();
}
if (target === 'tohoku_shinkansen' || target === 'shinkansen' || target === 'jr' || target === 'all') {
  enrichTohokuShinkansen();
}
if (target === 'joetsu_shinkansen' || target === 'shinkansen' || target === 'jr' || target === 'all') {
  enrichJoetsuShinkansen();
}
if (target === 'ueno_tokyo' || target === 'jr' || target === 'all') {
  enrichGenericLine('ueno_tokyo', 'JR上野東京ライン');
}
if (target === 'tokaido' || target === 'jr' || target === 'all') {
  enrichGenericLine('tokaido', 'JR東海道線');
}
if (target === 'utsunomiya' || target === 'jr' || target === 'all') {
  enrichGenericLine('utsunomiya', 'JR宇都宮線');
}
if (target === 'takasaki' || target === 'jr' || target === 'all') {
  enrichGenericLine('takasaki', 'JR高崎線');
}
if (target === 'shonan_shinjuku' || target === 'jr' || target === 'all') {
  enrichGenericLine('shonan_shinjuku', 'JR湘南新宿ライン');
}
if (target === 'sobu_rapid' || target === 'jr' || target === 'all') {
  enrichGenericLine('sobu_rapid', 'JR総武快速線');
}
if (target === 'yokosuka' || target === 'jr' || target === 'all') {
  enrichGenericLine('yokosuka', 'JR横須賀線');
}
if (target === 'ito' || target === 'jr' || target === 'all') {
  enrichGenericLine('ito', 'JR伊東線');
}
if (target === 'ryomo' || target === 'jr' || target === 'all') {
  enrichGenericLine('ryomo', 'JR両毛線');
}
if (target === 'joetsu' || target === 'jr' || target === 'all') {
  enrichGenericLine('joetsu', 'JR上越線');
}
if (target === 'tokaido_shizuoka' || target === 'jr' || target === 'all') {
  enrichGenericLine('tokaido_shizuoka', 'JR東海道線（静岡地区）');
}
if (target === 'shinetsu' || target === 'jr' || target === 'all') {
  enrichGenericLine('shinetsu', 'JR信越本線');
}
if (target === 'tadami' || target === 'jr' || target === 'all') {
  enrichGenericLine('tadami', 'JR只見線');
}
if (target === 'banetsu_west' || target === 'jr' || target === 'all') {
  enrichGenericLine('banetsu_west', 'JR磐越西線');
}
if (target === 'banetsu_east' || target === 'jr' || target === 'all') {
  enrichGenericLine('banetsu_east', 'JR磐越東線');
}
if (target === 'hokuriku_shinkansen' || target === 'shinkansen' || target === 'jr' || target === 'all') {
  enrichGenericLine('hokuriku_shinkansen', 'JR北陸新幹線');
}
if (target === 'myoko_haneuma' || target === 'echigo' || target === 'all') {
  enrichGenericLine('myoko_haneuma', 'えちごトキめき鉄道妙高はねうまライン');
}
if (target === 'nihonkai_hisui' || target === 'echigo' || target === 'all') {
  enrichGenericLine('nihonkai_hisui', 'えちごトキめき鉄道日本海ひすいライン');
}
if (target === 'hokuhoku' || target === 'all') {
  enrichGenericLine('hokuhoku', '北越急行ほくほく線');
}
if (target === 'kita_shinano' || target === 'shinano' || target === 'all') {
  enrichGenericLine('kita_shinano', 'しなの鉄道北しなの線');
}
if (target === 'tobu_skytree' || target === 'tobu' || target === 'all') {
  enrichGenericLine('tobu_skytree', '東武スカイツリーライン');
}
if (target === 'tobu_isesaki' || target === 'tobu' || target === 'all') {
  enrichGenericLine('tobu_isesaki', '東武伊勢崎線');
}
if (target === 'tobu_kameido' || target === 'tobu' || target === 'all') {
  enrichGenericLine('tobu_kameido', '東武亀戸線');
}
if (target === 'tobu_daishi' || target === 'tobu' || target === 'all') {
  enrichGenericLine('tobu_daishi', '東武大師線');
}
if (target === 'tobu_sano' || target === 'tobu' || target === 'all') {
  enrichGenericLine('tobu_sano', '東武佐野線');
}
if (target === 'tobu_koizumi' || target === 'tobu' || target === 'all') {
  enrichGenericLine('tobu_koizumi', '東武小泉線');
}
if (target === 'tobu_kiryu' || target === 'tobu' || target === 'all') {
  enrichGenericLine('tobu_kiryu', '東武桐生線');
}
if (target === 'tobu_nikko' || target === 'tobu' || target === 'all') {
  enrichGenericLine('tobu_nikko', '東武日光線');
}
if (target === 'tobu_utsunomiya' || target === 'tobu' || target === 'all') {
  enrichGenericLine('tobu_utsunomiya', '東武宇都宮線');
}
if (target === 'tobu_kinugawa' || target === 'tobu' || target === 'all') {
  enrichGenericLine('tobu_kinugawa', '東武鬼怒川線');
}
if (target === 'tobu_urban_park' || target === 'tobu' || target === 'all') {
  enrichGenericLine('tobu_urban_park', '東武アーバンパークライン');
}
if (target === 'yagan' || target === 'tobu' || target === 'all') {
  enrichGenericLine('yagan', '野岩鉄道会津鬼怒川線');
}
if (target === 'aizu' || target === 'tobu' || target === 'all') {
  enrichGenericLine('aizu', '会津鉄道会津線');
}

/**
 * Yahoo駅時刻表キャッシュ（stations/*.json）からの汎用公式列車番号エンリッチメント
 */
function enrichGenericLine(lineId, lineName) {
  console.log(`=== ${lineName} 公式列車番号エンリッチメント開始 ===`);

  const globalPath = path.resolve(`src/data/lines/${lineId}/globalTimetable.json`);
  const stationPath = path.resolve(`src/data/lines/${lineId}/stationTimetables.json`);
  const cacheDir = path.resolve(`scripts/cache/yahoo/${lineId}/stations`);

  if (!fs.existsSync(globalPath) || !fs.existsSync(cacheDir)) {
    console.warn(`必要なデータファイルが見つかりません: ${lineName}`);
    return;
  }

  const files = fs.readdirSync(cacheDir).filter(f => f.endsWith('.json'));
  const trainMap = new Map(); // `${dayKey}_${trainId}` -> vendorTrainId
  for (const f of files) {
    const isHoliday = f.includes('_k4');
    const dayKey = isHoliday ? 'holiday' : 'weekday';
    const data = JSON.parse(fs.readFileSync(path.join(cacheDir, f), 'utf8'));
    const tt = data?.timetableItem;
    for (const h of tt?.hourTimeTable || []) {
      for (const t of h.minTimeTable || []) {
        if (t.trainId && t.vendorTrainId) {
          const key = `${dayKey}_${t.trainId}`;
          if (!trainMap.has(key)) {
            trainMap.set(key, t.vendorTrainId);
          }
        }
      }
    }
  }

  // 近隣路線キャッシュの遅延ロード用
  let fallbackMap = null;
  function getFallbackVendorNo(dayKey, originalId) {
    if (!fallbackMap) {
      fallbackMap = new Map();
      const neighborLines = [
        'tobu_skytree', 'tobu_isesaki', 'tobu_nikko', 'tobu_kinugawa',
        'yagan', 'aizu', 'tadami', 'ueno_tokyo', 'tokaido', 'utsunomiya', 'takasaki'
      ];
      for (const nLine of neighborLines) {
        if (nLine === lineId) continue;
        const nDir = path.resolve(`scripts/cache/yahoo/${nLine}/stations`);
        if (!fs.existsSync(nDir)) continue;
        const nFiles = fs.readdirSync(nDir).filter(f => f.endsWith('.json'));
        for (const f of nFiles) {
          const isH = f.includes('_k4');
          const dKey = isH ? 'holiday' : 'weekday';
          try {
            const d = JSON.parse(fs.readFileSync(path.join(nDir, f), 'utf8'));
            for (const h of d?.timetableItem?.hourTimeTable || []) {
              for (const t of h.minTimeTable || []) {
                if (t.trainId && t.vendorTrainId) {
                  const k = `${dKey}_${t.trainId}`;
                  if (!fallbackMap.has(k)) fallbackMap.set(k, t.vendorTrainId);
                }
              }
            }
          } catch (e) {}
        }
      }
    }
    return fallbackMap.get(`${dayKey}_${originalId}`) || null;
  }

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const stationTimetables = fs.existsSync(stationPath)
    ? JSON.parse(fs.readFileSync(stationPath, 'utf8'))
    : null;

  let matchedCount = 0;
  let fallbackCount = 0;
  const trainIdToOfficialNo = new Map();

  for (const trip of trips) {
    const tripIdSuffix = trip.tripId ? trip.tripId.split('_').pop() : '';
    const originalId = trip.trainId || (/^\d+$/.test(tripIdSuffix) ? tripIdSuffix : (trip.trainNumber || tripIdSuffix));
    trip.trainId = originalId;

    const dayKey = trip.isHoliday ? 'holiday' : 'weekday';
    const key = `${dayKey}_${originalId}`;

    let vendorNo = trainMap.get(key);
    if (!vendorNo) {
      vendorNo = getFallbackVendorNo(dayKey, originalId);
    }

    if (vendorNo) {
      trip.trainNumber = normalizeTrainNumber(vendorNo);
      trainIdToOfficialNo.set(originalId, trip.trainNumber);
      matchedCount++;
    } else {
      fallbackCount++;
      trip.trainNumber = originalId;
      trainIdToOfficialNo.set(originalId, originalId);
    }
  }

  console.log(`GlobalTimetable 処理完了: 全 ${trips.length} 便`);
  console.log(`  公式列車番号突合: ${matchedCount} 便`);
  console.log(`  未突合(フォールバック): ${fallbackCount} 便`);
  safeWriteJson(globalPath, trips);

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
    safeWriteJson(stationPath, stationTimetables);
    console.log(`StationTimetables 同期更新完了: ${stUpdatedCount} 件`);
  }
  console.log(`✅ ${lineName} の globalTimetable.json および stationTimetables.json を正常に更新しました！\n`);
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

  safeWriteJson(globalPath, trips);
  safeWriteJson(stationPath, stationTimetables);
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


if (target === 'odakyu' || target === 'odakyu_tama' || target === 'all') {
  enrichOdakyuTama();
}
if (target === 'odakyu' || target === 'odakyu_enoshima' || target === 'all') {
  enrichOdakyuEnoshima();
}
if (target === 'odakyu' || target === 'odakyu_odawara' || target === 'all') {
  enrichOdakyuOdawara();
}

function enrichTokyuToyokoAndMinatomirai(targetLine) {
  const ekitanCachePath = path.resolve('scripts/cache/ekitan_toyoko_mm_train_numbers.json');
  if (!fs.existsSync(ekitanCachePath)) {
    console.warn(`[WARN] 駅探キャッシュが見つかりません: ${ekitanCachePath}`);
    return;
  }
  const ekitan = JSON.parse(fs.readFileSync(ekitanCachePath, 'utf8'));

  const STATION_NAME_TO_ID = {
    '渋谷': 'TY-01', '代官山': 'TY-02', '中目黒': 'TY-03', '祐天寺': 'TY-04',
    '学芸大学': 'TY-05', '都立大学': 'TY-06', '自由が丘': 'TY-07', '田園調布': 'TY-08',
    '多摩川': 'TY-09', '新丸子': 'TY-10', '武蔵小杉': 'TY-11', '元住吉': 'TY-12',
    '日吉': 'TY-13', '綱島': 'TY-14', '大倉山': 'TY-15', '菊名': 'TY-16',
    '妙蓮寺': 'TY-17', '白楽': 'TY-18', '東白楽': 'TY-19', '反町': 'TY-20',
    '横浜': 'TY-21',
    '新高島': 'MM-02', 'みなとみらい': 'MM-03', '馬車道': 'MM-04',
    '日本大通り': 'MM-05', '元町・中華街': 'MM-06',
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
    const stId = row.stationId || STATION_NAME_TO_ID[row.stationName];
    if (!stId) continue;
    const isHoli = row.dayKey ? row.dayKey === 'holiday' : row.dw !== 0;
    let h = row.hour;
    if (h < 4) h += 24;
    const sec = h * 3600 + row.minute * 60;
    const groupKey = `${stId}_${isHoli ? 'H' : 'W'}_${row.direction}`;
    if (!ekitanByStation.has(groupKey)) ekitanByStation.set(groupKey, []);
    ekitanByStation.get(groupKey).push({ ...row, normSec: sec });
  }

  function findBestEkitanNo(trip) {
    // 特殊便の個別マッピング
    if (trip.tripId === 'WD_INB_TY-11_0534_106358') return '057052';

    const isHoli = trip.isHoliday;
    const isOutbound = trip.direction === 'outbound';
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
          if (!cand.trainNo) continue;
          // パリティ検証: 下りは奇数末尾、上りは偶数末尾
          const lastDigit = parseInt(cand.trainNo.slice(-1), 10);
          const isEven = lastDigit % 2 === 0;
          if (isOutbound && isEven) continue;
          if (!isOutbound && !isEven) continue;

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

  // 常に両路線のデータを読み込んで突合・直通同期を行う
  const toyokoPath = path.resolve('src/data/lines/tokyu_toyoko/globalTimetable.json');
  const mmPath = path.resolve('src/data/lines/minatomirai/globalTimetable.json');
  const toyokoStationPath = path.resolve('src/data/lines/tokyu_toyoko/stationTimetables.json');
  const mmStationPath = path.resolve('src/data/lines/minatomirai/stationTimetables.json');

  const toyokoTrips = fs.existsSync(toyokoPath) ? JSON.parse(fs.readFileSync(toyokoPath, 'utf8')) : [];
  const mmTrips = fs.existsSync(mmPath) ? JSON.parse(fs.readFileSync(mmPath, 'utf8')) : [];

  let tyUpdated = 0;
  for (const trip of toyokoTrips) {
    const rawNo = trip.trainNumber;
    if (!trip.trainId && rawNo) trip.trainId = rawNo;
    const officialNo = findBestEkitanNo(trip);
    if (officialNo) {
      trip.trainNumber = normalizeTrainNumber(officialNo);
      tyUpdated++;
    }
  }

  let mmUpdated = 0;
  for (const trip of mmTrips) {
    const rawNo = trip.trainNumber;
    if (!trip.trainId && rawNo) trip.trainId = rawNo;
    const officialNo = findBestEkitanNo(trip);
    if (officialNo) {
      trip.trainNumber = normalizeTrainNumber(officialNo);
      mmUpdated++;
    }
  }

  // 東横線・みなとみらい線 直通ペア完全同期
  const mmMap = new Map(mmTrips.map(t => [t.tripId, t]));
  const tyMap = new Map(toyokoTrips.map(t => [t.tripId, t]));
  let syncCount = 0;

  for (const ty of toyokoTrips) {
    if (ty.throughLineId === 'minatomirai' && ty.throughTripId) {
      const mm = mmMap.get(ty.throughTripId);
      if (mm && ty.trainNumber !== mm.trainNumber) {
        mm.trainNumber = ty.trainNumber;
        syncCount++;
      }
    }
  }

  for (const mm of mmTrips) {
    if (mm.throughLineId === 'tokyu_toyoko' && mm.throughTripId) {
      const ty = tyMap.get(mm.throughTripId);
      if (ty && mm.trainNumber !== ty.trainNumber) {
        ty.trainNumber = mm.trainNumber;
        syncCount++;
      }
    }
  }

  console.log(`✅ [tokyu_toyoko] globalTimetable: ${tyUpdated} / ${toyokoTrips.length} updated`);
  console.log(`✅ [minatomirai] globalTimetable: ${mmUpdated} / ${mmTrips.length} updated`);
  console.log(`✅ 直通ペア完全同期: ${syncCount} 件を同期`);

  if (fs.existsSync(toyokoPath)) safeWriteJson(toyokoPath, toyokoTrips);
  if (fs.existsSync(mmPath)) safeWriteJson(mmPath, mmTrips);

  // 各駅発車標（stationTimetables.json）の同期
  function syncStationTimetables(trips, stPath, lineId) {
    if (!fs.existsSync(stPath)) return;
    const stationData = JSON.parse(fs.readFileSync(stPath, 'utf8'));
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
            if (!dep.trainId && rawNo) dep.trainId = rawNo;
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
    safeWriteJson(stPath, stationData);
    console.log(`✅ [${lineId}] stationTimetables: ${stDepUpdated} departures updated`);
  }

  syncStationTimetables(toyokoTrips, toyokoStationPath, 'tokyu_toyoko');
  syncStationTimetables(mmTrips, mmStationPath, 'minatomirai');
}

if (target === 'tokyu_toyoko' || target === 'toyoko' || target === 'minatomirai' || target === 'all') {
  enrichTokyuToyokoAndMinatomirai(target);
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

  const SPECIAL_SOTETSU_TOKYU = {
    // 相鉄新横浜線
    sotetsu_shin_yokohama: {
      '82633': '6555',
      '39226': '231M',
      '75570': '7901',
      '82635': '6563',
      '41484': '817F',
      '75568': '7905',
      '82816': '7953',
      '39399': '919F',
      '39423': '260M',
      '82624': '7559',
      '39428': '262M',
      '39267': '1868F',
      '82648': '6265',
      '82640': '6603',
      '82651': '6277',
      '82641': '6605',
      '75612': '7451',
    },
    // 相鉄いずみ野線
    sotetsu_izumino: {
      '82627': '642501',
    },
    // 東急新横浜線
    tokyu_shin_yokohama: {
      '157802': '457231', // 三田線57T直通 (西高島平 -> 新横浜)
      '82653': '350071',
      '82635': '231081',
      '75569': '791171',
      '82698': '643191',
      '82680': '052201',
      '82640': '212201',
      '82700': '637211',
      '82681': '463211',
      '75616': '992231',
      '76646': '218231',
    },
  };

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
    const yahooCachePath = path.resolve(`scripts/cache/yahoo/${lineId}/all_train_details.json`);
    if (!fs.existsSync(globalPath)) continue;

    const yahooCache = fs.existsSync(yahooCachePath) ? JSON.parse(fs.readFileSync(yahooCachePath, 'utf8')) : [];
    const yahooMap = new Map(yahooCache.map(t => [t.trainId, t]));

    console.log(`=== [${lineId}] 公式列車番号エンリッチメント開始 ===`);
    const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
    let updatedCount = 0;

    for (const trip of trips) {
      const rawNo = trip.trainNumber;
      if (!trip.trainId && rawNo) {
        trip.trainId = rawNo;
      }

      // 1. 特別辞書
      let officialNo = SPECIAL_SOTETSU_TOKYU[lineId]?.[trip.trainId] || null;

      // 2. Yahoo guideComment からの抽出
      if (!officialNo) {
        const yDetail = yahooMap.get(trip.trainId);
        if (yDetail && yDetail.guideComment) {
          const comment = yDetail.guideComment;
          if (lineId === 'tokyu_shin_yokohama') {
            const m = comment.match(/渋谷−新横浜間は([0-9-]+)(各駅停車|急行|特急)で運転/) ||
                      comment.match(/目黒−新横浜間は([0-9-]+)(各駅停車|急行|特急)で運転/);
            if (m) officialNo = m[1].replace('-', '');
          } else if (lineId.startsWith('sotetsu')) {
            const m = comment.match(/新横浜−(西谷|海老名|湘南台)間は([0-9]{4})(各駅停車|急行|特急|快速)で運転/);
            if (m) officialNo = m[2];
          }
        }
      }

      // 3. 駅探キャッシュ突合
      if (!officialNo) {
        officialNo = findBestEkitanNo(lineId, trip);
      }

      if (officialNo) {
        trip.trainNumber = officialNo;
        updatedCount++;
      }
    }
    safeWriteJson(globalPath, trips);
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
      safeWriteJson(stationPath, stationData);
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

function enrichSotetsuJrDirect() {
  const globalPath = path.resolve('src/data/lines/sotetsu_jr_direct/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/sotetsu_jr_direct/stationTimetables.json');
  const ekitanCachePath = path.resolve('scripts/cache/ekitan_sotetsu_jr.json');
  const yahooCachePath = path.resolve('scripts/cache/yahoo/sotetsu_jr_direct/all_train_details.json');

  if (!fs.existsSync(globalPath)) return;

  console.log('=== [sotetsu_jr_direct] 公式列車番号エンリッチメント開始 ===');
  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));

  const yahooCache = fs.existsSync(yahooCachePath) ? JSON.parse(fs.readFileSync(yahooCachePath, 'utf8')) : [];
  const yahooMap = new Map(yahooCache.map(t => [t.trainId, t]));

  let ekitan = [];
  if (fs.existsSync(ekitanCachePath)) {
    ekitan = JSON.parse(fs.readFileSync(ekitanCachePath, 'utf8'));
  }

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
    const groupKey = `${row.stationId}_${isHoli ? 'H' : 'W'}_${row.direction}`;
    if (!ekitanByStation.has(groupKey)) ekitanByStation.set(groupKey, []);
    ekitanByStation.get(groupKey).push({ ...row, normSec: sec });
  }

  const SPECIAL_SOTETSU_JR = {
    // 湘南新宿ライン特別快速（小田原発高崎行）
    '33494': '2840Y',
    '33495': '2842Y',
    '33496': '2844Y',
    '33498': '2846Y',
    '33497': '2846Y',
  };

  let updatedCount = 0;
  for (const trip of trips) {
    const rawNo = trip.trainNumber;
    if (!trip.trainId && rawNo) {
      trip.trainId = rawNo;
    }

    let officialNo = SPECIAL_SOTETSU_JR[trip.trainId] || null;

    // 1. Yahoo guideComment からの抽出 (例: "羽沢横浜国大−新宿間は120M各駅停車で運転。")
    if (!officialNo) {
      const yDetail = yahooMap.get(trip.trainId);
      if (yDetail && yDetail.guideComment) {
        const m = yDetail.guideComment.match(/([0-9]{3,4}[A-Za-z])/);
        if (m) {
          officialNo = m[1];
        }
      }
    }

    // 2. 駅探キャッシュからの突合
    if (!officialNo) {
      const isHoli = trip.isHoliday;
      let minDiff = Infinity;
      for (const stop of trip.stops) {
        if (stop.isPassing || !stop.departureTime) continue;
        const stopSec = timeToSec(stop.departureTime);
        const groupKey = `${stop.stationId}_${isHoli ? 'H' : 'W'}_${trip.direction}`;
        const candidates = ekitanByStation.get(groupKey);
        if (!candidates) continue;

        for (const cand of candidates) {
          const diff = Math.abs(cand.normSec - stopSec);
          if (diff <= 180 && diff < minDiff) {
            minDiff = diff;
            officialNo = cand.trainNo;
            if (diff === 0) break;
          }
        }
        if (officialNo && minDiff === 0) break;
      }
    }

    if (officialNo) {
      trip.trainNumber = officialNo;
      updatedCount++;
    }
  }

  safeWriteJson(globalPath, trips);
  console.log(`✅ [sotetsu_jr_direct] globalTimetable: ${updatedCount} / ${trips.length} trips updated`);

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
    safeWriteJson(stationPath, stationData);
    console.log(`✅ [sotetsu_jr_direct] stationTimetables: ${stDepUpdated} departures updated`);
  }
}

if (
  target === 'sotetsu_jr_direct' ||
  target === 'sotetsu' ||
  target === 'all'
) {
  enrichSotetsuJrDirect();
}










/**
 * JR青梅線のエンリッチメント処理 (中央線直通便の公式列車番号を同期)
 */
function enrichOme() {
  console.log('=== JR青梅線 公式列車番号エンリッチメント開始 ===');
  const globalPath = path.resolve('src/data/lines/ome/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/ome/stationTimetables.json');
  const ekitanPath = path.resolve('scripts/ekitan_ome_timetables.json');
  const chuoPath = path.resolve('src/data/lines/chuo/globalTimetable.json');
  if (!fs.existsSync(globalPath) || !fs.existsSync(ekitanPath)) return;

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const ekitanData = JSON.parse(fs.readFileSync(ekitanPath, 'utf8'));
  const stationTimetables = fs.existsSync(stationPath) ? JSON.parse(fs.readFileSync(stationPath, 'utf8')) : null;

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

  // 中央線快速公式列車番号マップ
  const chuoNoMap = new Map();
  if (fs.existsSync(chuoPath)) {
    const chuoTrips = JSON.parse(fs.readFileSync(chuoPath, 'utf8'));
    for (const t of chuoTrips) {
      const id = t.trainId || t.tripId?.split('_').pop();
      if (id && t.trainNumber && t.trainNumber !== id && !/^\d+$/.test(t.trainNumber)) {
        chuoNoMap.set(id, t.trainNumber);
      }
    }
  }

  // 臨時特急 鎌倉満喫五日市号など
  const SPECIAL_OME = {
    '9764': '9764M',
    '9765': '9765M',
  };

  let matchedSpecial = 0;
  let matchedChuo = 0;
  let matchedEkitan = 0;
  let fallbackCount = 0;
  const trainIdToOfficialNo = new Map();

  for (const trip of trips) {
    const originalId = trip.trainId || trip.trainNumber || '';
    trip.trainId = originalId;

    if (SPECIAL_OME[originalId]) {
      trip.trainNumber = SPECIAL_OME[originalId];
      trainIdToOfficialNo.set(originalId, trip.trainNumber);
      matchedSpecial++;
      continue;
    }

    if (chuoNoMap.has(originalId)) {
      trip.trainNumber = chuoNoMap.get(originalId);
      trainIdToOfficialNo.set(originalId, trip.trainNumber);
      matchedChuo++;
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
      matchedEkitan++;
    } else {
      fallbackCount++;
      trip.trainNumber = originalId;
      trainIdToOfficialNo.set(originalId, originalId);
    }
  }

  console.log(`GlobalTimetable 処理完了: 全 ${trips.length} 便`);
  console.log(`  特急特別指定: ${matchedSpecial} 便`);
  console.log(`  中央線直通より同期: ${matchedChuo} 便`);
  console.log(`  駅探データより突合: ${matchedEkitan} 便`);
  console.log(`  未突合(フォールバック): ${fallbackCount} 便`);
  safeWriteJson(globalPath, trips);

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
    safeWriteJson(stationPath, stationTimetables);
    console.log(`StationTimetables 同期更新完了: ${stUpdatedCount} 件`);
  }
  console.log('✅ JR青梅線の公式列車番号を正常に更新しました！\n');
}

/**
 * JR五日市線のエンリッチメント処理 (青梅線・中央線直通便の公式列車番号を同期)
 */
function enrichItsukaichi() {
  console.log('=== JR五日市線 公式列車番号エンリッチメント開始 ===');
  const globalPath = path.resolve('src/data/lines/itsukaichi/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/itsukaichi/stationTimetables.json');
  const ekitanPath = path.resolve('scripts/ekitan_itsukaichi_timetables.json');
  if (!fs.existsSync(globalPath) || !fs.existsSync(ekitanPath)) return;

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const ekitanData = JSON.parse(fs.readFileSync(ekitanPath, 'utf8'));
  const stationTimetables = fs.existsSync(stationPath) ? JSON.parse(fs.readFileSync(stationPath, 'utf8')) : null;

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

  // 臨時特急 鎌倉満喫五日市号
  const SPECIAL_ITSUKAICHI = {
    '9764': '9764M',
    '9765': '9765M',
  };

  let matchedSpecial = 0;
  let matchedCount = 0;
  let fallbackCount = 0;
  const trainIdToOfficialNo = new Map();

  for (const trip of trips) {
    const originalId = trip.trainId || trip.trainNumber || '';
    trip.trainId = originalId;

    if (SPECIAL_ITSUKAICHI[originalId]) {
      trip.trainNumber = SPECIAL_ITSUKAICHI[originalId];
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
  safeWriteJson(globalPath, trips);

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
    safeWriteJson(stationPath, stationTimetables);
    console.log(`StationTimetables 同期更新完了: ${stUpdatedCount} 件`);
  }
  console.log('✅ JR五日市線の公式列車番号を正常に更新しました！\n');
}

/**
 * 東京メトロ千代田線のエンリッチメント処理
 */
function enrichChiyoda() {
  console.log('=== 東京メトロ千代田線 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/chiyoda/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/chiyoda/stationTimetables.json');
  const cacheDir = path.resolve('scripts/cache/yahoo/chiyoda/stations');

  if (!fs.existsSync(globalPath) || !fs.existsSync(cacheDir)) {
    console.warn('必要なデータファイルが見つかりません: 東京メトロ千代田線');
    return;
  }

  const files = fs.readdirSync(cacheDir).filter(f => f.endsWith('.json'));
  const trainMap = new Map(); // `${dayKey}_${trainId}` -> vendorTrainId
  for (const f of files) {
    const isHoliday = f.includes('_k4');
    const dayKey = isHoliday ? 'holiday' : 'weekday';
    const data = JSON.parse(fs.readFileSync(path.join(cacheDir, f), 'utf8'));
    const tt = data?.timetableItem;
    for (const h of tt?.hourTimeTable || []) {
      for (const t of h.minTimeTable || []) {
        if (t.trainId && t.vendorTrainId) {
          const key = `${dayKey}_${t.trainId}`;
          if (!trainMap.has(key)) {
            trainMap.set(key, t.vendorTrainId);
          }
        }
      }
    }
  }

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
    } else {
      fallbackCount++;
      trip.trainNumber = originalId;
      trainIdToOfficialNo.set(originalId, originalId);
    }
  }

  console.log(`GlobalTimetable 処理完了: 全 ${trips.length} 便`);
  console.log(`  公式列車番号突合: ${matchedCount} 便`);
  console.log(`  未突合(フォールバック): ${fallbackCount} 便`);
  safeWriteJson(globalPath, trips);

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
    safeWriteJson(stationPath, stationTimetables);
    console.log(`StationTimetables 同期更新完了: ${stUpdatedCount} 件`);
  }
  console.log('✅ 東京メトロ千代田線の公式列車番号を正常に更新しました！\n');
}

/**
 * JR常磐線各駅停車のエンリッチメント処理
 */
function enrichJobanLocal() {
  console.log('=== JR常磐線各駅停車 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/joban_local/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/joban_local/stationTimetables.json');
  const cacheDir = path.resolve('scripts/cache/yahoo/joban_local/stations');

  if (!fs.existsSync(globalPath) || !fs.existsSync(cacheDir)) {
    console.warn('必要なデータファイルが見つかりません: JR常磐線各駅停車');
    return;
  }

  const files = fs.readdirSync(cacheDir).filter(f => f.endsWith('.json'));
  const trainMap = new Map(); // `${dayKey}_${trainId}` -> vendorTrainId
  for (const f of files) {
    const isHoliday = f.includes('_k4');
    const dayKey = isHoliday ? 'holiday' : 'weekday';
    const data = JSON.parse(fs.readFileSync(path.join(cacheDir, f), 'utf8'));
    const tt = data?.timetableItem;
    for (const h of tt?.hourTimeTable || []) {
      for (const t of h.minTimeTable || []) {
        if (t.trainId && t.vendorTrainId) {
          const key = `${dayKey}_${t.trainId}`;
          if (!trainMap.has(key)) {
            trainMap.set(key, t.vendorTrainId);
          }
        }
      }
    }
  }

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
    } else {
      fallbackCount++;
      trip.trainNumber = originalId;
      trainIdToOfficialNo.set(originalId, originalId);
    }
  }

  console.log(`GlobalTimetable 処理完了: 全 ${trips.length} 便`);
  console.log(`  公式列車番号突合: ${matchedCount} 便`);
  console.log(`  未突合(フォールバック): ${fallbackCount} 便`);
  safeWriteJson(globalPath, trips);

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
    safeWriteJson(stationPath, stationTimetables);
    console.log(`StationTimetables 同期更新完了: ${stUpdatedCount} 件`);
  }
  console.log('✅ JR常磐線各駅停車の公式列車番号を正常に更新しました！\n');
}

/**
 * JR常磐線快速のエンリッチメント処理
 */
function enrichJobanRapid() {
  console.log('=== JR常磐線快速 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/joban_rapid/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/joban_rapid/stationTimetables.json');
  const cacheDir = path.resolve('scripts/cache/yahoo/joban_rapid/stations');

  if (!fs.existsSync(globalPath) || !fs.existsSync(cacheDir)) {
    console.warn('必要なデータファイルが見つかりません: JR常磐線快速');
    return;
  }

  const files = fs.readdirSync(cacheDir).filter(f => f.endsWith('.json'));
  const trainMap = new Map(); // `${dayKey}_${trainId}` -> vendorTrainId
  for (const f of files) {
    const isHoliday = f.includes('_k4');
    const dayKey = isHoliday ? 'holiday' : 'weekday';
    const data = JSON.parse(fs.readFileSync(path.join(cacheDir, f), 'utf8'));
    const tt = data?.timetableItem;
    for (const h of tt?.hourTimeTable || []) {
      for (const t of h.minTimeTable || []) {
        if (t.trainId && t.vendorTrainId) {
          const key = `${dayKey}_${t.trainId}`;
          if (!trainMap.has(key)) {
            trainMap.set(key, t.vendorTrainId);
          }
        }
      }
    }
  }

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
    } else {
      fallbackCount++;
      trip.trainNumber = originalId;
      trainIdToOfficialNo.set(originalId, originalId);
    }
  }

  console.log(`GlobalTimetable 処理完了: 全 ${trips.length} 便`);
  console.log(`  公式列車番号突合: ${matchedCount} 便`);
  console.log(`  未突合(フォールバック): ${fallbackCount} 便`);
  safeWriteJson(globalPath, trips);

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
    safeWriteJson(stationPath, stationTimetables);
    console.log(`StationTimetables 同期更新完了: ${stUpdatedCount} 件`);
  }
  console.log('✅ JR常磐線快速の公式列車番号を正常に更新しました！\n');
}

/**
 * JR常磐線（取手～いわき）のエンリッチメント処理
 */
function enrichJobanTorideIwaki() {
  console.log('=== JR常磐線（取手～いわき） 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/joban_toride_iwaki/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/joban_toride_iwaki/stationTimetables.json');
  const cacheDir = path.resolve('scripts/cache/yahoo/joban_toride_iwaki/stations');

  if (!fs.existsSync(globalPath) || !fs.existsSync(cacheDir)) {
    console.warn('必要なデータファイルが見つかりません: JR常磐線（取手～いわき）');
    return;
  }

  const files = fs.readdirSync(cacheDir).filter(f => f.endsWith('.json'));
  const trainMap = new Map(); // `${dayKey}_${trainId}` -> vendorTrainId
  for (const f of files) {
    const isHoliday = f.includes('_k4');
    const dayKey = isHoliday ? 'holiday' : 'weekday';
    const data = JSON.parse(fs.readFileSync(path.join(cacheDir, f), 'utf8'));
    const tt = data?.timetableItem;
    for (const h of tt?.hourTimeTable || []) {
      for (const t of h.minTimeTable || []) {
        if (t.trainId && t.vendorTrainId) {
          const key = `${dayKey}_${t.trainId}`;
          if (!trainMap.has(key)) {
            trainMap.set(key, t.vendorTrainId);
          }
        }
      }
    }
  }

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
    } else {
      fallbackCount++;
      trip.trainNumber = originalId;
      trainIdToOfficialNo.set(originalId, originalId);
    }
  }

  console.log(`GlobalTimetable 処理完了: 全 ${trips.length} 便`);
  console.log(`  公式列車番号突合: ${matchedCount} 便`);
  console.log(`  未突合(フォールバック): ${fallbackCount} 便`);
  safeWriteJson(globalPath, trips);

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
    safeWriteJson(stationPath, stationTimetables);
    console.log(`StationTimetables 同期更新完了: ${stUpdatedCount} 件`);
  }
  console.log('✅ JR常磐線（取手～いわき）の公式列車番号を正常に更新しました！\n');
}

/**
 * JR常磐線（いわき～仙台）のエンリッチメント処理
 */
function enrichJobanIwakiSendai() {
  console.log('=== JR常磐線（いわき～仙台） 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/joban_iwaki_sendai/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/joban_iwaki_sendai/stationTimetables.json');
  const cacheDir = path.resolve('scripts/cache/yahoo/joban_iwaki_sendai/stations');

  if (!fs.existsSync(globalPath) || !fs.existsSync(cacheDir)) {
    console.warn('必要なデータファイルが見つかりません: JR常磐線（いわき～仙台）');
    return;
  }

  const files = fs.readdirSync(cacheDir).filter(f => f.endsWith('.json'));
  const trainMap = new Map(); // `${dayKey}_${trainId}` -> vendorTrainId
  for (const f of files) {
    const isHoliday = f.includes('_k4');
    const dayKey = isHoliday ? 'holiday' : 'weekday';
    const data = JSON.parse(fs.readFileSync(path.join(cacheDir, f), 'utf8'));
    const tt = data?.timetableItem;
    for (const h of tt?.hourTimeTable || []) {
      for (const t of h.minTimeTable || []) {
        if (t.trainId && t.vendorTrainId) {
          const key = `${dayKey}_${t.trainId}`;
          if (!trainMap.has(key)) {
            trainMap.set(key, t.vendorTrainId);
          }
        }
      }
    }
  }

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
    } else {
      fallbackCount++;
      trip.trainNumber = originalId;
      trainIdToOfficialNo.set(originalId, originalId);
    }
  }

  console.log(`GlobalTimetable 処理完了: 全 ${trips.length} 便`);
  console.log(`  公式列車番号突合: ${matchedCount} 便`);
  console.log(`  未突合(フォールバック): ${fallbackCount} 便`);
  safeWriteJson(globalPath, trips);

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
    safeWriteJson(stationPath, stationTimetables);
    console.log(`StationTimetables 同期更新完了: ${stUpdatedCount} 件`);
  }
  console.log('✅ JR常磐線（いわき～仙台）の公式列車番号を正常に更新しました！\n');
}

/**
 * JR東北新幹線のエンリッチメント処理
 */
function enrichTohokuShinkansen() {
  console.log('=== JR東北新幹線 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/tohoku_shinkansen/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/tohoku_shinkansen/stationTimetables.json');
  const cacheDir = path.resolve('scripts/cache/yahoo/tohoku_shinkansen/stations');

  if (!fs.existsSync(globalPath) || !fs.existsSync(cacheDir)) {
    console.warn('必要なデータファイルが見つかりません: JR東北新幹線');
    return;
  }

  const files = fs.readdirSync(cacheDir).filter(f => f.endsWith('.json'));
  const trainMap = new Map(); // `${dayKey}_${trainId}` -> vendorTrainId
  for (const f of files) {
    const isHoliday = f.includes('_k4');
    const dayKey = isHoliday ? 'holiday' : 'weekday';
    const data = JSON.parse(fs.readFileSync(path.join(cacheDir, f), 'utf8'));
    const tt = data?.timetableItem;
    for (const h of tt?.hourTimeTable || []) {
      for (const t of h.minTimeTable || []) {
        if (t.trainId && t.vendorTrainId) {
          const key = `${dayKey}_${t.trainId}`;
          if (!trainMap.has(key)) {
            trainMap.set(key, t.vendorTrainId);
          }
        }
      }
    }
  }

  // all_train_details.json から displayName を収集（東北・山形・秋田）
  const detailsMap = new Map();
  for (const subLine of ['tohoku_shinkansen', 'yamagata_shinkansen', 'akita_shinkansen']) {
    const dPath = path.resolve(`scripts/cache/yahoo/${subLine}/all_train_details.json`);
    if (fs.existsSync(dPath)) {
      const details = JSON.parse(fs.readFileSync(dPath, 'utf8'));
      for (const d of details) {
        if (!detailsMap.has(d.trainId)) {
          detailsMap.set(d.trainId, d);
        }
      }
    }
  }

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

    let officialNo = null;

    // 1. vendorTrainId からの解決
    if (trainMap.has(key)) {
      officialNo = normalizeTrainNumber(trainMap.get(key));
    }

    // 2. displayName からの号数抽出フォールバック
    if (!officialNo) {
      const detail = detailsMap.get(originalId);
      if (detail && detail.displayName) {
        const hayabusaMatch = detail.displayName.match(/はやぶさ(\d+)号/);
        if (hayabusaMatch) {
          const num = parseInt(hayabusaMatch[1], 10);
          officialNo = `${num >= 50 && num <= 99 ? 5000 + num : num}B`;
        }
        const yamabikoMatch = detail.displayName.match(/やまびこ(\d+)号/);
        if (yamabikoMatch) {
          const num = parseInt(yamabikoMatch[1], 10);
          officialNo = `${num >= 70 && num <= 99 ? 9000 + num : num}B`;
        }
        const nasunoMatch = detail.displayName.match(/なすの(\d+)号/);
        if (nasunoMatch) {
          const num = parseInt(nasunoMatch[1], 10);
          officialNo = `${num}B`;
        }
        const tsubasaMatch = detail.displayName.match(/つばさ(\d+)号/);
        if (tsubasaMatch) {
          const num = parseInt(tsubasaMatch[1], 10);
          officialNo = `${num >= 70 && num <= 99 ? 8000 + num : num}M`;
        }
        const komachiMatch = detail.displayName.match(/こまち(\d+)号/);
        if (komachiMatch) {
          const num = parseInt(komachiMatch[1], 10);
          officialNo = `${num >= 60 && num <= 99 ? 8000 + num : 3000 + num}M`;
        }
      }
    }

    if (officialNo) {
      trip.trainNumber = officialNo;
      trainIdToOfficialNo.set(originalId, trip.trainNumber);
      matchedCount++;
    } else {
      fallbackCount++;
      trip.trainNumber = originalId;
      trainIdToOfficialNo.set(originalId, originalId);
    }
  }

  console.log(`GlobalTimetable 処理完了: 全 ${trips.length} 便`);
  console.log(`  公式列車番号突合: ${matchedCount} 便`);
  console.log(`  未突合(フォールバック): ${fallbackCount} 便`);
  safeWriteJson(globalPath, trips);

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
    safeWriteJson(stationPath, stationTimetables);
    console.log(`StationTimetables 同期更新完了: ${stUpdatedCount} 件`);
  }
  console.log('✅ JR東北新幹線の公式列車番号を正常に更新しました！\n');
}

/**
 * JR上越新幹線のエンリッチメント処理
 */
function enrichJoetsuShinkansen() {
  console.log('=== JR上越新幹線 公式列車番号エンリッチメント開始 ===');

  const globalPath = path.resolve('src/data/lines/joetsu_shinkansen/globalTimetable.json');
  const stationPath = path.resolve('src/data/lines/joetsu_shinkansen/stationTimetables.json');
  const cacheDir = path.resolve('scripts/cache/yahoo/joetsu_shinkansen/stations');

  if (!fs.existsSync(globalPath) || !fs.existsSync(cacheDir)) {
    console.warn('必要なデータファイルが見つかりません: JR上越新幹線');
    return;
  }

  const files = fs.readdirSync(cacheDir).filter(f => f.endsWith('.json'));
  const trainMap = new Map(); // `${dayKey}_${trainId}` -> vendorTrainId
  for (const f of files) {
    const isHoliday = f.includes('_k4');
    const dayKey = isHoliday ? 'holiday' : 'weekday';
    const data = JSON.parse(fs.readFileSync(path.join(cacheDir, f), 'utf8'));
    const tt = data?.timetableItem;
    for (const h of tt?.hourTimeTable || []) {
      for (const t of h.minTimeTable || []) {
        if (t.trainId && t.vendorTrainId) {
          const key = `${dayKey}_${t.trainId}`;
          if (!trainMap.has(key)) {
            trainMap.set(key, t.vendorTrainId);
          }
        }
      }
    }
  }

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
    } else {
      fallbackCount++;
      trip.trainNumber = originalId;
      trainIdToOfficialNo.set(originalId, originalId);
    }
  }

  console.log(`GlobalTimetable 処理完了: 全 ${trips.length} 便`);
  console.log(`  公式列車番号突合: ${matchedCount} 便`);
  console.log(`  未突合(フォールバック): ${fallbackCount} 便`);
  safeWriteJson(globalPath, trips);

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
    safeWriteJson(stationPath, stationTimetables);
    console.log(`StationTimetables 同期更新完了: ${stUpdatedCount} 件`);
  }
  console.log('✅ JR上越新幹線の公式列車番号を正常に更新しました！\n');
}



