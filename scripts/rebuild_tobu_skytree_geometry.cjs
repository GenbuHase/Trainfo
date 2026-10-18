const fs = require('fs');
const path = require('path');
const { distMeters, subdivideCoordinates } = require('./common/geometryBuilderUtils.cjs');
const { STATION_META } = require('./common/stationMetaDict.cjs');
const { LINES_STATIONS_CONFIG } = require('./common/tobuLinesStationConfigs.cjs');

const osm = JSON.parse(fs.readFileSync('scripts/cache/osm_tobu_skytree.json', 'utf8'));
const nodeMap = new Map();
const wayMap = new Map();
osm.elements.forEach(el => {
  if (el.type === 'node') nodeMap.set(el.id, el);
  if (el.type === 'way') wayMap.set(el.id, el);
});

// 1. 本線ポリライン (Relation 5392090: 浅草 => 東武動物公園)
const relMain = osm.elements.find(e => e.type === 'relation' && e.id === 5392090);
const mainWayMembers = relMain.members.filter(m => m.type === 'way');

const mainPolyline = [];
mainWayMembers.forEach((m, idx) => {
  const w = wayMap.get(m.ref);
  if (!w) return;
  const coords = w.nodes.map(nid => {
    const n = nodeMap.get(nid);
    return [n.lat, n.lon];
  });
  if (mainPolyline.length === 0) {
    mainPolyline.push(...coords);
  } else {
    const last = mainPolyline[mainPolyline.length - 1];
    const gap = distMeters(last, coords[0]);
    if (gap > 50) {
      console.log(`Interpolating bridge gap of ${Math.round(gap)}m`);
      const bridgeSub = subdivideCoordinates([last, coords[0]], 30);
      for (let i = 1; i < bridgeSub.length - 1; i++) {
        mainPolyline.push(bridgeSub[i]);
      }
    }
    const startIdx = (gap < 0.1) ? 1 : 0;
    for (let i = startIdx; i < coords.length; i++) {
      mainPolyline.push(coords[i]);
    }
  }
});

// 2. 押上支線ポリライン (Relation 11065584: 押上 => 東武動物公園 の押上〜曳舟部)
const relOshiage = osm.elements.find(e => e.type === 'relation' && e.id === 11065584);
const oshiageWayMembers = relOshiage.members.filter(m => m.type === 'way');
const oshiagePolyline = [];
oshiageWayMembers.slice(0, 5).forEach((m, idx) => {
  const w = wayMap.get(m.ref);
  if (!w) return;
  const coords = w.nodes.map(nid => {
    const n = nodeMap.get(nid);
    return [n.lat, n.lon];
  });
  if (oshiagePolyline.length === 0) {
    oshiagePolyline.push(...coords);
  } else {
    for (let i = 1; i < coords.length; i++) {
      oshiagePolyline.push(coords[i]);
    }
  }
});

const stationConfigs = LINES_STATIONS_CONFIG.tobu_skytree;
const stationCoordsDict = JSON.parse(fs.readFileSync('scripts/cache/tobu_stations_coords.json', 'utf8'));

// 本線駅 (押上 TSK-03 を除く)
const mainStations = stationConfigs.filter(s => s.id !== 'TSK-03');

let currentIdx = 0;
const stationMap = new Map(); // id -> { config, coord, index }

for (const st of mainStations) {
  const target = stationCoordsDict[st.name];
  let bestIdx = currentIdx;
  let bestDist = Infinity;

  const searchStart = Math.max(0, currentIdx - 5);
  for (let i = searchStart; i < mainPolyline.length; i++) {
    const d = distMeters([target.lat, target.lon], mainPolyline[i]);
    if (d < bestDist) {
      bestDist = d;
      bestIdx = i;
    }
  }

  stationMap.set(st.id, {
    config: st,
    index: bestIdx,
    coord: [mainPolyline[bestIdx][0], mainPolyline[bestIdx][1]],
    snapDist: bestDist
  });
  currentIdx = bestIdx;
}

