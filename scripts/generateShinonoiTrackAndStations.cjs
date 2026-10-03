const fs = require('fs');
const path = require('path');

// 1. データ読み込み
const relData = JSON.parse(fs.readFileSync('scripts/cache/osm_shinonoi_rel_full.json', 'utf8'));
const shinanoData = JSON.parse(fs.readFileSync('scripts/cache/osm_shinano_rel_full.json', 'utf8'));
const missingWays = JSON.parse(fs.readFileSync('scripts/cache/missing_ways.json', 'utf8'));

const nodesMap = new Map();
function registerElements(elements) {
  for (const el of elements || []) {
    if (el.type === 'node') {
      nodesMap.set(el.id, [el.lat, el.lon]);
    }
  }
}
registerElements(relData.elements);
registerElements(shinanoData.elements);
registerElements(missingWays.w1.elements);
registerElements(missingWays.w2.elements);

const waysMap = new Map();
function registerWays(elements) {
  for (const el of elements || []) {
    if (el.type === 'way') {
      waysMap.set(el.id, el);
    }
  }
}
registerWays(relData.elements);
registerWays(shinanoData.elements);
registerWays(missingWays.w1.elements);
registerWays(missingWays.w2.elements);

// 2. 篠ノ井線（塩尻〜篠ノ井）のメンバーウェイ順序を整正
// Relation 1926390 のウェイリスト
const rel1926390 = relData.elements.find(e => e.type === 'relation' && e.id === 1926390);
const memberWayIds = rel1926390.members.filter(m => m.type === 'way').map(m => m.ref);

// 不足way(1378971484, 1378971485)を way 154811576 と way 855202961 の間に挿入
// そして 姥捨駅付近の 1236012739, 1236905774, 1236905773 の順序を 1236905773, 1236905774, 1236012739 に修正
const correctedWayIds = [];
for (const wid of memberWayIds) {
  if (wid === 154811576) {
    correctedWayIds.push(wid);
    correctedWayIds.push(1378971484);
    correctedWayIds.push(1378971485);
  } else if (wid === 1236012739) {
    // スキップして後で正しい順序で追加
  } else if (wid === 1236905774) {
    // スキップ
  } else if (wid === 1236905773) {
    correctedWayIds.push(1236905773);
    correctedWayIds.push(1236905774);
    correctedWayIds.push(1236012739);
  } else {
    correctedWayIds.push(wid);
  }
}

// 3. 信越本線（篠ノ井〜長野）のウェイを Relation 1983032 から追加
const relShinano = shinanoData.elements.find(e => e.type === 'relation' && e.id === 1983032);
const shinanoWayIds = relShinano.members.filter(m => m.type === 'way').map(m => m.ref);
// 篠ノ井駅(way 403550577 または node 8010403204)以降のウェイ
let shinonoiFound = false;
const shinetsuWayIds = [];
for (const wid of shinanoWayIds) {
  const w = waysMap.get(wid);
  if (!w) continue;
  if (shinonoiFound) {
    shinetsuWayIds.push(wid);
  } else if (w.nodes.includes(8010403204) || wid === 403550577) {
    shinonoiFound = true;
  }
}

console.log(`Corrected Shinonoi ways: ${correctedWayIds.length}`);
console.log(`Shinetsu (Shinonoi -> Nagano) ways: ${shinetsuWayIds.length}`);

const allWayIds = [...correctedWayIds, ...shinetsuWayIds];

function dist(p1, p2) {
  const dlat = (p1[0] - p2[0]) * 111000;
  const dlng = (p1[1] - p2[1]) * 89000;
  return Math.sqrt(dlat * dlat + dlng * dlng);
}

