import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { calculateActiveTrains } from '../src/services/trainSimulation';
import { getThroughChainTrips, timeStringToSeconds } from '../src/data/timetableData';
import { loadLinesTimetables } from '../src/data/timetableLoader';
import type { LineId, TimetableTrip } from '../src/types';

console.log('=== 🚆 東北13鉄道線＋BRT2路線（計15路線）直通・代行バス・BRT分岐 総合検証テスト ===\n');

const TARGET_LINES: LineId[] = [
  'jr_senzan',
  'sendai_airport',
  'jr_kitakami',
  'jr_ofunato',
  'jr_ofunato_brt',
  'jr_kesennuma',
  'jr_kesennuma_brt',
  'jr_kamaishi',
  'jr_tazawako',
  'jr_yamada',
  'jr_hachinohe',
  'jr_ominato',
  'jr_tsugaru',
  'jr_gono',
  'jr_oga',
  'jr_tohoku_fukushima_sendai',
  'jr_ou_fukushima_shinjo',
  'jr_ishinomaki',
  'jr_tohoku_ichinoseki_morioka',
  'aoimori',
  'jr_ou_akita_aomori',
];

function loadRawTrips(lineId: LineId): TimetableTrip[] {
  const filePath = path.resolve(process.cwd(), `src/data/lines/${lineId}/globalTimetable.json`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as TimetableTrip[];
}

const rawMap = new Map<LineId, TimetableTrip[]>(TARGET_LINES.map((id) => [id, loadRawTrips(id)]));

// 1. 全境界直通リンク整合性・双方向対称性・時刻同期チェック
const boundaryPairs: Array<[LineId, LineId, string, number]> = [
  ['jr_tohoku_fukushima_sendai', 'sendai_airport', '名取 (仙台->空港)', 88],
  ['sendai_airport', 'jr_tohoku_fukushima_sendai', '名取 (空港->仙台)', 88],
  ['jr_senzan', 'jr_ou_fukushima_shinjo', '羽前千歳 (仙台->山形)', 36],
  ['jr_ou_fukushima_shinjo', 'jr_senzan', '羽前千歳 (山形->仙台)', 36],
  ['jr_ishinomaki', 'jr_kesennuma', '前谷地 (小牛田->柳津)', 6],
  ['jr_kesennuma', 'jr_ishinomaki', '前谷地 (柳津->小牛田)', 8],
  ['jr_ofunato_brt', 'jr_kesennuma_brt', '気仙沼 (大船渡BRT->気仙沼BRT)', 1],
  ['jr_tohoku_ichinoseki_morioka', 'jr_kamaishi', '花巻 (盛岡->釜石)', 11],
  ['jr_kamaishi', 'jr_tohoku_ichinoseki_morioka', '花巻 (釜石->盛岡)', 13],
  ['aoimori', 'jr_ominato', '野辺地 (八戸->大湊)', 6],
  ['jr_ominato', 'aoimori', '野辺地 (大湊->八戸)', 6],
  ['jr_ou_akita_aomori', 'jr_gono', '東能代/川部 (奥羽->五能)', 34],
  ['jr_gono', 'jr_ou_akita_aomori', '東能代/川部 (五能->奥羽)', 30],
  ['jr_ou_akita_aomori', 'jr_oga', '追分 (秋田->男鹿)', 29],
  ['jr_oga', 'jr_ou_akita_aomori', '追分 (男鹿->秋田)', 30],
  ['jr_tsugaru', 'jr_ou_akita_aomori', '青森 (津軽->津軽新城)', 2],
];

console.log('--- 1. 境界リンク整合性・時刻同期検証 ---');
for (const [lineA, lineB, label, expectedCount] of boundaryPairs) {
  const tripsA = rawMap.get(lineA)!;
  const tripsB = rawMap.get(lineB)!;
  const mapB = new Map(tripsB.map((t) => [t.tripId, t]));

  const linked = tripsA.filter((t) => t.throughLineId === lineB);
  assert.equal(linked.length, expectedCount, `${label}: 期待本数 ${expectedCount} != ${linked.length}`);

  for (const tA of linked) {
    assert.ok(tA.throughTripId, `${label}: throughTripId 未設定 (${tA.tripId})`);
    const tB = mapB.get(tA.throughTripId);
    assert.ok(tB, `${label}: 接続先不在 (${tA.tripId} -> ${tA.throughTripId})`);
    assert.equal(tB.prevTripId, tA.tripId, `${label}: 双方向非対称 (${tA.tripId} <-> ${tB.tripId})`);
  }
  console.log(`  ✅ ${label.padEnd(28, ' ')} : ${String(linked.length).padStart(2, ' ')} 便 (双方向リンク・整合性 正常)`);
}

// 2. リゾートしらかみ1号 3線貫通チェーン (秋田 -> 東能代 -> 五能線 -> 川部 -> 青森) 検証
await loadLinesTimetables(TARGET_LINES);

const rs1Start = rawMap
  .get('jr_ou_akita_aomori')!
  .find((t) => !t.isHoliday && (t.trainName || '').includes('リゾートしらかみ1号') && t.originStationId === 'OAA-01');
assert.ok(rs1Start, '平日 リゾートしらかみ1号 (秋田発) が見つかりません');

const rs1Chain = getThroughChainTrips(rs1Start.tripId);
const rs1Lines = rs1Chain.map((t) => t.lineId);
assert.deepEqual(
  rs1Lines,
  ['jr_ou_akita_aomori', 'jr_gono', 'jr_ou_akita_aomori'],
  `リゾートしらかみ1号の3線リレー構成が不正: ${JSON.stringify(rs1Lines)}`
);
console.log(`\n  ✅ リゾートしらかみ1号 3線貫通チェーン: ${rs1Lines.join(' -> ')}`);

// 3. 代行バス（kitakami / jr_yamada / tsugaru）実運行検証
console.log('\n--- 2. 代行バス・BRT多系統実運行検証 ---');

const busTests: Array<{ line: LineId; time: string; desc: string }> = [
  { line: 'jr_yamada', time: '09:30:00', desc: '山田線 (盛岡～宮古 代行バス)' },
  { line: 'jr_tsugaru', time: '10:30:00', desc: '津軽線 (蟹田～三厩 代行バス)' },
  { line: 'jr_kitakami', time: '09:50:00', desc: '北上線 (ほっとゆだ～横手 代行バス)' },
];

for (const bt of busTests) {
  const trips = rawMap.get(bt.line)!.filter((t) => !t.isHoliday && t.trainType === 'substitution_bus');
  assert.ok(trips.length >= 4, `${bt.desc}: 代行バス便数が不足 (${trips.length})`);
  // 実際に走行中となる時間帯の代表1便を確認
  const sample = trips[0];
  const midTime = sample.stops[Math.min(1, sample.stops.length - 1)].departureTime;
  const active = calculateActiveTrains({
    currentSec: timeStringToSeconds(midTime),
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: [bt.line],
  });
  const activeBus = active.filter((t) => t.trainType === 'substitution_bus');
  assert.ok(activeBus.length >= 1, `${bt.desc} @ ${midTime}: 代行バスがシミュレーション上に未出現`);
  console.log(`  ✅ ${bt.desc}: 総代行便=${trips.length}便, @${midTime} 稼働=${activeBus.length}本`);
}

// 4. BRT多系統分岐（気仙沼線BRT 市立病院経由 / 大船渡線BRT 上鹿折・陸前矢作・快速）検証
const kBrtTrips = rawMap.get('jr_kesennuma_brt')!;
const kHospTrips = kBrtTrips.filter((t) => t.stops.some((s) => s.stationId === 'KBRT-51'));
const kAkaiwaTrips = kBrtTrips.filter((t) => t.stops.some((s) => s.stationId === 'KBRT-21'));
assert.ok(kHospTrips.length >= 2, '気仙沼線BRT 気仙沼市立病院経由便が不足');
assert.ok(kAkaiwaTrips.length >= 20, '気仙沼線BRT 赤岩港経由便が不足');
// 同一便内に 赤岩港(KBRT-21) と 市立病院(KBRT-51) が混在しないこと
for (const tr of kBrtTrips) {
  const hasAkaiwa = tr.stops.some((s) => s.stationId === 'KBRT-21');
  const hasHosp = tr.stops.some((s) => s.stationId === 'KBRT-51');
  assert.ok(!(hasAkaiwa && hasHosp), `気仙沼線BRT ${tr.tripId} に赤岩港と市立病院が混在`);
}
console.log(`  ✅ 気仙沼線BRT 分岐分離: 赤岩港経由=${kAkaiwaTrips.length}便 / 市立病院経由=${kHospTrips.length}便 (混在ゼロ)`);

const oBrtTrips = rawMap.get('jr_ofunato_brt')!;
const oKamiTrips = oBrtTrips.filter((t) => t.stops.some((s) => s.stationId === 'OBRT-51'));
const oYahaTrips = oBrtTrips.filter((t) => t.stops.some((s) => s.stationId === 'OBRT-63'));
const oRapidTrips = oBrtTrips.filter((t) => t.trainType === 'rapid');
assert.ok(oKamiTrips.length >= 4, '大船渡線BRT 上鹿折支線便が不足');
assert.ok(oYahaTrips.length >= 10, '大船渡線BRT 陸前矢作支線便が不足');
assert.ok(oRapidTrips.length >= 10, '大船渡線BRT 快速便が不足');
console.log(`  ✅ 大船渡線BRT 系統網羅: 上鹿折支線=${oKamiTrips.length}便 / 陸前矢作支線=${oYahaTrips.length}便 / BRT快速=${oRapidTrips.length}便`);

// 5. 気仙沼線BRT と 仙山線 のリアルタイム走行検証
const senzanActive = calculateActiveTrains({
  currentSec: timeStringToSeconds('08:15:00'),
  isHoliday: false,
  globalDelayMinutes: 0,
  randomDelays: {},
  isPlaying: true,
  speedMultiplier: 1,
  selectedLineIds: ['jr_senzan', 'sendai_airport', 'jr_kesennuma_brt', 'jr_ofunato_brt'],
});
assert.ok(senzanActive.some((t) => t.lineId === 'jr_senzan'), '08:15時点で仙山線列車が稼働していること');
assert.ok(senzanActive.some((t) => t.lineId === 'sendai_airport'), '08:15時点で仙台空港アクセス線が稼働していること');
assert.ok(senzanActive.some((t) => t.lineId === 'jr_kesennuma_brt'), '08:15時点で気仙沼線BRTが稼働していること');
assert.ok(senzanActive.some((t) => t.lineId === 'jr_ofunato_brt'), '08:15時点で大船渡線BRTが稼働していること');
console.log(`  ✅ 08:15:00 同時シミュレーション稼働本数 (仙山・仙台空港・両BRT): ${senzanActive.length} 本`);

console.log('\n🎉 東北15路線の全検証テストに合格しました！');
