const fs = require('fs');

const saikyo = JSON.parse(fs.readFileSync('src/data/lines/saikyo/globalTimetable.json', 'utf8'));
const list = saikyo.filter(t => t.prevLineId === 'sotetsu_jr_direct');
console.log(`saikyo trips from sotetsu_jr_direct: ${list.length}`);
list.slice(0, 3).forEach(t => {
  console.log(t.tripId, t.trainNumber, t.direction, 'origin:', t.originStationId);
  t.stops.slice(0, 5).forEach(s => console.log(' ', s.stationId, s.arrivalTime, s.departureTime, s.isPassing));
});
