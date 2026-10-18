const fs = require('fs');
const path = require('path');

const LINE_RELATIONS = {
  tobu_skytree: [5392090],
  tobu_isesaki: [11703931],
  tobu_kameido: [5219681],
  tobu_daishi: [5219659],
  tobu_sano: [1949291],
  tobu_koizumi: [1949385, 11801904],
  tobu_kiryu: [1949386],
  tobu_nikko: [1872553],
  tobu_utsunomiya: [1949384],
  tobu_kinugawa: [5485482],
  tobu_urban_park: [14309204],
  yagan: [5751783],
  aizu: [1924550],
};

const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://lz4.overpass-api.de/api/interpreter',
  'https://z.overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(query, name) {
  for (let attempt = 0; attempt < ENDPOINTS.length * 2; attempt++) {
    const ep = ENDPOINTS[attempt % ENDPOINTS.length];
    console.log(`[${name}] Trying ${ep}...`);
    try {
      const res = await fetch(ep, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Trainfo/1.0',
        },
        body: 'data=' + encodeURIComponent(query)
      });
      if (res.ok) {
        const text = await res.text();
        const data = JSON.parse(text);
        if (data.elements && data.elements.length > 0) {
          console.log(`[${name}] ✅ Success! Elements: ${data.elements.length}`);
          return text;
        }
      }
      console.warn(`[${name}] HTTP ${res.status} from ${ep}`);
    } catch (e) {
      console.warn(`[${name}] Error from ${ep}:`, e.message);
    }
    await sleep(2000);
  }
  throw new Error(`Failed to fetch OSM data for ${name}`);
}

async function run() {
  for (const [lineId, relIds] of Object.entries(LINE_RELATIONS)) {
    const outPath = path.resolve(__dirname, `cache/osm_${lineId}.json`);
    if (fs.existsSync(outPath)) {
      console.log(`[${lineId}] Cache already exists at ${outPath}, skipping.`);
      continue;
    }

    console.log(`\n=== Fetching OSM for ${lineId} (relations: ${relIds.join(',')}) ===`);
    const query = `[out:json][timeout:60];
(
  relation(id:${relIds.join(',')});
);
(._;>>;);
out body;
`;
    const text = await fetchWithRetry(query, lineId);
    fs.writeFileSync(outPath, text, 'utf8');
    console.log(`Saved ${lineId} to ${outPath}`);
    await sleep(1500);
  }
  console.log('\n🎉 All line OSM files fetched successfully!');
}

run().catch(console.error);
