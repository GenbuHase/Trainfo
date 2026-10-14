import { getThroughChainTrips, getThroughChainTripIds, timeStringToSeconds } from '../src/data/timetableData';
import { calculateActiveTrains } from '../src/services/trainSimulation';
import { LineId } from '../src/types';

const initialTripId = 'WD_INB_SO-18_0630_39292';
const selectedLines: LineId[] = ['sotetsu_main', 'sotetsu_shin_yokohama', 'sotetsu_jr_direct', 'saikyo', 'kawagoe'];

console.log('=== 海老名6:30発 川越行 追跡シミュレーション ===\n');

const chain = getThroughChainTrips(initialTripId);
console.log('初期チェーン:');
for (const t of chain) {
  console.log(`  [${t.lineId}] ${t.tripId} (${t.trainNumber}): ${t.stops[0].stationId}@${t.stops[0].departureTime} -> ${t.stops[t.stops.length-1].stationId}@${t.stops[t.stops.length-1].arrivalTime} dest=${t.customDestination}`);
}

const chainIds = getThroughChainTripIds(initialTripId);
let lastTrackedId = initialTripId;

const startSec = timeStringToSeconds('06:30:00');
const endSec = timeStringToSeconds('08:35:00');

for (let sec = startSec; sec <= endSec; sec += 120) {
  const activeTrains = calculateActiveTrains({
    currentSec: sec,
    isHoliday: false,
    isPlaying: true,
    speedMultiplier: 1,
    globalDelayMinutes: 0,
    randomDelays: {},
    selectedLineIds: selectedLines,
  });

  // App.tsx の探索ロジック
  let currentTracked = activeTrains.find(t => t.tripId === lastTrackedId);
  if (!currentTracked) {
    currentTracked = activeTrains.find(t => chainIds.has(t.tripId));
  }

  const timeStr = `${Math.floor(sec/3600).toString().padStart(2, '0')}:${Math.floor((sec%3600)/60).toString().padStart(2, '0')}:${(sec%60).toString().padStart(2, '0')}`;

  if (currentTracked) {
    lastTrackedId = currentTracked.tripId;
    console.log(`[時刻 ${timeStr}] 追尾中: ${currentTracked.tripId} (${currentTracked.trainNumber}, ${currentTracked.lineId}) 駅: ${currentTracked.currentStationId || currentTracked.fromStationId} -> ${currentTracked.nextStationId || currentTracked.toStationId}`);
  } else {
    console.log(`❌ [時刻 ${timeStr}] 追跡途切れ！ (lastTrackedId: ${lastTrackedId})`);
    // この時刻に周辺を走っている列車を探索
    const nearby = activeTrains.filter(t => t.customDestination?.includes('川越') || t.trainNumber?.includes('126M') || t.trainNumber?.includes('4761S'));
    console.log('   同時刻に走行中の川越方面列車:', nearby.map(t => `${t.tripId} (${t.trainNumber}, ${t.lineId}) ${t.fromStationId}->${t.toStationId}`));
    break;
  }
}
