const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/overpass_tojo_raw.json', 'utf8'));
const ways = raw.elements.filter(e => e.type === 'way');

// 新河岸付近 (lat: 35.88〜35.90, lon: 139.50〜139.52) のwayをすべてリスト
const shingashiWays = ways.filter(w => {
  return (w.geometry || []).some(pt => pt.lat >= 35.88 && pt.lat <= 35.90 && pt.lon >= 139.50 && pt.lon <= 139.52);
});

console.log('Ways around Shingashi station:', shingashiWays.length);
shingashiWays.forEach(w => {
  console.log(`Way id: ${w.id}, tags:`, JSON.stringify(w.tags), `Points: ${w.geometry.length}, first: [${w.geometry[0].lat}, ${w.geometry[0].lon}], last: [${w.geometry[w.geometry.length-1].lat}, ${w.geometry[w.geometry.length-1].lon}]`);
});
