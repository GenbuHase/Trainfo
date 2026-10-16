const fs = require('fs');
const path = require('path');
const { distMeters, subdivideCoordinates } = require('./common/geometryBuilderUtils.cjs');
const { STATION_META } = require('./common/stationMetaDict.cjs');

// 各路線の Yahoo! 調査済み座標辞書をロード
const probedFiles = [
  'scripts/cache/yahoo_myoko_probed.json',
  'scripts/cache/yahoo_kita_shinano_probed.json',
  'scripts/cache/yahoo_hisui_probed.json',
  'scripts/cache/yahoo_hokuhoku_probed.json',
  'scripts/cache/yahoo_hokuriku_probed.json',
];

const STATION_COORDS = new Map();
for (const f of probedFiles) {
  if (fs.existsSync(f)) {
    const list = JSON.parse(fs.readFileSync(f, 'utf8'));
    for (const item of list) {
      if (item.name && item.detail?.coords) {
        STATION_COORDS.set(item.name, {
          lat: item.detail.coords[1],
          lon: item.detail.coords[0]
        });
      }
    }
  }
}

STATION_COORDS.set('六日町', { lat: 37.0673, lon: 138.8755 });
STATION_COORDS.set('富山', { lat: 36.7013, lon: 137.2134 });
STATION_COORDS.set('金沢', { lat: 36.5781, lon: 136.6478 });
STATION_COORDS.set('敦賀', { lat: 35.6548, lon: 136.0747 });
STATION_COORDS.set('青海', { lat: 37.0383, lon: 137.7523 });

