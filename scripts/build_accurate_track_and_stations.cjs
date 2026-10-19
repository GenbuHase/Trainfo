const fs = require('fs');
const path = require('path');
const { distMeters, subdivideCoordinates } = require('./common/geometryBuilderUtils.cjs');

// N02データ読み込み
const railData = JSON.parse(fs.readFileSync(path.resolve('scripts/cache/N02-23/UTF-8/N02-23_RailroadSection.geojson'), 'utf8'));
const stationData = JSON.parse(fs.readFileSync(path.resolve('scripts/cache/N02-23/UTF-8/N02-23_Station.geojson'), 'utf8'));

// 境界駅の完全確定座標（既存路線から完全共有・Playbook Phase 6 準拠）
const FIXED_BOUNDARY_STATIONS = {
  '大月': [35.613106, 138.942176],       // chuo_main JC-32
  '国府津': [35.2812092, 139.2142253],   // tokaido JT-14
  '伊東': [34.9755861, 139.0922222],     // ito JT-26
  '三島': [35.1264, 138.9109],           // tokaido_shizuoka CA-02
  '沼津': [35.1031271, 138.8593352],     // tokaido_shizuoka CA-03
  '松田': [35.3447025, 139.1395994],     // odakyu_odawara OH-41 (新松田)
  '福島': [37.7544085, 140.4586226],     // tohoku_shinkansen TS-09
  '盛岡': [39.7014809, 141.136534],      // tohoku_shinkansen TS-18
};

function getNodeKey(coord) {
  return `${coord[1].toFixed(6)},${coord[0].toFixed(6)}`;
}

function parseNodeKey(key) {
  const [lat, lon] = key.split(',').map(Number);
  return [lat, lon];
}

function buildGraphFromFeatures(features, maxBridgeDist = 800) {
  const adj = new Map();
  const nodeCoords = new Map();

  function addEdge(uKey, vKey, uCoord, vCoord) {
    if (!adj.has(uKey)) adj.set(uKey, new Map());
    if (!adj.has(vKey)) adj.set(vKey, new Map());
    const d = distMeters(uCoord, vCoord);
    adj.get(uKey).set(vKey, Math.min(adj.get(uKey).get(vKey) || Infinity, d));
    adj.get(vKey).set(uKey, Math.min(adj.get(vKey).get(uKey) || Infinity, d));
    nodeCoords.set(uKey, uCoord);
    nodeCoords.set(vKey, vCoord);
  }

  for (const f of features) {
    const coords = f.geometry.coordinates;
    for (let i = 0; i < coords.length - 1; i++) {
      const uCoord = [coords[i][1], coords[i][0]];
      const vCoord = [coords[i + 1][1], coords[i + 1][0]];
      const uKey = getNodeKey(coords[i]);
      const vKey = getNodeKey(coords[i + 1]);
      addEdge(uKey, vKey, uCoord, vCoord);
    }
  }

  // 連結成分の特定
  const visited = new Set();
  const components = [];
  for (const k of adj.keys()) {
    if (!visited.has(k)) {
      const comp = [];
      const q = [k];
      visited.add(k);
      while (q.length > 0) {
        const curr = q.shift();
        comp.push(curr);
        for (const next of adj.get(curr).keys()) {
          if (!visited.has(next)) {
            visited.add(next);
            q.push(next);
          }
        }
      }
      components.push(comp);
    }
  }

  // ギャップ自動ブリッジ
  if (components.length > 1) {
    components.sort((a, b) => b.length - a.length);
    const mainNodes = new Set(components[0]);
    for (let c = 1; c < components.length; c++) {
      const sub = components[c];
      let bestU = null, bestV = null, minDist = Infinity;
      for (const u of sub) {
        const uCoord = nodeCoords.get(u);
        for (const v of mainNodes) {
          const vCoord = nodeCoords.get(v);
          const d = distMeters(uCoord, vCoord);
          if (d < minDist) {
            minDist = d;
            bestU = u;
            bestV = v;
          }
        }
      }
      if (minDist <= maxBridgeDist && bestU && bestV) {
        addEdge(bestU, bestV, nodeCoords.get(bestU), nodeCoords.get(bestV));
        for (const n of sub) mainNodes.add(n);
        console.log(`  [Bridge] Gap of ${Math.round(minDist)}m bridged between ${bestU} and ${bestV}`);
      }
    }
  }

  return { adj, nodeCoords };
}

