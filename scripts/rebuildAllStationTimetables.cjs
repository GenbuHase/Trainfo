// 全路線の globalTimetable.json から stationTimetables.json を一括再集約・保存するスクリプト
// 直通リンカー（runThroughLinker.cjs）実行後に呼び出すことで、
// 同期された発車時刻・End-to-End最終行先・tripId が全駅時刻表に反映されます。

const fs = require('fs');
const path = require('path');
const YahooTimetableBuilder = require('./common/yahoo/YahooTimetableBuilder.cjs');

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
      const start = Date.now();
      while (Date.now() - start < 100) {}
    }
  }
}

function rebuildAllStationTimetables() {
  console.log('=== 🚉 全路線の駅時刻表 (stationTimetables.json) 再集約開始 ===\n');

  const linesDir = path.resolve('scripts/lines');
  const lineFolders = fs.readdirSync(linesDir).filter(f => fs.statSync(path.join(linesDir, f)).isDirectory());

  let totalLines = 0;
  let totalDepartures = 0;

  for (const lineId of lineFolders) {
    const configFile = path.join(linesDir, lineId, 'config.cjs');
    if (!fs.existsSync(configFile)) continue;

    const config = require(configFile);
    if (!config.outputPaths?.stationTimetables || !config.outputPaths?.globalTimetable) continue;

    const gtPath = path.resolve(process.cwd(), config.outputPaths.globalTimetable);
    const stPath = path.resolve(process.cwd(), config.outputPaths.stationTimetables);

    if (!fs.existsSync(gtPath)) {
      console.log(`[Skip] ${lineId}: globalTimetable.json が存在しません。`);
      continue;
    }

    try {
      const trips = JSON.parse(fs.readFileSync(gtPath, 'utf8'));
      const builder = new YahooTimetableBuilder(config);
      const stationTimetables = builder.buildStationTimetablesFromTrips(trips);

      let depCount = 0;
      for (const day of ['weekday', 'holiday']) {
        if (stationTimetables[day]) {
          for (const stId of Object.keys(stationTimetables[day])) {
            depCount += (stationTimetables[day][stId]?.inbound?.length || 0);
            depCount += (stationTimetables[day][stId]?.outbound?.length || 0);
          }
        }
      }

      safeWriteJson(stPath, stationTimetables);
      console.log(`✅ [StationTimetable] ${config.name.padEnd(16)} (${lineId.padEnd(20)}): ${trips.length} 本のトリップから ${depCount} 便の発車標データを生成`);
      totalLines++;
      totalDepartures += depCount;
    } catch (err) {
      console.error(`❌ [Error] ${lineId}: 駅時刻表の生成に失敗しました:`, err.message);
    }
  }

  console.log(`\n🎉 駅時刻表再集約完了: 全 ${totalLines} 路線 (${totalDepartures} 便) を正常に更新しました！\n`);
}

if (require.main === module) {
  rebuildAllStationTimetables();
}

module.exports = {
  rebuildAllStationTimetables,
};
