const fs = require('fs');
const path = require('path');

const saikyoPath = path.resolve('src/data/lines/saikyo/globalTimetable.json');
const rinkaiPath = path.resolve('src/data/lines/rinkai/globalTimetable.json');

const saikyoTrips = JSON.parse(fs.readFileSync(saikyoPath, 'utf8'));
const rinkaiTrips = JSON.parse(fs.readFileSync(rinkaiPath, 'utf8'));

function loadStations(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/export const [A-Z0-9_]+: Station\[] =\s*(\[[\s\S]*?\]);\s*$/m);
  return eval(match[1]);
}
const saikyoStations = loadStations('src/data/lines/saikyo/stations.ts');
const rinkaiStations = loadStations('src/data/lines/rinkai/stations.ts');

const skStMap = new Map(saikyoStations.map(s => [s.id, s]));
const rkStMap = new Map(rinkaiStations.map(s => [s.id, s]));

let inbLinked = 0;
let outbLinked = 0;

// 1. 上り直通列車 (埼京線 大宮/川越方面 -> 大崎 -> りんかい線 新木場方面)
// 埼京線走行中: 次の直通先はりんかい線 (throughTripId: rk.tripId, throughLineId: 'rinkai')
const skInbToOsaki = saikyoTrips.filter(t => t.direction === 'inbound' && t.destinationStationId === 'JA-08');
const rkInbFromOsaki = rinkaiTrips.filter(t => t.direction === 'inbound' && t.originStationId === 'R-08');

for (const sk of skInbToOsaki) {
  const rk = rkInbFromOsaki.find(r => r.trainNumber === sk.trainNumber && r.isHoliday === sk.isHoliday);
  if (rk) {
    // 埼京線側: 次の直通先はりんかい線！
    sk.throughTripId = rk.tripId;
    sk.throughLineId = 'rinkai';
    const rkDest = rkStMap.get(rk.destinationStationId);
    sk.customDestination = rk.customDestination || rkDest?.name || '新木場';

    // りんかい線側: 始発駅（川越・大宮等）を customOrigin に設定
    const skOrig = skStMap.get(sk.originStationId);
    rk.customOrigin = sk.customOrigin || skOrig?.name || '大宮';

    inbLinked++;
  }
}

// 2. 下り直通列車 (りんかい線 新木場方面 -> 大崎 -> 埼京線 大宮/川越方面)
// りんかい線走行中: 次の直通先は埼京線 (throughTripId: sk.tripId, throughLineId: 'saikyo')
// 埼京線側は次の直通先（川越線）を持っていればそれを維持、なければ大崎始発として customOrigin を設定
const rkOutToOsaki = rinkaiTrips.filter(t => t.direction === 'outbound' && t.destinationStationId === 'R-08');
const skOutFromOsaki = saikyoTrips.filter(t => t.direction === 'outbound' && t.originStationId === 'JA-08');

for (const rk of rkOutToOsaki) {
  const sk = skOutFromOsaki.find(s => s.trainNumber === rk.trainNumber && s.isHoliday === rk.isHoliday);
  if (sk) {
    // りんかい線側: 次の直通先は埼京線！
    rk.throughTripId = sk.tripId;
    rk.throughLineId = 'saikyo';
    const skDest = skStMap.get(sk.destinationStationId);
    rk.customDestination = sk.customDestination || skDest?.name || '大宮';

    // 埼京線側: 始発駅（新木場等）を customOrigin に設定
    const rkOrig = rkStMap.get(rk.originStationId);
    sk.customOrigin = rk.customOrigin || rkOrig?.name || '新木場';
    // ※ sk.throughTripId / sk.throughLineId は川越線向け（kw_...）を保持！

    outbLinked++;
  }
}

console.log(`✅ 埼京線 ↔ りんかい線 直通リンク完了:`);
console.log(`  上り直通 (埼京線 -> りんかい線): ${inbLinked} 本`);
console.log(`  下り直通 (りんかい線 -> 埼京線): ${outbLinked} 本`);
console.log(`  合計: ${inbLinked + outbLinked} 本`);

fs.writeFileSync(saikyoPath, JSON.stringify(saikyoTrips, null, 2), 'utf8');
fs.writeFileSync(rinkaiPath, JSON.stringify(rinkaiTrips, null, 2), 'utf8');
console.log('✅ globalTimetable.json を更新しました。');
