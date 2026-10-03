#!/usr/bin/env node
// 西武池袋線・西武有楽町線 駅メタデータ & 軌道ジオメトリ生成スクリプト
const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cache/osm_seibu_raw.json'), 'utf8'));

const nodes = new Map();
const ways = new Map();

for (const el of raw.elements) {
  if (el.type === 'node') nodes.set(el.id, el);
  else if (el.type === 'way') ways.set(el.id, el);
}

// グラフ構築 & BFS
function buildGraph(relIds) {
  const adj = new Map();
  const allowedWays = new Set();
  for (const el of raw.elements) {
    if (el.type === 'relation' && relIds.includes(el.id)) {
      for (const m of el.members) {
        if (m.type === 'way') allowedWays.add(m.ref);
      }
    }
  }
  for (const wayId of allowedWays) {
    const w = ways.get(wayId);
    if (!w || !w.nodes) continue;
    for (let i = 0; i < w.nodes.length - 1; i++) {
      const u = w.nodes[i];
      const v = w.nodes[i + 1];
      if (!adj.has(u)) adj.set(u, []);
      if (!adj.has(v)) adj.set(v, []);
      adj.get(u).push({ next: v, wayId });
      adj.get(v).push({ next: u, wayId });
    }
  }
  return adj;
}

function findPathBFS(adj, startNodeId, endNodeId) {
  const queue = [startNodeId];
  const visited = new Set([startNodeId]);
  const parent = new Map();

  while (queue.length > 0) {
    const curr = queue.shift();
    if (curr === endNodeId) {
      const path = [];
      let step = endNodeId;
      while (step !== undefined) {
        path.push(step);
        step = parent.get(step);
      }
      return path.reverse();
    }

    for (const edge of adj.get(curr) || []) {
      if (!visited.has(edge.next)) {
        visited.add(edge.next);
        parent.set(edge.next, curr);
        queue.push(edge.next);
      }
    }
  }
  return null;
}

