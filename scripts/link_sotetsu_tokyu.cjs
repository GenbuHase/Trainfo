// 東急東横線・東急新横浜線・相鉄新横浜線・相鉄本線・相鉄いずみ野線 直通リンカー
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
  getDestNameB,
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

    const tASec = timeToSec(lastStop.arrivalTime || lastStop.departureTime);
    const yIdA = extractYahooTrainId(tA.tripId);
    const noA = tA.trainNumber;

    let bestB = null;
    let minDiff = Infinity;

    for (const tB of candidatesB) {
      if (tA.isHoliday !== tB.isHoliday) continue;
      if (tB.prevTripId) continue; // すでに接続済み

      const firstStop = tB.stops[0];
      const tBSec = timeToSec(firstStop.departureTime || firstStop.arrivalTime);
      const diff = Math.abs(tBSec - tASec);

      const yIdB = extractYahooTrainId(tB.tripId);
      const noB = tB.trainNumber;

      // 1. Yahoo trainId が完全一致
      if (yIdA && yIdB && yIdA === yIdB && diff <= 300) {
        bestB = tB;
        break;
      }

      // 2. 列車番号が一致し、時刻差が120秒以内
      if (noA && noB && noA === noB && diff <= 120 && diff < minDiff) {
        minDiff = diff;
        bestB = tB;
      } else if (diff <= 60 && diff < minDiff) {
        // 3. 時刻差が60秒以内で最小
        minDiff = diff;
        bestB = tB;
      }
    }

    if (bestB) {
      tA.throughTripId = bestB.tripId;
      tA.throughLineId = lineBId;
      bestB.prevTripId = tA.tripId;
      bestB.prevLineId = lineAId;

      if (getDestNameB) {
        const destName = getDestNameB(bestB);
        if (destName) {
          tA.customDestination = destName;
        }
      }

      linkedCount++;
    }
  }

  console.log(`  [${linkName}] 接続完了: ${linkedCount} 本`);
  return linkedCount;
}

function run() {
  console.log('=== 東急・相鉄 直通運転リンカー実行開始 ===');

  const tyPath = path.resolve('src/data/lines/tokyu_toyoko/globalTimetable.json');
  const shPath = path.resolve('src/data/lines/tokyu_shin_yokohama/globalTimetable.json');
  const ssPath = path.resolve('src/data/lines/sotetsu_shin_yokohama/globalTimetable.json');
  const smPath = path.resolve('src/data/lines/sotetsu_main/globalTimetable.json');
  const siPath = path.resolve('src/data/lines/sotetsu_izumino/globalTimetable.json');

  const tyTrips = fs.existsSync(tyPath) ? JSON.parse(fs.readFileSync(tyPath, 'utf8')) : [];
  const shTrips = fs.existsSync(shPath) ? JSON.parse(fs.readFileSync(shPath, 'utf8')) : [];
  const ssTrips = fs.existsSync(ssPath) ? JSON.parse(fs.readFileSync(ssPath, 'utf8')) : [];
  const smTrips = fs.existsSync(smPath) ? JSON.parse(fs.readFileSync(smPath, 'utf8')) : [];
  const siTrips = fs.existsSync(siPath) ? JSON.parse(fs.readFileSync(siPath, 'utf8')) : [];

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
    getDestNameB: (tB) => (tB.destinationStationId === 'SH-01' ? '新横浜' : '海老名'),
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
    getDestNameB: (tB) => (tB.destinationStationId === 'TY-01' ? '渋谷' : '和光市'),
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
    getDestNameB: (tB) => (tB.destinationStationId === 'SO-08' ? '西谷' : '海老名'),
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
    getDestNameB: (tB) => (tB.destinationStationId === 'SH-03' ? '日吉' : '渋谷・目黒方面'),
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
    getDestNameB: (tB) => (tB.destinationStationId === 'SO-18' ? '海老名' : '湘南台'),
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
    getDestNameB: (tB) => (tB.destinationStationId === 'SO-52' ? '新横浜' : '渋谷・新宿方面'),
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
    getDestNameB: (tB) => (tB.destinationStationId === 'SO-37' ? '湘南台' : 'いずみ野'),
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
    getDestNameB: (tB) => (tB.destinationStationId === 'SO-01' ? '横浜' : '新横浜・渋谷方面'),
  });

  // 保存
  fs.writeFileSync(tyPath, JSON.stringify(tyTrips, null, 2), 'utf8');
  fs.writeFileSync(shPath, JSON.stringify(shTrips, null, 2), 'utf8');
  fs.writeFileSync(ssPath, JSON.stringify(ssTrips, null, 2), 'utf8');
  fs.writeFileSync(smPath, JSON.stringify(smTrips, null, 2), 'utf8');
  fs.writeFileSync(siPath, JSON.stringify(siTrips, null, 2), 'utf8');

  console.log('\n✅ 全路線の globalTimetable.json への直通リンク更新が完了しました！');
}

run();
