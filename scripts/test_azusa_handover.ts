import { calculateActiveTrains } from '../src/services/trainSimulation';
import { formatTrainNumber, timeStringToSeconds } from '../src/data/timetableData';
import { STATION_MAP } from '../src/data/stations';
import type { ActiveTrain } from '../src/types';

// App.tsx の selectedTrain 判定ロジックを忠実に再現
function resolveSelectedTrain(
  activeTrains: ActiveTrain[],
  selectedTrainId: string | null,
  lastSelectedTrain: ActiveTrain | null
): ActiveTrain | null {
  if (!selectedTrainId) return null;
  const found = activeTrains.find((t) => t.tripId === selectedTrainId);
  if (found) {
    if (found.throughTripId) {
      const isFoundEnding = found.stops[found.stops.length - 1]?.stationId === found.currentStationId;
      if (isFoundEnding) {
        const successor = activeTrains.find((t) => t.tripId === found.throughTripId);
        if (successor) {
          const foundOrigin = found.customOrigin || STATION_MAP.get(found.originStationId)?.name;
          if (!successor.customOrigin && foundOrigin) {
            successor.customOrigin = foundOrigin;
          }
          if (!successor.customDestination && found.customDestination) {
            successor.customDestination = found.customDestination;
          }
          return successor;
        }
      }
    }

    const prev = lastSelectedTrain;
    if (
      prev &&
      (prev.tripId === found.tripId ||
        formatTrainNumber(prev.trainNumber, prev.tripId) === formatTrainNumber(found.trainNumber, found.tripId))
    ) {
      const prevOrigin = prev.customOrigin || STATION_MAP.get(prev.originStationId)?.name;
      if (!found.customOrigin && prevOrigin) {
        found.customOrigin = prevOrigin;
      }
      if (!found.customDestination && prev.customDestination) {
        found.customDestination = prev.customDestination;
      }
    }
    return found;
  }

  const prev = lastSelectedTrain;
  if (prev) {
    const prevNo = formatTrainNumber(prev.trainNumber, prev.trainId, prev.tripId);
    let successor = activeTrains.find(
      (t) =>
        t.tripId !== prev.tripId &&
        ((prev.throughTripId && t.tripId === prev.throughTripId) ||
          (t.throughTripId && t.throughTripId === prev.tripId))
    );
    if (!successor && prev.trainId) {
      successor = activeTrains.find((t) => t.tripId !== prev.tripId && t.trainId === prev.trainId);
    }
    if (!successor && prevNo) {
      successor = activeTrains.find(
        (t) =>
          t.tripId !== prev.tripId &&
          formatTrainNumber(t.trainNumber, t.trainId, t.tripId) === prevNo &&
          t.direction === prev.direction
      );
    }
    if (successor) {
      const prevOrigin = prev.customOrigin || STATION_MAP.get(prev.originStationId)?.name;
      if (!successor.customOrigin && prevOrigin) {
        successor.customOrigin = prevOrigin;
      }
      if (!successor.customDestination && prev.customDestination) {
        successor.customDestination = prev.customDestination;
      }
      return successor;
    }
  }
  return null;
}

console.log('=== 特急あずさ ハンドオーバー & 始発駅表示保持テスト ===\n');

// ----------------------------------------------------------------------
// テスト1: 白馬発あずさ38号（平日: 42025 / 休日: 42026）全区間追尾
// 白馬 13:43 -> 松本 14:47着/14:50発 -> 塩尻 14:58通過 -> 上諏訪 15:11着/15:12発 -> 新宿 17:26着
// ----------------------------------------------------------------------
const azusa38Points = [
  { time: '13:44:00', desc: '白馬発車直後 (oito_east)', expectedLine: 'oito_east', expectedOrigin: '白馬' },
  { time: '14:10:00', desc: '信濃大町発車 (oito_east)', expectedLine: 'oito_east', expectedOrigin: '白馬' },
  { time: '14:48:00', desc: '松本駅停車中 (shinonoi)', expectedLine: 'shinonoi', expectedOrigin: '白馬' },
  { time: '14:51:00', desc: '松本発車直後・篠ノ井線走行 (shinonoi)', expectedLine: 'shinonoi', expectedOrigin: '白馬' },
  { time: '14:55:00', desc: '村井〜広丘走行中 (shinonoi)', expectedLine: 'shinonoi', expectedOrigin: '白馬' },
  { time: '14:59:00', desc: '塩尻通過直後・中央本線進入 (chuo_main)', expectedLine: 'chuo_main', expectedOrigin: '白馬' },
  { time: '15:05:00', desc: '岡谷通過 (chuo_main)', expectedLine: 'chuo_main', expectedOrigin: '白馬' },
  { time: '15:11:30', desc: '上諏訪停車中 (chuo_main)', expectedLine: 'chuo_main', expectedOrigin: '白馬' },
  { time: '15:53:30', desc: '甲府停車中 (chuo_main)', expectedLine: 'chuo_main', expectedOrigin: '白馬' },
  { time: '16:44:00', desc: '相模湖〜高尾走行中 (chuo_main)', expectedLine: 'chuo_main', expectedOrigin: '白馬' },
  { time: '16:47:00', desc: '高尾通過後・中央快速線進入 (chuo)', expectedLine: 'chuo', expectedOrigin: '白馬' },
  { time: '16:50:00', desc: '八王子停車中 (chuo)', expectedLine: 'chuo', expectedOrigin: '白馬' },
  { time: '17:15:00', desc: '三鷹〜中野走行中 (chuo)', expectedLine: 'chuo', expectedOrigin: '白馬' },
];

