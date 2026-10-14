const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/cache/osm_sotetsu_tokyu_raw.json', 'utf8'));

const nodeMap = new Map();
const wayMap = new Map();

for (const el of raw.elements) {
  if (el.type === 'node') {
    nodeMap.set(el.id, [el.lat, el.lon]);
  } else if (el.type === 'way') {
    wayMap.set(el.id, el);
  }
}

function dist(p1, p2) {
  const dy = (p1[0] - p2[0]) * 111320;
  const dx = (p1[1] - p2[1]) * 111320 * Math.cos((p1[0] * Math.PI) / 180);
  return Math.sqrt(dx * dx + dy * dy);
}

function chainRelationWays(relIds) {
  const ways = [];
  for (const relId of relIds) {
    const rel = raw.elements.find(e => e.type === 'relation' && e.id === relId);
    if (rel) {
      ways.push(...rel.members.filter(m => m.type === 'way').map(m => wayMap.get(m.ref)).filter(Boolean));
    }
  }

  const adj = new Map();
  for (const w of ways) {
    for (let i = 0; i < w.nodes.length - 1; i++) {
      const u = w.nodes[i];
      const v = w.nodes[i + 1];
      if (!adj.has(u)) adj.set(u, new Set());
      if (!adj.has(v)) adj.set(v, new Set());
      adj.get(u).add(v);
      adj.get(v).add(u);
    }
  }

  return { ways, adj };
}

function findClosestNode(targetCoord, candidateNodeIds) {
  let closest = null;
  let minDist = Infinity;
  for (const nid of candidateNodeIds) {
    const coord = nodeMap.get(nid);
    if (!coord) continue;
    const d = dist(targetCoord, coord);
    if (d < minDist) {
      minDist = d;
      closest = nid;
    }
  }
  return { nodeId: closest, dist: minDist };
}

function bfsPath(startNodeId, targetNodeId, adj) {
  if (startNodeId === targetNodeId) return [startNodeId];
  const queue = [startNodeId];
  const visited = new Set([startNodeId]);
  const parent = new Map();

  while (queue.length > 0) {
    const cur = queue.shift();
    if (cur === targetNodeId) {
      const path = [];
      let c = targetNodeId;
      while (c !== undefined) {
        path.push(c);
        c = parent.get(c);
      }
      return path.reverse();
    }

    const neighbors = adj.get(cur) || [];
    for (const n of neighbors) {
      if (!visited.has(n)) {
        visited.add(n);
        parent.set(n, cur);
        queue.push(n);
      }
    }
  }
  return null;
}

// 1. Sotetsu Shin-Yokohama Line
console.log('\n--- SOTETSU SHIN-YOKOHAMA ---');
const { adj: syAdj } = chainRelationWays([14681763, 14681764, 8449597]);
const syStations = [
  { name: '新横浜', coord: [35.5088707, 139.6171662] },
  { name: '羽沢横浜国大', coord: [35.4812677, 139.5862425] },
  { name: '西谷', coord: [35.4780622, 139.5654649] },
];
for (let i = 0; i < syStations.length - 1; i++) {
  const s1 = syStations[i];
  const s2 = syStations[i + 1];
  const snap1 = findClosestNode(s1.coord, syAdj.keys());
  const snap2 = findClosestNode(s2.coord, syAdj.keys());
  const p = bfsPath(snap1.nodeId, snap2.nodeId, syAdj);
  console.log(`${s1.name} -> ${s2.name}: ${p?.length} nodes (snaps: ${snap1.dist.toFixed(1)}m, ${snap2.dist.toFixed(1)}m)`);
}

// 2. Sotetsu Main Line
console.log('\n--- SOTETSU MAIN ---');
const { adj: mainAdj } = chainRelationWays([10358686, 10358687]);
const mainStations = [
  { name: '横浜', coord: [35.4651573, 139.6209776] },
  { name: '平沼橋', coord: [35.4599264, 139.6165229] },
  { name: '西横浜', coord: [35.4535117, 139.6088013] },
  { name: '天王町', coord: [35.4540085, 139.6026888] },
  { name: '星川', coord: [35.4588221, 139.5946793] },
  { name: '和田町', coord: [35.4637861, 139.5864138] },
  { name: '上星川', coord: [35.467445, 139.580335] },
  { name: '西谷', coord: [35.4780622, 139.5654649] },
  { name: '鶴ヶ峰', coord: [35.4750458, 139.5496591] },
  { name: '二俣川', coord: [35.4633846, 139.5322757] },
  { name: '希望ヶ丘', coord: [35.4606724, 139.5134001] },
  { name: '三ツ境', coord: [35.4679494, 139.5022796] },
  { name: '瀬谷', coord: [35.4705267, 139.4828959] },
  { name: '大和', coord: [35.4700147, 139.4614084] },
  { name: '相模大塚', coord: [35.4706234, 139.441079] },
  { name: 'さがみ野', coord: [35.4715402, 139.4285206] },
  { name: 'かしわ台', coord: [35.4668983, 139.415601] },
  { name: '海老名', coord: [35.4530251, 139.3917889] },
];
for (let i = 0; i < mainStations.length - 1; i++) {
  const s1 = mainStations[i];
  const s2 = mainStations[i + 1];
  const snap1 = findClosestNode(s1.coord, mainAdj.keys());
  const snap2 = findClosestNode(s2.coord, mainAdj.keys());
  const p = bfsPath(snap1.nodeId, snap2.nodeId, mainAdj);
  console.log(`${s1.name} -> ${s2.name}: ${p?.length} nodes (snaps: ${snap1.dist.toFixed(1)}m, ${snap2.dist.toFixed(1)}m)`);
}

// 3. Sotetsu Izumino Line
console.log('\n--- SOTETSU IZUMINO ---');
const { adj: izuminoAdj } = chainRelationWays([1968180, 9561172]);
const izuminoStations = [
  { name: '二俣川', coord: [35.4633846, 139.5322757] },
  { name: '南万騎が原', coord: [35.4525798, 139.5263862] },
  { name: '緑園都市', coord: [35.4394513, 139.5219084] },
  { name: '弥生台', coord: [35.4299039, 139.5062629] },
  { name: 'いずみ野', coord: [35.4295908, 139.495126] },
  { name: 'いずみ中央', coord: [35.4152581, 139.4873447] },
  { name: 'ゆめが丘', coord: [35.4056861, 139.4825083] },
  { name: '湘南台', coord: [35.3962433, 139.4664505] },
];
for (let i = 0; i < izuminoStations.length - 1; i++) {
  const s1 = izuminoStations[i];
  const s2 = izuminoStations[i + 1];
  const snap1 = findClosestNode(s1.coord, izuminoAdj.keys());
  const snap2 = findClosestNode(s2.coord, izuminoAdj.keys());
  const p = bfsPath(snap1.nodeId, snap2.nodeId, izuminoAdj);
  console.log(`${s1.name} -> ${s2.name}: ${p?.length} nodes (snaps: ${snap1.dist.toFixed(1)}m, ${snap2.dist.toFixed(1)}m)`);
}
