// 汎用直通リンカーエンジン (Universal Through-Running Linker Engine)
// 全路線の駅名を自動抽出し、connectionsConfig.cjs の宣言的ルールに基づいて
// 全直通ペアのシームレス時刻同期・End-to-End行先解決を汎用的に実行します。

const fs = require('fs');
const path = require('path');
const config = require('./connectionsConfig.cjs');
const {
  timeToSec,
  secToTime,
  safeReadJson,
  safeWriteJson,
  extractTrainId,
  isLimitedExpress,
  isExpressType,
  isOfficialTrainNumber,
  cleanStationName,
  buildUniversalStationMap,
} = require('../timetableUtils.cjs');

/**
 * 併結の支線クローンとして生成されたトリップであるか判定
 */
function isClonedBranchTrip(trip) {
  if (!trip) return false;
  return Boolean(
    trip.isClonedBranch ||
    (trip.tripId && /_(fuji|branch)$/.test(trip.tripId)) ||
    trip.coupling?.role === 'child'
  );
}

function sortDuplicates(a, b) {
  // 1. 直通元・直通先情報を持つものを最優先
  const aThrough = (a.prevTripId ? 100 : 0) + (a.throughTripId ? 50 : 0);
  const bThrough = (b.prevTripId ? 100 : 0) + (b.throughTripId ? 50 : 0);
  if (bThrough !== aThrough) return bThrough - aThrough;

  // 2. 停車駅数が多い方を優先
  const stopsDiff = (b.stops?.length || 0) - (a.stops?.length || 0);
  if (stopsDiff !== 0) return stopsDiff;

  // 3. customDestination を持つ方を優先
  const aDest = a.customDestination ? 1 : 0;
  const bDest = b.customDestination ? 1 : 0;
  return bDest - aDest;
}

/**
 * 同一区間・同一時刻の重複ゴーストトリップを安全に除去
 * （併結特急など異なる列車番号・役割を持つ列車は保護して保持）
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

    // 併結列車（特急など異なる列車番号・行先を持つ列車、または coupling を持つ列車）の判定
    const byTrainOrDest = new Map();
    for (const t of list) {
      let trainKey = t.tripId;
      const yId = extractTrainId(t.tripId);
      if (t.coupling) {
        trainKey = `${t.trainNumber || ''}_${t.coupling.role}_${t.customDestination || ''}_${yId || ''}`;
      } else if (isClonedBranchTrip(t)) {
        trainKey = `${t.trainNumber || ''}_branch_${t.customDestination || ''}_${yId || ''}`;
      } else if ((isLimitedExpress(t.trainType) || isExpressType(t.trainType)) && yId) {
        trainKey = `${t.trainNumber || ''}_${yId}`;
      } else if (t.trainNumber && t.customDestination) {
        trainKey = `${t.trainNumber}_${t.customDestination}`;
      } else if (t.trainNumber) {
        trainKey = t.trainNumber;
      } else if (yId) {
        trainKey = yId;
      }
      if (!byTrainOrDest.has(trainKey)) byTrainOrDest.set(trainKey, []);
      byTrainOrDest.get(trainKey).push(t);
    }

    // 異なる列車キーを持つ優等列車または併結設定列車が存在する場合、それぞれの列車を保護
    if (
      byTrainOrDest.size > 1 &&
      list.some(t => isLimitedExpress(t.trainType) || isExpressType(t.trainType) || t.coupling || isClonedBranchTrip(t))
    ) {
      for (const subList of byTrainOrDest.values()) {
        if (subList.length === 1) {
          cleaned.push(subList[0]);
        } else {
          dupCount += (subList.length - 1);
          subList.sort(sortDuplicates);
          cleaned.push(subList[0]);
        }
      }
      continue;
    }

    dupCount += (list.length - 1);
    list.sort(sortDuplicates);
    cleaned.push(list[0]);
  }
  return { cleaned, dupCount };
}

/**
 * 2つの行先名称が互換性を持つか判定（connectionsConfig.destinationCompatibilityGroups を参照）
 */
