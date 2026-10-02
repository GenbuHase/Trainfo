const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('scripts/osm_musashino_raw.json', 'utf8'));

const r = raw.elements.find(e => e.id === 14656632); // 府中本町 -> 東京
const stops = r.members.filter(m => m.role === 'stop' || m.role === 'platform');
console.log('Relation 14656632 stops count:', stops.length);
stops.forEach(s => {
  const node = raw.elements.find(e => e.id === s.ref);
  if (node) {
    console.log(s.role, node.tags && node.tags.name, node.lat, node.lon);
  }
});
