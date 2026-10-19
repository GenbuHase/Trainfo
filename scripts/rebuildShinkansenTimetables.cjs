#!/usr/bin/env node
// 新幹線系統（東北・上越・北陸・山形・秋田）時刻表完全再生成・整合性検証スクリプト
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const YahooTimetableBuilder = require('./common/yahoo/YahooTimetableBuilder.cjs');

const SHINKANSEN_LINES = [
  'tohoku_shinkansen',
  'joetsu_shinkansen',
  'hokuriku_shinkansen',
  'yamagata_shinkansen',
  'akita_shinkansen',
];

console.log('====================================================');
console.log('🚄 新幹線系統 時刻表完全再生成パイプライン開始 🚄');
console.log('====================================================\n');

// 1. キャッシュから globalTimetable.json をクリーン再ビルド
console.log('=== [Step 1] 新幹線5路線のキャッシュからクリーン再生成 ===');
for (const lineId of SHINKANSEN_LINES) {
  const configFile = path.resolve(`scripts/lines/${lineId}/config.cjs`);
  const cacheFile = path.resolve(`scripts/cache/yahoo/${lineId}/all_train_details.json`);

  if (!fs.existsSync(configFile) || !fs.existsSync(cacheFile)) {
    throw new Error(`Missing config or cache for ${lineId}`);
  }

  const config = require(configFile);
  const details = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));

  const builder = new YahooTimetableBuilder(config);
  const trips = builder.buildGlobalTimetable(details);

  const outPath = path.resolve(config.outputPaths.globalTimetable);
  fs.writeFileSync(outPath, JSON.stringify(trips, null, 2), 'utf8');
  console.log(`✅ [Rebuild] ${config.name.padEnd(16)} (${lineId}): ${trips.length} 本のトリップを生成`);
}

// 2. 公式列車番号エンリッチメント
console.log('\n=== [Step 2] 新幹線5路線の公式列車番号エンリッチメント ===');
execSync('node scripts/enrich_train_numbers.cjs shinkansen', { stdio: 'inherit' });
execSync('node scripts/enrich_6_lines.cjs', { stdio: 'inherit' });

// 3. カップリング・直通リンカー・駅時刻表再集約
console.log('\n=== [Step 3] カップリング・直通リンカー・駅時刻表再集約 ===');
execSync('node scripts/runThroughLinker.cjs', { stdio: 'inherit' });

// 4. 整合性自動検証
console.log('\n=== [Step 4] 新幹線時刻表の整合性自動監査 ===');
let hasAnomaly = false;

