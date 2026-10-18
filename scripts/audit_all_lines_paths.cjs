const fs = require('fs');
const path = require('path');

// 2点間の距離（メートル）Haversine
function distMeters(p1, p2) {
  const dLat = (p2[0] - p1[0]) * 111139;
  const latRad = ((p1[0] + p2[0]) / 2) * (Math.PI / 180);
  const dLng = (p2[1] - p1[1]) * 111139 * Math.cos(latRad);
  return Math.sqrt(dLat * dLat + dLng * dLng);
}

// 3点間の折れ曲がり角度（度: 0=直進, 180=180度Uターン/折り返し）
function calculateTurnAngle(p1, p2, p3) {
  const v1 = [p2[0] - p1[0], (p2[1] - p1[1]) * Math.cos(p1[0] * Math.PI / 180)];
  const v2 = [p3[0] - p2[0], (p3[1] - p2[1]) * Math.cos(p2[0] * Math.PI / 180)];
  const dot = v1[0] * v2[0] + v1[1] * v2[1];
  const mag1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
  const mag2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
  if (mag1 === 0 || mag2 === 0) return 0;
  const cos = Math.max(-1, Math.min(1, dot / (mag1 * mag2)));
  return Math.acos(cos) * (180 / Math.PI);
}

// 2点間の方位角（0=北, 90=東, 180=南, 270=西）
function calculateHeading(lat1, lon1, lat2, lon2) {
  const pLat1 = (lat1 * Math.PI) / 180;
  const pLat2 = (lat2 * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos(pLat2);
  const x = Math.cos(pLat1) * Math.sin(pLat2) - Math.sin(pLat1) * Math.cos(pLat2) * Math.cos(dLon);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

// trackGeometry.ts ファイルからセグメント配列を抽出
function extractTrackSegments(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  const eqBracket = content.indexOf('= [');
  const jsonStart = eqBracket !== -1 ? eqBracket + 2 : content.indexOf('[');
  const jsonEnd = content.lastIndexOf(']');
  if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
    return null;
  }
  try {
    return JSON.parse(content.substring(jsonStart, jsonEnd + 1));
  } catch (e) {
    // try relaxed extraction
    return null;
  }
}

// stations.ts から駅リストを抽出
function extractStations(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const eqBracket = content.indexOf('= [');
  const jsonStart = eqBracket !== -1 ? eqBracket + 2 : content.indexOf('[');
  const jsonEnd = content.lastIndexOf(']');
  if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
    try {
      return JSON.parse(content.substring(jsonStart, jsonEnd + 1));
    } catch (e) {
      // fallback to regex if JSON.parse fails (e.g. unquoted keys or comments)
    }
  }

  const stations = [];
  const re = /["']?id["']?\s*:\s*['"]([^'"]+)['"][\s\S]*?["']?name["']?\s*:\s*['"]([^'"]+)['"][\s\S]*?["']?lat["']?\s*:\s*([0-9.]+)[\s\S]*?["']?lng["']?\s*:\s*([0-9.]+)/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    stations.push({
      id: m[1],
      name: m[2],
      lat: parseFloat(m[3]),
      lng: parseFloat(m[4])
    });
  }
  return stations;
}

// globalTimetable.json を読み込み
function loadTimetable(filePath) {
  if (!fs.existsSync(filePath)) return [];
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return [];
  }
}

