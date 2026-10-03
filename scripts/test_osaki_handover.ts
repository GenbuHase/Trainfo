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

console.log('=== 大崎駅 埼京線・りんかい線 相互ハンドオーバーテスト開始 ===\n');

// テスト1: 下り直通快速（新木場発 川越行 26782便）
// りんかい線: 新木場 06:09発 -> 大崎 06:28着 (WD_OUT_R-01_0609_26782)
// 埼京線: 大崎 06:30発 -> 大宮 07:18着 (WD_OUT_JA-08_0630_26782)
// 川越線: 大宮 07:19発 -> 川越 07:46着 (kw_WD_OUT_JA-08_0630_26782)
console.log('--- テスト1: 下り直通快速 26782便 (新木場 -> 大崎 -> 大宮 -> 川越 3路線全線貫通) ---');
const rkTripId = 'WD_OUT_R-01_0609_26782';
const skTripId = 'WD_OUT_JA-08_0630_26782';
const kwTripId = 'kw_WD_OUT_JA-08_0630_26782';

const outTimes = [
  { time: '06:15:00', desc: 'りんかい線走行中（国際展示場〜東京テレポート）' },
  { time: '06:27:00', desc: 'りんかい線大崎接近中（大井町〜大崎）' },
  { time: '06:29:00', desc: '大崎駅停車中（越境タイミング）' },
  { time: '06:35:00', desc: '埼京線走行中（大崎〜恵比寿）' },
  { time: '07:00:00', desc: '埼京線走行中（赤羽〜武蔵浦和）' },
  { time: '07:18:30', desc: '大宮駅停車中（大宮越境タイミング）' },
  { time: '07:25:00', desc: '川越線走行中（日進〜西大宮）' },
  { time: '07:40:00', desc: '川越線走行中（指扇〜川越）' },
];

let trackedId: string | null = rkTripId;
let lastSelected: ActiveTrain | null = null;

for (const pt of outTimes) {
  const sec = timeStringToSeconds(pt.time);
  const activeTrains = calculateActiveTrains({
    currentSec: sec,
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['rinkai', 'saikyo', 'kawagoe'],
  });

  const selected = resolveSelectedTrain(activeTrains, trackedId, lastSelected);
  if (selected) {
    lastSelected = selected;
    trackedId = selected.tripId;
  }

  console.log(`[時刻 ${pt.time}] ${pt.desc}`);
  console.log(`  追尾中ID: ${trackedId} | 路線: ${selected?.lineId} | 行先: ${selected?.customDestination || selected?.destinationStationId} | 現在駅: ${selected?.currentStationId} -> 次: ${selected?.nextStationId}`);
}

if (trackedId === kwTripId) {
  console.log('✅ テスト1 成功: 新木場発の快速26782便は、大崎で埼京線へ、大宮で川越線へ3路線完全直通追尾成功！\n');
} else {
  console.error(`❌ テスト1 失敗: 期待値 ${kwTripId} ですが ${trackedId} になりました\n`);
  process.exit(1);
}

// テスト2: 上り直通各駅停車（大宮発 新木場行 23081便）
// 埼京線: 大宮 06:21発 -> 大崎 07:21着 (WD_INB_JA-29_0605_23081)
// りんかい線: 大崎 07:22発 -> 新木場 07:42着 (WD_INB_R-08_0722_23081)
console.log('--- テスト2: 上り直通 23081便 (大宮 -> 大崎 -> 新木場) ---');
const skInbTripId = 'WD_INB_JA-29_0605_23081';
const rkInbTripId = 'WD_INB_R-08_0722_23081';

const inbTimes = [
  { time: '07:15:00', desc: '埼京線走行中（渋谷〜恵比寿）' },
  { time: '07:21:30', desc: '大崎駅停車中（越境タイミング）' },
  { time: '07:26:00', desc: 'りんかい線走行中（大井町〜品川シーサイド）' },
  { time: '07:35:00', desc: 'りんかい線走行中（東京テレポート〜国際展示場）' },
];

trackedId = skInbTripId;
lastSelected = null;

for (const pt of inbTimes) {
  const sec = timeStringToSeconds(pt.time);
  const activeTrains = calculateActiveTrains({
    currentSec: sec,
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['saikyo', 'rinkai'],
  });

  const selected = resolveSelectedTrain(activeTrains, trackedId, lastSelected);
  if (selected) {
    lastSelected = selected;
    trackedId = selected.tripId;
  }

  console.log(`[時刻 ${pt.time}] ${pt.desc}`);
  console.log(`  追尾中ID: ${trackedId} | 路線: ${selected?.lineId} | 行先: ${selected?.customDestination || selected?.destinationStationId} | 現在駅: ${selected?.currentStationId} -> 次: ${selected?.nextStationId}`);
}

if (trackedId === rkInbTripId) {
  console.log('✅ テスト2 成功: 埼京線上り23081便は大崎駅でりんかい線へ正常ハンドオーバー！\n');
} else {
  console.error(`❌ テスト2 失敗: 期待値 ${rkInbTripId} ですが ${trackedId} になりました\n`);
  process.exit(1);
}

