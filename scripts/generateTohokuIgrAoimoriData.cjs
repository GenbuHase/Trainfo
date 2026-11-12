// JR東北本線（5系統）・IGRいわて銀河鉄道線・青い森鉄道線 軌道ジオメトリ & 駅データ一括生成スクリプト
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

// 2本のポリライン間の最大離隔（駅前後250mを除外し、点対線分距離で正確に計測）
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
  // 先頭と末尾を正確な駅座標にする前に、駅座標から50m以内の折り返し点を整理
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

  // 内部の微小重複点や135度超の鋭角トゲをチェック・除去
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

function dijkstra(adj, startId, goalId, blockedWays = new Set()) {
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
      if (blockedWays.has(e.wid)) continue;
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

// 欠損kanaの辞書補完
const KANA_FALLBACK = {
  '黒磯': 'くろいそ',
  '高久': 'たかく',
  '黒田原': 'くろだはら',
  '豊原': 'とよはら',
  '白坂': 'しらさか',
  '新白河': 'しんしらかわ',
  '白河': 'しらかわ',
  '久田野': 'くたの',
  '泉崎': 'いずみざき',
  '矢吹': 'やぶき',
  '鏡石': 'かがみいし',
  '須賀川': 'すかがわ',
  '安積永盛': 'あさかながもり',
  '郡山': 'こおりやま',
  '日和田': 'ひわだ',
  '五百川': 'ごひゃくがわ',
  '本宮': 'もとみや',
  '杉田': 'すぎた',
  '二本松': 'にほんまつ',
  '安達': 'あだち',
  '松川': 'まつかわ',
  '金谷川': 'かなやがわ',
  '南福島': 'みなみふくしま',
  '福島': 'ふくしま',
  '東福島': 'ひがしふくしま',
  '伊達': 'だて',
  '桑折': 'こおり',
  '藤田': 'ふじた',
  '貝田': 'かいだ',
  '越河': 'こすごう',
  '白石': 'しろいし',
  '東白石': 'ひがししろいし',
  '北白川': 'きたしらかわ',
  '大河原': 'おおがわら',
  '船岡': 'ふなおか',
  '槻木': 'つきのき',
  '岩沼': 'いわぬま',
  '館腰': 'たてこし',
  '名取': 'なとり',
  '南仙台': 'みなみせんだい',
  '太子堂': 'たいしどう',
  '長町': 'ながまち',
  '仙台': 'せんだい',
  '東仙台': 'ひがしせんだい',
  '岩切': 'いわきり',
  '新利府': 'しんりふ',
  '利府': 'りふ',
  '陸前山王': 'りくぜんさんのう',
  '国府多賀城': 'こくふたがじょう',
  '塩釜': 'しおがま',
  '松島': 'まつしま',
  '愛宕': 'あたご',
  '品井沼': 'しないぬま',
  '鹿島台': 'かしまだい',
  '松山町': 'まつやままち',
  '小牛田': 'こごた',
  '田尻': 'たじり',
  '瀬峰': 'せみね',
  '梅ケ沢': 'うめがさわ',
  '新田': 'にった',
  '石越': 'いしこし',
  '油島': 'ゆしま',
  '花泉': 'はないずみ',
  '清水原': 'しみずはら',
  '有壁': 'ありかべ',
  '一ノ関': 'いちのせき',
  '山ノ目': 'やまのめ',
  '平泉': 'ひらいずみ',
  '前沢': 'まえさわ',
  '陸中折居': 'りくちゅうおりい',
  '水沢': 'みずさわ',
  '金ケ崎': 'かねがさき',
  '六原': 'ろくはら',
  '北上': 'きたかみ',
  '村崎野': 'むらさきの',
  '花巻': 'はなまき',
  '花巻空港': 'はなまきくうこう',
  '石鳥谷': 'いしどりや',
  '日詰': 'ひづめ',
  '紫波中央': 'しわちゅうおう',
  '古館': 'ふるだて',
  '矢幅': 'やはば',
  '岩手飯岡': 'いわていいおか',
  '仙北町': 'せんぼくちょう',
  '盛岡': 'もりおか',
  '青山': 'あおやま',
  '厨川': 'くりやがわ',
  '巣子': 'すご',
  '滝沢': 'たきざわ',
  '渋民': 'しぶたみ',
  '好摩': 'こうま',
  '岩手川口': 'いわてかわぐち',
  'いわて沼宮内': 'いわてぬまくない',
  '御堂': 'みどう',
  '奥中山高原': 'おくなかやまこうげん',
  '小繋': 'こつなぎ',
  '小鳥谷': 'こずや',
  '一戸': 'いちのへ',
  '二戸': 'にのへ',
  '斗米': 'とまい',
  '金田一温泉': 'きんたいちおんせん',
  '目時': 'めとき',
  '三戸': 'さんのへ',
  '諏訪ノ平': 'すわのたいら',
  '剣吉': 'けんよし',
  '苫米地': 'とまべち',
  '北高岩': 'きたたかいわ',
  '八戸': 'はちのへ',
  '陸奥市川': 'むついちかわ',
  '下田': 'しもだ',
  '向山': 'むかいやま',
  '三沢': 'みさわ',
  '小川原': 'こがわら',
  '上北町': 'かみきたちょう',
  '乙供': 'おっとも',
  '千曳': 'ちびき',
  '野辺地': 'のへじ',
  '狩場沢': 'かりばさわ',
  '清水川': 'しみずがわ',
  '小湊': 'こみなと',
  '西平内': 'にしひらない',
  '浅虫温泉': 'あさむしおんせん',
  '野内': 'のない',
  '矢田前': 'やだまえ',
  '小柳': 'こやなぎ',
  '東青森': 'ひがしあおもり',
  '筒井': 'つつい',
  '青森': 'あおもり',
};

const MAJOR_STATIONS = new Set([
  '黒磯', '新白河', '白河', '矢吹', '須賀川', '郡山', '本宮', '二本松', '福島',
  '白石', '大河原', '槻木', '岩沼', '名取', '長町', '仙台',
  '岩切', '利府', '塩釜', '松島', '鹿島台', '小牛田', '石越', '一ノ関',
  '平泉', '水沢', '北上', '花巻', '花巻空港', '紫波中央', '矢幅', '盛岡',
  '滝沢', '好摩', 'いわて沼宮内', '奥中山高原', '一戸', '二戸', '金田一温泉', '目時',
  '三戸', '八戸', '三沢', '上北町', '野辺地', '小湊', '浅虫温泉', '東青森', '青森',
]);

const TRANSFERS_BY_LINE_AND_STATION = {
  tohoku_kuroiso_fukushima: {
    '黒磯': ['JR宇都宮線'],
    '新白河': ['東北新幹線'],
    '安積永盛': ['JR水郡線'],
    '郡山': ['東北新幹線', '山形新幹線', 'JR磐越西線', 'JR磐越東線', 'JR水郡線'],
    '福島': ['JR東北本線（福島～仙台）', 'JR奥羽本線（福島～新庄）', '東北新幹線', '山形新幹線', '阿武隈急行線', '福島交通飯坂線'],
  },
  tohoku_fukushima_sendai: {
    '福島': ['JR東北本線（黒磯～福島）', 'JR奥羽本線（福島～新庄）', '東北新幹線', '山形新幹線', '阿武隈急行線', '福島交通飯坂線'],
    '槻木': ['阿武隈急行線'],
    '岩沼': ['JR常磐線（いわき～仙台）'],
    '館腰': ['JR常磐線（いわき～仙台）'],
    '名取': ['JR常磐線（いわき～仙台）', '仙台空港アクセス線'],
    '南仙台': ['JR常磐線（いわき～仙台）'],
    '太子堂': ['JR常磐線（いわき～仙台）'],
    '長町': ['JR常磐線（いわき～仙台）', '仙台市地下鉄南北線'],
    '仙台': ['JR東北本線（仙台～一ノ関）', 'JR常磐線（いわき～仙台）', 'JR仙山線', 'JR仙石線', 'JR仙石東北ライン', '仙台空港アクセス線', '東北新幹線', '秋田新幹線', '仙台市地下鉄南北線', '仙台市地下鉄東西線'],
  },
  tohoku_sendai_ichinoseki: {
    '仙台': ['JR東北本線（福島～仙台）', 'JR常磐線（いわき～仙台）', 'JR仙山線', 'JR仙石線', 'JR仙石東北ライン', '仙台空港アクセス線', '東北新幹線', '秋田新幹線', '仙台市地下鉄南北線', '仙台市地下鉄東西線'],
    '岩切': ['JR東北本線（利府支線）'],
    '塩釜': ['JR仙石東北ライン'],
    '小牛田': ['JR陸羽東線', 'JR石巻線'],
    '一ノ関': ['JR東北本線（一ノ関～盛岡）', '東北新幹線', 'JR大船渡線'],
  },
  tohoku_rifu: {
    '岩切': ['JR東北本線（仙台～一ノ関）'],
  },
  tohoku_ichinoseki_morioka: {
    '一ノ関': ['JR東北本線（仙台～一ノ関）', '東北新幹線', 'JR大船渡線'],
    '北上': ['東北新幹線', 'JR北上線'],
    '花巻': ['JR釜石線'],
    '盛岡': ['IGRいわて銀河鉄道線', '東北新幹線', '秋田新幹線', 'JR田沢湖線', 'JR山田線', 'JR花輪線'],
  },
  igr_iwate_ginga: {
    '盛岡': ['JR東北本線（一ノ関～盛岡）', '東北新幹線', '秋田新幹線', 'JR田沢湖線', 'JR山田線', 'JR花輪線'],
    '好摩': ['JR花輪線'],
    'いわて沼宮内': ['東北新幹線'],
    '二戸': ['東北新幹線'],
    '目時': ['青い森鉄道線'],
  },
  aoimori: {
    '目時': ['IGRいわて銀河鉄道線'],
    '八戸': ['東北新幹線', 'JR八戸線'],
    '野辺地': ['JR大湊線'],
    '青森': ['JR奥羽本線（秋田～青森）', 'JR津軽線'],
  },
};

function getPrefecture(lineId, name) {
  if (lineId === 'tohoku_kuroiso_fukushima') {
    if (['黒磯', '高久', '黒田原', '豊原'].includes(name)) return '栃木県';
    return '福島県';
  }
  if (lineId === 'tohoku_fukushima_sendai') {
    if (['福島', '東福島', '伊達', '桑折', '藤田', '貝田'].includes(name)) return '福島県';
    return '宮城県';
  }
  if (lineId === 'tohoku_sendai_ichinoseki') {
    if (['油島', '花泉', '清水原', '有壁', '一ノ関'].includes(name)) {
      return name === '有壁' ? '宮城県' : '岩手県';
    }
    return '宮城県';
  }
  if (lineId === 'tohoku_rifu') return '宮城県';
  if (lineId === 'tohoku_ichinoseki_morioka') return '岩手県';
  if (lineId === 'igr_iwate_ginga') return name === '目時' ? '青森県' : '岩手県';
  if (lineId === 'aoimori') return '青森県';
  return '';
}

const LINE_SPECS = [
  {
    lineId: 'tohoku_kuroiso_fukushima',
    exportPrefix: 'TOHOKU_KUROISO_FUKUSHIMA',
    exportLineVar: 'tohokuKuroisoFukushimaLine',
    name: 'JR東北本線（黒磯～福島）',
    shortName: '東北本線（黒磯～福島）',
    operator: 'JR東日本',
    lineColor: '#00bb85',
    accentColor: '#00897b',
    defaultCars: 4,
    prefix: 'TKF',
    latRange: [36.95, 37.80],
    directionNames: {
      inbound: '郡山・黒磯方面',
      outbound: '郡山・福島方面',
      inboundFull: '上り 新白河・黒磯方面',
      outboundFull: '下り 郡山・福島方面',
      inboundShort: '黒磯方面',
      outboundShort: '福島方面',
    },
    stationNames: [
      '黒磯', '高久', '黒田原', '豊原', '白坂', '新白河', '白河', '久田野', '泉崎', '矢吹',
      '鏡石', '須賀川', '安積永盛', '郡山', '日和田', '五百川', '本宮', '杉田', '二本松', '安達',
      '松川', '金谷川', '南福島', '福島',
    ],
  },
  {
    lineId: 'tohoku_fukushima_sendai',
    exportPrefix: 'TOHOKU_FUKUSHIMA_SENDAI',
    exportLineVar: 'tohokuFukushimaSendaiLine',
    name: 'JR東北本線（福島～仙台）',
    shortName: '東北本線（福島～仙台）',
    operator: 'JR東日本',
    lineColor: '#00bb85',
    accentColor: '#00897b',
    defaultCars: 4,
    prefix: 'TFS',
    latRange: [37.73, 38.28],
    directionNames: {
      inbound: '白石・福島方面',
      outbound: '岩沼・仙台方面',
      inboundFull: '上り 白石・福島方面',
      outboundFull: '下り 岩沼・仙台方面',
      inboundShort: '福島方面',
      outboundShort: '仙台方面',
    },
    stationNames: [
      '福島', '東福島', '伊達', '桑折', '藤田', '貝田', '越河', '白石', '東白石', '北白川',
      '大河原', '船岡', '槻木', '岩沼', '館腰', '名取', '南仙台', '太子堂', '長町', '仙台',
    ],
  },
  {
    lineId: 'tohoku_sendai_ichinoseki',
    exportPrefix: 'TOHOKU_SENDAI_ICHINOSEKI',
    exportLineVar: 'tohokuSendaiIchinosekiLine',
    name: 'JR東北本線（仙台～一ノ関）',
    shortName: '東北本線（仙台～一ノ関）',
    operator: 'JR東日本',
    lineColor: '#00bb85',
    accentColor: '#00897b',
    defaultCars: 4,
    prefix: 'TSI',
    latRange: [38.24, 38.95],
    directionNames: {
      inbound: '塩釜・仙台方面',
      outbound: '小牛田・一ノ関方面',
      inboundFull: '上り 塩釜・仙台方面',
      outboundFull: '下り 小牛田・一ノ関方面',
      inboundShort: '仙台方面',
      outboundShort: '一ノ関方面',
    },
    stationNames: [
      '仙台', '東仙台', '岩切', '陸前山王', '国府多賀城', '塩釜', '松島', '愛宕', '品井沼', '鹿島台',
      '松山町', '小牛田', '田尻', '瀬峰', '梅ケ沢', '新田', '石越', '油島', '花泉', '清水原',
      '有壁', '一ノ関',
    ],
  },
  {
    lineId: 'tohoku_rifu',
    exportPrefix: 'TOHOKU_RIFU',
    exportLineVar: 'tohokuRifuLine',
    name: 'JR東北本線（利府支線）',
    shortName: '東北本線（利府支線）',
    operator: 'JR東日本',
    lineColor: '#00bb85',
    accentColor: '#00897b',
    defaultCars: 4,
    prefix: 'TRF',
    latRange: [38.29, 38.35],
    directionNames: {
      inbound: '岩切・仙台方面',
      outbound: '新利府・利府方面',
      inboundFull: '上り 岩切・仙台方面',
      outboundFull: '下り 新利府・利府方面',
      inboundShort: '岩切・仙台方面',
      outboundShort: '利府方面',
    },
    stationNames: ['岩切', '新利府', '利府'],
  },
  {
    lineId: 'tohoku_ichinoseki_morioka',
    exportPrefix: 'TOHOKU_ICHINOSEKI_MORIOKA',
    exportLineVar: 'tohokuIchinosekiMoriokaLine',
    name: 'JR東北本線（一ノ関～盛岡）',
    shortName: '東北本線（一ノ関～盛岡）',
    operator: 'JR東日本',
    lineColor: '#00bb85',
    accentColor: '#00897b',
    defaultCars: 2,
    prefix: 'TIM',
    latRange: [38.91, 39.72],
    directionNames: {
      inbound: '北上・一ノ関方面',
      outbound: '花巻・盛岡方面',
      inboundFull: '上り 北上・一ノ関方面',
      outboundFull: '下り 花巻・盛岡方面',
      inboundShort: '一ノ関方面',
      outboundShort: '盛岡方面',
    },
    stationNames: [
      '一ノ関', '山ノ目', '平泉', '前沢', '陸中折居', '水沢', '金ケ崎', '六原', '北上', '村崎野',
      '花巻', '花巻空港', '石鳥谷', '日詰', '紫波中央', '古館', '矢幅', '岩手飯岡', '仙北町', '盛岡',
    ],
  },
  {
    lineId: 'igr_iwate_ginga',
    exportPrefix: 'IGR_IWATE_GINGA',
    exportLineVar: 'igrIwateGingaLine',
    name: 'IGRいわて銀河鉄道線',
    shortName: 'いわて銀河鉄道線',
    operator: 'IGRいわて銀河鉄道',
    lineColor: '#0e459b',
    accentColor: '#38bdf8',
    defaultCars: 2,
    prefix: 'IGR',
    latRange: [39.69, 40.37],
    directionNames: {
      inbound: 'いわて沼宮内・盛岡方面',
      outbound: '二戸・八戸方面',
      inboundFull: '上り 好摩・盛岡方面',
      outboundFull: '下り いわて沼宮内・二戸・八戸方面',
      inboundShort: '盛岡方面',
      outboundShort: '八戸方面',
    },
    stationNames: [
      '盛岡', '青山', '厨川', '巣子', '滝沢', '渋民', '好摩', '岩手川口', 'いわて沼宮内', '御堂',
      '奥中山高原', '小繋', '小鳥谷', '一戸', '二戸', '斗米', '金田一温泉', '目時',
    ],
  },
  {
    lineId: 'aoimori',
    exportPrefix: 'AOIMORI',
    exportLineVar: 'aoimoriLine',
    name: '青い森鉄道線',
    shortName: '青い森鉄道線',
    operator: '青い森鉄道',
    lineColor: '#2cbadc',
    accentColor: '#005bac',
    defaultCars: 2,
    prefix: 'AMR',
    latRange: [40.34, 40.95],
    directionNames: {
      inbound: '八戸・盛岡方面',
      outbound: '野辺地・青森方面',
      inboundFull: '上り 八戸・三戸・盛岡方面',
      outboundFull: '下り 野辺地・浅虫温泉・青森方面',
      inboundShort: '八戸方面',
      outboundShort: '青森方面',
    },
    stationNames: [
      '目時', '三戸', '諏訪ノ平', '剣吉', '苫米地', '北高岩', '八戸', '陸奥市川', '下田', '向山',
      '三沢', '小川原', '上北町', '乙供', '千曳', '野辺地', '狩場沢', '清水川', '小湊', '西平内',
      '浅虫温泉', '野内', '矢田前', '小柳', '東青森', '筒井', '青森',
    ],
  },
];

// OSMデータロード
const stNodes = JSON.parse(fs.readFileSync('scripts/cache/osm_tohoku_stations.json', 'utf8')).elements.filter((e) => e.type === 'node');

// 1. 東北本線グラフ構築
const thRels = JSON.parse(fs.readFileSync('scripts/cache/osm_tohoku_main_rels.json', 'utf8'));
const thBoxFiles = [
  'scripts/cache/osm_rails_kuroiso_fukushima.json',
  'scripts/cache/osm_rails_fukushima_sendai.json',
  'scripts/cache/osm_rails_sendai_ichinoseki.json',
  'scripts/cache/osm_rails_ichinoseki_morioka.json',
];
const thNodeMap = new Map();
const thWays = new Map();
for (const f of ['scripts/cache/osm_tohoku_main_rels.json', 'scripts/cache/osm_tohoku_9282836.json', ...thBoxFiles]) {
  const d = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const e of d.elements) {
    if (e.type === 'node') thNodeMap.set(e.id, [e.lat, e.lon]);
    else if (e.type === 'way' && e.tags?.railway === 'rail') thWays.set(e.id, e);
  }
}
const thDownW = new Set(thRels.elements.find((e) => e.id === 8519859).members.filter((m) => m.type === 'way').map((m) => m.ref));
const thUpW = new Set(thRels.elements.find((e) => e.id === 8519860).members.filter((m) => m.type === 'way').map((m) => m.ref));

