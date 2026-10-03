const fs = require('fs');

const raw1 = JSON.parse(fs.readFileSync('scripts/osm_musashino_raw.json', 'utf8'));
const raw2 = JSON.parse(fs.readFileSync('scripts/osm_musashino_branches.json', 'utf8'));
const raw3 = JSON.parse(fs.readFileSync('scripts/osm_kunitachi_branch_raw.json', 'utf8'));
const coords = JSON.parse(fs.readFileSync('scripts/resolved_musashino_stations.json', 'utf8'));

// 距離計算 (メートル)
function distMeters(p1, p2) {
  const dLat = (p1[0] - p2[0]) * 111000;
  const dLng = (p1[1] - p2[1]) * 111000 * Math.cos((p1[0] * Math.PI) / 180);
  return Math.sqrt(dLat * dLat + dLng * dLng);
}

// 1. ノードマップ
const nodeCoordMap = new Map();
raw1.elements.filter(e => e.type === 'node').forEach(n => nodeCoordMap.set(n.id, [n.lat, n.lon]));
raw2.elements.filter(e => e.type === 'node').forEach(n => nodeCoordMap.set(n.id, [n.lat, n.lon]));
raw3.elements.filter(e => e.type === 'node').forEach(n => nodeCoordMap.set(n.id, [n.lat, n.lon]));

// 2. ウェイ収集
const allWays = [];

function collectWays(elements) {
  elements.filter(e => e.type === 'way').forEach(w => {
    let pts = [];
    if (w.geometry) {
      pts = w.geometry.map(p => [p.lat, p.lon]);
    } else if (w.nodes) {
      pts = w.nodes.map(id => nodeCoordMap.get(id)).filter(Boolean);
    }
    if (pts.length >= 2) {
      allWays.push(pts);
    }
  });
}

collectWays(raw1.elements);
collectWays(raw2.elements);
collectWays(raw3.elements);

console.log(`Collected ${allWays.length} line ways.`);

// 3. グラフノード統合（結合半径 3.0m）
const graphNodes = [];
const nodeGrid = new Map();

function getOrAddNode(lat, lng) {
  const cellLat = Math.floor(lat / 0.0001);
  const cellLng = Math.floor(lng / 0.0001);

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const key = `${cellLat + dy},${cellLng + dx}`;
      const candidates = nodeGrid.get(key);
      if (candidates) {
        for (const idx of candidates) {
          if (distMeters([lat, lng], graphNodes[idx]) < 3.0) {
            return idx;
          }
        }
      }
    }
  }

  const newIdx = graphNodes.length;
  graphNodes.push([lat, lng]);
  const centerKey = `${cellLat},${cellLng}`;
  if (!nodeGrid.has(centerKey)) nodeGrid.set(centerKey, []);
  nodeGrid.get(centerKey).push(newIdx);
  return newIdx;
}

// 隣接リスト
const adj = new Map();

function addEdge(u, v, weight) {
  if (!adj.has(u)) adj.set(u, []);
  if (!adj.has(v)) adj.set(v, []);
  adj.get(u).push({ to: v, weight });
  adj.get(v).push({ to: u, weight });
}

allWays.forEach(pts => {
  for (let i = 0; i < pts.length - 1; i++) {
    const u = getOrAddNode(pts[i][0], pts[i][1]);
    const v = getOrAddNode(pts[i + 1][0], pts[i + 1][1]);
    if (u !== v) {
      const w = distMeters(graphNodes[u], graphNodes[v]);
      addEdge(u, v, w);
    }
  }
});

// ギャップ補正（端点間が 15m 以内なら仮想エッジを追加）
for (let i = 0; i < graphNodes.length; i++) {
  const edges = adj.get(i) || [];
  if (edges.length <= 2) { // 端点または単純ノード
    for (let j = i + 1; j < graphNodes.length; j++) {
      const d = distMeters(graphNodes[i], graphNodes[j]);
      if (d > 0.1 && d <= 15.0) {
        addEdge(i, j, d * 1.5);
      }
    }
  }
}

console.log(`Graph built: ${graphNodes.length} nodes, ${adj.size} connected vertices.`);

