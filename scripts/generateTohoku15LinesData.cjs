// 東北13鉄道線＋BRT2路線（計15路線）軌道ジオメトリ・駅データ・設定ファイル一括生成スクリプト
const fs = require('fs');
const path = require('path');
const { distMeters, subdivideCoordinates } = require('./common/geometryBuilderUtils.cjs');
const {
  COORD_ANCHORS,
  MAJOR_STATIONS,
  STATION_READINGS,
  TRANSFERS_MAP,
  LINE_SPECS,
} = require('./tohoku15LinesMetadata.cjs');

function normName(s) {
  return (s || '')
    .replace(/\([^)]*\)$/g, '')
    .replace(/（[^）]*）$/g, '')
    .replace(/ヶ/g, 'ケ')
    .replace(/ＢＲＴ/g, 'BRT')
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

// 端点・折り返し急角スパイク除去（audit:paths の 100度超閾値を安定クリア）
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

// 複数ノードに対して近接ノード間（<25m）をブリッジして連結化（OSM道路・線路端点の微細ギャップ補償）
function bridgeNearbyEndpoints(adj, nodeMap, maxGapMeters = 30) {
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
      if (Math.abs(pu[0] - pv[0]) > 0.001 || Math.abs(pu[1] - pv[1]) > 0.0012) continue;
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

function candidatesNear(coord, compNodes, nodeMap, maxDist = 90) {
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
  return cands.slice(0, 10);
}

// 全キャッシュ OSM データ読み込み
function loadAllOsmCache() {
  const cacheDir = path.resolve(__dirname, 'cache/osm_tohoku_15lines');
  const nodeMap = new Map();
  const waysMap = new Map();
  const relWaysMap = new Map();
  const namedNodes = []; // { lat, lng, name, norm, tags }
  const tsugaruNorthWays = [];
  const kamishishioriRoadWays = [];

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
        if (file === 'group2_stations_and_tsugaru_north.json') {
          tsugaruNorthWays.push(el.id);
        }
        if (file === 'group4_extras.json' && (el.tags?.highway || el.tags?.railway)) {
          kamishishioriRoadWays.push(el.id);
        }
      } else if (el.type === 'relation') {
        const wids = (el.members || []).filter((m) => m.type === 'way').map((m) => m.ref);
        relWaysMap.set(el.id, wids);
      }
    }
  }
  return { nodeMap, waysMap, relWaysMap, namedNodes, tsugaruNorthWays, kamishishioriRoadWays };
}

