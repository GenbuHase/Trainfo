const fs = require('fs');

const saikyoPath = 'src/data/lines/saikyo/globalTimetable.json';
const saikyo = JSON.parse(fs.readFileSync(saikyoPath, 'utf8'));

const t39355 = saikyo.find(t => t.tripId === 'HD_INB_JA-11_0658_39355');
if (t39355) {
  const ja11 = t39355.stops.find(s => s.stationId === 'JA-11');
  if (ja11) {
    console.log('Fixing 39355 JA-11 departureTime:', ja11.departureTime, '-> 06:58:00');
    ja11.departureTime = '06:58:00';
    ja11.arrivalTime = '06:58:00';
  }
}

const t39356 = saikyo.find(t => t.tripId === 'HD_INB_JA-11_0725_39356');
if (t39356) {
  const ja11 = t39356.stops.find(s => s.stationId === 'JA-11');
  if (ja11) {
    console.log('Fixing 39356 JA-11 departureTime:', ja11.departureTime, '-> 07:25:00');
    ja11.departureTime = '07:25:00';
    ja11.arrivalTime = '07:25:00';
  }
}

fs.writeFileSync(saikyoPath, JSON.stringify(saikyo, null, 2), 'utf8');
console.log('Successfully repaired saikyo 39355 and 39356 trips!');
