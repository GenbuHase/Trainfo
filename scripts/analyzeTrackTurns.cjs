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

const targetNames = ['新秋津', '東所沢', '新座', '北朝霞', '西浦和', '武蔵浦和', '南浦和', '大宮'];

segments.forEach(seg => {
  const matches = targetNames.includes(seg.fromName) || targetNames.includes(seg.toName);
  if (!matches) return;

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
      if (diff > 45) {
        sharpTurns.push({ idx: i, diff: diff.toFixed(1), d: d.toFixed(1), pPrev: pts[i-1], pCur: pts[i], pNext: pts[i+1] });
      }
    }
  }
  const ratio = totalDist / straightDist;
  console.log(`\n======================================================`);
  console.log(`[${seg.fromName} -> ${seg.toName}] (${seg.fromStationId} -> ${seg.toStationId}): pts=${pts.length}, dist=${Math.round(totalDist)}m, straight=${Math.round(straightDist)}m, ratio=${ratio.toFixed(2)}, maxTurn=${maxTurn.toFixed(1)}deg`);
  console.log(`Start: [${pts[0][0]}, ${pts[0][1]}], End: [${pts[pts.length-1][0]}, ${pts[pts.length-1][1]}]`);
  sharpTurns.forEach(st => {
    console.log(`   turn #${st.idx}: angle=${st.diff}deg, segLen=${st.d}m, pt=[${st.pCur[0]}, ${st.pCur[1]}]`);
  });
});
