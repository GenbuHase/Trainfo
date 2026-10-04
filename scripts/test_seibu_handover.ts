import { calculateActiveTrains } from '../src/services/trainSimulation';
import { formatTrainNumber, timeStringToSeconds } from '../src/data/timetableData';
import type { ActiveTrain, TimetableTrip } from '../src/types';
import rawYurakuchoTT from '../src/data/lines/yurakucho/globalTimetable.json';
import rawFukutoshinTT from '../src/data/lines/fukutoshin/globalTimetable.json';
import rawSeibuYurakuchoTT from '../src/data/lines/seibu_yurakucho/globalTimetable.json';
import rawSeibuIkebukuroTT from '../src/data/lines/seibu_ikebukuro/globalTimetable.json';

const yurakuchoTrips = rawYurakuchoTT as unknown as TimetableTrip[];
const fukutoshinTrips = rawFukutoshinTT as unknown as TimetableTrip[];
const seibuYurakuchoTrips = rawSeibuYurakuchoTT as unknown as TimetableTrip[];
const seibuIkebukuroTrips = rawSeibuIkebukuroTT as unknown as TimetableTrip[];

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
      // 1. 直通先トリップID照合
      if (
        (prev.throughTripId && t.tripId === prev.throughTripId) ||
        (t.throughTripId && t.throughTripId === prev.tripId)
      ) {
        return true;
      }
      // 2. 同一運行便ID（trainId）判定
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

console.log('=== 西武鉄道 ↔ 東京メトロ 3路線相互直通 & S-TRAIN ハンドオーバーテスト ===\n');

// 1. 下り3路線直通のサンプル探索 (有楽町線 -> 西武有楽町線 -> 西武池袋線)
console.log('--- 探索: 有楽町線 -> 西武有楽町線 -> 西武池袋線 3路線貫通列車 ---');
const yDown = yurakuchoTrips.filter(t => !t.isHoliday && t.direction === 'inbound' && t.throughTripId);
let test1Y: TimetableTrip | null = null;
let test1SY: TimetableTrip | null = null;
let test1SI: TimetableTrip | null = null;

for (const yt of yDown) {
  const syt = seibuYurakuchoTrips.find(t => t.tripId === yt.throughTripId);
  if (syt && syt.throughTripId) {
    const sit = seibuIkebukuroTrips.find(t => t.tripId === syt.throughTripId);
    if (sit) {
      test1Y = yt;
      test1SY = syt;
      test1SI = sit;
      break;
    }
  }
}

if (test1Y && test1SY && test1SI) {
  console.log(`見つかった下り貫通便:`);
  console.log(`  有楽町線: ${test1Y.tripId} (${test1Y.trainNumber}) ${test1Y.stops[0].departureTime} -> ${test1Y.stops[test1Y.stops.length-1].arrivalTime}`);
  console.log(`  西武有楽町線: ${test1SY.tripId} (${test1SY.trainNumber}) ${test1SY.stops[0].departureTime} -> ${test1SY.stops[test1SY.stops.length-1].arrivalTime}`);
  console.log(`  西武池袋線: ${test1SI.tripId} (${test1SI.trainNumber}) ${test1SI.stops[0].departureTime} -> ${test1SI.stops[test1SI.stops.length-1].arrivalTime}`);

  // テスト1実行
  console.log('\n--- テスト1: 下り3路線直通追尾テスト実行 ---');
  let tracked: ActiveTrain | null = null;
  let lastSelected: ActiveTrain | null = null;

  // タイムスタンプ配列を作成
  const tTimes = [
    test1Y.stops[0].departureTime, // 有楽町線始発
    test1Y.stops[Math.floor(test1Y.stops.length / 2)].departureTime, // 有楽町線途中
    test1Y.stops[test1Y.stops.length - 1].arrivalTime, // 小竹向原到着
    test1SY.stops[1].departureTime, // 新桜台
    test1SI.stops[0].departureTime, // 練馬
    test1SI.stops[Math.floor(test1SI.stops.length / 2)].departureTime, // 西武線途中
    test1SI.stops[test1SI.stops.length - 1].arrivalTime, // 西武線終点
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
      selectedLineIds: ['yurakucho', 'seibu_yurakucho', 'seibu_ikebukuro'],
    });

    if (!tracked) {
      tracked = active.find(t => t.tripId === test1Y!.tripId) || null;
    } else {
      tracked = resolveSelectedTrain(active, tracked.tripId, lastSelected);
    }
    if (tracked) lastSelected = tracked;

    console.log(`[時刻 ${timeStr}] 追尾ID: ${tracked?.tripId} | 路線: ${tracked?.lineId} | 種別: ${tracked?.trainType} | 行先: ${tracked?.customDestination} | 駅: ${tracked?.currentStationId} -> ${tracked?.nextStationId}`);
  }

  if (tracked && tracked.lineId === 'seibu_ikebukuro' && tracked.tripId === test1SI.tripId) {
    console.log('✅ テスト1 成功: 有楽町線 -> 西武有楽町線 -> 西武池袋線 3路線完全貫通追尾成功！\n');
  } else {
    console.error('❌ テスト1 失敗: 西武池袋線へのハンドオーバーが行われませんでした。\n');
    process.exit(1);
  }
} else {
  console.error('❌ 下り貫通便が見つかりませんでした。');
  process.exit(1);
}

