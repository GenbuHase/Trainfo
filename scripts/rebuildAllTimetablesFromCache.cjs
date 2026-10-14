// キャッシュ（scripts/cache/yahoo/*/all_train_details.json）から全路線の globalTimetable.json をクリーン再生成するスクリプト
const fs = require('fs');
const path = require('path');
const YahooTimetableBuilder = require('./common/yahoo/YahooTimetableBuilder.cjs');

const linesDir = path.resolve('scripts/lines');
const lineFolders = fs.readdirSync(linesDir).filter(f => fs.statSync(path.join(linesDir, f)).isDirectory());

console.log(`=== 全路線時刻表キャッシュ再生成パイプライン開始 ===\n`);

let rebuiltCount = 0;
let skippedCount = 0;

function safeWriteJson(filePath, data) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  const content = JSON.stringify(data, null, 2);
  let attempts = 0;
  while (attempts < 5) {
    try {
      fs.writeFileSync(filePath, content, 'utf8');
      return;
    } catch (e) {
      attempts++;
      if (attempts >= 5) throw e;
      // Wait 100ms before retrying
      const start = Date.now();
      while (Date.now() - start < 100) {}
    }
  }
}

for (const lineId of lineFolders) {
  const configFile = path.join(linesDir, lineId, 'config.cjs');
  const cacheFile = path.resolve('scripts/cache/yahoo', lineId, 'all_train_details.json');

  if (!fs.existsSync(configFile)) {
    console.log(`[Skip] ${lineId}: config.cjs が存在しません。`);
    skippedCount++;
    continue;
  }
  if (!fs.existsSync(cacheFile)) {
    console.log(`[Skip] ${lineId}: all_train_details.json キャッシュが存在しません。`);
    skippedCount++;
    continue;
  }

  const config = require(configFile);
  const trainDetails = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));

  const builder = new YahooTimetableBuilder(config);
  const trips = builder.buildGlobalTimetable(trainDetails);

  // globalTimetable.json の保存
  if (config.outputPaths?.globalTimetable) {
    const outPath = path.resolve(process.cwd(), config.outputPaths.globalTimetable);
    safeWriteJson(outPath, trips);
  }

  // stationTimetables.json の集約・保存（必要な路線のみ）
  if (config.buildStationTimetablesFromTrips && config.outputPaths?.stationTimetables) {
    const tripStationStore = builder.buildStationTimetablesFromTrips(trips);
    const outPath = path.resolve(process.cwd(), config.outputPaths.stationTimetables);
    safeWriteJson(outPath, tripStationStore);
  }

  console.log(`✅ [Rebuild] ${config.name.padEnd(16)} (${lineId}): ${trips.length} 本のトリップを再生成完了`);
  rebuiltCount++;
}

console.log(`\n🎉 全路線時刻表再生成完了: ${rebuiltCount} 路線再生成 (${skippedCount} 路線スキップ)\n`);

const { execSync } = require('child_process');

console.log('=== [Step 2] 全路線の公式列車番号エンリッチメント実行 ===');
execSync('node scripts/enrich_train_numbers.cjs all', { stdio: 'inherit' });

console.log('\n=== [Step 2.1] 特急あずさ松本〜上諏訪間・塩尻通過ダイヤ補完実行 ===');
execSync('node scripts/enrich_azusa_timetable.cjs', { stdio: 'inherit' });

console.log('\n=== [Step 2.2] 中央線快速特急 八王子〜高尾間延伸補間実行 ===');
execSync('node scripts/extend_chuo_hachioji_takao.cjs', { stdio: 'inherit' });

console.log('\n=== [Step 3] S-TRAIN 全線貫通トリップ合成・注入 ===');
execSync('npx tsx scripts/integrate_strain.cjs', { stdio: 'inherit' });

console.log('\n=== [Step 4] 汎用直通リンカー実行 (シームレス同期 & End-to-End行先解決) ===');
execSync('node scripts/runThroughLinker.cjs', { stdio: 'inherit' });

console.log('\n🌟🎉 全29路線の時刻表再生成・列車番号エンリッチ・直通リンクがすべて完璧に完了しました！ 🎉🌟\n');
