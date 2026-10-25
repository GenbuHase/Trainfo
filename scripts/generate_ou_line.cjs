// JR奥羽本線（軌間で分断される4運行系統）の駅・軌道・設定を生成する
const fs = require('fs');
const path = require('path');
const {
  buildWeightedGraph,
  snapEndpoints,
  distMeters,
  subdivideCoordinates,
} = require('./common/geometryBuilderUtils.cjs');

const ROOT = path.resolve(__dirname, '..');
const probed = require('./cache/ou_yahoo_probed.json');
const osm = require('./cache/osm_ou_full.json');
const stopFile = path.resolve(__dirname, 'cache/osm_ou_stops.json');
if (!fs.existsSync(stopFile)) {
  console.error('Missing scripts/cache/osm_ou_stops.json');
  process.exit(1);
}
const stopDump = require('./cache/osm_ou_stops.json');

probed['十文字'] = {
  name: '十文字',
  stationId: '21213',
  displayName: '十文字',
};
probed['天童南'] = {
  name: '天童南',
  stationId: '29746',
  displayName: '天童南',
};

const LINE_COLOR = '#ff7e1c';
const RAPID_COLOR = '#0073bc';
const LTD_COLOR = '#e60012';

const SECTIONS = [
  {
    lineId: 'ou_fukushima_shinjo',
    name: 'JR奥羽本線（福島～新庄）',
    shortName: '奥羽本線（福島～新庄）',
    exportPrefix: 'OU_FUKUSHIMA_SHINJO',
    idPrefix: 'OFS',
    defaultCars: 4,
    accentColor: RAPID_COLOR,
    keepAllLineSegments: true,
    excludeShinkansen: true,
    directionNames: {
      inbound: '福島方面',
      outbound: '新庄方面',
      inboundFull: '上り 福島方面',
      outboundFull: '下り 新庄方面',
      inboundShort: '福島方面',
      outboundShort: '新庄方面',
    },
    stations: [
      '福島', '笹木野', '庭坂', '板谷', '峠', '大沢', '関根', '米沢', '置賜', '高畠',
      '赤湯', '中川', '羽前中山', 'かみのやま温泉', '茂吉記念館前', '蔵王', '山形', '北山形',
      '羽前千歳', '南出羽', '漆山', '高擶', '天童南', '天童', '乱川', '神町', 'さくらんぼ東根', '東根',
      '村山', '袖崎', '大石田', '北大石田', '芦沢', '舟形', '新庄',
    ],
  },
  {
    lineId: 'ou_shinjo_omagari',
    name: 'JR奥羽本線（新庄～大曲）',
    shortName: '奥羽本線（新庄～大曲）',
    exportPrefix: 'OU_SHINJO_OMAGARI',
    idPrefix: 'OSO',
    defaultCars: 2,
    accentColor: RAPID_COLOR,
    keepAllLineSegments: true,
    excludeShinkansen: true,
    directionNames: {
      inbound: '新庄方面',
      outbound: '大曲方面',
      inboundFull: '上り 新庄方面',
      outboundFull: '下り 大曲方面',
      inboundShort: '新庄方面',
      outboundShort: '大曲方面',
    },
    stations: [
      '新庄', '泉田', '羽前豊里', '真室川', '釜淵', '大滝', '及位', '院内', '横堀', '三関',
      '上湯沢', '湯沢', '下湯沢', '十文字', '醍醐', '柳田', '横手', '後三年', '飯詰', '大曲',
    ],
  },
  {
    lineId: 'ou_omagari_akita',
    name: 'JR奥羽本線（大曲～秋田）',
    shortName: '奥羽本線（大曲～秋田）',
    exportPrefix: 'OU_OMAGARI_AKITA',
    idPrefix: 'OOA',
    defaultCars: 4,
    accentColor: RAPID_COLOR,
    keepAllLineSegments: true,
    excludeShinkansen: true,
    directionNames: {
      inbound: '大曲方面',
      outbound: '秋田方面',
      inboundFull: '上り 大曲方面',
      outboundFull: '下り 秋田方面',
      inboundShort: '大曲方面',
      outboundShort: '秋田方面',
    },
    stations: ['大曲', '神宮寺', '刈和野', '峰吉川', '羽後境', '大張野', '和田', '四ツ小屋', '秋田'],
  },
  {
    lineId: 'ou_akita_aomori',
    name: 'JR奥羽本線（秋田～青森）',
    shortName: '奥羽本線（秋田～青森）',
    exportPrefix: 'OU_AKITA_AOMORI',
    idPrefix: 'OAA',
    defaultCars: 4,
    accentColor: LTD_COLOR,
    keepAllLineSegments: true,
    excludeShinkansen: true,
    directionNames: {
      inbound: '秋田方面',
      outbound: '青森方面',
      inboundFull: '上り 秋田方面',
      outboundFull: '下り 青森方面',
      inboundShort: '秋田方面',
      outboundShort: '青森方面',
    },
    stations: [
      '秋田', '泉外旭川', '土崎', '上飯島', '追分', '大久保', '羽後飯塚', '井川さくら', '八郎潟',
      '鯉川', '鹿渡', '森岳', '北金岡', '東能代', '鶴形', '富根', '二ツ井', '前山', '鷹ノ巣',
      '糠沢', '早口', '下川沿', '大館', '白沢', '陣場', '津軽湯の沢', '碇ケ関', '長峰', '大鰐温泉',
      '石川', '弘前', '撫牛子', '川部', '北常盤', '浪岡', '大釈迦', '鶴ケ坂', '津軽新城', '新青森', '青森',
    ],
  },
];

