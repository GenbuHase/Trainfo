import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getCombinedGlobalTimetable } from '../src/data/linesRegistry';
import { calculateActiveTrains } from '../src/services/trainSimulation';
import { timeStringToSeconds } from '../src/data/timetableData';
import type { SimulationState } from '../src/types';

// 全路線の globalTimetable からトリップマップを構築
const allTrips = getCombinedGlobalTimetable();
const tripMap = new Map(allTrips.map((t) => [t.tripId, t]));

function getThroughChainTrips(initialTripId: string) {
  if (!initialTripId) return [];
  const initialTrip = tripMap.get(initialTripId);
  if (!initialTrip) return [];

  const chain = [initialTrip];

  // 1. 上流方向 (prevTripId)
  let cur = initialTrip;
  const visitedUp = new Set([cur.tripId]);
  while (cur.prevTripId && !visitedUp.has(cur.prevTripId)) {
    const prev = tripMap.get(cur.prevTripId);
    if (!prev) break;
    visitedUp.add(prev.tripId);
    chain.unshift(prev);
    cur = prev;
  }

  // 2. 下流方向 (throughTripId)
  cur = initialTrip;
  const visitedDown = new Set([cur.tripId]);
  while (cur.throughTripId && !visitedDown.has(cur.throughTripId)) {
    const next = tripMap.get(cur.throughTripId);
    if (!next) break;
    visitedDown.add(next.tripId);
    chain.push(next);
    cur = next;
  }

  return chain;
}

function getThroughChainTripIds(initialTripId: string): Set<string> {
  const trips = getThroughChainTrips(initialTripId);
  return new Set(trips.map((t) => t.tripId));
}

function resolveSelectedTrain(
  selectedTripId: string,
  activeTrains: ReturnType<typeof calculateActiveTrains>
) {
  // 1. 直接一致
  const found = activeTrains.find((t) => t.tripId === selectedTripId);
  if (found) return found;

  // 2. チェーン全体から現在走行中のトリップを探索
  const chainTripIds = getThroughChainTripIds(selectedTripId);
  const chainActive = activeTrains.find((t) => chainTripIds.has(t.tripId));
  if (chainActive) return chainActive;

  // 3. なければ null (絶対に別列車にすり替えない)
  return null;
}

// テストシナリオ実行
console.log('=== 直通列車の終点到着後巻き戻し & すり替わり防止テスト ===');

const baseSimState: SimulationState = {
  currentSec: 0,
  speedMultiplier: 1,
  isPlaying: true,
  isHoliday: false,
  globalDelayMinutes: 0,
  randomDelays: {},
  selectedLineIds: ['seibu_ikebukuro', 'seibu_yurakucho', 'fukutoshin', 'tokyu_toyoko', 'minatomirai'],
};

// 小手指9:40発 準急元町・中華街行
// SI (09:40-10:11) -> SY (10:16-10:21) -> F (10:22-10:38) -> TY (10:39-11:06) -> MM (11:08-11:16)
const mmTripId = 'WD_OUT_MM-01_1108_145192'; // 終着みなとみらい線トリップ

// 1. 11:15 (元町・中華街到着直前)
const state1115 = { ...baseSimState, currentSec: timeStringToSeconds('11:15:00') };
const active1115 = calculateActiveTrains(state1115);
const selected1115 = resolveSelectedTrain(mmTripId, active1115);
assert.ok(selected1115, '11:15時点で列車が選択されること');
assert.strictEqual(selected1115.lineId, 'minatomirai', '11:15時点ではみなとみらい線のトリップであること');
console.log('✅ テスト1: 終点到着直前 (11:15) みなとみらい線トリップ追尾成功:', selected1115.tripId);

// 2. 11:18 (元町・中華街終着後、運行終了)
const state1118 = { ...baseSimState, currentSec: timeStringToSeconds('11:18:00') };
const active1118 = calculateActiveTrains(state1118);
const selected1118 = resolveSelectedTrain(mmTripId, active1118);
assert.strictEqual(selected1118, null, '11:18時点で運行終了しているため別列車にすり替わらずnullになること');
console.log('✅ テスト2: 終点到着後 (11:18) 運行終了時に無関係な別列車を拾わず安全にnullを返却');

// 3. 終点到着後に時刻を巻き戻す: 10:50 (東横線走行中)
const state1050 = { ...baseSimState, currentSec: timeStringToSeconds('10:50:00') };
const active1050 = calculateActiveTrains(state1050);
const selected1050 = resolveSelectedTrain(mmTripId, active1050);
assert.ok(selected1050, '10:50時点で巻き戻し先列車が選択されること');
assert.strictEqual(selected1050.lineId, 'tokyu_toyoko', '10:50時点では東横線トリップに巻き戻されること');
console.log('✅ テスト3: 10:50へ巻き戻し時、東急東横線の同一列車を正確に特定:', selected1050.tripId);

