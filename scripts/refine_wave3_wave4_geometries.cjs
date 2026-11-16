const fs = require('fs');
const path = require('path');
const { distMeters, subdivideCoordinates } = require('./common/geometryBuilderUtils.cjs');

const linesGeoJson = JSON.parse(fs.readFileSync('scripts/cache/N02-23/UTF-8/N02-23_RailroadSection.geojson', 'utf8'));

// グラフ構築 & 端点スナップ結合
function buildRobustGraph(features, snapThresholdMeters = 120) {
  const adj = new Map();
  const nodeCoords = new Map();
  let nextNodeId = 1;
  const coordToId = new Map();

  function getNodeId(coord) {
    const key = `${coord[0].toFixed(5)},${coord[1].toFixed(5)}`;
    if (coordToId.has(key)) return coordToId.get(key);
    const id = nextNodeId++;
    coordToId.set(key, id);
    nodeCoords.set(id, [coord[1], coord[0]]); // [lat, lng]
    return id;
  }

  const endpoints = [];

  for (const f of features) {
    const coords = f.geometry?.coordinates;
    if (!coords || coords.length < 2) continue;
    const firstNode = getNodeId(coords[0]);
    const lastNode = getNodeId(coords[coords.length - 1]);
    endpoints.push(firstNode, lastNode);

    for (let i = 0; i < coords.length - 1; i++) {
      const u = getNodeId(coords[i]);
      const v = getNodeId(coords[i + 1]);
      const pu = nodeCoords.get(u);
      const pv = nodeCoords.get(v);
      const d = distMeters(pu, pv);
      if (!adj.has(u)) adj.set(u, []);
      if (!adj.has(v)) adj.set(v, []);
      adj.get(u).push({ to: v, dist: d });
      adj.get(v).push({ to: u, dist: d });
    }
  }

  // 端点同士のスナップ結合
  for (let i = 0; i < endpoints.length; i++) {
    const u = endpoints[i];
    const pu = nodeCoords.get(u);
    for (let j = i + 1; j < endpoints.length; j++) {
      const v = endpoints[j];
      if (u === v) continue;
      const pv = nodeCoords.get(v);
      const d = distMeters(pu, pv);
      if (d <= snapThresholdMeters) {
        adj.get(u).push({ to: v, dist: d });
        adj.get(v).push({ to: u, dist: d });
      }
    }
  }

  return { adj, nodeCoords, getNodeId };
}

function angleDeg(p1, p2, p3) {
  const latFactor = Math.cos((p2[0] * Math.PI) / 180);
  const v1 = [p2[0] - p1[0], (p2[1] - p1[1]) * latFactor];
  const v2 = [p3[0] - p2[0], (p3[1] - p2[1]) * latFactor];
  const dot = v1[0] * v2[0] + v1[1] * v2[1];
  const m1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
  const m2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
  if (m1 === 0 || m2 === 0) return 0;
  const cos = Math.max(-1, Math.min(1, dot / (m1 * m2)));
  return (Math.acos(cos) * 180) / Math.PI;
}

function cleanSpikes(coords) {
  if (coords.length <= 2) return coords;
  let cleaned = [coords[0]];

  for (let i = 1; i < coords.length; i++) {
    if (distMeters(cleaned[cleaned.length - 1], coords[i]) >= 1.0 || i === coords.length - 1) {
      cleaned.push(coords[i]);
    }
  }

  for (let pass = 0; pass < 8; pass++) {
    let changed = false;
    const next = [cleaned[0]];
    for (let i = 1; i < cleaned.length - 1; i++) {
      const pPrev = next[next.length - 1];
      const pCur = cleaned[i];
      const pNext = cleaned[i + 1];
      const deg = angleDeg(pPrev, pCur, pNext);
      const d1 = distMeters(pPrev, pCur);
      const d2 = distMeters(pCur, pNext);

      if (deg < 38 && (d1 < 450 || d2 < 450)) {
        changed = true;
        continue;
      }
      next.push(pCur);
    }
    next.push(cleaned[cleaned.length - 1]);
    cleaned = next;
    if (!changed) break;
  }

  return cleaned;
}

