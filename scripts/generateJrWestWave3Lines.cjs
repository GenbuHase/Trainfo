// scripts/generateJrWestWave3Lines.cjs
// JR西日本 近畿圏放射線・山陰・周辺7路線 (Wave 3) 完全データ一括生成スクリプト
const fs = require('fs');
const path = require('path');
const { distMeters } = require('./common/geometryBuilderUtils.cjs');
const wave3Metadata = require('./jrWestWave3Metadata.cjs');
const STATION_DICT = require('./jrWestWave3StationDictionary.cjs');

const repoRoot = path.resolve(__dirname, '..');
const probeData = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scripts/cache/jr_west_wave3_probe.json'), 'utf8'));
const linesGeoJson = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scripts/cache/N02-23/UTF-8/N02-23_RailroadSection.geojson'), 'utf8'));
const stationsGeoJson = JSON.parse(fs.readFileSync(path.join(repoRoot, 'scripts/cache/N02-23/UTF-8/N02-23_Station.geojson'), 'utf8'));

// 接続点アンカー座標
const ANCHORS = {
  '京都': [34.98574, 135.75869],
  '山科': [34.99256, 135.81506],
  '草津': [35.02243, 135.96214],
  '福知山': [35.29583, 135.12056],
  '木津': [34.73667, 135.82472],
  '和歌山': [34.2325, 135.19167],
  '近江塩津': [35.54833, 136.14583],
  '奈良': [34.68056, 135.81889],
  '王寺': [34.59778, 135.705],
  '高田': [34.51634, 135.74464],
  '柘植': [34.84675, 136.25617],
  '園部': [35.10217, 135.48346]
};

// 主要駅（isMajor）
const MAJOR_STATION_NAMES = new Set([
  '京都', '二条', '亀岡', '園部', '綾部', '福知山', '和田山', '豊岡', '城崎温泉',
  '山科', '大津京', '比叡山坂本', '堅田', '近江舞子', '近江今津', '近江塩津',
  '貴生川', '草津', '柘植',
  '東福寺', '六地蔵', '宇治', '城陽', '木津', '奈良',
  '天理', '桜井', '高田',
  '王寺', '五条', '橋本', '粉河', '岩出', '和歌山'
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

      if (deg < 38 && (d1 < 450 || d2 < 450)) {
        changed = true;
        continue;
      }
      next.push(pCur);
    }
    next.push(cleaned[cleaned.length - 1]);
    cleaned = next;
    if (!changed) break;
  }

  cleaned[0] = startCoord;
  cleaned[cleaned.length - 1] = endCoord;
  return cleaned;
}

// 駅座標抽出
function extractStationCoordinates(stationList, n02LineName) {
  const stationFeatures = stationsGeoJson.features.filter(f => {
    const p = f.properties;
    return (
      (p.N02_004 && p.N02_004.includes('西日本旅客鉄道')) &&
      (!n02LineName || p.N02_003 === n02LineName)
    );
  });

  const result = [];
  for (const st of stationList) {
    const sname = st.name;
    if (ANCHORS[sname]) {
      result.push({ name: sname, coords: ANCHORS[sname], number: st.number });
      continue;
    }

    const matches = stationFeatures.filter(f => f.properties.N02_005 === sname);
    let coords;
    if (matches.length > 0) {
      const allCoords = matches.flatMap(m => m.geometry.coordinates);
      const avgLat = allCoords.reduce((sum, c) => sum + c[1], 0) / allCoords.length;
      const avgLng = allCoords.reduce((sum, c) => sum + c[0], 0) / allCoords.length;
      coords = [parseFloat(avgLat.toFixed(5)), parseFloat(avgLng.toFixed(5))];
    } else {
      // 全路線のStationからフォールバック検索
      const anyMatches = stationsGeoJson.features.filter(f =>
        f.properties.N02_004 && f.properties.N02_004.includes('西日本旅客鉄道') && f.properties.N02_005 === sname
      );
      if (anyMatches.length > 0) {
        const allCoords = anyMatches.flatMap(m => m.geometry.coordinates);
        const avgLat = allCoords.reduce((sum, c) => sum + c[1], 0) / allCoords.length;
        const avgLng = allCoords.reduce((sum, c) => sum + c[0], 0) / allCoords.length;
        coords = [parseFloat(avgLat.toFixed(5)), parseFloat(avgLng.toFixed(5))];
      } else {
        throw new Error(`Station coordinates not found for ${sname} in N02!`);
      }
    }
    result.push({ name: sname, coords, number: st.number });
  }
  return result;
}

