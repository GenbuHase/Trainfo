const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/overpass_tojo_raw.json', 'utf8'));
const w1 = raw.elements.find(e => e.id === 355535148);
console.log('Way 355535148 nodes:');
w1.geometry.forEach((pt, i) => {
  console.log(`  pt[${i}]: lat=${pt.lat}, lon=${pt.lon}`);
});
