const fs = require('fs');
const path = require('path');

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

console.log('=== 東北新幹線 軌道ジオメトリ & 駅メタデータ生成 ===');

const rawDown = JSON.parse(fs.readFileSync('scripts/cache/osm_tohoku_shinkansen_down.json', 'utf8'));
const rawUp = JSON.parse(fs.readFileSync('scripts/cache/osm_tohoku_shinkansen_up.json', 'utf8'));
const rawMissing = JSON.parse(fs.readFileSync('scripts/cache/osm_tohoku_shinkansen_missing.json', 'utf8'));

const missingShinkansenWays = rawMissing.elements.filter(el => 
  el.type === 'way' && (
    (el.tags && (el.tags.highspeed === 'yes' || el.tags.gauge === '1435' || el.tags.name?.includes('新幹線'))) ||
    el.tags?.railway === 'rail'
  )
);

const nodeMap = new Map();
[...rawDown.elements, ...rawUp.elements, ...rawMissing.elements]
  .filter(el => el.type === 'node')
  .forEach(n => nodeMap.set(n.id, n));

const wayMap = new Map();
[...rawDown.elements, ...rawUp.elements, ...missingShinkansenWays]
  .filter(el => el.type === 'way')
  .forEach(w => wayMap.set(w.id, w));

const ways = Array.from(wayMap.values());

const adj = new Map();
function addEdge(u, v) {
  if (!adj.has(u)) adj.set(u, []);
  if (!adj.has(v)) adj.set(v, []);
  adj.get(u).push(v);
  adj.get(v).push(u);
}

for (const w of ways) {
  for (let i = 0; i < w.nodes.length - 1; i++) {
    addEdge(w.nodes[i], w.nodes[i + 1]);
  }
}

const endpoints = [];
for (const w of ways) {
  if (w.nodes.length > 0) {
    endpoints.push(w.nodes[0]);
    endpoints.push(w.nodes[w.nodes.length - 1]);
  }
}

for (let i = 0; i < endpoints.length; i++) {
  for (let j = i + 1; j < endpoints.length; j++) {
    const u = endpoints[i];
    const v = endpoints[j];
    if (u === v) continue;
    const n1 = nodeMap.get(u);
    const n2 = nodeMap.get(v);
    if (!n1 || !n2) continue;
    const d = getDistanceMeters(n1.lat, n1.lon, n2.lat, n2.lon);
    if (d <= 35) {
      addEdge(u, v);
    }
  }
}

function findNearestInGraph(lat, lon) {
  let best = null, minDist = Infinity;
  for (const [id, n] of nodeMap.entries()) {
    if (!adj.has(id)) continue;
    const d = getDistanceMeters(lat, lon, n.lat, n.lon);
    if (d < minDist) { minDist = d; best = id; }
  }
  return { id: best, dist: minDist };
}