const META = {
  福島: { kana: 'ふくしま', en: 'Fukushima', major: true, rapid: true, xfer: ['JR東北新幹線', 'JR山形新幹線', 'JR東北本線', '阿武隈急行線', '福島交通飯坂線'] },
  笹木野: { kana: 'ささきの', en: 'Sasakino' },
  庭坂: { kana: 'にわさか', en: 'Niwasaka', rapid: true },
  板谷: { kana: 'いたや', en: 'Itaya' },
  峠: { kana: 'とうげ', en: 'Toge' },
  大沢: { kana: 'おおさわ', en: 'Osawa' },
  関根: { kana: 'せきね', en: 'Sekine' },
  米沢: { kana: 'よねざわ', en: 'Yonezawa', major: true, rapid: true, xfer: ['JR山形新幹線', 'JR米坂線'] },
  置賜: { kana: 'おいたま', en: 'Oitama' },
  高畠: { kana: 'たかはた', en: 'Takahata', major: true, rapid: true, xfer: ['JR山形新幹線'] },
  赤湯: { kana: 'あかゆ', en: 'Akayu', major: true, rapid: true, xfer: ['JR山形新幹線', '山形鉄道フラワー長井線'] },
  中川: { kana: 'なかがわ', en: 'Nakagawa' },
  羽前中山: { kana: 'うぜんなかやま', en: 'Uzen-Nakayama' },
  かみのやま温泉: { kana: 'かみのやまおんせん', en: 'Kaminoyama-Onsen', major: true, rapid: true, xfer: ['JR山形新幹線'] },
  茂吉記念館前: { kana: 'もきちきねんかんまえ', en: 'Mokichi-Kinenkan-mae' },
  蔵王: { kana: 'ざおう', en: 'Zao' },
  山形: { kana: 'やまがた', en: 'Yamagata', major: true, rapid: true, xfer: ['JR山形新幹線', 'JR仙山線', 'JR左沢線'] },
  北山形: { kana: 'きたやまがた', en: 'Kita-Yamagata', xfer: ['JR左沢線'] },
  羽前千歳: { kana: 'うぜんちとせ', en: 'Uzen-Chitose', xfer: ['JR仙山線'] },
  南出羽: { kana: 'みなみでわ', en: 'Minami-Dewa' },
  漆山: { kana: 'うるしやま', en: 'Urushiyama' },
  高擶: { kana: 'たかだま', en: 'Takatama' },
  天童南: { kana: 'てんどうみなみ', en: 'Tendo-Minami' },
  天童: { kana: 'てんどう', en: 'Tendo', major: true, rapid: true, xfer: ['JR山形新幹線'] },
  乱川: { kana: 'みだれがわ', en: 'Midaregawa' },
  神町: { kana: 'じんまち', en: 'Jimmachi' },
  さくらんぼ東根: { kana: 'さくらんぼひがしね', en: 'Sakurambo-Higashine', major: true, rapid: true, xfer: ['JR山形新幹線'] },
  東根: { kana: 'ひがしね', en: 'Higashine' },
  村山: { kana: 'むらやま', en: 'Murayama', major: true, rapid: true, xfer: ['JR山形新幹線'] },
  袖崎: { kana: 'そでさき', en: 'Sodesaki' },
  大石田: { kana: 'おおいしだ', en: 'Oishida', major: true, rapid: true, xfer: ['JR山形新幹線'] },
  北大石田: { kana: 'きたおおいしだ', en: 'Kita-Oishida' },
  芦沢: { kana: 'あしさわ', en: 'Ashisawa' },
  舟形: { kana: 'ふながた', en: 'Funagata' },
  新庄: { kana: 'しんじょう', en: 'Shinjo', major: true, rapid: true, xfer: ['JR山形新幹線', 'JR陸羽東線', 'JR陸羽西線'] },
  泉田: { kana: 'いずみた', en: 'Izumita' },
  羽前豊里: { kana: 'うぜんとよさと', en: 'Uzen-Toyosato' },
  真室川: { kana: 'まむろがわ', en: 'Mamurogawa', major: true, rapid: true },
  釜淵: { kana: 'かまぶち', en: 'Kamabuchi' },
  大滝: { kana: 'おおたき', en: 'Otaki' },
  及位: { kana: 'のぞき', en: 'Nozoki' },
  院内: { kana: 'いんない', en: 'Innai', rapid: true },
  横堀: { kana: 'よこぼり', en: 'Yokobori', rapid: true },
  三関: { kana: 'みつせき', en: 'Mitsuseki' },
  上湯沢: { kana: 'かみゆざわ', en: 'Kami-Yuzawa' },
  湯沢: { kana: 'ゆざわ', en: 'Yuzawa', major: true, rapid: true },
  下湯沢: { kana: 'しもゆざわ', en: 'Shimo-Yuzawa' },
  十文字: { kana: 'じゅうもんじ', en: 'Jumonji', rapid: true },
  醍醐: { kana: 'だいご', en: 'Daigo' },
  柳田: { kana: 'やなぎた', en: 'Yanagita' },
  横手: { kana: 'よこて', en: 'Yokote', major: true, rapid: true, xfer: ['JR北上線'] },
  後三年: { kana: 'ごさんねん', en: 'Gosannen' },
  飯詰: { kana: 'いいづめ', en: 'Iizume' },
  大曲: { kana: 'おおまがり', en: 'Omagari', major: true, rapid: true, xfer: ['JR秋田新幹線', 'JR田沢湖線'] },
  神宮寺: { kana: 'じんぐうじ', en: 'Jinguji' },
  刈和野: { kana: 'かりわの', en: 'Kariwano', rapid: true },
  峰吉川: { kana: 'みねよしかわ', en: 'Mineyoshikawa' },
  羽後境: { kana: 'うごさかい', en: 'Ugo-Sakai' },
  大張野: { kana: 'おおばりの', en: 'Obarino' },
  和田: { kana: 'わだ', en: 'Wada' },
  四ツ小屋: { kana: 'よつごや', en: 'Yotsugoya' },
  秋田: { kana: 'あきた', en: 'Akita', major: true, rapid: true, ltd: true, xfer: ['JR秋田新幹線', 'JR羽越本線', 'JR男鹿線'] },
  泉外旭川: { kana: 'いずみそとあさひかわ', en: 'Izumi-Soto-Asahikawa' },
  土崎: { kana: 'つちざき', en: 'Tsuchizaki', rapid: true },
  上飯島: { kana: 'かみいいじま', en: 'Kami-Iijima' },
  追分: { kana: 'おいわけ', en: 'Oiwake', rapid: true, ltd: true, xfer: ['JR男鹿線'] },
  大久保: { kana: 'おおくぼ', en: 'Okubo' },
  羽後飯塚: { kana: 'うごいいづか', en: 'Ugo-Iizuka' },
  井川さくら: { kana: 'いかわさくら', en: 'Ikawa-Sakura' },
  八郎潟: { kana: 'はちろうがた', en: 'Hachirogata', major: true, rapid: true, ltd: true },
  鯉川: { kana: 'こいかわ', en: 'Koikawa' },
  鹿渡: { kana: 'かど', en: 'Kado' },
  森岳: { kana: 'もりたけ', en: 'Moritake', rapid: true, ltd: true },
  北金岡: { kana: 'きたかなおか', en: 'Kita-Kanaoka' },
  東能代: { kana: 'ひがしのしろ', en: 'Higashi-Noshiro', major: true, rapid: true, ltd: true, xfer: ['JR五能線'] },
  鶴形: { kana: 'つるがた', en: 'Tsurugata' },
  富根: { kana: 'とみね', en: 'Tomine' },
  二ツ井: { kana: 'ふたつい', en: 'Futatsui', rapid: true, ltd: true },
  前山: { kana: 'まえやま', en: 'Maeyama' },
  鷹ノ巣: { kana: 'たかのす', en: 'Takanosu', major: true, rapid: true, ltd: true, xfer: ['秋田内陸縦貫鉄道秋田内陸線'] },
  糠沢: { kana: 'ぬかざわ', en: 'Nukazawa' },
  早口: { kana: 'はやぐち', en: 'Hayaguchi' },
  下川沿: { kana: 'しもかわぞい', en: 'Shimokawazoi' },
  大館: { kana: 'おおだて', en: 'Odate', major: true, rapid: true, ltd: true, xfer: ['JR花輪線'] },
  白沢: { kana: 'しらさわ', en: 'Shirasawa' },
  陣場: { kana: 'じんば', en: 'Jimba' },
  津軽湯の沢: { kana: 'つがるゆのさわ', en: 'Tsugaru-Yunosawa' },
  碇ケ関: { kana: 'いかりがせき', en: 'Ikarigaseki', rapid: true },
  長峰: { kana: 'ながみね', en: 'Nagamine' },
  大鰐温泉: { kana: 'おおわにおんせん', en: 'Owani-Onsen', major: true, rapid: true, ltd: true, xfer: ['弘南鉄道大鰐線'] },
  石川: { kana: 'いしかわ', en: 'Ishikawa' },
  弘前: { kana: 'ひろさき', en: 'Hirosaki', major: true, rapid: true, ltd: true, xfer: ['弘南鉄道弘南線'] },
  撫牛子: { kana: 'ないじょうし', en: 'Naijoshi' },
  川部: { kana: 'かわべ', en: 'Kawabe', rapid: true, xfer: ['JR五能線'] },
  北常盤: { kana: 'きたときわ', en: 'Kita-Tokiwa' },
  浪岡: { kana: 'なみおか', en: 'Namioka', rapid: true, ltd: true },
  大釈迦: { kana: 'だいしゃか', en: 'Daishaka' },
  鶴ケ坂: { kana: 'つるがさか', en: 'Tsurugasaka' },
  津軽新城: { kana: 'つがるしんじょう', en: 'Tsugaru-Shinjo' },
  新青森: { kana: 'しんあおもり', en: 'Shin-Aomori', major: true, rapid: true, ltd: true, xfer: ['JR東北新幹線', 'JR北海道新幹線'] },
  青森: { kana: 'あおもり', en: 'Aomori', major: true, rapid: true, ltd: true, xfer: ['JR津軽線', '青い森鉄道線'] },
};

