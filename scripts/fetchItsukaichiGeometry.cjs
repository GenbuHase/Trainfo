const fs = require('fs');

async function main() {
  console.log('Querying Overpass API for JR Itsukaichi Line...');

  // Bounding box for Itsukaichi line: 拝島 (35.72, 139.34) 〜 武蔵五日市 (35.73, 139.22)
  const query = `
    [out:json][timeout:30];
    relation["route"="train"]["name"~"五日市線"];
    (._;>>;);
    out body;
  `;

  const endpoints = [
    'https://lz4.overpass-api.de/api/interpreter',
    'https://z.overpass-api.de/api/interpreter',
    'https://overpass.private.coffee/api/interpreter',
    'https://overpass-api.de/api/interpreter',
  ];

  let data = null;
  for (const endpoint of endpoints) {
    try {
      console.log(`Trying ${endpoint}...`);
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 15000);
      const res = await fetch(endpoint + '?data=' + encodeURIComponent(query), {
        headers: { 'User-Agent': 'TrainfoApp/1.0' },
        signal: controller.signal
      });
      clearTimeout(timer);
      if (res.ok) {
        data = await res.json();
        console.log(`Success with ${endpoint}! Received ${data.elements?.length} elements.`);
        break;
      } else {
        console.log(`HTTP ${res.status} from ${endpoint}`);
      }
    } catch (e) {
      console.warn(`Failed with ${endpoint}:`, e.message);
    }
  }

  if (!data) {
    throw new Error('All Overpass endpoints failed');
  }
  console.log(`Received ${data.elements ? data.elements.length : 0} elements from Overpass.`);
  fs.writeFileSync('scripts/cache/osm_itsukaichi_raw.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('Saved to scripts/cache/osm_itsukaichi_raw.json');
}

main().catch(err => console.error(err));
