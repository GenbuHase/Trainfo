const fs = require('fs');
const path = require('path');

async function fetchOdakyuOSM() {
  const query = `
[out:json][timeout:180];
(
  relation(9483158);
  relation(9483255);
  relation(14489075);
  relation(14496200);
  relation(9504629);
  relation(1942962);
  way["railway"="rail"]["operator"~"小田急|Odakyu"](35.2,139.0,35.8,139.8);
  way["railway"="rail"]["name"~"小田急|小田原線|江ノ島線|多摩線"](35.2,139.0,35.8,139.8);
);
(._;>>;);
out body;
`;

  console.log('Fetching Overpass API for Odakyu relations...');
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
        console.log(`Success with ${ep}! Elements: ${json.elements.length}`);
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

  const outPath = path.resolve(__dirname, 'cache/osm_odakyu_raw.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(json), 'utf8');
  console.log(`Saved to ${outPath} (${(fs.statSync(outPath).size / 1024 / 1024).toFixed(2)} MB)`);
}

fetchOdakyuOSM().catch(console.error);
