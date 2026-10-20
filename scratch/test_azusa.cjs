const fs = require('fs');
const chuo = JSON.parse(fs.readFileSync('src/data/lines/chuo/globalTimetable.json', 'utf8'));
const chuoMain = JSON.parse(fs.readFileSync('src/data/lines/chuo_main/globalTimetable.json', 'utf8'));
const shinonoi = JSON.parse(fs.readFileSync('src/data/lines/shinonoi/globalTimetable.json', 'utf8'));

const azusa1Chuo = chuo.find(t => t.trainName === 'あずさ1号' && !t.isHoliday);
const azusa1Main = chuoMain.find(t => t.trainName === 'あずさ1号' && !t.isHoliday);
const azusa1Shino = shinonoi.find(t => t.trainName === 'あずさ1号' && !t.isHoliday);

console.log('--- あずさ1号 (下り 平日) ---');
console.log('chuo:', azusa1Chuo ? { tripId: azusa1Chuo.tripId, dir: azusa1Chuo.direction, orig: azusa1Chuo.originStationId, dest: azusa1Chuo.destinationStationId, throughTripId: azusa1Chuo.throughTripId, prevTripId: azusa1Chuo.prevTripId, lastStop: azusa1Chuo.stops[azusa1Chuo.stops.length-1] } : 'NOT FOUND');
console.log('chuo_main:', azusa1Main ? { tripId: azusa1Main.tripId, dir: azusa1Main.direction, orig: azusa1Main.originStationId, dest: azusa1Main.destinationStationId, throughTripId: azusa1Main.throughTripId, prevTripId: azusa1Main.prevTripId, firstStop: azusa1Main.stops[0], lastStop: azusa1Main.stops[azusa1Main.stops.length-1] } : 'NOT FOUND');
console.log('shinonoi:', azusa1Shino ? { tripId: azusa1Shino.tripId, dir: azusa1Shino.direction, orig: azusa1Shino.originStationId, dest: azusa1Shino.destinationStationId, throughTripId: azusa1Shino.throughTripId, prevTripId: azusa1Shino.prevTripId, firstStop: azusa1Shino.stops[0] } : 'NOT FOUND');

const azusa2Chuo = chuo.find(t => t.trainName === 'あずさ2号' && !t.isHoliday);
const azusa2Main = chuoMain.find(t => t.trainName === 'あずさ2号' && !t.isHoliday);
const azusa2Shino = shinonoi.find(t => t.trainName === 'あずさ2号' && !t.isHoliday);

console.log('\n--- あずさ2号 (上り 平日) ---');
console.log('shinonoi:', azusa2Shino ? { tripId: azusa2Shino.tripId, dir: azusa2Shino.direction, orig: azusa2Shino.originStationId, dest: azusa2Shino.destinationStationId, throughTripId: azusa2Shino.throughTripId, prevTripId: azusa2Shino.prevTripId, lastStop: azusa2Shino.stops[azusa2Shino.stops.length-1] } : 'NOT FOUND');
console.log('chuo_main:', azusa2Main ? { tripId: azusa2Main.tripId, dir: azusa2Main.direction, orig: azusa2Main.originStationId, dest: azusa2Main.destinationStationId, throughTripId: azusa2Main.throughTripId, prevTripId: azusa2Main.prevTripId, firstStop: azusa2Main.stops[0], lastStop: azusa2Main.stops[azusa2Main.stops.length-1] } : 'NOT FOUND');
console.log('chuo:', azusa2Chuo ? { tripId: azusa2Chuo.tripId, dir: azusa2Chuo.direction, orig: azusa2Chuo.originStationId, dest: azusa2Chuo.destinationStationId, throughTripId: azusa2Chuo.throughTripId, prevTripId: azusa2Chuo.prevTripId, firstStop: azusa2Chuo.stops[0] } : 'NOT FOUND');