// 2. 上り3路線直通のサンプル探索 (西武池袋線 -> 西武有楽町線 -> 副都心線)
console.log('--- 探索: 西武池袋線 -> 西武有楽町線 -> 副都心線 3路線貫通列車 ---');
const siUp = seibuIkebukuroTrips.filter(t => !t.isHoliday && t.direction === 'inbound' && t.throughTripId);
let test2SI: TimetableTrip | null = null;
let test2SY: TimetableTrip | null = null;
let test2F: TimetableTrip | null = null;

for (const sit of siUp) {
  const syt = seibuYurakuchoTrips.find(t => t.tripId === sit.throughTripId);
  if (syt && syt.throughTripId) {
    const ft = fukutoshinTrips.find(t => t.tripId === syt.throughTripId);
    if (ft) {
      test2SI = sit;
      test2SY = syt;
      test2F = ft;
      break;
    }
  }
}

if (test2SI && test2SY && test2F) {
  console.log(`見つかった上り貫通便:`);
  console.log(`  西武池袋線: ${test2SI.tripId} (${test2SI.trainNumber}) ${test2SI.stops[0].departureTime} -> ${test2SI.stops[test2SI.stops.length-1].arrivalTime}`);
  console.log(`  西武有楽町線: ${test2SY.tripId} (${test2SY.trainNumber}) ${test2SY.stops[0].departureTime} -> ${test2SY.stops[test2SY.stops.length-1].arrivalTime}`);
  console.log(`  副都心線: ${test2F.tripId} (${test2F.trainNumber}) ${test2F.stops[0].departureTime} -> ${test2F.stops[test2F.stops.length-1].arrivalTime}`);

  // テスト2実行
  console.log('\n--- テスト2: 上り3路線直通追尾テスト実行 ---');
  let tracked: ActiveTrain | null = null;
  let lastSelected: ActiveTrain | null = null;

  const tTimes = [
    test2SI.stops[0].departureTime,
    test2SI.stops[Math.floor(test2SI.stops.length / 2)].departureTime,
    test2SI.stops[test2SI.stops.length - 1].arrivalTime, // 練馬到着
    test2SY.stops[1].departureTime, // 新桜台
    test2F.stops[0].departureTime, // 小竹向原
    test2F.stops[Math.floor(test2F.stops.length / 2)].departureTime, // 副都心線途中
    test2F.stops[test2F.stops.length - 1].arrivalTime, // 渋谷終点
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
      selectedLineIds: ['seibu_ikebukuro', 'seibu_yurakucho', 'fukutoshin'],
    });

    if (!tracked) {
      tracked = active.find(t => t.tripId === test2SI!.tripId) || null;
    } else {
      tracked = resolveSelectedTrain(active, tracked.tripId, lastSelected);
    }
    if (tracked) lastSelected = tracked;

    console.log(`[時刻 ${timeStr}] 追尾ID: ${tracked?.tripId} | 路線: ${tracked?.lineId} | 種別: ${tracked?.trainType} | 行先: ${tracked?.customDestination} | 駅: ${tracked?.currentStationId} -> ${tracked?.nextStationId}`);
  }

  if (tracked && tracked.lineId === 'fukutoshin' && tracked.tripId === test2F.tripId) {
    console.log('✅ テスト2 成功: 西武池袋線 -> 西武有楽町線 -> 副都心線 3路線完全貫通追尾成功！\n');
  } else {
    console.error('❌ テスト2 失敗: 副都心線へのハンドオーバーが行われませんでした。\n');
    process.exit(1);
  }
} else {
  console.error('❌ 上り貫通便が見つかりませんでした。');
  process.exit(1);
}

