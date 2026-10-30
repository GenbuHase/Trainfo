const fs = require('fs');

const jrPath = 'src/data/lines/joban_rapid/globalTimetable.json';
const jtiPath = 'src/data/lines/joban_toride_iwaki/globalTimetable.json';

const jr = JSON.parse(fs.readFileSync(jrPath, 'utf8'));
const jti = JSON.parse(fs.readFileSync(jtiPath, 'utf8'));

for (const t of jr) {
  if (t.trainNumber === '55M') {
    const s = t.stops.find(x => x.stationId === 'JJ-10');
    if (s && s.isPassing) {
      s.departureTime = s.arrivalTime;
    }
  }
}

for (const t of jti) {
  if (t.trainNumber === '55M') {
    const s = t.stops.find(x => x.stationId === 'JTI-01');
    if (s && s.isPassing) {
      s.departureTime = s.arrivalTime;
    }
  }
}

fs.writeFileSync(jrPath, JSON.stringify(jr, null, 2), 'utf8');
fs.writeFileSync(jtiPath, JSON.stringify(jti, null, 2), 'utf8');
console.log('Reset 55M Toride departure times to arrival time.');
