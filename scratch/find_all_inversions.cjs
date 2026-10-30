const fs = require('fs');
const path = require('path');

function timeToSec(t) {
  if (!t) return 0;
  const [h, m, s] = t.split(':').map(Number);
  let sec = h * 3600 + m * 60 + (s || 0);
  if (h < 4) sec += 86400;
  return sec;
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
    for (let i = 0; i < stops.length - 1; i++) {
      const s1 = stops[i];
      const s2 = stops[i + 1];
      const t1 = timeToSec(s1.departureTime || s1.arrivalTime);
      const t2 = timeToSec(s2.arrivalTime || s2.departureTime);
      if (t2 < t1) {
        // 翌日またぎでないかチェック (t1 > 23:00 かつ t2 < 04:00 のようなケースはtimeToSecで処理済)
        inversions.push({
          lineId: d,
          tripId: t.tripId,
          trainNumber: t.trainNumber,
          trainName: t.trainName,
          trainType: t.trainType,
          from: s1.stationId,
          fromTime: s1.departureTime || s1.arrivalTime,
          to: s2.stationId,
          toTime: s2.arrivalTime || s2.departureTime,
          diffSec: t2 - t1
        });
      }
    }
  }
}

console.log(`=== 全路線 時刻逆行検出結果: ${inversions.length} 件 ===`);
inversions.forEach(inv => {
  console.log(`[${inv.lineId}] ${inv.tripId} (${inv.trainNumber} / ${inv.trainName || inv.trainType}) : ${inv.from} (${inv.fromTime}) -> ${inv.to} (${inv.toTime}) [diff: ${inv.diffSec}s]`);
});
