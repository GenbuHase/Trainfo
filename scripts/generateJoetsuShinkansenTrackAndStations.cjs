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

function smoothLocalAnomalies(coords) {
  if (coords.length < 3) return coords;
  const result = [coords[0]];
  for (let i = 1; i < coords.length - 1; i++) {
    const prev = coords[i - 1];
    const curr = coords[i];
    const next = coords[i + 1];

    const b1 = Math.atan2(curr[1] - prev[1], curr[0] - prev[0]);
    const b2 = Math.atan2(next[1] - curr[1], next[0] - curr[0]);
    let diff = Math.abs(b2 - b1) * 180 / Math.PI;
    if (diff > 180) diff = 360 - diff;

    // 前後間が短く、局所的に急激な折れ曲がり（> 40°）がある場合、前後点の内分点に寄せる
    if (diff > 40) {
      const smoothed = [
        Number(((prev[0] + next[0]) / 2).toFixed(7)),
        Number(((prev[1] + next[1]) / 2).toFixed(7)),
      ];
      result.push(smoothed);
    } else {
      result.push(curr);
    }
  }
  result.push(coords[coords.length - 1]);
  return result;
}

console.log('=== 上越新幹線 軌道ジオメトリ & 駅メタデータ生成 (高精度版) ===');

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
  // railway === 'rail' のみ（platform などのポリゴンを除外）
  .filter(w => w.tags?.railway === 'rail')
  .forEach(w => wayMap.set(w.id, w));

// 高崎駅中心ノード（Way 170648698 上）
const takasakiMidNodeId = 999999001;
const nSouth = nodeMap.get(1818077947);
const nNorth = nodeMap.get(1818078056);
const frac = (36.3223662 - nSouth.lat) / (nNorth.lat - nSouth.lat);
const takasakiLng = nSouth.lon + (nNorth.lon - nSouth.lon) * frac;
nodeMap.set(takasakiMidNodeId, {
  id: takasakiMidNodeId,
  lat: 36.3223662,
  lon: takasakiLng,
});

// 上毛高原駅中心ノード（Way 273801188 上）
const jomoMidNodeId = 999999002;
const jSouth = nodeMap.get(12691621998);
const jNorth = nodeMap.get(12691741602);
const jFrac = (36.6931647 - jSouth.lat) / (jNorth.lat - jSouth.lat);
const jomoLng = jSouth.lon + (jNorth.lon - jSouth.lon) * jFrac;
nodeMap.set(jomoMidNodeId, {
  id: jomoMidNodeId,
  lat: 36.6931647,
  lon: jomoLng,
});

// グラフ構築
const adj = new Map();
function addEdge(u, v, wDist) {
  if (!adj.has(u)) adj.set(u, []);
  if (!adj.has(v)) adj.set(v, []);
  adj.get(u).push({ to: v, dist: wDist });
  adj.get(v).push({ to: u, dist: wDist });
}

for (const w of wayMap.values()) {
  let nodes = [...w.nodes];
  if (w.id === 170648698) {
    nodes = [nodes[0], takasakiMidNodeId, nodes[1]];
  } else if (w.id === 273801188) {
    nodes = [nodes[0], jomoMidNodeId, nodes[1]];
  }

  for (let i = 0; i < nodes.length - 1; i++) {
    const u = nodes[i], v = nodes[i + 1];
    const n1 = nodeMap.get(u), n2 = nodeMap.get(v);
    if (!n1 || !n2) continue;
    const d = getDistanceMeters(n1.lat, n1.lon, n2.lat, n2.lon);
    let cost = d;
    if (w.tags?.service === 'crossover') cost += 500;
    addEdge(u, v, cost);
  }
}

// 大宮北口分岐 (1884989379 と 1884989381) の接続
addEdge(1884989379, 1884989381, 5.2);

