const path = require('path');
const { runYahooPipeline } = require('./common/yahoo/index.cjs');

// 対象7路線
const targetLines = [
  'yokosuka',
  'sobu_rapid',
  'tokaido',
  'shonan_shinjuku',
  'takasaki',
  'utsunomiya',
  'ueno_tokyo',
];

async function main() {
  console.log(`🚀 Starting batch import for ${targetLines.length} lines:`, targetLines);

  for (let i = 0; i < targetLines.length; i++) {
    const lineId = targetLines[i];
    console.log(`\n============================================================`);
    console.log(`[${i + 1}/${targetLines.length}] Processing line: ${lineId}`);
    console.log(`============================================================`);

    const configPath = path.resolve(__dirname, `lines/${lineId}/config.cjs`);
    const config = require(configPath);

    try {
      await runYahooPipeline(config, {
        delayMs: 150, // テンポよく
        bypassCache: false,
      });
      console.log(`✅ [${i + 1}/${targetLines.length}] Completed: ${lineId}`);
    } catch (err) {
      console.error(`❌ [${i + 1}/${targetLines.length}] Failed: ${lineId}`, err);
      // 続行
    }
  }

  console.log(`\n🎉 ALL LINES IMPORT FINISHED!`);
}

main().catch(console.error);
