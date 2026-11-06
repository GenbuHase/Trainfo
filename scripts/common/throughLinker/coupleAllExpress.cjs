// 全路線 併結（Coupling）および欠落支線トリップ復元エンジン
// couplingRulesConfig.cjs の宣言的ルールに基づいて併結設定を一括適用します。

const fs = require('fs');
const path = require('path');
const { coupleTobuExpress } = require('./coupleTobuExpress.cjs');
const couplingConfig = require('./couplingRulesConfig.cjs');
const YahooTimetableBuilder = require('../yahoo/YahooTimetableBuilder.cjs');
const {
  rawTimeToSec,
  safeReadJson,
  safeWriteJson,
  extractTrainId,
  isOfficialTrainNumber,
  applySymmetricCoupling,
} = require('../timetableUtils.cjs');

/**
 * 東北新幹線の下り支線直通（つばさ・こまち）トリップを宣言設定に基づき復元注入
 */
function restoreTohokuDownTrips(thTrips) {
  const thRule = couplingConfig.tohokuShinkansen;
  const thLineConfig = require(`../../lines/${thRule.lineId}/config.cjs`);
  const thBuilder = new YahooTimetableBuilder(thLineConfig);

  const officialNoMap = new Map();
  const allDetails = [];
  const allGenerated = [];

  for (const branch of thRule.branchRestorations) {
    const cachePath = path.resolve(`scripts/cache/yahoo/${branch.branchLineId}/all_train_details.json`);
    if (!fs.existsSync(cachePath)) continue;

    const details = safeReadJson(cachePath, []);
    allDetails.push(...details);

    const gtPath = path.resolve(`src/data/lines/${branch.branchLineId}/globalTimetable.json`);
    if (fs.existsSync(gtPath)) {
      const gt = safeReadJson(gtPath, []);
      for (const t of gt) {
        if (t.trainId && isOfficialTrainNumber(t.trainNumber)) {
          officialNoMap.set(t.trainId, t.trainNumber);
        }
      }
    }

    const downDetails = details.filter(
      t =>
        t.direction === 'outbound' &&
        t.displayName.includes(branch.keyword) &&
        t.stopStation.some(s => s.stationName === branch.terminalName)
    );
    const generated = thBuilder.buildGlobalTimetable(downDetails);
    for (const g of generated) {
      allGenerated.push({ trip: g, branch });
    }
  }

  const existingIds = new Set(
    thTrips.map(t => t.tripId || `${t.isHoliday ? 'H' : 'W'}_${t.direction}_${t.trainId || t.trainNumber}`)
  );

  let added = 0;
  for (const { trip: t, branch } of allGenerated) {
    const originalTrainId = t.trainId || t.trainNumber;
    t.trainId = originalTrainId;

    if (officialNoMap.has(originalTrainId)) {
      t.trainNumber = officialNoMap.get(originalTrainId);
    } else {
      const detail = allDetails.find(d => d.trainId === originalTrainId);
      if (detail && detail.displayName) {
        const re = new RegExp(`${branch.keyword}(\\d+)号`);
        const m = detail.displayName.match(re);
        if (m && branch.trainNumberFormula) {
          t.trainNumber = branch.trainNumberFormula(parseInt(m[1], 10));
        }
      }
    }

    const key = t.tripId || `${t.isHoliday ? 'H' : 'W'}_${t.direction}_${originalTrainId}`;
    if (!existingIds.has(key)) {
      thTrips.push(t);
      existingIds.add(key);
      added++;
    }
  }
  console.log(`[coupleAllExpress] 東北新幹線に下り支線直通便 ${added} 便を公式番号で復元注入`);
  return thTrips;
}

/**
 * 東海道線の下り修善寺踊り子トリップを宣言設定に基づき復元注入
 */
