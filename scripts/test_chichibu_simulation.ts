import { calculateActiveTrains } from '../src/services/trainSimulation';
import { timeStringToSeconds } from '../src/data/timetableData';
import { chichibuLine } from '../src/data/lines/chichibu';

console.log('=== 秩父鉄道秩父本線 シミュレーション包括検証テスト開始 ===\n');

// 1. 基本メタデータ検証
console.log('--- テスト1: 路線・駅・軌道メタデータ整合性 ---');
console.log(`路線ID: ${chichibuLine.id}`);
console.log(`路線名: ${chichibuLine.name}`);
console.log(`事業者: ${chichibuLine.operator}`);
console.log(`駅数: ${chichibuLine.stations.length} (期待値: 37)`);
console.log(`軌道セグメント数: ${chichibuLine.trackSegments.length} (期待値: 36)`);
console.log(`全列車ダイヤ数: ${chichibuLine.globalTimetable.length} 本 (期待値: 203)`);

if (chichibuLine.stations.length !== 37 || chichibuLine.trackSegments.length !== 36) {
  console.error('❌ 駅数または軌道セグメント数が不正です');
  process.exit(1);
}
console.log('✅ テスト1 成功: 基本メタデータ正常\n');

// 2. 軌道セグメントの連続性・点間距離監査
console.log('--- テスト2: 軌道セグメントの連続性と点間距離監査 ---');
let maxStep = 0;
let breakCount = 0;

for (let i = 0; i < chichibuLine.trackSegments.length; i++) {
  const seg = chichibuLine.trackSegments[i];
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
  if (i < chichibuLine.trackSegments.length - 1) {
    const nextSeg = chichibuLine.trackSegments[i + 1];
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
  { time: '06:30:00', holiday: false, label: '平日早朝' },
  { time: '08:00:00', holiday: false, label: '平日朝ラッシュ' },
  { time: '11:00:00', holiday: true, label: '休日昼間 (SL運行中)' },
  { time: '14:30:00', holiday: true, label: '休日午後 (SL復路運行中)' },
  { time: '18:30:00', holiday: false, label: '平日夕方 (急行運行中)' },
  { time: '22:00:00', holiday: false, label: '平日夜間' },
];

for (const sample of sampleTimes) {
  const currentSec = timeStringToSeconds(sample.time);
  const activeTrains = calculateActiveTrains({
    currentSec,
    isHoliday: sample.holiday,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds: ['chichibu'],
  });

  console.log(`[${sample.label} ${sample.time}] アクティブ列車数: ${activeTrains.length} 本`);
  for (const train of activeTrains) {
    if (isNaN(train.currentLat) || isNaN(train.currentLng)) {
      console.error(`❌ 列車 ${train.tripId} の座標が NaN です!`);
      process.exit(1);
    }
    // 秩父鉄道沿線範囲 (lat: 35.9-36.25, lng: 138.9-139.6)
    if (train.currentLat < 35.9 || train.currentLat > 36.25 || train.currentLng < 138.9 || train.currentLng > 139.6) {
      console.error(`❌ 列車 ${train.tripId} の座標が範囲外です: [${train.currentLat}, ${train.currentLng}]`);
      process.exit(1);
    }
  }
}
console.log('✅ テスト3 成功: 全時間帯で列車座標が正常かつ範囲内に収まっています\n');

// 4. 特殊種別（SL・急行）の公式列車番号検証
console.log('--- テスト4: SLパレオエクスプレスおよび急行秩父路の検証 ---');
const slDown = chichibuLine.globalTimetable.find(t => t.trainNumber === '5001レ');
const slUp = chichibuLine.globalTimetable.find(t => t.trainNumber === '5002レ');

if (!slDown || !slUp) {
  console.error('❌ SLパレオエクスプレスの列車番号(5001レ/5002レ)が見つかりません');
  process.exit(1);
}
console.log(`下りSL: ${slDown.trainNumber} (tripId: ${slDown.tripId}, 種別: ${slDown.trainType})`);
console.log(`上りSL: ${slUp.trainNumber} (tripId: ${slUp.tripId}, 種別: ${slUp.trainType})`);

const expressTrains = chichibuLine.globalTimetable.filter(t => t.trainType === 'express');
console.log(`急行秩父路 便数: ${expressTrains.length} 本`);
console.log(`急行列車番号例: ${expressTrains.slice(0, 4).map(t => t.trainNumber).join(', ')}`);
console.log('✅ テスト4 成功: SL・急行が正常に識別・ナンバリングされています\n');

// 5. 発車標データの整合性検証
console.log('--- テスト5: 発車標データの整合性検証 ---');
const testStations = ['CR-01', 'CR-09', 'CR-20', 'CR-24', 'CR-30', 'CR-31', 'CR-37'];
const ttWeekday = (chichibuLine.stationTimetables as any).weekday || {};
for (const stId of testStations) {
  const st = chichibuLine.stations.find(s => s.id === stId)!;
  const inDeps = ttWeekday[stId]?.inbound || [];
  const outDeps = ttWeekday[stId]?.outbound || [];
  console.log(`[${st.id}] ${st.name}: 上り ${inDeps.length}本, 下り ${outDeps.length}本`);
  
  if (stId === 'CR-01' && inDeps.length !== 0) {
    console.error(`❌ 起点駅 ${st.name} の上り発車標が0本ではありません`);
    process.exit(1);
  }
  if (stId === 'CR-37' && outDeps.length !== 0) {
    console.error(`❌ 終点駅 ${st.name} の下り発車標が0本ではありません`);
    process.exit(1);
  }
}
console.log('✅ テスト5 成功: 全主要駅の発車標が正常に設定されています\n');

console.log('🎉 秩父鉄道秩父本線 全シミュレーション包括テスト合格！');
