const fs = require('fs');

const sotetsu = JSON.parse(fs.readFileSync('src/data/lines/sotetsu_jr_direct/globalTimetable.json', 'utf8'));
const t = sotetsu.find(x => x.tripId.includes('39198'));
console.log('sotetsu 39198:');
console.log(t?.tripId, t?.trainNumber, t?.originStationId, t?.destinationStationId);
t?.stops?.slice(-5).forEach(s => console.log(' ', s.stationId, s.arrivalTime, s.departureTime, s.isPassing));
