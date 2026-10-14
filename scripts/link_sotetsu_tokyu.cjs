// 東急東横線・東急新横浜線・相鉄新横浜線・相鉄本線・相鉄いずみ野線・相鉄JR直通線 統合直通リンカー
const fs = require('fs');
const path = require('path');

function timeToSec(t) {
  if (!t) return null;
  const parts = t.split(':').map(Number);
  let h = parts[0];
  if (h < 4) h += 24;
  return h * 3600 + parts[1] * 60 + (parts[2] || 0);
}

function extractYahooTrainId(tripId) {
  if (!tripId) return null;
  const parts = tripId.split('_');
  return parts[parts.length - 1];
}

const STATION_NAMES = {
  // 東急新横浜線
  'SH-01': '新横浜', 'SH-02': '新綱島', 'SH-03': '日吉',
  // 相鉄新横浜線
  'SO-52': '新横浜', 'SO-51': '羽沢横浜国大', 'SO-08': '西谷',
  // 相鉄本線
  'SO-01': '横浜', 'SO-02': '平沼橋', 'SO-03': '西横浜', 'SO-04': '天王町', 'SO-05': '星川',
  'SO-06': '和田町', 'SO-07': '上星川', 'SO-09': '鶴ヶ峰', 'SO-10': '二俣川',
  'SO-11': '希望ヶ丘', 'SO-12': '三ツ境', 'SO-13': '瀬谷', 'SO-14': '大和', 'SO-15': '相模大塚',
  'SO-16': 'さがみ野', 'SO-17': 'かしわ台', 'SO-18': '海老名',
  // 相鉄いずみ野線
  'SO-31': '南万騎が原', 'SO-32': '緑園都市', 'SO-33': '弥生台', 'SO-34': 'いずみ野',
  'SO-35': 'いずみ中央', 'SO-36': 'ゆめが丘', 'SO-37': '湘南台',
  // 相鉄・JR直通線
  'JS-20': '新宿', 'JS-19': '渋谷', 'JS-18': '恵比寿', 'JS-17': '大崎', 'JS-16': '西大井', 'JS-15': '武蔵小杉',
  // 東急東横線
  'TY-01': '渋谷', 'TY-13': '日吉', 'TY-21': '横浜',
};

function linkLinePair({
  lineAId,
  lineBId,
  tripsA,
  tripsB,
  stationAId,
  stationBId,
  dirA,
  dirB,
  linkName,
  maxTimeDiff = 360,
}) {
  let linkedCount = 0;

  // lineA (stationAId着) -> lineB (stationBId発)
  const candidatesB = tripsB.filter((tB) => {
    if (tB.direction !== dirB) return false;
    const firstStop = tB.stops[0];
    return firstStop && firstStop.stationId === stationBId;
  });

  for (const tA of tripsA) {
    if (tA.direction !== dirA) continue;
    const lastStop = tA.stops[tA.stops.length - 1];
    if (!lastStop || lastStop.stationId !== stationAId) continue;
    if (tA.throughTripId) continue; // すでに直通設定済み

    const tASec = timeToSec(lastStop.arrivalTime || lastStop.departureTime);
    const yIdA = extractYahooTrainId(tA.tripId);
    const noA = tA.trainNumber;

    let bestB = null;
    let minDiff = Infinity;

    for (const tB of candidatesB) {
      if (tA.isHoliday !== tB.isHoliday) continue;
      if (tB.prevTripId) continue; // すでに他から接続済み

      const firstStop = tB.stops[0];
      const tBSec = timeToSec(firstStop.departureTime || firstStop.arrivalTime);
      const diff = Math.abs(tBSec - tASec);

      const yIdB = extractYahooTrainId(tB.tripId);
      const noB = tB.trainNumber;

      // 1. Yahoo trainId が完全一致 (最優先)
      if (yIdA && yIdB && yIdA === yIdB && diff <= maxTimeDiff) {
        bestB = tB;
        break;
      }

      // 2. 列車番号が一致し、時刻差が180秒以内
      if (noA && noB && noA === noB && diff <= 180 && diff < minDiff) {
        minDiff = diff;
        bestB = tB;
      } else if (diff <= 120 && diff < minDiff) {
        // 3. 時刻差が120秒以内で最小
        minDiff = diff;
        bestB = tB;
      }
    }

    if (bestB) {
      tA.throughTripId = bestB.tripId;
      tA.throughLineId = lineBId;
      bestB.prevTripId = tA.tripId;
      bestB.prevLineId = lineAId;

      // 境界駅での時刻シームレス同期 (空白時間による列車消失の防止)
      const syncTime = lastStop.arrivalTime || lastStop.departureTime;
      lastStop.departureTime = syncTime;
      bestB.stops[0].arrivalTime = syncTime;

      linkedCount++;
    }
  }

  console.log(`  [${linkName}] 接続完了: ${linkedCount} 本`);
  return linkedCount;
}