// 駅間ジオメトリ抽出（複数 ways 連結対応）
function extractSegmentsBetween(stationCoords, n02LineName, lineKey) {
  // 探索対象のライン名リスト（境界駅での接続路線を含める）
  const targetLines = new Set([n02LineName]);
  if (lineKey === 'jr_kosei') targetLines.add('北陸線');
  if (lineKey === 'jr_kusatsu') targetLines.add('東海道線');
  if (lineKey === 'jr_nara') targetLines.add('関西線');
  if (lineKey === 'jr_sagano' || lineKey === 'jr_sanin_sonobe_kinosaki') targetLines.add('東海道線');

  const lineFeatures = linesGeoJson.features.filter(f => {
    const p = f.properties;
    return (
      p.N02_004 && p.N02_004.includes('西日本旅客鉄道') &&
      (!n02LineName || Array.from(targetLines).some(tl => p.N02_003.includes(tl)))
    );
  });

  const allWays = lineFeatures.map(f => f.geometry.coordinates.map(c => [c[1], c[0]]));

  const segments = [];

  for (let i = 0; i < stationCoords.length - 1; i++) {
    const stA = stationCoords[i];
    const stB = stationCoords[i + 1];
    const fromId = `${lineKey}-${String(i + 1).padStart(2, '0')}`;
    const toId = `${lineKey}-${String(i + 2).padStart(2, '0')}`;
    const segId = `${fromId}_${toId}`;

    const segBox = [
      Math.min(stA.coords[0], stB.coords[0]) - 0.05,
      Math.min(stA.coords[1], stB.coords[1]) - 0.05,
      Math.max(stA.coords[0], stB.coords[0]) + 0.05,
      Math.max(stA.coords[1], stB.coords[1]) + 0.05
    ];

    const nearbyWays = allWays.filter(way =>
      way.some(pt => pt[0] >= segBox[0] && pt[0] <= segBox[2] && pt[1] >= segBox[1] && pt[1] <= segBox[3])
    );

    let bestPath = null;
    let minCost = Infinity;

    // 1. 単一 way での最良一致
    for (const way of nearbyWays) {
      for (const rev of [false, true]) {
        const candidate = rev ? way.slice().reverse() : way.slice();
        const dStart = distMeters(stA.coords, candidate[0]);
        const dEnd = distMeters(stB.coords, candidate[candidate.length - 1]);
        const cost = dStart + dEnd;
        if (cost < minCost && dStart < 1200 && dEnd < 1200) {
          minCost = cost;
          bestPath = candidate;
        }
      }
    }

    // 2. 単一 way の部分スライス
    if (!bestPath || minCost > 800) {
      let closestToA = null, dMinA = Infinity;
      let closestToB = null, dMinB = Infinity;
      for (const way of nearbyWays) {
        for (let j = 0; j < way.length; j++) {
          const dA = distMeters(stA.coords, way[j]);
          if (dA < dMinA) { dMinA = dA; closestToA = { way, idx: j }; }
          const dB = distMeters(stB.coords, way[j]);
          if (dB < dMinB) { dMinB = dB; closestToB = { way, idx: j }; }
        }
      }

      if (closestToA && closestToB && closestToA.way === closestToB.way) {
        const way = closestToA.way;
        const iA = closestToA.idx;
        const iB = closestToB.idx;
        if (iA < iB) {
          bestPath = way.slice(iA, iB + 1);
        } else {
          bestPath = way.slice(iB, iA + 1).reverse();
        }
        minCost = dMinA + dMinB;
      }
    }

    // 3. 複数 ways 連結探索（BFS）
    if (!bestPath || minCost > 1000) {
      const segCandidates = [];
      nearbyWays.forEach((w, wIdx) => {
        segCandidates.push({ wIdx, rev: false, start: w[0], end: w[w.length - 1], pts: w });
        segCandidates.push({ wIdx, rev: true, start: w[w.length - 1], end: w[0], pts: w.slice().reverse() });
      });

      const queue = [];
      for (let sIdx = 0; sIdx < segCandidates.length; sIdx++) {
        const s = segCandidates[sIdx];
        const d = distMeters(stA.coords, s.start);
        if (d < 1500) {
          queue.push({
            wIdxSet: new Set([s.wIdx]),
            currEnd: s.end,
            totalDist: d,
            pts: [...s.pts]
          });
        }
      }

      let multiBest = null;
      let multiMinCost = Infinity;

      while (queue.length > 0) {
        const cur = queue.shift();
        const dEnd = distMeters(cur.currEnd, stB.coords);
        if (dEnd < 1200) {
          const cost = cur.totalDist + dEnd;
          if (cost < multiMinCost) {
            multiMinCost = cost;
            multiBest = cur.pts;
          }
        }

        if (cur.wIdxSet.size >= 8) continue;

        for (let sIdx = 0; sIdx < segCandidates.length; sIdx++) {
          const nxt = segCandidates[sIdx];
          if (cur.wIdxSet.has(nxt.wIdx)) continue;
          const gap = distMeters(cur.currEnd, nxt.start);
          if (gap < 120) {
            const newSet = new Set(cur.wIdxSet);
            newSet.add(nxt.wIdx);
            queue.push({
              wIdxSet: newSet,
              currEnd: nxt.end,
              totalDist: cur.totalDist + gap,
              pts: [...cur.pts, ...nxt.pts]
            });
          }
        }
      }

      if (multiBest && multiMinCost < minCost) {
        bestPath = multiBest;
        minCost = multiMinCost;
      }
    }

    if (!bestPath) {
      console.warn(`[WARN] Fallback straight line for segment ${segId} (${stA.name} -> ${stB.name})`);
      bestPath = [stA.coords, stB.coords];
    }

    const cleaned = cleanSpikes(bestPath, stA.coords, stB.coords);

    segments.push({
      id: segId,
      fromStationId: fromId,
      toStationId: toId,
      coordinates: cleaned
    });
  }

  return segments;
}

