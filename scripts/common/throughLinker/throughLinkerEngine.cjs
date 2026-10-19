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

function secToTime(sec) {
  const norm = (Math.floor(sec) + 86400 * 2) % 86400;
  const h = Math.floor(norm / 3600).toString().padStart(2, '0');
  const m = Math.floor((norm % 3600) / 60).toString().padStart(2, '0');
  const s = (norm % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
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

function sortDuplicates(a, b) {
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
}

/**
 * 同一区間・同一時刻の重複ゴーストトリップを安全に除去
 * （併結特急など異なる列車番号を持つ列車は保護して保持）
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
      if (t.coupling) {
        trainKey = `${t.trainNumber || ''}_${t.coupling.role}_${t.customDestination || ''}`;
      } else if (t.tripId && t.tripId.includes('_fuji')) {
        trainKey = `${t.trainNumber || ''}_fuji_${t.customDestination || ''}`;
      } else if (t.trainNumber && t.customDestination) {
        trainKey = `${t.trainNumber}_${t.customDestination}`;
      } else if (t.trainNumber) {
        trainKey = t.trainNumber;
      } else if (extractYahooTrainId(t.tripId)) {
        trainKey = extractYahooTrainId(t.tripId);
      }
      if (!byTrainOrDest.has(trainKey)) byTrainOrDest.set(trainKey, []);
      byTrainOrDest.get(trainKey).push(t);
    }

    // 異なる列車キーを持つ優等列車または併結設定列車が存在する場合、それぞれの列車を保護
    if (byTrainOrDest.size > 1 && list.some(t => isExpressType(t.trainType) || t.coupling || (t.tripId && t.tripId.includes('_fuji')))) {
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

function isExpressType(type) {
  return type && type !== 'local' && type !== 'regular';
}

function areDestinationsCompatible(destA, destB) {
  if (!destA || !destB) return true;
  const cleanA = destA.replace(/\([^)]*\)/g, '').trim();
  const cleanB = destB.replace(/\([^)]*\)/g, '').trim();
  if (cleanA === cleanB || cleanA.includes(cleanB) || cleanB.includes(cleanA)) return true;

  // 会津若松・喜多方の互換性（会津鉄道から只見線・磐越西線直通）
  if ((cleanA === '会津若松' && cleanB === '喜多方') || (cleanA === '喜多方' && cleanB === '会津若松')) {
    return true;
  }

  return false;
}

function getEffectiveDestination(trip, stationMap) {
  if (trip.customDestination) {
    return trip.customDestination.replace(/\([^)]*\)/g, '').trim();
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
    return trip.customOrigin.replace(/\([^)]*\)/g, '').trim();
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

const YURAKUCHO_DESTS = new Set(['新木場', '豊洲', '有楽町', '市ケ谷', '小川町(東武)']);
const FUKUTOSHIN_DESTS = new Set(['元町・中華街', '渋谷', '横浜', '湘南台', '海老名', '武蔵小杉', '菊名', '日吉', '元住吉', '自由が丘']);

// 目黒線・東京メトロ南北線・都営三田線・埼玉高速鉄道の駅群（未対応路線）
const MEGURO_MITA_NANBOKU_STATIONS = new Set([
  '浦和美園', '東川口', '戸塚安行', '新井宿', '鳩ケ谷', '鳩ヶ谷', '南鳩ヶ谷', '川口元郷',
  '赤羽岩淵', '志茂', '王子神谷', '王子', '西ヶ原', '駒込', '本駒込', '東大前', '後楽園',
  '溜池山王', '六本木一丁目', '麻布十番', '白金高輪', '白金台',
  '西高島平', '新高島平', '高島平', '西台', '蓮根', '志村三丁目', '志村坂上', '本蓮沼',
  '板橋本町', '板橋区役所前', '新板橋', '西巣鴨', '巣鴨', '千石', '白山', '春日',
  '水道橋', '神保町', '大手町', '日比谷', '内幸町', '御成門', '芝公園', '三田',
  '目黒', '不動前', '武蔵小山', '西小山', '洗足', '大岡山', '奥沢', '田園調布', '多摩川', '新丸子'
]);

// 東急東横線への直通が許可される行先（東横線・副都心線・東武東上線・西武線・みなとみらい線系統）
const TOYOKO_ALLOWED_DESTS = new Set([
  '渋谷', '新宿三丁目', '池袋', '千川', '要町', '雑司が谷', '西早稲田', '東新宿', '北参道', '明治神宮前',
  '和光市', '地下鉄成増', '地下鉄赤塚', '平和台', '氷川台', '小竹向原',
  '志木', '朝霞台', '朝霞', 'ふじみ野', '川越', '川越市', '森林公園', '小川町',
  '武蔵小杉', '元町・中華街', '日本大通り', '馬車道', 'みなとみらい', '新高島', '横浜',
  '清瀬', '所沢', '保谷', '小手指', '飯能', '石神井公園', 'ひばりヶ丘'
]);

// 東急東横線からの直通が許可される始発駅（東横線・副都心線・東武東上線・西武線系統）
const TOYOKO_ALLOWED_ORIGINS = new Set([
  '渋谷', '新宿三丁目', '池袋', '千川', '要町', '雑司が谷', '西早稲田', '東新宿', '北参道', '明治神宮前',
  '和光市', '地下鉄成増', '地下鉄赤塚', '平和台', '氷川台', '小竹向原',
  '志木', '朝霞台', '朝霞', 'ふじみ野', '川越', '川越市', '森林公園', '小川町',
  '武蔵小杉', '元町・中華街', '日本大通り', '馬車道', 'みなとみらい', '新高島', '横浜',
  '清瀬', '所沢', '保谷', '小手指', '飯能', '石神井公園', 'ひばりヶ丘'
]);

const TAKASAKI_DESTS = new Set(['高崎', '籠原', '深谷', '本庄', '新前橋', '前橋', '渋川', '水上']);
const UTSUNOMIYA_DESTS = new Set(['宇都宮', '小金井', '古河', '黒磯', '氏家', '宝積寺', '那須塩原']);
const JOBAN_DESTS = new Set(['土浦', '勝田', '水戸', 'いわき', '高萩', '仙台', '取手', '成田', '我孫子', '神立', '友部', '日立', '原ノ町']);

function isLineDestinationMismatch(dest, targetLineId) {
  if (!dest) return false;
  if (targetLineId === 'yurakucho') {
    return FUKUTOSHIN_DESTS.has(dest);
  }
  if (targetLineId === 'fukutoshin') {
    return YURAKUCHO_DESTS.has(dest);
  }
  if (targetLineId === 'sotetsu_izumino') {
    return dest.includes('海老名');
  }
  if (targetLineId === 'utsunomiya') {
    return TAKASAKI_DESTS.has(dest) || JOBAN_DESTS.has(dest);
  }
  if (targetLineId === 'takasaki') {
    return UTSUNOMIYA_DESTS.has(dest) || JOBAN_DESTS.has(dest);
  }
  return false;
}

// 埼京線直通が許可される行先（川越線・埼京線系統）
const SAIKYO_ALLOWED_DESTS = new Set([
  '川越', '指扇', '大宮', '大宮(埼玉県)', '南古谷', '赤羽', '池袋', '武蔵浦和'
]);

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
  truncateAAtStation = false,
  truncateBFromStation = false,
}) {
  let linkedCount = 0;

  // 1. stationAId を持つ tripsA を境界駅到着時刻順にソート（急行による追い抜き・順序逆転に対応）
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
        return tA.stops.some((s) => s.stationId === stationAId);
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
        return tB.stops.some((s) => s.stationId === stationBId);
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
    const yIdA = extractYahooTrainId(tA.tripId);
    const noA = tA.trainNumber;
    const destA = getEffectiveDestination(tA, stationMap);

    // 系統不一致フィルタ（有楽町線行きが副都心線に入ったり、その逆を完全に除外）
    if (isLineDestinationMismatch(destA, lineBId)) {
      continue;
    }

    // 【未対応直通先遮断ルール1】東急新横浜線 -> 東急東横線 (日吉駅上り)
    // 目黒線・南北線・三田線方面（浦和美園、西高島平、赤羽岩淵、目黒等）行きは東横線へ直通させず日吉で運行終了
    if (lineAId === 'tokyu_shin_yokohama' && lineBId === 'tokyu_toyoko') {
      if (MEGURO_MITA_NANBOKU_STATIONS.has(destA) || !TOYOKO_ALLOWED_DESTS.has(destA)) {
        continue;
      }
    }

    // 【未対応直通先遮断ルール2】相鉄・JR直通線 -> 埼京線 (新宿駅下り/北行)
    // 湘南新宿ライン（宇都宮線・高崎線系統）や新宿止まり便は埼京線へ直通させない
    if (lineAId === 'sotetsu_jr_direct' && lineBId === 'saikyo') {
      if (!destA || !SAIKYO_ALLOWED_DESTS.has(destA)) {
        continue;
      }
    }

    // 【未対応直通先遮断ルール3】埼京線 -> 相鉄・JR直通線 (新宿駅上り/南行)
    // りんかい線方面（新木場等）や埼京線内止まりは相鉄線へ直通させない
    if (lineAId === 'saikyo' && lineBId === 'sotetsu_jr_direct') {
      if (!destA || !destA.includes('海老名')) {
        continue;
      }
    }

    let bestB = null;
    let bestScore = Infinity;

    for (const tB of sortedCandidatesB) {
      if (tA.isHoliday !== tB.isHoliday) continue;
      if (tB.prevTripId) continue;

      // 【未対応直通先遮断ルール4】東急東横線 -> 東急新横浜線 (日吉駅下り)
      // 目黒線・南北線・三田線始発（浦和美園、西高島平、赤羽岩淵等）、または日吉始発等の東横線経由でない便は除外
      if (lineAId === 'tokyu_toyoko' && lineBId === 'tokyu_shin_yokohama') {
        const origB = getEffectiveOrigin(tB, stationMap);
        if (MEGURO_MITA_NANBOKU_STATIONS.has(origB) || !TOYOKO_ALLOWED_ORIGINS.has(origB)) {
          continue;
        }
      }

      // 相鉄新横浜線 -> 相鉄本線 (西谷駅下り)
      // 湘南台行きは二俣川（SO-10）止まり（いずみ野線直通前提）のトリップに接続
      if (lineAId === 'sotetsu_shin_yokohama' && lineBId === 'sotetsu_main') {
        if (destA && destA.includes('湘南台') && tB.destinationStationId !== 'SO-10') {
          continue;
        }
      }

      const stopB = allowMidStationB
        ? tB.stops.find((s) => s.stationId === stationBId)
        : tB.stops[0];
      if (!stopB) continue;

      const tBSec = timeToSec(stopB.departureTime || stopB.arrivalTime);
      const waitSec = tBSec - tASec;
      const diff = Math.abs(waitSec);
      const yIdB = extractYahooTrainId(tB.tripId);
      const noB = tB.trainNumber;
      const destB = getEffectiveDestination(tB, stationMap);

      // 1. 完全一致 (Yahoo trainId または 公式列車番号)
      // 同一列車番号またはYahoo IDを持つ列車は一意であるため、因果律を満たしていれば固定のmaxTimeDiffに縛られず自動マッチ（連結作業や長時間停車にも完全対応）
      const isIdMatch = (yIdA && yIdB && yIdA === yIdB) || (noA && noB && noA === noB);
      if (isIdMatch && waitSec >= -60 && waitSec <= 7200) {
        // 行先が両方存在し、かつ互換性がない場合は誤マッチ（併結列車の別編成など）なので即決しない
        if (destA && destB && !areDestinationsCompatible(destA, destB)) {
          // スキップして次の候補へ
        } else {
          bestB = tB;
          bestScore = -9999;
          break;
        }
      }

      if (requireIdMatch) continue;

      // 2. 因果律: 出発時刻は到着時刻以降（ダイヤ丸め誤差 -30秒まで許容）
      // 行先が相手路線を明示している直通便は最大1800秒（30分）まで自動許容、一般普通列車はデフォルト900秒（15分）
      const isDestCompatible = destA && destB && areDestinationsCompatible(destA, destB);
      const effectiveMaxWait = isDestCompatible
        ? Math.max(maxTimeDiff || 900, 1800)
        : (maxTimeDiff || 900);

      if (waitSec < -30 || waitSec > effectiveMaxWait) continue;

      let score = Math.max(0, waitSec); // 待機時間が短いほど好ましい

      // 行先整合性スコア
      if (destA && destB) {
        if (areDestinationsCompatible(destA, destB)) {
          score -= 2000; // 一致ボーナス
        } else {
          score += 8000; // 不一致ペナルティ（誤マッチ防止）
        }
      }

      // 優等/普通整合性ボーナス
      if (isExpressType(tA.trainType) === isExpressType(tB.trainType)) {
        score -= 300;
      }

      // 併結・分割支線列車（富士回遊 _fuji 等）の親・子系統整合性ボーナス
      const fujiNumbers = new Set(['2103M', '2107M', '2111M', '2115M', '8111M', '9193M', '2132M', '2136M', '2144M', '2148M', '8194M', '9178M']);
      const isFujiA = (tA.tripId && tA.tripId.includes('_fuji')) ||
                      (tA.customDestination && tA.customDestination.includes('河口湖')) ||
                      tA.destinationStationId === 'FJ-18' ||
                      tA.originStationId === 'FJ-18' ||
                      tA.prevLineId === 'fujikyu' ||
                      tA.throughLineId === 'fujikyu' ||
                      fujiNumbers.has(tA.trainNumber);
      const isFujiB = (tB.tripId && tB.tripId.includes('_fuji')) ||
                      (tB.customDestination && tB.customDestination.includes('河口湖')) ||
                      tB.destinationStationId === 'FJ-18' ||
                      tB.originStationId === 'FJ-18' ||
                      tB.prevLineId === 'fujikyu' ||
                      tB.throughLineId === 'fujikyu' ||
                      fujiNumbers.has(tB.trainNumber);
      if (isFujiA && isFujiB) {
        score -= 4000;
      } else if (isFujiA !== isFujiB) {
        score += 4000; // 富士回遊が甲府行きかいじとクロス誤マッチするのを防止
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

      // 公式列車番号の相互補完（片方が公式列車番号を持っていて他方が数字IDのみの場合）
      const isOfficial = (no) => no && !/^\d+$/.test(no);
      if (isOfficial(tA.trainNumber) && !isOfficial(bestB.trainNumber)) {
        bestB.trainNumber = tA.trainNumber;
      } else if (isOfficial(bestB.trainNumber) && !isOfficial(tA.trainNumber)) {
        tA.trainNumber = bestB.trainNumber;
      }

      // 【必須】境界駅でのシームレス時刻同期 (空白時間による列車消失の完全防止)
      const stopB = allowMidStationB
        ? bestB.stops.find((s) => s.stationId === stationBId)
        : bestB.stops[0];

      const syncArr = stopA.arrivalTime || stopA.departureTime;
      stopA.departureTime = syncArr;         // 先行路線は到着完了
      if (stopB) {
        stopB.arrivalTime = syncArr;         // 後続路線は到着した瞬間から発車待ち開始
        const syncSec = timeToSec(syncArr);
        if (timeToSec(stopB.departureTime) < syncSec) {
          stopB.departureTime = syncArr;
        }
        // 先行路線の境界駅発車時刻も後続路線の発車時刻に同期（境界駅停車時間・発車標時刻の統一）
        if (stopB.departureTime && timeToSec(stopB.departureTime) >= syncSec) {
          stopA.departureTime = stopB.departureTime;
        }

        // 後続駅の時刻が境界駅の発車時刻より前になって逆転することを防止
        const stopBIndex = bestB.stops.indexOf(stopB);
        let curSec = timeToSec(stopB.departureTime);
        for (let k = stopBIndex + 1; k < bestB.stops.length; k++) {
          const s = bestB.stops[k];
          let arrS = timeToSec(s.arrivalTime);
          let depS = timeToSec(s.departureTime);
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

      // 境界駅以降・以前の不要区間切り詰め（重複区間解消・正しい境界発着化）
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
      stationMap,
      maxTimeDiff: conn.maxTimeDiff || 360,
      requireIdMatch: conn.requireIdMatch || false,
      allowMidStationA: conn.allowMidStationA || false,
      allowMidStationB: conn.allowMidStationB || false,
      allowedDestinations: conn.allowedDestinations || null,
      disallowedDestinations: conn.disallowedDestinations || null,
      allowedOrigins: conn.allowedOrigins || null,
      disallowedOrigins: conn.disallowedOrigins || null,
      truncateAAtStation: conn.truncateAAtStation || false,
      truncateBFromStation: conn.truncateBFromStation || false,
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

  // 5.5 相手が存在しない孤立カップリングの自動クリーンアップ
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

  // 5.6 併結相手（coupledTripId）の最新 trainNumber で coupledTrainNumber を全自動同期
  let updatedCoupledNoCount = 0;
  for (const trips of lineTrips.values()) {
    for (const t of trips) {
      if (t.coupling && t.coupling.coupledTripId) {
        const partner = allTripsMap.get(t.coupling.coupledTripId);
        if (partner && partner.trainNumber && !/^\d+$/.test(partner.trainNumber)) {
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

  // 6. 全路線の globalTimetable.json を安全に書き出し
  console.log('\n--- globalTimetable.json 保存 ---');
  for (const [lineId, trips] of lineTrips.entries()) {
    const filePath = path.resolve(`src/data/lines/${lineId}/globalTimetable.json`);
    const content = JSON.stringify(trips, null, 2);
    let attempts = 0;
    while (attempts < 5) {
      try {
        fs.writeFileSync(filePath, content, 'utf8');
        break;
      } catch (e) {
        attempts++;
        if (attempts >= 5) throw e;
        const start = Date.now();
        while (Date.now() - start < 100) {}
      }
    }
  }

  console.log('🎉 汎用直通リンカーによる全路線のシームレス同期 & 行先統一が完了しました！');
}

module.exports = {
  executeUniversalThroughLinker,
};
