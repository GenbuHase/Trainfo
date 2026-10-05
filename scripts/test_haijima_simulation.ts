import { calculateActiveTrains } from '../src/services/trainSimulation';
import { formatTrainNumber, timeStringToSeconds } from '../src/data/timetableData';
import type { ActiveTrain } from '../src/types';

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
    if (successor) return successor;
  }
  return null;
}

console.log('=== 南古谷発 拝島行 (575H/574E) シミュレーション追尾テスト ===\n');

const testTimes = [
  '05:40:00', // 南古谷発車
  '05:44:00', // 川越到着
  '05:47:00', // 川越発車（ユーザーが報告した消失タイミング！）
  '05:50:00', // 西川越
  '05:55:00', // 的場〜笠幡間
  '06:08:00', // 高麗川到着
  '06:14:00', // 高麗川停車中
  '06:16:00', // 高麗川発車後 (八高線区間)
  '06:30:00', // 東飯能〜金子間 (八高線区間)
  '06:45:00', // 拝島終着
];

let trackedId: string | null = 'WD_OUT_JA-30_0540_24549';
let lastSelected: ActiveTrain | null = null;

for (const timeStr of testTimes) {
  const sec = timeStringToSeconds(timeStr);
  const activeTrains = calculateActiveTrains({
    currentSec: sec,
    isHoliday: false,
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
  }

  console.log(`[時刻 ${timeStr}] 追尾ID: ${trackedId} | 路線: ${selected?.lineId} | 種別: ${selected?.trainType} | 行先: ${selected?.customDestination || selected?.destinationStationId} | 現在駅: ${selected?.currentStationId} -> 次: ${selected?.nextStationId}`);
  if (!selected) {
    console.error(`❌ エラー: 時刻 ${timeStr} で列車が消失しました！`);
    process.exit(1);
  }
}

console.log('\n🎉 テスト大成功: 南古谷発車から川越駅通過、高麗川駅直通ハンドオーバーを経て拝島終着まで一度も消失せず追尾が継続しました！');
