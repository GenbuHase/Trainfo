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
 * 同一区間・同一時刻の重複ゴーストトリップを安全に除去
 */
function deduplicateLineTrips(trips) {
  const grouped = new Map();
  for (const t of trips) {
    if (!t.stops || t.stops.length === 0) continue;
    const first = t.stops[0];
    const last = t.stops[t.stops.length - 1];
    const key = `${t.isHoliday ? 'H' : 'W'}_${t.direction}_${first.stationId}_${first.departureTime || first.arrivalTime}_${last.stationId}_${last.arrivalTime || last.departureTime}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(t);
  }

  const cleaned = [];
  let dupCount = 0;
  for (const list of grouped.values()) {
    if (list.length === 1) {
      cleaned.push(list[0]);
      continue;
    }
    dupCount += (list.length - 1);
    list.sort((a, b) => {
      // 1. 直通元・直通先情報を持つものを最優先
      const aThrough = (a.prevTripId ? 100 : 0) + (a.throughTripId ? 50 : 0);
      const bThrough = (b.prevTripId ? 100 : 0) + (b.throughTripId ? 50 : 0);
      if (bThrough !== aThrough) return bThrough - aThrough;

      // 2. 停車駅数が多い方を優先（急行・各停の完全重複時は停車駅の多い各停か、設定された停車駅リストを優先）
      const stopsDiff = (b.stops?.length || 0) - (a.stops?.length || 0);
      if (stopsDiff !== 0) return stopsDiff;

      // 3. customDestination を持つ方を優先
      const aDest = a.customDestination ? 1 : 0;
      const bDest = b.customDestination ? 1 : 0;
      return bDest - aDest;
    });
    cleaned.push(list[0]);
  }
  return { cleaned, dupCount };
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
      } else if (diff <= maxTimeDiff && diff < minDiff) {
        // 3. 時刻近接最小 (境界駅の停車・交代時間に対応)
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

  function resolveChainOrigin(startTrip) {
    let curr = startTrip;
    const visited = new Set([curr.tripId]);
    while (curr.prevTripId && allTripsMap.has(curr.prevTripId)) {
      const prev = allTripsMap.get(curr.prevTripId);
      if (visited.has(prev.tripId)) break;
      visited.add(prev.tripId);
      curr = prev;
    }

    const firstStop = curr.stops[0];
    const initialStationName = stationMap.get(curr.originStationId) || (firstStop ? stationMap.get(firstStop.stationId) : null);
    let orig = curr.customOrigin;
    if (orig) {
      orig = orig.replace(/\(相鉄・小田急\)/g, '').trim();
    }
    return orig || initialStationName || null;
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
    const initialOrigin = resolveChainOrigin(head);

    for (const t of chain) {
      resolvedChains.add(t.tripId);
      if (t.customDestination !== finalDest) {
        t.customDestination = finalDest;
        updatedCount++;
      }
      if (initialOrigin && t.customOrigin !== initialOrigin) {
        t.customOrigin = initialOrigin;
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

  // 4. 重複ゴーストトリップのクリーンアップ（同一時刻・同一区間の多重登録を解消）
  for (const [lineId, trips] of lineTrips.entries()) {
    const { cleaned, dupCount } = deduplicateLineTrips(trips);
    if (dupCount > 0) {
      console.log(`[Deduplication] ${lineId}: ${dupCount} 件の重複便を除去 (${trips.length} -> ${cleaned.length})`);
      lineTrips.set(lineId, cleaned);
    }
  }

  // 5. 全接続ペアの自動リンク & シームレス時刻同期
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