// ============================================================
// 1. 西武池袋線（池袋 〜 西武秩父 全36駅）
// ============================================================
const IKEBUKURO_STATION_DEFS = [
  { id: 'SI-01', number: 1, name: '池袋', nameKana: 'いけぶくろ', nameEn: 'Ikebukuro', nodeId: 7966718589, isMajor: true, transfers: ['JR山手線', 'JR埼京線', 'JR湘南新宿ライン', '東武東上線', '東京メトロ丸ノ内線', '東京メトロ有楽町線', '東京メトロ副都心線'], address: '東京都豊島区南池袋一丁目28-1', platforms: { inbound: '1-7番線', outbound: '1-7番線' }, stoppingTypes: ['limitedExp', 'rapidExp', 'express', 'commuter_exp', 'rapid', 'commuter_semi', 'semiExp', 'local'] },
  { id: 'SI-02', number: 2, name: '椎名町', nameKana: 'しいなまち', nameEn: 'Shiinamachi', nodeId: 7966720144, isMajor: false, transfers: [], address: '東京都豊島区長崎一丁目1-22', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'SI-03', number: 3, name: '東長崎', nameKana: 'ひがシナがさき', nameEn: 'Higashi-Nagasaki', nodeId: 7430316091, isMajor: false, transfers: [], address: '東京都豊島区南長崎五丁目33-8', platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['local'] },
  { id: 'SI-04', number: 4, name: '江古田', nameKana: 'えこだ', nameEn: 'Ekoda', nodeId: 2024916367, isMajor: false, transfers: [], address: '東京都練馬区旭丘一丁目78-7', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'SI-05', number: 5, name: '桜台', nameKana: 'さくらだい', nameEn: 'Sakuradai', nodeId: 2024916387, isMajor: false, transfers: [], address: '東京都練馬区桜台一丁目5-1', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'SI-06', number: 6, name: '練馬', nameKana: 'ねりま', nameEn: 'Nerima', nodeId: 3730686208, isMajor: true, transfers: ['西武有楽町線', '西武豊島線', '都営大江戸線'], address: '東京都練馬区練馬一丁目3-5', platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['strain', 'rapidExp', 'rapid', 'commuter_semi', 'semiExp', 'local'] },
  { id: 'SI-07', number: 7, name: '中村橋', nameKana: 'なかむらばし', nameEn: 'Nakamurabashi', nodeId: 5634481145, isMajor: false, transfers: [], address: '東京都練馬区中村北四丁目2-1', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'SI-08', number: 8, name: '富士見台', nameKana: 'ふじみだい', nameEn: 'Fujimidai', nodeId: 3624957738, isMajor: false, transfers: [], address: '東京都中野区上鷺宮三丁目15-1', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'SI-09', number: 9, name: '練馬高野台', nameKana: 'ねりまたかのだい', nameEn: 'Nerima-Takanodai', nodeId: 6791198366, isMajor: false, transfers: [], address: '東京都練馬区高野台一丁目7-27', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'SI-10', number: 10, name: '石神井公園', nameKana: 'しゃくじいこうえん', nameEn: 'Shakujii-koen', nodeId: 7763479271, isMajor: true, transfers: [], address: '東京都練馬区石神井町三丁目23-15', platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['strain', 'rapidExp', 'express', 'commuter_exp', 'rapid', 'semiExp', 'local'] },
  { id: 'SI-11', number: 11, name: '大泉学園', nameKana: 'おおいずみがくえん', nameEn: 'Oizumi-gakuen', nodeId: 3624969191, isMajor: false, transfers: [], address: '東京都練馬区東大泉一丁目29-7', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['commuter_exp', 'rapid', 'commuter_semi', 'semiExp', 'local'] },
  { id: 'SI-12', number: 12, name: '保谷', nameKana: 'ほうや', nameEn: 'Hoya', nodeId: 3624969124, isMajor: false, transfers: [], address: '東京都西東京市東町三丁目14-30', platforms: { inbound: '1・2番線', outbound: '3番線' }, stoppingTypes: ['strain', 'commuter_exp', 'rapid', 'commuter_semi', 'semiExp', 'local'] },
  { id: 'SI-13', number: 13, name: 'ひばりヶ丘', nameKana: 'ひばりがおか', nameEn: 'Hibarigaoka', nodeId: 7411287523, isMajor: false, transfers: [], address: '東京都西東京市住吉町三丁目9-19', platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['rapidExp', 'express', 'rapid', 'semiExp', 'local'] },
  { id: 'SI-14', number: 14, name: '東久留米', nameKana: 'ひがしくるめ', nameEn: 'Higashi-Kurume', nodeId: 3624969355, isMajor: false, transfers: [], address: '東京都東久留米市東本町1-8', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['express', 'commuter_exp', 'rapid', 'commuter_semi', 'semiExp', 'local'] },
  { id: 'SI-15', number: 15, name: '清瀬', nameKana: 'きよせ', nameEn: 'Kiyose', nodeId: 7763504207, isMajor: false, transfers: [], address: '東京都清瀬市元町一丁目2-4', platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['express', 'rapid', 'semiExp', 'local'] },
  { id: 'SI-16', number: 16, name: '秋津', nameKana: 'あきつ', nameEn: 'Akitsu', nodeId: 7763504204, isMajor: false, transfers: ['JR武蔵野線 (新秋津駅)'], address: '東京都東村山市秋津町五丁目7-8', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['rapid', 'semiExp', 'local'] },
  { id: 'SI-17', number: 17, name: '所沢', nameKana: 'ところざわ', nameEn: 'Tokorozawa', nodeId: 7763525702, isMajor: true, transfers: ['西武新宿線'], address: '埼玉県所沢市くすのき台一丁目14-5', platforms: { inbound: '3・4・5番線', outbound: '1・2番線' }, stoppingTypes: ['limitedExp', 'strain', 'rapidExp', 'express', 'commuter_exp', 'rapid', 'commuter_semi', 'semiExp', 'local'] },
  { id: 'SI-18', number: 18, name: '西所沢', nameKana: 'にしところざわ', nameEn: 'Nishi-Tokorozawa', nodeId: 7763928949, isMajor: false, transfers: ['西武狭山線'], address: '埼玉県所沢市西所沢一丁目11-9', platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['strain', 'rapidExp', 'express', 'commuter_exp', 'rapid', 'commuter_semi', 'semiExp', 'local'] },
  { id: 'SI-19', number: 19, name: '小手指', nameKana: 'こてさし', nameEn: 'Kotesashi', nodeId: 6791200963, isMajor: false, transfers: [], address: '埼玉県所沢市小手指町一丁目8-1', platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['strain', 'rapidExp', 'express', 'commuter_exp', 'rapid', 'commuter_semi', 'semiExp', 'local'] },
  { id: 'SI-20', number: 20, name: '狭山ヶ丘', nameKana: 'さやまがおか', nameEn: 'Sayamagaoka', nodeId: 7763497559, isMajor: false, transfers: [], address: '埼玉県所沢市狭山ヶ丘一丁目299-1', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['express', 'commuter_exp', 'rapid', 'semiExp', 'local'] },
  { id: 'SI-21', number: 21, name: '武蔵藤沢', nameKana: 'むさしふじさわ', nameEn: 'Musashi-Fujisawa', nodeId: 503879749, isMajor: false, transfers: [], address: '埼玉県入間市下藤沢494-1', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['express', 'commuter_exp', 'rapid', 'semiExp', 'local'] },
  { id: 'SI-22', number: 22, name: '稲荷山公園', nameKana: 'いなりやまこうえん', nameEn: 'Inariyama-koen', nodeId: 503879993, isMajor: false, transfers: [], address: '埼玉県狭山市稲荷山一丁目1-1', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['express', 'commuter_exp', 'rapid', 'semiExp', 'local'] },
  { id: 'SI-23', number: 23, name: '入間市', nameKana: 'いるまし', nameEn: 'Irumashi', nodeId: 7763506441, isMajor: false, transfers: [], address: '埼玉県入間市河原町2-1', platforms: { inbound: '2・3番線', outbound: '4・5番線' }, stoppingTypes: ['limitedExp', 'strain', 'rapidExp', 'express', 'commuter_exp', 'rapid', 'semiExp', 'local'] },
  { id: 'SI-24', number: 24, name: '仏子', nameKana: 'ぶし', nameEn: 'Bushi', nodeId: 7763931140, isMajor: false, transfers: [], address: '埼玉県入間市仏子883-1', platforms: { inbound: '1番線', outbound: '2・3番線' }, stoppingTypes: ['express', 'commuter_exp', 'rapid', 'semiExp', 'local'] },
  { id: 'SI-25', number: 25, name: '元加治', nameKana: 'もとかじ', nameEn: 'Motokaji', nodeId: 7763971927, isMajor: false, transfers: [], address: '埼玉県入間市野田2041-3', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['express', 'commuter_exp', 'rapid', 'semiExp', 'local'] },
  { id: 'SI-26', number: 26, name: '飯能', nameKana: 'はんのう', nameEn: 'Hanno', nodeId: 3625336124, isMajor: true, transfers: [], address: '埼玉県飯能市仲町11-21', platforms: { inbound: '1-4番線', outbound: '1-4番線' }, stoppingTypes: ['limitedExp', 'strain', 'rapidExp', 'express', 'commuter_exp', 'rapid', 'semiExp', 'local'] },
  { id: 'SI-27', number: 27, name: '東飯能', nameKana: 'ひがしはんのう', nameEn: 'Higashi-Hanno', nodeId: 5447466514, isMajor: false, transfers: ['JR八高線'], address: '埼玉県飯能市東町1-6', platforms: { inbound: '2番線', outbound: '2番線' }, stoppingTypes: ['rapidExp', 'local'] },
  { id: 'SI-28', number: 28, name: '高麗', nameKana: 'こま', nameEn: 'Koma', nodeId: 7966816611, isMajor: false, transfers: [], address: '埼玉県日高市武蔵台一丁目1-1', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['rapidExp', 'local'] },
  { id: 'SI-29', number: 29, name: '武蔵横手', nameKana: 'むさしよこて', nameEn: 'Musashi-Yokote', nodeId: 503880747, isMajor: false, transfers: [], address: '埼玉県日高市横手636', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['rapidExp', 'local'] },
  { id: 'SI-30', number: 30, name: '東吾野', nameKana: 'ひがしあがの', nameEn: 'Higashi-Agano', nodeId: 503880402, isMajor: false, transfers: [], address: '埼玉県飯能市平戸282', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['rapidExp', 'local'] },
  { id: 'SI-31', number: 31, name: '吾野', nameKana: 'あがの', nameEn: 'Agano', nodeId: 503876161, isMajor: false, transfers: [], address: '埼玉県飯能市坂石町分324-1', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['rapidExp', 'local'] },
  { id: 'SI-32', number: 32, name: '西吾野', nameKana: 'にしあがの', nameEn: 'Nishi-Agano', nodeId: 7966871898, isMajor: false, transfers: [], address: '埼玉県飯能市南川105-1', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['rapidExp', 'local'] },
  { id: 'SI-33', number: 33, name: '正丸', nameKana: 'しょうまる', nameEn: 'Shomaru', nodeId: 7966878614, isMajor: false, transfers: [], address: '埼玉県飯能市南川1055-1', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['rapidExp', 'local'] },
  { id: 'SI-34', number: 34, name: '芦ヶ久保', nameKana: 'あしがくぼ', nameEn: 'Ashigakubo', nodeId: 7966871850, isMajor: false, transfers: [], address: '埼玉県秩父郡横瀬町芦ヶ久保1911', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['rapidExp', 'local'] },
  { id: 'SI-35', number: 35, name: '横瀬', nameKana: 'よこぜ', nameEn: 'Yokoze', nodeId: 7966908899, isMajor: false, transfers: [], address: '埼玉県秩父郡横瀬町横瀬4067', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['limitedExp', 'rapidExp', 'local'] },
  { id: 'SI-36', number: 36, name: '西武秩父', nameKana: 'せいぶちちぶ', nameEn: 'Seibu-Chichibu', nodeId: 7966907930, isMajor: true, transfers: ['秩父鉄道 (御花畑駅)'], address: '埼玉県秩父市野坂町一丁目16-15', platforms: { inbound: '1-3番線', outbound: '1-3番線' }, stoppingTypes: ['limitedExp', 'strain', 'rapidExp', 'local'] },
];

