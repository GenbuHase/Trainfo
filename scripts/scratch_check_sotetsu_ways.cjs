const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('scripts/cache/osm_sotetsu_tokyu_raw.json', 'utf8'));

const wayMap = new Map();
for (const e of raw.elements) {
  if (e.type === 'way') wayMap.set(e.id, e);
}

const rel = raw.elements.find(e => e.id === 10358686);
const wayMembers = rel.members.filter(m => m.type === 'way');
console.log('--- Relation 10358686 sequential ways ---');
for (let i = 0; i < wayMembers.length; i++) {
  const w = wayMap.get(wayMembers[i].ref);
  if (!w) {
    console.log(`Way ${wayMembers[i].ref} NOT FOUND`);
    continue;
  }
  const first = w.nodes[0];
  const last = w.nodes[w.nodes.length - 1];
  let connectsWithPrev = false;
  if (i > 0) {
    const prevW = wayMap.get(wayMembers[i - 1].ref);
    if (prevW) {
      const prevFirst = prevW.nodes[0];
      const prevLast = prevW.nodes[prevW.nodes.length - 1];
      connectsWithPrev = (first === prevLast || first === prevFirst || last === prevLast || last === prevFirst);
    }
  }
  console.log(`[${i}] Way ${w.id}: nodes=${w.nodes.length}, first=${first}, last=${last}, connects=${connectsWithPrev || i === 0}`);
}