function dijkstraPath(adj, nodeCoords, startKey, goalKey) {
  if (startKey === goalKey) return [startKey];
  const dist = new Map();
  const prev = new Map();
  const pq = new Set(adj.keys());

  for (const k of adj.keys()) dist.set(k, Infinity);
  dist.set(startKey, 0);

  while (pq.size > 0) {
    let u = null;
    let minD = Infinity;
    for (const k of pq) {
      const d = dist.get(k);
      if (d < minD) {
        minD = d;
        u = k;
      }
    }
    if (u === null || minD === Infinity) break;
    if (u === goalKey) break;
    pq.delete(u);

    const neighbors = adj.get(u);
    if (!neighbors) continue;
    for (const [v, weight] of neighbors) {
      if (!pq.has(v)) continue;
      const alt = minD + weight;
      if (alt < dist.get(v)) {
        dist.set(v, alt);
        prev.set(v, u);
      }
    }
  }

  if (!prev.has(goalKey) && startKey !== goalKey) return null;
  const path = [];
  let curr = goalKey;
  while (curr !== undefined) {
    path.push(curr);
    curr = prev.get(curr);
  }
  return path.reverse();
}

function findStationNode(nodeCoords, stName, filterOp, filterLine) {
  if (FIXED_BOUNDARY_STATIONS[stName]) {
    const fixedCoord = FIXED_BOUNDARY_STATIONS[stName];
    let bestKey = null, minDist = Infinity;
    for (const [key, coord] of nodeCoords.entries()) {
      const d = distMeters(fixedCoord, coord);
      if (d < minDist) {
        minDist = d;
        bestKey = key;
      }
    }
    return { key: bestKey, coord: fixedCoord, snappedDist: minDist };
  }

  const matches = stationData.features.filter(f =>
    f.properties.N02_005 === stName &&
    (!filterOp || f.properties.N02_004 === filterOp) &&
    (!filterLine || f.properties.N02_003 === filterLine)
  );

  let targetCoord = null;
  if (matches.length > 0) {
    const c = matches[0].geometry.coordinates[0];
    targetCoord = [c[1], c[0]];
  }

  if (!targetCoord) {
    throw new Error(`Station not found in N02: ${stName}`);
  }

  let bestKey = null, minDist = Infinity;
  for (const [key, coord] of nodeCoords.entries()) {
    const d = distMeters(targetCoord, coord);
    if (d < minDist) {
      minDist = d;
      bestKey = key;
    }
  }
  return { key: bestKey, coord: targetCoord, snappedDist: minDist };
}

// セグメント座標の生成（両端の駅座標を厳密に接続し、内側を本線ノード＆細分化）
function buildSegmentCoordinates(fromCoord, toCoord, rawNodeCoords) {
  const pts = [fromCoord, ...rawNodeCoords, toCoord];
  // 近接重複点の除去
  const deduplicated = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    if (distMeters(pts[i], deduplicated[deduplicated.length - 1]) > 1) {
      deduplicated.push(pts[i]);
    }
  }
  // 35mピッチで滑らかに分割
  return subdivideCoordinates(deduplicated, 35);
}

// ==========================================
// 路線定義マスタ
// ==========================================

