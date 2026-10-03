const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/osm_musashino_raw.json', 'utf8'));
const coords = JSON.parse(fs.readFileSync('scripts/resolved_musashino_stations.json', 'utf8'));

const nodeMap = new Map();
raw.elements.filter(e => e.type === 'node').forEach(n => nodeMap.set(n.id, [n.lat, n.lon]));
const wayMap = new Map();
raw.elements.filter(e => e.type === 'way').forEach(w => {
  if (w.nodes) wayMap.set(w.id, w.nodes.map(id => nodeMap.get(id)).filter(Boolean));
});

function distMeters(p1, p2) {
  const dLat = (p1[0] - p2[0]) * 111000;
  const dLng = (p1[1] - p2[1]) * 111000 * Math.cos((p1[0] * Math.PI) / 180);
  return Math.sqrt(dLat * dLat + dLng * dLng);
}

// Relation 9486466: 府中本町 -> 南船橋
const r9486466 = raw.elements.find(e => e.id === 9486466);
const wayRefs = r9486466.members.filter(m => m.type === 'way').map(m => m.ref);

const trackPts = [];
wayRefs.forEach(ref => {
  const geom = wayMap.get(ref);
  if (!geom || geom.length === 0) return;
  if (trackPts.length === 0) {
    trackPts.push(...geom);
  } else {
    const last = trackPts[trackPts.length - 1];
    const dNormal = distMeters(last, geom[0]);
    const dReversed = distMeters(last, geom[geom.length - 1]);
    const pts = (dReversed < dNormal) ? [...geom].reverse() : geom;
    for (let i = 0; i < pts.length; i++) {
      if (i === 0 && distMeters(last, pts[i]) < 0.5) continue;
      trackPts.push(pts[i]);
    }
  }
});

console.log(`Relation 9486466 connected track points: ${trackPts.length}`);
console.log('Start point:', trackPts[0], 'End point:', trackPts[trackPts.length - 1]);

const stationNames = [
  '府中本町', '北府中', '西国分寺', '新小平', '新秋津', '東所沢', '新座', '北朝霞', '西浦和', '武蔵浦和',
  '南浦和', '東浦和', '東川口', '南越谷', '越谷レイクタウン', '吉川', '吉川美南', '新三郷', '三郷',
  '南流山', '新松戸', '新八柱', '東松戸', '市川大野', '船橋法典', '西船橋', '南船橋'
];

stationNames.forEach(name => {
  const c = coords[name];
  if (!c) return;
  let minDist = Infinity;
  let minIdx = -1;
  trackPts.forEach((pt, idx) => {
    const d = distMeters([c.lat, c.lon], pt);
    if (d < minDist) {
      minDist = d;
      minIdx = idx;
    }
  });
  console.log(`${name}: idx=${minIdx}, dist=${Math.round(minDist)}m`);
});
