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
    const prevNo = formatTrainNumber(prev.trainNumber, prev.trainId, prev.tripId);
    const successor = activeTrains.find((t) => {
      if (t.tripId === prev.tripId) return false;
      // 1. 直通先トリップID照合（路線に依存しない共通メタデータ）
      if (
        (prev.throughTripId && t.tripId === prev.throughTripId) ||
        (t.throughTripId && t.throughTripId === prev.tripId)
      ) {
        return true;
      }
      // 2. 同一運行便ID（trainId）判定（会社境界で列車番号が変化する直通列車の確実な引き継ぎ）
      if (prev.trainId && t.trainId && prev.trainId === t.trainId) {
        return true;
      }
      // 3. 同一列車番号かつ同一方向判定
      const curNo = formatTrainNumber(t.trainNumber, t.trainId, t.tripId);
      if (curNo && prevNo && curNo === prevNo && t.direction === prev.direction) {
        return true;
      }
      return false;
    });
    if (successor) return successor;
  }
  return null;
}

console.log('=== 和光市駅 東上線 ↔ 東京メトロ 相互ハンドオーバーテスト開始 ===\n');

// テスト1: 東上線 -> 有楽町線直通 各駅停車（新木場行 114886便）
// 東上線: 森林公園 05:07発 -> 和光市 05:58着 (WD_INB_TJ-30_0507_114886)
// 有楽町線: 和光市 05:59発 -> 新木場 06:49着 (WD_OUT_Y-01_0559_114886)
console.log('--- テスト1: 東上線 -> 有楽町線直通 114886便 (森林公園 -> 和光市 -> 新木場) ---');
const tjTrip1 = 'WD_INB_TJ-30_0507_114886';
const yTrip1 = 'WD_OUT_Y-01_0559_114886';

const times1 = [
  { time: '05:50:00', desc: '東上線走行中（志木〜朝霞台）' },
  { time: '05:57:00', desc: '東上線和光市接近中（朝霞〜和光市）' },
  { time: '05:58:30', desc: '和光市駅停車中（越境タイミング）' },
  { time: '06:05:00', desc: '有楽町線走行中（地下鉄成増〜平和台）' },
  { time: '06:20:00', desc: '有楽町線走行中（池袋〜飯田橋）' },
  { time: '06:40:00', desc: '有楽町線走行中（有楽町〜豊洲）' },
];

let tracked1: ActiveTrain | null = null;
let lastSelected1: ActiveTrain | null = null;

for (const t of times1) {
  const sec = timeStringToSeconds(t.time);
  const active = calculateActiveTrains({
    currentSec: sec,
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['tojo', 'yurakucho'],
  });

  if (!tracked1) {
    tracked1 = active.find(tr => tr.tripId === tjTrip1) || null;
  } else {
    tracked1 = resolveSelectedTrain(active, tracked1.tripId, lastSelected1);
  }
  if (tracked1) lastSelected1 = tracked1;

  console.log(`[時刻 ${t.time}] 追尾中ID: ${tracked1?.tripId} | 路線: ${tracked1?.lineId} | 種別: ${tracked1?.trainType} | 行先: ${tracked1?.customDestination} | 現在駅: ${tracked1?.currentStationId} -> 次: ${tracked1?.nextStationId} (${t.desc})`);
}

if (tracked1 && tracked1.tripId === yTrip1 && tracked1.lineId === 'yurakucho') {
  console.log('✅ テスト1 成功: 東上線から有楽町線へ正常に越境ハンドオーバーされました！\n');
} else {
  console.error('❌ テスト1 失敗: 有楽町線へのハンドオーバーが行われませんでした。\n');
  process.exit(1);
}

// テスト2: 東上線 -> 副都心線直通 急行（湘南台行 114932便）
// 東上線: 森林公園 05:31発 -> 和光市 06:17着 (WD_INB_TJ-30_0531_114932)
// 副都心線: 和光市 06:18発 -> 渋谷 06:49着 (WD_OUT_F-01_0618_114932)
console.log('--- テスト2: 東上線 -> 副都心線直通 114932便 (森林公園 -> 和光市 -> 渋谷 -> 湘南台) ---');
const tjTrip2 = 'WD_INB_TJ-30_0531_114932';
const fTrip2 = 'WD_OUT_F-01_0618_114932';

