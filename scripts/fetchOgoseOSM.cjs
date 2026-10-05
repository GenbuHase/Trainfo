const fs = require('fs');
const path = require('path');

async function fetchOSM() {
  const query = `
[out:json][timeout:90];
(
  relation["route"="train"]["name"~"越生線"];
  relation["route"="railway"]["name"~"越生線"];
  way["railway"="rail"]["name"~"越生線"];
  node["railway"="station"]["name"~"一本松|西大家|川角|武州長瀬|東毛呂|武州唐沢|越生|坂戸"];
);
out body;
>;
out skel qt;
`;

  console.log('Fetching Overpass API for Ogose line relations...');
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
  const outPath = path.resolve(__dirname, 'cache/osm_ogose_raw.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Saved to ${outPath}`);

  const relations = json.elements.filter(e => e.type === 'relation');
  const ways = json.elements.filter(e => e.type === 'way');
  const stations = json.elements.filter(e => e.type === 'node' && e.tags && e.tags.name);
  console.log(`Relations: ${relations.length}, Ways: ${ways.length}, Station nodes: ${stations.length}`);
  relations.forEach(r => {
    console.log(`Relation ID: ${r.id}, tags:`, r.tags);
  });
  stations.forEach(s => {
    console.log(`Station node: ${s.id} ${s.tags.name} (${s.lat}, ${s.lon})`);
  });
}

fetchOSM().catch(console.error);
