const fs = require('fs');

// 駅座標
const STATIONS = [
  { id: 'TJ-01', number: 1, name: '池袋', lat: 35.7289, lng: 139.7113 },
  { id: 'TJ-02', number: 2, name: '北池袋', lat: 35.7410, lng: 139.7175 },
  { id: 'TJ-03', number: 3, name: '下板橋', lat: 35.7456, lng: 139.7153 },
  { id: 'TJ-04', number: 4, name: '大山', lat: 35.7495, lng: 139.7027 },
  { id: 'TJ-05', number: 5, name: '中板橋', lat: 35.7562, lng: 139.6953 },
  { id: 'TJ-06', number: 6, name: 'ときわ台', lat: 35.7588, lng: 139.6894 },
  { id: 'TJ-07', number: 7, name: '上板橋', lat: 35.7634, lng: 139.6766 },
  { id: 'TJ-08', number: 8, name: '東武練馬', lat: 35.7687, lng: 139.6617 },
  { id: 'TJ-09', number: 9, name: '下赤塚', lat: 35.7702, lng: 139.6450 },
  { id: 'TJ-10', number: 10, name: '成増', lat: 35.7770, lng: 139.6329 },
  { id: 'TJ-11', number: 11, name: '和光市', lat: 35.7884, lng: 139.6124 },
  { id: 'TJ-12', number: 12, name: '朝霞', lat: 35.7972, lng: 139.6001 },
  { id: 'TJ-13', number: 13, name: '朝霞台', lat: 35.8153, lng: 139.5872 },
  { id: 'TJ-14', number: 14, name: '志木', lat: 35.8222, lng: 139.5756 },
  { id: 'TJ-15', number: 15, name: '柳瀬川', lat: 35.8296, lng: 139.5606 },
  { id: 'TJ-16', number: 16, name: 'みずほ台', lat: 35.8385, lng: 139.5513 },
  { id: 'TJ-17', number: 17, name: '鶴瀬', lat: 35.8458, lng: 139.5397 },
  { id: 'TJ-18', number: 18, name: 'ふじみ野', lat: 35.8608, lng: 139.5233 },
  { id: 'TJ-19', number: 19, name: '上福岡', lat: 35.8741, lng: 139.5140 },
  { id: 'TJ-20', number: 20, name: '新河岸', lat: 35.8911, lng: 139.5085 },
  { id: 'TJ-21', number: 21, name: '川越', lat: 35.9069, lng: 139.4828 },
  { id: 'TJ-22', number: 22, name: '川越市', lat: 35.9144, lng: 139.4749 },
  { id: 'TJ-23', number: 23, name: '霞ヶ関', lat: 35.9255, lng: 139.4431 },
  { id: 'TJ-24', number: 24, name: '鶴ヶ島', lat: 35.9378, lng: 139.4264 },
  { id: 'TJ-25', number: 25, name: '若葉', lat: 35.9497, lng: 139.4187 },
  { id: 'TJ-26', number: 26, name: '坂戸', lat: 35.9576, lng: 139.3941 },
  { id: 'TJ-27', number: 27, name: '北坂戸', lat: 35.9723, lng: 139.3995 },
  { id: 'TJ-28', number: 28, name: '高坂', lat: 36.0028, lng: 139.3978 },
  { id: 'TJ-29', number: 29, name: '東松山', lat: 36.0354, lng: 139.4011 },
  { id: 'TJ-30', number: 30, name: '森林公園', lat: 36.0447, lng: 139.3789 },
  { id: 'TJ-31', number: 31, name: 'つきのわ', lat: 36.0441, lng: 139.3510 },
  { id: 'TJ-32', number: 32, name: '武蔵嵐山', lat: 36.0450, lng: 139.3276 },
  { id: 'TJ-33', number: 33, name: '小川町', lat: 36.0594, lng: 139.2608 },
  { id: 'TJ-34', number: 34, name: '東武竹沢', lat: 36.0792, lng: 139.2452 },
  { id: 'TJ-35', number: 35, name: 'みなみ寄居', lat: 36.0950, lng: 139.2335 },
  { id: 'TJ-36', number: 36, name: '男衾', lat: 36.1083, lng: 139.2244 },
  { id: 'TJ-37', number: 37, name: '鉢形', lat: 36.1159, lng: 139.2045 },
  { id: 'TJ-38', number: 38, name: '玉淀', lat: 36.1157, lng: 139.1953 },
  { id: 'TJ-39', number: 39, name: '寄居', lat: 36.1182, lng: 139.1901 }
];

