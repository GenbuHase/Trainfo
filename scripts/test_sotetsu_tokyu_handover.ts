import { calculateActiveTrains } from '../src/services/trainSimulation';
import { formatTrainNumber, timeStringToSeconds } from '../src/data/timetableData';
import { STATION_MAP } from '../src/data/stations';
import type { ActiveTrain, TimetableTrip } from '../src/types';
import rawToyoko from '../src/data/lines/tokyu_toyoko/globalTimetable.json';
import rawTokyuShinYokohama from '../src/data/lines/tokyu_shin_yokohama/globalTimetable.json';
import rawSotetsuShinYokohama from '../src/data/lines/sotetsu_shin_yokohama/globalTimetable.json';
import rawSotetsuMain from '../src/data/lines/sotetsu_main/globalTimetable.json';
import rawSotetsuIzumino from '../src/data/lines/sotetsu_izumino/globalTimetable.json';
import rawSotetsuJr from '../src/data/lines/sotetsu_jr_direct/globalTimetable.json';

const toyokoTrips = rawToyoko as unknown as TimetableTrip[];
const tokyuShinYokohamaTrips = rawTokyuShinYokohama as unknown as TimetableTrip[];
const sotetsuShinYokohamaTrips = rawSotetsuShinYokohama as unknown as TimetableTrip[];
const sotetsuMainTrips = rawSotetsuMain as unknown as TimetableTrip[];
const sotetsuIzuminoTrips = rawSotetsuIzumino as unknown as TimetableTrip[];
const sotetsuJrTrips = rawSotetsuJr as unknown as TimetableTrip[];

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
    let successor = activeTrains.find((t) => {
      if (t.tripId === prev.tripId) return false;
      // 1. 直通先/元トリップID照合
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

    if (!successor && prev.trainId) {
      successor = activeTrains.find((t) => t.tripId !== prev.tripId && t.trainId === prev.trainId);
    }

    if (successor) {
      const prevOrigin = prev.customOrigin || STATION_MAP.get(prev.originStationId)?.name;
      if (prevOrigin && (!successor.customOrigin || successor.customOrigin === STATION_MAP.get(successor.originStationId)?.name)) {
        successor.customOrigin = prevOrigin;
      }
      if (prev.customDestination && (!successor.customDestination || successor.customDestination === STATION_MAP.get(successor.destinationStationId)?.name)) {
        successor.customDestination = prev.customDestination;
      }
      return successor;
    }
  }
  return null;
}

console.log('=== 東急・相鉄直通線 総合ハンドオーバーテスト ===\n');

// 1. 下り4路線直通（東横線 -> 東急新横浜線 -> 相鉄新横浜線 -> 相鉄本線）のサンプル探索
console.log('--- 探索: 東横線 -> 東急新横浜線 -> 相鉄新横浜線 -> 相鉄本線 4路線貫通列車 ---');
const tyDown = toyokoTrips.filter(t => !t.isHoliday && t.direction === 'outbound' && t.throughTripId);
let t1TY: TimetableTrip | null = null;
let t1TSH: TimetableTrip | null = null;
let t1SSH: TimetableTrip | null = null;
let t1SM: TimetableTrip | null = null;

for (const ty of tyDown) {
  const tsh = tokyuShinYokohamaTrips.find(t => t.tripId === ty.throughTripId);
  if (tsh && tsh.throughTripId) {
    const ssh = sotetsuShinYokohamaTrips.find(t => t.tripId === tsh.throughTripId);
    if (ssh && ssh.throughTripId) {
      const sm = sotetsuMainTrips.find(t => t.tripId === ssh.throughTripId);
      if (sm) {
        t1TY = ty;
        t1TSH = tsh;
        t1SSH = ssh;
        t1SM = sm;
        break;
      }
    }
  }
}

