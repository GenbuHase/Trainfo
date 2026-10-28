const fs = require('fs');
const path = require('path');
const { distMeters, subdivideCoordinates } = require('./common/geometryBuilderUtils.cjs');
const { smoothAndSubdivide } = require('./common/splineUtils.cjs');

// N02データ読み込み
const railData = JSON.parse(fs.readFileSync(path.resolve('scripts/cache/N02-23/UTF-8/N02-23_RailroadSection.geojson'), 'utf8'));
const stationData = JSON.parse(fs.readFileSync(path.resolve('scripts/cache/N02-23/UTF-8/N02-23_Station.geojson'), 'utf8'));

// 境界駅・乗換駅の確定座標（JR千葉駅東口・中央改札・ペリエ千葉の公式中心座標に統一）
const FIXED_BOUNDARY_STATIONS = {
  '東京': [35.6810367, 139.7674402],
  '上野': [35.7130911, 139.7772996],
  '大宮': [35.9060944, 139.6230141],
  '池袋': [35.729844, 139.710522],
  '新宿': [35.6891409, 139.7012854],
  '大崎': [35.6192342, 139.7281603],
  '武蔵小杉': [35.5744653, 139.6633332],
  '八王子': [35.6555613, 139.3395384],
  '立川': [35.697956, 139.413704],
  '府中本町': [35.666195, 139.477041],
  '西船橋': [35.707438, 139.959296],
  '千葉': [35.61343, 140.11371], // JR千葉駅公式中心（中央改札・ペリエ千葉直結、全路線共通）
  '蘇我': [35.581691, 140.130656],
  '川崎': [35.531333, 139.696894],
  '横浜': [35.465786, 139.622713],
  '大船': [35.353154, 139.531189],
  '木更津': [35.38036, 139.92599],
  '安房鴨川': [35.10702, 140.10311],
};

function getNodeKey(coord) {
  return `${coord[1].toFixed(6)},${coord[0].toFixed(6)}`;
}

function parseNodeKey(key) {
  const [lat, lon] = key.split(',').map(Number);
  return [lat, lon];
}

function buildGraphFromFeatures(features, maxBridgeDist = 1200) {
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

  // 1. 各フィーチャ内の頂点間をエッジとして接続
  for (const f of features) {
    const coords = f.geometry.coordinates;
    for (let i = 0; i < coords.length - 1; i++) {
      const u = [coords[i][1], coords[i][0]];
      const v = [coords[i + 1][1], coords[i + 1][0]];
      addEdge(getNodeKey(u), getNodeKey(v), u, v);
    }
  }

  // 2. 異なるフィーチャ間の端点間ブリッジ接続（近傍端点同士を自動結合）
  const endPoints = [];
  for (const f of features) {
    const coords = f.geometry.coordinates;
    const pStart = [coords[0][1], coords[0][0]];
    const pEnd = [coords[coords.length - 1][1], coords[coords.length - 1][0]];
    endPoints.push({ key: getNodeKey(pStart), coord: pStart });
    endPoints.push({ key: getNodeKey(pEnd), coord: pEnd });
  }

  for (let i = 0; i < endPoints.length; i++) {
    for (let j = i + 1; j < endPoints.length; j++) {
      const p1 = endPoints[i];
      const p2 = endPoints[j];
      if (p1.key === p2.key) continue;
      const d = distMeters(p1.coord, p2.coord);
      if (d <= maxBridgeDist) {
        addEdge(p1.key, p2.key, p1.coord, p2.coord);
      }
    }
  }

  // 3. 千葉駅構内の総武線ホーム (35.61343, 140.11371) と外房線への渡り線を明示的に接続
  // これにより、千葉駅を起点とする外房線列車が総武線千葉駅ホームから滑らかに出発可能
  const chibaCenterKey = getNodeKey([35.61343, 140.11371]);
  const sotoboBranchKey = getNodeKey([35.61371, 140.11221]);
  if (nodeCoords.has(chibaCenterKey) && nodeCoords.has(sotoboBranchKey)) {
    addEdge(chibaCenterKey, sotoboBranchKey, [35.61343, 140.11371], [35.61371, 140.11221]);
  }

  return { adj, nodeCoords };
}

