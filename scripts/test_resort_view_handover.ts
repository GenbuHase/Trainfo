import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getThroughChainTrips, getThroughChainTripIds, timeStringToSeconds } from '../src/data/timetableData';
import { calculateActiveTrains } from '../src/services/trainSimulation';
import { LineId } from '../src/types';

console.log('=== 長野10:04発 南小谷行 スイッチバック・境界跨ぎ追尾検証テスト ===\n');

// 1. チェーン形成の検証 (篠ノ井線 -> 大糸線)
const naganoTripId = 'HD_INB_SN-19_1004_29340';
const chain = getThroughChainTrips(naganoTripId);

console.log(`長野10:04発便 (${naganoTripId}) の直通チェーン:`);
for (const t of chain) {
  const first = t.stops[0];
  const last = t.stops[t.stops.length - 1];
  console.log(`  [${t.lineId}] ${t.tripId} (${t.trainNumber}): dir=${t.direction} ${first.stationId}@${first.departureTime} -> ${last.stationId}@${last.arrivalTime}`);
}

assert.strictEqual(chain.length, 2, 'チェーンが2便（篠ノ井線＋大糸線）であること');
assert.strictEqual(chain[0].lineId, 'shinonoi', '第1区間は篠ノ井線であること');
assert.strictEqual(chain[1].lineId, 'oito_east', '第2区間は大糸線であること');

console.log('✅ テスト1: 篠ノ井線〜大糸線のスイッチバック直通チェーン形成に成功！\n');

// 2. 復路 (南小谷14:29発 長野行 37276) のチェーン形成検証
const minamiOtariTripId = 'HD_INB_OIE-33_1429_37276';
const returnChain = getThroughChainTrips(minamiOtariTripId);
console.log(`南小谷14:29発便 (${minamiOtariTripId}) の直通チェーン:`);
for (const t of returnChain) {
  const first = t.stops[0];
  const last = t.stops[t.stops.length - 1];
  console.log(`  [${t.lineId}] ${t.tripId} (${t.trainNumber}): dir=${t.direction} ${first.stationId}@${first.departureTime} -> ${last.stationId}@${last.arrivalTime}`);
}

assert.strictEqual(returnChain.length, 2, '復路チェーンが2便であること');
assert.strictEqual(returnChain[0].lineId, 'oito_east', '復路第1区間は大糸線であること');
assert.strictEqual(returnChain[1].lineId, 'shinonoi', '復路第2区間は篠ノ井線であること');

console.log('✅ テスト2: 復路の大糸線〜篠ノ井線直通チェーン形成に成功！\n');

// 3. 長野10:04発 南小谷行のシミュレーション追尾テスト
const testTimes = [
  { label: '長野駅発車時', sec: timeStringToSeconds('10:04:00') },
  { label: '篠ノ井線走行中 (姨捨付近)', sec: timeStringToSeconds('10:45:00') },
  { label: '松本駅到着時', sec: timeStringToSeconds('11:29:00') },
  { label: '松本駅停車中 (14分停車の中間)', sec: timeStringToSeconds('11:35:00') },
  { label: '松本駅発車時 (大糸線)', sec: timeStringToSeconds('11:43:00') },
  { label: '大糸線走行中 (信濃大町付近)', sec: timeStringToSeconds('12:30:00') },
  { label: '南小谷駅終点到着時', sec: timeStringToSeconds('13:40:00') },
];

const selectedLines: LineId[] = ['shinonoi', 'oito_east'];
const chainTripIds = getThroughChainTripIds(naganoTripId);

console.log('--- 時刻進行シミュレーション追尾検証 ---');
let lastTrackedTripId = naganoTripId;

for (const t of testTimes) {
  const activeTrains = calculateActiveTrains({
    currentSec: t.sec,
    isHoliday: true,
    isPlaying: true,
    speedMultiplier: 1,
    globalDelayMinutes: 0,
    randomDelays: {},
    selectedLineIds: selectedLines,
  });
  
  // App.tsx の選択列車探索ロジックを模倣
  // 1. 直前の tripId またはチェーン内のアクティブ列車を探索
  let matched = activeTrains.find(train => train.tripId === lastTrackedTripId);
  if (!matched) {
    matched = activeTrains.find(train => chainTripIds.has(train.tripId));
  }

  assert.ok(matched, `${t.label} (時刻 ${t.sec}s) で列車が見つかること`);
  lastTrackedTripId = matched.tripId;
  console.log(`✅ [${t.label}] 時刻 ${t.sec}s -> ${matched.tripId} (${matched.trainNumber}, 路線: ${matched.lineId}) 追尾継続！ (現在位置: ${matched.status} ${matched.fromStationId} -> ${matched.toStationId})`);
}

console.log('\n🎉 長野10:04発 南小谷行の全行程（松本駅14分停車・スイッチバック含む）追尾テストに完全合格しました！ 🎉\n');
