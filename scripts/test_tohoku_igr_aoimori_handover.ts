import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { calculateActiveTrains } from '../src/services/trainSimulation';
import { timeStringToSeconds } from '../src/data/timetableData';
import { loadLinesTimetables } from '../src/data/timetableLoader';
import type { ActiveTrain, LineId, TimetableTrip } from '../src/types';

console.log('=== 🚆 JR東北本線・IGRいわて銀河鉄道・青い森鉄道 直通ハンドオーバー & 重複排除テスト ===\n');

const TARGET_LINES: LineId[] = [
  'tohoku_kuroiso_fukushima',
  'tohoku_fukushima_sendai',
  'tohoku_sendai_ichinoseki',
  'tohoku_rifu',
  'tohoku_ichinoseki_morioka',
  'igr_iwate_ginga',
  'aoimori',
  'joban_iwaki_sendai',
];

function loadRawTrips(lineId: LineId): TimetableTrip[] {
  const filePath = path.resolve(process.cwd(), `src/data/lines/${lineId}/globalTimetable.json`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as TimetableTrip[];
}

// 1. 全境界ペアのリンク整合性・双方向対称性・時刻同期検証
const rawMap = new Map<LineId, TimetableTrip[]>(TARGET_LINES.map((id) => [id, loadRawTrips(id)]));

const boundaryPairs: Array<[LineId, LineId, string]> = [
  ['tohoku_kuroiso_fukushima', 'tohoku_fukushima_sendai', '福島 (下り)'],
  ['tohoku_fukushima_sendai', 'tohoku_kuroiso_fukushima', '福島 (上り)'],
  ['tohoku_fukushima_sendai', 'tohoku_sendai_ichinoseki', '仙台 (下り)'],
  ['tohoku_sendai_ichinoseki', 'tohoku_fukushima_sendai', '仙台 (上り)'],
  ['tohoku_sendai_ichinoseki', 'tohoku_rifu', '岩切 (下り分岐)'],
  ['tohoku_rifu', 'tohoku_sendai_ichinoseki', '岩切 (上り合流)'],
  ['tohoku_sendai_ichinoseki', 'tohoku_ichinoseki_morioka', '一ノ関 (下り)'],
  ['tohoku_ichinoseki_morioka', 'tohoku_sendai_ichinoseki', '一ノ関 (上り)'],
  ['tohoku_ichinoseki_morioka', 'igr_iwate_ginga', '盛岡 (下り)'],
  ['igr_iwate_ginga', 'tohoku_ichinoseki_morioka', '盛岡 (上り)'],
  ['igr_iwate_ginga', 'aoimori', '目時 (下り)'],
  ['aoimori', 'igr_iwate_ginga', '目時 (上り)'],
];

console.log('--- 1. 境界リンク整合性・時刻同期検証 ---');
for (const [lineA, lineB, label] of boundaryPairs) {
  const tripsA = rawMap.get(lineA)!;
  const tripsB = rawMap.get(lineB)!;
  const mapB = new Map(tripsB.map((t) => [t.tripId, t]));

  const linked = tripsA.filter((t) => t.throughLineId === lineB);
  for (const tA of linked) {
    assert.ok(tA.throughTripId, `${label}: throughTripId 未設定 (${tA.tripId})`);
    const tB = mapB.get(tA.throughTripId);
    assert.ok(tB, `${label}: 接続先トリップ不在 (${tA.tripId} -> ${tA.throughTripId})`);
    assert.equal(
      tB.prevTripId,
      tA.tripId,
      `${label}: 双方向リンク非対称 (${tA.tripId} <-> ${tB.tripId}, prev=${tB.prevTripId})`
    );
    const lastA = tA.stops[tA.stops.length - 1];
    const firstB = tB.stops[0];
    assert.equal(
      lastA.arrivalTime,
      firstB.arrivalTime,
      `${label}: 境界着時刻不一致 (${tA.tripId}: ${lastA.arrivalTime} vs ${tB.tripId}: ${firstB.arrivalTime})`
    );
    assert.equal(
      lastA.departureTime,
      firstB.departureTime,
      `${label}: 境界発時刻不一致 (${tA.tripId}: ${lastA.departureTime} vs ${tB.tripId}: ${firstB.departureTime})`
    );
  }
  console.log(`  ✅ ${label.padEnd(16, ' ')} : 直通 ${String(linked.length).padStart(2, ' ')} 便 (リンク・時刻同期 正常)`);
}

// 2. 3路線連続直通 (岩沼 -> 仙台 -> 岩切 -> 利府) の確認
const rfsTrips = rawMap.get('tohoku_fukushima_sendai')!;
const tsiMap = new Map(rawMap.get('tohoku_sendai_ichinoseki')!.map((t) => [t.tripId, t]));
const trfMap = new Map(rawMap.get('tohoku_rifu')!.map((t) => [t.tripId, t]));

const threeLineChains = rfsTrips.filter((t1) => {
  if (t1.throughLineId !== 'tohoku_sendai_ichinoseki' || !t1.throughTripId) return false;
  const t2 = tsiMap.get(t1.throughTripId);
  return Boolean(t2 && t2.throughLineId === 'tohoku_rifu' && t2.throughTripId && trfMap.has(t2.throughTripId));
});
assert.ok(threeLineChains.length >= 1, '福島～仙台 -> 仙台～一ノ関 -> 利府支線 の3線連続直通が見つかりません');
console.log(`\n  ✅ 3線貫通チェーン (岩沼方面 -> 仙台 -> 岩切 -> 利府): ${threeLineChains.length} 便検出`);

// 3. シミュレーション実行による動的ハンドオーバー＆境界重複排除検証
await loadLinesTimetables(TARGET_LINES);

function findActiveByTripId(trains: ActiveTrain[], tripId: string): ActiveTrain | undefined {
  return trains.find((t) => t.tripId === tripId);
}

console.log('\n--- 2. シミュレーション時系列ハンドオーバー検証 (平日ダイヤ) ---');

const handoverChecks: Array<{
  name: string;
  lines: LineId[];
  before: { sec: string; tripId: string; expectedLine: LineId };
  boundaryDwell?: { sec: string; expectedUniqueTrips: string[] };
  after: { sec: string; tripId: string; expectedLine: LineId };
}> = [
  {
    name: '福島境界下り 1123M (郡山->藤田)',
    lines: ['tohoku_kuroiso_fukushima', 'tohoku_fukushima_sendai'],
    before: { sec: '07:10:00', tripId: 'WD_OUT_TKF-14_0628_7115', expectedLine: 'tohoku_kuroiso_fukushima' },
    boundaryDwell: {
      sec: '07:16:30',
      expectedUniqueTrips: ['WD_OUT_TKF-14_0628_7115', 'WD_OUT_TFS-01_0718_7115'],
    },
    after: { sec: '07:20:00', tripId: 'WD_OUT_TFS-01_0718_7115', expectedLine: 'tohoku_fukushima_sendai' },
  },
  {
    name: '福島境界上り 570M->1124M (仙台->郡山)',
    lines: ['tohoku_kuroiso_fukushima', 'tohoku_fukushima_sendai'],
    before: { sec: '07:20:00', tripId: 'WD_INB_TFS-20_0600_9945', expectedLine: 'tohoku_fukushima_sendai' },
    boundaryDwell: {
      sec: '07:28:00',
      expectedUniqueTrips: ['WD_INB_TFS-20_0600_9945', 'WD_INB_TKF-24_0735_9945'],
    },
    after: { sec: '07:38:00', tripId: 'WD_INB_TKF-24_0735_9945', expectedLine: 'tohoku_kuroiso_fukushima' },
  },
  {
    name: '岩切境界下り 4421M (仙台->利府)',
    lines: ['tohoku_sendai_ichinoseki', 'tohoku_rifu'],
    before: { sec: '06:22:00', tripId: 'WD_OUT_TSI-01_0615_11930', expectedLine: 'tohoku_sendai_ichinoseki' },
    after: { sec: '06:28:00', tripId: 'WD_OUT_TRF-01_0625_11930', expectedLine: 'tohoku_rifu' },
  },
  {
    name: '盛岡境界下り 2573M->3491M (日詰->滝沢)',
    lines: ['tohoku_ichinoseki_morioka', 'igr_iwate_ginga'],
    before: { sec: '07:20:00', tripId: 'WD_OUT_TIM-14_0656_24458', expectedLine: 'tohoku_ichinoseki_morioka' },
    boundaryDwell: {
      sec: '07:24:00',
      expectedUniqueTrips: ['WD_OUT_TIM-14_0656_24458', 'WD_OUT_IGR-01_0726_24458'],
    },
    after: { sec: '07:28:00', tripId: 'WD_OUT_IGR-01_0726_24458', expectedLine: 'igr_iwate_ginga' },
  },
  {
    name: '目時境界下り 2563M (小鳥谷->八戸)',
    lines: ['igr_iwate_ginga', 'aoimori'],
    before: { sec: '06:34:00', tripId: 'WD_OUT_IGR-13_0615_21859', expectedLine: 'igr_iwate_ginga' },
    after: { sec: '06:40:00', tripId: 'WD_OUT_AMR-01_0637_21859', expectedLine: 'aoimori' },
  },
  {
    name: '目時境界上り 4518M (八戸->盛岡)',
    lines: ['igr_iwate_ginga', 'aoimori'],
    before: { sec: '06:34:00', tripId: 'WD_INB_AMR-07_0610_29138', expectedLine: 'aoimori' },
    after: { sec: '06:39:00', tripId: 'WD_INB_IGR-18_0636_29138', expectedLine: 'igr_iwate_ginga' },
  },
];

for (const chk of handoverChecks) {
  const beforeTrains = calculateActiveTrains({
    currentSec: timeStringToSeconds(chk.before.sec),
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: chk.lines,
  });
  const trBefore = findActiveByTripId(beforeTrains, chk.before.tripId);
  assert.ok(trBefore, `${chk.name}: 境界手前 (${chk.before.sec}) で列車 ${chk.before.tripId} が非アクティブ`);
  assert.equal(trBefore.lineId, chk.before.expectedLine);

  if (chk.boundaryDwell) {
    const dwellTrains = calculateActiveTrains({
      currentSec: timeStringToSeconds(chk.boundaryDwell.sec),
      isHoliday: false,
      globalDelayMinutes: 0,
      randomDelays: {},
      isPlaying: true,
      speedMultiplier: 1,
      selectedLineIds: chk.lines,
    });
    const present = chk.boundaryDwell.expectedUniqueTrips.filter((id) => Boolean(findActiveByTripId(dwellTrains, id)));
    assert.equal(
      present.length,
      1,
      `${chk.name}: 境界駅停車中 (${chk.boundaryDwell.sec}) に重複/欠落発生 (present=${JSON.stringify(present)})`
    );
  }

  const afterTrains = calculateActiveTrains({
    currentSec: timeStringToSeconds(chk.after.sec),
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: chk.lines,
  });
  const trAfter = findActiveByTripId(afterTrains, chk.after.tripId);
  assert.ok(trAfter, `${chk.name}: 境界通過後 (${chk.after.sec}) で引き継ぎ列車 ${chk.after.tripId} が非アクティブ`);
  assert.equal(trAfter.lineId, chk.after.expectedLine);
  console.log(
    `  ✅ ${chk.name}: [${trBefore.lineId} ${trBefore.trainNumber}] -> [${trAfter.lineId} ${trAfter.trainNumber}] (始発:${trAfter.customOrigin || trAfter.originStationId} 行先:${trAfter.customDestination || trAfter.destinationStationId})`
  );
}

// 4. 岩沼～仙台 共用区間 (joban_iwaki_sendai vs tohoku_fukushima_sendai) 重複ゼロ検証
console.log('\n--- 3. 常磐線(いわき～仙台) ⇔ 東北本線(福島～仙台) 共用区間重複検査 ---');
const checkTimes = ['07:30:00', '08:30:00', '12:00:00', '17:30:00'];
for (const timeStr of checkTimes) {
  const activeBoth = calculateActiveTrains({
    currentSec: timeStringToSeconds(timeStr),
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['joban_iwaki_sendai', 'tohoku_fukushima_sendai'],
  });

  // 同一列車番号かつ同方向が2線に同時存在しないこと
  const seenTrainNumbers = new Map<string, ActiveTrain>();
  for (const tr of activeBoth) {
    if (!tr.trainNumber) continue;
    const key = `${tr.direction}|${tr.trainNumber}`;
    if (seenTrainNumbers.has(key)) {
      const prev = seenTrainNumbers.get(key)!;
      assert.fail(`時刻 ${timeStr} で重複列車検出: ${key} (${prev.lineId}:${prev.tripId} vs ${tr.lineId}:${tr.tripId})`);
    }
    seenTrainNumbers.set(key, tr);
  }
  const jobanCount = activeBoth.filter((t) => t.lineId === 'joban_iwaki_sendai').length;
  const tohokuCount = activeBoth.filter((t) => t.lineId === 'tohoku_fukushima_sendai').length;
  console.log(`  ✅ ${timeStr}: 常磐=${jobanCount}本 / 東北=${tohokuCount}本 (重複 0 本)`);
}

console.log('\n🎉 すべての東北本線・IGRいわて銀河鉄道・青い森鉄道 検証テストに合格しました！');