// 3. 平日 S-TRAIN 102号（所沢 -> 豊洲）の追尾テスト
console.log('--- テスト3: 平日上り S-TRAIN 102号 (所沢 06:24発 -> 豊洲 07:24着) 追尾テスト ---');
const sTrain102SI = seibuIkebukuroTrips.find(t => !t.isHoliday && t.trainType === 'strain' && t.direction === 'inbound');
if (!sTrain102SI) {
  console.error('❌ S-TRAIN 102号が西武池袋線に見つかりません。');
  process.exit(1);
}

const sTrain102SY = seibuYurakuchoTrips.find(t => t.tripId === sTrain102SI.throughTripId);
const sTrain102Y = sTrain102SY ? yurakuchoTrips.find(t => t.tripId === sTrain102SY.throughTripId) : null;

console.log(`S-TRAIN 102号 トリップ連携:`);
console.log(`  池袋線: ${sTrain102SI.tripId} (${sTrain102SI.trainNumber}) through: ${sTrain102SI.throughTripId}`);
console.log(`  有楽町線(西武): ${sTrain102SY?.tripId} (${sTrain102SY?.trainNumber}) through: ${sTrain102SY?.throughTripId}`);
console.log(`  有楽町線(メトロ): ${sTrain102Y?.tripId} (${sTrain102Y?.trainNumber})`);

const sTrainTimes = [
  '06:24:00', // 所沢発
  '06:40:00', // 石神井公園発
  '06:50:00', // 練馬通過/小竹向原接近
  '06:53:00', // 小竹向原発
  '07:05:00', // 飯田橋
  '07:24:00', // 豊洲着
];

let trackedS: ActiveTrain | null = null;
let lastSelectedS: ActiveTrain | null = null;

for (const timeStr of sTrainTimes) {
  const sec = timeStringToSeconds(timeStr);
  const active = calculateActiveTrains({
    currentSec: sec,
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['seibu_ikebukuro', 'seibu_yurakucho', 'yurakucho'],
  });

  if (!trackedS) {
    trackedS = active.find(t => t.tripId === sTrain102SI.tripId) || null;
  } else {
    trackedS = resolveSelectedTrain(active, trackedS.tripId, lastSelectedS);
  }
  if (trackedS) lastSelectedS = trackedS;

  console.log(`[時刻 ${timeStr}] 追尾ID: ${trackedS?.tripId} | 路線: ${trackedS?.lineId} | 種別: ${trackedS?.trainType} | 始発: ${trackedS?.customOrigin} | 行先: ${trackedS?.customDestination} | 駅: ${trackedS?.currentStationId} -> ${trackedS?.nextStationId}`);
  if (trackedS && trackedS.customOrigin !== '所沢') {
    console.error(`❌ テスト3 失敗: 始発駅が '${trackedS.customOrigin}' に変化しました（期待値: 所沢）`);
    process.exit(1);
  }
}

