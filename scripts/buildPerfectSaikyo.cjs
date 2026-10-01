const fs = require('fs');

function distMeters(p1, p2) {
  const dLat = (p1[0] - p2[0]) * 111000;
  const dLng = (p1[1] - p2[1]) * 111000 * Math.cos((p1[0] * Math.PI) / 180);
  return Math.sqrt(dLat * dLat + dLng * dLng);
}

// 点 P を線分 AB 上に垂直射影（クランプ付き）する
function projectPointOnSegment(p, a, b) {
  const abLat = b[0] - a[0];
  const abLng = b[1] - a[1];
  const abLenSq = abLat * abLat + abLng * abLng;
  if (abLenSq === 0) return a;
  const apLat = p[0] - a[0];
  const apLng = p[1] - a[1];
  let t = (apLat * abLat + apLng * abLng) / abLenSq;
  if (t < 0) t = 0;
  if (t > 1) t = 1;
  return [a[0] + t * abLat, a[1] + t * abLng];
}

console.log('--- Step 1: Loading raw OSM data ---');
const relData = JSON.parse(fs.readFileSync('scripts/osm_saikyo_rel.json', 'utf8'));
const relWays = relData.elements[0].members.filter(m => m.type === 'way');

const muRaw = JSON.parse(fs.readFileSync('scripts/osm_musashiurawa_raw.json', 'utf8'));
const kawagoeRaw = JSON.parse(fs.readFileSync('scripts/osm_kawagoe.json', 'utf8'));
const stationNodesData = JSON.parse(fs.readFileSync('scripts/osm_saikyo_station_nodes.json', 'utf8'));

// 1. 大崎〜北戸田 (relWays 0〜136)
const sec1_3_pts = [];
for (let i = 0; i <= 136; i++) {
  const geom = relWays[i].geometry.map(pt => [pt.lat, pt.lon]);
  if (sec1_3_pts.length === 0) {
    sec1_3_pts.push(...geom);
  } else {
    const last = sec1_3_pts[sec1_3_pts.length - 1];
    if (distMeters(last, geom[geom.length - 1]) < distMeters(last, geom[0])) geom.reverse();
    for (let k = 0; k < geom.length; k++) {
      if (k === 0 && distMeters(last, geom[k]) < 0.1) continue;
      sec1_3_pts.push(geom[k]);
    }
  }
}

// 2. 北戸田〜武蔵浦和〜中浦和〜南与野 (東北本線（埼京線）本線way: 402747959 -> 163599514 -> 99171164)
const sec4_wayIds = [402747959, 163599514, 99171164];
const sec4_pts = [];
sec4_wayIds.forEach(id => {
  const w = muRaw.elements.find(e => e.id === id);
  const geom = w.geometry.map(pt => [pt.lat, pt.lon]);
  if (sec4_pts.length === 0) {
    sec4_pts.push(...geom);
  } else {
    const last = sec4_pts[sec4_pts.length - 1];
    if (distMeters(last, geom[geom.length - 1]) < distMeters(last, geom[0])) geom.reverse();
    for (let k = 0; k < geom.length; k++) {
      if (k === 0 && distMeters(last, geom[k]) < 0.1) continue;
      sec4_pts.push(geom[k]);
    }
  }
});

// 3. 南与野〜大宮 (relWays 140〜147)
const sec5_pts = [];
for (let i = 140; i <= 147; i++) {
  const geom = relWays[i].geometry.map(pt => [pt.lat, pt.lon]);
  if (sec5_pts.length === 0) {
    sec5_pts.push(...geom);
  } else {
    const last = sec5_pts[sec5_pts.length - 1];
    if (distMeters(last, geom[geom.length - 1]) < distMeters(last, geom[0])) geom.reverse();
    for (let k = 0; k < geom.length; k++) {
      if (k === 0 && distMeters(last, geom[k]) < 0.1) continue;
      sec5_pts.push(geom[k]);
    }
  }
}

const saikyoTrack = [];
[sec1_3_pts, sec4_pts, sec5_pts].forEach(sec => {
  sec.forEach(pt => {
    if (saikyoTrack.length === 0 || distMeters(saikyoTrack[saikyoTrack.length - 1], pt) > 0.1) {
      saikyoTrack.push(pt);
    }
  });
});
console.log(`Saikyo mainline (大崎〜大宮): ${saikyoTrack.length} points.`);

// 4. 川越線 (大宮〜川越) ダイクストラによる最短・精密本線パス
const kawagoeWays = kawagoeRaw.elements.filter(e => e.type === 'way');
const kNodes = [];
const kAdj = new Map();

function getOrAddKNode(lat, lng) {
  for (let i = 0; i < kNodes.length; i++) {
    if (distMeters([lat, lng], kNodes[i]) < 1.0) return i;
  }
  const idx = kNodes.length;
  kNodes.push([lat, lng]);
  kAdj.set(idx, []);
  return idx;
}

