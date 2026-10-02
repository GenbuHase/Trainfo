const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/ekitan_musashino_raw_timetables.json', 'utf8'));

// 1011E を全駅探索
const trainMap = new Map();

for (const [stId, stData] of Object.entries(raw.weekday)) {
  const allStList = (stData.outbound || []).concat(stData.inbound || []);
  allStList.forEach(t => {
    if (t.no === '1011E') {
      trainMap.set(stId, t.sec);
    }
  });
}

console.log('1011E stations found in raw data:', trainMap.size);
for (const [stId, sec] of trainMap.entries()) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  console.log(`  ${stId}: ${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
}
