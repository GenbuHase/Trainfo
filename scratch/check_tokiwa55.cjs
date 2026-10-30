const fs = require('fs');

const jti = JSON.parse(fs.readFileSync('src/data/lines/joban_toride_iwaki/globalTimetable.json', 'utf8'));
const trip = jti.find(t => t.tripId.includes('7115'));
console.log('=== trip 7115 ===');
console.log(trip.tripId, trip.trainNumber, trip.trainName, trip.direction);
console.log('through:', trip.through, 'prev:', trip.previousTrip);
trip.stops.forEach(s => console.log(s.stationId, s.arrivalTime, s.departureTime, s.isPassing));

// joban_rapid (JR) 側の対応便も確認
const jr = JSON.parse(fs.readFileSync('src/data/lines/joban_rapid/globalTimetable.json', 'utf8'));
const jrTrip = jr.find(t => t.trainNumber === '55M' && !t.isHoliday);
console.log('\n=== joban_rapid 55M ===');
console.log(jrTrip?.tripId, jrTrip?.trainNumber, jrTrip?.trainName);
jrTrip?.stops?.slice(-4).forEach(s => console.log(s.stationId, s.arrivalTime, s.departureTime, s.isPassing));
