// JR青梅線 ↔ JR五日市線 直通運転メタデータ付与 & 列車同期スクリプト
const fs = require('fs');
const path = require('path');

const omePath = path.resolve('src/data/lines/ome/globalTimetable.json');
const itsukaichiPath = path.resolve('src/data/lines/itsukaichi/globalTimetable.json');
const itsukaichiStationPath = path.resolve('src/data/lines/itsukaichi/stationTimetables.json');

const omeTrips = JSON.parse(fs.readFileSync(omePath, 'utf8'));
const itsukaichiTrips = JSON.parse(fs.readFileSync(itsukaichiPath, 'utf8'));
const itsukaichiStationTimetables = JSON.parse(fs.readFileSync(itsukaichiStationPath, 'utf8'));

function loadStations(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/export const [A-Z0-9_]+: Station\[] =\s*(\[[\s\S]*?\]);\s*$/m);
  return eval(match[1]);
}
const omeStations = loadStations('src/data/lines/ome/stations.ts');
const itsukaichiStations = loadStations('src/data/lines/itsukaichi/stations.ts');

const omeStMap = new Map(omeStations.map(s => [s.id, s]));
const itsukaichiStMap = new Map(itsukaichiStations.map(s => [s.id, s]));

function extractYahooTrainId(tripId) {
  const match = tripId.match(/_(\d+)$/);
  return match ? match[1] : null;
}

let outbLinked = 0;
let inbLinked = 0;

const itsukaichiTrainIdToOfficialNo = new Map();

// 1. 下り直通列車 (青梅線 立川方面 -> 拝島(JC-55) -> 五日市線 武蔵五日市方面)
// 青梅線トリップ: destinationStationId === 'JC-55', direction === 'outbound'
// 五日市線トリップ: originStationId === 'JC-55', direction === 'outbound'
const omeOutToHaijima = omeTrips.filter(t => t.direction === 'outbound' && t.destinationStationId === 'JC-55');
const itsukaichiOutFromHaijima = itsukaichiTrips.filter(t => t.direction === 'outbound' && t.originStationId === 'JC-55');

for (const itsukaichi of itsukaichiOutFromHaijima) {
  const tId = extractYahooTrainId(itsukaichi.tripId);
  const ome = omeOutToHaijima.find(o => extractYahooTrainId(o.tripId) === tId && o.isHoliday === itsukaichi.isHoliday);

  if (ome) {
    // 青梅線側: 次の直通先は五日市線
    ome.throughTripId = itsukaichi.tripId;
    ome.throughLineId = 'itsukaichi';
    const itsukaichiDest = itsukaichiStMap.get(itsukaichi.destinationStationId);
    ome.customDestination = itsukaichi.customDestination || itsukaichiDest?.name || '武蔵五日市';

    // 五日市線側: 始発駅（立川・東京等）を customOrigin に設定
    const omeOrig = omeStMap.get(ome.originStationId);
    itsukaichi.customOrigin = ome.customOrigin || omeOrig?.name || '立川';

    // 列車番号の同期
    itsukaichi.trainId = tId;
    if (ome.trainNumber && ome.trainNumber !== tId) {
      itsukaichi.trainNumber = ome.trainNumber;
      itsukaichiTrainIdToOfficialNo.set(tId, ome.trainNumber);
    }

    outbLinked++;
  } else {
    itsukaichi.trainId = tId;
  }
}

// 2. 上り直通列車 (五日市線 武蔵五日市方面 -> 拝島(JC-55) -> 青梅線 立川/東京方面)
// 五日市線トリップ: destinationStationId === 'JC-55', direction === 'inbound'
// 青梅線トリップ: originStationId === 'JC-55', direction === 'inbound'
const itsukaichiInToHaijima = itsukaichiTrips.filter(t => t.direction === 'inbound' && t.destinationStationId === 'JC-55');
const omeInFromHaijima = omeTrips.filter(t => t.direction === 'inbound' && t.originStationId === 'JC-55');

for (const itsukaichi of itsukaichiInToHaijima) {
  const tId = extractYahooTrainId(itsukaichi.tripId);
  const ome = omeInFromHaijima.find(o => extractYahooTrainId(o.tripId) === tId && o.isHoliday === itsukaichi.isHoliday);

  if (ome) {
    // 五日市線側: 次の直通先は青梅線
    itsukaichi.throughTripId = ome.tripId;
    itsukaichi.throughLineId = 'ome';
    const omeDest = omeStMap.get(ome.destinationStationId);
    itsukaichi.customDestination = ome.customDestination || omeDest?.name || '立川';

    // 青梅線側: 始発駅（武蔵五日市）を customOrigin に設定
    const itsukaichiOrig = itsukaichiStMap.get(itsukaichi.originStationId);
    ome.customOrigin = itsukaichi.customOrigin || itsukaichiOrig?.name || '武蔵五日市';

    // 列車番号の同期
    itsukaichi.trainId = tId;
    if (ome.trainNumber && ome.trainNumber !== tId) {
      itsukaichi.trainNumber = ome.trainNumber;
      itsukaichiTrainIdToOfficialNo.set(tId, ome.trainNumber);
    }

    inbLinked++;
  } else {
    itsukaichi.trainId = tId;
  }
}

// 3. その他線内完結トリップにも trainId を確実に設定
for (const itsukaichi of itsukaichiTrips) {
  if (!itsukaichi.trainId) {
    itsukaichi.trainId = extractYahooTrainId(itsukaichi.tripId) || itsukaichi.trainNumber;
  }
}

// 4. 五日市線 stationTimetables.json の trainNumber 同期
let stUpdated = 0;
for (const day of ['weekday', 'holiday']) {
  const dayData = itsukaichiStationTimetables[day] || {};
  for (const stId of Object.keys(dayData)) {
    const stDirs = dayData[stId] || {};
    for (const dir of ['inbound', 'outbound']) {
      const deps = stDirs[dir] || [];
      for (const dep of deps) {
        if (!dep.trainId) {
          dep.trainId = dep.trainNumber;
        }
        if (itsukaichiTrainIdToOfficialNo.has(dep.trainId)) {
          dep.trainNumber = itsukaichiTrainIdToOfficialNo.get(dep.trainId);
          stUpdated++;
        }
      }
    }
  }
}

console.log(`=== JR青梅線 ↔ JR五日市線 連携完了 ===`);
console.log(`下り直通リンク: ${outbLinked} 便`);
console.log(`上り直通リンク: ${inbLinked} 便`);
console.log(`駅時刻表 trainNumber 更新: ${stUpdated} 箇所`);

fs.writeFileSync(omePath, JSON.stringify(omeTrips, null, 2), 'utf8');
fs.writeFileSync(itsukaichiPath, JSON.stringify(itsukaichiTrips, null, 2), 'utf8');
fs.writeFileSync(itsukaichiStationPath, JSON.stringify(itsukaichiStationTimetables, null, 2), 'utf8');
console.log('ファイルを保存しました。');