// 4. 全ポリラインを組み立て
const fullPolyline = [];
for (let i = 0; i < allWayIds.length; i++) {
  const wid = allWayIds[i];
  const way = waysMap.get(wid);
  if (!way) continue;
  let wayCoords = way.nodes.map(nid => nodesMap.get(nid)).filter(Boolean);
  if (wayCoords.length === 0) continue;

  if (fullPolyline.length === 0) {
    fullPolyline.push(...wayCoords);
  } else {
    const lastPt = fullPolyline[fullPolyline.length - 1];
    const dStart = dist(lastPt, wayCoords[0]);
    const dEnd = dist(lastPt, wayCoords[wayCoords.length - 1]);

    if (dEnd < dStart) {
      wayCoords.reverse();
    }

    const currentDist = dist(lastPt, wayCoords[0]);
    if (currentDist > 50) {
      console.warn(`[Jump detected] at idx ${i} (Way ${wid}): dist = ${Math.round(currentDist)}m between [${lastPt}] and [${wayCoords[0]}]`);
    }

    if (currentDist < 1) {
      fullPolyline.push(...wayCoords.slice(1));
    } else {
      fullPolyline.push(...wayCoords);
    }
  }
}

console.log(`Full polyline points: ${fullPolyline.length}`);
console.log('Start point (Shiojiri):', fullPolyline[0]);
console.log('End point (Nagano):', fullPolyline[fullPolyline.length - 1]);