function restoreTokaidoDownTrips(tkTrips) {
  const rule = couplingConfig.tokaidoOdoriko;
  const redundantIds = new Set(rule.redundantTripIds);
  const cleaned = tkTrips.filter(t => !redundantIds.has(t.tripId));

  const hasSecondaryOut = cleaned.some(
    t =>
      t.direction === 'outbound' &&
      ((t.customDestination && t.customDestination.includes(rule.secondaryDestOut)) ||
        (t.destinationStationName && t.destinationStationName.includes(rule.secondaryDestOut)) ||
        (t.trainNumber && rule.secondaryTrainNumberRegex.test(t.trainNumber)))
  );
  if (hasSecondaryOut) {
    return cleaned;
  }

  const tkConfig = require(`../../lines/${rule.lineId}/config.cjs`);
  const tkBuilder = new YahooTimetableBuilder(tkConfig);

  const branchCachePath = path.resolve(`scripts/cache/yahoo/${rule.branchLineId}/all_train_details.json`);
  if (!fs.existsSync(branchCachePath)) return cleaned;

  const branchDetails = safeReadJson(branchCachePath, []);
  const downDetails = branchDetails.filter(
    t =>
      t.direction === 'outbound' &&
      t.displayName.includes(rule.keyword) &&
      t.stopStation.some(s => s.stationName === rule.terminalName)
  );

  const generated = tkBuilder.buildGlobalTimetable(downDetails);
  const existingIds = new Set(
    cleaned.map(t => t.tripId || `${t.isHoliday ? 'H' : 'W'}_${t.direction}_${t.trainId || t.trainNumber}`)
  );

  let added = 0;
  for (const t of generated) {
    const key = t.tripId || `${t.isHoliday ? 'H' : 'W'}_${t.direction}_${t.trainId || t.trainNumber}`;
    if (!existingIds.has(key)) {
      t.destinationStationName = rule.secondaryDestOut;
      cleaned.push(t);
      existingIds.add(key);
      added++;
    }
  }
  console.log(`[coupleAllExpress] 東海道線に下り修善寺踊り子 ${added} 便を復元注入`);
  return cleaned;
}

/**
 * 1. 東北新幹線（やまびこ＋つばさ、はやぶさ＋こまち）の併結
 */
function coupleTohokuShinkansen() {
  console.log('\n=== 🚄 東北新幹線（やまびこ+つばさ、はやぶさ+こまち）カップリング ===');
  const rule = couplingConfig.tohokuShinkansen;
  const filePath = path.resolve(`src/data/lines/${rule.lineId}/globalTimetable.json`);
  if (!fs.existsSync(filePath)) return;
  let trips = safeReadJson(filePath, []);

  trips = restoreTohokuDownTrips(trips);

  const thConfig = require(`../../lines/${rule.lineId}/config.cjs`);
  const thStationsMap = new Map((thConfig.stations || []).map(s => [s.id, s.name]));

  function getTripFinalDest(trip) {
    if (trip.customDestination) return trip.customDestination;
    if (trip.destinationStationId && thStationsMap.has(trip.destinationStationId)) {
      return thStationsMap.get(trip.destinationStationId);
    }
    const last = trip.stops && trip.stops[trip.stops.length - 1];
    if (last && last.stationId && thStationsMap.has(last.stationId)) {
      return thStationsMap.get(last.stationId);
    }
    return '';
  }

  for (const t of trips) delete t.coupling;

  let count = 0;

  for (const isHoliday of [false, true]) {
    for (const dir of ['outbound', 'inbound']) {
      const dirTrips = trips.filter(t => t.isHoliday === isHoliday && t.direction === dir);

      for (const pairRule of rule.pairs) {
        const primaries = dirTrips.filter(t => t.trainType === pairRule.primaryType);
        const secondaries = dirTrips.filter(t => t.trainType === pairRule.secondaryType);

        for (const pri of primaries) {
          if (pri.coupling) continue;
          const priRefStop = pri.stops.find(s => s.stationId === pairRule.refStationId);
          if (!priRefStop) continue;
          const priTime = dir === 'outbound' ? priRefStop.departureTime : priRefStop.arrivalTime;

          const sec = secondaries.find(cand => {
            if (cand.coupling) return false;
            const secRefStop = cand.stops.find(s => s.stationId === pairRule.refStationId);
            if (!secRefStop) return false;
            const secTime = dir === 'outbound' ? secRefStop.departureTime : secRefStop.arrivalTime;
            return Math.abs(rawTimeToSec(secTime) - rawTimeToSec(priTime)) <= pairRule.maxTimeDiffSec;
          });

          if (sec) {
            const fromSt =
              dir === 'outbound'
                ? pairRule.refStationId
                : sec.stops[0]?.stationId || pairRule.defaultSplitStationId;
            const toSt =
              dir === 'outbound'
                ? sec.stops[sec.stops.length - 1]?.stationId || pairRule.defaultSplitStationId
                : pairRule.refStationId;

            if (dir === 'inbound') {
              if (pri.destinationStationId === pairRule.refStationId) delete pri.customDestination;
              if (sec.destinationStationId === pairRule.refStationId) delete sec.customDestination;
            }

            const priDest =
              getTripFinalDest(pri) ||
              (dir === 'outbound' ? pairRule.defaultPrimaryDestOut : pairRule.defaultDestIn);
            const secDest =
              getTripFinalDest(sec) ||
              (dir === 'outbound' ? pairRule.defaultSecondaryDestOut : pairRule.defaultDestIn);

            applySymmetricCoupling(pri, sec, {
              fromStationId: fromSt,
              toStationId: toSt,
              primaryCars: pairRule.primaryCars,
              secondaryCars: pairRule.secondaryCars,
              primaryDest: priDest,
              secondaryDest: secDest,
            });
            count += 2;
          }
        }
      }
    }
  }

  const tripMap = new Map(trips.map(t => [t.tripId, t]));
  for (const t of trips) {
    if (t.coupling && t.coupling.coupledTripId) {
      const partner = tripMap.get(t.coupling.coupledTripId);
      if (partner && isOfficialTrainNumber(partner.trainNumber)) {
        t.coupling.coupledTrainNumber = partner.trainNumber;
      }
    }
  }

  safeWriteJson(filePath, trips);
  console.log(`  -> 東北新幹線: ${count} 件の併結トリップを設定完了`);
}

