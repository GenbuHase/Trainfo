const fs = require('fs');
const path = require('path');

const relData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cache/osm_hachiko_rel.json'), 'utf8'));

const adj = new Map();
const nodeMap = new Map();

for (const e of relData.elements) {
  if (e.type === 'node') {
    nodeMap.set(e.id, [e.lat, e.lon]);
  }
}

for (const e of relData.elements) {
  if (e.type === 'way') {
    const nodes = e.nodes;
    for (let i = 0; i < nodes.length - 1; i++) {
      const u = nodes[i];
      const v = nodes[i + 1];
      if (!adj.has(u)) adj.set(u, new Set());
      if (!adj.has(v)) adj.set(v, new Set());
      adj.get(u).add(v);
      adj.get(v).add(u);
    }
  }
}

function bfs(startId, targetId) {
  const queue = [[startId]];
  const visited = new Set([startId]);

  while (queue.length > 0) {
    const path = queue.shift();
    const curr = path[path.length - 1];

    if (curr === targetId) return path;

    const neighbors = adj.get(curr) || [];
    for (const next of neighbors) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push([...path, next]);
      }
    }
  }
  return null;
}

const p1 = bfs(5512805869, 8170394905);
const p2 = bfs(8170394905, 3558040325);
const fullPath = [...p1, ...p2.slice(1)];

const stationDefs = [
  { id: 'HA-01', number: 1, name: '八王子', nameKana: 'はちおうじ', nameEn: 'Hachioji', transfers: ['JR中央線', 'JR中央本線', 'JR横浜線', '京王線(京王八王子駅)'], address: '東京都八王子市旭町1-1', isMajor: true, coord: [35.6555613, 139.3395384] },
  { id: 'HA-02', number: 2, name: '北八王子', nameKana: 'きたはちおうじ', nameEn: 'Kita-Hachioji', transfers: [], address: '東京都八王子市石川町2961', isMajor: false, coord: [35.6693606, 139.3633747] },
  { id: 'HA-03', number: 3, name: '小宮', nameKana: 'こみや', nameEn: 'Komiya', transfers: [], address: '東京都八王子市小宮町1050', isMajor: false, coord: [35.6855431, 139.3688313] },
  { id: 'HA-04', number: 4, name: '拝島', nameKana: 'はいじま', nameEn: 'Haijima', transfers: ['JR青梅線', 'JR五日市線', '西武拝島線'], address: '東京都昭島市松原町四丁目14-4', isMajor: true, coord: [35.7212982, 139.3437261] },
  { id: 'HA-05', number: 5, name: '東福生', nameKana: 'ひがしふっさ', en: 'Higashi-Fussa', transfers: [], address: '東京都福生市大字福生2280', isMajor: false, coord: [35.7458031, 139.3359048] },
  { id: 'HA-06', number: 6, name: '箱根ケ崎', nameKana: 'はこねがさき', nameEn: 'Hakonegasaki', transfers: [], address: '東京都西多摩郡瑞穂町大字箱根ケ崎164-3', isMajor: true, coord: [35.771408, 139.3467092] },
  { id: 'HA-07', number: 7, name: '金子', nameKana: 'かねこ', nameEn: 'Kaneko', transfers: [], address: '埼玉県入間市大字南峯337-1', isMajor: false, coord: [35.8108799, 139.3285817] },
  { id: 'HA-08', number: 8, name: '東飯能', nameKana: 'ひがしはんのう', nameEn: 'Higashi-Hanno', transfers: ['西武池袋線'], address: '埼玉県飯能市東町1-6', isMajor: true, coord: [35.8532285, 139.3260274] },
  { id: 'HA-09', number: 9, name: '高麗川', nameKana: 'こまがわ', nameEn: 'Komagawa', transfers: ['JR川越線'], address: '埼玉県日高市大字原宿331-4', isMajor: true, coord: [35.8962994, 139.3380819] },
  { id: 'HA-10', number: 10, name: '毛呂', nameKana: 'もろ', nameEn: 'Moro', transfers: ['東武越生線(東毛呂駅)'], address: '埼玉県入間郡毛呂山町大字岩井2137-3', isMajor: false, coord: [35.9404195, 139.3094094] },
  { id: 'HA-11', number: 11, name: '越生', nameKana: 'おごせ', nameEn: 'Ogose', transfers: ['東武越生線'], address: '埼玉県入間郡越生町大字越生841-2', isMajor: true, coord: [35.9626349, 139.2994286] },
  { id: 'HA-12', number: 12, name: '明覚', nameKana: 'みょうかく', nameEn: 'Myokaku', transfers: [], address: '埼玉県比企郡ときがわ町大字番匠448-1', isMajor: false, coord: [36.0032853, 139.2889138] },
  { id: 'HA-13', number: 13, name: '小川町', nameKana: 'おがわまち', nameEn: 'Ogawamachi', transfers: ['東武東上線'], address: '埼玉県比企郡小川町大字大塚41-2', isMajor: true, coord: [36.0589611, 139.260866] },
  { id: 'HA-14', number: 14, name: '竹沢', nameKana: 'たけざわ', nameEn: 'Takezawa', transfers: [], address: '埼玉県比企郡小川町大字勝呂694-1', isMajor: false, coord: [36.0754682, 139.2301833] },
  { id: 'HA-15', number: 15, name: '折原', nameKana: 'おりはら', nameEn: 'Orihara', transfers: [], address: '埼玉県大里郡寄居町大字西ノ入337-1', isMajor: false, coord: [36.0962747, 139.1952968] },
  { id: 'HA-16', number: 16, name: '寄居', nameKana: 'よりい', nameEn: 'Yorii', transfers: ['東武東上線', '秩父鉄道秩父本線'], address: '埼玉県大里郡寄居町大字寄居1071-2', isMajor: true, coord: [36.1180302, 139.1938273] },
  { id: 'HA-17', number: 17, name: '用土', nameKana: 'ようど', nameEn: 'Yodo', transfers: [], address: '埼玉県大里郡寄居町大字用土1331-1', isMajor: false, coord: [36.1534467, 139.2010099] },
  { id: 'HA-18', number: 18, name: '松久', nameKana: 'まつひさ', nameEn: 'Matsuhisa', transfers: [], address: '埼玉県児玉郡美里町大字廣木1459-1', isMajor: false, coord: [36.1729932, 139.1821781] },
  { id: 'HA-19', number: 19, name: '児玉', nameKana: 'こだま', nameEn: 'Kodama', transfers: [], address: '埼玉県本庄市児玉町児玉236-2', isMajor: true, coord: [36.1926417, 139.1358278] },
  { id: 'HA-20', number: 20, name: '丹荘', nameKana: 'たんしょう', nameEn: 'Tansho', transfers: [], address: '埼玉県児玉郡神川町大字植竹615-1', isMajor: false, coord: [36.21685, 139.102258] },
  { id: 'HA-21', number: 21, name: '群馬藤岡', nameKana: 'ぐんまふじおか', nameEn: 'Gunma-Fujioka', transfers: [], address: '群馬県藤岡市藤岡375-1', isMajor: true, coord: [36.2501833, 139.0833167] },
  { id: 'HA-22', number: 22, name: '北藤岡', nameKana: 'きたふじおか', nameEn: 'Kita-Fujioka', transfers: ['JR高崎線'], address: '群馬県藤岡市立石1196-1', isMajor: false, coord: [36.2825333, 139.0805167] },
  { id: 'HA-23', number: 23, name: '倉賀野', nameKana: 'くらがの', nameEn: 'Kuragano', transfers: ['JR高崎線'], address: '群馬県高崎市倉賀野町1796-1', isMajor: true, coord: [36.3003061, 139.0491472] },
  { id: 'HA-24', number: 24, name: '高崎', nameKana: 'たかさき', nameEn: 'Takasaki', transfers: ['JR上越新幹線', 'JR北陸新幹線', 'JR高崎線', 'JR上越線', 'JR信越本線', 'JR両毛線', 'JR吾妻線', '上信電鉄上信線'], address: '群馬県高崎市八島町222', isMajor: true, coord: [36.3213208, 139.0124911] },
];