const EXTRA_TRANSFERS = {
  ou_fukushima_shinjo: { 新庄: ['JR奥羽本線（新庄～大曲）'] },
  ou_shinjo_omagari: {
    新庄: ['JR奥羽本線（福島～新庄）'],
    大曲: ['JR奥羽本線（大曲～秋田）'],
  },
  ou_omagari_akita: {
    大曲: ['JR奥羽本線（新庄～大曲）'],
    秋田: ['JR奥羽本線（秋田～青森）'],
  },
  ou_akita_aomori: { 秋田: ['JR奥羽本線（大曲～秋田）'] },
};

const NAME_ALIASES = {
  井川: '井川さくら',
  大鰐: '大鰐温泉',
  鷹巣: '鷹ノ巣',
};

const FORCE_NODE_NAMES = {
  263178782: '陣場',
  263177844: '津軽湯の沢',
  263176838: '浪岡',
};

function normName(name) {
  if (!name) return '';
  const base = name.replace(/駅$/, '').replace(/[（(].*$/, '').replace(/ヶ/g, 'ケ').trim();
  return NAME_ALIASES[base] || base;
}

function heapPush(heap, item) {
  heap.push(item);
  let i = heap.length - 1;
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (heap[p][0] <= heap[i][0]) break;
    [heap[p], heap[i]] = [heap[i], heap[p]];
    i = p;
  }
}