/**
 * 中央線快速の富士回遊トリップ（下り・上り）を復元注入
 */
function restoreChuoFujiKaiyuTrips(chuoTrips, cmTrips) {
  const rule = couplingConfig.chuoFujiKaiyu;
  chuoTrips = chuoTrips.filter(t => !t.tripId.includes('_fuji'));
  const existingIds = new Set(chuoTrips.map(t => t.tripId));
  const fujiNumbers = rule.fujiTrainNumbers;
  const boundarySt = rule.boundaryStationId;

  let addedOut = 0;
  let addedIn = 0;

  // 1. 下り (Outbound): 新宿 -> 高尾
  const cmOutFuji = cmTrips.filter(
    t => t.direction === 'outbound' && (t.throughLineId === rule.branchLineId || fujiNumbers.includes(t.trainNumber))
  );
  for (const fujiCM of cmOutFuji) {
    const fujiDepTakao = fujiCM.stops[0]?.departureTime;
    if (!fujiDepTakao) continue;
    const fujiSec = rawTimeToSec(fujiDepTakao);

    const existingSolo = chuoTrips.find(
      c =>
        c.direction === 'outbound' &&
        c.isHoliday === fujiCM.isHoliday &&
        !c.tripId.includes('_fuji') &&
        c.customDestination === rule.branchDestName &&
        Math.abs(rawTimeToSec(c.stops[c.stops.length - 1]?.arrivalTime) - fujiSec) <= 180
    );
    if (existingSolo) {
      existingSolo.throughTripId = fujiCM.tripId;
      existingSolo.throughLineId = 'chuo_main';
      fujiCM.prevTripId = existingSolo.tripId;
      fujiCM.prevLineId = 'chuo';
      continue;
    }

    let parentChuo = null;
    if (fujiCM.coupling && fujiCM.coupling.coupledTripId) {
      parentChuo = chuoTrips.find(
        c =>
          c.direction === 'outbound' &&
          c.isHoliday === fujiCM.isHoliday &&
          c.throughTripId === fujiCM.coupling.coupledTripId
      );
    }
    if (!parentChuo) {
      const candidates = chuoTrips.filter(
        c =>
          c.direction === 'outbound' &&
          c.isHoliday === fujiCM.isHoliday &&
          c.trainType === 'limitedExp' &&
          c.stops[c.stops.length - 1]?.stationId === boundarySt &&
          Math.abs(rawTimeToSec(c.stops[c.stops.length - 1]?.arrivalTime) - fujiSec) <= 180
      );

      candidates.sort((a, b) => {
        const expA = a.trainType === 'limitedExp' ? 1 : 0;
        const expB = b.trainType === 'limitedExp' ? 1 : 0;
        if (expA !== expB) return expB - expA;
        const diffA = Math.abs(rawTimeToSec(a.stops[a.stops.length - 1]?.arrivalTime) - fujiSec);
        const diffB = Math.abs(rawTimeToSec(b.stops[b.stops.length - 1]?.arrivalTime) - fujiSec);
        return diffA - diffB;
      });
      parentChuo = candidates[0];
    }

    if (parentChuo) {
      if (parentChuo.trainNumber === fujiCM.trainNumber) {
        const azusaCM = cmTrips.find(
          c =>
            c.direction === 'outbound' &&
            c.isHoliday === fujiCM.isHoliday &&
            c.tripId !== fujiCM.tripId &&
            c.stops[0]?.stationId === boundarySt &&
            Math.abs(rawTimeToSec(c.stops[0]?.departureTime) - fujiSec) <= 60 &&
            c.trainNumber !== fujiCM.trainNumber
        );
        if (azusaCM && azusaCM.trainNumber) {
          parentChuo.trainNumber = azusaCM.trainNumber;
          parentChuo.customDestination = azusaCM.customDestination || '松本';
        }
      }

      const yId = extractTrainId(fujiCM);
      const fujiTripId = parentChuo.tripId.replace(/_\d+$/, `_${yId}_fuji`);
      if (!existingIds.has(fujiTripId)) {
        const newTrip = {
          ...JSON.parse(JSON.stringify(parentChuo)),
          tripId: fujiTripId,
          trainId: yId,
          trainNumber: fujiCM.trainNumber || parentChuo.trainNumber,
          customDestination: rule.branchDestName,
          cars: rule.secondaryCars,
          throughTripId: fujiCM.tripId,
          throughLineId: 'chuo_main',
        };
        const lastStop = newTrip.stops[newTrip.stops.length - 1];
        if (lastStop) {
          lastStop.arrivalTime = fujiDepTakao;
          lastStop.departureTime = fujiDepTakao;
        }
        delete newTrip.coupling;
        chuoTrips.push(newTrip);
        existingIds.add(fujiTripId);
        fujiCM.prevTripId = fujiTripId;
        fujiCM.prevLineId = 'chuo';
        addedOut++;
      }
    }
  }

  // 2. 上り (Inbound): 高尾 -> 新宿
  const cmInFuji = cmTrips.filter(
    t => t.direction === 'inbound' && (t.prevLineId === rule.branchLineId || fujiNumbers.includes(t.trainNumber))
  );
  for (const fujiCM of cmInFuji) {
    const fujiArrTakao = fujiCM.stops[fujiCM.stops.length - 1]?.arrivalTime;
    if (!fujiArrTakao) continue;
    const fujiSec = rawTimeToSec(fujiArrTakao);

    const existingSolo = chuoTrips.find(
      c =>
        c.direction === 'inbound' &&
        c.isHoliday === fujiCM.isHoliday &&
        !c.tripId.includes('_fuji') &&
        c.stops[0]?.stationId === boundarySt &&
        c.prevTripId === fujiCM.tripId
    );
    if (existingSolo) continue;

    let parentChuo = null;
    if (fujiCM.coupling && fujiCM.coupling.coupledTripId) {
      parentChuo = chuoTrips.find(
        c =>
          c.direction === 'inbound' &&
          c.isHoliday === fujiCM.isHoliday &&
          c.prevTripId === fujiCM.coupling.coupledTripId
      );
    }
    if (!parentChuo) {
      const candidates = chuoTrips.filter(
        c =>
          c.direction === 'inbound' &&
          c.isHoliday === fujiCM.isHoliday &&
          c.trainType === 'limitedExp' &&
          c.stops[0]?.stationId === boundarySt &&
          Math.abs(rawTimeToSec(c.stops[0]?.departureTime) - fujiSec) <= 180
      );

      candidates.sort((a, b) => {
        const expA = a.trainType === 'limitedExp' ? 1 : 0;
        const expB = b.trainType === 'limitedExp' ? 1 : 0;
        if (expA !== expB) return expB - expA;
        const diffA = Math.abs(rawTimeToSec(a.stops[0]?.departureTime) - fujiSec);
        const diffB = Math.abs(rawTimeToSec(b.stops[0]?.departureTime) - fujiSec);
        return diffA - diffB;
      });
      parentChuo = candidates[0];
    }

    if (parentChuo) {
      if (parentChuo.trainNumber === fujiCM.trainNumber) {
        const azusaCM = cmTrips.find(
          c =>
            c.direction === 'inbound' &&
            c.isHoliday === fujiCM.isHoliday &&
            c.tripId !== fujiCM.tripId &&
            c.stops[c.stops.length - 1]?.stationId === boundarySt &&
            Math.abs(rawTimeToSec(c.stops[c.stops.length - 1]?.arrivalTime) - fujiSec) <= 60 &&
            c.trainNumber !== fujiCM.trainNumber
        );
        if (azusaCM && azusaCM.trainNumber) {
          parentChuo.trainNumber = azusaCM.trainNumber;
        }
      }

      const yId = extractTrainId(fujiCM);
      const fujiTripId = parentChuo.tripId.replace(/_\d+$/, `_${yId}_fuji`);
      if (!existingIds.has(fujiTripId)) {
        const newTrip = {
          ...JSON.parse(JSON.stringify(parentChuo)),
          tripId: fujiTripId,
          trainId: yId,
          trainNumber: fujiCM.trainNumber || parentChuo.trainNumber,
          customDestination: rule.defaultInboundDestName,
          cars: rule.secondaryCars,
          prevTripId: fujiCM.tripId,
          prevLineId: 'chuo_main',
        };
        const firstStop = newTrip.stops[0];
        if (firstStop) {
          firstStop.departureTime = fujiArrTakao;
          firstStop.arrivalTime = fujiArrTakao;
        }
        delete newTrip.coupling;
        chuoTrips.push(newTrip);
        existingIds.add(fujiTripId);
        fujiCM.throughTripId = fujiTripId;
        fujiCM.throughLineId = 'chuo';
        addedIn++;
      }
    }
  }

  console.log(`[coupleAllExpress] 中央線快速に下り富士回遊 ${addedOut} 便、上り富士回遊 ${addedIn} 便を復元注入`);
  return chuoTrips;
}