function distSq(p1, p2) {
  const dLat = p1[0] - p2[0];
  const dLng = p1[1] - p2[1];
  return dLat * dLat + dLng * dLng;
}

const raw = JSON.parse(fs.readFileSync('scripts/overpass_tojo_raw.json', 'utf8'));
const ways = raw.elements.filter(e => e.type === 'way' && e.geometry && e.geometry.length > 1);
console.log('Total valid ways:', ways.length);

// 各wayのジオメトリを [lat, lon] の配列として取得
const waySegments = ways.map(w => w.geometry.map(pt => [pt.lat, pt.lon]));

// 各駅に最も近いwayポイントを見つけ、順序通りにパスを構築
// 始点: 池袋 (35.7289, 139.7113) -> 終点: 寄居 (36.1182, 139.1901)
// グラフ探索または駅間最近傍ウェイ検索
const stationSegments = [];

for (let i = 0; i < STATIONS.length - 1; i++) {
  const s1 = STATIONS[i];
  const s2 = STATIONS[i + 1];

  // s1とs2の間にあるwaysを探す
  const minLat = Math.min(s1.lat, s2.lat) - 0.005;
  const maxLat = Math.max(s1.lat, s2.lat) + 0.005;
  const minLng = Math.min(s1.lng, s2.lng) - 0.005;
  const maxLng = Math.max(s1.lng, s2.lng) + 0.005;

  const candidateWays = waySegments.filter(w => {
    return w.some(pt => pt[0] >= minLat && pt[0] <= maxLat && pt[1] >= minLng && pt[1] <= maxLng);
  });

  // candidateWays の全ポイントを収集
  const allPts = [];
  candidateWays.forEach(w => allPts.push(...w));

  // 重複除去
  const uniquePts = [];
  const seen = new Set();
  allPts.forEach(pt => {
    const key = `${pt[0].toFixed(5)},${pt[1].toFixed(5)}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniquePts.push(pt);
    }
  });

  // s1からの距離比率でソート (s1 -> s2 へのプロジェクション)
  const dLat = s2.lat - s1.lat;
  const dLng = s2.lng - s1.lng;
  const segLenSq = dLat * dLat + dLng * dLng;

  const scoredPts = uniquePts.map(pt => {
    const u = ((pt[0] - s1.lat) * dLat + (pt[1] - s1.lng) * dLng) / segLenSq;
    const projLat = s1.lat + u * dLat;
    const projLng = s1.lng + u * dLng;
    const perpDistSq = distSq(pt, [projLat, projLng]);
    return { pt, u, perpDistSq };
  }).filter(item => item.u >= -0.05 && item.u <= 1.05 && item.perpDistSq < 0.0001); // 線路から近傍

  scoredPts.sort((a, b) => a.u - b.u);

  // 整理された中間点
  const intermediate = scoredPts
    .map(item => [Number(item.pt[0].toFixed(6)), Number(item.pt[1].toFixed(6))])
    .filter((pt, idx, arr) => {
      if (idx === 0) return true;
      return distSq(pt, arr[idx - 1]) > 0.0000001; // 近すぎる点を除去
    });

  const fullCoords = [
    [s1.lat, s1.lng],
    ...intermediate,
    [s2.lat, s2.lng]
  ];

  stationSegments.push({
    fromStationId: s1.id,
    toStationId: s2.id,
    fromName: s1.name,
    toName: s2.name,
    coordinates: fullCoords
  });
}

console.log('Constructed segments for', stationSegments.length, 'station hops.');
const totalPoints = stationSegments.reduce((sum, s) => sum + s.coordinates.length, 0);
console.log('Total coordinates in full line:', totalPoints);

fs.writeFileSync('scripts/accurate_track_segments.json', JSON.stringify(stationSegments, null, 2), 'utf8');
console.log('Saved to scripts/accurate_track_segments.json');