function dijkstraPath(adj, nodeCoords, startKey, goalKey) {
  if (startKey === goalKey) return [startKey];

  const dist = new Map();
  const prev = new Map();
  const unvisited = new Set();

  dist.set(startKey, 0);
  unvisited.add(startKey);

  const maxVisited = 50000;
  let count = 0;

  while (unvisited.size > 0 && count < maxVisited) {
    count++;
    let minD = Infinity;
    let curr = null;
    for (const key of unvisited) {
      const d = dist.get(key);
      if (d < minD) {
        minD = d;
        curr = key;
      }
    }

    if (curr === null || minD === Infinity) break;
    if (curr === goalKey) {
      const path = [];
      let c = curr;
      while (c !== undefined) {
        path.push(c);
        c = prev.get(c);
      }
      return path.reverse();
    }

    unvisited.delete(curr);
    const currD = dist.get(curr);
    const neighbors = adj.get(curr);
    if (!neighbors) continue;

    for (const [next, edgeD] of neighbors.entries()) {
      const newD = currD + edgeD;
      if (!dist.has(next) || newD < dist.get(next)) {
        dist.set(next, newD);
        prev.set(next, curr);
        unvisited.add(next);
      }
    }
  }

  return null;
}

// 鋭角折り返しトゲ判定（折れ曲がり角度 > 100° かつ腕長 > 5m の折り返しを除去）
function calculateTurnAngle(p1, p2, p3) {
  const v1 = [(p2[0] - p1[0]) * 111000, (p2[1] - p1[1]) * 111000 * Math.cos(p1[0] * Math.PI / 180)];
  const v2 = [(p3[0] - p2[0]) * 111000, (p3[1] - p2[1]) * 111000 * Math.cos(p2[0] * Math.PI / 180)];
  const dot = v1[0] * v2[0] + v1[1] * v2[1];
  const m1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
  const m2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
  if (m1 === 0 || m2 === 0) return 0;
  const cos = Math.max(-1, Math.min(1, dot / (m1 * m2)));
  return Math.acos(cos) * (180 / Math.PI); // 折れ曲がり角 (0 = 直進, 180 = 真逆折り返し)
}

function pruneSharpSpikes(coords) {
  if (coords.length <= 2) return coords;
  let pts = [...coords];
  let changed = true;
  let iterations = 0;

  while (changed && iterations < 5) {
    changed = false;
    iterations++;
    const nextPts = [pts[0]];
    for (let i = 1; i < pts.length - 1; i++) {
      const pPrev = nextPts[nextPts.length - 1];
      const pCurr = pts[i];
      const pNext = pts[i + 1];

      const d1 = distMeters(pPrev, pCurr);
      const d2 = distMeters(pCurr, pNext);
      const turnAngle = calculateTurnAngle(pPrev, pCurr, pNext);

      // 折れ曲がり角が100°以上の鋭角急ターンで、かつ両腕が5m以上ある不自然なトゲを除去
      if (turnAngle > 100 && d1 > 5 && d2 > 5) {
        changed = true;
        continue;
      }
      nextPts.push(pCurr);
    }
    nextPts.push(pts[pts.length - 1]);
    pts = nextPts;
  }
  return pts;
}

function findStationNode(stName, fallbackCoord, nodeCoords, stationData, n02Lines) {
  let targetCoord = fallbackCoord;

  const altName = stName.includes('ケ') ? stName.replace(/ケ/g, 'ヶ') : stName.replace(/ヶ/g, 'ケ');
  const matches = stationData.features.filter(f =>
    (f.properties.N02_005 === stName || f.properties.N02_005 === altName) &&
    f.properties.N02_004 === '東日本旅客鉄道' &&
    n02Lines.includes(f.properties.N02_003)
  );

  if (matches.length > 0) {
    const c = matches[0].geometry.coordinates[0];
    targetCoord = [c[1], c[0]];
  }

  let minDist = Infinity;
  let bestKey = null;
  for (const [key, coord] of nodeCoords.entries()) {
    const d = distMeters(targetCoord, coord);
    if (d < minDist) {
      minDist = d;
      bestKey = key;
    }
  }
  return { key: bestKey, coord: targetCoord, snappedDist: minDist };
}

function buildSegmentCoordinates(fromCoord, toCoord, rawNodeCoords) {
  const pts = [fromCoord, ...rawNodeCoords, toCoord];
  let deduplicated = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    if (distMeters(pts[i], deduplicated[deduplicated.length - 1]) > 0.5) {
      deduplicated.push(pts[i]);
    }
  }

  // 鋭角折り返しトゲのプルーニング
  const clean = pruneSharpSpikes(deduplicated);

  // Catmull-Rom スプライン補間を適用し、15mピッチで滑らかなリアル軌道を生成
  return smoothAndSubdivide(clean, 15);
}

module.exports = {
  railData,
  stationData,
  FIXED_BOUNDARY_STATIONS,
  getNodeKey,
  parseNodeKey,
  buildGraphFromFeatures,
  dijkstraPath,
  findStationNode,
  buildSegmentCoordinates,
};
