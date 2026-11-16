const fs = require('fs');

// 1. Shinkansen TKS-04_TKS-05
const shinkansen = fs.readFileSync('src/data/lines/jr_tokaido_shinkansen/trackGeometry.ts', 'utf8');
const matchShinkansen = shinkansen.match(/\{\s*"segmentId":\s*"tokaido_shinkansen_TKS-04_TKS-05"[\s\S]*?"coordinates":\s*(\[\s*\[[\s\S]*?\]\s*\])\s*\}/);
const shinkansenCoords = JSON.parse(matchShinkansen[1]);

// 2. Tokaido in-between segments
const tokaido = fs.readFileSync('src/data/lines/jr_tokaido/trackGeometry.ts', 'utf8');
const tokaidoSegments = {};
for (const seg of ['JT-16_JT-17', 'JT-17_JT-18', 'JT-18_JT-19', 'JT-19_JT-20', 'JT-20_JT-21']) {
  const reg = new RegExp(`\\{\\s*"segmentId":\\s*"${seg}"[\\s\\S]*?"coordinates":\\s*(\\[\\s*\\[[\\s\\S]*?\\]\\s*\\])\\s*\\}`);
  const m = tokaido.match(reg);
  if (m) {
    tokaidoSegments[seg] = JSON.parse(m[1]);
  }
}

console.log('Shinkansen coords count:', shinkansenCoords.length);
console.log('Sample coords shinkansen:');
for (let i = 0; i < shinkansenCoords.length; i += Math.floor(shinkansenCoords.length / 10)) {
  console.log(`[${i}]`, shinkansenCoords[i]);
}

console.log('\nTokaido JT-20_JT-21 coords:');
const jt2021 = tokaidoSegments['JT-20_JT-21'];
console.log('Count:', jt2021.length);
for (let i = 0; i < jt2021.length; i += 10) {
  console.log(`[${i}]`, jt2021[i]);
}