// 5. 駅定義（全19駅）
const STATION_DEFS = [
  {
    id: 'SN-01',
    number: 1,
    name: '塩尻',
    nameKana: 'しおじり',
    nameEn: 'Shiojiri',
    transfers: ['JR中央本線', 'JR中央本線(辰野支線)'],
    address: '長野県塩尻市大門八番町',
    platforms: { inbound: '1・3・4番線', outbound: '1・3・4番線' },
    stoppingTypes: ['regular', 'rapid', 'limitedExp'],
    lat: 36.1144795,
    lng: 137.9475995,
    isMajor: true,
  },
  {
    id: 'SN-02',
    number: 2,
    name: '広丘',
    nameKana: 'ひろおか',
    nameEn: 'Hirooka',
    transfers: [],
    address: '長野県塩尻市大字広丘野村',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['regular', 'rapid'],
    lat: 36.1481427,
    lng: 137.9495233,
  },
  {
    id: 'SN-03',
    number: 3,
    name: '村井',
    nameKana: 'むらい',
    nameEn: 'Murai',
    transfers: [],
    address: '長野県松本市村井町南一丁目',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['regular', 'rapid'],
    lat: 36.1751227,
    lng: 137.956424,
  },
  {
    id: 'SN-04',
    number: 4,
    name: '平田',
    nameKana: 'ひらた',
    nameEn: 'Hirata',
    transfers: [],
    address: '長野県松本市平田西二丁目',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['regular'],
    lat: 36.1915589,
    lng: 137.9624967,
  },
  {
    id: 'SN-05',
    number: 5,
    name: '南松本',
    nameKana: 'みなみまつもと',
    nameEn: 'Minami-Matsumoto',
    transfers: [],
    address: '長野県松本市出川町',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['regular', 'rapid'],
    lat: 36.2097454,
    lng: 137.9692029,
  },
  {
    id: 'SN-06',
    number: 6,
    name: '松本',
    nameKana: 'まつもと',
    nameEn: 'Matsumoto',
    transfers: ['JR大糸線', 'アルピコ交通上高地線'],
    address: '長野県松本市深志一丁目',
    platforms: { inbound: '1〜5番線', outbound: '1〜5番線' },
    stoppingTypes: ['regular', 'rapid', 'limitedExp'],
    lat: 36.230739,
    lng: 137.9643862,
    isMajor: true,
  },
  {
    id: 'SN-07',
    number: 7,
    name: '田沢',
    nameKana: 'たざわ',
    nameEn: 'Tazawa',
    transfers: [],
    address: '長野県安曇野市豊科田沢',
    platforms: { inbound: '1番線', outbound: '2・3番線' },
    stoppingTypes: ['regular', 'rapid'],
    lat: 36.300706,
    lng: 137.9412254,
  },
  {
    id: 'SN-08',
    number: 8,
    name: '明科',
    nameKana: 'あかしな',
    nameEn: 'Akashina',
    transfers: [],
    address: '長野県安曇野市明科中川手',
    platforms: { inbound: '1番線', outbound: '2・3番線' },
    stoppingTypes: ['regular', 'rapid', 'limitedExp'],
    lat: 36.3543382,
    lng: 137.9304795,
    isMajor: true,
  },
  {
    id: 'SN-09',
    number: 9,
    name: '西条',
    nameKana: 'にしじょう',
    nameEn: 'Nishijo',
    transfers: [],
    address: '長野県東筑摩郡筑北村西条',
    platforms: { inbound: '1番線', outbound: '2・3番線' },
    stoppingTypes: ['regular', 'rapid'],
    lat: 36.4002534,
    lng: 138.0121207,
  },
  {
    id: 'SN-10',
    number: 10,
    name: '坂北',
    nameKana: 'さかきた',
    nameEn: 'Sakakita',
    transfers: [],
    address: '長野県東筑摩郡筑北村坂北',
    platforms: { inbound: '1番線', outbound: '2・3番線' },
    stoppingTypes: ['regular', 'rapid'],
    lat: 36.4312176,
    lng: 138.016421,
  },
  {
    id: 'SN-11',
    number: 11,
    name: '聖高原',
    nameKana: 'ひじりこうげん',
    nameEn: 'Hijiri-Kogen',
    transfers: [],
    address: '長野県東筑摩郡麻績村麻',
    platforms: { inbound: '1番線', outbound: '2・3番線' },
    stoppingTypes: ['regular', 'rapid', 'limitedExp'],
    lat: 36.4550568,
    lng: 138.0471691,
    isMajor: true,
  },
  {
    id: 'SN-12',
    number: 12,
    name: '冠着',
    nameKana: 'かむりき',
    nameEn: 'Kamuriki',
    transfers: [],
    address: '長野県千曲市大字羽生日向',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['regular', 'rapid'],
    lat: 36.4573387,
    lng: 138.0793811,
  },
  {
    id: 'SN-13',
    number: 13,
    name: '姨捨',
    nameKana: 'おばすて',
    nameEn: 'Obasute',
    transfers: [],
    address: '長野県千曲市大字八幡姨捨',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['regular', 'rapid'],
    lat: 36.502817,
    lng: 138.093209,
    isMajor: true,
  },
  {
    id: 'SN-14',
    number: 14,
    name: '稲荷山',
    nameKana: 'いなりやま',
    nameEn: 'Inariyama',
    transfers: [],
    address: '長野県千曲市大字稲荷山',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['regular', 'rapid'],
    lat: 36.5527281,
    lng: 138.1080097,
  },
  {
    id: 'SN-15',
    number: 15,
    name: '篠ノ井',
    nameKana: 'しののい',
    nameEn: 'Shinonoi',
    transfers: ['しなの鉄道線'],
    address: '長野県長野市篠ノ井布施高田',
    platforms: { inbound: '1・2・3番線', outbound: '1・2・3番線' },
    stoppingTypes: ['regular', 'rapid', 'limitedExp'],
    lat: 36.5774379,
    lng: 138.1380209,
    isMajor: true,
  },
  {
    id: 'SN-16',
    number: 16,
    name: '今井',
    nameKana: 'いまい',
    nameEn: 'Imai',
    transfers: [],
    address: '長野県長野市川中島町今井',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['regular'],
    lat: 36.5950297,
    lng: 138.1451062,
  },
  {
    id: 'SN-17',
    number: 17,
    name: '川中島',
    nameKana: 'かわなかじま',
    nameEn: 'Kawanakajima',
    transfers: [],
    address: '長野県長野市川中島町上氷鉋',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['regular', 'rapid'],
    lat: 36.6141007,
    lng: 138.1507012,
  },
  {
    id: 'SN-18',
    number: 18,
    name: '安茂里',
    nameKana: 'あもり',
    nameEn: 'Amori',
    transfers: [],
    address: '長野県長野市安茂里小市',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['regular'],
    lat: 36.6302229,
    lng: 138.1618403,
  },
  {
    id: 'SN-19',
    number: 19,
    name: '長野',
    nameKana: 'ながの',
    nameEn: 'Nagano',
    transfers: ['JR北陸新幹線', 'しなの鉄道北しなの線', '長野電鉄長野線'],
    address: '長野県長野市大字栗田',
    platforms: { inbound: '2〜7番線', outbound: '2〜7番線' },
    stoppingTypes: ['regular', 'rapid', 'limitedExp'],
    lat: 36.643211,
    lng: 138.1884854,
    isMajor: true,
  },
];

