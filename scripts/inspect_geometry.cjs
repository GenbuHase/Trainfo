const fs = require('fs');

function getSegments(path) {
  const content = fs.readFileSync(path, 'utf8');
  const m = content.match(/\[\s*\{[\s\S]*\}\s*\]/);
  return JSON.parse(m[0]);
}

const seibuSegs = getSegments('./src/data/lines/seibu_ikebukuro/trackGeometry.ts');
const chichibuSegs = getSegments('./src/data/lines/chichibu/trackGeometry.ts');

const s35_36 = seibuSegs.find(s => s.fromStationId === 'SI-35' && s.toStationId === 'SI-36');
console.log('=== SI-35 -> SI-36 (last 15 coords) ===');
console.log(s35_36.coordinates.slice(-15));

const c31_32 = chichibuSegs.find(s => (s.fromStationId === 'CR-31' && s.toStationId === 'CR-32') || (s.fromStationId === 'CR-32' && s.toStationId === 'CR-31'));
console.log('=== CR-31 -> CR-32 (first 15 coords) ===');
console.log(c31_32.coordinates.slice(0, 15));
