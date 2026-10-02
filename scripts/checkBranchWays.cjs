const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/osm_musashino_branches.json', 'utf8'));

console.log('Total branch elements:', raw.elements.length);

const ways = raw.elements.filter(e => e.type === 'way');
console.log('Total branch ways:', ways.length);

const names = new Set();
ways.forEach(w => {
  if (w.tags && w.tags.name) names.add(w.tags.name);
});

console.log('Way names in branches:', Array.from(names));