// 各駅をパスにスナップ
const stationIndices = [];
let lastIdx = -1;

for (let i = 0; i < stationDefs.length; i++) {
  const st = stationDefs[i];
  let bestIdx = -1;
  let bestDist = Infinity;
  for (let j = 0; j < fullPath.length; j++) {
    const c = nodeMap.get(fullPath[j]);
    const d = Math.hypot(c[0] - st.coord[0], c[1] - st.coord[1]) * 111000;
    if (d < bestDist) {
      bestDist = d;
      bestIdx = j;
    }
  }
  stationIndices.push(bestIdx);
  // 駅代表座標をパス上の厳密なスナップ点座標に合わせる
  const snapCoord = nodeMap.get(fullPath[bestIdx]);
  st.lat = snapCoord[0];
  st.lng = snapCoord[1];
}

console.log('Station indices:', stationIndices);

// stations.ts の生成
const stationsOut = `// JR八高線 駅定義 (八王子 〜 高崎 全24駅)
import type { Station } from '../../../types';

export const HACHIKO_STATIONS: Station[] = [
${stationDefs.map(s => `  {
    id: '${s.id}',
    lineId: 'hachiko',
    number: ${s.number},
    name: '${s.name}',
    nameKana: '${s.nameKana}',
    nameEn: '${s.nameEn || s.name}',
    lat: ${s.lat.toFixed(7)},
    lng: ${s.lng.toFixed(7)},
    transfers: ${JSON.stringify(s.transfers)},
    address: '${s.address}',
    platforms: { inbound: '上りホーム', outbound: '下りホーム' },
    stoppingTypes: ['local', 'regular'],
    isMajor: ${s.isMajor},
    facilities: {
      elevator: true,
      restroom: true,
      multipurposeToilet: true,
      waitingRoom: true,
      ticketOffice: ${s.isMajor},
    },
  },`).join('\n')}
];
`;

const stationsPath = path.resolve('src/data/lines/hachiko/stations.ts');
fs.mkdirSync(path.dirname(stationsPath), { recursive: true });
fs.writeFileSync(stationsPath, stationsOut, 'utf8');
console.log(`Saved stations to ${stationsPath}`);

// trackGeometry.ts の生成
const trackSegments = [];
for (let i = 0; i < stationDefs.length - 1; i++) {
  const fromSt = stationDefs[i];
  const toSt = stationDefs[i + 1];
  const startIdx = stationIndices[i];
  const endIdx = stationIndices[i + 1];

  const segNodes = fullPath.slice(startIdx, endIdx + 1);
  const segCoords = segNodes.map(id => nodeMap.get(id));

  trackSegments.push({
    fromStationId: fromSt.id,
    toStationId: toSt.id,
    fromName: fromSt.name,
    toName: toSt.name,
    coordinates: segCoords.map(([lat, lng]) => [Number(lat.toFixed(7)), Number(lng.toFixed(7))]),
  });
}

const trackOut = `// JR八高線 軌道幾何データ (八王子 〜 高崎 全23セグメント)
import type { TrackSegment } from '../../../types';

export const HACHIKO_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(trackSegments, null, 2)};
`;

const trackPath = path.resolve('src/data/lines/hachiko/trackGeometry.ts');
fs.writeFileSync(trackPath, trackOut, 'utf8');
console.log(`Saved trackGeometry to ${trackPath}`);
