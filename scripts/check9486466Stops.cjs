const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('scripts/osm_musashino_raw.json', 'utf8'));

const r = raw.elements.find(e => e.id === 9486466); // 府中本町 -> 南船橋
const stops = r.members.filter(m => m.role === 'stop');
console.log('Relation 9486466 stops count:', stops.length);
stops.forEach((s, i) => {
  const node = raw.elements.find(e => e.id === s.ref);
  if (node) {
    console.log(i, node.lat, node.lon);
  }
});
