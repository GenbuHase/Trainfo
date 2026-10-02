const fs = require('fs');

const content = fs.readFileSync('src/data/lines/musashino/trackGeometry.ts', 'utf8');
const jsonMatch = content.match(/export const MUSASHINO_TRACK_SEGMENTS: TrackSegment\[\] = ([\s\S]*?);\s*$/);
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

segments.forEach((seg, idx) => {
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
      if (diff > 120 && d > 1) { // 120度以上の急旋回（折り返し・鋭角ターン）
        sharpTurns.push({ idx: i, diff: diff.toFixed(1), d: d.toFixed(1), pt: pts[i] });
      }
    }
  }
  const ratio = totalDist / straightDist;

  // ratio が不自然に高い、または120度以上のターンがある場合
  if (ratio > 1.25 || sharpTurns.length > 0) {
    console.log(`[${seg.fromName} -> ${seg.toName}] (${seg.fromStationId} -> ${seg.toStationId}): pts=${pts.length}, dist=${Math.round(totalDist)}m, straight=${Math.round(straightDist)}m, ratio=${ratio.toFixed(2)}, maxTurn=${maxTurn.toFixed(1)}deg, sharpTurns=${sharpTurns.length}`);
    sharpTurns.forEach(st => {
      console.log(`   turn #${st.idx}: angle=${st.diff}deg, segLen=${st.d}m, pt=[${st.pt[0]}, ${st.pt[1]}]`);
    });
  }
});
