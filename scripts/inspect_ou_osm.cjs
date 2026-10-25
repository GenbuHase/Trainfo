const data = require('./cache/osm_ou_full.json');
const rel = data.elements.find(e => e.type === 'relation');
const nodeMap = new Map(data.elements.filter(e => e.type === 'node').map(n => [n.id, n]));
const stops = rel.members.filter(m => m.type === 'node' && m.role === 'stop');
console.log('stops', stops.length);
let withName = 0;
let withCoord = 0;
const names = [];
for (const s of stops) {
  const n = nodeMap.get(s.ref);
  if (!n) {
    names.push(`MISSING ${s.ref}`);
    continue;
  }
  if (n.lat) withCoord++;
  if (n.tags?.name) {
    withName++;
    names.push(n.tags.name);
  } else {
    names.push(`(no name) ${s.ref} ${n.lat},${n.lon} tags=${n.tags ? Object.keys(n.tags).join(',') : 'none'}`);
  }
}
console.log('withCoord', withCoord, 'withName', withName);
console.log(names.join('\n'));
