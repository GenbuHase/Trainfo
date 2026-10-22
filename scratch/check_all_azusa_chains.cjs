const fs = require('fs');

const chuo = JSON.parse(fs.readFileSync('src/data/lines/chuo/globalTimetable.json', 'utf8'));
const chuoMain = JSON.parse(fs.readFileSync('src/data/lines/chuo_main/globalTimetable.json', 'utf8'));
const shinonoi = JSON.parse(fs.readFileSync('src/data/lines/shinonoi/globalTimetable.json', 'utf8'));

let downTotal = 0;
let downOk = 0;
let upTotal = 0;
let upOk = 0;

for (const sn of shinonoi) {
  if (sn.trainName && sn.trainName.includes('あずさ')) {
    if (sn.direction === 'outbound') {
      downTotal++;
      const cm = chuoMain.find(t => t.tripId === sn.prevTripId);
      const c = cm ? chuo.find(t => t.tripId === cm.prevTripId) : null;
      if (cm && c && c.throughTripId === cm.tripId && cm.throughTripId === sn.tripId) {
        downOk++;
      } else {
        console.log(`[Down Missing] ${sn.trainName} (${sn.isHoliday ? '休' : '平'}): sn.prev=${sn.prevTripId}, cm=${Boolean(cm)}, c=${Boolean(c)}`);
      }
    } else if (sn.direction === 'inbound') {
      upTotal++;
      const cm = chuoMain.find(t => t.tripId === sn.throughTripId);
      const c = cm ? chuo.find(t => t.tripId === cm.throughTripId) : null;
      if (cm && c && sn.throughTripId === cm.tripId && cm.throughTripId === c.tripId) {
        upOk++;
      } else {
        console.log(`[Up Missing] ${sn.trainName} (${sn.isHoliday ? '休' : '平'}): sn.through=${sn.throughTripId}, cm=${Boolean(cm)}, c=${Boolean(c)}`);
      }
    }
  }
}

console.log(`\n=== 篠ノ井線発着 あずさ号 3線完全貫通チェーン率 ===`);
console.log(`下り (新宿/東京 -> 松本): ${downOk} / ${downTotal} (${Math.round(downOk / downTotal * 100)}%)`);
console.log(`上り (松本 -> 新宿/東京): ${upOk} / ${upTotal} (${Math.round(upOk / upTotal * 100)}%)`);
