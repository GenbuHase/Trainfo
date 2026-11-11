// JR仙石線・JR仙石東北ライン・JR石巻線・JR陸羽東線・JR陸羽西線 軌道ジオメトリ & 駅データ一括生成スクリプト
const fs = require('fs');
const path = require('path');
const { distMeters, subdivideCoordinates } = require('./common/geometryBuilderUtils.cjs');

function normKe(s) {
  return (s || '').replace(/ヶ/g, 'ケ').replace(/駅$/, '').trim();
}

function angleDeg(p1, p2, p3) {
  const latFactor = Math.cos((p2[0] * Math.PI) / 180);
  const v1 = [p2[0] - p1[0], (p2[1] - p1[1]) * latFactor];
  const v2 = [p3[0] - p2[0], (p3[1] - p2[1]) * latFactor];
  const dot = v1[0] * v2[0] + v1[1] * v2[1];
  const m1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
  const m2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
  if (m1 === 0 || m2 === 0) return 0;
  const cos = Math.max(-1, Math.min(1, dot / (m1 * m2)));
  return (Math.acos(cos) * 180) / Math.PI;
}

function distToSegment(p, a, b) {
  const latFactor = Math.cos(((a[0] + b[0]) / 2) * (Math.PI / 180));
  const px = (p[1] - a[1]) * latFactor;
  const py = p[0] - a[0];
  const vx = (b[1] - a[1]) * latFactor;
  const vy = b[0] - a[0];
  const d2 = vx * vx + vy * vy;
  if (d2 === 0) return distMeters(p, a);
  let t = (px * vx + py * vy) / d2;
  t = Math.max(0, Math.min(1, t));
  const proj = [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
  return distMeters(p, proj);
}

// 2本のポリライン間の最大離隔（駅前後250mを除外し点対線分距離で正確に計測）
function maxMidPolylineSeparation(coordsA, coordsB, coordStart, coordEnd) {
  const midA = coordsA.filter((p) => distMeters(p, coordStart) > 250 && distMeters(p, coordEnd) > 250);
  let maxSep = 0;
  for (const p of midA) {
    let minD = Infinity;
    for (let j = 0; j < coordsB.length - 1; j++) {
      const d = distToSegment(p, coordsB[j], coordsB[j + 1]);
      if (d < minD) minD = d;
    }
    if (minD > maxSep) maxSep = minD;
  }
  return maxSep;
}

// 端点スナップ時に駅中心へ引き戻すUターン・鋭角トゲを除去する
function cleanEndpointSpikes(coords, startCoord, endCoord) {
  let pts = coords.slice();
  while (pts.length >= 3) {
    const d0 = distMeters(startCoord, pts[0]);
    const d1 = distMeters(startCoord, pts[1]);
    if (d0 < 25 || (d1 < d0 && d0 < 120)) {
      pts.shift();
    } else if (angleDeg(startCoord, pts[0], pts[1]) > 135) {
      pts.shift();
    } else {
      break;
    }
  }
  while (pts.length >= 3) {
    const n = pts.length;
    const dLast = distMeters(endCoord, pts[n - 1]);
    const dPrev = distMeters(endCoord, pts[n - 2]);
    if (dLast < 25 || (dPrev < dLast && dLast < 120)) {
      pts.pop();
    } else if (angleDeg(pts[n - 2], pts[n - 1], endCoord) > 135) {
      pts.pop();
    } else {
      break;
    }
  }
  pts = [startCoord, ...pts, endCoord];

  const deduped = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    if (distMeters(deduped[deduped.length - 1], pts[i]) >= 1.5 || i === pts.length - 1) {
      deduped.push(pts[i]);
    }
  }
  let changed = true;
  let cleaned = deduped;
  let guard = 0;
  while (changed && guard < 10) {
    changed = false;
    guard++;
    const next = [cleaned[0]];
    for (let i = 1; i < cleaned.length - 1; i++) {
      const deg = angleDeg(next[next.length - 1], cleaned[i], cleaned[i + 1]);
      if (deg > 135) {
        changed = true;
        continue;
      }
      next.push(cleaned[i]);
    }
    next.push(cleaned[cleaned.length - 1]);
    cleaned = next;
  }
  return cleaned;
}

function dijkstra(adj, startId, goalId) {
  if (startId === goalId) return { nodes: [startId], ways: [], totalDist: 0 };
  const dist = new Map([[startId, 0]]);
  const prev = new Map();
  const pq = [[0, startId]];
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift();
    if (d > (dist.get(u) ?? Infinity)) continue;
    if (u === goalId) {
      const nodes = [];
      const ways = [];
      let c = u;
      while (prev.has(c)) {
        const pr = prev.get(c);
        nodes.push(c);
        ways.push(pr.wid);
        c = pr.u;
      }
      nodes.push(startId);
      return { nodes: nodes.reverse(), ways: ways.reverse(), totalDist: d };
    }
    for (const e of adj.get(u) || []) {
      const nd = d + e.dist;
      if (nd < (dist.get(e.to) ?? Infinity)) {
        dist.set(e.to, nd);
        prev.set(e.to, { u, wid: e.wid });
        pq.push([nd, e.to]);
      }
    }
  }
  return null;
}

