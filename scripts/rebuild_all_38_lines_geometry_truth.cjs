const fs = require('fs');
const path = require('path');
const { distMeters, subdivideCoordinates } = require('./common/geometryBuilderUtils.cjs');

const linesGeoJson = JSON.parse(fs.readFileSync('scripts/cache/N02-23/UTF-8/N02-23_RailroadSection.geojson', 'utf8'));
const stationsGeoJson = JSON.parse(fs.readFileSync('scripts/cache/N02-23/UTF-8/N02-23_Station.geojson', 'utf8'));

// 38路線の設定リスト
const lineSpecs = [
  // Wave 1 (JR東海 10路線)
  { lineId: 'jr_chuo_west', op: '東海旅客鉄道', rail: '中央線', exportConst: 'JR_CHUO_WEST_TRACK_SEGMENTS' },
  { lineId: 'jr_takayama', op: '東海旅客鉄道', rail: '高山線', altOps: ['西日本旅客鉄道'], exportConst: 'JR_TAKAYAMA_TRACK_SEGMENTS' },
  { lineId: 'jr_kansai_nagoya_kameyama', op: '東海旅客鉄道', rail: '関西線', exportConst: 'JR_KANSAI_NAGOYA_KAMEYAMA_TRACK_SEGMENTS' },
  { lineId: 'jr_kisei_kameyama_shingu', op: '東海旅客鉄道', rail: '紀勢線', exportConst: 'JR_KISEI_KAMEYAMA_SHINGU_TRACK_SEGMENTS' },
  { lineId: 'jr_iida', op: '東海旅客鉄道', rail: '飯田線', exportConst: 'JR_IIDA_TRACK_SEGMENTS' },
  { lineId: 'jr_minobu', op: '東海旅客鉄道', rail: '身延線', exportConst: 'JR_MINOBU_TRACK_SEGMENTS' },
  { lineId: 'jr_taketoyo', op: '東海旅客鉄道', rail: '武豊線', exportConst: 'JR_TAKETOYO_TRACK_SEGMENTS' },
  { lineId: 'jr_taita', op: '東海旅客鉄道', rail: '太多線', exportConst: 'JR_TAITA_TRACK_SEGMENTS' },
  { lineId: 'jr_meisho', op: '東海旅客鉄道', rail: '名松線', exportConst: 'JR_MEISHO_TRACK_SEGMENTS' },
  { lineId: 'jr_sangu', op: '東海旅客鉄道', rail: '参宮線', exportConst: 'JR_SANGU_TRACK_SEGMENTS' },

  // Wave 2 (JR西日本 11路線)
  { lineId: 'jr_osaka_loop', op: '西日本旅客鉄道', rail: '大阪環状線', exportConst: 'JR_OSAKA_LOOP_TRACK_SEGMENTS' },
  { lineId: 'jr_yumesaki', op: '西日本旅客鉄道', rail: '桜島線', exportConst: 'JR_YUMESAKI_TRACK_SEGMENTS' },
  { lineId: 'jr_tozai', op: '西日本旅客鉄道', rail: 'JR東西線', altRails: ['東海道線', '福知山線', '片町線'], exportConst: 'JR_TOZAI_TRACK_SEGMENTS' },
  { lineId: 'jr_gakken_toshi', op: '西日本旅客鉄道', rail: '片町線', exportConst: 'JR_GAKKEN_TOSHI_TRACK_SEGMENTS' },
  { lineId: 'jr_takarazuka', op: '西日本旅客鉄道', rail: '福知山線', altRails: ['東海道線'], exportConst: 'JR_TAKARAZUKA_TRACK_SEGMENTS' },
  { lineId: 'jr_fukuchiyama_north', op: '西日本旅客鉄道', rail: '福知山線', exportConst: 'JR_FUKUCHIYAMA_NORTH_TRACK_SEGMENTS' },
  { lineId: 'jr_yamatoji', op: '西日本旅客鉄道', rail: '関西線', exportConst: 'JR_YAMATOJI_TRACK_SEGMENTS' },
  { lineId: 'jr_osaka_higashi', op: '西日本旅客鉄道', rail: 'おおさか東線', altRails: ['東海道線', '片町線', '関西線'], exportConst: 'JR_OSAKA_HIGASHI_TRACK_SEGMENTS' },
  { lineId: 'jr_hanwa', op: '西日本旅客鉄道', rail: '阪和線', exportConst: 'JR_HANWA_TRACK_SEGMENTS' },
  { lineId: 'jr_kansai_airport', op: '西日本旅客鉄道', rail: '関西空港線', exportConst: 'JR_KANSAI_AIRPORT_TRACK_SEGMENTS' },
  { lineId: 'jr_hokuriku_maibara_tsuruga', op: '西日本旅客鉄道', rail: '北陸線', exportConst: 'JR_HOKURIKU_MAIBARA_TSURUGA_TRACK_SEGMENTS' },

  // Wave 3 & 4 (JR西日本 17路線)
  { lineId: 'jr_sagano', op: '西日本旅客鉄道', rail: '山陰線', exportConst: 'JR_SAGANO_TRACK_SEGMENTS' },
  { lineId: 'jr_sanin_sonobe_kinosaki', op: '西日本旅客鉄道', rail: '山陰線', exportConst: 'JR_SANIN_SONOBE_KINOSAKI_TRACK_SEGMENTS' },
  { lineId: 'jr_kosei', op: '西日本旅客鉄道', rail: '湖西線', exportConst: 'JR_KOSEI_TRACK_SEGMENTS' },
  { lineId: 'jr_kusatsu', op: '西日本旅客鉄道', rail: '草津線', exportConst: 'JR_KUSATSU_TRACK_SEGMENTS' },
  { lineId: 'jr_nara', op: '西日本旅客鉄道', rail: '奈良線', altRails: ['関西線'], exportConst: 'JR_NARA_TRACK_SEGMENTS' },
  { lineId: 'jr_sakurai', op: '西日本旅客鉄道', rail: '桜井線', exportConst: 'JR_SAKURAI_TRACK_SEGMENTS' },
  { lineId: 'jr_wakayama', op: '西日本旅客鉄道', rail: '和歌山線', exportConst: 'JR_WAKAYAMA_TRACK_SEGMENTS' },
  { lineId: 'jr_kinokuni', op: '西日本旅客鉄道', rail: '紀勢線', exportConst: 'JR_KINOKUNI_TRACK_SEGMENTS' },
  { lineId: 'jr_kansai_kameyama_kamo', op: '西日本旅客鉄道', rail: '関西線', altOps: ['東海旅客鉄道'], exportConst: 'JR_KANSAI_KAMEYAMA_KAMO_TRACK_SEGMENTS' },
  { lineId: 'jr_sanyo_himeji_kamigori', op: '西日本旅客鉄道', rail: '山陽線', exportConst: 'JR_SANYO_HIMEJI_KAMIGORI_TRACK_SEGMENTS' },
  { lineId: 'jr_ako', op: '西日本旅客鉄道', rail: '赤穂線', exportConst: 'JR_AKO_TRACK_SEGMENTS' },
  { lineId: 'jr_kakogawa', op: '西日本旅客鉄道', rail: '加古川線', exportConst: 'JR_KAKOGAWA_TRACK_SEGMENTS' },
  { lineId: 'jr_kishin', op: '西日本旅客鉄道', rail: '姫新線', exportConst: 'JR_KISHIN_TRACK_SEGMENTS' },
  { lineId: 'jr_bantan', op: '西日本旅客鉄道', rail: '播但線', exportConst: 'JR_BANTAN_TRACK_SEGMENTS' },
  { lineId: 'jr_maizuru', op: '西日本旅客鉄道', rail: '舞鶴線', exportConst: 'JR_MAIZURU_TRACK_SEGMENTS' },
  { lineId: 'jr_obama', op: '西日本旅客鉄道', rail: '小浜線', exportConst: 'JR_OBAMA_TRACK_SEGMENTS' },
  { lineId: 'jr_wadamisaki', op: '西日本旅客鉄道', rail: '山陽線', exportConst: 'JR_WADAMISAKI_TRACK_SEGMENTS' }
];

