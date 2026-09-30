const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/overpass_tojo_raw.json', 'utf8'));
const ways = raw.elements.filter(e => e.type === 'way');

// 本線のみ
const mainlineWays = ways.filter(w => {
  const tags = w.tags || {};
  const name = tags.name || '';
  if (name.includes('越生') || name.includes('日光') || name.includes('野田') || name.includes('伊勢崎')) return false;
  if (tags.service && ['siding', 'yard', 'spur', 'crossover'].includes(tags.service)) return false;
  const geom = w.geometry || [];
  if (geom.length < 2) return false;
  return true;
});

// stations.ts をパース
const stationsFile = fs.readFileSync('src/data/stations.ts', 'utf8');
const stMatches = [...stationsFile.matchAll(/id:\s*'([^']+)',[\s\S]*?name:\s*'([^']+)',[\s\S]*?lat:\s*([0-9.]+),[\s\S]*?lng:\s*([0-9.]+)/g)];

const stations = stMatches.map(m => ({
  id: m[1],
  name: m[2],
  lat: parseFloat(m[3]),
  lng: parseFloat(m[4])
}));

console.log('Total stations found in stations.ts:', stations.length);

function distSq(p1, p2) {
  const dLat = (p1[0] - p2[0]) * 111000;
  const dLng = (p1[1] - p2[1]) * 111000 * Math.cos(p1[0] * Math.PI / 180);
  return dLat * dLat + dLng * dLng;
}

// 点から線分への最短点（スナップ）を計算
function projectPointToSegment(p, a, b) {
  const ab = [b[0] - a[0], b[1] - a[1]];
  const ap = [p[0] - a[0], p[1] - a[1]];
  const abLenSq = ab[0] * ab[0] + ab[1] * ab[1];
  if (abLenSq === 0) return a;
  let t = (ap[0] * ab[0] + ap[1] * ab[1]) / abLenSq;
  t = Math.max(0, Math.min(1, t));
  return [a[0] + t * ab[0], a[1] + t * ab[1]];
}

const report = [];

stations.forEach(st => {
  let minDist = Infinity;
  let snapped = null;

  mainlineWays.forEach(w => {
    for (let i = 0; i < w.geometry.length - 1; i++) {
      const p1 = [w.geometry[i].lat, w.geometry[i].lon];
      const p2 = [w.geometry[i + 1].lat, w.geometry[i + 1].lon];
      const proj = projectPointToSegment([st.lat, st.lng], p1, p2);
      const d = Math.sqrt(distSq([st.lat, st.lng], proj));
      if (d < minDist) {
        minDist = d;
        snapped = proj;
      }
    }
  });

  report.push({
    id: st.id,
    name: st.name,
    currentLat: st.lat,
    currentLng: st.lng,
    distMeters: minDist,
    snappedLat: snapped ? Number(snapped[0].toFixed(6)) : st.lat,
    snappedLng: snapped ? Number(snapped[1].toFixed(6)) : st.lng
  });
});

console.log('--- STATION TO MAINLINE TRACK DISTANCE REPORT ---');
report.forEach(r => {
  const warn = r.distMeters > 30 ? '⚠️ LARGE OFFSET' : '✓ OK';
  console.log(`${r.id} ${r.name.padEnd(6, ' ')}: ${r.distMeters.toFixed(1)}m ${warn} [Current: ${r.currentLat}, ${r.currentLng}] -> [Snapped: ${r.snappedLat}, ${r.snappedLng}]`);
});
