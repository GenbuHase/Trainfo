const fs = require('fs');
const path = require('path');
const { coupleTobuExpress } = require('./coupleTobuExpress.cjs');
const YahooTimetableBuilder = require('../yahoo/YahooTimetableBuilder.cjs');

function safeWriteJson(filePath, data) {
  const content = JSON.stringify(data, null, 2);
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

function timeToSec(t) {
  if (!t) return 0;
  const [h, m, s] = t.split(':').map(Number);
  return h * 3600 + m * 60 + (s || 0);
}

/**
 * 東北新幹線の下りつばさ・こまちトリップを復元注入
 */
function restoreTohokuDownTrips(thTrips) {
  const thConfig = require('../../lines/tohoku_shinkansen/config.cjs');
  const thBuilder = new YahooTimetableBuilder(thConfig);

  const yPath = path.resolve('scripts/cache/yahoo/yamagata_shinkansen/all_train_details.json');
  const aPath = path.resolve('scripts/cache/yahoo/akita_shinkansen/all_train_details.json');
  if (!fs.existsSync(yPath) || !fs.existsSync(aPath)) return thTrips;

  const yDetails = JSON.parse(fs.readFileSync(yPath, 'utf8'));
  const aDetails = JSON.parse(fs.readFileSync(aPath, 'utf8'));

  // 山形新幹線・秋田新幹線のエンリッチ済み globalTimetable から trainId -> trainNumber マップを構築
  const officialNoMap = new Map();
  const yGtPath = path.resolve('src/data/lines/yamagata_shinkansen/globalTimetable.json');
  const aGtPath = path.resolve('src/data/lines/akita_shinkansen/globalTimetable.json');
  if (fs.existsSync(yGtPath)) {
    const yGt = JSON.parse(fs.readFileSync(yGtPath, 'utf8'));
    for (const t of yGt) {
      if (t.trainId && t.trainNumber && !/^\d+$/.test(t.trainNumber)) {
        officialNoMap.set(t.trainId, t.trainNumber);
      }
    }
  }
  if (fs.existsSync(aGtPath)) {
    const aGt = JSON.parse(fs.readFileSync(aGtPath, 'utf8'));
    for (const t of aGt) {
      if (t.trainId && t.trainNumber && !/^\d+$/.test(t.trainNumber)) {
        officialNoMap.set(t.trainId, t.trainNumber);
      }
    }
  }

  const yDown = yDetails.filter(t => t.direction === 'outbound' && t.displayName.includes('つばさ') && t.stopStation.some(s => s.stationName === '東京'));
  const aDown = aDetails.filter(t => t.direction === 'outbound' && t.displayName.includes('こまち') && t.stopStation.some(s => s.stationName === '東京'));

  const generatedY = thBuilder.buildGlobalTimetable(yDown);
  const generatedA = thBuilder.buildGlobalTimetable(aDown);

  const existingIds = new Set(thTrips.map(t => t.tripId || `${t.isHoliday ? 'H' : 'W'}_${t.direction}_${t.trainId || t.trainNumber}`));

  let added = 0;
  for (const t of [...generatedY, ...generatedA]) {
    const originalTrainId = t.trainId || t.trainNumber;
    t.trainId = originalTrainId;

    // 公式列車番号の解決: 1) エンリッチ済み時刻表マップ、2) displayName からの号数抽出
    if (officialNoMap.has(originalTrainId)) {
      t.trainNumber = officialNoMap.get(originalTrainId);
    } else {
      const detail = yDetails.find(d => d.trainId === originalTrainId) || aDetails.find(d => d.trainId === originalTrainId);
      if (detail && detail.displayName) {
        const tsubasaMatch = detail.displayName.match(/つばさ(\d+)号/);
        if (tsubasaMatch) {
          const num = parseInt(tsubasaMatch[1], 10);
          t.trainNumber = `${num >= 70 && num <= 99 ? 8000 + num : num}M`;
        }
        const komachiMatch = detail.displayName.match(/こまち(\d+)号/);
        if (komachiMatch) {
          const num = parseInt(komachiMatch[1], 10);
          t.trainNumber = `${num >= 60 && num <= 99 ? 8000 + num : 3000 + num}M`;
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
  console.log(`[coupleAllExpress] 東北新幹線に下りつばさ・こまち ${added} 便を公式番号で復元注入`);
  return thTrips;
}

/**
 * 東海道線の下り修善寺踊り子トリップを復元注入
 */
function restoreTokaidoDownTrips(tkTrips) {
  // 以前の誤ったダミートリップを掃除
  const redundantIds = new Set([
    'WD_OUT_JT-01_0900_41961',
    'WD_OUT_JT-01_1200_41963',
    'HD_OUT_JT-01_0900_41961',
    'HD_OUT_JT-01_1030_41962',
    'HD_OUT_JT-01_1200_41963',
  ]);
  const cleaned = tkTrips.filter((t) => !redundantIds.has(t.tripId));

  // すでに東海道線に下り修善寺行き踊り子が存在する場合は重複注入を行わない
  const hasShuzenji = cleaned.some(
    (t) =>
      t.direction === 'outbound' &&
      ((t.customDestination && t.customDestination.includes('修善寺')) ||
        (t.destinationStationName && t.destinationStationName.includes('修善寺')) ||
        (t.trainNumber && /^4\d{3}/.test(t.trainNumber)))
  );
  if (hasShuzenji) {
    return cleaned;
  }

  const tkConfig = require('../../lines/tokaido/config.cjs');
  const tkBuilder = new YahooTimetableBuilder(tkConfig);

  const sunPath = path.resolve('scripts/cache/yahoo/izuhakone_sunzu/all_train_details.json');
  if (!fs.existsSync(sunPath)) return cleaned;

  const sunDetails = JSON.parse(fs.readFileSync(sunPath, 'utf8'));
  const sunDown = sunDetails.filter(t => t.direction === 'outbound' && t.displayName.includes('踊り子') && t.stopStation.some(s => s.stationName === '東京'));

  const generated = tkBuilder.buildGlobalTimetable(sunDown);
  const existingIds = new Set(cleaned.map(t => t.tripId || `${t.isHoliday ? 'H' : 'W'}_${t.direction}_${t.trainId || t.trainNumber}`));

  let added = 0;
  for (const t of generated) {
    const key = t.tripId || `${t.isHoliday ? 'H' : 'W'}_${t.direction}_${t.trainId || t.trainNumber}`;
    if (!existingIds.has(key)) {
      t.destinationStationName = '修善寺';
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
  const filePath = path.resolve('src/data/lines/tohoku_shinkansen/globalTimetable.json');
  if (!fs.existsSync(filePath)) return;
  let trips = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  trips = restoreTohokuDownTrips(trips);

  const thConfig = require('../../lines/tohoku_shinkansen/config.cjs');
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

  // 既存の coupling をクリアして再計算可能に
  for (const t of trips) {
    delete t.coupling;
  }

  let count = 0;

  for (const isHoliday of [false, true]) {
    for (const dir of ['outbound', 'inbound']) {
      const dirTrips = trips.filter(t => t.isHoliday === isHoliday && t.direction === dir);

      // (A) やまびこ (PRIMARY: 10両) + つばさ (SECONDARY: 7両)
      const yamabikos = dirTrips.filter(t => t.trainType === 'yamabiko');
      const tsubasas = dirTrips.filter(t => t.trainType === 'tsubasa');

      for (const y of yamabikos) {
        if (y.coupling) continue;
        const yRefStop = dir === 'outbound' ? y.stops.find(s => s.stationId === 'TS-01') : y.stops.find(s => s.stationId === 'TS-01');
        if (!yRefStop) continue;
        const yTime = dir === 'outbound' ? yRefStop.departureTime : yRefStop.arrivalTime;

        const match = tsubasas.find(ts => {
          if (ts.coupling) return false;
          const tsRefStop = dir === 'outbound' ? ts.stops.find(s => s.stationId === 'TS-01') : ts.stops.find(s => s.stationId === 'TS-01');
          if (!tsRefStop) return false;
          const tsTime = dir === 'outbound' ? tsRefStop.departureTime : tsRefStop.arrivalTime;
          return Math.abs(timeToSec(tsTime) - timeToSec(yTime)) <= 60;
        });

        if (match) {
          const fromSt = dir === 'outbound' ? 'TS-01' : (match.stops[0]?.stationId || 'TS-09');
          const toSt = dir === 'outbound' ? (match.stops[match.stops.length - 1]?.stationId || 'TS-09') : 'TS-01';

          y.cars = 10;
          match.cars = 7;
          if (dir === 'inbound') {
            if (y.destinationStationId === 'TS-01') delete y.customDestination;
            if (match.destinationStationId === 'TS-01') delete match.customDestination;
          }

          y.coupling = {
            role: 'PRIMARY',
            fromStationId: fromSt,
            toStationId: toSt,
            coupledTripId: match.tripId,
            coupledTrainNumber: match.trainNumber,
            coupledCars: 7,
            coupledDestination: getTripFinalDest(match) || (dir === 'outbound' ? '新庄' : '東京')
          };

          match.coupling = {
            role: 'SECONDARY',
            fromStationId: fromSt,
            toStationId: toSt,
            coupledTripId: y.tripId,
            coupledTrainNumber: y.trainNumber,
            coupledCars: 10,
            coupledDestination: getTripFinalDest(y) || (dir === 'outbound' ? '仙台' : '東京')
          };

          count += 2;
        }
      }

      // (B) はやぶさ (PRIMARY: 10両) + こまち (SECONDARY: 7両)
      const hayabusas = dirTrips.filter(t => t.trainType === 'hayabusa');
      const komachis = dirTrips.filter(t => t.trainType === 'komachi');

      for (const h of hayabusas) {
        if (h.coupling) continue;
        const hRefStop = dir === 'outbound' ? h.stops.find(s => s.stationId === 'TS-01') : h.stops.find(s => s.stationId === 'TS-01');
        if (!hRefStop) continue;
        const hTime = dir === 'outbound' ? hRefStop.departureTime : hRefStop.arrivalTime;

        const match = komachis.find(k => {
          if (k.coupling) return false;
          const kRefStop = dir === 'outbound' ? k.stops.find(s => s.stationId === 'TS-01') : k.stops.find(s => s.stationId === 'TS-01');
          if (!kRefStop) return false;
          const kTime = dir === 'outbound' ? kRefStop.departureTime : kRefStop.arrivalTime;
          return Math.abs(timeToSec(kTime) - timeToSec(hTime)) <= 60;
        });

        if (match) {
          const fromSt = dir === 'outbound' ? 'TS-01' : (match.stops[0]?.stationId || 'TS-18');
          const toSt = dir === 'outbound' ? (match.stops[match.stops.length - 1]?.stationId || 'TS-18') : 'TS-01';

          h.cars = 10;
          match.cars = 7;
          if (dir === 'inbound') {
            if (h.destinationStationId === 'TS-01') delete h.customDestination;
            if (match.destinationStationId === 'TS-01') delete match.customDestination;
          }

          h.coupling = {
            role: 'PRIMARY',
            fromStationId: fromSt,
            toStationId: toSt,
            coupledTripId: match.tripId,
            coupledTrainNumber: match.trainNumber,
            coupledCars: 7,
            coupledDestination: getTripFinalDest(match) || (dir === 'outbound' ? '秋田' : '東京')
          };

          match.coupling = {
            role: 'SECONDARY',
            fromStationId: fromSt,
            toStationId: toSt,
            coupledTripId: h.tripId,
            coupledTrainNumber: h.trainNumber,
            coupledCars: 10,
            coupledDestination: getTripFinalDest(h) || (dir === 'outbound' ? '新函館北斗' : '東京')
          };

          count += 2;
        }
      }
    }
  }

  // 併結相手（coupledTripId）の最新 trainNumber で coupledTrainNumber を全件確実に同期
  const tripMap = new Map(trips.map(t => [t.tripId, t]));
  for (const t of trips) {
    if (t.coupling && t.coupling.coupledTripId) {
      const partner = tripMap.get(t.coupling.coupledTripId);
      if (partner && partner.trainNumber && !/^\d+$/.test(partner.trainNumber)) {
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
  // 既存の復元済み _fuji トリップを初期化（完全な冪等性を確保）
  chuoTrips = chuoTrips.filter(t => !t.tripId.includes('_fuji'));
  const existingIds = new Set(chuoTrips.map(t => t.tripId));
  const fujiNumbers = ['2103M', '2107M', '2111M', '2115M', '8111M', '9193M', '2132M', '2136M', '2144M', '2148M', '8194M', '9178M'];

  let addedOut = 0;
  let addedIn = 0;

  // 1. 下り (Outbound): 新宿 -> 高尾
  const cmOutFuji = cmTrips.filter(t => t.direction === 'outbound' && (t.throughLineId === 'fujikyu' || fujiNumbers.includes(t.trainNumber)));
  for (const fujiCM of cmOutFuji) {
    const fujiDepTakao = fujiCM.stops[0]?.departureTime;
    if (!fujiDepTakao) continue;
    const fujiSec = timeToSec(fujiDepTakao);

    // すでに Chuo 側に単独の河口湖行トリップ（臨時富士回遊など）が存在する場合は復元不要
    const existingSolo = chuoTrips.find(c =>
      c.direction === 'outbound' &&
      c.isHoliday === fujiCM.isHoliday &&
      !c.tripId.includes('_fuji') &&
      c.customDestination === '河口湖' &&
      Math.abs(timeToSec(c.stops[c.stops.length - 1]?.arrivalTime) - fujiSec) <= 180
    );
    if (existingSolo) {
      existingSolo.throughTripId = fujiCM.tripId;
      existingSolo.throughLineId = 'chuo_main';
      fujiCM.prevTripId = existingSolo.tripId;
      fujiCM.prevLineId = 'chuo';
      continue;
    }

    // 高尾到着時刻が最も近い Chuo トリップを探索（±180秒許容）
    const candidates = chuoTrips.filter(c =>
      c.direction === 'outbound' &&
      c.isHoliday === fujiCM.isHoliday &&
      c.trainType === 'limitedExp' &&
      c.stops[c.stops.length - 1]?.stationId === 'JC-24' &&
      Math.abs(timeToSec(c.stops[c.stops.length - 1]?.arrivalTime) - fujiSec) <= 180
    );

    // 特急（limitedExp）を最優先、次に時刻差が小さいもの
    candidates.sort((a, b) => {
      const expA = a.trainType === 'limitedExp' ? 1 : 0;
      const expB = b.trainType === 'limitedExp' ? 1 : 0;
      if (expA !== expB) return expB - expA;
      const diffA = Math.abs(timeToSec(a.stops[a.stops.length - 1]?.arrivalTime) - fujiSec);
      const diffB = Math.abs(timeToSec(b.stops[b.stops.length - 1]?.arrivalTime) - fujiSec);
      return diffA - diffB;
    });

    const parentChuo = candidates[0];

    if (parentChuo) {
      // 親（あずさ/かいじ）が富士回遊と同じ列車番号になっていた場合、中央本線側のあずさ/かいじの列車番号を探索して分離
      if (parentChuo.trainNumber === fujiCM.trainNumber) {
        const azusaCM = cmTrips.find(c =>
          c.direction === 'outbound' &&
          c.isHoliday === fujiCM.isHoliday &&
          c.tripId !== fujiCM.tripId &&
          c.stops[0]?.stationId === 'JC-24' &&
          Math.abs(timeToSec(c.stops[0]?.departureTime) - fujiSec) <= 60 &&
          c.trainNumber !== fujiCM.trainNumber
        );
        if (azusaCM && azusaCM.trainNumber) {
          parentChuo.trainNumber = azusaCM.trainNumber;
          parentChuo.customDestination = azusaCM.customDestination || '松本';
        }
      }

      const yId = fujiCM.trainId || fujiCM.tripId.split('_').pop();
      const fujiTripId = parentChuo.tripId.replace(/_\d+$/, `_${yId}_fuji`);
      if (!existingIds.has(fujiTripId)) {
        const newTrip = {
          ...JSON.parse(JSON.stringify(parentChuo)),
          tripId: fujiTripId,
          trainId: yId,
          trainNumber: fujiCM.trainNumber || parentChuo.trainNumber,
          customDestination: '河口湖',
          cars: 3,
          throughTripId: fujiCM.tripId,
          throughLineId: 'chuo_main',
        };
        // 高尾到着時刻を中央本線側の発車時刻と完全同期
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
  const cmInFuji = cmTrips.filter(t => t.direction === 'inbound' && (t.prevLineId === 'fujikyu' || fujiNumbers.includes(t.trainNumber)));
  for (const fujiCM of cmInFuji) {
    const fujiArrTakao = fujiCM.stops[fujiCM.stops.length - 1]?.arrivalTime;
    if (!fujiArrTakao) continue;
    const fujiSec = timeToSec(fujiArrTakao);

    // すでに Chuo 側にこの fujiCM に直通する単独トリップが存在する場合は復元不要
    const existingSolo = chuoTrips.find(c =>
      c.direction === 'inbound' &&
      c.isHoliday === fujiCM.isHoliday &&
      !c.tripId.includes('_fuji') &&
      c.stops[0]?.stationId === 'JC-24' &&
      c.prevTripId === fujiCM.tripId
    );
    if (existingSolo) continue;

    // 高尾発車時刻が最も近い Chuo トリップを探索（±180秒許容）
    const candidates = chuoTrips.filter(c =>
      c.direction === 'inbound' &&
      c.isHoliday === fujiCM.isHoliday &&
      c.trainType === 'limitedExp' &&
      c.stops[0]?.stationId === 'JC-24' &&
      Math.abs(timeToSec(c.stops[0]?.departureTime) - fujiSec) <= 180
    );

    // 特急（limitedExp）を最優先、次に時刻差が小さいもの
    candidates.sort((a, b) => {
      const expA = a.trainType === 'limitedExp' ? 1 : 0;
      const expB = b.trainType === 'limitedExp' ? 1 : 0;
      if (expA !== expB) return expB - expA;
      const diffA = Math.abs(timeToSec(a.stops[0]?.departureTime) - fujiSec);
      const diffB = Math.abs(timeToSec(b.stops[0]?.departureTime) - fujiSec);
      return diffA - diffB;
    });

    const parentChuo = candidates[0];

    if (parentChuo) {
      // 親（かいじ/あずさ）の列車番号が富士回遊と同じになっていた場合、中央本線側の対応便を探索して分離
      if (parentChuo.trainNumber === fujiCM.trainNumber) {
        const azusaCM = cmTrips.find(c =>
          c.direction === 'inbound' &&
          c.isHoliday === fujiCM.isHoliday &&
          c.tripId !== fujiCM.tripId &&
          c.stops[c.stops.length - 1]?.stationId === 'JC-24' &&
          Math.abs(timeToSec(c.stops[c.stops.length - 1]?.arrivalTime) - fujiSec) <= 60 &&
          c.trainNumber !== fujiCM.trainNumber
        );
        if (azusaCM && azusaCM.trainNumber) {
          parentChuo.trainNumber = azusaCM.trainNumber;
        }
      }

      const yId = fujiCM.trainId || fujiCM.tripId.split('_').pop();
      const fujiTripId = parentChuo.tripId.replace(/_\d+$/, `_${yId}_fuji`);
      if (!existingIds.has(fujiTripId)) {
        const newTrip = {
          ...JSON.parse(JSON.stringify(parentChuo)),
          tripId: fujiTripId,
          trainId: yId,
          trainNumber: fujiCM.trainNumber || parentChuo.trainNumber,
          customDestination: '新宿',
          cars: 3,
          prevTripId: fujiCM.tripId,
          prevLineId: 'chuo_main',
        };
        // 高尾発車時刻を中央本線側の到着時刻と完全同期
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
  const cmPath = path.resolve('src/data/lines/chuo_main/globalTimetable.json');
  const chuoPath = path.resolve('src/data/lines/chuo/globalTimetable.json');
  if (!fs.existsSync(cmPath) || !fs.existsSync(chuoPath)) return;

  const cmTrips = JSON.parse(fs.readFileSync(cmPath, 'utf8'));
  let chuoTrips = JSON.parse(fs.readFileSync(chuoPath, 'utf8'));

  // 1. 中央線快速に双方向の富士回遊トリップを復元注入し、高尾駅での直通を相互リンク
  chuoTrips = restoreChuoFujiKaiyuTrips(chuoTrips, cmTrips);

  for (const t of cmTrips) delete t.coupling;
  for (const t of chuoTrips) delete t.coupling;

  let countCM = 0;
  let countChuo = 0;

  // (A) 中央本線 (高尾〜大月間) のカップリング
  for (const isHoliday of [false, true]) {
    for (const dir of ['outbound', 'inbound']) {
      const dirTrips = cmTrips.filter(t => t.isHoliday === isHoliday && t.direction === dir);
      const ltdExps = dirTrips.filter(t =>
        (t.trainType === 'limitedExp' || t.trainType === 'regular') &&
        t.stops.some(s => s.stationId === 'JC-32')
      );

      for (let i = 0; i < ltdExps.length; i++) {
        const t1 = ltdExps[i];
        if (t1.coupling) continue;
        const s1 = t1.stops.find(s => s.stationId === 'JC-32');
        if (!s1) continue;
        const time1 = dir === 'outbound' ? (s1.arrivalTime || s1.departureTime) : (s1.departureTime || s1.arrivalTime);

        for (let j = i + 1; j < ltdExps.length; j++) {
          const t2 = ltdExps[j];
          if (t2.coupling) continue;
          const s2 = t2.stops.find(s => s.stationId === 'JC-32');
          if (!s2) continue;
          const time2 = dir === 'outbound' ? (s2.arrivalTime || s2.departureTime) : (s2.departureTime || s2.arrivalTime);

          if (Math.abs(timeToSec(time1) - timeToSec(time2)) <= 120) {
            const checkFuji = (t) => {
              return (t.destinationStationName && t.destinationStationName.includes('河口湖')) ||
                     (t.customDestination && t.customDestination.includes('河口湖')) ||
                     (t.throughLineId === 'fujikyu') ||
                     (t.prevLineId === 'fujikyu') ||
                     (t.trainNumber && t.trainNumber.includes('富士回遊')) ||
                     (t.tripId && t.tripId.includes('_fuji')) ||
                     (dir === 'outbound' && t.stops[t.stops.length - 1]?.stationId === 'JC-32') ||
                     (dir === 'inbound' && t.stops[0]?.stationId === 'JC-32');
            };

            const isT1Fuji = checkFuji(t1);
            const isT2Fuji = checkFuji(t2);

            // 片方のみが富士回遊（または大月発着）の場合のみカップリング対象
            if (isT1Fuji === isT2Fuji) continue;

            const pri = isT1Fuji ? t2 : t1;
            const sec = isT1Fuji ? t1 : t2;

            const fromSt = dir === 'outbound' ? (pri.stops[0]?.stationId || 'JC-24') : 'JC-32';
            const toSt = dir === 'outbound' ? 'JC-32' : (pri.stops[pri.stops.length - 1]?.stationId || 'JC-24');

            pri.cars = 9;
            sec.cars = 3;
            if (dir === 'outbound') {
              pri.customDestination = pri.destinationStationName || pri.customDestination || '甲府';
              sec.customDestination = '河口湖';
            } else {
              pri.customDestination = pri.destinationStationName || pri.customDestination || '新宿';
              sec.customDestination = '新宿';
            }

            pri.coupling = {
              role: 'PRIMARY',
              fromStationId: fromSt,
              toStationId: toSt,
              coupledTripId: sec.tripId,
              coupledTrainNumber: sec.trainNumber,
              coupledCars: 3,
              coupledDestination: dir === 'outbound' ? '河口湖' : '新宿'
            };

            sec.coupling = {
              role: 'SECONDARY',
              fromStationId: fromSt,
              toStationId: toSt,
              coupledTripId: pri.tripId,
              coupledTrainNumber: pri.trainNumber,
              coupledCars: 9,
              coupledDestination: dir === 'outbound' ? (pri.customDestination || '甲府') : '新宿'
            };

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
      const ltdExps = dirTrips.filter(t =>
        (t.trainType === 'limitedExp' || t.trainType === 'regular') &&
        t.stops.some(s => s.stationId === 'JC-24')
      );

      for (let i = 0; i < ltdExps.length; i++) {
        const t1 = ltdExps[i];
        if (t1.coupling) continue;
        const s1 = t1.stops.find(s => s.stationId === 'JC-24');
        if (!s1) continue;
        const time1 = dir === 'outbound' ? s1.arrivalTime : s1.departureTime;

        for (let j = i + 1; j < ltdExps.length; j++) {
          const t2 = ltdExps[j];
          if (t2.coupling) continue;
          const s2 = t2.stops.find(s => s.stationId === 'JC-24');
          if (!s2) continue;
          const time2 = dir === 'outbound' ? s2.arrivalTime : s2.departureTime;

          if (Math.abs(timeToSec(time1) - timeToSec(time2)) <= 60) {
            const checkFuji = (t) => {
              return (t.customDestination && t.customDestination.includes('河口湖')) ||
                     (t.throughLineId === 'fujikyu') ||
                     (t.trainNumber && t.trainNumber.includes('富士回遊')) ||
                     (t.tripId && t.tripId.includes('_fuji'));
            };

            const isT1Fuji = checkFuji(t1);
            const isT2Fuji = checkFuji(t2);

            if (isT1Fuji === isT2Fuji) continue;

            const pri = isT1Fuji ? t2 : t1;
            const sec = isT1Fuji ? t1 : t2;

            const fromSt = dir === 'outbound' ? (pri.stops[0]?.stationId || 'JC-05') : 'JC-24';
            const toSt = dir === 'outbound' ? 'JC-24' : (pri.stops[pri.stops.length - 1]?.stationId || 'JC-05');

            pri.cars = 9;
            sec.cars = 3;
            if (dir === 'outbound') {
              pri.customDestination = pri.destinationStationName || pri.customDestination || '甲府';
              sec.customDestination = '河口湖';
            } else {
              pri.customDestination = pri.destinationStationName || pri.customDestination || '新宿';
              sec.customDestination = '新宿';
            }

            pri.coupling = {
              role: 'PRIMARY',
              fromStationId: fromSt,
              toStationId: toSt,
              coupledTripId: sec.tripId,
              coupledTrainNumber: sec.trainNumber,
              coupledCars: 3,
              coupledDestination: dir === 'outbound' ? '河口湖' : '新宿'
            };

            sec.coupling = {
              role: 'SECONDARY',
              fromStationId: fromSt,
              toStationId: toSt,
              coupledTripId: pri.tripId,
              coupledTrainNumber: pri.trainNumber,
              coupledCars: 9,
              coupledDestination: dir === 'outbound' ? (pri.customDestination || '甲府') : '新宿'
            };

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
  const filePath = path.resolve('src/data/lines/tokaido/globalTimetable.json');
  if (!fs.existsSync(filePath)) return;
  let trips = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  trips = restoreTokaidoDownTrips(trips);
  for (const t of trips) delete t.coupling;

  let count = 0;

  for (const isHoliday of [false, true]) {
    for (const dir of ['outbound', 'inbound']) {
      const dirTrips = trips.filter(t => t.isHoliday === isHoliday && t.direction === dir);

      const ltdExps = dirTrips.filter(t =>
        (t.trainType === 'limitedExp' || (t.trainNumber && t.trainNumber.includes('踊り子'))) &&
        t.stops.some(s => s.stationId === 'JT-21')
      );

      for (let i = 0; i < ltdExps.length; i++) {
        const t1 = ltdExps[i];
        if (t1.coupling) continue;
        const s1 = t1.stops.find(s => s.stationId === 'JT-21');
        if (!s1) continue;
        const time1 = dir === 'outbound' ? (s1.arrivalTime || s1.departureTime) : s1.arrivalTime;

        for (let j = i + 1; j < ltdExps.length; j++) {
          const t2 = ltdExps[j];
          if (t2.coupling) continue;
          const s2 = t2.stops.find(s => s.stationId === 'JT-21');
          if (!s2) continue;
          const time2 = dir === 'outbound' ? (s2.arrivalTime || s2.departureTime) : s2.arrivalTime;

          // 熱海駅発着が5分以内、または東京駅発車時刻が一致
          const t1Tokyo = t1.stops.find(s => s.stationId === 'JT-01');
          const t2Tokyo = t2.stops.find(s => s.stationId === 'JT-01');
          const tokyoMatch = t1Tokyo && t2Tokyo && (
            (dir === 'outbound' && t1Tokyo.departureTime === t2Tokyo.departureTime) ||
            (dir === 'inbound' && t1Tokyo.arrivalTime === t2Tokyo.arrivalTime)
          );

          if (tokyoMatch || Math.abs(timeToSec(time1) - timeToSec(time2)) <= 300) {
            const isT1Shuzenji = Boolean(
              (t1.customDestination && t1.customDestination.includes('修善寺')) ||
              (t1.destinationStationName && t1.destinationStationName.includes('修善寺')) ||
              (t1.prevTripId && t1.prevTripId.includes('CA-02')) ||
              (t1.trainNumber && /^4\d{3}/.test(t1.trainNumber))
            );
            const isT2Shuzenji = Boolean(
              (t2.customDestination && t2.customDestination.includes('修善寺')) ||
              (t2.destinationStationName && t2.destinationStationName.includes('修善寺')) ||
              (t2.prevTripId && t2.prevTripId.includes('CA-02')) ||
              (t2.trainNumber && /^4\d{3}/.test(t2.trainNumber))
            );

            if ((isT1Shuzenji || isT2Shuzenji) && isT1Shuzenji !== isT2Shuzenji) {
              const pri = isT1Shuzenji ? t2 : t1;
              const sec = isT1Shuzenji ? t1 : t2;

              const fromSt = dir === 'outbound' ? 'JT-01' : 'JT-21';
              const toSt = dir === 'outbound' ? 'JT-21' : 'JT-01';

              pri.cars = 9;
              sec.cars = 5;
              if (dir === 'outbound') {
                pri.customDestination = '伊豆急下田';
                sec.customDestination = '修善寺';
              } else {
                delete pri.customDestination;
                delete sec.customDestination;
              }

              pri.coupling = {
                role: 'PRIMARY',
                fromStationId: fromSt,
                toStationId: toSt,
                coupledTripId: sec.tripId,
                coupledTrainNumber: sec.trainNumber,
                coupledCars: 5,
                coupledDestination: dir === 'outbound' ? '修善寺' : '東京'
              };

              sec.coupling = {
                role: 'SECONDARY',
                fromStationId: fromSt,
                toStationId: toSt,
                coupledTripId: pri.tripId,
                coupledTrainNumber: pri.trainNumber,
                coupledCars: 9,
                coupledDestination: dir === 'outbound' ? '伊豆急下田' : '東京'
              };

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
  const filePath = path.resolve('src/data/lines/odakyu_odawara/globalTimetable.json');
  if (!fs.existsSync(filePath)) return;
  const trips = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const t of trips) delete t.coupling;

  let count = 0;

  for (const isHoliday of [false, true]) {
    for (const dir of ['outbound', 'inbound']) {
      const dirTrips = trips.filter(t => t.isHoliday === isHoliday && t.direction === dir);

      const ltdExps = dirTrips.filter(t =>
        t.trainType === 'limitedExp' &&
        t.stops.some(s => s.stationId === 'OH-28')
      );

      for (let i = 0; i < ltdExps.length; i++) {
        const t1 = ltdExps[i];
        if (t1.coupling) continue;
        const s1 = t1.stops.find(s => s.stationId === 'OH-28');
        if (!s1) continue;
        const time1 = s1.departureTime || s1.arrivalTime;

        for (let j = i + 1; j < ltdExps.length; j++) {
          const t2 = ltdExps[j];
          if (t2.coupling) continue;
          const s2 = t2.stops.find(s => s.stationId === 'OH-28');
          if (!s2) continue;
          const time2 = s2.departureTime || s2.arrivalTime;

          if (Math.abs(timeToSec(time1) - timeToSec(time2)) <= 60) {
            const isT1Enoshima = (t1.destinationStationName && t1.destinationStationName.includes('江ノ島')) || (t1.trainNumber && t1.trainNumber.includes('えのしま'));
            const pri = isT1Enoshima ? t2 : t1;
            const sec = isT1Enoshima ? t1 : t2;

            const fromSt = dir === 'outbound' ? 'OH-01' : 'OH-28';
            const toSt = dir === 'outbound' ? 'OH-28' : 'OH-01';

            pri.cars = 6;
            sec.cars = 4;

            pri.coupling = {
              role: 'PRIMARY',
              fromStationId: fromSt,
              toStationId: toSt,
              coupledTripId: sec.tripId,
              coupledTrainNumber: sec.trainNumber,
              coupledCars: 4,
              coupledDestination: sec.destinationStationName || '片瀬江ノ島'
            };

            sec.coupling = {
              role: 'SECONDARY',
              fromStationId: fromSt,
              toStationId: toSt,
              coupledTripId: pri.tripId,
              coupledTrainNumber: pri.trainNumber,
              coupledCars: 6,
              coupledDestination: pri.destinationStationName || '箱根湯本'
            };

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

module.exports = { runAllCoupling, coupleTobuExpress, coupleTohokuShinkansen, coupleChuoFujiKaiyu, coupleTokaidoOdoriko, coupleOdakyuRomancecar };
