#!/usr/bin/env node
// キャッシュから東京メトロ有楽町線・副都心線のダイヤを再生成・分離するスクリプト
const fs = require('fs');
const path = require('path');
const YahooTimetableBuilder = require('./common/yahoo/YahooTimetableBuilder.cjs');
const { linkTojoAndMetro } = require('./link_tojo_metro.cjs');

function rebuildLine(configPath, cachePath) {
  const config = require(configPath);
  console.log(`\n============================================================`);
  console.log(`🔄 Rebuilding ${config.name} (${config.lineId}) from cache...`);
  console.log(`============================================================`);

  if (!fs.existsSync(cachePath)) {
    throw new Error(`Cache file not found: ${cachePath}`);
  }

  const trainDetails = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  console.log(`  Loaded ${trainDetails.length} train details from ${cachePath}`);

  const builder = new YahooTimetableBuilder(config);
  const trips = builder.buildGlobalTimetable(trainDetails);
  console.log(`  Generated ${trips.length} valid simulation trips (after exclusion filters).`);

  // globalTimetable.json の保存
  if (config.outputPaths?.globalTimetable) {
    const outPath = path.resolve(process.cwd(), config.outputPaths.globalTimetable);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(trips, null, 2), 'utf8');
    console.log(`  Saved global timetable to: ${config.outputPaths.globalTimetable}`);
  }

  // stationTimetables.json の集約・保存
  if (config.buildStationTimetablesFromTrips && config.outputPaths?.stationTimetables) {
    console.log(`  Re-aggregating station timetables from ${trips.length} trips...`);
    const tripStationStore = builder.buildStationTimetablesFromTrips(trips);
    const outPath = path.resolve(process.cwd(), config.outputPaths.stationTimetables);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(tripStationStore, null, 2), 'utf8');
    console.log(`  Saved aggregated station timetables to: ${config.outputPaths.stationTimetables}`);
  }

  return trips;
}

function main() {
  const yConfigPath = path.resolve(__dirname, 'lines/yurakucho/config.cjs');
  const yCachePath = path.resolve(__dirname, 'cache/yahoo/yurakucho/all_train_details.json');

  const fConfigPath = path.resolve(__dirname, 'lines/fukutoshin/config.cjs');
  const fCachePath = path.resolve(__dirname, 'cache/yahoo/fukutoshin/all_train_details.json');

  const yTrips = rebuildLine(yConfigPath, yCachePath);
  const fTrips = rebuildLine(fConfigPath, fCachePath);

  console.log(`\n============================================================`);
  console.log(`🔗 Running Tojo Line ↔ Tokyo Metro Wakoshi Station Linking...`);
  console.log(`============================================================`);
  linkTojoAndMetro();

  console.log(`\n✨ Successfully rebuilt and linked Yurakucho and Fukutoshin lines!`);
}

if (require.main === module) {
  main();
}