// 押上 (TSK-03)
const oshiageTarget = stationCoordsDict['押上'];
let bestOshiageIdx = 0, bestOshiageDist = Infinity;
oshiagePolyline.forEach((pt, i) => {
  const d = distMeters([oshiageTarget.lat, oshiageTarget.lon], pt);
  if (d < bestOshiageDist) {
    bestOshiageDist = d;
    bestOshiageIdx = i;
  }
});
stationMap.set('TSK-03', {
  config: stationConfigs.find(s => s.id === 'TSK-03'),
  index: bestOshiageIdx,
  coord: [oshiagePolyline[bestOshiageIdx][0], oshiagePolyline[bestOshiageIdx][1]],
  snapDist: bestOshiageDist
});

// 接続駅の座標調整（他路線との完全一致）
// 東武動物公園: TSK-30
const isesakiStationsRaw = fs.readFileSync('src/data/lines/tobu_isesaki/stations.ts', 'utf8');
const isesakiMatch = isesakiStationsRaw.match(/"id":\s*"TSK-30"[\s\S]*?"lat":\s*([\d.]+)[\s\S]*?"lng":\s*([\d.]+)/);
if (isesakiMatch) {
  const isesakiCoord = [parseFloat(isesakiMatch[1]), parseFloat(isesakiMatch[2])];
  console.log(`Aligning 東武動物公園 to tobu_isesaki: [${isesakiCoord}]`);
  stationMap.get('TSK-30').coord = isesakiCoord;
}

// 西新井: TSK-13 (大師線と一致)
const daishiStationsRaw = fs.readFileSync('src/data/lines/tobu_daishi/stations.ts', 'utf8');
const daishiMatch = daishiStationsRaw.match(/"id":\s*"TSK-13"[\s\S]*?"lat":\s*([\d.]+)[\s\S]*?"lng":\s*([\d.]+)/);
if (daishiMatch) {
  const daishiCoord = [parseFloat(daishiMatch[1]), parseFloat(daishiMatch[2])];
  console.log(`Aligning 西新井 to tobu_daishi: [${daishiCoord}]`);
  stationMap.get('TSK-13').coord = daishiCoord;
}

// 曳舟: TSK-04 (亀戸線と一致)
const kameidoStationsRaw = fs.readFileSync('src/data/lines/tobu_kameido/stations.ts', 'utf8');
const kameidoMatch = kameidoStationsRaw.match(/"id":\s*"TSK-04"[\s\S]*?"lat":\s*([\d.]+)[\s\S]*?"lng":\s*([\d.]+)/);
if (kameidoMatch) {
  const kameidoCoord = [parseFloat(kameidoMatch[1]), parseFloat(kameidoMatch[2])];
  console.log(`Aligning 曳舟 to tobu_kameido: [${kameidoCoord}]`);
  stationMap.get('TSK-04').coord = kameidoCoord;
}

// セグメントの生成
const trackSegments = [];

// 1. 本線セグメント群
// TSK-01 -> TSK-02
{
  const s1 = stationMap.get('TSK-01');
  const s2 = stationMap.get('TSK-02');
  const slice = mainPolyline.slice(s1.index, s2.index + 1);
  slice[0] = s1.coord;
  slice[slice.length - 1] = s2.coord;
  trackSegments.push({
    id: `tobu_skytree_TSK-01_TSK-02`,
    fromStationId: 'TSK-01',
    toStationId: 'TSK-02',
    coordinates: subdivideCoordinates(slice, 50)
  });
}

// TSK-02 -> TSK-04
{
  const s1 = stationMap.get('TSK-02');
  const s2 = stationMap.get('TSK-04');
  const slice = mainPolyline.slice(s1.index, s2.index + 1);
  slice[0] = s1.coord;
  slice[slice.length - 1] = s2.coord;
  trackSegments.push({
    id: `tobu_skytree_TSK-02_TSK-04`,
    fromStationId: 'TSK-02',
    toStationId: 'TSK-04',
    coordinates: subdivideCoordinates(slice, 50)
  });
}

