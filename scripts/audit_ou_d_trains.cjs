const fs = require('fs');
function load(id) {
  return JSON.parse(fs.readFileSync(`src/data/lines/${id}/globalTimetable.json`, 'utf8'));
}
for (const id of ['ou_fukushima_shinjo', 'ou_omagari_akita']) {
  const trips = load(id).filter(t => /D$/.test(t.trainNumber));
  console.log(`\n${id} D=${trips.length}`);
  const groups = new Map();
  for (const t of trips) {
    const key = `${t.trainNumber} ${t.trainName || t.trainType} ${t.originStationId}->${t.destinationStationId} ${t.customOrigin || ''}->${t.customDestination || ''}`;
    groups.set(key, (groups.get(key) || 0) + 1);
  }
  for (const [k, v] of [...groups.entries()].slice(0, 30)) console.log(`  ${v} ${k}`);
}

const trips = load('ou_fukushima_shinjo');
const osawa = trips.filter(t => t.stops.some(s => s.stationId === 'OFS-06' && !s.isPassing));
console.log(`\nOsawa passenger stops in trips: ${osawa.length}`);
const s2 = load('ou_shinjo_omagari');
for (const no of ['2428D', '2461D']) {
  const hits = s2.filter(t => t.trainNumber === no);
  console.log(no, 'on shinjo-omagari', hits.map(t => `${t.originStationId}->${t.destinationStationId} ${t.customDestination || ''}`).join(' | ') || 'none');
}
