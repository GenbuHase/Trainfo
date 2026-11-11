import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { calculateActiveTrains } from '../src/services/trainSimulation';
import { getThroughChainTrips, timeStringToSeconds } from '../src/data/timetableData';
import { loadLinesTimetables } from '../src/data/timetableLoader';
import type { ActiveTrain, LineId, TimetableTrip } from '../src/types';

console.log('=== 🚆 仙石線・仙石東北ライン・石巻線・陸羽東西線 直通・代行バス・通過駅 総合検証テスト ===\n');

const TARGET_LINES: LineId[] = [
  'tohoku_sendai_ichinoseki',
  'senseki_tohoku',
  'senseki',
  'ishinomaki',
  'rikuu_east',
  'rikuu_west',
  'uetsu_main',
];

function loadRawTrips(lineId: LineId): TimetableTrip[] {
  const filePath = path.resolve(process.cwd(), `src/data/lines/${lineId}/globalTimetable.json`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as TimetableTrip[];
}

const rawMap = new Map<LineId, TimetableTrip[]>(TARGET_LINES.map((id) => [id, loadRawTrips(id)]));

// 1. 全7境界・14方向のリンク整合性・双方向対称性・時刻同期チェック
const boundaryPairs: Array<[LineId, LineId, string, number]> = [
  ['tohoku_sendai_ichinoseki', 'senseki_tohoku', '塩釜 (下り)', 28],
  ['senseki_tohoku', 'tohoku_sendai_ichinoseki', '塩釜 (上り)', 28],
  ['senseki_tohoku', 'senseki', '高城町 (下り)', 28],
  ['senseki', 'senseki_tohoku', '高城町 (上り)', 28],
  ['senseki', 'ishinomaki', '石巻 (下り女川直通)', 2],
  ['ishinomaki', 'senseki', '石巻 (上り仙台直通)', 2],
  ['tohoku_sendai_ichinoseki', 'ishinomaki', '小牛田 (風っこ下り)', 2],
  ['ishinomaki', 'tohoku_sendai_ichinoseki', '小牛田 (風っこ上り)', 2],
  ['tohoku_sendai_ichinoseki', 'rikuu_east', '小牛田 (湯けむり下り)', 1],
  ['rikuu_east', 'tohoku_sendai_ichinoseki', '小牛田 (湯けむり上り)', 1],
  ['ishinomaki', 'rikuu_east', '小牛田 (石巻->古川)', 2],
  ['rikuu_west', 'uetsu_main', '余目 (下り酒田直通)', 8],
  ['uetsu_main', 'rikuu_west', '余目 (上り新庄直通)', 8],
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

    const lastA = tA.stops[tA.stops.length - 1];
    const firstB = tB.stops[0];
    assert.equal(lastA.arrivalTime, firstB.arrivalTime, `${label}: 境界着時刻不一致`);
    assert.equal(lastA.departureTime, firstB.departureTime, `${label}: 境界発時刻不一致`);
  }
  console.log(`  ✅ ${label.padEnd(20, ' ')} : ${String(linked.length).padStart(2, ' ')} 便 (リンク・時刻同期 正常)`);
}

// 2. 4線貫通チェーン（女川直通 仙石東北ライン）検証
const stMap = new Map(rawMap.get('senseki_tohoku')!.map((t) => [t.tripId, t]));
const ssMap = new Map(rawMap.get('senseki')!.map((t) => [t.tripId, t]));
const isMap = new Map(rawMap.get('ishinomaki')!.map((t) => [t.tripId, t]));

const fourLineOutbound = rawMap.get('tohoku_sendai_ichinoseki')!.filter((t1) => {
  if (t1.throughLineId !== 'senseki_tohoku' || !t1.throughTripId) return false;
  const t2 = stMap.get(t1.throughTripId);
  if (!t2 || t2.throughLineId !== 'senseki' || !t2.throughTripId) return false;
  const t3 = ssMap.get(t2.throughTripId);
  if (!t3 || t3.throughLineId !== 'ishinomaki' || !t3.throughTripId) return false;
  return isMap.has(t3.throughTripId);
});
assert.equal(fourLineOutbound.length, 2, '仙台->塩釜->高城町->石巻->女川の4線貫通便数が2本(平休)であること');
console.log(`\n  ✅ 4線貫通チェーン (東北本線 -> 仙石東北ライン -> 仙石線 -> 石巻線): ${fourLineOutbound.length} 便検出`);

// 3. オンデマンド読み込み後の getThroughChainTrips による全直通路線自動抽出チェック
await loadLinesTimetables(TARGET_LINES);