const LINES_DEFINITIONS = [
  // 1. 伊豆急行線
  {
    lineId: 'izukyu',
    name: '伊豆急行線',
    operator: '伊豆急行',
    n02Op: '伊豆急行',
    n02Line: '伊豆急行線',
    hasOfficialNumbering: true,
    numberPrefix: 'IZ',
    stations: [
      { id: 'IZ-01', num: 'IZ01', name: '伊東', kana: 'いとう', en: 'Ito', transfers: ['JR伊東線'], isMajor: true, stoppingTypes: ['local', 'limitedExp'] },
      { id: 'IZ-02', num: 'IZ02', name: '南伊東', kana: 'みなみいとう', en: 'Minami-Ito', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'IZ-03', num: 'IZ03', name: '川奈', kana: 'かわな', en: 'Kawana', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'IZ-04', num: 'IZ04', name: '富戸', kana: 'ふと', en: 'Futo', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'IZ-05', num: 'IZ05', name: '城ヶ崎海岸', kana: 'じょうがさきかいがん', en: 'Jogasaki-Kaigan', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'IZ-06', num: 'IZ06', name: '伊豆高原', kana: 'いずこうげん', en: 'Izu-Kogen', transfers: [], isMajor: true, stoppingTypes: ['local', 'limitedExp'] },
      { id: 'IZ-07', num: 'IZ07', name: '伊豆大川', kana: 'いずおおかわ', en: 'Izu-Okawa', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'IZ-08', num: 'IZ08', name: '伊豆北川', kana: 'いずほっかわ', en: 'Izu-Hokkawa', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'IZ-09', num: 'IZ09', name: '伊豆熱川', kana: 'いずあたがわ', en: 'Izu-Atagawa', transfers: [], isMajor: true, stoppingTypes: ['local', 'limitedExp'] },
      { id: 'IZ-10', num: 'IZ10', name: '片瀬白田', kana: 'かたせしらた', en: 'Katase-Shirata', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'IZ-11', num: 'IZ11', name: '伊豆稲取', kana: 'いずいなとり', en: 'Izu-Inatori', transfers: [], isMajor: true, stoppingTypes: ['local', 'limitedExp'] },
      { id: 'IZ-12', num: 'IZ12', name: '今井浜海岸', kana: 'いまいはまかいがん', en: 'Imaihama-Kaigan', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'IZ-13', num: 'IZ13', name: '河津', kana: 'かわづ', en: 'Kawazu', transfers: [], isMajor: true, stoppingTypes: ['local', 'limitedExp'] },
      { id: 'IZ-14', num: 'IZ14', name: '稲梓', kana: 'いなずさ', en: 'Inazusa', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'IZ-15', num: 'IZ15', name: '蓮台寺', kana: 'れんだいじ', en: 'Rendaiji', transfers: [], isMajor: false, stoppingTypes: ['local', 'limitedExp'] },
      { id: 'IZ-16', num: 'IZ16', name: '伊豆急下田', kana: 'いずきゅうしもだ', en: 'Izukyu-Shimoda', transfers: [], isMajor: true, stoppingTypes: ['local', 'limitedExp'] },
    ]
  },

  // 2. 伊豆箱根鉄道駿豆線
  {
    lineId: 'izuhakone_sunzu',
    name: '伊豆箱根鉄道駿豆線',
    operator: '伊豆箱根鉄道',
    n02Op: '伊豆箱根鉄道',
    n02Line: '駿豆線',
    hasOfficialNumbering: true,
    numberPrefix: 'IS',
    stations: [
      { id: 'IS-01', num: 'IS01', name: '三島', kana: 'みしま', en: 'Mishima', transfers: ['JR東海道本線', '東海道新幹線'], isMajor: true, stoppingTypes: ['local', 'limitedExp'] },
      { id: 'IS-02', num: 'IS02', name: '三島広小路', kana: 'みしまひろこうじ', en: 'Mishima-Hirokoji', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'IS-03', num: 'IS03', name: '三島田町', kana: 'みしまたまち', en: 'Mishima-Tamachi', transfers: [], isMajor: true, stoppingTypes: ['local', 'limitedExp'] },
      { id: 'IS-04', num: 'IS04', name: '三島二日町', kana: 'みしまふつかまち', en: 'Mishima-Futsukamachi', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'IS-05', num: 'IS05', name: '大場', kana: 'だいば', en: 'Daiba', transfers: [], isMajor: true, stoppingTypes: ['local', 'limitedExp'] },
      { id: 'IS-06', num: 'IS06', name: '伊豆仁田', kana: 'いずにった', en: 'Izu-Nitta', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'IS-07', num: 'IS07', name: '原木', kana: 'ばらき', en: 'Baraki', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'IS-08', num: 'IS08', name: '韮山', kana: 'にらやま', en: 'Nirayama', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'IS-09', num: 'IS09', name: '伊豆長岡', kana: 'いずながおか', en: 'Izu-Nagaoka', transfers: [], isMajor: true, stoppingTypes: ['local', 'limitedExp'] },
      { id: 'IS-10', num: 'IS10', name: '田京', kana: 'たきょう', en: 'Takyo', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'IS-11', num: 'IS11', name: '大仁', kana: 'おおひと', en: 'Ohito', transfers: [], isMajor: true, stoppingTypes: ['local', 'limitedExp'] },
      { id: 'IS-12', num: 'IS12', name: '牧之郷', kana: 'まきのごう', en: 'Makinogo', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'IS-13', num: 'IS13', name: '修善寺', kana: 'しゅぜんじ', en: 'Shuzenji', transfers: [], isMajor: true, stoppingTypes: ['local', 'limitedExp'] },
    ]
  },

  // 3. JR御殿場線
  {
    lineId: 'gotemba',
    name: 'JR御殿場線',
    operator: 'JR東海',
    n02Op: '東海旅客鉄道',
    n02Line: '御殿場線',
    hasOfficialNumbering: true,
    numberPrefix: 'CB',
    stations: [
      { id: 'CB-00', num: 'CB00', name: '国府津', kana: 'こうづ', en: 'Kozu', transfers: ['JR東海道線'], isMajor: true, stoppingTypes: ['local'] },
      { id: 'CB-01', num: 'CB01', name: '下曽我', kana: 'しもそが', en: 'Shimo-Soga', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'CB-02', num: 'CB02', name: '上大井', kana: 'かみおおい', en: 'Kami-Oi', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'CB-03', num: 'CB03', name: '相模金子', kana: 'さがみかねこ', en: 'Sagami-Kaneko', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'CB-04', num: 'CB04', name: '松田', kana: 'まつだ', en: 'Matsuda', transfers: ['小田急小田原線（新松田駅）'], isMajor: true, stoppingTypes: ['local', 'limitedExp'] },
      { id: 'CB-05', num: 'CB05', name: '東山北', kana: 'ひがしやまきた', en: 'Higashi-Yamakita', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'CB-06', num: 'CB06', name: '山北', kana: 'やまきた', en: 'Yamakita', transfers: [], isMajor: true, stoppingTypes: ['local', 'limitedExp'] },
      { id: 'CB-07', num: 'CB07', name: '谷峨', kana: 'やが', en: 'Yaga', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'CB-08', num: 'CB08', name: '駿河小山', kana: 'するがおやま', en: 'Suruga-Oyama', transfers: [], isMajor: false, stoppingTypes: ['local', 'limitedExp'] },
      { id: 'CB-09', num: 'CB09', name: '足柄', kana: 'あしがら', en: 'Ashigara', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'CB-10', num: 'CB10', name: '御殿場', kana: 'ごてんば', en: 'Gotemba', transfers: [], isMajor: true, stoppingTypes: ['local', 'limitedExp'] },
      { id: 'CB-11', num: 'CB11', name: '南御殿場', kana: 'みなみごてんば', en: 'Minami-Gotemba', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'CB-12', num: 'CB12', name: '富士岡', kana: 'ふじおか', en: 'Fujioka', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'CB-13', num: 'CB13', name: '岩波', kana: 'いわなみ', en: 'Iwanami', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'CB-14', num: 'CB14', name: '裾野', kana: 'すその', en: 'Susono', transfers: [], isMajor: true, stoppingTypes: ['local'] },
      { id: 'CB-15', num: 'CB15', name: '長泉なめり', kana: 'ながいずみなめり', en: 'Nagaizumi-Nameri', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'CB-16', num: 'CB16', name: '下土狩', kana: 'しもとがり', en: 'Shimo-Togari', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'CB-17', num: 'CB17', name: '大岡', kana: 'おおおか', en: 'Ooka', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'CB-18', num: 'CB18', name: '沼津', kana: 'ぬまづ', en: 'Numazu', transfers: ['JR東海道本線'], isMajor: true, stoppingTypes: ['local'] },
    ]
  },

  // 4. 富士急行線 (スイッチバック考慮)
  {
    lineId: 'fujikyu',
    name: '富士急行線',
    operator: '富士山麓電気鉄道',
    n02Op: '富士山麓電気鉄道',
    n02Line: ['大月線', '河口湖線'],
    hasOfficialNumbering: true,
    numberPrefix: 'FJ',
    switchbackStation: '富士山',
    stations: [
      { id: 'FJ-01', num: 'FJ01', name: '大月', kana: 'おおつき', en: 'Otsuki', transfers: ['JR中央本線'], isMajor: true, stoppingTypes: ['local', 'rapid', 'limitedExp'] },
      { id: 'FJ-02', num: 'FJ02', name: '上大月', kana: 'かみおおつき', en: 'Kami-Otsuki', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'FJ-03', num: 'FJ03', name: '田野倉', kana: 'たのくら', en: 'Tanokura', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'FJ-04', num: 'FJ04', name: '禾生', kana: 'かせい', en: 'Kasei', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'FJ-05', num: 'FJ05', name: '赤坂', kana: 'あかさか', en: 'Akasaka', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'FJ-06', num: 'FJ06', name: '都留市', kana: 'つるし', en: 'Tsurushi', transfers: [], isMajor: true, stoppingTypes: ['local', 'rapid', 'limitedExp'] },
      { id: 'FJ-07', num: 'FJ07', name: '谷村町', kana: 'やむらまち', en: 'Yamuramachi', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'FJ-08', num: 'FJ08', name: '都留文科大学前', kana: 'つるぶんかだいがくまえ', en: 'Tsurubunkadaigakumae', transfers: [], isMajor: true, stoppingTypes: ['local', 'rapid', 'limitedExp'] },
      { id: 'FJ-09', num: 'FJ09', name: '十日市場', kana: 'とおかいちば', en: 'Tokaichiba', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'FJ-10', num: 'FJ10', name: '東桂', kana: 'ひがしかつら', en: 'Higashi-Katsura', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'FJ-11', num: 'FJ11', name: '三つ峠', kana: 'みつとうげ', en: 'Mitsutoge', transfers: [], isMajor: false, stoppingTypes: ['local', 'rapid'] },
      { id: 'FJ-12', num: 'FJ12', name: '寿', kana: 'ことぶき', en: 'Kotobuki', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'FJ-13', num: 'FJ13', name: '葭池温泉前', kana: 'よしいけおんせんまえ', en: 'Yoshiikeonsenmae', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'FJ-14', num: 'FJ14', name: '下吉田', kana: 'しもよしだ', en: 'Shimoyoshida', transfers: [], isMajor: true, stoppingTypes: ['local', 'rapid', 'limitedExp'] },
      { id: 'FJ-15', num: 'FJ15', name: '月江寺', kana: 'げっこうじ', en: 'Gekkoji', transfers: [], isMajor: false, stoppingTypes: ['local'] },
      { id: 'FJ-16', num: 'FJ16', name: '富士山', kana: 'ふじさん', en: 'Fujisan', transfers: [], isMajor: true, stoppingTypes: ['local', 'rapid', 'limitedExp'] },
      { id: 'FJ-17', num: 'FJ17', name: '富士急ハイランド', kana: 'ふじきゅうはいらんど', en: 'Fujikyu-Highland', transfers: [], isMajor: true, stoppingTypes: ['local', 'rapid', 'limitedExp'] },
      { id: 'FJ-18', num: 'FJ18', name: '河口湖', kana: 'かわぐちこ', en: 'Kawaguchiko', transfers: [], isMajor: true, stoppingTypes: ['local', 'rapid', 'limitedExp'] },
    ]
  },

  // 5. 山形新幹線
  {
    lineId: 'yamagata_shinkansen',
    name: '山形新幹線',
    operator: 'JR東日本',
    n02Op: '東日本旅客鉄道',
    n02Line: '奥羽線',
    hasOfficialNumbering: false,
    stations: [
      { id: 'YS-01', name: '福島', kana: 'ふくしま', en: 'Fukushima', transfers: ['東北新幹線', 'JR東北本線'], isMajor: true, stoppingTypes: ['limitedExp'] },
      { id: 'YS-02', name: '米沢', kana: 'よねざわ', en: 'Yonezawa', transfers: ['JR米坂線'], isMajor: true, stoppingTypes: ['limitedExp'] },
      { id: 'YS-03', name: '高畠', kana: 'たかはた', en: 'Takahata', transfers: [], isMajor: true, stoppingTypes: ['limitedExp'] },
      { id: 'YS-04', name: '赤湯', kana: 'あかゆ', en: 'Akayu', transfers: ['山形鉄道フラワー長井線'], isMajor: true, stoppingTypes: ['limitedExp'] },
      { id: 'YS-05', name: 'かみのやま温泉', kana: 'かみのやまおんせん', en: 'Kaminoyama-Onsen', transfers: [], isMajor: true, stoppingTypes: ['limitedExp'] },
      { id: 'YS-06', name: '山形', kana: 'やまがた', en: 'Yamagata', transfers: ['JR仙山線', 'JR左沢線'], isMajor: true, stoppingTypes: ['limitedExp'] },
      { id: 'YS-07', name: '天童', kana: 'てんどう', en: 'Tendo', transfers: [], isMajor: true, stoppingTypes: ['limitedExp'] },
      { id: 'YS-08', name: 'さくらんぼ東根', kana: 'さくらんぼひがしね', en: 'Sakuranbo-Higashine', transfers: [], isMajor: true, stoppingTypes: ['limitedExp'] },
      { id: 'YS-09', name: '村山', kana: 'むらやま', en: 'Murayama', transfers: [], isMajor: true, stoppingTypes: ['limitedExp'] },
      { id: 'YS-10', name: '大石田', kana: 'おおいしだ', en: 'Oishida', transfers: [], isMajor: true, stoppingTypes: ['limitedExp'] },
      { id: 'YS-11', name: '新庄', kana: 'しんじょう', en: 'Shinjo', transfers: ['JR奥羽本線', 'JR陸羽西線', 'JR陸羽東線'], isMajor: true, stoppingTypes: ['limitedExp'] },
    ]
  },

  // 6. 秋田新幹線 (大曲スイッチバック考慮)
  {
    lineId: 'akita_shinkansen',
    name: '秋田新幹線',
    operator: 'JR東日本',
    n02Op: '東日本旅客鉄道',
    n02Line: ['田沢湖線', '奥羽線'],
    hasOfficialNumbering: false,
    switchbackStation: '大曲',
    stations: [
      { id: 'AS-01', name: '盛岡', kana: 'もりおか', en: 'Morioka', transfers: ['東北新幹線', 'JR東北本線', 'JR山田線', 'いわて銀河鉄道線'], isMajor: true, stoppingTypes: ['limitedExp'] },
      { id: 'AS-02', name: '雫石', kana: 'しずくいし', en: 'Shizuishi', transfers: [], isMajor: true, stoppingTypes: ['limitedExp'] },
      { id: 'AS-03', name: '田沢湖', kana: 'たざわこ', en: 'Tazawako', transfers: [], isMajor: true, stoppingTypes: ['limitedExp'] },
      { id: 'AS-04', name: '角館', kana: 'かくのだて', en: 'Kakunodate', transfers: ['秋田内陸縦貫鉄道'], isMajor: true, stoppingTypes: ['limitedExp'] },
      { id: 'AS-05', name: '大曲', kana: 'おおまがり', en: 'Omagari', transfers: ['JR奥羽本線'], isMajor: true, stoppingTypes: ['limitedExp'] },
      { id: 'AS-06', name: '秋田', kana: 'あきた', en: 'Akita', transfers: ['JR奥羽本線', 'JR羽越本線', 'JR男鹿線'], isMajor: true, stoppingTypes: ['limitedExp'] },
    ]
  }
];