function areDestinationsCompatible(destA, destB) {
  if (!destA || !destB) return true;
  const cleanA = cleanStationName(destA);
  const cleanB = cleanStationName(destB);
  if (cleanA === cleanB || cleanA.includes(cleanB) || cleanB.includes(cleanA)) return true;

  const groups = config.destinationCompatibilityGroups || [];
  for (const group of groups) {
    if (group.includes(cleanA) && group.includes(cleanB)) {
      return true;
    }
  }
  return false;
}

function getEffectiveDestination(trip, stationMap) {
  if (trip.customDestination) {
    return cleanStationName(trip.customDestination);
  }
  if (trip.destinationStationId && stationMap && stationMap.has(trip.destinationStationId)) {
    return stationMap.get(trip.destinationStationId);
  }
  const lastStop = trip.stops && trip.stops[trip.stops.length - 1];
  if (lastStop && lastStop.stationId && stationMap && stationMap.has(lastStop.stationId)) {
    return stationMap.get(lastStop.stationId);
  }
  return null;
}

function getEffectiveOrigin(trip, stationMap) {
  if (trip.customOrigin) {
    return cleanStationName(trip.customOrigin);
  }
  if (trip.originStationId && stationMap && stationMap.has(trip.originStationId)) {
    return stationMap.get(trip.originStationId);
  }
  const firstStop = trip.stops && trip.stops[0];
  if (firstStop && firstStop.stationId && stationMap && stationMap.has(firstStop.stationId)) {
    return stationMap.get(firstStop.stationId);
  }
  return null;
}

/**
 * 接続先路線に対して行先が不一致（別系統直通）であるか判定（connectionsConfig.lineDestinationExclusions を参照）
 */
function isLineDestinationMismatch(dest, targetLineId) {
  if (!dest) return false;
  const rule = config.lineDestinationExclusions && config.lineDestinationExclusions[targetLineId];
  if (!rule) return false;

  if (rule.exact && rule.exact.includes(dest)) {
    return true;
  }
  if (rule.includes && rule.includes.some(kw => dest.includes(kw))) {
    return true;
  }
  return false;
}

/**
 * 料金不要特急と一般列車の直通が許可される路線か判定
 */
