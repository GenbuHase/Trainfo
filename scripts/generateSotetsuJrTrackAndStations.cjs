const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cache/osm_sotetsu_jr_raw.json'), 'utf8'));

const nodesMap = new Map();
const waysMap = new Map();
for (const el of raw.elements) {
  if (el.type === 'node') nodesMap.set(el.id, el);
  if (el.type === 'way') waysMap.set(el.id, el);
}

const rel = raw.elements.find(e => e.id === 10322300);
const ways = rel.members.filter(m => m.type === 'way').map(m => waysMap.get(m.ref)).filter(Boolean);

function dist(p1, p2) {
  const dlat = (p1[0] - p2[0]) * 111000;
  const dlng = (p1[1] - p2[1]) * 91000;
  return Math.sqrt(dlat * dlat + dlng * dlng);
}

// 7駅の定義 (羽沢横浜国大 -> 新宿)
const STATIONS = [
  {
    id: 'SO-51',
    lineId: 'sotetsu_jr_direct',
    number: 1,
    name: '羽沢横浜国大',
    nameKana: 'はざわよこはまこくだい',
    nameEn: 'Hazawa yokohama-kokudai',
    lat: 35.4812978,
    lng: 139.5862267,
    transfers: ['相鉄新横浜線'],
    address: '神奈川県横浜市神奈川区羽沢南二丁目471-3',
    facilities: {
      hasElevator: true,
      hasEscalator: true,
      hasAccessibleToilet: true,
      hasWaitingRoom: false,
    },
  },
  {
    id: 'JS-15',
    lineId: 'sotetsu_jr_direct',
    number: 2,
    name: '武蔵小杉',
    nameKana: 'むさしこすぎ',
    nameEn: 'Musashi-Kosugi',
    lat: 35.5744653,
    lng: 139.6633332,
    transfers: ['JR横須賀線', 'JR湘南新宿ライン', 'JR南武線', '東急東横線', '東急目黒線'],
    address: '神奈川県川崎市中原区小杉町三丁目',
    facilities: {
      hasElevator: true,
      hasEscalator: true,
      hasAccessibleToilet: true,
      hasWaitingRoom: false,
    },
  },
  {
    id: 'JS-16',
    lineId: 'sotetsu_jr_direct',
    number: 3,
    name: '西大井',
    nameKana: 'にしおおい',
    nameEn: 'Nishi-Oi',
    lat: 35.6018647,
    lng: 139.721647,
    transfers: ['JR横須賀線', 'JR湘南新宿ライン'],
    address: '東京都品川区西大井一丁目3-2',
    facilities: {
      hasElevator: true,
      hasEscalator: true,
      hasAccessibleToilet: true,
      hasWaitingRoom: false,
    },
  },
  {
    id: 'JS-17',
    lineId: 'sotetsu_jr_direct',
    number: 4,
    name: '大崎',
    nameKana: 'おおさき',
    nameEn: 'Osaki',
    lat: 35.6192342,
    lng: 139.7281603,
    transfers: ['JR山手線', 'JR埼京線', 'JR湘南新宿ライン', '東京臨海高速鉄道りんかい線'],
    address: '東京都品川区大崎一丁目21-4',
    facilities: {
      hasElevator: true,
      hasEscalator: true,
      hasAccessibleToilet: true,
      hasWaitingRoom: false,
    },
  },
  {
    id: 'JS-18',
    lineId: 'sotetsu_jr_direct',
    number: 5,
    name: '恵比寿',
    nameKana: 'えびす',
    nameEn: 'Ebisu',
    lat: 35.6464471,
    lng: 139.7102242,
    transfers: ['JR山手線', 'JR埼京線', 'JR湘南新宿ライン', '東京メトロ日比谷線'],
    address: '東京都渋谷区恵比寿南一丁目5-5',
    facilities: {
      hasElevator: true,
      hasEscalator: true,
      hasAccessibleToilet: true,
      hasWaitingRoom: false,
    },
  },
  {
    id: 'JS-19',
    lineId: 'sotetsu_jr_direct',
    number: 6,
    name: '渋谷',
    nameKana: 'しぶや',
    nameEn: 'Shibuya',
    lat: 35.6580851,
    lng: 139.7017785,
    transfers: [
      'JR山手線', 'JR埼京線', 'JR湘南新宿ライン',
      '東急東横線', '東急田園都市線',
      '京王井の頭線',
      '東京メトロ銀座線', '東京メトロ半蔵門線', '東京メトロ副都心線'
    ],
    address: '東京都渋谷区道玄坂一丁目1-1',
    facilities: {
      hasElevator: true,
      hasEscalator: true,
      hasAccessibleToilet: true,
      hasWaitingRoom: false,
    },
  },
  {
    id: 'JS-20',
    lineId: 'sotetsu_jr_direct',
    number: 7,
    name: '新宿',
    nameKana: 'しんじゅく',
    nameEn: 'Shinjuku',
    lat: 35.6891409,
    lng: 139.7012854,
    transfers: [
      'JR山手線', 'JR中央線', 'JR中央・総武線各駅停車', 'JR埼京線', 'JR湘南新宿ライン',
      '小田急小田原線', '京王線', '京王新線',
      '東京メトロ丸ノ内線', '都営地下鉄新宿線', '都営地下鉄大江戸線'
    ],
    address: '東京都新宿区新宿三丁目38-1',
    facilities: {
      hasElevator: true,
      hasEscalator: true,
      hasAccessibleToilet: true,
      hasWaitingRoom: false,
    },
  },
];

