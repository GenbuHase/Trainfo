/**
 * scan_stations_position.cjs
 * 全70路線の全駅を対象に、位置ズレ・座標乖離を完全走査するスクリプト
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ts = require('typescript');

const LINES_DIR = path.join(__dirname, '../src/data/lines');

// 2点間の距離（メートル）
function distMeters(c1, c2) {
  const R = 6371000;
  const dLat = ((c2[0] - c1[0]) * Math.PI) / 180;
  const dLon = ((c2[1] - c1[1]) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((c1[0] * Math.PI) / 180) *
    Math.cos((c2[0] * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 点Pから線分ABへの最短距離(m)と最寄り点
function distToSegment(p, a, b) {
  const dAB2 = (b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2;
  if (dAB2 === 0) return { dist: distMeters(p, a), nearest: a };

  let t = ((p[0] - a[0]) * (b[0] - a[0]) + (p[1] - a[1]) * (b[1] - a[1])) / dAB2;
  t = Math.max(0, Math.min(1, t));

  const nearest = [
    a[0] + t * (b[0] - a[0]),
    a[1] + t * (b[1] - a[1])
  ];
  return { dist: distMeters(p, nearest), nearest, t };
}

// TypeScript ファイルをロードして export オブジェクトを取得
function loadTsFile(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const rawTs = fs.readFileSync(filePath, 'utf8');

  // import 文を除去（モジュール依存を断つ）
  const sanitizedTs = rawTs.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '');

  const jsCode = ts.transpileModule(sanitizedTs, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;

  const sandbox = { exports: {}, require: () => ({}) };
  vm.createContext(sandbox);
  try {
    vm.runInContext(jsCode, sandbox);
    return sandbox.exports;
  } catch (err) {
    console.error(`Error executing ${filePath}:`, err.message);
    return null;
  }
}

function main() {
  const lineDirs = fs.readdirSync(LINES_DIR).filter(d => fs.statSync(path.join(LINES_DIR, d)).isDirectory());

  const allStations = []; // 全駅リスト
  const lineStationsMap = new Map();
  const lineSegmentsMap = new Map();

  for (const lineId of lineDirs) {
    const stationsPath = path.join(LINES_DIR, lineId, 'stations.ts');
    const trackPath = path.join(LINES_DIR, lineId, 'trackGeometry.ts');

    const stExports = loadTsFile(stationsPath);
    if (!stExports) continue;

    // stations 配列を探す
    let stations = null;
    for (const key of Object.keys(stExports)) {
      if (Array.isArray(stExports[key]) && stExports[key].length > 0 && stExports[key][0].id && stExports[key][0].lat !== undefined) {
        stations = stExports[key];
        break;
      }
    }
    if (!stations) {
      console.warn(`[WARN] 駅データが見つかりません: ${lineId}`);
      continue;
    }

    lineStationsMap.set(lineId, stations);
    for (const st of stations) {
      allStations.push({ ...st, lineId });
    }

    // trackSegments 配列を探す
    const trExports = loadTsFile(trackPath);
    if (trExports) {
      let segments = null;
      for (const key of Object.keys(trExports)) {
        if (Array.isArray(trExports[key]) && trExports[key].length > 0 && trExports[key][0].id && trExports[key][0].coordinates) {
          segments = trExports[key];
          break;
        }
      }
      if (segments) {
        lineSegmentsMap.set(lineId, segments);
      }
    }
  }

  console.log(`================================================================`);
  console.log(` 全駅 走査結果サマリー`);
  console.log(`================================================================`);
  console.log(`  読み込み路線数: ${lineStationsMap.size}`);
  console.log(`  総登録駅数:     ${allStations.length}`);

  // 1. 各駅と該当路線のセグメント端点との完全一致・ズレ走査
  const endpointDiscrepancies = [];
  const trackDistanceDiscrepancies = [];

  for (const [lineId, stations] of lineStationsMap.entries()) {
    const segments = lineSegmentsMap.get(lineId) || [];
    const stationMap = new Map(stations.map(s => [s.id, s]));

    for (const st of stations) {
      const stCoord = [st.lat, st.lng];

      // この駅を開始とするセグメント
      const asStart = segments.filter(s => s.startStationId === st.id);
      for (const seg of asStart) {
        const segCoord = seg.coordinates[0];
        const d = distMeters(stCoord, segCoord);
        if (d > 0.05) { // 5cm以上のズレ
          endpointDiscrepancies.push({
            lineId,
            stationId: st.id,
            stationName: st.name,
            segmentId: seg.id,
            role: 'start',
            distMeters: Math.round(d * 100) / 100,
            stationCoord: stCoord,
            segmentCoord: segCoord,
          });
        }
      }

      // この駅を終了とするセグメント
      const asEnd = segments.filter(s => s.endStationId === st.id);
      for (const seg of asEnd) {
        const segCoord = seg.coordinates[seg.coordinates.length - 1];
        const d = distMeters(stCoord, segCoord);
        if (d > 0.05) { // 5cm以上のズレ
          endpointDiscrepancies.push({
            lineId,
            stationId: st.id,
            stationName: st.name,
            segmentId: seg.id,
            role: 'end',
            distMeters: Math.round(d * 100) / 100,
            stationCoord: stCoord,
            segmentCoord: segCoord,
          });
        }
      }

      // 駅と線路全体の最近接距離（線路からの乖離）
      let minTrackDist = Infinity;
      let nearestCoord = null;
      for (const seg of segments) {
        for (let i = 0; i < seg.coordinates.length - 1; i++) {
          const res = distToSegment(stCoord, seg.coordinates[i], seg.coordinates[i + 1]);
          if (res.dist < minTrackDist) {
            minTrackDist = res.dist;
            nearestCoord = res.nearest;
          }
        }
      }

      if (segments.length > 0 && minTrackDist > 20) { // 線路から20m以上浮いている駅
        trackDistanceDiscrepancies.push({
          lineId,
          stationId: st.id,
          stationName: st.name,
          distMeters: Math.round(minTrackDist * 10) / 10,
          stationCoord: stCoord,
          nearestTrackCoord: nearestCoord,
        });
      }
    }
  }

  // 2. 同一駅名（乗換駅）の路線間座標乖離走査
  const stationsByName = new Map();
  for (const st of allStations) {
    if (!stationsByName.has(st.name)) {
      stationsByName.set(st.name, []);
    }
    stationsByName.get(st.name).push(st);
  }

  const transferDiscrepancies = [];

  for (const [name, list] of stationsByName.entries()) {
    if (list.length < 2) continue;

    // 同名駅の全ペアで最大距離を計算
    let maxDist = 0;
    let worstPair = null;

    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const d = distMeters([list[i].lat, list[i].lng], [list[j].lat, list[j].lng]);
        if (d > maxDist) {
          maxDist = d;
          worstPair = [list[i], list[j]];
        }
      }
    }

    if (maxDist > 30) { // 30m以上離れている同名駅
      transferDiscrepancies.push({
        stationName: name,
        stationCount: list.length,
        lines: list.map(s => `${s.lineId}(${s.id})`),
        maxDistMeters: Math.round(maxDist * 10) / 10,
        worstPair: [
          { lineId: worstPair[0].lineId, id: worstPair[0].id, coord: [worstPair[0].lat, worstPair[0].lng] },
          { lineId: worstPair[1].lineId, id: worstPair[1].id, coord: [worstPair[1].lat, worstPair[1].lng] },
        ],
      });
    }
  }

  transferDiscrepancies.sort((a, b) => b.maxDistMeters - a.maxDistMeters);
  endpointDiscrepancies.sort((a, b) => b.distMeters - a.distMeters);
  trackDistanceDiscrepancies.sort((a, b) => b.distMeters - a.distMeters);

  console.log(`\n----------------------------------------------------------------`);
  console.log(`【走査項目 1】駅座標とセグメント端点の不一致 (>0.05m): ${endpointDiscrepancies.length} 件`);
  console.log(`----------------------------------------------------------------`);
  for (const d of endpointDiscrepancies.slice(0, 25)) {
    console.log(`  - [${d.lineId}] ${d.stationName} (${d.stationId}) 端点(${d.role}): 乖離 ${d.distMeters}m`);
    console.log(`      駅: [${d.stationCoord.join(', ')}]  セグメント端点: [${d.segmentCoord.join(', ')}]`);
  }
  if (endpointDiscrepancies.length > 25) {
    console.log(`  ... 他 ${endpointDiscrepancies.length - 25} 件`);
  }

  console.log(`\n----------------------------------------------------------------`);
  console.log(`【走査項目 2】駅座標と線路（軌道ジオメトリ）の乖離 (>20m): ${trackDistanceDiscrepancies.length} 件`);
  console.log(`----------------------------------------------------------------`);
  for (const d of trackDistanceDiscrepancies.slice(0, 25)) {
    console.log(`  - [${d.lineId}] ${d.stationName} (${d.stationId}): 線路から ${d.distMeters}m 乖離`);
    console.log(`      駅: [${d.stationCoord.join(', ')}]  線路最寄り: [${d.nearestTrackCoord.map(x=>x.toFixed(6)).join(', ')}]`);
  }
  if (trackDistanceDiscrepancies.length > 25) {
    console.log(`  ... 他 ${trackDistanceDiscrepancies.length - 25} 件`);
  }

  console.log(`\n----------------------------------------------------------------`);
  console.log(`【走査項目 3】同名乗換駅の路線間座標乖離 (>30m): ${transferDiscrepancies.length} 件`);
  console.log(`----------------------------------------------------------------`);
  for (const d of transferDiscrepancies.slice(0, 25)) {
    console.log(`  - ${d.stationName} (${d.stationCount}路線): 最大乖離 ${d.maxDistMeters}m`);
    console.log(`      最長間隔ペア: ${d.worstPair[0].lineId}(${d.worstPair[0].id}) <-> ${d.worstPair[1].lineId}(${d.worstPair[1].id})`);
  }
  if (transferDiscrepancies.length > 25) {
    console.log(`  ... 他 ${transferDiscrepancies.length - 25} 件`);
  }

  // JSONレポート出力
  const report = {
    summary: {
      totalLines: lineStationsMap.size,
      totalStations: allStations.length,
      endpointDiscrepanciesCount: endpointDiscrepancies.length,
      trackDistanceDiscrepanciesCount: trackDistanceDiscrepancies.length,
      transferDiscrepanciesCount: transferDiscrepancies.length,
    },
    endpointDiscrepancies,
    trackDistanceDiscrepancies,
    transferDiscrepancies,
  };
  fs.writeFileSync(path.join(__dirname, 'stations_audit_report.json'), JSON.stringify(report, null, 2));
  console.log(`\n詳細レポートを出力しました: scripts/stations_audit_report.json`);
}

main();
