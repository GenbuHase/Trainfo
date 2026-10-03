const fs = require('fs');
const raw1 = JSON.parse(fs.readFileSync('scripts/osm_musashino_raw.json', 'utf8'));
const raw2 = JSON.parse(fs.readFileSync('scripts/osm_musashino_branches.json', 'utf8'));

const allElements = [...raw1.elements, ...raw2.elements];
const kokuritsuWays = allElements.filter(e => e.tags && (
  (e.tags.name && e.tags.name.includes('国立')) ||
  (e.tags.description && e.tags.description.includes('国立'))
));

console.log('Kokuritsu ways found:', kokuritsuWays.length);
kokuritsuWays.forEach(w => console.log(w.id, w.tags));
