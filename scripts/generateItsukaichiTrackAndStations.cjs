const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cache/osm_itsukaichi_raw.json'), 'utf8'));

const nodeMap = new Map();
const wayMap = new Map();
for (const e of data.elements) {
  if (e.type === 'node') nodeMap.set(e.id, [e.lat, e.lon]);
  if (e.type === 'way') wayMap.set(e.id, e);
}

const rel = data.elements.find(e => e.type === 'relation' && e.id === 1984869);
const wayMembers = rel.members.filter(m => m.type === 'way');

// 連続ノードの構築
const continuousNodeIds = [];
for (let i = 0; i < wayMembers.length; i++) {
  const w = wayMap.get(wayMembers[i].ref);
  const nodes = [...w.nodes];
  if (i === 0) {
    continuousNodeIds.push(...nodes);
  } else {
    const lastNode = continuousNodeIds[continuousNodeIds.length - 1];
    if (nodes[0] === lastNode) {
      continuousNodeIds.push(...nodes.slice(1));
    } else if (nodes[nodes.length - 1] === lastNode) {
      continuousNodeIds.push(...nodes.reverse().slice(1));
    }
  }
}

function getDistance(c1, c2) {
  const R = 6371000;
  const dLat = (c2[0] - c1[0]) * Math.PI / 180;
  const dLng = (c2[1] - c1[1]) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(c1[0] * Math.PI / 180) * Math.cos(c2[0] * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// 7駅の定義マスタ
const stationMetadata = [
  {
    id: 'JC-55', number: 1, name: '拝島', nameKana: 'はいじま', nameEn: 'Haijima',
    stopNodeId: 4351266469,
    transfers: ['JR青梅線', 'JR八高線', '西武拝島線'],
    address: '東京都昭島市松原町四丁目14-4',
    platforms: { inbound: '1番線', outbound: '1番線' },
    isMajor: true,
    stoppingTypes: ['local', 'regular', 'rapid', 'special_rapid', 'commuter_special_rapid'],
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
  {
    id: 'JC-81', number: 2, name: '熊川', nameKana: 'くまがわ', nameEn: 'Kumagawa',
    stopNodeId: 1475624198,
    transfers: [],
    address: '東京都福生市大字熊川1407',
    platforms: { inbound: '1番線', outbound: '1番線' },
    isMajor: false,
    stoppingTypes: ['local', 'regular', 'rapid', 'special_rapid', 'commuter_special_rapid'],
    facilities: { elevator: false, restroom: true, multipurposeToilet: false, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JC-82', number: 3, name: '東秋留', nameKana: 'ひがしあきる', nameEn: 'Higashi-Akiru',
    stopNodeId: 5100511183,
    transfers: [],
    address: '東京都あきる野市二宮1144',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: false,
    stoppingTypes: ['local', 'regular', 'rapid', 'special_rapid', 'commuter_special_rapid'],
    facilities: { elevator: false, restroom: true, multipurposeToilet: false, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JC-83', number: 4, name: '秋川', nameKana: 'あきがわ', nameEn: 'Akigawa',
    stopNodeId: 5100514167,
    transfers: [],
    address: '東京都あきる野市油平130',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: true,
    stoppingTypes: ['local', 'regular', 'rapid', 'special_rapid', 'commuter_special_rapid'],
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'JC-84', number: 5, name: '武蔵引田', nameKana: 'むさしひきた', nameEn: 'Musashi-Hikida',
    stopNodeId: 1475624197,
    transfers: [],
    address: '東京都あきる野市引田505',
    platforms: { inbound: '1番線', outbound: '1番線' },
    isMajor: false,
    stoppingTypes: ['local', 'regular', 'rapid', 'special_rapid', 'commuter_special_rapid'],
    facilities: { elevator: false, restroom: true, multipurposeToilet: false, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JC-85', number: 6, name: '武蔵増戸', nameKana: 'むさしますど', nameEn: 'Musashi-Masuko',
    stopNodeId: 1475624196,
    transfers: [],
    address: '東京都あきる野市伊奈436',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: false,
    stoppingTypes: ['local', 'regular', 'rapid', 'special_rapid', 'commuter_special_rapid'],
    facilities: { elevator: false, restroom: true, multipurposeToilet: false, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JC-86', number: 7, name: '武蔵五日市', nameKana: 'むさしいつかいち', nameEn: 'Musashi-Itsukaichi',
    stopNodeId: 2458472220,
    transfers: [],
    address: '東京都あきる野市舘谷223',
    platforms: { inbound: '1・2番線', outbound: '1・2番線' },
    isMajor: true,
    stoppingTypes: ['local', 'regular', 'rapid', 'special_rapid', 'commuter_special_rapid'],
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
];

// スナップインデックスを計算
const stations = stationMetadata.map(st => {
  const origCoord = nodeMap.get(st.stopNodeId);
  let minDist = Infinity;
  let bestIdx = -1;
  for (let j = 0; j < continuousNodeIds.length; j++) {
    const c = nodeMap.get(continuousNodeIds[j]);
    const d = getDistance(origCoord, c);
    if (d < minDist) {
      minDist = d;
      bestIdx = j;
    }
  }

  // スナップされた線路ノード座標
  const snappedCoord = nodeMap.get(continuousNodeIds[bestIdx]);
  return {
    id: st.id,
    lineId: 'itsukaichi',
    number: st.number,
    name: st.name,
    nameKana: st.nameKana,
    nameEn: st.nameEn,
    lat: snappedCoord[0],
    lng: snappedCoord[1],
    transfers: st.transfers,
    address: st.address,
    platforms: st.platforms,
    stoppingTypes: st.stoppingTypes,
    isMajor: st.isMajor,
    facilities: st.facilities,
    snappedIdx: bestIdx,
  };
});

// 各駅間の TrackSegment を生成
const trackSegments = [];
for (let i = 0; i < stations.length - 1; i++) {
  const fromSt = stations[i];
  const toSt = stations[i + 1];
  const sliceNodeIds = continuousNodeIds.slice(fromSt.snappedIdx, toSt.snappedIdx + 1);
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
// 1. src/data/lines/itsukaichi/stations.ts
const stationsTs = `// JR五日市線 駅定義 (拝島 〜 武蔵五日市 全7駅)
import type { Station } from '../../../types';

export const ITSUKAICHI_STATIONS: Station[] = ${JSON.stringify(stations.map(({ snappedIdx, ...s }) => s), null, 2)};
`;

// 2. src/data/lines/itsukaichi/trackGeometry.ts
const trackGeometryTs = `// JR五日市線 線路幾何データ
import type { TrackSegment } from '../../../types';

export const ITSUKAICHI_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(trackSegments, null, 2)};
`;

const targetDir = path.resolve(__dirname, '../src/data/lines/itsukaichi');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.writeFileSync(path.join(targetDir, 'stations.ts'), stationsTs, 'utf8');
fs.writeFileSync(path.join(targetDir, 'trackGeometry.ts'), trackGeometryTs, 'utf8');
console.log('Successfully wrote stations.ts and trackGeometry.ts!');
