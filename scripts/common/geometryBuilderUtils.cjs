const fs = require('fs');
const path = require('path');

function distMeters(p1, p2) {
  const dLat = (p1[0] - p2[0]) * 111000;
  const dLng = (p1[1] - p2[1]) * 111000 * Math.cos(p1[0] * Math.PI / 180);
  return Math.sqrt(dLat * dLat + dLng * dLng);
}

// グラフ構築 & BFS (旧互換用)
function buildAdjGraph(elements) {
  const adj = new Map();
  function addEdge(u, v) {
    if (!adj.has(u)) adj.set(u, new Set());
    if (!adj.has(v)) adj.set(v, new Set());
    adj.get(u).add(v);
    adj.get(v).add(u);
  }

  for (const e of elements) {
    if (e.type === 'way' && e.nodes) {
      for (let i = 0; i < e.nodes.length - 1; i++) {
        addEdge(e.nodes[i], e.nodes[i + 1]);
      }
    }
  }
  return adj;
}

function bfsPath(adj, startId, goalId) {
  if (startId === goalId) return [startId];
  const queue = [startId];
  const visited = new Map();
  visited.set(startId, null);

  while (queue.length > 0) {
    const curr = queue.shift();
    if (curr === goalId) {
      const p = [];
      let cur = curr;
      while (cur !== null) {
        p.push(cur);
        cur = visited.get(cur);
      }
      return p.reverse();
    }

    const neighbors = adj.get(curr) || [];
    for (const next of neighbors) {
      if (!visited.has(next)) {
        visited.set(next, curr);
        queue.push(next);
      }
    }
  }
  return null;
}

// 距離重み付きグラフ構築
function buildWeightedGraph(elements, nodeMap) {
  const adj = new Map();
  function addEdge(u, v, dist) {
    if (!adj.has(u)) adj.set(u, []);
    if (!adj.has(v)) adj.set(v, []);
    adj.get(u).push({ to: v, dist });
    adj.get(v).push({ to: u, dist });
  }

  for (const e of elements) {
    if (e.type === 'way' && e.nodes) {
      for (let i = 0; i < e.nodes.length - 1; i++) {
        const u = e.nodes[i];
        const v = e.nodes[i + 1];
        const nu = nodeMap.get(u);
        const nv = nodeMap.get(v);
        if (nu && nv) {
          addEdge(u, v, distMeters([nu.lat, nu.lon], [nv.lat, nv.lon]));
        }
      }
    }
  }
  return adj;
}

// 端点同士の微小ギャップをスナップして接続
function snapEndpoints(ways, nodeMap, adj, thresholdMeters = 30) {
  const endpoints = [];
  for (const w of ways) {
    if (!w.nodes || w.nodes.length === 0) continue;
    endpoints.push(w.nodes[0], w.nodes[w.nodes.length - 1]);
  }
  let count = 0;
  for (let i = 0; i < endpoints.length; i++) {
    const u = endpoints[i];
    const nu = nodeMap.get(u);
    if (!nu) continue;
    for (let j = i + 1; j < endpoints.length; j++) {
      const v = endpoints[j];
      if (u === v) continue;
      const nv = nodeMap.get(v);
      if (!nv) continue;
      const d = distMeters([nu.lat, nu.lon], [nv.lat, nv.lon]);
      if (d <= thresholdMeters) {
        if (!adj.has(u)) adj.set(u, []);
        if (!adj.has(v)) adj.set(v, []);
        adj.get(u).push({ to: v, dist: d });
        adj.get(v).push({ to: u, dist: d });
        count++;
      }
    }
  }
  return count;
}

// ダイクストラ最短距離経路探索
function dijkstraPath(adj, nodeMap, startId, goalId) {
  if (startId === goalId) return [startId];
  const dist = new Map();
  const prev = new Map();
  const unvisited = new Set([startId]);
  dist.set(startId, 0);

  while (unvisited.size > 0) {
    let minD = Infinity;
    let curr = null;
    for (const id of unvisited) {
      const d = dist.get(id);
      if (d < minD) {
        minD = d;
        curr = id;
      }
    }

    if (curr === null || minD === Infinity) break;
    if (curr === goalId) {
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
    const neighbors = adj.get(curr) || [];

    for (const { to, dist: edgeD } of neighbors) {
      const newD = currD + edgeD;
      if (!dist.has(to) || newD < dist.get(to)) {
        dist.set(to, newD);
        prev.set(to, curr);
        unvisited.add(to);
      }
    }
  }
  return null;
}

// 150m以上離れている区間を等分割補間
function subdivideCoordinates(coords, maxStep = 150) {
  const result = [coords[0]];
  for (let i = 0; i < coords.length - 1; i++) {
    const p1 = coords[i];
    const p2 = coords[i + 1];
    const d = distMeters(p1, p2);
    if (d > maxStep) {
      const steps = Math.ceil(d / maxStep);
      for (let s = 1; s < steps; s++) {
        const t = s / steps;
        result.push([
          p1[0] + (p2[0] - p1[0]) * t,
          p1[1] + (p2[1] - p1[1]) * t,
        ]);
      }
    }
    result.push(p2);
  }
  return result;
}

// 駅ノード最近傍スナップ
function findClosestNode(nodeMap, targetCoord, candidateNodeIds = null) {
  let bestNode = null;
  let minD = Infinity;
  const ids = candidateNodeIds || Array.from(nodeMap.keys());
  for (const id of ids) {
    const n = nodeMap.get(id);
    if (!n) continue;
    const d = distMeters(targetCoord, [n.lat, n.lon]);
    if (d < minD) {
      minD = d;
      bestNode = n;
    }
  }
  return { node: bestNode, distance: minD };
}

module.exports = {
  buildAdjGraph,
  bfsPath,
  buildWeightedGraph,
  snapEndpoints,
  dijkstraPath,
  distMeters,
  subdivideCoordinates,
  findClosestNode,
};
