const fs = require('fs');

const jti = JSON.parse(fs.readFileSync('src/data/lines/joban_toride_iwaki/globalTimetable.json', 'utf8'));
const list = jti.filter(t => !t.isHoliday && t.stops && t.stops.some(s => s.stationId === 'JTI-01' && (s.departureTime === '10:06:00' || s.arrivalTime === '10:06:00')));
console.log('JTI trips at 10:06:00:');
list.forEach(t => {
  console.log(t.tripId, t.trainNumber, t.trainName, t.trainType, t.prevTripId, t.throughTripId);
});