// ============================================================
// 2. 西武有楽町線（小竹向原 〜 練馬 全3駅）
// ============================================================
const YURAKUCHO_STATION_DEFS = [
  { id: 'SI-37', number: 1, name: '小竹向原', nameKana: 'こたけむかいはら', nameEn: 'Kotake-mukaihara', nodeId: 7775797964, isMajor: true, transfers: ['東京メトロ有楽町線', '東京メトロ副都心線'], address: '東京都練馬区小竹町二丁目16-1', platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['rapidExp', 'express', 'rapid', 'semiExp', 'local'] },
  { id: 'SI-38', number: 2, name: '新桜台', nameKana: 'しんさくらだい', nameEn: 'Shin-Sakuradai', nodeId: 412760458, isMajor: false, transfers: [], address: '東京都練馬区桜台二丁目28-11', platforms: { inbound: '1番線', outbound: '2番線' }, stoppingTypes: ['local'] },
  { id: 'SI-06', number: 3, name: '練馬', nameKana: 'ねりま', nameEn: 'Nerima', nodeId: 3730686207, isMajor: true, transfers: ['西武池袋線', '西武豊島線', '都営大江戸線'], address: '東京都練馬区練馬一丁目3-5', platforms: { inbound: '1・2番線', outbound: '3・4番線' }, stoppingTypes: ['strain', 'rapidExp', 'express', 'rapid', 'semiExp', 'local'] },
];

