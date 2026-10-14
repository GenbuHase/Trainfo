const fs = require('fs');
const path = require('path');

function dist(p1, p2) {
  const dy = (p1[0] - p2[0]) * 111320;
  const dx = (p1[1] - p2[1]) * 111320 * Math.cos((p1[0] * Math.PI) / 180);
  return Math.sqrt(dx * dx + dy * dy);
}

['tokyu_shin_yokohama', 'sotetsu_shin_yokohama', 'sotetsu_main', 'sotetsu_izumino'].forEach(lineId => {
  const trackFile = path.resolve(`src/data/lines/${lineId}/trackGeometry.ts`);
  const content = fs.readFileSync(trackFile, 'utf8');
  const jsonMatch = content.match(/=\s*(\[[\s\S]*?\]);\s*$/);
  if (!jsonMatch) {
    console.error(`Could not parse ${lineId}`);
    return;
  }
  const segments = JSON.parse(jsonMatch[1]);
  let maxJump = 0;
  let jumpsOver300m = 0;

  segments.forEach(seg => {
    for (let i = 0; i < seg.coordinates.length - 1; i++) {
      const d = dist(seg.coordinates[i], seg.coordinates[i + 1]);
      if (d > maxJump) maxJump = d;
      if (d > 300) {
        jumpsOver300m++;
        console.warn(`[${lineId}] Large jump: ${d.toFixed(1)}m in ${seg.fromName} -> ${seg.toName}`);
      }
    }
  });

  console.log(`[${lineId}] Segments: ${segments.length}, Max point gap: ${maxJump.toFixed(1)}m, Jumps >300m: ${jumpsOver300m}`);
});
