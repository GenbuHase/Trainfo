// ROUTE_EXPANSION_PLAYBOOK.md Phase 8 監査: 白新線・羽越本線 実軌道 dwell 監査
// 監査基準 (§6):
//   1. endpoint  > 50m      … セグメント端点 vs 駅座標の誤差
//   2. ratio     > 1.6      … セグメント実長 / 首尾直線距離
//   3. sharp     > 140°     … 連続セグメント間の急旋回
//   4. gap       > 10m      … 隣接セグメントの端点間隙
//   5. 駅順序の単調性 (fromStationId/toStationId 準拠・逆行なし)
//   6. 境界同名駅の座標整合 (新潟/新津/新発田/秋田)
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const vm = require('vm');

function loadExports(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const sanitized = raw.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '');
  const js = ts.transpileModule(sanitized, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const sandbox = { exports: {}, require: () => ({}) };
  vm.createContext(sandbox);
  vm.runInContext(js, sandbox);
  return sandbox.exports;
}

const R = 6371000;
function dM(p1, p2) {
  const dvLat = (p1[0] - p2[0]) * Math.PI / 180;
  const dvLon = (p1[1] - p2[1]) * Math.PI / 180;
  const a = Math.sin(dvLat / 2) ** 2 +
    Math.cos(p1[0] * Math.PI / 180) * Math.cos(p2[0] * Math.PI / 180) * Math.sin(dvLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function bearing(p1, p2) {
  const lat1 = p1[0] * Math.PI / 180, lat2 = p2[0] * Math.PI / 180;
  const dLon = (p2[1] - p1[1]) * Math.PI / 180;
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}
function polylineLen(coords) {
  let L = 0;
  for (let i = 1; i < coords.length; i++) L += dM(coords[i - 1], coords[i]);
  return L;
}

function auditInvocationOf(data) {
  const stations = Object.values(data).find(v => Array.isArray(v) && v.length && v[0].id);
  return stations;
}

const persisted = {
  hakushin: auditInvocationOf(loadExports(path.resolve('src/data/lines/hakushin/stations.ts'))),
  uetsu_main: auditInvocationOf(loadExports(path.resolve('src/data/lines/uetsu_main/stations.ts'))),
};
const persistT = {
  hakushin: Object.values(loadExports(path.resolve('src/data/lines/hakushin/trackGeometry.ts'))).find(v => Array.isArray(v)),
  uetsu_main: Object.values(loadExports(path.resolve('src/data/lines/uetsu_main/trackGeometry.ts'))).find(v => Array.isArray(v)),
};
const f1 = audit('hakushin', 'JR白新線', persisted.hakushin, persistT.hakushin);
const f2 = audit('uetsu_main', 'JR羽越本線', persisted.uetsu_main, persistT.uetsu_main);

function audit(lineId, name, stations, segments) {
  console.log(`\n================ ${name} (${lineId}) 監査 ================`);
  const failures = [];

  // 駅ID正規性
  const stMap = new Map(stations.map(s => [s.id, s]));
  console.log(`  駅数: ${stations.length} / セグメント数: ${segments.length}`);
  if (stations.length !== segments.length + 1) {
    failures.push(`駅数=セグメント数+1 不成立 (${stations.length} vs ${segments.length + 1})`);
  }

  let total = 0;
  const stationMismatch = { start: 0, end: 0 };
  const ratios = [];
  const gaps = [];
  const sharps = [];
  const bearings = [];
  segments.forEach((seg, i) => {
    const c = seg.coordinates;
    if (!c || c.length < 2) { failures.push(`${seg.segmentId}: coordinates 不正`); return; }
    const chord = dM(c[0], c[c.length - 1]);
    const len = polylineLen(c);
    total += len;
    ratios.push(chord > 0 ? len / chord : 1);

    // 1. endpoint (<=50m)
    const sF = stMap.get(seg.fromStationId), sT = stMap.get(seg.toStationId);
    if (!sF || !sT) failures.push(`${seg.segmentId}: 該当駅なし (${seg.fromStationId}/${seg.toStationId})`);
    else {
      const e1 = dM(c[0], [sF.lat, sF.lng]);
      const e2 = dM(c[c.length - 1], [sT.lat, sT.lng]);
      if (e1 > 50) { failures.push(`${seg.segmentId} 起点端点誤差 ${e1.toFixed(1)}m > 50m`); stationMismatch.start++; }
      if (e2 > 50) { failures.push(`${seg.segmentId} 終点端点誤差 ${e2.toFixed(1)}m > 50m`); stationMismatch.end++; }
    }

    // 2. ratio (>1.6)
    if (chord > 10 && len / chord > 1.6) failures.push(`${seg.segmentId} ratio ${(len / chord).toFixed(2)} > 1.6`);

    // 方位/急旋回(>140°)
    for (let j = 1; j < c.length - 1; j++) {
      const b1 = bearing(c[j - 1], c[j]);
      const b2 = bearing(c[j], c[j + 1]);
      let turn = Math.abs(b2 - b1);
      if (turn > 180) turn = 360 - turn;
      bearings.push({ turn, seg: seg.segmentId, j });
    }

    // 4. gap (>10m)
    if (i + 1 < segments.length) {
      const nxt = segments[i + 1];
      const g = dM(c[c.length - 1], nxt.coordinates[0]);
      gaps.push(g);
      if (g > 10) failures.push(`${seg.segmentId} -> ${nxt.segmentId} 隙間 ${g.toFixed(2)}m > 10m`);
    }
  });

  // 3. sharp (>140°)
  for (const b of bearings) if (b.turn > 140) sharps.push(b);
  if (sharps.length) failures.push(`急旋回 ${sharps.length} 箇所 > 140° (最初: ${sharps[0].seg}#${sharps[0].j} ${sharps[0].turn.toFixed(1)}°)`);

  // 5. 順序単調性
  const order = stations.map(s => s.id);
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    if (seg.fromStationId !== order[i] || seg.toStationId !== order[i + 1]) {
      failures.push(`セグメント順序不整合 #${i}: ${seg.segmentId} vs ${order[i]}->${order[i + 1]}`);
    }
  }

  const rmax = Math.max(...ratios).toFixed(3), rmin = Math.min(...ratios).toFixed(3);
  console.log(`  総延長: ${(total / 1000).toFixed(2)} km / ratio: ${rmin}〜${rmax}`);
  console.log(`  隣接端点隙間: 最大 ${Math.max(...gaps).toFixed(4)} m`);
  console.log(`  sharp>140°: ${sharps.length} 箇所 / endpoint>50m: ${stationMismatch.start + stationMismatch.end} 件`);
  console.log(failures.length ? `  ❌ FAIL: ${failures.length} 件\n${failures.map(f => '    - ' + f).join('\n')}` : '  ✅ PASS: 全監査基準クリア (endpoint≤50m / ratio≤1.6 / sharp≤140° / gap≤10m / 順序整合)');
  return failures;
}

// 6. 境界同名駅座標整合
console.log('\n================ 境界同名駅座標整合 ================');
const boundaryPairs = [
  ['新潟', 'hakushin', 'shinetsu_naoetsu_niigata'],
  ['新津', 'uetsu_main', 'banetsu_west'],
  ['新発田', 'uetsu_main', 'hakushin'],
  ['秋田', 'uetsu_main', 'akita_shinkansen'],
];
const lineData = {
  hakushin: loadExports(path.resolve('src/data/lines/hakushin/stations.ts')),
  uetsu_main: loadExports(path.resolve('src/data/lines/uetsu_main/stations.ts')),
  shinetsu_naoetsu_niigata: loadExports(path.resolve('src/data/lines/shinetsu_naoetsu_niigata/stations.ts')),
  banetsu_west: loadExports(path.resolve('src/data/lines/banetsu_west/stations.ts')),
  akita_shinkansen: loadExports(path.resolve('src/data/lines/akita_shinkansen/stations.ts')),
};
for (const [name, a, b] of boundaryPairs) {
  const fa = Object.values(lineData[a]).find(v => Array.isArray(v));
  const fb = Object.values(lineData[b]).find(v => Array.isArray(v));
  const sa = fa.find(s => s.name === name), sb = fb.find(s => s.name === name);
  if (!sa || !sb) { console.log(`  ${name}: 片側未存在 (${a}:${!!sa} / ${b}:${!!sb})`); continue; }
  const d = dM([sa.lat, sa.lng], [sb.lat, sb.lng]);
  console.log(`  ${name}: ${a}(${sa.id}) ↔ ${b}(${sb.id}) = ${d.toFixed(4)} m ${d <= 50 ? '✅' : '⚠️'}`);
}

process.exit(f1.length + f2.length ? 1 : 0);