const stationDefs = [
  {
    id: 'TS-01',
    number: 1,
    name: '東京',
    nameKana: 'とうきょう',
    nameEn: 'Tokyo',
    osmNodeId: 3589537644,
    lat: 35.6810367,
    lng: 139.7674402,
    address: '東京都千代田区丸の内一丁目',
    transfers: ['JR山手線', 'JR京浜東北線', 'JR東海道線', 'JR中央線', 'JR総武快速線', 'JR横須賀線', 'JR京葉線', 'JR上野東京ライン', '東海道新幹線', '東京メトロ丸ノ内線'],
    platforms: { inbound: '20-23番線', outbound: '20-23番線' },
    stoppingTypes: ['hayabusa', 'hayate', 'yamabiko', 'nasuno', 'komachi', 'tsubasa', 'limitedExp'],
    isMajor: true,
  },
  {
    id: 'TS-02',
    number: 2,
    name: '上野',
    nameKana: 'うえの',
    nameEn: 'Ueno',
    osmNodeId: 3708279836,
    lat: 35.7130911,
    lng: 139.7772996,
    address: '東京都台東区上野七丁目',
    transfers: ['JR山手線', 'JR京浜東北線', 'JR宇都宮線', 'JR高崎線', 'JR常磐線', 'JR上野東京ライン', '東京メトロ銀座線', '東京メトロ日比谷線', '京成本線'],
    platforms: { inbound: '20-22番線', outbound: '19-20番線' },
    stoppingTypes: ['hayabusa', 'hayate', 'yamabiko', 'nasuno', 'komachi', 'tsubasa', 'limitedExp'],
    isMajor: true,
  },
  {
    id: 'TS-03',
    number: 3,
    name: '大宮',
    nameKana: 'おおみや',
    nameEn: 'Omiya',
    osmNodeId: 3654392246,
    lat: 35.9060944,
    lng: 139.6230141,
    address: '埼玉県さいたま市大宮区錦町',
    transfers: ['JR埼京線', 'JR川越線', 'JR京浜東北線', 'JR宇都宮線', 'JR高崎線', 'JR湘南新宿ライン', '上越新幹線', '北陸新幹線', '東武野田線', 'ニューシャトル'],
    platforms: { inbound: '13-15番線', outbound: '16-18番線' },
    stoppingTypes: ['hayabusa', 'hayate', 'yamabiko', 'nasuno', 'komachi', 'tsubasa', 'limitedExp'],
    isMajor: true,
  },
  {
    id: 'TS-04',
    number: 4,
    name: '小山',
    nameKana: 'おやま',
    nameEn: 'Oyama',
    osmNodeId: 6297316227,
    lat: 36.3131079,
    lng: 139.8060657,
    address: '栃木県小山市城山町三丁目',
    transfers: ['JR宇都宮線', 'JR両毛線', 'JR水戸線'],
    platforms: { inbound: '4番線', outbound: '1・5番線' },
    stoppingTypes: ['yamabiko', 'nasuno', 'tsubasa', 'limitedExp'],
    isMajor: false,
  },
  {
    id: 'TS-05',
    number: 5,
    name: '宇都宮',
    nameKana: 'うつのみや',
    nameEn: 'Utsunomiya',
    osmNodeId: 3721336952,
    lat: 36.5593541,
    lng: 139.8981115,
    address: '栃木県宇都宮市川向町',
    transfers: ['JR宇都宮線', 'JR日光線', '宇都宮ライトレール'],
    platforms: { inbound: '1-4番線', outbound: '1-4番線' },
    stoppingTypes: ['hayabusa', 'yamabiko', 'nasuno', 'tsubasa', 'limitedExp'],
    isMajor: true,
  },
  {
    id: 'TS-06',
    number: 6,
    name: '那須塩原',
    nameKana: 'なすしおばら',
    nameEn: 'Nasushiobara',
    osmNodeId: 5869823972,
    lat: 36.9316800,
    lng: 140.0205193,
    address: '栃木県那須塩原市大原間',
    transfers: ['JR宇都宮線'],
    platforms: { inbound: '1-2番線', outbound: '5-6番線' },
    stoppingTypes: ['yamabiko', 'nasuno', 'tsubasa', 'limitedExp'],
    isMajor: false,
  },
  {
    id: 'TS-07',
    number: 7,
    name: '新白河',
    nameKana: 'しんしらかわ',
    nameEn: 'Shin-Shirakawa',
    osmNodeId: 3721593581,
    lat: 37.1234946,
    lng: 140.1888839,
    address: '福島県西白河郡西郷村字道南東',
    transfers: ['JR東北本線'],
    platforms: { inbound: '1番線', outbound: '4番線' },
    stoppingTypes: ['yamabiko', 'nasuno', 'limitedExp'],
    isMajor: false,
  },
  {
    id: 'TS-08',
    number: 8,
    name: '郡山',
    nameKana: 'こおりやま',
    nameEn: 'Koriyama',
    osmNodeId: null,
    lat: 37.3985214,
    lng: 140.3886402,
    address: '福島県郡山市燧田',
    transfers: ['JR東北本線', 'JR磐越西線', 'JR磐越東線', 'JR水郡線'],
    platforms: { inbound: '11-12番線', outbound: '12-13番線' },
    stoppingTypes: ['hayabusa', 'yamabiko', 'nasuno', 'tsubasa', 'limitedExp'],
    isMajor: true,
  },
  {
    id: 'TS-09',
    number: 9,
    name: '福島',
    nameKana: 'ふくしま',
    nameEn: 'Fukushima',
    osmNodeId: 3721585422,
    lat: 37.7544085,
    lng: 140.4586226,
    address: '福島県福島市栄町',
    transfers: ['JR東北本線', 'JR奥羽本線（山形線）', '阿武隈急行線', '福島交通飯坂線'],
    platforms: { inbound: '11-12番線', outbound: '13-14番線' },
    stoppingTypes: ['hayabusa', 'yamabiko', 'tsubasa', 'limitedExp'],
    isMajor: true,
  },
  {
    id: 'TS-10',
    number: 10,
    name: '白石蔵王',
    nameKana: 'しろいしざおう',
    nameEn: 'Shiroishi-Zao',
    osmNodeId: 3908803393,
    lat: 37.9954595,
    lng: 140.6331018,
    address: '宮城県白石市大鷹沢三沢字桜坂',
    transfers: [],
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['yamabiko', 'limitedExp'],
    isMajor: false,
  },
  {
    id: 'TS-11',
    number: 11,
    name: '仙台',
    nameKana: 'せんだい',
    nameEn: 'Sendai',
    osmNodeId: 3570916501,
    lat: 38.2599010,
    lng: 140.8819631,
    address: '宮城県仙台市青葉区中央一丁目',
    transfers: ['JR東北本線', 'JR常磐線', 'JR仙山線', 'JR仙石線', 'JR仙石東北ライン', '仙台市地下鉄南北線', '仙台市地下鉄東西線'],
    platforms: { inbound: '11-12番線', outbound: '13-14番線' },
    stoppingTypes: ['hayabusa', 'hayate', 'yamabiko', 'komachi', 'limitedExp'],
    isMajor: true,
  },
  {
    id: 'TS-12',
    number: 12,
    name: '古川',
    nameKana: 'ふるかわ',
    nameEn: 'Furukawa',
    osmNodeId: null,
    lat: 38.5709060,
    lng: 140.9676823,
    address: '宮城県大崎市古川駅前大通一丁目',
    transfers: ['JR陸羽東線'],
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['hayabusa', 'yamabiko', 'limitedExp'],
    isMajor: false,
  },
  {
    id: 'TS-13',
    number: 13,
    name: 'くりこま高原',
    nameKana: 'くりこまこうげん',
    nameEn: 'Kurikoma-Kogen',
    osmNodeId: 265029907,
    lat: 38.7486773,
    lng: 141.0715579,
    address: '宮城県栗原市志波姫新熊谷',
    transfers: [],
    platforms: { inbound: '11番線', outbound: '12番線' },
    stoppingTypes: ['hayabusa', 'yamabiko', 'limitedExp'],
    isMajor: false,
  },
  {
    id: 'TS-14',
    number: 14,
    name: '一ノ関',
    nameKana: 'いちのせき',
    nameEn: 'Ichinoseki',
    osmNodeId: 6178313649,
    lat: 38.9265175,
    lng: 141.1390449,
    address: '岩手県一関市駅前',
    transfers: ['JR東北本線', 'JR大船渡線'],
    platforms: { inbound: '11-12番線', outbound: '12-13番線' },
    stoppingTypes: ['hayabusa', 'yamabiko', 'limitedExp'],
    isMajor: true,
  },
  {
    id: 'TS-15',
    number: 15,
    name: '水沢江刺',
    nameKana: 'みずさわえさし',
    nameEn: 'Mizusawa-Esashi',
    osmNodeId: 6297289285,
    lat: 39.1451477,
    lng: 141.1887983,
    address: '岩手県奥州市水沢羽田町駅前一丁目',
    transfers: [],
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['hayabusa', 'yamabiko', 'limitedExp'],
    isMajor: false,
  },
  {
    id: 'TS-16',
    number: 16,
    name: '北上',
    nameKana: 'きたかみ',
    nameEn: 'Kitakami',
    osmNodeId: 6297227471,
    lat: 39.2821173,
    lng: 141.1225883,
    address: '岩手県北上市大通り一丁目',
    transfers: ['JR東北本線', 'JR北上線'],
    platforms: { inbound: '11-12番線', outbound: '13番線' },
    stoppingTypes: ['hayabusa', 'yamabiko', 'limitedExp'],
    isMajor: true,
  },
  {
    id: 'TS-17',
    number: 17,
    name: '新花巻',
    nameKana: 'しんはなまき',
    nameEn: 'Shin-Hanamaki',
    osmNodeId: 6297227482,
    lat: 39.4065399,
    lng: 141.1737791,
    address: '岩手県花巻市矢沢第10地割',
    transfers: ['JR釜石線'],
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['hayabusa', 'yamabiko', 'limitedExp'],
    isMajor: false,
  },
  {
    id: 'TS-18',
    number: 18,
    name: '盛岡',
    nameKana: 'もりおか',
    nameEn: 'Morioka',
    osmNodeId: 6298572286,
    lat: 39.7014809,
    lng: 141.1365340,
    address: '岩手県盛岡市盛岡駅前通',
    transfers: ['JR東北本線', 'JR田沢湖線', 'JR山田線', 'IGRいわて銀河鉄道'],
    platforms: { inbound: '11-12番線', outbound: '13-14番線' },
    stoppingTypes: ['hayabusa', 'hayate', 'yamabiko', 'komachi', 'limitedExp'],
    isMajor: true,
  },
  {
    id: 'TS-19',
    number: 19,
    name: 'いわて沼宮内',
    nameKana: 'いわてぬまくない',
    nameEn: 'Iwate-Numakunai',
    osmNodeId: 6296974341,
    lat: 39.9606275,
    lng: 141.2175780,
    address: '岩手県岩手郡岩手町大字江刈内第7地割',
    transfers: ['IGRいわて銀河鉄道'],
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['hayabusa', 'hayate', 'limitedExp'],
    isMajor: false,
  },
  {
    id: 'TS-20',
    number: 20,
    name: '二戸',
    nameKana: 'にのへ',
    nameEn: 'Ninohe',
    osmNodeId: 6296971502,
    lat: 40.2601776,
    lng: 141.2857971,
    address: '岩手県二戸市石切所字枋ノ木',
    transfers: ['IGRいわて銀河鉄道'],
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['hayabusa', 'hayate', 'limitedExp'],
    isMajor: false,
  },
  {
    id: 'TS-21',
    number: 21,
    name: '八戸',
    nameKana: 'はちのへ',
    nameEn: 'Hachinohe',
    osmNodeId: 6286489606,
    lat: 40.5093497,
    lng: 141.4308810,
    address: '青森県八戸市大字尻内町字館田',
    transfers: ['JR八戸線', '青い森鉄道'],
    platforms: { inbound: '11-12番線', outbound: '13-14番線' },
    stoppingTypes: ['hayabusa', 'hayate', 'limitedExp'],
    isMajor: true,
  },
  {
    id: 'TS-22',
    number: 22,
    name: '七戸十和田',
    nameKana: 'しちのへとわだ',
    nameEn: 'Shichinohe-Towada',
    osmNodeId: 6296968644,
    lat: 40.7200329,
    lng: 141.1535161,
    address: '青森県上北郡七戸町字荒熊内',
    transfers: [],
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['hayabusa', 'hayate', 'limitedExp'],
    isMajor: false,
  },
  {
    id: 'TS-23',
    number: 23,
    name: '新青森',
    nameKana: 'しんあおもり',
    nameEn: 'Shin-Aomori',
    osmNodeId: 6296964413,
    lat: 40.8282586,
    lng: 140.6934466,
    address: '青森県青森市大字石江字高間',
    transfers: ['JR奥羽本線', '北海道新幹線'],
    platforms: { inbound: '11-14番線', outbound: '11-14番線' },
    stoppingTypes: ['hayabusa', 'hayate', 'limitedExp'],
    isMajor: true,
  },
];