// 路線ごとの生成メイン
function generateLine(spec) {
  const lineKey = spec.id;
  console.log(`\n======================================================`);
  console.log(`Generating files for ${spec.name} (${lineKey})...`);
  console.log(`======================================================`);

  const stCoords = extractStationCoordinates(spec.stationList, spec.n02LineName);
  console.log(`Extracted coordinates for ${stCoords.length} stations.`);

  const segments = extractSegmentsBetween(stCoords, spec.n02LineName, lineKey);
  console.log(`Generated ${segments.length} track segments.`);

  const outDir = path.join(repoRoot, 'src/data/lines', lineKey);
  fs.mkdirSync(outDir, { recursive: true });

  const upperConst = lineKey.toUpperCase();

  // 1. stations.ts
  const stationDefs = stCoords.map((st, idx) => {
    const id = `${lineKey}-${String(idx + 1).padStart(2, '0')}`;
    const dictEntry = STATION_DICT[st.name] || { kana: st.name, english: st.name };
    const num = st.number ? parseInt(st.number.replace(/^[A-Z-]+/, ''), 10) : idx + 1;
    const isMajor = MAJOR_STATION_NAMES.has(st.name);

    return {
      id,
      stationNumber: st.number,
      lineId: lineKey,
      number: num,
      name: st.name,
      nameKana: dictEntry.kana,
      nameEn: dictEntry.english,
      lat: st.coords[0],
      lng: st.coords[1],
      transfers: [],
      address: '',
      platforms: {
        inbound: '上りホーム',
        outbound: '下りホーム'
      },
      isMajor
    };
  });

  const stationsTsContent = `import type { Station } from '../../../types';

export const ${upperConst}_STATIONS: Station[] = ${JSON.stringify(stationDefs, null, 2)};
`;
  fs.writeFileSync(path.join(outDir, 'stations.ts'), stationsTsContent, 'utf8');

  // 2. trackGeometry.ts
  const trackSegments = segments.map(s => ({
    id: s.id,
    lineId: lineKey,
    fromStationId: s.fromStationId,
    toStationId: s.toStationId,
    coordinates: s.coordinates,
    tracks: 2
  }));

  const trackGeomTsContent = `import type { TrackSegment } from '../../../types';

export const ${upperConst}_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(trackSegments, null, 2)};
`;
  fs.writeFileSync(path.join(outDir, 'trackGeometry.ts'), trackGeomTsContent, 'utf8');

  // 3. trainTypes.ts
  const trainTypes = spec.defaultTrainTypes;
  const trainTypesTsContent = `import type { TrainTypeConfig } from '../../../types';

export const ${upperConst}_TRAIN_TYPES: TrainTypeConfig[] = ${JSON.stringify(trainTypes, null, 2)};
`;
  fs.writeFileSync(path.join(outDir, 'trainTypes.ts'), trainTypesTsContent, 'utf8');

  // 4. index.ts
  const lats = stCoords.map(s => s.coords[0]);
  const lngs = stCoords.map(s => s.coords[1]);
  const minLat = parseFloat((Math.min(...lats) - 0.05).toFixed(4));
  const maxLat = parseFloat((Math.max(...lats) + 0.05).toFixed(4));
  const minLng = parseFloat((Math.min(...lngs) - 0.05).toFixed(4));
  const maxLng = parseFloat((Math.max(...lngs) + 0.05).toFixed(4));

  const exportVarName = lineKey.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase()) + 'Line';

  const indexTsContent = `import type { LineDefinition } from '../../../types';
import { ${upperConst}_STATIONS } from './stations';
import { ${upperConst}_TRAIN_TYPES } from './trainTypes';
import { ${upperConst}_TRACK_SEGMENTS } from './trackGeometry';

export const ${exportVarName}: LineDefinition = {
  id: '${lineKey}',
  name: '${spec.name}',
  shortName: '${spec.shortName}',
  operator: '${spec.operator}',
  lineColor: '${spec.lineColor}',
  accentColor: '${spec.accentColor}',
  defaultCars: ${spec.defaultCars},
  defaultBounds: [[${minLat},${minLng}],[${maxLat},${maxLng}]],
  directionNames: ${JSON.stringify(spec.directionNames, null, 2)},
  stations: ${upperConst}_STATIONS,
  trackSegments: ${upperConst}_TRACK_SEGMENTS,
  trainTypes: ${upperConst}_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
`;
  fs.writeFileSync(path.join(outDir, 'index.ts'), indexTsContent, 'utf8');

  // 5. scripts/lines/<lineId>/config.cjs
  const probedLine = probeData[lineKey] || { stations: [] };
  const configStations = stCoords.map((st, idx) => {
    const id = `${lineKey}-${String(idx + 1).padStart(2, '0')}`;
    const pSt = probedLine.stations.find(ps => ps.name === st.name) || {};
    let inGroupId = null;
    let outGroupId = null;

    if (pSt.routes && pSt.routes.length > 0) {
      const matchRoute = pSt.routes.find(r =>
        r.railName && (
          r.railName.includes(spec.shortName) ||
          r.railName.includes(spec.name.replace(/^JR/, '')) ||
          (spec.n02LineName && r.railName.includes(spec.n02LineName))
        )
      ) || pSt.routes[0];

      if (matchRoute && matchRoute.railGroup) {
        if (matchRoute.railGroup.length === 1) {
          if (idx === 0) outGroupId = matchRoute.railGroup[0].groupId;
          else if (idx === stCoords.length - 1) inGroupId = matchRoute.railGroup[0].groupId;
          else {
            inGroupId = matchRoute.railGroup[0].groupId;
            outGroupId = matchRoute.railGroup[0].groupId;
          }
        } else if (matchRoute.railGroup.length >= 2) {
          const g0 = matchRoute.railGroup[0];
          const g1 = matchRoute.railGroup[1];
          inGroupId = g0.groupId;
          outGroupId = g1.groupId;
        }
      }
    }

    return {
      id,
      name: st.name,
      yahooStationId: pSt.ysid || null,
      inGroupId,
      outGroupId
    };
  });

  const scriptConfigDir = path.join(repoRoot, 'scripts/lines', lineKey);
  fs.mkdirSync(scriptConfigDir, { recursive: true });

  const trainTypeMap = {
    '普通': 'local',
    '各駅停車': 'local',
    '快速': 'rapid',
    '区間快速': 'semi_rapid',
    '新快速': 'special_rapid',
    'みやこ路快速': 'miyako_rapid',
    '丹波路快速': 'tambaji_rapid',
    '特急': 'limitedExp'
  };

  const configCjsContent = `// scripts/lines/${lineKey}/config.cjs
module.exports = {
  lineId: '${lineKey}',
  name: '${spec.name}',
  stationsFilePath: 'src/data/lines/${lineKey}/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/${lineKey}/stationTimetables.json',
    globalTimetable: 'src/data/lines/${lineKey}/globalTimetable.json',
  },
  stations: ${JSON.stringify(configStations, null, 4)},
  stationNameAliases: {},
  trainTypeMap: ${JSON.stringify(trainTypeMap, null, 4)},
  interpolatePassingStations: true,
};
`;
  fs.writeFileSync(path.join(scriptConfigDir, 'config.cjs'), configCjsContent, 'utf8');

  console.log(`Successfully generated all files for ${lineKey}`);
}

function main() {
  console.log(`Starting generation for Wave 3 (${wave3Metadata.length} lines)...`);
  for (const spec of wave3Metadata) {
    generateLine(spec);
  }
  console.log(`\nWave 3 data generation complete!`);
}

main();
