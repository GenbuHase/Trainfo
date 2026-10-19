const fs = require('fs');
const path = require('path');
const { distMeters, subdivideCoordinates } = require('./common/geometryBuilderUtils.cjs');
const { STATION_META } = require('./common/stationMetaDict.cjs');
const { LINES_STATIONS_CONFIG } = require('./common/tobuLinesStationConfigs.cjs');

// グローバル確定駅ノード（先行路線で解決した駅の座標 { lat, lon, id } を保持し、後続路線で完全共有）
const GLOBAL_STATION_NODES = new Map();

// 188駅の高精度座標辞書
const STATION_COORDS = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cache/tobu_stations_coords.json'), 'utf8'));

// グラフ構築（コンポーネント間のブリッジ自動接続付き）
function buildAdjGraphWithBridges(elements, nodeMap, maxBridgeDist = 800) {
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

  // コンポーネント同士が複数ある場合、最近傍ノード同士をブリッジ接続
  if (components.length > 1) {
    components.sort((a, b) => b.length - a.length);
    const mainCompNodes = new Set(components[0]);

    for (let c = 1; c < components.length; c++) {
      const subComp = components[c];
      let bestU = null;
      let bestV = null;
      let minDist = Infinity;

      // 距離探索
      for (const u of subComp) {
        const nodeU = nodeMap.get(u);
        if (!nodeU) continue;
        for (const v of mainCompNodes) {
          const nodeV = nodeMap.get(v);
          if (!nodeV) continue;
          const d = distMeters([nodeU.lat, nodeU.lon], [nodeV.lat, nodeV.lon]);
          if (d < minDist) {
            minDist = d;
            bestU = u;
            bestV = v;
          }
        }
      }

      if (minDist <= maxBridgeDist && bestU && bestV) {
        addEdge(bestU, bestV);
        for (const n of subComp) mainCompNodes.add(n);
        console.log(`[Bridge] Connected gap of ${Math.round(minDist)}m between nodes ${bestU} and ${bestV}`);
      }
    }
  }

  return adj;
}

function loadOsm(filePath) {
  const data = JSON.parse(fs.readFileSync(path.resolve(filePath), 'utf8'));
  const nodeMap = new Map();
  const allElements = [];
  for (const el of data.elements) {
    if (el.type === 'node') {
      nodeMap.set(el.id, el);
    }
    allElements.push(el);
  }
  const adj = buildAdjGraphWithBridges(allElements, nodeMap, 800);
  return { nodeMap, adj, allElements };
}

function findStationNodeCandidates(nodeMap, adj, stationName) {
  // 1. 先行路線で同一駅が確定している場合
  const globalNode = GLOBAL_STATION_NODES.get(stationName);
  let targetLat, targetLon;

  if (globalNode) {
    targetLat = globalNode.lat;
    targetLon = globalNode.lon;
    // もし同一nodeIdが現在のnodeMapにあれば最優先
    if (nodeMap.has(globalNode.id) && adj.has(globalNode.id)) {
      return [nodeMap.get(globalNode.id)];
    }
  } else if (STATION_COORDS[stationName]) {
    targetLat = STATION_COORDS[stationName].lat;
    targetLon = STATION_COORDS[stationName].lon;
  } else {
    throw new Error(`Station coordinates unknown for ${stationName}`);
  }

  // 2. 線路グラフ上のノード（adj.keys()）からターゲット座標に最も近いノードを検索
  const scoredNodes = [];
  for (const trackNodeId of adj.keys()) {
    const tn = nodeMap.get(trackNodeId);
    if (!tn) continue;
    const d = distMeters([targetLat, targetLon], [tn.lat, tn.lon]);
    scoredNodes.push({ node: tn, dist: d });
  }

  scoredNodes.sort((a, b) => a.dist - b.dist);
  // 上位5候補を返す（最近傍ノードの距離が近い順）
  return scoredNodes.slice(0, 5).map(s => s.node);
}

// 幅優先探索（最短ホップ経路）
function bfsPath(adj, startId, goalId) {
  if (startId === goalId) return [startId];
  const queue = [startId];
  const visited = new Set([startId]);
  const parent = new Map();

  while (queue.length > 0) {
    const curr = queue.shift();
    if (curr === goalId) {
      const path = [];
      let c = goalId;
      while (c !== undefined) {
        path.push(c);
        c = parent.get(c);
      }
      return path.reverse();
    }

    for (const next of adj.get(curr) || []) {
      if (!visited.has(next)) {
        visited.add(next);
        parent.set(next, curr);
        queue.push(next);
      }
    }
  }
  return null;
}

