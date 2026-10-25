const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('src/data/lines/ou_fukushima_shinjo/globalTimetable.json', 'utf8'));
const split = trips.filter(t => /_s\d+$/.test(t.tripId));
console.log('split trips', split.length, 'of', trips.length);
const byTrain = new Map();
for (const t of split) {
  const key = `${t.isHoliday ? 'H' : 'W'}_${t.trainId}`;
  if (!byTrain.has(key)) byTrain.set(key, []);
  byTrain.get(key).push(`${t.originStationId}->${t.destinationStationId} ${t.customOrigin || ''}->${t.customDestination || ''}`);
}
let shown = 0;
for (const [k, v] of byTrain) {
  if (shown++ > 12) break;
  console.log(k, v.join(' | '));
}
const osawa = trips.filter(t => t.stops.some(s => s.stationId === 'OFS-06'));
const pass = osawa.filter(t => t.stops.find(s => s.stationId === 'OFS-06').isPassing);
console.log('trips via Osawa', osawa.length, 'passing', pass.length);