function subdividePath(coords, maxStepMeters = 80) {
  const result = [];
  for (let i = 0; i < coords.length - 1; i++) {
    const p1 = coords[i];
    const p2 = coords[i + 1];
    result.push(p1);

    const dy = (p2[0] - p1[0]) * 111000;
    const dx = (p2[1] - p1[1]) * 91000;
    const dist = Math.hypot(dx, dy);

    if (dist > maxStepMeters) {
      const steps = Math.ceil(dist / maxStepMeters);
      for (let s = 1; s < steps; s++) {
        const ratio = s / steps;
        const lat = Number((p1[0] + (p2[0] - p1[0]) * ratio).toFixed(6));
        const lon = Number((p1[1] + (p2[1] - p1[1]) * ratio).toFixed(6));
        result.push([lat, lon]);
      }
    }
  }
  result.push(coords[coords.length - 1]);
  return result;
}

function calcDist(p1, p2) {
  const dy = (p2[0] - p1[0]) * 111000;
  const dx = (p2[1] - p1[1]) * 91000;
  return Math.hypot(dx, dy);
}

function snapStationToPolyline(stationCoords, polyline, minIdx = 0) {
  let bestIdx = minIdx;
  let bestDist = Infinity;
  for (let i = minIdx; i < polyline.length; i++) {
    const d = calcDist(stationCoords, polyline[i]);
    if (d < bestDist) {
      bestDist = d;
      bestIdx = i;
    }
  }
  return { index: bestIdx, distance: bestDist };
}