// 1路線のジオメトリおよび駅をビルド
function buildLine(lineId, stationsConfig) {
  console.log(`\n=================== Building Geometry for ${lineId} ===================`);
  const osmPath = `scripts/cache/osm_${lineId}.json`;
  const { nodeMap, adj } = loadOsm(osmPath);

  const candidatesPerStation = [];
  for (let i = 0; i < stationsConfig.length; i++) {
    const cfg = stationsConfig[i];
    const cands = findStationNodeCandidates(nodeMap, adj, cfg.name);
    if (cands.length === 0) {
      throw new Error(`[${lineId}] No candidate for station ${cfg.name}`);
    }
    candidatesPerStation.push(cands);
  }

  // 起点から終点へ向かって BFS でパスを探索
  const selectedNodes = new Array(stationsConfig.length).fill(null);
  selectedNodes[0] = candidatesPerStation[0][0];

  const trackSegments = [];

  for (let i = 0; i < stationsConfig.length - 1; i++) {
    const fromCfg = stationsConfig[i];
    const toCfg = stationsConfig[i + 1];
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
      // 直線接続フォールバック（点間距離が近い場合）
      bestToNode = nextCandidates[0];
      const d = distMeters([fromNode.lat, fromNode.lon], [bestToNode.lat, bestToNode.lon]);
      console.warn(`[${lineId}] BFS path not found between ${fromCfg.name} and ${toCfg.name} (${Math.round(d)}m), fallback to direct segment.`);
      foundPath = [fromNode.id, bestToNode.id];
    }

    selectedNodes[i + 1] = bestToNode;
    GLOBAL_STATION_NODES.set(fromCfg.name, { id: fromNode.id, lat: fromNode.lat, lon: fromNode.lon });
    GLOBAL_STATION_NODES.set(toCfg.name, { id: bestToNode.id, lat: bestToNode.lat, lon: bestToNode.lon });

    const coords = foundPath.map(id => {
      const n = nodeMap.get(id);
      return [n.lat, n.lon];
    });

    const smoothed = subdivideCoordinates(coords, 50);
    trackSegments.push({
      id: `${lineId}_${fromCfg.id}_${toCfg.id}`,
      fromStationId: fromCfg.id,
      toStationId: toCfg.id,
      coordinates: smoothed,
    });
  }

  // 駅メタデータ配列の生成
  const stations = stationsConfig.map((cfg, idx) => {
    const node = selectedNodes[idx];
    const meta = STATION_META[cfg.name] || {};

    return {
      id: cfg.id,
      ...(cfg.stationNumber !== undefined ? { stationNumber: cfg.stationNumber } : {}),
      lineId,
      number: idx + 1,
      name: cfg.name,
      nameKana: meta.nameKana || cfg.name,
      nameEn: meta.nameEn || cfg.name,
      lat: node.lat,
      lng: node.lon,
      transfers: meta.transfers || [],
      address: meta.address || '',
      facilities: {
        elevator: true,
        restroom: true,
        multipurposeToilet: true,
        waitingRoom: true,
        ticketOffice: true,
      },
      stoppingTypes: cfg.stoppingTypes || ['local'],
      isMajor: cfg.isMajor || false,
      platforms: {
        inbound: '1番線',
        outbound: '2番線',
      },
    };
  });

  // ファイル出力
  const outDir = path.resolve(__dirname, `../src/data/lines/${lineId}`);
  fs.mkdirSync(outDir, { recursive: true });

  const stationsConstName = `${lineId.toUpperCase()}_STATIONS`;
  const trackConstName = `${lineId.toUpperCase()}_TRACK_SEGMENTS`;

  const stationsCode = `import type { Station } from '../../../types';

export const ${stationsConstName}: Station[] = ${JSON.stringify(stations, null, 2)};
`;

  const trackCode = `import type { TrackSegment } from '../../../types';

export const ${trackConstName}: TrackSegment[] = ${JSON.stringify(trackSegments, null, 2)};
`;

  fs.writeFileSync(path.join(outDir, 'stations.ts'), stationsCode, 'utf8');
  fs.writeFileSync(path.join(outDir, 'trackGeometry.ts'), trackCode, 'utf8');
  console.log(`✅ ${lineId} -> stations.ts (${stations.length} stations), trackGeometry.ts (${trackSegments.length} segments) generated!`);
}

async function run() {
  for (const [lineId, stationsConfig] of Object.entries(LINES_STATIONS_CONFIG)) {
    buildLine(lineId, stationsConfig);
  }
  console.log('\n🎉 All 13 lines geometry and stations built successfully!');
}

run().catch(console.error);
