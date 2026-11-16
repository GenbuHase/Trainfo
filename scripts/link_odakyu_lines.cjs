// 小田急小田原線 ↔ 江ノ島線 / 多摩線 直通運転メタデータ付与 & 列車番号同期スクリプト
const fs = require('fs');
const path = require('path');

function linkOdakyuLines() {
const odawaraGlobalPath = path.resolve('src/data/lines/odakyu_odawara/globalTimetable.json');
const enoshimaGlobalPath = path.resolve('src/data/lines/odakyu_enoshima/globalTimetable.json');
const tamaGlobalPath = path.resolve('src/data/lines/odakyu_tama/globalTimetable.json');

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

// 既存の小田急線間リンクのみを安全に初期化（他社線直通リンクは保持）
const ODAKYU_LINES = new Set(['odakyu_odawara', 'odakyu_enoshima', 'odakyu_tama']);
for (const trips of [odawaraTrips, enoshimaTrips, tamaTrips]) {
  for (const t of trips) {
    if (ODAKYU_LINES.has(t.throughLineId)) {
      delete t.throughTripId;
      delete t.throughLineId;
    }
    if (ODAKYU_LINES.has(t.prevLineId)) {
      delete t.prevTripId;
      delete t.prevLineId;
    }
  }
}

function linkOdakyuPair({
  fromTrips,
  toTrips,
  fromLineId,
  toLineId,
  fromStationId,
  toStationId,
  fromDirection,
  toDirection,
  fromStMap,
  toStMap,
  defaultOrigin,
  defaultDest,
  syncTrainNoFrom = 'branch',
}) {
  let count = 0;
  const usedFromIds = new Set();
  const usedToIds = new Set();

  const fromCandidates = fromTrips.filter(
    (t) => t.direction === fromDirection && t.destinationStationId === fromStationId
  );
  const toCandidates = toTrips.filter(
    (t) => t.direction === toDirection && t.originStationId === toStationId
  );

  // 支線側または本線側を軸に1対1マッチ
  for (const fromT of fromCandidates) {
    if (usedFromIds.has(fromT.tripId)) continue;
    const fTrainId = extractYahooTrainId(fromT.tripId);
    const fCleanNo = cleanTrainNo(fromT.trainNumber);

    const toT = toCandidates.find((c) => {
      if (usedToIds.has(c.tripId)) return false;
      if (c.isHoliday !== fromT.isHoliday) return false;
      const cTrainId = extractYahooTrainId(c.tripId);
      if (fTrainId && cTrainId && fTrainId === cTrainId) return true;
      const cCleanNo = cleanTrainNo(c.trainNumber);
      if (fCleanNo && cCleanNo && fCleanNo === cCleanNo) return true;
      return false;
    });

    if (!toT) continue;

    usedFromIds.add(fromT.tripId);
    usedToIds.add(toT.tripId);

    fromT.throughTripId = toT.tripId;
    fromT.throughLineId = toLineId;
    toT.prevTripId = fromT.tripId;
    toT.prevLineId = fromLineId;

    const toDest = toStMap.get(toT.destinationStationId);
    fromT.customDestination = toT.customDestination || toDest?.name || defaultDest;

    const fromOrig = fromStMap.get(fromT.originStationId);
    toT.customOrigin = fromT.customOrigin || fromOrig?.name || defaultOrigin;

    const primary = syncTrainNoFrom === 'from' ? fromT : toT;
    const secondary = syncTrainNoFrom === 'from' ? toT : fromT;
    if (primary.trainNumber && (!secondary.trainNumber || secondary.trainNumber.includes('WD') || secondary.trainNumber.includes('HD'))) {
      secondary.trainNumber = primary.trainNumber;
    } else if (secondary.trainNumber && (!primary.trainNumber || primary.trainNumber.includes('WD') || primary.trainNumber.includes('HD'))) {
      primary.trainNumber = secondary.trainNumber;
    }

    count++;
  }
  return count;
}

// ============================================================
// 1. 小田原線 ↔ 江ノ島線 (接続駅: 相模大野 OH-28)
// ============================================================
const oeOutLinked = linkOdakyuPair({
  fromTrips: odawaraTrips,
  toTrips: enoshimaTrips,
  fromLineId: 'odakyu_odawara',
  toLineId: 'odakyu_enoshima',
  fromStationId: 'OH-28',
  toStationId: 'OH-28',
  fromDirection: 'outbound',
  toDirection: 'outbound',
  fromStMap: odawaraStMap,
  toStMap: enoshimaStMap,
  defaultOrigin: '新宿',
  defaultDest: '片瀬江ノ島',
  syncTrainNoFrom: 'from',
});

const oeInLinked = linkOdakyuPair({
  fromTrips: enoshimaTrips,
  toTrips: odawaraTrips,
  fromLineId: 'odakyu_enoshima',
  toLineId: 'odakyu_odawara',
  fromStationId: 'OH-28',
  toStationId: 'OH-28',
  fromDirection: 'inbound',
  toDirection: 'inbound',
  fromStMap: enoshimaStMap,
  toStMap: odawaraStMap,
  defaultOrigin: '片瀬江ノ島',
  defaultDest: '新宿',
  syncTrainNoFrom: 'from',
});

console.log(`小田原線 ↔ 江ノ島線 (相模大野): 下り直通 ${oeOutLinked} 便, 上り直通 ${oeInLinked} 便 を接続`);

// ============================================================
// 2. 小田原線 ↔ 多摩線 (接続駅: 新百合ヶ丘 OH-23)
// ============================================================
const otOutLinked = linkOdakyuPair({
  fromTrips: odawaraTrips,
  toTrips: tamaTrips,
  fromLineId: 'odakyu_odawara',
  toLineId: 'odakyu_tama',
  fromStationId: 'OH-23',
  toStationId: 'OH-23',
  fromDirection: 'outbound',
  toDirection: 'outbound',
  fromStMap: odawaraStMap,
  toStMap: tamaStMap,
  defaultOrigin: '新宿',
  defaultDest: '唐木田',
  syncTrainNoFrom: 'from',
});

const otInLinked = linkOdakyuPair({
  fromTrips: tamaTrips,
  toTrips: odawaraTrips,
  fromLineId: 'odakyu_tama',
  toLineId: 'odakyu_odawara',
  fromStationId: 'OH-23',
  toStationId: 'OH-23',
  fromDirection: 'inbound',
  toDirection: 'inbound',
  fromStMap: tamaStMap,
  toStMap: odawaraStMap,
  defaultOrigin: '唐木田',
  defaultDest: '新宿',
  syncTrainNoFrom: 'from',
});

console.log(`小田原線 ↔ 多摩線 (新百合ヶ丘): 下り直通 ${otOutLinked} 便, 上り直通 ${otInLinked} 便 を接続`);

// 保存
fs.writeFileSync(odawaraGlobalPath, JSON.stringify(odawaraTrips, null, 2), 'utf8');
fs.writeFileSync(enoshimaGlobalPath, JSON.stringify(enoshimaTrips, null, 2), 'utf8');
fs.writeFileSync(tamaGlobalPath, JSON.stringify(tamaTrips, null, 2), 'utf8');

console.log('✅ 小田急3路線の直通運転メタデータを正常に保存しました！');
}

if (require.main === module) {
  linkOdakyuLines();
}

module.exports = { linkOdakyuLines };
