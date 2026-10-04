const fs = require('fs');
const seibuSegs = JSON.parse(fs.readFileSync('./src/data/lines/seibu_ikebukuro/trackGeometry.ts', 'utf8').match(/\[\s*\{[\s\S]*\}\s*\]/)[0]);
const s35_c31 = seibuSegs.find(s => s.fromStationId === 'SI-35' && s.toStationId === 'CR-31');
console.log('s35_c31 coords count:', s35_c31.coordinates.length);
console.log('s35_c31 last 20 coords:');
console.log(s35_c31.coordinates.slice(-20));