function buildTrackAndStations(lineId, stationDefs, pathNodeIds) {
  // 軌道点列の作成
  const rawCoords = pathNodeIds.map(id => {
    const n = nodes.get(id);
    return [Number(n.lat.toFixed(6)), Number(n.lon.toFixed(6))];
  });
  const smoothedCoords = subdividePath(rawCoords, 80);

  // 各駅ノードの位置を特定して正確にスナップ
  let lastIdx = 0;
  const stationSnaps = stationDefs.map((def) => {
    const n = nodes.get(def.nodeId);
    const snap = snapStationToPolyline([n.lat, n.lon], smoothedCoords, lastIdx);
    lastIdx = snap.index;
    return {
      def,
      nodeLat: Number(n.lat.toFixed(6)),
      nodeLng: Number(n.lon.toFixed(6)),
      snapIndex: snap.index,
      snapCoords: smoothedCoords[snap.index],
    };
  });

  const stations = stationSnaps.map((s) => {
    const def = s.def;
    return {
      id: def.id,
      lineId,
      number: def.number,
      name: def.name,
      nameKana: def.nameKana,
      nameEn: def.nameEn,
      lat: s.snapCoords[0],
      lng: s.snapCoords[1],
      transfers: def.transfers,
      address: def.address,
      facilities: {
        elevator: true,
        restroom: true,
        multipurposeToilet: true,
        waitingRoom: false,
        ticketOffice: true,
      },
      stoppingTypes: def.stoppingTypes,
      isMajor: def.isMajor,
      platforms: def.platforms,
    };
  });

  // TrackSegments の生成
  const trackSegments = [];
  for (let i = 0; i < stations.length - 1; i++) {
    const fromSt = stations[i];
    const toSt = stations[i + 1];
    const startIdx = stationSnaps[i].snapIndex;
    const endIdx = stationSnaps[i + 1].snapIndex;

    let segCoords = smoothedCoords.slice(startIdx, endIdx + 1);
    if (segCoords.length < 2) {
      segCoords = [[fromSt.lat, fromSt.lng], [toSt.lat, toSt.lng]];
    } else {
      segCoords[0] = [fromSt.lat, fromSt.lng];
      segCoords[segCoords.length - 1] = [toSt.lat, toSt.lng];
    }

    trackSegments.push({
      fromStationId: fromSt.id,
      toStationId: toSt.id,
      fromName: fromSt.name,
      toName: toSt.name,
      coordinates: segCoords,
    });
  }

  return { stations, trackSegments, rawCoords: smoothedCoords };
}

// 軌道パスの計算
// 1. 池袋線: 池袋 -> 飯能 -> 西武秩父
const g1 = buildGraph([9477760, 11763511]);
const p1 = findPathBFS(g1, 7966718589, 3625336124); // 池袋 -> 飯能

const g2 = buildGraph([11763512, 1926311, 1926312, 11703136, 11703137]);
const p2 = findPathBFS(g2, 3625336124, 7966907930); // 飯能 -> 西武秩父
const ikebukuroPathNodes = [...p1, ...p2.slice(1)];

// 2. 有楽町線: 小竹向原 -> 練馬
const gy = buildGraph([10029924, 5486515, 10029925]);
const yurakuchoPathNodes = findPathBFS(gy, 7775797964, 3730686207);

console.log(`Ikebukuro path nodes: ${ikebukuroPathNodes.length}`);
console.log(`Yurakucho path nodes: ${yurakuchoPathNodes.length}`);

// ビルド
const ikebukuroData = buildTrackAndStations('seibu_ikebukuro', IKEBUKURO_STATION_DEFS, ikebukuroPathNodes);
const yurakuchoData = buildTrackAndStations('seibu_yurakucho', YURAKUCHO_STATION_DEFS, yurakuchoPathNodes);

// ファイル出力ヘルパー
function writeFiles(dir, prefix, lineId, data) {
  fs.mkdirSync(dir, { recursive: true });

  // stations.ts
  const stationsTs = `import type { Station } from '../../../types';

export const ${prefix}_STATIONS: Station[] = ${JSON.stringify(data.stations, null, 2)};
`;
  fs.writeFileSync(path.join(dir, 'stations.ts'), stationsTs, 'utf8');
  console.log(`Saved: ${dir}/stations.ts (${data.stations.length} stations)`);

  // trackGeometry.ts
  const trackTs = `import type { TrackSegment } from '../../../types';

export const ${prefix}_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(data.trackSegments, null, 2)};
`;
  fs.writeFileSync(path.join(dir, 'trackGeometry.ts'), trackTs, 'utf8');
  console.log(`Saved: ${dir}/trackGeometry.ts (${data.trackSegments.length} segments, ${data.rawCoords.length} track points)`);
}

writeFiles(
  path.resolve(__dirname, '../src/data/lines/seibu_ikebukuro'),
  'SEIBU_IKEBUKURO',
  'seibu_ikebukuro',
  ikebukuroData
);

writeFiles(
  path.resolve(__dirname, '../src/data/lines/seibu_yurakucho'),
  'SEIBU_YURAKUCHO',
  'seibu_yurakucho',
  yurakuchoData
);

console.log('\n✨ Station and Track files generation completed successfully!');
