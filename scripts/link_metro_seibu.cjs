#!/usr/bin/env node
// 東京メトロ（有楽町線・副都心線）↔ 西武有楽町線 ↔ 西武池袋線 相互直通リンカー
const fs = require('fs');
const path = require('path');

function linkMetroAndSeibu() {
  const yPath = path.resolve('src/data/lines/yurakucho/globalTimetable.json');
  const fPath = path.resolve('src/data/lines/fukutoshin/globalTimetable.json');
  const syPath = path.resolve('src/data/lines/seibu_yurakucho/globalTimetable.json');
  const siPath = path.resolve('src/data/lines/seibu_ikebukuro/globalTimetable.json');

  const yTrips = JSON.parse(fs.readFileSync(yPath, 'utf8'));
  const fTrips = JSON.parse(fs.readFileSync(fPath, 'utf8'));
  const syTrips = JSON.parse(fs.readFileSync(syPath, 'utf8'));
  const siTrips = JSON.parse(fs.readFileSync(siPath, 'utf8'));

  function loadStations(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/export const [A-Z0-9_]+: Station\[] =\s*(\[[\s\S]*?\]);\s*$/m);
    return eval(match[1]);
  }

  const yStations = loadStations('src/data/lines/yurakucho/stations.ts');
  const fStations = loadStations('src/data/lines/fukutoshin/stations.ts');
  const syStations = loadStations('src/data/lines/seibu_yurakucho/stations.ts');
  const siStations = loadStations('src/data/lines/seibu_ikebukuro/stations.ts');

  const yStMap = new Map(yStations.map(s => [s.id, s]));
  const fStMap = new Map(fStations.map(s => [s.id, s]));
  const syStMap = new Map(syStations.map(s => [s.id, s]));
  const siStMap = new Map(siStations.map(s => [s.id, s]));

  let metroToSyCount = 0;
  let syToSiCount = 0;
  let siToSyCount = 0;
  let syToMetroCount = 0;

  // -------------------------------------------------------------
  // 1. 下り直通 (Metro -> Seibu Yurakucho -> Seibu Ikebukuro)
  // -------------------------------------------------------------
  const syOutbounds = syTrips.filter(t => t.direction === 'outbound');

  for (const sy of syOutbounds) {
    // A. 西武有楽町線 -> 西武池袋線
    const si = siTrips.find(t => t.direction === 'outbound' && t.trainNumber === sy.trainNumber && t.isHoliday === sy.isHoliday);
    if (si) {
      sy.throughTripId = si.tripId;
      sy.throughLineId = 'seibu_ikebukuro';

      const siDest = siStMap.get(si.destinationStationId);
      sy.customDestination = si.customDestination || siDest?.name || sy.customDestination;
      syToSiCount++;
    }

    // B. Metro -> 西武有楽町線
    let metro = yTrips.find(t => t.direction === 'inbound' && t.trainNumber === sy.trainNumber && t.isHoliday === sy.isHoliday);
    let metroLineId = 'yurakucho';

    if (!metro) {
      metro = fTrips.find(t => t.direction === 'inbound' && t.trainNumber === sy.trainNumber && t.isHoliday === sy.isHoliday);
      metroLineId = 'fukutoshin';
    }

    if (metro) {
      metro.throughTripId = sy.tripId;
      metro.throughLineId = 'seibu_yurakucho';

      // 最終目的地の伝播
      metro.customDestination = sy.customDestination || metro.customDestination;

      // 始発駅の伝播
      const metroStMap = metroLineId === 'yurakucho' ? yStMap : fStMap;
      const metroOrig = metroStMap.get(metro.originStationId);
      const origName = metro.customOrigin || metroOrig?.name || (metroLineId === 'yurakucho' ? '新木場' : '元町・中華街');
      sy.customOrigin = origName;
      if (si) {
        si.customOrigin = origName;
      }
      metroToSyCount++;
    }
  }

  // -------------------------------------------------------------
  // 2. 上り直通 (Seibu Ikebukuro -> Seibu Yurakucho -> Metro)
  // -------------------------------------------------------------
  const syInbounds = syTrips.filter(t => t.direction === 'inbound');

  for (const sy of syInbounds) {
    // A. 西武池袋線 -> 西武有楽町線
    const si = siTrips.find(t => t.direction === 'inbound' && t.trainNumber === sy.trainNumber && t.isHoliday === sy.isHoliday);
    if (si) {
      si.throughTripId = sy.tripId;
      si.throughLineId = 'seibu_yurakucho';

      const siOrig = siStMap.get(si.originStationId);
      sy.customOrigin = si.customOrigin || siOrig?.name || '飯能';
      siToSyCount++;
    }

    // B. 西武有楽町線 -> Metro
    let metro = yTrips.find(t => t.direction === 'outbound' && t.trainNumber === sy.trainNumber && t.isHoliday === sy.isHoliday);
    let metroLineId = 'yurakucho';

    if (!metro) {
      metro = fTrips.find(t => t.direction === 'outbound' && t.trainNumber === sy.trainNumber && t.isHoliday === sy.isHoliday);
      metroLineId = 'fukutoshin';
    }

    if (metro) {
      sy.throughTripId = metro.tripId;
      sy.throughLineId = metroLineId;

      const metroStMap = metroLineId === 'yurakucho' ? yStMap : fStMap;
      const metroDest = metroStMap.get(metro.destinationStationId);
      const destName = metro.customDestination || metroDest?.name || (metroLineId === 'yurakucho' ? '新木場' : '元町・中華街');
      sy.customDestination = destName;
      if (si) {
        si.customDestination = destName;
      }

      // 始発駅の伝播
      metro.customOrigin = sy.customOrigin || metro.customOrigin;
      syToMetroCount++;
    }
  }

  console.log(`\n============================================================`);
  console.log(`✅ 東京メトロ ↔ 西武有楽町線 ↔ 西武池袋線 相互直通リンク完了:`);
  console.log(`  [下り] メトロ -> 西武有楽町線: ${metroToSyCount} 本`);
  console.log(`  [下り] 西武有楽町線 -> 西武池袋線: ${syToSiCount} 本`);
  console.log(`------------------------------------------------------------`);
  console.log(`  [上り] 西武池袋線 -> 西武有楽町線: ${siToSyCount} 本`);
  console.log(`  [上り] 西武有楽町線 -> メトロ: ${syToMetroCount} 本`);
  console.log(`============================================================\n`);

  fs.writeFileSync(yPath, JSON.stringify(yTrips, null, 2), 'utf8');
  fs.writeFileSync(fPath, JSON.stringify(fTrips, null, 2), 'utf8');
  fs.writeFileSync(syPath, JSON.stringify(syTrips, null, 2), 'utf8');
  fs.writeFileSync(siPath, JSON.stringify(siTrips, null, 2), 'utf8');
  console.log('✅ 全4路線の globalTimetable.json を更新しました。');
}

module.exports = { linkMetroAndSeibu };

if (require.main === module) {
  linkMetroAndSeibu();
}
