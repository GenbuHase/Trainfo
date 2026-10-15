const fs = require('fs');
const path = require('path');
const { buildAdjGraph, bfsPath, distMeters, subdivideCoordinates } = require('./common/geometryBuilderUtils.cjs');
const { STATION_META } = require('./common/stationMetaDict.cjs');

// グローバル共有駅ノード辞書（先行路線で解決したノードIDを保持）
const GLOBAL_STATION_NODES = new Map();

// 複数OSMファイルをマージして巨大グラフを構築
function loadMergedOsm(filePaths) {
  const nodeMap = new Map();
  const allElements = [];
  for (const fp of filePaths) {
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
  const adj = buildAdjGraph(allElements);
  return { nodeMap, adj, allElements };
}

// 駅ノード候補の取得（候補の全リストを返す）
function findAllStationNodeCandidates(allElements, stationName) {
  const aliases = [
    stationName,
    `${stationName}駅`,
    stationName.replace(/ケ/g, 'ヶ'),
    stationName.replace(/ヶ/g, 'ケ'),
    `${stationName.replace(/ケ/g, 'ヶ')}駅`,
    `${stationName.replace(/ヶ/g, 'ケ')}駅`,
  ];

  const results = [];
  for (const el of allElements) {
    if (el.type !== 'node') continue;
    const name = el.tags?.name || el.tags?.['name:ja'] || '';
    if (aliases.includes(name) || (stationName.length >= 2 && name.startsWith(stationName))) {
      results.push(el);
    }
  }
  return results;
}

// 単一路線の線路および駅メタデータをビルド
function buildLineData({
  lineId,
  osmFiles,
  stationsConfig,
  stationPrefix,
  outputDir,
}) {
  console.log(`\n=================== Building ${lineId} ===================`);
  const { nodeMap, adj, allElements } = loadMergedOsm(osmFiles);

  const stations = [];
  const trackSegments = [];

  // 各駅の全ノード候補を収集
  const candidatesPerStation = [];
  for (let i = 0; i < stationsConfig.length; i++) {
    const cfg = stationsConfig[i];
    const cands = findAllStationNodeCandidates(allElements, cfg.name);
    if (cands.length === 0) {
      throw new Error(`[${lineId}] Station node candidate not found for: ${cfg.name}`);
    }
    // グローバルで確定済みのノードがあれば最優先
    const globalId = GLOBAL_STATION_NODES.get(cfg.name);
    if (globalId && nodeMap.has(globalId)) {
      const gNode = nodeMap.get(globalId);
      candidatesPerStation.push([gNode, ...cands.filter(c => c.id !== globalId)]);
    } else {
      candidatesPerStation.push(cands);
    }
  }

  // 起点から終点へ向かって BFS で接続可能なノードの組み合わせを貪欲に探索
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
      // 逆引き：直前のノード候補を変更して再探索
      let backtracked = false;
      for (const altFrom of candidatesPerStation[i]) {
        if (altFrom.id === fromNode.id) continue;
        for (const cand of nextCandidates) {
          const p = bfsPath(adj, altFrom.id, cand.id);
          if (p) {
            // 前のセグメントも altFrom に再接続可能か確認
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

  // 確定ノードをグローバル辞書に保存
  for (let i = 0; i < stationsConfig.length; i++) {
    const sName = stationsConfig[i].name;
    const node = selectedNodes[i];
    if (!GLOBAL_STATION_NODES.has(sName)) {
      GLOBAL_STATION_NODES.set(sName, node.id);
    }
  }

  // Station[] オブジェクト構築
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

  // ファイル出力
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

module.exports = { buildLineData };
