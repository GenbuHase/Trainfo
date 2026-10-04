const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cache/osm_ome_raw.json'), 'utf8'));

const nodeMap = new Map();
const wayMap = new Map();
for (const e of data.elements) {
  if (e.type === 'node') nodeMap.set(e.id, [e.lat, e.lon]);
  if (e.type === 'way') wayMap.set(e.id, e);
}

const relDown = data.elements.find(e => e.type === 'relation' && e.id === 11814887);
const wayRefs = relDown.members.filter(m => m.type === 'way' && m.role === '').map(m => m.ref);

// 連続ノードの構築
const continuousNodeIds = [];
for (let i = 0; i < wayRefs.length; i++) {
  const w = wayMap.get(wayRefs[i]);
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

// 25駅の定義マスタ
const stationMetadata = [
  {
    id: 'JC-19', number: 1, name: '立川', nameKana: 'たちかわ', nameEn: 'Tachikawa',
    stopNodeId: 4351266708,
    transfers: ['JR中央線', 'JR中央本線', 'JR南武線', '多摩都市モノレール'],
    address: '東京都立川市曙町二丁目1-1',
    platforms: { inbound: '1・2番線', outbound: '1・2番線' },
    isMajor: true,
    stoppingTypes: ['local', 'rapid', 'commuter', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid', 'special_rapid', 'limitedExp'],
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
  {
    id: 'JC-51', number: 2, name: '西立川', nameKana: 'にしたちかわ', nameEn: 'Nishi-Tachikawa',
    stopNodeId: 1942644773,
    transfers: [],
    address: '東京都立川市富士見町一丁目36-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: false,
    stoppingTypes: ['local', 'rapid', 'commuter', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid', 'special_rapid'],
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'JC-52', number: 3, name: '東中神', nameKana: 'ひがしなかがみ', nameEn: 'Higashi-Nakagami',
    stopNodeId: 305545846,
    transfers: [],
    address: '東京都昭島市玉川町一丁目1-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: false,
    stoppingTypes: ['local', 'rapid', 'commuter', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid'],
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'JC-53', number: 4, name: '中神', nameKana: 'なかがみ', nameEn: 'Nakagami',
    stopNodeId: 305545796,
    transfers: [],
    address: '東京都昭島市朝日町一丁目11-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: false,
    stoppingTypes: ['local', 'rapid', 'commuter', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid'],
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'JC-54', number: 5, name: '昭島', nameKana: 'あきしま', nameEn: 'Akishima',
    stopNodeId: 4351266466,
    transfers: [],
    address: '東京都昭島市田中町562-8',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: false,
    stoppingTypes: ['local', 'rapid', 'commuter', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid'],
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'JC-55', number: 6, name: '拝島', nameKana: 'はいじま', nameEn: 'Haijima',
    stopNodeId: 4351266470,
    transfers: ['JR八高線', 'JR五日市線', '西武拝島線'],
    address: '東京都昭島市松原町四丁目14-4',
    platforms: { inbound: '2・3番線', outbound: '1・2番線' },
    isMajor: true,
    stoppingTypes: ['local', 'rapid', 'commuter', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid', 'special_rapid', 'limitedExp'],
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
  {
    id: 'JC-56', number: 7, name: '牛浜', nameKana: 'うしはま', nameEn: 'Ushihama',
    stopNodeId: 305545185,
    transfers: [],
    address: '東京都福生市牛浜125',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: false,
    stoppingTypes: ['local', 'rapid', 'commuter', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid'],
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'JC-57', number: 8, name: '福生', nameKana: 'ふっさ', nameEn: 'Fussa',
    stopNodeId: 305545849,
    transfers: [],
    address: '東京都福生市大字福生768',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: true,
    stoppingTypes: ['local', 'rapid', 'commuter', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid', 'special_rapid'],
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'JC-58', number: 9, name: '羽村', nameKana: 'はむら', nameEn: 'Hamura',
    stopNodeId: 305545192,
    transfers: [],
    address: '東京都羽村市羽東一丁目12-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: false,
    stoppingTypes: ['local', 'rapid', 'commuter', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid'],
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'JC-59', number: 10, name: '小作', nameKana: 'おざく', nameEn: 'Ozaku',
    stopNodeId: 305545044,
    transfers: [],
    address: '東京都羽村市小作台五丁目1-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: false,
    stoppingTypes: ['local', 'rapid', 'commuter', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid'],
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'JC-60', number: 11, name: '河辺', nameKana: 'かべ', nameEn: 'Kabe',
    stopNodeId: 8089218350,
    transfers: [],
    address: '東京都青梅市河辺町十丁目1-1',
    platforms: { inbound: '1・2番線', outbound: '2・3番線' },
    isMajor: true,
    stoppingTypes: ['local', 'rapid', 'commuter', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid'],
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'JC-61', number: 12, name: '東青梅', nameKana: 'ひがしおうめ', nameEn: 'Higashi-Ome',
    stopNodeId: 3305325683,
    transfers: [],
    address: '東京都青梅市東青梅一丁目2-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: false,
    stoppingTypes: ['local', 'rapid', 'commuter', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid'],
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'JC-62', number: 13, name: '青梅', nameKana: 'おうめ', nameEn: 'Ome',
    stopNodeId: 3305331309,
    transfers: [],
    address: '東京都青梅市本町130',
    platforms: { inbound: '1・2番線', outbound: '3・4番線' },
    isMajor: true,
    stoppingTypes: ['local', 'rapid', 'commuter', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid', 'special_rapid', 'limitedExp'],
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
  {
    id: 'JC-63', number: 14, name: '宮ノ平', nameKana: 'みやのひら', nameEn: 'Miyanohira',
    stopNodeId: 9909248808,
    transfers: [],
    address: '東京都青梅市日向和田二丁目282',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: false,
    stoppingTypes: ['local', 'rapid'],
    facilities: { elevator: false, restroom: true, multipurposeToilet: false, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JC-64', number: 15, name: '日向和田', nameKana: 'ひなたわだ', nameEn: 'Hinatawada',
    stopNodeId: 4351266485,
    transfers: [],
    address: '東京都青梅市日向和田三丁目635',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: false,
    stoppingTypes: ['local', 'rapid'],
    facilities: { elevator: false, restroom: true, multipurposeToilet: false, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JC-65', number: 16, name: '石神前', nameKana: 'いしがみまえ', nameEn: 'Ishigamimae',
    stopNodeId: 305546211,
    transfers: [],
    address: '東京都青梅市二俣尾一丁目22',
    platforms: { inbound: '1番線', outbound: '1番線' },
    isMajor: false,
    stoppingTypes: ['local', 'rapid'],
    facilities: { elevator: false, restroom: true, multipurposeToilet: false, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JC-66', number: 17, name: '二俣尾', nameKana: 'ふたまたお', nameEn: 'Futamatao',
    stopNodeId: 305545643,
    transfers: [],
    address: '東京都青梅市二俣尾四丁目1022',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: false,
    stoppingTypes: ['local', 'rapid'],
    facilities: { elevator: false, restroom: true, multipurposeToilet: false, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JC-67', number: 18, name: '軍畑', nameKana: 'いくさばた', nameEn: 'Ikusabata',
    stopNodeId: 305545121,
    transfers: [],
    address: '東京都青梅市沢井一丁目145',
    platforms: { inbound: '1番線', outbound: '1番線' },
    isMajor: false,
    stoppingTypes: ['local', 'rapid'],
    facilities: { elevator: false, restroom: true, multipurposeToilet: false, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JC-68', number: 19, name: '沢井', nameKana: 'さわい', nameEn: 'Sawai',
    stopNodeId: 8093083768,
    transfers: [],
    address: '東京都青梅市沢井二丁目832',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: false,
    stoppingTypes: ['local', 'rapid'],
    facilities: { elevator: false, restroom: true, multipurposeToilet: false, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JC-69', number: 20, name: '御嶽', nameKana: 'みたけ', nameEn: 'Mitake',
    stopNodeId: 305545531,
    transfers: [],
    address: '東京都青梅市御岳本町279',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: true,
    stoppingTypes: ['local', 'rapid', 'special_rapid'],
    facilities: { elevator: false, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
  {
    id: 'JC-70', number: 21, name: '川井', nameKana: 'かわい', nameEn: 'Kawai',
    stopNodeId: 305546031,
    transfers: [],
    address: '東京都西多摩郡奥多摩町川井285',
    platforms: { inbound: '1番線', outbound: '1番線' },
    isMajor: false,
    stoppingTypes: ['local', 'rapid'],
    facilities: { elevator: false, restroom: true, multipurposeToilet: false, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JC-71', number: 22, name: '古里', nameKana: 'こり', nameEn: 'Kori',
    stopNodeId: 8093102571,
    transfers: [],
    address: '東京都西多摩郡奥多摩町小丹波254',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: false,
    stoppingTypes: ['local', 'rapid'],
    facilities: { elevator: false, restroom: true, multipurposeToilet: false, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JC-72', number: 23, name: '鳩ノ巣', nameKana: 'はとのす', nameEn: 'Hatonosu',
    stopNodeId: 8093118351,
    transfers: [],
    address: '東京都西多摩郡奥多摩町棚澤240',
    platforms: { inbound: '1番線', outbound: '2番線' },
    isMajor: false,
    stoppingTypes: ['local', 'rapid'],
    facilities: { elevator: false, restroom: true, multipurposeToilet: false, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JC-73', number: 24, name: '白丸', nameKana: 'しろまる', nameEn: 'Shiromaru',
    stopNodeId: 305545465,
    transfers: [],
    address: '東京都西多摩郡奥多摩町白丸109',
    platforms: { inbound: '1番線', outbound: '1番線' },
    isMajor: false,
    stoppingTypes: ['local', 'rapid'],
    facilities: { elevator: false, restroom: true, multipurposeToilet: false, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'JC-74', number: 25, name: '奥多摩', nameKana: 'おくたま', nameEn: 'Okutama',
    stopNodeId: 305545857,
    transfers: [],
    address: '東京都西多摩郡奥多摩町氷川210',
    platforms: { inbound: '1・2番線', outbound: '1・2番線' },
    isMajor: true,
    stoppingTypes: ['local', 'rapid', 'special_rapid'],
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
    lineId: 'ome',
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
// 1. src/data/lines/ome/stations.ts
const stationsTs = `// JR青梅線 駅定義 (立川 〜 奥多摩 全25駅)
import type { Station } from '../../../types';

export const OME_STATIONS: Station[] = ${JSON.stringify(stations.map(({ snappedIdx, ...s }) => s), null, 2)};
`;

// 2. src/data/lines/ome/trackGeometry.ts
const trackGeometryTs = `// JR青梅線 線路幾何データ
import type { TrackSegment } from '../../../types';

export const OME_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(trackSegments, null, 2)};
`;

const omeDir = path.resolve(__dirname, '../src/data/lines/ome');
if (!fs.existsSync(omeDir)) {
  fs.mkdirSync(omeDir, { recursive: true });
}

fs.writeFileSync(path.join(omeDir, 'stations.ts'), stationsTs, 'utf8');
fs.writeFileSync(path.join(omeDir, 'trackGeometry.ts'), trackGeometryTs, 'utf8');
console.log('Successfully wrote stations.ts and trackGeometry.ts!');
