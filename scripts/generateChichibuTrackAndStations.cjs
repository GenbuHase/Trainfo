const fs = require('fs');
const path = require('path');

// 1. 駅メタデータ
const stationsMeta = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cache/chichibu_station_metadata.json'), 'utf8'));

// 2. OSM データ読み込み & 連続ノード復元
const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cache/osm_chichibu_raw.json'), 'utf8'));
const rel = raw.elements.find(e => e.type === 'relation' && e.id === 1926309);

const wayMap = new Map();
const nodeMap = new Map();
for (const e of raw.elements) {
  if (e.type === 'way') wayMap.set(e.id, e);
  if (e.type === 'node') nodeMap.set(e.id, [e.lat, e.lon]);
}

const ways = [];
for (const wm of rel.members.filter(m => m.type === 'way')) {
  const w = wayMap.get(wm.ref);
  if (!w || !w.nodes || w.nodes.length < 2) continue;
  ways.push(w);
}

const startNode = 1950896720; // 羽生
const endNode = 11816090344;   // 三峰口

const nodeToWays = new Map();
for (const w of ways) {
  const s = w.nodes[0];
  const e = w.nodes[w.nodes.length - 1];
  if (!nodeToWays.has(s)) nodeToWays.set(s, []);
  if (!nodeToWays.has(e)) nodeToWays.set(e, []);
  nodeToWays.get(s).push(w);
  nodeToWays.get(e).push(w);
}

const queue = [{ currentNode: startNode, pathWays: [], visitedWays: new Set() }];
let foundPath = null;

while (queue.length > 0) {
  const { currentNode, pathWays, visitedWays } = queue.shift();
  if (currentNode === endNode) {
    foundPath = pathWays;
    break;
  }

  const candidateWays = nodeToWays.get(currentNode) || [];
  for (const w of candidateWays) {
    if (visitedWays.has(w.id)) continue;

    const nextNode = w.nodes[0] === currentNode ? w.nodes[w.nodes.length - 1] : w.nodes[0];
    const newVisited = new Set(visitedWays);
    newVisited.add(w.id);

    queue.push({
      currentNode: nextNode,
      pathWays: [...pathWays, { way: w, forward: w.nodes[0] === currentNode }],
      visitedWays: newVisited,
    });
  }
}

if (!foundPath) {
  throw new Error('Failed to find continuous path for Chichibu Railway');
}

const continuousNodes = [];
for (let i = 0; i < foundPath.length; i++) {
  const { way, forward } = foundPath[i];
  const nodes = forward ? [...way.nodes] : [...way.nodes].reverse();
  if (i === 0) {
    continuousNodes.push(...nodes);
  } else {
    continuousNodes.push(...nodes.slice(1));
  }
}