if (trackedS && trackedS.lineId === 'yurakucho' && trackedS.trainType === 'strain') {
  console.log('✅ テスト3 成功: 平日 S-TRAIN 102号が始発駅「所沢」を維持したまま西武線からメトロ豊洲まで strain 種別で完全貫通追尾されました！\n');
} else {
  console.error('❌ テスト3 失敗: S-TRAIN の貫通追尾に失敗しました。\n');
  process.exit(1);
}

// 4. 土休日 S-TRAIN 1号（元町・中華街 -> 西武秩父）の追尾テスト
console.log('--- テスト4: 土休日下り S-TRAIN 1号 (副都心線 -> 西武有楽町線 -> 西武秩父) 追尾テスト ---');
const sTrain1F = fukutoshinTrips.find(t => t.isHoliday && t.trainType === 'strain' && t.direction === 'inbound');
if (!sTrain1F) {
  console.error('❌ 土休日 S-TRAIN 1号が副都心線に見つかりません。');
  process.exit(1);
}

const sTrain1SY = seibuYurakuchoTrips.find(t => t.tripId === sTrain1F.throughTripId);
const sTrain1SI = sTrain1SY ? seibuIkebukuroTrips.find(t => t.tripId === sTrain1SY.throughTripId) : null;

console.log(`S-TRAIN 1号 トリップ連携:`);
console.log(`  副都心線: ${sTrain1F.tripId} (${sTrain1F.trainNumber}) through: ${sTrain1F.throughTripId}`);
console.log(`  有楽町線(西武): ${sTrain1SY?.tripId} (${sTrain1SY?.trainNumber}) through: ${sTrain1SY?.throughTripId}`);
console.log(`  池袋線: ${sTrain1SI?.tripId} (${sTrain1SI?.trainNumber})`);

const sTrain1Times = [
  '08:27:00', // 渋谷発 (副都心線)
  '08:35:00', // 新宿三丁目〜池袋 (副都心線)
  '08:46:00', // 小竹向原 (副都心線終着)
  '08:48:00', // 新桜台付近 (西武有楽町線走行中)
  '08:50:00', // 練馬 (西武池袋線)
  '09:07:00', // 所沢 (西武池袋線)
  '09:28:00', // 飯能 (西武池袋線)
  '10:03:00', // 西武秩父着 (西武池袋線)
];

let trackedS1: ActiveTrain | null = null;
let lastSelectedS1: ActiveTrain | null = null;

for (const timeStr of sTrain1Times) {
  const sec = timeStringToSeconds(timeStr);
  const active = calculateActiveTrains({
    currentSec: sec,
    isHoliday: true,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['fukutoshin', 'seibu_yurakucho', 'seibu_ikebukuro'],
  });

  if (!trackedS1) {
    trackedS1 = active.find(t => t.tripId === sTrain1F.tripId) || null;
  } else {
    trackedS1 = resolveSelectedTrain(active, trackedS1.tripId, lastSelectedS1);
  }
  if (trackedS1) lastSelectedS1 = trackedS1;

  console.log(`[時刻 ${timeStr}] 追尾ID: ${trackedS1?.tripId} | 路線: ${trackedS1?.lineId} | 種別: ${trackedS1?.trainType} | 始発: ${trackedS1?.customOrigin} | 行先: ${trackedS1?.customDestination} | 駅: ${trackedS1?.currentStationId} -> ${trackedS1?.nextStationId}`);
  if (trackedS1 && trackedS1.customOrigin !== '元町・中華街') {
    console.error(`❌ テスト4 失敗: 始発駅が '${trackedS1.customOrigin}' に変化しました（期待値: 元町・中華街）`);
    process.exit(1);
  }
}

if (trackedS1 && trackedS1.lineId === 'seibu_ikebukuro' && trackedS1.trainType === 'strain') {
  console.log('✅ テスト4 成功: 土休日 S-TRAIN 1号が始発駅「元町・中華街」を維持したまま副都心線から西武秩父線まで strain 種別で完全貫通追尾されました！\n');
} else {
  console.error('❌ テスト4 失敗: 土休日 S-TRAIN の貫通追尾に失敗しました。\n');
  process.exit(1);
}

