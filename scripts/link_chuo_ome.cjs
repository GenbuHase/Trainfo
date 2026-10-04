// JR中央線 ↔ JR青梅線 直通運転メタデータ付与 & 列車番号同期スクリプト
const fs = require('fs');
const path = require('path');

const chuoPath = path.resolve('src/data/lines/chuo/globalTimetable.json');
const omePath = path.resolve('src/data/lines/ome/globalTimetable.json');
const omeStationPath = path.resolve('src/data/lines/ome/stationTimetables.json');

const chuoTrips = JSON.parse(fs.readFileSync(chuoPath, 'utf8'));
const omeTrips = JSON.parse(fs.readFileSync(omePath, 'utf8'));
const omeStationTimetables = JSON.parse(fs.readFileSync(omeStationPath, 'utf8'));

function loadStations(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/export const [A-Z0-9_]+: Station\[] =\s*(\[[\s\S]*?\]);\s*$/m);
  return eval(match[1]);
}
const chuoStations = loadStations('src/data/lines/chuo/stations.ts');
const omeStations = loadStations('src/data/lines/ome/stations.ts');

const chuoStMap = new Map(chuoStations.map(s => [s.id, s]));
const omeStMap = new Map(omeStations.map(s => [s.id, s]));

// tripId から Yahoo trainId を抽出するヘルパー
function extractYahooTrainId(tripId) {
  const match = tripId.match(/_(\d+)$/);
  return match ? match[1] : null;
}

let outbLinked = 0;
let inbLinked = 0;

// trainId -> official trainNumber Map (青梅線駅時刻表反映用)
const omeTrainIdToOfficialNo = new Map();

// 1. 下り直通列車 (中央線 東京/新宿方面 -> 立川(JC-19) -> 青梅線 青梅/奥多摩方面)
// 中央線トリップ: destinationStationId === 'JC-19', direction === 'outbound'
// 青梅線トリップ: originStationId === 'JC-19', direction === 'outbound'
const chuoOutToTachikawa = chuoTrips.filter(t => t.direction === 'outbound' && t.destinationStationId === 'JC-19');
const omeOutFromTachikawa = omeTrips.filter(t => t.direction === 'outbound' && t.originStationId === 'JC-19');

for (const ome of omeOutFromTachikawa) {
  const oTrainId = extractYahooTrainId(ome.tripId);
  const chuo = chuoOutToTachikawa.find(c => extractYahooTrainId(c.tripId) === oTrainId && c.isHoliday === ome.isHoliday);

  if (chuo) {
    // 中央線側: 次の直通先は青梅線
    chuo.throughTripId = ome.tripId;
    chuo.throughLineId = 'ome';
    const omeDest = omeStMap.get(ome.destinationStationId);
    chuo.customDestination = ome.customDestination || omeDest?.name || '青梅';

    // 青梅線側: 始発駅（東京・新宿等）を customOrigin に設定
    const chuoOrig = chuoStMap.get(chuo.originStationId);
    ome.customOrigin = chuo.customOrigin || chuoOrig?.name || '東京';

    // 列車番号の同期 (中央線側の公式列車番号を採用)
    ome.trainId = oTrainId;
    if (chuo.trainNumber && chuo.trainNumber !== oTrainId) {
      ome.trainNumber = chuo.trainNumber;
      omeTrainIdToOfficialNo.set(oTrainId, chuo.trainNumber);
    }

    outbLinked++;
  } else {
    // 線内完結（立川始発青梅方面など）
    ome.trainId = oTrainId;
  }
}

// 2. 上り直通列車 (青梅線 奥多摩/青梅方面 -> 立川(JC-19) -> 中央線 新宿/東京方面)
// 青梅線トリップ: destinationStationId === 'JC-19', direction === 'inbound'
// 中央線トリップ: originStationId === 'JC-19', direction === 'inbound'
const omeInToTachikawa = omeTrips.filter(t => t.direction === 'inbound' && t.destinationStationId === 'JC-19');
const chuoInFromTachikawa = chuoTrips.filter(t => t.direction === 'inbound' && t.originStationId === 'JC-19');

for (const ome of omeInToTachikawa) {
  const oTrainId = extractYahooTrainId(ome.tripId);
  const chuo = chuoInFromTachikawa.find(c => extractYahooTrainId(c.tripId) === oTrainId && c.isHoliday === ome.isHoliday);

  if (chuo) {
    // 青梅線側: 次の直通先は中央線
    ome.throughTripId = chuo.tripId;
    ome.throughLineId = 'chuo';
    const chuoDest = chuoStMap.get(chuo.destinationStationId);
    ome.customDestination = chuo.customDestination || chuoDest?.name || '東京';

    // 中央線側: 始発駅（青梅・奥多摩等）を customOrigin に設定
    const omeOrig = omeStMap.get(ome.originStationId);
    chuo.customOrigin = ome.customOrigin || omeOrig?.name || '青梅';

    // 列車番号の同期 (中央線側の公式列車番号を採用)
    ome.trainId = oTrainId;
    if (chuo.trainNumber && chuo.trainNumber !== oTrainId) {
      ome.trainNumber = chuo.trainNumber;
      omeTrainIdToOfficialNo.set(oTrainId, chuo.trainNumber);
    }

    inbLinked++;
  } else {
    // 線内完結（立川止まり）
    ome.trainId = oTrainId;
  }
}

// 3. その他線内完結トリップにも trainId を確実に設定
for (const ome of omeTrips) {
  if (!ome.trainId) {
    ome.trainId = extractYahooTrainId(ome.tripId) || ome.trainNumber;
  }
}

// 4. 青梅線 stationTimetables.json の trainNumber 同期
let stUpdated = 0;
for (const day of ['weekday', 'holiday']) {
  const dayData = omeStationTimetables[day] || {};
  for (const stId of Object.keys(dayData)) {
    const stDirs = dayData[stId] || {};
    for (const dir of ['inbound', 'outbound']) {
      const deps = stDirs[dir] || [];
      for (const dep of deps) {
        dep.trainId = dep.trainId || dep.no;
        const official = omeTrainIdToOfficialNo.get(dep.trainId);
        if (official) {
          dep.no = official;
          stUpdated++;
        }
      }
    }
  }
}

console.log(`=== 直通リンク結果 ===`);
console.log(`下り直通列車リンク数: ${outbLinked}`);
console.log(`上り直通列車リンク数: ${inbLinked}`);
console.log(`合計直通リンク数: ${outbLinked + inbLinked}`);
console.log(`駅時刻表(青梅線) 公式列車番号更新件数: ${stUpdated}`);

// 保存
fs.writeFileSync(chuoPath, JSON.stringify(chuoTrips, null, 2), 'utf8');
fs.writeFileSync(omePath, JSON.stringify(omeTrips, null, 2), 'utf8');
fs.writeFileSync(omeStationPath, JSON.stringify(omeStationTimetables, null, 2), 'utf8');
console.log('✅ globalTimetable.json および stationTimetables.json を更新・保存しました！');
