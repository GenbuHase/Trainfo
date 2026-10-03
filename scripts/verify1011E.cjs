const fs = require('fs');

const d = JSON.parse(fs.readFileSync('src/data/lines/musashino/globalTimetable.json', 'utf8'));

const trip = d.find(t => t.trainNumber === '1011E' && !t.isHoliday);
console.log('Trip 1011E:', trip ? trip.tripId : 'Not found');
if (trip) {
  console.log(`Train: ${trip.trainNumber}, Dest: ${trip.customDestination}`);
  console.log(`Stops count: ${trip.stops.length}`);
  trip.stops.forEach(s => {
    console.log(`  ${s.stationId}: arr=${s.arrivalTime}, dep=${s.departureTime}`);
  });
}