function run() {
  console.log('=== 東急・相鉄・JR直通線 統合直通リンカー実行開始 ===');

  const tyPath = path.resolve('src/data/lines/tokyu_toyoko/globalTimetable.json');
  const shPath = path.resolve('src/data/lines/tokyu_shin_yokohama/globalTimetable.json');
  const ssPath = path.resolve('src/data/lines/sotetsu_shin_yokohama/globalTimetable.json');
  const smPath = path.resolve('src/data/lines/sotetsu_main/globalTimetable.json');
  const siPath = path.resolve('src/data/lines/sotetsu_izumino/globalTimetable.json');
  const jrPath = path.resolve('src/data/lines/sotetsu_jr_direct/globalTimetable.json');

  const tyTrips = fs.existsSync(tyPath) ? JSON.parse(fs.readFileSync(tyPath, 'utf8')) : [];
  const shTrips = fs.existsSync(shPath) ? JSON.parse(fs.readFileSync(shPath, 'utf8')) : [];
  const ssTrips = fs.existsSync(ssPath) ? JSON.parse(fs.readFileSync(ssPath, 'utf8')) : [];
  const smTrips = fs.existsSync(smPath) ? JSON.parse(fs.readFileSync(smPath, 'utf8')) : [];
  const siTrips = fs.existsSync(siPath) ? JSON.parse(fs.readFileSync(siPath, 'utf8')) : [];
  const jrTrips = fs.existsSync(jrPath) ? JSON.parse(fs.readFileSync(jrPath, 'utf8')) : [];

  // 相鉄・新横浜線関連のリンクのみを安全にリセット
  const sLines = new Set(['tokyu_shin_yokohama', 'sotetsu_shin_yokohama', 'sotetsu_main', 'sotetsu_izumino', 'sotetsu_jr_direct']);
  
  for (const t of tyTrips) {
    if (sLines.has(t.throughLineId)) {
      delete t.throughTripId;
      delete t.throughLineId;
    }
    if (sLines.has(t.prevLineId)) {
      delete t.prevTripId;
      delete t.prevLineId;
    }
  }

  for (const list of [shTrips, ssTrips, smTrips, siTrips, jrTrips]) {
    for (const t of list) {
      delete t.throughTripId;
      delete t.throughLineId;
      delete t.prevTripId;
      delete t.prevLineId;
    }
  }

  // 1. 東急東横線 ↔ 東急新横浜線 (日吉: TY-13 / SH-03)
  console.log('\n1. 東急東横線 ↔ 東急新横浜線 (日吉)');
  linkLinePair({
    lineAId: 'tokyu_toyoko',
    lineBId: 'tokyu_shin_yokohama',
    tripsA: tyTrips,
    tripsB: shTrips,
    stationAId: 'TY-13',
    stationBId: 'SH-03',
    dirA: 'outbound',
    dirB: 'outbound',
    linkName: '東横線 -> 東急新横浜線 (下り)',
    maxTimeDiff: 300,
  });
  linkLinePair({
    lineAId: 'tokyu_shin_yokohama',
    lineBId: 'tokyu_toyoko',
    tripsA: shTrips,
    tripsB: tyTrips,
    stationAId: 'SH-03',
    stationBId: 'TY-13',
    dirA: 'inbound',
    dirB: 'inbound',
    linkName: '東急新横浜線 -> 東横線 (上り)',
    maxTimeDiff: 300,
  });

  // 2. 東急新横浜線 ↔ 相鉄新横浜線 (新横浜: SH-01 / SO-52)
  console.log('\n2. 東急新横浜線 ↔ 相鉄新横浜線 (新横浜)');
  linkLinePair({
    lineAId: 'tokyu_shin_yokohama',
    lineBId: 'sotetsu_shin_yokohama',
    tripsA: shTrips,
    tripsB: ssTrips,
    stationAId: 'SH-01',
    stationBId: 'SO-52',
    dirA: 'outbound',
    dirB: 'outbound',
    linkName: '東急新横浜線 -> 相鉄新横浜線 (下り)',
    maxTimeDiff: 360,
  });
  linkLinePair({
    lineAId: 'sotetsu_shin_yokohama',
    lineBId: 'tokyu_shin_yokohama',
    tripsA: ssTrips,
    tripsB: shTrips,
    stationAId: 'SO-52',
    stationBId: 'SH-01',
    dirA: 'inbound',
    dirB: 'inbound',
    linkName: '相鉄新横浜線 -> 東急新横浜線 (上り)',
    maxTimeDiff: 360,
  });

  // 3. 相鉄新横浜線 ↔ 相鉄本線 (西谷: SO-08)
  console.log('\n3. 相鉄新横浜線 ↔ 相鉄本線 (西谷)');
  linkLinePair({
    lineAId: 'sotetsu_shin_yokohama',
    lineBId: 'sotetsu_main',
    tripsA: ssTrips,
    tripsB: smTrips,
    stationAId: 'SO-08',
    stationBId: 'SO-08',
    dirA: 'outbound',
    dirB: 'outbound',
    linkName: '相鉄新横浜線 -> 相鉄本線 (下り)',
    maxTimeDiff: 360,
  });
  linkLinePair({
    lineAId: 'sotetsu_main',
    lineBId: 'sotetsu_shin_yokohama',
    tripsA: smTrips,
    tripsB: ssTrips,
    stationAId: 'SO-08',
    stationBId: 'SO-08',
    dirA: 'inbound',
    dirB: 'inbound',
    linkName: '相鉄本線 -> 相鉄新横浜線 (上り)',
    maxTimeDiff: 360,
  });

  // 4. 相鉄本線 ↔ 相鉄いずみ野線 (二俣川: SO-10)
  console.log('\n4. 相鉄本線 ↔ 相鉄いずみ野線 (二俣川)');
  linkLinePair({
    lineAId: 'sotetsu_main',
    lineBId: 'sotetsu_izumino',
    tripsA: smTrips,
    tripsB: siTrips,
    stationAId: 'SO-10',
    stationBId: 'SO-10',
    dirA: 'outbound',
    dirB: 'outbound',
    linkName: '相鉄本線 -> 相鉄いずみ野線 (下り)',
    maxTimeDiff: 300,
  });
  linkLinePair({
    lineAId: 'sotetsu_izumino',
    lineBId: 'sotetsu_main',
    tripsA: siTrips,
    tripsB: smTrips,
    stationAId: 'SO-10',
    stationBId: 'SO-10',
    dirA: 'inbound',
    dirB: 'inbound',
    linkName: '相鉄いずみ野線 -> 相鉄本線 (上り)',
    maxTimeDiff: 300,
  });

  // 5. 相鉄新横浜線 ↔ 相鉄・JR直通線 (羽沢横浜国大: SO-51)
  console.log('\n5. 相鉄新横浜線 ↔ 相鉄・JR直通線 (羽沢横浜国大)');
  // 新宿 -> 羽沢横浜国大 -> 西谷方面 (下り)
  linkLinePair({
    lineAId: 'sotetsu_jr_direct',
    lineBId: 'sotetsu_shin_yokohama',
    tripsA: jrTrips,
    tripsB: ssTrips,
    stationAId: 'SO-51',
    stationBId: 'SO-51',
    dirA: 'inbound',
    dirB: 'outbound',
    linkName: '相鉄・JR直通線 -> 相鉄新横浜線 (下り)',
    maxTimeDiff: 360,
  });
  // 西谷方面 -> 羽沢横浜国大 -> 新宿方面 (上り)
  linkLinePair({
    lineAId: 'sotetsu_shin_yokohama',
    lineBId: 'sotetsu_jr_direct',
    tripsA: ssTrips,
    tripsB: jrTrips,
    stationAId: 'SO-51',
    stationBId: 'SO-51',
    dirA: 'inbound',
    dirB: 'outbound',
    linkName: '相鉄新横浜線 -> 相鉄・JR直通線 (上り)',
    maxTimeDiff: 360,
  });

  // 6. 全トリップの End-to-End 行先（customDestination）解決
  console.log('\n6. 全路線の直通チェーン最終行先（End-to-End）の解決開始');

  // 全トリップのマップを作成
  const allTripsMap = new Map();
  for (const list of [tyTrips, shTrips, ssTrips, smTrips, siTrips, jrTrips]) {
    for (const t of list) {
      allTripsMap.set(t.tripId, t);
    }
  }

  // 直通チェーンを末尾まで辿って最終行先を特定する関数
  function resolveChainDestination(startTrip) {
    let curr = startTrip;
    const visited = new Set([curr.tripId]);

    // throughTripId を前方に辿る
    while (curr.throughTripId && allTripsMap.has(curr.throughTripId)) {
      const next = allTripsMap.get(curr.throughTripId);
      if (visited.has(next.tripId)) break;
      visited.add(next.tripId);
      curr = next;
    }

    // チェーンの最後のトリップの行先を決定
    let destName = curr.customDestination;
    // customDestination が境界駅（新横浜、西谷、日吉等）や大雑把な文字列の場合は終着駅ID名を採用
    const lastStop = curr.stops[curr.stops.length - 1];
    const finalStationName = STATION_NAMES[curr.destinationStationId] || (lastStop ? STATION_NAMES[lastStop.stationId] : null);

    // 適切な行先名の優先判定
    if (destName) {
      // (相鉄・小田急) などの注記を整理
      destName = destName.replace(/\(相鉄・小田急\)/g, '').trim();
    }

    // 終着駅が相鉄線終点（海老名、湘南台等）やJR新宿なら優先
    if (finalStationName && (!destName || destName === '西谷' || destName === '新横浜' || destName === '日吉')) {
      destName = finalStationName;
    }

    return destName || finalStationName || '行先不明';
  }

  // 各直通チェーンに属するトリップすべてに同一の最終行先を設定
  const resolvedChains = new Set();
  let updatedTripCount = 0;

  for (const [tripId, trip] of allTripsMap.entries()) {
    if (resolvedChains.has(tripId)) continue;
    if (!trip.throughTripId && !trip.prevTripId) continue; // 単独運行列車はスキップ

    // チェーン全体の全トリップを収集
    const chain = [];
    // 1. 先頭（最上流）まで戻る
    let head = trip;
    const visitedBack = new Set([head.tripId]);
    while (head.prevTripId && allTripsMap.has(head.prevTripId)) {
      const p = allTripsMap.get(head.prevTripId);
      if (visitedBack.has(p.tripId)) break;
      visitedBack.add(p.tripId);
      head = p;
    }

    // 2. 先頭から末尾まで収集
    let curr = head;
    const visitedFwd = new Set();
    while (curr && !visitedFwd.has(curr.tripId)) {
      visitedFwd.add(curr.tripId);
      chain.push(curr);
      if (curr.throughTripId && allTripsMap.has(curr.throughTripId)) {
        curr = allTripsMap.get(curr.throughTripId);
      } else {
        break;
      }
    }

    // チェーンの最終行先を解決
    const finalDest = resolveChainDestination(head);

    // チェーン内の全トリップに設定
    for (const t of chain) {
      resolvedChains.add(t.tripId);
      if (t.customDestination !== finalDest) {
        t.customDestination = finalDest;
        updatedTripCount++;
      }
    }
  }

  console.log(`  ✅ 最終行先解決完了: ${updatedTripCount} トリップの customDestination を同期・統一`);

  // 保存
  fs.writeFileSync(tyPath, JSON.stringify(tyTrips, null, 2), 'utf8');
  fs.writeFileSync(shPath, JSON.stringify(shTrips, null, 2), 'utf8');
  fs.writeFileSync(ssPath, JSON.stringify(ssTrips, null, 2), 'utf8');
  fs.writeFileSync(smPath, JSON.stringify(smTrips, null, 2), 'utf8');
  fs.writeFileSync(siPath, JSON.stringify(siTrips, null, 2), 'utf8');
  fs.writeFileSync(jrPath, JSON.stringify(jrTrips, null, 2), 'utf8');

  console.log('\n✅ 全路線の globalTimetable.json への直通リンクおよび行先同期が完了しました！');
}

run();