function buildAdjFromWays(wayIds, waysMap, nodeMap) {
  const adj = new Map();
  for (const wid of wayIds) {
    const w = waysMap.get(wid);
    if (!w) continue;
    for (let i = 0; i < w.nodes.length - 1; i++) {
      const u = w.nodes[i];
      const v = w.nodes[i + 1];
      const pu = nodeMap.get(u);
      const pv = nodeMap.get(v);
      if (!pu || !pv) continue;
      const d = distMeters(pu, pv);
      if (!adj.has(u)) adj.set(u, []);
      if (!adj.has(v)) adj.set(v, []);
      adj.get(u).push({ to: v, dist: d, wid });
      adj.get(v).push({ to: u, dist: d, wid });
    }
  }
  return adj;
}

// 最大連結成分のノードセットを取得（孤立した駅構内側線への誤スナップ防止）
function getLargestComponentNodes(adj) {
  const visited = new Set();
  let best = new Set();
  for (const start of adj.keys()) {
    if (visited.has(start)) continue;
    const comp = new Set([start]);
    const q = [start];
    visited.add(start);
    while (q.length > 0) {
      const u = q.shift();
      for (const e of adj.get(u) || []) {
        if (!visited.has(e.to)) {
          visited.add(e.to);
          comp.add(e.to);
          q.push(e.to);
        }
      }
    }
    if (comp.size > best.size) best = comp;
  }
  return best;
}

function closestNodeInComponent(coord, compNodes, nodeMap) {
  let best = null;
  let minD = Infinity;
  for (const nid of compNodes) {
    const p = nodeMap.get(nid);
    const d = distMeters(coord, p);
    if (d < minD) {
      minD = d;
      best = nid;
    }
  }
  return best;
}

function allCandidatesInComponent(coord, compNodes, nodeMap, maxDistMeters = 65) {
  const cands = [];
  for (const nid of compNodes) {
    const p = nodeMap.get(nid);
    const d = distMeters(coord, p);
    if (d <= maxDistMeters) cands.push({ nid, d });
  }
  cands.sort((a, b) => a.d - b.d);
  if (cands.length === 0) {
    cands.push({ nid: closestNodeInComponent(coord, compNodes, nodeMap), d: 0 });
  }
  return cands.slice(0, 10);
}

// 主要駅・乗換駅フラグ
const MAJOR_STATIONS = new Set([
  'あおば通', '仙台', '多賀城', '本塩釜', '東塩釜', '松島海岸', '高城町', '野蒜', '矢本', '石巻',
  '塩釜', '小牛田', '涌谷', '前谷地', '女川',
  '古川', '岩出山', '鳴子温泉', '最上', '新庄',
  '古口', '余目',
]);

// 境界駅の既存座標アンカー（0.0m シームレスハンドオーバー用）
const COORD_ANCHORS = {
  'senseki:仙台': [38.2603516, 140.8823921], // 仙石線地下駅ノード
  'senseki_tohoku:塩釜': [38.3095493, 141.0095384], // TSI-06 塩釜一致
  'ishinomaki:小牛田': [38.5411042, 141.0643405], // TSI-12 小牛田一致
  'rikuu_east:小牛田': [38.5411042, 141.0643405], // TSI-12 小牛田一致
  'rikuu_east:新庄': [38.7625553, 140.3060085], // OFS-35 新庄一致
  'rikuu_west:新庄': [38.7625553, 140.3060085], // OFS-35 新庄一致
  'rikuu_west:余目': [38.844264, 139.9115592], // UE-34 余目一致
};

