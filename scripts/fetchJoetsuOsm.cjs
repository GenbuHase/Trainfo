const fs = require('fs');
const path = require('path');

async function main() {
  console.log('Querying Overpass API for Joetsu Line (relation 1924544)...');

  const query = `
    [out:json][timeout:30];
    relation(1924544);
    (._;>>;);
    out body;
  `;

  const endpoints = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://maps.mail.ru/osm/tools/overpass/api/interpreter'
  ];

  let data = null;
  for (const ep of endpoints) {
    try {
      console.log(`Trying endpoint: ${ep}`);
      const res = await fetch(`${ep}?data=${encodeURIComponent(query)}`, {
        headers: { 'User-Agent': 'TrainfoJoetsu/1.0' }
      });
      if (res.ok) {
        data = await res.json();
        console.log(`Success with ${ep}! Elements: ${data.elements?.length}`);
        break;
      } else {
        console.log(`Endpoint ${ep} returned ${res.status}: ${res.statusText}`);
      }
    } catch (e) {
      console.log(`Endpoint ${ep} error:`, e.message);
    }
  }

  if (!data || !data.elements) {
    throw new Error('Failed to fetch from all endpoints');
  }

  const outPath = path.resolve(__dirname, 'cache/osm_joetsu.json');
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Saved ${data.elements.length} elements to ${outPath}`);

  // 駅の確認
  const stations = data.elements.filter(e => e.type === 'node' && e.tags && (e.tags.railway === 'station' || e.tags.railway === 'halt'));
  console.log('Stations in relation:');
  for (const s of stations) {
    console.log(`  ${s.tags.name || s.tags['name:ja']} (${s.lat}, ${s.lon})`);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
