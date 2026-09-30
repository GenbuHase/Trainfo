const fs = require('fs');

// timeStringToSeconds のテスト
function timeStringToSeconds(t) {
  const [h, m, s] = t.split(':').map(Number);
  const normalizedHour = h < 4 ? h + 24 : h;
  return normalizedHour * 3600 + m * 60 + (s || 0);
}

function secondsToTimeString(sec) {
  const norm = (Math.floor(sec) + 86400 * 2) % 86400;
  const h = Math.floor(norm / 3600).toString().padStart(2, '0');
  const m = Math.floor((norm % 3600) / 60).toString().padStart(2, '0');
  const s = (norm % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

console.log('04:30:00 ->', timeStringToSeconds('04:30:00')); // 16200
console.log('23:50:00 ->', timeStringToSeconds('23:50:00')); // 85800
console.log('00:15:00 ->', timeStringToSeconds('00:15:00')); // 87300 (24:15)
console.log('01:06:45 ->', timeStringToSeconds('01:06:45')); // 90405 (25:06)

console.log('87300 to timeString ->', secondsToTimeString(87300)); // 00:15:00

// globalTimetable 内の 00時台始発便（例: WD_OUT_TJ-01_0002_3235レ）の判定テスト
const globalTimetable = JSON.parse(fs.readFileSync('src/data/globalTimetable.json', 'utf8'));
const trip0002 = globalTimetable.find(t => t.tripId.includes('0002'));
if (trip0002) {
  const startSec = timeStringToSeconds(trip0002.stops[0].departureTime);
  const endSec = timeStringToSeconds(trip0002.stops[trip0002.stops.length - 1].arrivalTime);
  console.log('\nTrip 0002 (3235レ):');
  console.log(`  stops: ${trip0002.stops[0].departureTime} -> ${trip0002.stops[trip0002.stops.length - 1].arrivalTime}`);
  console.log(`  startSec: ${startSec} (24:02), endSec: ${endSec} (25:06)`);
  console.log(`  Duration: ${(endSec - startSec) / 60} mins`);
  
  // 24:10 (87000秒) に走行中と判定されるか？
  const testSec = 87000;
  const isRunning = testSec >= startSec && testSec <= endSec;
  console.log(`  Is running at 24:10 (87000s)? ->`, isRunning);
}

// 23:30発で 00:07着の便（日またぎ便）
const tripCrossDay = globalTimetable.find(t => t.stops[0].departureTime.startsWith('23:') && t.stops[t.stops.length - 1].arrivalTime.startsWith('00:'));
if (tripCrossDay) {
  const startSec = timeStringToSeconds(tripCrossDay.stops[0].departureTime);
  const endSec = timeStringToSeconds(tripCrossDay.stops[tripCrossDay.stops.length - 1].arrivalTime);
  console.log(`\nCross-day trip (${tripCrossDay.tripId}):`);
  console.log(`  stops: ${tripCrossDay.stops[0].departureTime} -> ${tripCrossDay.stops[tripCrossDay.stops.length - 1].arrivalTime}`);
  console.log(`  startSec: ${startSec}, endSec: ${endSec}`);
  console.log(`  Duration: ${(endSec - startSec) / 60} mins`);
  
  // 23:50 (85800秒)
  console.log(`  Is running at 23:50? ->`, 85800 >= startSec && 85800 <= endSec);
  // 00:05 (86700秒)
  console.log(`  Is running at 00:05? ->`, 86700 >= startSec && 86700 <= endSec);
}