// TSK-03 -> TSK-04 (押上 -> 曳舟)
{
  const s1 = stationMap.get('TSK-03');
  const s2 = stationMap.get('TSK-04');
  // 押上支線の終点（曳舟接続点）までスライス
  let bestHikifuneOshiageIdx = 0, bestDist = Infinity;
  oshiagePolyline.forEach((pt, i) => {
    const d = distMeters(s2.coord, pt);
    if (d < bestDist) {
      bestDist = d;
      bestHikifuneOshiageIdx = i;
    }
  });
  const slice = oshiagePolyline.slice(s1.index, bestHikifuneOshiageIdx + 1);
  slice[0] = s1.coord;
  slice[slice.length - 1] = s2.coord;
  trackSegments.push({
    id: `tobu_skytree_TSK-03_TSK-04`,
    fromStationId: 'TSK-03',
    toStationId: 'TSK-04',
    coordinates: subdivideCoordinates(slice, 50)
  });
}

// TSK-04 -> TSK-05 -> ... -> TSK-30
for (let i = 2; i < mainStations.length - 1; i++) {
  const fromCfg = mainStations[i];
  const toCfg = mainStations[i + 1];
  const s1 = stationMap.get(fromCfg.id);
  const s2 = stationMap.get(toCfg.id);
  const slice = mainPolyline.slice(s1.index, s2.index + 1);
  slice[0] = s1.coord;
  slice[slice.length - 1] = s2.coord;
  trackSegments.push({
    id: `tobu_skytree_${fromCfg.id}_${toCfg.id}`,
    fromStationId: fromCfg.id,
    toStationId: toCfg.id,
    coordinates: subdivideCoordinates(slice, 50)
  });
}

console.log(`Generated ${trackSegments.length} track segments.`);

// 全セグメントの距離・品質チェック
let totalTrackKm = 0;
trackSegments.forEach((seg, i) => {
  let segLen = 0;
  for (let j = 0; j < seg.coordinates.length - 1; j++) {
    segLen += distMeters(seg.coordinates[j], seg.coordinates[j + 1]);
  }
  totalTrackKm += segLen;
  const s1 = stationMap.get(seg.fromStationId);
  const s2 = stationMap.get(seg.toStationId);
  const straight = distMeters(s1.coord, s2.coord);
  const ratio = segLen / straight;
  console.log(`[Seg ${i+1}] ${seg.id} (${s1.config.name} -> ${s2.config.name}): len=${(segLen/1000).toFixed(2)}km, pts=${seg.coordinates.length}, ratio=${ratio.toFixed(2)}`);
  if (ratio > 2.0) {
    throw new Error(`Abnormal ratio on segment ${seg.id}: ${ratio}`);
  }
});

// 駅メタデータ配列の生成
const stations = stationConfigs.map((cfg, idx) => {
  const stInfo = stationMap.get(cfg.id);
  const meta = STATION_META[cfg.name] || {};

  return {
    id: cfg.id,
    ...(cfg.stationNumber !== undefined ? { stationNumber: cfg.stationNumber } : {}),
    lineId: 'tobu_skytree',
    number: idx + 1,
    name: cfg.name,
    nameKana: meta.nameKana || cfg.name,
    nameEn: meta.nameEn || cfg.name,
    lat: stInfo.coord[0],
    lng: stInfo.coord[1],
    transfers: meta.transfers || [],
    address: meta.address || '',
    facilities: meta.facilities || {
      elevator: true,
      restroom: true,
      multipurposeToilet: true,
      waitingRoom: true,
      ticketOffice: true
    },
    stoppingTypes: cfg.stoppingTypes || ['local'],
    isMajor: cfg.isMajor || false,
    platforms: cfg.platforms || {
      inbound: '1番線',
      outbound: '2番線',
    }
  };
});

// ファイル書き出し
const stationsTsContent = `import type { Station } from '../../../types';\n\nexport const TOBU_SKYTREE_STATIONS: Station[] = ${JSON.stringify(stations, null, 2)};\n`;
fs.writeFileSync('src/data/lines/tobu_skytree/stations.ts', stationsTsContent, 'utf8');
console.log('✅ Updated src/data/lines/tobu_skytree/stations.ts');

const trackGeometryTsContent = `import type { TrackSegment } from '../../../types';\n\nexport const TOBU_SKYTREE_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(trackSegments, null, 2)};\n`;
fs.writeFileSync('src/data/lines/tobu_skytree/trackGeometry.ts', trackGeometryTsContent, 'utf8');
console.log('✅ Updated src/data/lines/tobu_skytree/trackGeometry.ts');
