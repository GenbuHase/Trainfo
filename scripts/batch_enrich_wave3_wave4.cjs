// scripts/batch_enrich_wave3_wave4.cjs
const { spawnSync } = require('child_process');

const lines = [
  // Wave 3
  'jr_sagano',
  'jr_sanin_sonobe_kinosaki',
  'jr_kosei',
  'jr_kusatsu',
  'jr_nara',
  'jr_sakurai',
  'jr_wakayama',
  // Wave 4
  'jr_kinokuni',
  'jr_kansai_kameyama_kamo',
  'jr_sanyo_himeji_kamigori',
  'jr_ako',
  'jr_kakogawa',
  'jr_kishin',
  'jr_bantan',
  'jr_maizuru',
  'jr_obama',
  'jr_wadamisaki'
];

console.log(`Starting batch train number enrichment for ${lines.length} lines (Wave 3 & 4)...`);

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

console.log('\nAll Wave 3 & 4 train numbers enriched successfully!');
