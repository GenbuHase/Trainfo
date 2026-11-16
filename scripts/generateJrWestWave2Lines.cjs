// scripts/generateJrWestWave2Lines.cjs
// JR西日本 アーバンネットワーク中核11路線 完全データ一括生成スクリプト
const fs = require('fs');
const path = require('path');
const { distMeters } = require('./common/geometryBuilderUtils.cjs');
const { LINE_SPECS_WAVE2 } = require('./jrWestWave2Metadata.cjs');
const STATION_DICT = require('./jrWestWave2StationDictionary.cjs');

const repoRoot = path.resolve(__dirname, '..');
const probeData = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scripts/cache/jr_west_wave2_probe.json'), 'utf8'));
const linesGeoJson = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scripts/cache/N02-23/UTF-8/N02-23_RailroadSection.geojson'), 'utf8'));
const stationsGeoJson = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scripts/cache/N02-23/UTF-8/N02-23_Station.geojson'), 'utf8'));

// 接続点アンカー座標
const ANCHORS = {
  '大阪': [34.702485, 135.495951],
  '新大阪': [34.73348, 135.5001],
  '天王寺': [34.64722, 135.51389],
  '京橋': [34.69694, 135.53389],
  '尼崎': [34.71944, 135.43194],
  '西九条': [34.68278, 135.46667],
  '放出': [34.68806, 135.56389],
  '鴫野': [34.6925, 135.54583],
  '久宝寺': [34.6225, 135.58472],
  '木津': [34.73667, 135.82472],
  '奈良': [34.68056, 135.81889],
  '和歌山': [34.2325, 135.19167],
  '日根野': [34.39111, 135.33417],
  '篠山口': [35.05694, 135.17639],
  '福知山': [35.29583, 135.12056],
  '米原': [35.31528, 136.28972],
  '敦賀': [35.64582, 136.07788],
  '近江塩津': [35.54833, 136.14583],
  '加茂': [34.7525, 135.87028],
  '関西空港': [34.43528, 135.24361],
  'りんくうタウン': [34.41083, 135.29778],
  '王寺': [34.59778, 135.705]
};

// 主要駅（isMajor）
const MAJOR_STATION_NAMES = new Set([
  '大阪', '新大阪', '天王寺', '京橋', '西九条', '弁天町', '鶴橋', '新今宮', '北新地', '尼崎',
  '宝塚', '三田', '篠山口', '福知山', '四条畷', '松井山手', '木津', '奈良', '王寺', 'JR難波',
  '久宝寺', '放出', '堺市', '三国ヶ丘', '鳳', '和泉府中', '東岸和田', '熊取', '日根野', '和歌山',
  '関西空港', '長浜', '近江塩津', '敦賀', '米原'
]);

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

