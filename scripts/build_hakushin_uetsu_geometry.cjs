// 白新線・羽越本線 軌道ジオメトリ生成スクリプト（ROUTE_EXPANSION_PLAYBOOK.md Phase 2 準拠）
//
// 方式:
//  1) Overpass API で取得済み（fetch_hakushin_osm.cjs / fetch_uetsu_main_osm.cjs）の
//     route リレーション（route=railway）メンバーウェイをロード
//  2) ノード接続性に基づく重み付きグラフを構築（scripts/common/geometryBuilderUtils.cjs）
//     - 端点ギャップは 30m までスナップ接続、それより大きい断絶は bridge removethreshold まで
//       直近ノード対をブリッジして単一連結成分化
//  3) 終点駅ノード間を Dijkstra 最短距離経路で結び「実軌道パス」を復元
//     （OSM ウェイを配列順連結する方式は、プレイブック§4が挙げる
//      「ヒゲ状逆戻り／大ステップ／待避線トラップ」を避けるため全く使用しない）
//  4) 各駅をパス上の最寄りノードにスナップし、駅の lat/lng をパスノード座標に
//     完全一致（0.0m）させる。駅間セグメントはパスの駅アンカー間スライスで、
//     セグメント端点は必ず隣接セグメント端点と同一座標（シームレス・ゼロギャップ）
//  5) 監査内蔵: 端点0.0m／セグメント間ギャップ/最大ステップ/鋭角ターン/ratio/線路長サニティ
//
// 駅間2点直線・線形補間（プレイブック 第35条が厳禁とする行為）は一切行いません。
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const vm = require('vm');
const {
  buildWeightedGraph,
  snapEndpoints,
  dijkstraPath,
  distMeters,
  subdivideCoordinates,
} = require('./common/geometryBuilderUtils.cjs');

const LINES_DIR = path.resolve('src/data/lines');

// TypeScript ファイルをトランスパイルして export 群を取得（scan_stations_position.cjs と同じ方式）
function loadTsExports(filePath) {
  const rawTs = fs.readFileSync(filePath, 'utf8');
  const sanitized = rawTs.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '');
  const js = ts.transpileModule(sanitized, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const sandbox = { exports: {}, require: () => ({}) };
  vm.createContext(sandbox);
  vm.runInContext(js, sandbox);
  return sandbox.exports;
}

function pickStationArray(exportsObj) {
  for (const key of Object.keys(exportsObj)) {
    const v = exportsObj[key];
    if (Array.isArray(v) && v.length > 0 && v[0].id && v[0].lat !== undefined) return v;
  }
  return null;
}

// 既存全路線の站号 -> 座標リスト（自路線は除外。境界駅座標整合用）
function buildCrossLineCoordIndex(ownLineId) {
  const index = new Map(); // name -> [{lineId, id, lat, lng}]
  for (const dir of fs.readdirSync(LINES_DIR)) {
    if (dir === ownLineId) continue;
    const p = path.join(LINES_DIR, dir, 'stations.ts');
    if (!fs.existsSync(p)) continue;
    try {
      const stations = pickStationArray(loadTsExports(p));
      if (!stations) continue;
      for (const st of stations) {
        if (!index.has(st.name)) index.set(st.name, []);
        index.get(st.name).push({ lineId: dir, id: st.id, lat: st.lat, lng: st.lng });
      }
    } catch (e) {
      console.warn(`[crossIndex] skip ${dir}: ${e.message}`);
    }
  }
  return index;
}

// 連結成分収集（BFS）
function collectComponent(startId, adj) {
  const comp = new Set([startId]);
  const queue = [startId];
  while (queue.length) {
    const cur = queue.pop();
    for (const { to } of adj.get(cur) || []) {
      if (!comp.has(to)) {
        comp.add(to);
        queue.push(to);
      }
    }
  }
  return comp;
}

