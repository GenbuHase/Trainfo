const { execSync } = require('child_process');

const lines = [
  'izukyu',
  'izuhakone_sunzu',
  'gotemba',
  'fujikyu',
  'yamagata_shinkansen',
  'akita_shinkansen',
];

for (const lineId of lines) {
  console.log(`\n========================================`);
  console.log(`🚆 Running Yahoo Importer for ${lineId}`);
  console.log(`========================================`);
  try {
    execSync(`node scripts/runYahooImporter.cjs --line ${lineId}`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Error importing ${lineId}:`, e.message);
  }
}

console.log('\n🎉 All 6 lines Yahoo Importer finished!');