function heapPop(heap) {
  const top = heap[0];
  const last = heap.pop();
  if (heap.length > 0 && last) {
    heap[0] = last;
    let i = 0;
    for (;;) {
      const l = i * 2 + 1;
      const r = l + 1;
      let m = i;
      if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
      if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
      if (m === i) break;
      [heap[m], heap[i]] = [heap[i], heap[m]];
      i = m;
    }
  }
  return top;
}

function inBox(node, box) {
  return node.lat >= box.minLat && node.lat <= box.maxLat && node.lon >= box.minLng && node.lon <= box.maxLng;
}

function shortestPath(adj, nodeMap, startId, goalId, box) {
  if (startId === goalId) return [startId];
  const dist = new Map([[startId, 0]]);
  const prev = new Map();
  const heap = [[0, startId]];
  const seen = new Set();
  while (heap.length > 0) {
    const [d, curr] = heapPop(heap);
    if (seen.has(curr)) continue;
    seen.add(curr);
    if (curr === goalId) break;
    if (d !== dist.get(curr)) continue;
    for (const edge of adj.get(curr) || []) {
      const nextNode = nodeMap.get(edge.to);
      if (box && nextNode && !inBox(nextNode, box) && edge.to !== goalId) continue;
      const nd = d + edge.dist;
      if (!dist.has(edge.to) || nd < dist.get(edge.to)) {
        dist.set(edge.to, nd);
        prev.set(edge.to, curr);
        heapPush(heap, [nd, edge.to]);
      }
    }
  }
  if (!dist.has(goalId)) return null;
  const path = [];
  let c = goalId;
  while (c !== undefined) {
    path.push(c);
    c = prev.get(c);
  }
  path.reverse();
  return path[0] === startId ? path : null;
}