/**
 * 2. 中央線快速・中央本線（あずさ/かいじ ＋ 富士回遊）の併結
 */
function coupleChuoFujiKaiyu() {
  console.log('\n=== 🏔️ 中央線・中央本線（あずさ/かいじ + 富士回遊）カップリング ===');
  const rule = couplingConfig.chuoFujiKaiyu;
  const cmPath = path.resolve('src/data/lines/chuo_main/globalTimetable.json');
  const chuoPath = path.resolve('src/data/lines/chuo/globalTimetable.json');
  if (!fs.existsSync(cmPath) || !fs.existsSync(chuoPath)) return;

  const cmTrips = safeReadJson(cmPath, []);
  let chuoTrips = safeReadJson(chuoPath, []);

  chuoTrips = restoreChuoFujiKaiyuTrips(chuoTrips, cmTrips);

  for (const t of cmTrips) delete t.coupling;
  for (const t of chuoTrips) delete t.coupling;

  let countCM = 0;
  let countChuo = 0;

  const splitSt = rule.splitStationId;
  const boundarySt = rule.boundaryStationId;

  // (A) 中央本線 (高尾〜大月間) のカップリング
  for (const isHoliday of [false, true]) {
    for (const dir of ['outbound', 'inbound']) {
      const dirTrips = cmTrips.filter(t => t.isHoliday === isHoliday && t.direction === dir);
      const ltdExps = dirTrips.filter(
        t =>
          (t.trainType === 'limitedExp' || t.trainType === 'regular') &&
          t.stops.some(s => s.stationId === splitSt)
      );

      for (let i = 0; i < ltdExps.length; i++) {
        const t1 = ltdExps[i];
        if (t1.coupling) continue;
        const s1 = t1.stops.find(s => s.stationId === splitSt);
        if (!s1) continue;
        const time1 = dir === 'outbound' ? (s1.arrivalTime || s1.departureTime) : (s1.departureTime || s1.arrivalTime);

        for (let j = i + 1; j < ltdExps.length; j++) {
          const t2 = ltdExps[j];
          if (t2.coupling) continue;
          const s2 = t2.stops.find(s => s.stationId === splitSt);
          if (!s2) continue;
          const time2 = dir === 'outbound' ? (s2.arrivalTime || s2.departureTime) : (s2.departureTime || s2.arrivalTime);

          if (Math.abs(rawTimeToSec(time1) - rawTimeToSec(time2)) <= rule.maxTimeDiffCM) {
            const checkFujiCM = (t) => {
              return (
                (t.destinationStationName && t.destinationStationName.includes(rule.branchDestName)) ||
                (t.customDestination && t.customDestination.includes(rule.branchDestName)) ||
                t.throughLineId === rule.branchLineId ||
                t.prevLineId === rule.branchLineId ||
                (t.trainNumber && t.trainNumber.includes('富士回遊')) ||
                (t.tripId && t.tripId.includes('_fuji')) ||
                (dir === 'outbound' && t.stops[t.stops.length - 1]?.stationId === splitSt) ||
                (dir === 'inbound' && t.stops[0]?.stationId === splitSt)
              );
            };

            const isT1Fuji = checkFujiCM(t1);
            const isT2Fuji = checkFujiCM(t2);
            if (isT1Fuji === isT2Fuji) continue;

            const pri = isT1Fuji ? t2 : t1;
            const sec = isT1Fuji ? t1 : t2;

            const fromSt = dir === 'outbound' ? (pri.stops[0]?.stationId || boundarySt) : splitSt;
            const toSt = dir === 'outbound' ? splitSt : (pri.stops[pri.stops.length - 1]?.stationId || boundarySt);

            if (dir === 'outbound') {
              pri.customDestination = pri.destinationStationName || pri.customDestination || rule.defaultMainDestName;
              sec.customDestination = rule.branchDestName;
            } else {
              pri.customDestination = pri.destinationStationName || pri.customDestination || rule.defaultInboundDestName;
              sec.customDestination = rule.defaultInboundDestName;
            }

            applySymmetricCoupling(pri, sec, {
              fromStationId: fromSt,
              toStationId: toSt,
              primaryCars: rule.primaryCars,
              secondaryCars: rule.secondaryCars,
              primaryDest: dir === 'outbound' ? (pri.customDestination || rule.defaultMainDestName) : rule.defaultInboundDestName,
              secondaryDest: dir === 'outbound' ? rule.branchDestName : rule.defaultInboundDestName,
            });

            countCM += 2;
            break;
          }
        }
      }
    }
  }

  // (B) 中央線快速 (新宿〜高尾間) のカップリング
  for (const isHoliday of [false, true]) {
    for (const dir of ['outbound', 'inbound']) {
      const dirTrips = chuoTrips.filter(t => t.isHoliday === isHoliday && t.direction === dir);
      const ltdExps = dirTrips.filter(
        t =>
          (t.trainType === 'limitedExp' || t.trainType === 'regular') &&
          t.stops.some(s => s.stationId === boundarySt)
      );

      for (let i = 0; i < ltdExps.length; i++) {
        const t1 = ltdExps[i];
        if (t1.coupling) continue;
        const s1 = t1.stops.find(s => s.stationId === boundarySt);
        if (!s1) continue;
        const time1 = dir === 'outbound' ? s1.arrivalTime : s1.departureTime;

        for (let j = i + 1; j < ltdExps.length; j++) {
          const t2 = ltdExps[j];
          if (t2.coupling) continue;
          const s2 = t2.stops.find(s => s.stationId === boundarySt);
          if (!s2) continue;
          const time2 = dir === 'outbound' ? s2.arrivalTime : s2.departureTime;

          if (Math.abs(rawTimeToSec(time1) - rawTimeToSec(time2)) <= rule.maxTimeDiffChuo) {
            const checkFujiChuo = (t) => {
              return (
                (t.customDestination && t.customDestination.includes(rule.branchDestName)) ||
                (t.customOrigin && t.customOrigin.includes(rule.branchDestName)) ||
                (t.trainName && t.trainName.includes('富士回遊')) ||
                t.throughLineId === rule.branchLineId ||
                t.prevLineId === rule.branchLineId ||
                (t.trainNumber && t.trainNumber.includes('富士回遊')) ||
                (t.tripId && (t.tripId.includes('_fuji') || rule.fujiSpecialTrainIds.some(id => t.tripId.includes(id))))
              );
            };

            const isT1Fuji = checkFujiChuo(t1);
            const isT2Fuji = checkFujiChuo(t2);
            if (isT1Fuji === isT2Fuji) continue;

            const pri = isT1Fuji ? t2 : t1;
            const sec = isT1Fuji ? t1 : t2;

            // 隣接路線（中央本線）でのカップリング相手との整合性ガード
            if (dir === 'inbound') {
              if (pri.prevTripId && sec.prevTripId) {
                const priCM = cmTrips.find(c => c.tripId === pri.prevTripId);
                if (priCM && priCM.coupling && priCM.coupling.coupledTripId !== sec.prevTripId) {
                  continue;
                }
              }
            } else {
              if (pri.throughTripId && sec.throughTripId) {
                const priCM = cmTrips.find(c => c.tripId === pri.throughTripId);
                if (priCM && priCM.coupling && priCM.coupling.coupledTripId !== sec.throughTripId) {
                  continue;
                }
              }
            }

            const fromSt = dir === 'outbound' ? (pri.stops[0]?.stationId || rule.defaultTerminalStationId) : boundarySt;
            const toSt = dir === 'outbound' ? boundarySt : (pri.stops[pri.stops.length - 1]?.stationId || rule.defaultTerminalStationId);

            if (dir === 'outbound') {
              pri.customDestination = pri.destinationStationName || pri.customDestination || rule.defaultMainDestName;
              sec.customDestination = rule.branchDestName;
            } else {
              pri.customDestination = pri.destinationStationName || pri.customDestination || rule.defaultInboundDestName;
              sec.customDestination = rule.defaultInboundDestName;
            }

            applySymmetricCoupling(pri, sec, {
              fromStationId: fromSt,
              toStationId: toSt,
              primaryCars: rule.primaryCars,
              secondaryCars: rule.secondaryCars,
              primaryDest: dir === 'outbound' ? (pri.customDestination || rule.defaultMainDestName) : rule.defaultInboundDestName,
              secondaryDest: dir === 'outbound' ? rule.branchDestName : rule.defaultInboundDestName,
            });

            countChuo += 2;
            break;
          }
        }
      }
    }
  }

  safeWriteJson(cmPath, cmTrips);
  safeWriteJson(chuoPath, chuoTrips);
  console.log(`  -> 中央本線: ${countCM} 件、中央線快速: ${countChuo} 件の併結トリップを設定完了`);
}

