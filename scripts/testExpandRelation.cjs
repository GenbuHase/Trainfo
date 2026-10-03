const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/osm_musashino_raw.json', 'utf8'));

const nodeMap = new Map();
raw.elements.filter(e => e.type === 'node').forEach(n => {
  nodeMap.set(n.id, [n.lat, n.lon]);
});

const wayMap = new Map();
raw.elements.filter(e => e.type === 'way').forEach(w => {
  if (w.nodes) {
    const coords = w.nodes.map(id => nodeMap.get(id)).filter(Boolean);
    wayMap.set(w.id, coords);
  }
});

[9486466, 14656632, 5326726].forEach(relId => {
  const r = raw.elements.find(e => e.id === relId);
  const ways = r.members.filter(m => m.type === 'way');
  const res = ways.filter(m => wayMap.has(m.ref)).length;
  console.log('Rel', relId, r.tags.name, 'Ways:', ways.length, 'Resolved:', res);
});
