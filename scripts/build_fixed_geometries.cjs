const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const {
  buildWeightedGraph,
  snapEndpoints,
  dijkstraPath,
  distMeters,
  subdivideCoordinates
} = require('./common/geometryBuilderUtils.cjs');

// ヘルパー: 各駅に最も近いグラフ上のノードを探す
function findStationNode(st, nodeMap, adj) {
  let best = null;
  let minD = Infinity;
  for (const [id, node] of nodeMap.entries()) {
    if (!adj.has(id)) continue;
    const d = distMeters([st.lat, st.lng], [node.lat, node.lon]);
    if (d < minD) {
      minD = d;
      best = node;
    }
  }
  return best;
}

// 1. 東海道線（東京〜熱海）: JT-06_JT-07, JT-07_JT-08, JT-16_JT-17 を修正
function buildTokaidoTokyoAtamiTrack() {
  console.log('\n=== 1. Fixing Tokaido Track Geometry (Tokyo -> Atami) ===');
  const originalTrack = execSync('git show HEAD~1:src/data/lines/tokaido/trackGeometry.ts', { encoding: 'utf8' });
  const jsonMatch = originalTrack.match(/export const TOKAIDO_TRACK_SEGMENTS: TrackSegment\[\] = (\[[\s\S]*\]);/);
  const segments = JSON.parse(jsonMatch[1]).filter(s => !s.fromStationId.startsWith('CA') && !s.toStationId.startsWith('CA'));

  // OSM データロード
  const osmPath = 'scripts/cache/osm_rel_11680902_tokaido_tokyo_atami.json';
  const osmData = JSON.parse(fs.readFileSync(osmPath, 'utf8'));
  const nodeMap = new Map();
  for (const el of osmData.elements) {
    if (el.type === 'node') nodeMap.set(el.id, el);
  }
  const ways = osmData.elements.filter(e => e.type === 'way');
  const adj = buildWeightedGraph(osmData.elements, nodeMap);
  snapEndpoints(ways, nodeMap, adj, 30);

  // 修正対象ペア
  const fixes = [
    {
      segmentId: 'JT-06_JT-07',
      from: { id: 'JT-06', name: '戸塚', lat: 35.400582, lng: 139.5342993 },
      to: { id: 'JT-07', name: '大船', lat: 35.3532, lng: 139.5312 }, // 大船旅客本線ホーム
    },
    {
      segmentId: 'JT-07_JT-08',
      from: { id: 'JT-07', name: '大船', lat: 35.3532, lng: 139.5312 },
      to: { id: 'JT-08', name: '藤沢', lat: 35.3386826, lng: 139.4862632 },
    },
    {
      segmentId: 'JT-16_JT-17',
      from: { id: 'JT-16', name: '小田原', lat: 35.2561433, lng: 139.1558376 },
      to: { id: 'JT-17', name: '早川', lat: 35.2391958, lng: 139.1451554 },
    },
  ];

  for (const fix of fixes) {
    const nodeFrom = findStationNode(fix.from, nodeMap, adj);
    const nodeTo = findStationNode(fix.to, nodeMap, adj);
    const pathNodes = dijkstraPath(adj, nodeMap, nodeFrom.id, nodeTo.id);
    if (!pathNodes) {
      throw new Error(`Failed to find path for ${fix.segmentId}`);
    }
    const coords = pathNodes.map(id => {
      const n = nodeMap.get(id);
      return [n.lat, n.lon];
    });
    const subCoords = subdivideCoordinates(coords, 25);
    const idx = segments.findIndex(s => s.segmentId === fix.segmentId);
    if (idx !== -1) {
      let len = 0;
      for (let j = 1; j < subCoords.length; j++) len += distMeters(subCoords[j - 1], subCoords[j]);
      console.log(`  Fixed ${fix.segmentId} (${fix.from.name} -> ${fix.to.name}): ${Math.round(len)}m, points=${subCoords.length}`);
      segments[idx].coordinates = subCoords;
    }
  }

  const outPath = path.resolve('src/data/lines/tokaido/trackGeometry.ts');
  const content = `import type { TrackSegment } from '../../../types';\n\nexport const TOKAIDO_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(segments, null, 2)};\n`;
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`  Saved ${segments.length} segments to ${outPath}`);
}

