const fs = require('fs');

async function main() {
  console.log('Querying Overpass for Kunitachi branch tunnel rails...');
  const query = `
    [out:json][timeout:25];
    (
      way["railway"="rail"](35.69,139.44,35.74,139.48);
    );
    out geom;
  `;
  const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);
  const res = await fetch(url, { headers: { 'User-Agent': 'TrainfoApp/1.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  console.log(`Received ${data.elements.length} ways in Kunitachi branch area.`);
  fs.writeFileSync('scripts/osm_kunitachi_branch_raw.json', JSON.stringify(data, null, 2), 'utf8');
}

main().catch(err => console.error(err));