// Way 50〜217 を1つの連続座標列にする
const fullCoords = [];
for (let i = 50; i <= 217; i++) {
  const w = ways[i];
  const pts = w.nodes.map(nid => {
    const n = nodesMap.get(nid);
    return [n.lat, n.lon];
  });

  if (fullCoords.length === 0) {
    fullCoords.push(...pts);
  } else {
    const lastPt = fullCoords[fullCoords.length - 1];
    const dDirect = dist(lastPt, pts[0]);
    const dRev = dist(lastPt, pts[pts.length - 1]);
    if (dRev < dDirect) {
      pts.reverse();
    }
    // 重複先頭を除外
    for (let k = 1; k < pts.length; k++) {
      fullCoords.push(pts[k]);
    }
  }
}

console.log('Total coordinates in continuous track:', fullCoords.length);

// 点間補間 (最大60m以内)
function interpolatePoints(points, maxStepMeters = 60) {
  const result = [];
  for (let i = 0; i < points.length; i++) {
    result.push(points[i]);
    if (i < points.length - 1) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const d = dist(p1, p2);
      if (d > maxStepMeters) {
        const steps = Math.ceil(d / maxStepMeters);
        for (let s = 1; s < steps; s++) {
          const t = s / steps;
          result.push([
            p1[0] + (p2[0] - p1[0]) * t,
            p1[1] + (p2[1] - p1[1]) * t,
          ]);
        }
      }
    }
  }
  return result;
}

// 7駅の位置を fullCoords 上でスナップして 6つのセグメントに分割
function findClosestIndex(coords, targetCoord) {
  let minD = Infinity;
  let minIdx = -1;
  for (let i = 0; i < coords.length; i++) {
    const d = dist(coords[i], targetCoord);
    if (d < minD) {
      minD = d;
      minIdx = i;
    }
  }
  return minIdx;
}

const stationIndices = STATIONS.map(s => findClosestIndex(fullCoords, [s.lat, s.lng]));
console.log('Station indices on track:', stationIndices);

// セグメント作成
const segments = [];
for (let i = 0; i < STATIONS.length - 1; i++) {
  const stFrom = STATIONS[i];
  const stTo = STATIONS[i + 1];
  const idxFrom = stationIndices[i];
  const idxTo = stationIndices[i + 1];

  let segPoints = fullCoords.slice(Math.min(idxFrom, idxTo), Math.max(idxFrom, idxTo) + 1);
  if (idxFrom > idxTo) {
    segPoints.reverse();
  }

  // 始点・終点を駅座標にスナップ
  segPoints[0] = [stFrom.lat, stFrom.lng];
  segPoints[segPoints.length - 1] = [stTo.lat, stTo.lng];

  // 補間
  const densePoints = interpolatePoints(segPoints, 60);

  segments.push({
    fromStationId: stFrom.id,
    toStationId: stTo.id,
    fromName: stFrom.name,
    toName: stTo.name,
    coordinates: densePoints,
  });
}

// ディレクトリ作成
const outDir = path.resolve(__dirname, '../src/data/lines/sotetsu_jr_direct');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// stations.ts 保存
const stationsTsContent = `// 相鉄・JR直通線 駅メタデータ定義
import type { Station } from '../../../types';

export const SOTETSU_JR_DIRECT_STATIONS: Station[] = ${JSON.stringify(STATIONS, null, 2)};
`;
fs.writeFileSync(path.join(outDir, 'stations.ts'), stationsTsContent, 'utf8');
console.log('✅ Created stations.ts');

// trackGeometry.ts 保存
const trackGeometryTsContent = `// 相鉄・JR直通線 線路幾何データ
import type { TrackSegment } from '../../../types';

export const SOTETSU_JR_DIRECT_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(segments, null, 2)};
`;
fs.writeFileSync(path.join(outDir, 'trackGeometry.ts'), trackGeometryTsContent, 'utf8');
console.log('✅ Created trackGeometry.ts');

// 監査
for (const seg of segments) {
  let maxStep = 0;
  for (let k = 0; k < seg.coordinates.length - 1; k++) {
    const d = dist(seg.coordinates[k], seg.coordinates[k + 1]);
    if (d > maxStep) maxStep = d;
  }
  console.log(`  [${seg.fromName} -> ${seg.toName}] points: ${seg.coordinates.length}, max step: ${maxStep.toFixed(1)}m`);
}