// 読み仮名・英語名フォールバック辞書
const STATION_READING_FALLBACK = {
  'あおば通': ['あおばどおり', 'Aoba-dōri'],
  '仙台': ['せんだい', 'Sendai'],
  '榴ケ岡': ['つつじがおか', 'Tsutsujigaoka'],
  '宮城野原': ['みやぎのはら', 'Miyaginohara'],
  '陸前原ノ町': ['りくぜんはらのまち', 'Rikuzen-Haranomachi'],
  '苦竹': ['にがたけ', 'Nigatake'],
  '小鶴新田': ['こづるしんでん', 'Kozurushinden'],
  '福田町': ['ふくだまち', 'Fukudamachi'],
  '陸前高砂': ['りくぜんたかさご', 'Rikuzen-Takasago'],
  '中野栄': ['なかのさかえ', 'Nakanosakae'],
  '多賀城': ['たがじょう', 'Tagajō'],
  '下馬': ['げば', 'Geba'],
  '西塩釜': ['にししおがま', 'Nishi-Shiogama'],
  '本塩釜': ['ほんしおがま', 'Hon-Shiogama'],
  '東塩釜': ['ひがししおがま', 'Higashi-Shiogama'],
  '陸前浜田': ['りくぜんはまだ', 'Rikuzen-Hamada'],
  '松島海岸': ['まつしまかいがん', 'Matsushimakaigan'],
  '高城町': ['たかぎまち', 'Takagimachi'],
  '手樽': ['てたる', 'Tetaru'],
  '陸前富山': ['りくぜんとみやま', 'Rikuzen-Tomiyama'],
  '陸前大塚': ['りくぜんおおつか', 'Rikuzen-Ōtsuka'],
  '東名': ['とうな', 'Tōna'],
  '野蒜': ['のびる', 'Nobiru'],
  '陸前小野': ['りくぜんおの', 'Rikuzen-Ono'],
  '鹿妻': ['かづま', 'Kazuma'],
  '矢本': ['やもと', 'Yamoto'],
  '東矢本': ['ひがしやもと', 'Higashi-Yamoto'],
  '陸前赤井': ['りくぜんあかい', 'Rikuzen-Akai'],
  '石巻あゆみ野': ['いしのまきあゆみの', 'Ishinomakiayumino'],
  '蛇田': ['へびた', 'Hebita'],
  '陸前山下': ['りくぜんやました', 'Rikuzen-Yamashita'],
  '石巻': ['いしのまき', 'Ishinomaki'],
  '塩釜': ['しおがま', 'Shiogama'],
  '小牛田': ['こごた', 'Kogota'],
  '上涌谷': ['かみわくや', 'Kami-Wakuya'],
  '涌谷': ['わくや', 'Wakuya'],
  '前谷地': ['まえやち', 'Maeyachi'],
  '佳景山': ['かけやま', 'Kakeyama'],
  '鹿又': ['かのまた', 'Kanomata'],
  '曽波神': ['そばのかみ', 'Sobanokami'],
  '陸前稲井': ['りくぜんいない', 'Rikuzen-Inai'],
  '渡波': ['わたのは', 'Watanoha'],
  '万石浦': ['まんごくうら', 'Mangokuura'],
  '沢田': ['さわだ', 'Sawada'],
  '浦宿': ['うらしゅく', 'Urashuku'],
  '女川': ['おながわ', 'Onagawa'],
  '北浦': ['きたうら', 'Kitaura'],
  '陸前谷地': ['りくぜんやち', 'Rikuzen-Yachi'],
  '古川': ['ふるかわ', 'Furukawa'],
  '塚目': ['つかのめ', 'Tsukanome'],
  '西古川': ['にしふるかわ', 'Nishi-Furukawa'],
  '東大崎': ['ひがしおおさき', 'Higashi-Ōsaki'],
  '西大崎': ['にしおおさき', 'Nishi-Ōsaki'],
  '岩出山': ['いわでやま', 'Iwadeyama'],
  '有備館': ['ゆうびかん', 'Yūbikan'],
  '上野目': ['かみのめ', 'Kaminome'],
  '池月': ['いけづき', 'Ikezuki'],
  '川渡温泉': ['かわたびおんせん', 'Kawatabi-Onsen'],
  '鳴子御殿湯': ['なるこごてんゆ', 'Naruko-Gotenyu'],
  '鳴子温泉': ['なるこおんせん', 'Naruko-Onsen'],
  '中山平温泉': ['なかやまだいらおんせん', 'Nakayamadaira-Onsen'],
  '堺田': ['さかいだ', 'Sakaida'],
  '赤倉温泉': ['あかくらおんせん', 'Akakura-Onsen'],
  '立小路': ['たちこうじ', 'Tachikōji'],
  '最上': ['もがみ', 'Mogami'],
  '大堀': ['おおほり', 'Ōhori'],
  '鵜杉': ['うすぎ', 'Usugi'],
  '瀬見温泉': ['せみおんせん', 'Semi-Onsen'],
  '東長沢': ['ひがしながさわ', 'Higashi-Nagasawa'],
  '長沢': ['ながさわ', 'Nagasawa'],
  '南新庄': ['みなみしんじょう', 'Minami-Shinjō'],
  '新庄': ['しんじょう', 'Shinjō'],
  '升形': ['ますかた', 'Masukata'],
  '羽前前波': ['うぜんぜんなみ', 'Uzen-Zennami'],
  '津谷': ['つや', 'Tsuya'],
  '古口': ['ふるくち', 'Furukuchi'],
  '高屋': ['たかや', 'Takaya'],
  '清川': ['きよかわ', 'Kiyokawa'],
  '狩川': ['かりかわ', 'Karikawa'],
  '南野': ['みなみの', 'Minamino'],
  '余目': ['あまるめ', 'Amarume'],
};

// 都道府県解決
function getPrefecture(lineId, stationName) {
  if (lineId === 'rikuu_west') return '山形県';
  if (lineId === 'rikuu_east') {
    const yamagata = new Set([
      '堺田', '赤倉温泉', '立小路', '最上', '大堀', '鵜杉',
      '瀬見温泉', '東長沢', '長沢', '南新庄', '新庄',
    ]);
    return yamagata.has(stationName) ? '山形県' : '宮城県';
  }
  return '宮城県';
}

