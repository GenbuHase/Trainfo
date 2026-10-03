const fs = require('fs');
const path = require('path');

async function fetchOSM() {
  const query = `
[out:json][timeout:90];
(
  relation["route"="train"]["name"~"八高線"];
);
out body;
>;
out skel qt;
`;

  console.log('Fetching Overpass API for Hachiko line relations...');
  const endpoints = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://lz4.overpass-api.de/api/interpreter',
  ];

  let json = null;
  for (const ep of endpoints) {
    try {
      console.log(`Trying ${ep}...`);
      const res = await fetch(`${ep}?data=${encodeURIComponent(query)}`, {
        headers: {
          'User-Agent': 'Trainfo/1.0 (https://github.com/GenbuHase/Trainfo)',
        }
      });
      if (res.ok) {
        json = await res.json();
        console.log(`Success with ${ep}!`);
        break;
      } else {
        console.warn(`Failed with ${ep}: ${res.status} ${res.statusText}`);
      }
    } catch (e) {
      console.warn(`Error with ${ep}:`, e.message);
    }
  }

  if (!json) {
    throw new Error('All Overpass endpoints failed');
  }

  console.log(`Fetched elements: ${json.elements.length}`);
  const outPath = path.resolve(__dirname, 'cache/osm_hachiko_rel.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Saved to ${outPath}`);

  // リレーションの確認
  for (const e of json.elements) {
    if (e.type === 'relation') {
      console.log(`Relation ${e.id}: name="${e.tags?.name}", from="${e.tags?.from}", to="${e.tags?.to}", members=${e.members?.length}`);
    }
  }
}

fetchOSM().catch(err => {
  console.error('Error fetching OSM:', err);
  process.exit(1);
});
