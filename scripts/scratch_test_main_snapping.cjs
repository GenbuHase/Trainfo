const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/cache/osm_sotetsu_tokyu_raw.json', 'utf8'));

const nodeMap = new Map();
const wayMap = new Map();
for (const el of raw.elements) {
  if (el.type === 'node') nodeMap.set(el.id, [el.lat, el.lon]);
  else if (el.type === 'way') wayMap.set(el.id, el);
}

function dist(p1, p2) {
  const dy = (p1[0] - p2[0]) * 111320;
  const dx = (p1[1] - p2[1]) * 111320 * Math.cos((p1[0] * Math.PI) / 180);
  return Math.sqrt(dx * dx + dy * dy);
}

const rel = raw.elements.find(e => e.id === 1968180);
const wayMembers = rel.members.filter(m => m.type === 'way');
console.log('--- Checking Izumino relation 1968180 ways ---');
for (let i = 0; i < wayMembers.length; i++) {
  const w = wayMap.get(wayMembers[i].ref);
  if (!w) continue;
  const first = w.nodes[0];
  const last = w.nodes[w.nodes.length - 1];
  console.log(`[${i}] Way ${w.id}: nodes=${w.nodes.length}, first=${first}, last=${last}, isLoop=${first===last}`);
}


console.log('--- Snapping 18 stations ---');
let lastIdx = 0;
mainStations.forEach(st => {
  let bestIdx = 0;
  let bestDist = Infinity;
  for (let idx = 0; idx < coords.length; idx++) {
    const d = dist(st.coord, coords[idx]);
    if (d < bestDist) {
      bestDist = d;
      bestIdx = idx;
    }
  }
  console.log(`${st.name}: idx=${bestIdx}/${coords.length}, dist=${bestDist.toFixed(1)}m, advance=${bestIdx >= lastIdx}`);
  lastIdx = bestIdx;
});
