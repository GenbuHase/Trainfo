const fs = require('fs');

const chuo = JSON.parse(fs.readFileSync('src/data/lines/chuo/globalTimetable.json', 'utf8'));
const chuoMain = JSON.parse(fs.readFileSync('src/data/lines/chuo_main/globalTimetable.json', 'utf8'));
const shinonoi = JSON.parse(fs.readFileSync('src/data/lines/shinonoi/globalTimetable.json', 'utf8'));

function getYahooId(trip) {
  if (trip.trainId) return trip.trainId;
  const parts = trip.tripId.split('_');
  return parts[parts.length - 1];
}

console.log('=== 下り あずさ号 Yahoo ID 一覧 ===');
const chuoDown = chuo.filter(t => t.direction === 'outbound' && t.trainName && t.trainName.includes('あずさ'));
for (const t of chuoDown) {
  const yId = getYahooId(t);
  const cm = chuoMain.find(x => x.direction === 'outbound' && getYahooId(x) === yId && x.isHoliday === t.isHoliday);
  const sn = shinonoi.find(x => x.direction === 'outbound' && getYahooId(x) === yId && x.isHoliday === t.isHoliday);
  console.log(`${t.trainName} (${t.isHoliday ? '休' : '平'}): yId=${yId} | chuo=${Boolean(t)} | cm=${Boolean(cm)} | sn=${Boolean(sn)}`);
}

console.log('\n=== 上り あずさ号 Yahoo ID 一覧 ===');
const cmUp = chuoMain.filter(t => t.direction === 'inbound' && t.trainName && t.trainName.includes('あずさ'));
for (const t of cmUp) {
  const yId = getYahooId(t);
  const ch = chuo.filter(x => x.direction === 'inbound' && getYahooId(x) === yId && x.isHoliday === t.isHoliday);
  const sn = shinonoi.find(x => x.direction === 'inbound' && getYahooId(x) === yId && x.isHoliday === t.isHoliday);
  console.log(`${t.trainName} (${t.isHoliday ? '休' : '平'}): yId=${yId} | sn=${Boolean(sn)} | cm=${Boolean(t)} | chuoCount=${ch.length} (${ch.map(x => x.trainType).join(',')})`);
}
