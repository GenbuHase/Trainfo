import { calculateActiveTrains } from '../src/services/trainSimulation';
import { formatTrainNumber, timeStringToSeconds } from '../src/data/timetableData';
import type { ActiveTrain } from '../src/types';

// App.tsx の selectedTrain 判定ロジック
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

console.log('=== 特急絶景赤コキア川越号 大宮駅越境追尾シミュレーションテスト ===\n');

// テスト1: 下り（43295便 新松戸 -> 大宮 -> 川越）
// 武蔵野線: 新松戸 17:28発 -> 南浦和 17:47発 -> 大宮(JU-07) 17:58着/17:59発
// 川越線: 大宮(JA-26) 17:58着/17:59発 -> 日進 18:04発 -> 川越 18:20着
console.log('--- テスト1: 下り 43295便 (大宮到着 17:58:00, 発車 17:59:00) ---');
const muTripId = 'WD_INB_JM-19_1728_43295';
const kwTripId = 'kw_WD_OUT_JA-26_1759_43295';

const outTimes = [
  { time: '17:47:30', desc: '武蔵野線走行中（南浦和〜武蔵浦和）' },
  { time: '17:58:30', desc: '大宮駅停車中（越境タイミング）' },
  { time: '18:00:00', desc: '大宮発車直後（川越線走行中）' },
  { time: '18:05:00', desc: '川越線走行中（日進〜西大宮）' },
  { time: '18:15:00', desc: '川越線走行中（南古谷〜川越）' },
];

let trackedId: string | null = muTripId;
let lastSelected: ActiveTrain | null = null;
let selectedLineIds = ['musashino', 'kawagoe'];

for (const pt of outTimes) {
  const sec = timeStringToSeconds(pt.time);
  const activeTrains = calculateActiveTrains({
    currentSec: sec,
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds,
  });

  const selected = resolveSelectedTrain(activeTrains, trackedId, lastSelected);
  if (selected) {
    lastSelected = selected;
    trackedId = selected.tripId;

    // throughLineId による自動路線選択の検証
    if (selected.throughLineId && !selectedLineIds.includes(selected.throughLineId)) {
      selectedLineIds.push(selected.throughLineId);
    }
  }

  console.log(`[時刻 ${pt.time}] ${pt.desc}`);
  console.log(`  追尾中ID: ${trackedId} | 路線: ${selected?.lineId} | 行先: ${selected?.customDestination || selected?.destinationStationId} | 現在駅: ${selected?.currentStationId} -> 次: ${selected?.nextStationId}`);
}

if (trackedId === kwTripId) {
  console.log('✅ テスト1 成功: 43295便は武蔵野線から川越線へ正常にハンドオーバーされ追尾継続！\n');
} else {
  console.error(`❌ テスト1 失敗: 期待値 ${kwTripId} ですが ${trackedId} になりました\n`);
  process.exit(1);
}

// テスト2: 上り（43294便 川越 -> 大宮 -> 勝田/新松戸）
// 川越線: 川越 08:03発 -> 大宮(JA-26) 08:30着/08:31発
// 武蔵野線: 大宮(JU-07) 08:30着/08:31発 -> 南浦和 08:42発 -> 新松戸 09:00着
console.log('--- テスト2: 上り 43294便 (大宮到着 08:30:00, 発車 08:31:00) ---');
const kwInbTripId = 'kw_WD_INB_JA-31_0803_43294';
const muOutTripId = 'WD_OUT_JU-07_0831_43294';

const inTimes = [
  { time: '08:15:00', desc: '川越線走行中（指扇〜西大宮）' },
  { time: '08:30:30', desc: '大宮駅停車中（越境タイミング）' },
  { time: '08:32:00', desc: '大宮発車直後（武蔵野線大宮支線走行中）' },
  { time: '08:45:00', desc: '武蔵野線走行中（東浦和〜東川口）' },
];

trackedId = kwInbTripId;
lastSelected = null;
selectedLineIds = ['kawagoe', 'musashino'];

for (const pt of inTimes) {
  const sec = timeStringToSeconds(pt.time);
  const activeTrains = calculateActiveTrains({
    currentSec: sec,
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds,
  });

  const selected = resolveSelectedTrain(activeTrains, trackedId, lastSelected);
  if (selected) {
    lastSelected = selected;
    trackedId = selected.tripId;
  }

  console.log(`[時刻 ${pt.time}] ${pt.desc}`);
  console.log(`  追尾中ID: ${trackedId} | 路線: ${selected?.lineId} | 行先: ${selected?.customDestination || selected?.destinationStationId} | 現在駅: ${selected?.currentStationId} -> 次: ${selected?.nextStationId}`);
}

if (trackedId === muOutTripId) {
  console.log('✅ テスト2 成功: 43294便は川越線から武蔵野線へ正常にハンドオーバーされ追尾継続！\n');
} else {
  console.error(`❌ テスト2 失敗: 期待値 ${muOutTripId} ですが ${trackedId} になりました\n`);
  process.exit(1);
}

// テスト3: 武蔵野線のみ選択中の状態から throughLineId で kawagoe が自動追加されて追尾が継続するか
console.log('--- テスト3: 武蔵野線単独選択時の throughLineId 自動路線追加検証 ---');
let singleLineSelection = ['musashino'];
const trainAtOmiya = calculateActiveTrains({
  currentSec: timeStringToSeconds('17:47:30'),
  isHoliday: false,
  globalDelayMinutes: 0,
  randomDelays: {},
  isPlaying: true,
  speedMultiplier: 1,
  selectedLineIds: singleLineSelection,
}).find((t) => t.tripId === muTripId);

if (trainAtOmiya && trainAtOmiya.throughLineId && !singleLineSelection.includes(trainAtOmiya.throughLineId)) {
  singleLineSelection.push(trainAtOmiya.throughLineId);
  console.log(`[自動追加] 追尾中列車の throughLineId: '${trainAtOmiya.throughLineId}' を検知し路線追加 -> selectedLineIds:`, singleLineSelection);
}

if (singleLineSelection.includes('kawagoe')) {
  console.log('✅ テスト3 成功: throughLineId により kawagoe が自動追加されました！\n');
} else {
  console.error('❌ テスト3 失敗: kawagoe が自動追加されませんでした\n');
  process.exit(1);
}

console.log('🎉 特急絶景赤コキア川越号 全テスト合格！');
