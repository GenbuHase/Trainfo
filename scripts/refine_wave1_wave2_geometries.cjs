const fs = require('fs');
const path = require('path');
const { distMeters, subdivideCoordinates } = require('./common/geometryBuilderUtils.cjs');

const linesGeoJson = JSON.parse(fs.readFileSync('scripts/cache/N02-23/UTF-8/N02-23_RailroadSection.geojson', 'utf8'));

// グラフ構築 & 端点スナップ結合
function buildRobustGraph(features, snapThresholdMeters = 150) {
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

// 1. おおさか東線の完全再構築
console.log('--- 1. jr_osaka_higashi 完全再構築 ---');
{
  const lineKey = 'jr_osaka_higashi';
  const stPath = path.join('src', 'data', 'lines', lineKey, 'stations.ts');
  const trPath = path.join('src', 'data', 'lines', lineKey, 'trackGeometry.ts');

  const stContent = fs.readFileSync(stPath, 'utf8');
  const stStartIdx = stContent.indexOf('= [');
  const stations = eval(stContent.slice(stStartIdx + 2, stContent.lastIndexOf(']') + 1));

  const features = linesGeoJson.features.filter(f => {
    const p = f.properties;
    return p.N02_004?.includes('西日本旅客鉄道') && (p.N02_003 === 'おおさか東線' || p.N02_003 === '東海道線' || p.N02_003 === '片町線' || p.N02_003 === '関西線');
  });

  const { adj, nodeCoords } = buildRobustGraph(features, 150);

  const refinedSegments = [];
  const refinedStationCoords = [];

  for (let i = 0; i < stations.length - 1; i++) {
    const sA = stations[i];
    const sB = stations[i + 1];
    const fromId = `${lineKey}-${String(i + 1).padStart(2, '0')}`;
    const toId = `${lineKey}-${String(i + 2).padStart(2, '0')}`;
    const segId = `${fromId}_${toId}`;

    let pathCoords = findShortestPath(adj, nodeCoords, [sA.lat, sA.lng], [sB.lat, sB.lng]);
    pathCoords = subdivideCoordinates(pathCoords, 200);

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

  for (let i = 0; i < stations.length; i++) {
    if (refinedStationCoords[i]) {
      stations[i].lat = parseFloat(refinedStationCoords[i][0].toFixed(5));
      stations[i].lng = parseFloat(refinedStationCoords[i][1].toFixed(5));
    }
  }

  const trackContent = `import type { TrackSegment } from '../../../types';\n\nexport const JR_OSAKA_HIGASHI_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(refinedSegments, null, 2)};\n`;
  fs.writeFileSync(trPath, trackContent, 'utf8');

  const newStContent = `import type { Station } from '../../../types';\n\nexport const JR_OSAKA_HIGASHI_STATIONS: Station[] = ${JSON.stringify(stations, null, 2)};\n`;
  fs.writeFileSync(stPath, newStContent, 'utf8');

  console.log(`✅ jr_osaka_higashi: ${refinedSegments.length} segs refined!`);
}

// 2. Wave 1 および Wave 2 の全路線の点間過大ジャンプ（>250m）細分化平滑化
console.log('\n--- 2. Wave 1 & Wave 2 全線の長大点間細分化平滑化 ---');

const wave1And2Lines = [
  'jr_chuo_west',
  'jr_takayama',
  'jr_kansai_nagoya_kameyama',
  'jr_kisei_kameyama_shingu',
  'jr_iida',
  'jr_minobu',
  'jr_taketoyo',
  'jr_taita',
  'jr_meisho',
  'jr_sangu',
  'jr_osaka_loop',
  'jr_yumesaki',
  'jr_tozai',
  'jr_gakken_toshi',
  'jr_takarazuka',
  'jr_fukuchiyama_north',
  'jr_yamatoji',
  'jr_hanwa',
  'jr_kansai_airport',
  'jr_hokuriku_maibara_tsuruga'
];

for (const lineKey of wave1And2Lines) {
  const trPath = path.join('src', 'data', 'lines', lineKey, 'trackGeometry.ts');
  if (!fs.existsSync(trPath)) continue;

  const content = fs.readFileSync(trPath, 'utf8');
  const startIdx = content.indexOf('= [');
  const exportConstMatch = content.match(/export const (\w+):/);
  const exportConst = exportConstMatch ? exportConstMatch[1] : `${lineKey.toUpperCase()}_TRACK_SEGMENTS`;

  let segments;
  try {
    segments = JSON.parse(content.slice(startIdx + 2, content.lastIndexOf(']') + 1));
  } catch (e) {
    segments = eval(content.slice(startIdx + 2, content.lastIndexOf(']') + 1));
  }

  let modified = false;
  let addedPoints = 0;

  for (const seg of segments) {
    const origLen = seg.coordinates.length;
    // 最大間隔250mで細分化
    const sub = subdivideCoordinates(seg.coordinates, 250);
    if (sub.length !== origLen) {
      seg.coordinates = sub;
      addedPoints += (sub.length - origLen);
      modified = true;
    }
  }

  if (modified) {
    const newContent = `import type { TrackSegment } from '../../../types';\n\nexport const ${exportConst}: TrackSegment[] = ${JSON.stringify(segments, null, 2)};\n`;
    fs.writeFileSync(trPath, newContent, 'utf8');
    console.log(`✅ [${lineKey.padEnd(28)}] +${addedPoints} points interpolated`);
  } else {
    console.log(`   [${lineKey.padEnd(28)}] Already smooth`);
  }
}

console.log('\n🎉 Wave 1 & Wave 2 全線の精密化が完了しました！');