if (t1TY && t1TSH && t1SSH && t1SM) {
  console.log(`見つかった下り貫通便:`);
  console.log(`  東横線: ${t1TY.tripId} (${t1TY.trainNumber}) [${t1TY.stops[0].departureTime} -> ${t1TY.stops[t1TY.stops.length-1].arrivalTime}] dest:${t1TY.customDestination}`);
  console.log(`  東急新横浜線: ${t1TSH.tripId} (${t1TSH.trainNumber}) [${t1TSH.stops[0].departureTime} -> ${t1TSH.stops[t1TSH.stops.length-1].arrivalTime}] dest:${t1TSH.customDestination}`);
  console.log(`  相鉄新横浜線: ${t1SSH.tripId} (${t1SSH.trainNumber}) [${t1SSH.stops[0].departureTime} -> ${t1SSH.stops[t1SSH.stops.length-1].arrivalTime}] dest:${t1SSH.customDestination}`);
  console.log(`  相鉄本線: ${t1SM.tripId} (${t1SM.trainNumber}) [${t1SM.stops[0].departureTime} -> ${t1SM.stops[t1SM.stops.length-1].arrivalTime}] dest:${t1SM.customDestination}`);

  // テスト1実行
  console.log('\n--- テスト1: 下り4路線直通追尾テスト実行 ---');
  let tracked: ActiveTrain | null = null;
  let lastSelected: ActiveTrain | null = null;

  const tTimes = [
    t1TY.stops[0].departureTime, // 東横線始発（渋谷等）
    t1TY.stops[t1TY.stops.length - 1].arrivalTime, // 日吉到着（先行終着時刻）
    t1TSH.stops[1].departureTime, // 新綱島発車
    t1TSH.stops[t1TSH.stops.length - 1].arrivalTime, // 新横浜到着（先行終着時刻）
    t1SSH.stops[1].departureTime, // 羽沢横浜国大発車
    t1SSH.stops[t1SSH.stops.length - 1].arrivalTime, // 西谷到着（先行終着時刻）
    t1SM.stops[Math.floor(t1SM.stops.length / 2)].departureTime, // 相鉄本線途中
    t1SM.stops[t1SM.stops.length - 1].arrivalTime, // 海老名終点
  ];

  for (const timeStr of tTimes) {
    const sec = timeStringToSeconds(timeStr);
    const active = calculateActiveTrains({
      currentSec: sec,
      isHoliday: false,
      globalDelayMinutes: 0,
      randomDelays: {},
      isPlaying: true,
      speedMultiplier: 1,
      selectedLineIds: ['tokyu_toyoko', 'tokyu_shin_yokohama', 'sotetsu_shin_yokohama', 'sotetsu_main'],
    });

    if (!tracked) {
      tracked = active.find(t => t.tripId === t1TY!.tripId) || null;
    } else {
      tracked = resolveSelectedTrain(active, tracked.tripId, lastSelected);
    }
    if (tracked) lastSelected = tracked;

    console.log(`[時刻 ${timeStr}] 追尾ID: ${tracked?.tripId} | 路線: ${tracked?.lineId} | 種別: ${tracked?.trainType} | 始発: ${tracked?.customOrigin} | 行先: ${tracked?.customDestination} | 駅: ${tracked?.currentStationId} -> ${tracked?.nextStationId}`);
    if (!tracked) {
      console.error(`❌ 追尾が途切れました（時刻: ${timeStr}）`);
      process.exit(1);
    }
  }

  if (tracked && tracked.lineId === 'sotetsu_main' && tracked.tripId === t1SM.tripId) {
    console.log('✅ テスト1 成功: 東横線 -> 東急新横浜線 -> 相鉄新横浜線 -> 相鉄本線 4路線完全貫通追尾成功！\n');
  } else {
    console.error('❌ テスト1 失敗: 相鉄本線へのハンドオーバーが行われませんでした。\n');
    process.exit(1);
  }
} else {
  console.log('⚠️ 下り4路線貫通便が見つかりませんでした。個別リンクを確認します。');
}

// 2. 上り4路線直通（相鉄本線 -> 相鉄新横浜線 -> 東急新横浜線 -> 東横線）のサンプル探索
console.log('--- 探索: 相鉄本線 -> 相鉄新横浜線 -> 東急新横浜線 -> 東横線 4路線貫通列車 ---');
const smUp = sotetsuMainTrips.filter(t => !t.isHoliday && t.direction === 'inbound' && t.throughTripId);
let t2SM: TimetableTrip | null = null;
let t2SSH: TimetableTrip | null = null;
let t2TSH: TimetableTrip | null = null;
let t2TY: TimetableTrip | null = null;

