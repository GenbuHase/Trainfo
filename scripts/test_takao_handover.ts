import { calculateActiveTrains } from '../src/services/trainSimulation';
import { formatTrainNumber, timeStringToSeconds } from '../src/data/timetableData';
import type { ActiveTrain } from '../src/types';

// App.tsx の selectedTrain 判定ロジックを忠実に再現
function resolveSelectedTrain(
  activeTrains: ActiveTrain[],
  selectedTrainId: string | null,
  lastSelectedTrain: ActiveTrain | null
): ActiveTrain | null {
  if (!selectedTrainId) return null;
  const found = activeTrains.find((t) => t.tripId === selectedTrainId);
  if (found) return found;

  const prev = lastSelectedTrain;
  if (prev) {
    const prevNo = formatTrainNumber(prev.trainNumber, prev.tripId);
    const successor = activeTrains.find((t) => {
      if (t.tripId === prev.tripId) return false;
      // 1. 直通ペアID判定（中央線 <-> 中央本線の cm_ 相互変換）
      if (t.tripId === `cm_${prev.tripId}` || prev.tripId === `cm_${t.tripId}`) {
        return true;
      }
      // 2. 同一列車番号かつ同一方向判定
      const curNo = formatTrainNumber(t.trainNumber, t.tripId);
      if (curNo && prevNo && curNo === prevNo && t.direction === prev.direction) {
        return true;
      }
      return false;
    });
    if (successor) return successor;
  }
  return null;
}

// テスト実行
console.log('=== 高尾越境ハンドオーバーテスト開始 ===\n');

// テスト1: 下り特急あずさ（新宿発 松本行 WD_OUT_JC-05_0624_6839）
// JC-24 高尾通過時刻: 06:42:04
const chuoTripId = 'WD_OUT_JC-05_0624_6839';
const cmTripId = `cm_${chuoTripId}`;

console.log('--- テスト1: 下り特急あずさ (高尾通過 07:03:25) ---');
const times = [
  '07:02:00', // 高尾手前
  '07:03:25', // 高尾通過
  '07:04:00', // 高尾通過後
  '07:06:00', // 中央本線区間
];

let trackedId: string | null = chuoTripId;
let lastSelected: ActiveTrain | null = null;

for (const timeStr of times) {
  const sec = timeStringToSeconds(timeStr);
  const activeTrains = calculateActiveTrains({
    currentSec: sec,
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['chuo', 'chuo_main'],
  });

  const selected = resolveSelectedTrain(activeTrains, trackedId, lastSelected);
  if (selected) {
    lastSelected = selected;
    trackedId = selected.tripId;
  }

  console.log(`[時刻 ${timeStr}] 追尾中ID: ${trackedId} | 路線: ${selected?.lineId} | 種別: ${selected?.trainType} | 行先: ${selected?.customDestination || selected?.destinationStationId} | 現在駅: ${selected?.currentStationId} -> 次: ${selected?.nextStationId}`);
}

if (trackedId === cmTripId) {
  console.log('✅ テスト1 成功: あずさは別列車に飛ばされず cm_ に正常ハンドオーバー！\n');
} else {
  console.error(`❌ テスト1 失敗: 期待値 ${cmTripId} ですが ${trackedId} になりました\n`);
  process.exit(1);
}

// テスト2: 下り中央特快 (三鷹発 大月行 WD_OUT_JC-12_0439_28733)
// JC-24 高尾到着 05:14:00, 発車 05:15:00
console.log('--- テスト2: 下り中央特快 (高尾発 05:15:00) ---');
const chuoTkId = 'WD_OUT_JC-12_0439_28733';
const cmTkId = `cm_${chuoTkId}`;
const tkTimes = [
  '05:13:00', // 八王子〜高尾間
  '05:14:30', // 高尾停車中
  '05:15:30', // 高尾発車後
  '05:18:00', // 相模湖方面走行中
];

trackedId = chuoTkId;
lastSelected = null;

