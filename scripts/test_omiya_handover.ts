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

// テスト実行
console.log('=== 大宮駅 埼京線・川越線 相互ハンドオーバーテスト開始 ===\n');

// テスト1: 下り各駅停車（池袋発 川越行 WD_OUT_JA-12_0500_39203）
// JA-26 大宮到着/発車時刻: 05:36:00
const saikyoTripId = 'WD_OUT_JA-12_0500_39203';
const kwTripId = `kw_${saikyoTripId}`;

console.log('--- テスト1: 下り各駅停車 (大宮到着/発車 05:36:00) ---');
const times = [
  '05:34:00', // 北与野〜大宮間
  '05:36:00', // 大宮駅停車中
  '05:38:00', // 川越線区間（大宮〜日進）
  '05:42:00', // 川越線区間（日進〜西大宮）
];

let trackedId: string | null = saikyoTripId;
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
    selectedLineIds: ['saikyo', 'kawagoe'],
  });

  const selected = resolveSelectedTrain(activeTrains, trackedId, lastSelected);
  if (selected) {
    lastSelected = selected;
    trackedId = selected.tripId;
  }

  console.log(`[時刻 ${timeStr}] 追尾中ID: ${trackedId} | 路線: ${selected?.lineId} | 種別: ${selected?.trainType} | 行先: ${selected?.customDestination || selected?.destinationStationId} | 現在駅: ${selected?.currentStationId} -> 次: ${selected?.nextStationId}`);
}

if (trackedId === kwTripId) {
  console.log('✅ テスト1 成功: 下り各停は川越線 kw_ に正常ハンドオーバー！\n');
} else {
  console.error(`❌ テスト1 失敗: 期待値 ${kwTripId} ですが ${trackedId} になりました\n`);
  process.exit(1);
}

// テスト2: 上り各駅停車 (指扇発 池袋行 kw_WD_INB_JA-29_0449_39263)
// JA-26 大宮到着 04:59:00, 発車 05:00:00
console.log('--- テスト2: 上り各駅停車 (大宮発 05:00:00) ---');
const kwInbId = 'kw_WD_INB_JA-29_0449_39263';
const skInbId = 'WD_INB_JA-29_0449_39263';
const inbTimes = [
  '04:56:00', // 日進〜大宮間
  '04:59:30', // 大宮停車中
  '05:01:00', // 大宮発車後（埼京線区間）
  '05:05:00', // 与野本町〜南与野間
];

trackedId = kwInbId;
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
    selectedLineIds: ['saikyo', 'kawagoe'],
  });

  const selected = resolveSelectedTrain(activeTrains, trackedId, lastSelected);
  if (selected) {
    lastSelected = selected;
    trackedId = selected.tripId;
  }

  console.log(`[時刻 ${timeStr}] 追尾中ID: ${trackedId} | 路線: ${selected?.lineId} | 行先: ${selected?.customDestination || selected?.destinationStationId} | 現在駅: ${selected?.currentStationId} -> 次: ${selected?.nextStationId}`);
}

if (trackedId === skInbId) {
  console.log('✅ テスト2 成功: 上り各停も川越線から埼京線へ正常ハンドオーバー！\n');
} else {
  console.error(`❌ テスト2 失敗: 期待値 ${skInbId} ですが ${trackedId} になりました\n`);
  process.exit(1);
}

// テスト3: 大宮止まりの普通列車（別列車に誤爆しないか検証）
// 新宿発 大宮行 WD_OUT_JA-11_0700_22903 (大宮到着 07:42:00)
console.log('--- テスト3: 大宮止まり列車 (大宮到着 07:42:00) の終了判定 ---');
const omiyaTermId = 'WD_OUT_JA-11_0700_22903';
trackedId = omiyaTermId;
lastSelected = null;

const termTimes = [
  '07:40:00', // 北与野〜大宮間
  '07:42:00', // 大宮到着
  '07:43:00', // 運行終了後
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
    selectedLineIds: ['saikyo', 'kawagoe'],
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
  console.log('✅ テスト3 成功: 大宮止まり列車は別列車に飛ばされず、正しく追跡終了（null）になりました！\n');
} else {
  console.error(`❌ テスト3 失敗: 期待値 null ですが ${trackedId} に誤爆しました\n`);
  process.exit(1);
}

// テスト4: throughLineId による直通先路線の自動追加判定テスト
console.log('--- テスト4: throughLineId による直通先路線の自動追加判定 ---');
let lineSelection = ['saikyo'];
const trainAtOmiya = calculateActiveTrains({
  currentSec: timeStringToSeconds('05:34:00'),
  isHoliday: false,
  globalDelayMinutes: 0,
  randomDelays: {},
  isPlaying: true,
  speedMultiplier: 1,
  selectedLineIds: lineSelection,
}).find((t) => t.tripId === saikyoTripId);

if (trainAtOmiya && trainAtOmiya.throughLineId && !lineSelection.includes(trainAtOmiya.throughLineId)) {
  lineSelection = [...lineSelection, trainAtOmiya.throughLineId];
  console.log(`[自動追加] 追尾中列車の throughLineId: '${trainAtOmiya.throughLineId}' を検知し路線追加 -> selectedLineIds:`, lineSelection);
}

if (lineSelection.includes('kawagoe')) {
  console.log('✅ テスト4 成功: throughLineId により kawagoe が汎用ロジックで自動追加されました！\n');
} else {
  console.error('❌ テスト4 失敗: 直通先路線が自動追加されませんでした\n');
  process.exit(1);
}

console.log('🎉 全テスト合格！');
