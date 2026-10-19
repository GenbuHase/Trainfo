const fs = require('fs');
const path = require('path');
const { distMeters } = require('./common/geometryBuilderUtils.cjs');

const lines = [
  'tobu_skytree', 'tobu_isesaki', 'tobu_kameido', 'tobu_daishi',
  'tobu_sano', 'tobu_koizumi', 'tobu_kiryu', 'tobu_nikko',
  'tobu_utsunomiya', 'tobu_kinugawa', 'tobu_urban_park',
  'yagan', 'aizu',
];

let totalSegments = 0;
let badSpikes = 0;

for (const l of lines) {
  const geomFile = path.resolve(__dirname, `../src/data/lines/${l}/trackGeometry.ts`);
  const content = fs.readFileSync(geomFile, 'utf8');
  const eqBracket = content.indexOf('= [');
  const jsonStart = eqBracket !== -1 ? eqBracket + 2 : content.indexOf('[');
  const jsonEnd = content.lastIndexOf(']');
  const segments = JSON.parse(content.substring(jsonStart, jsonEnd + 1));
  totalSegments += segments.length;

  for (const seg of segments) {
    for (let i = 0; i < seg.coordinates.length - 1; i++) {
      const d = distMeters(seg.coordinates[i], seg.coordinates[i + 1]);
      if (d > 300) {
        console.warn(`Spike in ${l} ${seg.id} index ${i}: ${Math.round(d)}m`);
        badSpikes++;
      }
    }
  }
}

console.log(`\nAudit complete: ${totalSegments} segments checked across 13 lines.`);
console.log(`Bad spikes (>300m): ${badSpikes}`);
