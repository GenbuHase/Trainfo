const fs = require('fs');

const raw1 = JSON.parse(fs.readFileSync('scripts/osm_musashino_raw.json', 'utf8'));
const stationsJson = JSON.parse(fs.readFileSync('scripts/resolved_musashino_stations.json', 'utf8'));

// nodeCoordMap
const nodeMap = new Map();
raw1.elements.filter(e => e.type === 'node').forEach(n => nodeMap.set(n.id, [n.lat, n.lon]));

// wayMap
const wayMap = new Map();
raw1.elements.filter(e => e.type === 'way').forEach(w => {
  let pts = [];
  if (w.geometry) pts = w.geometry.map(p => [p.lat, p.lon]);
  else if (w.nodes) pts = w.nodes.map(id => nodeMap.get(id)).filter(Boolean);
  wayMap.set(w.id, pts);
});

function dist(p1, p2) {
  const dLat = (p1[0] - p2[0]) * 111000;
  const dLng = (p1[1] - p2[1]) * 111000 * Math.cos((p1[0] * Math.PI) / 180);
  return Math.sqrt(dLat * dLat + dLng * dLng);
}

// 1. 武蔵野本線 (府中本町 -> 西船橋 -> 南船橋): Rel 9486466
const rel9486466 = raw1.elements.find(e => e.type === 'relation' && e.id === 9486466);
const ways9486466 = rel9486466.members.filter(m => m.type === 'way');
const musashinoFullLine = [];
for (let i = 26; i < ways9486466.length; i++) {
  const pts = wayMap.get(ways9486466[i].ref);
  if (!pts) continue;
  pts.forEach((pt, pIdx) => {
    if (musashinoFullLine.length === 0 || pIdx > 0) {
      musashinoFullLine.push(pt);
    }
  });
}

// 2. 京葉線東京方面 (西船橋 -> 東京): Rel 14656632
const rel14656632 = raw1.elements.find(e => e.type === 'relation' && e.id === 14656632);
const ways14656632 = rel14656632.members.filter(m => m.type === 'way');
const tokyoFullLine = [];
for (let i = 34; i < ways14656632.length; i++) {
  const pts = wayMap.get(ways14656632[i].ref);
  if (!pts) continue;
  pts.forEach((pt, pIdx) => {
    if (tokyoFullLine.length === 0 || pIdx > 0) {
      tokyoFullLine.push(pt);
    }
  });
}

// 3. 京葉線海浜幕張方面 (南船橋 -> 海浜幕張): Rel 5326726
const rel5326726 = raw1.elements.find(e => e.type === 'relation' && e.id === 5326726);
const ways5326726 = rel5326726.members.filter(m => m.type === 'way');
const keiyoFullLine = [];
for (let i = 18; i < ways5326726.length; i++) {
  const pts = wayMap.get(ways5326726[i].ref);
  if (!pts) continue;
  pts.forEach((pt, pIdx) => {
    if (keiyoFullLine.length === 0 || pIdx > 0) {
      keiyoFullLine.push(pt);
    }
  });
}

function snapStation(line, stationName, startSearchIdx = 0) {
  const approx = stationsJson[stationName];
  let minD = Infinity;
  let bestIdx = -1;
  for (let i = startSearchIdx; i < line.length; i++) {
    const d = dist([approx.lat, approx.lon], line[i]);
    if (d < minD) {
      minD = d;
      bestIdx = i;
    }
  }
  return { idx: bestIdx, coord: line[bestIdx], dist: minD };
}

const finalStationCoords = {};

const MUSASHINO_MAINLINE_STATIONS = [
  ['JM-35', '府中本町'],
  ['JM-34', '北府中'],
  ['JM-33', '西国分寺'],
  ['JM-32', '新小平'],
  ['JM-31', '新秋津'],
  ['JM-30', '東所沢'],
  ['JM-29', '新座'],
  ['JM-28', '北朝霞'],
  ['JM-27', '西浦和'],
  ['JM-26', '武蔵浦和'],
  ['JM-25', '南浦和'],
  ['JM-24', '東浦和'],
  ['JM-23', '東川口'],
  ['JM-22', '南越谷'],
  ['JM-21', '越谷レイクタウン'],
  ['JM-20', '吉川'],
  ['JM-19', '吉川美南'],
  ['JM-18', '新三郷'],
  ['JM-17', '三郷'],
  ['JM-16', '南流山'],
  ['JM-15', '新松戸'],
  ['JM-14', '新八柱'],
  ['JM-13', '東松戸'],
  ['JM-12', '市川大野'],
  ['JM-11', '船橋法典'],
  ['JM-10', '西船橋'],
  ['JE-11', '南船橋'],
];

