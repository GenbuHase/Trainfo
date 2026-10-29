const fs = require('fs');
const path = require('path');
const linesMaster = require('./kanto_jr_master_definitions.cjs');
const {
  railData,
  stationData,
  FIXED_BOUNDARY_STATIONS,
  getNodeKey,
  parseNodeKey,
  buildGraphFromFeatures,
  dijkstraPath,
  findStationNode,
  buildSegmentCoordinates,
} = require('./build_kanto_jr_track_and_stations.cjs');
const { distMeters } = require('./common/geometryBuilderUtils.cjs');

// 各路線の列車種別マスター定義
const TRAIN_TYPES_MAP = {
  yamanote: [
    { key: 'local', name: '各駅停車', shortName: '各停', bgColor: '#80c241', textColor: '#ffffff', borderColor: '#80c241' },
  ],
  keiyo: [
    { key: 'local', name: '各駅停車', shortName: '各停', bgColor: '#cf1225', textColor: '#ffffff', borderColor: '#cf1225' },
    { key: 'rapid', name: '快速', shortName: '快速', bgColor: '#007ac1', textColor: '#ffffff', borderColor: '#007ac1' },
    { key: 'commuter_rapid', name: '通勤快速', shortName: '通快', bgColor: '#e05a00', textColor: '#ffffff', borderColor: '#e05a00' },
    { key: 'limitedExp', name: '特急', shortName: '特急', bgColor: '#c9252d', textColor: '#ffffff', borderColor: '#c9252d' },
  ],
  sotobo: [
    { key: 'local', name: '普通', shortName: '普通', bgColor: '#e60012', textColor: '#ffffff', borderColor: '#e60012' },
    { key: 'rapid', name: '快速', shortName: '快速', bgColor: '#007ac1', textColor: '#ffffff', borderColor: '#007ac1' },
    { key: 'limitedExp', name: '特急わかしお', shortName: 'わかしお', bgColor: '#0074be', textColor: '#ffffff', borderColor: '#0074be' },
  ],
  togane: [
    { key: 'local', name: '普通', shortName: '普通', bgColor: '#f39800', textColor: '#ffffff', borderColor: '#f39800' },
    { key: 'rapid', name: '快速', shortName: '快速', bgColor: '#007ac1', textColor: '#ffffff', borderColor: '#007ac1' },
  ],
  sobu_main: [
    { key: 'local', name: '普通', shortName: '普通', bgColor: '#ffc20e', textColor: '#000000', borderColor: '#ffc20e' },
    { key: 'rapid', name: '快速', shortName: '快速', bgColor: '#007ac1', textColor: '#ffffff', borderColor: '#007ac1' },
    { key: 'limitedExp', name: '特急しおさい', shortName: 'しおさい', bgColor: '#0074be', textColor: '#ffffff', borderColor: '#0074be' },
  ],
  narita: [
    { key: 'local', name: '普通', shortName: '普通', bgColor: '#00b261', textColor: '#ffffff', borderColor: '#00b261' },
    { key: 'rapid', name: '快速', shortName: '快速', bgColor: '#007ac1', textColor: '#ffffff', borderColor: '#007ac1' },
    { key: 'limitedExp', name: '特急成田エクスプレス', shortName: 'N\'EX', bgColor: '#e60012', textColor: '#ffffff', borderColor: '#e60012' },
  ],
  kururi: [
    { key: 'local', name: '普通', shortName: '普通', bgColor: '#00958a', textColor: '#ffffff', borderColor: '#00958a' },
  ],
  chuo_sobu_local: [
    { key: 'local', name: '各駅停車', shortName: '各停', bgColor: '#ffd400', textColor: '#000000', borderColor: '#ffd400' },
  ],
  keihin_tohoku_negishi: [
    { key: 'local', name: '各駅停車', shortName: '各停', bgColor: '#00b2e5', textColor: '#ffffff', borderColor: '#00b2e5' },
    { key: 'rapid', name: '快速', shortName: '快速', bgColor: '#007ac1', textColor: '#ffffff', borderColor: '#007ac1' },
  ],
  yokohama: [
    { key: 'local', name: '各駅停車', shortName: '各停', bgColor: '#80c241', textColor: '#ffffff', borderColor: '#80c241' },
    { key: 'rapid', name: '快速', shortName: '快速', bgColor: '#f39800', textColor: '#ffffff', borderColor: '#f39800' },
  ],
  nambu: [
    { key: 'local', name: '各駅停車', shortName: '各停', bgColor: '#ffd400', textColor: '#000000', borderColor: '#ffd400' },
    { key: 'rapid', name: '快速', shortName: '快速', bgColor: '#f39800', textColor: '#ffffff', borderColor: '#f39800' },
  ],
  tsurumi: [
    { key: 'local', name: '各駅停車', shortName: '各停', bgColor: '#ffd400', textColor: '#000000', borderColor: '#ffd400' },
  ],
  uchibo: [
    { key: 'local', name: '普通', shortName: '普通', bgColor: '#0074be', textColor: '#ffffff', borderColor: '#0074be' },
    { key: 'rapid', name: '快速', shortName: '快速', bgColor: '#007ac1', textColor: '#ffffff', borderColor: '#007ac1' },
    { key: 'commuter_rapid', name: '通勤快速', shortName: '通快', bgColor: '#e05a00', textColor: '#ffffff', borderColor: '#e05a00' },
    { key: 'limitedExp', name: '特急さざなみ', shortName: 'さざなみ', bgColor: '#c9252d', textColor: '#ffffff', borderColor: '#c9252d' },
  ],
};

