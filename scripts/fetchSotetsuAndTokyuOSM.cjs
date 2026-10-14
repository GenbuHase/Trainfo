const fs = require('fs');
const path = require('path');

async function fetchOSM() {
  const query = `[out:json][timeout:120];
(
  relation(14681765);
  relation(14681766);
  relation(14681763);
  relation(14681764);
  relation(10358686);
  relation(10358687);
  relation(1968180);
  relation(9561172);
  relation(8449597);
  relation(16196887);
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

  if (!json) throw new Error('All endpoints failed');

  const cacheDir = path.resolve(__dirname, 'cache');
  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
  const outPath = path.join(cacheDir, 'osm_sotetsu_tokyu_raw.json');
  fs.writeFileSync(outPath, JSON.stringify(json), 'utf8');
  console.log(`Saved ${(fs.statSync(outPath).size / 1024 / 1024).toFixed(2)} MB to ${outPath}`);
}

fetchOSM().catch(console.error);