let lastSearchIdx = 0;
const mainlineIndices = [];
MUSASHINO_MAINLINE_STATIONS.forEach(([id, name]) => {
  const snap = snapStation(musashinoFullLine, name, lastSearchIdx);
  mainlineIndices.push({ id, name, idx: snap.idx, coord: snap.coord });
  finalStationCoords[name] = snap.coord;
  lastSearchIdx = snap.idx;
});

const segments = [];

// A. 武蔵野本線 (府中本町 -> 西船橋) 25セグメント
for (let i = 0; i < 25; i++) {
  const from = mainlineIndices[i];
  const to = mainlineIndices[i + 1];
  const pts = musashinoFullLine.slice(from.idx, to.idx + 1);
  segments.push({
    fromStationId: from.id,
    toStationId: to.id,
    fromName: from.name,
    toName: to.name,
    coordinates: pts.map(p => [Math.round(p[0] * 1000000) / 1000000, Math.round(p[1] * 1000000) / 1000000])
  });
}

// B. 京葉線海浜幕張直通 (西船橋 -> 南船橋) 1セグメント
const nishiFunabashi = mainlineIndices[25];
const minamiFunabashi = mainlineIndices[26];
const nishiToMinamiFunabashiPts = musashinoFullLine.slice(nishiFunabashi.idx, minamiFunabashi.idx + 1);
segments.push({
  fromStationId: 'JM-10',
  toStationId: 'JE-11',
  fromName: '西船橋',
  toName: '南船橋',
  coordinates: nishiToMinamiFunabashiPts.map(p => [Math.round(p[0] * 1000000) / 1000000, Math.round(p[1] * 1000000) / 1000000])
});

// C. 京葉線海浜幕張直通 (南船橋 -> 新習志野 -> 幕張豊砂 -> 海浜幕張) 3セグメント
const KEIYO_MAKUHARI_STATIONS = [
  ['JE-11', '南船橋'],
  ['JE-12', '新習志野'],
  ['JE-13', '幕張豊砂'],
  ['JE-14', '海浜幕張']
];

lastSearchIdx = 0;
const makuhariIndices = [];
KEIYO_MAKUHARI_STATIONS.forEach(([id, name]) => {
  const snap = snapStation(keiyoFullLine, name, lastSearchIdx);
  makuhariIndices.push({ id, name, idx: snap.idx, coord: snap.coord });
  if (name !== '南船橋') {
    finalStationCoords[name] = snap.coord;
  }
  lastSearchIdx = snap.idx;
});

for (let i = 0; i < makuhariIndices.length - 1; i++) {
  const from = makuhariIndices[i];
  const to = makuhariIndices[i + 1];
  let pts = keiyoFullLine.slice(from.idx, to.idx + 1);
  if (i === 0) {
    pts = [finalStationCoords['南船橋'], ...pts.slice(1)];
  }
  segments.push({
    fromStationId: from.id,
    toStationId: to.id,
    fromName: from.name,
    toName: to.name,
    coordinates: pts.map(p => [Math.round(p[0] * 1000000) / 1000000, Math.round(p[1] * 1000000) / 1000000])
  });
}

// D. 京葉線東京直通 (西船橋 -> 市川塩浜 -> ... -> 東京) 9セグメント
const KEIYO_TOKYO_STATIONS = [
  ['JM-10', '西船橋'],
  ['JE-09', '市川塩浜'],
  ['JE-08', '新浦安'],
  ['JE-07', '舞浜'],
  ['JE-06', '葛西臨海公園'],
  ['JE-05', '新木場'],
  ['JE-04', '潮見'],
  ['JE-03', '越中島'],
  ['JE-02', '八丁堀'],
  ['JE-01', '東京']
];

