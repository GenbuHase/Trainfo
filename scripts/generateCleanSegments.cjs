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

// 2点間の直線距離
function distSq(p1, p2) {
  const dLat = p1[0] - p2[0];
  const dLng = p1[1] - p2[1];
  return dLat * dLat + dLng * dLng;
}

const accurateSegments = [];

for (let i = 0; i < exactStations.length - 1; i++) {
  const s1 = exactStations[i];
  const s2 = exactStations[i + 1];

  // s1とs2を包含するバウンディングボックス
  const minLat = Math.min(s1.lat, s2.lat) - 0.003;
  const maxLat = Math.max(s1.lat, s2.lat) + 0.003;
  const minLng = Math.min(s1.lng, s2.lng) - 0.003;
  const maxLng = Math.max(s1.lng, s2.lng) + 0.003;

  // 区間内にある本線way
  const segmentWays = mainlineWays.filter(w => {
    return w.geometry.some(pt => pt.lat >= minLat && pt.lat <= maxLat && pt.lon >= minLng && pt.lon <= maxLng);
  });

  // 各wayについて、s1 -> s2 向き（s1からの距離が増加する向き）に揃える
  // 複数の並行線（上り・下り）がある場合、s1に最も近いwayから順にチェーンで繋ぐ
  const candidatePoints = [];
  segmentWays.forEach(w => {
    const pts = w.geometry.map(pt => [pt.lat, pt.lon]);
    candidatePoints.push(pts);
  });

  // s1 から s2 までの最短・最滑らかな軌道を探索
  // 候補点すべてから、s1とs2を結ぶ線分に対するプロジェクション比率 u を計算
  const dLat = s2.lat - s1.lat;
  const dLng = s2.lng - s1.lng;
  const segLenSq = dLat * dLat + dLng * dLng;

  // 全中間ポイントを収集
  const rawPts = [];
  candidatePoints.forEach(pts => {
    pts.forEach(pt => {
      const u = ((pt[0] - s1.lat) * dLat + (pt[1] - s1.lng) * dLng) / segLenSq;
      // 区間の間 (0.01 < u < 0.99) にある点
      if (u > 0.01 && u < 0.99) {
        // 線分からの垂直距離が適正な範囲
        const projLat = s1.lat + u * dLat;
        const projLng = s1.lng + u * dLng;
        const perpDistMeters = distMeters(pt, [projLat, projLng]);
        if (perpDistMeters < 1500) { // 東上線のカーブ範囲内
          rawPts.push({ pt, u, perp: perpDistMeters });
        }
      }
    });
  });

  // u でソート
  rawPts.sort((a, b) => a.u - b.u);

  // ジグザグ（複線の行ったり来たりや側線）を除去するためのクラスタリング＆フィルタリング
  // u の間隔を微小ステップ（例: 0.02）ごとに区切り、各ステップで1つの最適な代表点を選ぶ
  const filteredPts = [];
  let lastU = 0;
  let lastPt = [s1.lat, s1.lng];

  for (const item of rawPts) {
    // 進行方向への進みが小さすぎる（0.005未満）または後戻りはスキップ
    if (item.u - lastU < 0.005) continue;

    // 前の点からの距離が急激に離れる（200m以上など、線路外へ飛ぶ）ものはスキップ
    const d = distMeters(lastPt, item.pt);
    if (d > 350) continue;

    filteredPts.push(item.pt);
    lastU = item.u;
    lastPt = item.pt;
  }

  // 始点 s1 と 終点 s2 を連結
  const finalCoords = [
    [s1.lat, s1.lng],
    ...filteredPts,
    [s2.lat, s2.lng]
  ];

  // 丸め処理 (小数点第6位)
  const cleanCoords = finalCoords.map(p => [Number(p[0].toFixed(6)), Number(p[1].toFixed(6))]);

  accurateSegments.push({
    fromStationId: s1.id,
    toStationId: s2.id,
    fromName: s1.name,
    toName: s2.name,
    coordinates: cleanCoords
  });
}

console.log('Successfully generated accurate segments for all 38 hops!');
const totalPts = accurateSegments.reduce((sum, s) => sum + s.coordinates.length, 0);
console.log('Total coordinates in refined line:', totalPts);

// サンプル確認 (和光市〜朝霞、新河岸、川越市、坂戸)
const wakoshiToAsaka = accurateSegments.find(s => s.fromName === '和光市');
console.log('和光市〜朝霞 points:', wakoshiToAsaka.coordinates.length, 'coords:', wakoshiToAsaka.coordinates.slice(0, 3));

const fujiminoToShingashi = accurateSegments.find(s => s.toName === '新河岸');
console.log('上福岡〜新河岸 points:', fujiminoToShingashi.coordinates.length, 'coords:', fujiminoToShingashi.coordinates.slice(0, 3));

fs.writeFileSync('scripts/clean_accurate_segments.json', JSON.stringify(accurateSegments, null, 2), 'utf8');
console.log('Saved to scripts/clean_accurate_segments.json');