function buildGraph(features) {
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

  for (const f of features) {
    const coords = f.geometry?.coordinates;
    if (!coords || coords.length < 2) continue;
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

  return { adj, nodeCoords, getNodeId };
}

function findShortestPath(adj, nodeCoords, startCoord, endCoord, excludeSegmentPredicate) {
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

  if (!startNode || !endNode || startNode === endNode) {
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
      if (excludeSegmentPredicate && excludeSegmentPredicate(u, v)) continue;
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

  const coords = pathNodes.map(id => nodeCoords.get(id));
  return cleanSpikes(coords, startCoord, endCoord);
}

async function processLine(spec) {
  const lineKey = spec.lineId;
  console.log(`\n========================================`);
  console.log(`Processing: ${spec.name} (${lineKey})`);
  console.log(`========================================`);

  const pLine = probeData[lineKey];
  if (!pLine) throw new Error(`Probe data not found for ${lineKey}`);

  // N02-23線路セグメントの抽出
  const lineFeatures = linesGeoJson.features.filter(f => 
    f.properties.N02_003 === spec.n02LineName &&
    spec.opFilter.some(op => f.properties.N02_004?.includes(op))
  );
  console.log(`Railroad features in N02-23: ${lineFeatures.length}`);

  // N02-23駅データの抽出
  const stFeatures = stationsGeoJson.features.filter(f => 
    f.properties.N02_003 === spec.n02LineName &&
    spec.opFilter.some(op => f.properties.N02_004?.includes(op))
  );

  const n02StationCoords = new Map();
  for (const s of stFeatures) {
    const sname = s.properties.N02_005;
    const geom = s.geometry;
    let pt = null;
    if (geom.type === 'LineString') {
      const mid = geom.coordinates[Math.floor(geom.coordinates.length / 2)];
      pt = [mid[1], mid[0]];
    } else if (geom.type === 'Point') {
      pt = [geom.coordinates[1], geom.coordinates[0]];
    }
    if (pt && !n02StationCoords.has(sname)) {
      n02StationCoords.set(sname, pt);
    }
  }

  function getStationCoord(sname) {
    if (ANCHORS[sname]) return ANCHORS[sname];
    if (n02StationCoords.has(sname)) return n02StationCoords.get(sname);
    const alt1 = sname.replace(/ケ/g, 'ヶ');
    if (n02StationCoords.has(alt1)) return n02StationCoords.get(alt1);
    const alt2 = sname.replace(/ヶ/g, 'ケ');
    if (n02StationCoords.has(alt2)) return n02StationCoords.get(alt2);
    return null;
  }

  // グラフ構築
  const { adj, nodeCoords } = buildGraph(lineFeatures);

  // 各駅の座標特定
  const stationsList = [];
  for (let i = 0; i < spec.stations.length; i++) {
    const sname = spec.stations[i];
    const probeStation = pLine.stations.find(s => s.name === sname) || { name: sname, routes: [] };
    let coord = getStationCoord(sname);
    if (!coord) {
      // 全駅データから検索
      for (const s of stationsGeoJson.features) {
        if (s.properties.N02_005 === sname || s.properties.N02_005 === sname.replace(/ケ/g, 'ヶ') || s.properties.N02_005 === sname.replace(/ヶ/g, 'ケ')) {
          const geom = s.geometry;
          if (geom.type === 'LineString') {
            const mid = geom.coordinates[Math.floor(geom.coordinates.length / 2)];
            coord = [mid[1], mid[0]];
          } else if (geom.type === 'Point') {
            coord = [geom.coordinates[1], geom.coordinates[0]];
          }
          break;
        }
      }
    }
    if (!coord) {
      console.error(`FATAL: Station ${sname} coordinate could not be resolved!`);
      coord = [34.7, 135.5];
    }

    stationsList.push({
      name: sname,
      probeInfo: probeStation,
      coord: coord
    });
  }

  // 駅間 TrackSegments の構築
  const trackSegments = [];
  const refinedStationCoords = [];

  for (let i = 0; i < stationsList.length - 1; i++) {
    const stA = stationsList[i];
    const stB = stationsList[i + 1];

    // 北陸本線 鳩原ループ線 特殊処理 (新疋田〜敦賀)
    if (lineKey === 'jr_hokuriku_maibara_tsuruga' && stA.name === '新疋田' && stB.name === '敦賀') {
      // 下り（新疋田 -> 敦賀: ループ線経由）
      // ループ線セグメント（Segment 4）を通る長大ルート
      // 上り（敦賀 -> 新疋田: 深山トンネル直線経由）
      const fromId = `${lineKey}-${String(i + 1).padStart(2, '0')}`;
      const toId = `${lineKey}-${String(i + 2).padStart(2, '0')}`;

      // ダイクストラで通常パス（直線）とループパスをそれぞれ取得
      // 直線パス（深山トンネル経由、短距離）
      const directCoords = findShortestPath(adj, nodeCoords, stA.coord, stB.coord);
      
      // ループパス（Segment 4 [35.60344, 136.09402] -> [35.61539, 136.08019] 経由）
      const loopMid1 = [35.60344, 136.09402];
      const loopMid2 = [35.61539, 136.08019];
      const p1 = findShortestPath(adj, nodeCoords, stA.coord, loopMid1);
      const p2 = findShortestPath(adj, nodeCoords, loopMid1, loopMid2);
      const p3 = findShortestPath(adj, nodeCoords, loopMid2, stB.coord);
      const loopCoords = cleanSpikes([...p1, ...p2.slice(1), ...p3.slice(1)], stA.coord, stB.coord);

      if (i === 0) refinedStationCoords.push(directCoords[0]);
      refinedStationCoords.push(directCoords[directCoords.length - 1]);

      // 下り線セグメント（鳩原ループ線経由）
      trackSegments.push({
        segmentId: `${fromId}_${toId}_outbound`,
        fromStationId: fromId,
        toStationId: toId,
        direction: 'outbound',
        coordinates: loopCoords
      });

      // 上り線セグメント（深山トンネル直線経由）
      trackSegments.push({
        segmentId: `${toId}_${fromId}_inbound`,
        fromStationId: toId,
        toStationId: fromId,
        direction: 'inbound',
        coordinates: directCoords.slice().reverse()
      });
      continue;
    }

    const segCoords = findShortestPath(adj, nodeCoords, stA.coord, stB.coord);

    const snapStart = segCoords[0];
    const snapEnd = segCoords[segCoords.length - 1];

    if (i === 0) refinedStationCoords.push(snapStart);
    refinedStationCoords.push(snapEnd);

    const fromId = `${lineKey}-${String(i + 1).padStart(2, '0')}`;
    const toId = `${lineKey}-${String(i + 2).padStart(2, '0')}`;

    trackSegments.push({
      segmentId: `${fromId}_${toId}`,
      fromStationId: fromId,
      toStationId: toId,
      coordinates: segCoords
    });
  }

  // 大阪環状線の環状クロージングセグメント (新今宮 -> 天王寺)
  if (lineKey === 'jr_osaka_loop') {
    const stLast = stationsList[stationsList.length - 1]; // 新今宮
    const stFirst = stationsList[0]; // 天王寺
    const loopCloseCoords = findShortestPath(adj, nodeCoords, stLast.coord, stFirst.coord);
    const lastId = `${lineKey}-${String(stationsList.length).padStart(2, '0')}`;
    const firstId = `${lineKey}-01`;

    trackSegments.push({
      segmentId: `${lastId}_${firstId}`,
      fromStationId: lastId,
      toStationId: firstId,
      coordinates: loopCloseCoords
    });
  }

  // 駅メタデータ（stations.ts）の生成
  const stationsOut = [];
  for (let i = 0; i < stationsList.length; i++) {
    const st = stationsList[i];
    const sname = st.name;
    const finalCoord = refinedStationCoords[i] || st.coord;
    const dict = STATION_DICT[sname] ||
      STATION_DICT[sname.replace(/ケ/g, 'ヶ')] ||
      STATION_DICT[sname.replace(/ヶ/g, 'ケ')] ||
      { kana: sname, en: sname };

    // 公式駅ナンバリングの決定
    const stationNumber = spec.numbering[sname] || undefined;
    const stationId = `${lineKey}-${String(i + 1).padStart(2, '0')}`;

    // 乗換路線の自動生成（自社自線名は除外）
    const transfers = [];
    const selfNames = [
      spec.name,
      spec.shortName,
      spec.name.replace(/JR/g, ''),
      spec.shortName.replace(/JR/g, ''),
      spec.name.replace(/（.*）/g, ''),
      spec.shortName.replace(/（.*）/g, '')
    ];
    for (const r of st.probeInfo.routes || []) {
      const rName = r.railName;
      const isSelf = selfNames.some(sn => rName.includes(sn));
      if (!isSelf && !transfers.includes(rName)) {
        transfers.push(rName);
      }
    }

    // stoppingTypes
    let stoppingTypes = ['local'];
    if (['jr_osaka_loop', 'jr_tozai', 'jr_gakken_toshi', 'jr_takarazuka', 'jr_yamatoji', 'jr_osaka_higashi', 'jr_hanwa'].includes(lineKey)) {
      stoppingTypes.push('direct_rapid'); // 直通快速
    }
    if (['jr_osaka_loop', 'jr_yamatoji'].includes(lineKey)) {
      stoppingTypes.push('yamatoji_rapid'); // 大和路快速
    }
    if (['jr_osaka_loop', 'jr_hanwa', 'jr_kansai_airport'].includes(lineKey)) {
      stoppingTypes.push('kanku_rapid'); // 関空快速
    }
    if (['jr_osaka_loop', 'jr_hanwa'].includes(lineKey)) {
      stoppingTypes.push('kishuji_rapid'); // 紀州路快速
    }
    if (['jr_takarazuka', 'jr_fukuchiyama_north'].includes(lineKey)) {
      stoppingTypes.push('tambaji_rapid'); // 丹波路快速
    }
    if (['jr_tozai', 'jr_gakken_toshi', 'jr_takarazuka', 'jr_yamatoji', 'jr_hanwa', 'jr_hokuriku_maibara_tsuruga'].includes(lineKey)) {
      stoppingTypes.push('rapid'); // 快速
    }
    if (['jr_tozai', 'jr_gakken_toshi', 'jr_hanwa'].includes(lineKey)) {
      stoppingTypes.push('semi_rapid'); // 区間快速
    }
    if (['jr_hokuriku_maibara_tsuruga'].includes(lineKey)) {
      stoppingTypes.push('new_rapid'); // 新快速
    }
    if (['jr_takarazuka', 'jr_fukuchiyama_north', 'jr_osaka_higashi', 'jr_hanwa', 'jr_kansai_airport', 'jr_hokuriku_maibara_tsuruga'].includes(lineKey)) {
      stoppingTypes.push('limitedExp'); // 特急（こうのとり、はるか、くろしお、サンダーバード、しらさぎ）
    }

    stationsOut.push({
      id: stationId,
      ...(stationNumber ? { stationNumber } : {}),
      lineId: lineKey,
      number: i + 1,
      name: sname,
      nameKana: dict.kana,
      nameEn: dict.en,
      lat: Number(finalCoord[0].toFixed(6)),
      lng: Number(finalCoord[1].toFixed(6)),
      transfers: transfers,
      address: '',
      platforms: {
        inbound: lineKey === 'jr_osaka_loop' ? '内回りホーム' : '上りホーム',
        outbound: lineKey === 'jr_osaka_loop' ? '外回りホーム' : '下りホーム'
      },
      stoppingTypes: stoppingTypes,
      isMajor: MAJOR_STATION_NAMES.has(sname),
      facilities: {
        elevator: MAJOR_STATION_NAMES.has(sname),
        restroom: true,
        multipurposeToilet: MAJOR_STATION_NAMES.has(sname),
        waitingRoom: true,
        ticketOffice: MAJOR_STATION_NAMES.has(sname)
      }
    });
  }

  // bounds算出
  const lats = stationsOut.map(s => s.lat);
  const lngs = stationsOut.map(s => s.lng);
  const defaultBounds = [
    [Number((Math.min(...lats) - 0.05).toFixed(4)), Number((Math.min(...lngs) - 0.05).toFixed(4))],
    [Number((Math.max(...lats) + 0.05).toFixed(4)), Number((Math.max(...lngs) + 0.05).toFixed(4))]
  ];

  // ディレクトリ作成
  const outDir = path.join(repoRoot, 'src/data/lines', lineKey);
  fs.mkdirSync(outDir, { recursive: true });

  // stations.ts
  const constNameUpper = lineKey.toUpperCase();
  const stationsTsContent = `import type { Station } from '../../../types';\n\nexport const ${constNameUpper}_STATIONS: Station[] = ${JSON.stringify(stationsOut, null, 2)};\n`;
  fs.writeFileSync(path.join(outDir, 'stations.ts'), stationsTsContent, 'utf8');

  // trackGeometry.ts
  const trackGeometryTsContent = `import type { TrackSegment } from '../../../types';\n\nexport const ${constNameUpper}_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(trackSegments, null, 2)};\n`;
  fs.writeFileSync(path.join(outDir, 'trackGeometry.ts'), trackGeometryTsContent, 'utf8');

  // trainTypes.ts (特急は limitedExp 統一、固有名称で区別)
  const trainTypesConfig = {
    local: {
      key: 'local',
      name: '普通',
      nameEn: 'Local',
      shortName: '普通',
      color: spec.lineColor,
      textColor: '#ffffff',
      bgColor: spec.lineColor,
      borderColor: spec.lineColor,
    },
    ...(stationsOut[0].stoppingTypes.includes('semi_rapid') ? {
      semi_rapid: {
        key: 'semi_rapid',
        name: '区間快速',
        nameEn: 'Regional Rapid',
        shortName: '区快',
        color: '#22ac38',
        textColor: '#ffffff',
        bgColor: '#22ac38',
        borderColor: '#198754',
      }
    } : {}),
    ...(stationsOut[0].stoppingTypes.includes('rapid') ? {
      rapid: {
        key: 'rapid',
        name: '快速',
        nameEn: 'Rapid',
        shortName: '快速',
        color: '#ff7322',
        textColor: '#ffffff',
        bgColor: '#ff7322',
        borderColor: '#cc5200',
      }
    } : {}),
    ...(stationsOut[0].stoppingTypes.includes('direct_rapid') ? {
      direct_rapid: {
        key: 'direct_rapid',
        name: '直通快速',
        nameEn: 'Direct Rapid',
        shortName: '直快',
        color: '#884898',
        textColor: '#ffffff',
        bgColor: '#884898',
        borderColor: '#602870',
      }
    } : {}),
    ...(stationsOut[0].stoppingTypes.includes('yamatoji_rapid') ? {
      yamatoji_rapid: {
        key: 'yamatoji_rapid',
        name: '大和路快速',
        nameEn: 'Yamatoji Rapid',
        shortName: '大快',
        color: '#00a960',
        textColor: '#ffffff',
        bgColor: '#00a960',
        borderColor: '#007040',
      }
    } : {}),
    ...(stationsOut[0].stoppingTypes.includes('kanku_rapid') ? {
      kanku_rapid: {
        key: 'kanku_rapid',
        name: '関空快速',
        nameEn: 'Kansai Airport Rapid',
        shortName: '関快',
        color: '#0072bc',
        textColor: '#ffffff',
        bgColor: '#0072bc',
        borderColor: '#005080',
      }
    } : {}),
    ...(stationsOut[0].stoppingTypes.includes('kishuji_rapid') ? {
      kishuji_rapid: {
        key: 'kishuji_rapid',
        name: '紀州路快速',
        nameEn: 'Kishuji Rapid',
        shortName: '紀快',
        color: '#f39800',
        textColor: '#ffffff',
        bgColor: '#f39800',
        borderColor: '#b87200',
      }
    } : {}),
    ...(stationsOut[0].stoppingTypes.includes('tambaji_rapid') ? {
      tambaji_rapid: {
        key: 'tambaji_rapid',
        name: '丹波路快速',
        nameEn: 'Tambaji Rapid',
        shortName: '丹快',
        color: '#fcc800',
        textColor: '#000000',
        bgColor: '#fcc800',
        borderColor: '#c09800',
      }
    } : {}),
    ...(stationsOut[0].stoppingTypes.includes('new_rapid') ? {
      new_rapid: {
        key: 'new_rapid',
        name: '新快速',
        nameEn: 'Special Rapid',
        shortName: '新快',
        color: '#0072bc',
        textColor: '#ffffff',
        bgColor: '#0072bc',
        borderColor: '#005080',
      }
    } : {}),
    ...(stationsOut[0].stoppingTypes.includes('limitedExp') ? {
      limitedExp: {
        key: 'limitedExp',
        name: '特急',
        nameEn: 'Limited Express',
        shortName: '特急',
        color: '#d32f2f',
        textColor: '#ffffff',
        bgColor: '#d32f2f',
        borderColor: '#b71c1c',
      }
    } : {})
  };

  const trainTypesTsContent = `import type { TrainTypeConfig } from '../../../types';\n\nexport const ${constNameUpper}_TRAIN_TYPES: Record<string, TrainTypeConfig> = ${JSON.stringify(trainTypesConfig, null, 2)};\n`;
  fs.writeFileSync(path.join(outDir, 'trainTypes.ts'), trainTypesTsContent, 'utf8');

  // index.ts
  const camelName = lineKey.replace(/_([a-z])/g, (_, c) => c.toUpperCase()) + 'Line';
  const indexTsContent = `import type { LineDefinition } from '../../../types';
import { ${constNameUpper}_STATIONS } from './stations';
import { ${constNameUpper}_TRAIN_TYPES } from './trainTypes';
import { ${constNameUpper}_TRACK_SEGMENTS } from './trackGeometry';

export const ${camelName}: LineDefinition = {
  id: '${lineKey}',
  name: '${spec.name}',
  shortName: '${spec.shortName}',
  operator: '${spec.operator}',
  lineColor: '${spec.lineColor}',
  accentColor: '${spec.accentColor}',
  defaultCars: ${spec.defaultCars},
  defaultBounds: ${JSON.stringify(defaultBounds)},
  directionNames: ${JSON.stringify(spec.directionNames, null, 4)},
  stations: ${constNameUpper}_STATIONS,
  trackSegments: ${constNameUpper}_TRACK_SEGMENTS,
  trainTypes: ${constNameUpper}_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
`;
  fs.writeFileSync(path.join(outDir, 'index.ts'), indexTsContent, 'utf8');

  // Yahoo config.cjs の生成
  const scriptLinesDir = path.join(repoRoot, 'scripts/lines', lineKey);
  fs.mkdirSync(scriptLinesDir, { recursive: true });

  const yahooStations = [];
  for (let i = 0; i < stationsOut.length; i++) {
    const st = stationsOut[i];
    const se = stationsList[i].probeInfo;

    let inGroupId = null;
    let outGroupId = null;

    for (const r of se.routes || []) {
      for (const rg of r.railGroup || []) {
        // 自路線判定
        const matchesLine =
          r.railName.includes(spec.name.replace(/JR/g, '').replace(/（.*）/g, '')) ||
          r.railName.includes(spec.shortName.replace(/JR/g, '')) ||
          rg.direction.includes('大阪') ||
          rg.direction.includes('天王寺') ||
          rg.direction.includes('京橋') ||
          rg.direction.includes('尼崎') ||
          rg.direction.includes('奈良') ||
          rg.direction.includes('和歌山') ||
          rg.direction.includes('篠山口') ||
          rg.direction.includes('福知山') ||
          rg.direction.includes('敦賀') ||
          rg.direction.includes('米原') ||
          rg.direction.includes('関西空港');

        if (matchesLine) {
          if (lineKey === 'jr_osaka_loop') {
            if (rg.direction.includes('内回り')) inGroupId = String(rg.groupId);
            if (rg.direction.includes('外回り')) outGroupId = String(rg.groupId);
          } else {
            if (i === 0) {
              outGroupId = String(rg.groupId);
            } else if (i === stationsOut.length - 1) {
              inGroupId = String(rg.groupId);
            } else {
              if (rg.direction.includes(spec.directionNames.inboundShort.replace('方面', ''))) {
                inGroupId = String(rg.groupId);
              } else {
                outGroupId = String(rg.groupId);
              }
            }
          }
        }
      }
    }

    yahooStations.push({
      id: st.id,
      name: st.name,
      yahooStationId: se.ysid || '',
      inGroupId: inGroupId,
      outGroupId: outGroupId
    });
  }

  const configContent = `// scripts/lines/${lineKey}/config.cjs
module.exports = {
  lineId: '${lineKey}',
  name: '${spec.name}',
  stationsFilePath: 'src/data/lines/${lineKey}/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/${lineKey}/stationTimetables.json',
    globalTimetable: 'src/data/lines/${lineKey}/globalTimetable.json',
  },
  stations: ${JSON.stringify(yahooStations, null, 4)},
  stationNameAliases: {},
  trainTypeMap: {
    '普通': 'local',
    '各駅停車': 'local',
    '快速': 'rapid',
    '区間快速': 'semi_rapid',
    '直通快速': 'direct_rapid',
    '大和路快速': 'yamatoji_rapid',
    '関空快速': 'kanku_rapid',
    '紀州路快速': 'kishuji_rapid',
    '丹波路快速': 'tambaji_rapid',
    '新快速': 'new_rapid',
    '特急': 'limitedExp',
  },
  defaultCars: ${spec.defaultCars},
};
`;
  fs.writeFileSync(path.join(scriptLinesDir, 'config.cjs'), configContent, 'utf8');

  console.log(`Generated all files for ${lineKey} successfully.`);
}

async function main() {
  for (const spec of Object.values(LINE_SPECS_WAVE2)) {
    await processLine(spec);
  }
  console.log('\n========================================');
  console.log('All 11 JR West Wave 2 lines generated successfully!');
  console.log('========================================');
}

main().catch(console.error);