/**
 * 3. 東海道線（特急踊り子 下田行 ＋ 修善寺行）の併結
 */
function coupleTokaidoOdoriko() {
  console.log('\n=== 🌊 東海道線（特急踊り子 下田行 + 修善寺行）カップリング ===');
  const rule = couplingConfig.tokaidoOdoriko;
  const filePath = path.resolve(`src/data/lines/${rule.lineId}/globalTimetable.json`);
  if (!fs.existsSync(filePath)) return;
  let trips = safeReadJson(filePath, []);

  trips = restoreTokaidoDownTrips(trips);
  for (const t of trips) delete t.coupling;

  let count = 0;

  for (const isHoliday of [false, true]) {
    for (const dir of ['outbound', 'inbound']) {
      const dirTrips = trips.filter(t => t.isHoliday === isHoliday && t.direction === dir);
      const ltdExps = dirTrips.filter(
        t =>
          (t.trainType === 'limitedExp' || (t.trainNumber && t.trainNumber.includes(rule.keyword))) &&
          t.stops.some(s => s.stationId === rule.splitStationId)
      );

      for (let i = 0; i < ltdExps.length; i++) {
        const t1 = ltdExps[i];
        if (t1.coupling) continue;
        const s1 = t1.stops.find(s => s.stationId === rule.splitStationId);
        if (!s1) continue;
        const time1 = dir === 'outbound' ? (s1.arrivalTime || s1.departureTime) : s1.arrivalTime;

        for (let j = i + 1; j < ltdExps.length; j++) {
          const t2 = ltdExps[j];
          if (t2.coupling) continue;
          const s2 = t2.stops.find(s => s.stationId === rule.splitStationId);
          if (!s2) continue;
          const time2 = dir === 'outbound' ? (s2.arrivalTime || s2.departureTime) : s2.arrivalTime;

          const t1Term = t1.stops.find(s => s.stationId === rule.terminalStationId);
          const t2Term = t2.stops.find(s => s.stationId === rule.terminalStationId);
          const termMatch =
            t1Term &&
            t2Term &&
            ((dir === 'outbound' && t1Term.departureTime === t2Term.departureTime) ||
              (dir === 'inbound' && t1Term.arrivalTime === t2Term.arrivalTime));

          if (termMatch || Math.abs(rawTimeToSec(time1) - rawTimeToSec(time2)) <= rule.maxTimeDiffSec) {
            const isSecondary = (t) =>
              Boolean(
                (t.customDestination && t.customDestination.includes(rule.secondaryDestOut)) ||
                  (t.destinationStationName && t.destinationStationName.includes(rule.secondaryDestOut)) ||
                  (t.prevTripId && t.prevTripId.includes(rule.secondaryPrevStationMarker)) ||
                  (t.trainNumber && rule.secondaryTrainNumberRegex.test(t.trainNumber))
              );

            const isT1Sec = isSecondary(t1);
            const isT2Sec = isSecondary(t2);

            if ((isT1Sec || isT2Sec) && isT1Sec !== isT2Sec) {
              const pri = isT1Sec ? t2 : t1;
              const sec = isT1Sec ? t1 : t2;

              const fromSt = dir === 'outbound' ? rule.terminalStationId : rule.splitStationId;
              const toSt = dir === 'outbound' ? rule.splitStationId : rule.terminalStationId;

              if (dir === 'outbound') {
                pri.customDestination = rule.primaryDestOut;
                sec.customDestination = rule.secondaryDestOut;
              } else {
                delete pri.customDestination;
                delete sec.customDestination;
              }

              applySymmetricCoupling(pri, sec, {
                fromStationId: fromSt,
                toStationId: toSt,
                primaryCars: rule.primaryCars,
                secondaryCars: rule.secondaryCars,
                primaryDest: dir === 'outbound' ? rule.primaryDestOut : rule.destIn,
                secondaryDest: dir === 'outbound' ? rule.secondaryDestOut : rule.destIn,
              });

              count += 2;
              break;
            }
          }
        }
      }
    }
  }

  safeWriteJson(filePath, trips);
  console.log(`  -> 東海道線: ${count} 件の併結トリップを設定完了`);
}

