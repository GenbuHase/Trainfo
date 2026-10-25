const fs = require('fs');
const path = require('path');

const query = `
[out:json][timeout:60];
(
  node["railway"~"station|halt"]["name"~"かみのやま温泉|井川さくら|井川|富根|大館"](37.7,139.9,41.0,141.0);
);
out body;
`.trim();

async function main() {
  const endpoints = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
  ];
  let res = null;
  for (const endpoint of endpoints) {
    console.log('try', endpoint);
    try {
      res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'User-Agent': 'Trainfo route expansion',
    },
    body: 'data=' + encodeURIComponent(query),
  });
    } catch (err) {
      console.error(endpoint, err.message);
      res = null;
      continue;
    }
    if (res.ok) break;
    console.error(endpoint, res.status, (await res.text()).slice(0, 160));
    res = null;
  }
  if (!res) process.exit(1);
  const json = await res.json();
  for (const n of json.elements || []) {
    console.log(`${n.id}\t${n.tags?.name}\t${n.lat}\t${n.lon}\t${n.tags?.operator || ''}`);
  }
  fs.writeFileSync(path.resolve(__dirname, 'cache/osm_ou_missing_stops.json'), JSON.stringify(json));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
