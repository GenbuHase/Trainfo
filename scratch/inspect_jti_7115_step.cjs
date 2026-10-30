const fs = require('fs');
const { bridgeJobanLimitedExpress } = require('../scripts/bridgeJobanLimitedExpress.cjs');

// 一旦元データをロード
const north = JSON.parse(fs.readFileSync('src/data/lines/joban_toride_iwaki/globalTimetable.json', 'utf8'));
const t7115 = north.find(t => t.tripId.includes('7115') && !t.isHoliday);
console.log('Before bridgeJobanLimitedExpress:');
console.log('originStationId:', t7115?.originStationId);
t7115?.stops?.slice(0, 5).forEach(s => console.log(s.stationId, s.arrivalTime, s.departureTime, s.isPassing));

bridgeJobanLimitedExpress();

const northAfter = JSON.parse(fs.readFileSync('src/data/lines/joban_toride_iwaki/globalTimetable.json', 'utf8'));
const t7115After = northAfter.find(t => t.tripId.includes('7115') && !t.isHoliday);
console.log('\nAfter bridgeJobanLimitedExpress:');
console.log('originStationId:', t7115After?.originStationId);
t7115After?.stops?.slice(0, 5).forEach(s => console.log(s.stationId, s.arrivalTime, s.departureTime, s.isPassing));
