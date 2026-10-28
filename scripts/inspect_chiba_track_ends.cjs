const fs = require('fs');
const path = require('path');

function getTrackSegs(lineId) {
  const p = path.resolve('src/data/lines', lineId, 'trackGeometry.ts');
  const content = fs.readFileSync(p, 'utf8');
  return eval(content.match(/TrackSegment\[\]\s*=\s*(\[[\s\S]*?\]);/)[1]);
}

const sobuRapid = getTrackSegs('sobu_rapid');
const lastRapidSeg = sobuRapid[sobuRapid.length - 1];
console.log('sobu_rapid last seg:', lastRapidSeg.id, lastRapidSeg.fromStationId, lastRapidSeg.toStationId);
console.log('  last 3 coords:', lastRapidSeg.coordinates.slice(-3));

const chuoSobu = getTrackSegs('chuo_sobu_local');
const lastChuoSeg = chuoSobu[chuoSobu.length - 1];
console.log('chuo_sobu_local last seg:', lastChuoSeg.id, lastChuoSeg.fromStationId, lastChuoSeg.toStationId);
console.log('  last 3 coords:', lastChuoSeg.coordinates.slice(-3));

const sobuMain = getTrackSegs('sobu_main');
const firstMainSeg = sobuMain[0];
console.log('sobu_main first seg:', firstMainSeg.id, firstMainSeg.fromStationId, firstMainSeg.toStationId);
console.log('  first 3 coords:', firstMainSeg.coordinates.slice(0, 3));

const sotobo = getTrackSegs('sotobo');
const firstSotoboSeg = sotobo[0];
console.log('sotobo first seg:', firstSotoboSeg.id, firstSotoboSeg.fromStationId, firstSotoboSeg.toStationId);
console.log('  first 3 coords:', firstSotoboSeg.coordinates.slice(0, 3));
