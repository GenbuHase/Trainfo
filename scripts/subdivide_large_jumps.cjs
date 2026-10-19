const fs = require('fs');
const path = require('path');
const { subdivideCoordinates, distMeters } = require('./common/geometryBuilderUtils.cjs');

const linesDir = path.resolve(__dirname, '../src/data/lines');
const lineDirs = fs.readdirSync(linesDir).filter(f => fs.statSync(path.join(linesDir, f)).isDirectory());

let totalSubdividedSegs = 0;
let totalPointsAdded = 0;

for (const lineId of lineDirs) {
  const geomPath = path.join(linesDir, lineId, 'trackGeometry.ts');
  if (!fs.existsSync(geomPath)) continue;

  const content = fs.readFileSync(geomPath, 'utf8');
  const eqBracket = content.indexOf('= [');
  if (eqBracket === -1) continue;

  let depth = 0;
  let jsonEnd = -1;
  for (let i = eqBracket + 2; i < content.length; i++) {
    if (content[i] === '[') depth++;
    else if (content[i] === ']') {
      depth--;
      if (depth === 0) {
        jsonEnd = i;
        break;
      }
    }
  }
  if (jsonEnd === -1) continue;

  let segs;
  try {
    segs = JSON.parse(content.substring(eqBracket + 2, jsonEnd + 1));
  } catch (e) {
    continue;
  }

  let modified = false;
  for (const seg of segs) {
    let hasLargeJump = false;
    for (let i = 0; i < seg.coordinates.length - 1; i++) {
      const d = distMeters(seg.coordinates[i], seg.coordinates[i + 1]);
      if (d > 750) {
        hasLargeJump = true;
        break;
      }
    }

    if (hasLargeJump) {
      const origLen = seg.coordinates.length;
      seg.coordinates = subdivideCoordinates(seg.coordinates, 200);
      const added = seg.coordinates.length - origLen;
      totalPointsAdded += added;
      totalSubdividedSegs++;
      modified = true;
      console.log(`[${lineId}] Subdivided seg ${seg.id || seg.fromStationId + '->' + seg.toStationId}: +${added} points`);
    }
  }

  if (modified) {
    const newContent = content.substring(0, eqBracket + 2) + JSON.stringify(segs, null, 2) + content.substring(jsonEnd + 1);
    fs.writeFileSync(geomPath, newContent, 'utf8');
  }
}

console.log(`\nSubdivision completed:`);
console.log(`  Subdivided segments: ${totalSubdividedSegs}`);
console.log(`  Points added:        ${totalPointsAdded}`);
