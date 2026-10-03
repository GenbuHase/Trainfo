// 東武東上線 ↔ 東京メトロ有楽町線・副都心線 和光市駅相互直通リンカースクリプト
const fs = require('fs');
const path = require('path');

function linkTojoAndMetro() {
  const tojoPath = path.resolve('src/data/lines/tojo/globalTimetable.json');
  const yurakuchoPath = path.resolve('src/data/lines/yurakucho/globalTimetable.json');
  const fukutoshinPath = path.resolve('src/data/lines/fukutoshin/globalTimetable.json');

  const tojoTrips = JSON.parse(fs.readFileSync(tojoPath, 'utf8'));
  const yurakuchoTrips = JSON.parse(fs.readFileSync(yurakuchoPath, 'utf8'));
  const fukutoshinTrips = JSON.parse(fs.readFileSync(fukutoshinPath, 'utf8'));

  function loadStations(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/export const [A-Z0-9_]+: Station\[] =\s*(\[[\s\S]*?\]);\s*$/m);
    return eval(match[1]);
  }

  const tojoStations = loadStations('src/data/lines/tojo/stations.ts');
  const yurakuchoStations = loadStations('src/data/lines/yurakucho/stations.ts');
  const fukutoshinStations = loadStations('src/data/lines/fukutoshin/stations.ts');

  const tojoStMap = new Map(tojoStations.map(s => [s.id, s]));
  const yStMap = new Map(yurakuchoStations.map(s => [s.id, s]));
  const fStMap = new Map(fukutoshinStations.map(s => [s.id, s]));

  let inbToY = 0;
  let inbToF = 0;
  let outbFromY = 0;
  let outbFromF = 0;

  // -------------------------------------------------------------
  // 1. 東上線 -> 地下鉄方面 (上り東上線 -> 下り有楽町線/副都心線)
  // -------------------------------------------------------------
  const tojoInbToWakoshi = tojoTrips.filter(t => t.direction === 'inbound' && t.destinationStationId === 'TJ-11');
  const yOutFromWakoshi = yurakuchoTrips.filter(t => t.direction === 'outbound' && t.originStationId === 'Y-01');
  const fOutFromWakoshi = fukutoshinTrips.filter(t => t.direction === 'outbound' && t.originStationId === 'F-01');

  for (const tj of tojoInbToWakoshi) {
    // 列車番号と運行日（weekday/holiday）による完全一致
    let matchedMetro = yOutFromWakoshi.find(m => m.trainNumber === tj.trainNumber && m.isHoliday === tj.isHoliday);
    let targetLineId = 'yurakucho';

    if (!matchedMetro) {
      matchedMetro = fOutFromWakoshi.find(m => m.trainNumber === tj.trainNumber && m.isHoliday === tj.isHoliday);
      targetLineId = 'fukutoshin';
    }

    if (matchedMetro) {
      tj.throughTripId = matchedMetro.tripId;
      tj.throughLineId = targetLineId;

      const metroDestMap = targetLineId === 'yurakucho' ? yStMap : fStMap;
      const metroDest = metroDestMap.get(matchedMetro.destinationStationId);
      tj.customDestination = matchedMetro.customDestination || metroDest?.name || tj.customDestination;

      const tjOrig = tojoStMap.get(tj.originStationId);
      matchedMetro.customOrigin = tj.customOrigin || tjOrig?.name || '森林公園';

      if (targetLineId === 'yurakucho') inbToY++;
      else inbToF++;
    } else {
      console.warn(`[TJ->Metro] No match for Tojo trip ${tj.tripId} (trainNo: ${tj.trainNumber})`);
    }
  }

  // -------------------------------------------------------------
  // 2. 地下鉄 -> 東上線方面 (上り有楽町線/副都心線 -> 下り東上線)
  // -------------------------------------------------------------
  // 東上線下りの和光市始発列車 (全178本)
  const tojoOutFromWakoshi = tojoTrips.filter(t => t.direction === 'outbound' && t.originStationId === 'TJ-11');
  
  // 有楽町線から東上線への直通列車 (trainNumber 一致)
  const yInbToWakoshi = yurakuchoTrips.filter(t => t.direction === 'inbound' && t.destinationStationId === 'Y-01');
  for (const y of yInbToWakoshi) {
    const tj = tojoOutFromWakoshi.find(t => t.trainNumber === y.trainNumber && t.isHoliday === y.isHoliday);
    if (tj) {
      y.throughTripId = tj.tripId;
      y.throughLineId = 'tojo';
      const tjDest = tojoStMap.get(tj.destinationStationId);
      y.customDestination = tj.customDestination || tjDest?.name || y.customDestination;

      const yOrig = yStMap.get(y.originStationId);
      tj.customOrigin = y.customOrigin || yOrig?.name || '新木場';
      outbFromY++;
    }
  }

  // 副都心線から東上線への直通列車 (trainNumber 一致)
  const fInbToWakoshi = fukutoshinTrips.filter(t => t.direction === 'inbound' && t.destinationStationId === 'F-01');
  for (const f of fInbToWakoshi) {
    const tj = tojoOutFromWakoshi.find(t => t.trainNumber === f.trainNumber && t.isHoliday === f.isHoliday);
    if (tj) {
      f.throughTripId = tj.tripId;
      f.throughLineId = 'tojo';
      const tjDest = tojoStMap.get(tj.destinationStationId);
      f.customDestination = tj.customDestination || tjDest?.name || f.customDestination;

      const fOrig = fStMap.get(f.originStationId);
      tj.customOrigin = f.customOrigin || fOrig?.name || '元町・中華街';
      outbFromF++;
    }
  }

  console.log(`\n============================================================`);
  console.log(`✅ 東上線 ↔ 東京メトロ 和光市駅直通リンク完了:`);
  console.log(`  東上線 -> 有楽町線: ${inbToY} 本 / 81 本`);
  console.log(`  東上線 -> 副都心線: ${inbToF} 本 / 97 本`);
  console.log(`  東上線直通合計: ${inbToY + inbToF} 本 / 178 本`);
  console.log(`------------------------------------------------------------`);
  console.log(`  有楽町線 -> 東上線: ${outbFromY} 本 / 93 本`);
  console.log(`  副都心線 -> 東上線: ${outbFromF} 本 / 85 本`);
  console.log(`  地下鉄直通合計: ${outbFromY + outbFromF} 本 / 178 本`);
  console.log(`============================================================\n`);

  fs.writeFileSync(tojoPath, JSON.stringify(tojoTrips, null, 2), 'utf8');
  fs.writeFileSync(yurakuchoPath, JSON.stringify(yurakuchoTrips, null, 2), 'utf8');
  fs.writeFileSync(fukutoshinPath, JSON.stringify(fukutoshinTrips, null, 2), 'utf8');
  console.log('✅ 全3路線の globalTimetable.json を更新しました。');
}

module.exports = { linkTojoAndMetro };

if (require.main === module) {
  linkTojoAndMetro();
}