function buildGraph() {
  const nodeMap = new Map();
  for (const el of osm.elements) {
    if (el.type === 'node' && el.lat != null && el.lon != null) {
      nodeMap.set(el.id, { id: el.id, lat: el.lat, lon: el.lon });
    }
  }
  const ways = osm.elements.filter(e => e.type === 'way' && e.nodes && e.nodes.length > 1);
  const adj = buildWeightedGraph(ways, nodeMap);
  const snapped = snapEndpoints(ways, nodeMap, adj, 45);
  console.log(`graph nodes=${nodeMap.size} ways=${ways.length} endpointSnaps=${snapped}`);
  return { nodeMap, adj, ways };
}

function indexStops() {
  const byName = new Map();
  const extras = fs.existsSync(path.resolve(__dirname, 'cache/osm_ou_missing_stops.json'))
    ? require('./cache/osm_ou_missing_stops.json').elements || []
    : [];
  const manual = [
    { id: 'manual-tendo-minami', lat: 38.34248889, lon: 140.36585278, tags: { name: '天童南' } },
  ];
  for (const n of [...(stopDump.elements || []), ...extras, ...manual]) {
    const forced = FORCE_NODE_NAMES[n.id];
    const name = normName(forced || n.tags?.name);
    if (!name || n.lat == null) continue;
    if (!byName.has(name)) byName.set(name, []);
    if (!byName.get(name).some(existing => existing.id === n.id)) byName.get(name).push(n);
  }
  return byName;
}

function pickStop(byName, stationName, prevCoord) {
  const list = byName.get(stationName) || [];
  if (list.length === 0) return null;
  if (!prevCoord || list.length === 1) return list[0];
  let best = list[0];
  let bestD = Infinity;
  for (const n of list) {
    const d = distMeters(prevCoord, [n.lat, n.lon]);
    if (d < bestD) {
      bestD = d;
      best = n;
    }
  }
  return best;
}

function closestNodes(nodeMap, adj, lat, lng, limit) {
  const scored = [];
  for (const n of nodeMap.values()) {
    if (!adj.has(n.id)) continue;
    const d = distMeters([lat, lng], [n.lat, n.lon]);
    if (d < 500) scored.push({ id: n.id, d });
  }
  scored.sort((a, b) => a.d - b.d);
  return scored.slice(0, limit);
}

function pathCoords(nodeMap, ids) {
  return ids.map(id => {
    const n = nodeMap.get(id);
    return [n.lat, n.lon];
  });
}

function componentOf(adj, startId) {
  const comp = new Set();
  const queue = [startId];
  comp.add(startId);
  while (queue.length > 0) {
    const curr = queue.pop();
    for (const edge of adj.get(curr) || []) {
      if (!comp.has(edge.to)) {
        comp.add(edge.to);
        queue.push(edge.to);
      }
    }
  }
  return comp;
}

function bridgeComponents(adj, nodeMap, startId, goalId, maxGap) {
  const compA = componentOf(adj, startId);
  if (compA.has(goalId)) return 0;
  const compB = componentOf(adj, goalId);
  const endsA = [];
  const endsB = [];
  for (const id of compA) {
    if ((adj.get(id) || []).length <= 1) endsA.push(id);
  }
  for (const id of compB) {
    if ((adj.get(id) || []).length <= 1) endsB.push(id);
  }
  let best = null;
  for (const a of endsA) {
    const na = nodeMap.get(a);
    if (!na) continue;
    for (const b of endsB) {
      const nb = nodeMap.get(b);
      if (!nb) continue;
      const d = distMeters([na.lat, na.lon], [nb.lat, nb.lon]);
      if (!best || d < best.d) best = { a, b, d };
    }
  }
  if (!best || best.d > maxGap) {
    console.warn(`  component gap ${best ? Math.round(best.d) : '?'}m (limit ${maxGap}m), ends ${endsA.length}/${endsB.length}`);
    return null;
  }
  if (!adj.has(best.a)) adj.set(best.a, []);
  if (!adj.has(best.b)) adj.set(best.b, []);
  adj.get(best.a).push({ to: best.b, dist: best.d });
  adj.get(best.b).push({ to: best.a, dist: best.d });
  console.warn(`  bridged ${Math.round(best.d)}m gap`);
  return best.d;
}

