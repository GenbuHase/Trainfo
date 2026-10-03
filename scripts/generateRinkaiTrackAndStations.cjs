const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cache/osm_rinkai_bbox.json'), 'utf8'));

const nodeMap = new Map();
for (const e of data.elements) {
  if (e.type === 'node') {
    nodeMap.set(e.id, [e.lat, e.lon]);
  }
}

const wayMap = new Map();
for (const e of data.elements) {
  if (e.type === 'way') {
    wayMap.set(e.id, e);
  }
}

// Way 8 〜 22 を順番に連結
const wayIds = [
  1556867142, 241575819, 241575820, 862831395, 1556867138,
  1556867137, 4854227, 1442350586, 1442350584, 728804637,
  74105627, 241577693, 241577692, 241577703, 241577677
];

const continuousNodes = [];
for (let i = 0; i < wayIds.length; i++) {
  const w = wayMap.get(wayIds[i]);
  const nodes = w.nodes;
  if (i === 0) {
    continuousNodes.push(...nodes);
  } else {
    continuousNodes.push(...nodes.slice(1));
  }
}

// 8駅の定義
const stationDefs = [
  {
    id: 'R-01',
    number: 1,
    name: '新木場',
    nameKana: 'しんきば',
    nameEn: 'Shin-kiba',
    nodeId: 1950768183,
    transfers: ['JR京葉線', '東京メトロ有楽町線'],
    address: '東京都江東区新木場一丁目5',
    platforms: { inbound: '1・2番線', outbound: '1・2番線' },
    stoppingTypes: ['local', 'rapid', 'commuter'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'R-02',
    number: 2,
    name: '東雲',
    nameKana: 'しののめ',
    nameEn: 'Shinonome',
    nodeId: 1950765321,
    transfers: [],
    address: '東京都江東区東雲二丁目11',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'rapid', 'commuter'],
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'R-03',
    number: 3,
    name: '国際展示場',
    nameKana: 'こくさいてんじじょう',
    nameEn: 'Kokusai-tenjijo',
    nodeId: 1063379042,
    transfers: ['ゆりかもめ(有明駅)'],
    address: '東京都江東区有明三丁目7-5',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'rapid', 'commuter'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'R-04',
    number: 4,
    name: '東京テレポート',
    nameKana: 'とうきょうてれぽーと',
    nameEn: 'Tokyo Teleport',
    nodeId: 1742285574,
    transfers: ['ゆりかもめ(お台場海浜公園駅・青海駅)'],
    address: '東京都江東区青海一丁目1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'rapid', 'commuter'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'R-05',
    number: 5,
    name: '天王洲アイル',
    nameKana: 'てんのうずあいる',
    nameEn: 'Tennozu Isle',
    nodeId: 1742285572,
    transfers: ['東京モノレール'],
    address: '東京都品川区東品川二丁目2-22',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'rapid', 'commuter'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'R-06',
    number: 6,
    name: '品川シーサイド',
    nameKana: 'しながわしーさいど',
    nameEn: 'Shinagawa Seaside',
    nodeId: 1742285570,
    transfers: [],
    address: '東京都品川区東品川四丁目12-22',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'rapid', 'commuter'],
    isMajor: false,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: false },
  },
  {
    id: 'R-07',
    number: 7,
    name: '大井町',
    nameKana: 'おおいまち',
    nameEn: 'Oimachi',
    nodeId: 1742285571,
    transfers: ['JR京浜東北線', '東急大井町線'],
    address: '東京都品川区大井一丁目1-1',
    platforms: { inbound: '1番線', outbound: '2番線' },
    stoppingTypes: ['local', 'rapid', 'commuter'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: false, ticketOffice: true },
  },
  {
    id: 'R-08',
    number: 8,
    name: '大崎',
    nameKana: 'おおさき',
    nameEn: 'Osaki',
    nodeId: 3406728237,
    transfers: ['JR山手線', 'JR埼京線', 'JR湘南新宿ライン', '相鉄線直通列車'],
    address: '東京都品川区大崎一丁目21-4',
    platforms: { inbound: '5〜8番線', outbound: '5〜8番線' },
    stoppingTypes: ['local', 'rapid', 'commuter'],
    isMajor: true,
    facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
  },
];

// stations.ts 用の Station[] 生成
const stations = stationDefs.map(s => {
  const coords = nodeMap.get(s.nodeId);
  return {
    id: s.id,
    lineId: 'rinkai',
    number: s.number,
    name: s.name,
    nameKana: s.nameKana,
    nameEn: s.nameEn,
    lat: coords[0],
    lng: coords[1],
    transfers: s.transfers,
    address: s.address,
    facilities: s.facilities,
    stoppingTypes: s.stoppingTypes,
    isMajor: s.isMajor,
    platforms: s.platforms,
  };
});

// trackGeometry.ts 用のセグメント生成
const stationIndices = stationDefs.map(s => continuousNodes.indexOf(s.nodeId));
console.log('Station continuous indices:', stationIndices);

const trackSegments = [];
for (let i = 0; i < stationDefs.length - 1; i++) {
  const fromSt = stationDefs[i];
  const toSt = stationDefs[i + 1];
  const startIdx = stationIndices[i];
  const endIdx = stationIndices[i + 1];

  const segNodes = continuousNodes.slice(startIdx, endIdx + 1);
  const coords = segNodes.map(nid => {
    const c = nodeMap.get(nid);
    return [c[0], c[1]];
  });

  trackSegments.push({
    fromStationId: fromSt.id,
    toStationId: toSt.id,
    fromName: fromSt.name,
    toName: toSt.name,
    coordinates: coords,
  });
}

// ディレクトリ作成
const outDir = path.resolve(__dirname, '../src/data/lines/rinkai');
fs.mkdirSync(outDir, { recursive: true });

// 1. stations.ts
const stationsCode = `// 東京臨海高速鉄道りんかい線 駅メタデータ定義 (新木場 〜 大崎 全8駅)
import type { Station } from '../../../types';

export const RINKAI_STATIONS: Station[] = ${JSON.stringify(stations, null, 2)};
`;
fs.writeFileSync(path.join(outDir, 'stations.ts'), stationsCode, 'utf8');
console.log('Written src/data/lines/rinkai/stations.ts');

// 2. trackGeometry.ts
const trackCode = `// 東京臨海高速鉄道りんかい線 線路幾何データ (新木場 〜 大崎 全7セグメント)
import type { TrackSegment } from '../../../types';

export const RINKAI_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(trackSegments, null, 2)};
`;
fs.writeFileSync(path.join(outDir, 'trackGeometry.ts'), trackCode, 'utf8');
console.log('Written src/data/lines/rinkai/trackGeometry.ts');
