// JR奥羽本線の OSM ルートリレーションを取得する
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, 'cache/osm_ou_main.json');

const query = `
[out:json][timeout:240];
relation["route"="train"]["name"~"奥羽本線|山形線"];
out body;
>;
out skel qt;
`.trim();

async function main() {
  const endpoints = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
  ];
  let lastErr = null;
  for (const endpoint of endpoints) {
    try {
      console.log(`Fetching OSM from ${endpoint} ...`);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'User-Agent': 'Trainfo route expansion (educational timetable map)',
          'Accept': 'application/json',
        },
        body: 'data=' + encodeURIComponent(query),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status} ${text.slice(0, 300)}`);
      }
      const json = await res.json();
      fs.writeFileSync(OUT, JSON.stringify(json));
      const rels = (json.elements || []).filter(e => e.type === 'relation');
      const ways = (json.elements || []).filter(e => e.type === 'way');
      const nodes = (json.elements || []).filter(e => e.type === 'node');
      console.log(`Saved ${OUT}`);
      console.log(`relations=${rels.length} ways=${ways.length} nodes=${nodes.length}`);
      for (const r of rels) {
        console.log(`- ${r.id} ${r.tags?.name} members=${(r.members || []).length} ref=${r.tags?.ref || ''} gauge=${r.tags?.gauge || ''}`);
      }
      return;
    } catch (err) {
      lastErr = err;
      console.error(`Failed ${endpoint}: ${err.message}`);
    }
  }
  throw lastErr;
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