// 乗換駅・接続駅の公式N02確定座標（複数線区で完全同一座標を保証）
const OFFICIAL_SHARED_STATION_COORDS = {
  '敦賀': [35.64582, 136.07788], // 北陸線・小浜線ホーム接続ノード
  '新疋田': [35.59458, 136.10046], // 鳩原ループ線端点
  '谷川': [35.08323, 135.04907], // 加古川線・福知山線 N02公式
  '綾部': [35.30202, 135.25326], // 山陰線・舞鶴線 N02公式
  '東舞鶴': [35.46855, 135.39479], // 舞鶴線・小浜線 N02公式
  '福知山': [35.29688, 135.11731], // 山陰線・福知山線 N02公式
  '和田山': [35.34140, 134.85136], // 山陰線・播但線 N02公式
  '近江塩津': [35.54105, 136.15092], // 湖西線・北陸線 N02公式
  '木津': [34.73686, 135.82490], // 関西線・奈良線・片町線 N02公式
  '柘植': [34.84749, 136.25574], // 関西線・草津線 N02公式
  '新宮': [33.72510, 135.99384], // 紀勢線(東海)・紀勢線(西日本) N02公式
  '亀山': [34.85032, 136.44867], // 関西線(東海)・関西線(西日本)・紀勢線 N02公式
  '多気': [34.51706, 136.57264], // 紀勢線・参宮線 N02公式
  '松阪': [34.57724, 136.53545], // 紀勢線・名松線 N02公式
  '美濃太田': [35.44563, 137.01935], // 高山線・太多線 N02公式
  '多治見': [35.33454, 137.11974], // 中央線・太多線 N02公式
  '大府': [35.00938, 136.96141], // 東海道線・武豊線 N02公式
  '富士': [35.15131, 138.65125], // 東海道線・身延線 N02公式
  '尼崎': [34.73167, 135.43290], // 東海道線・JR東西線・福知山線 N02公式
  '京都': [34.98574, 135.75869], // 東海道線・山陰線 N02公式
  '米原': [35.31389, 136.28984], // 東海道線・北陸線 N02公式
  '大阪': [34.70281, 135.49705], // 大阪環状線・東海道線 N02公式
  '新大阪': [34.73412, 135.50201], // 東海道線・おおさか東線 N02公式
  '天王寺': [34.64675, 135.51562], // 大阪環状線・関西線・阪和線 N02公式
  '西九条': [34.68285, 135.46679], // 大阪環状線・桜島線 N02公式
  '京橋': [34.69642, 135.53428], // 大阪環状線・片町線・JR東西線 N02公式
  '日根野': [34.39088, 135.33391], // 阪和線・関西空港線 N02公式
  '和歌山': [34.23255, 135.19172], // 阪和線・紀勢線・和歌山線 N02公式
  '王寺': [34.59747, 135.70378], // 関西線・和歌山線 N02公式
  '高田': [34.51634, 135.74464], // 和歌山線・桜井線 N02公式
  '奈良': [34.68162, 135.81941], // 関西線・奈良線・桜井線 N02公式
  '加茂': [34.75231, 135.86985], // 関西線(西日本電化/非電化) N02公式
  '相生': [34.81841, 134.47412], // 山陽線・赤穂線 N02公式
  '姫路': [34.82698, 134.68865], // 山陽線・播但線・姫新線 N02公式
  '山科': [34.99256, 135.81506], // 東海道線・湖西線 N02公式
  '草津': [35.02243, 135.96214]  // 東海道線・草津線 N02公式
};

