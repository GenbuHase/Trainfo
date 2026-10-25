const fs = require('fs');
const path = require('path');

const query = `
[out:json][timeout:120];
(
  relation["type"="route"]["name"~"奥羽"];
  relation["type"="route"]["name:ja"~"奥羽"];
  relation["type"="route"]["name:en"~"Ou Main"];
  relation["route"~"train|railway|tracks"]["wikipedia"~"奥羽本線"];
  relation["route"~"train|railway|tracks"]["wikidata"="Q900429"];
);
out tags;
`.trim();

async function main() {
  const endpoints = [
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass-api.de/api/interpreter',
  ];
  let res = null;
  let lastText = '';
  for (const endpoint of endpoints) {
    console.log('try', endpoint);
    res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'User-Agent': 'Trainfo route expansion',
    },
    body: 'data=' + encodeURIComponent(query),
  });
    if (res.ok) break;
    lastText = await res.text();
    console.error(endpoint, res.status, lastText.slice(0, 180));
    res = null;
  }
  if (!res) throw new Error(lastText.slice(0, 400));
  const json = await res.json();
  const rels = json.elements || [];
  console.log(`relations=${rels.length}`);
  for (const r of rels) {
    const t = r.tags || {};
    console.log(`${r.id}\t${t.route}\t${t.name}\t${t.from || ''}=>${t.to || ''}\t${t.gauge || ''}\t${t.wikipedia || ''}`);
  }
  fs.writeFileSync(path.resolve(__dirname, 'cache/osm_ou_relations.json'), JSON.stringify(json));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
