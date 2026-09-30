const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/overpass_tojo_raw.json', 'utf8'));
const ways = raw.elements.filter(e => e.type === 'way');

// 本線wayの抽出
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

function projectPointToSegment(p, a, b) {
  const ab = [b[0] - a[0], b[1] - a[1]];
  const ap = [p[0] - a[0], p[1] - a[1]];
  const abLenSq = ab[0] * ab[0] + ab[1] * ab[1];
  if (abLenSq === 0) return a;
  let t = (ap[0] * ab[0] + ap[1] * ab[1]) / abLenSq;
  t = Math.max(0, Math.min(1, t));
  return [a[0] + t * ab[0], a[1] + t * ab[1]];
}

// 基準となる各駅のおおよそのホーム位置（特にズレていた新河岸、若葉、東武竹沢、男衾などを線路の実位置で補正）
const RAW_STATIONS = [
  { id: 'TJ-01', number: 1, name: '池袋', lat: 35.7296, lng: 139.7104 },
  { id: 'TJ-02', number: 2, name: '北池袋', lat: 35.7412, lng: 139.7170 },
  { id: 'TJ-03', number: 3, name: '下板橋', lat: 35.7454, lng: 139.7152 },
  { id: 'TJ-04', number: 4, name: '大山', lat: 35.7492, lng: 139.7019 },
  { id: 'TJ-05', number: 5, name: '中板橋', lat: 35.7559, lng: 139.6952 },
  { id: 'TJ-06', number: 6, name: 'ときわ台', lat: 35.7587, lng: 139.6894 },
  { id: 'TJ-07', number: 7, name: '上板橋', lat: 35.7634, lng: 139.6766 },
  { id: 'TJ-08', number: 8, name: '東武練馬', lat: 35.7687, lng: 139.6617 },
  { id: 'TJ-09', number: 9, name: '下赤塚', lat: 35.7704, lng: 139.6451 },
  { id: 'TJ-10', number: 10, name: '成増', lat: 35.7774, lng: 139.6332 },
  { id: 'TJ-11', number: 11, name: '和光市', lat: 35.7884, lng: 139.6124 },
  { id: 'TJ-12', number: 12, name: '朝霞', lat: 35.7972, lng: 139.6001 },
  { id: 'TJ-13', number: 13, name: '朝霞台', lat: 35.8148, lng: 139.5869 },
  { id: 'TJ-14', number: 14, name: '志木', lat: 35.8222, lng: 139.5756 },
  { id: 'TJ-15', number: 15, name: '柳瀬川', lat: 35.8308, lng: 139.5621 },
  { id: 'TJ-16', number: 16, name: 'みずほ台', lat: 35.8382, lng: 139.5511 },
  { id: 'TJ-17', number: 17, name: '鶴瀬', lat: 35.8457, lng: 139.5396 },
  { id: 'TJ-18', number: 18, name: 'ふじみ野', lat: 35.8607, lng: 139.5232 },
  { id: 'TJ-19', number: 19, name: '上福岡', lat: 35.8730, lng: 139.5126 },
  { id: 'TJ-20', number: 20, name: '新河岸', lat: 35.8913, lng: 139.4968 }, // 実線路上に修正
  { id: 'TJ-21', number: 21, name: '川越', lat: 35.9072, lng: 139.4832 },
  { id: 'TJ-22', number: 22, name: '川越市', lat: 35.9152, lng: 139.4760 },
  { id: 'TJ-23', number: 23, name: '霞ヶ関', lat: 35.9256, lng: 139.4431 },
  { id: 'TJ-24', number: 24, name: '鶴ヶ島', lat: 35.9361, lng: 139.4250 },
  { id: 'TJ-25', number: 25, name: '若葉', lat: 35.9453, lng: 139.4132 },
  { id: 'TJ-26', number: 26, name: '坂戸', lat: 35.9572, lng: 139.3941 },
  { id: 'TJ-27', number: 27, name: '北坂戸', lat: 35.9731, lng: 139.3977 },
  { id: 'TJ-28', number: 28, name: '高坂', lat: 36.0028, lng: 139.3977 },
  { id: 'TJ-29', number: 29, name: '東松山', lat: 36.0355, lng: 139.4013 },
  { id: 'TJ-30', number: 30, name: '森林公園', lat: 36.0444, lng: 139.3788 },
  { id: 'TJ-31', number: 31, name: 'つきのわ', lat: 36.0452, lng: 139.3506 },
  { id: 'TJ-32', number: 32, name: '武蔵嵐山', lat: 36.0446, lng: 139.3274 },
  { id: 'TJ-33', number: 33, name: '小川町', lat: 36.0588, lng: 139.2606 },
  { id: 'TJ-34', number: 34, name: '東武竹沢', lat: 36.0794, lng: 139.2377 },
  { id: 'TJ-35', number: 35, name: 'みなみ寄居', lat: 36.0958, lng: 139.2350 },
  { id: 'TJ-36', number: 36, name: '男衾', lat: 36.1129, lng: 139.2245 },
  { id: 'TJ-37', number: 37, name: '鉢形', lat: 36.1147, lng: 139.2037 },
  { id: 'TJ-38', number: 38, name: '玉淀', lat: 36.1176, lng: 139.1946 },
  { id: 'TJ-39', number: 39, name: '寄居', lat: 36.1173, lng: 139.1929 }
];

// 全駅を本線way上の最短点（最近傍点）に100%完全スナップさせる
const EXACT_STATIONS = RAW_STATIONS.map(st => {
  let minDist = Infinity;
  let snapped = [st.lat, st.lng];

  mainlineWays.forEach(w => {
    for (let i = 0; i < w.geometry.length - 1; i++) {
      const p1 = [w.geometry[i].lat, w.geometry[i].lon];
      const p2 = [w.geometry[i + 1].lat, w.geometry[i + 1].lon];
      const proj = projectPointToSegment([st.lat, st.lng], p1, p2);
      const d = distMeters([st.lat, st.lng], proj);
      if (d < minDist) {
        minDist = d;
        snapped = proj;
      }
    }
  });

  return {
    ...st,
    lat: Number(snapped[0].toFixed(6)),
    lng: Number(snapped[1].toFixed(6)),
    snapDist: minDist
  };
});

console.log('--- EXACT STATION POSITIONS (SNAPPED TO MAINLINE TRACK) ---');
EXACT_STATIONS.forEach(s => {
  console.log(`${s.id} ${s.name.padEnd(5, ' ')}: [${s.lat}, ${s.lng}] (snap dist: ${s.snapDist.toFixed(1)}m)`);
});

fs.writeFileSync('scripts/exact_stations.json', JSON.stringify(EXACT_STATIONS, null, 2), 'utf8');
