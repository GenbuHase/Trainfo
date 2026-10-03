const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/osm_tx_raw.json', 'utf8'));

const nodesMap = new Map();
raw.elements.filter(e => e.type === 'node').forEach(n => {
  nodesMap.set(n.id, [n.lat, n.lon]);
});

const waysMap = new Map();
raw.elements.filter(e => e.type === 'way').forEach(w => {
  waysMap.set(w.id, w);
});

const rel4589046 = raw.elements.find(e => e.type === 'relation' && e.id === 4589046);
const memberWays = rel4589046.members.filter(m => m.type === 'way').map(m => waysMap.get(m.ref)).filter(Boolean);
const mainWays = memberWays.slice(5);

function dist(p1, p2) {
  const dlat = p1[0] - p2[0];
  const dlng = p1[1] - p2[1];
  return Math.sqrt(dlat * dlat + dlng * dlng);
}

const fullPolyline = [];

for (let i = 0; i < mainWays.length; i++) {
  const way = mainWays[i];
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

const STATION_DEFS = [
  { id: 'TX-01', number: 1, name: '秋葉原', nameKana: 'あきはばら', nameEn: 'Akihabara', transfers: ['JR山手線', 'JR京浜東北線', 'JR総武線各駅停車', '東京メトロ日比谷線'], address: '東京都千代田区神田佐久間町一丁目', platforms: { inbound: '1・2番線', outbound: '1・2番線' }, stoppingTypes: ['local', 'semi_rapid', 'commuter_rapid', 'rapid'], lat: 35.698462, lng: 139.775504 },
  { id: 'TX-02', number: 2, name: '新御徒町', nameKana: 'しんおかちまち', nameEn: 'Shin-Okachimachi', transfers: ['都営大江戸線'], address: '東京都台東区小島二丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semi_rapid', 'commuter_rapid', 'rapid'], lat: 35.707011, lng: 139.782029 },
  { id: 'TX-03', number: 3, name: '浅草', nameKana: 'あさくさ', nameEn: 'Asakusa', transfers: ['東京メトロ銀座線', '都営浅草線', '東武スカイツリーライン'], address: '東京都台東区西浅草三丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semi_rapid', 'commuter_rapid', 'rapid'], lat: 35.713617, lng: 139.792416 },
  { id: 'TX-04', number: 4, name: '南千住', nameKana: 'みなみせんじゅ', nameEn: 'Minami-Senju', transfers: ['JR常磐線各駅停車', 'JR常磐線快速', '東京メトロ日比谷線'], address: '東京都荒川区南千住四丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semi_rapid', 'commuter_rapid', 'rapid'], lat: 35.732854, lng: 139.798818 },
  { id: 'TX-05', number: 5, name: '北千住', nameKana: 'きたせんじゅ', nameEn: 'Kita-Senju', transfers: ['JR常磐線各駅停車', 'JR常磐線快速', '東京メトロ日比谷線', '東京メトロ千代田線', '東武スカイツリーライン'], address: '東京都足立区千住旭町', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semi_rapid', 'commuter_rapid', 'rapid'], lat: 35.748916, lng: 139.804754 },
  { id: 'TX-06', number: 6, name: '青井', nameKana: 'あおい', nameEn: 'Aoi', transfers: [], address: '東京都足立区青井三丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'], lat: 35.771744, lng: 139.820310 },
  { id: 'TX-07', number: 7, name: '六町', nameKana: 'ろくちょう', nameEn: 'Rokucho', transfers: [], address: '東京都足立区六町四丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semi_rapid', 'commuter_rapid'], lat: 35.784857, lng: 139.821868 },
  { id: 'TX-08', number: 8, name: '八潮', nameKana: 'やしお', nameEn: 'Yashio', transfers: [], address: '埼玉県八潮市大字大瀬', platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'semi_rapid', 'commuter_rapid', 'rapid'], lat: 35.807828, lng: 139.844865 },
  { id: 'TX-09', number: 9, name: '三郷中央', nameKana: 'みさとちゅうおう', nameEn: 'Misato-chuo', transfers: [], address: '埼玉県三郷市中央一丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semi_rapid'], lat: 35.824554, lng: 139.878411 },
  { id: 'TX-10', number: 10, name: '南流山', nameKana: 'みなみながれやま', nameEn: 'Minami-Nagareyama', transfers: ['JR武蔵野線'], address: '千葉県流山市南流山二丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semi_rapid', 'commuter_rapid', 'rapid'], lat: 35.838511, lng: 139.903069 },
  { id: 'TX-11', number: 11, name: '流山セントラルパーク', nameKana: 'ながれやまぜんとらるぱーく', nameEn: 'Nagareyama-centralpark', transfers: [], address: '千葉県流山市前平井', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'], lat: 35.854607, lng: 139.915240 },
  { id: 'TX-12', number: 12, name: '流山おおたかの森', nameKana: 'ながれやまおおたかのもり', nameEn: 'Nagareyama-otakanomori', transfers: ['東武アーバンパークライン'], address: '千葉県流山市おおたかの森西一丁目', platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'semi_rapid', 'commuter_rapid', 'rapid'], lat: 35.871841, lng: 139.925071 },
  { id: 'TX-13', number: 13, name: '柏の葉キャンパス', nameKana: 'かしわのはきゃんぱす', nameEn: 'Kashiwanoha-campus', transfers: [], address: '千葉県柏市若柴', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semi_rapid', 'commuter_rapid'], lat: 35.893448, lng: 139.952533 },
  { id: 'TX-14', number: 14, name: '柏たなか', nameKana: 'かしわたなか', nameEn: 'Kashiwa-tanaka', transfers: [], address: '千葉県柏市小青田', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'], lat: 35.911004, lng: 139.957572 },
  { id: 'TX-15', number: 15, name: '守谷', nameKana: 'もりや', nameEn: 'Moriya', transfers: ['関東鉄道常総線'], address: '茨城県守谷市中央四丁目', platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local', 'semi_rapid', 'commuter_rapid', 'rapid'], lat: 35.950117, lng: 139.991930 },
  { id: 'TX-16', number: 16, name: 'みらい平', nameKana: 'みらいだいら', nameEn: 'Miraidaira', transfers: [], address: '茨城県つくばみらい市陽光台一丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semi_rapid'], lat: 35.994451, lng: 140.038253 },
  { id: 'TX-17', number: 17, name: 'みどりの', nameKana: 'みどりの', nameEn: 'Midorino', transfers: [], address: '茨城県つくば市みどりの一丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semi_rapid'], lat: 36.029861, lng: 140.056339 },
  { id: 'TX-18', number: 18, name: '万博記念公園', nameKana: 'ばんぱくきねんこうえん', nameEn: 'Bampaku-kinenkoen', transfers: [], address: '茨城県つくば市島名', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semi_rapid'], lat: 36.058320, lng: 140.059491 },
  { id: 'TX-19', number: 19, name: '研究学園', nameKana: 'けんきゅうがくえん', nameEn: 'Kenkyu-gakuen', transfers: [], address: '茨城県つくば市研究学園五丁目', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local', 'semi_rapid', 'commuter_rapid'], lat: 36.082134, lng: 140.082413 },
  { id: 'TX-20', number: 20, name: 'つくば', nameKana: 'つくば', nameEn: 'Tsukuba', transfers: [], address: '茨城県つくば市吾妻二丁目', platforms: { inbound: '1・2番線', outbound: '1・2番線' }, stoppingTypes: ['local', 'semi_rapid', 'commuter_rapid', 'rapid'], lat: 36.082650, lng: 140.111194 },
];

// 各駅の最寄りインデックスをスナップ
let searchStart = 0;
const stationIndices = [];

for (const st of STATION_DEFS) {
  let bestIdx = -1;
  let bestDist = Infinity;
  for (let i = searchStart; i < fullPolyline.length; i++) {
    const d = dist([st.lat, st.lng], fullPolyline[i]);
    if (d < bestDist) {
      bestDist = d;
      bestIdx = i;
    }
  }
  stationIndices.push(bestIdx);
  searchStart = bestIdx;
}

// 駅の緯度経度を線路上の点にスナップ（秋葉原とつくばは線路端点）
for (let i = 0; i < STATION_DEFS.length; i++) {
  const snappedCoord = fullPolyline[stationIndices[i]];
  // 誤差数メートル以内なので線路上の点そのものを使用することで、駅と線路が完全に合致します
  STATION_DEFS[i].lat = parseFloat(snappedCoord[0].toFixed(6));
  STATION_DEFS[i].lng = parseFloat(snappedCoord[1].toFixed(6));
}

// 駅間セグメントの作成（全19区間）
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

  // 端点を駅座標と厳密に一致させる
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
const stationsTsContent = `// 首都圏新都市鉄道つくばエクスプレス 駅定義（全20駅）
import type { Station } from '../../../types';

export const TX_STATIONS: Station[] = ${JSON.stringify(STATION_DEFS.map(s => ({
  id: s.id,
  lineId: 'tsukuba_express',
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
    waitingRoom: [1, 5, 8, 10, 12, 15, 20].includes(s.number),
    ticketOffice: [1, 5, 12, 15, 20].includes(s.number),
  },
  stoppingTypes: s.stoppingTypes,
  platforms: s.platforms,
})), null, 2)};
`;

fs.writeFileSync('src/data/lines/tsukuba_express/stations.ts', stationsTsContent, 'utf8');
console.log('Saved src/data/lines/tsukuba_express/stations.ts');

// trackGeometry.ts の出力
const trackGeometryTsContent = `// 首都圏新都市鉄道つくばエクスプレス 線路軌道ジオメトリ（全19区間）
import type { TrackSegment } from '../../../types';

export const TX_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(segments, null, 2)};
`;

fs.writeFileSync('src/data/lines/tsukuba_express/trackGeometry.ts', trackGeometryTsContent, 'utf8');
console.log('Saved src/data/lines/tsukuba_express/trackGeometry.ts');