function buildThGraph(preferSet, avoidSet) {
  const adj = new Map();
  for (const w of thWays.values()) {
    const nm = w.tags?.name || '';
    if (
      w.tags?.gauge === '1435' ||
      nm.includes('新幹線') ||
      nm.includes('貨物') ||
      nm.includes('仙山') ||
      nm.includes('仙石') ||
      nm.includes('阿武隈') ||
      nm.includes('磐越') ||
      nm.includes('水郡') ||
      nm.includes('奥羽') ||
      nm.includes('北上線') ||
      nm.includes('釜石線') ||
      nm.includes('大船渡') ||
      nm.includes('陸羽')
    ) {
      continue;
    }
    const mult = preferSet.has(w.id) ? 1.0 : avoidSet.has(w.id) ? 50.0 : nm.includes('常磐') ? 3.0 : 1.5;
    for (let i = 0; i < w.nodes.length - 1; i++) {
      const u = w.nodes[i];
      const v = w.nodes[i + 1];
      const pu = thNodeMap.get(u);
      const pv = thNodeMap.get(v);
      if (!pu || !pv) continue;
      const d = distMeters(pu, pv) * mult;
      if (!adj.has(u)) adj.set(u, []);
      if (!adj.has(v)) adj.set(v, []);
      adj.get(u).push({ to: v, dist: d, wid: w.id });
      adj.get(v).push({ to: u, dist: d, wid: w.id });
    }
  }
  return adj;
}
const thGDown = buildThGraph(thDownW, thUpW);
const thGUp = buildThGraph(thUpW, thDownW);

