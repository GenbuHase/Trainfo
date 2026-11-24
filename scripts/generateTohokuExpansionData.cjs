// 東北エリア13路線＋JR米坂線（計14路線）軌道ジオメトリ・駅データ・Yahoo設定一括生成スクリプト
const fs = require('fs');
const path = require('path');
const { distMeters, subdivideCoordinates } = require('./common/geometryBuilderUtils.cjs');
const {
  COORD_ANCHORS,
  MAJOR_STATIONS,
  LINE_TRANSFERS_MAP,
  STATION_READINGS,
  LINE_SPECS,
} = require('./tohokuExpansionMetadata.cjs');

function normName(s) {
  return (s || '')
    .replace(/\([^)]*\)$/g, '')
    .replace(/（[^）]*）$/g, '')
    .replace(/ヶ/g, 'ケ')
    .replace(/駅$/g, '')
    .trim();
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

function cleanSpikes(coords, startCoord, endCoord, maxAngleDeg = 98) {
  let pts = coords.slice();
  while (pts.length >= 3) {
    const d0 = distMeters(startCoord, pts[0]);
    const d1 = distMeters(startCoord, pts[1]);
    if (d0 < 25 || (d1 < d0 && d0 < 120) || angleDeg(startCoord, pts[0], pts[1]) > maxAngleDeg) {
      pts.shift();
    } else {
      break;
    }
  }
  while (pts.length >= 3) {
    const n = pts.length;
    const dLast = distMeters(endCoord, pts[n - 1]);
    const dPrev = distMeters(endCoord, pts[n - 2]);
    if (dLast < 25 || (dPrev < dLast && dLast < 120) || angleDeg(pts[n - 2], pts[n - 1], endCoord) > maxAngleDeg) {
      pts.pop();
    } else {
      break;
    }
  }
  pts = [startCoord, ...pts, endCoord];

  const deduped = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    if (distMeters(deduped[deduped.length - 1], pts[i]) >= 1.5 || i === pts.length - 1) {
      deduped.push(pts[i]);
    }
  }

  let cleaned = deduped;
  for (let pass = 0; pass < 12; pass++) {
    let changed = false;
    const next = [cleaned[0]];
    for (let i = 1; i < cleaned.length - 1; i++) {
      const pPrev = next[next.length - 1];
      const pCur = cleaned[i];
      const pNext = cleaned[i + 1];
      const deg = angleDeg(pPrev, pCur, pNext);
      const d1 = distMeters(pPrev, pCur);
      const d2 = distMeters(pCur, pNext);
      if (deg > maxAngleDeg && (d1 > 6 || d2 > 6)) {
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

function buildAdjFromWays(wayIds, waysMap, nodeMap) {
  const adj = new Map();
  for (const wid of wayIds) {
    const w = waysMap.get(wid);
    if (!w || !w.nodes || w.nodes.length < 2) continue;
    for (let i = 0; i < w.nodes.length - 1; i++) {
      const u = w.nodes[i];
      const v = w.nodes[i + 1];
      const pu = nodeMap.get(u);
      const pv = nodeMap.get(v);
      if (!pu || !pv) continue;
      const d = distMeters(pu, pv);
      if (!adj.has(u)) adj.set(u, []);
      if (!adj.has(v)) adj.set(v, []);
      adj.get(u).push({ to: v, dist: d, wid });
      adj.get(v).push({ to: u, dist: d, wid });
    }
  }
  return adj;
}

function getLargestComponentNodes(adj) {
  const visited = new Set();
  let best = new Set();
  for (const start of adj.keys()) {
    if (visited.has(start)) continue;
    const comp = new Set([start]);
    const q = [start];
    visited.add(start);
    while (q.length > 0) {
      const u = q.shift();
      for (const e of adj.get(u) || []) {
        if (!visited.has(e.to)) {
          visited.add(e.to);
          comp.add(e.to);
          q.push(e.to);
        }
      }
    }
    if (comp.size > best.size) best = comp;
  }
  return best;
}

function bridgeNearbyEndpoints(adj, nodeMap, maxGapMeters = 85) {
  const deg1Nodes = [];
  for (const [nid, edges] of adj.entries()) {
    if (edges.length <= 1) deg1Nodes.push(nid);
  }
  for (let i = 0; i < deg1Nodes.length; i++) {
    const u = deg1Nodes[i];
    const pu = nodeMap.get(u);
    if (!pu) continue;
    for (const [v, edgesV] of adj.entries()) {
      if (u === v) continue;
      const pv = nodeMap.get(v);
      if (!pv) continue;
      if (Math.abs(pu[0] - pv[0]) > 0.0015 || Math.abs(pu[1] - pv[1]) > 0.0018) continue;
      const d = distMeters(pu, pv);
      if (d <= maxGapMeters && !adj.get(u).some((e) => e.to === v)) {
        adj.get(u).push({ to: v, dist: d, wid: 'bridge' });
        edgesV.push({ to: u, dist: d, wid: 'bridge' });
      }
    }
  }
}

function dijkstra(adj, startId, goalId) {
  if (startId === goalId) return { nodes: [startId], totalDist: 0 };
  const dist = new Map([[startId, 0]]);
  const prev = new Map();
  const pq = [[0, startId]];
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift();
    if (d > (dist.get(u) ?? Infinity)) continue;
    if (u === goalId) {
      const nodes = [];
      let c = u;
      while (prev.has(c)) {
        nodes.push(c);
        c = prev.get(c);
      }
      nodes.push(startId);
      return { nodes: nodes.reverse(), totalDist: d };
    }
    for (const e of adj.get(u) || []) {
      const nd = d + e.dist;
      if (nd < (dist.get(e.to) ?? Infinity)) {
        dist.set(e.to, nd);
        prev.set(e.to, u);
        pq.push([nd, e.to]);
      }
    }
  }
  return null;
}

function closestNode(coord, compNodes, nodeMap) {
  let best = null;
  let minD = Infinity;
  for (const nid of compNodes) {
    const p = nodeMap.get(nid);
    if (!p) continue;
    const d = distMeters(coord, p);
    if (d < minD) {
      minD = d;
      best = nid;
    }
  }
  return { nid: best, d: minD };
}

function candidatesNear(coord, compNodes, nodeMap, maxDist = 140) {
  const cands = [];
  for (const nid of compNodes) {
    const p = nodeMap.get(nid);
    if (!p) continue;
    const d = distMeters(coord, p);
    if (d <= maxDist) cands.push({ nid, d });
  }
  cands.sort((a, b) => a.d - b.d);
  if (cands.length === 0) {
    const cl = closestNode(coord, compNodes, nodeMap);
    if (cl.nid != null) cands.push(cl);
  }
  return cands.slice(0, 12);
}

function loadAllOsmCache() {
  const cacheDir = path.resolve(__dirname, 'cache/osm_tohoku_expansion');
  const nodeMap = new Map();
  const waysMap = new Map();
  const relWaysMap = new Map();
  const namedNodes = [];

  for (const file of fs.readdirSync(cacheDir)) {
    if (!file.endsWith('.json')) continue;
    const data = JSON.parse(fs.readFileSync(path.join(cacheDir, file), 'utf8'));
    for (const el of data.elements || []) {
      if (el.type === 'node') {
        nodeMap.set(el.id, [el.lat, el.lon]);
        if (el.tags?.name) {
          namedNodes.push({
            id: el.id,
            lat: el.lat,
            lng: el.lon,
            name: el.tags.name,
            norm: normName(el.tags.name),
            tags: el.tags,
          });
        }
      } else if (el.type === 'way') {
        waysMap.set(el.id, el);
      } else if (el.type === 'relation') {
        const wids = (el.members || []).filter((m) => m.type === 'way').map((m) => m.ref);
        relWaysMap.set(el.id, wids);
      }
    }
  }
  return { nodeMap, waysMap, relWaysMap, namedNodes };
}

function computeStoppingTypes(spec, stName, opts) {
  if (opts.winterPass) return [];
  if (spec.isSubwayLocal) return ['local'];
  const types = ['regular'];
  if (spec.hasSubstitutionBus) types.push('substitution_bus');
  if (spec.hasSemiExp) {
    if (spec.semiExpStops?.has(stName)) types.push('semi_exp');
  }
  if (spec.hasExpress) {
    if (spec.expressStops?.has(stName)) types.push('express');
    if (!spec.rapidExcludeStops?.has(stName)) types.push('rapid');
  } else if (spec.rapidStops) {
    if (spec.rapidStops.has(stName)) types.push('rapid');
  } else if (spec.rapidExcludeStops) {
    if (!spec.rapidExcludeStops.has(stName)) types.push('rapid');
  } else if (!spec.isSubwayLocal) {
    types.push('rapid');
  }
  return types;
}

function loadSharedSegments(lineId, count) {
  const filePath = path.resolve(__dirname, `../src/data/lines/${lineId}/trackGeometry.ts`);
  const content = fs.readFileSync(filePath, 'utf8');
  const arr = JSON.parse(content.slice(content.indexOf('= [') + 2, content.lastIndexOf(']') + 1));
  return arr.slice(0, count);
}

function buildLine(spec, osm) {
  const { nodeMap, waysMap, relWaysMap, namedNodes } = osm;

  const unionWayIds = new Set();
  for (const rid of spec.osmRelIds) {
    for (const wid of relWaysMap.get(rid) || []) unionWayIds.add(wid);
  }

  const mainAdj = buildAdjFromWays(unionWayIds, waysMap, nodeMap);
  bridgeNearbyEndpoints(mainAdj, nodeMap, 120);
  const allGraphNodes = new Set(mainAdj.keys());
  const mainComp = getLargestComponentNodes(mainAdj);

  const stations = spec.stations.map((entry, idx) => {
    const [stName, ysid, pref, opts = {}] = entry;
    const num = idx + 1;
    const id = `${spec.prefix}-${String(num).padStart(2, '0')}`;
    const anchor = COORD_ANCHORS[`${spec.lineId}:${stName}`];

    let lat, lng;
    if (anchor) {
      [lat, lng] = anchor;
    } else {
      const targetNorm = normName(stName);
      // 厳密一致のみ採用（Playbook #34 前方一致禁止）
      const exactCands = namedNodes.filter((n) => n.norm === targetNorm);
      if (exactCands.length === 0) {
        throw new Error(`No exact OSM node candidate for station ${spec.lineId}:${stName}`);
      }

      let bestCand = exactCands[0];
      let bestScore = Infinity;
      for (const c of exactCands) {
        const cl = closestNode([c.lat, c.lng], allGraphNodes.size > 0 ? allGraphNodes : mainComp, nodeMap);
        let penalty = 0;
        if (spec.isSubwayLocal) {
          if (c.tags?.station === 'subway' || c.tags?.subway === 'yes') penalty -= 25;
          if (c.tags?.railway === 'station') penalty -= 10;
        } else {
          if (c.tags?.railway === 'station' || c.tags?.railway === 'halt') penalty -= 15;
          if (c.tags?.station === 'subway' || c.tags?.subway === 'yes') penalty += 80;
          if (c.tags?.highway === 'bus_stop') penalty += 150;
        }
        const score = cl.d + penalty;
        if (score < bestScore) {
          bestScore = score;
          bestCand = c;
        }
      }
      // 軌道上の最近傍ノードにスナップし、0.0m 一致を保証
      const snap = closestNode([bestCand.lat, bestCand.lng], allGraphNodes.size > 0 ? allGraphNodes : mainComp, nodeMap);
      if (snap.nid != null && snap.d < 300) {
        [lat, lng] = nodeMap.get(snap.nid);
      } else {
        lat = bestCand.lat;
        lng = bestCand.lng;
        console.warn(`  ⚠️ [Snap warn] ${spec.lineId}:${stName} dist=${Math.round(snap.d)}m`);
      }
    }

    const [nameKana, nameEn] = STATION_READINGS[stName] || [stName, stName];
    const transfers = (LINE_TRANSFERS_MAP[`${spec.lineId}:${stName}`] || []).slice();
    const stoppingTypes = computeStoppingTypes(spec, stName, opts);
    const stationNumber = spec.stationNumberPrefix
      ? `${spec.stationNumberPrefix}${String(num).padStart(2, '0')}`
      : undefined;

    const stObj = {
      id,
      ...(stationNumber ? { stationNumber } : {}),
      lineId: spec.lineId,
      number: num,
      name: stName,
      nameKana,
      nameEn,
      lat,
      lng,
      transfers,
      address: `${pref}${stName}駅周辺`,
      platforms: {
        inbound: '上りホーム',
        outbound: '下りホーム',
      },
      stoppingTypes,
      isMajor: MAJOR_STATIONS.has(stName),
      facilities: {
        elevator: MAJOR_STATIONS.has(stName),
        restroom: true,
        multipurposeToilet: MAJOR_STATIONS.has(stName),
        waitingRoom: true,
        ticketOffice: MAJOR_STATIONS.has(stName),
      },
      _ysid: ysid,
      _opts: opts,
    };
    return stObj;
  });

  const stById = new Map(stations.map((s) => [s.id, s]));

  // 共用区間コピー（花輪線 盛岡〜好摩）
  const sharedSegs = spec.copySharedSegmentsFrom
    ? loadSharedSegments(spec.copySharedSegmentsFrom.lineId, spec.copySharedSegmentsFrom.count)
    : [];

  const segments = [];
  for (let i = 0; i < stations.length - 1; i++) {
    const stA = stations[i];
    const stB = stations[i + 1];

    if (i < sharedSegs.length) {
      const src = sharedSegs[i];
      segments.push({
        id: `${spec.lineId}-seg-${i + 1}`,
        segmentId: `${stA.id}_${stB.id}`,
        fromStationId: stA.id,
        toStationId: stB.id,
        fromName: stA.name,
        toName: stB.name,
        coordinates: src.coordinates.slice(),
      });
      continue;
    }

    const cA = [stA.lat, stA.lng];
    const cB = [stB.lat, stB.lng];

    const caList = candidatesNear(cA, allGraphNodes, nodeMap, 160);
    const cbList = candidatesNear(cB, allGraphNodes, nodeMap, 160);
    let routeRes = null;
    for (const ca of caList) {
      for (const cb of cbList) {
        const res = dijkstra(mainAdj, ca.nid, cb.nid);
        if (res && (!routeRes || res.totalDist < routeRes.totalDist)) routeRes = res;
      }
    }

    const rawPts = routeRes && routeRes.nodes.length >= 2
      ? routeRes.nodes.map((nid) => nodeMap.get(nid))
      : [cA, cB];

    if (!routeRes) {
      console.warn(`  ⚠️ [Straight fallback] ${spec.lineId} ${stA.name}(${stA.id}) -> ${stB.name}(${stB.id})`);
    }

    const cleanPts = cleanSpikes(rawPts, cA, cB, 98);
    const coords = subdivideCoordinates(cleanPts, 120);

    const segLen = coords.reduce((acc, p, idx) => (idx ? acc + distMeters(coords[idx - 1], p) : 0), 0);
    const straight = distMeters(cA, cB);
    if (segLen > Math.max(800, straight * 3.8)) {
      console.warn(`  ⚠️ [Detour check] ${spec.lineId} ${stA.name}->${stB.name}: segLen=${Math.round(segLen)}m vs straight=${Math.round(straight)}m`);
    }

    segments.push({
      id: `${spec.lineId}-seg-${i + 1}`,
      segmentId: `${stA.id}_${stB.id}`,
      fromStationId: stA.id,
      toStationId: stB.id,
      fromName: stA.name,
      toName: stB.name,
      coordinates: coords,
    });
  }

  const cleanStations = stations.map(({ _ysid, _opts, ...rest }) => rest);
  const lats = cleanStations.map((s) => s.lat);
  const lngs = cleanStations.map((s) => s.lng);
  const defaultBounds = [
    [Number((Math.min(...lats) - 0.02).toFixed(4)), Number((Math.min(...lngs) - 0.02).toFixed(4))],
    [Number((Math.max(...lats) + 0.02).toFixed(4)), Number((Math.max(...lngs) + 0.02).toFixed(4))],
  ];

  const outDir = path.resolve(__dirname, `../src/data/lines/${spec.lineId}`);
  fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(
    path.join(outDir, 'stations.ts'),
    `import type { Station } from '../../../types';\n\nexport const ${spec.exportPrefix}_STATIONS: Station[] = ${JSON.stringify(cleanStations, null, 2)};\n`,
    'utf8'
  );

  fs.writeFileSync(
    path.join(outDir, 'trackGeometry.ts'),
    `import type { TrackSegment } from '../../../types';\n\nexport const ${spec.exportPrefix}_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(segments, null, 2)};\n`,
    'utf8'
  );

  // trainTypes.ts 生成
  const extraTypes = [];
  if (spec.isSubwayLocal) {
    extraTypes.push(`  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '${spec.lineColor}',
    textColor: '${spec.badgeTextColor}',
    bgColor: '${spec.lineColor}',
    borderColor: '${spec.accentColor}',
  },`);
  } else {
    extraTypes.push(`  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '${spec.lineColor}',
    textColor: '${spec.badgeTextColor}',
    bgColor: '${spec.lineColor}',
    borderColor: '${spec.accentColor}',
  },
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '${spec.lineColor}',
    textColor: '${spec.badgeTextColor}',
    bgColor: '${spec.lineColor}',
    borderColor: '${spec.accentColor}',
  },
  rapid: JR_RAPID_PRESETS.STANDARD,
  special_rapid: JR_RAPID_PRESETS.SPECIAL_RAPID,
  limited_exp: LIMITED_EXP_PRESETS.STANDARD,`);
  }
  if (spec.hasSemiExp) {
    extraTypes.push(`  semi_exp: {
    key: 'semi_exp',
    name: '準急',
    nameEn: 'Semi Express',
    shortName: '準急',
    color: '#d97706',
    textColor: '#ffffff',
    bgColor: '#d97706',
    borderColor: '#b45309',
  },`);
  }
  if (spec.hasExpress) {
    extraTypes.push(`  express: {
    key: 'express',
    name: '急行',
    nameEn: 'Express',
    shortName: '急行',
    color: '#ea5504',
    textColor: '#ffffff',
    bgColor: '#ea5504',
    borderColor: '#c2410c',
  },`);
  }
  if (spec.hasSubstitutionBus) {
    extraTypes.push(`  substitution_bus: {
    key: 'substitution_bus',
    name: '代行バス',
    nameEn: 'Rail Replacement Bus',
    shortName: '代行',
    color: '#d97706',
    textColor: '#ffffff',
    bgColor: '#d97706',
    borderColor: '#b45309',
  },`);
  }

  const presetImports = spec.isSubwayLocal
    ? ''
    : `import { JR_RAPID_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';\n`;

  const trainTypesContent = `import type { TrainTypeConfig } from '../../../types';
${presetImports}
export const ${spec.exportPrefix}_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
${extraTypes.join('\n')}
};
`;
  fs.writeFileSync(path.join(outDir, 'trainTypes.ts'), trainTypesContent, 'utf8');

  const indexContent = `import type { LineDefinition } from '../../../types';
import { ${spec.exportPrefix}_STATIONS } from './stations';
import { ${spec.exportPrefix}_TRACK_SEGMENTS } from './trackGeometry';
import { ${spec.exportPrefix}_TRAIN_TYPES } from './trainTypes';

export const ${spec.exportLineVar}: LineDefinition = {
  id: '${spec.lineId}',
  name: '${spec.name}',
  shortName: '${spec.shortName}',
  operator: '${spec.operator}',
  area: 'tohoku',
  lineColor: '${spec.lineColor}',
  accentColor: '${spec.accentColor}',
  defaultCars: ${spec.defaultCars},
  defaultBounds: ${JSON.stringify(defaultBounds)},
  directionNames: ${JSON.stringify(spec.directionNames, null, 4)},
  stations: ${spec.exportPrefix}_STATIONS,
  trackSegments: ${spec.exportPrefix}_TRACK_SEGMENTS,
  trainTypes: ${spec.exportPrefix}_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
`;
  fs.writeFileSync(path.join(outDir, 'index.ts'), indexContent, 'utf8');

  // config.cjs 生成
  const cfgStations = stations.map((st, idx) => {
    const o = st._opts || {};
    const hasInOverride = Object.prototype.hasOwnProperty.call(o, 'inGid');
    const hasOutOverride = Object.prototype.hasOwnProperty.call(o, 'outGid');
    const inGroupId = hasInOverride ? o.inGid : (idx === 0 ? null : spec.inGroupId);
    const outGroupId = hasOutOverride ? o.outGid : (idx === stations.length - 1 ? null : spec.outGroupId);
    return {
      id: st.id,
      name: st.name,
      yahooStationId: String(st._ysid),
      inGroupId,
      outGroupId,
    };
  });

  const baseSectionSeconds = {};
  const speedKmh = spec.isSubwayLocal ? 36 : 44;
  for (let i = 0; i < Math.min(stations.length - 1, segments.length); i++) {
    const seg = segments[i];
    const d = seg.coordinates.reduce((acc, p, k) => (k ? acc + distMeters(seg.coordinates[k - 1], p) : 0), 0);
    baseSectionSeconds[i + 1] = Math.max(70, Math.round((d / 1000 / speedKmh) * 3600));
  }

  let extraFilterLines = '';
  if (spec.winterScheduleOnly) {
    extraFilterLines += `  buildStationTimetablesFromTrips: true,\n`;
    extraFilterLines += `  shouldExcludeTrip: (d) => /(12月1日|１２月１日).*運休|4月1日.*運転/.test(d.driveComment || ''),\n`;
  }

  const preserveList = ['regular'];
  if (spec.isSubwayLocal) preserveList.push('local');
  if (spec.hasSubstitutionBus) preserveList.push('substitution_bus');
  if (spec.hasSemiExp) preserveList.push('semi_exp');
  if (spec.hasExpress) preserveList.push('express');
  preserveList.push('rapid', 'limited_exp');

  const trainTypeEntries = [];
  if (spec.isSubwayLocal) {
    trainTypeEntries.push(`    '普通': 'local',\n    '各駅停車': 'local',`);
  } else {
    trainTypeEntries.push(`    '普通': 'regular',\n    '各駅停車': 'regular',`);
  }
  if (spec.hasSubstitutionBus) {
    trainTypeEntries.push(`    '代行バス': 'substitution_bus',`);
  }
  if (spec.hasSemiExp) {
    trainTypeEntries.push(`    '準急ストーブ列車': 'semi_exp',\n    '準急 ストーブ列車': 'semi_exp',\n    'ストーブ列車': 'semi_exp',\n    '準急': 'semi_exp',`);
  }
  if (spec.hasExpress) {
    trainTypeEntries.push(`    '急行もりよし': 'express',\n    'もりよし': 'express',\n    '急行': 'express',`);
  }
  trainTypeEntries.push(`    '快速ひなび': 'rapid',\n    '快速': 'rapid',\n    '特別快速': 'special_rapid',\n    '特急': 'limited_exp',`);

  const configContent = `// ${spec.name} Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: '${spec.lineId}',
  name: '${spec.name}',
  stationsFilePath: 'src/data/lines/${spec.lineId}/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/${spec.lineId}/stationTimetables.json',
    globalTimetable: 'src/data/lines/${spec.lineId}/globalTimetable.json',
  },
  stations: ${JSON.stringify(cfgStations, null, 4)},
  stationNameAliases: {
    '成島(山形県)': '成島',
    '中郡(山形県)': '中郡',
    '今泉(山形県)': '今泉',
    '青山(岩手県)': '青山',
    '黒松(宮城県)': '黒松',
    '旭ケ丘(宮城県)': '旭ケ丘',
    '旭ヶ丘': '旭ケ丘',
    '河原町(宮城県)': '河原町',
    '仙台(地下鉄)': '仙台',
    '川内(宮城県)': '川内',
    '国際センター(宮城県)': '国際センター',
    '薬師堂(宮城県)': '薬師堂',
    '卸町(宮城県)': '卸町',
    '荒井(宮城県)': '荒井',
    '吉浜(岩手県)': '吉浜',
    '平田(岩手県)': '平田',
    '十府ケ浦海岸': '十府ケ浦海岸',
    '十府ヶ浦海岸': '十府ケ浦海岸',
    '運動公園前(青森県)': '運動公園前',
    '新里(青森県)': '新里',
    '黒石(青森県)': '黒石',
    '石川(弘南鉄道線)': '石川',
    '十川(青森県)': '十川',
    '縄文小ケ田': '縄文小ケ田',
    '縄文小ヶ田': '縄文小ケ田',
    '鮎川(秋田県)': '鮎川',
    '黒沢(由利高原鉄道線)': '黒沢',
    '久保田(秋田県)': '久保田',
    '宮内(山形県)': '宮内',
    '福島(福島県)': '福島',
    '大泉(福島県)': '大泉',
    '新田(福島県)': '新田',
    '梁川(福島県)': '梁川',
    '横倉(宮城県)': '横倉',
    '泉(福島交通線)': '泉',
    '平野(福島県)': '平野',
  },
  trainTypeMap: {
${trainTypeEntries.join('\n')}
  },
  preserveAllStopsTypes: ${JSON.stringify(preserveList)},
  defaultTrainType: '${spec.isSubwayLocal ? 'local' : 'regular'}',
  defaultCars: ${spec.defaultCars},
${extraFilterLines}  baseSectionSeconds: ${JSON.stringify(baseSectionSeconds, null, 4)},
};
`;

  const cfgDir = path.resolve(__dirname, `lines/${spec.lineId}`);
  fs.mkdirSync(cfgDir, { recursive: true });
  fs.writeFileSync(path.join(cfgDir, 'config.cjs'), configContent, 'utf8');

  console.log(`✅ ${spec.lineId}: ${cleanStations.length} stations, ${segments.length} segments`);
}

function main() {
  console.log('🚀 Loading cached OSM data for Tohoku Expansion (14 lines)...');
  const osm = loadAllOsmCache();
  for (const spec of LINE_SPECS) {
    buildLine(spec, osm);
  }
  console.log('\n🎉 Successfully generated geometry, stations, and Yahoo configs for all 14 lines!');
}

main();
