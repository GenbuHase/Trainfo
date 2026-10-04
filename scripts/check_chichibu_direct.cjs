const fs = require('fs');
const chichibuTrips = JSON.parse(fs.readFileSync('src/data/lines/chichibu/globalTimetable.json', 'utf8'));

const trip145186 = chichibuTrips.find(t => t.trainId === '145186');
console.log('145186 in Chichibu:', trip145186);

// 14518* のすべてのトリップ
const directTrips = chichibuTrips.filter(t => t.trainId && t.trainId.startsWith('1451'));
console.log('Direct trips in Chichibu count:', directTrips.length);
for (const t of directTrips) {
  console.log({
    id: t.tripId,
    trainId: t.trainId,
    trainNumber: t.trainNumber,
    orig: t.originStationId,
    dest: t.destinationStationId,
    isHoliday: t.isHoliday,
    stops: t.stops.map(s => `${s.stationId}(${s.departureTime || s.arrivalTime})`).join(' -> '),
  });
}
