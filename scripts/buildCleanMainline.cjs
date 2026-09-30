const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/overpass_tojo_raw.json', 'utf8'));
const ways = raw.elements.filter(e => e.type === 'way');

const candidates = ways.filter(w => {
  const tags = w.tags || {};
  const name = tags.name || '';
  if (name.includes('越生') || name.includes('日光') || name.includes('野田') || name.includes('伊勢崎')) return false;
  if (tags.service && ['siding', 'yard', 'spur', 'crossover'].includes(tags.service)) return false;
  const geom = w.geometry || [];
  if (geom.length < 2) return false;
  if (geom[0].lat < 35.71 || geom[0].lat > 36.14 || geom[0].lon < 139.18 || geom[0].lon > 139.73) return false;
  return true;
});

function distMeters(p1, p2) {
  const dLat = (p1[0] - p2[0]) * 111000;
  const dLng = (p1[1] - p2[1]) * 111000 * Math.cos(p1[0] * Math.PI / 180);
  return Math.sqrt(dLat * dLat + dLng * dLng);
}

// 各wayを2方向のエッジとしてグラフ化
// ノードはウェイの端点。ただし近接する端点（5m以内）は同じノードとして扱う
const ikeStart = [35.729623, 139.710407];
const yoriiEnd = [36.117296, 139.192857];

// 各wayのエッジ化
// way index i: 端点A = geom[0], 端点B = geom[geom.length-1]
// 長さは way に沿った累積距離
const edges = [];
candidates.forEach((w, idx) => {
  const pts = w.geometry.map(pt => [pt.lat, pt.lon]);
  let length = 0;
  for (let j = 0; j < pts.length - 1; j++) {
    length += distMeters(pts[j], pts[j + 1]);
  }
  edges.push({
    wayIdx: idx,
    id: w.id,
    start: pts[0],
    end: pts[pts.length - 1],
    pts: pts,
    length: length
  });
});

console.log('Total candidate edges:', edges.length);

// 池袋から始めて貪欲またはダイクストラで寄居方面へ探索
// 各ステップで、現在の先端から一番近く（< 25m）、かつ寄居（北西方向）に向かって進むedgeを繋ぐ
let currentPoint = ikeStart;
const pathWays = [];
const visitedEdges = new Set();
let totalDistance = 0;

const pathPoints = [];

for (let step = 0; step < 500; step++) {
  // 寄居に十分近づいたら終了
  if (distMeters(currentPoint, yoriiEnd) < 100) {
    console.log(`Reached Yorii destination! Steps: ${step}, Total distance: ${(totalDistance/1000).toFixed(2)} km`);
    break;
  }

  // currentPoint に最も近い未訪問エッジの端点を探す
  let bestEdge = null;
  let bestDist = Infinity;
  let bestReverse = false;

  for (let i = 0; i < edges.length; i++) {
    if (visitedEdges.has(i)) continue;
    const e = edges[i];
    const dStart = distMeters(currentPoint, e.start);
    const dEnd = distMeters(currentPoint, e.end);

    // 進行方向の確認: e.end または e.start が寄居に近づくか
    if (dStart < bestDist && dStart < 50) {
      bestDist = dStart;
      bestEdge = i;
      bestReverse = false;
    }
    if (dEnd < bestDist && dEnd < 50) {
      bestDist = dEnd;
      bestEdge = i;
      bestReverse = true;
    }
  }

  if (bestEdge === null) {
    // 50mで見つからない場合、少し広い範囲（200m）で探す
    for (let i = 0; i < edges.length; i++) {
      if (visitedEdges.has(i)) continue;
      const e = edges[i];
      const dStart = distMeters(currentPoint, e.start);
      const dEnd = distMeters(currentPoint, e.end);
      if (dStart < bestDist && dStart < 300) {
        bestDist = dStart;
        bestEdge = i;
        bestReverse = false;
      }
      if (dEnd < bestDist && dEnd < 300) {
        bestDist = dEnd;
        bestEdge = i;
        bestReverse = true;
      }
    }
  }

  if (bestEdge === null) {
    console.log(`Could not find next edge at step ${step}. Current point:`, currentPoint);
    break;
  }

  visitedEdges.add(bestEdge);
  const chosen = edges[bestEdge];
  const pts = bestReverse ? [...chosen.pts].reverse() : [...chosen.pts];

  pathWays.push({ id: chosen.id, reversed: bestReverse, gap: bestDist });
  if (pathPoints.length === 0) {
    pathPoints.push(...pts);
  } else {
    // ギャップがわずかにある場合は直前の点から自然に接続
    pathPoints.push(...pts.slice(1));
  }

  currentPoint = pts[pts.length - 1];
  totalDistance += chosen.length + bestDist;
}

console.log(`Path construction done. Connected points: ${pathPoints.length}, Total distance: ${(totalDistance/1000).toFixed(2)}km`);
console.log('Final point:', currentPoint, 'Distance to Yorii:', distMeters(currentPoint, yoriiEnd).toFixed(1), 'm');

fs.writeFileSync('scripts/continuous_mainline_pts.json', JSON.stringify(pathPoints, null, 2), 'utf8');