// 最寄ノード検索
function findNearestGraphNode(lat, lng) {
  let minD = Infinity;
  let bestIdx = -1;
  for (let i = 0; i < graphNodes.length; i++) {
    const d = distMeters([lat, lng], graphNodes[i]);
    if (d < minD) {
      minD = d;
      bestIdx = i;
    }
  }
  return { nodeIdx: bestIdx, dist: minD };
}

// ダイクストラ法
class MinHeap {
  constructor() { this.data = []; }
  push(item) { this.data.push(item); this._up(this.data.length - 1); }
  pop() {
    if (this.data.length === 0) return null;
    const top = this.data[0];
    const bottom = this.data.pop();
    if (this.data.length > 0) { this.data[0] = bottom; this._down(0); }
    return top;
  }
  _up(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[i].dist < this.data[p].dist) {
        const tmp = this.data[i]; this.data[i] = this.data[p]; this.data[p] = tmp;
        i = p;
      } else break;
    }
  }
  _down(i) {
    const len = this.data.length;
    while ((i << 1) + 1 < len) {
      let left = (i << 1) + 1;
      let right = left + 1;
      let best = (right < len && this.data[right].dist < this.data[left].dist) ? right : left;
      if (this.data[best].dist < this.data[i].dist) {
        const tmp = this.data[i]; this.data[i] = this.data[best]; this.data[best] = tmp;
        i = best;
      } else break;
    }
  }
  size() { return this.data.length; }
}

function findShortestPath(startNode, endNode) {
  if (startNode === endNode) return [graphNodes[startNode]];

  const dist = new Float64Array(graphNodes.length).fill(Infinity);
  const prev = new Int32Array(graphNodes.length).fill(-1);
  dist[startNode] = 0;

  const pq = new MinHeap();
  pq.push({ node: startNode, dist: 0 });

  while (pq.size() > 0) {
    const cur = pq.pop();
    if (cur.dist > dist[cur.node]) continue;
    if (cur.node === endNode) break;

    const neighbors = adj.get(cur.node) || [];
    for (const edge of neighbors) {
      const alt = cur.dist + edge.weight;
      if (alt < dist[edge.to]) {
        dist[edge.to] = alt;
        prev[edge.to] = cur.node;
        pq.push({ node: edge.to, dist: alt });
      }
    }
  }

  if (dist[endNode] === Infinity) return null;

  const path = [];
  let curr = endNode;
  while (curr !== -1) {
    path.push(graphNodes[curr]);
    curr = prev[curr];
  }
  path.reverse();
  return path;
}

