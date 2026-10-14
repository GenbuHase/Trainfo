const fs = require('fs');

console.log('=== 🚆 常磐線快速 & 常磐線(取手以北) 軌道・メタデータ完全生成 ===');

// --- ユーティリティ: 距離計算 & サブディビジョン補間 ---
function getDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function subdivideCoordinates(coords, maxStepMeters = 150) {
  if (coords.length < 2) return coords;
  const result = [coords[0]];
  for (let i = 0; i < coords.length - 1; i++) {
    const p1 = coords[i];
    const p2 = coords[i + 1];
    const dist = getDistanceMeters(p1[0], p1[1], p2[0], p2[1]);
    if (dist > maxStepMeters) {
      const steps = Math.ceil(dist / maxStepMeters);
      for (let s = 1; s < steps; s++) {
        const frac = s / steps;
        result.push([
          Number((p1[0] + (p2[0] - p1[0]) * frac).toFixed(7)),
          Number((p1[1] + (p2[1] - p1[1]) * frac).toFixed(7)),
        ]);
      }
    }
    result.push(p2);
  }
  return result;
}

function dijkstraGeneric(nodeMap, adj, start, goal) {
  if (start === goal) return [start];
  const dist = new Map();
  const prev = new Map();
  const visited = new Set();
  dist.set(start, 0);
  const pq = [{ id: start, d: 0 }];
  while (pq.length > 0) {
    let minIdx = 0;
    for (let i = 1; i < pq.length; i++) if (pq[i].d < pq[minIdx].d) minIdx = i;
    const { id: u, d: uDist } = pq.splice(minIdx, 1)[0];
    if (visited.has(u)) continue;
    visited.add(u);
    if (u === goal) {
      const path = [];
      let c = goal;
      while (c !== undefined) { path.unshift(c); c = prev.get(c); }
      return path;
    }
    const uN = nodeMap.get(u);
    for (const v of adj.get(u) || []) {
      if (visited.has(v)) continue;
      const vN = nodeMap.get(v);
      const w = getDistanceMeters(uN.lat, uN.lon, vN.lat, vN.lon);
      const alt = uDist + w;
      if (!dist.has(v) || alt < dist.get(v)) {
        dist.set(v, alt);
        prev.set(v, u);
        pq.push({ id: v, d: alt });
      }
    }
  }
  return null;
}

// ==========================================
// 1. 各OSMデータの読み込みと個別グラフ構築
// ==========================================

// 1.1 東海道本線地上面 (品川〜新橋〜東京)
const osmShinagawaWays = JSON.parse(fs.readFileSync('scripts/cache/osm/tokyo_shinagawa_ways.json', 'utf8'));
const tokaidoWays = osmShinagawaWays.elements.filter(el => 
  el.type === 'way' && el.geometry && el.tags && el.tags.name === '東海道本線' && el.tags.tunnel !== 'yes'
);
const tokaidoNodeMap = new Map();
const tokaidoAdj = new Map();
const tokaidoWayEndpoints = new Set();
function addTokaidoEdge(u, v) {
  if (!tokaidoAdj.has(u)) tokaidoAdj.set(u, []);
  if (!tokaidoAdj.has(v)) tokaidoAdj.set(v, []);
  tokaidoAdj.get(u).push(v);
  tokaidoAdj.get(v).push(u);
}
for (const el of tokaidoWays) {
  const firstVId = -(el.id * 1000);
  const lastVId = -(el.id * 1000 + (el.geometry.length - 1));
  tokaidoWayEndpoints.add(firstVId);
  tokaidoWayEndpoints.add(lastVId);
  for (let i = 0; i < el.geometry.length; i++) {
    const pt = el.geometry[i];
    const vId = -(el.id * 1000 + i);
    tokaidoNodeMap.set(vId, { id: vId, lat: pt.lat, lon: pt.lon });
    if (i > 0) addTokaidoEdge(-(el.id * 1000 + (i - 1)), vId);
  }
}
const tokaidoEpList = Array.from(tokaidoWayEndpoints);
for (let i = 0; i < tokaidoEpList.length; i++) {
  for (let j = i + 1; j < tokaidoEpList.length; j++) {
    const n1 = tokaidoNodeMap.get(tokaidoEpList[i]);
    const n2 = tokaidoNodeMap.get(tokaidoEpList[j]);
    if (!n1 || !n2) continue;
    const d = getDistanceMeters(n1.lat, n1.lon, n2.lat, n2.lon);
    if (d <= 35) addTokaidoEdge(tokaidoEpList[i], tokaidoEpList[j]);
  }
}
function findNearestTokaido(lat, lon) {
  let best = null, minDist = Infinity;
  for (const [id, n] of tokaidoNodeMap.entries()) {
    const d = getDistanceMeters(lat, lon, n.lat, n.lon);
    if (d < minDist) { minDist = d; best = id; }
  }
  return best;
}

