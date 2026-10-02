const fs = require('fs');

async function main() {
  console.log('Querying Overpass API for Chuo line and Omiya branch tracks...');

  const query = `
    [out:json][timeout:30];
    (
      way["railway"="rail"]["name"~"中央線|中央本線"](35.64,139.32,35.71,139.46);
      way["railway"="rail"]["name"~"武蔵野線|大宮支線|西浦和支線|国立支線"](35.68,139.43,35.92,139.66);
      way["railway"="rail"](35.83,139.61,35.92,139.65);
    );
    out geom;
  `;

  const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);
  const res = await fetch(url, { headers: { 'User-Agent': 'TrainfoApp/1.0' } });
  if (!res.ok) throw new Error(`Overpass HTTP ${res.status}`);
  const data = await res.json();
  console.log(`Received ${data.elements.length} elements.`);
  fs.writeFileSync('scripts/osm_musashino_branches.json', JSON.stringify(data, null, 2), 'utf8');
}

main().catch(err => console.error(err));
