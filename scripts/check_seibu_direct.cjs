const fs = require('fs');
const seibuTrips = JSON.parse(fs.readFileSync('src/data/lines/seibu_ikebukuro/globalTimetable.json', 'utf8'));

const directUp = seibuTrips.filter(t => t.trainId && t.trainId.startsWith('1451'));
console.log('Seibu direct trips count:', directUp.length);
for (const t of directUp) {
  console.log({
    id: t.tripId,
    trainId: t.trainId,
    trainNumber: t.trainNumber,
    dir: t.direction,
    orig: t.originStationId,
    dest: t.destinationStationId,
    customOrigin: t.customOrigin,
    customDestination: t.customDestination,
    firstStop: `${t.stops[0].stationId}(${t.stops[0].departureTime})`,
    lastStop: `${t.stops[t.stops.length-1].stationId}(${t.stops[t.stops.length-1].arrivalTime})`,
  });
}
