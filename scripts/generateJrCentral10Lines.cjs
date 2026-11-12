// scripts/generateJrCentral10Lines.cjs
// JR東海 在来線10路線 完全データ一括生成スクリプト
const fs = require('fs');
const path = require('path');
const { distMeters } = require('./common/geometryBuilderUtils.cjs');
const { LINE_SPECS } = require('./jrCentralMetadata.cjs');
const STATION_DICT = require('./jrCentralStationDictionary.cjs');

const repoRoot = path.resolve(__dirname, '..');
const probeData = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scripts/cache/jr_central_exact_probe.json'), 'utf8'));
const linesGeoJson = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scripts/cache/N02-23/UTF-8/N02-23_RailroadSection.geojson'), 'utf8'));
const stationsGeoJson = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scripts/cache/N02-23/UTF-8/N02-23_Station.geojson'), 'utf8'));

// 接続点アンカー座標（既存路線および境界駅と完全一致）
const ANCHORS = {
  '甲府': [35.667151, 138.568991],
  '塩尻': [36.1144795, 137.9475995],
  '富山': [36.701368, 137.2134438],
  '豊橋': [34.76166, 137.38294],
  '富士': [35.15131, 138.65125],
  '名古屋': [35.17208, 136.88033],
  '金山': [35.14265, 136.90122],
  '大府': [35.00938, 136.96141],
  '岐阜': [35.40941, 136.75773],
  '亀山': [34.85172, 136.45278],
  '新宮': [33.72583, 135.99222],
  '辰野': [35.98472, 137.99806],
  '鳥羽': [34.48694, 136.84306],
  '松阪': [34.57722, 136.53611],
  '多気': [34.51528, 136.57444],
  '多治見': [35.33472, 137.12111],
  '美濃太田': [35.44417, 137.01972]
};

// 主要駅（isMajor）
const MAJOR_STATION_NAMES = new Set([
  '名古屋', '金山', '千種', '大曽根', '高蔵寺', '多治見', '中津川', '木曽福島', '塩尻',
  '岐阜', '美濃太田', '下呂', '高山', '飛騨古川', '富山',
  '桑名', '四日市', '亀山',
  '津', '松阪', '多気', '尾鷲', '熊野市', '新宮',
  '豊橋', '豊川', '新城', '中部天竜', '天竜峡', '飯田', '駒ケ根', '駒ヶ根', '伊那市', '辰野',
  '富士', '富士宮', '西富士宮', '身延', '下部温泉', '甲府',
  '半田', '武豊',
  '可児', '伊勢市', '鳥羽'
]);

// 太多線の公式ナンバリングマッピング (CI01は欠番)
const TAITA_NUMBERING = {
  '多治見': 'CI07',
  '根本': 'CI06',
  '姫': 'CI05',
  '下切': 'CI04',
  '可児': 'CI03',
  '美濃川合': 'CI02',
  '美濃太田': 'CI00'
};

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

// グラフ探索用
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

  // 太多線の小名田除外 (念のためフィルタ)
  const stationEntries = pLine.stations.filter(s => s.name !== '小名田');

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
  for (let i = 0; i < stationEntries.length; i++) {
    const se = stationEntries[i];
    const sname = se.name;
    let coord = getStationCoord(sname);
    if (!coord) {
      console.warn(`Station ${sname} not found in N02-23, searching nearby lines...`);
      // 全駅データから検索
      for (const s of stationsGeoJson.features) {
        if (s.properties.N02_005 === sname || s.properties.N02_005 === sname.replace(/ケ/g, 'ヶ')) {
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
      coord = [35.0, 137.0];
    }

    stationsList.push({
      name: sname,
      probeInfo: se,
      coord: coord
    });
  }

  // 駅間 TrackSegments の構築
  const trackSegments = [];
  const refinedStationCoords = [];

  for (let i = 0; i < stationsList.length - 1; i++) {
    const stA = stationsList[i];
    const stB = stationsList[i + 1];

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
    let stationNumber = undefined;
    if (lineKey === 'jr_taita') {
      stationNumber = TAITA_NUMBERING[sname];
    } else if (spec.numberingPrefix && i <= spec.numberingMaxIdx) {
      stationNumber = `${spec.numberingPrefix}${String(i).padStart(2, '0')}`;
    }

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
    if (['jr_chuo_west', 'jr_kansai_nagoya_kameyama', 'jr_iida', 'jr_taketoyo', 'jr_sangu'].includes(lineKey)) {
      stoppingTypes.push('rapid');
    }
    if (['jr_kansai_nagoya_kameyama', 'jr_taketoyo'].includes(lineKey)) {
      stoppingTypes.push('semi_rapid');
    }
    if (['jr_kansai_nagoya_kameyama', 'jr_sangu', 'jr_kisei_kameyama_shingu'].includes(lineKey)) {
      stoppingTypes.push('rapid_mie');
    }
    if (['jr_chuo_west', 'jr_takayama', 'jr_kansai_nagoya_kameyama', 'jr_kisei_kameyama_shingu', 'jr_iida', 'jr_minobu'].includes(lineKey)) {
      stoppingTypes.push('limitedExp');
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
        inbound: '上りホーム',
        outbound: '下りホーム'
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
        nameEn: 'Semi Rapid',
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
        color: '#0082ba',
        textColor: '#ffffff',
        bgColor: '#0082ba',
        borderColor: '#006591',
      }
    } : {}),
    ...(stationsOut[0].stoppingTypes.includes('rapid_mie') ? {
      rapid_mie: {
        key: 'rapid_mie',
        name: '快速みえ',
        nameEn: 'Rapid Mie',
        shortName: 'みえ',
        color: '#ff7322',
        textColor: '#ffffff',
        bgColor: '#ff7322',
        borderColor: '#cc5200',
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
        if (
          r.railName.includes(spec.name.replace(/JR/g, '').replace(/（.*）/g, '')) ||
          r.railName.includes(spec.shortName.replace(/JR/g, '')) ||
          rg.direction.includes('名古屋') ||
          rg.direction.includes('塩尻') ||
          rg.direction.includes('高山') ||
          rg.direction.includes('富山') ||
          rg.direction.includes('亀山') ||
          rg.direction.includes('新宮') ||
          rg.direction.includes('辰野') ||
          rg.direction.includes('甲府') ||
          rg.direction.includes('武豊') ||
          rg.direction.includes('鳥羽') ||
          rg.direction.includes('伊勢奥津')
        ) {
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
    '快速みえ': 'rapid_mie',
    '特急': 'limitedExp',
  },
  defaultCars: ${spec.defaultCars},
};
`;
  fs.writeFileSync(path.join(scriptLinesDir, 'config.cjs'), configContent, 'utf8');

  console.log(`Generated all files for ${lineKey} successfully.`);
}

async function main() {
  for (const spec of Object.values(LINE_SPECS)) {
    await processLine(spec);
  }
  console.log('\n========================================');
  console.log('All 10 JR Central lines generated successfully!');
  console.log('========================================');
}

main().catch(console.error);
