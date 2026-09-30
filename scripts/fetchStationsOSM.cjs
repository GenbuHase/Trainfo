const fs = require('fs');

async function fetchOSMStations() {
  const query = `
    [out:json][timeout:25];
    (
      node["railway"="station"](35.70,139.18,36.15,139.73);
      node["public_transport"="stop_position"](35.70,139.18,36.15,139.73);
    );
    out body;
  `;
  const url = 'https://overpass.kumi.systems/api/interpreter';
  console.log('Fetching stations from Overpass (kumi.systems)...');
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: `data=${encodeURIComponent(query)}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    const data = await res.json();
    console.log(`Fetched ${data.elements.length} station elements from OSM!`);
    fs.writeFileSync('scripts/osm_stations_raw.json', JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

fetchOSMStations();
