const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/overpass_tojo_raw.json', 'utf8'));
const ways = raw.elements.filter(e => e.type === 'way');

// 東武東上線に該当するwayを絞り込み
// 1. serviceタグがない（またはmain）、かつ name が '東武東上線' または none で東武東上線沿線のもの
// 2. 越生線、日光線、野田線、伊勢崎線は明示的に除外
const tojoWays = ways.filter(w => {
  const tags = w.tags || {};
  const name = tags.name || '';
  if (name.includes('越生') || name.includes('日光') || name.includes('野田') || name.includes('伊勢崎')) {
    return false;
  }
  // service: siding, yard, spur, crossover は本線ではないので除外
  if (tags.service && ['siding', 'yard', 'spur', 'crossover'].includes(tags.service)) {
    return false;
  }
  // 経度・緯度チェック: 東上線の範囲 (池袋 35.72〜寄居 36.13, 経度 139.18〜139.72)
  const geom = w.geometry || [];
  if (geom.length < 2) return false;
  const first = geom[0];
  if (first.lat < 35.71 || first.lat > 36.14 || first.lon < 139.18 || first.lon > 139.73) return false;

  return true;
});

console.log('Filtered mainline Tojo ways:', tojoWays.length);

// 駅ごとの最近傍wayと距離を調査
const STATIONS = [
  { id: 'TJ-01', name: '池袋', lat: 35.7289, lng: 139.7113 },
  { id: 'TJ-11', name: '和光市', lat: 35.7884, lng: 139.6124 },
  { id: 'TJ-12', name: '朝霞', lat: 35.7972, lng: 139.6001 },
  { id: 'TJ-20', name: '新河岸', lat: 35.8911, lng: 139.5085 },
  { id: 'TJ-21', name: '川越', lat: 35.9069, lng: 139.4828 },
  { id: 'TJ-22', name: '川越市', lat: 35.9144, lng: 139.4749 },
  { id: 'TJ-26', name: '坂戸', lat: 35.9576, lng: 139.3941 },
];

function distSq(p1, p2) {
  const dLat = p1[0] - p2[0];
  const dLng = p1[1] - p2[1];
  return dLat * dLat + dLng * dLng;
}

STATIONS.forEach(st => {
  let minDist = Infinity;
  let closestPoint = null;
  tojoWays.forEach(w => {
    w.geometry.forEach(pt => {
      const d = distSq([st.lat, st.lng], [pt.lat, pt.lon]);
      if (d < minDist) {
        minDist = d;
        closestPoint = pt;
      }
    });
  });
  console.log(`Station ${st.name}: distance to nearest track point is ${(Math.sqrt(minDist) * 111000).toFixed(1)}m. Nearest: [${closestPoint.lat}, ${closestPoint.lon}] vs Station: [${st.lat}, ${st.lng}]`);
});
