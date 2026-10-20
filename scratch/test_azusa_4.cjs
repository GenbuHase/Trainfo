const fs = require('fs');
const chuo = JSON.parse(fs.readFileSync('src/data/lines/chuo/globalTimetable.json', 'utf8'));
const chuoMain = JSON.parse(fs.readFileSync('src/data/lines/chuo_main/globalTimetable.json', 'utf8'));
const shinonoi = JSON.parse(fs.readFileSync('src/data/lines/shinonoi/globalTimetable.json', 'utf8'));

const tShino = shinonoi.find(t => t.trainName === 'あずさ4号' && !t.isHoliday);
const tMain = chuoMain.find(t => t.trainName === 'あずさ4号' && !t.isHoliday);
const tChuo = chuo.find(t => t.trainName === 'あずさ4号' && !t.isHoliday);

console.log('--- あずさ4号 (上り 平日) ---');
console.log('shinonoi:', tShino ? {
  tripId: tShino.tripId,
  dir: tShino.direction,
  stops: tShino.stops.map(s => `${s.stationId}(${s.arrivalTime}-${s.departureTime})${s.isPassing ? '(通)' : ''}`),
  through: tShino.throughTripId
} : 'none');

console.log('chuo_main:', tMain ? {
  tripId: tMain.tripId,
  dir: tMain.direction,
  stopsFirst: tMain.stops.slice(0, 3).map(s => `${s.stationId}(${s.arrivalTime}-${s.departureTime})${s.isPassing ? '(通)' : ''}`),
  stopsLast: tMain.stops.slice(-3).map(s => `${s.stationId}(${s.arrivalTime}-${s.departureTime})${s.isPassing ? '(通)' : ''}`),
  prev: tMain.prevTripId,
  through: tMain.throughTripId
} : 'none');

console.log('chuo:', tChuo ? {
  tripId: tChuo.tripId,
  dir: tChuo.direction,
  stopsFirst: tChuo.stops.slice(0, 3).map(s => `${s.stationId}(${s.arrivalTime}-${s.departureTime})${s.isPassing ? '(通)' : ''}`),
  prev: tChuo.prevTripId
} : 'none');
