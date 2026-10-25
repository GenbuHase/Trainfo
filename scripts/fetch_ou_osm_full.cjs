const fs = require('fs');
const path = require('path');

const query = `
[out:json][timeout:240];
relation(1948975);
out body;
>;
out skel qt;
`.trim();

async function main() {
  const endpoints = [
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass-api.de/api/interpreter',
  ];
  let lastText = '';
  for (const endpoint of endpoints) {
    console.log('try', endpoint);
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'User-Agent': 'Trainfo route expansion',
      },
      body: 'data=' + encodeURIComponent(query),
    });
    if (!res.ok) {
      lastText = await res.text();
      console.error(endpoint, res.status, lastText.slice(0, 200));
      continue;
    }
    const json = await res.json();
    const out = path.resolve(__dirname, 'cache/osm_ou_full.json');
    fs.writeFileSync(out, JSON.stringify(json));
    const rels = (json.elements || []).filter(e => e.type === 'relation');
    const ways = (json.elements || []).filter(e => e.type === 'way');
    const nodes = (json.elements || []).filter(e => e.type === 'node');
    const stops = nodes.filter(n => n.tags && (n.tags.railway === 'station' || n.tags.railway === 'halt' || n.tags.public_transport === 'stop_position'));
    console.log(`saved ${out} bytes=${fs.statSync(out).size} rels=${rels.length} ways=${ways.length} nodes=${nodes.length} taggedStops=${stops.length}`);
    const rel = rels[0];
    const roles = {};
    for (const m of rel?.members || []) {
      roles[m.type + ':' + (m.role || '(none)')] = (roles[m.type + ':' + (m.role || '(none)')] || 0) + 1;
    }
    console.log('member roles', roles);
    return;
  }
  throw new Error(lastText.slice(0, 400));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
