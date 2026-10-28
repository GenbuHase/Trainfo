const fs = require('fs');
const { distMeters } = require('./common/geometryBuilderUtils.cjs');

function analyzeTrack(file) {
  const content = fs.readFileSync(file, 'utf8');
  const m = content.match(/TrackSegment\[\]\s*=\s*(\[[\s\S]*?\]);/);
  if (!m) {
    console.log('No match for', file);
    return;
  }
  const segments = eval(m[1]);
  let totalPts = 0;
  let totalDist = 0;
  let maxStep = 0;
  let minStep = Infinity;
  let steps = [];

  for (const seg of segments) {
    totalPts += seg.coordinates.length;
    for (let i = 0; i < seg.coordinates.length - 1; i++) {
      const d = distMeters(seg.coordinates[i], seg.coordinates[i + 1]);
      totalDist += d;
      steps.push(d);
      if (d > maxStep) maxStep = d;
      if (d < minStep) minStep = d;
    }
  }
  const avgStep = totalDist / steps.length;
  console.log(file);
  console.log('  Segments:', segments.length, 'Total points:', totalPts, 'Total dist:', (totalDist/1000).toFixed(1) + 'km');
  console.log('  Avg step:', avgStep.toFixed(1) + 'm', 'Min step:', minStep.toFixed(1) + 'm', 'Max step:', maxStep.toFixed(1) + 'm');
  console.log('  Sample seg 0:', segDetails(segments[0]));
}

function segDetails(seg) {
  if (!seg) return 'none';
  return {
    from: seg.fromStationId,
    to: seg.toStationId,
    pts: seg.coordinates.length,
    first: seg.coordinates[0],
    last: seg.coordinates[seg.coordinates.length - 1]
  };
}

analyzeTrack('src/data/lines/chuo/trackGeometry.ts');
analyzeTrack('src/data/lines/sobu_rapid/trackGeometry.ts');
analyzeTrack('src/data/lines/tojo/trackGeometry.ts');
analyzeTrack('src/data/lines/saikyo/trackGeometry.ts');
analyzeTrack('src/data/lines/yamanote/trackGeometry.ts');
analyzeTrack('src/data/lines/keiyo/trackGeometry.ts');
analyzeTrack('src/data/lines/uchibo/trackGeometry.ts');