const chainSample = fourLineOutbound[0];
const fullChain = getThroughChainTrips(chainSample.tripId);
const chainLineIds = Array.from(new Set(fullChain.map((t) => t.lineId)));
assert.deepEqual(
  chainLineIds,
  ['tohoku_sendai_ichinoseki', 'senseki_tohoku', 'senseki', 'ishinomaki'],
  `getThroughChainTrips の展開路線順序が不正: ${JSON.stringify(chainLineIds)}`
);
console.log(`  ✅ getThroughChainTrips 自動展開対象路線: ${chainLineIds.join(' -> ')}`);

// 4. シミュレーション時系列ハンドオーバー検証（5530D 女川->仙台 4線リレー）
console.log('\n--- 2. シミュレーション時系列ハンドオーバー＆特殊系統検証 (平日ダイヤ) ---');

const isOnagawaSample = rawMap.get('ishinomaki')!.find((t) => !t.isHoliday && t.trainNumber === '5530D');
assert.ok(isOnagawaSample, '平日 5530D (女川発 仙台行) が石巻線に見つかりません');
const ss5530 = ssMap.get(isOnagawaSample.throughTripId!)!;
const st5530 = stMap.get(ss5530.throughTripId!)!;
const tsi5530 = rawMap.get('tohoku_sendai_ichinoseki')!.find((t) => t.tripId === st5530.throughTripId!)!;

const relaySteps: Array<{ sec: string; trip: TimetableTrip; expectedLine: LineId; desc: string }> = [
  { sec: '06:05:00', trip: isOnagawaSample, expectedLine: 'ishinomaki', desc: '女川〜石巻 (ishinomaki)' },
  { sec: '06:50:00', trip: ss5530, expectedLine: 'senseki', desc: '石巻〜高城町 (senseki)' },
  { sec: '07:08:00', trip: st5530, expectedLine: 'senseki_tohoku', desc: '高城町〜塩釜 連絡線 (senseki_tohoku)' },
  { sec: '07:20:00', trip: tsi5530, expectedLine: 'tohoku_sendai_ichinoseki', desc: '塩釜〜仙台 (tohoku_sendai_ichinoseki)' },
];

for (const step of relaySteps) {
  const active = calculateActiveTrains({
    currentSec: timeStringToSeconds(step.sec),
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['ishinomaki', 'senseki', 'senseki_tohoku', 'tohoku_sendai_ichinoseki'],
  });
  const hit = active.find((t) => t.tripId === step.trip.tripId);
  assert.ok(hit, `5530D が ${step.sec} (${step.desc}) で非アクティブ`);
  assert.equal(hit.lineId, step.expectedLine);
  assert.equal(hit.customDestination, '仙台', '4線貫通中の最終行先が仙台として保持されていること');
  console.log(`  ✅ 5530D @ ${step.sec} [${step.desc}] -> orig=${hit.customOrigin || hit.originStationId}, dest=${hit.customDestination}`);
}

// 5. 陸羽東線 代行バス (substitution_bus) 運行検証
const activeBus = calculateActiveTrains({
  currentSec: timeStringToSeconds('10:05:00'),
  isHoliday: false,
  globalDelayMinutes: 0,
  randomDelays: {},
  isPlaying: true,
  speedMultiplier: 1,
  selectedLineIds: ['rikuu_east'],
});
const busTrains = activeBus.filter((t) => t.trainType === 'substitution_bus');
const railTrains = activeBus.filter((t) => t.trainType === 'regular');
assert.ok(busTrains.length >= 1, '10:05時点で陸羽東線の代行バスが運行中であること');
console.log(`  ✅ 陸羽東線 @ 10:05:00: 列車=${railTrains.length}本 / 代行バス=${busTrains.length}本`);

// 6. 陸羽西線 全10駅のうち 羽前前波・高屋 が全列車通過扱いであること
const rwTrips = rawMap.get('rikuu_west')!;
for (const tr of rwTrips) {
  for (const passId of ['RW-03', 'RW-06']) {
    const stStop = tr.stops.find((s) => s.stationId === passId);
    if (stStop) {
      assert.equal(stStop.isPassing, true, `陸羽西線 ${tr.tripId} が ${passId} に誤って停車扱いになっている`);
    }
  }
}
console.log(`  ✅ 陸羽西線: 羽前前波(RW-03)・高屋(RW-06)の全${rwTrips.length}便通過扱いを確認`);

console.log('\n🎉 仙石線・仙石東北ライン・石巻線・陸羽東線・陸羽西線の全検証テストに合格しました！');
