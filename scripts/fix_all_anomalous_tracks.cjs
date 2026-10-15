const fs = require('fs');
const path = require('path');
const {
  buildWeightedGraph,
  snapEndpoints,
  dijkstraPath,
  distMeters,
  subdivideCoordinates
} = require('./common/geometryBuilderUtils.cjs');

async function main() {
  console.log('=== 🛠️ 全路線の軌道パス不適切箇所 一括完全修正 ===\n');

  // ==========================================
  // 1. 高崎線の修正 (TK-03_TK-04, TK-05_TK-06, TK-06_TK-07)
  // ==========================================
  console.log('--- 1. Fixing Takasaki Line (TK) ---');
  const utsunomiyaTrack = JSON.parse(fs.readFileSync('src/data/lines/utsunomiya/trackGeometry.ts', 'utf8').match(/=\s*(\[[\s\S]*\]);/)[1]);
  const takasakiTrackPath = 'src/data/lines/takasaki/trackGeometry.ts';
  const takasakiTrack = JSON.parse(fs.readFileSync(takasakiTrackPath, 'utf8').match(/=\s*(\[[\s\S]*\]);/)[1]);
  const takasakiStations = JSON.parse(fs.readFileSync('src/data/lines/takasaki/stations.ts', 'utf8').match(/=\s*(\[[\s\S]*\]);/)[1]);
  const tkStMap = new Map(takasakiStations.map(s => [s.id, s]));

  const ju0304 = utsunomiyaTrack.find(s => s.segmentId === 'JU-03_JU-04');
  const ju0506 = utsunomiyaTrack.find(s => s.segmentId === 'JU-05_JU-06');
  const ju0607 = utsunomiyaTrack.find(s => s.segmentId === 'JU-06_JU-07');

  for (const seg of takasakiTrack) {
    if (seg.segmentId === 'TK-03_TK-04' && ju0304) {
      seg.coordinates = ju0304.coordinates.slice();
      console.log('  Fixed TK-03_TK-04 (Oku -> Akabane) with Utsunomiya geometry');
    } else if (seg.segmentId === 'TK-05_TK-06' && ju0506) {
      seg.coordinates = ju0506.coordinates.slice();
      console.log('  Fixed TK-05_TK-06 (Urawa -> Saitama-Shintoshin) with Utsunomiya geometry');
    } else if (seg.segmentId === 'TK-06_TK-07' && ju0607) {
      seg.coordinates = ju0607.coordinates.slice();
      console.log('  Fixed TK-06_TK-07 (Saitama-Shintoshin -> Omiya) with Utsunomiya geometry');
    }

    // スナップ
    const s1 = tkStMap.get(seg.fromStationId);
    const s2 = tkStMap.get(seg.toStationId);
    if (s1 && s2) {
      seg.coordinates[0] = [s1.lat, s1.lng];
      seg.coordinates[seg.coordinates.length - 1] = [s2.lat, s2.lng];
    }
  }

  fs.writeFileSync(
    takasakiTrackPath,
    `import type { TrackSegment } from '../../../types';\n\nexport const TAKASAKI_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(takasakiTrack, null, 2)};\n`,
    'utf8'
  );
  console.log('  ✅ Takasaki Line trackGeometry.ts updated!');

  // ==========================================
  // 2. 横須賀線の修正 (JO-17_JO-16, JO-14_JO-13, JO-13_JO-12, JO-11_JO-10, JO-09_JO-08)
  // ==========================================
  console.log('\n--- 2. Fixing Yokosuka Line (JO) ---');
  const osmFilesYokosuka = [
    'cache/osm_rel_9477155_yokosuka_down.json',
    'cache/osm_rel_4673470_shonan_shinjuku_down.json',
    'cache/osm_rel_12200093_ueno_tokyo_down.json',
    'cache/osm_rel_11680902_tokaido_tokyo_atami.json',
  ];

  const nodeMapY = new Map();
  const allElementsY = [];
  for (const f of osmFilesYokosuka) {
    const p = path.resolve(__dirname, f);
    if (!fs.existsSync(p)) continue;
    const d = JSON.parse(fs.readFileSync(p, 'utf8'));
    for (const el of d.elements) {
      if (el.type === 'node') {
        if (!nodeMapY.has(el.id)) {
          nodeMapY.set(el.id, el);
          allElementsY.push(el);
        }
      } else {
        allElementsY.push(el);
      }
    }
  }

  const waysY = allElementsY.filter(e => e.type === 'way');
  const adjY = buildWeightedGraph(allElementsY, nodeMapY);
  snapEndpoints(waysY, nodeMapY, adjY, 30);

  function findNodeNear(lat, lng, maxD = 100) {
    let best = null;
    let minD = Infinity;
    for (const [id, neighbors] of adjY.entries()) {
      const n = nodeMapY.get(id);
      const d = distMeters([lat, lng], [n.lat, n.lon]);
      if (d < minD && d <= maxD) {
        minD = d;
        best = n;
      }
    }
    return best;
  }

  const yokosukaTrackPath = 'src/data/lines/yokosuka/trackGeometry.ts';
  const yokosukaTrack = JSON.parse(fs.readFileSync(yokosukaTrackPath, 'utf8').match(/=\s*(\[[\s\S]*\]);/)[1]);
  const yStations = JSON.parse(fs.readFileSync('src/data/lines/yokosuka/stations.ts', 'utf8').match(/=\s*(\[[\s\S]*\]);/)[1]);
  const yStMap = new Map(yStations.map(s => [s.id, s]));

  // 品川 -> 西大井 (JO-17_JO-16)
  const shinagawa = yStMap.get('JO-17');
  const nishioi = yStMap.get('JO-16');
  const nShinagawa = findNodeNear(shinagawa.lat, shinagawa.lng);
  const nNishioi = findNodeNear(nishioi.lat, nishioi.lng);
  const pathShinagawaNishioi = dijkstraPath(adjY, nodeMapY, nShinagawa.id, nNishioi.id);
  const coordsShinagawaNishioi = subdivideCoordinates(pathShinagawaNishioi.map(id => [nodeMapY.get(id).lat, nodeMapY.get(id).lon]), 100);

  // 新川崎 -> 横浜 (JO-14_JO-13)
  const shinkawasaki = yStMap.get('JO-14');
  const yokohama = yStMap.get('JO-13');
  const nShinkawasaki = findNodeNear(shinkawasaki.lat, shinkawasaki.lng);
  const nYokohama = findNodeNear(yokohama.lat, yokohama.lng);
  const pathShinkawasakiYokohama = dijkstraPath(adjY, nodeMapY, nShinkawasaki.id, nYokohama.id);
  const coordsShinkawasakiYokohama = subdivideCoordinates(pathShinkawasakiYokohama.map(id => [nodeMapY.get(id).lat, nodeMapY.get(id).lon]), 100);

  // 横浜 -> 保土ケ谷 (JO-13_JO-12)
  const hodogaya = yStMap.get('JO-12');
  const nHodogaya = findNodeNear(hodogaya.lat, hodogaya.lng);
  const pathYokohamaHodogaya = dijkstraPath(adjY, nodeMapY, nYokohama.id, nHodogaya.id);
  const coordsYokohamaHodogaya = subdivideCoordinates(pathYokohamaHodogaya.map(id => [nodeMapY.get(id).lat, nodeMapY.get(id).lon]), 100);

  // 大船 -> 北鎌倉 (JO-09_JO-08)
  const ofuna = yStMap.get('JO-09');
  const kitakamakura = yStMap.get('JO-08');
  // 大船ホーム南側ノード (1492652475) -> 北鎌倉 (3975815147)
  const nOfunaSouth = nodeMapY.get(1492652475);
  const nKitakamakura = nodeMapY.get(3975815147);
  const pathOfunaKitakamakura = dijkstraPath(adjY, nodeMapY, nOfunaSouth.id, nKitakamakura.id);
  const coordsOfunaKitakamakura = subdivideCoordinates(pathOfunaKitakamakura.map(id => [nodeMapY.get(id).lat, nodeMapY.get(id).lon]), 100);
  // 大船駅中心座標を先頭に挿入して駅間ギャップをゼロ化
  coordsOfunaKitakamakura.unshift([ofuna.lat, ofuna.lng]);

  for (const seg of yokosukaTrack) {
    if (seg.segmentId === 'JO-17_JO-16') {
      seg.coordinates = coordsShinagawaNishioi;
      console.log('  Fixed JO-17_JO-16 (Shinagawa -> Nishi-Oi)');
    } else if (seg.segmentId === 'JO-14_JO-13') {
      seg.coordinates = coordsShinkawasakiYokohama;
      console.log('  Fixed JO-14_JO-13 (Shin-Kawasaki -> Yokohama)');
    } else if (seg.segmentId === 'JO-13_JO-12') {
      seg.coordinates = coordsYokohamaHodogaya;
      console.log('  Fixed JO-13_JO-12 (Yokohama -> Hodogaya)');
    } else if (seg.segmentId === 'JO-11_JO-10' && seg.coordinates.length > 80) {
      // 東戸塚 -> 戸塚 の戸塚駅南側行き過ぎ＆逆走スパイクを解消
      const totsuka = yStMap.get('JO-10');
      // idx 76 [35.4006169, 139.5344609] 付近が戸塚駅
      seg.coordinates = seg.coordinates.slice(0, 77);
      seg.coordinates.push([totsuka.lat, totsuka.lng]);
      console.log('  Fixed JO-11_JO-10 (Higashi-Totsuka -> Totsuka overshoot & spike)');
    } else if (seg.segmentId === 'JO-09_JO-08') {
      seg.coordinates = coordsOfunaKitakamakura;
      console.log('  Fixed JO-09_JO-08 (Ofuna -> Kita-Kamakura)');
    }

    // 端点スナップ
    const s1 = yStMap.get(seg.fromStationId);
    const s2 = yStMap.get(seg.toStationId);
    if (s1 && s2) {
      seg.coordinates[0] = [s1.lat, s1.lng];
      seg.coordinates[seg.coordinates.length - 1] = [s2.lat, s2.lng];
    }
  }

  fs.writeFileSync(
    yokosukaTrackPath,
    `import type { TrackSegment } from '../../../types';\n\nexport const YOKOSUKA_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(yokosukaTrack, null, 2)};\n`,
    'utf8'
  );
  console.log('  ✅ Yokosuka Line trackGeometry.ts updated!');

  // ==========================================
  // 3. 上越線の修正 (土合駅・浦佐駅の座標スナップ、端点ギャップ解消)
  // ==========================================
  console.log('\n--- 3. Fixing Joetsu Line (JOE) ---');
  const joetsuStationsPath = 'src/data/lines/joetsu/stations.ts';
  const joetsuTrackPath = 'src/data/lines/joetsu/trackGeometry.ts';
  const joetsuStations = JSON.parse(fs.readFileSync(joetsuStationsPath, 'utf8').match(/=\s*(\[[\s\S]*\]);/)[1]);
  const joetsuTrack = JSON.parse(fs.readFileSync(joetsuTrackPath, 'utf8').match(/=\s*(\[[\s\S]*\]);/)[1]);

  // 湯檜曽駅 (JOE-15) の下りホーム位置に駅座標をスナップ (36.8030084, 138.9856167)
  const yubisoSt = joetsuStations.find(s => s.id === 'JOE-15');
  if (yubisoSt) {
    yubisoSt.lat = 36.8030084;
    yubisoSt.lng = 138.9856167;
    console.log('  Fixed Yubiso Station (JOE-15) coordinates to down platform position');
  }

  // 土合駅 (JOE-16) の線路位置に駅座標をスナップ (36.829534, 138.962617)
  const doaiSt = joetsuStations.find(s => s.id === 'JOE-16');
  if (doaiSt) {
    doaiSt.lat = 36.829534;
    doaiSt.lng = 138.962617;
    console.log('  Fixed Doai Station (JOE-16) coordinates to track position');
  }

  // 浦佐駅 (JOE-27) の上越線ホーム位置に駅座標をスナップ (37.1678091, 138.9228616)
  const urasaSt = joetsuStations.find(s => s.id === 'JOE-27');
  if (urasaSt) {
    urasaSt.lat = 37.1678091;
    urasaSt.lng = 138.9228616;
    console.log('  Fixed Urasa Station (JOE-27) coordinates to Joetsu Line platform position');
  }

  // 湯檜曽駅周辺の正規下り線ルート (新清水トンネル経由)
  const osmJoetsuPath = path.resolve(__dirname, 'cache/osm_joetsu.json');
  if (fs.existsSync(osmJoetsuPath)) {
    const osmJoetsuData = JSON.parse(fs.readFileSync(osmJoetsuPath, 'utf8'));
    const jNodeMap = new Map();
    const jElements = [];
    for (const el of osmJoetsuData.elements) {
      if (el.type === 'node') {
        jNodeMap.set(el.id, el);
        jElements.push(el);
      } else {
        jElements.push(el);
      }
    }
    const jWays = jElements.filter(e => e.type === 'way');
    const jAdj = buildWeightedGraph(jElements, jNodeMap);
    snapEndpoints(jWays, jNodeMap, jAdj, 30);

    const minakamiId = 264814419;
    const yubisoDownId = 264814630;
    const doaiDownId = 264816040;

    const pathMinakamiYubiso = dijkstraPath(jAdj, jNodeMap, minakamiId, yubisoDownId);
    const pathYubisoDoai = dijkstraPath(jAdj, jNodeMap, yubisoDownId, doaiDownId);

    const seg14_15 = joetsuTrack.find(s => s.segmentId === 'JOE-14_JOE-15');
    if (seg14_15 && pathMinakamiYubiso) {
      seg14_15.coordinates = subdivideCoordinates(pathMinakamiYubiso.map(id => [jNodeMap.get(id).lat, jNodeMap.get(id).lon]), 100);
      console.log('  Fixed JOE-14_JOE-15 (Minakami -> Yubiso down track)');
    }

    const seg15_16 = joetsuTrack.find(s => s.segmentId === 'JOE-15_JOE-16');
    if (seg15_16 && pathYubisoDoai) {
      seg15_16.coordinates = subdivideCoordinates(pathYubisoDoai.map(id => [jNodeMap.get(id).lat, jNodeMap.get(id).lon]), 100);
      console.log('  Fixed JOE-15_JOE-16 (Yubiso -> Doai down track, eliminated 1.3km overshoot U-turn)');
    }
  }

  // セグメント端点を駅座標にスナップ
  const jStMap = new Map(joetsuStations.map(s => [s.id, s]));
  for (let i = 0; i < joetsuTrack.length; i++) {
    const seg = joetsuTrack[i];
    const s1 = jStMap.get(seg.fromStationId);
    const s2 = jStMap.get(seg.toStationId);
    if (!s1 || !s2) continue;

    seg.coordinates[0] = [s1.lat, s1.lng];
    seg.coordinates[seg.coordinates.length - 1] = [s2.lat, s2.lng];
  }

  fs.writeFileSync(
    joetsuStationsPath,
    `import type { Station } from '../../../types';\n\nexport const JOETSU_STATIONS: Station[] = ${JSON.stringify(joetsuStations, null, 2)};\n`,
    'utf8'
  );
  fs.writeFileSync(
    joetsuTrackPath,
    `import type { TrackSegment } from '../../../types';\n\nexport const JOETSU_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(joetsuTrack, null, 2)};\n`,
    'utf8'
  );
  console.log('  ✅ Joetsu Line stations.ts & trackGeometry.ts updated!');

  // ==========================================
  // 4. 東海道線の修正 (大船駅行き過ぎ・Uターン・藤沢駅行き過ぎの解消)
  // ==========================================
  console.log('\n--- 4. Fixing Tokaido Line (JT) ---');
  const tokaidoTrackPath = 'src/data/lines/tokaido/trackGeometry.ts';
  const tokaidoTrack = JSON.parse(fs.readFileSync(tokaidoTrackPath, 'utf8').match(/=\s*(\[[\s\S]*\]);/)[1]);
  const tokaidoStations = JSON.parse(fs.readFileSync('src/data/lines/tokaido/stations.ts', 'utf8').match(/=\s*(\[[\s\S]*\]);/)[1]);
  const tStMap = new Map(tokaidoStations.map(s => [s.id, s]));

  for (let i = 0; i < tokaidoTrack.length; i++) {
    const seg = tokaidoTrack[i];
    if (seg.segmentId === 'JT-06_JT-07' && seg.coordinates.length > 270) {
      // 戸塚 -> 大船: idx 268以降の大船南側行き過ぎをカット
      const ofuna = tStMap.get('JT-07');
      seg.coordinates = seg.coordinates.slice(0, 268);
      seg.coordinates.push([ofuna.lat, ofuna.lng]);
      console.log('  Fixed JT-06_JT-07 (Totsuka -> Ofuna overshoot & spike)');
    } else if (seg.segmentId === 'JT-07_JT-08' && seg.coordinates.length > 260) {
      // 大船 -> 藤沢: 大船北側への逆走Uターンループ (idx 1..23) と藤沢駅西側への行き過ぎ (idx 276以降) をカット
      const ofuna = tStMap.get('JT-07');
      const fujisawa = tStMap.get('JT-08');
      const southTrunk = seg.coordinates.slice(24, 276);
      seg.coordinates = [[ofuna.lat, ofuna.lng], ...southTrunk, [fujisawa.lat, fujisawa.lng]];
      console.log('  Fixed JT-07_JT-08 (Ofuna -> Fujisawa U-turn loop & overshoot)');
    }

    const s1 = tStMap.get(seg.fromStationId);
    const s2 = tStMap.get(seg.toStationId);
    if (!s1 || !s2) continue;
    seg.coordinates[0] = [s1.lat, s1.lng];
    seg.coordinates[seg.coordinates.length - 1] = [s2.lat, s2.lng];
  }

  fs.writeFileSync(
    tokaidoTrackPath,
    `import type { TrackSegment } from '../../../types';\n\nexport const TOKAIDO_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(tokaidoTrack, null, 2)};\n`,
    'utf8'
  );
  console.log('  ✅ Tokaido Line trackGeometry.ts updated!');

  // ==========================================
  // 5. 両毛線の国定〜伊勢崎のシャープターン解消 (RY-13_RY-14)
  // ==========================================
  console.log('\n--- 5. Fixing Ryomo Line (RY) ---');
  const ryomoTrackPath = 'src/data/lines/ryomo/trackGeometry.ts';
  const ryomoTrack = JSON.parse(fs.readFileSync(ryomoTrackPath, 'utf8').match(/=\s*(\[[\s\S]*\]);/)[1]);

  for (const seg of ryomoTrack) {
    if (seg.segmentId === 'RY-13_RY-14') {
      const coords = seg.coordinates;
      const cleaned = [coords[0]];
      for (let j = 1; j < coords.length - 1; j++) {
        const p1 = coords[j - 1];
        const p2 = coords[j];
        const p3 = coords[j + 1];
        const v1 = [p2[0] - p1[0], p2[1] - p1[1]];
        const v2 = [p3[0] - p2[0], p3[1] - p2[1]];
        const dot = v1[0] * v2[0] + v1[1] * v2[1];
        const m1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
        const m2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
        const cos = m1 && m2 ? dot / (m1 * m2) : 1;
        const deg = (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI;
        if (deg < 135) {
          cleaned.push(p2);
        } else {
          console.log(`  Removed sharp spike in RY-13_RY-14 at [${p2[0]}, ${p2[1]}] (angle: ${deg.toFixed(1)} deg)`);
        }
      }
      cleaned.push(coords[coords.length - 1]);
      seg.coordinates = cleaned;
    }
  }

  fs.writeFileSync(
    ryomoTrackPath,
    `import type { TrackSegment } from '../../../types';\n\nexport const RYOMO_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(ryomoTrack, null, 2)};\n`,
    'utf8'
  );
  console.log('  ✅ Ryomo Line trackGeometry.ts updated!');

  console.log('\n🎉 ALL TRACK ANOMALIES COMPLETELY FIXED!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
