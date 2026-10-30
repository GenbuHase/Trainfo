const fs = require('fs');
const cm = JSON.parse(fs.readFileSync('src/data/lines/chuo_main/globalTimetable.json', 'utf8'));
const alpes = cm.find(t => t.tripId.includes('42781'));
console.log('Alpes trip:', alpes.tripId, alpes.trainName, alpes.trainNumber);
alpes.stops.forEach(s => console.log(s.stationId, s.arrivalTime, s.departureTime, s.isPassing));
