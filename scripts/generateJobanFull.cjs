const fs = require('fs');

console.log('=== 🚆 常磐線（取手～いわき）& 常磐線（いわき～仙台）完全生成 ===');

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
// 1. OSM常磐線データ読み込み & グラフ構築
// ==========================================
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
// 常磐線本線 Wayの端点結合 (<= 35m)
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
    if (d <= 35) addJobanEdge(jobanWayEndpoints[i], jobanWayEndpoints[j]);
  }
}

// ==========================================
// 2. 常磐線（取手～いわき）定義
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
  { id: 'JN-19', number: 19, name: '佐和', nameKana: 'さわ', nameEn: 'Sawa', lat: 36.4299, lng: 140.5403, nodeId: 5660663145, isMajor: false, transfers: [], address: '茨城県ひたちなか市大字高場字向山558', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JN-20', number: 20, name: '東海', nameKana: 'とうかい', nameEn: 'Tokai', lat: 36.4656, lng: 140.5660, nodeId: 5660978835, isMajor: true, transfers: [], address: '茨城県那珂郡東海村舟石川駅東一丁目1-1', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JN-21', number: 21, name: '大甕', nameKana: 'おおみか', nameEn: 'Omika', lat: 36.5131, lng: 140.6196, nodeId: 4349326581, isMajor: true, transfers: [], address: '茨城県日立市大みか町二丁目23-1', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JN-22', number: 22, name: '常陸多賀', nameKana: 'ひたちたが', nameEn: 'Hitachi-Taga', lat: 36.5520, lng: 140.6324, nodeId: 5664307596, isMajor: true, transfers: [], address: '茨城県日立市多賀町一丁目1-1', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JN-23', number: 23, name: '日立', nameKana: 'ひたち', nameEn: 'Hitachi', lat: 36.5909, lng: 140.6620, nodeId: 264406045, isMajor: true, transfers: [], address: '茨城県日立市幸町一丁目1-1', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JN-24', number: 24, name: '小木津', nameKana: 'おぎつ', nameEn: 'Ogitsu', lat: 36.6368, lng: 140.6752, nodeId: 264406056, isMajor: false, transfers: [], address: '茨城県日立市日高町一丁目1-1', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JN-25', number: 25, name: '十王', nameKana: 'じゅうおう', nameEn: 'Juo', lat: 36.6714, lng: 140.6859, nodeId: 5669561679, isMajor: false, transfers: [], address: '茨城県日立市十王町友部字手綱', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JN-26', number: 26, name: '高萩', nameKana: 'たかはぎ', nameEn: 'Takahagi', lat: 36.7146, lng: 140.7170, nodeId: 264406579, isMajor: true, transfers: [], address: '茨城県高萩市大字高萩1928', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JN-27', number: 27, name: '南中郷', nameKana: 'みなみなかごう', nameEn: 'Minami-Nakago', lat: 36.7533, lng: 140.7289, nodeId: 264406600, isMajor: false, transfers: [], address: '茨城県北茨城市中郷町小野矢指', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JN-28', number: 28, name: '磯原', nameKana: 'いそはら', nameEn: 'Isohara', lat: 36.7905, lng: 140.7459, nodeId: 264406116, isMajor: true, transfers: [], address: '茨城県北茨城市磯原町磯原', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JN-29', number: 29, name: '大津港', nameKana: 'おおつこう', nameEn: 'Otsuko', lat: 36.8468, lng: 140.7780, nodeId: 4363722537, isMajor: false, transfers: [], address: '茨城県北茨城市大津町', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JN-30', number: 30, name: '勿来', nameKana: 'なこそ', nameEn: 'Nakoso', lat: 36.8840, lng: 140.7868, nodeId: 5663950852, isMajor: true, transfers: [], address: '福島県いわき市勿来町関田関山', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JN-31', number: 31, name: '植田', nameKana: 'うえだ', nameEn: 'Ueda', lat: 36.9203, lng: 140.7966, nodeId: 5670289014, isMajor: true, transfers: [], address: '福島県いわき市植田町佐糠町', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JN-32', number: 32, name: '泉', nameKana: 'いずみ', nameEn: 'Izumi', lat: 36.9556, lng: 140.8541, nodeId: 5670388547, isMajor: true, transfers: ['福島臨海鉄道本線(貨物)'], address: '福島県いわき市泉町滝尻字松原', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JN-33', number: 33, name: '湯本', nameKana: 'ゆもと', nameEn: 'Yumoto', lat: 37.0066, lng: 140.8501, nodeId: 5672601266, isMajor: true, transfers: [], address: '福島県いわき市常磐湯本町天王崎', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JN-34', number: 34, name: '内郷', nameKana: 'うちごう', nameEn: 'Uchigo', lat: 37.0357, lng: 140.8548, nodeId: 5672600987, isMajor: false, transfers: [], address: '福島県いわき市内郷綴町榎下', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JN-35', number: 35, name: 'いわき', nameKana: 'いわき', nameEn: 'Iwaki', lat: 37.0583, lng: 140.8922, nodeId: 5672876533, isMajor: true, transfers: ['JR常磐線(いわき～仙台)', 'JR磐越東線'], address: '福島県いわき市平字田町1', platforms: { inbound: '1・2・3番線', outbound: '3・4・5番線' } },
];

