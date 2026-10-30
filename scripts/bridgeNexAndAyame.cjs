// 成田エクスプレス（N'EX）および 特急あやめ85号、特急しおさいのダイヤ補完＆完全直通リンカースクリプト
const fs = require('fs');
const path = require('path');

function safeLoad(filePath) {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function safeSave(filePath, data) {
  let retries = 5;
  while (retries > 0) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      break;
    } catch (e) {
      retries--;
      if (retries === 0) throw e;
      const waitTill = new Date(new Date().getTime() + 100);
      while (waitTill > new Date()) {}
    }
  }
}

function timeToSec(t) {
  if (!t) return 0;
  const [h, m, s] = t.split(':').map(Number);
  let sec = h * 3600 + m * 60 + (s || 0);
  if (h < 4) sec += 86400; // 翌日未明対応
  return sec;
}

function secToTime(sec) {
  const norm = (Math.floor(sec) + 86400 * 2) % 86400;
  const h = Math.floor(norm / 3600).toString().padStart(2, '0');
  const m = Math.floor((norm % 3600) / 60).toString().padStart(2, '0');
  const s = (norm % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

// 駅間距離定義 (km)
const SOBUR_UP_STATIONS = [
  { stationId: 'JO-28', dist: 0.0 },
  { stationId: 'JO-27', dist: 3.3 },
  { stationId: 'JO-26', dist: 12.5 },
  { stationId: 'JO-25', dist: 16.0 },
  { stationId: 'JO-24', dist: 23.4 },
  { stationId: 'JO-23', dist: 28.8 },
  { stationId: 'JO-22', dist: 33.6 },
  { stationId: 'JO-21', dist: 35.9 },
  { stationId: 'JO-20', dist: 37.0 },
  { stationId: 'JO-19', dist: 38.2 },
];

const SOBUR_DOWN_STATIONS = [
  { stationId: 'JO-19', dist: 0.0 },
  { stationId: 'JO-20', dist: 1.2 },
  { stationId: 'JO-21', dist: 2.3 },
  { stationId: 'JO-22', dist: 4.6 },
  { stationId: 'JO-23', dist: 9.4 },
  { stationId: 'JO-24', dist: 14.8 },
  { stationId: 'JO-25', dist: 22.2 },
  { stationId: 'JO-26', dist: 25.7 },
  { stationId: 'JO-27', dist: 34.9 },
  { stationId: 'JO-28', dist: 38.2 },
];

const SOBUM_UP_STATIONS = [
  { stationId: 'SM-06', dist: 0.0 },
  { stationId: 'SM-05', dist: 4.2 },
  { stationId: 'SM-04', dist: 8.4 },
  { stationId: 'SM-03', dist: 11.8 },
  { stationId: 'SM-02', dist: 14.7 },
  { stationId: 'SM-01', dist: 16.1 },
];

const SOBUM_DOWN_STATIONS = [
  { stationId: 'SM-01', dist: 0.0 },
  { stationId: 'SM-02', dist: 1.4 },
  { stationId: 'SM-03', dist: 4.3 },
  { stationId: 'SM-04', dist: 7.7 },
  { stationId: 'SM-05', dist: 11.9 },
  { stationId: 'SM-06', dist: 16.1 },
];

const NARITA_UP_STATIONS = [
  { stationId: 'NR-36', dist: 0.0 },
  { stationId: 'NR-03', dist: 9.8 },
  { stationId: 'NR-02', dist: 16.2 },
  { stationId: 'NR-01', dist: 20.4 },
];

const NARITA_DOWN_STATIONS = [
  { stationId: 'NR-01', dist: 0.0 },
  { stationId: 'NR-02', dist: 4.2 },
  { stationId: 'NR-03', dist: 10.6 },
  { stationId: 'NR-36', dist: 20.4 },
];

/**
 * 停車駅リストの区間内を距離比率に応じて通過駅補間
 */
function buildPassingStopsWithDistances(stationsWithDists, tStartSec, tEndSec, startPassing = false, endPassing = false) {
  const n = stationsWithDists.length;
  if (n === 0) return [];
  if (n === 1) {
    const t = secToTime(tStartSec);
    return [{ stationId: stationsWithDists[0].stationId, arrivalTime: t, departureTime: t, isPassing: startPassing }];
  }
  const totalDist = stationsWithDists[n - 1].dist - stationsWithDists[0].dist;
  const totalDuration = tEndSec - tStartSec;

  return stationsWithDists.map((st, i) => {
    const frac = totalDist > 0 ? (st.dist - stationsWithDists[0].dist) / totalDist : (i / (n - 1));
    const curSec = tStartSec + totalDuration * frac;
    const t = secToTime(curSec);
    const isPassing = i === 0 ? startPassing : (i === n - 1 ? endPassing : true);
    return {
      stationId: st.stationId,
      arrivalTime: t,
      departureTime: t,
      isPassing,
    };
  });
}

function bridgeNexAndAyame() {
  console.log('=== ✈️ 成田エクスプレス & 特急あやめ & 特急しおさい 直通・ダイヤ補完開始 ===');

  const yokoPath = path.resolve('src/data/lines/yokosuka/globalTimetable.json');
  const sobuRPath = path.resolve('src/data/lines/sobu_rapid/globalTimetable.json');
  const sobuMPath = path.resolve('src/data/lines/sobu_main/globalTimetable.json');
  const naritaPath = path.resolve('src/data/lines/narita/globalTimetable.json');

  const yokoTrips = safeLoad(yokoPath);
  const sobuRTrips = safeLoad(sobuRPath);
  const sobuMTrips = safeLoad(sobuMPath);
  const naritaTrips = safeLoad(naritaPath);

  // =========================================================================
  // 1. 成田エクスプレス（N'EX） 下り (大船/品川/新宿 -> 東京 -> 千葉 -> 佐倉 -> 成田空港)
  // =========================================================================
  console.log('--- 1. 成田エクスプレス 下り直通リンク ---');

  for (const isHoliday of [false, true]) {
    const prefix = isHoliday ? 'HD' : 'WD';

    // 成田線の下りN'EX便をすべて網羅
    const nrtNexDownList = naritaTrips.filter(t =>
      t.direction === 'outbound' &&
      t.isHoliday === isHoliday &&
      t.trainName && t.trainName.includes('成田エクスプレス')
    );

    const srNexDownList = sobuRTrips.filter(t =>
      t.direction === 'outbound' &&
      t.isHoliday === isHoliday &&
      t.trainName && t.trainName.includes('成田エクスプレス')
    );

    const ykNexDownList = yokoTrips.filter(t =>
      t.direction === 'inbound' &&
      t.isHoliday === isHoliday &&
      t.trainName && t.trainName.includes('成田エクスプレス')
    );

    for (const nrtTrip of nrtNexDownList) {
      const trainNum = nrtTrip.trainNumber;
      const trainName = nrtTrip.trainName;
      const isOfuna = trainNum.startsWith('20') || trainNum.startsWith('37');
      const isShinjuku = trainNum.startsWith('22');
      const originName = isOfuna ? '大船' : (isShinjuku ? '新宿' : '東京');

      const nr36Stop = nrtTrip.stops.find(s => s.stationId === 'NR-36');
      const nr37Stop = nrtTrip.stops.find(s => s.stationId === 'NR-37');
      const nr36ArrSec = nr36Stop ? timeToSec(nr36Stop.arrivalTime) : 36000;
      const nr36DepSec = nr36Stop ? timeToSec(nr36Stop.departureTime || nr36Stop.arrivalTime) : nr36ArrSec + 60;
      const nr37ArrSec = nr37Stop ? timeToSec(nr37Stop.arrivalTime) : nr36DepSec + 120;

      // (1) 横須賀線直通元便（大船/品川 -> 東京）の検索
      let ykTrip = ykNexDownList.find(t => t.trainNumber === trainNum);
      if (!ykTrip) {
        const matchName = trainName.match(/成田エクスプレス(\d+)号/);
        if (matchName) {
          ykTrip = ykNexDownList.find(t => t.trainName && t.trainName.includes(`成田エクスプレス${matchName[1]}号`));
        }
      }

      // (2) 総武快速線便の検索または新設（千葉通過便対応）
      let srTrip = srNexDownList.find(t => t.trainNumber === trainNum);
      if (!srTrip) {
        const matchName = trainName.match(/成田エクスプレス(\d+)号/);
        if (matchName) {
          srTrip = srNexDownList.find(t => t.trainName && t.trainName.includes(`成田エクスプレス${matchName[1]}号`) && (isOfuna ? t.trainNumber.startsWith('20') : t.trainNumber.startsWith('22')));
        }
      }

      let chibaDepSec = 0;
      let tTokyoDepSec = 0;

      if (srTrip) {
        const chibaStop = srTrip.stops.find(s => s.stationId === 'JO-28');
        chibaDepSec = chibaStop ? timeToSec(chibaStop.departureTime || chibaStop.arrivalTime) : nr36ArrSec - 2100;
        const tokyoStop = srTrip.stops.find(s => s.stationId === 'JO-19');
        tTokyoDepSec = tokyoStop ? timeToSec(tokyoStop.departureTime || tokyoStop.arrivalTime) : chibaDepSec - 1680;
      } else {
        // 千葉通過便: 横須賀線便の東京到着時刻、または空港第2ビル時刻から逆算
        if (ykTrip) {
          const ykTokyoArr = timeToSec(ykTrip.stops[ykTrip.stops.length - 1].arrivalTime);
          tTokyoDepSec = ykTokyoArr + 120; // 2分停車
          chibaDepSec = tTokyoDepSec + 1680; // 約28分
        } else {
          chibaDepSec = nr36ArrSec - 2100; // 約35分前
          tTokyoDepSec = chibaDepSec - 1680;
        }

        const srTripId = `${prefix}_OUT_JO-19_${secToTime(tTokyoDepSec).replace(/:/g, '').slice(0, 4)}_${nrtTrip.trainId || trainNum}`;
        srTrip = sobuRTrips.find(t => t.tripId === srTripId);
        const srStops = buildPassingStopsWithDistances(SOBUR_DOWN_STATIONS, tTokyoDepSec, chibaDepSec, false, true);

        if (!srTrip) {
          srTrip = {
            tripId: srTripId,
            lineId: 'sobu_rapid',
            trainId: nrtTrip.trainId || trainNum,
            trainNumber: trainNum,
            trainType: 'limitedExp',
            trainName: trainName,
            direction: 'outbound',
            originStationId: 'JO-19',
            destinationStationId: 'JO-28',
            customOrigin: originName,
            customDestination: '成田空港',
            cars: nrtTrip.cars || 6,
            isHoliday,
            stops: srStops,
          };
          sobuRTrips.push(srTrip);
        } else {
          srTrip.stops = srStops;
        }
      }

      // (3) 佐倉通過時刻 (千葉 SM-01 〜 佐倉 SM-06: 16.1km, 佐倉 NR-01 〜 空港第2ビル NR-36: 20.4km, 全長 36.5km)
      let chibaToNr36Dur = nr36ArrSec - chibaDepSec;
      if (chibaToNr36Dur <= 300) {
        // 千葉発時刻が異常な場合は第2ビルから逆算
        chibaDepSec = nr36ArrSec - 1800;
        chibaToNr36Dur = 1800;
      }
      const sakuraPassSec = Math.round(chibaDepSec + chibaToNr36Dur * (16.1 / 36.5));

      // (4) 総武本線便 (SM-01 千葉 〜 SM-06 佐倉) の確保または新設
      const smTripId = `${prefix}_OUT_SM-01_${secToTime(chibaDepSec).replace(/:/g, '').slice(0, 4)}_${nrtTrip.trainId || trainNum}`;
      let smTrip = sobuMTrips.find(t => t.tripId === smTripId || (t.direction === 'outbound' && t.isHoliday === isHoliday && t.trainNumber === trainNum));
      const smStops = buildPassingStopsWithDistances(SOBUM_DOWN_STATIONS, chibaDepSec, sakuraPassSec, true, true);

      if (!smTrip) {
        smTrip = {
          tripId: smTripId,
          lineId: 'sobu_main',
          trainId: nrtTrip.trainId || trainNum,
          trainNumber: trainNum,
          trainType: 'limitedExp',
          trainName: trainName,
          direction: 'outbound',
          originStationId: 'SM-01',
          destinationStationId: 'SM-06',
          customOrigin: originName,
          customDestination: '成田空港',
          cars: nrtTrip.cars || 6,
          isHoliday,
          stops: smStops,
        };
        sobuMTrips.push(smTrip);
      } else {
        smTrip.tripId = smTripId;
        smTrip.trainName = trainName;
        smTrip.trainType = 'limitedExp';
        smTrip.customOrigin = originName;
        smTrip.customDestination = '成田空港';
        smTrip.stops = smStops;
      }

      // (5) 成田線便 (NR-01 佐倉 〜 NR-37 成田空港) の stops 補完
      const midNaritaStops = buildPassingStopsWithDistances(NARITA_DOWN_STATIONS, sakuraPassSec, nr36ArrSec, true, false);
      midNaritaStops[midNaritaStops.length - 1].departureTime = secToTime(nr36DepSec);
      midNaritaStops.push({
        stationId: 'NR-37',
        arrivalTime: secToTime(nr37ArrSec),
        departureTime: secToTime(nr37ArrSec),
        isPassing: false,
      });

      // 成田駅停車の元データがある場合は停車フラグと時刻を維持
      const origNr03 = nrtTrip.stops.find(s => s.stationId === 'NR-03');
      if (origNr03 && !origNr03.isPassing) {
        const nr03 = midNaritaStops.find(s => s.stationId === 'NR-03');
        if (nr03) {
          nr03.arrivalTime = origNr03.arrivalTime;
          nr03.departureTime = origNr03.departureTime;
          nr03.isPassing = false;
        }
      }

      nrtTrip.stops = midNaritaStops;
      nrtTrip.originStationId = 'NR-01';
      nrtTrip.destinationStationId = 'NR-37';
      nrtTrip.customOrigin = originName;
      nrtTrip.customDestination = '成田空港';
      nrtTrip.trainName = trainName;
      nrtTrip.trainType = 'limitedExp';

      // (6) 直通リンク締結
      if (ykTrip) {
        ykTrip.throughTripId = srTrip.tripId;
        ykTrip.throughLineId = 'sobu_rapid';
        ykTrip.through = { lineId: 'sobu_rapid', tripId: srTrip.tripId, trainNumber: trainNum };
        ykTrip.customDestination = '成田空港';

        srTrip.prevTripId = ykTrip.tripId;
        srTrip.prevLineId = 'yokosuka';
        srTrip.previousTrip = { lineId: 'yokosuka', tripId: ykTrip.tripId, trainNumber: trainNum };
      }

      srTrip.throughTripId = smTrip.tripId;
      srTrip.throughLineId = 'sobu_main';
      srTrip.through = { lineId: 'sobu_main', tripId: smTrip.tripId, trainNumber: trainNum };
      srTrip.customDestination = '成田空港';

      smTrip.prevTripId = srTrip.tripId;
      smTrip.prevLineId = 'sobu_rapid';
      smTrip.previousTrip = { lineId: 'sobu_rapid', tripId: srTrip.tripId, trainNumber: trainNum };
      smTrip.throughTripId = nrtTrip.tripId;
      smTrip.throughLineId = 'narita';
      smTrip.through = { lineId: 'narita', tripId: nrtTrip.tripId, trainNumber: trainNum };

      nrtTrip.prevTripId = smTrip.tripId;
      nrtTrip.prevLineId = 'sobu_main';
      nrtTrip.previousTrip = { lineId: 'sobu_main', tripId: smTrip.tripId, trainNumber: trainNum };

      console.log(`  ✓ 下り ${trainName} (${trainNum}) 完全直通: ${originName} -> 東京 -> 千葉 -> 佐倉 -> 成田空港`);
    }
  }

  // =========================================================================
  // 2. 成田エクスプレス（N'EX） 上り (成田空港 -> 佐倉 -> 千葉 -> 東京 -> 大船/新宿)
  // =========================================================================
  console.log('\n--- 2. 成田エクスプレス 上り直通リンク ---');

  for (const isHoliday of [false, true]) {
    const prefix = isHoliday ? 'HD' : 'WD';

    const nrtNexUpList = naritaTrips.filter(t =>
      t.direction === 'inbound' &&
      t.isHoliday === isHoliday &&
      t.trainName && t.trainName.includes('成田エクスプレス')
    );

    const srNexUpList = sobuRTrips.filter(t =>
      t.direction === 'inbound' &&
      t.isHoliday === isHoliday &&
      t.trainName && t.trainName.includes('成田エクスプレス')
    );

    const ykNexUpList = yokoTrips.filter(t =>
      t.direction === 'outbound' &&
      t.isHoliday === isHoliday &&
      t.trainName && t.trainName.includes('成田エクスプレス')
    );

    for (const nrtTrip of nrtNexUpList) {
      const trainNum = nrtTrip.trainNumber;
      const trainName = nrtTrip.trainName;
      const isOfuna = trainNum.startsWith('20') || trainNum.startsWith('37');
      const isShinjuku = trainNum.startsWith('22');
      const finalDest = isOfuna ? '大船' : (isShinjuku ? '新宿' : '東京');

      const nrtDepStop = nrtTrip.stops[0];
      const nrtDepSec = timeToSec(nrtDepStop.departureTime);

      const nr36Stop = nrtTrip.stops.find(s => s.stationId === 'NR-36');
      const nr36ArrSec = nr36Stop ? timeToSec(nr36Stop.arrivalTime) : nrtDepSec + 120;
      const nr36DepSec = nr36Stop ? timeToSec(nr36Stop.departureTime || nr36Stop.arrivalTime) : nr36ArrSec + 60;

      // (1) 横須賀線便（東京 -> 品川/大船）の検索
      let ykTrip = ykNexUpList.find(t => t.trainNumber === trainNum);
      if (!ykTrip) {
        const matchName = trainName.match(/成田エクスプレス(\d+)号/);
        if (matchName) {
          ykTrip = ykNexUpList.find(t => t.trainName && t.trainName.includes(`成田エクスプレス${matchName[1]}号`));
        }
      }

      // (2) 対応する総武快速線便の検索または新設（千葉通過便対応）
      let srTrip = srNexUpList.find(t => t.trainNumber === trainNum);
      if (!srTrip) {
        const matchName = trainName.match(/成田エクスプレス(\d+)号/);
        if (matchName) {
          srTrip = srNexUpList.find(t => t.trainName && t.trainName.includes(`成田エクスプレス${matchName[1]}号`) && (isOfuna ? t.trainNumber.startsWith('20') : t.trainNumber.startsWith('22')));
        }
      }

      if (!srTrip) {
        // 発車後約35〜55分後の千葉発便
        srTrip = srNexUpList.find(t => {
          const chibaDep = timeToSec(t.stops[0].departureTime);
          const diff = chibaDep - nrtDepSec;
          return diff >= 1800 && diff <= 3300 && (isOfuna ? t.trainNumber.startsWith('20') : t.trainNumber.startsWith('22'));
        });
      }

      let chibaDepSec = 0;
      let tTokyoArrSec = 0;

      if (srTrip) {
        chibaDepSec = timeToSec(srTrip.stops[0].departureTime);
        const tokyoStop = srTrip.stops[srTrip.stops.length - 1];
        tTokyoArrSec = timeToSec(tokyoStop.arrivalTime);
      } else {
        // 千葉通過便: 横須賀線便の東京発車時刻、または成田空港発車時刻から逆算
        if (ykTrip) {
          const ykTokyoDep = timeToSec(ykTrip.stops[0].departureTime);
          tTokyoArrSec = ykTokyoDep - 120; // 2分前到着
          chibaDepSec = tTokyoArrSec - 1680; // 約28分前通過
        } else {
          chibaDepSec = nrtDepSec + 1980; // 約33分後
          tTokyoArrSec = chibaDepSec + 1680;
        }

        const srTripId = `${prefix}_INB_JO-28_${secToTime(chibaDepSec).replace(/:/g, '').slice(0, 4)}_${nrtTrip.trainId || trainNum}`;
        srTrip = sobuRTrips.find(t => t.tripId === srTripId);
        const srStops = buildPassingStopsWithDistances(SOBUR_UP_STATIONS, chibaDepSec, tTokyoArrSec, true, false);

        if (!srTrip) {
          srTrip = {
            tripId: srTripId,
            lineId: 'sobu_rapid',
            trainId: nrtTrip.trainId || trainNum,
            trainNumber: trainNum,
            trainType: 'limitedExp',
            trainName: trainName,
            direction: 'inbound',
            originStationId: 'JO-28',
            destinationStationId: 'JO-19',
            customOrigin: '成田空港',
            customDestination: finalDest,
            cars: nrtTrip.cars || 6,
            isHoliday,
            stops: srStops,
          };
          sobuRTrips.push(srTrip);
        } else {
          srTrip.stops = srStops;
        }
      }

      // (3) 佐倉通過時刻 (成田空港側 NR-36 〜 佐倉 NR-01: 20.4km, 佐倉 SM-06 〜 千葉 SM-01: 16.1km)
      let nr36ToChibaDur = chibaDepSec - nr36DepSec;
      if (nr36ToChibaDur <= 300) {
        chibaDepSec = nr36DepSec + 1800;
        nr36ToChibaDur = 1800;
      }
      const sakuraPassSec = Math.round(nr36DepSec + nr36ToChibaDur * (20.4 / 36.5));

      // (4) 成田線 stops の延伸（NR-37 -> NR-36 -> NR-03 -> NR-02 -> NR-01）
      const midNaritaUpStops = buildPassingStopsWithDistances(NARITA_UP_STATIONS, nr36DepSec, sakuraPassSec, false, true);
      const stops = [
        {
          stationId: 'NR-37',
          arrivalTime: secToTime(nrtDepSec),
          departureTime: secToTime(nrtDepSec),
          isPassing: false,
        },
        {
          stationId: 'NR-36',
          arrivalTime: secToTime(nr36ArrSec),
          departureTime: secToTime(nr36DepSec),
          isPassing: false,
        },
        ...midNaritaUpStops.slice(1), // NR-03, NR-02, NR-01
      ];

      // 元々成田駅（NR-03）停車便だった場合の停車時刻保持
      const origNr03 = nrtTrip.stops.find(s => s.stationId === 'NR-03');
      if (origNr03 && !origNr03.isPassing) {
        const nr03 = stops.find(s => s.stationId === 'NR-03');
        if (nr03) {
          nr03.arrivalTime = origNr03.arrivalTime;
          nr03.departureTime = origNr03.departureTime;
          nr03.isPassing = false;
        }
      }

      nrtTrip.stops = stops;
      nrtTrip.originStationId = 'NR-37';
      nrtTrip.destinationStationId = 'NR-01';
      nrtTrip.customOrigin = '成田空港';
      nrtTrip.customDestination = finalDest;

      // (5) 総武本線便 (SM-06 佐倉 〜 SM-01 千葉) の確保または新設
      const smTripId = `${prefix}_INB_SM-06_${secToTime(sakuraPassSec).replace(/:/g, '').slice(0, 4)}_${nrtTrip.trainId || trainNum}`;
      let smTrip = sobuMTrips.find(t => t.tripId === smTripId || (t.direction === 'inbound' && t.isHoliday === isHoliday && t.trainNumber === trainNum));
      const smStops = buildPassingStopsWithDistances(SOBUM_UP_STATIONS, sakuraPassSec, chibaDepSec, true, srTrip ? srTrip.stops[0].isPassing : true);

      if (!smTrip) {
        smTrip = {
          tripId: smTripId,
          lineId: 'sobu_main',
          trainId: nrtTrip.trainId || trainNum,
          trainNumber: trainNum,
          trainType: 'limitedExp',
          trainName: trainName,
          direction: 'inbound',
          originStationId: 'SM-06',
          destinationStationId: 'SM-01',
          customOrigin: '成田空港',
          customDestination: finalDest,
          cars: nrtTrip.cars || 6,
          isHoliday,
          stops: smStops,
        };
        sobuMTrips.push(smTrip);
      } else {
        smTrip.tripId = smTripId;
        smTrip.trainName = trainName;
        smTrip.trainType = 'limitedExp';
        smTrip.customOrigin = '成田空港';
        smTrip.customDestination = finalDest;
        smTrip.stops = smStops;
      }

      // (6) 直通リンク結合
      nrtTrip.throughTripId = smTrip.tripId;
      nrtTrip.throughLineId = 'sobu_main';
      nrtTrip.through = { lineId: 'sobu_main', tripId: smTrip.tripId, trainNumber: trainNum };

      smTrip.prevTripId = nrtTrip.tripId;
      smTrip.prevLineId = 'narita';
      smTrip.previousTrip = { lineId: 'narita', tripId: nrtTrip.tripId, trainNumber: trainNum };
      smTrip.throughTripId = srTrip.tripId;
      smTrip.throughLineId = 'sobu_rapid';
      smTrip.through = { lineId: 'sobu_rapid', tripId: srTrip.tripId, trainNumber: trainNum };

      srTrip.prevTripId = smTrip.tripId;
      srTrip.prevLineId = 'sobu_main';
      srTrip.previousTrip = { lineId: 'sobu_main', tripId: smTrip.tripId, trainNumber: trainNum };
      srTrip.customOrigin = '成田空港';
      srTrip.customDestination = finalDest;

      // (7) 横須賀線（大船/品川行き）への直通リンク結合
      if (ykTrip) {
        srTrip.throughTripId = ykTrip.tripId;
        srTrip.throughLineId = 'yokosuka';
        srTrip.through = { lineId: 'yokosuka', tripId: ykTrip.tripId, trainNumber: trainNum };

        ykTrip.prevTripId = srTrip.tripId;
        ykTrip.prevLineId = 'sobu_rapid';
        ykTrip.previousTrip = { lineId: 'sobu_rapid', tripId: srTrip.tripId, trainNumber: trainNum };
        ykTrip.customOrigin = '成田空港';
        ykTrip.customDestination = finalDest;
      }

      console.log(`  ✓ 上り ${trainName} (${trainNum}) 完全直通: 成田空港 -> 佐倉 -> 千葉 -> 東京 -> ${finalDest}`);
    }
  }

  // =========================================================================
  // 3. 特急あやめ85号（佐原の大祭秋祭り 臨時特急 新宿 -> 佐原）
  // =========================================================================
  console.log('\n--- 3. 特急あやめ85号 臨時特急 直通リンク ---');

  for (const isHoliday of [false, true]) {
    const prefix = isHoliday ? 'HD' : 'WD';
    const trainNum = '9085M';
    const trainName = '特急 あやめ85号';

    // 錦糸町 09:45 -> 船橋 09:57 -> 千葉 10:12
    const srAyameId = `${prefix}_OUT_JO-22_0945_10521`;
    let srAyame = sobuRTrips.find(t => t.tripId === srAyameId);
    if (!srAyame) {
      srAyame = {
        tripId: srAyameId,
        lineId: 'sobu_rapid',
        trainId: '10521',
        trainNumber: trainNum,
        trainType: 'limitedExp',
        trainName: trainName,
        direction: 'outbound',
        originStationId: 'JO-22',
        destinationStationId: 'JO-28',
        customOrigin: '新宿',
        customDestination: '佐原',
        cars: 5,
        isHoliday,
        stops: [
          { stationId: 'JO-22', arrivalTime: '09:43:00', departureTime: '09:45:00', isPassing: false },
          { stationId: 'JO-23', arrivalTime: '09:49:00', departureTime: '09:49:00', isPassing: true },
          { stationId: 'JO-24', arrivalTime: '09:53:00', departureTime: '09:53:00', isPassing: true },
          { stationId: 'JO-25', arrivalTime: '09:57:00', departureTime: '09:57:00', isPassing: false },
          { stationId: 'JO-26', arrivalTime: '10:02:00', departureTime: '10:02:00', isPassing: true },
          { stationId: 'JO-27', arrivalTime: '10:07:00', departureTime: '10:07:00', isPassing: true },
          { stationId: 'JO-28', arrivalTime: '10:11:00', departureTime: '10:12:00', isPassing: false },
        ],
      };
      sobuRTrips.push(srAyame);
    }

    // 総武本線: 千葉 10:12 -> 佐倉 10:31
    const smAyameId = `${prefix}_OUT_SM-01_1012_10521`;
    let smAyame = sobuMTrips.find(t => t.tripId === smAyameId);
    if (!smAyame) {
      smAyame = {
        tripId: smAyameId,
        lineId: 'sobu_main',
        trainId: '10521',
        trainNumber: trainNum,
        trainType: 'limitedExp',
        trainName: trainName,
        direction: 'outbound',
        originStationId: 'SM-01',
        destinationStationId: 'SM-06',
        customOrigin: '新宿',
        customDestination: '佐原',
        cars: 5,
        isHoliday,
        stops: [
          { stationId: 'SM-01', arrivalTime: '10:11:00', departureTime: '10:12:00', isPassing: false },
          { stationId: 'SM-02', arrivalTime: '10:15:00', departureTime: '10:15:00', isPassing: true },
          { stationId: 'SM-03', arrivalTime: '10:19:00', departureTime: '10:19:00', isPassing: true },
          { stationId: 'SM-04', arrivalTime: '10:23:00', departureTime: '10:23:00', isPassing: true },
          { stationId: 'SM-05', arrivalTime: '10:26:00', departureTime: '10:26:00', isPassing: true },
          { stationId: 'SM-06', arrivalTime: '10:29:00', departureTime: '10:31:00', isPassing: false },
        ],
      };
      sobuMTrips.push(smAyame);
    }

    // 成田線: 佐倉 10:31 -> 成田 10:51 -> 佐原 11:21
    const nrtAyameId = `${prefix}_OUT_NR-01_1031_10521`;
    let nrtAyame = naritaTrips.find(t => t.tripId === nrtAyameId);
    if (!nrtAyame) {
      nrtAyame = {
        tripId: nrtAyameId,
        lineId: 'narita',
        trainId: '10521',
        trainNumber: trainNum,
        trainType: 'limitedExp',
        trainName: trainName,
        direction: 'outbound',
        originStationId: 'NR-01',
        destinationStationId: 'NR-08',
        customOrigin: '新宿',
        customDestination: '佐原',
        cars: 5,
        isHoliday,
        stops: [
          { stationId: 'NR-01', arrivalTime: '10:29:00', departureTime: '10:31:00', isPassing: false },
          { stationId: 'NR-02', arrivalTime: '10:37:00', departureTime: '10:37:00', isPassing: true },
          { stationId: 'NR-03', arrivalTime: '10:43:00', departureTime: '10:51:00', isPassing: false },
          { stationId: 'NR-04', arrivalTime: '10:57:00', departureTime: '10:57:00', isPassing: true },
          { stationId: 'NR-05', arrivalTime: '11:03:00', departureTime: '11:03:00', isPassing: true },
          { stationId: 'NR-06', arrivalTime: '11:09:00', departureTime: '11:09:00', isPassing: true },
          { stationId: 'NR-07', arrivalTime: '11:15:00', departureTime: '11:15:00', isPassing: true },
          { stationId: 'NR-08', arrivalTime: '11:21:00', departureTime: '11:21:00', isPassing: false },
        ],
      };
      naritaTrips.push(nrtAyame);
    }

    // 直通リンク結合
    srAyame.throughTripId = smAyame.tripId;
    srAyame.throughLineId = 'sobu_main';
    srAyame.through = { lineId: 'sobu_main', tripId: smAyame.tripId, trainNumber: trainNum };

    smAyame.prevTripId = srAyame.tripId;
    smAyame.prevLineId = 'sobu_rapid';
    smAyame.previousTrip = { lineId: 'sobu_rapid', tripId: srAyame.tripId, trainNumber: trainNum };
    smAyame.throughTripId = nrtAyame.tripId;
    smAyame.throughLineId = 'narita';
    smAyame.through = { lineId: 'narita', tripId: nrtAyame.tripId, trainNumber: trainNum };

    nrtAyame.prevTripId = smAyame.tripId;
    nrtAyame.prevLineId = 'sobu_main';
    nrtAyame.previousTrip = { lineId: 'sobu_main', tripId: smAyame.tripId, trainNumber: trainNum };

    console.log(`  ✓ 特急あやめ85号 (${prefix}) 3線相互直通リンク完了 (新宿/錦糸町 -> 千葉 -> 佐倉 -> 佐原)`);
  }

  // =========================================================================
  // 4. 特急しおさい（東京 ↔ 銚子） 直通リンク補強
  // =========================================================================
  console.log('\n--- 4. 特急しおさい 直通リンク補強 ---');
  for (const isHoliday of [false, true]) {
    // 下りしおさい (JO-28 千葉 -> SM-01 千葉)
    const srDownShiosai = sobuRTrips.filter(t => t.direction === 'outbound' && t.isHoliday === isHoliday && t.trainName && t.trainName.includes('しおさい'));
    const smDownShiosai = sobuMTrips.filter(t => t.direction === 'outbound' && t.isHoliday === isHoliday && t.trainName && t.trainName.includes('しおさい'));

    for (const sr of srDownShiosai) {
      const chibaStop = sr.stops.find(s => s.stationId === 'JO-28');
      if (!chibaStop) continue;
      const tChiba = chibaStop.departureTime || chibaStop.arrivalTime;
      const sm = smDownShiosai.find(m => {
        const mStop = m.stops.find(s => s.stationId === 'SM-01');
        return mStop && Math.abs(timeToSec(mStop.departureTime || mStop.arrivalTime) - timeToSec(tChiba)) <= 300;
      });
      if (sm) {
        sr.throughTripId = sm.tripId;
        sr.throughLineId = 'sobu_main';
        sr.through = { lineId: 'sobu_main', tripId: sm.tripId, trainNumber: sr.trainNumber };
        sr.customDestination = '銚子';

        sm.prevTripId = sr.tripId;
        sm.prevLineId = 'sobu_rapid';
        sm.previousTrip = { lineId: 'sobu_rapid', tripId: sr.tripId, trainNumber: sr.trainNumber };
        sm.customOrigin = '東京';
        console.log(`  ✓ 下り 特急しおさい (${sr.trainName || sr.trainNumber}) 直通リンク完了 (東京 -> 銚子)`);
      }
    }

    // 上りしおさい (SM-01 千葉 -> JO-28 千葉)
    const smUpShiosai = sobuMTrips.filter(t => t.direction === 'inbound' && t.isHoliday === isHoliday && t.trainName && t.trainName.includes('しおさい'));
    const srUpShiosai = sobuRTrips.filter(t => t.direction === 'inbound' && t.isHoliday === isHoliday && t.trainName && t.trainName.includes('しおさい'));

    for (const sm of smUpShiosai) {
      const chibaStop = sm.stops.find(s => s.stationId === 'SM-01');
      if (!chibaStop) continue;
      const tChiba = chibaStop.departureTime || chibaStop.arrivalTime;
      const sr = srUpShiosai.find(r => {
        const rStop = r.stops.find(s => s.stationId === 'JO-28');
        return rStop && Math.abs(timeToSec(rStop.departureTime || rStop.arrivalTime) - timeToSec(tChiba)) <= 300;
      });
      if (sr) {
        sm.throughTripId = sr.tripId;
        sm.throughLineId = 'sobu_rapid';
        sm.through = { lineId: 'sobu_rapid', tripId: sr.tripId, trainNumber: sm.trainNumber };
        sm.customDestination = '東京';

        sr.prevTripId = sm.tripId;
        sr.prevLineId = 'sobu_main';
        sr.previousTrip = { lineId: 'sobu_main', tripId: sm.tripId, trainNumber: sm.trainNumber };
        sr.customOrigin = '銚子';
        console.log(`  ✓ 上り 特急しおさい (${sm.trainName || sm.trainNumber}) 直通リンク完了 (銚子 -> 東京)`);
      }
    }
  }

  // 保存
  safeSave(yokoPath, yokoTrips);
  safeSave(sobuRPath, sobuRTrips);
  safeSave(sobuMPath, sobuMTrips);
  safeSave(naritaPath, naritaTrips);

  console.log('🎉 成田エクスプレス & 特急あやめ & 特急しおさい 直通・ダイヤ補完完了！');
}

module.exports = {
  bridgeNexAndAyame,
};

if (require.main === module) {
  bridgeNexAndAyame();
}
