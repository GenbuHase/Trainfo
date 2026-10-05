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

console.log('=== 高麗川駅 八高線・川越線 相互ハンドオーバーテスト開始 ===\n');

// テスト1: 下り直通（八王子発 川越行 WD_OUT_HA-01_0445_23001）
// HA-09 高麗川到着 05:26:00, 川越線 JA-36 発車 05:27:00
const hcTripId = 'WD_OUT_HA-01_0445_23001';
const kwTripId = 'WD_INB_JA-36_0527_23001';

console.log('--- テスト1: 下り各駅停車 (八王子 -> 高麗川 -> 川越) ---');
const times = [
  '05:22:00', // 東飯能〜高麗川間 (八高線)
  '05:26:30', // 高麗川駅停車中
  '05:28:00', // 高麗川〜武蔵高萩間 (川越線)
  '05:33:00', // 武蔵高萩〜笠幡間 (川越線)
];

let trackedId: string | null = hcTripId;
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
    selectedLineIds: ['hachiko', 'kawagoe'],
  });

  const selected = resolveSelectedTrain(activeTrains, trackedId, lastSelected);
  if (selected) {
    lastSelected = selected;
    trackedId = selected.tripId;
  }

  console.log(`[時刻 ${timeStr}] 追尾中ID: ${trackedId} | 路線: ${selected?.lineId} | 種別: ${selected?.trainType} | 行先: ${selected?.customDestination || selected?.destinationStationId} | 現在駅: ${selected?.currentStationId} -> 次: ${selected?.nextStationId}`);
}

if (trackedId === kwTripId) {
  console.log('✅ テスト1 成功: 八王子発川越行は高麗川駅で川越線に正常ハンドオーバー！\n');
} else {
  console.error(`❌ テスト1 失敗: 期待値 ${kwTripId} ですが ${trackedId} になりました\n`);
  process.exit(1);
}

// テスト2: 上り直通 (川越発 八王子行 WD_OUT_JA-31_0601_24555)
// 川越線 JA-36 高麗川到着 06:30:00, 八高線 HA-09 発車 06:31:00
console.log('--- テスト2: 上り各駅停車 (川越 -> 高麗川 -> 八王子) ---');
const kwUpTripId = 'WD_OUT_JA-31_0601_24555';
const hcUpTripId = 'WD_INB_HA-09_0631_24555';

const inbTimes = [
  '06:27:00', // 武蔵高萩〜高麗川間 (川越線)
  '06:30:30', // 高麗川駅停車中
  '06:33:00', // 高麗川〜東飯能間 (八高線)
  '06:38:00', // 東飯能〜金子間 (八高線)
];

trackedId = kwUpTripId;
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
    selectedLineIds: ['hachiko', 'kawagoe'],
  });

  const selected = resolveSelectedTrain(activeTrains, trackedId, lastSelected);
  if (selected) {
    lastSelected = selected;
    trackedId = selected.tripId;
  }

  console.log(`[時刻 ${timeStr}] 追尾中ID: ${trackedId} | 路線: ${selected?.lineId} | 行先: ${selected?.customDestination || selected?.destinationStationId} | 現在駅: ${selected?.currentStationId} -> 次: ${selected?.nextStationId}`);
}

if (trackedId === hcUpTripId) {
  console.log('✅ テスト2 成功: 川越発八王子行も川越線から八高線へ正常ハンドオーバー！\n');
} else {
  console.error(`❌ テスト2 失敗: 期待値 ${hcUpTripId} ですが ${trackedId} になりました\n`);
  process.exit(1);
}

// テスト3: throughLineId による直通先路線の自動追加判定テスト
console.log('--- テスト3: throughLineId による直通先路線の自動追加判定 ---');
let lineSelection = ['hachiko'];
const trainAtKomagawa = calculateActiveTrains({
  currentSec: timeStringToSeconds('05:22:00'),
  isHoliday: false,
  globalDelayMinutes: 0,
  randomDelays: {},
  isPlaying: true,
  speedMultiplier: 1,
  selectedLineIds: lineSelection,
}).find((t) => t.tripId === hcTripId);

if (trainAtKomagawa && trainAtKomagawa.throughLineId && !lineSelection.includes(trainAtKomagawa.throughLineId)) {
  lineSelection = [...lineSelection, trainAtKomagawa.throughLineId];
  console.log(`[自動追加] 追尾中列車の throughLineId: '${trainAtKomagawa.throughLineId}' を検知し路線追加 -> selectedLineIds:`, lineSelection);
}

if (lineSelection.includes('kawagoe')) {
  console.log('✅ テスト3 成功: throughLineId により kawagoe が自動追加されました！\n');
} else {
  console.error('❌ テスト3 失敗: 直通先路線が自動追加されませんでした\n');
  process.exit(1);
}

// テスト4: 高麗川止まり列車 (土休日11:07発 11:28高麗川到着) の終了判定
console.log('--- テスト4: 高麗川止まり列車 (高麗川到着 11:28:00) の終了判定 ---');
const stopTripId = 'HD_OUT_JA-31_1107_27906';
const stopTimes = [
  '11:24:00', // 武蔵高萩駅
  '11:28:00', // 高麗川駅到着
  '11:30:00', // 運行終了後
];

trackedId = stopTripId;
lastSelected = null;

for (const timeStr of stopTimes) {
  const sec = timeStringToSeconds(timeStr);
  const activeTrains = calculateActiveTrains({
    currentSec: sec,
    isHoliday: true,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['kawagoe', 'hachiko'],
  });

  const selected = resolveSelectedTrain(activeTrains, trackedId, lastSelected);
  if (selected) {
    lastSelected = selected;
    trackedId = selected.tripId;
  } else {
    trackedId = null;
    lastSelected = null;
  }

  console.log(`[時刻 ${timeStr}] 追尾中ID: ${trackedId} | 列車: ${selected ? selected.tripId : 'null (運行終了・追尾解除)'}`);
}

if (trackedId === null) {
  console.log('✅ テスト4 成功: 高麗川止まり列車は別列車に飛ばされず、正しく追跡終了（null）になりました！\n');
} else {
  console.error(`❌ テスト4 失敗: 期待値 null ですが ${trackedId} が追尾されています\n`);
  process.exit(1);
}

console.log('🎉 高麗川駅 ハンドオーバー全テスト合格！');