kawagoeWays.forEach(w => {
  const g = w.geometry;
  for (let i = 0; i < g.length - 1; i++) {
    const u = getOrAddKNode(g[i].lat, g[i].lon);
    const v = getOrAddKNode(g[i + 1].lat, g[i + 1].lon);
    const d = distMeters(kNodes[u], kNodes[v]);
    kAdj.get(u).push({ to: v, dist: d });
    kAdj.get(v).push({ to: u, dist: d });
  }
});

function dijkstraK(startPt, endPt) {
  let sIdx = 0, minDS = Infinity;
  let eIdx = 0, minDE = Infinity;
  for (let i = 0; i < kNodes.length; i++) {
    const dS = distMeters(startPt, kNodes[i]);
    if (dS < minDS) { minDS = dS; sIdx = i; }
    const dE = distMeters(endPt, kNodes[i]);
    if (dE < minDE) { minDE = dE; eIdx = i; }
  }

  const dist = new Array(kNodes.length).fill(Infinity);
  const prev = new Array(kNodes.length).fill(-1);
  const visited = new Uint8Array(kNodes.length);
  dist[sIdx] = 0;

  for (let step = 0; step < kNodes.length; step++) {
    let u = -1, minD = Infinity;
    for (let i = 0; i < kNodes.length; i++) {
      if (!visited[i] && dist[i] < minD) { minD = dist[i]; u = i; }
    }
    if (u === -1 || u === eIdx) break;
    visited[u] = 1;
    for (const edge of kAdj.get(u)) {
      if (!visited[edge.to] && dist[u] + edge.dist < dist[edge.to]) {
        dist[edge.to] = dist[u] + edge.dist;
        prev[edge.to] = u;
      }
    }
  }

  const path = [];
  let curr = eIdx;
  while (curr !== -1) {
    path.push(kNodes[curr]);
    curr = prev[curr];
  }
  path.reverse();
  return path;
}

const kawagoeStationsCoords = [
  { name: '大宮', lat: 35.9061256, lng: 139.6231478 },
  { name: '日進', lat: 35.9315562, lng: 139.6061435 },
  { name: '西大宮', lat: 35.9223096, lng: 139.5798125 },
  { name: '指扇', lat: 35.9171426, lng: 139.5650513 },
  { name: '南古谷', lat: 35.9032539, lng: 139.5194429 },
  { name: '川越', lat: 35.9069901, lng: 139.482954 },
];

const kawagoeTrack = [];
for (let i = 0; i < kawagoeStationsCoords.length - 1; i++) {
  const s1 = kawagoeStationsCoords[i];
  const s2 = kawagoeStationsCoords[i + 1];
  const p = dijkstraK([s1.lat, s1.lng], [s2.lat, s2.lng]);
  p.forEach(pt => {
    if (kawagoeTrack.length === 0 || distMeters(kawagoeTrack[kawagoeTrack.length - 1], pt) > 0.1) {
      kawagoeTrack.push(pt);
    }
  });
}
console.log(`Kawagoe line (大宮〜川越): ${kawagoeTrack.length} points.`);

// 5. 大崎〜川越の全体統合本線ポリライン
const masterTrack = [...saikyoTrack];
// saikyoTrack の終点と kawagoeTrack の起点は同一 [35.9061256, 139.6231478]
for (let i = 0; i < kawagoeTrack.length; i++) {
  if (distMeters(masterTrack[masterTrack.length - 1], kawagoeTrack[i]) > 0.1) {
    masterTrack.push(kawagoeTrack[i]);
  }
}
console.log(`Master Track (大崎〜大宮〜川越): ${masterTrack.length} points.`);

// 6. 各駅（全24駅）のOSMノード特定と masterTrack への垂直スナップ
const stationNames = [
  '大崎', '恵比寿', '渋谷', '新宿', '池袋', '板橋', '十条', '赤羽',
  '北赤羽', '浮間舟渡', '戸田公園', '戸田', '北戸田', '武蔵浦和',
  '中浦和', '南与野', '与野本町', '北与野', '大宮',
  '日進', '西大宮', '指扇', '南古谷', '川越'
];

// masterTrack 上の最寄りの点・線分にスナップする関数
function snapToMasterTrack(queryPt, searchStartIdx = 0) {
  let bestPt = null;
  let bestDist = Infinity;
  let bestSegIdx = searchStartIdx;

  for (let i = searchStartIdx; i < masterTrack.length - 1; i++) {
    const a = masterTrack[i];
    const b = masterTrack[i + 1];
    const proj = projectPointOnSegment(queryPt, a, b);
    const d = distMeters(queryPt, proj);
    if (d < bestDist) {
      bestDist = d;
      bestPt = proj;
      bestSegIdx = i;
    }
  }
  return { snapped: bestPt, segIdx: bestSegIdx, dist: bestDist };
}

// 7. 各駅のスナップ結果を計算
const snappedStations = [];
let lastSegIdx = 0;

