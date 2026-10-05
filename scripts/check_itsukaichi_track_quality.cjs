const fs = require('fs');

const content = fs.readFileSync('src/data/lines/itsukaichi/trackGeometry.ts', 'utf8');
const jsonMatch = content.match(/export const ITSUKAICHI_TRACK_SEGMENTS: TrackSegment\[\] = ([\s\S]*?);\s*$/);
const segments = JSON.parse(jsonMatch[1]);

function dist(p1, p2) {
  const dLat = (p1[0] - p2[0]) * 111000;
  const dLng = (p1[1] - p2[1]) * 111000 * Math.cos((p1[0] * Math.PI) / 180);
  return Math.sqrt(dLat * dLat + dLng * dLng);
}

function bearing(p1, p2) {
  const dLat = p2[0] - p1[0];
  const dLng = (p2[1] - p1[1]) * Math.cos((p1[0] * Math.PI) / 180);
  return (Math.atan2(dLng, dLat) * 180) / Math.PI;
}

console.log('=== Checking Itsukaichi Line Track Quality ===');
let overallIssues = 0;

segments.forEach((seg) => {
  const pts = seg.coordinates;
  let totalDist = 0;
  let maxTurn = 0;
  let sharpTurns = [];
  const straightDist = dist(pts[0], pts[pts.length - 1]);

  for (let i = 0; i < pts.length - 1; i++) {
    const d = dist(pts[i], pts[i + 1]);
    totalDist += d;
    if (i > 0) {
      const b1 = bearing(pts[i - 1], pts[i]);
      const b2 = bearing(pts[i], pts[i + 1]);
      let diff = Math.abs(b2 - b1);
      if (diff > 180) diff = 360 - diff;
      if (diff > maxTurn) maxTurn = diff;
      if (diff > 120 && d > 1) {
        sharpTurns.push({ idx: i, diff: diff.toFixed(1), d: d.toFixed(1), pt: pts[i] });
      }
    }
  }
  const ratio = totalDist / straightDist;
  console.log(`[${seg.fromName} -> ${seg.toName}]: pts=${pts.length}, dist=${Math.round(totalDist)}m, straight=${Math.round(straightDist)}m, ratio=${ratio.toFixed(2)}, maxTurn=${maxTurn.toFixed(1)}deg`);
  if (ratio > 1.3 || sharpTurns.length > 0) {
    overallIssues++;
    console.warn(`  ⚠️ Potential issue: sharpTurns=${sharpTurns.length}`);
  }
});

console.log(`Total issues found: ${overallIssues}`);