// 駅間セグメントの定義
const SEGMENTS_TO_BUILD = [
  // 武蔵野本線
  ['JM-35', 'JM-34', '府中本町', '北府中'],
  ['JM-34', 'JM-33', '北府中', '西国分寺'],
  ['JM-33', 'JM-32', '西国分寺', '新小平'],
  ['JM-32', 'JM-31', '新小平', '新秋津'],
  ['JM-31', 'JM-30', '新秋津', '東所沢'],
  ['JM-30', 'JM-29', '東所沢', '新座'],
  ['JM-29', 'JM-28', '新座', '北朝霞'],
  ['JM-28', 'JM-27', '北朝霞', '西浦和'],
  ['JM-27', 'JM-26', '西浦和', '武蔵浦和'],
  ['JM-26', 'JM-25', '武蔵浦和', '南浦和'],
  ['JM-25', 'JM-24', '南浦和', '東浦和'],
  ['JM-24', 'JM-23', '東浦和', '東川口'],
  ['JM-23', 'JM-22', '東川口', '南越谷'],
  ['JM-22', 'JM-21', '南越谷', '越谷レイクタウン'],
  ['JM-21', 'JM-20', '越谷レイクタウン', '吉川'],
  ['JM-20', 'JM-19', '吉川', '吉川美南'],
  ['JM-19', 'JM-18', '吉川美南', '新三郷'],
  ['JM-18', 'JM-17', '新三郷', '三郷'],
  ['JM-17', 'JM-16', '三郷', '南流山'],
  ['JM-16', 'JM-15', '南流山', '新松戸'],
  ['JM-15', 'JM-14', '新松戸', '新八柱'],
  ['JM-14', 'JM-13', '新八柱', '東松戸'],
  ['JM-13', 'JM-12', '東松戸', '市川大野'],
  ['JM-12', 'JM-11', '市川大野', '船橋法典'],
  ['JM-11', 'JM-10', '船橋法典', '西船橋'],

  // 京葉線東京方面直通
  ['JM-10', 'JE-09', '西船橋', '市川塩浜'],
  ['JE-09', 'JE-08', '市川塩浜', '新浦安'],
  ['JE-08', 'JE-07', '新浦安', '舞浜'],
  ['JE-07', 'JE-06', '舞浜', '葛西臨海公園'],
  ['JE-06', 'JE-05', '葛西臨海公園', '新木場'],
  ['JE-05', 'JE-04', '新木場', '潮見'],
  ['JE-04', 'JE-03', '潮見', '越中島'],
  ['JE-03', 'JE-02', '越中島', '八丁堀'],
  ['JE-02', 'JE-01', '八丁堀', '東京'],

  // 京葉線海浜幕張方面直通
  ['JM-10', 'JE-11', '西船橋', '南船橋'],
  ['JE-11', 'JE-12', '南船橋', '新習志野'],
  ['JE-12', 'JE-13', '新習志野', '幕張豊砂'],
  ['JE-13', 'JE-14', '幕張豊砂', '海浜幕張'],

  // 大宮支線
  ['JA-26', 'JM-26', '大宮', '武蔵浦和'], // しもうさ号用
  ['JA-26', 'JM-28', '大宮', '北朝霞'],   // むさしの号用

  // 中央線直通（むさしの号）
  ['JM-32', 'JC-18', '新小平', '国立'],   // 国立支線
  ['JC-18', 'JC-19', '国立', '立川'],
  ['JC-19', 'JC-20', '立川', '日野'],
  ['JC-20', 'JC-21', '日野', '豊田'],
  ['JC-21', 'JC-22', '豊田', '八王子'],
];

const results = [];
let successCount = 0;

SEGMENTS_TO_BUILD.forEach(([fromId, toId, fromName, toName]) => {
  const fromCoord = coords[fromName];
  const toCoord = coords[toName];

  const startSnap = findNearestGraphNode(fromCoord.lat, fromCoord.lon);
  const endSnap = findNearestGraphNode(toCoord.lat, toCoord.lon);

  const path = findShortestPath(startSnap.nodeIdx, endSnap.nodeIdx);
  if (path && path.length >= 2) {
    const finalCoords = [
      [Math.round(fromCoord.lat * 1000000) / 1000000, Math.round(fromCoord.lon * 1000000) / 1000000],
      ...path.map(p => [Math.round(p[0] * 1000000) / 1000000, Math.round(p[1] * 1000000) / 1000000]),
      [Math.round(toCoord.lat * 1000000) / 1000000, Math.round(toCoord.lon * 1000000) / 1000000],
    ];

    const dedupCoords = [];
    finalCoords.forEach(pt => {
      if (dedupCoords.length === 0 || distMeters(dedupCoords[dedupCoords.length - 1], pt) > 0.5) {
        dedupCoords.push(pt);
      }
    });

    results.push({
      fromStationId: fromId,
      toStationId: toId,
      fromName,
      toName,
      coordinates: dedupCoords,
    });
    successCount++;
    console.log(`✓ ${fromName} -> ${toName} (${fromId} -> ${toId}): ${dedupCoords.length} pts`);
  } else {
    console.warn(`✗ ${fromName} -> ${toName} fallback to linear interpolation`);
    results.push({
      fromStationId: fromId,
      toStationId: toId,
      fromName,
      toName,
      coordinates: [
        [fromCoord.lat, fromCoord.lon],
        [toCoord.lat, toCoord.lon]
      ],
    });
  }
});

console.log(`\nSegment generation finished: ${successCount} / ${SEGMENTS_TO_BUILD.length} paths found.`);

const trackTsContent = `import type { TrackSegment } from '../../../types';

// JR武蔵野線および直通区間 高精度実軌道ジオメトリ（OSM準拠）
export const MUSASHINO_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(results, null, 2)};
`;

fs.writeFileSync('src/data/lines/musashino/trackGeometry.ts', trackTsContent, 'utf8');
console.log('Saved to src/data/lines/musashino/trackGeometry.ts');
