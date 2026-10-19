const fs = require('fs');
const path = require('path');
const { distMeters, subdivideCoordinates } = require('./common/geometryBuilderUtils.cjs');

// 固定境界駅座標（既存路線と 0.0m 完全一致・Playbook Phase 6 準拠）
const FIXED_BOUNDARY_STATIONS = {
  '大月': [35.613106, 138.942176],       // chuo_main JC-32
  '国府津': [35.2812092, 139.2142253],   // tokaido JT-14
  '伊東': [34.9755861, 139.0922222],     // ito JT-26
  '三島': [35.1264, 138.9109],           // tokaido_shizuoka CA-02
  '沼津': [35.1031271, 138.8593352],     // tokaido_shizuoka CA-03
  '松田': [35.3447025, 139.1395994],     // odakyu_odawara OH-41 (新松田至近)
  '福島': [37.7544085, 140.4586226],     // tohoku_shinkansen TS-09
  '盛岡': [39.7014809, 141.136534],      // tohoku_shinkansen TS-18
};

// 重み付き隣接グラフ構築（自動ギャップ架橋付き・物理距離重み）
function buildWeightedGraphWithBridges(elements, nodeMap, maxBridgeDist = 800) {
  const adj = new Map();
  function addEdge(u, v) {
    const nu = nodeMap.get(u);
    const nv = nodeMap.get(v);
    if (!nu || !nv) return;
    const d = distMeters([nu.lat, nu.lon], [nv.lat, nv.lon]);
    if (!adj.has(u)) adj.set(u, new Map());
    if (!adj.has(v)) adj.set(v, new Map());
    adj.get(u).set(v, Math.min(adj.get(u).get(v) || Infinity, d));
    adj.get(v).set(u, Math.min(adj.get(v).get(u) || Infinity, d));
  }

  for (const e of elements) {
    if (e.type === 'way' && e.nodes) {
      for (let i = 0; i < e.nodes.length - 1; i++) {
        addEdge(e.nodes[i], e.nodes[i + 1]);
      }
    }
  }

  // 連結成分の特定
  const visited = new Set();
  const components = [];
  for (const nodeId of adj.keys()) {
    if (!visited.has(nodeId)) {
      const comp = [];
      const q = [nodeId];
      visited.add(nodeId);
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

  // 規模の大きいコンポーネント同士で、距離が maxBridgeDist 以内の最短ノードペアを自動接続
  if (components.length > 1) {
    components.sort((a, b) => b.length - a.length);
    const mainNodes = new Set(components[0]);

    for (let c = 1; c < components.length; c++) {
      const subComp = components[c];
      let bestU = null;
      let bestV = null;
      let minDist = Infinity;

      for (const u of subComp) {
        const nu = nodeMap.get(u);
        if (!nu) continue;
        for (const v of mainNodes) {
          const nv = nodeMap.get(v);
          if (!nv) continue;
          const d = distMeters([nu.lat, nu.lon], [nv.lat, nv.lon]);
          if (d < minDist) {
            minDist = d;
            bestU = u;
            bestV = v;
          }
        }
      }

      if (minDist <= maxBridgeDist && bestU && bestV) {
        addEdge(bestU, bestV);
        for (const n of subComp) mainNodes.add(n);
        console.log(`  [Bridge] Connected gap of ${Math.round(minDist)}m between nodes ${bestU} and ${bestV}`);
      }
    }
  }

  return adj;
}

// ダイクストラ法（物理距離最短経路探索）
function dijkstraPath(adj, startId, goalId) {
  if (startId === goalId) return [startId];
  const dist = new Map();
  const prev = new Map();
  const visited = new Set();

  const pq = new Map();
  pq.set(startId, 0);
  dist.set(startId, 0);

  while (pq.size > 0) {
    let curr = null;
    let minD = Infinity;
    for (const [id, d] of pq.entries()) {
      if (d < minD) {
        minD = d;
        curr = id;
      }
    }
    if (curr === null || minD === Infinity) break;
    if (curr === goalId) break;

    pq.delete(curr);
    visited.add(curr);

    const neighbors = adj.get(curr) || new Map();
    for (const [next, weight] of neighbors.entries()) {
      if (visited.has(next)) continue;
      const alt = minD + weight;
      if (alt < (dist.get(next) || Infinity)) {
        dist.set(next, alt);
        prev.set(next, curr);
        pq.set(next, alt);
      }
    }
  }

  if (!prev.has(goalId) && startId !== goalId) return null;
  const path = [];
  let cur = goalId;
  while (cur !== undefined) {
    path.push(cur);
    cur = prev.get(cur);
  }
  return path.reverse();
}

function loadOsm(osmFilePath) {
  const data = JSON.parse(fs.readFileSync(path.resolve(osmFilePath), 'utf8'));
  const nodeMap = new Map();
  const allElements = [];
  for (const el of data.elements) {
    if (el.type === 'node') {
      nodeMap.set(el.id, el);
    }
    allElements.push(el);
  }
  const adj = buildWeightedGraphWithBridges(allElements, nodeMap, 800);
  return { nodeMap, adj, allElements };
}

function findStationNodeCandidates(nodeMap, adj, targetCoord, topN = 6) {
  const scored = [];
  for (const trackNodeId of adj.keys()) {
    const node = nodeMap.get(trackNodeId);
    if (!node) continue;
    const d = distMeters(targetCoord, [node.lat, node.lon]);
    scored.push({ node, dist: d });
  }
  scored.sort((a, b) => a.dist - b.dist);
  return scored.slice(0, topN).map(s => s.node);
}

function processLine({ lineId, osmFile, exportPrefix }) {
  console.log(`\n=================== Building Robust Geometry for ${lineId} ===================`);
  const stationsFile = path.resolve(`src/data/lines/${lineId}/stations.ts`);
  const stationsRaw = fs.readFileSync(stationsFile, 'utf8');
  const stationsJsonStr = stationsRaw.substring(stationsRaw.indexOf('= [') + 2, stationsRaw.lastIndexOf(']') + 1);
  const stationsMaster = eval(`(${stationsJsonStr})`);

  const { nodeMap, adj } = loadOsm(osmFile);

  // 各駅の候補ノードを特定
  const candidatesPerStation = [];
  for (let i = 0; i < stationsMaster.length; i++) {
    const st = stationsMaster[i];
    const targetCoord = FIXED_BOUNDARY_STATIONS[st.name] || [st.lat, st.lng];
    const cands = findStationNodeCandidates(nodeMap, adj, targetCoord, 6);
    if (cands.length === 0) {
      throw new Error(`[${lineId}] No candidates found for station: ${st.name}`);
    }
    candidatesPerStation.push(cands);
  }

  // 起点から終点へ向かってダイクストラ法で「物理距離最短」のパスを探索
  const selectedNodes = new Array(stationsMaster.length).fill(null);
  selectedNodes[0] = candidatesPerStation[0][0];

  const trackSegments = [];

  for (let i = 0; i < stationsMaster.length - 1; i++) {
    const fromSt = stationsMaster[i];
    const toSt = stationsMaster[i + 1];
    const fromNode = selectedNodes[i];
    const nextCandidates = candidatesPerStation[i + 1];

    let bestPath = null;
    let bestDist = Infinity;
    let bestToNode = null;

    // 次の駅の候補の中から物理距離が最も短いパスを選択（迂回・往復・ループの完全防止）
    for (const cand of nextCandidates) {
      const p = dijkstraPath(adj, fromNode.id, cand.id);
      if (p) {
        let d = 0;
        for (let j = 0; j < p.length - 1; j++) {
          const na = nodeMap.get(p[j]);
          const nb = nodeMap.get(p[j + 1]);
          d += distMeters([na.lat, na.lon], [nb.lat, nb.lon]);
        }
        if (d < bestDist) {
          bestDist = d;
          bestPath = p;
          bestToNode = cand;
        }
      }
    }

    if (!bestPath) {
      // 直線接続フォールバック
      bestToNode = nextCandidates[0];
      const d = distMeters([fromNode.lat, fromNode.lon], [bestToNode.lat, bestToNode.lon]);
      console.warn(`[${lineId}] Path not found between ${fromSt.name} and ${toSt.name} (${Math.round(d)}m), fallback to direct segment.`);
      bestPath = [fromNode.id, bestToNode.id];
    }

    selectedNodes[i + 1] = bestToNode;

    const fromCoord = FIXED_BOUNDARY_STATIONS[fromSt.name] || [fromNode.lat, fromNode.lon];
    const toCoord = FIXED_BOUNDARY_STATIONS[toSt.name] || [bestToNode.lat, bestToNode.lon];

    const rawCoords = bestPath.map(id => {
      const n = nodeMap.get(id);
      return [n.lat, n.lon];
    });

    // 両端を確定駅座標に厳密結合
    const fullCoords = [fromCoord, ...rawCoords, toCoord];

    // 重複点の除去（1m未満）
    const deduplicated = [fullCoords[0]];
    for (let k = 1; k < fullCoords.length; k++) {
      if (distMeters(fullCoords[k], deduplicated[deduplicated.length - 1]) > 1) {
        deduplicated.push(fullCoords[k]);
      }
    }

    // 従来仕様: 100mピッチで平滑化（PLAYBOOK Phase 2 準拠）
    const smoothed = subdivideCoordinates(deduplicated, 100);

    const straightDist = distMeters(fromCoord, toCoord);
    const trackLen = bestDist || straightDist;
    const ratio = (trackLen / (straightDist || 1)).toFixed(2);
    console.log(`  Seg ${fromSt.name} -> ${toSt.name}: straight=${(straightDist/1000).toFixed(2)}km, track=${(trackLen/1000).toFixed(2)}km, ratio=${ratio}x, pts=${smoothed.length}`);

    trackSegments.push({
      segmentId: `${fromSt.id}_${toSt.id}`,
      fromStationId: fromSt.id,
      toStationId: toSt.id,
      coordinates: smoothed,
    });
  }

  // Station[] の駅座標を確定
  const updatedStations = stationsMaster.map((st, idx) => {
    const node = selectedNodes[idx];
    const finalCoord = FIXED_BOUNDARY_STATIONS[st.name] || [node.lat, node.lon];
    return {
      ...st,
      lat: finalCoord[0],
      lng: finalCoord[1],
    };
  });

  console.log(`[${lineId}] Built ${updatedStations.length} stations, ${trackSegments.length} segments.`);
  const totalCoords = trackSegments.reduce((sum, seg) => sum + seg.coordinates.length, 0);
  console.log(`[${lineId}] Total coordinates: ${totalCoords} (average ${(totalCoords / trackSegments.length).toFixed(1)} pts/seg)`);

  // ファイル出力
  const outDir = path.resolve(`src/data/lines/${lineId}`);

  // 1. stations.ts
  const stationExportName = `${exportPrefix}_STATIONS`;
  const stationsTsContent = `import type { Station } from '../../../types';\n\nexport const ${stationExportName}: Station[] = ${JSON.stringify(updatedStations, null, 2)};\n`;
  fs.writeFileSync(path.join(outDir, 'stations.ts'), stationsTsContent, 'utf8');

  // 2. trackGeometry.ts
  const trackExportName = `${exportPrefix}_TRACK_SEGMENTS`;
  const trackTsContent = `import type { TrackSegment } from '../../../types';\n\nexport const ${trackExportName}: TrackSegment[] = ${JSON.stringify(trackSegments, null, 2)};\n`;
  fs.writeFileSync(path.join(outDir, 'trackGeometry.ts'), trackTsContent, 'utf8');

  console.log(`[${lineId}] Successfully saved stations.ts and trackGeometry.ts`);
}

const TARGET_LINES = [
  { lineId: 'izuhakone_sunzu', osmFile: 'scripts/cache/osm_izuhakone_sunzu.json', exportPrefix: 'IZUHAKONE_SUNZU' },
  { lineId: 'izukyu', osmFile: 'scripts/cache/osm_izukyu.json', exportPrefix: 'IZUKYU' },
  { lineId: 'fujikyu', osmFile: 'scripts/cache/osm_fujikyu.json', exportPrefix: 'FUJIKYU' },
  { lineId: 'gotemba', osmFile: 'scripts/cache/osm_gotemba.json', exportPrefix: 'GOTEMBA' },
  { lineId: 'yamagata_shinkansen', osmFile: 'scripts/cache/osm_yamagata_shinkansen.json', exportPrefix: 'YAMAGATA_SHINKANSEN' },
  { lineId: 'akita_shinkansen', osmFile: 'scripts/cache/osm_akita_shinkansen.json', exportPrefix: 'AKITA_SHINKANSEN' },
];

for (const target of TARGET_LINES) {
  processLine(target);
}

console.log('\nAll 6 lines rebuilt with robust geometry successfully!');
