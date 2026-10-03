const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync('scripts/osm_chuo_raw.json', 'utf8'));

const nodesMap = new Map();
raw.elements.filter(e => e.type === 'node').forEach(n => {
  nodesMap.set(n.id, [n.lat, n.lon]);
});

const waysMap = new Map();
raw.elements.filter(e => e.type === 'way').forEach(w => {
  waysMap.set(w.id, w);
});

const rel = raw.elements.find(e => e.type === 'relation' && e.id === 10363876);
const memberWays = rel.members.filter(m => m.type === 'way').map(m => waysMap.get(m.ref)).filter(Boolean);

function dist(p1, p2) {
  const dlat = p1[0] - p2[0];
  const dlng = p1[1] - p2[1];
  return Math.sqrt(dlat * dlat + dlng * dlng);
}

const fullPolyline = [];

for (let i = 0; i < memberWays.length; i++) {
  const way = memberWays[i];
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

    if (dist(lastPt, wayCoords[0]) < 0.00001) {
      fullPolyline.push(...wayCoords.slice(1));
    } else {
      fullPolyline.push(...wayCoords);
    }
  }
}

// 24駅の定義
const STATION_DEFS = [
  {
    id: 'JC-01',
    number: 1,
    name: '東京',
    nameKana: 'とうきょう',
    nameEn: 'Tokyo',
    transfers: [
      'JR山手線', 'JR京浜東北線', 'JR東海道線', 'JR上野東京ライン',
      'JR総武線快速', 'JR横須賀線', 'JR京葉線', 'JR新幹線',
      '東京メトロ丸ノ内線'
    ],
    address: '東京都千代田区丸の内一丁目',
    platforms: { inbound: '1・2番線', outbound: '1・2番線' },
    stoppingTypes: ['local', 'rapid', 'commuter', 'special_rapid', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid', 'limitedExp'],
    osmNodeId: 3589537656
  },
  {
    id: 'JC-02',
    number: 2,
    name: '神田',
    nameKana: 'かんだ',
    nameEn: 'Kanda',
    transfers: ['JR山手線', 'JR京浜東北線', '東京メトロ銀座線'],
    address: '東京都千代田区鍛冶町二丁目',
    platforms: { inbound: '5番線', outbound: '6番線' },
    stoppingTypes: ['local', 'rapid', 'commuter', 'special_rapid', 'chuo_special_rapid', 'ome_special_rapid'],
    osmNodeId: 1822906614
  },
  {
    id: 'JC-03',
    number: 3,
    name: '御茶ノ水',
    nameKana: 'おちゃのみず',
    nameEn: 'Ochanomizu',
    transfers: ['JR総武線各駅停車', '東京メトロ丸ノ内線'],
    address: '東京都千代田区神田駿河台二丁目',
    platforms: { inbound: '2番線', outbound: '1番線' },
    stoppingTypes: ['local', 'rapid', 'commuter', 'special_rapid', 'chuo_special_rapid', 'ome_special_rapid'],
    osmNodeId: 315863112
  },
  {
    id: 'JC-04',
    number: 4,
    name: '四ツ谷',
    nameKana: 'よつや',
    nameEn: 'Yotsuya',
    transfers: ['JR総武線各駅停車', '東京メトロ丸ノ内線', '東京メトロ南北線'],
    address: '東京都新宿区四谷一丁目',
    platforms: { inbound: '2番線', outbound: '1番線' },
    stoppingTypes: ['local', 'rapid', 'commuter', 'special_rapid', 'chuo_special_rapid', 'ome_special_rapid'],
    osmNodeId: 6070813704
  },
  {
    id: 'JC-05',
    number: 5,
    name: '新宿',
    nameKana: 'しんじゅく',
    nameEn: 'Shinjuku',
    transfers: [
      'JR山手線', 'JR埼京線', 'JR湘南新宿ライン', 'JR総武線各駅停車',
      '東京メトロ丸ノ内線', '都営新宿線', '都営大江戸線',
      '京王線', '小田急線'
    ],
    address: '東京都新宿区新宿三丁目',
    platforms: { inbound: '7・8番線', outbound: '9・10・11・12番線' },
    stoppingTypes: ['local', 'rapid', 'commuter', 'special_rapid', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid', 'limitedExp'],
    osmNodeId: 3558156204
  },
  {
    id: 'JC-06',
    number: 6,
    name: '中野',
    nameKana: 'なかの',
    nameEn: 'Nakano',
    transfers: ['JR総武線各駅停車', '東京メトロ東西線'],
    address: '東京都中野区中野五丁目',
    platforms: { inbound: '7・8番線', outbound: '5・6番線' },
    stoppingTypes: ['local', 'rapid', 'commuter', 'special_rapid', 'chuo_special_rapid', 'ome_special_rapid', 'limitedExp'],
    osmNodeId: 6018468417
  },
  {
    id: 'JC-07',
    number: 7,
    name: '高円寺',
    nameKana: 'こうえんじ',
    nameEn: 'Koenji',
    transfers: ['JR総武線各駅停車'],
    address: '東京都杉並区高円寺南四丁目',
    platforms: { inbound: '4番線', outbound: '3番線' },
    stoppingTypes: ['local', 'rapid'],
    osmNodeId: 6018042418
  },
  {
    id: 'JC-08',
    number: 8,
    name: '阿佐ケ谷',
    nameKana: 'あさがや',
    nameEn: 'Asagaya',
    transfers: ['JR総武線各駅停車'],
    address: '東京都杉並区阿佐谷南二丁目',
    platforms: { inbound: '4番線', outbound: '3番線' },
    stoppingTypes: ['local', 'rapid'],
    osmNodeId: 6018042462
  },
  {
    id: 'JC-09',
    number: 9,
    name: '荻窪',
    nameKana: 'おぎくぼ',
    nameEn: 'Ogikubo',
    transfers: ['JR総武線各駅停車', '東京メトロ丸ノ内線'],
    address: '東京都杉並区上荻一丁目',
    platforms: { inbound: '4番線', outbound: '3番線' },
    stoppingTypes: ['local', 'rapid', 'commuter', 'commuter_special_rapid'],
    osmNodeId: 1493243601
  },
  {
    id: 'JC-10',
    number: 10,
    name: '西荻窪',
    nameKana: 'にしおぎくぼ',
    nameEn: 'Nishi-Ogikubo',
    transfers: ['JR総武線各駅停車'],
    address: '東京都杉並区西荻南三丁目',
    platforms: { inbound: '4番線', outbound: '3番線' },
    stoppingTypes: ['local', 'rapid'],
    osmNodeId: 1942374138
  },
  {
    id: 'JC-11',
    number: 11,
    name: '吉祥寺',
    nameKana: 'きちじょうじ',
    nameEn: 'Kichijoji',
    transfers: ['JR総武線各駅停車', '京王井の頭線'],
    address: '東京都武蔵野市吉祥寺南町一丁目',
    platforms: { inbound: '4番線', outbound: '3番線' },
    stoppingTypes: ['local', 'rapid', 'commuter', 'commuter_special_rapid'],
    osmNodeId: 6017578914
  },
  {
    id: 'JC-12',
    number: 12,
    name: '三鷹',
    nameKana: 'みたか',
    nameEn: 'Mitaka',
    transfers: ['JR総武線各駅停車', '東京メトロ東西線直通'],
    address: '東京都三鷹市下連雀三丁目',
    platforms: { inbound: '5・6番線', outbound: '3・4番線' },
    stoppingTypes: ['local', 'rapid', 'commuter', 'special_rapid', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid', 'limitedExp'],
    osmNodeId: 1942371971
  },
  {
    id: 'JC-13',
    number: 13,
    name: '武蔵境',
    nameKana: 'むさしさかい',
    nameEn: 'Musashi-Sakai',
    transfers: ['西武多摩川線'],
    address: '東京都武蔵野市境一丁目',
    platforms: { inbound: '2番線', outbound: '1番線' },
    stoppingTypes: ['local', 'rapid'],
    osmNodeId: 243890692
  },
  {
    id: 'JC-14',
    number: 14,
    name: '東小金井',
    nameKana: 'ひがしこがねい',
    nameEn: 'Higashi-Koganei',
    transfers: [],
    address: '東京都小金井市梶野町五丁目',
    platforms: { inbound: '2番線', outbound: '1番線' },
    stoppingTypes: ['local', 'rapid'],
    osmNodeId: 1944400728
  },
  {
    id: 'JC-15',
    number: 15,
    name: '武蔵小金井',
    nameKana: 'むさしこがねい',
    nameEn: 'Musashi-Koganei',
    transfers: [],
    address: '東京都小金井市本町六丁目',
    platforms: { inbound: '3・4番線', outbound: '1・2番線' },
    stoppingTypes: ['local', 'rapid'],
    osmNodeId: 6017383500
  },
  {
    id: 'JC-16',
    number: 16,
    name: '国分寺',
    nameKana: 'こくぶんじ',
    nameEn: 'Kokubunji',
    transfers: ['西武国分寺線', '西武多摩湖線'],
    address: '東京都国分寺市本町二丁目',
    platforms: { inbound: '3・4番線', outbound: '1・2番線' },
    stoppingTypes: ['local', 'rapid', 'commuter', 'special_rapid', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid'],
    osmNodeId: 2251745525
  },
  {
    id: 'JC-17',
    number: 17,
    name: '西国分寺',
    nameKana: 'にしこくぶんじ',
    nameEn: 'Nishi-Kokubunji',
    transfers: ['JR武蔵野線'],
    address: '東京都国分寺市西恋ヶ窪二丁目',
    platforms: { inbound: '2番線', outbound: '1番線' },
    stoppingTypes: ['local', 'rapid'],
    osmNodeId: 6017304860
  },
  {
    id: 'JC-18',
    number: 18,
    name: '国立',
    nameKana: 'くにたち',
    nameEn: 'Kunitachi',
    transfers: ['JR武蔵野線（むさしの号）'],
    address: '東京都国立市北一丁目',
    platforms: { inbound: '2・3番線', outbound: '1番線' },
    stoppingTypes: ['local', 'rapid'],
    osmNodeId: 6017290607
  },
  {
    id: 'JC-19',
    number: 19,
    name: '立川',
    nameKana: 'たちかわ',
    nameEn: 'Tachikawa',
    transfers: ['JR青梅線', 'JR南武線', '多摩都市モノレール'],
    address: '東京都立川市曙町二丁目',
    platforms: { inbound: '3・4番線', outbound: '5・6番線' },
    stoppingTypes: ['local', 'rapid', 'commuter', 'special_rapid', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid', 'limitedExp'],
    osmNodeId: 243890691
  },
  {
    id: 'JC-20',
    number: 20,
    name: '日野',
    nameKana: 'ひの',
    nameEn: 'Hino',
    transfers: [],
    address: '東京都日野市大坂上一丁目',
    platforms: { inbound: '2番線', outbound: '1番線' },
    stoppingTypes: ['local', 'rapid', 'commuter', 'special_rapid', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid'],
    osmNodeId: 2558122562
  },
  {
    id: 'JC-21',
    number: 21,
    name: '豊田',
    nameKana: 'とよだ',
    nameEn: 'Toyoda',
    transfers: [],
    address: '東京都日野市豊田四丁目',
    platforms: { inbound: '3・4番線', outbound: '1・2番線' },
    stoppingTypes: ['local', 'rapid', 'commuter', 'special_rapid', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid'],
    osmNodeId: 6017166835
  },
  {
    id: 'JC-22',
    number: 22,
    name: '八王子',
    nameKana: 'はちおうじ',
    nameEn: 'Hachioji',
    transfers: ['JR横浜線', 'JR八高線', '京王線（京王八王子駅）'],
    address: '東京都八王子市旭町',
    platforms: { inbound: '3・4番線', outbound: '1・2番線' },
    stoppingTypes: ['local', 'rapid', 'commuter', 'special_rapid', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid', 'limitedExp'],
    osmNodeId: 6016890018
  },
  {
    id: 'JC-23',
    number: 23,
    name: '西八王子',
    nameKana: 'にしはちおうじ',
    nameEn: 'Nishi-Hachioji',
    transfers: [],
    address: '東京都八王子市千人町二丁目',
    platforms: { inbound: '2番線', outbound: '1番線' },
    stoppingTypes: ['local', 'rapid', 'commuter', 'special_rapid', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid'],
    osmNodeId: 6003230111
  },
  {
    id: 'JC-24',
    number: 24,
    name: '高尾',
    nameKana: 'たかお',
    nameEn: 'Takao',
    transfers: ['JR中央本線（大月方面）', '京王高尾線'],
    address: '東京都八王子市高尾町',
    platforms: { inbound: '2・3・4番線', outbound: '1・2番線' },
    stoppingTypes: ['local', 'rapid', 'commuter', 'special_rapid', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid', 'limitedExp'],
    osmNodeId: 6002844186
  }
];

// 各駅の最寄りノードインデックスを特定
let searchStart = 0;
const stationIndices = [];

for (const st of STATION_DEFS) {
  const nodeCoord = nodesMap.get(st.osmNodeId);
  let bestIdx = -1;
  let bestDist = Infinity;
  for (let i = searchStart; i < fullPolyline.length; i++) {
    const d = dist(nodeCoord, fullPolyline[i]);
    if (d < bestDist) {
      bestDist = d;
      bestIdx = i;
    }
  }
  stationIndices.push(bestIdx);
  searchStart = bestIdx;

  const snapped = fullPolyline[bestIdx];
  st.lat = parseFloat(snapped[0].toFixed(6));
  st.lng = parseFloat(snapped[1].toFixed(6));
}

// 駅間セグメントの作成（全23区間）
const segments = [];
for (let i = 0; i < STATION_DEFS.length - 1; i++) {
  const fromSt = STATION_DEFS[i];
  const toSt = STATION_DEFS[i + 1];
  const startIdx = stationIndices[i];
  const endIdx = stationIndices[i + 1];

  const segCoords = fullPolyline.slice(startIdx, endIdx + 1).map(c => [
    parseFloat(c[0].toFixed(6)),
    parseFloat(c[1].toFixed(6)),
  ]);

  segCoords[0] = [fromSt.lat, fromSt.lng];
  segCoords[segCoords.length - 1] = [toSt.lat, toSt.lng];

  segments.push({
    fromStationId: fromSt.id,
    toStationId: toSt.id,
    fromName: fromSt.name,
    toName: toSt.name,
    coordinates: segCoords,
  });
}

console.log(`Generated ${segments.length} track segments.`);

// stations.ts の出力
const stationsTsContent = `// JR中央線快速 駅定義（全24駅）
import type { Station } from '../../../types';

export const CHUO_STATIONS: Station[] = ${JSON.stringify(STATION_DEFS.map(s => ({
  id: s.id,
  lineId: 'chuo',
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
    waitingRoom: [1, 5, 6, 11, 12, 16, 19, 22, 24].includes(s.number),
    ticketOffice: [1, 2, 3, 4, 5, 6, 9, 11, 12, 13, 16, 18, 19, 22, 24].includes(s.number),
  },
  stoppingTypes: s.stoppingTypes,
  platforms: s.platforms,
})), null, 2)};
`;

fs.writeFileSync('src/data/lines/chuo/stations.ts', stationsTsContent, 'utf8');
console.log('Saved src/data/lines/chuo/stations.ts');

// trackGeometry.ts の出力
const trackGeometryTsContent = `// JR中央線快速 線路軌道ジオメトリ（全23区間）
import type { TrackSegment } from '../../../types';

export const CHUO_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(segments, null, 2)};
`;

fs.writeFileSync('src/data/lines/chuo/trackGeometry.ts', trackGeometryTsContent, 'utf8');
console.log('Saved src/data/lines/chuo/trackGeometry.ts');