for (const sm of smUp) {
  const ssh = sotetsuShinYokohamaTrips.find(t => t.tripId === sm.throughTripId);
  if (ssh && ssh.throughTripId) {
    const tsh = tokyuShinYokohamaTrips.find(t => t.tripId === ssh.throughTripId);
    if (tsh && tsh.throughTripId) {
      const ty = toyokoTrips.find(t => t.tripId === tsh.throughTripId);
      if (ty) {
        t2SM = sm;
        t2SSH = ssh;
        t2TSH = tsh;
        t2TY = ty;
        break;
      }
    }
  }
}

if (t2SM && t2SSH && t2TSH && t2TY) {
  console.log(`見つかった上り貫通便:`);
  console.log(`  相鉄本線: ${t2SM.tripId} (${t2SM.trainNumber}) [${t2SM.stops[0].departureTime} -> ${t2SM.stops[t2SM.stops.length-1].arrivalTime}] dest:${t2SM.customDestination}`);
  console.log(`  相鉄新横浜線: ${t2SSH.tripId} (${t2SSH.trainNumber}) [${t2SSH.stops[0].departureTime} -> ${t2SSH.stops[t2SSH.stops.length-1].arrivalTime}] dest:${t2SSH.customDestination}`);
  console.log(`  東急新横浜線: ${t2TSH.tripId} (${t2TSH.trainNumber}) [${t2TSH.stops[0].departureTime} -> ${t2TSH.stops[t2TSH.stops.length-1].arrivalTime}] dest:${t2TSH.customDestination}`);
  console.log(`  東横線: ${t2TY.tripId} (${t2TY.trainNumber}) [${t2TY.stops[0].departureTime} -> ${t2TY.stops[t2TY.stops.length-1].arrivalTime}] dest:${t2TY.customDestination}`);

  // テスト2実行
  console.log('\n--- テスト2: 上り4路線直通追尾テスト実行 ---');
  let tracked: ActiveTrain | null = null;
  let lastSelected: ActiveTrain | null = null;

  const tTimes = [
    t2SM.stops[0].departureTime, // 海老名発
    t2SM.stops[t2SM.stops.length - 1].arrivalTime, // 西谷到着
    t2SSH.stops[1].departureTime, // 羽沢横浜国大
    t2SSH.stops[t2SSH.stops.length - 1].arrivalTime, // 新横浜到着
    t2TSH.stops[1].departureTime, // 新綱島
    t2TSH.stops[t2TSH.stops.length - 1].arrivalTime, // 日吉到着
    t2TY.stops[Math.floor(t2TY.stops.length / 2)].departureTime, // 東横線途中
    t2TY.stops[t2TY.stops.length - 1].arrivalTime, // 渋谷到着
  ];

  for (const timeStr of tTimes) {
    const sec = timeStringToSeconds(timeStr);
    const active = calculateActiveTrains({
      currentSec: sec,
      isHoliday: false,
      globalDelayMinutes: 0,
      randomDelays: {},
      isPlaying: true,
      speedMultiplier: 1,
      selectedLineIds: ['sotetsu_main', 'sotetsu_shin_yokohama', 'tokyu_shin_yokohama', 'tokyu_toyoko'],
    });

    if (!tracked) {
      tracked = active.find(t => t.tripId === t2SM!.tripId) || null;
    } else {
      tracked = resolveSelectedTrain(active, tracked.tripId, lastSelected);
    }
    if (tracked) lastSelected = tracked;

    console.log(`[時刻 ${timeStr}] 追尾ID: ${tracked?.tripId} | 路線: ${tracked?.lineId} | 種別: ${tracked?.trainType} | 始発: ${tracked?.customOrigin} | 行先: ${tracked?.customDestination} | 駅: ${tracked?.currentStationId} -> ${tracked?.nextStationId}`);
    if (!tracked) {
      console.error(`❌ 追尾が途切れました（時刻: ${timeStr}）`);
      process.exit(1);
    }
  }

  if (tracked && tracked.lineId === 'tokyu_toyoko' && tracked.tripId === t2TY.tripId) {
    console.log('✅ テスト2 成功: 相鉄本線 -> 相鉄新横浜線 -> 東急新横浜線 -> 東横線 4路線完全貫通追尾成功！\n');
  } else {
    console.error('❌ テスト2 失敗: 東横線へのハンドオーバーが行われませんでした。\n');
    process.exit(1);
  }
}

