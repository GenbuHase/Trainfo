// 汎用直通リンカーエンジン (Universal Through-Running Linker Engine)
// 全路線の駅名を自動抽出し、全直通ペアのシームレス時刻同期・End-to-End行先解決を全自動で実行します。

const fs = require('fs');
const path = require('path');
const config = require('./connectionsConfig.cjs');

function timeToSec(t) {
  if (!t) return null;
  const parts = t.split(':').map(Number);
  let h = parts[0];
  if (h < 4) h += 24;
  return h * 3600 + parts[1] * 60 + (parts[2] || 0);
}

function extractYahooTrainId(tripId) {
  if (!tripId) return null;
  const parts = tripId.split('_');
  return parts[parts.length - 1];
}

/**
 * 全路線の stations.ts を走査し、全駅の ID -> 駅名 マップを自動抽出
 */
function buildUniversalStationMap() {
  const stationMap = new Map();
  const linesDir = path.resolve('src/data/lines');
  if (!fs.existsSync(linesDir)) return stationMap;

  const entries = fs.readdirSync(linesDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const stationsPath = path.join(linesDir, entry.name, 'stations.ts');
    if (!fs.existsSync(stationsPath)) continue;

    const content = fs.readFileSync(stationsPath, 'utf8');
    // id と name を正規表現で抽出
    const regex = /id['"]?:\s*['"]([^'"]+)['"][\s\S]*?name['"]?:\s*['"]([^'"]+)['"]/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const id = match[1];
      const name = match[2];
      stationMap.set(id, name);
    }
  }

  return stationMap;
}

/**
 * 単一ペアのリンク処理
 */
function linkPair({
  lineAId,
  lineBId,
  tripsA,
  tripsB,
  stationAId,
  stationBId,
  dirA,
  dirB,
  linkName,
  maxTimeDiff = 360,
}) {
  let linkedCount = 0;
  const candidatesB = tripsB.filter((tB) => {
    if (tB.direction !== dirB) return false;
    const firstStop = tB.stops[0];
    return firstStop && firstStop.stationId === stationBId;
  });

  for (const tA of tripsA) {
    if (tA.direction !== dirA) continue;
    const lastStop = tA.stops[tA.stops.length - 1];
    if (!lastStop || lastStop.stationId !== stationAId) continue;
    if (tA.throughTripId) continue;

    const tASec = timeToSec(lastStop.arrivalTime || lastStop.departureTime);
    const yIdA = extractYahooTrainId(tA.tripId);
    const noA = tA.trainNumber;

    let bestB = null;
    let minDiff = Infinity;

    for (const tB of candidatesB) {
      if (tA.isHoliday !== tB.isHoliday) continue;
      if (tB.prevTripId) continue;

      const firstStop = tB.stops[0];
      const tBSec = timeToSec(firstStop.departureTime || firstStop.arrivalTime);
      const diff = Math.abs(tBSec - tASec);
      const yIdB = extractYahooTrainId(tB.tripId);
      const noB = tB.trainNumber;

      // 1. Yahoo trainId 完全一致 (最優先)
      if (yIdA && yIdB && yIdA === yIdB && diff <= maxTimeDiff) {
        bestB = tB;
        break;
      }
      // 2. 公式列車番号一致
      if (noA && noB && noA === noB && diff <= 180 && diff < minDiff) {
        minDiff = diff;
        bestB = tB;
      } else if (diff <= 120 && diff < minDiff) {
        // 3. 時刻近接最小
        minDiff = diff;
        bestB = tB;
      }
    }

    if (bestB) {
      tA.throughTripId = bestB.tripId;
      tA.throughLineId = lineBId;
      bestB.prevTripId = tA.tripId;
      bestB.prevLineId = lineAId;

      // 【必須】境界駅でのシームレス時刻同期 (空白時間による列車消失の完全防止)
      const syncTime = lastStop.arrivalTime || lastStop.departureTime;
      lastStop.departureTime = syncTime;        // 先行路線は到着完了
      bestB.stops[0].arrivalTime = syncTime;    // 後続路線は到着した瞬間から発車待ち開始

      linkedCount++;
    }
  }

  console.log(`  [${linkName}] 接続完了: ${linkedCount} 本`);
  return linkedCount;
}

/**
 * 全直通チェーンの End-to-End 最終行先自動同期
 */