// 乗換路線リスト定義
const TRANSFERS_BY_LINE_AND_STATION = {
  senseki: {
    'あおば通': ['仙台市地下鉄南北線'],
    '仙台': [
      'JR東北本線（福島～仙台）', 'JR東北本線（仙台～一ノ関）', 'JR常磐線（いわき～仙台）',
      'JR仙山線', 'JR仙石東北ライン', '仙台空港アクセス線',
      '東北新幹線', '秋田新幹線', '仙台市地下鉄南北線', '仙台市地下鉄東西線',
    ],
    '高城町': ['JR仙石東北ライン'],
    '石巻': ['JR石巻線', 'JR仙石東北ライン'],
  },
  senseki_tohoku: {
    '塩釜': ['JR東北本線（仙台～一ノ関）'],
    '高城町': ['JR仙石線'],
  },
  ishinomaki: {
    '小牛田': ['JR東北本線（仙台～一ノ関）', 'JR陸羽東線'],
    '前谷地': ['JR気仙沼線'],
    '石巻': ['JR仙石線', 'JR仙石東北ライン'],
  },
  rikuu_east: {
    '小牛田': ['JR東北本線（仙台～一ノ関）', 'JR石巻線'],
    '古川': ['東北新幹線'],
    '新庄': ['JR山形新幹線', 'JR奥羽本線（福島～新庄）', 'JR奥羽本線（新庄～大曲）', 'JR陸羽西線'],
  },
  rikuu_west: {
    '新庄': ['JR山形新幹線', 'JR奥羽本線（福島～新庄）', 'JR奥羽本線（新庄～大曲）', 'JR陸羽東線'],
    '余目': ['JR羽越本線'],
  },
};

const LINE_SPECS = [
  {
    lineId: 'senseki',
    exportPrefix: 'SENSEKI',
    exportLineVar: 'sensekiLine',
    name: 'JR仙石線',
    shortName: '仙石線',
    operator: 'JR東日本',
    lineColor: '#00aaee',
    accentColor: '#0088cc',
    defaultCars: 4,
    prefix: 'SS',
    downRelIds: [1862832],
    upRelIds: [11366305],
    useSensekiNamed: true,
    inGroupId: '550',
    outGroupId: '551',
    directionNames: {
      inbound: '仙台・あおば通方面',
      outbound: '松島海岸・石巻方面',
      inboundFull: '上り 多賀城・仙台・あおば通方面',
      outboundFull: '下り 多賀城・高城町・石巻方面',
      inboundShort: 'あおば通方面',
      outboundShort: '石巻方面',
    },
    stationNames: [
      'あおば通', '仙台', '榴ケ岡', '宮城野原', '陸前原ノ町', '苦竹', '小鶴新田', '福田町', '陸前高砂', '中野栄',
      '多賀城', '下馬', '西塩釜', '本塩釜', '東塩釜', '陸前浜田', '松島海岸', '高城町', '手樽', '陸前富山',
      '陸前大塚', '東名', '野蒜', '陸前小野', '鹿妻', '矢本', '東矢本', '陸前赤井', '石巻あゆみ野', '蛇田',
      '陸前山下', '石巻',
    ],
  },
  {
    lineId: 'senseki_tohoku',
    exportPrefix: 'SENSEKI_TOHOKU',
    exportLineVar: 'sensekiTohokuLine',
    name: 'JR仙石東北ライン',
    shortName: '仙石東北ライン',
    operator: 'JR東日本',
    lineColor: '#e85298',
    accentColor: '#00bb85',
    defaultCars: 4,
    prefix: 'ST',
    downRelIds: [11987946, 5596395, 11987947],
    upRelIds: [5596395, 11987946, 11987947],
    includeTohokuRails: true,
    directionNames: {
      inbound: '塩釜・仙台方面',
      outbound: '高城町・石巻方面',
      inboundFull: '上り 塩釜・仙台方面',
      outboundFull: '下り 高城町・矢本・石巻方面',
      inboundShort: '仙台方面',
      outboundShort: '石巻方面',
    },
    stationNames: ['塩釜', '高城町'],
  },
  {
    lineId: 'ishinomaki',
    exportPrefix: 'ISHINOMAKI',
    exportLineVar: 'ishinomakiLine',
    name: 'JR石巻線',
    shortName: '石巻線',
    operator: 'JR東日本',
    lineColor: '#ed77a4',
    accentColor: '#c2185b',
    defaultCars: 2,
    prefix: 'IS',
    downRelIds: [1873087],
    upRelIds: [1873087],
    inGroupId: '500',
    outGroupId: '501',
    directionNames: {
      inbound: '涌谷・小牛田方面',
      outbound: '石巻・女川方面',
      inboundFull: '上り 前谷地・小牛田方面',
      outboundFull: '下り 石巻・女川方面',
      inboundShort: '小牛田方面',
      outboundShort: '女川方面',
    },
    stationNames: [
      '小牛田', '上涌谷', '涌谷', '前谷地', '佳景山', '鹿又', '曽波神', '石巻',
      '陸前稲井', '渡波', '万石浦', '沢田', '浦宿', '女川',
    ],
  },
  {
    lineId: 'rikuu_east',
    exportPrefix: 'RIKUU_EAST',
    exportLineVar: 'rikuuEastLine',
    name: 'JR陸羽東線',
    shortName: '陸羽東線',
    operator: 'JR東日本',
    lineColor: '#75787a',
    accentColor: '#475569',
    defaultCars: 2,
    prefix: 'RE',
    downRelIds: [1873088],
    upRelIds: [1873088],
    inGroupId: '510',
    outGroupId: '511',
    hasSubstitutionBus: true,
    directionNames: {
      inbound: '古川・小牛田方面',
      outbound: '鳴子温泉・新庄方面',
      inboundFull: '上り 鳴子温泉・古川・小牛田方面',
      outboundFull: '下り 古川・鳴子温泉・新庄方面',
      inboundShort: '小牛田方面',
      outboundShort: '新庄方面',
    },
    stationNames: [
      '小牛田', '北浦', '陸前谷地', '古川', '塚目', '西古川', '東大崎', '西大崎',
      '岩出山', '有備館', '上野目', '池月', '川渡温泉', '鳴子御殿湯', '鳴子温泉',
      '中山平温泉', '堺田', '赤倉温泉', '立小路', '最上', '大堀', '鵜杉', '瀬見温泉',
      '東長沢', '長沢', '南新庄', '新庄',
    ],
  },
  {
    lineId: 'rikuu_west',
    exportPrefix: 'RIKUU_WEST',
    exportLineVar: 'rikuuWestLine',
    name: 'JR陸羽西線',
    shortName: '陸羽西線',
    operator: 'JR東日本',
    lineColor: '#6fbf7f',
    accentColor: '#3d8b4e',
    defaultCars: 2,
    prefix: 'RW',
    downRelIds: [1876849],
    upRelIds: [1876849],
    inGroupId: '530',
    outGroupId: '531',
    passOnlyStations: new Set(['羽前前波', '高屋']),
    directionNames: {
      inbound: '古口・新庄方面',
      outbound: '古口・余目方面',
      inboundFull: '上り 古口・新庄方面',
      outboundFull: '下り 古口・余目・酒田方面',
      inboundShort: '新庄方面',
      outboundShort: '余目・酒田方面',
    },
    stationNames: [
      '新庄', '升形', '羽前前波', '津谷', '古口', '高屋', '清川', '狩川', '南野', '余目',
    ],
  },
];

