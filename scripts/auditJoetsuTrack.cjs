const fs = require('fs');

function getDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const trackFile = fs.readFileSync('src/data/lines/joetsu_shinkansen/trackGeometry.ts', 'utf8');
const eqIdx = trackFile.indexOf('=');
const semiIdx = trackFile.lastIndexOf(';');
const jsonStr = trackFile.slice(eqIdx + 1, semiIdx).trim();
const segments = JSON.parse(jsonStr);

console.log(`Auditing ${segments.length} segments for Joetsu Shinkansen...`);
let totalPoints = 0;
let maxJump = 0;
let jumpLocation = '';

for (const seg of segments) {
  totalPoints += seg.coordinates.length;
  for (let i = 0; i < seg.coordinates.length - 1; i++) {
    const p1 = seg.coordinates[i];
    const p2 = seg.coordinates[i + 1];
    const d = getDistanceMeters(p1[0], p1[1], p2[0], p2[1]);
    if (d > maxJump) {
      maxJump = d;
      jumpLocation = `${seg.fromStationId} (${seg.fromName}) -> ${seg.toStationId} (${seg.toName}) (index ${i})`;
    }
    if (d > 300) {
      console.warn(`WARNING: Large jump ${d.toFixed(1)}m in ${seg.fromStationId} -> ${seg.toStationId} at index ${i}`);
    }
  }
}

console.log(`Total points across all segments: ${totalPoints}`);
console.log(`Maximum step distance: ${maxJump.toFixed(1)}m at ${jumpLocation}`);
if (maxJump <= 150) {
  console.log('✅ ALL SEGMENTS PASSED DISTANCE AUDIT (all steps <= 150m)!');
} else {
  console.log(`Audit result: max step is ${maxJump.toFixed(1)}m`);
}