function resolveAllChainDestinations(allTripsMap, stationMap) {
  function resolveChainDestination(startTrip) {
    let curr = startTrip;
    const visited = new Set([curr.tripId]);
    while (curr.throughTripId && allTripsMap.has(curr.throughTripId)) {
      const next = allTripsMap.get(curr.throughTripId);
      if (visited.has(next.tripId)) break;
      visited.add(next.tripId);
      curr = next;
    }

    const lastStop = curr.stops[curr.stops.length - 1];
    const finalStationName = stationMap.get(curr.destinationStationId) || (lastStop ? stationMap.get(lastStop.stationId) : null);
    let dest = curr.customDestination;
    if (dest) {
      dest = dest.replace(/\(相鉄・小田急\)/g, '').trim();
    }
    return dest || finalStationName || '行先不明';
  }

  const resolvedChains = new Set();
  let updatedCount = 0;

  for (const [tripId, trip] of allTripsMap.entries()) {
    if (resolvedChains.has(tripId)) continue;
    if (!trip.throughTripId && !trip.prevTripId) continue;

    // 先頭（最上流）まで遡る
    let head = trip;
    const visitedBack = new Set([head.tripId]);
    while (head.prevTripId && allTripsMap.has(head.prevTripId)) {
      const p = allTripsMap.get(head.prevTripId);
      if (visitedBack.has(p.tripId)) break;
      visitedBack.add(p.tripId);
      head = p;
    }

    // 先頭から末尾までリスト化
    const chain = [];
    let curr = head;
    const visitedFwd = new Set();
    while (curr && !visitedFwd.has(curr.tripId)) {
      visitedFwd.add(curr.tripId);
      chain.push(curr);
      if (curr.throughTripId && allTripsMap.has(curr.throughTripId)) {
        curr = allTripsMap.get(curr.throughTripId);
      } else {
        break;
      }
    }

    const finalDest = resolveChainDestination(head);
    for (const t of chain) {
      resolvedChains.add(t.tripId);
      if (t.customDestination !== finalDest) {
        t.customDestination = finalDest;
        updatedCount++;
      }
    }
  }

  return updatedCount;
}

/**
 * 汎用直通リンカーのメイン実行ルーチン
 */
function executeUniversalThroughLinker(options = {}) {
  console.log('=== 🚆 汎用直通リンカー基盤 実行開始 ===');

  // 1. 全路線の駅名マスタを自動収集
  const stationMap = buildUniversalStationMap();
  console.log(`[Universal Station Map] 全 ${stationMap.size} 駅の名称マスタを自動ロード完了`);

  // 2. 接続対象の路線リストを抽出して globalTimetable.json をロード
  const targetLineIds = new Set();
  for (const conn of config.connections) {
    targetLineIds.add(conn.lineA);
    targetLineIds.add(conn.lineB);
  }

  const lineTrips = new Map();
  for (const lineId of targetLineIds) {
    const filePath = path.resolve(`src/data/lines/${lineId}/globalTimetable.json`);
    if (fs.existsSync(filePath)) {
      try {
        const trips = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        lineTrips.set(lineId, trips);
      } catch (e) {
        console.error(`Error reading ${lineId}:`, e.message);
      }
    }
  }

  // 3. 既存の直通リンクを安全に初期化（冪等性の確保）
  for (const [lineId, trips] of lineTrips.entries()) {
    for (const t of trips) {
      if (targetLineIds.has(t.throughLineId)) {
        delete t.throughTripId;
        delete t.throughLineId;
      }
      if (targetLineIds.has(t.prevLineId)) {
        delete t.prevTripId;
        delete t.prevLineId;
      }
    }
  }

  // 4. 全接続ペアの自動リンク & シームレス時刻同期
  console.log('\n--- 接続ペアのリンク実行 ---');
  for (const conn of config.connections) {
    const tripsA = lineTrips.get(conn.lineA);
    const tripsB = lineTrips.get(conn.lineB);
    if (!tripsA || !tripsB) continue;

    linkPair({
      lineAId: conn.lineA,
      lineBId: conn.lineB,
      tripsA,
      tripsB,
      stationAId: conn.stationA,
      stationBId: conn.stationB,
      dirA: conn.dirA,
      dirB: conn.dirB,
      linkName: conn.name,
      maxTimeDiff: conn.maxTimeDiff || 360,
    });
  }

  // 5. 全トリップのマップ構築と End-to-End 行先自動解決
  console.log('\n--- End-to-End 最終行先自動同期 ---');
  const allTripsMap = new Map();
  for (const trips of lineTrips.values()) {
    for (const t of trips) {
      allTripsMap.set(t.tripId, t);
    }
  }

  const updatedDestCount = resolveAllChainDestinations(allTripsMap, stationMap);
  console.log(`✅ End-to-End 行先同期完了: ${updatedDestCount} トリップの customDestination を同期・統一`);

  // 6. 全路線の globalTimetable.json を安全に書き出し
  console.log('\n--- globalTimetable.json 保存 ---');
  for (const [lineId, trips] of lineTrips.entries()) {
    const filePath = path.resolve(`src/data/lines/${lineId}/globalTimetable.json`);
    fs.writeFileSync(filePath, JSON.stringify(trips, null, 2), 'utf8');
  }

  console.log('🎉 汎用直通リンカーによる全路線のシームレス同期 & 行先統一が完了しました！');
}

module.exports = {
  executeUniversalThroughLinker,
};
