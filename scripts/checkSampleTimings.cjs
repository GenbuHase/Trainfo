const fs = require('fs');

const d = JSON.parse(fs.readFileSync('src/data/lines/musashino/globalTimetable.json', 'utf8'));

console.log('--- Sample Trips Timing Check ---');

// 1. 東京行きサンプル
const tokyoTrip = d.find(t => t.customDestination === '東京' && !t.isHoliday && t.stops.length > 20);
if (tokyoTrip) {
  console.log(`Tokyo Trip: ${tokyoTrip.trainNumber}`);
  const first = tokyoTrip.stops[0];
  const nishi = tokyoTrip.stops.find(s => s.stationId === 'JM-10');
  const last = tokyoTrip.stops[tokyoTrip.stops.length - 1];
  console.log(`  First (${first.stationId}): dep=${first.departureTime}`);
  if (nishi) console.log(`  Nishi-Funabashi (${nishi.stationId}): arr=${nishi.arrivalTime}, dep=${nishi.departureTime}`);
  console.log(`  Tokyo (${last.stationId}): arr=${last.arrivalTime}`);
}

// 2. むさしの号サンプル
const musashinoTrip = d.find(t => t.customDestination === '大宮' && t.trainType === 'regular' && !t.isHoliday);
if (musashinoTrip) {
  console.log(`Musashino-go: ${musashinoTrip.trainNumber}`);
  const first = musashinoTrip.stops[0];
  const asaka = musashinoTrip.stops.find(s => s.stationId === 'JM-28');
  const last = musashinoTrip.stops[musashinoTrip.stops.length - 1];
  console.log(`  Hachioji (${first.stationId}): dep=${first.departureTime}`);
  if (asaka) console.log(`  Kita-Asaka (${asaka.stationId}): arr=${asaka.arrivalTime}, dep=${asaka.departureTime}`);
  console.log(`  Omiya (${last.stationId}): arr=${last.arrivalTime}`);
}

// 3. しもうさ号サンプル
const shimousaTrip = d.find(t => t.customDestination === '海浜幕張' && t.trainType === 'regular' && !t.isHoliday);
if (shimousaTrip) {
  console.log(`Shimousa-go: ${shimousaTrip.trainNumber}`);
  const first = shimousaTrip.stops[0];
  const mu = shimousaTrip.stops.find(s => s.stationId === 'JM-26');
  const last = shimousaTrip.stops[shimousaTrip.stops.length - 1];
  console.log(`  Omiya (${first.stationId}): dep=${first.departureTime}`);
  if (mu) console.log(`  Musashi-Urawa (${mu.stationId}): arr=${mu.arrivalTime}, dep=${mu.departureTime}`);
  console.log(`  Kaihin-Makuhari (${last.stationId}): arr=${last.arrivalTime}`);
}