// 2. 利府支線グラフ
const rifuD = JSON.parse(fs.readFileSync('scripts/cache/osm_tohoku_rifu.json', 'utf8'));
const rifuNodes = new Map(rifuD.elements.filter((e) => e.type === 'node').map((n) => [n.id, [n.lat, n.lon]]));
const rifuWays = new Map(rifuD.elements.filter((e) => e.type === 'way').map((w) => [w.id, w]));
function buildRelOnlyGraph(relD, nodesMap, waysMap, relId) {
  const rel = relD.elements.find((e) => e.id === relId);
  const adj = new Map();
  for (const m of rel.members) {
    if (m.type !== 'way') continue;
    const w = waysMap.get(m.ref);
    if (!w) continue;
    for (let i = 0; i < w.nodes.length - 1; i++) {
      const u = w.nodes[i];
      const v = w.nodes[i + 1];
      const pu = nodesMap.get(u);
      const pv = nodesMap.get(v);
      if (!pu || !pv) continue;
      const d = distMeters(pu, pv);
      if (!adj.has(u)) adj.set(u, []);
      if (!adj.has(v)) adj.set(v, []);
      adj.get(u).push({ to: v, dist: d, wid: w.id });
      adj.get(v).push({ to: u, dist: d, wid: w.id });
    }
  }
  return adj;
}
const rifuGDown = buildRelOnlyGraph(rifuD, rifuNodes, rifuWays, 9045932);
const rifuGUp = buildRelOnlyGraph(rifuD, rifuNodes, rifuWays, 5596396);

