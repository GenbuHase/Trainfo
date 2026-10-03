import { calculateActiveTrains } from '../src/services/trainSimulation';
import { formatTrainNumber, timeStringToSeconds } from '../src/data/timetableData';
import type { ActiveTrain } from '../src/types';

// App.tsx の selectedTrain 判定ロジック（修正後）
function resolveSelectedTrain(
  activeTrains: ActiveTrain[],
  selectedTrainId: string | null,
  lastSelectedTrain: ActiveTrain | null
): ActiveTrain | null {
  if (!selectedTrainId) return null;
  const found = activeTrains.find((t) => t.tripId === selectedTrainId);
  if (found) {
    const prev = lastSelectedTrain;
    if (
      prev &&
      (prev.tripId === found.tripId ||
        formatTrainNumber(prev.trainNumber, prev.tripId) === formatTrainNumber(found.trainNumber, found.tripId))
    ) {
      if (!found.customOrigin && prev.customOrigin) {
        found.customOrigin = prev.customOrigin;
      }
      if (!found.customDestination && prev.customDestination) {
        found.customDestination = prev.customDestination;
      }
    }
    return found;
  }

  const prev = lastSelectedTrain;
  if (prev) {
    const prevNo = formatTrainNumber(prev.trainNumber, prev.tripId);
    const successor = activeTrains.find((t) => {
      if (t.tripId === prev.tripId) return false;
      if (
        (prev.throughTripId && t.tripId === prev.throughTripId) ||
        (t.throughTripId && t.throughTripId === prev.tripId)
      ) {
        return true;
      }
      const curNo = formatTrainNumber(t.trainNumber, t.tripId);
      if (curNo && prevNo && curNo === prevNo && t.direction === prev.direction) {
        return true;
      }
      return false;
    });
    if (successor) {
      if (!successor.customOrigin && prev.customOrigin) {
        successor.customOrigin = prev.customOrigin;
      }
      if (!successor.customDestination && prev.customDestination) {
        successor.customDestination = prev.customDestination;
      }
      return successor;
    }
  }
  return null;
}

console.log('=== 特急アルプス（42781便）全線ハンドオーバー & 始発駅保持テスト ===\n');

const testPoints = [
  { time: '23:58:30', desc: '新宿発車直後 (chuo)', expectedLine: 'chuo', expectedOrigin: 'JC-05', expectedCustomOrigin: undefined },
  { time: '00:35:00', desc: '立川発車 (chuo)', expectedLine: 'chuo', expectedOrigin: 'JC-05', expectedCustomOrigin: undefined },
  { time: '00:46:00', desc: '八王子発車 (chuo)', expectedLine: 'chuo', expectedOrigin: 'JC-05', expectedCustomOrigin: undefined },
  { time: '00:53:00', desc: '高尾通過・中央本線進入 (chuo_main)', expectedLine: 'chuo_main', expectedOrigin: 'JC-24', expectedCustomOrigin: '新宿' },
  { time: '01:36:00', desc: '大月通過 (chuo_main)', expectedLine: 'chuo_main', expectedOrigin: 'JC-24', expectedCustomOrigin: '新宿' },
  { time: '02:41:00', desc: '甲府通過 (chuo_main)', expectedLine: 'chuo_main', expectedOrigin: 'JC-24', expectedCustomOrigin: '新宿' },
  { time: '03:30:00', desc: '小淵沢通過 (chuo_main)', expectedLine: 'chuo_main', expectedOrigin: 'JC-24', expectedCustomOrigin: '新宿' },
  { time: '04:31:00', desc: '塩尻通過・篠ノ井線進入 (shinonoi)', expectedLine: 'shinonoi', expectedOrigin: 'SN-01', expectedCustomOrigin: '新宿' },
  { time: '04:47:00', desc: '松本駅停車中 (shinonoi)', expectedLine: 'shinonoi', expectedOrigin: 'SN-01', expectedCustomOrigin: '新宿' },
  { time: '04:50:00', desc: '松本駅発車直後 (oito_east)', expectedLine: 'oito_east', expectedOrigin: 'OE-01', expectedCustomOrigin: '新宿' },
  { time: '05:23:30', desc: '信濃大町停車中 (oito_east)', expectedLine: 'oito_east', expectedOrigin: 'OE-01', expectedCustomOrigin: '新宿' },
  { time: '05:48:00', desc: '白馬駅接近 (oito_east)', expectedLine: 'oito_east', expectedOrigin: 'OE-01', expectedCustomOrigin: '新宿' },
];

for (const isHoliday of [false, true]) {
  console.log(`\n================== 【${isHoliday ? '休日ダイヤ' : '平日ダイヤ'}】 ==================`);
  let trackedId: string | null = isHoliday ? 'HD_OUT_JC-05_2358_42781' : 'WD_OUT_JC-05_2358_42781';
  let lastSelected: ActiveTrain | null = null;
  const selectedLines = ['chuo', 'chuo_main', 'shinonoi', 'oito_east'];

  for (const pt of testPoints) {
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

    const displayOrigin = selected?.customOrigin || (selected?.originStationId === 'JC-05' ? '新宿' : selected?.originStationId);
    const displayDest = selected?.customDestination || selected?.destinationStationId;

    console.log(`[時刻 ${pt.time}] ${pt.desc}`);
    console.log(`  追尾ID: ${trackedId} | 路線: ${selected?.lineId}`);
    console.log(`  始発駅表示: ${displayOrigin} (customOrigin: ${selected?.customOrigin})`);
    console.log(`  行先表示: ${displayDest}`);
    console.log(`  現在駅: ${selected?.currentStationId} -> 次: ${selected?.nextStationId}`);

    if (!selected) {
      throw new Error(`[FAIL] ${pt.time} で列車が見つかりません`);
    }
    if (selected.lineId !== pt.expectedLine) {
      throw new Error(`[FAIL] ${pt.time} 路線が一致しません: 期待値=${pt.expectedLine}, 実際=${selected.lineId}`);
    }
    if (displayOrigin !== '新宿') {
      throw new Error(`[FAIL] ${pt.time} 始発駅が新宿ではありません: 実際=${displayOrigin}`);
    }
    if (displayDest !== '白馬') {
      throw new Error(`[FAIL] ${pt.time} 行先が白馬ではありません: 実際=${displayDest}`);
    }
  }
}

console.log('\n✨ 特急アルプス全線シミュレーションテスト合格！松本駅発車後も始発駅「新宿」が正常に保持されています。');