function findShortestPath(adj, nodeCoords, startCoord, endCoord) {
  let startNode = null;
  let minStartDist = Infinity;
  let endNode = null;
  let minEndDist = Infinity;

  for (const [id, coord] of nodeCoords.entries()) {
    const ds = distMeters(coord, startCoord);
    if (ds < minStartDist) {
      minStartDist = ds;
      startNode = id;
    }
    const de = distMeters(coord, endCoord);
    if (de < minEndDist) {
      minEndDist = de;
      endNode = id;
    }
  }

  if (!startNode || !endNode || startNode === endNode || minStartDist > 3000 || minEndDist > 3000) {
    return [startCoord, endCoord];
  }

  const dist = new Map();
  const prev = new Map();
  const visited = new Set();
  dist.set(startNode, 0);

  const pq = [{ id: startNode, d: 0 }];

  while (pq.length > 0) {
    pq.sort((a, b) => a.d - b.d);
    const { id: u, d: du } = pq.shift();

    if (visited.has(u)) continue;
    visited.add(u);

    if (u === endNode) break;

    const neighbors = adj.get(u) || [];
    for (const edge of neighbors) {
      const v = edge.to;
      if (visited.has(v)) continue;
      const alt = du + edge.dist;
      if (!dist.has(v) || alt < dist.get(v)) {
        dist.set(v, alt);
        prev.set(v, u);
        pq.push({ id: v, d: alt });
      }
    }
  }

  if (!prev.has(endNode) && startNode !== endNode) {
    return [startCoord, endCoord];
  }

  const pathNodes = [];
  let curr = endNode;
  while (curr !== undefined) {
    pathNodes.push(curr);
    curr = prev.get(curr);
  }
  pathNodes.reverse();

  return pathNodes.map(id => nodeCoords.get(id));
}

// 路線ごとの設定
const lineConfigs = [
  { lineKey: 'jr_sagano', exportConst: 'JR_SAGANO_TRACK_SEGMENTS', n02Lines: ['山陰線', '東海道線'] },
  { lineKey: 'jr_sanin_sonobe_kinosaki', exportConst: 'JR_SANIN_SONOBE_KINOSAKI_TRACK_SEGMENTS', n02Lines: ['山陰線', '舞鶴線', '福知山線', '播但線'] },
  { lineKey: 'jr_kosei', exportConst: 'JR_KOSEI_TRACK_SEGMENTS', n02Lines: ['湖西線', '東海道線', '北陸線'] },
  { lineKey: 'jr_kusatsu', exportConst: 'JR_KUSATSU_TRACK_SEGMENTS', n02Lines: ['草津線', '東海道線', '関西線'] },
  { lineKey: 'jr_nara', exportConst: 'JR_NARA_TRACK_SEGMENTS', n02Lines: ['奈良線', '東海道線', '関西線'] },
  { lineKey: 'jr_sakurai', exportConst: 'JR_SAKURAI_TRACK_SEGMENTS', n02Lines: ['桜井線', '関西線', '和歌山線'] },
  { lineKey: 'jr_wakayama', exportConst: 'JR_WAKAYAMA_TRACK_SEGMENTS', n02Lines: ['和歌山線', '関西線', '阪和線', '紀勢線'] },
  { lineKey: 'jr_kinokuni', exportConst: 'JR_KINOKUNI_TRACK_SEGMENTS', n02Lines: ['紀勢線', '阪和線'] },
  { lineKey: 'jr_kansai_kameyama_kamo', exportConst: 'JR_KANSAI_KAMEYAMA_KAMO_TRACK_SEGMENTS', n02Lines: ['関西線'] },
  { lineKey: 'jr_sanyo_himeji_kamigori', exportConst: 'JR_SANYO_HIMEJI_KAMIGORI_TRACK_SEGMENTS', n02Lines: ['山陽線', '赤穂線'] },
  { lineKey: 'jr_ako', exportConst: 'JR_AKO_TRACK_SEGMENTS', n02Lines: ['赤穂線', '山陽線'] },
  { lineKey: 'jr_kakogawa', exportConst: 'JR_KAKOGAWA_TRACK_SEGMENTS', n02Lines: ['加古川線', '山陽線', '福知山線'] },
  { lineKey: 'jr_kishin', exportConst: 'JR_KISHIN_TRACK_SEGMENTS', n02Lines: ['姫新線', '山陽線'] },
  { lineKey: 'jr_bantan', exportConst: 'JR_BANTAN_TRACK_SEGMENTS', n02Lines: ['播但線', '山陽線', '山陰線'] },
  { lineKey: 'jr_maizuru', exportConst: 'JR_MAIZURU_TRACK_SEGMENTS', n02Lines: ['舞鶴線', '山陰線', '小浜線'] },
  { lineKey: 'jr_obama', exportConst: 'JR_OBAMA_TRACK_SEGMENTS', n02Lines: ['小浜線', '北陸線', '舞鶴線'] },
  { lineKey: 'jr_wadamisaki', exportConst: 'JR_WADAMISAKI_TRACK_SEGMENTS', n02Lines: ['山陽線'] }
];