function isFreeLimitedExpressLine(lineId) {
  const prefixes = config.freeLimitedExpressLinePrefixes || [];
  return prefixes.some(prefix => lineId.startsWith(prefix));
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
  stationMap,
  maxTimeDiff = 360,
  requireIdMatch = false,
  allowMidStationA = false,
  allowMidStationB = false,
  allowedDestinations = null,
  disallowedDestinations = null,
  allowedOrigins = null,
  disallowedOrigins = null,
  exactAllowedDestinations = null,
  exactDisallowedDestinations = null,
  exactAllowedOriginsB = null,
  exactDisallowedOriginsB = null,
  targetDestStationRules = null,
  truncateAAtStation = false,
  truncateBFromStation = false,
}) {
  let linkedCount = 0;

  const exactAllowDestSet = exactAllowedDestinations ? new Set(exactAllowedDestinations) : null;
  const exactDisallowDestSet = exactDisallowedDestinations ? new Set(exactDisallowedDestinations) : null;
  const exactAllowOrigBSet = exactAllowedOriginsB ? new Set(exactAllowedOriginsB) : null;
  const exactDisallowOrigBSet = exactDisallowedOriginsB ? new Set(exactDisallowedOriginsB) : null;

  // 1. stationAId を持つ tripsA を境界駅到着時刻順にソート
  const sortedTripsA = tripsA
    .filter((tA) => {
      if (tA.direction !== dirA) return false;
      if (tA.throughTripId) return false;
      if (allowedDestinations && allowedDestinations.length > 0) {
        const dest = getEffectiveDestination(tA, stationMap);
        if (!dest || !allowedDestinations.some(d => dest.includes(d))) return false;
      }
      if (disallowedDestinations && disallowedDestinations.length > 0) {
        const dest = getEffectiveDestination(tA, stationMap);
        if (dest && disallowedDestinations.some(d => dest.includes(d))) return false;
      }
      if (allowedOrigins && allowedOrigins.length > 0) {
        const orig = getEffectiveOrigin(tA, stationMap);
        if (!orig || !allowedOrigins.some(o => orig.includes(o))) return false;
      }
      if (disallowedOrigins && disallowedOrigins.length > 0) {
        const orig = getEffectiveOrigin(tA, stationMap);
        if (orig && disallowedOrigins.some(o => orig.includes(o))) return false;
      }
      if (allowMidStationA) {
        const idx = tA.stops.findIndex((s) => s.stationId === stationAId);
        return idx > 0;
      }
      const lastStop = tA.stops[tA.stops.length - 1];
      return lastStop && lastStop.stationId === stationAId;
    })
    .sort((a, b) => {
      const stopA = allowMidStationA
        ? a.stops.find((s) => s.stationId === stationAId)
        : a.stops[a.stops.length - 1];
      const stopB = allowMidStationA
        ? b.stops.find((s) => s.stationId === stationAId)
        : b.stops[b.stops.length - 1];
      const aSec = timeToSec(stopA?.arrivalTime || stopA?.departureTime);
      const bSec = timeToSec(stopB?.arrivalTime || stopB?.departureTime);
      return (aSec || 0) - (bSec || 0);
    });

  // 2. stationBId を持つ tripsB を境界駅出発時刻順にソート
  const sortedCandidatesB = tripsB
    .filter((tB) => {
      if (tB.direction !== dirB) return false;
      if (allowedOrigins && allowedOrigins.length > 0) {
        const orig = getEffectiveOrigin(tB, stationMap);
        if (!orig || !allowedOrigins.some(o => orig.includes(o))) return false;
      }
      if (disallowedOrigins && disallowedOrigins.length > 0) {
        const orig = getEffectiveOrigin(tB, stationMap);
        if (orig && disallowedOrigins.some(o => orig.includes(o))) return false;
      }
      if (allowMidStationB) {
        const idx = tB.stops.findIndex((s) => s.stationId === stationBId);
        return idx !== -1 && idx < tB.stops.length - 1;
      }
      const firstStop = tB.stops[0];
      return firstStop && firstStop.stationId === stationBId;
    })
    .sort((a, b) => {
      const stopA = allowMidStationB
        ? a.stops.find((s) => s.stationId === stationBId)
        : a.stops[0];
      const stopB = allowMidStationB
        ? b.stops.find((s) => s.stationId === stationBId)
        : b.stops[0];
      const aSec = timeToSec(stopA?.departureTime || stopA?.arrivalTime);
      const bSec = timeToSec(stopB?.departureTime || stopB?.arrivalTime);
      return (aSec || 0) - (bSec || 0);
    });

  for (const tA of sortedTripsA) {
    const stopA = allowMidStationA
      ? tA.stops.find((s) => s.stationId === stationAId)
      : tA.stops[tA.stops.length - 1];
    if (!stopA) continue;

    const tASec = timeToSec(stopA.arrivalTime || stopA.departureTime);
    const yIdA = extractTrainId(tA.tripId);
    const noA = tA.trainNumber;
    const destA = getEffectiveDestination(tA, stationMap);

    // 系統不一致フィルタ
    if (isLineDestinationMismatch(destA, lineBId)) {
      continue;
    }

    // 接続定義に基づく厳密な行先フィルタ
    if (exactDisallowDestSet && destA && exactDisallowDestSet.has(destA)) {
      continue;
    }
    if (exactAllowDestSet && (!destA || !exactAllowDestSet.has(destA))) {
      continue;
    }

    let bestB = null;
    let bestScore = Infinity;

    for (const tB of sortedCandidatesB) {
      if (tA.isHoliday !== tB.isHoliday) continue;
      if (tB.prevTripId) continue;

      // 特急列車と非特急（一般普通・快速・各停等）のクロス誤接続を禁止
      const isLtdA = isLimitedExpress(tA.trainType);
      const isLtdB = isLimitedExpress(tB.trainType);
      if (isLtdA !== isLtdB) {
        const allowCross = (isFreeLimitedExpressLine(lineAId) && isLtdA) || (isFreeLimitedExpressLine(lineBId) && isLtdB);
        if (!allowCross) {
          continue;
        }
      }

      // 接続定義に基づく後続列車の厳密な始発駅フィルタ
      if (exactDisallowOrigBSet || exactAllowOrigBSet) {
        const origB = getEffectiveOrigin(tB, stationMap);
        if (exactDisallowOrigBSet && origB && exactDisallowOrigBSet.has(origB)) {
          continue;
        }
        if (exactAllowOrigBSet && (!origB || !exactAllowOrigBSet.has(origB))) {
          continue;
        }
      }

      // 接続定義に基づく行先別の後続列車終着駅制約
      if (targetDestStationRules && destA) {
        let ruleFailed = false;
        for (const rule of targetDestStationRules) {
          if (destA.includes(rule.destIncludes) && tB.destinationStationId !== rule.requiredStationId) {
            ruleFailed = true;
            break;
          }
        }
        if (ruleFailed) continue;
      }

      const stopB = allowMidStationB
        ? tB.stops.find((s) => s.stationId === stationBId)
        : tB.stops[0];
      if (!stopB) continue;

      let tBSec = timeToSec(stopB.departureTime || stopB.arrivalTime);
      if (tBSec !== null && tASec !== null) {
        if (tBSec - tASec < -43200) tBSec += 86400;
        else if (tBSec - tASec > 43200) tBSec -= 86400;
      }
      const waitSec = tBSec - tASec;
      const yIdB = extractTrainId(tB.tripId);
      const noB = tB.trainNumber;
      const destB = getEffectiveDestination(tB, stationMap);

      // 1. 完全一致 (trainId または 公式列車番号)
      const isIdMatch = (yIdA && yIdB && yIdA === yIdB) || (noA && noB && noA === noB);
      if (isIdMatch && waitSec >= -300 && waitSec <= 7200) {
        if (destA && destB && !areDestinationsCompatible(destA, destB)) {
          // 行先が非互換の場合は別系統のためスキップ
        } else {
          bestB = tB;
          bestScore = -9999;
          break;
        }
      }

      if (requireIdMatch) continue;

      // 2. 因果律と最大待機時間判定
      const isDestCompatible = destA && destB && areDestinationsCompatible(destA, destB);
      const effectiveMaxWait = isDestCompatible
        ? Math.max(maxTimeDiff || 900, 1800)
        : (maxTimeDiff || 900);

      if (waitSec < -30 || waitSec > effectiveMaxWait) continue;

      let score = Math.max(0, waitSec);

      // 行先整合性スコア
      if (destA && destB) {
        if (areDestinationsCompatible(destA, destB)) {
          score -= 2000;
        } else {
          score += 8000;
        }
      }

      // 優等/普通整合性ボーナス
      if (isExpressType(tA.trainType) === isExpressType(tB.trainType)) {
        score -= 300;
      }

      // 併結・分割支線列車の親・子系統整合性判定
      if (tA.coupling || tB.coupling || isClonedBranchTrip(tA) || isClonedBranchTrip(tB)) {
        const isBranchA = isClonedBranchTrip(tA);
        const isBranchB = isClonedBranchTrip(tB);
        if (isBranchA !== isBranchB) {
          continue;
        }
        if (isBranchA && isBranchB) {
          score -= 4000;
        }
      }

      if (score < bestScore) {
        bestScore = score;
        bestB = tB;
      }
    }

    if (bestB && bestScore < 5000) {
      tA.throughTripId = bestB.tripId;
      tA.throughLineId = lineBId;
      bestB.prevTripId = tA.tripId;
      bestB.prevLineId = lineAId;

      // 公式列車番号の相互補完
      if (isOfficialTrainNumber(tA.trainNumber) && !isOfficialTrainNumber(bestB.trainNumber)) {
        bestB.trainNumber = tA.trainNumber;
      } else if (isOfficialTrainNumber(bestB.trainNumber) && !isOfficialTrainNumber(tA.trainNumber)) {
        tA.trainNumber = bestB.trainNumber;
      }

      // 特急列車同士の愛称相互補完
      if (isLimitedExpress(tA.trainType) && isLimitedExpress(bestB.trainType)) {
        if (tA.trainName && !bestB.trainName) {
          bestB.trainName = tA.trainName;
        } else if (bestB.trainName && !tA.trainName) {
          tA.trainName = bestB.trainName;
        }
      }

      // 境界駅でのシームレス時刻同期
      const stopB = allowMidStationB
        ? bestB.stops.find((s) => s.stationId === stationBId)
        : bestB.stops[0];

      const syncArr = stopA.arrivalTime || stopA.departureTime;
      stopA.departureTime = syncArr;
      if (stopB) {
        stopB.arrivalTime = syncArr;
        const syncSec = timeToSec(syncArr);
        let bDepSec = timeToSec(stopB.departureTime);
        if (bDepSec !== null && bDepSec < syncSec && bDepSec + 86400 >= syncSec) {
          bDepSec += 86400;
        }
        if (bDepSec !== null && bDepSec < syncSec) {
          stopB.departureTime = syncArr;
          bDepSec = syncSec;
        }

        const isPassingBoundary = stopA.isPassing || stopB.isPassing;
        if (isPassingBoundary) {
          stopA.departureTime = syncArr;
          stopB.departureTime = syncArr;
          bDepSec = syncSec;
        } else if (stopB.departureTime && bDepSec !== null && bDepSec >= syncSec) {
          stopA.departureTime = stopB.departureTime;
        }

        // 後続駅の時刻逆転防止
        const stopBIndex = bestB.stops.indexOf(stopB);
        let curSec = bDepSec !== null ? bDepSec : timeToSec(stopB.departureTime);
        for (let k = stopBIndex + 1; k < bestB.stops.length; k++) {
          const s = bestB.stops[k];
          let arrS = timeToSec(s.arrivalTime);
          let depS = timeToSec(s.departureTime);

          if (arrS !== null && arrS < curSec && arrS + 86400 >= curSec) {
            arrS += 86400;
          }
          if (depS !== null && depS < (arrS !== null ? arrS : curSec) && depS + 86400 >= (arrS !== null ? arrS : curSec)) {
            depS += 86400;
          }

          if (arrS !== null && arrS < curSec) {
            s.arrivalTime = secToTime(curSec);
            arrS = curSec;
          }
          if (depS !== null && depS < (arrS !== null ? arrS : curSec)) {
            s.departureTime = secToTime(arrS !== null ? arrS : curSec);
            depS = arrS !== null ? arrS : curSec;
          }
          curSec = depS !== null ? depS : (arrS !== null ? arrS : curSec);
        }
      }

      // 境界駅以降・以前の不要区間切り詰め
      if (truncateAAtStation) {
        const stopAIndex = tA.stops.findIndex((s) => s.stationId === stationAId);
        if (stopAIndex !== -1 && stopAIndex < tA.stops.length - 1) {
          tA.stops = tA.stops.slice(0, stopAIndex + 1);
          tA.destinationStationId = stationAId;
        }
      }
      if (truncateBFromStation) {
        const stopBIndex = bestB.stops.findIndex((s) => s.stationId === stationBId);
        if (stopBIndex > 0) {
          bestB.stops = bestB.stops.slice(stopBIndex);
          bestB.originStationId = stationBId;
        }
      }

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
    const dest = curr.customDestination ? cleanStationName(curr.customDestination) : null;
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
    const orig = curr.customOrigin ? cleanStationName(curr.customOrigin) : null;
    return orig || initialStationName || null;
  }

  const resolvedChains = new Set();
  let updatedCount = 0;

  for (const [tripId, trip] of allTripsMap.entries()) {
    if (resolvedChains.has(tripId)) continue;
    if (!trip.throughTripId && !trip.prevTripId) continue;

    let head = trip;
    const visitedBack = new Set([head.tripId]);
    while (head.prevTripId && allTripsMap.has(head.prevTripId)) {
      const p = allTripsMap.get(head.prevTripId);
      if (visitedBack.has(p.tripId)) break;
      visitedBack.add(p.tripId);
      head = p;
    }

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
function executeUniversalThroughLinker() {
  console.log('=== 🚆 汎用直通リンカー基盤 実行開始 ===');

  const stationMap = buildUniversalStationMap();
  console.log(`[Universal Station Map] 全 ${stationMap.size} 駅の名称マスタを自動ロード完了`);

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
        lineTrips.set(lineId, safeReadJson(filePath, []));
      } catch (e) {
        console.error(`Error reading ${lineId}:`, e.message);
      }
    }
  }

  // 既存の直通リンクを安全に初期化
  const allTripsMapForReset = new Map();
  for (const trips of lineTrips.values()) {
    for (const t of trips) {
      allTripsMapForReset.set(t.tripId, t);
    }
  }

  for (const trips of lineTrips.values()) {
    for (const t of trips) {
      if (targetLineIds.has(t.throughLineId)) {
        delete t.throughTripId;
        delete t.throughLineId;
      }
      if (t.prevTripId) {
        const prevTrip = allTripsMapForReset.get(t.prevTripId);
        if (targetLineIds.has(t.prevLineId) || (prevTrip && targetLineIds.has(prevTrip.lineId))) {
          delete t.prevTripId;
          delete t.prevLineId;
        }
      }
    }
  }

  // 重複ゴーストトリップのクリーンアップ
  for (const [lineId, trips] of lineTrips.entries()) {
    const { cleaned, dupCount } = deduplicateLineTrips(trips);
    if (dupCount > 0) {
      console.log(`[Deduplication] ${lineId}: ${dupCount} 件の重複便を除去 (${trips.length} -> ${cleaned.length})`);
      lineTrips.set(lineId, cleaned);
    }
  }

  // 全接続ペアの自動リンク & シームレス時刻同期
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
      stationMap,
      maxTimeDiff: conn.maxTimeDiff || 360,
      requireIdMatch: conn.requireIdMatch || false,
      allowMidStationA: conn.allowMidStationA || false,
      allowMidStationB: conn.allowMidStationB || false,
      allowedDestinations: conn.allowedDestinations || null,
      disallowedDestinations: conn.disallowedDestinations || null,
      allowedOrigins: conn.allowedOrigins || null,
      disallowedOrigins: conn.disallowedOrigins || null,
      exactAllowedDestinations: conn.exactAllowedDestinations || null,
      exactDisallowedDestinations: conn.exactDisallowedDestinations || null,
      exactAllowedOriginsB: conn.exactAllowedOriginsB || null,
      exactDisallowedOriginsB: conn.exactDisallowedOriginsB || null,
      targetDestStationRules: conn.targetDestStationRules || null,
      truncateAAtStation: conn.truncateAAtStation || false,
      truncateBFromStation: conn.truncateBFromStation || false,
    });
  }

  // End-to-End 行先自動解決
  console.log('\n--- End-to-End 最終行先自動同期 ---');
  const allTripsMap = new Map();
  for (const trips of lineTrips.values()) {
    for (const t of trips) {
      allTripsMap.set(t.tripId, t);
    }
  }

  const updatedDestCount = resolveAllChainDestinations(allTripsMap, stationMap);
  console.log(`✅ End-to-End 行先同期完了: ${updatedDestCount} トリップの customDestination を同期・統一`);

  // 相手が存在しない孤立カップリングの自動クリーンアップ
  let orphanCouplingCount = 0;
  for (const trips of lineTrips.values()) {
    for (const t of trips) {
      if (t.coupling && t.coupling.coupledTripId) {
        if (!allTripsMap.has(t.coupling.coupledTripId)) {
          delete t.coupling;
          orphanCouplingCount++;
        }
      }
    }
  }
  if (orphanCouplingCount > 0) {
    console.log(`🧹 相手が存在しない孤立カップリングを ${orphanCouplingCount} 件クリーンアップしました`);
  }

  // 併結相手（coupledTripId）の最新 trainNumber で coupledTrainNumber を全自動同期
  let updatedCoupledNoCount = 0;
  for (const trips of lineTrips.values()) {
    for (const t of trips) {
      if (t.coupling && t.coupling.coupledTripId) {
        const partner = allTripsMap.get(t.coupling.coupledTripId);
        if (partner && isOfficialTrainNumber(partner.trainNumber)) {
          if (t.coupling.coupledTrainNumber !== partner.trainNumber) {
            t.coupling.coupledTrainNumber = partner.trainNumber;
            updatedCoupledNoCount++;
          }
        }
      }
    }
  }
  if (updatedCoupledNoCount > 0) {
    console.log(`🔗 併結相手の公式列車番号（coupledTrainNumber）を ${updatedCoupledNoCount} 件同期更新しました`);
  }

  // 全路線の globalTimetable.json を安全に書き出し
  console.log('\n--- globalTimetable.json 保存 ---');
  for (const [lineId, trips] of lineTrips.entries()) {
    const filePath = path.resolve(`src/data/lines/${lineId}/globalTimetable.json`);
    safeWriteJson(filePath, trips);
  }

  console.log('🎉 汎用直通リンカーによる全路線のシームレス同期 & 行先統一が完了しました！');
}

module.exports = {
  executeUniversalThroughLinker,
};