// キャッシュロード
const osmBranches = JSON.parse(fs.readFileSync('scripts/cache/osm_tohoku_branches.json', 'utf8'));
const osmSendaiIchinoseki = JSON.parse(fs.readFileSync('scripts/cache/osm_rails_sendai_ichinoseki.json', 'utf8'));
const osmSensekiNamed = JSON.parse(fs.readFileSync('scripts/cache/osm_senseki_named_rails.json', 'utf8'));
const osmStationsRaw = JSON.parse(fs.readFileSync('scripts/cache/osm_tohoku_branch_stations.json', 'utf8'));
const yahooStations = JSON.parse(fs.readFileSync('scripts/cache/tohoku_branches_yahoo_stations.json', 'utf8'));

const relsMap = new Map();
const waysMap = new Map();
const nodeMap = new Map();

for (const d of [osmBranches, osmSendaiIchinoseki, osmSensekiNamed]) {
  for (const e of d.elements) {
    if (e.type === 'node') nodeMap.set(e.id, [e.lat, e.lon]);
    else if (e.type === 'way') waysMap.set(e.id, e);
    else if (e.type === 'relation') relsMap.set(e.id, e);
  }
}

const sensekiNamedWayIds = new Set(
  osmSensekiNamed.elements.filter((e) => e.type === 'way' && e.tags?.railway === 'rail').map((e) => e.id)
);

const stNodesByName = new Map();
for (const e of osmStationsRaw.elements) {
  if (e.type !== 'node' || !e.tags?.name) continue;
  const key = normKe(e.tags.name);
  if (!stNodesByName.has(key)) stNodesByName.set(key, []);
  stNodesByName.get(key).push(e);
}