// Snap stations to graph nodes
const resolvedStations = stationDefs.map(s => {
  if (s.osmNodeId && adj.has(s.osmNodeId)) {
    const node = nodeMap.get(s.osmNodeId);
    return {
      ...s,
      nodeId: s.osmNodeId,
      lat: Number(node.lat.toFixed(7)),
      lng: Number(node.lon.toFixed(7)),
    };
  }
  const nearest = findNearestInGraph(s.lat, s.lng);
  const node = nodeMap.get(nearest.id);
  console.log(`Snapped ${s.name} to node ${nearest.id} (distance: ${nearest.dist.toFixed(1)}m)`);
  return {
    ...s,
    nodeId: nearest.id,
    lat: Number(node.lat.toFixed(7)),
    lng: Number(node.lon.toFixed(7)),
  };
});

// Build segments
const trackSegments = [];

for (let i = 0; i < resolvedStations.length - 1; i++) {
  const fromSt = resolvedStations[i];
  const toSt = resolvedStations[i + 1];
  const pathNodeIds = dijkstraGeneric(nodeMap, adj, fromSt.nodeId, toSt.nodeId);
  if (!pathNodeIds) {
    throw new Error(`Failed to find path between ${fromSt.name} and ${toSt.name}`);
  }

  const rawCoords = pathNodeIds.map(nid => {
    const n = nodeMap.get(nid);
    return [Number(n.lat.toFixed(7)), Number(n.lon.toFixed(7))];
  });

  // Subdivide coordinates for smooth interpolation (< 150m)
  const coords = subdivideCoordinates(rawCoords, 150);

  // Guarantee exact match at endpoints
  coords[0] = [fromSt.lat, fromSt.lng];
  coords[coords.length - 1] = [toSt.lat, toSt.lng];

  trackSegments.push({
    fromStationId: fromSt.id,
    toStationId: toSt.id,
    fromName: fromSt.name,
    toName: toSt.name,
    coordinates: coords,
  });

  console.log(`Generated segment ${fromSt.id} -> ${toSt.id}: ${coords.length} points (${rawCoords.length} OSM nodes)`);
}

