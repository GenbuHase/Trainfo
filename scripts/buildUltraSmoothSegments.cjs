const fs = require('fs');

const exactStations = JSON.parse(fs.readFileSync('scripts/exact_stations.json', 'utf8'));
const raw = JSON.parse(fs.readFileSync('scripts/overpass_tojo_raw.json', 'utf8'));
const ways = raw.elements.filter(e => e.type === 'way');

// 本線wayのみ抽出
const mainlineWays = ways.filter(w => {
  const tags = w.tags || {};
  const name = tags.name || '';
  if (name.includes('越生') || name.includes('日光') || name.includes('野田') || name.includes('伊勢崎')) return false;
  if (tags.service && ['siding', 'yard', 'spur', 'crossover'].includes(tags.service)) return false;
  const geom = w.geometry || [];
  if (geom.length < 2) return false;
  return true;
});

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

const refinedSegments = [];

for (let i = 0; i < exactStations.length - 1; i++) {
  const s1 = exactStations[i];
  const s2 = exactStations[i + 1];

  const minLat = Math.min(s1.lat, s2.lat) - 0.003;
  const maxLat = Math.max(s1.lat, s2.lat) + 0.003;
  const minLng = Math.min(s1.lng, s2.lng) - 0.003;
  const maxLng = Math.max(s1.lng, s2.lng) + 0.003;

  const segmentWays = mainlineWays.filter(w => {
    return w.geometry.some(pt => pt.lat >= minLat && pt.lat <= maxLat && pt.lon >= minLng && pt.lon <= maxLng);
  });

  const dLat = s2.lat - s1.lat;
  const dLng = s2.lng - s1.lng;
  const segLenSq = dLat * dLat + dLng * dLng;

  // 全候補ポイントを射影比率 u と共に抽出
  const rawPts = [];
  segmentWays.forEach(w => {
    w.geometry.forEach(pt => {
      const u = ((pt.lat - s1.lat) * dLat + (pt.lon - s1.lng) * dLng) / segLenSq;
      if (u > 0.01 && u < 0.99) {
        const projLat = s1.lat + u * dLat;
        const projLng = s1.lng + u * dLng;
        const perp = distMeters([pt.lat, pt.lon], [projLat, projLng]);
        if (perp < 1200) {
          rawPts.push({ lat: pt.lat, lng: pt.lon, u, perp });
        }
      }
    });
  });

  // u でソート
  rawPts.sort((a, b) => a.u - b.u);

  // グリーディ探索による最短・最滑らかパス構築
  // s1 から始めて、次に進む点として「uが増加し、かつ折れ曲がり角が小さく、距離が適切な点」を選択
  const path = [[s1.lat, s1.lng]];
  let current = [s1.lat, s1.lng];
  let currentU = 0;

  while (currentU < 0.95) {
    // currentより前方にあり、適正距離（15m〜150m）にある候補を探す
    const nextCandidates = rawPts.filter(p => p.u > currentU + 0.008 && p.u < currentU + 0.15);
    if (nextCandidates.length === 0) {
      // 候補がなければ少し広げる
      const wider = rawPts.filter(p => p.u > currentU + 0.005 && p.u < currentU + 0.3);
      if (wider.length === 0) break;
      nextCandidates.push(...wider);
    }

    // 候補の中から最も滑らかな点（折れ曲がり角が小さく、s1->s2の線路ラインに沿うもの）を選ぶ
    let best = null;
    let bestScore = Infinity;

    for (const cand of nextCandidates) {
      const pt = [cand.lat, cand.lng];
      const d = distMeters(current, pt);
      if (d < 10) continue; // 近すぎる

      let angle = 0;
      if (path.length >= 2) {
        const prev = path[path.length - 2];
        angle = calculateTurnAngle(prev, current, pt);
      } else {
        // s1から最初の点への角度
        const initialDir = [s2.lat - s1.lat, s2.lng - s1.lng];
        const stepDir = [pt[0] - current[0], pt[1] - current[1]];
        const dot = initialDir[0] * stepDir[0] + initialDir[1] * stepDir[1];
        const m1 = Math.sqrt(initialDir[0] * initialDir[0] + initialDir[1] * initialDir[1]);
        const m2 = Math.sqrt(stepDir[0] * stepDir[0] + stepDir[1] * stepDir[1]);
        angle = Math.acos(Math.max(-1, Math.min(1, dot / (m1 * m2)))) * (180 / Math.PI);
      }

      // 折れ曲がり角が45度を超えるものは鉄道として不自然なのでペナルティ大
      if (angle > 50) continue;

      const score = angle * 2 + d * 0.1 + cand.perp * 0.05;
      if (score < bestScore) {
        bestScore = score;
        best = { pt, u: cand.u };
      }
    }

    if (!best) {
      // 候補がない場合は現在の候補の中で一番uが大きいものを探す
      const forward = rawPts.find(p => p.u > currentU + 0.02);
      if (!forward) break;
      best = { pt: [forward.lat, forward.lng], u: forward.u };
    }

    path.push(best.pt);
    current = best.pt;
    currentU = best.u;
  }

  // 終点 s2 を追加
  path.push([s2.lat, s2.lng]);

  // 重複・急角の除去パス
  const finalClean = [];
  for (let j = 0; j < path.length; j++) {
    if (j === 0 || j === path.length - 1) {
      finalClean.push(path[j]);
      continue;
    }
    const prev = finalClean[finalClean.length - 1];
    const cur = path[j];
    const next = path[j + 1];
    const angle = calculateTurnAngle(prev, cur, next);
    // 鋭角（60度以上）の場合は中間点curを除去して直結
    if (angle > 55) {
      continue;
    }
    finalClean.push(cur);
  }

  refinedSegments.push({
    fromStationId: s1.id,
    toStationId: s2.id,
    fromName: s1.name,
    toName: s2.name,
    coordinates: finalClean.map(p => [Number(p[0].toFixed(6)), Number(p[1].toFixed(6))])
  });
}

console.log('Successfully built refined smooth segments for all 38 hops!');

// 滑らかさ検証
let turnsCount = 0;
refinedSegments.forEach(seg => {
  const coords = seg.coordinates;
  for (let i = 0; i < coords.length - 2; i++) {
    const angle = calculateTurnAngle(coords[i], coords[i + 1], coords[i + 2]);
    if (angle > 60) {
      console.log(`Remaining sharp turn in ${seg.fromName}->${seg.toName} at ${i}: ${angle.toFixed(1)}°`);
      turnsCount++;
    }
  }
});

console.log(`Total sharp turns remaining: ${turnsCount}`);
fs.writeFileSync('scripts/ultra_smooth_segments.json', JSON.stringify(refinedSegments, null, 2), 'utf8');
