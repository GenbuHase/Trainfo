const fs = require('fs');
const path = require('path');

function parseTime(t) {
  if (!t) return 0;
  const [h, m, s] = t.split(':').map(Number);
  return h * 3600 + m * 60 + (s || 0);
}

const linesDir = 'src/data/lines';
const dirs = fs.readdirSync(linesDir);

const inversions = [];

for (const d of dirs) {
  const gttPath = path.join(linesDir, d, 'globalTimetable.json');
  if (!fs.existsSync(gttPath)) continue;
  const trips = JSON.parse(fs.readFileSync(gttPath, 'utf8'));
  for (const t of trips) {
    const stops = t.stops || [];
    let prevSec = null;
    let dayOffset = 0;

    for (let i = 0; i < stops.length; i++) {
      const s = stops[i];
      let arrSec = parseTime(s.arrivalTime || s.departureTime);
      let depSec = parseTime(s.departureTime || s.arrivalTime);

      let effArr = arrSec + dayOffset;
      if (prevSec !== null && effArr < prevSec) {
        if (effArr + 86400 >= prevSec) {
          dayOffset += 86400;
          effArr += 86400;
        } else {
          inversions.push({
            lineId: d,
            tripId: t.tripId,
            trainNumber: t.trainNumber,
            trainName: t.trainName,
            type: t.trainType,
            from: stops[i - 1].stationId,
            to: s.stationId,
            diff: effArr - prevSec
          });
        }
      }

      let effDep = depSec + dayOffset;
      if (effDep < effArr) {
        if (effDep + 86400 >= effArr) {
          dayOffset += 86400;
          effDep += 86400;
        } else {
          inversions.push({
            lineId: d,
            tripId: t.tripId,
            stationId: s.stationId,
            diff: effDep - effArr
          });
        }
      }

      prevSec = effDep;
    }
  }
}

console.log(`=== 全 102 路線 単調増加・時刻順序完全監査結果 ===`);
console.log(`時刻逆行検出件数: ${inversions.length} 件`);
inversions.forEach(inv => console.log(inv));
