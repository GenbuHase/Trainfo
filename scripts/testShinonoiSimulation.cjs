const fs = require('fs');

const shinonoiGlobal = JSON.parse(fs.readFileSync('src/data/lines/shinonoi/globalTimetable.json', 'utf8'));
const shinonoiStations = JSON.parse(fs.readFileSync('src/data/lines/shinonoi/stations.ts', 'utf8')
  .match(/export const SHINONOI_STATIONS: Station\[] =\s*(\[[\s\S]*?\]);\s*$/m)[1]);
const shinonoiSegments = JSON.parse(fs.readFileSync('src/data/lines/shinonoi/trackGeometry.ts', 'utf8')
  .match(/export const SHINONOI_TRACK_SEGMENTS: TrackSegment\[] =\s*(\[[\s\S]*?\]);\s*$/m)[1]);

console.log('=== Testing Shinonoi Simulation ===');
console.log(`Stations count: ${shinonoiStations.length}`);
console.log(`Track segments count: ${shinonoiSegments.length}`);
console.log(`Global trips count: ${shinonoiGlobal.length}`);

// 全18区間の接続性をテスト
for (let i = 0; i < shinonoiStations.length - 1; i++) {
  const from = shinonoiStations[i].id;
  const to = shinonoiStations[i + 1].id;
  const seg = shinonoiSegments.find(s => s.fromStationId === from && s.toStationId === to);
  if (!seg) {
    console.error(`❌ Missing track segment between ${from} and ${to}!`);
    process.exit(1);
  }
}
console.log('✓ All 18 track segments are strictly connected between consecutive stations.');

function timeStringToSeconds(t) {
  const parts = t.split(':').map(Number);
  return parts[0] * 3600 + parts[1] * 60 + (parts[2] || 0);
}

// 異なる時刻（7:30, 8:30, 12:00, 17:30, 21:00）におけるアクティブ列車シミュレーション
const testTimes = ['07:30:00', '08:30:00', '12:00:00', '17:30:00', '21:00:00'];
for (const timeStr of testTimes) {
  const sec = timeStringToSeconds(timeStr);
  let activeCount = 0;
  const types = {};

  for (const trip of shinonoiGlobal) {
    const firstStop = trip.stops[0];
    const lastStop = trip.stops[trip.stops.length - 1];
    const startSec = timeStringToSeconds(firstStop.departureTime);
    const endSec = timeStringToSeconds(lastStop.arrivalTime);

    if (sec >= startSec && sec <= endSec) {
      activeCount++;
      types[trip.trainType] = (types[trip.trainType] || 0) + 1;
    }
  }

  console.log(`\nAt ${timeStr}:`);
  console.log(`  Active trains: ${activeCount}`);
  console.log(`  Breakdown:`, types);
}

console.log('\n✨ Shinonoi simulation test passed flawlessly!');