// テスト3: 大崎止まり列車（別列車に誤爆しないか検証）
// りんかい線 新木場発 大崎行 105077便 (大崎到着 05:58:00)
console.log('--- テスト3: 大崎止まり列車 (大崎到着 05:58:00) の終了判定 ---');
const osakiTermId = 'WD_OUT_R-01_0539_105077';
const termTimes = ['05:57:00', '05:58:00', '05:59:00'];
trackedId = osakiTermId;
lastSelected = null;

for (const timeStr of termTimes) {
  const sec = timeStringToSeconds(timeStr);
  const activeTrains = calculateActiveTrains({
    currentSec: sec,
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['rinkai', 'saikyo'],
  });

  const selected = resolveSelectedTrain(activeTrains, trackedId, lastSelected);
  if (selected) {
    lastSelected = selected;
    trackedId = selected.tripId;
  } else {
    trackedId = null;
  }
  console.log(`[時刻 ${timeStr}] 追尾中ID: ${trackedId} | 列車: ${selected?.tripId || 'null (運行終了・追尾解除)'}`);
}

if (trackedId === null) {
  console.log('✅ テスト3 成功: 大崎止まり列車は別列車に飛ばされず、正しく追跡終了（null）になりました！\n');
} else {
  console.error(`❌ テスト3 失敗: 追跡終了せず ${trackedId} を追跡しています\n`);
  process.exit(1);
}

// テスト4: throughLineId による自動路線追加判定
console.log('--- テスト4: throughLineId による直通先路線の自動追加判定 ---');
{
  let selectedLineIds: string[] = ['rinkai'];
  const sec = timeStringToSeconds('06:20:00'); // 新木場走行中の 26782便
  const activeTrains = calculateActiveTrains({
    currentSec: sec,
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds,
  });

  const train = activeTrains.find((t) => t.tripId === rkTripId);
  if (train?.throughLineId && !selectedLineIds.includes(train.throughLineId)) {
    selectedLineIds = [...selectedLineIds, train.throughLineId];
    console.log(`[自動追加] 追尾中列車の throughLineId: '${train.throughLineId}' を検知し路線追加 -> selectedLineIds:`, selectedLineIds);
  }

  if (selectedLineIds.includes('saikyo')) {
    console.log('✅ テスト4 成功: throughLineId により saikyo が汎用ロジックで自動追加されました！\n');
  } else {
    console.error('❌ テスト4 失敗: saikyo が自動追加されませんでした\n');
    process.exit(1);
  }
}

// テスト5: 休日ダイヤ直通テスト (新木場発 川越行 26783便)
console.log('--- テスト5: 【休日ダイヤ】 下り直通 26783便 (新木場 -> 大崎 -> 大宮 -> 川越 3路線全線貫通) ---');
{
  const hdRkTripId = 'HD_OUT_R-01_0659_26783';
  const hdSkTripId = 'HD_OUT_JA-08_0720_26783';
  const hdKwTripId = 'kw_HD_OUT_JA-08_0720_26783';

  const hdTimes = [
    { time: '07:10:00', desc: 'りんかい線走行中（天王洲アイル〜品川シーサイド）' },
    { time: '07:19:30', desc: '大崎駅停車中（越境タイミング）' },
    { time: '07:35:00', desc: '埼京線走行中（新宿〜池袋）' },
    { time: '08:09:30', desc: '大宮駅停車中（大宮越境タイミング）' },
    { time: '08:20:00', desc: '川越線走行中（日進〜西大宮）' },
  ];

  let hdTrackedId: string | null = hdRkTripId;
  let hdLastSelected: ActiveTrain | null = null;

  for (const pt of hdTimes) {
    const sec = timeStringToSeconds(pt.time);
    const activeTrains = calculateActiveTrains({
      currentSec: sec,
      isHoliday: true,
      globalDelayMinutes: 0,
      randomDelays: {},
      isPlaying: true,
      speedMultiplier: 1,
      selectedLineIds: ['rinkai', 'saikyo', 'kawagoe'],
    });

    const selected = resolveSelectedTrain(activeTrains, hdTrackedId, hdLastSelected);
    if (selected) {
      hdLastSelected = selected;
      hdTrackedId = selected.tripId;
    }

    console.log(`[時刻 ${pt.time}] ${pt.desc}`);
    console.log(`  追尾中ID: ${hdTrackedId} | 路線: ${selected?.lineId} | 行先: ${selected?.customDestination || selected?.destinationStationId} | 現在駅: ${selected?.currentStationId} -> 次: ${selected?.nextStationId}`);
  }

  if (hdTrackedId === hdKwTripId) {
    console.log('✅ テスト5 成功: 休日ダイヤでも新木場発26783便は3路線全線貫通追尾成功！\n');
  } else {
    console.error(`❌ テスト5 失敗: 期待値 ${hdKwTripId} ですが ${hdTrackedId} になりました\n`);
    process.exit(1);
  }
}

console.log('🎉 大崎駅 埼京線・りんかい線 相互ハンドオーバー 全テスト合格！');
