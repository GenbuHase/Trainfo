const { execSync } = require('child_process');

const lines = [
  'tsurumi',
  'keiyo',
  'yokohama',
  'sobu_main',
  'sotobo',
  'narita',
  'nambu',
  'yamanote',
  'chuo_sobu_local',
  'keihin_tohoku_negishi',
];

for (const line of lines) {
  console.log(`\n============================================================`);
  console.log(`🚀 Starting Yahoo Importer for: ${line}`);
  console.log(`============================================================\n`);
  try {
    execSync(`node scripts/runYahooImporter.cjs --line ${line}`, { stdio: 'inherit' });
    console.log(`\n✨ Finished ${line} successfully!\n`);
  } catch (err) {
    console.error(`\n❌ Failed to import ${line}:`, err.message);
    process.exit(1);
  }
}
