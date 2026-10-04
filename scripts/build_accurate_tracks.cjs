const fs = require('fs');

const seibuSegs = JSON.parse(fs.readFileSync('./src/data/lines/seibu_ikebukuro/trackGeometry.ts', 'utf8').match(/\[\s*\{[\s\S]*\}\s*\]/)[0]);
const s35_36 = seibuSegs.find(s => s.fromStationId === 'SI-35' && s.toStationId === 'SI-36');
console.log('s35_36 index 95 to 100:');
s35_36.coordinates.slice(95).forEach((c, idx) => {
  console.log(95 + idx, c);
});
