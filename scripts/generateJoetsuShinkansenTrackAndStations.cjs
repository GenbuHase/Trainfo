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

console.log('=== 上越新幹線 軌道ジオメトリ & 駅メタデータ生成 ===');

const rawTohokuDown = JSON.parse(fs.readFileSync('scripts/cache/osm_tohoku_shinkansen_down.json', 'utf8'));
const rawTohokuUp = JSON.parse(fs.readFileSync('scripts/cache/osm_tohoku_shinkansen_up.json', 'utf8'));
const rawJoetsu = JSON.parse(fs.readFileSync('scripts/cache/osm_joetsu_shinkansen_raw.json', 'utf8'));

const nodeMap = new Map();
[...rawTohokuDown.elements, ...rawTohokuUp.elements, ...rawJoetsu.elements]
  .filter(el => el.type === 'node')
  .forEach(n => nodeMap.set(n.id, n));

const wayMap = new Map();
[...rawTohokuDown.elements, ...rawTohokuUp.elements, ...rawJoetsu.elements]
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
    id: 'JOS-01',
    number: 1,
    name: '東京',
    nameKana: 'とうきょう',
    nameEn: 'Tokyo',
    osmNodeId: 3589537644,
    lat: 35.6810367,
    lng: 139.7674402,
    address: '東京都千代田区丸の内一丁目',
    transfers: ['JR東北新幹線', 'JR山手線', 'JR京浜東北線', 'JR東海道線', 'JR中央線', 'JR総武快速線', 'JR横須賀線', 'JR京葉線', 'JR上野東京ライン', '東海道新幹線', '東京メトロ丸ノ内線'],
    platforms: { inbound: '20-23番線', outbound: '20-23番線' },
    stoppingTypes: ['toki', 'tanigawa', 'limitedExp'],
    isMajor: true,
  },
  {
    id: 'JOS-02',
    number: 2,
    name: '上野',
    nameKana: 'うえの',
    nameEn: 'Ueno',
    osmNodeId: 1916325983,
    lat: 35.7139942,
    lng: 139.7773229,
    address: '東京都台東区上野七丁目',
    transfers: ['JR東北新幹線', 'JR山手線', 'JR京浜東北線', 'JR宇都宮線', 'JR高崎線', 'JR常磐線', 'JR上野東京ライン', '東京メトロ銀座線', '東京メトロ日比谷線', '京成本線'],
    platforms: { inbound: '19-22番線', outbound: '19-22番線' },
    stoppingTypes: ['toki', 'tanigawa', 'limitedExp'],
    isMajor: true,
  },
  {
    id: 'JOS-03',
    number: 3,
    name: '大宮',
    nameKana: 'おおみや',
    nameEn: 'Omiya',
    osmNodeId: 264211352,
    lat: 35.906295,
    lng: 139.623977,
    address: '埼玉県さいたま市大宮区錦町',
    transfers: ['JR東北新幹線', 'JR埼京線', 'JR川越線', 'JR京浜東北線', 'JR宇都宮線', 'JR高崎線', 'JR湘南新宿ライン', 'JR上野東京ライン', '東武野田線', '埼玉新都市交通伊奈線'],
    platforms: { inbound: '13-18番線', outbound: '13-18番線' },
    stoppingTypes: ['toki', 'tanigawa', 'limitedExp'],
    isMajor: true,
  },
  {
    id: 'JOS-04',
    number: 4,
    name: '熊谷',
    nameKana: 'くまがや',
    nameEn: 'Kumagaya',
    osmNodeId: 7900236531,
    lat: 36.1393531,
    lng: 139.3904087,
    address: '埼玉県熊谷市桜木町一丁目202-1',
    transfers: ['JR高崎線', 'JR湘南新宿ライン', 'JR上野東京ライン', '秩父鉄道秩父本線'],
    platforms: { inbound: '11・12番線', outbound: '11・12番線' },
    stoppingTypes: ['toki', 'tanigawa', 'limitedExp'],
    isMajor: true,
  },
  {
    id: 'JOS-05',
    number: 5,
    name: '本庄早稲田',
    nameKana: 'ほんじょうわせだ',
    nameEn: 'Honjo-Waseda',
    osmNodeId: 6677954148,
    lat: 36.2188607,
    lng: 139.1794855,
    address: '埼玉県本庄市早稲田の杜一丁目1-1',
    transfers: [],
    platforms: { inbound: '2番線', outbound: '1番線' },
    stoppingTypes: ['toki', 'tanigawa', 'limitedExp'],
    isMajor: false,
  },
  {
    id: 'JOS-06',
    number: 6,
    name: '高崎',
    nameKana: 'たかさき',
    nameEn: 'Takasaki',
    osmNodeId: 3402288118,
    lat: 36.3223662,
    lng: 139.0125458,
    address: '群馬県高崎市八島町222',
    transfers: ['JR北陸新幹線', 'JR高崎線', 'JR上越線', 'JR信越本線', 'JR八高線', 'JR両毛線', 'JR吾妻線', '上信電鉄上信線'],
    platforms: { inbound: '13・14番線', outbound: '11・12番線' },
    stoppingTypes: ['toki', 'tanigawa', 'limitedExp'],
    isMajor: true,
  },
  {
    id: 'JOS-07',
    number: 7,
    name: '上毛高原',
    nameKana: 'じょうもうこうげん',
    nameEn: 'Jomo-Kogen',
    osmNodeId: 3032951488,
    lat: 36.6931647,
    lng: 138.9775973,
    address: '群馬県利根郡みなかみ町月夜野1756',
    transfers: [],
    platforms: { inbound: '2番線', outbound: '1番線' },
    stoppingTypes: ['toki', 'tanigawa', 'limitedExp'],
    isMajor: false,
  },
  {
    id: 'JOS-08',
    number: 8,
    name: '越後湯沢',
    nameKana: 'えちごゆざわ',
    nameEn: 'Echigo-Yuzawa',
    osmNodeId: 3548915150,
    lat: 36.9358784,
    lng: 138.8094233,
    address: '新潟県南魚沼郡湯沢町大字湯沢主水2427-1',
    transfers: ['JR上越線', '北越急行ほくほく線'],
    platforms: { inbound: '13・14番線', outbound: '11・12番線' },
    stoppingTypes: ['toki', 'tanigawa', 'limitedExp'],
    isMajor: true,
  },
  {
    id: 'JOS-09',
    number: 9,
    name: '浦佐',
    nameKana: 'うらさ',
    nameEn: 'Urasa',
    osmNodeId: 3548915157,
    lat: 37.1672238,
    lng: 138.9228409,
    address: '新潟県南魚沼市浦佐719-2',
    transfers: ['JR上越線'],
    platforms: { inbound: '2番線', outbound: '1番線' },
    stoppingTypes: ['toki', 'tanigawa', 'limitedExp'],
    isMajor: false,
  },
  {
    id: 'JOS-10',
    number: 10,
    name: '長岡',
    nameKana: 'ながおか',
    nameEn: 'Nagaoka',
    osmNodeId: 4358959804,
    lat: 37.447808,
    lng: 138.8540646,
    address: '新潟県長岡市城内町二丁目794-4',
    transfers: ['JR信越本線', 'JR上越線'],
    platforms: { inbound: '12番線', outbound: '11番線' },
    stoppingTypes: ['toki', 'tanigawa', 'limitedExp'],
    isMajor: true,
  },
  {
    id: 'JOS-11',
    number: 11,
    name: '燕三条',
    nameKana: 'つばめさんじょう',
    nameEn: 'Tsubamesanjo',
    osmNodeId: 9015341705,
    lat: 37.6483698,
    lng: 138.9390886,
    address: '新潟県三条市下須頃497',
    transfers: ['JR弥彦線'],
    platforms: { inbound: '12番線', outbound: '11番線' },
    stoppingTypes: ['toki', 'tanigawa', 'limitedExp'],
    isMajor: false,
  },
  {
    id: 'JOS-12',
    number: 12,
    name: '新潟',
    nameKana: 'にいがた',
    nameEn: 'Niigata',
    osmNodeId: 4087367885,
    lat: 37.9122444,
    lng: 139.0613294,
    address: '新潟県新潟市中央区花園一丁目1-1',
    transfers: ['JR信越本線', 'JR白新線', 'JR越後線'],
    platforms: { inbound: '11-14番線', outbound: '11-14番線' },
    stoppingTypes: ['toki', 'tanigawa', 'limitedExp'],
    isMajor: true,
  },
];