// スムーズダイクストラ（有向状態探索・角度ペナルティ）
function dijkstraSmooth(start, goal) {
  if (start === goal) return [start];
  
  const dist = new Map();
  const parent = new Map();
  const pq = [];

  for (const edge of adj.get(start) || []) {
    const stateKey = `${edge.to}_${start}`;
    dist.set(stateKey, edge.dist);
    parent.set(stateKey, null);
    pq.push({ curr: edge.to, prev: start, d: edge.dist });
  }

  while (pq.length > 0) {
    let minIdx = 0;
    for (let i = 1; i < pq.length; i++) if (pq[i].d < pq[minIdx].d) minIdx = i;
    const { curr: u, prev: p, d: uDist } = pq.splice(minIdx, 1)[0];
    const currKey = `${u}_${p}`;
    if (uDist > (dist.get(currKey) ?? Infinity)) continue;

    if (u === goal) {
      const path = [u];
      let k = currKey;
      while (k) {
        const [c, pr] = k.split('_').map(Number);
        path.unshift(pr);
        k = parent.get(k);
      }
      return path;
    }

    const nP = nodeMap.get(p);
    const nU = nodeMap.get(u);
    const b1 = Math.atan2(nU.lon - nP.lon, nU.lat - nP.lat);

    for (const edge of adj.get(u) || []) {
      const v = edge.to;
      if (v === p) continue; // 直前ノードへのUターン即時禁止

      const nV = nodeMap.get(v);
      const b2 = Math.atan2(nV.lon - nU.lon, nV.lat - nU.lat);
      let diff = Math.abs(b2 - b1) * 180 / Math.PI;
      if (diff > 180) diff = 360 - diff;
      if (diff >= 90) continue; // 90°以上のヘアピンは通行不可

      let penalty = 0;
      if (diff > 45) penalty = 5000;
      else if (diff > 20) penalty = 100;

      const alt = uDist + edge.dist + penalty;
      const nextKey = `${v}_${u}`;
      if (!dist.has(nextKey) || alt < dist.get(nextKey)) {
        dist.set(nextKey, alt);
        parent.set(nextKey, currKey);
        pq.push({ curr: v, prev: u, d: alt });
      }
    }
  }

  return null;
}

const stationDefs = [
  {
    id: 'JOS-01',
    number: 1,
    name: '東京',
    nameKana: 'とうきょう',
    nameEn: 'Tokyo',
    osmNodeId: 3589537644,
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
    osmNodeId: 265036785,
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
    osmNodeId: 3635817053,
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
    osmNodeId: 4901062770,
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
    osmNodeId: 3979548120,
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
    osmNodeId: takasakiMidNodeId,
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
    osmNodeId: jomoMidNodeId,
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
    osmNodeId: 4042026108,
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
    osmNodeId: 9015341671,
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
    osmNodeId: 4358959893,
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
    osmNodeId: 6258051377,
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
    osmNodeId: 6045387350,
    address: '新潟県新潟市中央区花園一丁目1-1',
    transfers: ['JR信越本線', 'JR白新線', 'JR越後線'],
    platforms: { inbound: '11-14番線', outbound: '11-14番線' },
    stoppingTypes: ['toki', 'tanigawa', 'limitedExp'],
    isMajor: true,
  },
];

for (const st of stationDefs) {
  const node = nodeMap.get(st.osmNodeId);
  if (!node) {
    throw new Error(`Node not found for station: ${st.name} (id: ${st.osmNodeId})`);
  }
  st.lat = Number(node.lat.toFixed(7));
  st.lng = Number(node.lon.toFixed(7));
}

const trackSegments = [];

for (let i = 0; i < stationDefs.length - 1; i++) {
  const fromSt = stationDefs[i];
  const toSt = stationDefs[i + 1];
  const startNode = fromSt.osmNodeId;
  const goalNode = toSt.osmNodeId;

  const path = dijkstraSmooth(startNode, goalNode);
  if (!path) {
    throw new Error(`Path not found between ${fromSt.name} and ${toSt.name}!`);
  }

  let coords = path.map(id => {
    const n = nodeMap.get(id);
    return [Number(n.lat.toFixed(7)), Number(n.lon.toFixed(7))];
  });

  coords = smoothLocalAnomalies(coords);
  coords = smoothLocalAnomalies(coords);
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
  stationDefs.map(s => {
    const { osmNodeId, ...rest } = s;
    return {
      id: rest.id,
      lineId: 'joetsu_shinkansen',
      number: rest.number,
      name: rest.name,
      nameKana: rest.nameKana,
      nameEn: rest.nameEn,
      lat: rest.lat,
      lng: rest.lng,
      transfers: rest.transfers,
      address: rest.address,
      platforms: rest.platforms,
      stoppingTypes: rest.stoppingTypes,
      isMajor: rest.isMajor,
      facilities: {
        elevator: true,
        restroom: true,
        multipurposeToilet: true,
        waitingRoom: true,
        ticketOffice: true,
      },
    };
  }),
  null,
  2
)};
`;

fs.writeFileSync('src/data/lines/joetsu_shinkansen/stations.ts', stationsTsContent, 'utf8');
console.log('✅ src/data/lines/joetsu_shinkansen/stations.ts updated!');

// 2. trackGeometry.ts の生成
const trackGeometryTsContent = `import type { TrackSegment } from '../../../types';

export const JOETSU_SHINKANSEN_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(
  trackSegments,
  null,
  2
)};
`;

fs.writeFileSync('src/data/lines/joetsu_shinkansen/trackGeometry.ts', trackGeometryTsContent, 'utf8');
console.log('✅ src/data/lines/joetsu_shinkansen/trackGeometry.ts updated!');
