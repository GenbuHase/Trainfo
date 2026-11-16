// scripts/batch_import_wave3_wave4.cjs
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

console.log(`Starting batch import for ${lines.length} lines (Wave 3 & Wave 4)...`);

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

console.log('\nAll Wave 3 & 4 lines imported successfully!');