function buildAdjGraphWithBridges(elements, nodeMap, maxBridgeDist = 500) {
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

  // コンポーネントを特定
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
        for (const next of adj.get(curr) || []) {
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
  const mainComps = components.filter(c => c.length >= 20);
  for (let i = 0; i < mainComps.length - 1; i++) {
    for (let j = i + 1; j < mainComps.length; j++) {
      let minDist = Infinity;
      let bestPair = null;
      for (const u of mainComps[i]) {
        const nu = nodeMap.get(u);
        if (!nu) continue;
        for (const v of mainComps[j]) {
          const nv = nodeMap.get(v);
          if (!nv) continue;
          const d = distMeters([nu.lat, nu.lon], [nv.lat, nv.lon]);
          if (d < minDist) {
            minDist = d;
            bestPair = [u, v];
          }
        }
      }
      if (minDist <= maxBridgeDist && bestPair) {
        console.log(`[Bridge] Connected gap of ${Math.round(minDist)}m between nodes ${bestPair[0]} and ${bestPair[1]}`);
        addEdge(bestPair[0], bestPair[1]);
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

function loadMergedOsm(filePaths) {
  const nodeMap = new Map();
  const allElements = [];
  for (const fp of filePaths) {
    if (!fs.existsSync(path.resolve(fp))) continue;
    const data = JSON.parse(fs.readFileSync(path.resolve(fp), 'utf8'));
    for (const el of data.elements) {
      if (el.type === 'node') {
        if (!nodeMap.has(el.id)) {
          nodeMap.set(el.id, el);
          allElements.push(el);
        }
      } else {
        allElements.push(el);
      }
    }
  }
  const adj = buildAdjGraphWithBridges(allElements, nodeMap, 500);
  return { nodeMap, adj, allElements };
}

function findStationNodeCandidates(allElements, nodeMap, adj, stationName) {
  const aliases = [
    stationName,
    `${stationName}駅`,
    stationName.replace(/ケ/g, 'ヶ'),
    stationName.replace(/ヶ/g, 'ケ'),
    `${stationName.replace(/ケ/g, 'ヶ')}駅`,
    `${stationName.replace(/ヶ/g, 'ケ')}駅`,
  ];

  const rawCandidates = [];
  for (const el of allElements) {
    if (el.type !== 'node') continue;
    const name = el.tags?.name || el.tags?.['name:ja'] || '';
    if (aliases.includes(name) || (stationName.length >= 2 && name.startsWith(stationName))) {
      rawCandidates.push(el);
    }
  }

  const results = [];
  // 線路上に直接存在するノード（adj.has）を優先
  for (const c of rawCandidates) {
    if (adj.has(c.id)) {
      results.push(c);
    }
  }

  // 線路上にないPOIノードしかなければ、そのPOIノードから最寄りの線路ノード（adj.has）を探索してスナップ
  if (results.length === 0 && rawCandidates.length > 0) {
    for (const poi of rawCandidates) {
      let nearestTrackNode = null;
      let minDist = Infinity;
      for (const trackNodeId of adj.keys()) {
        const tn = nodeMap.get(trackNodeId);
        if (!tn) continue;
        const d = distMeters([poi.lat, poi.lon], [tn.lat, tn.lon]);
        if (d < minDist && d < 1000) {
          minDist = d;
          nearestTrackNode = tn;
        }
      }
      if (nearestTrackNode) {
        console.log(`[Snap POI] Snapped POI "${stationName}" (${poi.id}) to track node ${nearestTrackNode.id} (${Math.round(minDist)}m)`);
        results.push(nearestTrackNode);
      }
    }
  }

  // 目標座標から最近傍ノードをフォールバック検索
  if (results.length === 0 && STATION_COORDS.has(stationName)) {
    const target = STATION_COORDS.get(stationName);
    let nearestNode = null;
    let minDist = Infinity;
    for (const trackNodeId of adj.keys()) {
      const node = nodeMap.get(trackNodeId);
      if (!node) continue;
      const d = distMeters([node.lat, node.lon], [target.lat, target.lon]);
      if (d < minDist && d < 1500) {
        minDist = d;
        nearestNode = node;
      }
    }
    if (nearestNode) {
      console.log(`[Snap Coord] Found nearest node ${nearestNode.id} for "${stationName}" (${Math.round(minDist)}m)`);
      results.push(nearestNode);
    }
  }

  return results;
}

function buildLineDataRobust({
  lineId,
  osmFiles,
  stationsConfig,
  stationPrefix,
  outputDir,
}) {
  console.log(`\n=================== Building ${lineId} ===================`);
  const { nodeMap, adj, allElements } = loadMergedOsm(osmFiles);

  const candidatesPerStation = [];
  for (let i = 0; i < stationsConfig.length; i++) {
    const cfg = stationsConfig[i];
    const cands = findStationNodeCandidates(allElements, nodeMap, adj, cfg.name);
    if (cands.length === 0) {
      throw new Error(`[${lineId}] Station node candidate not found for: ${cfg.name}`);
    }
    candidatesPerStation.push(cands);
  }

  // 起点から終点へ向かって BFS でパスを探索
  const selectedNodes = new Array(stationsConfig.length).fill(null);
  selectedNodes[0] = candidatesPerStation[0][0];

  for (let i = 0; i < stationsConfig.length - 1; i++) {
    const fromNode = selectedNodes[i];
    const nextCandidates = candidatesPerStation[i + 1];

    let foundPath = null;
    let bestToNode = null;

    for (const cand of nextCandidates) {
      const p = bfsPath(adj, fromNode.id, cand.id);
      if (p) {
        foundPath = p;
        bestToNode = cand;
        break;
      }
    }

    if (!foundPath) {
      // バックトラック
      let backtracked = false;
      for (const altFrom of candidatesPerStation[i]) {
        if (altFrom.id === fromNode.id) continue;
        for (const cand of nextCandidates) {
          const p = bfsPath(adj, altFrom.id, cand.id);
          if (p) {
            if (i === 0 || bfsPath(adj, selectedNodes[i - 1].id, altFrom.id)) {
              selectedNodes[i] = altFrom;
              selectedNodes[i + 1] = cand;
              foundPath = p;
              bestToNode = cand;
              backtracked = true;
              break;
            }
          }
        }
        if (backtracked) break;
      }

      if (!foundPath) {
        throw new Error(`[${lineId}] BFS path not found between ${stationsConfig[i].name} and ${stationsConfig[i + 1].name}`);
      }
    }

    selectedNodes[i + 1] = bestToNode;
  }

  // Station[] オブジェクト構築
  const stations = [];
  for (let i = 0; i < stationsConfig.length; i++) {
    const cfg = stationsConfig[i];
    const node = selectedNodes[i];
    const meta = STATION_META[cfg.name] || {
      nameKana: cfg.name,
      nameEn: cfg.name,
      address: '',
      transfers: [],
    };

    stations.push({
      id: cfg.id,
      lineId,
      number: i + 1,
      name: cfg.name,
      nameKana: meta.nameKana,
      nameEn: meta.nameEn,
      lat: node.lat,
      lng: node.lon,
      transfers: meta.transfers || [],
      address: meta.address || '',
      platforms: cfg.platforms || { inbound: '上りホーム', outbound: '下りホーム' },
      stoppingTypes: cfg.stoppingTypes || ['local'],
      isMajor: cfg.isMajor || false,
      facilities: {
        elevator: true,
        restroom: true,
        multipurposeToilet: true,
        waitingRoom: true,
        ticketOffice: true,
      },
    });
  }

  // TrackSegment[] 生成
  const trackSegments = [];
  for (let i = 0; i < stationsConfig.length - 1; i++) {
    const s1 = stations[i];
    const s2 = stations[i + 1];
    const node1 = selectedNodes[i];
    const node2 = selectedNodes[i + 1];

    const nodePath = bfsPath(adj, node1.id, node2.id);
    const rawCoords = nodePath.map(id => {
      const n = nodeMap.get(id);
      return [n.lat, n.lon];
    });

    const smoothed = subdivideCoordinates(rawCoords, 100);

    trackSegments.push({
      segmentId: `${s1.id}_${s2.id}`,
      fromStationId: s1.id,
      toStationId: s2.id,
      coordinates: smoothed,
    });
  }

  console.log(`[${lineId}] Generated ${stations.length} stations and ${trackSegments.length} track segments.`);

  const outDir = path.resolve(outputDir);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. stations.ts
  const stationExportName = `${lineId.toUpperCase()}_STATIONS`;
  const stationsTsContent = `import type { Station } from '../../../types';\n\nexport const ${stationExportName}: Station[] = ${JSON.stringify(stations, null, 2)};\n`;
  fs.writeFileSync(path.join(outDir, 'stations.ts'), stationsTsContent, 'utf8');

  // 2. trackGeometry.ts
  const trackExportName = `${lineId.toUpperCase()}_TRACK_SEGMENTS`;
  const trackTsContent = `import type { TrackSegment } from '../../../types';\n\nexport const ${trackExportName}: TrackSegment[] = ${JSON.stringify(trackSegments, null, 2)};\n`;
  fs.writeFileSync(path.join(outDir, 'trackGeometry.ts'), trackTsContent, 'utf8');

  console.log(`[${lineId}] Successfully saved stations.ts and trackGeometry.ts`);
}

module.exports = { buildLineDataRobust };