for (const isHoliday of [false, true]) {
  console.log(`\n================== 【あずさ38号（白馬発）: ${isHoliday ? '休日ダイヤ' : '平日ダイヤ'}】 ==================`);
  const initialTripId = isHoliday ? 'HD_INB_OE-29_1343_42026' : 'WD_INB_OE-29_1343_42025';
  let trackedId: string | null = initialTripId;
  let lastSelected: ActiveTrain | null = null;
  const selectedLines = ['oito_east', 'shinonoi', 'chuo_main', 'chuo'];

  for (const pt of azusa38Points) {
    const sec = timeStringToSeconds(pt.time);
    const activeTrains = calculateActiveTrains({
      currentSec: sec,
      isHoliday,
      globalDelayMinutes: 0,
      randomDelays: {},
      isPlaying: true,
      speedMultiplier: 1,
      selectedLineIds: selectedLines,
    });

    const selected = resolveSelectedTrain(activeTrains, trackedId, lastSelected);
    if (selected) {
      lastSelected = selected;
      trackedId = selected.tripId;
    }

    const originName = selected?.customOrigin || (selected?.originStationId ? STATION_MAP.get(selected.originStationId)?.name : '不明');
    const destName = selected?.customDestination || (selected?.destinationStationId ? STATION_MAP.get(selected.destinationStationId)?.name : '不明');

    console.log(`[時刻 ${pt.time}] ${pt.desc}`);
    console.log(`  追尾ID: ${trackedId} | 路線: ${selected?.lineId}`);
    console.log(`  始発駅表示: ${originName} (customOrigin: ${selected?.customOrigin})`);
    console.log(`  行先表示: ${destName}`);
    console.log(`  現在駅: ${selected?.currentStationId} -> 次: ${selected?.nextStationId}`);

    if (!selected) {
      throw new Error(`[FAIL] ${pt.time} (${pt.desc}) で列車が消失しました（見つかりません）`);
    }
    if (selected.lineId !== pt.expectedLine) {
      throw new Error(`[FAIL] ${pt.time} 路線が一致しません: 期待値=${pt.expectedLine}, 実際=${selected.lineId}`);
    }
    if (originName !== pt.expectedOrigin) {
      throw new Error(`[FAIL] ${pt.time} 始発駅が期待値「${pt.expectedOrigin}」ではありません: 実際=${originName}`);
    }
  }
}

// ----------------------------------------------------------------------
// テスト2: 松本始発あずさ4号（平日: 6919 / 休日: 6920）の塩尻跨ぎテスト
// 松本 06:30 -> 塩尻 06:38 -> 上諏訪 06:53 -> 甲府 07:39 -> 高尾 08:30 -> 東京 09:29
// ----------------------------------------------------------------------
const azusa4Points = [
  { time: '06:31:00', desc: '松本発車直後 (shinonoi)', expectedLine: 'shinonoi', expectedOrigin: '松本' },
  { time: '06:36:00', desc: '塩尻到着手前 (shinonoi)', expectedLine: 'shinonoi', expectedOrigin: '松本' },
  { time: '06:38:30', desc: '塩尻駅停車中/発車直後 (chuo_main)', expectedLine: 'chuo_main', expectedOrigin: '松本' },
  { time: '06:42:00', desc: 'みどり湖〜岡谷走行中 (chuo_main)', expectedLine: 'chuo_main', expectedOrigin: '松本' },
  { time: '06:54:00', desc: '上諏訪発車 (chuo_main)', expectedLine: 'chuo_main', expectedOrigin: '松本' },
  { time: '07:40:00', desc: '甲府発車 (chuo_main)', expectedLine: 'chuo_main', expectedOrigin: '松本' },
  { time: '08:32:00', desc: '高尾通過・中央快速線進入 (chuo)', expectedLine: 'chuo', expectedOrigin: '松本' },
  { time: '09:00:00', desc: '三鷹〜中野走行中 (chuo)', expectedLine: 'chuo', expectedOrigin: '松本' },
];

