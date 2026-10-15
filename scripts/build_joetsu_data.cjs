const fs = require('fs');
const path = require('path');
const {
  buildWeightedGraph,
  snapEndpoints,
  dijkstraPath,
  distMeters,
  subdivideCoordinates
} = require('./common/geometryBuilderUtils.cjs');
const { STATION_META } = require('./common/stationMetaDict.cjs');

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

async function main() {
  console.log('=== Building Joetsu Line Stations & Track Geometry (Takasaki -> Miyauchi) ===');

  const osmFiles = [
    'cache/osm_joetsu.json',
    'cache/osm_rel_5430810_takasaki_down.json',
    'cache/osm_ryomo.json',
  ];

  const nodeMap = new Map();
  const allElements = [];
  for (const f of osmFiles) {
    const fullPath = path.resolve(__dirname, f);
    if (!fs.existsSync(fullPath)) continue;
    const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
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
  console.log(`Loaded ${nodeMap.size} nodes, ${ways.length} ways from OSM files.`);

  // 駅名定義 (全35駅)
  const stationDefs = [
    { id: 'JOE-01', name: '高崎', isMajor: true, stoppingTypes: ['local', 'rapid', 'limitedExp'] },
    { id: 'JOE-02', name: '高崎問屋町', stoppingTypes: ['local'] },
    { id: 'JOE-03', name: '井野', stoppingTypes: ['local'] },
    { id: 'JOE-04', name: '新前橋', isMajor: true, stoppingTypes: ['local', 'rapid', 'limitedExp'] },
    { id: 'JOE-05', name: '群馬総社', stoppingTypes: ['local'] },
    { id: 'JOE-06', name: '八木原', stoppingTypes: ['local'] },
    { id: 'JOE-07', name: '渋川', isMajor: true, stoppingTypes: ['local', 'rapid', 'limitedExp'] },
    { id: 'JOE-08', name: '敷島', stoppingTypes: ['local'] },
    { id: 'JOE-09', name: '津久田', stoppingTypes: ['local'] },
    { id: 'JOE-10', name: '岩本', stoppingTypes: ['local'] },
    { id: 'JOE-11', name: '沼田', isMajor: true, stoppingTypes: ['local', 'rapid', 'limitedExp'] },
    { id: 'JOE-12', name: '後閑', stoppingTypes: ['local'] },
    { id: 'JOE-13', name: '上牧', stoppingTypes: ['local'] },
    { id: 'JOE-14', name: '水上', isMajor: true, stoppingTypes: ['local', 'rapid', 'limitedExp'] },
    { id: 'JOE-15', name: '湯檜曽', stoppingTypes: ['local'] },
    { id: 'JOE-16', name: '土合', stoppingTypes: ['local'] },
    { id: 'JOE-17', name: '土樽', stoppingTypes: ['local'] },
    { id: 'JOE-18', name: '越後中里', stoppingTypes: ['local'] },
    { id: 'JOE-19', name: '岩原スキー場前', stoppingTypes: ['local'] },
    { id: 'JOE-20', name: '越後湯沢', isMajor: true, stoppingTypes: ['local', 'rapid', 'limitedExp'] },
    { id: 'JOE-21', name: '石打', stoppingTypes: ['local'] },
    { id: 'JOE-22', name: '大沢', stoppingTypes: ['local'] },
    { id: 'JOE-23', name: '上越国際スキー場前', stoppingTypes: ['local'] },
    { id: 'JOE-24', name: '塩沢', stoppingTypes: ['local'] },
    { id: 'JOE-25', name: '六日町', isMajor: true, stoppingTypes: ['local', 'rapid'] },
    { id: 'JOE-26', name: '五日町', stoppingTypes: ['local'] },
    { id: 'JOE-27', name: '浦佐', isMajor: true, stoppingTypes: ['local', 'rapid'] },
    { id: 'JOE-28', name: '八色', stoppingTypes: ['local'] },
    { id: 'JOE-29', name: '小出', isMajor: true, stoppingTypes: ['local', 'rapid'] },
    { id: 'JOE-30', name: '越後堀之内', stoppingTypes: ['local'] },
    { id: 'JOE-31', name: '北堀之内', stoppingTypes: ['local'] },
    { id: 'JOE-32', name: '越後川口', isMajor: true, stoppingTypes: ['local', 'rapid'] },
    { id: 'JOE-33', name: '小千谷', isMajor: true, stoppingTypes: ['local', 'rapid'] },
    { id: 'JOE-34', name: '越後滝谷', stoppingTypes: ['local'] },
    { id: 'JOE-35', name: '宮内', isMajor: true, stoppingTypes: ['local', 'rapid'] },
  ];

  // OSMから駅ノードを取得 (station, halt, stop)
  const osmStations = allElements.filter(e => e.type === 'node' && e.tags && (e.tags.railway === 'station' || e.tags.railway === 'halt' || e.tags.railway === 'stop'));

  const stations = [];
  for (let i = 0; i < stationDefs.length; i++) {
    const def = stationDefs[i];
    const meta = STATION_META[def.name] || {};

    let lat, lng;
    if (def.name === '高崎') {
      lat = 36.3223687;
      lng = 139.0126097;
    } else if (def.name === '新前橋') {
      lat = 36.3788486;
      lng = 139.0471407;
    } else {
      const match = osmStations.find(s => s.tags.name === def.name || s.tags['name:ja'] === def.name);
      if (!match) {
        throw new Error(`Station not found in OSM: ${def.name}`);
      }
      lat = match.lat;
      lng = match.lon;
    }

    stations.push({
      id: def.id,
      lineId: 'joetsu',
      number: i + 1,
      name: def.name,
      nameKana: meta.nameKana || '',
      nameEn: meta.nameEn || '',
      lat,
      lng,
      transfers: meta.transfers || ['JR上越線'],
      address: meta.address || '',
      platforms: {
        inbound: '上りホーム',
        outbound: '下りホーム'
      },
      stoppingTypes: def.stoppingTypes,
      isMajor: def.isMajor || false,
      facilities: {
        elevator: true,
        restroom: true,
        multipurposeToilet: true,
        waitingRoom: true,
        ticketOffice: true
      }
    });
  }

  console.log(`Generated ${stations.length} stations.`);

  // グラフ構築
  const adj = buildWeightedGraph(allElements, nodeMap);
  snapEndpoints(ways, nodeMap, adj, 30);

  // 各駅の最寄りノードを探す
  const stationGraphNodes = [];
  for (const st of stations) {
    const node = findStationNode(st, nodeMap, adj);
    if (!node) {
      throw new Error(`Could not find graph node for station ${st.name}`);
    }
    const d = distMeters([st.lat, st.lng], [node.lat, node.lon]);
    console.log(`Station ${st.name} -> Node ${node.id} (distance: ${d.toFixed(1)}m)`);
    stationGraphNodes.push(node);
  }

  // セグメント構築
  const trackSegments = [];
  for (let i = 0; i < stations.length - 1; i++) {
    const s1 = stations[i];
    const s2 = stations[i + 1];
    const n1 = stationGraphNodes[i];
    const n2 = stationGraphNodes[i + 1];

    console.log(`Routing segment [${i + 1}/34] ${s1.name} (${s1.id}) -> ${s2.name} (${s2.id})...`);
    const pathNodeIds = dijkstraPath(adj, nodeMap, n1.id, n2.id);

    if (!pathNodeIds || pathNodeIds.length === 0) {
      throw new Error(`Failed to route between ${s1.name} and ${s2.name}`);
    }

    const rawCoords = pathNodeIds.map(id => {
      const n = nodeMap.get(id);
      return [n.lat, n.lon];
    });

    // 直線距離 vs 経路距離
    const straightDist = distMeters([s1.lat, s1.lng], [s2.lat, s2.lng]);
    let pathDist = 0;
    for (let j = 0; j < rawCoords.length - 1; j++) {
      pathDist += distMeters(rawCoords[j], rawCoords[j + 1]);
    }
    const ratio = pathDist / straightDist;
    console.log(`  Straight: ${(straightDist / 1000).toFixed(2)}km, Path: ${(pathDist / 1000).toFixed(2)}km (ratio: ${ratio.toFixed(2)})`);

    if (pathDist > straightDist * 2.5 && straightDist > 1000) {
      console.warn(`  ⚠️ WARNING: Segment ${s1.name} -> ${s2.name} might have detours!`);
    }

    const smoothed = subdivideCoordinates(rawCoords, 100);

    trackSegments.push({
      segmentId: `${s1.id}_${s2.id}`,
      fromStationId: s1.id,
      toStationId: s2.id,
      coordinates: smoothed
    });
  }

  // ファイル出力
  const outDir = path.resolve(__dirname, '../src/data/lines/joetsu');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. stations.ts
  const stationsTs = `import type { Station } from '../../../types';\n\nexport const JOETSU_STATIONS: Station[] = ${JSON.stringify(stations, null, 2)};\n`;
  fs.writeFileSync(path.join(outDir, 'stations.ts'), stationsTs, 'utf8');
  console.log(`Wrote stations.ts (${stations.length} stations) to ${outDir}`);

  // 2. trackGeometry.ts
  const trackTs = `import type { TrackSegment } from '../../../types';\n\nexport const JOETSU_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(trackSegments, null, 2)};\n`;
  fs.writeFileSync(path.join(outDir, 'trackGeometry.ts'), trackTs, 'utf8');
  console.log(`Wrote trackGeometry.ts (${trackSegments.length} segments) to ${outDir}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
