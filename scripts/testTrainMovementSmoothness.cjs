const fs = require('fs');

const { MUSASHINO_TRACK_SEGMENTS } = require('./buildMusashinoUltraCleanTrack.cjs');
// trackGeometry.ts から読み込み
const content = fs.readFileSync('src/data/lines/musashino/trackGeometry.ts', 'utf8');
const segments = JSON.parse(content.match(/export const MUSASHINO_TRACK_SEGMENTS: TrackSegment\[\] = ([\s\S]*?);\s*$/)[1]);

function bearing(p1, p2) {
  const dLat = p2[0] - p1[0];
  const dLng = (p2[1] - p1[1]) * Math.cos((p1[0] * Math.PI) / 180);
  return (Math.atan2(dLng, dLat) * 180) / Math.PI;
}

// 補間関数 (TrainMap.tsx と同等のロジック)
function interpolate(coords, progress) {
  if (coords.length < 2) return coords[0];
  let totalLen = 0;
  const lens = [];
  for (let i = 0; i < coords.length - 1; i++) {
    const dy = coords[i+1][0] - coords[i][0];
    const dx = coords[i+1][1] - coords[i][1];
    const l = Math.sqrt(dy*dy + dx*dx);
    lens.push(l);
    totalLen += l;
  }
  const targetDist = totalLen * Math.max(0, Math.min(1, progress));
  let curDist = 0;
  for (let i = 0; i < lens.length; i++) {
    if (curDist + lens[i] >= targetDist) {
      const segT = lens[i] === 0 ? 0 : (targetDist - curDist) / lens[i];
      return [
        coords[i][0] + (coords[i+1][0] - coords[i][0]) * segT,
        coords[i][1] + (coords[i+1][1] - coords[i][1]) * segT,
      ];
    }
    curDist += lens[i];
  }
  return coords[coords.length - 1];
}

console.log('Testing train movement smoothness (every 1% step):');
let hasJerk = false;

segments.forEach(seg => {
  const pts = seg.coordinates;
  let prevPos = interpolate(pts, 0);
  let prevBearing = null;
  let maxHeadingChange = 0;

  for (let step = 1; step <= 100; step++) {
    const curPos = interpolate(pts, step / 100);
    const b = bearing(prevPos, curPos);
    if (prevBearing !== null) {
      let diff = Math.abs(b - prevBearing);
      if (diff > 180) diff = 360 - diff;
      if (diff > maxHeadingChange) maxHeadingChange = diff;
      if (diff > 45) {
        console.warn(`Jerk in [${seg.fromName} -> ${seg.toName}] at step ${step}%: heading diff=${diff.toFixed(1)}deg`);
        hasJerk = true;
      }
    }
    prevBearing = b;
    prevPos = curPos;
  }
});

console.log('Smoothness check passed (no jerk > 45deg between 1% steps):', !hasJerk);
