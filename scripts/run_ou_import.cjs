const { spawn } = require('child_process');
const path = require('path');

const lines = [
  'ou_fukushima_shinjo',
  'ou_shinjo_omagari',
  'ou_omagari_akita',
  'ou_akita_aomori',
];

function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd: path.resolve(__dirname, '..'),
      stdio: 'inherit',
    });
    child.on('exit', code => {
      if (code === 0) resolve();
      else reject(new Error(`${args.join(' ')} exited ${code}`));
    });
  });
}

async function main() {
  for (const lineId of lines) {
    await run(['scripts/runYahooImporter.cjs', '--line', lineId, '--delay', '220']);
    await run(['scripts/enrich_train_numbers.cjs', lineId]);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