function buildLine(spec, osm) {
  const { nodeMap, waysMap, relWaysMap, namedNodes, tsugaruNorthWays, kamishishioriRoadWays } = osm;

  // 1. 路線グラフ構築
  const unionWayIds = new Set();
  for (const rid of spec.osmRelIds) {
    for (const wid of relWaysMap.get(rid) || []) unionWayIds.add(wid);
  }
  if (spec.useTsugaruNorthWays) {
    for (const wid of tsugaruNorthWays) unionWayIds.add(wid);
  }
  if (spec.lineId === 'ofunato_brt') {
    for (const wid of kamishishioriRoadWays) unionWayIds.add(wid);
  }

  const mainAdj = buildAdjFromWays(unionWayIds, waysMap, nodeMap);
  bridgeNearbyEndpoints(mainAdj, nodeMap, spec.isBrt ? 65 : 85);
  const allGraphNodes = new Set(mainAdj.keys());
  const mainComp = getLargestComponentNodes(mainAdj);

  // 個別リレーション限定グラフも保持（迂回・快速バイパス用）
  const relGraphCache = new Map();
  function getRelGraph(relId) {
    if (!relGraphCache.has(relId)) {
      const wids = new Set(relWaysMap.get(relId) || []);
      const adj = buildAdjFromWays(wids, waysMap, nodeMap);
      bridgeNearbyEndpoints(adj, nodeMap, 45);
      relGraphCache.set(relId, { adj, nodes: new Set(adj.keys()) });
    }
    return relGraphCache.get(relId);
  }

  // 2. 駅座標の確定（OSM最寄りグラフノード準拠）
  const stations = spec.stations.map((entry, idx) => {
    const [stName, ysid, pref, opts = {}] = entry;
    const num = opts.num || (idx + 1);
    const id = `${spec.prefix}-${String(num).padStart(2, '0')}`;
    const anchor = COORD_ANCHORS[`${spec.lineId}:${stName}`];

    let lat, lng;
    if (anchor) {
      [lat, lng] = anchor;
    } else {
      const targetNorm = normName(stName);
      const exactCands = namedNodes.filter((n) => n.norm === targetNorm);
      const partialCands = exactCands.length > 0
        ? exactCands
        : namedNodes.filter((n) => n.norm.includes(targetNorm) || targetNorm.includes(n.norm));

      if (partialCands.length === 0) {
        throw new Error(`No OSM node candidate for station ${spec.lineId}:${stName}`);
      }

      // 対象路線グラフ上に最も近い候補ノードを選択（BRTは stop_position や highway 寄り、鉄道は station/stop 寄り）
      let bestCand = partialCands[0];
      let bestScore = Infinity;
      for (const c of partialCands) {
        const cl = closestNode([c.lat, c.lng], allGraphNodes.size > 0 ? allGraphNodes : mainComp, nodeMap);
        let penalty = 0;
        if (spec.isBrt) {
          if (c.tags?.public_transport === 'stop_position') penalty -= 5;
          else if (c.tags?.highway === 'bus_stop') penalty -= 2;
        } else {
          if (c.tags?.railway === 'station' || c.tags?.railway === 'halt') penalty -= 15;
          else if (c.tags?.railway === 'stop') penalty -= 10;
          if (c.tags?.highway === 'bus_stop') penalty += 80;
        }
        const score = cl.d + penalty;
        if (score < bestScore) {
          bestScore = score;
          bestCand = c;
        }
      }
      lat = bestCand.lat;
      lng = bestCand.lng;
    }

    const [nameKana, nameEn] = STATION_READINGS[stName] || [stName, stName];
    const transfers = (TRANSFERS_MAP[stName] || []).slice();
    const stoppingTypes = spec.isBrt
      ? ['brt', 'rapid']
      : spec.hasSubstitutionBus
        ? ['regular', 'rapid', 'substitution_bus']
        : spec.hasResortShirakami
          ? ['regular', 'rapid', 'limitedExp']
          : ['regular', 'rapid'];

    return {
      id,
      lineId: spec.lineId,
      number: num,
      name: stName,
      nameKana,
      nameEn,
      lat,
      lng,
      transfers,
      address: `${pref}${stName}${spec.isBrt && !['気仙沼', '鹿折唐桑', '陸前高田', '盛', '前谷地', '柳津', '志津川', '本吉', '陸前階上', '松岩', '南気仙沼', '陸前矢作', '竹駒', '上鹿折', '不動の沢', '小友', '細浦', '下船渡', '大船渡', '陸前小泉', '歌津', '清水浜', '陸前戸倉', '陸前横山'].includes(stName) ? 'BRT停留所' : '駅'}周辺`,
      platforms: {
        inbound: spec.isBrt ? '上り方面のりば' : '上りホーム',
        outbound: spec.isBrt ? '下り方面のりば' : '下りホーム',
      },
      stoppingTypes,
      isMajor: MAJOR_STATIONS.has(stName),
      facilities: {
        elevator: MAJOR_STATIONS.has(stName),
        restroom: true,
        multipurposeToilet: MAJOR_STATIONS.has(stName),
        waitingRoom: true,
        ticketOffice: MAJOR_STATIONS.has(stName) && !spec.isBrt,
      },
      _ysid: ysid,
      _opts: opts,
    };
  });

  const stById = new Map(stations.map((s) => [s.id, s]));

  // 3. 軌道セグメント抽出
  const edgeSpecs = spec.edges
    ? spec.edges.map((e) => ({ fromId: e[0], toId: e[1], opt: e[2] || {} }))
    : stations.slice(0, -1).map((s, idx) => ({ fromId: s.id, toId: stations[idx + 1].id, opt: {} }));

  const segments = [];
  for (let i = 0; i < edgeSpecs.length; i++) {
    const { fromId, toId, opt } = edgeSpecs[i];
    const stA = stById.get(fromId);
    const stB = stById.get(toId);
    const cA = [stA.lat, stA.lng];
    const cB = [stB.lat, stB.lng];

    let routeRes = null;
    if (opt.relId) {
      const rg = getRelGraph(opt.relId);
      const caList = candidatesNear(cA, rg.nodes, nodeMap, 120);
      const cbList = candidatesNear(cB, rg.nodes, nodeMap, 120);
      for (const ca of caList) {
        for (const cb of cbList) {
          const res = dijkstra(rg.adj, ca.nid, cb.nid);
          if (res && (!routeRes || res.totalDist < routeRes.totalDist)) routeRes = res;
        }
      }
    }
    if (!routeRes) {
      const caList = candidatesNear(cA, allGraphNodes, nodeMap, 140);
      const cbList = candidatesNear(cB, allGraphNodes, nodeMap, 140);
      for (const ca of caList) {
        for (const cb of cbList) {
          const res = dijkstra(mainAdj, ca.nid, cb.nid);
          if (res && (!routeRes || res.totalDist < routeRes.totalDist)) routeRes = res;
        }
      }
    }

    const rawPts = routeRes && routeRes.nodes.length >= 2
      ? routeRes.nodes.map((nid) => nodeMap.get(nid))
      : [cA, cB];

    if (!routeRes) {
      console.warn(`  ⚠️ [Straight fallback] ${spec.lineId} ${stA.name}(${fromId}) -> ${stB.name}(${toId})`);
    }

    const cleanPts = cleanSpikes(rawPts, cA, cB, spec.isBrt ? 96 : 98);
    const coords = subdivideCoordinates(cleanPts, 120);

    // 過大迂回検閲（直線距離の3.5倍超でBRT等がない限り警告）
    const segLen = coords.reduce((acc, p, idx) => (idx ? acc + distMeters(coords[idx - 1], p) : 0), 0);
    const straight = distMeters(cA, cB);
    if (segLen > Math.max(800, straight * 3.8)) {
      console.warn(`  ⚠️ [Detour check] ${spec.lineId} ${stA.name}->${stB.name}: segLen=${Math.round(segLen)}m vs straight=${Math.round(straight)}m`);
    }

    segments.push({
      id: `${spec.lineId}-seg-${i + 1}`,
      segmentId: `${fromId}_${toId}`,
      fromStationId: fromId,
      toStationId: toId,
      fromName: stA.name,
      toName: stB.name,
      coordinates: coords,
    });
  }

  // バウンド算出 & clean stations オブジェクト化
  const cleanStations = stations.map(({ _ysid, _opts, ...rest }) => rest);
  const lats = cleanStations.map((s) => s.lat);
  const lngs = cleanStations.map((s) => s.lng);
  const defaultBounds = [
    [Number((Math.min(...lats) - 0.02).toFixed(4)), Number((Math.min(...lngs) - 0.02).toFixed(4))],
    [Number((Math.max(...lats) + 0.02).toFixed(4)), Number((Math.max(...lngs) + 0.02).toFixed(4))],
  ];

  // 4. TS モジュール書き出し
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

  const busBlock = spec.hasSubstitutionBus
    ? `  substitution_bus: {\n    key: 'substitution_bus',\n    name: '代行バス',\n    nameEn: 'Rail Replacement Bus',\n    shortName: '代行',\n    color: '#d97706',\n    textColor: '#ffffff',\n    bgColor: '#d97706',\n    borderColor: '#b45309',\n  },\n`
    : '';

  const trainTypesContent = spec.isBrt
    ? `import type { TrainTypeConfig } from '../../../types';

export const ${spec.exportPrefix}_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  brt: {
    key: 'brt',
    name: 'BRT',
    nameEn: 'BRT',
    shortName: 'BRT',
    color: '${spec.lineColor}',
    textColor: '${spec.badgeTextColor}',
    bgColor: '${spec.lineColor}',
    borderColor: '${spec.accentColor}',
  },
  rapid: {
    key: 'rapid',
    name: 'BRT快速',
    nameEn: 'BRT Rapid',
    shortName: 'BRT快速',
    color: '#0073bc',
    textColor: '#ffffff',
    bgColor: '#0073bc',
    borderColor: '#005a94',
  },
};
`
    : `import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const ${spec.exportPrefix}_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  regular: {
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
  limitedExp: LIMITED_EXP_PRESETS.STANDARD,
${busBlock}};
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

  // 5. Yahoo! スクレイパー config.cjs 生成
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

  // 区間平均速度ベースの安全所要時間テーブル
  const baseSectionSeconds = {};
  const speedKmh = spec.isBrt ? 32 : 46;
  for (let i = 0; i < Math.min(stations.length - 1, segments.length); i++) {
    const seg = segments[i];
    const d = seg.coordinates.reduce((acc, p, k) => (k ? acc + distMeters(seg.coordinates[k - 1], p) : 0), 0);
    baseSectionSeconds[i + 1] = Math.max(90, Math.round((d / 1000 / speedKmh) * 3600));
  }

  let extraFilterLines = '';
  if (spec.isBrt) {
    extraFilterLines += `  directStops: true,\n`;
    extraFilterLines += `  buildStationTimetablesFromTrips: true,\n`;
    extraFilterLines += `  shouldExcludeDeparture: ({ rawKindName }) => !/(ＢＲＴ|BRT)/.test(rawKindName || ''),\n`;
    extraFilterLines += `  shouldExcludeTrip: (d) => !/(ＢＲＴ|BRT)/.test(d.displayName || '') && d.trainType !== 'brt',\n`;
  } else if (spec.excludeBrt) {
    extraFilterLines += `  shouldExcludeDeparture: ({ rawKindName }) => /(ＢＲＴ|BRT)/.test(rawKindName || ''),\n`;
    extraFilterLines += `  shouldExcludeTrip: (d) => /(ＢＲＴ|BRT)/.test(d.displayName || ''),\n`;
  } else if (spec.excludeShinkansen) {
    extraFilterLines += `  shouldExcludeDeparture: ({ rawKindName }) => /こまち|新幹線/.test(rawKindName || ''),\n`;
    extraFilterLines += `  shouldExcludeTrip: (d) => /こまち|新幹線/.test(\`\${d.displayName || ''} \${d.guideComment || ''}\`),\n`;
  }

  // 大船渡線BRT向け分岐方向解決
  if (spec.lineId === 'ofunato_brt') {
    extraFilterLines += `  resolveDirection: (firstSt, lastSt) => {\n`;
    extraFilterLines += `    const a = firstSt.stationId;\n`;
    extraFilterLines += `    const b = lastSt.stationId;\n`;
    extraFilterLines += `    if (b === 'OBRT-51' || a === 'OBRT-01') return 'outbound';\n`;
    extraFilterLines += `    if (a === 'OBRT-51' || b === 'OBRT-01') return 'inbound';\n`;
    extraFilterLines += `    if (b === 'OBRT-63' || b === 'OBRT-62' || b === 'OBRT-61') return 'outbound';\n`;
    extraFilterLines += `    if (a === 'OBRT-63' || a === 'OBRT-62' || a === 'OBRT-61') return 'inbound';\n`;
    extraFilterLines += `    return firstSt.number <= lastSt.number ? 'outbound' : 'inbound';\n`;
    extraFilterLines += `  },\n`;
  }

  const preserveTypes = spec.isBrt
    ? `['brt', 'rapid', 'regular']`
    : spec.hasSubstitutionBus
      ? `['regular', 'rapid', 'limitedExp', 'substitution_bus']`
      : `['regular', 'rapid', 'limitedExp']`;

  const trainTypeMapBlock = spec.isBrt
    ? `    'ＢＲＴ快速': 'rapid',\n    'BRT快速': 'rapid',\n    'ＢＲＴ': 'brt',\n    'BRT': 'brt',\n`
    : `    '普通': 'regular',\n    '各駅停車': 'regular',\n${spec.hasResortShirakami ? `    'リゾートしらかみ': 'limitedExp',\n` : ''}    '特別快速': 'special_rapid',\n    '快速はまゆり': 'rapid',\n    '快速ひなび': 'rapid',\n    '快速しもきた': 'rapid',\n    '快速リゾートしらかみ': '${spec.hasResortShirakami ? 'limitedExp' : 'rapid'}',\n    '快速': 'rapid',\n${spec.hasSubstitutionBus ? `    '代行バス': 'substitution_bus',\n` : ''}    '特急': 'limitedExp',\n`;

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
    '北山(宮城県)': '北山',
    '国見(宮城県)': '国見',
    '高瀬(山形県)': '高瀬',
    '仙台空港(鉄道)': '仙台空港',
    '柳原(岩手県)': '柳原',
    '黒沢(北上線)': '黒沢',
    '内湾入口（八日町）': '内湾入口',
    '内湾入口(八日町)': '内湾入口',
    '八幡大橋（東陵高校）': '八幡大橋',
    '八幡大橋(東陵高校)': '八幡大橋',
    '柳津(宮城県)': '柳津',
    '栃ヶ沢公園': '栃ケ沢公園',
    '花巻空港(東北本線)': '花巻空港',
    '神代(秋田県)': '神代',
    '生田(秋田県)': '生田',
    '大曲(秋田県)': '大曲',
    '川内(岩手県)': '川内',
    '玉川(岩手県)': '玉川',
    '有家(岩手県)': '有家',
    '中田(青森県)': '中田',
    '藤崎(青森県)': '藤崎',
    '追分(秋田県)': '追分',
    '熊ヶ根': '熊ケ根',
    '足ヶ瀬': '足ケ瀬',
    '千畳敷(青森県)': '千畳敷',
    '北金ヶ沢': '北金ケ沢',
    '鰺ヶ沢': '鰺ケ沢',
  },
  trainTypeMap: {
${trainTypeMapBlock}  },
  preserveAllStopsTypes: ${preserveTypes},
  defaultTrainType: '${spec.isBrt ? 'brt' : 'regular'}',
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
  console.log('🚀 Loading cached OSM data for 15 Tohoku lines...');
  const osm = loadAllOsmCache();
  for (const spec of LINE_SPECS) {
    buildLine(spec, osm);
  }
  console.log('\n🎉 Successfully generated geometry, stations, and Yahoo configs for all 15 lines!');
}

main();