for (const isHoliday of [false, true]) {
  console.log(`\n================== 【あずさ4号（松本発）: ${isHoliday ? '休日ダイヤ' : '平日ダイヤ'}】 ==================`);
  const initialTripId = isHoliday ? 'HD_INB_SN-06_0630_6920' : 'WD_INB_SN-06_0630_6919';
  let trackedId: string | null = initialTripId;
  let lastSelected: ActiveTrain | null = null;
  const selectedLines = ['shinonoi', 'chuo_main', 'chuo'];

  for (const pt of azusa4Points) {
    const sec = timeStringToSeconds(pt.time);
    const activeTrains = calculateActiveTrains({
      currentSec: sec,
      isHoliday,
      globalDelayMinutes: 0,
      randomDelays: {},
      isPlaying: true,
      speedMultiplier: 1,
      selectedLineIds: selectedLines,
    });

    const selected = resolveSelectedTrain(activeTrains, trackedId, lastSelected);
    if (selected) {
      lastSelected = selected;
      trackedId = selected.tripId;
    }

    const originName = selected?.customOrigin || (selected?.originStationId ? STATION_MAP.get(selected.originStationId)?.name : '不明');
    const destName = selected?.customDestination || (selected?.destinationStationId ? STATION_MAP.get(selected.destinationStationId)?.name : '不明');

    console.log(`[時刻 ${pt.time}] ${pt.desc}`);
    console.log(`  追尾ID: ${trackedId} | 路線: ${selected?.lineId}`);
    console.log(`  始発駅表示: ${originName} (customOrigin: ${selected?.customOrigin})`);
    console.log(`  行先表示: ${destName}`);
    console.log(`  現在駅: ${selected?.currentStationId} -> 次: ${selected?.nextStationId}`);

    if (!selected) {
      throw new Error(`[FAIL] ${pt.time} (${pt.desc}) で列車が見つかりません`);
    }
    if (selected.lineId !== pt.expectedLine) {
      throw new Error(`[FAIL] ${pt.time} 路線が一致しません: 期待値=${pt.expectedLine}, 実際=${selected.lineId}`);
    }
    if (originName !== pt.expectedOrigin) {
      throw new Error(`[FAIL] ${pt.time} 始発駅が期待値「${pt.expectedOrigin}」ではありません: 実際=${originName}`);
    }
  }
}

// ----------------------------------------------------------------------
// テスト3: 単体クリック時（追尾なし）でも中央本線内あずさの始発駅が「松本」になっているか
// ----------------------------------------------------------------------
console.log('\n================== 【単体選択テスト（追尾なし）】 ==================');
const singleTest = calculateActiveTrains({
  currentSec: timeStringToSeconds('07:00:00'),
  isHoliday: false,
  globalDelayMinutes: 0,
  randomDelays: {},
  isPlaying: true,
  speedMultiplier: 1,
  selectedLineIds: ['chuo_main'],
});
const azusa4InChuoMain = singleTest.find((t) => t.trainId === '6919');
if (!azusa4InChuoMain) {
  throw new Error('[FAIL] 07:00:00 で中央本線内のあずさ4号が見つかりません');
}
const azusa4Origin = azusa4InChuoMain.customOrigin || (azusa4InChuoMain.originStationId ? STATION_MAP.get(azusa4InChuoMain.originStationId)?.name : '不明');
console.log(`中央本線内あずさ4号単体選択時: 始発駅=${azusa4Origin} (customOrigin=${azusa4InChuoMain.customOrigin})`);
if (azusa4Origin !== '松本') {
  throw new Error(`[FAIL] 単体選択時の始発駅が松本ではありません: ${azusa4Origin}`);
}

console.log('\n✨ 特急あずさの全ハンドオーバー & 始発駅表示テストに合格しました！');
