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

// Area of Image 1: around lat 35.980 - 35.985, lng 139.077 - 139.083
for (const seg of seibuSegs) {
  const inArea = seg.coordinates.filter(c => c[0] >= 35.980 && c[0] <= 35.985 && c[1] >= 139.077 && c[1] <= 139.084);
  if (inArea.length > 0) {
    console.log(`\n=== Segment: ${seg.fromStationId} -> ${seg.toStationId} ===`);
    console.log(`Matching points count: ${inArea.length}`);
    inArea.forEach(c => console.log('  ', c));
  }
}