// 2. JR東海 東海道線（熱海〜沼津）
function buildTokaidoShizuokaTrack() {
  console.log('\n=== 2. Building Tokaido Shizuoka Track Geometry (Atami -> Numazu) ===');
  const stations = [
    { id: 'CA-00', name: '熱海', lat: 35.1039035, lng: 139.0780587 },
    { id: 'CA-01', name: '函南', lat: 35.1087265, lng: 138.9709903 },
    { id: 'CA-02', name: '三島', lat: 35.1264, lng: 138.9109 },
    { id: 'CA-03', name: '沼津', lat: 35.1031271, lng: 138.8593352 },
  ];

  const osmFiles = [
    'scripts/cache/osm_rel_1830049_tokaido_line.json',
    'scripts/cache/osm_tokaido_numazu.json'
  ];

  const nodeMap = new Map();
  const allElements = [];
  for (const fp of osmFiles) {
    if (!fs.existsSync(fp)) continue;
    const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
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

  const ways = allElements.filter(e => e.type === 'way');
  const adj = buildWeightedGraph(allElements, nodeMap);
  snapEndpoints(ways, nodeMap, adj, 30);

  const stationNodes = stations.map(st => findStationNode(st, nodeMap, adj));
  const segments = [];

  for (let i = 0; i < stations.length - 1; i++) {
    const fromSt = stations[i];
    const toSt = stations[i + 1];
    const fromNode = stationNodes[i];
    const toNode = stationNodes[i + 1];

    const pathNodes = dijkstraPath(adj, nodeMap, fromNode.id, toNode.id);
    let coords = [];
    const directD = distMeters([fromSt.lat, fromSt.lng], [toSt.lat, toSt.lng]);

    if (pathNodes && pathNodes.length > 1) {
      coords = pathNodes.map(id => {
        const n = nodeMap.get(id);
        return [n.lat, n.lon];
      });
      let trackD = 0;
      for (let j = 1; j < coords.length; j++) {
        trackD += distMeters(coords[j - 1], coords[j]);
      }
      console.log(`  ✅ ${fromSt.id} ${fromSt.name} -> ${toSt.id} ${toSt.name}: direct=${Math.round(directD)}m, track=${Math.round(trackD)}m, ratio=${(trackD / directD).toFixed(2)}, nodes=${coords.length}`);
    } else {
      console.warn(`  ⚠️ Fallback for ${fromSt.name} -> ${toSt.name}`);
      coords = [[fromSt.lat, fromSt.lng], [toSt.lat, toSt.lng]];
    }

    const subCoords = subdivideCoordinates(coords, 25);
    segments.push({
      segmentId: `${fromSt.id}_${toSt.id}`,
      fromStationId: fromSt.id,
      toStationId: toSt.id,
      fromName: fromSt.name,
      toName: toSt.name,
      coordinates: subCoords
    });
  }

  const outPath = path.resolve('src/data/lines/tokaido_shizuoka/trackGeometry.ts');
  const content = `import type { TrackSegment } from '../../../types';\n\nexport const TOKAIDO_SHIZUOKA_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(segments, null, 2)};\n`;
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`  Saved ${segments.length} segments to ${outPath}`);
}

