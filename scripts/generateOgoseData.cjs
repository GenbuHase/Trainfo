const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cache/osm_ogose_raw.json'), 'utf8'));
const rel = raw.elements.find(e => e.type === 'relation' && e.id === 11700879);

const ways = new Map();
const nodes = new Map();
for (const el of raw.elements) {
  if (el.type === 'way') ways.set(el.id, el);
  if (el.type === 'node') nodes.set(el.id, el);
}

const wayMembers = rel.members.filter(m => m.type === 'way');

let continuousNodes = [];
for (let i = 0; i < wayMembers.length; i++) {
  const member = wayMembers[i];
  const way = ways.get(member.ref);
  const wNodes = way.nodes;
  if (i === 0) {
    continuousNodes = [...wNodes];
  } else {
    const lastNode = continuousNodes[continuousNodes.length - 1];
    if (wNodes[0] === lastNode) {
      continuousNodes.push(...wNodes.slice(1));
    } else if (wNodes[wNodes.length - 1] === lastNode) {
      continuousNodes.push(...wNodes.slice().reverse().slice(1));
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

// 隣接点間距離チェック
console.log('Checking point-to-point distances along continuous nodes...');
let maxDist = 0;
let maxIdx = -1;
for (let i = 0; i < continuousNodes.length - 1; i++) {
  const n1 = nodes.get(continuousNodes[i]);
  const n2 = nodes.get(continuousNodes[i + 1]);
  const d = getDistance([n1.lat, n1.lon], [n2.lat, n2.lon]);
  if (d > maxDist) {
    maxDist = d;
    maxIdx = i;
  }
}
console.log(`Max point-to-point distance: ${maxDist.toFixed(1)}m at index ${maxIdx}`);

// 駅メタデータ
const stationDefs = [
  {
    id: 'TJ-26',
    lineId: 'ogose',
    number: 26,
    name: '坂戸',
    nameKana: 'さかど',
    nameEn: 'Sakado',
    stopNodeId: 503889356, // idx: 12
    transfers: ['東武東上線'],
    address: '埼玉県坂戸市日の出町1-1',
    platforms: { inbound: '1・2番線', outbound: '1・2番線' },
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
    stoppingTypes: ['local'],
  },
  {
    id: 'TJ-41',
    lineId: 'ogose',
    number: 41,
    name: '一本松',
    nameKana: 'いっぽんまつ',
    nameEn: 'Ippommatsu',
    stopNodeId: 503889627, // idx: 115
    transfers: [],
    address: '埼玉県鶴ヶ島市大字中新田80-3',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: false,
    facilities: { elevator: false, restroom: true, multipurposeToilet: false, waitingRoom: false, ticketOffice: false },
    stoppingTypes: ['local'],
  },
  {
    id: 'TJ-42',
    lineId: 'ogose',
    number: 42,
    name: '西大家',
    nameKana: 'にしおおや',
    nameEn: 'Nishi-Oya',
    stopNodeId: 7965140174, // idx: 161
    transfers: [],
    address: '埼玉県坂戸市大字森戸623-6',
    platforms: { inbound: '1番線', outbound: '1番線' },
    isMajor: false,
    facilities: { elevator: false, restroom: true, multipurposeToilet: false, waitingRoom: false, ticketOffice: false },
    stoppingTypes: ['local'],
  },
  {
    id: 'TJ-43',
    lineId: 'ogose',
    number: 43,
    name: '川角',
    nameKana: 'かわかど',
    nameEn: 'Kawakado',
    stopNodeId: 7965139704, // idx: 260
    transfers: [],
    address: '埼玉県入間郡毛呂山町大字川角436',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: false,
    facilities: { elevator: false, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
    stoppingTypes: ['local'],
  },
  {
    id: 'TJ-44',
    lineId: 'ogose',
    number: 44,
    name: '武州長瀬',
    nameKana: 'ぶしゅうながせ',
    nameEn: 'Bushu-Nagase',
    stopNodeId: 503889921, // idx: 296
    transfers: [],
    address: '埼玉県入間郡毛呂山町南台一丁目1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: false },
    stoppingTypes: ['local'],
  },
  {
    id: 'TJ-45',
    lineId: 'ogose',
    number: 45,
    name: '東毛呂',
    nameKana: 'ひがしもろ',
    nameEn: 'Higashi-Moro',
    stopNodeId: 503890515, // idx: 341
    transfers: ['JR八高線（毛呂駅 徒歩約10分）'],
    address: '埼玉県入間郡毛呂山町岩井東二丁目1-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: false },
    stoppingTypes: ['local'],
  },
  {
    id: 'TJ-46',
    lineId: 'ogose',
    number: 46,
    name: '武州唐沢',
    nameKana: 'ぶしゅうからさわ',
    nameEn: 'Bushu-Karasawa',
    stopNodeId: 9864958206, // idx: 372
    transfers: [],
    address: '埼玉県入間郡越生町大字上野東二丁目1',
    platforms: { inbound: '1番線', outbound: '1番線' },
    isMajor: false,
    facilities: { elevator: false, restroom: true, multipurposeToilet: false, waitingRoom: false, ticketOffice: false },
    stoppingTypes: ['local'],
  },
  {
    id: 'TJ-47',
    lineId: 'ogose',
    number: 47,
    name: '越生',
    nameKana: 'おごせ',
    nameEn: 'Ogose',
    stopNodeId: 503890772, // idx: 426
    transfers: ['JR八高線'],
    address: '埼玉県入間郡越生町大字越生841-2',
    platforms: { inbound: '1・2番線', outbound: '1・2番線' },
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
    stoppingTypes: ['local'],
  },
];

// 各駅の座標特定 & スライス
const stationIndices = [];
stationDefs.forEach(st => {
  const idx = continuousNodes.indexOf(st.stopNodeId);
  if (idx === -1) {
    throw new Error(`Stop node ${st.stopNodeId} for ${st.name} not found in continuous nodes!`);
  }
  const n = nodes.get(st.stopNodeId);
  st.lat = n.lat;
  st.lng = n.lon;
  stationIndices.push(idx);
  console.log(`Station ${st.id} ${st.name}: idx=${idx}, lat=${st.lat}, lng=${st.lng}`);
});

// セグメント作成
const segments = [];
for (let i = 0; i < stationDefs.length - 1; i++) {
  const fromSt = stationDefs[i];
  const toSt = stationDefs[i + 1];
  const fromIdx = stationIndices[i];
  const toIdx = stationIndices[i + 1];

  const segNodes = continuousNodes.slice(fromIdx, toIdx + 1);
  const coordinates = segNodes.map(id => {
    const n = nodes.get(id);
    return [n.lat, n.lon];
  });

  // 距離計算
  let segDist = 0;
  for (let j = 0; j < coordinates.length - 1; j++) {
    segDist += getDistance(coordinates[j], coordinates[j + 1]);
  }

  console.log(`Segment ${fromSt.id} (${fromSt.name}) -> ${toSt.id} (${toSt.name}): ${coordinates.length} points, distance=${segDist.toFixed(1)}m`);

  segments.push({
    fromStationId: fromSt.id,
    toStationId: toSt.id,
    coordinates,
  });
}

// ファイル出力
// 1. stations.ts
const stationsCode = `import type { Station } from '../../../types';

export const STATIONS: Station[] = ${JSON.stringify(stationDefs.map(s => {
  const { stopNodeId, ...rest } = s;
  return rest;
}), null, 2)};
`;

// 2. trackGeometry.ts
const trackGeometryCode = `import type { TrackSegment } from '../../../types';

export const STATION_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(segments, null, 2)};
`;

fs.writeFileSync(path.resolve(__dirname, '../src/data/lines/ogose/stations.ts'), stationsCode, 'utf8');
fs.writeFileSync(path.resolve(__dirname, '../src/data/lines/ogose/trackGeometry.ts'), trackGeometryCode, 'utf8');
console.log('Successfully generated stations.ts and trackGeometry.ts for Ogose line!');
