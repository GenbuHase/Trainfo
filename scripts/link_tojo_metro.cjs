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
    const tjLastStop = tj.stops[tj.stops.length - 1];
    const tjArrTime = tjLastStop?.arrivalTime || tjLastStop?.departureTime;

    const isYurakucho = tj.customDestination?.includes('新木場') || tj.customDestination?.includes('豊洲');
    const targetLineId = isYurakucho ? 'yurakucho' : 'fukutoshin';
    const metroCandidates = isYurakucho ? yOutFromWakoshi : fOutFromWakoshi;

    // A. 列車番号完全一致
    let matchedMetro = metroCandidates.find(m => m.trainNumber === tj.trainNumber && m.isHoliday === tj.isHoliday);

    // B. 時刻照合 (±180秒以内)
    if (!matchedMetro && tjArrTime) {
      const [tjH, tjM] = tjArrTime.split(':').map(Number);
      const tjSec = tjH * 3600 + tjM * 60;
      matchedMetro = metroCandidates.find(m => {
        if (m.isHoliday !== tj.isHoliday) return false;
        const mFirst = m.stops[0];
        if (!mFirst) return false;
        const [mH, mM] = mFirst.departureTime.split(':').map(Number);
        const mSec = mH * 3600 + mM * 60;
        return Math.abs(mSec - tjSec) <= 180;
      });
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
      console.warn(`[TJ->Metro] No match for Tojo trip ${tj.tripId} (dest: ${tj.customDestination}, arr: ${tjArrTime})`);
    }
  }

  // -------------------------------------------------------------
  // 2. 地下鉄 -> 東上線方面 (上り有楽町線/副都心線 -> 下り東上線)
  // -------------------------------------------------------------
  // 東上線下りの和光市始発列車 (全178本)
  const tojoOutFromWakoshi = tojoTrips.filter(t => t.direction === 'outbound' && t.originStationId === 'TJ-11');
  
  // 有楽町線固有駅 (Y-10〜Y-24) を含む列車
  const yInbToWakoshi = yurakuchoTrips.filter(t => {
    if (t.direction !== 'inbound' || t.destinationStationId !== 'Y-01') return false;
    return t.stops.some(s => {
      const n = parseInt(s.stationId.replace('Y-', ''), 10);
      return n >= 10;
    });
  });

  // 副都心線固有駅 (F-10〜F-16) を含む列車
  const fInbToWakoshi = fukutoshinTrips.filter(t => {
    if (t.direction !== 'inbound' || t.destinationStationId !== 'F-01') return false;
    return t.stops.some(s => {
      const n = parseInt(s.stationId.replace('F-', ''), 10);
      return n >= 10;
    });
  });

  // 有楽町線からの直通
  for (const y of yInbToWakoshi) {
    const yLastStop = y.stops[y.stops.length - 1];
    const yArrTime = yLastStop?.arrivalTime || yLastStop?.departureTime;

    let tj = tojoOutFromWakoshi.find(t => t.trainNumber === y.trainNumber && t.isHoliday === y.isHoliday);
    if (!tj && yArrTime) {
      const [yH, yM] = yArrTime.split(':').map(Number);
      const ySec = yH * 3600 + yM * 60;
      tj = tojoOutFromWakoshi.find(t => {
        if (t.isHoliday !== y.isHoliday) return false;
        const tFirst = t.stops[0];
        if (!tFirst) return false;
        const [tH, tM] = tFirst.departureTime.split(':').map(Number);
        const tSec = tH * 3600 + tM * 60;
        return Math.abs(tSec - ySec) <= 180;
      });
    }

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

  // 副都心線からの直通
  for (const f of fInbToWakoshi) {
    const fLastStop = f.stops[f.stops.length - 1];
    const fArrTime = fLastStop?.arrivalTime || fLastStop?.departureTime;

    let tj = tojoOutFromWakoshi.find(t => t.trainNumber === f.trainNumber && t.isHoliday === f.isHoliday);
    if (!tj && fArrTime) {
      const [fH, fM] = fArrTime.split(':').map(Number);
      const fSec = fH * 3600 + fM * 60;
      tj = tojoOutFromWakoshi.find(t => {
        if (t.isHoliday !== f.isHoliday) return false;
        const tFirst = t.stops[0];
        if (!tFirst) return false;
        const [tH, tM] = tFirst.departureTime.split(':').map(Number);
        const tSec = tH * 3600 + tM * 60;
        return Math.abs(tSec - fSec) <= 180;
      });
    }

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
  console.log(`  有楽町線 -> 東上線: ${outbFromY} 本`);
  console.log(`  副都心線 -> 東上線: ${outbFromF} 本`);
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