// 3. 相鉄・JR直通線 ↔ 相鉄新横浜線 ↔ 相鉄本線 テスト
console.log('--- 探索: 相鉄・JR直通線 ↔ 相鉄新横浜線 ↔ 相鉄本線 直通列車 ---');
const jrDown = sotetsuJrTrips.filter(t => !t.isHoliday && t.direction === 'inbound' && t.throughTripId);
let t3JR: TimetableTrip | null = null;
let t3SSH: TimetableTrip | null = null;
let t3SM: TimetableTrip | null = null;

for (const jr of jrDown) {
  const ssh = sotetsuShinYokohamaTrips.find(t => t.tripId === jr.throughTripId);
  if (ssh && ssh.throughTripId) {
    const sm = sotetsuMainTrips.find(t => t.tripId === ssh.throughTripId);
    if (sm) {
      t3JR = jr;
      t3SSH = ssh;
      t3SM = sm;
      break;
    }
  }
}

if (t3JR && t3SSH && t3SM) {
  console.log(`見つかったJR直通下り便:`);
  console.log(`  JR直通線: ${t3JR.tripId} (${t3JR.trainNumber}) [${t3JR.stops[0].departureTime} -> ${t3JR.stops[t3JR.stops.length-1].arrivalTime}] dest:${t3JR.customDestination}`);
  console.log(`  相鉄新横浜線: ${t3SSH.tripId} (${t3SSH.trainNumber}) [${t3SSH.stops[0].departureTime} -> ${t3SSH.stops[t3SSH.stops.length-1].arrivalTime}] dest:${t3SSH.customDestination}`);
  console.log(`  相鉄本線: ${t3SM.tripId} (${t3SM.trainNumber}) [${t3SM.stops[0].departureTime} -> ${t3SM.stops[t3SM.stops.length-1].arrivalTime}] dest:${t3SM.customDestination}`);

  console.log('\n--- テスト3: 相鉄・JR直通線 -> 相鉄新横浜線 -> 相鉄本線 追尾テスト実行 ---');
  let tracked: ActiveTrain | null = null;
  let lastSelected: ActiveTrain | null = null;

  const tTimes = [
    t3JR.stops[0].departureTime, // 新宿発
    t3JR.stops[t3JR.stops.length - 1].arrivalTime, // 羽沢横浜国大到着
    t3SSH.stops[0].departureTime, // 羽沢横浜国大発車
    t3SSH.stops[t3SSH.stops.length - 1].arrivalTime, // 西谷到着
    t3SM.stops[Math.floor(t3SM.stops.length / 2)].departureTime, // 相鉄本線途中
    t3SM.stops[t3SM.stops.length - 1].arrivalTime, // 海老名終点
  ];

  for (const timeStr of tTimes) {
    const sec = timeStringToSeconds(timeStr);
    const active = calculateActiveTrains({
      currentSec: sec,
      isHoliday: false,
      globalDelayMinutes: 0,
      randomDelays: {},
      isPlaying: true,
      speedMultiplier: 1,
      selectedLineIds: ['sotetsu_jr_direct', 'sotetsu_shin_yokohama', 'sotetsu_main'],
    });

    if (!tracked) {
      tracked = active.find(t => t.tripId === t3JR!.tripId) || null;
    } else {
      tracked = resolveSelectedTrain(active, tracked.tripId, lastSelected);
    }
    if (tracked) lastSelected = tracked;

    console.log(`[時刻 ${timeStr}] 追尾ID: ${tracked?.tripId} | 路線: ${tracked?.lineId} | 種別: ${tracked?.trainType} | 始発: ${tracked?.customOrigin} | 行先: ${tracked?.customDestination} | 駅: ${tracked?.currentStationId} -> ${tracked?.nextStationId}`);
    if (!tracked) {
      console.error(`❌ 追尾が途切れました（時刻: ${timeStr}）`);
      process.exit(1);
    }
  }

  if (tracked && tracked.lineId === 'sotetsu_main' && tracked.tripId === t3SM.tripId) {
    console.log('✅ テスト3 成功: 相鉄・JR直通線 -> 相鉄新横浜線 -> 相鉄本線 完全貫通追尾成功！\n');
  } else {
    console.error('❌ テスト3 失敗: 相鉄本線へのハンドオーバーが行われませんでした。\n');
    process.exit(1);
  }
}

console.log('🎉 東急・相鉄直通線 全テスト完了！');