// 2.1 stations.ts 出力
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
    waitingRoom: ['取手', '土浦', '石岡', '友部', '水戸', '勝田', '日立', '高萩', 'いわき'].includes(s.name),
    ticketOffice: true,
  },
  stoppingTypes: ['local', 'rapid', 'special_rapid', 'limited_express'],
  isMajor: s.isMajor,
  platforms: s.platforms,
}));

fs.mkdirSync('src/data/lines/joban_north', { recursive: true });
fs.writeFileSync(
  'src/data/lines/joban_north/stations.ts',
  `import type { Station } from '../../../types';\n\nexport const JOBAN_NORTH_STATIONS: Station[] = ${JSON.stringify(northStationsOut, null, 2)};\n`,
  'utf8'
);
console.log('Written src/data/lines/joban_north/stations.ts (35 stations)');

// 2.2 trainTypes.ts 出力
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

// 2.3 trackGeometry.ts (joban_north) 生成
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
console.log('Written src/data/lines/joban_north/trackGeometry.ts (34 segments)');

// 2.4 index.ts 出力
const northIndexContent = `import type { LineDefinition } from '../../../types';
import { JOBAN_NORTH_STATIONS } from './stations';
import { JOBAN_NORTH_TRAIN_TYPES } from './trainTypes';
import { JOBAN_NORTH_TRACK_SEGMENTS } from './trackGeometry';

export const jobanNorthLine: LineDefinition = {
  id: 'joban_north',
  name: 'JR常磐線(取手～いわき)',
  shortName: '常磐線(取手～いわき)',
  operator: 'JR東日本',
  lineColor: '#005aaa',
  accentColor: '#005aaa',
  defaultCars: 10,
  defaultBounds: [
    [35.890, 140.050], // 取手周辺
    [37.070, 140.910], // いわき周辺
  ],
  directionNames: {
    inbound: '土浦・上野・品川方面',
    outbound: '水戸・いわき方面',
    inboundFull: '上り 土浦・取手・上野・品川方面',
    outboundFull: '下り 水戸・高萩・いわき方面',
    inboundShort: '上野方面',
    outboundShort: 'いわき方面',
  },
  stations: JOBAN_NORTH_STATIONS,
  trackSegments: JOBAN_NORTH_TRACK_SEGMENTS,
  trainTypes: JOBAN_NORTH_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
`;
fs.writeFileSync('src/data/lines/joban_north/index.ts', northIndexContent, 'utf8');
console.log('Written src/data/lines/joban_north/index.ts');