// Generate stations.ts content
const stationsTsContent = `import type { Station } from '../../../types';

export const TOHOKU_SHINKANSEN_STATIONS: Station[] = [
${resolvedStations.map(s => `  {
    id: '${s.id}',
    lineId: 'tohoku_shinkansen',
    number: ${s.number},
    name: '${s.name}',
    nameKana: '${s.nameKana}',
    nameEn: '${s.nameEn}',
    lat: ${s.lat},
    lng: ${s.lng},
    transfers: ${JSON.stringify(s.transfers)},
    address: '${s.address}',
    platforms: ${JSON.stringify(s.platforms)},
    stoppingTypes: ${JSON.stringify(s.stoppingTypes)},
    isMajor: ${s.isMajor},
    facilities: {
      elevator: true,
      restroom: true,
      multipurposeToilet: true,
      waitingRoom: true,
      ticketOffice: true,
    },
  },`).join('\n')}
];
`;

fs.writeFileSync('src/data/lines/tohoku_shinkansen/stations.ts', stationsTsContent, 'utf8');
console.log('Saved src/data/lines/tohoku_shinkansen/stations.ts');

// Generate trackGeometry.ts content
const trackGeometryTsContent = `import type { TrackSegment } from '../../../types';

export const TOHOKU_SHINKANSEN_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(trackSegments, null, 2)};
`;

fs.writeFileSync('src/data/lines/tohoku_shinkansen/trackGeometry.ts', trackGeometryTsContent, 'utf8');
console.log('Saved src/data/lines/tohoku_shinkansen/trackGeometry.ts');