function pinStationNode(nodeMap, adj, station) {
  const cands = closestNodes(nodeMap, adj, station.lat, station.lng, 1);
  if (cands.length === 0) {
    throw new Error(`No rail node within 400m of ${station.name} (${station.lat}, ${station.lng})`);
  }
  const node = nodeMap.get(cands[0].id);
  station.nodeId = node.id;
  station.snapMeters = cands[0].d;
  station.lat = node.lat;
  station.lng = node.lon;
}

function connectStations(nodeMap, adj, stops) {
  for (const st of stops) pinStationNode(nodeMap, adj, st);
  const segments = [];
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    const padList = [0.08, 0.2, 0.5];
    let ids = null;
    for (const pad of padList) {
      const box = {
        minLat: Math.min(a.lat, b.lat) - pad,
        maxLat: Math.max(a.lat, b.lat) + pad,
        minLng: Math.min(a.lng, b.lng) - pad,
        maxLng: Math.max(a.lng, b.lng) + pad,
      };
      ids = shortestPath(adj, nodeMap, a.nodeId, b.nodeId, box);
      if (ids && ids.length >= 2) break;
    }
    if (!ids || ids.length < 2) {
      const bridged = bridgeComponents(adj, nodeMap, a.nodeId, b.nodeId, 180);
      if (bridged != null) {
        ids = shortestPath(adj, nodeMap, a.nodeId, b.nodeId, null);
      }
    }
    if (!ids || ids.length < 2) throw new Error(`No path ${a.name} -> ${b.name}`);
    const raw = pathCoords(nodeMap, ids);
    const straight = distMeters([a.lat, a.lng], [b.lat, b.lng]);
    let len = 0;
    for (let k = 1; k < raw.length; k++) len += distMeters(raw[k - 1], raw[k]);
    const coords = subdivideCoordinates(raw, 220);
    coords[0] = [a.lat, a.lng];
    coords[coords.length - 1] = [b.lat, b.lng];
    console.log(
      `${a.name} -> ${b.name}: pts=${coords.length} len=${Math.round(len)}m straight=${Math.round(straight)}m ratio=${(len / Math.max(straight, 1)).toFixed(2)} snap=${Math.round(a.snapMeters)}/${Math.round(b.snapMeters)}m`
    );
    if (len > Math.max(straight * 2.4, straight + 8000)) {
      console.warn(`  LONG PATH ${a.name} -> ${b.name}`);
    }
    segments.push({ from: a, to: b, coordinates: coords });
  }
  return segments;
}

function stoppingTypes(meta, section) {
  const types = ['regular'];
  if (meta.rapid && section.lineId !== 'ou_omagari_akita') types.push('rapid');
  if (meta.ltd && section.lineId === 'ou_akita_aomori') types.push('limitedExp');
  return types;
}

function facilities(isMajor) {
  return {
    elevator: !!isMajor,
    restroom: true,
    multipurposeToilet: !!isMajor,
    waitingRoom: true,
    ticketOffice: !!isMajor,
  };
}

function writeStations(section, placed) {
  const stations = placed.map((st, idx) => {
    const meta = META[st.name];
    const extra = EXTRA_TRANSFERS[section.lineId]?.[st.name] || [];
    const transfers = [...(meta.xfer || []), ...extra];
    return {
      id: st.id,
      lineId: section.lineId,
      number: idx + 1,
      name: st.name,
      nameKana: meta.kana,
      nameEn: meta.en,
      lat: st.lat,
      lng: st.lng,
      transfers,
      address: st.address || '',
      platforms: { inbound: '上りホーム', outbound: '下りホーム' },
      stoppingTypes: stoppingTypes(meta, section),
      ...(meta.major ? { isMajor: true } : {}),
      facilities: facilities(meta.major),
    };
  });
  const body = `import type { Station } from '../../../types';\n\nexport const ${section.exportPrefix}_STATIONS: Station[] = ${JSON.stringify(stations, null, 2)};\n`;
  const dir = path.join(ROOT, 'src/data/lines', section.lineId);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'stations.ts'), body, 'utf8');
  return stations;
}

function writeTrack(section, segments) {
  const track = segments.map(seg => ({
    segmentId: `${seg.from.id}_${seg.to.id}`,
    fromStationId: seg.from.id,
    toStationId: seg.to.id,
    coordinates: seg.coordinates,
  }));
  const body = `import type { TrackSegment } from '../../../types';\n\nexport const ${section.exportPrefix}_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(track, null, 2)};\n`;
  fs.writeFileSync(path.join(ROOT, 'src/data/lines', section.lineId, 'trackGeometry.ts'), body, 'utf8');
}

