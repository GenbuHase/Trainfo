// JR川越線 ↔ JR八高線 高麗川駅直通運転メタデータ付与スクリプト
const fs = require('fs');
const path = require('path');

const kawagoePath = path.resolve('src/data/lines/kawagoe/globalTimetable.json');
const hachikoPath = path.resolve('src/data/lines/hachiko/globalTimetable.json');

const kawagoeTrips = JSON.parse(fs.readFileSync(kawagoePath, 'utf8'));
const hachikoTrips = JSON.parse(fs.readFileSync(hachikoPath, 'utf8'));

function loadStations(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/export const [A-Z0-9_]+: Station\[] =\s*(\[[\s\S]*?\]);\s*$/m);
  return eval(match[1]);
}
const kawagoeStations = loadStations('src/data/lines/kawagoe/stations.ts');
const hachikoStations = loadStations('src/data/lines/hachiko/stations.ts');

const kwStMap = new Map(kawagoeStations.map(s => [s.id, s]));
const hcStMap = new Map(hachikoStations.map(s => [s.id, s]));

function extractYahooTrainId(trip) {
  if (trip.trainId) return trip.trainId;
  const match = trip.tripId.match(/_(\d+)$/);
  return match ? match[1] : null;
}

let hcToKwLinked = 0;
let kwToHcLinked = 0;

// 1. 八王子 -> 高麗川 -> 川越 系統
// 八高線走行中: 次の直通先は川越線 (throughTripId: kw.tripId, throughLineId: 'kawagoe')
// 八高線側: destinationStationId === 'HA-09', direction === 'outbound'
// 川越線側: originStationId === 'JA-36', direction === 'inbound'
const hcOutToKomagawa = hachikoTrips.filter(t => t.direction === 'outbound' && t.destinationStationId === 'HA-09');
const kwInbFromKomagawa = kawagoeTrips.filter(t => t.direction === 'inbound' && t.originStationId === 'JA-36');

for (const hc of hcOutToKomagawa) {
  const hcId = extractYahooTrainId(hc);
  let kw = kwInbFromKomagawa.find(k => extractYahooTrainId(k) === hcId && k.isHoliday === hc.isHoliday);

  // 時刻フォールバック照合
  if (!kw) {
    const hcArr = hc.stops[hc.stops.length - 1]?.arrivalTime;
    if (hcArr) {
      kw = kwInbFromKomagawa.find(k => {
        if (k.isHoliday !== hc.isHoliday) return false;
        const kwDep = k.stops[0]?.departureTime;
        if (!kwDep) return false;
        // 到着後0〜5分以内に発車
        const [ah, am] = hcArr.split(':').map(Number);
        const [dh, dm] = kwDep.split(':').map(Number);
        const diffMin = (dh * 60 + dm) - (ah * 60 + am);
        return diffMin >= 0 && diffMin <= 5;
      });
    }
  }

  if (kw) {
    // 八高線側: 次の直通先は川越線！
    hc.throughTripId = kw.tripId;
    hc.throughLineId = 'kawagoe';
    const kwDest = kwStMap.get(kw.destinationStationId);
    hc.customDestination = kw.customDestination || kwDest?.name || '川越';

    // 川越線側: 始発駅（八王子等）を customOrigin に設定
    const hcOrig = hcStMap.get(hc.originStationId);
    kw.customOrigin = hc.customOrigin || hcOrig?.name || '八王子';

    hcToKwLinked++;
  }
}

// 2. 川越 -> 高麗川 -> 八王子 系統
// 川越線走行中: 次の直通先は八高線 (throughTripId: hc.tripId, throughLineId: 'hachiko')
// 川越線側: destinationStationId === 'JA-36', direction === 'outbound'
// 八高線側: originStationId === 'HA-09', direction === 'inbound'
const kwOutToKomagawa = kawagoeTrips.filter(t => t.direction === 'outbound' && t.destinationStationId === 'JA-36');
const hcInbFromKomagawa = hachikoTrips.filter(t => t.direction === 'inbound' && t.originStationId === 'HA-09');

for (const kw of kwOutToKomagawa) {
  const kwId = extractYahooTrainId(kw);
  let hc = hcInbFromKomagawa.find(h => extractYahooTrainId(h) === kwId && h.isHoliday === kw.isHoliday);

  // 時刻フォールバック照合
  if (!hc) {
    const kwArr = kw.stops[kw.stops.length - 1]?.arrivalTime;
    if (kwArr) {
      hc = hcInbFromKomagawa.find(h => {
        if (h.isHoliday !== kw.isHoliday) return false;
        const hcDep = h.stops[0]?.departureTime;
        if (!hcDep) return false;
        const [ah, am] = kwArr.split(':').map(Number);
        const [dh, dm] = hcDep.split(':').map(Number);
        const diffMin = (dh * 60 + dm) - (ah * 60 + am);
        return diffMin >= 0 && diffMin <= 5;
      });
    }
  }

  if (hc) {
    // 川越線側: 次の直通先は八高線！
    kw.throughTripId = hc.tripId;
    kw.throughLineId = 'hachiko';
    const hcDest = hcStMap.get(hc.destinationStationId);
    kw.customDestination = hc.customDestination || hcDest?.name || '八王子';

    // 八高線側: 始発駅（川越）を customOrigin に設定
    const kwOrig = kwStMap.get(kw.originStationId);
    hc.customOrigin = kw.customOrigin || kwOrig?.name || '川越';

    kwToHcLinked++;
  }
}

console.log('=== 八高線 ↔ 川越線 高麗川駅 直通リンク完了 ===');
console.log(`  八王子 -> 高麗川 -> 川越: ${hcToKwLinked} 本`);
console.log(`  川越 -> 高麗川 -> 八王子: ${kwToHcLinked} 本`);
console.log(`  合計: ${hcToKwLinked + kwToHcLinked} 本`);

fs.writeFileSync(kawagoePath, JSON.stringify(kawagoeTrips, null, 2), 'utf8');
fs.writeFileSync(hachikoPath, JSON.stringify(hachikoTrips, null, 2), 'utf8');
console.log('✅ globalTimetable.json を更新しました。');
