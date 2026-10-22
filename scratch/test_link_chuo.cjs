const path = require('path');
const fs = require('fs');
const { connections } = require(path.resolve('scripts/common/throughLinker/connectionsConfig.cjs'));

const chuoConn = connections.filter(c => c.lineA === 'chuo' || c.lineB === 'chuo' || c.lineA === 'chuo_main' || c.lineB === 'chuo_main');
console.log('Chuo connections:');
for (const c of chuoConn) {
  console.log(' -', c.name, `(${c.lineA} -> ${c.lineB})`);
}

// 実際に chuo と chuo_main のあずさ1号が高尾でマッチするか検証
const chuoTrips = JSON.parse(fs.readFileSync('src/data/lines/chuo/globalTimetable.json', 'utf8'));
const chuoMainTrips = JSON.parse(fs.readFileSync('src/data/lines/chuo_main/globalTimetable.json', 'utf8'));

const tA = chuoTrips.find(t => t.trainName === 'あずさ1号' && !t.isHoliday);
const tB = chuoMainTrips.find(t => t.trainName === 'あずさ1号' && !t.isHoliday);

console.log('\ntA stops:');
for (const s of tA.stops) {
  if (['JC-22', 'JC-23', 'JC-24'].includes(s.stationId)) console.log(' ', s);
}

console.log('\ntB stops:');
for (const s of tB.stops) {
  if (['JC-22', 'JC-23', 'JC-24'].includes(s.stationId)) console.log(' ', s);
}
