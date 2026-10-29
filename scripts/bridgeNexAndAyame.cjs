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

/**
 * 停車駅リストの区間内を通過駅として等間隔補間
 */
function buildPassingStops(stationIds, tStartSec, tEndSec, startPassing = false, endPassing = false) {
  const n = stationIds.length;
  if (n === 0) return [];
  if (n === 1) {
    const t = secToTime(tStartSec);
    return [{ stationId: stationIds[0], arrivalTime: t, departureTime: t, isPassing: startPassing }];
  }
  const totalDuration = tEndSec - tStartSec;
  const stops = [];
  for (let i = 0; i < n; i++) {
    const frac = i / (n - 1);
    const curSec = tStartSec + totalDuration * frac;
    const t = secToTime(curSec);
    const isPassing = i === 0 ? startPassing : (i === n - 1 ? endPassing : true);
    stops.push({
      stationId: stationIds[i],
      arrivalTime: t,
      departureTime: t,
      isPassing,
    });
  }
  return stops;
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

  const sobuMStationIds = ['SM-01', 'SM-02', 'SM-03', 'SM-04', 'SM-05', 'SM-06']; // 千葉〜佐倉
  const naritaBranchStationIds = ['NR-01', 'NR-02', 'NR-03', 'NR-36', 'NR-37']; // 佐倉〜成田空港

  // =========================================================================
  // 1. 成田エクスプレス（N'EX） 下り (東京/大船/新宿 -> 千葉 -> 佐倉 -> 成田空港)
  // =========================================================================
  console.log('--- 1. 成田エクスプレス 下り直通リンク ---');

  for (const isHoliday of [false, true]) {
    const prefix = isHoliday ? 'HD' : 'WD';
    
    // 総武快速線の下りN'EX全便を取得
    const srNexList = sobuRTrips.filter(t => 
      t.direction === 'outbound' && 
      t.isHoliday === isHoliday && 
      t.trainName && t.trainName.includes('成田エクスプレス')
    );

    // 成田線の下りN'EX全便を取得
    const nrtNexList = naritaTrips.filter(t =>
      t.direction === 'outbound' &&
      t.isHoliday === isHoliday &&
      t.trainName && t.trainName.includes('成田エクスプレス')
    );

    for (const srTrip of srNexList) {
      const trainNum = srTrip.trainNumber;
      const trainName = srTrip.trainName;
      const chibaStop = srTrip.stops.find(s => s.stationId === 'JO-28');
      if (!chibaStop) continue;

      const chibaDepSec = timeToSec(chibaStop.departureTime || chibaStop.arrivalTime);

      // 成田線側の対応便を検索 (同じ列車番号、または近接時刻のNR-36到着便)
      let nrtTrip = nrtNexList.find(t => t.trainNumber === trainNum);
      if (!nrtTrip) {
        // 号数の一致を確認
        const matchName = trainName.match(/成田エクスプレス(\d+)号/);
        if (matchName) {
          const num = matchName[1];
          nrtTrip = nrtNexList.find(t => t.trainName && t.trainName.includes(`成田エクスプレス${num}号`));
        }
      }

      if (!nrtTrip) {
        // 時間差30〜50分後のNR-36便
        nrtTrip = nrtNexList.find(t => {
          const nr36 = t.stops.find(s => s.stationId === 'NR-36');
          if (!nr36) return false;
          const diff = timeToSec(nr36.arrivalTime) - chibaDepSec;
          return diff >= 1500 && diff <= 2700;
        });
      }

      // 成田空港到着時刻（または空港第2ビル時刻）から佐倉通過時刻を推計
      let nrtArrSec = chibaDepSec + 2100; // デフォルト35分
      if (nrtTrip) {
        const nr36 = nrtTrip.stops.find(s => s.stationId === 'NR-36');
        if (nr36) nrtArrSec = timeToSec(nr36.arrivalTime);
      }

      // 千葉〜佐倉: 走行約14分、佐倉〜成田空港: 走行約21分
      const sakuraPassSec = chibaDepSec + Math.round((nrtArrSec - chibaDepSec) * (14 / 35));

      // (A) 総武本線 (千葉 SM-01 〜 佐倉 SM-06) トリップの確保または新設
      const smTripId = `${prefix}_OUT_SM-01_${secToTime(chibaDepSec).replace(/:/g, '').slice(0, 4)}_${srTrip.trainId || trainNum}`;
      let smTrip = sobuMTrips.find(t => t.tripId === smTripId || (t.direction === 'outbound' && t.isHoliday === isHoliday && t.trainNumber === trainNum));

      const smStops = buildPassingStops(sobuMStationIds, chibaDepSec, sakuraPassSec, false, true);

      if (!smTrip) {
        smTrip = {
          tripId: smTripId,
          lineId: 'sobu_main',
          trainId: srTrip.trainId || trainNum,
          trainNumber: trainNum,
          trainType: 'limitedExp',
          trainName: trainName,
          direction: 'outbound',
          originStationId: 'SM-01',
          destinationStationId: 'SM-06',
          customOrigin: srTrip.customOrigin || (trainNum.startsWith('22') ? '新宿' : '大船'),
          customDestination: '成田空港',
          cars: srTrip.cars || 6,
          isHoliday,
          stops: smStops,
        };
        sobuMTrips.push(smTrip);
      } else {
        smTrip.trainName = trainName;
        smTrip.trainType = 'limitedExp';
        smTrip.customOrigin = srTrip.customOrigin || smTrip.customOrigin || (trainNum.startsWith('22') ? '新宿' : '大船');
        smTrip.customDestination = '成田空港';
        // stopsが短ければ全駅通過補間
        if (smTrip.stops.length < 6) {
          smTrip.stops = smStops;
        }
      }

      // (B) 成田線 (佐倉 NR-01 〜 成田空港 NR-37) トリップの補完
      if (nrtTrip) {
        const nr36Stop = nrtTrip.stops.find(s => s.stationId === 'NR-36');
        const nr37Stop = nrtTrip.stops.find(s => s.stationId === 'NR-37');
        const nr36ArrSec = nr36Stop ? timeToSec(nr36Stop.arrivalTime) : nrtArrSec;
        const nr36DepSec = nr36Stop ? timeToSec(nr36Stop.departureTime || nr36Stop.arrivalTime) : nr36ArrSec;
        const nr37ArrSec = nr37Stop ? timeToSec(nr37Stop.arrivalTime) : nr36DepSec + 120;

        // 佐倉〜空港第2ビル間を補間
        const midStops = buildPassingStops(['NR-01', 'NR-02', 'NR-03', 'NR-36'], sakuraPassSec, nr36ArrSec, true, false);
        // NR-36出発とNR-37到着
        midStops[midStops.length - 1].departureTime = secToTime(nr36DepSec);
        midStops.push({
          stationId: 'NR-37',
          arrivalTime: secToTime(nr37ArrSec),
          departureTime: secToTime(nr37ArrSec),
          isPassing: false,
        });

        nrtTrip.stops = midStops;
        nrtTrip.originStationId = 'NR-01';
        nrtTrip.destinationStationId = 'NR-37';
        nrtTrip.customOrigin = srTrip.customOrigin || (trainNum.startsWith('22') ? '新宿' : '大船');
        nrtTrip.customDestination = '成田空港';
        nrtTrip.trainName = trainName;
        nrtTrip.trainType = 'limitedExp';

        // 直通リンクの結合
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

        console.log(`  ✓ 下り ${trainName} (${trainNum}) 直通リンク完了: 総武快速 -> 総武本線 -> 成田線 (成田空港行)`);
      }
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

      // 対応する総武快速線便を検索
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

      if (!srTrip) continue;

      const chibaDepSec = timeToSec(srTrip.stops[0].departureTime);
      const sakuraPassSec = chibaDepSec - Math.round((chibaDepSec - nrtDepSec) * (14 / 35));

      // 成田線 stops の延伸（NR-37 -> NR-36 -> NR-03 -> NR-02 -> NR-01）
      if (nrtTrip.stops.length < 5) {
        const nr37Time = nrtTrip.stops.find(s => s.stationId === 'NR-37')?.departureTime || secToTime(nrtDepSec);
        const nr36Time = nrtTrip.stops.find(s => s.stationId === 'NR-36')?.departureTime || secToTime(nrtDepSec + 120);

        const stops = [
          { stationId: 'NR-37', arrivalTime: nr37Time, departureTime: nr37Time, isPassing: false },
          { stationId: 'NR-36', arrivalTime: nr36Time, departureTime: nr36Time, isPassing: false },
        ];
        const mid = buildPassingStops(['NR-03', 'NR-02', 'NR-01'], timeToSec(nr36Time), sakuraPassSec, true, false);
        stops.push(...mid);
        nrtTrip.stops = stops;
        nrtTrip.destinationStationId = 'NR-01';
      }

      nrtTrip.customOrigin = '成田空港';
      nrtTrip.customDestination = finalDest;

      // 総武本線便の取得または新設
      const smTripId = `${prefix}_INB_SM-06_${secToTime(sakuraPassSec).replace(/:/g, '').slice(0, 4)}_${nrtTrip.trainId || trainNum}`;
      let smTrip = sobuMTrips.find(t => t.tripId === smTripId || (t.direction === 'inbound' && t.isHoliday === isHoliday && t.trainNumber === trainNum));

      const revSobuMStations = [...sobuMStationIds].reverse(); // SM-06 -> SM-01
      const smStops = buildPassingStops(revSobuMStations, sakuraPassSec, chibaDepSec, true, false);

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
        smTrip.trainName = trainName;
        smTrip.trainType = 'limitedExp';
        smTrip.customOrigin = '成田空港';
        smTrip.customDestination = finalDest;
        if (smTrip.stops.length < 6) {
          smTrip.stops = smStops;
        }
      }

      // 直通リンク
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

      // 横須賀線（大船行き）への直通リンク
      if (isOfuna) {
        let ykTrip = ykNexUpList.find(t => t.trainNumber === trainNum);
        if (!ykTrip) {
          const matchName = trainName.match(/成田エクスプレス(\d+)号/);
          if (matchName) {
            ykTrip = ykNexUpList.find(t => t.trainName && t.trainName.includes(`成田エクスプレス${matchName[1]}号`));
          }
        }
        if (ykTrip) {
          srTrip.throughTripId = ykTrip.tripId;
          srTrip.throughLineId = 'yokosuka';
          srTrip.through = { lineId: 'yokosuka', tripId: ykTrip.tripId, trainNumber: trainNum };

          ykTrip.prevTripId = srTrip.tripId;
          ykTrip.prevLineId = 'sobu_rapid';
          ykTrip.previousTrip = { lineId: 'sobu_rapid', tripId: srTrip.tripId, trainNumber: trainNum };
          ykTrip.customOrigin = '成田空港';
          ykTrip.customDestination = '大船';
        }
      }

      console.log(`  ✓ 上り ${trainName} (${trainNum}) 直通リンク完了: 成田線 -> 総武本線 -> 総武快速 -> ${finalDest}`);
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