lastSearchIdx = 0;
const tokyoIndices = [];
KEIYO_TOKYO_STATIONS.forEach(([id, name]) => {
  const snap = snapStation(tokyoFullLine, name, lastSearchIdx);
  tokyoIndices.push({ id, name, idx: snap.idx, coord: snap.coord });
  if (name !== '西船橋') {
    finalStationCoords[name] = snap.coord;
  }
  lastSearchIdx = snap.idx;
});

for (let i = 0; i < tokyoIndices.length - 1; i++) {
  const from = tokyoIndices[i];
  const to = tokyoIndices[i + 1];
  let pts = tokyoFullLine.slice(from.idx, to.idx + 1);
  if (i === 0) {
    pts = [finalStationCoords['西船橋'], ...pts.slice(1)];
  }
  segments.push({
    fromStationId: from.id,
    toStationId: to.id,
    fromName: from.name,
    toName: to.name,
    coordinates: pts.map(p => [Math.round(p[0] * 1000000) / 1000000, Math.round(p[1] * 1000000) / 1000000])
  });
}

// E. 支線データ
const oldGeometry = JSON.parse(fs.readFileSync('src/data/lines/musashino/trackGeometry.ts', 'utf8').match(/export const MUSASHINO_TRACK_SEGMENTS: TrackSegment\[\] = ([\s\S]*?);\s*$/)[1]);
function getOldSeg(fromName, toName) {
  return oldGeometry.find(s => s.fromName === fromName && s.toName === toName);
}

// 1. 大宮 -> 武蔵浦和 (JU-07 -> JM-26)
const oldOmiyaMusashi = getOldSeg('大宮', '武蔵浦和');
const omiyaCoord = oldOmiyaMusashi.coordinates[1];
finalStationCoords['大宮'] = omiyaCoord;
const omiyaMusashiPts = [
  ...oldOmiyaMusashi.coordinates.slice(1, 125),
  finalStationCoords['武蔵浦和']
];
segments.push({
  fromStationId: 'JU-07',
  toStationId: 'JM-26',
  fromName: '大宮',
  toName: '武蔵浦和',
  coordinates: omiyaMusashiPts.map(p => [Math.round(p[0] * 1000000) / 1000000, Math.round(p[1] * 1000000) / 1000000])
});

// 2. 大宮 -> 北朝霞 (JU-07 -> JM-28)
const oldOmiyaAsaka = getOldSeg('大宮', '北朝霞');
const omiyaAsakaPts = [
  ...oldOmiyaAsaka.coordinates.slice(1, 188),
  finalStationCoords['北朝霞']
];
segments.push({
  fromStationId: 'JU-07',
  toStationId: 'JM-28',
  fromName: '大宮',
  toName: '北朝霞',
  coordinates: omiyaAsakaPts.map(p => [Math.round(p[0] * 1000000) / 1000000, Math.round(p[1] * 1000000) / 1000000])
});

// 3. 新小平 -> 国立 (JM-32 -> JC-18)
const oldKunitachi = getOldSeg('新小平', '国立');
const kunitachiCoord = oldKunitachi.coordinates[oldKunitachi.coordinates.length - 2];
finalStationCoords['国立'] = kunitachiCoord;
const shinKodairaKunitachiPts = oldKunitachi.coordinates.slice(1, -1);
segments.push({
  fromStationId: 'JM-32',
  toStationId: 'JC-18',
  fromName: '新小平',
  toName: '国立',
  coordinates: shinKodairaKunitachiPts.map(p => [Math.round(p[0] * 1000000) / 1000000, Math.round(p[1] * 1000000) / 1000000])
});

// 4. 国立 -> 立川 (JC-18 -> JC-19)
const oldKunitachiTachikawa = getOldSeg('国立', '立川');
const tachikawaCoord = oldKunitachiTachikawa.coordinates[oldKunitachiTachikawa.coordinates.length - 2];
finalStationCoords['立川'] = tachikawaCoord;
const kunitachiTachikawaPts = oldKunitachiTachikawa.coordinates.slice(1, -1);
segments.push({
  fromStationId: 'JC-18',
  toStationId: 'JC-19',
  fromName: '国立',
  toName: '立川',
  coordinates: kunitachiTachikawaPts.map(p => [Math.round(p[0] * 1000000) / 1000000, Math.round(p[1] * 1000000) / 1000000])
});