function writeTrainTypes(section) {
  const types = {
    regular: {
      key: 'regular',
      name: '普通',
      nameEn: 'Local',
      shortName: '普通',
      color: LINE_COLOR,
      textColor: '#ffffff',
      bgColor: LINE_COLOR,
      borderColor: LINE_COLOR,
    },
    rapid: {
      key: 'rapid',
      name: '快速',
      nameEn: 'Rapid',
      shortName: '快速',
      color: RAPID_COLOR,
      textColor: '#ffffff',
      bgColor: RAPID_COLOR,
      borderColor: RAPID_COLOR,
    },
  };
  if (section.lineId === 'ou_akita_aomori') {
    types.limitedExp = {
      key: 'limitedExp',
      name: '特急',
      nameEn: 'Limited Express',
      shortName: '特急',
      color: LTD_COLOR,
      textColor: '#ffffff',
      bgColor: LTD_COLOR,
      borderColor: LTD_COLOR,
    };
  }
  const body = `import type { TrainTypeConfig } from '../../../types';\n\nexport const ${section.exportPrefix}_TRAIN_TYPES: Record<string, TrainTypeConfig> = ${JSON.stringify(types, null, 2)};\n`;
  fs.writeFileSync(path.join(ROOT, 'src/data/lines', section.lineId, 'trainTypes.ts'), body, 'utf8');
}

function writeIndex(section, stations) {
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;
  for (const st of stations) {
    minLat = Math.min(minLat, st.lat);
    maxLat = Math.max(maxLat, st.lat);
    minLng = Math.min(minLng, st.lng);
    maxLng = Math.max(maxLng, st.lng);
  }
  const padLat = 0.04;
  const padLng = 0.04;
  const constName = section.exportPrefix
    .toLowerCase()
    .split('_')
    .map((p, i) => (i === 0 ? p : p[0].toUpperCase() + p.slice(1)))
    .join('');
  // ouFukushimaShinjoLine style
  const exportName = section.lineId.replace(/_([a-z])/g, (_, c) => c.toUpperCase()) + 'Line';
  const body = `import type { LineDefinition } from '../../../types';
import { ${section.exportPrefix}_STATIONS } from './stations';
import { ${section.exportPrefix}_TRACK_SEGMENTS } from './trackGeometry';
import { ${section.exportPrefix}_TRAIN_TYPES } from './trainTypes';

export const ${exportName}: LineDefinition = {
  id: '${section.lineId}',
  name: '${section.name}',
  shortName: '${section.shortName}',
  operator: 'JR東日本',
  lineColor: '${LINE_COLOR}',
  accentColor: '${section.accentColor}',
  defaultCars: ${section.defaultCars},
  defaultBounds: [[${(minLat - padLat).toFixed(4)}, ${(minLng - padLng).toFixed(4)}], [${(maxLat + padLat).toFixed(4)}, ${(maxLng + padLng).toFixed(4)}]],
  directionNames: ${JSON.stringify(section.directionNames, null, 2)},
  stations: ${section.exportPrefix}_STATIONS,
  trackSegments: ${section.exportPrefix}_TRACK_SEGMENTS,
  trainTypes: ${section.exportPrefix}_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
`;
  fs.writeFileSync(path.join(ROOT, 'src/data/lines', section.lineId, 'index.ts'), body, 'utf8');
  void constName;
  return exportName;
}

