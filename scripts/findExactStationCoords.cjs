const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/overpass_tojo_raw.json', 'utf8'));

// railway = station または public_transport = station または stop_position を探す
const stationsInOSM = raw.elements.filter(e => {
  const tags = e.tags || {};
  return (tags.railway === 'station' || tags.public_transport === 'station' || tags.railway === 'stop') && tags.name;
});

console.log('OSM stations found in raw data:', stationsInOSM.length);
stationsInOSM.forEach(s => {
  console.log(`OSM Station: ${s.tags.name} (${s.tags.name_kana || ''}), type=${s.type}, id=${s.id}, lat=${s.lat || (s.center && s.center.lat)}, lon=${s.lon || (s.center && s.center.lon)}`);
});