function processLine(lineDef) {
  console.log(`\n======================================================`);
  console.log(`Processing ${lineDef.name} (${lineDef.lineId})...`);
  console.log(`======================================================`);

  // 1. 対象フィーチャの抽出
  const features = railData.features.filter(f =>
    f.properties.N02_004 === '東日本旅客鉄道' &&
    lineDef.n02Lines.includes(f.properties.N02_003)
  );
  console.log(`  Rail features: ${features.length}`);

  // 2. グラフ構築（過大なブリッジによる駅間直線ショートカットを防ぐため80mに制限）
  const { adj, nodeCoords } = buildGraphFromFeatures(features, 80);
  console.log(`  Graph nodes: ${nodeCoords.size}, Adj keys: ${adj.size}`);

  // 3. 駅ノードの特定
  const stations = lineDef.stations;
  const stationNodeInfo = new Map();

  for (const st of stations) {
    let bestKey = null;
    let targetCoord = null;

    // 境界確定駅が定義されている場合は最優先で採用
    let fixedCoord = FIXED_BOUNDARY_STATIONS[st.name];
    if (st.name === '上野' && (lineDef.lineId === 'yamanote' || lineDef.lineId === 'keihin_tohoku_negishi')) {
      fixedCoord = [35.7137, 139.7761]; // 山手線・京浜東北線高架ホーム (日暮里迂回Uターン防止)
    }
    if (st.name === '新宿' && lineDef.lineId === 'chuo_sobu_local') {
      fixedCoord = [35.68931, 139.70055]; // 中央・総武緩行線ホーム (西側本線上の新宿駅)
    }
    if (st.name === '中野' && lineDef.lineId === 'chuo_sobu_local') {
      fixedCoord = [35.70598, 139.66686]; // 中央・総武緩行線本線ホーム (側線迂回・クランクジグザグ解消)
    }
    if (st.name === '代々木' && lineDef.lineId === 'chuo_sobu_local') {
      fixedCoord = [35.68387, 139.70243]; // 中央・総武緩行線本線ホーム中心 (Uターン・急屈曲解消)
    }
    if (st.name === '新宿' && lineDef.lineId === 'yamanote') {
      fixedCoord = [35.68926, 139.70024]; // 山手線ホーム (西側本線上の新宿駅、構内逆走Uターン防止)
    }
    if (st.name === '代々木' && lineDef.lineId === 'yamanote') {
      fixedCoord = [35.6845, 139.70203]; // 山手線ホーム北端
    }

    if (fixedCoord) {
      targetCoord = fixedCoord;
    } else {
      // N02駅から該当駅を探す
      const altName = st.name.includes('ケ') ? st.name.replace(/ケ/g, 'ヶ') : st.name.replace(/ヶ/g, 'ケ');
      const matches = stationData.features.filter(f =>
        (f.properties.N02_005 === st.name || f.properties.N02_005 === altName) &&
        f.properties.N02_004 === '東日本旅客鉄道' &&
        lineDef.n02Lines.includes(f.properties.N02_003)
      );

      if (matches.length > 0) {
        const c = matches[0].geometry.coordinates[0];
        targetCoord = [c[1], c[0]];
      } else {
        // フォールバック
        const fb = stationData.features.filter(f =>
          (f.properties.N02_005 === st.name || f.properties.N02_005 === altName) && f.properties.N02_004 === '東日本旅客鉄道'
        );
        if (fb.length > 0) {
          const c = fb[0].geometry.coordinates[0];
          targetCoord = [c[1], c[0]];
        }
      }
    }

    if (!targetCoord) {
      console.warn(`  ⚠️ Could not find targetCoord for ${st.name}`);
      continue;
    }

    // 最寄りのグラフノードを探索
    let minDist = Infinity;
    for (const [key, coord] of nodeCoords.entries()) {
      const d = distMeters(targetCoord, coord);
      if (d < minDist) {
        minDist = d;
        bestKey = key;
      }
    }

    const actualCoord = nodeCoords.get(bestKey) || targetCoord;
    stationNodeInfo.set(st.id, {
      st,
      key: bestKey,
      coord: actualCoord,
      targetCoord,
      dist: minDist,
    });
  }

  console.log(`  Stations snapped: ${stationNodeInfo.size} / ${stations.length}`);

  // 4. セグメント生成
  // セグメント接続ペアの定義
  const segmentPairs = [];
  if (lineDef.lineId === 'yamanote') {
    // 環状線: 1->2, 2->3, ..., 29->30, 30->1
    for (let i = 0; i < stations.length; i++) {
      const fromSt = stations[i];
      const toSt = stations[(i + 1) % stations.length];
      segmentPairs.push([fromSt.id, toSt.id]);
    }
  } else if (lineDef.lineId === 'narita') {
    // 本線: 佐倉 (NR-01) -> 銚子 (NR-17)
    for (let i = 0; i < 16; i++) {
      segmentPairs.push([stations[i].id, stations[i + 1].id]);
    }
    // 空港支線: 成田 (NR-03) -> 空港第2ビル (NR-36) -> 成田空港 (NR-37)
    segmentPairs.push(['NR-03', 'NR-36']);
    segmentPairs.push(['NR-36', 'NR-37']);
    // 我孫子支線: 我孫子 (NR-20) -> ... -> 下総松崎 (NR-28) -> 成田 (NR-03)
    segmentPairs.push(['NR-20', 'NR-21']);
    segmentPairs.push(['NR-21', 'NR-22']);
    segmentPairs.push(['NR-22', 'NR-23']);
    segmentPairs.push(['NR-23', 'NR-24']);
    segmentPairs.push(['NR-24', 'NR-25']);
    segmentPairs.push(['NR-25', 'NR-26']);
    segmentPairs.push(['NR-26', 'NR-27']);
    segmentPairs.push(['NR-27', 'NR-28']);
    segmentPairs.push(['NR-28', 'NR-03']);
  } else if (lineDef.lineId === 'nambu') {
    // 本線: 川崎 (JN-01) -> 立川 (JN-26)
    for (let i = 0; i < 25; i++) {
      segmentPairs.push([stations[i].id, stations[i + 1].id]);
    }
    // 浜川崎支線: 尻手 (JN-02) -> 八丁畷 (JN-51) -> 川崎新町 (JN-52) -> 小田栄 (JN-53) -> 浜川崎 (JN-54)
    segmentPairs.push(['JN-02', 'JN-51']);
    segmentPairs.push(['JN-51', 'JN-52']);
    segmentPairs.push(['JN-52', 'JN-53']);
    segmentPairs.push(['JN-53', 'JN-54']);
  } else if (lineDef.lineId === 'tsurumi') {
    // 本線: 鶴見 (JI-01) -> 扇町 (JI-10)
    for (let i = 0; i < 9; i++) {
      segmentPairs.push([stations[i].id, stations[i + 1].id]);
    }
    // 海芝浦支線: 浅野 (JI-05) -> 新芝浦 (JI-51) -> 海芝浦 (JI-52)
    segmentPairs.push(['JI-05', 'JI-51']);
    segmentPairs.push(['JI-51', 'JI-52']);
    // 大川支線: 安善 (JI-06) -> 大川 (JI-61)
    segmentPairs.push(['JI-06', 'JI-61']);
  } else {
    // 通常の直線路線: 0 -> 1, 1 -> 2, ..., N-2 -> N-1
    for (let i = 0; i < stations.length - 1; i++) {
      segmentPairs.push([stations[i].id, stations[i + 1].id]);
    }
  }

  const trackSegments = [];
  const exactStationCoords = new Map();

  for (let sIdx = 0; sIdx < segmentPairs.length; sIdx++) {
    const [fromId, toId] = segmentPairs[sIdx];
    const fromInfo = stationNodeInfo.get(fromId);
    const toInfo = stationNodeInfo.get(toId);

    if (!fromInfo || !toInfo) {
      console.warn(`  ⚠️ Missing node info for segment ${fromId} -> ${toId}`);
      continue;
    }

    const pathKeys = dijkstraPath(adj, nodeCoords, fromInfo.key, toInfo.key);
    let coords = [];
    const startCoord = fromInfo.targetCoord || fromInfo.coord;
    const endCoord = toInfo.targetCoord || toInfo.coord;

    if (pathKeys && pathKeys.length > 0) {
      const rawCoords = pathKeys.map(k => nodeCoords.get(k));
      coords = buildSegmentCoordinates(startCoord, endCoord, rawCoords);
    } else {
      console.warn(`  ⚠️ No path found between ${fromId} and ${toId}. Using direct segment.`);
      coords = subdivideCoordinates([startCoord, endCoord], 35);
    }

    // 始点と終点の座標を確定
    if (!exactStationCoords.has(fromId)) {
      exactStationCoords.set(fromId, coords[0]);
    }
    exactStationCoords.set(toId, coords[coords.length - 1]);

    trackSegments.push({
      id: `${lineDef.lineId}-seg-${sIdx + 1}`,
      fromStationId: fromId,
      toStationId: toId,
      coordinates: coords,
    });
  }

  console.log(`  Generated track segments: ${trackSegments.length}`);

  // 5. stations.ts データの作成（端点座標と100%完全一致）
  const finalStations = stations.map((st, idx) => {
    const coord = exactStationCoords.get(st.id) || (stationNodeInfo.get(st.id) ? stationNodeInfo.get(st.id).coord : [35.68, 139.76]);
    const obj = {
      id: st.id,
      lineId: lineDef.lineId,
      number: idx + 1,
      name: st.name,
      nameKana: st.kana,
      nameEn: st.en,
      lat: coord[0],
      lng: coord[1],
      transfers: st.transfers || [],
      address: `東京都・神奈川県・千葉県・埼玉県`,
      facilities: {
        elevator: true,
        restroom: true,
        multipurposeToilet: true,
        waitingRoom: false,
        ticketOffice: false,
      },
      platforms: { inbound: '1', outbound: '2' },
      stoppingTypes: st.stoppingTypes || ['local'],
    };
    if (st.stationNumber) {
      obj.stationNumber = st.stationNumber;
    } else if (lineDef.hasOfficialNumbering && st.num) {
      // 公式ナンバリング表記 (例: JY-01)
      const prefix = lineDef.numberPrefix;
      const numPart = st.num.replace(prefix, '');
      obj.stationNumber = `${prefix}-${numPart}`;
    }
    if (st.isMajor) {
      obj.isMajor = true;
    }
    return obj;
  });

  // 6. 各ファイル出力
  const lineDir = path.resolve(`src/data/lines/${lineDef.lineId}`);
  if (!fs.existsSync(lineDir)) {
    fs.mkdirSync(lineDir, { recursive: true });
  }

  // 6-1. trainTypes.ts
  const rawTrainTypes = TRAIN_TYPES_MAP[lineDef.lineId] || [
    { key: 'local', name: '各駅停車', shortName: '各停', bgColor: lineDef.lineColor, textColor: '#ffffff', borderColor: lineDef.lineColor }
  ];
  const trainTypesRecord = {};
  const nameEnMap = {
    local: 'Local',
    regular: 'Local',
    rapid: 'Rapid',
    commuter_rapid: 'Commuter Rapid',
    limitedExp: 'Limited Express'
  };
  for (const t of rawTrainTypes) {
    trainTypesRecord[t.key] = {
      ...t,
      nameEn: nameEnMap[t.key] || 'Train',
      color: t.bgColor || lineDef.lineColor,
    };
  }
  const trainTypesConstName = `${lineDef.lineId.toUpperCase()}_TRAIN_TYPES`;
  const trainTypesContent = `import type { TrainTypeConfig } from '../../../types';

export const ${trainTypesConstName}: Record<string, TrainTypeConfig> = ${JSON.stringify(trainTypesRecord, null, 2)};
`;
  fs.writeFileSync(path.join(lineDir, 'trainTypes.ts'), trainTypesContent, 'utf8');

  // 6-2. stations.ts
  const stationsConstName = `${lineDef.lineId.toUpperCase()}_STATIONS`;
  const stationsContent = `import type { Station } from '../../../types';

export const ${stationsConstName}: Station[] = ${JSON.stringify(finalStations, null, 2)};
`;
  fs.writeFileSync(path.join(lineDir, 'stations.ts'), stationsContent, 'utf8');

  // 6-3. trackGeometry.ts
  const trackConstName = `${lineDef.lineId.toUpperCase()}_TRACK_SEGMENTS`;
  const trackContent = `import type { TrackSegment } from '../../../types';

export const ${trackConstName}: TrackSegment[] = ${JSON.stringify(trackSegments, null, 2)};
`;
  fs.writeFileSync(path.join(lineDir, 'trackGeometry.ts'), trackContent, 'utf8');

  // 6-4. index.ts
  const indexExportName = `${lineDef.lineId.replace(/_([a-z])/g, (_, c) => c.toUpperCase())}Line`;
  const indexContent = `import type { LineDefinition } from '../../../types';
import { ${stationsConstName} } from './stations';
import { ${trainTypesConstName} } from './trainTypes';
import { ${trackConstName} } from './trackGeometry';

export const ${indexExportName}: LineDefinition = {
  id: '${lineDef.lineId}',
  name: '${lineDef.name}',
  shortName: '${lineDef.shortName}',
  operator: '${lineDef.operator}',
  lineColor: '${lineDef.lineColor}',
  accentColor: '${lineDef.accentColor}',
  defaultCars: ${lineDef.defaultCars || 10},
  defaultBounds: ${JSON.stringify(lineDef.defaultBounds)},
  directionNames: ${JSON.stringify(lineDef.directionNames, null, 2)},
  stations: ${stationsConstName},
  trackSegments: ${trackConstName},
  trainTypes: ${trainTypesConstName},
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
`;
  fs.writeFileSync(path.join(lineDir, 'index.ts'), indexContent, 'utf8');

  console.log(`  ✅ Successfully generated files for ${lineDef.lineId}`);
}

function runAll() {
  for (const lineDef of linesMaster) {
    try {
      processLine(lineDef);
    } catch (e) {
      console.error(`  ❌ Error processing ${lineDef.lineId}:`, e.message, e.stack);
    }
  }
}

runAll();