const times2 = [
  { time: '06:10:00', desc: '東上線走行中（志木〜朝霞台）' },
  { time: '06:16:30', desc: '東上線和光市接近中（朝霞〜和光市）' },
  { time: '06:17:30', desc: '和光市駅停車中（越境タイミング）' },
  { time: '06:25:00', desc: '副都心線走行中（小竹向原〜池袋）' },
  { time: '06:40:00', desc: '副都心線走行中（東新宿〜新宿三丁目）' },
  { time: '06:48:00', desc: '副都心線渋谷接近中（明治神宮前〜渋谷）' },
];

let tracked2: ActiveTrain | null = null;
let lastSelected2: ActiveTrain | null = null;

for (const t of times2) {
  const sec = timeStringToSeconds(t.time);
  const active = calculateActiveTrains({
    currentSec: sec,
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['tojo', 'fukutoshin'],
  });

  if (!tracked2) {
    tracked2 = active.find(tr => tr.tripId === tjTrip2) || null;
  } else {
    tracked2 = resolveSelectedTrain(active, tracked2.tripId, lastSelected2);
  }
  if (tracked2) lastSelected2 = tracked2;

  console.log(`[時刻 ${t.time}] 追尾中ID: ${tracked2?.tripId} | 路線: ${tracked2?.lineId} | 種別: ${tracked2?.trainType} | 行先: ${tracked2?.customDestination} | 現在駅: ${tracked2?.currentStationId} -> 次: ${tracked2?.nextStationId} (${t.desc})`);
}

if (tracked2 && tracked2.tripId === fTrip2 && tracked2.lineId === 'fukutoshin') {
  console.log('✅ テスト2 成功: 東上線から副都心線へ正常に越境ハンドオーバーされました！\n');
} else {
  console.error('❌ テスト2 失敗: 副都心線へのハンドオーバーが行われませんでした。\n');
  process.exit(1);
}

// テスト3: 終着駅（新木場）到着後の正常終了判定
console.log('--- テスト3: 有楽町線 終着新木場駅到着後の運行終了判定 ---');
// 114886便は新木場 06:50着
const times3 = ['06:49:00', '06:50:00', '06:51:00'];
let tracked3 = tracked1;
let lastSelected3 = lastSelected1;

for (const tm of times3) {
  const sec = timeStringToSeconds(tm);
  const active = calculateActiveTrains({
    currentSec: sec,
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['yurakucho'],
  });
  tracked3 = resolveSelectedTrain(active, tracked3?.tripId || null, lastSelected3);
  if (tracked3) lastSelected3 = tracked3;
  console.log(`[時刻 ${tm}] 追尾中ID: ${tracked3?.tripId || 'null (運行終了・追尾解除)'}`);
}

if (tracked3 === null) {
  console.log('✅ テスト3 成功: 終着駅（新木場）到着後に正しく運行終了（null）になりました！\n');
} else {
  console.error('❌ テスト3 失敗: 終着駅後も追尾が解除されませんでした。\n');
  process.exit(1);
}

// テスト4: throughLineId による自動路線追加判定
console.log('--- テスト4: throughLineId による直通先路線の自動追加判定 ---');
let selectedLineIds = ['tojo'];
const currentTrain = calculateActiveTrains({
  currentSec: timeStringToSeconds('05:55:00'),
  isHoliday: false,
  globalDelayMinutes: 0,
  randomDelays: {},
  isPlaying: true,
  speedMultiplier: 1,
  selectedLineIds: ['tojo'],
}).find(t => t.tripId === tjTrip1);

if (currentTrain?.throughLineId && !selectedLineIds.includes(currentTrain.throughLineId)) {
  selectedLineIds = [...selectedLineIds, currentTrain.throughLineId];
  console.log(`[自動追加] 追尾中列車の throughLineId: '${currentTrain.throughLineId}' を検知し路線追加 -> selectedLineIds:`, selectedLineIds);
}

if (selectedLineIds.includes('yurakucho')) {
  console.log('✅ テスト4 成功: throughLineId により yurakucho が汎用ロジックで自動追加されました！\n');
} else {
  console.error('❌ テスト4 失敗: yurakucho が自動追加されませんでした。\n');
  process.exit(1);
}

console.log('🎉 全和光市駅ハンドオーバーテスト合格！');