function getDist(c1, c2) {
  const R = 6371000;
  const dLat = (c2[0] - c1[0]) * Math.PI / 180;
  const dLng = (c2[1] - c1[1]) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(c1[0] * Math.PI / 180) * Math.cos(c2[0] * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// 英語駅名マップ
const EN_NAMES = {
  '羽生': 'Hanyū',
  '西羽生': 'Nishi-Hanyū',
  '新郷': 'Shingō',
  '武州荒木': 'Bushū-Araki',
  '東行田': 'Higashi-Gyōda',
  '行田市': 'Gyōdashi',
  '持田': 'Mochida',
  'ソシオ流通センター': 'Socio Distribution Center',
  '熊谷': 'Kumagaya',
  '上熊谷': 'Kami-Kumagaya',
  '石原': 'Ishiwara',
  'ひろせ野鳥の森': 'Hirose-Yachō-no-Mori',
  '大麻生': 'Ōasō',
  '明戸': 'Aketo',
  '武川': 'Takekawa',
  '永田': 'Nagata',
  'ふかや花園': 'Fukaya-Hanazono',
  '小前田': 'Omaeda',
  '桜沢': 'Sakurazawa',
  '寄居': 'Yorii',
  '波久礼': 'Hagure',
  '樋口': 'Higuchi',
  '野上': 'Nogami',
  '長瀞': 'Nagatoro',
  '上長瀞': 'Kami-Nagatoro',
  '親鼻': 'Oyahana',
  '皆野': 'Minano',
  '和銅黒谷': 'Wadō-Kuroya',
  '大野原': 'Ōnohara',
  '秩父': 'Chichibu',
  '御花畑': 'Ohanabatake',
  '影森': 'Kagemori',
  '浦山口': 'Urayamaguchi',
  '武州中川': 'Bushū-Nakagawa',
  '武州日野': 'Bushū-Hino',
  '白久': 'Shiroku',
  '三峰口': 'Mitsumineguchi',
};

// 停車種別マップ
function getStoppingTypes(name) {
  if (['熊谷', 'ふかや花園', '寄居', '長瀞', '皆野', '秩父', '御花畑', '三峰口'].includes(name)) {
    return ['local', 'express', 'sl'];
  }
  if (['羽生', '行田市', '武川', '野上', '影森'].includes(name)) {
    return ['local', 'express'];
  }
  return ['local'];
}

// 主要駅フラグ
const MAJOR_STATIONS = ['羽生', '熊谷', '寄居', '長瀞', '秩父', '御花畑', '三峰口'];

// 乗換路線マップ
const TRANSFERS = {
  '羽生': ['東武伊勢崎線'],
  '熊谷': ['JR高崎線', '上越新幹線', '北陸新幹線'],
  '寄居': ['JR八高線', '東武東上線'],
  '御花畑': ['西武秩父線'],
};

// プラットフォーム番号定義
function getPlatforms(name) {
  if (name === '羽生') return { inbound: '4・5番線', outbound: '4・5番線' };
  if (name === '熊谷') return { inbound: '5・6番線', outbound: '5・6番線' };
  if (name === '寄居') return { inbound: '5・6番線', outbound: '5・6番線' };
  if (name === '御花畑') return { inbound: '1・2番線', outbound: '1・2番線' };
  if (name === '三峰口') return { inbound: '1・2・3番線', outbound: '1・2・3番線' };
  return { inbound: '1番線', outbound: '2番線' };
}

// 各駅をスナップして Station オブジェクトを構築
let searchStartIdx = 0;
const stations = stationsMeta.map((st) => {
  const origCoord = [st.lat, st.lng];
  let minDist = Infinity;
  let bestIdx = -1;

  for (let j = searchStartIdx; j < continuousNodes.length; j++) {
    const c = nodeMap.get(continuousNodes[j]);
    const d = getDist(origCoord, c);
    if (d < minDist) {
      minDist = d;
      bestIdx = j;
    }
  }

  // 単調増加を保証
  searchStartIdx = bestIdx;
  const snappedCoord = nodeMap.get(continuousNodes[bestIdx]);

  return {
    id: st.id,
    lineId: 'chichibu',
    number: st.number,
    name: st.name,
    nameKana: st.nameKana,
    nameEn: EN_NAMES[st.name] || st.name,
    lat: snappedCoord[0],
    lng: snappedCoord[1],
    transfers: TRANSFERS[st.name] || [],
    address: st.address,
    platforms: getPlatforms(st.name),
    stoppingTypes: getStoppingTypes(st.name),
    isMajor: MAJOR_STATIONS.includes(st.name),
    facilities: {
      elevator: ['羽生', '熊谷', '寄居', 'ふかや花園'].includes(st.name),
      restroom: true,
      multipurposeToilet: ['羽生', '熊谷', 'ふかや花園', '寄居', '長瀞', '秩父', '三峰口'].includes(st.name),
      waitingRoom: ['羽生', '熊谷', '寄居', '長瀞', '秩父', '御花畑', '三峰口'].includes(st.name),
      ticketOffice: true,
    },
    snappedIdx: bestIdx,
  };
});

// 各駅間の TrackSegment を生成
const trackSegments = [];
for (let i = 0; i < stations.length - 1; i++) {
  const fromSt = stations[i];
  const toSt = stations[i + 1];
  const sliceNodeIds = continuousNodes.slice(fromSt.snappedIdx, toSt.snappedIdx + 1);
  const coordinates = sliceNodeIds.map(nid => nodeMap.get(nid));

  trackSegments.push({
    fromStationId: fromSt.id,
    toStationId: toSt.id,
    fromName: fromSt.name,
    toName: toSt.name,
    coordinates,
  });
}

console.log(`Generated ${stations.length} stations and ${trackSegments.length} track segments.`);

// ファイル出力
const stationsTs = `// 秩父鉄道秩父本線 駅定義 (羽生 〜 三峰口 全37駅)
import type { Station } from '../../../types';

export const CHICHIBU_STATIONS: Station[] = ${JSON.stringify(stations.map(({ snappedIdx, ...s }) => s), null, 2)};
`;

const trackGeometryTs = `// 秩父鉄道秩父本線 線路幾何データ
import type { TrackSegment } from '../../../types';

export const CHICHIBU_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(trackSegments, null, 2)};
`;

const chichibuDir = path.resolve(__dirname, '../src/data/lines/chichibu');
if (!fs.existsSync(chichibuDir)) {
  fs.mkdirSync(chichibuDir, { recursive: true });
}

fs.writeFileSync(path.join(chichibuDir, 'stations.ts'), stationsTs, 'utf8');
fs.writeFileSync(path.join(chichibuDir, 'trackGeometry.ts'), trackGeometryTs, 'utf8');
console.log('Successfully wrote stations.ts and trackGeometry.ts for Chichibu Railway!');