function writeConfig(section, placed) {
  const stations = placed.map((st, idx) => ({
    id: st.id,
    name: st.name,
    yahooStationId: String(probed[st.name].stationId),
    inGroupId: idx === 0 ? null : '340',
    outGroupId: idx === placed.length - 1 ? null : '341',
  }));
  const config = {
    lineId: section.lineId,
    name: section.name,
    stationsFilePath: `src/data/lines/${section.lineId}/stations.ts`,
    outputPaths: {
      stationTimetables: `src/data/lines/${section.lineId}/stationTimetables.json`,
      globalTimetable: `src/data/lines/${section.lineId}/globalTimetable.json`,
    },
    stations,
    stationNameAliases: {
      '福島(福島県)': '福島',
      '大沢(山形県)': '大沢',
      '中川(山形県)': '中川',
      '漆山(山形県)': '漆山',
      '村山(山形県)': '村山',
      '大曲(秋田県)': '大曲',
      '醍醐(秋田県)': '醍醐',
      '追分(秋田県)': '追分',
      '大久保(秋田県)': '大久保',
      '白沢(秋田県)': '白沢',
      '石川(奥羽本線)': '石川',
      '和田(秋田県)': '和田',
      '大滝(山形県)': '大滝',
    },
    trainTypeMap: {
      各駅停車: 'regular',
      普通: 'regular',
      快速: 'rapid',
      特急: 'limitedExp',
      つがる: 'limitedExp',
      リゾートしらかみ: 'limitedExp',
    },
    preserveAllStopsTypes: ['regular', 'rapid', 'limitedExp', 'special_rapid'],
    defaultTrainType: 'regular',
    defaultCars: section.defaultCars,
    keepAllLineSegments: section.keepAllLineSegments,
  };
  if (section.excludeShinkansen) {
    config.shouldExcludeDeparture = `FN`;
    config.shouldExcludeTrip = `FN`;
  }
  const dir = path.join(ROOT, 'scripts/lines', section.lineId);
  fs.mkdirSync(dir, { recursive: true });
  let source = 'module.exports = ' + JSON.stringify(config, null, 2) + ';\n';
  const filter = `const SHINKANSEN_NAMES = ['つばさ', 'やまびこ', 'こまち', 'はやぶさ', '新幹線'];
function isShinkansenName(name) {
  return SHINKANSEN_NAMES.some(token => (name || '').includes(token));
}
`;
  source = source
    .replace('"shouldExcludeDeparture": "FN"', 'shouldExcludeDeparture: ({ rawKindName }) => isShinkansenName(rawKindName)')
    .replace('"shouldExcludeTrip": "FN"', 'shouldExcludeTrip: (trainDetail) => isShinkansenName(`${trainDetail.displayName || \'\'} ${trainDetail.guideComment || \'\'}`)');
  fs.writeFileSync(path.join(dir, 'config.cjs'), filter + source, 'utf8');
}

function writeEmptyTimetables(section) {
  const dir = path.join(ROOT, 'src/data/lines', section.lineId);
  const gt = path.join(dir, 'globalTimetable.json');
  const st = path.join(dir, 'stationTimetables.json');
  if (!fs.existsSync(gt)) fs.writeFileSync(gt, '[]\n', 'utf8');
  if (!fs.existsSync(st)) fs.writeFileSync(st, JSON.stringify({ weekday: {}, holiday: {} }, null, 2), 'utf8');
}

function audit(section, stations, segments) {
  let bad = 0;
  for (const st of stations) {
    const hits = segments.filter(seg => seg.from.id === st.id || seg.to.id === st.id);
    const ok = hits.some(seg => {
      const ends = [seg.coordinates[0], seg.coordinates[seg.coordinates.length - 1]];
      return ends.some(p => distMeters(p, [st.lat, st.lng]) < 0.05);
    });
    if (!ok) {
      bad++;
      console.error(`SNAP FAIL ${section.lineId} ${st.name}`);
    }
  }
  const short = segments.filter(seg => seg.coordinates.length < 3);
  console.log(`${section.lineId}: stations=${stations.length} segments=${segments.length} snapFail=${bad} shortSeg=${short.length}`);
  if (bad > 0) process.exitCode = 1;
}

function main() {
  const { nodeMap, adj } = buildGraph();
  const byName = indexStops();
  console.log('named OSM stops', byName.size);
  const exports = [];
  for (const section of SECTIONS) {
    console.log(`\n=== ${section.name} ===`);
    const placed = [];
    let prev = null;
    for (let i = 0; i < section.stations.length; i++) {
      const name = section.stations[i];
      const meta = META[name];
      if (!meta) throw new Error(`Missing meta ${name}`);
      if (!probed[name]?.stationId) throw new Error(`Missing Yahoo id ${name}`);
      const stop = pickStop(byName, name, prev ? [prev.lat, prev.lng] : null);
      if (!stop) throw new Error(`OSM stop not found: ${name}`);
      const st = {
        id: `${section.idPrefix}-${String(i + 1).padStart(2, '0')}`,
        name,
        lat: stop.lat,
        lng: stop.lon,
        address: stop.tags?.['addr:full'] || '',
      };
      placed.push(st);
      prev = st;
    }
    const segments = connectStations(nodeMap, adj, placed);
    const stations = writeStations(section, placed);
    writeTrack(section, segments);
    writeTrainTypes(section);
    const exportName = writeIndex(section, stations);
    writeConfig(section, placed);
    writeEmptyTimetables(section);
    audit(section, stations, segments);
    exports.push({ lineId: section.lineId, exportName });
  }
  fs.writeFileSync(path.resolve(__dirname, 'cache/ou_generated_exports.json'), JSON.stringify(exports, null, 2));
  console.log('\nGenerated', exports.map(e => e.lineId).join(', '));
}

main();