// 5. 立川 -> 日野 (JC-19 -> JC-20)
const oldTachikawaHino = getOldSeg('立川', '日野');
const hinoCoord = oldTachikawaHino.coordinates[oldTachikawaHino.coordinates.length - 2];
finalStationCoords['日野'] = hinoCoord;
const tachikawaHinoPts = oldTachikawaHino.coordinates.slice(1, -1);
segments.push({
  fromStationId: 'JC-19',
  toStationId: 'JC-20',
  fromName: '立川',
  toName: '日野',
  coordinates: tachikawaHinoPts.map(p => [Math.round(p[0] * 1000000) / 1000000, Math.round(p[1] * 1000000) / 1000000])
});

// 6. 日野 -> 豊田 (JC-20 -> JC-21)
const oldHinoToyoda = getOldSeg('日野', '豊田');
const toyodaCoord = oldHinoToyoda.coordinates[oldHinoToyoda.coordinates.length - 2];
finalStationCoords['豊田'] = toyodaCoord;
const hinoToyodaCleaned = oldHinoToyoda.coordinates.slice(1, -1).filter((_, idx) => idx !== 25);
segments.push({
  fromStationId: 'JC-20',
  toStationId: 'JC-21',
  fromName: '日野',
  toName: '豊田',
  coordinates: hinoToyodaCleaned.map(p => [Math.round(p[0] * 1000000) / 1000000, Math.round(p[1] * 1000000) / 1000000])
});

// 7. 豊田 -> 八王子 (JC-21 -> JC-22)
const oldToyodaHachioji = getOldSeg('豊田', '八王子');
const hachiojiCoord = oldToyodaHachioji.coordinates[oldToyodaHachioji.coordinates.length - 2];
finalStationCoords['八王子'] = hachiojiCoord;
const toyodaHachiojiPts = oldToyodaHachioji.coordinates.slice(1, -1);
segments.push({
  fromStationId: 'JC-21',
  toStationId: 'JC-22',
  fromName: '豊田',
  toName: '八王子',
  coordinates: toyodaHachiojiPts.map(p => [Math.round(p[0] * 1000000) / 1000000, Math.round(p[1] * 1000000) / 1000000])
});

console.log(`\nWriting to src/data/lines/musashino/trackGeometry.ts...`);
const trackContent = `import type { TrackSegment } from '../../../types';

// JR武蔵野線および直通区間 高精度実軌道ジオメトリ（OSM準拠・側線逆走完全排除済み）
export const MUSASHINO_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(segments, null, 2)};
`;
fs.writeFileSync('src/data/lines/musashino/trackGeometry.ts', trackContent, 'utf8');
console.log('Saved trackGeometry.ts successfully!');

// stations.ts の更新
console.log(`Updating src/data/lines/musashino/stations.ts...`);
let stationsContent = fs.readFileSync('src/data/lines/musashino/stations.ts', 'utf8');

// 各駅の lat / lng を finalStationCoords で置換
Object.entries(finalStationCoords).forEach(([name, coord]) => {
  const lat = Math.round(coord[0] * 1000000) / 1000000;
  const lng = Math.round(coord[1] * 1000000) / 1000000;

  // 駅ブロックを特定して lat/lng を置換
  const stationRegex = new RegExp(`("name":\\s*"${name}"[\\s\\S]*?"lat":\\s*)([0-9.]+)([\\s\\S]*?"lng":\\s*)([0-9.]+)`);
  if (stationRegex.test(stationsContent)) {
    stationsContent = stationsContent.replace(stationRegex, `$1${lat}$3${lng}`);
  } else {
    console.warn(`Could not find regex match for station: ${name}`);
  }
});

fs.writeFileSync('src/data/lines/musashino/stations.ts', stationsContent, 'utf8');
console.log('Saved stations.ts successfully!');