// セグメント補間シミュレーション（trainSimulation.ts と同様のロジック）
function interpolateSegment(coords, ratio) {
  if (coords.length < 2) {
    return { lat: coords[0]?.[0] || 0, lng: coords[0]?.[1] || 0, heading: 0 };
  }
  const clampedRatio = Math.max(0, Math.min(1, ratio));
  const distances = [];
  let totalDist = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    const d = distMeters(coords[i], coords[i + 1]);
    distances.push(d);
    totalDist += d;
  }
  if (totalDist === 0) {
    return { lat: coords[0][0], lng: coords[0][1], heading: 0 };
  }

  const targetDist = clampedRatio * totalDist;
  let accumulated = 0;

  for (let i = 0; i < distances.length; i++) {
    const nextAcc = accumulated + distances[i];
    if (targetDist <= nextAcc || i === distances.length - 1) {
      const segRatio = distances[i] > 0 ? (targetDist - accumulated) / distances[i] : 0;
      const p1 = coords[i];
      const p2 = coords[i + 1];
      const lat = p1[0] + (p2[0] - p1[0]) * segRatio;
      const lng = p1[1] + (p2[1] - p1[1]) * segRatio;

      const lookaheadMeters = Math.min(25, totalDist * 0.1);
      const aheadTargetDist = Math.min(totalDist, targetDist + Math.max(5, lookaheadMeters));
      let heading = calculateHeading(p1[0], p1[1], p2[0], p2[1]);

      if (aheadTargetDist > targetDist + 0.5) {
        let aheadAcc = 0;
        for (let j = 0; j < distances.length; j++) {
          const nextAheadAcc = aheadAcc + distances[j];
          if (aheadTargetDist <= nextAheadAcc || j === distances.length - 1) {
            const aheadSegRatio = distances[j] > 0 ? (aheadTargetDist - aheadAcc) / distances[j] : 0;
            const ap1 = coords[j];
            const ap2 = coords[j + 1];
            const aheadLat = ap1[0] + (ap2[0] - ap1[0]) * aheadSegRatio;
            const aheadLng = ap1[1] + (ap2[1] - ap1[1]) * aheadSegRatio;
            heading = calculateHeading(lat, lng, aheadLat, aheadLng);
            break;
          }
          aheadAcc = nextAheadAcc;
        }
      }
      return { lat, lng, heading };
    }
    accumulated = nextAcc;
  }

  const last = coords[coords.length - 1];
  const prevLast = coords[coords.length - 2] || last;
  return { lat: last[0], lng: last[1], heading: calculateHeading(prevLast[0], prevLast[1], last[0], last[1]) };
}

