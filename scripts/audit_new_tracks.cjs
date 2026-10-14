const fs = require('fs');

function distMeters(p1, p2) {
  const dLat = (p1[0] - p2[0]) * 111000;
  const dLng = (p1[1] - p2[1]) * 111000 * Math.cos(p1[0] * Math.PI / 180);
  return Math.sqrt(dLat * dLat + dLng * dLng);
}

function calculateTurnAngle(p1, p2, p3) {
  const v1 = [p2[0] - p1[0], p2[1] - p1[1]];
  const v2 = [p3[0] - p2[0], p3[1] - p2[1]];
  const dot = v1[0] * v2[0] + v1[1] * v2[1];
  const mag1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
  const mag2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
  if (mag1 === 0 || mag2 === 0) return 0;
  const cos = Math.max(-1, Math.min(1, dot / (mag1 * mag2)));
  return Math.acos(cos) * (180 / Math.PI);
}

function auditTrackFile(filePath, lineName) {
  console.log(`\n=== Auditing ${lineName} (${filePath}) ===`);
  const content = fs.readFileSync(filePath, 'utf8');
  const jsonMatch = content.match(/\[[\s\S]*\];/);
  const segments = eval(jsonMatch[0].slice(0, -1));
  let sharpTurnCount = 0;

  segments.forEach(seg => {
    const coords = seg.coordinates;
    for (let i = 0; i < coords.length - 2; i++) {
      const angle = calculateTurnAngle(coords[i], coords[i + 1], coords[i + 2]);
      const d1 = distMeters(coords[i], coords[i + 1]);
      const d2 = distMeters(coords[i + 1], coords[i + 2]);
      if (angle > 70 && d1 > 10 && d2 > 10) {
        console.warn(`[SHARP TURN] ${seg.id} idx ${i}: angle=${angle.toFixed(1)}°`);
        sharpTurnCount++;
      }
    }
  });

  console.log(`Sharp turns (>70°): ${sharpTurnCount}`);
}

auditTrackFile('src/data/lines/chiyoda/trackGeometry.ts', '東京メトロ千代田線');
auditTrackFile('src/data/lines/joban/trackGeometry.ts', 'JR常磐線');
