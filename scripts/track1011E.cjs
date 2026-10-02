const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/ekitan_musashino_raw_timetables.json', 'utf8'));

console.log('Searching for 10:50 departure from 府中本町 (JM-35)...');
const fuchuOut = raw.weekday['JM-35']?.outbound || [];
const t1050 = fuchuOut.find(t => t.h === 10 && t.m === 50);
console.log('府中本町 10:50 train:', t1050);

if (t1050) {
  const trainNo = t1050.no;
  console.log(`Tracking trainNo "${trainNo}" across all stations:`);

  // 各駅でこの列車番号を探す
  const stations = [
    'JM-35', 'JM-34', 'JM-33', 'JM-32', 'JM-31', 'JM-30', 'JM-29', 'JM-28', 'JM-27', 'JM-26',
    'JM-25', 'JM-24', 'JM-23', 'JM-22', 'JM-21', 'JM-20', 'JM-19', 'JM-18', 'JM-17', 'JM-16',
    'JM-15', 'JM-14', 'JM-13', 'JM-12', 'JM-11', 'JM-10', 'JE-11'
  ];

  stations.forEach(stId => {
    const list = raw.weekday[stId]?.outbound || [];
    const match = list.find(t => t.no === trainNo);
    if (match) {
      console.log(`  ${stId}: ${match.h}:${match.time} (${match.sec}s) ${match.d}行`);
    } else {
      console.log(`  ${stId}: not found by trainNo "${trainNo}"`);
    }
  });
}
