const fs = require('fs');

const d = JSON.parse(fs.readFileSync('scripts/ekitan_musashino_raw_timetables.json', 'utf8'));

const kitaAsaka = d.weekday['JM-28'];
console.log('--- 北朝霞 上り (inbound) ---');
kitaAsaka.inbound.filter(t => t.d.includes('大宮') || t.rawType.includes('むさしの')).forEach(t => {
  console.log(`${t.h}:${t.time} [${t.t}] ${t.d}行 (${t.no}) rawType=${t.rawType}`);
});

console.log('--- 北朝霞 下り (outbound) ---');
kitaAsaka.outbound.filter(t => t.d.includes('八王子') || t.rawType.includes('むさしの')).forEach(t => {
  console.log(`${t.h}:${t.time} [${t.t}] ${t.d}行 (${t.no}) rawType=${t.rawType}`);
});

const mu = d.weekday['JM-26'];
console.log('--- 武蔵浦和 上り (inbound) ---');
mu.inbound.filter(t => t.d.includes('大宮') || t.rawType.includes('しもうさ')).forEach(t => {
  console.log(`${t.h}:${t.time} [${t.t}] ${t.d}行 (${t.no}) rawType=${t.rawType}`);
});

console.log('--- 武蔵浦和 下り (outbound) ---');
mu.outbound.filter(t => t.d.includes('大宮') || t.rawType.includes('しもうさ')).forEach(t => {
  console.log(`${t.h}:${t.time} [${t.t}] ${t.d}行 (${t.no}) rawType=${t.rawType}`);
});
