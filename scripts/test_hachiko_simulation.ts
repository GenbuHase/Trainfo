import { calculateActiveTrains } from '../src/services/trainSimulation';
import { timeStringToSeconds } from '../src/data/timetableData';
import { hachikoLine } from '../src/data/lines/hachiko';

console.log('=== JR八高線 シミュレーション包括検証テスト開始 ===\n');

// 1. 基本メタデータ検証
console.log('--- テスト1: 路線・駅・軌道メタデータ整合性 ---');
console.log(`路線ID: ${hachikoLine.id}`);
console.log(`駅数: ${hachikoLine.stations.length} (期待値: 24)`);
console.log(`軌道セグメント数: ${hachikoLine.trackSegments.length} (期待値: 23)`);
console.log(`全列車ダイヤ数: ${hachikoLine.globalTimetable.length} 本`);

if (hachikoLine.stations.length !== 24 || hachikoLine.trackSegments.length !== 23) {
  console.error('❌ 駅数または軌道セグメント数が不正です');
  process.exit(1);
}
console.log('✅ テスト1 成功: 基本メタデータ正常\n');

// 2. 軌道セグメントの連続性・点間距離監査
console.log('--- テスト2: 軌道セグメントの連続性と点間距離監査 ---');
let maxStep = 0;
let breakCount = 0;

for (let i = 0; i < hachikoLine.trackSegments.length; i++) {
  const seg = hachikoLine.trackSegments[i];
  if (!seg.coordinates || seg.coordinates.length < 2) {
    console.error(`❌ セグメント ${seg.fromName} -> ${seg.toName} の座標数が不足しています`);
    process.exit(1);
  }

  // セグメント内の点間距離
  for (let j = 0; j < seg.coordinates.length - 1; j++) {
    const [lat1, lng1] = seg.coordinates[j];
    const [lat2, lng2] = seg.coordinates[j + 1];
    const dist = Math.hypot(lat2 - lat1, lng2 - lng1) * 111000;
    if (dist > maxStep) maxStep = dist;
  }

  // 次セグメントとの接続
  if (i < hachikoLine.trackSegments.length - 1) {
    const nextSeg = hachikoLine.trackSegments[i + 1];
    const lastPt = seg.coordinates[seg.coordinates.length - 1];
    const nextFirstPt = nextSeg.coordinates[0];
    const gap = Math.hypot(nextFirstPt[0] - lastPt[0], nextFirstPt[1] - lastPt[1]) * 111000;
    if (gap > 1.0) {
      console.warn(`⚠️ セグメント間ギャップ: ${seg.toName} で ${gap.toFixed(1)}m`);
      breakCount++;
    }
  }
}

console.log(`最大点間距離: ${maxStep.toFixed(1)}m`);
console.log(`セグメント間ギャップ数: ${breakCount}`);
if (breakCount === 0) {
  console.log('✅ テスト2 成功: 軌道は全線で完全に連続しています\n');
} else {
  console.error('❌ テスト2 失敗: 軌道が分断されています');
  process.exit(1);
}

// 3. シミュレーション走行テスト（複数時間帯でのアクティブ列車計算）
console.log('--- テスト3: 各時間帯でのシミュレーション走行検証 ---');
const sampleTimes = [
  '06:30:00', // 早朝
  '08:00:00', // 朝ラッシュ
  '12:00:00', // 昼間閑散時
  '18:30:00', // 夕方ラッシュ
  '22:00:00', // 夜間
];

for (const tStr of sampleTimes) {
  const currentSec = timeStringToSeconds(tStr);
  const activeTrains = calculateActiveTrains({
    currentSec,
    isHoliday: false,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['hachiko'],
  });

  console.log(`[時刻 ${tStr}] アクティブ列車数: ${activeTrains.length} 本`);
  for (const train of activeTrains) {
    if (isNaN(train.currentLat) || isNaN(train.currentLng)) {
      console.error(`❌ 列車 ${train.tripId} の座標が NaN です!`);
      process.exit(1);
    }
    if (train.currentLat < 35.5 || train.currentLat > 36.5 || train.currentLng < 138.8 || train.currentLng > 139.5) {
      console.error(`❌ 列車 ${train.tripId} の座標が範囲外です: [${train.currentLat}, ${train.currentLng}]`);
      process.exit(1);
    }
  }
}
console.log('✅ テスト3 成功: 全時間帯で列車座標が正常かつ範囲内に収まっています\n');

// 4. 主要駅の発車標検証
console.log('--- テスト4: 発車標データの整合性検証 ---');
const testStationIds = ['HA-01', 'HA-04', 'HA-09', 'HA-16', 'HA-24'];
const rawTT = hachikoLine.stationTimetables as any;

for (const stId of testStationIds) {
  const st = hachikoLine.stations.find((s) => s.id === stId);
  const wdIn = rawTT?.weekday?.[stId]?.inbound?.length || 0;
  const wdOut = rawTT?.weekday?.[stId]?.outbound?.length || 0;
  const hdIn = rawTT?.holiday?.[stId]?.inbound?.length || 0;
  const hdOut = rawTT?.holiday?.[stId]?.outbound?.length || 0;
  const wdCount = wdIn + wdOut;
  const hdCount = hdIn + hdOut;
  console.log(`駅: ${st?.name} (${stId}) - 平日発車本数: ${wdCount} 本, 休日発車本数: ${hdCount} 本 (上り: ${wdIn}本 / 下り: ${wdOut}本)`);
  if (wdCount === 0 && hdCount === 0) {
    console.error(`❌ 駅 ${st?.name} の発車標が空です`);
    process.exit(1);
  }
}
console.log('✅ テスト4 成功: 主要駅の発車標データが正常に取得・格納されています\n');

console.log('🎉 JR八高線 包括的シミュレーション検証 全テスト合格！');