// 3. 両毛線（小山〜新前橋）
function buildRyomoTrack() {
  console.log('\n=== 3. Building Ryomo Track Geometry (Oyama -> Shin-Maebashi) ===');
  const stations = [
    { id: 'RY-01', name: '小山', lat: 36.3129, lng: 139.806 },
    { id: 'RY-02', name: '思川', lat: 36.3507283, lng: 139.7816502 },
    { id: 'RY-03', name: '栃木', lat: 36.3717284, lng: 139.7314038 },
    { id: 'RY-04', name: '大平下', lat: 36.3443513, lng: 139.6975422 },
    { id: 'RY-05', name: '岩舟', lat: 36.3266804, lng: 139.6577238 },
    { id: 'RY-06', name: '佐野', lat: 36.3166754, lng: 139.5789733 },
    { id: 'RY-07', name: '富田', lat: 36.3161615, lng: 139.5288074 },
    { id: 'RY-08', name: 'あしかがフラワーパーク', lat: 36.3151578, lng: 139.5183925 },
    { id: 'RY-09', name: '足利', lat: 36.3319671, lng: 139.4562493 },
    { id: 'RY-10', name: '山前', lat: 36.347362, lng: 139.4112837 },
    { id: 'RY-11', name: '小俣', lat: 36.3751771, lng: 139.3741668 },
    { id: 'RY-12', name: '桐生', lat: 36.4113225, lng: 139.3326744 },
    { id: 'RY-13', name: '国定', lat: 36.3587439, lng: 139.2421072 },
    { id: 'RY-14', name: '伊勢崎', lat: 36.3268395, lng: 139.1942704 },
    { id: 'RY-15', name: '駒形', lat: 36.3541169, lng: 139.1397662 },
    { id: 'RY-16', name: '前橋大島', lat: 36.3705515, lng: 139.1096721 },
    { id: 'RY-17', name: '前橋', lat: 36.3832125, lng: 139.0726408 },
    { id: 'RY-18', name: '新前橋', lat: 36.3788486, lng: 139.0471407 },
  ];

  const osmPath = 'scripts/cache/osm_ryomo.json';
  const osmData = JSON.parse(fs.readFileSync(osmPath, 'utf8'));

  const nodeMap = new Map();
  for (const el of osmData.elements) {
    if (el.type === 'node') nodeMap.set(el.id, el);
  }

  const ryomoWays = osmData.elements.filter(e => e.type === 'way' && (
    !e.tags?.name || e.tags.name.includes('両毛') || e.tags.operator?.includes('東日本')
  ));

  const adj = new Map();
  function addEdge(u, v, dist) {
    if (!adj.has(u)) adj.set(u, []);
    if (!adj.has(v)) adj.set(v, []);
    adj.get(u).push({ to: v, dist });
    adj.get(v).push({ to: u, dist });
  }

  for (const w of ryomoWays) {
    for (let i = 0; i < w.nodes.length - 1; i++) {
      const u = w.nodes[i];
      const v = w.nodes[i + 1];
      const nu = nodeMap.get(u);
      const nv = nodeMap.get(v);
      if (nu && nv) {
        addEdge(u, v, distMeters([nu.lat, nu.lon], [nv.lat, nv.lon]));
      }
    }
  }

  const snapped = snapEndpoints(ryomoWays, nodeMap, adj, 30);
  console.log(`  Loaded ${osmData.elements.length} OSM elements, snapped ${snapped} gaps`);

  const stationNodes = stations.map(st => findStationNode(st, nodeMap, adj));
  const segments = [];

  for (let i = 0; i < stations.length - 1; i++) {
    const fromSt = stations[i];
    const toSt = stations[i + 1];
    const fromNode = stationNodes[i];
    const toNode = stationNodes[i + 1];

    const pathNodes = dijkstraPath(adj, nodeMap, fromNode.id, toNode.id);
    let coords = [];
    const directD = distMeters([fromSt.lat, fromSt.lng], [toSt.lat, toSt.lng]);

    if (pathNodes && pathNodes.length > 1) {
      coords = pathNodes.map(id => {
        const n = nodeMap.get(id);
        return [n.lat, n.lon];
      });
      let trackD = 0;
      for (let j = 1; j < coords.length; j++) {
        trackD += distMeters(coords[j - 1], coords[j]);
      }
      console.log(`  ✅ ${fromSt.id} ${fromSt.name} -> ${toSt.id} ${toSt.name}: direct=${Math.round(directD)}m, track=${Math.round(trackD)}m, ratio=${(trackD / directD).toFixed(2)}, nodes=${coords.length}`);
    } else {
      console.warn(`  ⚠️ Fallback for ${fromSt.name} -> ${toSt.name}`);
      coords = [[fromSt.lat, fromSt.lng], [toSt.lat, toSt.lng]];
    }

    const subCoords = subdivideCoordinates(coords, 25);
    segments.push({
      segmentId: `${fromSt.id}_${toSt.id}`,
      fromStationId: fromSt.id,
      toStationId: toSt.id,
      fromName: fromSt.name,
      toName: toSt.name,
      coordinates: subCoords
    });
  }

  const outPath = path.resolve('src/data/lines/ryomo/trackGeometry.ts');
  const content = `import type { TrackSegment } from '../../../types';\n\nexport const RYOMO_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(segments, null, 2)};\n`;
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`  Saved ${segments.length} segments to ${outPath}`);
}

function main() {
  buildTokaidoTokyoAtamiTrack();
  buildTokaidoShizuokaTrack();
  buildRyomoTrack();
  console.log('\n🎉 All track geometries successfully built with Dijkstra & Gap Snapping!');
}

main();
