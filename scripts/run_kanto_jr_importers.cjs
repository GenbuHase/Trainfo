const { execSync } = require('child_process');

const lines = [
  'jr_tsurumi',
  'jr_keiyo',
  'jr_yokohama',
  'jr_sobu_main',
  'jr_sotobo',
  'jr_narita',
  'jr_nambu',
  'jr_yamanote',
  'jr_chuo_sobu_local',
  'jr_keihin_tohoku_negishi',
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