// 3. IGR グラフ（渡り線未マッピング駅のため、駅座標から60m以内の複線ノード同士を仮想接続）
const igrAll = JSON.parse(fs.readFileSync('scripts/cache/osm_igr_all_rails.json', 'utf8'));
const igrNodes = new Map(igrAll.elements.filter((e) => e.type === 'node').map((n) => [n.id, [n.lat, n.lon]]));
const igrAdj = new Map();
for (const e of igrAll.elements) {
  if (e.type !== 'way' || e.tags?.railway !== 'rail') continue;
  if (e.tags?.gauge === '1435' || (e.tags?.name || '').includes('新幹線')) continue;
  if (['yard', 'siding', 'spur'].includes(e.tags?.service)) continue;
  for (let i = 0; i < e.nodes.length - 1; i++) {
    const u = e.nodes[i];
    const v = e.nodes[i + 1];
    const pu = igrNodes.get(u);
    const pv = igrNodes.get(v);
    if (!pu || !pv) continue;
    const d = distMeters(pu, pv);
    if (!igrAdj.has(u)) igrAdj.set(u, []);
    if (!igrAdj.has(v)) igrAdj.set(v, []);
    igrAdj.get(u).push({ to: v, dist: d, wid: e.id });
    igrAdj.get(v).push({ to: u, dist: d, wid: e.id });
  }
}
// 駅ノード周辺120m以内の端点・他線ノードを仮想渡り線で結ぶ
for (const stName of LINE_SPECS.find((s) => s.lineId === 'igr_iwate_ginga').stationNames) {
  const c = stNodes.find((n) => normKe(n.tags?.name) === normKe(stName) && n.lat >= 39.69 && n.lat <= 40.37 && !(n.tags?.name || '').includes('新幹線'));
  if (!c) continue;
  const nearNids = [];
  for (const nid of igrAdj.keys()) {
    const p = igrNodes.get(nid);
    if (distMeters([c.lat, c.lon], p) <= 120) nearNids.push(nid);
  }
  for (let i = 0; i < nearNids.length; i++) {
    for (let j = i + 1; j < nearNids.length; j++) {
      const u = nearNids[i];
      const v = nearNids[j];
      const d = distMeters(igrNodes.get(u), igrNodes.get(v));
      if (d <= 45) {
        igrAdj.get(u).push({ to: v, dist: d, wid: -1 });
        igrAdj.get(v).push({ to: u, dist: d, wid: -1 });
      }
    }
  }
}