// 6. 各駅をポリライン上にスナップしてセグメント分割
function snapStationToPolyline(stationPt, polyline) {
  let bestIdx = -1;
  let bestDist = Infinity;
  for (let i = 0; i < polyline.length; i++) {
    const d = dist(stationPt, polyline[i]);
    if (d < bestDist) {
      bestDist = d;
      bestIdx = i;
    }
  }
  return { index: bestIdx, distance: bestDist };
}

const stationSnaps = STATION_DEFS.map(st => {
  const snap = snapStationToPolyline([st.lat, st.lng], fullPolyline);
  return { ...st, snapIndex: snap.index, snapDist: snap.distance };
});

console.log('\n--- Station Snapping Verification ---');
let lastIdx = -1;
for (const st of stationSnaps) {
  const dStr = Math.round(st.snapDist) + 'm';
  const orderOk = st.snapIndex >= lastIdx;
  console.log(`  ${st.id} ${st.name}: polyline index ${st.snapIndex}, dist: ${dStr} ${orderOk ? '✓' : '❌ ORDER ERROR'}`);
  lastIdx = st.snapIndex;
}

// 7. TrackSegments の生成
const trackSegments = [];
for (let i = 0; i < stationSnaps.length - 1; i++) {
  const fromSt = stationSnaps[i];
  const toSt = stationSnaps[i + 1];

  let segCoords = fullPolyline.slice(fromSt.snapIndex, toSt.snapIndex + 1);
  if (segCoords.length < 2) {
    segCoords = [[fromSt.lat, fromSt.lng], [toSt.lat, toSt.lng]];
  }

  // 始端と終端を駅座標に厳密に合わせる
  segCoords[0] = [fromSt.lat, fromSt.lng];
  segCoords[segCoords.length - 1] = [toSt.lat, toSt.lng];

  trackSegments.push({
    fromStationId: fromSt.id,
    toStationId: toSt.id,
    fromName: fromSt.name,
    toName: toSt.name,
    coordinates: segCoords,
  });
}

console.log(`\nGenerated ${trackSegments.length} track segments.`);

// 8. ファイル出力
// 8.1 stations.ts
const stationsCode = `// JR篠ノ井線 駅メタデータ定義 (塩尻 〜 松本 〜 長野 全19駅)
import type { Station } from '../../../types';

export const SHINONOI_STATIONS: Station[] = ${JSON.stringify(
  STATION_DEFS.map(s => ({
    id: s.id,
    number: s.number,
    name: s.name,
    nameKana: s.nameKana,
    nameEn: s.nameEn,
    transfers: s.transfers,
    address: s.address,
    platforms: s.platforms,
    stoppingTypes: s.stoppingTypes,
    lineId: 'shinonoi',
    lat: s.lat,
    lng: s.lng,
    isMajor: s.isMajor || false,
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

fs.mkdirSync('src/data/lines/shinonoi', { recursive: true });
fs.writeFileSync('src/data/lines/shinonoi/stations.ts', stationsCode);
console.log('Saved src/data/lines/shinonoi/stations.ts');

// 8.2 trackGeometry.ts
const geometryCode = `// JR篠ノ井線 軌道ジオメトリデータ (OSM Relation 1926390 / 1983032 高精度スナップ連結)
import type { TrackSegment } from '../../../types';

export const SHINONOI_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(trackSegments, null, 2)};
`;
fs.writeFileSync('src/data/lines/shinonoi/trackGeometry.ts', geometryCode);
console.log('Saved src/data/lines/shinonoi/trackGeometry.ts');