for (const spec of LINE_SPECS) {
  // 1. 軌道グラフ構築（下り・上り別に重み付き独立構築）
  function buildDirectedGraph(preferRelIds, avoidRelIds, includeTohokuRails, useSensekiNamed) {
    const preferSet = new Set();
    const avoidSet = new Set();
    for (const rid of preferRelIds) {
      const r = relsMap.get(rid);
      if (!r) throw new Error(`Missing OSM relation ${rid}`);
      r.members.filter((m) => m.type === 'way').forEach((m) => preferSet.add(m.ref));
    }
    for (const rid of avoidRelIds) {
      const r = relsMap.get(rid);
      if (r) r.members.filter((m) => m.type === 'way').forEach((m) => avoidSet.add(m.ref));
    }

    const weightedWaySets = new Set(preferSet);
    if (useSensekiNamed) {
      sensekiNamedWayIds.forEach((wid) => weightedWaySets.add(wid));
    }
    if (includeTohokuRails) {
      for (const e of osmSendaiIchinoseki.elements) {
        if (e.type === 'way' && e.tags?.railway === 'rail' && e.tags?.gauge !== '1435') {
          weightedWaySets.add(e.id);
        }
      }
    }

    const adj = new Map();
    for (const wid of weightedWaySets) {
      const w = waysMap.get(wid);
      if (!w) continue;
      const mult = preferSet.has(wid) ? 1.0 : avoidSet.has(wid) ? 30.0 : 3.0;
      for (let i = 0; i < w.nodes.length - 1; i++) {
        const u = w.nodes[i];
        const v = w.nodes[i + 1];
        const pu = nodeMap.get(u);
        const pv = nodeMap.get(v);
        if (!pu || !pv) continue;
        const d = distMeters(pu, pv) * mult;
        if (!adj.has(u)) adj.set(u, []);
        if (!adj.has(v)) adj.set(v, []);
        adj.get(u).push({ to: v, dist: d, wid });
        adj.get(v).push({ to: u, dist: d, wid });
      }
    }
    const mainComp = getLargestComponentNodes(adj);
    return { adj, mainComp };
  }

  const gDown = buildDirectedGraph(spec.downRelIds, spec.upRelIds[0] !== spec.downRelIds[0] ? spec.upRelIds : [], spec.includeTohokuRails, spec.useSensekiNamed);
  const gUp = buildDirectedGraph(spec.upRelIds, spec.downRelIds[0] !== spec.upRelIds[0] ? spec.downRelIds : [], spec.includeTohokuRails, spec.useSensekiNamed);

  // 2. 駅データ解決
  const stations = [];
  for (let i = 0; i < spec.stationNames.length; i++) {
    const nm = spec.stationNames[i];
    const id = `${spec.prefix}-${String(i + 1).padStart(2, '0')}`;
    const anchor = COORD_ANCHORS[`${spec.lineId}:${nm}`];
    const candidates = stNodesByName.get(normKe(nm)) || [];
    if (candidates.length === 0 && !anchor) {
      throw new Error(`OSM station node not found for ${spec.lineId}: ${nm}`);
    }

    let lat, lng;
    if (anchor) {
      [lat, lng] = anchor;
    } else {
      // メイン連結成分に最も近い候補ノードを選択
      let bestC = candidates[0];
      let bestD = Infinity;
      for (const c of candidates) {
        const nid = closestNodeInComponent([c.lat, c.lon], gDown.mainComp, nodeMap);
        const d = distMeters([c.lat, c.lon], nodeMap.get(nid));
        if (d < bestD) {
          bestD = d;
          bestC = c;
        }
      }
      lat = bestC.lat;
      lng = bestC.lon;
    }

    const [nameKana, nameEn] = STATION_READING_FALLBACK[nm] || [nm, nm];
    const isPassOnly = Boolean(spec.passOnlyStations?.has(nm));
    const pref = getPrefecture(spec.lineId, nm);
    const transfers = (TRANSFERS_BY_LINE_AND_STATION[spec.lineId]?.[nm] || []).slice();

    stations.push({
      id,
      lineId: spec.lineId,
      number: i + 1,
      name: nm,
      nameKana,
      nameEn,
      lat,
      lng,
      transfers,
      address: `${pref}${nm}駅周辺`,
      platforms: {
        inbound: '上りホーム',
        outbound: '下りホーム',
      },
      stoppingTypes: isPassOnly
        ? []
        : spec.hasSubstitutionBus
          ? ['regular', 'rapid', 'substitution_bus']
          : ['regular', 'rapid', 'special_rapid'],
      isMajor: MAJOR_STATIONS.has(nm),
      facilities: {
        elevator: MAJOR_STATIONS.has(nm),
        restroom: !isPassOnly,
        multipurposeToilet: MAJOR_STATIONS.has(nm),
        waitingRoom: true,
        ticketOffice: MAJOR_STATIONS.has(nm),
      },
    });
  }

  // 3. セグメント抽出・別線分離・スパイク除去
  const segments = [];
  let asymCount = 0;

  for (let i = 0; i < stations.length - 1; i++) {
    const stA = stations[i];
    const stB = stations[i + 1];
    const cA = [stA.lat, stA.lng];
    const cB = [stB.lat, stB.lng];

    const dnCandsA = allCandidatesInComponent(cA, gDown.mainComp, nodeMap);
    const dnCandsB = allCandidatesInComponent(cB, gDown.mainComp, nodeMap);
    let pathDown = null;
    for (const ca of dnCandsA) {
      for (const cb of dnCandsB) {
        const res = dijkstra(gDown.adj, ca.nid, cb.nid);
        if (res && (!pathDown || res.totalDist < pathDown.totalDist)) {
          pathDown = res;
        }
      }
    }
    if (!pathDown) throw new Error(`Missing down path: ${spec.lineId} ${stA.name} -> ${stB.name}`);

    const rawDown = pathDown.nodes.map((nid) => nodeMap.get(nid));
    const coordsDown = subdivideCoordinates(cleanEndpointSpikes(rawDown, cA, cB), 120);

    let isAsymmetric = false;
    let coordsUp = null;
    if (spec.downRelIds[0] !== spec.upRelIds[0]) {
      const upCandsA = allCandidatesInComponent(cA, gUp.mainComp, nodeMap);
      const upCandsB = allCandidatesInComponent(cB, gUp.mainComp, nodeMap);
      let pathUp = null;
      for (const ca of upCandsA) {
        for (const cb of upCandsB) {
          const res = dijkstra(gUp.adj, cb.nid, ca.nid);
          if (res && (!pathUp || res.totalDist < pathUp.totalDist)) {
            pathUp = res;
          }
        }
      }
      if (pathUp) {
        const rawUp = pathUp.nodes.map((nid) => nodeMap.get(nid));
        const cUpTmp = cleanEndpointSpikes(rawUp, cB, cA);
        const maxSep = maxMidPolylineSeparation(coordsDown, cUpTmp, cA, cB);
        const straight = distMeters(cA, cB);
        const lenU = cUpTmp.reduce((acc, p, idx) => (idx ? acc + distMeters(cUpTmp[idx - 1], p) : 0), 0);
        if (maxSep >= 40 && lenU / Math.max(1, straight) <= 1.6) {
          isAsymmetric = true;
          coordsUp = subdivideCoordinates(cUpTmp, 120);
          console.log(`  🔀 [別線] ${spec.lineId} ${stA.name} ↔ ${stB.name}: 最大離隔 ${maxSep.toFixed(1)}m`);
        }
      }
    }

    if (isAsymmetric && coordsUp) {
      asymCount++;
      segments.push({
        id: `${spec.lineId}-seg-${i + 1}-down`,
        segmentId: `${stA.id}_${stB.id}`,
        fromStationId: stA.id,
        toStationId: stB.id,
        fromName: stA.name,
        toName: stB.name,
        direction: 'outbound',
        coordinates: coordsDown,
      });
      segments.push({
        id: `${spec.lineId}-seg-${i + 1}-up`,
        segmentId: `${stB.id}_${stA.id}_UP`,
        fromStationId: stB.id,
        toStationId: stA.id,
        fromName: stB.name,
        toName: stA.name,
        direction: 'inbound',
        coordinates: coordsUp,
      });
    } else {
      segments.push({
        id: `${spec.lineId}-seg-${i + 1}`,
        segmentId: `${stA.id}_${stB.id}`,
        fromStationId: stA.id,
        toStationId: stB.id,
        fromName: stA.name,
        toName: stB.name,
        coordinates: coordsDown,
      });
    }
  }

  // 4. TS モジュール書き出し
  const lats = stations.map((s) => s.lat);
  const lngs = stations.map((s) => s.lng);
  const defaultBounds = [
    [Number((Math.min(...lats) - 0.02).toFixed(4)), Number((Math.min(...lngs) - 0.02).toFixed(4))],
    [Number((Math.max(...lats) + 0.02).toFixed(4)), Number((Math.max(...lngs) + 0.02).toFixed(4))],
  ];

  const outDir = path.resolve(__dirname, `../src/data/lines/${spec.lineId}`);
  fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(
    path.join(outDir, 'stations.ts'),
    `import type { Station } from '../../../types';\n\nexport const ${spec.exportPrefix}_STATIONS: Station[] = ${JSON.stringify(stations, null, 2)};\n`,
    'utf8'
  );

  fs.writeFileSync(
    path.join(outDir, 'trackGeometry.ts'),
    `import type { TrackSegment } from '../../../types';\n\nexport const ${spec.exportPrefix}_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(segments, null, 2)};\n`,
    'utf8'
  );

  const busBlock = spec.hasSubstitutionBus
    ? `  substitution_bus: {\n    key: 'substitution_bus',\n    name: '代行バス',\n    nameEn: 'Rail Replacement Bus',\n    shortName: '代行',\n    color: '#d97706',\n    textColor: '#ffffff',\n    bgColor: '#d97706',\n    borderColor: '#b45309',\n  },\n`
    : '';

  const trainTypesContent = `import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const ${spec.exportPrefix}_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '${spec.lineColor}',
    textColor: '#ffffff',
    bgColor: '${spec.lineColor}',
    borderColor: '${spec.accentColor}',
  },
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '${spec.lineColor}',
    textColor: '#ffffff',
    bgColor: '${spec.lineColor}',
    borderColor: '${spec.accentColor}',
  },
  rapid: JR_RAPID_PRESETS.STANDARD,
  special_rapid: JR_RAPID_PRESETS.SPECIAL_RAPID,
  limitedExp: LIMITED_EXP_PRESETS.STANDARD,
${busBlock}};
`;
  fs.writeFileSync(path.join(outDir, 'trainTypes.ts'), trainTypesContent, 'utf8');

  const indexContent = `import type { LineDefinition } from '../../../types';
import { ${spec.exportPrefix}_STATIONS } from './stations';
import { ${spec.exportPrefix}_TRACK_SEGMENTS } from './trackGeometry';
import { ${spec.exportPrefix}_TRAIN_TYPES } from './trainTypes';

export const ${spec.exportLineVar}: LineDefinition = {
  id: '${spec.lineId}',
  name: '${spec.name}',
  shortName: '${spec.shortName}',
  operator: '${spec.operator}',
  lineColor: '${spec.lineColor}',
  accentColor: '${spec.accentColor}',
  defaultCars: ${spec.defaultCars},
  defaultBounds: ${JSON.stringify(defaultBounds)},
  directionNames: ${JSON.stringify(spec.directionNames, null, 4)},
  stations: ${spec.exportPrefix}_STATIONS,
  trackSegments: ${spec.exportPrefix}_TRACK_SEGMENTS,
  trainTypes: ${spec.exportPrefix}_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
`;
  fs.writeFileSync(path.join(outDir, 'index.ts'), indexContent, 'utf8');

  // 5. Yahoo スクレイパー config.cjs 生成
  const cfgStations = stations.map((st, idx) => {
    const isPassOnly = Boolean(spec.passOnlyStations?.has(st.name));
    if (isPassOnly) {
      return { id: st.id, name: st.name, yahooStationId: null, inGroupId: null, outGroupId: null };
    }
    const yInfo = yahooStations[st.name];
    if (!yInfo?.yahooStationId) {
      throw new Error(`Missing Yahoo ID for ${spec.lineId}: ${st.name}`);
    }
    if (spec.lineId === 'senseki_tohoku') {
      return {
        id: st.id,
        name: st.name,
        yahooStationId: String(yInfo.yahooStationId),
        inGroupId: idx === 1 ? '7960' : null,
        outGroupId: idx === 0 ? '7961' : null,
      };
    }
    return {
      id: st.id,
      name: st.name,
      yahooStationId: String(yInfo.yahooStationId),
      inGroupId: idx === 0 ? null : spec.inGroupId,
      outGroupId: idx === stations.length - 1 ? null : spec.outGroupId,
    };
  });

  // 駅間の概算所要時間 (単線・都市近郊を考慮した安全値)
  const baseSectionSeconds = {};
  for (let i = 0; i < stations.length - 1; i++) {
    const a = stations[i];
    const b = stations[i + 1];
    const d = distMeters([a.lat, a.lng], [b.lat, b.lng]);
    baseSectionSeconds[i + 1] = Math.max(90, Math.round((d / 1000 / 48) * 3600));
  }

  const preserveTypes = spec.hasSubstitutionBus
    ? `['regular', 'rapid', 'special_rapid', 'limitedExp', 'substitution_bus']`
    : `['regular', 'rapid', 'special_rapid', 'limitedExp']`;

  const configContent = `// ${spec.name} Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: '${spec.lineId}',
  name: '${spec.name}',
  stationsFilePath: 'src/data/lines/${spec.lineId}/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/${spec.lineId}/stationTimetables.json',
    globalTimetable: 'src/data/lines/${spec.lineId}/globalTimetable.json',
  },
  stations: ${JSON.stringify(cfgStations, null, 4)},
  stationNameAliases: {
    '榴ヶ岡': '榴ケ岡',
    '北浦(宮城県)': '北浦',
    '升形(山形県)': '升形',
  },
  trainTypeMap: {
    '普通': 'regular',
    '各駅停車': 'regular',
    '特別快速': 'special_rapid',
    '快速おもいで湯けむり': 'rapid',
    '快速湯けむり': 'rapid',
    '快速風っこ女川シーパル号': 'rapid',
    '快速最上川': 'rapid',
    '最上川': 'rapid',
    '快速': 'rapid',
    '代行バス': 'substitution_bus',
    '特急': 'limitedExp',
  },
  preserveAllStopsTypes: ${preserveTypes},
  defaultTrainType: 'regular',
  defaultCars: ${spec.defaultCars},
  ${spec.lineId === 'senseki_tohoku' ? 'buildStationTimetablesFromTrips: true,\n  ' : ''}baseSectionSeconds: ${JSON.stringify(baseSectionSeconds, null, 4)},
};
`;

  const cfgDir = path.resolve(__dirname, `lines/${spec.lineId}`);
  fs.mkdirSync(cfgDir, { recursive: true });
  fs.writeFileSync(path.join(cfgDir, 'config.cjs'), configContent, 'utf8');

  console.log(`✅ ${spec.lineId}: ${stations.length} stations, ${segments.length} segments (asymmetric: ${asymCount})`);
}
