const fs = require('fs');
const path = require('path');
const data = require('./cache/osm_ou_full.json');
const rel = data.elements.find(e => e.type === 'relation');
const ids = rel.members.filter(m => m.type === 'node' && m.role === 'stop').map(m => m.ref);

const query = `[out:json][timeout:90];node(id:${ids.join(',')});out body;`;

async function main() {
  const endpoints = [
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass-api.de/api/interpreter',
  ];
  let last = '';
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
      last = await res.text();
      console.error(res.status, last.slice(0, 180));
      continue;
    }
    const json = await res.json();
    const out = path.resolve(__dirname, 'cache/osm_ou_stops.json');
    fs.writeFileSync(out, JSON.stringify(json));
    const nodes = json.elements || [];
    console.log('nodes', nodes.length);
    for (const id of ids) {
      const n = nodes.find(x => x.id === id);
      console.log(`${id}\t${n?.tags?.name || '(none)'}\t${n?.tags?.['name:en'] || ''}\t${n?.tags?.['name:ja_kana'] || n?.tags?.['name:ja-Hira'] || ''}`);
    }
    return;
  }
  throw new Error(last.slice(0, 300));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
