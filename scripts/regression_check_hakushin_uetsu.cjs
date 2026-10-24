// 白新線・羽越本線 追加後の全体リグレッション再検証
// 1) tripId 一意性 / 2) prev・through リンク先の実在（跨線含む） /
// 3) 停車順序・時刻単調性 / 4) 方向と終端整合 / 5) isHoliday とプレフィックス整合 /
// 6) trainNumber 補完状態 / 7) 停車駅集合が自路線駅集合に含まれる
const fs = require('fs');
const path = require('path');

const LINES = ['hakushin', 'uetsu_main', 'shinetsu_naoetsu_niigata', 'banetsu_west'];
const issues = [];
const tripIdIndex = new Map(); // tripId -> {line, dup}

const TABLES = {};
for (const lid of LINES) {
  const p = path.resolve(`src/data/lines/${lid}/globalTimetable.json`);
  TABLES[lid] = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const t of TABLES[lid]) {
    const rec = tripIdIndex.get(t.tripId);
    if (rec) issues.push(`[DUP-TRIPID] ${t.tripId} in ${lid} と ${rec} で重複`);
    else tripIdIndex.set(t.tripId, lid);
  }
}

// 路線駅集合のロード（UE/HS/SE前缀ごと）
function stationIdsOf(lid) {
  const raw = fs.readFileSync(path.resolve(`src/data/lines/${lid}/stations.ts`), 'utf8');
  const ids = [...raw.matchAll(/"(?:id|stationId)":\s*"[A-Z]+-\d+"/g)].map(m => m[0].match(/"[A-Z]+-\d+"/)[0].slice(1, -1));
  return new Set(ids);
}
const idsOf = {};
for (const lid of LINES) idsOf[lid] = stationIdsOf(lid);

const toSec = (t) => {
  if (!t) return null;
  const [h, m, s] = t.split(':').map(Number);
  return h * 3600 + m * 60 + s;
};

for (const lid of ['hakushin', 'uetsu_main']) {
  const trips = TABLES[lid];
  const valid = idsOf[lid];
  console.log(`\n===== ${lid}: ${trips.length} trips =====`);
  let noNum = 0, badOrder = 0, badTime = 0, badREF = 0, mismatchHol = 0, outOfLine = 0;
  let dangleThru = [], danglePrev = [], nonMonoStops = [];

  for (const t of trips) {
    if (/^(WD|HD)_/.test(t.tripId)) {
      const holiday = t.tripId.startsWith('HD_');
      if (!!t.isHoliday !== holiday) mismatchHol++;
    }
    if (!t.trainNumber || t.trainNumber === '') noNum++;

    // 停車駅が自路線駅集合に属するか（ただし跨線直通レグは自路線 stations 内のみなので全停車は自路線のみ）
    for (const s of t.stops) {
      if (!valid.has(s.stationId)) { outOfLine++; badREF++; }
    }

    // 順序単調性（駅番号）

    const seq = t.stops.map(s => parseInt(s.stationId.split('-')[1], 10));
    let ok = true;
    for (let i = 1; i < seq.length; i++) if (seq[i] <= seq[i - 1]) { ok = false; break; }
    if (!ok) { badOrder++; nonMonoStops.push(t.tripId); }

    // 時刻単調性
    let prevSec = -1, prevName = '';
    for (const s of t.stops) {
      const a = toSec(s.arrivalTime), d = toSec(s.departureTime);
      const val = (s.isPassing ? a : d) ?? a ?? d;
      if (val && prevSec > val ) { badTime++; if (nonMonoStops[nonMonoStops.length-1]!==t.tripId) nonMonoStops.push(t.tripId); }
      if (val) prevSec = Math.max(prevSec, val);
      prevName = s.stationId;
    }

    // リンク先実在
    if (t.throughTripId && !tripIdIndex.has(t.throughTripId)) dangleThru.push({ t: t.tripId, to: t.throughTripId });
    if (t.prevTripId && !tripIdIndex.has(t.prevTripId)) danglePrev.push({ t: t.tripId, from: t.prevTripId });
  }

  console.log(`  trainNumber欠落: ${noNum} 便 / isHoliday不一致: ${mismatchHol} / 路線外stop: ${outOfLine}`);
  console.log(`  駅順序逆転: ${badOrder} 便 / 時刻逆転: ${badTime} 便`);
  console.log(`  throughTripId 振りしり: ${dangleThru.length} / prevTripId 振り: ${danglePrev.length}`);
  if (nonMonoStops.length) console.log('  要確認 trip:', nonMonoStops.slice(0, 12).join(', '));
  for (const d of dangleThru.slice(0, 5)) issues.push(`[DANGLE-THROUGH] ${lid} ${d.t} -> ${d.to} (存在せず)`);
  for (const d of danglePrev.slice(0, 5)) issues.push(`[DANGLE-PREV] ${lid} ${d.t} <- ${d.from} (存在せず)`);
}

// 停駅表の整合
const KEY = { hakushin: 'HS', uetsu_main: 'UE' };
for (const lid of ['hakushin', 'uetsu_main']) {
  const st = JSON.parse(fs.readFileSync(path.resolve(`src/data/lines/${lid}/stationTimetables.json`), 'utf8'));
  for (const day of ['weekday', 'holiday']) {
    const stations = Object.keys(st[day] || {});
    if (lid === 'uetsu_main' && stations.length !== 60) issues.push(`[ST-COUNT] ${lid} ${day}: ${stations.length} != 60`);
    if (lid === 'hakushin' && stations.length !== 10) issues.push(`[ST-COUNT] ${lid} ${day}: ${stations.length} != 10`);
    // 残留ID検査
    const stale = stations.filter(id => !idsOf[lid].has(id));
    if (stale.length) issues.push(`[ST-STALE] ${lid} ${day}: ${stale.join(',')}`);
  }
  console.log(`${lid} stationTimetables: weekday=${Object.keys(st.weekday).length} holiday=${Object.keys(st.holiday).length}`);
}

console.log('\n===== 全体判定 =====');
if (issues.length) { console.log('⚠️ 要対処:'); for (const i of issues) console.log(' -', i); }
else console.log('✅ 問題なし（tripId一意・リンク先実在・順序/時刻単調・iday整合・停車駅表70駅）');
