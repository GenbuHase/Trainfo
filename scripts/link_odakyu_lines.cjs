// 小田急小田原線 ↔ 江ノ島線 / 多摩線 直通運転メタデータ付与 & 列車番号同期スクリプト
const fs = require('fs');
const path = require('path');

const odawaraGlobalPath = path.resolve('src/data/lines/odakyu_odawara/globalTimetable.json');
const enoshimaGlobalPath = path.resolve('src/data/lines/odakyu_enoshima/globalTimetable.json');
const tamaGlobalPath = path.resolve('src/data/lines/odakyu_tama/globalTimetable.json');

const odawaraStationPath = path.resolve('src/data/lines/odakyu_odawara/stationTimetables.json');
const enoshimaStationPath = path.resolve('src/data/lines/odakyu_enoshima/stationTimetables.json');
const tamaStationPath = path.resolve('src/data/lines/odakyu_tama/stationTimetables.json');

if (!fs.existsSync(odawaraGlobalPath) || !fs.existsSync(enoshimaGlobalPath) || !fs.existsSync(tamaGlobalPath)) {
  console.error('必要な路線ダイヤファイルが存在しません。全路線のインポート完了後に実行してください。');
  process.exit(1);
}

const odawaraTrips = JSON.parse(fs.readFileSync(odawaraGlobalPath, 'utf8'));
const enoshimaTrips = JSON.parse(fs.readFileSync(enoshimaGlobalPath, 'utf8'));
const tamaTrips = JSON.parse(fs.readFileSync(tamaGlobalPath, 'utf8'));

const odawaraStationsJson = path.resolve('src/data/lines/odakyu_odawara/stations.ts');
const enoshimaStationsJson = path.resolve('src/data/lines/odakyu_enoshima/stations.ts');
const tamaStationsJson = path.resolve('src/data/lines/odakyu_tama/stations.ts');

function loadStations(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/export const [A-Z0-9_]+: Station\[] =\s*(\[[\s\S]*?\]);\s*$/m);
  return eval(match[1]);
}

const odawaraStations = loadStations(odawaraStationsJson);
const enoshimaStations = loadStations(enoshimaStationsJson);
const tamaStations = loadStations(tamaStationsJson);

const odawaraStMap = new Map(odawaraStations.map((s) => [s.id, s]));
const enoshimaStMap = new Map(enoshimaStations.map((s) => [s.id, s]));
const tamaStMap = new Map(tamaStations.map((s) => [s.id, s]));

function extractYahooTrainId(tripId) {
  const match = tripId.match(/_(\d+)$/);
  return match ? match[1] : null;
}

// 列車番号の正規化
function cleanTrainNo(no) {
  if (!no) return '';
  return no.replace(/レ$/, '').trim();
}

console.log('=== 小田急線 路線間直通リンク処理開始 ===');

// ============================================================
// 1. 小田原線 ↔ 江ノ島線 (接続駅: 相模大野 OH-28)
// ============================================================
let oeOutLinked = 0;
let oeInLinked = 0;

// 下り直通 (新宿・町田方面 -> 相模大野 -> 藤沢・片瀬江ノ島方面)
// 小田原線: direction === 'outbound', destinationStationId === 'OH-28'
// 江ノ島線: direction === 'outbound', originStationId === 'OH-28'
const odawaraOutToOno = odawaraTrips.filter((t) => t.direction === 'outbound' && t.destinationStationId === 'OH-28');
const enoshimaOutFromOno = enoshimaTrips.filter((t) => t.direction === 'outbound' && t.originStationId === 'OH-28');