console.log('=== Wave 3 & 4 全17路線 高精度実線路ジオメトリ再構築開始 ===\n');

for (const cfg of lineConfigs) {
  const { lineKey, exportConst, n02Lines } = cfg;
  const stationsPath = path.join(__dirname, '..', 'src', 'data', 'lines', lineKey, 'stations.ts');
  const trackPath = path.join(__dirname, '..', 'src', 'data', 'lines', lineKey, 'trackGeometry.ts');

  if (!fs.existsSync(stationsPath) || !fs.existsSync(trackPath)) {
    console.warn(`Skipping ${lineKey}: files not found`);
    continue;
  }

  // stations.ts 読み込み
  const stContent = fs.readFileSync(stationsPath, 'utf8');
  const jsonStr = stContent.slice(stContent.indexOf('['), stContent.lastIndexOf(']') + 1);
  const stations = eval(jsonStr);

  // N02フィーチャー抽出
  const features = linesGeoJson.features.filter(f => {
    const p = f.properties;
    return p.N02_004?.includes('西日本旅客鉄道') && n02Lines.includes(p.N02_003);
  });

  const { adj, nodeCoords } = buildRobustGraph(features, 120);

  // 各駅間のセグメントを探索
  const refinedSegments = [];
  const refinedStationCoords = [];

  for (let i = 0; i < stations.length - 1; i++) {
    const sA = stations[i];
    const sB = stations[i + 1];
    const fromId = `${lineKey}-${String(i + 1).padStart(2, '0')}`;
    const toId = `${lineKey}-${String(i + 2).padStart(2, '0')}`;
    const segId = `${fromId}_${toId}`;

    // 最短経路探索
    let pathCoords = findShortestPath(adj, nodeCoords, [sA.lat, sA.lng], [sB.lat, sB.lng]);

    // トゲ平滑化
    pathCoords = cleanSpikes(pathCoords);

    // 点間ジャンプを細分化（最大間隔250m）
    pathCoords = subdivideCoordinates(pathCoords, 250);

    const startCoord = pathCoords[0];
    const endCoord = pathCoords[pathCoords.length - 1];

    if (i === 0) refinedStationCoords.push(startCoord);
    refinedStationCoords.push(endCoord);

    refinedSegments.push({
      id: segId,
      fromStationId: fromId,
      toStationId: toId,
      coordinates: pathCoords
    });
  }

  // 駅座標をセグメント端点と完全一致（0.0m）に同期更新
  for (let i = 0; i < stations.length; i++) {
    if (refinedStationCoords[i]) {
      stations[i].lat = parseFloat(refinedStationCoords[i][0].toFixed(5));
      stations[i].lng = parseFloat(refinedStationCoords[i][1].toFixed(5));
    }
  }

  // trackGeometry.ts の書き出し
  const trackContent = `import type { TrackSegment } from '../../../types';\n\nexport const ${exportConst}: TrackSegment[] = ${JSON.stringify(refinedSegments, null, 2)};\n`;
  fs.writeFileSync(trackPath, trackContent, 'utf8');

  // stations.ts の書き出し
  const stExportConst = exportConst.replace('_TRACK_SEGMENTS', '_STATIONS');
  const newStContent = `import type { Station } from '../../../types';\n\nexport const ${stExportConst}: Station[] = ${JSON.stringify(stations, null, 2)};\n`;
  fs.writeFileSync(stationsPath, newStContent, 'utf8');

  const totalPts = refinedSegments.reduce((sum, s) => sum + s.coordinates.length, 0);
  const avgPts = (totalPts / refinedSegments.length).toFixed(1);
  console.log(`✅ [${lineKey.padEnd(25)}] ${refinedSegments.length} segs, total ${totalPts} pts (avg ${avgPts} pts/seg)`);
}

console.log('\n🎉 Wave 3 & 4 全17路線の高精度実線路ジオメトリ再構築が完了しました！');
