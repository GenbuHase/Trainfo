// scripts/batch_enrich_wave2.cjs
const { spawnSync } = require('child_process');

const lines = [
  'jr_yumesaki',
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

console.log(`Starting batch train number enrichment for ${lines.length} lines...`);

for (let i = 0; i < lines.length; i++) {
  const lineId = lines[i];
  console.log(`\n======================================================`);
  console.log(`[${i + 1}/${lines.length}] Enriching train numbers for ${lineId}...`);
  console.log(`======================================================\n`);

  const res = spawnSync('node', ['scripts/enrich_train_numbers.cjs', lineId], {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  if (res.status !== 0) {
    console.error(`Error enriching ${lineId}: exited with code ${res.status}`);
    process.exit(res.status);
  }
}

console.log('\nAll Wave 2 train numbers enriched successfully!');