// 1.2 上野東京ライン (東京〜上野)
const osmUenoTokyo = JSON.parse(fs.readFileSync('scripts/cache/osm/osm_ueno_tokyo_5195693.json', 'utf8'));
const utNodeMap = new Map();
const utAdj = new Map();
function addUtEdge(u, v) {
  if (!utAdj.has(u)) utAdj.set(u, []);
  if (!utAdj.has(v)) utAdj.set(v, []);
  utAdj.get(u).push(v);
  utAdj.get(v).push(u);
}
for (const el of osmUenoTokyo.elements) {
  if (el.type === 'node') utNodeMap.set(el.id, el);
  else if (el.type === 'way' && el.nodes) {
    for (let i = 0; i < el.nodes.length - 1; i++) addUtEdge(el.nodes[i], el.nodes[i + 1]);
  }
}

// 1.3 常磐線本線 (上野〜取手〜勝田)
const osmJoban = JSON.parse(fs.readFileSync('scripts/cache/osm/osm_joban_main_1872548.json', 'utf8'));
const jobanNodeMap = new Map();
const jobanAdj = new Map();
function addJobanEdge(u, v) {
  if (!jobanAdj.has(u)) jobanAdj.set(u, []);
  if (!jobanAdj.has(v)) jobanAdj.set(v, []);
  jobanAdj.get(u).push(v);
  jobanAdj.get(v).push(u);
}
for (const el of osmJoban.elements) {
  if (el.type === 'node') jobanNodeMap.set(el.id, el);
  else if (el.type === 'way' && el.nodes) {
    for (let i = 0; i < el.nodes.length - 1; i++) addJobanEdge(el.nodes[i], el.nodes[i + 1]);
  }
}
// 常磐線本線 Wayの端点結合 (<= 30m)
const jobanWayEndpoints = [];
for (const el of osmJoban.elements) {
  if (el.type === 'way' && el.nodes && el.nodes.length > 0) {
    jobanWayEndpoints.push(el.nodes[0], el.nodes[el.nodes.length - 1]);
  }
}
for (let i = 0; i < jobanWayEndpoints.length; i++) {
  for (let j = i + 1; j < jobanWayEndpoints.length; j++) {
    const n1 = jobanNodeMap.get(jobanWayEndpoints[i]);
    const n2 = jobanNodeMap.get(jobanWayEndpoints[j]);
    if (!n1 || !n2) continue;
    const d = getDistanceMeters(n1.lat, n1.lon, n2.lat, n2.lon);
    if (d <= 30) addJobanEdge(jobanWayEndpoints[i], jobanWayEndpoints[j]);
  }
}

