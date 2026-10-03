const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/osm_musashino_raw.json', 'utf8'));

const relations = raw.elements.filter(e => e.type === 'relation');
console.log('--- Relations Summary ---');
relations.forEach(r => {
  console.log(`Relation ID: ${r.id}, Name: ${r.tags.name}`);
  const ways = r.members.filter(m => m.type === 'way');
  console.log(`  Members: total ${r.members.length}, ways ${ways.length}`);
});