function buildLineGraph(features, snapThreshold = 60) {
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

  // 小さな端点ギャップのみスナップ
  for (let i = 0; i < endpoints.length; i++) {
    const u = endpoints[i];
    const pu = nodeCoords.get(u);
    for (let j = i + 1; j < endpoints.length; j++) {
      const v = endpoints[j];
      if (u === v) continue;
      const pv = nodeCoords.get(v);
      const d = distMeters(pu, pv);
      if (d <= snapThreshold) {
        adj.get(u).push({ to: v, dist: d });
        adj.get(v).push({ to: u, dist: d });
      }
    }
  }

  return { adj, nodeCoords, getNodeId };
}

function calculateTurnAngle(p1, p2, p3) {
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
    if (distMeters(cleaned[cleaned.length - 1], coords[i]) >= 0.5 || i === coords.length - 1) {
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
      const angle = calculateTurnAngle(pPrev, pCur, pNext);
      const d1 = distMeters(pPrev, pCur);
      const d2 = distMeters(pCur, pNext);

      // 進行方向から95度以上の急反転・折り返し（トゲ）を除去
      if (angle > 95 && (d1 < 400 || d2 < 400)) {
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

  if (!startNode || !endNode || startNode === endNode || minStartDist > 2500 || minEndDist > 2500) {
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

console.log('=== 全38路線 真の駅座標＆実線路フィーチャー完全再構築 ===\n');

for (const spec of lineSpecs) {
  const { lineId, op, rail, altOps = [], altRails = [], exportConst } = spec;
  const stPath = path.join('src', 'data', 'lines', lineId, 'stations.ts');
  const trPath = path.join('src', 'data', 'lines', lineId, 'trackGeometry.ts');

  if (!fs.existsSync(stPath) || !fs.existsSync(trPath)) continue;

  const stContent = fs.readFileSync(stPath, 'utf8');
  const stStartIdx = stContent.indexOf('= [');
  const stations = eval(stContent.slice(stStartIdx + 2, stContent.lastIndexOf(']') + 1));

  // 1. 当該路線の線路フィーチャー抽出
  const allOps = [op, ...altOps];
  const allRails = [rail, ...altRails];
  const lineFeatures = linesGeoJson.features.filter(f => {
    const p = f.properties;
    return allOps.some(o => p.N02_004?.includes(o)) && allRails.includes(p.N02_003);
  });

  // 2. 当該路線の駅フィーチャー抽出
  const stFeatures = stationsGeoJson.features.filter(f => {
    const p = f.properties;
    return allOps.some(o => p.N02_004?.includes(o)) && allRails.includes(p.N02_003);
  });

  // 3. グラフ構築
  const snapThresh = (lineId === 'jr_osaka_higashi' || lineId === 'jr_tozai') ? 150 : 60;
  const { adj, nodeCoords } = buildLineGraph(lineFeatures, snapThresh);

  // 4. 各駅の正式ホーム座標の決定（N02公式）
  const resolvedStationCoords = [];
  for (const st of stations) {
    const sname = st.name;
    let coord = null;

    // 乗換駅の確定公式座標
    if (OFFICIAL_SHARED_STATION_COORDS[sname]) {
      coord = OFFICIAL_SHARED_STATION_COORDS[sname];
    } else {
      // 自路線の駅フィーチャーから取得
      const sf = stFeatures.find(f => 
        f.properties.N02_005 === sname ||
        f.properties.N02_005 === sname.replace(/ケ/g, 'ヶ') ||
        f.properties.N02_005 === sname.replace(/ヶ/g, 'ケ')
      );

      if (sf) {
        const g = sf.geometry;
        coord = g.type === 'LineString' ? [g.coordinates[0][1], g.coordinates[0][0]] : [g.coordinates[1], g.coordinates[0]];
      } else {
        // 全Stationから検索
        const anySf = stationsGeoJson.features.find(f => 
          allOps.some(o => f.properties.N02_004?.includes(o)) &&
          (f.properties.N02_005 === sname || f.properties.N02_005 === sname.replace(/ケ/g, 'ヶ') || f.properties.N02_005 === sname.replace(/ヶ/g, 'ケ'))
        );
        if (anySf) {
          const g = anySf.geometry;
          coord = g.type === 'LineString' ? [g.coordinates[0][1], g.coordinates[0][0]] : [g.coordinates[1], g.coordinates[0]];
        } else {
          coord = [st.lat, st.lng];
        }
      }
    }
    resolvedStationCoords.push(coord);
  }

  // 5. 各駅間セグメントの探索 & 構築
  const refinedSegments = [];
  const refinedStationCoords = [];

  for (let i = 0; i < stations.length - 1; i++) {
    const fromId = `${lineId}-${String(i + 1).padStart(2, '0')}`;
    const toId = `${lineId}-${String(i + 2).padStart(2, '0')}`;
    const segId = `${fromId}_${toId}`;

    const cA = resolvedStationCoords[i];
    const cB = resolvedStationCoords[i + 1];

    let pathCoords = findShortestPath(adj, nodeCoords, cA, cB);
    pathCoords = cleanSpikes(pathCoords);
    pathCoords = subdivideCoordinates(pathCoords, 200);
    pathCoords = cleanSpikes(pathCoords);

    const startNode = pathCoords[0];
    const endNode = pathCoords[pathCoords.length - 1];

    if (i === 0) refinedStationCoords.push(startNode);
    refinedStationCoords.push(endNode);

    refinedSegments.push({
      id: segId,
      fromStationId: fromId,
      toStationId: toId,
      coordinates: pathCoords
    });
  }

  // 大阪環状線 環状クロージング
  if (lineId === 'jr_osaka_loop') {
    const lastId = `${lineId}-${String(stations.length).padStart(2, '0')}`;
    const firstId = `${lineId}-01`;
    const cLast = resolvedStationCoords[stations.length - 1];
    const cFirst = resolvedStationCoords[0];
    let loopPath = findShortestPath(adj, nodeCoords, cLast, cFirst);
    loopPath = cleanSpikes(loopPath);
    loopPath = subdivideCoordinates(loopPath, 200);
    loopPath = cleanSpikes(loopPath);
    refinedSegments.push({
      id: `${lastId}_${firstId}`,
      fromStationId: lastId,
      toStationId: firstId,
      coordinates: loopPath
    });
  }

  // 北陸本線 鳩原ループ線 特殊処理 (新疋田〜敦賀)
  if (lineId === 'jr_hokuriku_maibara_tsuruga') {
    const origContent = fs.readFileSync(trPath, 'utf8');
    const origSegs = eval(origContent.slice(origContent.indexOf('= [') + 2, origContent.lastIndexOf(']') + 1));
    const hatoharaSeg = origSegs.find(s => s.direction === 'outbound');
    const inboundSeg = origSegs.find(s => s.direction === 'inbound');
    if (hatoharaSeg && inboundSeg) {
      // 既存の敦賀〜新疋田セグメントを差し替え
      const idx = refinedSegments.findIndex(s => s.id.includes('11_') && s.id.includes('12'));
      if (idx !== -1) {
        // 端点を確実に新疋田駅・敦賀駅の座標に合わせる
        const pShinHikida = refinedStationCoords[10]; // index 10: 新疋田
        const pTsuruga = refinedStationCoords[11]; // index 11: 敦賀
        hatoharaSeg.coordinates[0] = pShinHikida;
        hatoharaSeg.coordinates[hatoharaSeg.coordinates.length - 1] = pTsuruga;
        inboundSeg.coordinates[0] = pTsuruga;
        inboundSeg.coordinates[inboundSeg.coordinates.length - 1] = pShinHikida;
        refinedSegments.splice(idx, 1, hatoharaSeg, inboundSeg);
      }
    }
  }

  // 駅座標をセグメント端点と 0.0m 完全一致で同期
  for (let i = 0; i < stations.length; i++) {
    if (refinedStationCoords[i]) {
      stations[i].lat = parseFloat(refinedStationCoords[i][0].toFixed(5));
      stations[i].lng = parseFloat(refinedStationCoords[i][1].toFixed(5));
    }
  }

  // ファイル書き出し
  const trackContent = `import type { TrackSegment } from '../../../types';\n\nexport const ${exportConst}: TrackSegment[] = ${JSON.stringify(refinedSegments, null, 2)};\n`;
  fs.writeFileSync(trPath, trackContent, 'utf8');

  const stExportConst = exportConst.replace('_TRACK_SEGMENTS', '_STATIONS');
  const newStContent = `import type { Station } from '../../../types';\n\nexport const ${stExportConst}: Station[] = ${JSON.stringify(stations, null, 2)};\n`;
  fs.writeFileSync(stPath, newStContent, 'utf8');

  const totalPts = refinedSegments.reduce((sum, s) => sum + s.coordinates.length, 0);
  const avgPts = (totalPts / refinedSegments.length).toFixed(1);
  console.log(`✅ [${lineId.padEnd(28)}] ${refinedSegments.length} segs, ${totalPts} pts (avg ${avgPts} pts/seg)`);
}

console.log('\n🎉 全38路線の真の駅座標＆実線路完全トレース再構築が完了しました！');