for (const enoshima of enoshimaOutFromOno) {
  const eTrainId = extractYahooTrainId(enoshima.tripId);
  const eCleanNo = cleanTrainNo(enoshima.trainNumber);

  // 1) Yahoo trainId が一致
  // 2) または 公式列車番号 (clean) が一致 (かつ同一運行日種別)
  const odawara = odawaraOutToOno.find((o) => {
    if (o.isHoliday !== enoshima.isHoliday) return false;
    const oTrainId = extractYahooTrainId(o.tripId);
    if (oTrainId && oTrainId === eTrainId) return true;
    const oCleanNo = cleanTrainNo(o.trainNumber);
    if (eCleanNo && oCleanNo && eCleanNo === oCleanNo) return true;
    return false;
  });

  if (odawara) {
    odawara.throughTripId = enoshima.tripId;
    odawara.throughLineId = 'odakyu_enoshima';
    const enoshimaDest = enoshimaStMap.get(enoshima.destinationStationId);
    odawara.customDestination = enoshima.customDestination || enoshimaDest?.name || '片瀬江ノ島';

    const odawaraOrig = odawaraStMap.get(odawara.originStationId);
    enoshima.customOrigin = odawara.customOrigin || odawaraOrig?.name || '新宿';

    // 列車番号の同期（より具体的な番号がある方を優先）
    if (odawara.trainNumber && (!enoshima.trainNumber || enoshima.trainNumber.includes('WD') || enoshima.trainNumber.includes('HD'))) {
      enoshima.trainNumber = odawara.trainNumber;
    } else if (enoshima.trainNumber && (!odawara.trainNumber || odawara.trainNumber.includes('WD') || odawara.trainNumber.includes('HD'))) {
      odawara.trainNumber = enoshima.trainNumber;
    }

    oeOutLinked++;
  }
}

// 上り直通 (片瀬江ノ島・藤沢方面 -> 相模大野 -> 新宿方面)
// 江ノ島線: direction === 'inbound', destinationStationId === 'OH-28'
// 小田原線: direction === 'inbound', originStationId === 'OH-28'
const enoshimaInToOno = enoshimaTrips.filter((t) => t.direction === 'inbound' && t.destinationStationId === 'OH-28');
const odawaraInFromOno = odawaraTrips.filter((t) => t.direction === 'inbound' && t.originStationId === 'OH-28');

for (const enoshima of enoshimaInToOno) {
  const eTrainId = extractYahooTrainId(enoshima.tripId);
  const eCleanNo = cleanTrainNo(enoshima.trainNumber);

  const odawara = odawaraInFromOno.find((o) => {
    if (o.isHoliday !== enoshima.isHoliday) return false;
    const oTrainId = extractYahooTrainId(o.tripId);
    if (oTrainId && oTrainId === eTrainId) return true;
    const oCleanNo = cleanTrainNo(o.trainNumber);
    if (eCleanNo && oCleanNo && eCleanNo === oCleanNo) return true;
    return false;
  });

  if (odawara) {
    enoshima.throughTripId = odawara.tripId;
    enoshima.throughLineId = 'odakyu_odawara';
    const odawaraDest = odawaraStMap.get(odawara.destinationStationId);
    enoshima.customDestination = odawara.customDestination || odawaraDest?.name || '新宿';

    const enoshimaOrig = enoshimaStMap.get(enoshima.originStationId);
    odawara.customOrigin = enoshima.customOrigin || enoshimaOrig?.name || '片瀬江ノ島';

    // 列車番号同期
    if (enoshima.trainNumber && (!odawara.trainNumber || odawara.trainNumber.includes('WD') || odawara.trainNumber.includes('HD'))) {
      odawara.trainNumber = enoshima.trainNumber;
    } else if (odawara.trainNumber && (!enoshima.trainNumber || enoshima.trainNumber.includes('WD') || enoshima.trainNumber.includes('HD'))) {
      enoshima.trainNumber = odawara.trainNumber;
    }

    oeInLinked++;
  }
}

console.log(`小田原線 ↔ 江ノ島線 (相模大野): 下り直通 ${oeOutLinked} 便, 上り直通 ${oeInLinked} 便 を接続`);

// ============================================================
// 2. 小田原線 ↔ 多摩線 (接続駅: 新百合ヶ丘 OH-23)
// ============================================================
let otOutLinked = 0;
let otInLinked = 0;

// 下り直通 (新宿・代々木上原方面 -> 新百合ヶ丘 -> 唐木田方面)
// 小田原線: direction === 'outbound', destinationStationId === 'OH-23'
// 多摩線: direction === 'outbound', originStationId === 'OH-23'
const odawaraOutToShinyuri = odawaraTrips.filter((t) => t.direction === 'outbound' && t.destinationStationId === 'OH-23');
const tamaOutFromShinyuri = tamaTrips.filter((t) => t.direction === 'outbound' && t.originStationId === 'OH-23');

