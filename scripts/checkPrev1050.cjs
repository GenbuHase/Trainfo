const fs = require('fs');

const d = JSON.parse(fs.readFileSync('src/data/lines/musashino/globalTimetable.json', 'utf8'));
const trip = d.find(t => t.stops[0].stationId === 'JM-35' && t.stops[0].departureTime.startsWith('10:50'));
console.log('Trip found:', trip ? trip.tripId : 'none');
if (trip) {
  const last = trip.stops[trip.stops.length - 1];
  console.log('First stop:', trip.stops[0]);
  console.log('Last stop:', last);
}
