const fs = require('fs');

function timeToSec(t) {
  if (!t) return 0;
  const [h, m, s] = t.split(':').map(Number);
  let sec = h * 3600 + m * 60 + (s || 0);
  if (h < 4) sec += 86400;
  return sec;
}

const sobuR = JSON.parse(fs.readFileSync('src/data/lines/sobu_rapid/globalTimetable.json', 'utf8'));
const narita = JSON.parse(fs.readFileSync('src/data/lines/narita/globalTimetable.json', 'utf8'));

const targets = ['2003M', '2007M', '2039M', '2043M'];

targets.forEach(trainNum => {
  const nrt = narita.find(t => t.trainNumber === trainNum && !t.isHoliday && t.direction === 'outbound');
  const sr = sobuR.find(t => t.trainNumber === trainNum && !t.isHoliday && t.direction === 'outbound');
  console.log(`\n=== ${trainNum} ===`);
  const chibaStop = sr?.stops?.find(s => s.stationId === 'JO-28');
  const nr36Stop = nrt?.stops?.find(s => s.stationId === 'NR-36');
  console.log('sobu_rapid tripId:', sr?.tripId, 'chiba stop:', chibaStop);
  console.log('narita tripId:', nrt?.tripId, 'nr36 stop:', nr36Stop);
  const chibaDepSec = chibaStop ? timeToSec(chibaStop.departureTime || chibaStop.arrivalTime) : 0;
  const nr36ArrSec = nr36Stop ? timeToSec(nr36Stop.arrivalTime) : 0;
  console.log(`chibaDep: ${chibaStop?.departureTime || chibaStop?.arrivalTime} (${chibaDepSec}), nr36Arr: ${nr36Stop?.arrivalTime} (${nr36ArrSec})`);
  console.log(`chibaDepSec + 840 = ${chibaDepSec + 840}, nr36ArrSec = ${nr36ArrSec}, diff = ${nr36ArrSec - (chibaDepSec + 840)}`);
});