function buildLine(def) {
  console.log(`\n========================================`);
  console.log(`🚀 Building ${def.name} (${def.lineId})`);
  console.log(`========================================`);

  const features = railData.features.filter(f =>
    f.properties.N02_004 === def.n02Op &&
    (Array.isArray(def.n02Line) ? def.n02Line.includes(f.properties.N02_003) : f.properties.N02_003 === def.n02Line)
  );

  const { adj, nodeCoords } = buildGraphFromFeatures(features, 800);

  // 駅ノードの特定
  const resolvedStations = [];
  for (let i = 0; i < def.stations.length; i++) {
    const stDef = def.stations[i];
    const nodeRes = findStationNode(nodeCoords, stDef.name, def.n02Op, Array.isArray(def.n02Line) ? null : def.n02Line);
    resolvedStations.push({
      ...stDef,
      number: i + 1,
      lat: nodeRes.coord[0],
      lng: nodeRes.coord[1],
      snappedKey: nodeRes.key,
      address: '',
      platforms: { inbound: '上りホーム', outbound: '下りホーム' },
      facilities: { elevator: true, restroom: true, multipurposeToilet: true, waitingRoom: true, ticketOffice: true },
    });
  }

  // セグメントごとのパス探索
  const trackSegments = [];

  for (let i = 0; i < resolvedStations.length - 1; i++) {
    const stA = resolvedStations[i];
    const stB = resolvedStations[i + 1];

    console.log(`  Segment [${stA.name} -> ${stB.name}]`);
    const pathKeys = dijkstraPath(adj, nodeCoords, stA.snappedKey, stB.snappedKey);
    if (!pathKeys || pathKeys.length === 0) {
      throw new Error(`Path failed between ${stA.name} and ${stB.name}`);
    }

    const intermediateCoords = pathKeys.slice(1, -1).map(parseNodeKey);
    const segmentCoords = buildSegmentCoordinates(
      [stA.lat, stA.lng],
      [stB.lat, stB.lng],
      intermediateCoords
    );

    trackSegments.push({
      segmentId: `${stA.id}_${stB.id}`,
      fromStationId: stA.id,
      toStationId: stB.id,
      coordinates: segmentCoords
    });
    console.log(`    Points: ${segmentCoords.length} (distance: ${Math.round(distMeters([stA.lat, stA.lng], [stB.lat, stB.lng]))}m)`);
  }

  // 1. stations.ts の出力
  const stationsTsContent = `import type { Station } from '../../../types';

export const ${def.lineId.toUpperCase()}_STATIONS: Station[] = ${JSON.stringify(
    resolvedStations.map(s => {
      const res = {
        id: s.id,
        ...(def.hasOfficialNumbering && s.num ? { stationNumber: s.num } : {}),
        lineId: def.lineId,
        number: s.number,
        name: s.name,
        nameKana: s.kana,
        nameEn: s.en,
        lat: Number(s.lat.toFixed(6)),
        lng: Number(s.lng.toFixed(6)),
        transfers: s.transfers,
        address: s.address,
        platforms: s.platforms,
        stoppingTypes: s.stoppingTypes,
        isMajor: s.isMajor,
        facilities: s.facilities,
      };
      return res;
    }),
    null,
    2
  )};
`;

  const stationsOutPath = path.resolve(`src/data/lines/${def.lineId}/stations.ts`);
  fs.writeFileSync(stationsOutPath, stationsTsContent, 'utf8');
  console.log(`✅ Saved ${stationsOutPath}`);

  // 2. trackGeometry.ts の出力
  const trackTsContent = `import type { TrackSegment } from '../../../types';

export const ${def.lineId.toUpperCase()}_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(trackSegments, null, 2)};
`;

  const trackOutPath = path.resolve(`src/data/lines/${def.lineId}/trackGeometry.ts`);
  fs.writeFileSync(trackOutPath, trackTsContent, 'utf8');
  console.log(`✅ Saved ${trackOutPath}`);

  return { resolvedStations, trackSegments };
}

function run() {
  for (const def of LINES_DEFINITIONS) {
    buildLine(def);
  }
  console.log('\n🎉 All 6 lines geometry and stations successfully reconstructed!');
}

run();
