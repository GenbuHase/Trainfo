const { calculateActiveTrains } = require('../src/services/trainSimulation');
const { formatTrainNumber, timeStringToSeconds } = require('../src/data/timetableData');

// App.tsx の selectedTrain 判定ロジック
function resolveSelectedTrain(activeTrains, selectedTrainId, lastSelectedTrain) {
  if (!selectedTrainId) return null;
  const found = activeTrains.find(t => t.tripId === selectedTrainId);
  if (found) return found;

  const prev = lastSelectedTrain;
  if (prev) {
    const prevNo = formatTrainNumber(prev.trainNumber, prev.tripId);
    const successor = activeTrains.find(t => {
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

console.log('=== 特急アルプス（42781便）全線ハンドオーバーシミュレーションテスト ===\n');

const testPoints = [
  { time: '23:58:30', desc: '新宿発車直後 (chuo)' },
  { time: '00:35:00', desc: '立川発車 (chuo)' },
  { time: '00:46:00', desc: '八王子発車 (chuo)' },
  { time: '00:51:30', desc: '高尾接近 (chuo)' },
  { time: '00:53:00', desc: '高尾通過・中央本線進入 (chuo_main)' },
  { time: '01:36:00', desc: '大月通過 (chuo_main)' },
  { time: '02:41:00', desc: '甲府通過 (chuo_main)' },
  { time: '03:30:00', desc: '小淵沢通過 (chuo_main)' },
  { time: '04:29:30', desc: '塩尻接近 (chuo_main)' },
  { time: '04:31:00', desc: '塩尻通過・篠ノ井線進入 (shinonoi)' },
  { time: '04:40:00', desc: '平田通過 (shinonoi)' },
  { time: '04:47:00', desc: '松本駅停車中 (shinonoi)' },
];

for (const isHoliday of [false, true]) {
  console.log(`\n================== 【${isHoliday ? '休日ダイヤ' : '平日ダイヤ'}】 ==================`);
  let trackedId = isHoliday ? 'HD_OUT_JC-05_2358_42781' : 'WD_OUT_JC-05_2358_42781';
  let lastSelected = null;

  for (const pt of testPoints) {
    const sec = timeStringToSeconds(pt.time);
    const activeTrains = calculateActiveTrains({
      currentSec: sec,
      isHoliday,
      globalDelayMinutes: 0,
      randomDelays: {},
      isPlaying: true,
      speedMultiplier: 1,
      selectedLineIds: ['chuo', 'chuo_main', 'shinonoi'],
    });

    const selected = resolveSelectedTrain(activeTrains, trackedId, lastSelected);
    if (selected) {
      lastSelected = selected;
      trackedId = selected.tripId;
    }

    console.log(`[時刻 ${pt.time}] ${pt.desc}`);
    console.log(`  追尾ID: ${trackedId}`);
    console.log(`  路線: ${selected?.lineId || 'NONE'}`);
    console.log(`  行先: ${selected?.customDestination || selected?.destinationStationId}`);
    console.log(`  現在駅: ${selected?.currentStationId} -> 次: ${selected?.nextStationId}`);
    console.log(`  座標: [${selected?.currentLat?.toFixed(4)}, ${selected?.currentLng?.toFixed(4)}]\n`);
  }
}

console.log('✨ 特急アルプス全線シミュレーションテスト完了！');
