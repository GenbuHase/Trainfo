const fs = require('fs');
const path = require('path');
const { distMeters } = require('./common/geometryBuilderUtils.cjs');

function angleDeg(p1, p2, p3) {
  const v1 = [p2[0] - p1[0], p2[1] - p1[1]];
  const v2 = [p3[0] - p2[0], p3[1] - p2[1]];
  const dot = v1[0] * v2[0] + v1[1] * v2[1];
  const m1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
  const m2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
  if (m1 === 0 || m2 === 0) return 180;
  let cos = dot / (m1 * m2);
  cos = Math.max(-1, Math.min(1, cos));
  return (Math.acos(cos) * 180) / Math.PI;
}

const targetLines = [
  'joetsu',
  'ryomo',
  'tokaido',
  'tokaido_shizuoka',
  'takasaki',
  'utsunomiya',
  'ueno_tokyo',
  'shonan_shinjuku',
  'yokosuka',
  'sobu_rapid',
  'ito',
];

const linesDir = path.resolve(__dirname, '../src/data/lines');

for (const lineId of targetLines) {
  const stationsFile = path.join(linesDir, lineId, 'stations.ts');
  const trackFile = path.join(linesDir, lineId, 'trackGeometry.ts');

  if (!fs.existsSync(stationsFile) || !fs.existsSync(trackFile)) continue;

  const stationsContent = fs.readFileSync(stationsFile, 'utf8');
  const trackContent = fs.readFileSync(trackFile, 'utf8');

  const stMatch = stationsContent.match(/=\s*(\[[\s\S]*\]);/);
  const trMatch = trackContent.match(/=\s*(\[[\s\S]*\]);/);

  if (!stMatch || !trMatch) {
    console.warn(`No match in ${lineId}`);
    continue;
  }

  let stations, segments;
  try {
    eval('stations = ' + stMatch[1]);
    eval('segments = ' + trMatch[1]);
  } catch (e) {
    console.error(`Parse error in ${lineId}:`, e.message);
    continue;
  }

  const stMap = new Map(stations.map(s => [s.id, s]));
  const anomalies = [];

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const s1 = stMap.get(seg.fromStationId);
    const s2 = stMap.get(seg.toStationId);
    if (!s1 || !s2) continue;

    const coords = seg.coordinates;
    const startDist = distMeters([s1.lat, s1.lng], coords[0]);
    const endDist = distMeters([s2.lat, s2.lng], coords[coords.length - 1]);

    const straightDist = distMeters([s1.lat, s1.lng], [s2.lat, s2.lng]);
    let pathDist = 0;
    for (let j = 0; j < coords.length - 1; j++) {
      pathDist += distMeters(coords[j], coords[j + 1]);
    }
    const ratio = pathDist / straightDist;

    // シャープターン
    let sharp = 0;
    for (let j = 0; j < coords.length - 2; j++) {
      const deg = angleDeg(coords[j], coords[j + 1], coords[j + 2]);
      if (deg > 140) {
        if (distMeters(coords[j], coords[j + 1]) > 5 && distMeters(coords[j + 1], coords[j + 2]) > 5) {
          sharp++;
        }
      }
    }

    // ギャップ
    let gap = 0;
    if (i < segments.length - 1) {
      gap = distMeters(coords[coords.length - 1], segments[i + 1].coordinates[0]);
    }

    if (ratio > 1.6 || startDist > 50 || endDist > 50 || sharp > 0 || gap > 10) {
      anomalies.push({
        seg: seg.segmentId,
        from: s1.name,
        to: s2.name,
        ratio: ratio.toFixed(2),
        straightKm: (straightDist / 1000).toFixed(2),
        pathKm: (pathDist / 1000).toFixed(2),
        startDist: startDist.toFixed(1) + 'm',
        endDist: endDist.toFixed(1) + 'm',
        gap: gap.toFixed(1) + 'm',
        sharp
      });
    }
  }

  if (anomalies.length > 0) {
    console.log(`\n=== Anomalies in [${lineId}] ===`);
    console.table(anomalies);
  } else {
    console.log(`✅ [${lineId}] No anomalies found.`);
  }
}
