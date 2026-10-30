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
  return h * 3600 + m * 60 + (s || 0);
}

function secToTime(sec) {
  const norm = (Math.floor(sec) + 86400 * 2) % 86400;
  const h = Math.floor(norm / 3600).toString().padStart(2, '0');
  const m = Math.floor((norm % 3600) / 60).toString().padStart(2, '0');
  const s = (norm % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

/**
 * 区間内の中間駅を通過駅 (isPassing: true) として等間隔補間
 */
function buildFullStops(allStationIds, stopTimesMap) {
  const stops = [];
  const startIdx = allStationIds.indexOf(stopTimesMap[0].stationId);
  const endIdx = allStationIds.indexOf(stopTimesMap[stopTimesMap.length - 1].stationId);
  const dir = startIdx <= endIdx ? 1 : -1;

  let currentKeyIdx = 0;
  for (let i = startIdx; dir > 0 ? i <= endIdx : i >= endIdx; i += dir) {
    const stId = allStationIds[i];
    const keyStop = stopTimesMap.find(s => s.stationId === stId);
    if (keyStop) {
      stops.push({
        stationId: stId,
        arrivalTime: keyStop.arrivalTime,
        departureTime: keyStop.departureTime,
        isPassing: false,
      });
      currentKeyIdx = stopTimesMap.indexOf(keyStop);
    } else {
      const prevKey = stopTimesMap[currentKeyIdx];
      const nextKey = stopTimesMap[currentKeyIdx + 1];
      const prevIdx = allStationIds.indexOf(prevKey.stationId);
      const nextIdx = allStationIds.indexOf(nextKey.stationId);
      const totalSteps = Math.abs(nextIdx - prevIdx);
      const step = Math.abs(i - prevIdx);

      const t1 = timeToSec(prevKey.departureTime || prevKey.arrivalTime);
      const t2 = timeToSec(nextKey.arrivalTime || nextKey.departureTime);
      const curTimeSec = t1 + (t2 - t1) * (step / totalSteps);
      const tStr = secToTime(curTimeSec);

      stops.push({
        stationId: stId,
        arrivalTime: tStr,
        departureTime: tStr,
        isPassing: true,
      });
    }
  }
  return stops;
}

/**
 * 房総特急（新宿さざなみ、新宿わかしお、さざなみ、わかしお、しおさい）の直通リンク・ダイヤ補完
 */
function bridgeBosoLimitedExpress() {
  console.log('=== 🏖️ 房総特急（新宿さざなみ・新宿わかしお・さざなみ・わかしお・しおさい）ダイヤ補完＆直通リンク開始 ===');

  const cslPath = path.resolve('src/data/lines/chuo_sobu_local/globalTimetable.json');
  const sobuRapidPath = path.resolve('src/data/lines/sobu_rapid/globalTimetable.json');
  const uchiboPath = path.resolve('src/data/lines/uchibo/globalTimetable.json');
  const sotoboPath = path.resolve('src/data/lines/sotobo/globalTimetable.json');
  const keiyoPath = path.resolve('src/data/lines/keiyo/globalTimetable.json');
  const sobuMainPath = path.resolve('src/data/lines/sobu_main/globalTimetable.json');

  let cslTrips = safeLoad(cslPath);
  let sobuRapidTrips = safeLoad(sobuRapidPath);
  let uchiboTrips = safeLoad(uchiboPath);
  let sotoboTrips = safeLoad(sotoboPath);
  let keiyoTrips = safeLoad(keiyoPath);
  let sobuMainTrips = safeLoad(sobuMainPath);

  // 0-1. 総武快速線から新宿発着房総特急の不要・孤立トリップ（錦糸町発着等）を除去
  sobuRapidTrips = sobuRapidTrips.filter(t =>
    !t.trainName || (!t.trainName.includes('新宿さざなみ') && !t.trainName.includes('新宿わかしお'))
  );

  // 0-2. 新宿さざなみ・新宿わかしおは土休日運転のため、平日ダイヤから誤登録されたトリップを除去
  cslTrips = cslTrips.filter(t =>
    t.isHoliday || !t.trainName || (!t.trainName.includes('新宿さざなみ') && !t.trainName.includes('新宿わかしお'))
  );
  sotoboTrips = sotoboTrips.filter(t =>
    t.isHoliday || !t.trainName || (!t.trainName.includes('新宿さざなみ') && !t.trainName.includes('新宿わかしお'))
  );
  uchiboTrips = uchiboTrips.filter(t =>
    t.isHoliday || !t.trainName || (!t.trainName.includes('新宿さざなみ') && !t.trainName.includes('新宿わかしお'))
  );

  // CSL駅IDリスト (JB-01 〜 JB-39)
  const cslStationIds = [];
  for (let i = 1; i <= 39; i++) {
    cslStationIds.push(`JB-${i.toString().padStart(2, '0')}`);
  }

  // ----------------------------------------------------
  // 1. 上り 新宿さざなみ2号 (14406) - 休日(HD)
  // 内房線(館山 15:07 -> 蘇我 16:24) -> 外房線(蘇我 16:25 -> 千葉 16:30) -> 中央総武線(千葉 16:31 -> 新宿 17:12)
  // 停車駅: 館山, 富浦, 岩井, 保田, 浜金谷, 君津, 木更津, 五井, 蘇我, 千葉, 船橋, 錦糸町, 新宿
  // ----------------------------------------------------
  {
    const ubTripId = `HD_INB_UB-22_1507_14406`;
    const sbTripId = `HD_INB_SB-03_1625_14406`;
    const cslTripId = `HD_INB_JB-39_1631_14406`;

    const ubTrip = uchiboTrips.find(t => t.tripId === ubTripId);
    let sbTrip = sotoboTrips.find(t => t.tripId === sbTripId);
    let cslTrip = cslTrips.find(t => t.tripId === cslTripId);

    const cslKeyStops = [
      { stationId: 'JB-39', arrivalTime: '16:30:00', departureTime: '16:31:00' },
      { stationId: 'JB-31', arrivalTime: '16:43:00', departureTime: '16:44:00' },
      { stationId: 'JB-22', arrivalTime: '16:54:00', departureTime: '16:55:00' },
      { stationId: 'JB-10', arrivalTime: '17:12:00', departureTime: '17:12:00' },
    ];
    const fullCslStops = buildFullStops(cslStationIds, cslKeyStops);

    if (!sbTrip) {
      sbTrip = {
        tripId: sbTripId,
        lineId: 'sotobo',
        trainId: '14406',
        trainNumber: '9046M',
        trainType: 'limitedExp',
        trainName: '新宿さざなみ2号',
        direction: 'inbound',
        originStationId: 'SB-03',
        destinationStationId: 'SB-01',
        customOrigin: '館山',
        customDestination: '新宿',
        cars: 5,
        isHoliday: true,
        stops: [
          { stationId: 'SB-03', arrivalTime: '16:24:00', departureTime: '16:25:00', isPassing: false },
          { stationId: 'SB-02', arrivalTime: '16:27:00', departureTime: '16:27:00', isPassing: true },
          { stationId: 'SB-01', arrivalTime: '16:30:00', departureTime: '16:31:00', isPassing: false },
        ],
      };
      sotoboTrips.push(sbTrip);
    }

    if (!cslTrip) {
      cslTrip = {
        tripId: cslTripId,
        lineId: 'chuo_sobu_local',
        trainId: '14406',
        trainNumber: '9046M',
        trainType: 'limitedExp',
        trainName: '新宿さざなみ2号',
        direction: 'inbound',
        originStationId: 'JB-39',
        destinationStationId: 'JB-10',
        customOrigin: '館山',
        customDestination: '新宿',
        cars: 5,
        isHoliday: true,
        stops: fullCslStops,
      };
      cslTrips.push(cslTrip);
    } else {
      cslTrip.stops = fullCslStops;
      cslTrip.cars = 5;
    }

    if (ubTrip && sbTrip && cslTrip) {
      // 京葉線の誤リンクを解除
      for (const ky of keiyoTrips) {
        if (ky.prevTripId === ubTripId || (ky.previousTrip && ky.previousTrip.tripId === ubTripId)) {
          delete ky.prevTripId;
          delete ky.prevLineId;
          delete ky.previousTrip;
          if (ky.trainName === '新宿さざなみ2号') {
            ky.trainName = '快速';
            ky.trainType = 'rapid';
          }
        }
      }

      // 内房線 -> 外房線
      ubTrip.throughTripId = sbTripId;
      ubTrip.throughLineId = 'sotobo';
      ubTrip.through = { lineId: 'sotobo', tripId: sbTripId, trainNumber: '9046M' };
      ubTrip.trainName = '新宿さざなみ2号';
      ubTrip.customOrigin = '館山';
      ubTrip.customDestination = '新宿';

      // 外房線 (中継)
      sbTrip.prevTripId = ubTripId;
      sbTrip.prevLineId = 'uchibo';
      sbTrip.previousTrip = { lineId: 'uchibo', tripId: ubTripId, trainNumber: '9046M' };
      sbTrip.throughTripId = cslTripId;
      sbTrip.throughLineId = 'chuo_sobu_local';
      sbTrip.through = { lineId: 'chuo_sobu_local', tripId: cslTripId, trainNumber: '9046M' };
      sbTrip.trainName = '新宿さざなみ2号';
      sbTrip.customOrigin = '館山';
      sbTrip.customDestination = '新宿';

      // 中央総武線
      cslTrip.prevTripId = sbTripId;
      cslTrip.prevLineId = 'sotobo';
      cslTrip.previousTrip = { lineId: 'sotobo', tripId: sbTripId, trainNumber: '9046M' };
      cslTrip.trainName = '新宿さざなみ2号';
      cslTrip.customOrigin = '館山';
      cslTrip.customDestination = '新宿';

      console.log('  ✓ 上り 新宿さざなみ2号 (HD) 3線相互直通リンク完了 (館山 -> 蘇我 -> 千葉 -> 新宿)');
    }
  }

  // ----------------------------------------------------
  // 2. 上り 新宿さざなみ4号 (14408) - 休日(HD)
  // 内房線(館山 16:02 -> 蘇我 17:17) -> 外房線(蘇我 17:19 -> 千葉 17:23) -> 中央総武線(千葉 17:24 -> 新宿 18:07)
  // 停車駅: 館山, 富浦, 岩井, 保田, 浜金谷, 佐貫町, 君津, 木更津, 五井, 蘇我, 千葉, 船橋, 錦糸町, 新宿
  // ----------------------------------------------------
  {
    const ubTripId = `HD_INB_UB-22_1602_14408`;
    const sbTripId = `HD_INB_SB-03_1719_14408`;
    const cslTripId = `HD_INB_JB-39_1724_14408`;

    const ubTrip = uchiboTrips.find(t => t.tripId === ubTripId);
    let sbTrip = sotoboTrips.find(t => t.tripId === sbTripId);
    let cslTrip = cslTrips.find(t => t.tripId === cslTripId);

    // 内房線: 佐貫町(UB-13) 停車(16:37着/16:38発)を反映
    if (ubTrip) {
      const ub15 = ubTrip.stops.find(s => s.stationId === 'UB-15');
      if (ub15) { ub15.arrivalTime = '16:29:00'; ub15.departureTime = '16:29:00'; ub15.isPassing = true; }
      const ub14 = ubTrip.stops.find(s => s.stationId === 'UB-14');
      if (ub14) { ub14.arrivalTime = '16:33:00'; ub14.departureTime = '16:33:00'; ub14.isPassing = true; }
      const ub13 = ubTrip.stops.find(s => s.stationId === 'UB-13');
      if (ub13) {
        ub13.arrivalTime = '16:37:00';
        ub13.departureTime = '16:38:00';
        ub13.isPassing = false; // 佐貫町停車
      }
      const ub12 = ubTrip.stops.find(s => s.stationId === 'UB-12');
      if (ub12) { ub12.arrivalTime = '16:41:00'; ub12.departureTime = '16:41:00'; ub12.isPassing = true; }
      const ub11 = ubTrip.stops.find(s => s.stationId === 'UB-11');
      if (ub11) { ub11.arrivalTime = '16:44:00'; ub11.departureTime = '16:44:00'; ub11.isPassing = true; }
    }

    const cslKeyStops = [
      { stationId: 'JB-39', arrivalTime: '17:23:00', departureTime: '17:24:00' },
      { stationId: 'JB-31', arrivalTime: '17:37:00', departureTime: '17:38:00' },
      { stationId: 'JB-22', arrivalTime: '17:48:00', departureTime: '17:49:00' },
      { stationId: 'JB-10', arrivalTime: '18:07:00', departureTime: '18:07:00' },
    ];
    const fullCslStops = buildFullStops(cslStationIds, cslKeyStops);

    if (!sbTrip) {
      sbTrip = {
        tripId: sbTripId,
        lineId: 'sotobo',
        trainId: '14408',
        trainNumber: '9048M',
        trainType: 'limitedExp',
        trainName: '新宿さざなみ4号',
        direction: 'inbound',
        originStationId: 'SB-03',
        destinationStationId: 'SB-01',
        customOrigin: '館山',
        customDestination: '新宿',
        cars: 5,
        isHoliday: true,
        stops: [
          { stationId: 'SB-03', arrivalTime: '17:17:00', departureTime: '17:19:00', isPassing: false },
          { stationId: 'SB-02', arrivalTime: '17:21:00', departureTime: '17:21:00', isPassing: true },
          { stationId: 'SB-01', arrivalTime: '17:23:00', departureTime: '17:24:00', isPassing: false },
        ],
      };
      sotoboTrips.push(sbTrip);
    }

    if (!cslTrip) {
      cslTrip = {
        tripId: cslTripId,
        lineId: 'chuo_sobu_local',
        trainId: '14408',
        trainNumber: '9048M',
        trainType: 'limitedExp',
        trainName: '新宿さざなみ4号',
        direction: 'inbound',
        originStationId: 'JB-39',
        destinationStationId: 'JB-10',
        customOrigin: '館山',
        customDestination: '新宿',
        cars: 5,
        isHoliday: true,
        stops: fullCslStops,
      };
      cslTrips.push(cslTrip);
    } else {
      cslTrip.stops = fullCslStops;
      cslTrip.cars = 5;
    }

    if (ubTrip && sbTrip && cslTrip) {
      // 京葉線の誤リンクを解除
      for (const ky of keiyoTrips) {
        if (ky.prevTripId === ubTripId || (ky.previousTrip && ky.previousTrip.tripId === ubTripId)) {
          delete ky.prevTripId;
          delete ky.prevLineId;
          delete ky.previousTrip;
          if (ky.trainName === '新宿さざなみ4号') {
            ky.trainName = '快速';
            ky.trainType = 'rapid';
          }
        }
      }

      ubTrip.throughTripId = sbTripId;
      ubTrip.throughLineId = 'sotobo';
      ubTrip.through = { lineId: 'sotobo', tripId: sbTripId, trainNumber: '9048M' };
      ubTrip.trainName = '新宿さざなみ4号';
      ubTrip.customOrigin = '館山';
      ubTrip.customDestination = '新宿';

      sbTrip.prevTripId = ubTripId;
      sbTrip.prevLineId = 'uchibo';
      sbTrip.previousTrip = { lineId: 'uchibo', tripId: ubTripId, trainNumber: '9048M' };
      sbTrip.throughTripId = cslTripId;
      sbTrip.throughLineId = 'chuo_sobu_local';
      sbTrip.through = { lineId: 'chuo_sobu_local', tripId: cslTripId, trainNumber: '9048M' };
      sbTrip.trainName = '新宿さざなみ4号';
      sbTrip.customOrigin = '館山';
      sbTrip.customDestination = '新宿';

      cslTrip.prevTripId = sbTripId;
      cslTrip.prevLineId = 'sotobo';
      cslTrip.previousTrip = { lineId: 'sotobo', tripId: sbTripId, trainNumber: '9048M' };
      cslTrip.trainName = '新宿さざなみ4号';
      cslTrip.customOrigin = '館山';
      cslTrip.customDestination = '新宿';

      console.log('  ✓ 上り 新宿さざなみ4号 (HD) 3線相互直通リンク完了 (館山 -> 蘇我 -> 千葉 -> 新宿)');
    }
  }

  // ----------------------------------------------------
  // 3. 上り 新宿わかしお2号 (14419) - 休日(HD)
  // 外房線(安房鴨川 16:17 -> 千葉 17:38) -> 中央総武線(千葉 17:39 -> 新宿 18:23)
  // 停車駅: 安房鴨川, 安房小湊, 上総興津, 勝浦, 御宿, 大原, 上総一ノ宮, 茂原, 大網, 蘇我, 千葉, 船橋, 錦糸町, 新宿
  // ----------------------------------------------------
  {
    const sbTripId = `HD_INB_SB-27_1617_14419`;
    const cslTripId = `HD_INB_JB-39_1739_14419`;

    const sbTrip = sotoboTrips.find(t => t.tripId === sbTripId);
    let cslTrip = cslTrips.find(t => t.tripId === cslTripId);

    const cslKeyStops = [
      { stationId: 'JB-39', arrivalTime: '17:38:00', departureTime: '17:39:00' },
      { stationId: 'JB-31', arrivalTime: '17:50:00', departureTime: '17:51:00' },
      { stationId: 'JB-22', arrivalTime: '18:03:00', departureTime: '18:04:00' },
      { stationId: 'JB-10', arrivalTime: '18:23:00', departureTime: '18:23:00' },
    ];
    const fullCslStops = buildFullStops(cslStationIds, cslKeyStops);

    if (!cslTrip) {
      cslTrip = {
        tripId: cslTripId,
        lineId: 'chuo_sobu_local',
        trainId: '14419',
        trainNumber: '9056M',
        trainType: 'limitedExp',
        trainName: '新宿わかしお2号',
        direction: 'inbound',
        originStationId: 'JB-39',
        destinationStationId: 'JB-10',
        customOrigin: '安房鴨川',
        customDestination: '新宿',
        cars: 5,
        isHoliday: true,
        stops: fullCslStops,
      };
      cslTrips.push(cslTrip);
    } else {
      cslTrip.stops = fullCslStops;
      cslTrip.cars = 5;
    }

    if (sbTrip && cslTrip) {
      sbTrip.throughTripId = cslTripId;
      sbTrip.throughLineId = 'chuo_sobu_local';
      sbTrip.through = { lineId: 'chuo_sobu_local', tripId: cslTripId, trainNumber: '9056M' };
      sbTrip.trainName = '新宿わかしお2号';
      sbTrip.customOrigin = '安房鴨川';
      sbTrip.customDestination = '新宿';

      cslTrip.prevTripId = sbTripId;
      cslTrip.prevLineId = 'sotobo';
      cslTrip.previousTrip = { lineId: 'sotobo', tripId: sbTripId, trainNumber: '9056M' };
      cslTrip.trainName = '新宿わかしお2号';
      cslTrip.customOrigin = '安房鴨川';
      cslTrip.customDestination = '新宿';

      console.log('  ✓ 上り 新宿わかしお2号 (HD) 2線相互直通リンク完了 (安房鴨川 -> 千葉 -> 新宿)');
    }
  }

  // ----------------------------------------------------
  // 4. 下り 新宿さざなみ1号 (14399) - 休日(HD)
  // 中央総武線(新宿 07:52 -> 千葉 08:35) -> 外房線(千葉 08:37 -> 蘇我 08:43) -> 内房線(蘇我 08:45 -> 館山 10:06)
  // 停車駅: 新宿, 錦糸町, 船橋, 千葉, 蘇我, 五井, 木更津, 君津, 浜金谷, 保田, 岩井, 富浦, 館山
  // ----------------------------------------------------
  {
    const cslTripId = `HD_OUT_JB-10_0752_14399`;
    const sbTripId = `HD_OUT_SB-01_0837_14399`;
    const ubTripId = `HD_OUT_UB-01_0845_14399`;

    let cslTrip = cslTrips.find(t => t.tripId === cslTripId);
    let sbTrip = sotoboTrips.find(t => t.tripId === sbTripId);
    const ubTrip = uchiboTrips.find(t => t.tripId === ubTripId);

    const cslKeyStops = [
      { stationId: 'JB-10', arrivalTime: '07:51:00', departureTime: '07:52:00' },
      { stationId: 'JB-22', arrivalTime: '08:09:00', departureTime: '08:10:00' },
      { stationId: 'JB-31', arrivalTime: '08:21:00', departureTime: '08:22:00' },
      { stationId: 'JB-39', arrivalTime: '08:35:00', departureTime: '08:37:00' },
    ];
    const fullCslStops = buildFullStops(cslStationIds, cslKeyStops);

    if (!cslTrip) {
      cslTrip = {
        tripId: cslTripId,
        lineId: 'chuo_sobu_local',
        trainId: '14399',
        trainNumber: '9043M',
        trainType: 'limitedExp',
        trainName: '新宿さざなみ1号',
        direction: 'outbound',
        originStationId: 'JB-10',
        destinationStationId: 'JB-39',
        customOrigin: '新宿',
        customDestination: '館山',
        cars: 5,
        isHoliday: true,
        stops: fullCslStops,
      };
      cslTrips.push(cslTrip);
    } else {
      cslTrip.stops = fullCslStops;
      cslTrip.cars = 5;
    }

    if (!sbTrip) {
      sbTrip = {
        tripId: sbTripId,
        lineId: 'sotobo',
        trainId: '14399',
        trainNumber: '9043M',
        trainType: 'limitedExp',
        trainName: '新宿さざなみ1号',
        direction: 'outbound',
        originStationId: 'SB-01',
        destinationStationId: 'SB-03',
        customOrigin: '新宿',
        customDestination: '館山',
        cars: 5,
        isHoliday: true,
        stops: [
          { stationId: 'SB-01', arrivalTime: '08:35:00', departureTime: '08:37:00', isPassing: false },
          { stationId: 'SB-02', arrivalTime: '08:40:00', departureTime: '08:40:00', isPassing: true },
          { stationId: 'SB-03', arrivalTime: '08:43:00', departureTime: '08:45:00', isPassing: false },
        ],
      };
      sotoboTrips.push(sbTrip);
    }

    if (cslTrip && sbTrip && ubTrip) {
      cslTrip.throughTripId = sbTripId;
      cslTrip.throughLineId = 'sotobo';
      cslTrip.through = { lineId: 'sotobo', tripId: sbTripId, trainNumber: '9043M' };
      cslTrip.trainName = '新宿さざなみ1号';
      cslTrip.customOrigin = '新宿';
      cslTrip.customDestination = '館山';

      sbTrip.prevTripId = cslTripId;
      sbTrip.prevLineId = 'chuo_sobu_local';
      sbTrip.previousTrip = { lineId: 'chuo_sobu_local', tripId: cslTripId, trainNumber: '9043M' };
      sbTrip.throughTripId = ubTripId;
      sbTrip.throughLineId = 'uchibo';
      sbTrip.through = { lineId: 'uchibo', tripId: ubTripId, trainNumber: '9043M' };
      sbTrip.trainName = '新宿さざなみ1号';
      sbTrip.customOrigin = '新宿';
      sbTrip.customDestination = '館山';

      ubTrip.prevTripId = sbTripId;
      ubTrip.prevLineId = 'sotobo';
      ubTrip.previousTrip = { lineId: 'sotobo', tripId: sbTripId, trainNumber: '9043M' };
      ubTrip.trainName = '新宿さざなみ1号';
      ubTrip.customOrigin = '新宿';
      ubTrip.customDestination = '館山';

      console.log('  ✓ 下り 新宿さざなみ1号 (HD) 3線相互直通リンク完了 (新宿 -> 千葉 -> 蘇我 -> 館山)');
    }
  }

  // ----------------------------------------------------
  // 5. 下り 新宿さざなみ3号 (14400) - 休日(HD)
  // 中央総武線(新宿 09:08 -> 千葉 09:50) -> 外房線(千葉 09:52 -> 蘇我 09:58) -> 内房線(蘇我 10:01 -> 館山 11:18)
  // 停車駅: 新宿, 錦糸町, 船橋, 千葉, 蘇我, 五井, 木更津, 君津, 浜金谷, 保田, 岩井, 富浦, 館山 (※秋葉原は通過)
  // ----------------------------------------------------
  {
    const cslTripId = `HD_OUT_JB-10_0908_14400`;
    const sbTripId = `HD_OUT_SB-01_0952_14400`;
    const ubTripId = `HD_OUT_UB-01_1001_14400`;

    let cslTrip = cslTrips.find(t => t.tripId === cslTripId);
    let sbTrip = sotoboTrips.find(t => t.tripId === sbTripId);
    const ubTrip = uchiboTrips.find(t => t.tripId === ubTripId);

    // CSL停車駅: 新宿, 錦糸町, 船橋, 千葉 (秋葉原・津田沼は通過)
    const cslKeyStops = [
      { stationId: 'JB-10', arrivalTime: '09:07:00', departureTime: '09:08:00' },
      { stationId: 'JB-22', arrivalTime: '09:24:00', departureTime: '09:25:00' },
      { stationId: 'JB-31', arrivalTime: '09:35:00', departureTime: '09:36:00' },
      { stationId: 'JB-39', arrivalTime: '09:50:00', departureTime: '09:52:00' },
    ];
    const fullCslStops = buildFullStops(cslStationIds, cslKeyStops);

    if (!cslTrip) {
      cslTrip = {
        tripId: cslTripId,
        lineId: 'chuo_sobu_local',
        trainId: '14400',
        trainNumber: '9045M',
        trainType: 'limitedExp',
        trainName: '新宿さざなみ3号',
        direction: 'outbound',
        originStationId: 'JB-10',
        destinationStationId: 'JB-39',
        customOrigin: '新宿',
        customDestination: '館山',
        cars: 5,
        isHoliday: true,
        stops: fullCslStops,
      };
      cslTrips.push(cslTrip);
    } else {
      cslTrip.stops = fullCslStops;
      cslTrip.cars = 5;
    }

    if (!sbTrip) {
      sbTrip = {
        tripId: sbTripId,
        lineId: 'sotobo',
        trainId: '14400',
        trainNumber: '9045M',
        trainType: 'limitedExp',
        trainName: '新宿さざなみ3号',
        direction: 'outbound',
        originStationId: 'SB-01',
        destinationStationId: 'SB-03',
        customOrigin: '新宿',
        customDestination: '館山',
        cars: 5,
        isHoliday: true,
        stops: [
          { stationId: 'SB-01', arrivalTime: '09:50:00', departureTime: '09:52:00', isPassing: false },
          { stationId: 'SB-02', arrivalTime: '09:55:00', departureTime: '09:55:00', isPassing: true },
          { stationId: 'SB-03', arrivalTime: '09:58:00', departureTime: '10:01:00', isPassing: false },
        ],
      };
      sotoboTrips.push(sbTrip);
    }

    if (cslTrip && sbTrip && ubTrip) {
      cslTrip.throughTripId = sbTripId;
      cslTrip.throughLineId = 'sotobo';
      cslTrip.through = { lineId: 'sotobo', tripId: sbTripId, trainNumber: '9045M' };
      cslTrip.trainName = '新宿さざなみ3号';
      cslTrip.customOrigin = '新宿';
      cslTrip.customDestination = '館山';

      sbTrip.prevTripId = cslTripId;
      sbTrip.prevLineId = 'chuo_sobu_local';
      sbTrip.previousTrip = { lineId: 'chuo_sobu_local', tripId: cslTripId, trainNumber: '9045M' };
      sbTrip.throughTripId = ubTripId;
      sbTrip.throughLineId = 'uchibo';
      sbTrip.through = { lineId: 'uchibo', tripId: ubTripId, trainNumber: '9045M' };
      sbTrip.trainName = '新宿さざなみ3号';
      sbTrip.customOrigin = '新宿';
      sbTrip.customDestination = '館山';

      ubTrip.prevTripId = sbTripId;
      ubTrip.prevLineId = 'sotobo';
      ubTrip.previousTrip = { lineId: 'sotobo', tripId: sbTripId, trainNumber: '9045M' };
      ubTrip.trainName = '新宿さざなみ3号';
      ubTrip.customOrigin = '新宿';
      ubTrip.customDestination = '館山';

      console.log('  ✓ 下り 新宿さざなみ3号 (HD) 3線相互直通リンク完了 (新宿 -> 千葉 -> 蘇我 -> 館山)');
    }
  }

  // ----------------------------------------------------
  // 6. 下り 新宿わかしお1号 (14414) - 休日(HD)
  // 中央総武線(新宿 07:21 -> 千葉 08:06) -> 外房線(千葉 08:10 -> 安房鴨川 09:36)
  // 停車駅: 新宿, 錦糸町, 船橋, 千葉, 蘇我, 大網, 茂原, 上総一ノ宮, 大原, 御宿, 勝浦, 上総興津, 安房小湊, 安房鴨川
  // ----------------------------------------------------
  {
    const cslTripId = `HD_OUT_JB-10_0721_14414`;
    const sbTripId = `HD_OUT_SB-01_0810_14414`;

    let cslTrip = cslTrips.find(t => t.tripId === cslTripId);
    const sbTrip = sotoboTrips.find(t => t.tripId === sbTripId);

    const cslKeyStops = [
      { stationId: 'JB-10', arrivalTime: '07:20:00', departureTime: '07:21:00' },
      { stationId: 'JB-22', arrivalTime: '07:38:00', departureTime: '07:39:00' },
      { stationId: 'JB-31', arrivalTime: '07:53:00', departureTime: '07:54:00' },
      { stationId: 'JB-39', arrivalTime: '08:06:00', departureTime: '08:10:00' },
    ];
    const fullCslStops = buildFullStops(cslStationIds, cslKeyStops);

    if (!cslTrip) {
      cslTrip = {
        tripId: cslTripId,
        lineId: 'chuo_sobu_local',
        trainId: '14414',
        trainNumber: '9055M',
        trainType: 'limitedExp',
        trainName: '新宿わかしお1号',
        direction: 'outbound',
        originStationId: 'JB-10',
        destinationStationId: 'JB-39',
        customOrigin: '新宿',
        customDestination: '安房鴨川',
        cars: 5,
        isHoliday: true,
        stops: fullCslStops,
      };
      cslTrips.push(cslTrip);
    } else {
      cslTrip.stops = fullCslStops;
      cslTrip.cars = 5;
    }

    if (cslTrip && sbTrip) {
      cslTrip.throughTripId = sbTripId;
      cslTrip.throughLineId = 'sotobo';
      cslTrip.through = { lineId: 'sotobo', tripId: sbTripId, trainNumber: '9055M' };
      cslTrip.trainName = '新宿わかしお1号';
      cslTrip.customOrigin = '新宿';
      cslTrip.customDestination = '安房鴨川';

      sbTrip.prevTripId = cslTripId;
      sbTrip.prevLineId = 'chuo_sobu_local';
      sbTrip.previousTrip = { lineId: 'chuo_sobu_local', tripId: cslTripId, trainNumber: '9055M' };
      sbTrip.trainName = '新宿わかしお1号';
      sbTrip.customOrigin = '新宿';
      sbTrip.customDestination = '安房鴨川';

      console.log('  ✓ 下り 新宿わかしお1号 (HD) 2線相互直通リンク完了 (新宿 -> 千葉 -> 安房鴨川)');
    }
  }

  // ----------------------------------------------------
  // 7. 京葉線 ↔ 内房線/外房線の定期特急（さざなみ・わかしお）の行先＆愛称エンリッチ
  // ----------------------------------------------------
  for (const kt of keiyoTrips) {
    if (!kt.trainName || (!kt.trainName.includes('さざなみ') && !kt.trainName.includes('わかしお'))) continue;
    if (kt.trainName.includes('新宿')) continue;

    if (kt.direction === 'outbound') {
      kt.customOrigin = '東京';
      if (kt.trainName.includes('さざなみ')) {
        kt.customDestination = kt.customDestination || '君津';
      } else if (kt.trainName.includes('わかしお')) {
        kt.customDestination = kt.customDestination || '安房鴨川';
      }
    }
    if (kt.direction === 'inbound') {
      kt.customDestination = '東京';
    }
  }

  for (const ut of uchiboTrips) {
    if (!ut.trainName || (!ut.trainName.includes('さざなみ') && !ut.trainName.includes('わかしお'))) continue;
    if (ut.trainName.includes('新宿')) continue;
    if (ut.direction === 'inbound') {
      ut.customDestination = '東京';
    }
    if (ut.direction === 'outbound') {
      ut.customOrigin = '東京';
    }
  }

  for (const st of sotoboTrips) {
    if (!st.trainName || (!st.trainName.includes('さざなみ') && !st.trainName.includes('わかしお'))) continue;
    if (st.trainName.includes('新宿')) continue;
    if (st.direction === 'inbound') {
      st.customDestination = '東京';
    }
    if (st.direction === 'outbound') {
      st.customOrigin = '東京';
    }
  }

  // ----------------------------------------------------
  // 8. 総武快速線 ↔ 総武本線（特急しおさい）の行先＆愛称エンリッチ
  // ----------------------------------------------------
  for (const st of sobuRapidTrips) {
    if (st.trainName && st.trainName.includes('しおさい')) {
      if (st.direction === 'outbound') {
        st.customOrigin = '東京';
        st.customDestination = st.customDestination || '銚子';
      } else if (st.direction === 'inbound') {
        st.customDestination = '東京';
      }
    }
  }
  for (const sm of sobuMainTrips) {
    if (sm.trainName && sm.trainName.includes('しおさい')) {
      if (sm.direction === 'outbound') {
        sm.customOrigin = '東京';
        sm.customDestination = sm.customDestination || '銚子';
      } else if (sm.direction === 'inbound') {
        sm.customDestination = '東京';
      }
    }
  }

  // 保存
  safeSave(cslPath, cslTrips);
  safeSave(sobuRapidPath, sobuRapidTrips);
  safeSave(uchiboPath, uchiboTrips);
  safeSave(sotoboPath, sotoboTrips);
  safeSave(keiyoPath, keiyoTrips);
  safeSave(sobuMainPath, sobuMainTrips);

  console.log('🎉 房総特急ダイヤ補完＆直通リンク処理が完了しました！');
}

module.exports = {
  bridgeBosoLimitedExpress,
};

if (require.main === module) {
  bridgeBosoLimitedExpress();
}