// 最短距離ペアブリッジで単一連結成分化（anchorStart と anchorGoal が接続されるまで）
function bridgeUntilConnected(anchorStartId, anchorGoalId, nodeMap, adj, bridgeThreshold) {
  let bridges = 0;
  while (true) {
    const comp = collectComponent(anchorStartId, adj);
    if (comp.has(anchorGoalId)) return { bridges, ok: true };

    const others = Array.from(nodeMap.keys()).filter(id => !comp.has(id));
    if (others.length === 0) return { bridges, ok: false };

    let bestPair = null;
    let bestD = Infinity;
    for (const u of comp) {
      const nu = nodeMap.get(u);
      if (!nu) continue;
      for (const v of others) {
        const nv = nodeMap.get(v);
        if (!nv) continue;
        const d = distMeters([nu.lat, nu.lon], [nv.lat, nv.lon]);
        if (d < bestD) {
          bestD = d;
          bestPair = [u, v];
        }
      }
    }
    if (!bestPair || bestD > bridgeThreshold) {
      return { bridges, ok: false, minPairDist: bestD, bestPair };
    }
    const [u, v] = bestPair;
    if (!adj.has(u)) adj.set(u, []);
    if (!adj.has(v)) adj.set(v, []);
    adj.get(u).push({ to: v, dist: bestD });
    adj.get(v).push({ to: u, dist: bestD });
    console.log(`  [bridge] connected gap ${Math.round(bestD)}m: ${u} <-> ${v}`);
    bridges++;
    if (bridges > 20) return { bridges, ok: false };
  }
}

// 連結成分: ノード -> compId / compId -> サイズ（ユニオン先に一度だけ計算）
function computeComponents(nodeMap, adj) {
  const compId = new Map();
  const sizes = new Map();
  for (const id of nodeMap.keys()) {
    if (compId.has(id)) continue;
    const root = id;
    const members = [id];
    compId.set(id, root);
    sizes.set(root, 1);
    const queue = [id];
    while (queue.length) {
      const cur = queue.pop();
      for (const { to } of adj.get(cur) || []) {
        if (!compId.has(to)) {
          compId.set(to, root);
          sizes.set(root, (sizes.get(root) || 0) + 1);
          members.push(to);
          queue.push(to);
        }
      }
    }
  }
  return { compId, sizes };
}

function nearestNode(nodeMap, targetCoord) {
  let best = null;
  let bestD = Infinity;
  for (const [id, n] of nodeMap) {
    const d = distMeters(targetCoord, [n.lat, n.lon]);
    if (d < bestD) {
      bestD = d;
      best = { id, lat: n.lat, lon: n.lon };
    }
  }
  return { node: best, dist: bestD };
}

// 半径 R 内のノードで、最大連結成分に属するものを優先的に選ぶ（端点島/孤立軌道を避ける）
function bestNodeInRadius(nodeMap, compId, sizes, coord, radius) {
  let best = null;
  for (const [id, n] of nodeMap) {
    const d = distMeters(coord, [n.lat, n.lon]);
    if (d <= radius) {
      const cs = sizes.get(compId.get(id)) || 1;
      if (!best || cs > best.compSize || (cs === best.compSize && d < best.dist)) {
        best = { node: { id, lat: n.lat, lon: n.lon }, dist: d, compSize: cs };
      }
    }
  }
  return best;
}

// 駅アンカー决定:
//  1) 自置座標 300m 内 → 最大連結成分ノード
//  2) 自置座標 1500m 内 → 最大連結成分ノード
//  3) 同名駅他線座標 1500m 内 → 最大連結成分ノード（境界駅座標整合）
//  4) フォールバック: 自置座標の全グラフ最寄りノード
function chooseAnchorNode(placeholder, crossCoords, nodeMap, compId, sizes) {
  const own = [placeholder.lat, placeholder.lng];
  let r = bestNodeInRadius(nodeMap, compId, sizes, own, 300);
  if (r) return { kind: `own@300(comp=${r.compSize})`, node: r.node, dist: r.dist };
  r = bestNodeInRadius(nodeMap, compId, sizes, own, 1500);
  if (r) return { kind: `own@1500(comp=${r.compSize})`, node: r.node, dist: r.dist };
  if (crossCoords && crossCoords.length) {
    for (const c of crossCoords) {
      r = bestNodeInRadius(nodeMap, compId, sizes, [c.lat, c.lng], 1500);
      if (r) return { kind: `cross(${c.lineId})@1500(comp=${r.compSize})`, node: r.node, dist: r.dist };
    }
  }
  const nr = nearestNode(nodeMap, own);
  return { kind: 'ownFullest', node: nr.node, dist: nr.dist };
}

