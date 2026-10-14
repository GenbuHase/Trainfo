import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getThroughChainTrips, getThroughChainTripIds, timeStringToSeconds } from '../src/data/timetableData';

console.log('=== 特急列車 & 複数路線直通列車の境界跨ぎハンドオーバー検証テスト ===\n');

// 1. 特急あずさ4号 (trainId: 6919, 5004M)
// 松本(SN-06 06:30発) -> 塩尻(SN-01 06:38着/CO-61 06:38発) -> 高尾(JC-24 08:30着/JC-22 08:35発) -> 新宿/東京(09:29着)
const azusaChain = getThroughChainTrips('WD_INB_JC-22_0835_6919');

console.log('特急あずさ4号のチェーン:');
for (const t of azusaChain) {
  console.log(`  [${t.lineId}] ${t.tripId} (${t.trainNumber}): ${t.stops[0]?.stationId}@${t.stops[0]?.departureTime} -> ${t.stops[t.stops.length - 1]?.stationId}@${t.stops[t.stops.length - 1]?.arrivalTime}`);
}

assert.strictEqual(azusaChain.length, 3, 'あずさ4号は篠ノ井線・中央本線・中央線快速の3路線がチェーンに含まれること');
assert.strictEqual(azusaChain[0].lineId, 'shinonoi', '第1区間は篠ノ井線であること');
assert.strictEqual(azusaChain[1].lineId, 'chuo_main', '第2区間は中央本線であること');
assert.strictEqual(azusaChain[2].lineId, 'chuo', '第3区間は中央線快速であること');

const azusaChainIds = getThroughChainTripIds('WD_INB_JC-22_0835_6919');
assert.ok(azusaChainIds.has('WD_INB_SN-06_0630_6919'), '篠ノ井線便がチェーンIDに含まれること');
assert.ok(azusaChainIds.has('cm_WD_INB_CO-61_0638_6919'), '中央本線便がチェーンIDに含まれること');
assert.ok(azusaChainIds.has('WD_INB_JC-22_0835_6919'), '中央線便がチェーンIDに含まれること');
console.log('✅ テスト1: 特急あずさ4号 3路線チェーン形成成功！');

// 2. 小田急えのしま1号 (trainId: 94998, 501レ)
// 新宿(OH-01 07:10発) -> 相模大野(OH-28 07:39着/07:40発) -> 片瀬江ノ島
const enoshimaChain = getThroughChainTrips('WD_OUT_OH-01_0710_94998');

console.log('\n小田急えのしま1号のチェーン:');
for (const t of enoshimaChain) {
  console.log(`  [${t.lineId}] ${t.tripId} (${t.trainNumber}): ${t.stops[0]?.stationId}@${t.stops[0]?.departureTime} -> ${t.stops[t.stops.length - 1]?.stationId}@${t.stops[t.stops.length - 1]?.arrivalTime}`);
}

assert.strictEqual(enoshimaChain.length, 2, 'えのしま1号は小田原線・江ノ島線の2路線がチェーンに含まれること');
assert.strictEqual(enoshimaChain[0].lineId, 'odakyu_odawara', '第1区間は小田原線であること');
assert.strictEqual(enoshimaChain[1].lineId, 'odakyu_enoshima', '第2区間は江ノ島線であること');

const enoshimaChainIds = getThroughChainTripIds('WD_OUT_OH-01_0710_94998');
assert.ok(enoshimaChainIds.has('WD_OUT_OH-01_0710_94998'), '小田原線便がチェーンIDに含まれること');
assert.ok(enoshimaChainIds.has('WD_OUT_OH-28_0740_94998'), '江ノ島線便がチェーンIDに含まれること');
console.log('✅ テスト2: 小田急えのしま1号 2路線チェーン形成成功！');

// 3. 特急アルプス (新宿 -> 白馬)
const alpsTrips = getThroughChainTrips('WD_OUT_OIE-01_0449_42781');
console.log('\n特急アルプスのチェーン:');
for (const t of alpsTrips) {
  console.log(`  [${t.lineId}] ${t.tripId} (${t.trainNumber}): ${t.stops[0]?.stationId}@${t.stops[0]?.departureTime} -> ${t.stops[t.stops.length - 1]?.stationId}@${t.stops[t.stops.length - 1]?.arrivalTime}`);
}
assert.ok(alpsTrips.length >= 2, '特急アルプスは複数路線チェーンに含まれること');
console.log('✅ テスト3: 特急アルプス チェーン形成成功！');

// 4. 時系列順ハンドオーバーシミュレーション (あずさ4号)
// 時刻進行シミュレーション: 松本(06:30) -> 塩尻手前(06:35) -> 塩尻直後(06:40) -> 高尾手前(08:25) -> 八王子直後(08:40) -> 東京着(09:29)
const simTestTimes = [
  { sec: timeStringToSeconds('06:30:00'), expectedTrip: 'WD_INB_SN-06_0630_6919', desc: '松本発車時 (篠ノ井線)' },
  { sec: timeStringToSeconds('06:35:00'), expectedTrip: 'WD_INB_SN-06_0630_6919', desc: '塩尻直前 (篠ノ井線)' },
  { sec: timeStringToSeconds('06:40:00'), expectedTrip: 'cm_WD_INB_CO-61_0638_6919', desc: '塩尻直後 (中央本線へハンドオーバー)' },
  { sec: timeStringToSeconds('07:30:00'), expectedTrip: 'cm_WD_INB_CO-61_0638_6919', desc: '中央本線甲府付近' },
  { sec: timeStringToSeconds('08:36:00'), expectedTrip: 'WD_INB_JC-22_0835_6919', desc: '八王子直後 (中央線快速へハンドオーバー)' },
  { sec: timeStringToSeconds('09:00:00'), expectedTrip: 'WD_INB_JC-22_0835_6919', desc: '三鷹付近 (中央線快速)' },
];

console.log('\n--- あずさ4号 時刻進行シミュレーション ---');
for (const step of simTestTimes) {
  // チェーン内で該当時刻に走行中の便を特定
  const running = azusaChain.find((t) => {
    const dep = timeStringToSeconds(t.stops[0].departureTime);
    const arr = timeStringToSeconds(t.stops[t.stops.length - 1].arrivalTime);
    return step.sec >= dep && step.sec <= arr;
  });

  assert.ok(running, `${step.desc} で該当列車が見つかること`);
  assert.strictEqual(running.tripId, step.expectedTrip, `${step.desc} で期待通りのトリップIDであること`);
  console.log(`✅ [${step.desc}] 時刻 ${step.sec}s -> ${running.tripId} (${running.lineId}) 追尾継続！`);
}

// 5. 終点到着後の安全確認
const afterArrivalSec = timeStringToSeconds('09:40:00');
const runningAfterArrival = azusaChain.find((t) => {
  const dep = timeStringToSeconds(t.stops[0].departureTime);
  const arr = timeStringToSeconds(t.stops[t.stops.length - 1].arrivalTime);
  return afterArrivalSec >= dep && afterArrivalSec <= arr;
});
assert.strictEqual(runningAfterArrival, undefined, '終点到着後 (09:40) は運行終了として安全に未検出 (null) となること');
console.log('✅ テスト5: 終点到着後の安全停止確認成功！');

console.log('\n🎉 全ての特急列車境界跨ぎハンドオーバー検証テストに合格しました！');