/**
 * 4. 小田急線（特急ロマンスカー えのしま ＋ はこね）の併結
 */
function coupleOdakyuRomancecar() {
  console.log('\n=== 🚆 小田急線（ロマンスカー えのしま + はこね）カップリング ===');
  const rule = couplingConfig.odakyuRomancecar;
  const filePath = path.resolve(`src/data/lines/${rule.lineId}/globalTimetable.json`);
  if (!fs.existsSync(filePath)) return;
  const trips = safeReadJson(filePath, []);
  for (const t of trips) delete t.coupling;

  let count = 0;

  for (const isHoliday of [false, true]) {
    for (const dir of ['outbound', 'inbound']) {
      const dirTrips = trips.filter(t => t.isHoliday === isHoliday && t.direction === dir);
      const ltdExps = dirTrips.filter(
        t => t.trainType === 'limitedExp' && t.stops.some(s => s.stationId === rule.splitStationId)
      );

      for (let i = 0; i < ltdExps.length; i++) {
        const t1 = ltdExps[i];
        if (t1.coupling) continue;
        const s1 = t1.stops.find(s => s.stationId === rule.splitStationId);
        if (!s1) continue;
        const time1 = s1.departureTime || s1.arrivalTime;

        for (let j = i + 1; j < ltdExps.length; j++) {
          const t2 = ltdExps[j];
          if (t2.coupling) continue;
          const s2 = t2.stops.find(s => s.stationId === rule.splitStationId);
          if (!s2) continue;
          const time2 = s2.departureTime || s2.arrivalTime;

          if (Math.abs(rawTimeToSec(time1) - rawTimeToSec(time2)) <= rule.maxTimeDiffSec) {
            const isT1Sec =
              (t1.destinationStationName && t1.destinationStationName.includes(rule.secondaryDestKeyword)) ||
              (t1.trainNumber && t1.trainNumber.includes(rule.secondaryTrainKeyword));
            const pri = isT1Sec ? t2 : t1;
            const sec = isT1Sec ? t1 : t2;

            const fromSt = dir === 'outbound' ? rule.terminalStationId : rule.splitStationId;
            const toSt = dir === 'outbound' ? rule.splitStationId : rule.terminalStationId;

            applySymmetricCoupling(pri, sec, {
              fromStationId: fromSt,
              toStationId: toSt,
              primaryCars: rule.primaryCars,
              secondaryCars: rule.secondaryCars,
              primaryDest: pri.destinationStationName || rule.defaultPrimaryDest,
              secondaryDest: sec.destinationStationName || rule.defaultSecondaryDest,
            });

            count += 2;
            break;
          }
        }
      }
    }
  }

  safeWriteJson(filePath, trips);
  console.log(`  -> 小田急線: ${count} 件の併結トリップを設定完了`);
}

/**
 * 統合カップリング実行
 */
function runAllCoupling() {
  console.log(`============================================================`);
  console.log(`🚀 全路線 併結（Coupling）統合設定パイプライン`);
  console.log(`============================================================`);

  coupleTobuExpress();
  coupleTohokuShinkansen();
  coupleChuoFujiKaiyu();
  coupleTokaidoOdoriko();
  coupleOdakyuRomancecar();

  console.log(`\n============================================================`);
  console.log(`✨ 全路線の併結（Coupling）設定が完了しました！`);
  console.log(`============================================================\n`);
}

if (require.main === module) {
  runAllCoupling();
}

module.exports = {
  runAllCoupling,
  coupleTobuExpress,
  coupleTohokuShinkansen,
  coupleChuoFujiKaiyu,
  coupleTokaidoOdoriko,
  coupleOdakyuRomancecar,
};