// 4. さらに巻き戻す: 10:30 (副都心線走行中)
const state1030 = { ...baseSimState, currentSec: timeStringToSeconds('10:30:00') };
const active1030 = calculateActiveTrains(state1030);
const selected1030 = resolveSelectedTrain(mmTripId, active1030);
assert.ok(selected1030, '10:30時点で巻き戻し先列車が選択されること');
assert.strictEqual(selected1030.lineId, 'fukutoshin', '10:30時点では副都心線トリップに巻き戻されること');
console.log('✅ テスト4: 10:30へ巻き戻し時、副都心線の同一列車を正確に特定:', selected1030.tripId);

// 5. さらに巻き戻す: 09:50 (西武池袋線走行中)
const state0950 = { ...baseSimState, currentSec: timeStringToSeconds('09:50:00') };
const active0950 = calculateActiveTrains(state0950);
const selected0950 = resolveSelectedTrain(mmTripId, active0950);
assert.ok(selected0950, '09:50時点で巻き戻し先列車が選択されること');
assert.strictEqual(selected0950.lineId, 'seibu_ikebukuro', '09:50時点では西武池袋線トリップに巻き戻されること');
console.log('✅ テスト5: 09:50へ巻き戻し時、西武池袋線の同一列車を正確に特定:', selected0950.tripId);

// 6. 始発発車前まで巻き戻す: 09:00 (小手指発車前)
const state0900 = { ...baseSimState, currentSec: timeStringToSeconds('09:00:00') };
const active0900 = calculateActiveTrains(state0900);
const selected0900 = resolveSelectedTrain(mmTripId, active0900);
assert.strictEqual(selected0900, null, '09:00時点では発車前のため別列車にすり替わらずnullになること');
console.log('✅ テスト6: 始発発車前 (09:00) に無関係な別列車を拾わず安全にnullを返却');

// 単一路線便 (中央線快速 東京発 高尾行: WD_OUT_JC-01_1000_1025T)
// 直通なし。終点到着後の巻き戻しや終了時の挙動確認
const chuoTrip = allTrips.find((t) => t.lineId === 'chuo' && t.originStationId === 'JC-01' && !t.throughTripId);
if (chuoTrip) {
  const chuoState = { ...baseSimState, selectedLineIds: ['chuo'] };
  const firstTime = timeStringToSeconds(chuoTrip.stops[0].departureTime);
  const lastTime = timeStringToSeconds(chuoTrip.stops[chuoTrip.stops.length - 1].arrivalTime);

  // 運行中 (中間時刻)
  const midSec = Math.floor((firstTime + lastTime) / 2);
  const activeMid = calculateActiveTrains({ ...chuoState, currentSec: midSec });
  const selMid = resolveSelectedTrain(chuoTrip.tripId, activeMid);
  assert.ok(selMid, '運行中に正しく追尾されること');
  assert.strictEqual(selMid.tripId, chuoTrip.tripId);
  console.log('✅ テスト7: 単一路線便 運行中追尾成功:', selMid.tripId);

  // 終着後 (lastTime + 120秒)
  const activeAfter = calculateActiveTrains({ ...chuoState, currentSec: lastTime + 120 });
  const selAfter = resolveSelectedTrain(chuoTrip.tripId, activeAfter);
  assert.strictEqual(selAfter, null, '終着後に別列車にすり替わらずnullになること');
  console.log('✅ テスト8: 単一路線便 終着後に無関係な別列車を拾わず安全にnullを返却');

  // 終着後に運行中に巻き戻し (midSec)
  const selRewind = resolveSelectedTrain(chuoTrip.tripId, activeMid);
  assert.ok(selRewind, '終着後に巻き戻した際、元の同一列車に正しく復帰すること');
  assert.strictEqual(selRewind.tripId, chuoTrip.tripId);
  console.log('✅ テスト9: 単一路線便 終着後から巻き戻し時、元の同一列車に正確に復帰');

  // 始発前まで巻き戻し (firstTime - 300秒)
  const activeBefore = calculateActiveTrains({ ...chuoState, currentSec: firstTime - 300 });
  const selBefore = resolveSelectedTrain(chuoTrip.tripId, activeBefore);
  assert.strictEqual(selBefore, null, '始発前に別列車にすり替わらずnullになること');
  console.log('✅ テスト10: 単一路線便 始発前に無関係な別列車を拾わず安全にnullを返却');
}

console.log('\n🎉 全ての終点到着後巻き戻し・すり替わり防止テストに合格しました！');