// 4. 青い森グラフ
const amD = JSON.parse(fs.readFileSync('scripts/cache/osm_aoimori.json', 'utf8'));
const amNodes = new Map(amD.elements.filter((e) => e.type === 'node').map((n) => [n.id, [n.lat, n.lon]]));
const amWays = new Map(amD.elements.filter((e) => e.type === 'way').map((w) => [w.id, w]));
const amGDown = buildRelOnlyGraph(amD, amNodes, amWays, 20500598);
const amGUp = buildRelOnlyGraph(amD, amNodes, amWays, 1934635);

// 境界駅含め各駅の確定代表座標を統一決定（同駅名は完全同一座標）
const resolvedStationMeta = new Map();

function findStationOsmMeta(name, latRange, preferGraph, preferNodeMap, preferWayIds = null) {
  const cands = stNodes.filter((n) => {
    const nm = normKe(n.tags?.name);
    if (nm !== normKe(name)) return false;
    if (n.lat < latRange[0] || n.lat > latRange[1]) return false;
    if ((n.tags?.name || '').includes('新幹線')) return false;
    return true;
  });
  let bestC = cands[0];
  let bestD = Infinity;
  for (const c of cands) {
    for (const nid of preferGraph.keys()) {
      const p = preferNodeMap.get(nid);
      if (!p || Math.abs(p[0] - c.lat) > 0.015 || Math.abs(p[1] - c.lon) > 0.015) continue;
      const d = distMeters([c.lat, c.lon], p);
      if (d < bestD) {
        bestD = d;
        bestC = c;
      }
    }
  }
  const stP = [bestC.lat, bestC.lon];

  // 代表座標もOSMリレーション上の最寄りノードではなく、駅の中心点と線路を接続するか、
  // 既存基準に従って「線路上の代表点（down側本線最寄りノード）」を駅座標として採用する（0.0mスナップ保証）
  let snapNid = null;
  let minSnapD = Infinity;
  if (preferWayIds) {
    for (const wid of preferWayIds) {
      const w = thWays.get(wid);
      if (!w) continue;
      for (const nid of w.nodes) {
        const p = preferNodeMap.get(nid);
        if (!p || Math.abs(p[0] - stP[0]) > 0.01) continue;
        const d = distMeters(stP, p);
        if (d < minSnapD) {
          minSnapD = d;
          snapNid = nid;
        }
      }
    }
  }
  if (!snapNid) {
    for (const nid of preferGraph.keys()) {
      const p = preferNodeMap.get(nid);
      if (!p || Math.abs(p[0] - stP[0]) > 0.01) continue;
      const d = distMeters(stP, p);
      if (d < minSnapD) {
        minSnapD = d;
        snapNid = nid;
      }
    }
  }
  const snapP = preferNodeMap.get(snapNid);
  const tags = bestC.tags || {};
  const kana = tags['name:ja-Hira'] || KANA_FALLBACK[name] || '';
  const en = tags['name:en'] || tags['name:ja-Latn'] || name;
  return {
    lat: snapP[0],
    lng: snapP[1],
    nameKana: kana,
    nameEn: en,
    snapNid,
  };
}

