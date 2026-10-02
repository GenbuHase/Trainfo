// Yahoo! 路線情報 共通スクレイパー & インポーター統合パイプライン
const fs = require('fs');
const path = require('path');
const YahooClient = require('./YahooClient.cjs');
const YahooStationTimetableScraper = require('./YahooStationTimetableScraper.cjs');
const YahooTrainDetailScraper = require('./YahooTrainDetailScraper.cjs');
const YahooTimetableBuilder = require('./YahooTimetableBuilder.cjs');

/**
 * 統合インポートパイプラインの実行
 * @param {Object} config - LineScraperConfig
 * @param {Object} [options]
 * @param {boolean} [options.bypassCache=false]
 * @param {boolean} [options.skipTrains=false]
 * @param {number} [options.delayMs=250]
 */
async function runYahooPipeline(config, options = {}) {
  console.log(`\n============================================================`);
  console.log(`🚀 Starting Yahoo! Transit Pipeline for: ${config.name} (${config.lineId})`);
  console.log(`============================================================`);

  const cacheDir = path.resolve(process.cwd(), `scripts/cache/yahoo/${config.lineId}`);
  const client = new YahooClient({
    cacheDir,
    delayMs: options.delayMs || 250,
    bypassCache: options.bypassCache || false,
  });

  // Step 1: 駅時刻表スクレイピング
  console.log(`\n[Step 1/3] Scraping Station Timetables (${config.stations.length} stations)...`);
  const stationScraper = new YahooStationTimetableScraper(client, config);
  const { store, uniqueTrains } = await stationScraper.scrapeAllStations({
    onProgress: (p) => {
      process.stdout.write(`\r  Progress: [${p.step}/${p.total}] Station: ${p.station.name} (${p.day}) - Unique Trains: ${p.uniqueTrainsCount}`);
    },
  });
  console.log(`\n  Done! Found ${uniqueTrains.length} unique trains across all stations.`);

  // stationTimetables.json の保存
  if (config.outputPaths?.stationTimetables) {
    const outPath = path.resolve(process.cwd(), config.outputPaths.stationTimetables);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(store, null, 2), 'utf8');
    console.log(`  Saved station timetables to: ${config.outputPaths.stationTimetables}`);
  }

  if (options.skipTrains) {
    console.log(`\n[Info] --skip-trains specified. Skipping train details.`);
    return { store, uniqueTrains };
  }

  // Step 2: 列車詳細スクレイピング
  console.log(`\n[Step 2/3] Scraping Train Details (${uniqueTrains.length} unique trains)...`);
  const trainScraper = new YahooTrainDetailScraper(client, config);
  const trainDetailsMap = await trainScraper.scrapeAllTrains(uniqueTrains, {
    onProgress: (p) => {
      if (p.index % 10 === 0 || p.index === p.total) {
        process.stdout.write(`\r  Progress: [${p.index}/${p.total}] (${p.percent}%) Train: ${p.trainRef.trainId} (${p.trainRef.dayKey} ${p.trainRef.trainType})`);
      }
    },
  });
  console.log(`\n  Done! Successfully collected ${trainDetailsMap.size} train details.`);

  // 一括キャッシュバックアップ
  const trainDetailsArray = Array.from(trainDetailsMap.values());
  const backupPath = path.join(cacheDir, 'all_train_details.json');
  fs.writeFileSync(backupPath, JSON.stringify(trainDetailsArray, null, 2), 'utf8');
  console.log(`  Saved train details backup to: ${backupPath}`);

  // Step 3: ダイヤ合成 & 汎用通過・秒補間
  console.log(`\n[Step 3/3] Building Global Timetable Trips & Interpolating Passing Stations...`);
  const builder = new YahooTimetableBuilder(config);
  const trips = builder.buildGlobalTimetable(trainDetailsArray);
  console.log(`  Generated ${trips.length} valid simulation trips.`);

  // globalTimetable.json の保存
  if (config.outputPaths?.globalTimetable) {
    const outPath = path.resolve(process.cwd(), config.outputPaths.globalTimetable);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(trips, null, 2), 'utf8');
    console.log(`  Saved global timetable to: ${config.outputPaths.globalTimetable}`);
  }

  console.log(`\n============================================================`);
  console.log(`✨ Pipeline Completed Successfully for ${config.name}!`);
  console.log(`============================================================\n`);

  return { store, uniqueTrains, trips };
}

module.exports = {
  YahooClient,
  YahooStationTimetableScraper,
  YahooTrainDetailScraper,
  YahooTimetableBuilder,
  runYahooPipeline,
};
