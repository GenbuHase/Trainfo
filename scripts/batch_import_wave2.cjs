// scripts/batch_import_wave2.cjs
const { spawnSync } = require('child_process');

const lines = [
  'jr_kansai_airport',
  'jr_tozai',
  'jr_fukuchiyama_north',
  'jr_osaka_higashi',
  'jr_osaka_loop',
  'jr_hokuriku_maibara_tsuruga',
  'jr_takarazuka',
  'jr_gakken_toshi',
  'jr_yamatoji',
  'jr_hanwa'
];

console.log(`Starting batch import for ${lines.length} lines...`);

for (let i = 0; i < lines.length; i++) {
  const lineId = lines[i];
  console.log(`\n======================================================`);
  console.log(`[${i + 1}/${lines.length}] Running Yahoo importer for ${lineId}...`);
  console.log(`======================================================\n`);

  const res = spawnSync('node', ['scripts/runYahooImporter.cjs', '--line', lineId], {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  if (res.status !== 0) {
    console.error(`Error importing ${lineId}: exited with code ${res.status}`);
    process.exit(res.status);
  }
}

console.log('\nAll Wave 2 lines imported successfully!');