for (const tama of tamaOutFromShinyuri) {
  const tTrainId = extractYahooTrainId(tama.tripId);
  const tCleanNo = cleanTrainNo(tama.trainNumber);

  const odawara = odawaraOutToShinyuri.find((o) => {
    if (o.isHoliday !== tama.isHoliday) return false;
    const oTrainId = extractYahooTrainId(o.tripId);
    if (oTrainId && oTrainId === tTrainId) return true;
    const oCleanNo = cleanTrainNo(o.trainNumber);
    if (tCleanNo && oCleanNo && tCleanNo === oCleanNo) return true;
    return false;
  });

  if (odawara) {
    odawara.throughTripId = tama.tripId;
    odawara.throughLineId = 'odakyu_tama';
    const tamaDest = tamaStMap.get(tama.destinationStationId);
    odawara.customDestination = tama.customDestination || tamaDest?.name || '唐木田';

    const odawaraOrig = odawaraStMap.get(odawara.originStationId);
    tama.customOrigin = odawara.customOrigin || odawaraOrig?.name || '新宿';

    if (odawara.trainNumber && (!tama.trainNumber || tama.trainNumber.includes('WD') || tama.trainNumber.includes('HD'))) {
      tama.trainNumber = odawara.trainNumber;
    } else if (tama.trainNumber && (!odawara.trainNumber || odawara.trainNumber.includes('WD') || odawara.trainNumber.includes('HD'))) {
      odawara.trainNumber = tama.trainNumber;
    }

    otOutLinked++;
  }
}

// 上り直通 (唐木田方面 -> 新百合ヶ丘 -> 新宿・代々木上原方面)
// 多摩線: direction === 'inbound', destinationStationId === 'OH-23'
// 小田原線: direction === 'inbound', originStationId === 'OH-23'
const tamaInToShinyuri = tamaTrips.filter((t) => t.direction === 'inbound' && t.destinationStationId === 'OH-23');
const odawaraInFromShinyuri = odawaraTrips.filter((t) => t.direction === 'inbound' && t.originStationId === 'OH-23');

for (const tama of tamaInToShinyuri) {
  const tTrainId = extractYahooTrainId(tama.tripId);
  const tCleanNo = cleanTrainNo(tama.trainNumber);

  const odawara = odawaraInFromShinyuri.find((o) => {
    if (o.isHoliday !== tama.isHoliday) return false;
    const oTrainId = extractYahooTrainId(o.tripId);
    if (oTrainId && oTrainId === tTrainId) return true;
    const oCleanNo = cleanTrainNo(o.trainNumber);
    if (tCleanNo && oCleanNo && tCleanNo === oCleanNo) return true;
    return false;
  });

  if (odawara) {
    tama.throughTripId = odawara.tripId;
    tama.throughLineId = 'odakyu_odawara';
    const odawaraDest = odawaraStMap.get(odawara.destinationStationId);
    tama.customDestination = odawara.customDestination || odawaraDest?.name || '新宿';

    const tamaOrig = tamaStMap.get(tama.originStationId);
    odawara.customOrigin = tama.customOrigin || tamaOrig?.name || '唐木田';

    if (tama.trainNumber && (!odawara.trainNumber || odawara.trainNumber.includes('WD') || odawara.trainNumber.includes('HD'))) {
      odawara.trainNumber = tama.trainNumber;
    } else if (odawara.trainNumber && (!tama.trainNumber || tama.trainNumber.includes('WD') || tama.trainNumber.includes('HD'))) {
      tama.trainNumber = odawara.trainNumber;
    }

    otInLinked++;
  }
}

console.log(`小田原線 ↔ 多摩線 (新百合ヶ丘): 下り直通 ${otOutLinked} 便, 上り直通 ${otInLinked} 便 を接続`);

// 保存
fs.writeFileSync(odawaraGlobalPath, JSON.stringify(odawaraTrips, null, 2), 'utf8');
fs.writeFileSync(enoshimaGlobalPath, JSON.stringify(enoshimaTrips, null, 2), 'utf8');
fs.writeFileSync(tamaGlobalPath, JSON.stringify(tamaTrips, null, 2), 'utf8');

console.log('✅ 小田急3路線の直通運転メタデータを正常に保存しました！');
