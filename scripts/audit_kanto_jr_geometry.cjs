const fs = require('fs');
const path = require('path');
const linesMaster = require('./kanto_jr_master_definitions.cjs');
const { distMeters } = require('./common/geometryBuilderUtils.cjs');

let totalStations = 0;
let totalSegments = 0;
let errors = 0;

for (const lineDef of linesMaster) {
  const lineDir = path.resolve(`src/data/lines/${lineDef.lineId}`);
  const stContent = fs.readFileSync(path.join(lineDir, 'stations.ts'), 'utf8');
  const segContent = fs.readFileSync(path.join(lineDir, 'trackGeometry.ts'), 'utf8');

  // JSON部分を取り出す
  const stEqIdx = stContent.indexOf('=');
  const segEqIdx = segContent.indexOf('=');
  const stJsonStr = stContent.substring(stContent.indexOf('[', stEqIdx), stContent.lastIndexOf(']') + 1);
  const segJsonStr = segContent.substring(segContent.indexOf('[', segEqIdx), segContent.lastIndexOf(']') + 1);

  const stations = JSON.parse(stJsonStr);
  const segments = JSON.parse(segJsonStr);

  totalStations += stations.length;
  totalSegments += segments.length;

  const stMap = new Map(stations.map(s => [s.id, s]));

  for (const seg of segments) {
    const fromSt = stMap.get(seg.fromStationId);
    const toSt = stMap.get(seg.toStationId);

    if (!fromSt || !toSt) {
      console.error(`[${lineDef.lineId}] Missing station for segment ${seg.id}`);
      errors++;
      continue;
    }

    const startCoord = seg.coordinates[0];
    const endCoord = seg.coordinates[seg.coordinates.length - 1];

    const dStart = distMeters([fromSt.lat, fromSt.lng], startCoord);
    const dEnd = distMeters([toSt.lat, toSt.lng], endCoord);

    if (dStart > 0.001) {
      console.error(`[${lineDef.lineId}] Snap error at ${fromSt.name} (${seg.id}): ${dStart.toFixed(4)}m`);
      errors++;
    }
    if (dEnd > 0.001) {
      console.error(`[${lineDef.lineId}] Snap error at ${toSt.name} (${seg.id}): ${dEnd.toFixed(4)}m`);
      errors++;
    }

    if (seg.coordinates.length < 2) {
      console.error(`[${lineDef.lineId}] Degenerate segment: ${seg.id} has only ${seg.coordinates.length} points`);
      errors++;
    }
  }
}

console.log(`\n======================================================`);
console.log(`Audit Finished: ${linesMaster.length} lines, ${totalStations} stations, ${totalSegments} segments.`);
console.log(`Errors: ${errors}`);
console.log(`======================================================\n`);
