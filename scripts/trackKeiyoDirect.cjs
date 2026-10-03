const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/ekitan_musashino_raw_timetables.json', 'utf8'));

// 東京方面
console.log('--- Checking Tokyo bound trains in Keiyo stations ---');
const tokyoStationIds = ['JM-10', 'JE-09', 'JE-08', 'JE-07', 'JE-06', 'JE-05', 'JE-04', 'JE-03', 'JE-02', 'JE-01'];

// 府中本町発東京行きの1本をピックアップ
const fuchuTokyo = raw.weekday['JM-35'].outbound.find(t => t.d.includes('東京'));
console.log('Sample Fuchu -> Tokyo train:', fuchuTokyo);

if (fuchuTokyo) {
  const trainNo = fuchuTokyo.no;
  console.log(`Tracking ${trainNo} to Tokyo:`);
  tokyoStationIds.forEach(stId => {
    const list = (raw.weekday[stId]?.outbound || []).concat(raw.weekday[stId]?.inbound || []);
    const match = list.find(t => t.no === trainNo);
    if (match) {
      console.log(`  ${stId}: ${match.h}:${match.time} (${match.sec}s) ${match.d}行`);
    } else {
      console.log(`  ${stId}: not found by trainNo "${trainNo}"`);
    }
  });
}

// 南船橋方面
console.log('\n--- Checking Minami-Funabashi / Makuhari bound trains in Keiyo stations ---');
const makuhariStationIds = ['JM-10', 'JE-11', 'JE-12', 'JE-13', 'JE-14'];
const fuchuMakuhari = raw.weekday['JM-35'].outbound.find(t => t.d.includes('海浜幕張') || t.d.includes('南船橋'));
console.log('Sample Fuchu -> Makuhari/Minami train:', fuchuMakuhari);

if (fuchuMakuhari) {
  const trainNo = fuchuMakuhari.no;
  console.log(`Tracking ${trainNo} to Makuhari:`);
  makuhariStationIds.forEach(stId => {
    const list = (raw.weekday[stId]?.outbound || []).concat(raw.weekday[stId]?.inbound || []);
    const match = list.find(t => t.no === trainNo);
    if (match) {
      console.log(`  ${stId}: ${match.h}:${match.time} (${match.sec}s) ${match.d}行`);
    } else {
      console.log(`  ${stId}: not found by trainNo "${trainNo}"`);
    }
  });
}
