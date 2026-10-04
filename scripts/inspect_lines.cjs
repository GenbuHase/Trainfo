const fs = require('fs');

function inspectTrack(lineId) {
  const p = `./src/data/lines/${lineId}/trackGeometry.ts`;
  if (!fs.existsSync(p)) return;
  const content = fs.readFileSync(p, 'utf8');
  const regex = /"fromStationId":\s*"([^"]+)",\s*"toStationId":\s*"([^"]+)"/g;
  let match;
  console.log(`=== ${lineId} ===`);
  while ((match = regex.exec(content)) !== null) {
    console.log(`  ${match[1]} -> ${match[2]}`);
  }
}

inspectTrack('seibu_yurakucho');
inspectTrack('fukutoshin');
inspectTrack('yurakucho');
inspectTrack('ome');
