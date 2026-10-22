const fs = require('fs');

const chuo = JSON.parse(fs.readFileSync('src/data/lines/chuo/globalTimetable.json', 'utf8'));
const chuoMain = JSON.parse(fs.readFileSync('src/data/lines/chuo_main/globalTimetable.json', 'utf8'));
const shinonoi = JSON.parse(fs.readFileSync('src/data/lines/shinonoi/globalTimetable.json', 'utf8'));

console.log('--- あずさ33号 (平日 下り) ---');
console.log('chuo:', chuo.filter(t => t.trainName && t.trainName.includes('あずさ33号') && !t.isHoliday).map(t => [t.tripId, t.throughTripId]));
console.log('chuo_main:', chuoMain.filter(t => t.trainName && t.trainName.includes('あずさ33号') && !t.isHoliday).map(t => [t.tripId, t.prevTripId, t.throughTripId]));
console.log('shinonoi:', shinonoi.filter(t => t.trainName && t.trainName.includes('あずさ33号') && !t.isHoliday).map(t => [t.tripId, t.prevTripId]));

console.log('\n--- あずさ1号 (平日 下り) ---');
console.log('chuo:', chuo.filter(t => t.trainName && t.trainName.includes('あずさ1号') && !t.isHoliday).map(t => [t.tripId, t.throughTripId]));
console.log('chuo_main:', chuoMain.filter(t => t.trainName && t.trainName.includes('あずさ1号') && !t.isHoliday).map(t => [t.tripId, t.prevTripId, t.throughTripId]));
console.log('shinonoi:', shinonoi.filter(t => t.trainName && t.trainName.includes('あずさ1号') && !t.isHoliday).map(t => [t.tripId, t.prevTripId]));

console.log('\n--- あずさ46号 (平日 上り) ---');
console.log('shinonoi:', shinonoi.filter(t => t.trainName && t.trainName.includes('あずさ46号') && !t.isHoliday).map(t => [t.tripId, t.throughTripId]));
console.log('chuo_main:', chuoMain.filter(t => t.trainName && t.trainName.includes('あずさ46号') && !t.isHoliday).map(t => [t.tripId, t.prevTripId, t.throughTripId]));
console.log('chuo:', chuo.filter(t => t.trainName && t.trainName.includes('あずさ46号') && !t.isHoliday).map(t => [t.tripId, t.prevTripId]));
