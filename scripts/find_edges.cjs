const fs = require('fs');

function extractSegments(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const equalsBracket = content.indexOf('= [');
  const jsonStart = content.indexOf('[', equalsBracket);
  const jsonEnd = content.lastIndexOf('];');
  const jsonStr = content.slice(jsonStart, jsonEnd + 1);
  return JSON.parse(jsonStr);
}

const seibuSegs = extractSegments('./src/data/lines/seibu_ikebukuro/trackGeometry.ts');

// Find all segments in seibuSegs that have coordinates near Image 1:
// lat 35.970 - 35.987, lng 139.070 - 139.090
seibuSegs.forEach(seg => {
  const pts = seg.coordinates;
  for (let i = 0; i < pts.length - 1; i++) {
    const p1 = pts[i];
    const p2 = pts[i+1];
    // check if this segment edge is around the triangle (lat ~35.981-35.983, lng ~139.078-139.082)
    if (
      (p1[0] >= 35.979 && p1[0] <= 35.985 && p1[1] >= 139.076 && p1[1] <= 139.083) ||
      (p2[0] >= 35.979 && p2[0] <= 35.985 && p2[1] >= 139.076 && p2[1] <= 139.083)
    ) {
      console.log(`[${seg.fromStationId} -> ${seg.toStationId}] Edge ${i}->${i+1}:`, p1, '->', p2);
    }
  }
});
