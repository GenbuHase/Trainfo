const fs = require('fs');
const path = require('path');
const { distMeters, subdivideCoordinates } = require('./common/geometryBuilderUtils.cjs');

// N02データ読み込み
const railData = JSON.parse(fs.readFileSync(path.resolve('scripts/cache/N02-23/UTF-8/N02-23_RailroadSection.geojson'), 'utf8'));
const stationData = JSON.parse(fs.readFileSync(path.resolve('scripts/cache/N02-23/UTF-8/N02-23_Station.geojson'), 'utf8'));

// 境界駅・乗換駅の確定座標（既存路線から完全共有・Playbook Phase 6 準拠）
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
  '千葉': [35.613303, 140.113063],
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

  // 1. 各フィーチャ内のエッジを追加し、端点を収集
  const endpoints = [];
  for (const f of features) {
    const coords = f.geometry.coordinates;
    for (let i = 0; i < coords.length - 1; i++) {
      const uCoord = [coords[i][1], coords[i][0]];
      const vCoord = [coords[i + 1][1], coords[i + 1][0]];
      const uKey = getNodeKey(coords[i]);
      const vKey = getNodeKey(coords[i + 1]);
      addEdge(uKey, vKey, uCoord, vCoord);
    }
    endpoints.push({ key: getNodeKey(coords[0]), coord: [coords[0][1], coords[0][0]] });
    endpoints.push({ key: getNodeKey(coords[coords.length - 1]), coord: [coords[coords.length - 1][1], coords[coords.length - 1][0]] });
  }

  // 2. 端点同士の近傍スナップ（距離 120m 以内の端点はすべて直接接続して隙間を解消）
  for (let i = 0; i < endpoints.length; i++) {
    const ep1 = endpoints[i];
    for (let j = i + 1; j < endpoints.length; j++) {
      const ep2 = endpoints[j];
      if (ep1.key === ep2.key) continue;
      const d = distMeters(ep1.coord, ep2.coord);
      if (d <= 120) {
        addEdge(ep1.key, ep2.key, ep1.coord, ep2.coord);
      }
    }
  }

  // 3. 連結成分の特定
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

  // 4. 残存ギャップ自動ブリッジ
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
      }
    }
  }

  return { adj, nodeCoords };
}

// 進行方向折れ曲がり角の計算 (0=直進, 180=折り返し/Uターン)
function calculateTurnAngle(p1, p2, p3) {
  const v1 = [p2[0] - p1[0], (p2[1] - p1[1]) * Math.cos(p1[0] * Math.PI / 180)];
  const v2 = [p3[0] - p2[0], (p3[1] - p2[1]) * Math.cos(p2[0] * Math.PI / 180)];
  const dot = v1[0] * v2[0] + v1[1] * v2[1];
  const mag1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
  const mag2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
  if (mag1 === 0 || mag2 === 0) return 0;
  const cos = Math.max(-1, Math.min(1, dot / (mag1 * mag2)));
  return Math.acos(cos) * (180 / Math.PI);
}

// 鋭角折り返しトゲのプルーニング
function pruneSharpSpikes(coords) {
  let pts = [...coords];
  let changed = true;
  let iterations = 0;

  while (changed && iterations < 10) {
    changed = false;
    iterations++;
    const next = [pts[0]];

    for (let i = 1; i < pts.length - 1; i++) {
      const p1 = next[next.length - 1];
      const p2 = pts[i];
      const p3 = pts[i + 1];
      const angle = calculateTurnAngle(p1, p2, p3);
      const d1 = distMeters(p1, p2);
      const d2 = distMeters(p2, p3);

      if (angle > 100 && d1 > 5 && d2 > 5) {
        // 折り返し異常トゲをプルーニング
        changed = true;
        continue;
      }
      next.push(p2);
    }
    next.push(pts[pts.length - 1]);
    pts = next;
  }
  return pts;
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

function findStationNode(nodeCoords, stName, filterLine) {
  const matches = stationData.features.filter(f =>
    f.properties.N02_005 === stName &&
    f.properties.N02_004 === '東日本旅客鉄道' &&
    (!filterLine || f.properties.N02_003 === filterLine)
  );

  let targetCoord = null;
  if (matches.length > 0) {
    const c = matches[0].geometry.coordinates[0];
    targetCoord = [c[1], c[0]];
  } else {
    // 任意のJR東日本の駅
    const fallback = stationData.features.filter(f =>
      f.properties.N02_005 === stName && f.properties.N02_004 === '東日本旅客鉄道'
    );
    if (fallback.length > 0) {
      const c = fallback[0].geometry.coordinates[0];
      targetCoord = [c[1], c[0]];
    }
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

  // 35mピッチで均等補間し、滑らかな軌道を生成
  return subdivideCoordinates(clean, 35);
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
