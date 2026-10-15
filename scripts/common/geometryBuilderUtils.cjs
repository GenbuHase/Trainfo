const fs = require('fs');
const path = require('path');

// グラフ構築 & BFS
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

function distMeters(p1, p2) {
  const dLat = (p1[0] - p2[0]) * 111000;
  const dLng = (p1[1] - p2[1]) * 111000 * Math.cos(p1[0] * Math.PI / 180);
  return Math.sqrt(dLat * dLat + dLng * dLng);
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
  distMeters,
  subdivideCoordinates,
  findClosestNode,
};