// 5. 土休日上り S-TRAIN 2号（飯能 -> 元町・中華街）の追尾テスト
console.log('--- テスト5: 土休日上り S-TRAIN 2号 (西武池袋線 -> 西武有楽町線 -> 副都心線) 追尾テスト ---');
const sTrain2SI = seibuIkebukuroTrips.find(t => t.isHoliday && t.trainType === 'strain' && t.direction === 'inbound' && (t.trainNumber === '402レ' || t.trainId === '144626'));
if (!sTrain2SI) {
  console.error('❌ 土休日 S-TRAIN 2号が西武池袋線に見つかりません。');
  process.exit(1);
}

const sTrain2SY = seibuYurakuchoTrips.find(t => t.tripId === sTrain2SI.throughTripId);
const sTrain2F = sTrain2SY ? fukutoshinTrips.find(t => t.tripId === sTrain2SY.throughTripId) : null;

console.log(`S-TRAIN 2号 トリップ連携:`);
console.log(`  池袋線: ${sTrain2SI.tripId} (${sTrain2SI.trainNumber}) through: ${sTrain2SI.throughTripId}`);
console.log(`  有楽町線(西武): ${sTrain2SY?.tripId} (${sTrain2SY?.trainNumber}) through: ${sTrain2SY?.throughTripId}`);
console.log(`  副都心線: ${sTrain2F?.tripId} (${sTrain2F?.trainNumber})`);

const sTrain2Times = [
  '09:20:00', // 飯能発
  '09:37:00', // 所沢
  '09:50:00', // 石神井公園
  '09:56:00', // 新桜台付近 (西武有楽町線)
  '10:03:00', // 池袋 (副都心線)
  '10:10:00', // 新宿三丁目
  '10:18:00', // 渋谷
];

let trackedS2: ActiveTrain | null = null;
let lastSelectedS2: ActiveTrain | null = null;

for (const timeStr of sTrain2Times) {
  const sec = timeStringToSeconds(timeStr);
  const active = calculateActiveTrains({
    currentSec: sec,
    isHoliday: true,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['seibu_ikebukuro', 'seibu_yurakucho', 'fukutoshin'],
  });

  if (!trackedS2) {
    trackedS2 = active.find(t => t.tripId === sTrain2SI.tripId) || null;
  } else {
    trackedS2 = resolveSelectedTrain(active, trackedS2.tripId, lastSelectedS2);
  }
  if (trackedS2) lastSelectedS2 = trackedS2;

  console.log(`[時刻 ${timeStr}] 追尾ID: ${trackedS2?.tripId} | 路線: ${trackedS2?.lineId} | 種別: ${trackedS2?.trainType} | 始発: ${trackedS2?.customOrigin} | 行先: ${trackedS2?.customDestination} | 駅: ${trackedS2?.currentStationId} -> ${trackedS2?.nextStationId}`);
  if (trackedS2 && trackedS2.customOrigin !== '飯能') {
    console.error(`❌ テスト5 失敗: 始発駅が '${trackedS2.customOrigin}' に変化しました（期待値: 飯能）`);
    process.exit(1);
  }
}

if (trackedS2 && trackedS2.lineId === 'fukutoshin' && trackedS2.trainType === 'strain') {
  console.log('✅ テスト5 成功: 土休日 S-TRAIN 2号が始発駅「飯能」を維持したまま副都心線渋谷まで strain 種別で完全貫通追尾されました！\n');
} else {
  console.error('❌ テスト5 失敗: 土休日 S-TRAIN 2号の貫通追尾に失敗しました。\n');
  process.exit(1);
}

console.log('🎉🎉🎉 全ての直通ハンドオーバー & S-TRAIN テストが合格しました！ 🎉🎉🎉');
