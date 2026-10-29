const { spawn } = require('child_process');
const path = require('path');

const workerGroups = [
  // Worker 1: 千葉方面
  ['keiyo', 'sobu_main', 'sotobo'],
  // Worker 2: 神奈川・成田
  ['narita', 'yokohama', 'nambu'],
  // Worker 3: 都心環状・主要幹線
  ['yamanote', 'chuo_sobu_local', 'keihin_tohoku_negishi'],
];

async function runWorker(group, workerId) {
  for (const line of group) {
    console.log(`[Worker ${workerId}] 🚀 Starting ${line}...`);
    await new Promise((resolve, reject) => {
      const child = spawn(
        process.execPath,
        ['scripts/runYahooImporter.cjs', '--line', line, '--delay', '120'],
        { stdio: ['ignore', 'pipe', 'pipe'] }
      );

      child.stdout.on('data', (d) => {
        const str = d.toString();
        // 進捗行のみ抽出表示
        const progressLines = str.split('\n').filter(l => l.includes('Progress:') || l.includes('Done!') || l.includes('Completed') || l.includes('Starting'));
        if (progressLines.length > 0) {
          console.log(`[Worker ${workerId} - ${line}] ${progressLines[progressLines.length - 1].trim()}`);
        }
      });

      child.stderr.on('data', (d) => {
        console.error(`[Worker ${workerId} - ${line} ERR] ${d.toString().trim()}`);
      });

      child.on('close', (code) => {
        if (code === 0) {
          console.log(`[Worker ${workerId}] ✨ Finished ${line} successfully!`);
          resolve();
        } else {
          reject(new Error(`Worker ${workerId} failed on line ${line} with exit code ${code}`));
        }
      });
    });
  }
}

async function main() {
  console.log('Starting 3 parallel workers for remaining 9 lines...');
  const startTime = Date.now();
  await Promise.all(workerGroups.map((group, idx) => runWorker(group, idx + 1)));
  const elapsed = Math.round((Date.now() - startTime) / 1000);
  console.log(`\n🎉 All 9 lines finished in ${elapsed}s!\n`);
}

main().catch(err => {
  console.error('Fatal error in parallel workers:', err);
  process.exit(1);
});