for (const timeStr of tkTimes) {
  const sec = timeStringToSeconds(timeStr);
  const activeTrains = calculateActiveTrains({
    currentSec: sec,
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['chuo', 'chuo_main'],
  });

  const selected = resolveSelectedTrain(activeTrains, trackedId, lastSelected);
  if (selected) {
    lastSelected = selected;
    trackedId = selected.tripId;
  }

  console.log(`[時刻 ${timeStr}] 追尾中ID: ${trackedId} | 路線: ${selected?.lineId} | 行先: ${selected?.customDestination || selected?.destinationStationId} | 現在駅: ${selected?.currentStationId} -> 次: ${selected?.nextStationId}`);
}

if (trackedId === cmTkId) {
  console.log('✅ テスト2 成功: 中央特快は大月行き cm_ に正常ハンドオーバー！\n');
} else {
  console.error(`❌ テスト2 失敗: 期待値 ${cmTkId} ですが ${trackedId} になりました\n`);
  process.exit(1);
}

// テスト3: 高尾止まりの普通列車（別列車に誤爆しないか検証）
// 東京発 高尾行 WD_OUT_JC-01_0438_28477 (高尾到着 05:47:00)
console.log('--- テスト3: 高尾止まり列車 (高尾到着 05:47:00) の終了判定 ---');
const takaoTermId = 'WD_OUT_JC-01_0438_28477';
trackedId = takaoTermId;
lastSelected = null;

const termTimes = [
  '05:46:00', // 高尾手前
  '05:47:00', // 高尾到着
  '05:48:00', // 運行終了後
];

for (const timeStr of termTimes) {
  const sec = timeStringToSeconds(timeStr);
  const activeTrains = calculateActiveTrains({
    currentSec: sec,
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['chuo', 'chuo_main'],
  });

  const selected = resolveSelectedTrain(activeTrains, trackedId, lastSelected);
  if (selected) {
    lastSelected = selected;
    trackedId = selected.tripId;
  } else {
    trackedId = null;
  }

  console.log(`[時刻 ${timeStr}] 追尾中ID: ${trackedId} | 列車: ${selected ? selected.tripId : 'null (運行終了・追尾解除)'}`);
}

if (trackedId === null) {
  console.log('✅ テスト3 成功: 高尾止まり列車は別列車に飛ばされず、正しく追跡終了（null）になりました！\n');
} else {
  console.error(`❌ テスト3 失敗: 期待値 null ですが ${trackedId} に誤爆しました\n`);
  process.exit(1);
}

// テスト4: 上り中央特快 (大月発 東京行 cm_WD_INB_JC-32_0535_1407)
// JC-24 高尾到着 06:10:00, 発車 06:11:00
console.log('--- テスト4: 上り中央特快 (大月発 高尾発 06:11:00) ---');
const cmInbId = 'cm_WD_INB_JC-32_0535_1407';
const chuoInbId = 'WD_INB_JC-32_0535_1407';
const inbTimes = [
  '06:08:00', // 相模湖〜高尾間
  '06:10:30', // 高尾停車中
  '06:12:00', // 高尾発車後（中央線区間）
  '06:15:00', // 西八王子〜八王子間
];

trackedId = cmInbId;
lastSelected = null;

for (const timeStr of inbTimes) {
  const sec = timeStringToSeconds(timeStr);
  const activeTrains = calculateActiveTrains({
    currentSec: sec,
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['chuo', 'chuo_main'],
  });

  const selected = resolveSelectedTrain(activeTrains, trackedId, lastSelected);
  if (selected) {
    lastSelected = selected;
    trackedId = selected.tripId;
  }

  console.log(`[時刻 ${timeStr}] 追尾中ID: ${trackedId} | 路線: ${selected?.lineId} | 行先: ${selected?.customDestination || selected?.destinationStationId} | 現在駅: ${selected?.currentStationId} -> 次: ${selected?.nextStationId}`);
}

if (trackedId === chuoInbId) {
  console.log('✅ テスト4 成功: 上り特快も中央本線から中央線へ正常ハンドオーバー！\n');
} else {
  console.error(`❌ テスト4 失敗: 期待値 ${chuoInbId} ですが ${trackedId} になりました\n`);
  process.exit(1);
}

console.log('🎉 全テスト合格！');
