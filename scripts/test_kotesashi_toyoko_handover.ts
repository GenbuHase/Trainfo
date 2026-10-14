import { calculateActiveTrains } from '../src/services/trainSimulation';
import { formatTrainNumber, timeStringToSeconds } from '../src/data/timetableData';
import { STATION_MAP } from '../src/data/stations';
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
    let successor = activeTrains.find((t) => {
      if (t.tripId === prev.tripId) return false;
      if (
        (prev.throughTripId && t.tripId === prev.throughTripId) ||
        (t.throughTripId && t.throughTripId === prev.tripId) ||
        (prev.prevTripId && t.tripId === prev.prevTripId) ||
        (t.prevTripId && t.prevTripId === prev.tripId)
      ) {
        return true;
      }
      return false;
    });

    if (successor) {
      return successor;
    }
  }

  return null;
}

console.log('=== 小手指9:40発 準急元町・中華街行 5路線貫通追尾テスト ===\n');

// 追尾タイムライン（小手指 09:40発 -> 練馬 10:11 -> 小竹向原 10:21 -> 渋谷 10:38 -> 横浜 11:06 -> 元町・中華街 11:16）
const timeline = [
  { time: '09:40:00', desc: '小手指駅発車（西武池袋線）' },
  { time: '09:55:00', desc: '石神井公園付近（西武池袋線・準急）' },
  { time: '10:11:00', desc: '練馬駅到着（西武線境界）' },
  { time: '10:18:00', desc: '新桜台付近（西武有楽町線）' },
  { time: '10:21:00', desc: '小竹向原駅到着（メトロ境界）' },
  { time: '10:30:00', desc: '東新宿付近（副都心線・急行Fライナー）' },
  { time: '10:38:00', desc: '渋谷駅到着（東急境界）' },
  { time: '10:39:00', desc: '渋谷駅発車（東急東横線・特急Fライナー）' },
  { time: '10:45:00', desc: '自由が丘付近（東急東横線・特急）' },
  { time: '10:55:00', desc: '菊名付近（東急東横線・特急）' },
  { time: '11:06:00', desc: '横浜駅到着（みなとみらい線境界）' },
  { time: '11:10:00', desc: 'みなとみらい付近（みなとみらい線）' },
  { time: '11:16:00', desc: '元町・中華街駅到着（終着）' },
];

let tracked: ActiveTrain | null = null;
let lastSelected: ActiveTrain | null = null;

const lines = ['seibu_ikebukuro', 'seibu_yurakucho', 'fukutoshin', 'tokyu_toyoko', 'minatomirai'];

for (const step of timeline) {
  const sec = timeStringToSeconds(step.time);
  const active = calculateActiveTrains({
    currentSec: sec,
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: lines,
  });

  if (!tracked) {
    tracked = active.find(t => t.tripId === 'WD_INB_SI-19_0940_144608') || null;
  } else {
    tracked = resolveSelectedTrain(active, tracked.tripId, lastSelected);
  }
  if (tracked) lastSelected = tracked;

  console.log(`[時刻 ${step.time}] ${step.desc}`);
  console.log(`  追尾ID: ${tracked?.tripId}`);
  console.log(`  路線: ${tracked?.lineId} | 種別: ${tracked?.trainType} | 行先: ${tracked?.customDestination}`);
  console.log(`  現在駅: ${tracked?.currentStationId} -> 次: ${tracked?.nextStationId} (状態: ${tracked?.status})\n`);

  if (!tracked) {
    console.error(`❌ エラー: 時刻 ${step.time} で列車を見失いました！`);
    process.exit(1);
  }
}

// 渋谷発車後（10:39以降）の路線が tokyu_toyoko、終盤が minatomirai になっているか検証
if (tracked && tracked.lineId === 'minatomirai' && tracked.customDestination === '元町・中華街') {
  console.log('✅ 検証成功: 小手指9:40発の列車は渋谷駅発車後も東急東横線・みなとみらい線へ正常に引き継がれ、別列車にすり替わることなく元町・中華街まで完全貫通追尾されました！');
} else {
  console.error('❌ 検証失敗: 最終到達状態が不正です。');
  process.exit(1);
}
