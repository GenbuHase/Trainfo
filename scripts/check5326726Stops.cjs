const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('scripts/osm_musashino_raw.json', 'utf8'));

const r = raw.elements.find(e => e.id === 5326726); // 東京 -> 蘇我
const stops = r.members.filter(m => m.role === 'stop');
console.log('Relation 5326726 stops count:', stops.length);
stops.forEach((s, i) => {
  const node = raw.elements.find(e => e.id === s.ref);
  if (node) {
    console.log(i, node.tags && node.tags.name, node.lat, node.lon);
  }
});