// ==========================================
// 2. 常磐線快速 (joban_rapid) 定義 & 出力
// ==========================================
const rapidStationDefs = [
  { id: 'JJ-01', number: 1, name: '品川', nameKana: 'しながわ', nameEn: 'Shinagawa', lat: 35.6284, lng: 139.7390, isMajor: true, transfers: ['JR東海道線', 'JR山手線', 'JR京浜東北線', 'JR横須賀線', '東海道新幹線', '京急本線'], address: '東京都港区高輪三丁目26-27', platforms: { inbound: '9・10番線', outbound: '臨時' } },
  { id: 'JJ-02', number: 2, name: '新橋', nameKana: 'しんばし', nameEn: 'Shimbashi', lat: 35.6660, lng: 139.7586, isMajor: true, transfers: ['JR東海道線', 'JR山手線', 'JR京浜東北線', 'JR横須賀線', '東京メトロ銀座線', '都営浅草線', 'ゆりかもめ'], address: '東京都港区新橋二丁目17', platforms: { inbound: '3番線', outbound: '4番線' } },
  { id: 'JJ-03', number: 3, name: '東京', nameKana: 'とうきょう', nameEn: 'Tokyo', lat: 35.6811274, lng: 139.7671827, nodeId: 3589537647, isMajor: true, transfers: ['JR東海道線', 'JR山手線', 'JR京浜東北線', 'JR中央線', 'JR総武線快速', 'JR横須賀線', 'JR京葉線', 'JR新幹線', '東京メトロ丸ノ内線'], address: '東京都千代田区丸の内一丁目', platforms: { inbound: '7・8番線', outbound: '9・10番線' } },
  { id: 'JJ-04', number: 4, name: '上野', nameKana: 'うえの', nameEn: 'Ueno', lat: 35.7132392, lng: 139.7769652, nodeId: 3708279839, isMajor: true, transfers: ['JR山手線', 'JR京浜東北線', 'JR宇都宮線', 'JR高崎線', 'JR新幹線', '東京メトロ銀座線', '東京メトロ日比谷線', '京成本線'], address: '東京都台東区上野七丁目1-1', platforms: { inbound: '3・4番線', outbound: '8・9・10・11・12番線' } },
  { id: 'JJ-05', number: 5, name: '日暮里', nameKana: 'にっぽり', nameEn: 'Nippori', lat: 35.7282503, lng: 139.7707956, nodeId: 6089176682, isMajor: true, transfers: ['JR山手線', 'JR京浜東北線', '京成本線', '日暮里・舎人ライナー'], address: '東京都荒川区西日暮里二丁目19-1', platforms: { inbound: '3番線', outbound: '4番線' } },
  { id: 'JJ-06', number: 6, name: '三河島', nameKana: 'みかわしま', nameEn: 'Mikawashima', lat: 35.7333691, lng: 139.7775289, nodeId: 1591550225, isMajor: false, transfers: [], address: '東京都荒川区西日暮里一丁目6-12', platforms: { inbound: '1番線', outbound: '2番線' } },
  { id: 'JJ-07', number: 7, name: '南千住', nameKana: 'みなみせんじゅ', nameEn: 'Minami-senju', lat: 35.7333239, lng: 139.7989556, nodeId: 2043533004, isMajor: false, transfers: ['東京メトロ日比谷線', 'つくばエクスプレス'], address: '東京都荒川区南千住四丁目2-1', platforms: { inbound: '1番線', outbound: '2番線' } },
  { id: 'JJ-08', number: 8, name: '北千住', nameKana: 'きたせんじゅ', nameEn: 'Kita-senju', lat: 35.7488638, lng: 139.8046537, nodeId: 6089170090, isMajor: true, transfers: ['JR常磐線各駅停車', '東武スカイツリーライン', '東京メトロ千代田線', '東京メトロ日比谷線', 'つくばエクスプレス'], address: '東京都足立区千住旭町42-1', platforms: { inbound: '1・2番線', outbound: '3番線' } },
  { id: 'JJ-09', number: 9, name: '松戸', nameKana: 'まつど', nameEn: 'Matsudo', lat: 35.7845283, lng: 139.9004334, nodeId: 6089167855, isMajor: true, transfers: ['JR常磐線各駅停車', '新京成線'], address: '千葉県松戸市松戸1181', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JJ-10', number: 10, name: '柏', nameKana: 'かしわ', nameEn: 'Kashiwa', lat: 35.8623843, lng: 139.9709425, nodeId: 3654391414, isMajor: true, transfers: ['JR常磐線各駅停車', '東武アーバンパークライン'], address: '千葉県柏市柏一丁目1-1', platforms: { inbound: '3・4番線', outbound: '1・2番線' } },
  { id: 'JJ-11', number: 11, name: '我孫子', nameKana: 'あびこ', nameEn: 'Abiko', lat: 35.8729998, lng: 140.0107446, nodeId: 6089154723, isMajor: true, transfers: ['JR常磐線各駅停車', 'JR成田線'], address: '千葉県我孫子市本町二丁目1-1', platforms: { inbound: '4・5番線', outbound: '1・2番線' } },
  { id: 'JJ-12', number: 12, name: '天王台', nameKana: 'てんのうだい', nameEn: 'Tennodai', lat: 35.8727292, lng: 140.0406808, nodeId: 6089154750, isMajor: false, transfers: ['JR常磐線各駅停車'], address: '千葉県我孫子市柴崎台一丁目19-1', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JJ-13', number: 13, name: '取手', nameKana: 'とりで', nameEn: 'Toride', lat: 35.8956226, lng: 140.0627766, nodeId: 5651645055, isMajor: true, transfers: ['JR常磐線各駅停車', 'JR常磐線(取手以北)', '関東鉄道常総線'], address: '茨城県取手市中央町1-1', platforms: { inbound: '3・4番線', outbound: '1・2番線' } },
];

const rapidStationsOut = rapidStationDefs.map(s => ({
  id: s.id,
  lineId: 'joban_rapid',
  number: s.number,
  name: s.name,
  nameKana: s.nameKana,
  nameEn: s.nameEn,
  lat: s.lat,
  lng: s.lng,
  transfers: s.transfers,
  address: s.address,
  facilities: {
    elevator: true,
    restroom: true,
    multipurposeToilet: true,
    waitingRoom: ['東京', '上野', '柏', '取手'].includes(s.name),
    ticketOffice: true,
  },
  stoppingTypes: ['三河島', '南千住'].includes(s.name)
    ? ['local', 'rapid']
    : ['local', 'rapid', 'special_rapid'],
  isMajor: s.isMajor,
  platforms: s.platforms,
}));

fs.mkdirSync('src/data/lines/joban_rapid', { recursive: true });
fs.writeFileSync(
  'src/data/lines/joban_rapid/stations.ts',
  `import type { Station } from '../../../types';\n\nexport const JOBAN_RAPID_STATIONS: Station[] = ${JSON.stringify(rapidStationsOut, null, 2)};\n`,
  'utf8'
);
console.log('Written src/data/lines/joban_rapid/stations.ts');

const rapidTrainTypesContent = `import type { TrainTypeConfig } from '../../../types';

export const JOBAN_RAPID_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#00b261',
    textColor: '#ffffff',
    bgColor: '#00b261',
    borderColor: '#008a4b',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#005aaa',
    textColor: '#ffffff',
    bgColor: '#005aaa',
    borderColor: '#004280',
  },
  special_rapid: {
    key: 'special_rapid',
    name: '特別快速',
    nameEn: 'Special Rapid',
    shortName: '特快',
    color: '#003366',
    textColor: '#ffffff',
    bgColor: '#003366',
    borderColor: '#002244',
  },
  limited_express: {
    key: 'limited_express',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: '#e60012',
    textColor: '#ffffff',
    bgColor: '#e60012',
    borderColor: '#b8000e',
  },
};
`;
fs.writeFileSync('src/data/lines/joban_rapid/trainTypes.ts', rapidTrainTypesContent, 'utf8');
console.log('Written src/data/lines/joban_rapid/trainTypes.ts');

const rapidTrackSegments = [];
for (let i = 0; i < rapidStationDefs.length - 1; i++) {
  const from = rapidStationDefs[i];
  const to = rapidStationDefs[i + 1];

  let rawCoords = [];
  if (i === 0) {
    const sNode = findNearestTokaido(from.lat, from.lng);
    const eNode = findNearestTokaido(to.lat, to.lng);
    const path = dijkstraGeneric(tokaidoNodeMap, tokaidoAdj, sNode, eNode);
    rawCoords = path.map(id => [tokaidoNodeMap.get(id).lat, tokaidoNodeMap.get(id).lon]);
  } else if (i === 1) {
    const sNode = findNearestTokaido(from.lat, from.lng);
    const eNode = findNearestTokaido(to.lat, to.lng);
    const path = dijkstraGeneric(tokaidoNodeMap, tokaidoAdj, sNode, eNode);
    rawCoords = path.map(id => [tokaidoNodeMap.get(id).lat, tokaidoNodeMap.get(id).lon]);
  } else if (i === 2) {
    const path = dijkstraGeneric(utNodeMap, utAdj, 3589537647, 3708279845);
    rawCoords = path.map(id => [utNodeMap.get(id).lat, utNodeMap.get(id).lon]);
  } else {
    const path = dijkstraGeneric(jobanNodeMap, jobanAdj, from.nodeId, to.nodeId);
    rawCoords = path.map(id => [jobanNodeMap.get(id).lat, jobanNodeMap.get(id).lon]);
  }

  rawCoords[0] = [from.lat, from.lng];
  rawCoords[rawCoords.length - 1] = [to.lat, to.lng];
  const finalCoords = subdivideCoordinates(rawCoords, 150);

  rapidTrackSegments.push({
    fromStationId: from.id,
    toStationId: to.id,
    fromName: from.name,
    toName: to.name,
    coordinates: finalCoords,
  });
}

fs.writeFileSync(
  'src/data/lines/joban_rapid/trackGeometry.ts',
  `import type { TrackSegment } from '../../../types';\n\nexport const JOBAN_RAPID_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(rapidTrackSegments, null, 2)};\n`,
  'utf8'
);
console.log('Written src/data/lines/joban_rapid/trackGeometry.ts');

const rapidIndexContent = `import type { LineConfig } from '../../../types';
import { JOBAN_RAPID_STATIONS } from './stations';
import { JOBAN_RAPID_TRAIN_TYPES } from './trainTypes';
import { JOBAN_RAPID_TRACK_SEGMENTS } from './trackGeometry';

export const JOBAN_RAPID_LINE_CONFIG: LineConfig = {
  id: 'joban_rapid',
  name: 'JR常磐線快速',
  nameEn: 'JR Joban Line Rapid Service',
  color: '#005aaa',
  stations: JOBAN_RAPID_STATIONS,
  trainTypes: JOBAN_RAPID_TRAIN_TYPES,
  trackSegments: JOBAN_RAPID_TRACK_SEGMENTS,
};
`;
fs.writeFileSync('src/data/lines/joban_rapid/index.ts', rapidIndexContent, 'utf8');
console.log('Written src/data/lines/joban_rapid/index.ts');


// ==========================================
// 3. 常磐線(取手以北) (joban_north) 定義 & 出力
// ==========================================
const northStationDefs = [
  { id: 'JN-01', number: 1, name: '取手', nameKana: 'とりで', nameEn: 'Toride', lat: 35.8956226, lng: 140.0627766, nodeId: 5651645055, isMajor: true, transfers: ['JR常磐線快速', 'JR常磐線各駅停車', '関東鉄道常総線'], address: '茨城県取手市中央町1-1', platforms: { inbound: '3・4番線', outbound: '1・2番線' } },
  { id: 'JN-02', number: 2, name: '藤代', nameKana: 'ふじしろ', nameEn: 'Fujishiro', lat: 35.9206022, lng: 140.1182209, nodeId: 240510319, isMajor: false, transfers: [], address: '茨城県取手市藤代676', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JN-03', number: 3, name: '龍ケ崎市', nameKana: 'りゅうがさきし', nameEn: 'Ryugasakishi', lat: 35.9301071, lng: 140.1380364, nodeId: 4634506807, isMajor: false, transfers: ['関東鉄道竜ヶ崎線'], address: '茨城県龍ケ崎市佐貫町647', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JN-04', number: 4, name: '牛久', nameKana: 'うしく', nameEn: 'Ushiku', lat: 35.9755110, lng: 140.1409829, nodeId: 5153427099, isMajor: false, transfers: [], address: '茨城県牛久市牛久町282', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JN-05', number: 5, name: 'ひたち野うしく', nameKana: 'ひたちのうしく', nameEn: 'Hitachinoushiku', lat: 36.0074136, lng: 140.1583239, nodeId: 240510155, isMajor: false, transfers: [], address: '茨城県牛久市ひたち野西三丁目41-1', platforms: { inbound: '3・4番線', outbound: '1・2番線' } },
  { id: 'JN-06', number: 6, name: '荒川沖', nameKana: 'あらかわおき', nameEn: 'Arakawaoki', lat: 36.0307524, lng: 140.1661125, nodeId: 240510121, isMajor: false, transfers: [], address: '茨城県土浦市荒川沖東二丁目1-6', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JN-07', number: 7, name: '土浦', nameKana: 'つちうら', nameEn: 'Tsuchiura', lat: 36.0784011, lng: 140.2061127, nodeId: 6069770956, isMajor: true, transfers: [], address: '茨城県土浦市有明町1-30', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JN-08', number: 8, name: '神立', nameKana: 'かんだつ', nameEn: 'Kandatsu', lat: 36.1203544, lng: 140.2484010, nodeId: 2609141443, isMajor: false, transfers: [], address: '茨城県土浦市神立中央一丁目1-1', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JN-09', number: 9, name: '高浜', nameKana: 'たかはま', nameEn: 'Takahama', lat: 36.1637863, lng: 140.2947047, nodeId: 5809762997, isMajor: false, transfers: [], address: '茨城県石岡市北高浜1-1', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JN-10', number: 10, name: '石岡', nameKana: 'いしおか', nameEn: 'Ishioka', lat: 36.1910664, lng: 140.2800099, nodeId: 2398353604, isMajor: true, transfers: [], address: '茨城県石岡市国府一丁目1-17', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JN-11', number: 11, name: '羽鳥', nameKana: 'はとり', nameEn: 'Hatori', lat: 36.2473133, lng: 140.2868929, nodeId: 2398353605, isMajor: false, transfers: [], address: '茨城県小美玉市羽鳥2683', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JN-12', number: 12, name: '岩間', nameKana: 'いわま', nameEn: 'Iwama', lat: 36.2952962, lng: 140.2764178, nodeId: 2398353603, isMajor: false, transfers: [], address: '茨城県笠間市下郷5140', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JN-13', number: 13, name: '友部', nameKana: 'ともべ', nameEn: 'Tomobe', lat: 36.3507475, lng: 140.3063097, nodeId: 5061828568, isMajor: true, transfers: ['JR水戸線'], address: '茨城県笠間市友部駅前1-1', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JN-14', number: 14, name: '内原', nameKana: 'うちはら', nameEn: 'Uchihara', lat: 36.3704589, lng: 140.3532703, nodeId: 5645883281, isMajor: false, transfers: [], address: '茨城県水戸市内原町141', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JN-15', number: 15, name: '赤塚', nameKana: 'あかつか', nameEn: 'Akatsuka', lat: 36.3818996, lng: 140.4152566, nodeId: 5645883284, isMajor: false, transfers: [], address: '茨城県水戸市赤塚一丁目1', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JN-16', number: 16, name: '偕楽園', nameKana: 'かいらくえん', nameEn: 'Kairakuen', lat: 36.3731190, lng: 140.4562314, nodeId: 5645883289, isMajor: false, transfers: [], address: '茨城県水戸市常磐町一丁目3', platforms: { inbound: 'なし（下りのみ）', outbound: '下り臨時ホーム' } },
  { id: 'JN-17', number: 17, name: '水戸', nameKana: 'みと', nameEn: 'Mito', lat: 36.3709421, lng: 140.4769045, nodeId: 5613310169, isMajor: true, transfers: ['JR水郡線', '鹿島臨海鉄道大洗鹿島線'], address: '茨城県水戸市宮町一丁目1-1', platforms: { inbound: '3・4番線', outbound: '5・6番線' } },
  { id: 'JN-18', number: 18, name: '勝田', nameKana: 'かつた', nameEn: 'Katsuta', lat: 36.3944425, lng: 140.5241522, nodeId: 264405533, isMajor: true, transfers: ['ひたちなか海浜鉄道湊線'], address: '茨城県ひたちなか市勝田中央1-1', platforms: { inbound: '2番線', outbound: '3・4番線' } },
];

const northStationsOut = northStationDefs.map(s => ({
  id: s.id,
  lineId: 'joban_north',
  number: s.number,
  name: s.name,
  nameKana: s.nameKana,
  nameEn: s.nameEn,
  lat: s.lat,
  lng: s.lng,
  transfers: s.transfers,
  address: s.address,
  facilities: {
    elevator: true,
    restroom: true,
    multipurposeToilet: true,
    waitingRoom: ['取手', '土浦', '石岡', '友部', '水戸', '勝田'].includes(s.name),
    ticketOffice: true,
  },
  stoppingTypes: ['local', 'rapid', 'special_rapid'],
  isMajor: s.isMajor,
  platforms: s.platforms,
}));

fs.mkdirSync('src/data/lines/joban_north', { recursive: true });
fs.writeFileSync(
  'src/data/lines/joban_north/stations.ts',
  `import type { Station } from '../../../types';\n\nexport const JOBAN_NORTH_STATIONS: Station[] = ${JSON.stringify(northStationsOut, null, 2)};\n`,
  'utf8'
);
console.log('Written src/data/lines/joban_north/stations.ts');

const northTrainTypesContent = `import type { TrainTypeConfig } from '../../../types';

export const JOBAN_NORTH_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#005aaa',
    textColor: '#ffffff',
    bgColor: '#005aaa',
    borderColor: '#004280',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#005aaa',
    textColor: '#ffffff',
    bgColor: '#005aaa',
    borderColor: '#004280',
  },
  special_rapid: {
    key: 'special_rapid',
    name: '特別快速',
    nameEn: 'Special Rapid',
    shortName: '特快',
    color: '#003366',
    textColor: '#ffffff',
    bgColor: '#003366',
    borderColor: '#002244',
  },
  limited_express: {
    key: 'limited_express',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: '#e60012',
    textColor: '#ffffff',
    bgColor: '#e60012',
    borderColor: '#b8000e',
  },
};
`;
fs.writeFileSync('src/data/lines/joban_north/trainTypes.ts', northTrainTypesContent, 'utf8');
console.log('Written src/data/lines/joban_north/trainTypes.ts');

const northTrackSegments = [];
for (let i = 0; i < northStationDefs.length - 1; i++) {
  const from = northStationDefs[i];
  const to = northStationDefs[i + 1];

  const path = dijkstraGeneric(jobanNodeMap, jobanAdj, from.nodeId, to.nodeId);
  const rawCoords = path.map(id => [jobanNodeMap.get(id).lat, jobanNodeMap.get(id).lon]);
  rawCoords[0] = [from.lat, from.lng];
  rawCoords[rawCoords.length - 1] = [to.lat, to.lng];
  const finalCoords = subdivideCoordinates(rawCoords, 150);

  northTrackSegments.push({
    fromStationId: from.id,
    toStationId: to.id,
    fromName: from.name,
    toName: to.name,
    coordinates: finalCoords,
  });
}

fs.writeFileSync(
  'src/data/lines/joban_north/trackGeometry.ts',
  `import type { TrackSegment } from '../../../types';\n\nexport const JOBAN_NORTH_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(northTrackSegments, null, 2)};\n`,
  'utf8'
);
console.log('Written src/data/lines/joban_north/trackGeometry.ts');

const northIndexContent = `import type { LineConfig } from '../../../types';
import { JOBAN_NORTH_STATIONS } from './stations';
import { JOBAN_NORTH_TRAIN_TYPES } from './trainTypes';
import { JOBAN_NORTH_TRACK_SEGMENTS } from './trackGeometry';

export const JOBAN_NORTH_LINE_CONFIG: LineConfig = {
  id: 'joban_north',
  name: 'JR常磐線(取手以北)',
  nameEn: 'JR Joban Line (Toride - Katsuta)',
  color: '#005aaa',
  stations: JOBAN_NORTH_STATIONS,
  trainTypes: JOBAN_NORTH_TRAIN_TYPES,
  trackSegments: JOBAN_NORTH_TRACK_SEGMENTS,
};
`;
fs.writeFileSync('src/data/lines/joban_north/index.ts', northIndexContent, 'utf8');
console.log('Written src/data/lines/joban_north/index.ts');

console.log('🎉 常磐線快速 & 常磐線(取手以北) の全メタデータ・高品質ジオメトリ完全生成完了！');