function closestNidOnWaySet(coord, waysSet, waysMap, nodesMap, fallbackGraph) {
  let best = null;
  let minD = Infinity;
  if (waysSet) {
    for (const wid of waysSet) {
      const w = waysMap.get(wid);
      if (!w) continue;
      for (const nid of w.nodes) {
        const p = nodesMap.get(nid);
        if (!p || Math.abs(p[0] - coord[0]) > 0.015) continue;
        const d = distMeters(coord, p);
        if (d < minD) {
          minD = d;
          best = nid;
        }
      }
    }
  }
  if (!best) {
    for (const nid of fallbackGraph.keys()) {
      const p = nodesMap.get(nid);
      if (!p || Math.abs(p[0] - coord[0]) > 0.015) continue;
      const d = distMeters(coord, p);
      if (d < minD) {
        minD = d;
        best = nid;
      }
    }
  }
  return best;
}

// 各路線の駅・セグメント生成
for (const spec of LINE_SPECS) {
  const stations = [];
  const segments = [];

  let gDown, gUp, nodesMap, waySetD, waySetU, waysMap;
  if (spec.lineId === 'tohoku_rifu') {
    gDown = rifuGDown;
    gUp = rifuGUp;
    nodesMap = rifuNodes;
    waysMap = rifuWays;
  } else if (spec.lineId === 'igr_iwate_ginga') {
    gDown = igrAdj;
    gUp = igrAdj;
    nodesMap = igrNodes;
  } else if (spec.lineId === 'aoimori') {
    gDown = amGDown;
    gUp = amGUp;
    nodesMap = amNodes;
    waysMap = amWays;
  } else {
    gDown = thGDown;
    gUp = thGUp;
    nodesMap = thNodeMap;
    waySetD = thDownW;
    waySetU = thUpW;
    waysMap = thWays;
  }

  for (let i = 0; i < spec.stationNames.length; i++) {
    const nm = spec.stationNames[i];
    const id = `${spec.prefix}-${String(i + 1).padStart(2, '0')}`;
    let meta = resolvedStationMeta.get(nm);
    if (!meta) {
      meta = findStationOsmMeta(nm, spec.latRange, gDown, nodesMap, waySetD);
      resolvedStationMeta.set(nm, meta);
    }
    const pref = getPrefecture(spec.lineId, nm);
    const transfers = (TRANSFERS_BY_LINE_AND_STATION[spec.lineId]?.[nm] || []).slice();
    stations.push({
      id,
      lineId: spec.lineId,
      number: i + 1,
      name: nm,
      nameKana: meta.nameKana,
      nameEn: meta.nameEn,
      lat: meta.lat,
      lng: meta.lng,
      transfers,
      address: `${pref}${nm}駅周辺`,
      platforms: {
        inbound: '上りホーム',
        outbound: '下りホーム',
      },
      stoppingTypes: ['regular', 'local', 'rapid', 'special_rapid', 'limitedExp'],
      isMajor: MAJOR_STATIONS.has(nm),
      facilities: {
        elevator: MAJOR_STATIONS.has(nm),
        restroom: true,
        multipurposeToilet: MAJOR_STATIONS.has(nm),
        waitingRoom: true,
        ticketOffice: MAJOR_STATIONS.has(nm),
      },
    });
  }

  // セグメント生成
  let asymCount = 0;
  for (let i = 0; i < stations.length - 1; i++) {
    const stA = stations[i];
    const stB = stations[i + 1];
    const cA = [stA.lat, stA.lng];
    const cB = [stB.lat, stB.lng];

    const dnA = closestNidOnWaySet(cA, waySetD, waysMap, nodesMap, gDown);
    const dnB = closestNidOnWaySet(cB, waySetD, waysMap, nodesMap, gDown);
    const pathDown = dijkstra(gDown, dnA, dnB);
    if (!pathDown) throw new Error(`Missing down path: ${spec.lineId} ${stA.name} -> ${stB.name}`);

    let pathUp = null;
    if (spec.lineId === 'igr_iwate_ginga') {
      // IGR複線別線探索: 中間ウェイをブロックし、同じ区間の並行線があれば抽出
      const midWays = new Set();
      for (let k = 0; k < pathDown.ways.length; k++) {
        const pt = nodesMap.get(pathDown.nodes[k]);
        if (pathDown.ways[k] > 0 && distMeters(pt, cA) > 400 && distMeters(pt, cB) > 400) {
          midWays.add(pathDown.ways[k]);
        }
      }
      const alt = dijkstra(gDown, dnB, dnA, midWays);
      if (alt && alt.totalDist <= pathDown.totalDist * 1.15) {
        // 下り(北向き)が西側(経度小)になるように判定（左側通行）
        const midIdxD = Math.floor(pathDown.nodes.length / 2);
        const midIdxA = Math.floor(alt.nodes.length / 2);
        const lonD = nodesMap.get(pathDown.nodes[midIdxD])[1];
        const lonA = nodesMap.get(alt.nodes[midIdxA])[1];
        if (lonA < lonD) {
          // altの方が西側＝下り、pathDownが東側＝上り
          pathUp = { ...pathDown, nodes: pathDown.nodes.slice().reverse() };
          pathDown.nodes = alt.nodes.slice().reverse();
        } else {
          pathUp = alt;
        }
      }
    } else {
      const unA = closestNidOnWaySet(cA, waySetU, waysMap, nodesMap, gUp);
      const unB = closestNidOnWaySet(cB, waySetU, waysMap, nodesMap, gUp);
      pathUp = dijkstra(gUp, unB, unA);
    }

    const rawDown = pathDown.nodes.map((nid) => nodesMap.get(nid));
    const coordsDown = subdivideCoordinates(cleanEndpointSpikes(rawDown, cA, cB), 120);

    let isAsymmetric = false;
    let coordsUp = null;
    if (pathUp) {
      const rawUp = pathUp.nodes.map((nid) => nodesMap.get(nid));
      const cUpTmp = cleanEndpointSpikes(rawUp, cB, cA);
      // 駅前後250m外で40m以上離隔しているか点対線分距離で正確に判定
      const maxSep = maxMidPolylineSeparation(coordsDown, cUpTmp, cA, cB);
      const straight = distMeters(cA, cB);
      const lenU = cUpTmp.reduce((acc, p, idx) => (idx ? acc + distMeters(cUpTmp[idx - 1], p) : 0), 0);
      if (maxSep >= 40 && lenU / straight <= 1.5) {
        isAsymmetric = true;
        coordsUp = subdivideCoordinates(cUpTmp, 120);
        console.log(`  🔀 [別線] ${spec.lineId} ${stA.name} ↔ ${stB.name}: 最大離隔 ${maxSep.toFixed(1)}m`);
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

  // バウンディングボックス計算
  const lats = stations.map((s) => s.lat);
  const lngs = stations.map((s) => s.lng);
  const defaultBounds = [
    [Number((Math.min(...lats) - 0.02).toFixed(4)), Number((Math.min(...lngs) - 0.02).toFixed(4))],
    [Number((Math.max(...lats) + 0.02).toFixed(4)), Number((Math.max(...lngs) + 0.02).toFixed(4))],
  ];

  // 出力ディレクトリ作成
  const outDir = path.resolve(__dirname, `../src/data/lines/${spec.lineId}`);
  fs.mkdirSync(outDir, { recursive: true });

  // stations.ts
  const stationsContent = `import type { Station } from '../../../types';\n\nexport const ${spec.exportPrefix}_STATIONS: Station[] = ${JSON.stringify(stations, null, 2)};\n`;
  fs.writeFileSync(path.join(outDir, 'stations.ts'), stationsContent, 'utf8');

  // trackGeometry.ts
  const trackContent = `import type { TrackSegment } from '../../../types';\n\nexport const ${spec.exportPrefix}_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(segments, null, 2)};\n`;
  fs.writeFileSync(path.join(outDir, 'trackGeometry.ts'), trackContent, 'utf8');

  // trainTypes.ts
  const isJR = spec.operator === 'JR東日本';
  const rapidColor = isJR ? '#0073bc' : spec.lineId === 'igr_iwate_ginga' ? '#0073bc' : '#0066cc';
  const specialRapidColor = isJR ? '#00897b' : '#e65100';
  const trainTypesContent = `import type { TrainTypeConfig } from '../../../types';
${isJR ? "import { JR_RAPID_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';\n" : ''}
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
  rapid: ${isJR ? 'JR_RAPID_PRESETS.STANDARD' : `{
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '${rapidColor}',
    textColor: '#ffffff',
    bgColor: '${rapidColor}',
    borderColor: '${rapidColor}',
  }`},
  special_rapid: ${isJR ? 'JR_RAPID_PRESETS.SPECIAL_RAPID' : `{
    key: 'special_rapid',
    name: '特別快速',
    nameEn: 'Special Rapid',
    shortName: '特快',
    color: '${specialRapidColor}',
    textColor: '#ffffff',
    bgColor: '${specialRapidColor}',
    borderColor: '${specialRapidColor}',
  }`},
  limitedExp: ${isJR ? 'LIMITED_EXP_PRESETS.STANDARD' : `{
    key: 'limitedExp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: '#d32f2f',
    textColor: '#ffffff',
    bgColor: '#d32f2f',
    borderColor: '#b71c1c',
  }`},
};
`;
  fs.writeFileSync(path.join(outDir, 'trainTypes.ts'), trainTypesContent, 'utf8');

  // index.ts
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

  console.log(`✅ ${spec.lineId}: ${stations.length} stations, ${segments.length} segments (asymmetric pairs: ${asymCount})`);
}