// ==========================================
// 3. 常磐線（いわき～仙台）定義
// ==========================================
const sendaiStationDefs = [
  { id: 'JSD-01', number: 1, name: 'いわき', nameKana: 'いわき', nameEn: 'Iwaki', lat: 37.0583, lng: 140.8922, nodeId: 5672876533, isMajor: true, transfers: ['JR常磐線(取手～いわき)', 'JR磐越東線'], address: '福島県いわき市平字田町1', platforms: { inbound: '1・2・3番線', outbound: '3・4・5番線' } },
  { id: 'JSD-02', number: 2, name: '草野', nameKana: 'くさの', nameEn: 'Kusano', lat: 37.0740, lng: 140.9473, nodeId: 5676651201, isMajor: false, transfers: [], address: '福島県いわき市平泉崎字中島', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JSD-03', number: 3, name: '四ツ倉', nameKana: 'よつくら', nameEn: 'Yotsukura', lat: 37.1027, lng: 140.9812, nodeId: 5676680226, isMajor: true, transfers: [], address: '福島県いわき市四倉町字鬼越', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JSD-04', number: 4, name: '久ノ浜', nameKana: 'ひさのはま', nameEn: 'Hisanohama', lat: 37.1423, lng: 140.9957, nodeId: 5705351196, isMajor: false, transfers: [], address: '福島県いわき市久之浜町久之浜字北町', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JSD-05', number: 5, name: '末続', nameKana: 'すえつぎ', nameEn: 'Suetsugi', lat: 37.1725, lng: 140.9955, nodeId: 264404364, isMajor: false, transfers: [], address: '福島県いわき市久之浜町末続字代', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JSD-06', number: 6, name: '広野', nameKana: 'ひろの', nameEn: 'Hirono', lat: 37.2121, lng: 140.9992, nodeId: 5705167960, isMajor: true, transfers: [], address: '福島県双葉郡広野町大字下北迫字苗代替', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JSD-07', number: 7, name: 'Ｊヴィレッジ', nameKana: 'じぇいびれっじ', nameEn: 'J-Village', lat: 37.2420, lng: 141.0074, nodeId: 6339841638, isMajor: false, transfers: [], address: '福島県双葉郡楢葉町大字山田岡字林脇', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JSD-08', number: 8, name: '木戸', nameKana: 'きど', nameEn: 'Kido', lat: 37.2579, lng: 141.0025, nodeId: 5705228486, isMajor: false, transfers: [], address: '福島県双葉郡楢葉町大字山田岡字本町', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JSD-09', number: 9, name: '竜田', nameKana: 'たつた', nameEn: 'Tatsuta', lat: 37.2826, lng: 141.0027, nodeId: 264405001, isMajor: false, transfers: [], address: '福島県双葉郡楢葉町大字井出字木屋', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JSD-10', number: 10, name: '富岡', nameKana: 'とみおか', nameEn: 'Tomioka', lat: 37.3352, lng: 141.0225, nodeId: 264405007, isMajor: true, transfers: [], address: '福島県双葉郡富岡町大字仏浜字釜田', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JSD-11', number: 11, name: '夜ノ森', nameKana: 'よのもり', nameEn: 'Yonomori', lat: 37.3659, lng: 140.9920, nodeId: 264404221, isMajor: false, transfers: [], address: '福島県双葉郡富岡町夜の森南二丁目', platforms: { inbound: '1番線', outbound: '1番線' } },
  { id: 'JSD-12', number: 12, name: '大野', nameKana: 'おおの', nameEn: 'Ono', lat: 37.4092, lng: 140.9841, nodeId: 6373786881, isMajor: true, transfers: [], address: '福島県双葉郡大熊町大字下野上字大野', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JSD-13', number: 13, name: '双葉', nameKana: 'ふたば', nameEn: 'Futaba', lat: 37.4538, lng: 141.0058, nodeId: 264404010, isMajor: true, transfers: [], address: '福島県双葉郡双葉町大字長塚字町西', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JSD-14', number: 14, name: '浪江', nameKana: 'なみえ', nameEn: 'Namie', lat: 37.4920, lng: 140.9899, nodeId: 6013132861, isMajor: true, transfers: [], address: '福島県双葉郡浪江町大字権現堂字新町', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JSD-15', number: 15, name: '桃内', nameKana: 'ももうち', nameEn: 'Momouchi', lat: 37.5289, lng: 140.9845, nodeId: 6351580992, isMajor: false, transfers: [], address: '福島県南相馬市小高区耳谷字桃内', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JSD-16', number: 16, name: '小高', nameKana: 'おだか', nameEn: 'Odaka', lat: 37.5629, lng: 140.9963, nodeId: 264404746, isMajor: true, transfers: [], address: '福島県南相馬市小高区東町一丁目', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JSD-17', number: 17, name: '磐城太田', nameKana: 'いわきおおた', nameEn: 'Iwaki-Ota', lat: 37.6048, lng: 140.9918, nodeId: 6312082791, isMajor: false, transfers: [], address: '福島県南相馬市原町区矢川原字島田', platforms: { inbound: '1番線', outbound: '1番線' } },
  { id: 'JSD-18', number: 18, name: '原ノ町', nameKana: 'はらのまち', nameEn: 'Haranomachi', lat: 37.6378, lng: 140.9713, nodeId: 264405312, isMajor: true, transfers: [], address: '福島県南相馬市原町区旭町二丁目', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JSD-19', number: 19, name: '鹿島', nameKana: 'かしま', nameEn: 'Kashima', lat: 37.7026, lng: 140.9703, nodeId: 6343311091, isMajor: false, transfers: [], address: '福島県南相馬市鹿島区鹿島字町', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JSD-20', number: 20, name: '日立木', nameKana: 'にったき', nameEn: 'Nittaki', lat: 37.7560, lng: 140.9347, nodeId: 264403654, isMajor: false, transfers: [], address: '福島県相馬市日立木字堀ノ内', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JSD-21', number: 21, name: '相馬', nameKana: 'そうま', nameEn: 'Soma', lat: 37.8029, lng: 140.9256, nodeId: 6312226074, isMajor: true, transfers: [], address: '福島県相馬市中村字曲田', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JSD-22', number: 22, name: '駒ケ嶺', nameKana: 'こまがみね', nameEn: 'Komagamine', lat: 37.8421, lng: 140.9251, nodeId: 264403816, isMajor: false, transfers: [], address: '福島県相馬郡新地町駒ケ嶺字深町', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JSD-23', number: 23, name: '新地', nameKana: 'しんち', nameEn: 'Shinchi', lat: 37.8794, lng: 140.9255, nodeId: 4057942480, isMajor: true, transfers: [], address: '福島県相馬郡新地町谷地小屋', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JSD-24', number: 24, name: '坂元', nameKana: 'さかもと', nameEn: 'Sakamoto', lat: 37.9242, lng: 140.9010, nodeId: 4057947406, isMajor: false, transfers: [], address: '宮城県亘理郡山元町坂元字町西', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JSD-25', number: 25, name: '山下', nameKana: 'やました', nameEn: 'Yamashita', lat: 37.9662, lng: 140.8890, nodeId: 5709061494, isMajor: true, transfers: [], address: '宮城県亘理郡山元町つばめの杜一丁目', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JSD-26', number: 26, name: '浜吉田', nameKana: 'はまよしだ', nameEn: 'Hamayoshida', lat: 38.0023, lng: 140.8900, nodeId: 6256058797, isMajor: false, transfers: [], address: '宮城県亘理郡亘理町吉田字流', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JSD-27', number: 27, name: '亘理', nameKana: 'わたり', nameEn: 'Watari', lat: 38.0396, lng: 140.8615, nodeId: 264402995, isMajor: true, transfers: [], address: '宮城県亘理郡亘理町字道田', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JSD-28', number: 28, name: '逢隈', nameKana: 'おおくま', nameEn: 'Okuma', lat: 38.0672, lng: 140.8548, nodeId: 264403436, isMajor: false, transfers: [], address: '宮城県亘理郡亘理町逢隈下郡字生勝', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JSD-29', number: 29, name: '岩沼', nameKana: 'いわぬま', nameEn: 'Iwanuma', lat: 38.1121, lng: 140.8640, nodeId: 3792749080, isMajor: true, transfers: ['JR東北本線'], address: '宮城県岩沼市館下一丁目4-1', platforms: { inbound: '2・3番線', outbound: '4・5番線' } },
  { id: 'JSD-30', number: 30, name: '館腰', nameKana: 'たてこし', nameEn: 'Tatekoshi', lat: 38.1431, lng: 140.8803, nodeId: 5821319816, isMajor: false, transfers: ['JR東北本線'], address: '宮城県名取市植松四丁目', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JSD-31', number: 31, name: '名取', nameKana: 'なとり', nameEn: 'Natori', lat: 38.1734, lng: 140.8827, nodeId: 264175105, isMajor: true, transfers: ['JR東北本線', '仙台空港アクセス線'], address: '宮城県名取市増田二丁目5-1', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JSD-32', number: 32, name: '南仙台', nameKana: 'みなみせんだい', nameEn: 'Minami-Sendai', lat: 38.1973, lng: 140.8834, nodeId: 3792749086, isMajor: false, transfers: ['JR東北本線'], address: '宮城県仙台市太白区中田五丁目1-1', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JSD-33', number: 33, name: '太子堂', nameKana: 'たいしどう', nameEn: 'Taishido', lat: 38.2178, lng: 140.8834, nodeId: 264184750, isMajor: false, transfers: ['JR東北本線'], address: '宮城県仙台市太白区太子堂1-1', platforms: { inbound: '2番線', outbound: '1番線' } },
  { id: 'JSD-34', number: 34, name: '長町', nameKana: 'ながまち', nameEn: 'Nagamachi', lat: 38.2268, lng: 140.8855, nodeId: 3792749094, isMajor: true, transfers: ['JR東北本線', '仙台市地下鉄南北線'], address: '宮城県仙台市太白区長町五丁目1-1', platforms: { inbound: '2・3番線', outbound: '1番線' } },
  { id: 'JSD-35', number: 35, name: '仙台', nameKana: 'せんだい', nameEn: 'Sendai', lat: 38.2599, lng: 140.8823, nodeId: 3791321531, isMajor: true, transfers: ['JR東北本線', 'JR仙山線', 'JR仙石線', '東北新幹線', '秋田新幹線', '仙台市地下鉄南北線', '仙台市地下鉄東西線'], address: '宮城県仙台市青葉区中央一丁目1-1', platforms: { inbound: '1・2・4・5・6番線', outbound: '臨時' } },
];

// 3.1 stations.ts 出力
const sendaiStationsOut = sendaiStationDefs.map(s => ({
  id: s.id,
  lineId: 'joban_sendai',
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
    waitingRoom: ['いわき', '広野', '富岡', '浪江', '原ノ町', '相馬', '亘理', '岩沼', '名取', '仙台'].includes(s.name),
    ticketOffice: true,
  },
  stoppingTypes: ['local', 'rapid', 'limited_express'],
  isMajor: s.isMajor,
  platforms: s.platforms,
}));

fs.mkdirSync('src/data/lines/joban_sendai', { recursive: true });
fs.writeFileSync(
  'src/data/lines/joban_sendai/stations.ts',
  `import type { Station } from '../../../types';\n\nexport const JOBAN_SENDAI_STATIONS: Station[] = ${JSON.stringify(sendaiStationsOut, null, 2)};\n`,
  'utf8'
);
console.log('Written src/data/lines/joban_sendai/stations.ts (35 stations)');

// 3.2 trainTypes.ts 出力
const sendaiTrainTypesContent = `import type { TrainTypeConfig } from '../../../types';

export const JOBAN_SENDAI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
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
fs.writeFileSync('src/data/lines/joban_sendai/trainTypes.ts', sendaiTrainTypesContent, 'utf8');
console.log('Written src/data/lines/joban_sendai/trainTypes.ts');

// 3.3 trackGeometry.ts (joban_sendai) 生成
const sendaiTrackSegments = [];
for (let i = 0; i < sendaiStationDefs.length - 1; i++) {
  const from = sendaiStationDefs[i];
  const to = sendaiStationDefs[i + 1];

  const path = dijkstraGeneric(jobanNodeMap, jobanAdj, from.nodeId, to.nodeId);
  const rawCoords = path.map(id => [jobanNodeMap.get(id).lat, jobanNodeMap.get(id).lon]);
  rawCoords[0] = [from.lat, from.lng];
  rawCoords[rawCoords.length - 1] = [to.lat, to.lng];
  const finalCoords = subdivideCoordinates(rawCoords, 150);

  sendaiTrackSegments.push({
    fromStationId: from.id,
    toStationId: to.id,
    fromName: from.name,
    toName: to.name,
    coordinates: finalCoords,
  });
}

fs.writeFileSync(
  'src/data/lines/joban_sendai/trackGeometry.ts',
  `import type { TrackSegment } from '../../../types';\n\nexport const JOBAN_SENDAI_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(sendaiTrackSegments, null, 2)};\n`,
  'utf8'
);
console.log('Written src/data/lines/joban_sendai/trackGeometry.ts (34 segments)');

// 3.4 index.ts 出力
const sendaiIndexContent = `import type { LineDefinition } from '../../../types';
import { JOBAN_SENDAI_STATIONS } from './stations';
import { JOBAN_SENDAI_TRAIN_TYPES } from './trainTypes';
import { JOBAN_SENDAI_TRACK_SEGMENTS } from './trackGeometry';

export const jobanSendaiLine: LineDefinition = {
  id: 'joban_sendai',
  name: 'JR常磐線(いわき～仙台)',
  shortName: '常磐線(いわき～仙台)',
  operator: 'JR東日本',
  lineColor: '#005aaa',
  accentColor: '#005aaa',
  defaultCars: 4,
  defaultBounds: [
    [37.050, 140.880], // いわき周辺
    [38.270, 140.890], // 仙台周辺
  ],
  directionNames: {
    inbound: '原ノ町・いわき方面',
    outbound: '岩沼・名取・仙台方面',
    inboundFull: '上り 原ノ町・いわき・水戸・品川方面',
    outboundFull: '下り 岩沼・名取・仙台方面',
    inboundShort: 'いわき方面',
    outboundShort: '仙台方面',
  },
  stations: JOBAN_SENDAI_STATIONS,
  trackSegments: JOBAN_SENDAI_TRACK_SEGMENTS,
  trainTypes: JOBAN_SENDAI_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
`;
fs.writeFileSync('src/data/lines/joban_sendai/index.ts', sendaiIndexContent, 'utf8');
console.log('Written src/data/lines/joban_sendai/index.ts');

console.log('🎉 常磐線（取手～いわき）& 常磐線（いわき～仙台）の全メタデータ・高品質ジオメトリ完全生成完了！');
