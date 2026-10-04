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
      // 1. 直通先トリップID照合（路線に依存しない共通メタデータ）
      if (
        (prev.throughTripId && t.tripId === prev.throughTripId) ||
        (t.throughTripId && t.throughTripId === prev.tripId)
      ) {
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

console.log('=== 立川駅 中央線 ↔ 青梅線 越境ハンドオーバーテスト開始 ===\n');

// テスト1: 下り直通快速 (東京発 青梅行 WD_OUT_JC-01_0622_9791 -> WD_OUT_JC-19_0719_9791)
// JC-19 立川着: 07:18:00, 発: 07:19:00
const chuoDownTripId = 'WD_OUT_JC-01_0622_9791';
const omeDownTripId = 'WD_OUT_JC-19_0719_9791';

console.log('--- テスト1: 下り直通快速 (立川駅越境: 07:17 〜 07:22) ---');
const downTimes = [
  '07:16:00', // 中央線走行中 (国立付近)
  '07:18:00', // 立川到着
  '07:18:30', // 立川停車中
  '07:19:30', // 立川発車後 (青梅線 西立川方面)
  '07:22:00', // 青梅線走行中
];

let trackedDownId: string | null = chuoDownTripId;
let lastSelectedDown: ActiveTrain | null = null;
let downSuccess = true;

for (const timeStr of downTimes) {
  const sec = timeStringToSeconds(timeStr);
  const activeTrains = calculateActiveTrains({
    currentSec: sec,
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['chuo', 'ome'],
  });

  const selected = resolveSelectedTrain(activeTrains, trackedDownId, lastSelectedDown);
  if (selected) {
    lastSelectedDown = selected;
    trackedDownId = selected.tripId;
    console.log(
      `  [${timeStr}] 追尾成功: tripId=${selected.tripId}, lineId=${selected.lineId}, dest=${selected.customDestination || selected.destinationStationId}, pos=[${selected.currentLat.toFixed(4)}, ${selected.currentLng.toFixed(4)}]`
    );
  } else {
    console.error(`  [${timeStr}] ❌ 追尾ロスト!`);
    downSuccess = false;
  }
}

if (downSuccess && trackedDownId === omeDownTripId) {
  console.log('✅ テスト1合格: 中央線から青梅線への下り追尾ハンドオーバーが完全成功しました！\n');
} else {
  console.error('❌ テスト1失敗: 下りハンドオーバーに失敗しました。\n');
  process.exit(1);
}

// テスト2: 上り直通快速 (青梅発 東京行 WD_INB_JC-62_0435_9968 -> WD_INB_JC-19_0504_9968)
// JC-19 立川着発: 05:04:00
const omeUpTripId = 'WD_INB_JC-62_0435_9968';
const chuoUpTripId = 'WD_INB_JC-19_0504_9968';

console.log('--- テスト2: 上り直通快速 (立川駅越境: 05:02 〜 05:07) ---');
const upTimes = [
  '05:01:00', // 青梅線走行中 (西立川手前)
  '05:03:30', // 立川手前
  '05:04:15', // 立川発車直後 (中央線区間へ進入)
  '05:07:00', // 中央線走行中 (国立付近)
];

let trackedUpId: string | null = omeUpTripId;
let lastSelectedUp: ActiveTrain | null = null;
let upSuccess = true;

for (const timeStr of upTimes) {
  const sec = timeStringToSeconds(timeStr);
  const activeTrains = calculateActiveTrains({
    currentSec: sec,
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['chuo', 'ome'],
  });

  const selected = resolveSelectedTrain(activeTrains, trackedUpId, lastSelectedUp);
  if (selected) {
    lastSelectedUp = selected;
    trackedUpId = selected.tripId;
    console.log(
      `  [${timeStr}] 追尾成功: tripId=${selected.tripId}, lineId=${selected.lineId}, dest=${selected.customDestination || selected.destinationStationId}, pos=[${selected.currentLat.toFixed(4)}, ${selected.currentLng.toFixed(4)}]`
    );
  } else {
    console.error(`  [${timeStr}] ❌ 追尾ロスト!`);
    upSuccess = false;
  }
}

if (upSuccess && trackedUpId === chuoUpTripId) {
  console.log('✅ テスト2合格: 青梅線から中央線への上り追尾ハンドオーバーが完全成功しました！\n');
} else {
  console.error('❌ テスト2失敗: 上りハンドオーバーに失敗しました。\n');
  process.exit(1);
}

// テスト3: 境界越境時の自動路線追加 (青梅線未選択状態での越境)
console.log('--- テスト3: 中央線のみ選択状態で下り列車追尾 -> 相手路線自動検知 ---');
{
  const sec = timeStringToSeconds('07:18:00'); // 立川到着
  const activeTrains = calculateActiveTrains({
    currentSec: sec,
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['chuo'],
  });

  const train = activeTrains.find((t) => t.tripId === chuoDownTripId);
  if (train && train.throughLineId === 'ome') {
    console.log(`✅ テスト3合格: 直通先路線ID 'ome' が正しく認識されています (throughTripId=${train.throughTripId})!\n`);
  } else {
    console.error('❌ テスト3失敗: throughLineId の認識に失敗しました。');
    process.exit(1);
  }
}

console.log('🎉 全ての立川駅ハンドオーバーテストに合格しました！');