function buildLineGeometry(cfg) {
  console.log(`\n================== ${cfg.lineId} ジオメトリ構築 ==================`);

  const raw = JSON.parse(fs.readFileSync(cfg.cachePath, 'utf8'));
  let elementList = raw.elements;
  if (cfg.extraCachePaths && cfg.extraCachePaths.length) {
    elementList = [...raw.elements];
    const seen = new Set(raw.elements.map(e => `${e.type}_${e.id}`));
    for (const extraPath of cfg.extraCachePaths) {
      if (!fs.existsSync(extraPath)) {
        console.warn(`  [extraCache] missing: ${extraPath} (skip)`);
        continue;
      }
      const extra = JSON.parse(fs.readFileSync(extraPath, 'utf8'));
      let added = 0;
      for (const e of extra.elements) {
        const key = `${e.type}_${e.id}`;
        if (!seen.has(key)) {
          elementList.push(e);
          seen.add(key);
          added++;
        }
      }
      console.log(`  [extraCache] ${path.basename(extraPath)}: +${added} elements`);
    }
  }
  const elements = elementList;
  const nodeMap = new Map();
  for (const e of elements) {
    if (e.type === 'node' && e.lat !== undefined) nodeMap.set(e.id, { id: e.id, lat: e.lat, lon: e.lon });
  }
  const ways = elements.filter(e => e.type === 'way' && Array.isArray(e.nodes));
  console.log(`  OSM: nodes=${nodeMap.size} ways=${ways.length}`);

  const adj = buildWeightedGraph(elements, nodeMap);
  const snapped = snapEndpoints(ways, nodeMap, adj, 30);
  console.log(`  snapEndpoints(<=30m) bridges: ${snapped}`);

  // 既存 station メタデータをロード
  const stationsPath = path.join(LINES_DIR, cfg.lineId, 'stations.ts');
  const stations = pickStationArray(loadTsExports(stationsPath));
  if (!stations) throw new Error(`stations.ts load failed for ${cfg.lineId}`);

  const crossIndex = buildCrossLineCoordIndex(cfg.lineId);

  // Nominatim で取得済みの実駅座標（プローブ: scripts/probe_station_coords.cjs）
  // プレースホルダ座標が不正確なため、実座標を第一候補とする。
  let realCoords = null;
  if (fs.existsSync(cfg.stationCoordsPath)) {
    realCoords = JSON.parse(fs.readFileSync(cfg.stationCoordsPath, 'utf8'));
    console.log(`  station coords file: ${Object.keys(realCoords).length} entries`);
  }

  const stationTarget = (st) => {
    const real = realCoords && realCoords[st.name];
    const cross = crossIndex.get(st.name) || [];
    if (real && real.lat !== undefined) {
      // 同名境界駅座標整合: 既設路線の同名列駅座標が実座標と近い(<=1000m)場合は
      // 既設路線の座標を採用し、跨線同名駅の座標を完全一致させる
      let best = null;
      for (const c of cross) {
        const d = distMeters([real.lat, real.lon], [c.lat, c.lng]);
        if (!best || d < best.d) best = { c, d };
      }
      if (best && best.d <= 1000) {
        return { coord: [best.c.lat, best.c.lng], kind: `cross(${best.c.lineId}:${best.c.id})` };
      }
      return { coord: [real.lat, real.lon], kind: 'real' };
    }
    if (cross.length) {
      return { coord: [cross[0].lat, cross[0].lng], kind: `cross(${cross[0].lineId}:${cross[0].id})` };
    }
    return { coord: [st.lat, st.lng], kind: 'placeholder' };
  };

  // 接続良好性を重視した連結成分選別
  const { compId, sizes } = computeComponents(nodeMap, adj);

  const pickAnchor = (target) => {
    for (const radius of [300, 1500, 4000]) {
      const r = bestNodeInRadius(nodeMap, compId, sizes, target.coord, radius);
      if (r) return { kind: `${target.kind}@${radius}(comp=${r.compSize})`, node: r.node, dist: r.dist };
    }
    const nr = nearestNode(nodeMap, target.coord);
    return { kind: `${target.kind}@fullest`, node: nr.node, dist: nr.dist };
  };

  const startStation = stations[0];
  const endStation = stations[stations.length - 1];
  const anchorStart = pickAnchor(stationTarget(startStation));
  const anchorGoal = pickAnchor(stationTarget(endStation));
  console.log(`  start anchor(${startStation.name}): node ${anchorStart.node.id} dist=${Math.round(anchorStart.dist)}m (${anchorStart.kind})`);
  console.log(`  goal anchor(${endStation.name}): node ${anchorGoal.node.id} dist=${Math.round(anchorGoal.dist)}m (${anchorGoal.kind})`);

  const bridge = bridgeUntilConnected(anchorStart.node.id, anchorGoal.node.id, nodeMap, adj, cfg.bridgeThreshold);
  if (!bridge.ok) throw new Error(`連結成分のブリッジに失敗: ${JSON.stringify(bridge)}`);
  console.log(`  bridged to connect: ${bridge.bridges} edges`);

  // 実軌道パス（Dijkstra 最短距離経路）
  const pathIds = dijkstraPath(adj, nodeMap, anchorStart.node.id, anchorGoal.node.id);
  if (!pathIds || pathIds.length < 10) throw new Error(`パス探索失敗: ${stations[0].name} -> ${stations[stations.length - 1].name}`);
  const pathCoords = pathIds.map(id => {
    const n = nodeMap.get(id);
    return [n.lat, n.lon];
  });
  let pathLen = 0;
  for (let i = 0; i < pathCoords.length - 1; i++) pathLen += distMeters(pathCoords[i], pathCoords[i + 1]);
  console.log(`  path: ${pathIds.length} nodes, ${(pathLen / 1000).toFixed(2)} km`);

  // 各駅をパス上（前方順序制約つき）で実座標に最も近いノードへスナップ
  const anchorIdx = [];
  let prevIdx = -1;
  for (const st of stations) {
    const target = stationTarget(st);
    let bestIdx = -1;
    let bestD = Infinity;
    for (let i = prevIdx + 1; i < pathCoords.length; i++) {
      const d = distMeters(target.coord, pathCoords[i]);
      if (d < bestD) {
        bestD = d;
        bestIdx = i;
      }
    }
    if (bestIdx < 0) throw new Error(`パス上に駅 ${st.name} の近傍なし`);
    if (bestD > 3000) {
      throw new Error(`駅 ${st.name} (${st.id}): パス上の最寄りノードが ${Math.round(bestD)}m も乖離しています (kind=${target.kind})`);
    }
    const gapMsg = (() => {
      if (prevIdx < 0) return '';
      let gapSeg = 0;
      for (let i = prevIdx; i < bestIdx; i++) gapSeg += distMeters(pathCoords[i], pathCoords[i + 1]);
      return ` (path距離: prev ${Math.round(gapSeg)}m)`;
    })();
    const snappedCoord = pathCoords[bestIdx];
    console.log(`  station ${st.name} (${st.id}, ${target.kind}): real-offset ${Math.round(bestD)}m -> path idx ${bestIdx}/${pathIds.length - 1}, snapped [${snappedCoord[0].toFixed(6)}, ${snappedCoord[1].toFixed(6)}]${gapMsg}`);
    anchorIdx.push(bestIdx);
    prevIdx = bestIdx;
  }

  // スナップ済み座標を駅配列へ書き戻し（stations.ts への反映・セグメント端点の完全一致）
  // ※ 旧プレースホルダ座標は不正確（最大15km乖離）のため、パスノードの実座標で上書きする
  for (let i = 0; i < stations.length; i++) {
    const snapped = pathCoords[anchorIdx[i]];
    stations[i].lat = snapped[0];
    stations[i].lng = snapped[1];
  }

  // セグメント生成: 駅アンカーごとのパススライス（端点完全一致・シームレス）
  const segments = [];
  const auditJumps = [];
  for (let i = 0; i < stations.length - 1; i++) {
    const s1 = stations[i];
    const s2 = stations[i + 1];
    const sliceCoords = pathCoords.slice(anchorIdx[i], anchorIdx[i + 1] + 1).map(c => [c[0], c[1]]);
    sliceCoords[0] = [s1.lat, s1.lng]; // snap 後の正式駅座標（= ノード座標と同一値）
    sliceCoords[sliceCoords.length - 1] = [s2.lat, s2.lng];

    let sliceLen = 0;
    for (let k = 0; k < sliceCoords.length - 1; k++) sliceLen += distMeters(sliceCoords[k], sliceCoords[k + 1]);
    const straight = distMeters([s1.lat, s1.lng], [s2.lat, s2.lng]);
    const ratio = sliceLen / Math.max(straight, 1);

    const smoothed = subdivideCoordinates(sliceCoords, cfg.maxStep);
    segments.push({
      segmentId: `${s1.id}_${s2.id}`,
      fromStationId: s1.id,
      toStationId: s2.id,
      coordinates: smoothed,
    });

    // 監査: 折角・ステップ・ratio
    let sharp = 0;
    for (let k = 0; k < smoothed.length - 2; k++) {
      const v1 = [smoothed[k + 1][0] - smoothed[k][0], smoothed[k + 1][1] - smoothed[k][1]];
      const v2 = [smoothed[k + 2][0] - smoothed[k + 1][0], smoothed[k + 2][1] - smoothed[k + 1][1]];
      const dot = v1[0] * v2[0] + v1[1] * v2[1];
      const m1 = Math.hypot(v1[0], v1[1]);
      const m2 = Math.hypot(v2[0], v2[1]);
      if (m1 > 0 && m2 > 0) {
        const deg = (Math.acos(Math.max(-1, Math.min(1, dot / (m1 * m2)))) * 180) / Math.PI;
        if (deg > 140) sharp++;
      }
    }
    if (ratio > 1.6 || sharp > 0 || sliceIdxDegenerate(sliceCoords)) {
      auditJumps.push({ seg: `${s1.id}_${s2.id}`, from: s1.name, to: s2.name, ratio: ratio.toFixed(2), km: (sliceLen / 1000).toFixed(2), sharp });
    }
    console.log(`  seg ${s1.id}_${s2.id}: ${sliceCoords.length}pts ${(sliceLen / 1000).toFixed(2)} km (ratio ${ratio.toFixed(2)})`);
  }

  // 端点整合監査（0.0m 前提の検証）
  let endpointErr = 0;
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const s1 = stations.find(s => s.id === seg.fromStationId);
    const s2 = stations.find(s => s.id === seg.toStationId);
    endpointErr = Math.max(
      endpointErr,
      distMeters([s1.lat, s1.lng], seg.coordinates[0]),
      distMeters([s2.lat, s2.lng], seg.coordinates[seg.coordinates.length - 1]),
    );
    if (i < segments.length - 1) {
      const gap = distMeters(seg.coordinates[seg.coordinates.length - 1], segments[i + 1].coordinates[0]);
      if (gap > 0.001) {
        console.error(`  ❌ セグメント境界ギャップ ${gap.toFixed(2)}m at ${seg.fromStationId}->${seg.toStationId}`);
        endpointErr = Math.max(endpointErr, gap);
      }
    }
  }

  let totalLen = 0;
  for (const seg of segments) {
    for (let k = 0; k < seg.coordinates.length - 1; k++) totalLen += distMeters(seg.coordinates[k], seg.coordinates[k + 1]);
  }

  console.log(`  [audit] endpointError=${endpointErr.toFixed(6)}m totalLen=${(totalLen / 1000).toFixed(2)} km anomalies=${auditJumps.length}`);
  for (const a of auditJumps) console.log(`   ⚠️ anomaly: ${JSON.stringify(a)}`);

  // ファイル出力
  const trackHeader = cfg.trackHeader;
  const trackTs = `${trackHeader}\nexport const ${cfg.trackExport}: TrackSegment[] = ${JSON.stringify(segments, null, 2)};\n`;
  fs.writeFileSync(path.join(LINES_DIR, cfg.lineId, 'trackGeometry.ts'), trackTs, 'utf8');

  const stationsImport = `import type { Station } from '../../../types';\n\n${cfg.stationsHeader}\nexport const ${cfg.stationsExport}: Station[] = ${JSON.stringify(stations, null, 2)};\n`;
  fs.writeFileSync(path.join(LINES_DIR, cfg.lineId, 'stations.ts'), stationsImport, 'utf8');

  console.log(`  ✅ wrote ${cfg.lineId}/trackGeometry.ts (${segments.length} segs), stations.ts (${stations.length} stations)`);
}

