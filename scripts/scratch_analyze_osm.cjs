const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync('scripts/cache/osm_sotetsu_tokyu_raw.json', 'utf8'));
console.log(`Total elements: ${raw.elements.length}`);

const relations = raw.elements.filter(e => e.type === 'relation');
console.log(`Relations (${relations.length}):`);
relations.forEach(r => {
  console.log(`- ID: ${r.id}, Name: ${r.tags?.name}, From: ${r.tags?.from}, To: ${r.tags?.to}, Members: ${r.members?.length}`);
});

const nodes = raw.elements.filter(e => e.type === 'node');
const stationNodes = nodes.filter(n => n.tags && (n.tags.railway === 'station' || n.tags.railway === 'stop'));
console.log(`\nStation nodes (${stationNodes.length}):`);
stationNodes.forEach(n => {
  console.log(`- Node ${n.id}: ${n.tags.name} (${n.lat}, ${n.lon})`);
});
