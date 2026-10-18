const path = require('path');
const { runYahooPipeline } = require('./common/yahoo/index.cjs');

const lines = [
  // 小規模路線から順次実行
  'tobu_kameido',
  'tobu_sano',
  'tobu_koizumi',
  'tobu_kiryu',
  'tobu_utsunomiya',
  'tobu_kinugawa',
  'yagan',
  'aizu',
  'tobu_isesaki',
  'tobu_nikko',
  'tobu_skytree',
  'tobu_urban_park',
];

async function main() {
  console.log(`Starting Yahoo! Importer for remaining ${lines.length} lines...`);

  for (let i = 0; i < lines.length; i++) {
    const lineId = lines[i];
    console.log(`\n============================================================`);
    console.log(`[${i + 1}/${lines.length}] Processing line: ${lineId}`);
    console.log(`============================================================`);

    const configPath = path.resolve(__dirname, `lines/${lineId}/config.cjs`);
    try {
      const config = require(configPath);
      await runYahooPipeline(config, {
        bypassCache: false,
        skipTrains: false,
        delayMs: 150,
      });
      console.log(`✅ Successfully completed pipeline for ${lineId}`);
    } catch (e) {
      console.error(`❌ Error in pipeline for ${lineId}:`, e);
    }
  }

  console.log(`\n🎉 All lines Yahoo import finished!`);
}

main().catch(console.error);
