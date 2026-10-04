const fs = require('fs');

// 1. Generate accurate nagatoroFullSegment and mitsumineFullSegment
const seibuContent = fs.readFileSync('./src/data/lines/seibu_ikebukuro/trackGeometry.ts', 'utf8');
const seibuSegs = JSON.parse(seibuContent.match(/\[\s*\{[\s\S]*\}\s*\]/)[0]);
const chichibuContent = fs.readFileSync('./src/data/lines/chichibu/trackGeometry.ts', 'utf8');
const chichibuSegs = JSON.parse(chichibuContent.match(/\[\s*\{[\s\S]*\}\s*\]/)[0]);

const s35_36 = seibuSegs.find(s => s.fromStationId === 'SI-35' && s.toStationId === 'SI-36');
const c31_32 = chichibuSegs.find(s => (s.fromStationId === 'CR-31' && s.toStationId === 'CR-32') || (s.fromStationId === 'CR-32' && s.toStationId === 'CR-31'));

// Nagatoro direct line (SI-35 -> CR-31):
// From SI-35 up to node 503873272 [35.988783, 139.082495] (index 97 in s35_36)
const nagatoroBase = s35_36.coordinates.slice(0, 98); // indices 0..97
const nagatoroCrossover = [
  [35.9890642, 139.0825664],
  [35.9891903, 139.0825974],
  [35.9893157, 139.0826334],
  [35.9914557, 139.0833881]
];
const nagatoroArrival = [
  [35.9915996, 139.0834425],
  [35.9919646, 139.083581],
  [35.991981, 139.0835402]
];
const nagatoroCoords = [
  ...nagatoroBase,
  ...nagatoroCrossover,
  ...nagatoroArrival
];

// Mitsumine direct line (SI-36 -> CR-32):
const seibuSouthbound = [
  [35.990178, 139.082991],
  [35.989713, 139.082826],
  [35.989248, 139.08266],
  [35.988783, 139.082495],
  [35.9885465, 139.0824059]
];
const crossoverMitsumine = [
  [35.9883543, 139.0823178],
  [35.9876002, 139.0819317],
  [35.987477, 139.0818722],
  [35.9873501, 139.0818149]
];
const idxInC31_32 = c31_32.coordinates.findIndex(c => Math.abs(c[0] - 35.9873501) < 0.0001 && Math.abs(c[1] - 139.0818149) < 0.0001);
const chichibuSouthbound = c31_32.coordinates.slice(idxInC31_32 + 1);
const mitsumineCoords = [
  ...seibuSouthbound,
  ...crossoverMitsumine,
  ...chichibuSouthbound
];

console.log('nagatoroCoords length:', nagatoroCoords.length);
console.log('mitsumineCoords length:', mitsumineCoords.length);

function updateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const segs = JSON.parse(content.match(/\[\s*\{[\s\S]*\}\s*\]/)[0]);

  // Remove existing SI-35 -> CR-31 and SI-36 -> CR-32
  const filtered = segs.filter(s => !(
    (s.fromStationId === 'SI-35' && s.toStationId === 'CR-31') ||
    (s.fromStationId === 'CR-31' && s.toStationId === 'SI-35') ||
    (s.fromStationId === 'SI-36' && s.toStationId === 'CR-32') ||
    (s.fromStationId === 'CR-32' && s.toStationId === 'SI-36')
  ));

  filtered.push({
    fromStationId: 'SI-35',
    toStationId: 'CR-31',
    fromName: '横瀬',
    toName: '御花畑',
    coordinates: nagatoroCoords
  });

  filtered.push({
    fromStationId: 'SI-36',
    toStationId: 'CR-32',
    fromName: '西武秩父',
    toName: '影森',
    coordinates: mitsumineCoords
  });

  const exportPrefix = filePath.includes('seibu')
    ? 'export const SEIBU_IKEBUKURO_TRACK_SEGMENTS: TrackSegment[] ='
    : 'export const CHICHIBU_TRACK_SEGMENTS: TrackSegment[] =';

  const newFileContent = `import type { TrackSegment } from '../../../types';\n\n${exportPrefix} ${JSON.stringify(filtered, null, 2)};\n`;
  fs.writeFileSync(filePath, newFileContent, 'utf8');
  console.log(`Updated ${filePath}`);
}

updateFile('./src/data/lines/seibu_ikebukuro/trackGeometry.ts');
updateFile('./src/data/lines/chichibu/trackGeometry.ts');
