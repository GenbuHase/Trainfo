const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/overpass_tojo_raw.json', 'utf8'));
const ways = raw.elements.filter(e => e.type === 'way');

// [36.106, 139.234] から [36.12, 139.19] 付近のwayをすべてリスト
const endWays = ways.filter(w => {
  return (w.geometry || []).some(pt => pt.lat >= 36.10 && pt.lat <= 36.13 && pt.lon >= 139.18 && pt.lon <= 139.24);
});

console.log('Ways near Yorii section:', endWays.length);
endWays.forEach(w => {
  console.log(`Way ${w.id}: tags: ${JSON.stringify(w.tags)}, first: [${w.geometry[0].lat}, ${w.geometry[0].lon}], last: [${w.geometry[w.geometry.length-1].lat}, ${w.geometry[w.geometry.length-1].lon}]`);
});
