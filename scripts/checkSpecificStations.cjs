const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('scripts/osm_musashino_raw.json', 'utf8'));

const targetNames = ['東京', '東松戸', '西国分寺', '新木場', '幕張豊砂', '海浜幕張', '国立', '豊田'];
const stNodes = raw.elements.filter(e => e.tags && targetNames.includes(e.tags.name));
stNodes.forEach(s => console.log(s.tags.name, s.lat, s.lon, s.id, s.tags.railway, s.tags['name:en']));