for (const lineId of SHINKANSEN_LINES) {
  const gtPath = path.resolve(`src/data/lines/${lineId}/globalTimetable.json`);
  const stPath = path.resolve(`src/data/lines/${lineId}/stationTimetables.json`);
  const config = require(`./lines/${lineId}/config.cjs`);
  const stMap = new Map((config.stations || []).map(s => [s.id, s.name]));

  const gt = JSON.parse(fs.readFileSync(gtPath, 'utf8'));
  const inbounds = gt.filter(t => t.direction === 'inbound');

  // 東北・山形・秋田新幹線の上り（inbound）で、東京行きなのに仙台・新庄・秋田・新函館北斗になっている誤りを検知
  if (lineId === 'tohoku_shinkansen') {
    const invalidInbounds = inbounds.filter(t => {
      // 盛岡(TS-18)や新青森(TS-23)発で仙台(TS-11)止まりの区間便（こまち96号等）は仙台行きで正常
      if (t.destinationStationId === 'TS-11' && t.originStationId !== 'TS-11') {
        return false;
      }
      // 郡山(TS-08)や盛岡(TS-18)止まりの区間便も正常
      if (['TS-08', 'TS-18'].includes(t.destinationStationId)) {
        return false;
      }
      // 東京(TS-01)行きなのに customDestination が仙台・新庄・新函館北斗・秋田になっているものは異常
      if (t.destinationStationId === 'TS-01' && t.customDestination && ['仙台', '新庄', '新函館北斗', '秋田'].includes(t.customDestination)) {
        return true;
      }
      // 仙台発なのに customDestination が仙台になっているものは異常
      if (t.originStationId === 'TS-11' && t.customDestination === '仙台') {
        return true;
      }
      return false;
    });
    if (invalidInbounds.length > 0) {
      console.error(`❌ [Anomaly] 東北新幹線上りに誤った行き先を持つトリップが ${invalidInbounds.length} 件存在します！`);
      hasAnomaly = true;
    }
  }

  if (lineId === 'yamagata_shinkansen') {
    const invalidInbounds = inbounds.filter(t => t.customDestination === '新庄');
    if (invalidInbounds.length > 0) {
      console.error(`❌ [Anomaly] 山形新幹線上りに新庄行きが ${invalidInbounds.length} 件存在します！`);
      hasAnomaly = true;
    }
  }

  if (lineId === 'akita_shinkansen') {
    const invalidInbounds = inbounds.filter(t => t.customDestination === '秋田');
    if (invalidInbounds.length > 0) {
      console.error(`❌ [Anomaly] 秋田新幹線上りに秋田行きが ${invalidInbounds.length} 件存在します！`);
      hasAnomaly = true;
    }
  }

  // 新幹線路線に普通列車（trainType: 'local'）が混入していないか監査
  const localTrips = gt.filter(t => t.trainType === 'local');
  if (localTrips.length > 0) {
    console.error(`❌ [Anomaly] ${lineId} に普通列車（local）が ${localTrips.length} 件存在します！`);
    hasAnomaly = true;
  }

  // 新幹線路線に未反映の生数字列車番号が残っていないか監査
  const rawNumberTrips = gt.filter(t => !t.trainNumber || /^\d+$/.test(t.trainNumber));
  if (rawNumberTrips.length > 0) {
    console.error(`❌ [Anomaly] ${lineId} に未反映の列車番号が ${rawNumberTrips.length} 件存在します！ (例: ${rawNumberTrips[0].trainNumber || 'empty'})`);
    hasAnomaly = true;
  }

  // 併結相手の列車番号（coupledTrainNumber）が生数字のまま残っていないか監査
  const rawCoupledTrips = gt.filter(t => t.coupling && t.coupling.coupledTrainNumber && /^\d+$/.test(t.coupling.coupledTrainNumber));
  if (rawCoupledTrips.length > 0) {
    console.error(`❌ [Anomaly] ${lineId} に未反映の併結列車番号（coupledTrainNumber）が ${rawCoupledTrips.length} 件存在します！ (例: ${rawCoupledTrips[0].coupling.coupledTrainNumber})`);
    hasAnomaly = true;
  }

  // 駅時刻表の監査
  if (fs.existsSync(stPath)) {
    const st = JSON.parse(fs.readFileSync(stPath, 'utf8'));
    if (lineId === 'tohoku_shinkansen') {
      const sendaiIn = st.weekday?.['TS-11']?.inbound || [];
      const sendaiSendai = sendaiIn.filter(x => x.d === '仙台');
      if (sendaiSendai.length > 0) {
        console.error(`❌ [Anomaly] 仙台駅上り発車標に「仙台行き」が ${sendaiSendai.length} 件存在します！`);
        hasAnomaly = true;
      }
    }
    if (lineId === 'yamagata_shinkansen') {
      const shinjoIn = st.weekday?.['YS-11']?.inbound || [];
      const shinjoShinjo = shinjoIn.filter(x => x.d === '新庄');
      if (shinjoShinjo.length > 0) {
        console.error(`❌ [Anomaly] 新庄駅上り発車標に「新庄行き」が ${shinjoShinjo.length} 件存在します！`);
        hasAnomaly = true;
      }
    }
    if (lineId === 'akita_shinkansen') {
      const akitaIn = st.weekday?.['AS-06']?.inbound || [];
      const akitaAkita = akitaIn.filter(x => x.d === '秋田');
      if (akitaAkita.length > 0) {
        console.error(`❌ [Anomaly] 秋田駅上り発車標に「秋田行き」が ${akitaAkita.length} 件存在します！`);
        hasAnomaly = true;
      }
    }

    // 駅時刻表の発車標に普通列車（t: 'local'）が混入していないか監査
    for (const day of ['weekday', 'holiday']) {
      const dayData = st[day] || {};
      for (const [stId, dirs] of Object.entries(dayData)) {
        for (const dirKey of ['inbound', 'outbound']) {
          const deps = dirs[dirKey] || [];
          const localDeps = deps.filter(d => d.t === 'local');
          if (localDeps.length > 0) {
            console.error(`❌ [Anomaly] ${lineId} の駅 ${stId} (${day} ${dirKey}) に普通列車（local）が ${localDeps.length} 件存在します！`);
            hasAnomaly = true;
          }
        }
      }
    }
  }
}

if (!hasAnomaly) {
  console.log('🎉 すべての新幹線系統の時刻表が正常に整合性チェックをパスしました！');
} else {
  console.error('⚠️ 整合性チェックで異常が検出されました。');
  process.exit(1);
}
