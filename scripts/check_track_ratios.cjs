const fs = require('fs');
const path = require('path');

function haversine(c1, c2) {
  const R = 6371000;
  const dLat = (c2[0] - c1[0]) * Math.PI / 180;
  const dLng = (c2[1] - c1[1]) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(c1[0] * Math.PI / 180) * Math.cos(c2[0] * Math.PI / 180) *
            Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const lines = [
  'tobu_skytree', 'tobu_kameido', 'tobu_daishi', 'tobu_isesaki',
  'tobu_sano', 'tobu_koizumi', 'tobu_kiryu', 'tobu_nikko',
  'tobu_utsunomiya', 'tobu_kinugawa', 'tobu_urban_park', 'yagan', 'aizu'
];

lines.forEach(lineId => {
  const geomPath = path.resolve('src/data/lines', lineId, 'trackGeometry.ts');
  const stationsPath = path.resolve('src/data/lines', lineId, 'stations.ts');
  if (!fs.existsSync(geomPath) || !fs.existsSync(stationsPath)) return;

  const geomRaw = fs.readFileSync(geomPath, 'utf8');
  const segIdx = geomRaw.indexOf('= [');
  const segJsonStr = geomRaw.slice(segIdx + 2, geomRaw.lastIndexOf(']') + 1);
  const segments = JSON.parse(segJsonStr);

  const stationsRaw = fs.readFileSync(stationsPath, 'utf8');
  const stIdx = stationsRaw.indexOf('= [');
  const stJsonStr = stationsRaw.slice(stIdx + 2, stationsRaw.lastIndexOf(']') + 1);
  const stations = JSON.parse(stJsonStr);
  const stMap = new Map();
  stations.forEach(s => stMap.set(s.id, s));

  console.log(`\n=== ${lineId} (Segments: ${segments.length}) ===`);
  segments.forEach((seg, i) => {
    const coords = seg.coordinates;
    const fromSt = stMap.get(seg.fromStationId);
    const toSt = stMap.get(seg.toStationId);
    if (!fromSt || !toSt) return;
    const straightDist = haversine([fromSt.lat, fromSt.lng], [toSt.lat, toSt.lng]);

    let trackLen = 0;
    for (let j = 0; j < coords.length - 1; j++) {
      trackLen += haversine(coords[j], coords[j + 1]);
    }

    const ratio = trackLen / (straightDist || 1);
    if (ratio > 2.0 || trackLen - straightDist > 1000) {
      console.log(`  [ALERT] Seg ${seg.id} (${fromSt.name} -> ${toSt.name}): straight=${(straightDist/1000).toFixed(2)}km, track=${(trackLen/1000).toFixed(2)}km, ratio=${ratio.toFixed(1)}x, pts=${coords.length}`);
    }
  });
});
