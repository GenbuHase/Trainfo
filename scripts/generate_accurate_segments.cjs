const fs = require('fs');

const seibuContent = fs.readFileSync('./src/data/lines/seibu_ikebukuro/trackGeometry.ts', 'utf8');
const seibuSegs = JSON.parse(seibuContent.match(/\[\s*\{[\s\S]*\}\s*\]/)[0]);
const chichibuContent = fs.readFileSync('./src/data/lines/chichibu/trackGeometry.ts', 'utf8');
const chichibuSegs = JSON.parse(chichibuContent.match(/\[\s*\{[\s\S]*\}\s*\]/)[0]);

// OSM parsed ways
const ways = JSON.parse(fs.readFileSync('./scripts/parsed_railways.json', 'utf8'));

// 1. 横瀬 (SI-35) -> 西武秩父 (SI-36) 本線
const s35_36 = seibuSegs.find(s => s.fromStationId === 'SI-35' && s.toStationId === 'SI-36');

// 2. 御花畑 (CR-31) -> 影森 (CR-32) 秩父鉄道本線
const c31_32 = chichibuSegs.find(s => (s.fromStationId === 'CR-31' && s.toStationId === 'CR-32') || (s.fromStationId === 'CR-32' && s.toStationId === 'CR-31'));

console.log('s35_36 length:', s35_36.coordinates.length);
console.log('c31_32 length:', c31_32.coordinates.length);

// Let's trace 长瀞 direct line (SI-35 -> CR-31):
// From SI-35 (index 0) up to node 503873272 [35.988783, 139.082495] (index 97 in s35_36)
const nagatoroBase = s35_36.coordinates.slice(0, 98); // indices 0 through 97 (inclusive)

// Way 485434498: service=crossover:
// node 503873272: [35.988783, 139.0824955]
// node 5861124170: [35.9890642, 139.0825664]
// node 13417425764: [35.9891903, 139.0825974]
// node 13417425765: [35.9893157, 139.0826334]
// node 4782030095: [35.9914557, 139.0833881]
const nagatoroCrossover = [
  [35.9890642, 139.0825664],
  [35.9891903, 139.0825974],
  [35.9893157, 139.0826334],
  [35.9914557, 139.0833881]
];

// Way 698437021: approaching Ohanabatake platform 2:
// node 4782030094: [35.9915996, 139.0834425]
// node 4782030096: [35.9919646, 139.083581]
// Station CR-31: [35.991981, 139.0835402]
const nagatoroArrival = [
  [35.9915996, 139.0834425],
  [35.9919646, 139.083581],
  [35.991981, 139.0835402]
];

const nagatoroFullSegment = [
  ...nagatoroBase,
  ...nagatoroCrossover,
  ...nagatoroArrival
];

console.log('nagatoroFullSegment count:', nagatoroFullSegment.length);
console.log('Start:', nagatoroFullSegment[0]);
console.log('End:', nagatoroFullSegment[nagatoroFullSegment.length - 1]);

// Check distance between consecutive points in nagatoroFullSegment to ensure no jumps:
function checkMaxGap(coords, name) {
  let maxGap = 0;
  let maxIdx = -1;
  for (let i = 0; i < coords.length - 1; i++) {
    const latDiff = (coords[i+1][0] - coords[i][0]) * 111000;
    const lngDiff = (coords[i+1][1] - coords[i][1]) * 90000;
    const dist = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
    if (dist > maxGap) {
      maxGap = dist;
      maxIdx = i;
    }
  }
  console.log(`${name} max gap: ${maxGap.toFixed(1)} meters between index ${maxIdx} and ${maxIdx + 1}`);
  if (maxGap > 500) {
    console.warn(`WARNING: large gap in ${name}!`, coords[maxIdx], '->', coords[maxIdx + 1]);
  }
}

checkMaxGap(nagatoroFullSegment, 'Nagatoro segment');

// 3. 三峰口 direct line (西武秩父 SI-36 -> 影森 CR-32):
// West Chichibu station platform: [35.990178, 139.082991]
// Southbound to switchback junction (node 503873240: [35.9885465, 139.0824059]):
const seibuSouthbound = [
  [35.990178, 139.082991],
  [35.989713, 139.082826],
  [35.989248, 139.08266],
  [35.988783, 139.082495],
  [35.9885465, 139.0824059]
];

// Way 485434502 (crossover from Seibu to Chichibu railway):
// node 503873240: [35.9885465, 139.0824059]
// node 4782030101: [35.9883543, 139.0823178]
// node 13417425762: [35.9876002, 139.0819317]
// node 13417425761: [35.987477, 139.0818722]
// node 503886609: [35.9873501, 139.0818149] (Chichibu main line junction!)
const crossoverMitsumine = [
  [35.9883543, 139.0823178],
  [35.9876002, 139.0819317],
  [35.987477, 139.0818722],
  [35.9873501, 139.0818149]
];

// From node 503886609 [35.9873501, 139.0818149] along Chichibu main line to Kagemori (CR-32):
// Let's find index of [35.9873501, 139.0818149] in c31_32:
const idxInC31_32 = c31_32.coordinates.findIndex(c => Math.abs(c[0] - 35.9873501) < 0.0001 && Math.abs(c[1] - 139.0818149) < 0.0001);
console.log('Index of node 503886609 in c31_32:', idxInC31_32);

const chichibuSouthbound = c31_32.coordinates.slice(idxInC31_32 + 1);

const mitsumineFullSegment = [
  ...seibuSouthbound,
  ...crossoverMitsumine,
  ...chichibuSouthbound
];

console.log('mitsumineFullSegment count:', mitsumineFullSegment.length);
console.log('Start:', mitsumineFullSegment[0]);
console.log('End:', mitsumineFullSegment[mitsumineFullSegment.length - 1]);

checkMaxGap(mitsumineFullSegment, 'Mitsumiguchi segment');