const snappedStationNodes = [];
for (const st of stationDefs) {
  let targetId = st.osmNodeId;
  if (!nodeMap.has(targetId) || !adj.has(targetId)) {
    const snap = findNearestInGraph(st.lat, st.lng);
    targetId = snap.id;
  }
  snappedStationNodes.push(targetId);
  const node = nodeMap.get(targetId);
  st.lat = Number(node.lat.toFixed(7));
  st.lng = Number(node.lon.toFixed(7));
}

const trackSegments = [];

for (let i = 0; i < stationDefs.length - 1; i++) {
  const fromSt = stationDefs[i];
  const toSt = stationDefs[i + 1];
  const startNode = snappedStationNodes[i];
  const goalNode = snappedStationNodes[i + 1];

  const path = dijkstraGeneric(nodeMap, adj, startNode, goalNode);
  if (!path) {
    throw new Error(`Path not found between ${fromSt.name} and ${toSt.name}!`);
  }

  let coords = path.map(id => {
    const n = nodeMap.get(id);
    return [Number(n.lat.toFixed(7)), Number(n.lon.toFixed(7))];
  });

  coords = subdivideCoordinates(coords, 150);

  // 端点を駅座標に完全にスナップ
  coords[0] = [fromSt.lat, fromSt.lng];
  coords[coords.length - 1] = [toSt.lat, toSt.lng];

  trackSegments.push({
    fromStationId: fromSt.id,
    toStationId: toSt.id,
    fromName: fromSt.name,
    toName: toSt.name,
    coordinates: coords,
  });

  console.log(`  [Segment ${i + 1}/${stationDefs.length - 1}] ${fromSt.name} -> ${toSt.name}: ${coords.length} points`);
}