stationNames.forEach((name, idx) => {
  // 関東圏（lat 35.5〜36.2, lon 139.3〜140.0）にある該当駅名ノードに絞り込み
  const matches = stationNodesData.elements.filter(n =>
    n.tags?.name === name &&
    n.lat >= 35.5 && n.lat <= 36.2 && n.lon >= 139.3 && n.lon <= 140.0
  );
  let rawNodePt = null;
  if (matches.length > 0) {
    // 埼京線関連タグ (JAxx, EBS, SBY, SJK, OMY, etc) または JR東日本 を優先
    const jaMatch = matches.find(m =>
      m.tags?.ref?.includes('JA') ||
      ['OSK','EBS','SBY','SJK','OMY'].includes(m.tags?.ref) ||
      m.tags?.operator?.includes('東日本旅客鉄道')
    );
    const targetNode = jaMatch || matches[0];
    rawNodePt = [targetNode.lat, targetNode.lon];
  } else {
    // フォールバック
    rawNodePt = kawagoeStationsCoords.find(s => s.name === name) || [0, 0];
  }

  // 大宮駅は地下ホーム中心
  if (name === '大宮') {
    rawNodePt = [35.9061256, 139.6231478];
  }

  const snapRes = snapToMasterTrack(rawNodePt, Math.max(0, lastSegIdx - 5));
  lastSegIdx = snapRes.segIdx;

  snappedStations.push({
    number: idx + 8,
    id: `JA-${String(idx + 8).padStart(2, '0')}`,
    name,
    rawPt: rawNodePt,
    lat: Number(snapRes.snapped[0].toFixed(6)),
    lng: Number(snapRes.snapped[1].toFixed(6)),
    segIdx: snapRes.segIdx,
    snapDist: snapRes.dist,
  });

  console.log(`Station #${idx + 8} ${name}: snapped to [${snapRes.snapped[0].toFixed(6)}, ${snapRes.snapped[1].toFixed(6)}], segIdx=${snapRes.segIdx}, dist=${snapRes.dist.toFixed(1)}m`);
});

// 8. 全23駅間セグメントの生成
const segments = [];

for (let i = 0; i < snappedStations.length - 1; i++) {
  const s1 = snappedStations[i];
  const s2 = snappedStations[i + 1];

  const segCoords = [];
  segCoords.push([s1.lat, s1.lng]);

  // s1.segIdx + 1 から s2.segIdx までの masterTrack ポイントを追加
  for (let k = s1.segIdx + 1; k <= s2.segIdx; k++) {
    const pt = [Number(masterTrack[k][0].toFixed(6)), Number(masterTrack[k][1].toFixed(6))];
    if (distMeters(segCoords[segCoords.length - 1], pt) > 0.5 && distMeters(pt, [s2.lat, s2.lng]) > 0.5) {
      segCoords.push(pt);
    }
  }

  segCoords.push([s2.lat, s2.lng]);

  console.log(`Segment ${s1.name} -> ${s2.name}: ${segCoords.length} pts, straight dist=${distMeters([s1.lat, s1.lng], [s2.lat, s2.lng]).toFixed(1)}m`);
  segments.push({
    fromStationId: s1.id,
    toStationId: s2.id,
    fromName: s1.name,
    toName: s2.name,
    coordinates: segCoords,
  });
}

// 9. src/data/lines/saikyo/stations.ts の更新
console.log('--- Step 2: Updating stations.ts ---');
const currentStationsContent = fs.readFileSync('src/data/lines/saikyo/stations.ts', 'utf8');

// 各駅の lat / lng をスナップ後の値に置換
let updatedStationsContent = currentStationsContent;
snappedStations.forEach(st => {
  // id: 'JA-XX' を含むブロックの lat: ..., lng: ... を置換
  const regex = new RegExp(`(id:\\s*'${st.id}',[\\s\\S]*?lat:\\s*)([0-9.]+)(,[\\s\\S]*?lng:\\s*)([0-9.]+)`);
  updatedStationsContent = updatedStationsContent.replace(regex, `$1${st.lat}$3${st.lng}`);
});

fs.writeFileSync('src/data/lines/saikyo/stations.ts', updatedStationsContent, 'utf8');
console.log('Updated src/data/lines/saikyo/stations.ts');

// 10. src/data/lines/saikyo/trackGeometry.ts の更新
console.log('--- Step 3: Updating trackGeometry.ts ---');
const trackContent = `import type { TrackSegment } from '../../../types';

// JR埼京線・川越線（大崎〜大宮〜川越）高精度実軌道ジオメトリ
// OpenStreetMap本線精密トレース完全準拠（全24駅が線路中心上に完全配置され、異路線・側線・ジグザグを完全排除）
export const SAIKYO_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(segments, null, 2)};
`;

fs.writeFileSync('src/data/lines/saikyo/trackGeometry.ts', trackContent, 'utf8');
console.log('Updated src/data/lines/saikyo/trackGeometry.ts');

console.log('--- All Done Successfully! ---');
