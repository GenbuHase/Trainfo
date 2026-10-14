const fs = require('fs');
const path = require('path');

async function fetchOSM() {
  const query = `[out:json][timeout:180];
(
  relation(10322300);
  relation(4684034);
);
(._;>>;);
out body;
`;

  const endpoints = [
    'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass-api.de/api/interpreter',
  ];

  let json = null;
  for (const ep of endpoints) {
    console.log(`Trying ${ep}...`);
    try {
      const res = await fetch(ep, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Trainfo/1.0',
        },
        body: 'data=' + encodeURIComponent(query),
      });
      if (res.ok) {
        json = await res.json();
        console.log(`Success with ${ep}! Elements: ${json.elements.length}`);
        break;
      } else {
        console.warn(`Failed ${ep}: ${res.status}`);
      }
    } catch (e) {
      console.warn(`Error with ${ep}:`, e.message);
    }
  }

  if (!json) {
    throw new Error('All Overpass endpoints failed');
  }

  const outPath = path.resolve(__dirname, 'cache/osm_sotetsu_jr_raw.json');
  fs.writeFileSync(outPath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`✅ Saved OSM data to ${outPath}`);
}

fetchOSM().catch(console.error);