// 1. stations.ts の生成
const stationsTsContent = `import type { Station } from '../../../types';

export const JOETSU_SHINKANSEN_STATIONS: Station[] = ${JSON.stringify(
  stationDefs.map(s => ({
    id: s.id,
    lineId: 'joetsu_shinkansen',
    number: s.number,
    name: s.name,
    nameKana: s.nameKana,
    nameEn: s.nameEn,
    lat: s.lat,
    lng: s.lng,
    transfers: s.transfers,
    address: s.address,
    platforms: s.platforms,
    stoppingTypes: s.stoppingTypes,
    isMajor: s.isMajor,
    facilities: {
      elevator: true,
      restroom: true,
      multipurposeToilet: true,
      waitingRoom: true,
      ticketOffice: true,
    },
  })),
  null,
  2
)};
`;

fs.writeFileSync('src/data/lines/joetsu_shinkansen/stations.ts', stationsTsContent, 'utf8');
console.log('✅ Generated src/data/lines/joetsu_shinkansen/stations.ts');

// 2. trackGeometry.ts の生成
const trackGeometryTsContent = `import type { TrackSegment } from '../../../types';

export const JOETSU_SHINKANSEN_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(
  trackSegments,
  null,
  2
)};
`;

fs.writeFileSync('src/data/lines/joetsu_shinkansen/trackGeometry.ts', trackGeometryTsContent, 'utf8');
console.log('✅ Generated src/data/lines/joetsu_shinkansen/trackGeometry.ts');