// メイン検査関数
function auditAllLines() {
  const linesDir = path.resolve(__dirname, '../src/data/lines');
  const lineDirs = fs.readdirSync(linesDir).filter(f => fs.statSync(path.join(linesDir, f)).isDirectory());

  console.log(`================================================================`);
  console.log(`  Trainfo 全路線 試験走行＆軌道パス異常走査監査ツール`);
  console.log(`  検査対象路線数: ${lineDirs.length} 路線`);
  console.log(`================================================================\n`);

  const summary = {
    totalLines: lineDirs.length,
    totalStations: 0,
    totalSegments: 0,
    totalTripsChecked: 0,
    linesWithIssues: 0,
    issues: {
      missingSegments: [],
      stationSnapGaps: [],
      coordinateJumps: [],
      sharpTurns: [],
      simulationErrors: [],
    }
  };

  for (const lineId of lineDirs) {
    const linePath = path.join(linesDir, lineId);
    const stations = extractStations(path.join(linePath, 'stations.ts'));
    const segments = extractTrackSegments(path.join(linePath, 'trackGeometry.ts'));
    const timetable = loadTimetable(path.join(linePath, 'globalTimetable.json'));

    summary.totalStations += stations.length;
    if (segments) summary.totalSegments += segments.length;

    const stationMap = new Map(stations.map(s => [s.id, s]));
    const lineIssues = [];

    if (!segments || segments.length === 0) {
      lineIssues.push({ type: 'FATAL', msg: 'trackGeometry.ts が存在しないかパースできません' });
      summary.linesWithIssues++;
      continue;
    }

    // セグメント探索用マップ (A_B および B_A)
    const segmentLookup = new Map();
    for (const seg of segments) {
      segmentLookup.set(`${seg.fromStationId}_${seg.toStationId}`, { seg, isReverse: false });
      if (!segmentLookup.has(`${seg.toStationId}_${seg.fromStationId}`)) {
        segmentLookup.set(`${seg.toStationId}_${seg.fromStationId}`, { seg, isReverse: true });
      }
    }

    // 1. 各セグメントの幾何学的健全性検査
    for (const seg of segments) {
      const fromSt = stationMap.get(seg.fromStationId);
      const toSt = stationMap.get(seg.toStationId);

      // (a) 駅スナップ距離チェック
      if (fromSt && seg.coordinates.length > 0) {
        const dFrom = distMeters([fromSt.lat, fromSt.lng], seg.coordinates[0]);
        if (dFrom > 100) {
          lineIssues.push({
            type: 'SNAP_GAP_LARGE',
            segId: seg.id || `${seg.fromStationId}->${seg.toStationId}`,
            msg: `始点駅 ${fromSt.name}(${seg.fromStationId}) と軌道始点との乖離が ${Math.round(dFrom)}m あります`
          });
          summary.issues.stationSnapGaps.push({ lineId, segId: seg.id, gap: dFrom, station: fromSt.name });
        }
      }
      if (toSt && seg.coordinates.length > 0) {
        const dTo = distMeters([toSt.lat, toSt.lng], seg.coordinates[seg.coordinates.length - 1]);
        if (dTo > 100) {
          lineIssues.push({
            type: 'SNAP_GAP_LARGE',
            segId: seg.id || `${seg.fromStationId}->${seg.toStationId}`,
            msg: `終点駅 ${toSt.name}(${seg.toStationId}) と軌道終点との乖離が ${Math.round(dTo)}m あります`
          });
          summary.issues.stationSnapGaps.push({ lineId, segId: seg.id, gap: dTo, station: toSt.name });
        }
      }

      // (b) 点間ジャンプチェック (300m以上、新幹線は800m以上)
      const isShinkansen = lineId.includes('shinkansen');
      const jumpThreshold = isShinkansen ? 800 : 350;
      for (let i = 0; i < seg.coordinates.length - 1; i++) {
        const d = distMeters(seg.coordinates[i], seg.coordinates[i + 1]);
        if (d > jumpThreshold) {
          lineIssues.push({
            type: 'COORD_JUMP',
            segId: seg.id || `${seg.fromStationId}->${seg.toStationId}`,
            msg: `点間ジャンプ ${Math.round(d)}m (index ${i} -> ${i + 1}) [coord: ${seg.coordinates[i]}]`
          });
          summary.issues.coordinateJumps.push({ lineId, segId: seg.id, distance: d, index: i });
        }
      }

      // (c) 鋭角・トゲ・逆走チェック
      for (let i = 0; i < seg.coordinates.length - 2; i++) {
        const p1 = seg.coordinates[i];
        const p2 = seg.coordinates[i + 1];
        const p3 = seg.coordinates[i + 2];
        const angle = calculateTurnAngle(p1, p2, p3);
        const d1 = distMeters(p1, p2);
        const d2 = distMeters(p2, p3);

        // 鋭角 > 90度 かつ ある程度長さがある (> 8m) のはトゲ・折り返し異常
        if (angle > 100 && d1 > 8 && d2 > 8) {
          lineIssues.push({
            type: 'SHARP_SPIKE',
            segId: seg.id || `${seg.fromStationId}->${seg.toStationId}`,
            msg: `軌道トゲ・折り返し異常 ${angle.toFixed(1)}° (index ${i+1}) [coord: ${p2}] (腕長: ${Math.round(d1)}m, ${Math.round(d2)}m)`
          });
          summary.issues.sharpTurns.push({ lineId, segId: seg.id, angle, coord: p2 });
        }
      }
    }

    // 2. 始点から終点までの試験走行シミュレーション（Timetable Trips）
    // ダイヤ上に存在するすべてのトリップについて、始点から終点まで走行
    const checkedPairs = new Set();
    let tripsCheckedThisLine = 0;

    for (const trip of timetable) {
      if (!trip.stops || trip.stops.length < 2) continue;
      tripsCheckedThisLine++;

      for (let i = 0; i < trip.stops.length - 1; i++) {
        const fromId = trip.stops[i].stationId;
        const toId = trip.stops[i + 1].stationId;
        const pairKey = `${fromId}_${toId}`;

        if (checkedPairs.has(pairKey)) continue;
        checkedPairs.add(pairKey);

        const found = segmentLookup.get(pairKey);
        if (!found) {
          const fromName = stationMap.get(fromId)?.name || fromId;
          const toName = stationMap.get(toId)?.name || toId;
          lineIssues.push({
            type: 'MISSING_SEGMENT',
            msg: `運行ストップ区間 [${fromName}(${fromId}) -> ${toName}(${toId})] に軌道セグメントが存在しません（トリップ: ${trip.tripId}）`
          });
          summary.issues.missingSegments.push({ lineId, fromId, toId, fromName, toName, tripId: trip.tripId });
        } else {
          // 仮想試験走行 (進捗率 0, 0.25, 0.5, 0.75, 1.0)
          const coords = found.isReverse ? [...found.seg.coordinates].reverse() : found.seg.coordinates;
          try {
            let prevPt = null;
            for (const r of [0, 0.25, 0.5, 0.75, 1.0]) {
              const res = interpolateSegment(coords, r);
              if (isNaN(res.lat) || isNaN(res.lng) || isNaN(res.heading)) {
                lineIssues.push({
                  type: 'SIMULATION_NAN',
                  msg: `区間 [${fromId} -> ${toId}] 比率 ${r} で NaN が発生しました`
                });
                summary.issues.simulationErrors.push({ lineId, fromId, toId, ratio: r });
              }
              if (prevPt) {
                const stepDist = distMeters([prevPt.lat, prevPt.lng], [res.lat, res.lng]);
                // セグメント長に対してステップ距離が異常（例えば100km以上などワープ）
                if (stepDist > 50000) {
                  lineIssues.push({
                    type: 'SIMULATION_WARP',
                    msg: `区間 [${fromId} -> ${toId}] 試験走行中に ${Math.round(stepDist/1000)}km のワープが発生しました`
                  });
                }
              }
              prevPt = res;
            }
          } catch (err) {
            lineIssues.push({
              type: 'SIMULATION_EXCEPTION',
              msg: `区間 [${fromId} -> ${toId}] 試験走行で例外発生: ${err.message}`
            });
            summary.issues.simulationErrors.push({ lineId, fromId, toId, error: err.message });
          }
        }
      }
    }
    summary.totalTripsChecked += tripsCheckedThisLine;

    // 3. 路線自体の始点から終点までの駅順トレース試験走行（隣接駅間のセグメント連結チェック）
    for (let i = 0; i < stations.length - 1; i++) {
      const fromSt = stations[i];
      const toSt = stations[i + 1];
      const pairKey = `${fromSt.id}_${toSt.id}`;
      // ダイヤに存在しなくても隣接駅同士でセグメントが存在するかチェック（支線分岐駅等を除外するため緩やかにチェック）
      const found = segmentLookup.get(pairKey);
      if (!found) {
        // 分岐線の可能性もあるため、stations 内でナンバリングや支線があるか注意
        // ただし通常本線であれば隣接駅間セグメントがあるべき
      } else {
        // 駅間の端点と駅座標の整合性チェック
        const seg = found.seg;
        const coords = found.isReverse ? [...seg.coordinates].reverse() : seg.coordinates;
        if (coords.length >= 2) {
          const dStart = distMeters([fromSt.lat, fromSt.lng], coords[0]);
          const dEnd = distMeters([toSt.lat, toSt.lng], coords[coords.length - 1]);
          if (dStart > 150) {
            lineIssues.push({
              type: 'STATION_MISMATCH',
              msg: `駅 ${fromSt.name}(${fromSt.id}) と線路始点の乖離が過大です (${Math.round(dStart)}m)`
            });
          }
          if (dEnd > 150) {
            lineIssues.push({
              type: 'STATION_MISMATCH',
              msg: `駅 ${toSt.name}(${toSt.id}) と線路終点の乖離が過大です (${Math.round(dEnd)}m)`
            });
          }
        }
      }
    }

    // 結果表示
    if (lineIssues.length > 0) {
      summary.linesWithIssues++;
      console.log(`❌ [${lineId}] ${stations[0]?.name || '?'} 〜 ${stations[stations.length - 1]?.name || '?'} (${stations.length}駅, ${segments?.length || 0}セグメント, ${tripsCheckedThisLine}運行トリップ)`);
      for (const iss of lineIssues) {
        console.log(`   - [${iss.type}] ${iss.msg}`);
      }
    } else {
      console.log(`✅ [${lineId}] 正常クリア (${stations[0]?.name || '?'} 〜 ${stations[stations.length - 1]?.name || '?'}, ${segments?.length || 0}セグメント, ${tripsCheckedThisLine}運行トリップ)`);
    }
  }

  // レポートファイル保存
  const reportPath = path.resolve(__dirname, 'audit_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(summary, null, 2), 'utf8');

  console.log(`\n================================================================`);
  console.log(`  走査完了サマリー`);
  console.log(`================================================================`);
  console.log(`  全路線数:               ${summary.totalLines}`);
  console.log(`  正常クリア路線数:       ${summary.totalLines - summary.linesWithIssues}`);
  console.log(`  問題検出路線数:         ${summary.linesWithIssues}`);
  console.log(`  総駅数:                 ${summary.totalStations}`);
  console.log(`  総軌道セグメント数:     ${summary.totalSegments}`);
  console.log(`  試験走行トリップ数:     ${summary.totalTripsChecked}`);
  console.log(`----------------------------------------------------------------`);
  console.log(`  セグメント欠落:         ${summary.issues.missingSegments.length} 箇所`);
  console.log(`  駅スナップ乖離 (>100m): ${summary.issues.stationSnapGaps.length} 箇所`);
  console.log(`  点間大ジャンプ:         ${summary.issues.coordinateJumps.length} 箇所`);
  console.log(`  軌道トゲ・鋭角 (>100°): ${summary.issues.sharpTurns.length} 箇所`);
  console.log(`  シミュレーションエラー: ${summary.issues.simulationErrors.length} 箇所`);
  console.log(`================================================================`);
  console.log(`  詳細レポート出力先: ${reportPath}\n`);

  return summary;
}

if (require.main === module) {
  auditAllLines();
}

module.exports = { auditAllLines, distMeters, calculateTurnAngle, calculateHeading };