// 逆走チェック（inkle への戻り座標が連続点に後戻りする=ヒゲ状逆戻り）
function sliceIdxDegenerate(sliceCoords) {
  for (let i = 1; i < sliceCoords.length - 1; i++) {
    if (distMeters(sliceCoords[i], sliceCoords[i - 1]) === 0 && distMeters(sliceCoords[i], sliceCoords[i + 1]) === 0) return true;
  }
  return false;
}

const CONFIGS = [
  {
    lineId: 'hakushin',
    cachePath: path.resolve('scripts/cache/osm_hakushin_raw.json'),
    // 羽越本線キャッシュ（新発田駅〜中条区間の軌道ウェイ）をマージして新発田側の欠落を補完
    extraCachePaths: [path.resolve('scripts/cache/osm_uetsu_main_raw.json')],
    stationCoordsPath: path.resolve('scripts/cache/station_coords_hakushin.json'),
    bridgeThreshold: 500,
    maxStep: 100,
    stationsExport: 'HAKUSHIN_STATIONS',
    trackExport: 'HAKUSHIN_TRACK_SEGMENTS',
    stationsHeader:
`/**
 * JR白新線 駅メタデータ（新潟 → 新発田、10駅）
 *
 * lat/lng は OSM 実軌道（ルートリレーション 1876846・route=railway）の
 * トポロジカル連結パス端点に完全一致（0.0m）した座標です
 *（ROUTE_EXPANSION_PLAYBOOK.md Phase 2・第35条 準拠）。
 */`,
    trackHeader:
`import type { TrackSegment } from '../../../types';

/**
 * JR白新線 軌道セグメント（新潟 → 新発田）
 *
 * OSM Overpass API から取得した実線路ウェイ（ルートリレーション 1876846・route=railway）を
 * ノード接続トポロジカル探索（重み付き Dijkstra）で連結した実軌道データです。
 * 駅間2点直線・線形補間ではなく OSM 実ウェイ経由で構築されており、
 * 各セグメント端点は隣接セグメント端点と完全一致します
 *（ROUTE_EXPANSION_PLAYBOOK.md Phase 2・§4・第35条 準拠）。
 */`,
  },
  {
    lineId: 'uetsu_main',
    cachePath: path.resolve('scripts/cache/osm_uetsu_main_raw.json'),
    stationCoordsPath: path.resolve('scripts/cache/station_coords_uetsu_main.json'),
    bridgeThreshold: 500,
    maxStep: 100,
    stationsExport: 'UETSU_MAIN_STATIONS',
    trackExport: 'UETSU_MAIN_TRACK_SEGMENTS',
    stationsHeader:
`/**
 * JR羽越本線 駅メタデータ（新津 → 秋田、60駅）
 *
 * lat/lng は OSM 実軌道（ルートリレーション 1876848・route=railway）の
 * トポロジカル連結パス端点に完全一致（0.0m）した座標です
 *（ROUTE_EXPANSION_PLAYBOOK.md Phase 2・第35条 準拠）。
 *
 * 公式駅ナンバリングは羽越本線（JR東日本新潟地区・秋田地区、地方線区）に
 * 導入されていないため、\`stationNumber\` は未定義とし、内部管理用IDのみ保持します
 *（プレイブック 第33条に従う）。
 *
 * 【駅リスト訂正】旧リストには奥羽本線の土崎駅が羽越本線の駅として
 * 混入していたため削除し、正規順序（Wikipedia 羽越本線路線図の営業キロ基準:
 * 羽後亀田 243.7 → 岩城みなと 250.2 → 道川 251.8 → 下浜 258.4 → 桂根 261.7 →
 * 新屋 265.7 → 羽後牛島 269.0 → 秋田 271.7 km、計60駅）に再採番済みです。
 */`,
    trackHeader:
`import type { TrackSegment } from '../../../types';

/**
 * JR羽越本線 軌道セグメント（新津 → 秋田）
 *
 * OSM Overpass API から取得した実線路ウェイ（ルートリレーション 1876848・route=railway）を
 * ノード接続トポロジカル探索（重み付き Dijkstra）で連結した実軌道データです。
 * 駅間2点直線・線形補間ではなく OSM 実ウェイ経由で構築されており、
 * 各セグメント端点は隣接セグメント端点と完全一致します
 *（ROUTE_EXPANSION_PLAYBOOK.md Phase 2・§4・第35条 準拠）。
 */`,
  },
];

const only = process.argv[2];
for (const cfg of CONFIGS) {
  if (only && only !== cfg.lineId) continue;
  buildLineGeometry(cfg);
}
