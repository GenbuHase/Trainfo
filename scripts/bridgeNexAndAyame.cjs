// 成田エクスプレス（N'EX）および 特急あやめ85号、特急しおさいのダイヤ補完＆完全直通リンカースクリプト（宣言的設定駆動）
const path = require('path');
const {
  timeToSec,
  secToTime,
  safeReadJson,
  safeWriteJson,
  buildPassingStopsWithDistances,
  linkThroughTrips,
} = require('./common/timetableUtils.cjs');

const LINE_PATHS = {
  yokosuka: path.resolve('src/data/lines/yokosuka/globalTimetable.json'),
  sobu_rapid: path.resolve('src/data/lines/sobu_rapid/globalTimetable.json'),
  sobu_main: path.resolve('src/data/lines/sobu_main/globalTimetable.json'),
  narita: path.resolve('src/data/lines/narita/globalTimetable.json'),
};

// 宣言的設定 1: 駅間距離定義 (km)
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

// 宣言的設定 2: 臨時特急あやめ85号 (新宿/錦糸町 -> 千葉 -> 佐倉 -> 佐原) の区間定義
const AYAME_85_CONFIG = {
  trainId: '10521',
  trainNumber: '9085M',
  trainName: '特急 あやめ85号',
  trainType: 'limitedExp',
  direction: 'outbound',
  customOrigin: '新宿',
  customDestination: '佐原',
  cars: 5,
  segments: [
    {
      lineId: 'sobu_rapid',
      tripIdSuffix: 'OUT_JO-22_0945_10521',
      originStationId: 'JO-22',
      destinationStationId: 'JO-28',
      stops: [
        { stationId: 'JO-22', arrivalTime: '09:43:00', departureTime: '09:45:00', isPassing: false },
        { stationId: 'JO-23', arrivalTime: '09:49:00', departureTime: '09:49:00', isPassing: true },
        { stationId: 'JO-24', arrivalTime: '09:53:00', departureTime: '09:53:00', isPassing: true },
        { stationId: 'JO-25', arrivalTime: '09:57:00', departureTime: '09:57:00', isPassing: false },
        { stationId: 'JO-26', arrivalTime: '10:02:00', departureTime: '10:02:00', isPassing: true },
        { stationId: 'JO-27', arrivalTime: '10:07:00', departureTime: '10:07:00', isPassing: true },
        { stationId: 'JO-28', arrivalTime: '10:11:00', departureTime: '10:12:00', isPassing: false },
      ],
    },
    {
      lineId: 'sobu_main',
      tripIdSuffix: 'OUT_SM-01_1012_10521',
      originStationId: 'SM-01',
      destinationStationId: 'SM-06',
      stops: [
        { stationId: 'SM-01', arrivalTime: '10:11:00', departureTime: '10:12:00', isPassing: false },
        { stationId: 'SM-02', arrivalTime: '10:15:00', departureTime: '10:15:00', isPassing: true },
        { stationId: 'SM-03', arrivalTime: '10:19:00', departureTime: '10:19:00', isPassing: true },
        { stationId: 'SM-04', arrivalTime: '10:23:00', departureTime: '10:23:00', isPassing: true },
        { stationId: 'SM-05', arrivalTime: '10:26:00', departureTime: '10:26:00', isPassing: true },
        { stationId: 'SM-06', arrivalTime: '10:29:00', departureTime: '10:31:00', isPassing: false },
      ],
    },
    {
      lineId: 'narita',
      tripIdSuffix: 'OUT_NR-01_1031_10521',
      originStationId: 'NR-01',
      destinationStationId: 'NR-08',
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
    },
  ],
};

function resolveNexTerminalName(trainNumber) {
  const isOfuna = trainNumber.startsWith('20') || trainNumber.startsWith('37');
  const isShinjuku = trainNumber.startsWith('22');
  return {
    isOfuna,
    isShinjuku,
    terminalName: isOfuna ? '大船' : isShinjuku ? '新宿' : '東京',
  };
}

function bridgeNexAndAyame() {
  console.log('=== ✈️ 成田エクスプレス & 特急あやめ & 特急しおさい 直通・ダイヤ補完開始 ===');

  const lineData = {
    yokosuka: safeReadJson(LINE_PATHS.yokosuka),
    sobu_rapid: safeReadJson(LINE_PATHS.sobu_rapid),
    sobu_main: safeReadJson(LINE_PATHS.sobu_main),
    narita: safeReadJson(LINE_PATHS.narita),
  };

  // =========================================================================
  // 1. 成田エクスプレス（N'EX） 下り (大船/品川/新宿 -> 東京 -> 千葉 -> 佐倉 -> 成田空港)
  // =========================================================================
  console.log('--- 1. 成田エクスプレス 下り直通リンク ---');

  for (const isHoliday of [false, true]) {
    const prefix = isHoliday ? 'HD' : 'WD';

    const nrtNexDownList = lineData.narita.filter(
      (t) => t.direction === 'outbound' && t.isHoliday === isHoliday && t.trainName && t.trainName.includes('成田エクスプレス')
    );
    const srNexDownList = lineData.sobu_rapid.filter(
      (t) => t.direction === 'outbound' && t.isHoliday === isHoliday && t.trainName && t.trainName.includes('成田エクスプレス')
    );
    const ykNexDownList = lineData.yokosuka.filter(
      (t) => t.direction === 'inbound' && t.isHoliday === isHoliday && t.trainName && t.trainName.includes('成田エクスプレス')
    );

    for (const nrtTrip of nrtNexDownList) {
      const trainNum = nrtTrip.trainNumber;
      const trainName = nrtTrip.trainName;
      const { isOfuna, terminalName: originName } = resolveNexTerminalName(trainNum);

      const nr36Stop = nrtTrip.stops.find((s) => s.stationId === 'NR-36');
      const nr37Stop = nrtTrip.stops.find((s) => s.stationId === 'NR-37');
      const nr36ArrSec = nr36Stop ? timeToSec(nr36Stop.arrivalTime) : 36000;
      const nr36DepSec = nr36Stop ? timeToSec(nr36Stop.departureTime || nr36Stop.arrivalTime) : nr36ArrSec + 60;
      const nr37ArrSec = nr37Stop ? timeToSec(nr37Stop.arrivalTime) : nr36DepSec + 120;

      let ykTrip = ykNexDownList.find((t) => t.trainNumber === trainNum);
      if (!ykTrip) {
        const matchName = trainName.match(/成田エクスプレス(\d+)号/);
        if (matchName) {
          ykTrip = ykNexDownList.find((t) => t.trainName && t.trainName.includes(`成田エクスプレス${matchName[1]}号`));
        }
      }

      let srTrip = srNexDownList.find((t) => t.trainNumber === trainNum);
      if (!srTrip) {
        const matchName = trainName.match(/成田エクスプレス(\d+)号/);
        if (matchName) {
          srTrip = srNexDownList.find(
            (t) => t.trainName && t.trainName.includes(`成田エクスプレス${matchName[1]}号`) && (isOfuna ? t.trainNumber.startsWith('20') : t.trainNumber.startsWith('22'))
          );
        }
      }

      let chibaDepSec = 0;
      let tTokyoDepSec = 0;

      if (srTrip) {
        const chibaStop = srTrip.stops.find((s) => s.stationId === 'JO-28');
        chibaDepSec = chibaStop ? timeToSec(chibaStop.departureTime || chibaStop.arrivalTime) : nr36ArrSec - 2100;
        const tokyoStop = srTrip.stops.find((s) => s.stationId === 'JO-19');
        tTokyoDepSec = tokyoStop ? timeToSec(tokyoStop.departureTime || tokyoStop.arrivalTime) : chibaDepSec - 1680;
      } else {
        if (ykTrip) {
          const ykTokyoArr = timeToSec(ykTrip.stops[ykTrip.stops.length - 1].arrivalTime);
          tTokyoDepSec = ykTokyoArr + 120;
          chibaDepSec = tTokyoDepSec + 1680;
        } else {
          chibaDepSec = nr36ArrSec - 2100;
          tTokyoDepSec = chibaDepSec - 1680;
        }

        const srTripId = `${prefix}_OUT_JO-19_${secToTime(tTokyoDepSec).replace(/:/g, '').slice(0, 4)}_${nrtTrip.trainId || trainNum}`;
        srTrip = lineData.sobu_rapid.find((t) => t.tripId === srTripId);
        const srStops = buildPassingStopsWithDistances(SOBUR_DOWN_STATIONS, tTokyoDepSec, chibaDepSec, false, true);

        if (!srTrip) {
          srTrip = {
            tripId: srTripId,
            lineId: 'sobu_rapid',
            trainId: nrtTrip.trainId || trainNum,
            trainNumber: trainNum,
            trainType: 'limitedExp',
            trainName,
            direction: 'outbound',
            originStationId: 'JO-19',
            destinationStationId: 'JO-28',
            customOrigin: originName,
            customDestination: '成田空港',
            cars: nrtTrip.cars || 6,
            isHoliday,
            stops: srStops,
          };
          lineData.sobu_rapid.push(srTrip);
        } else {
          srTrip.stops = srStops;
        }
      }

      let chibaToNr36Dur = nr36ArrSec - chibaDepSec;
      if (chibaToNr36Dur <= 300) {
        chibaDepSec = nr36ArrSec - 1800;
        chibaToNr36Dur = 1800;
      }
      const sakuraPassSec = Math.round(chibaDepSec + chibaToNr36Dur * (16.1 / 36.5));

      const smTripId = `${prefix}_OUT_SM-01_${secToTime(chibaDepSec).replace(/:/g, '').slice(0, 4)}_${nrtTrip.trainId || trainNum}`;
      let smTrip = lineData.sobu_main.find(
        (t) => t.tripId === smTripId || (t.direction === 'outbound' && t.isHoliday === isHoliday && t.trainNumber === trainNum)
      );
      const smStops = buildPassingStopsWithDistances(SOBUM_DOWN_STATIONS, chibaDepSec, sakuraPassSec, true, true);

      if (!smTrip) {
        smTrip = {
          tripId: smTripId,
          lineId: 'sobu_main',
          trainId: nrtTrip.trainId || trainNum,
          trainNumber: trainNum,
          trainType: 'limitedExp',
          trainName,
          direction: 'outbound',
          originStationId: 'SM-01',
          destinationStationId: 'SM-06',
          customOrigin: originName,
          customDestination: '成田空港',
          cars: nrtTrip.cars || 6,
          isHoliday,
          stops: smStops,
        };
        lineData.sobu_main.push(smTrip);
      } else {
        smTrip.tripId = smTripId;
        smTrip.trainName = trainName;
        smTrip.trainType = 'limitedExp';
        smTrip.customOrigin = originName;
        smTrip.customDestination = '成田空港';
        smTrip.stops = smStops;
      }

      const midNaritaStops = buildPassingStopsWithDistances(NARITA_DOWN_STATIONS, sakuraPassSec, nr36ArrSec, true, false);
      midNaritaStops[midNaritaStops.length - 1].departureTime = secToTime(nr36DepSec);
      midNaritaStops.push({
        stationId: 'NR-37',
        arrivalTime: secToTime(nr37ArrSec),
        departureTime: secToTime(nr37ArrSec),
        isPassing: false,
      });

      const origNr03 = nrtTrip.stops.find((s) => s.stationId === 'NR-03');
      if (origNr03 && !origNr03.isPassing) {
        const nr03 = midNaritaStops.find((s) => s.stationId === 'NR-03');
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

      if (ykTrip) {
        linkThroughTrips(ykTrip, 'yokosuka', srTrip, 'sobu_rapid', {
          withLegacyObjects: true,
          legacyTrainNumber: trainNum,
        });
        ykTrip.customDestination = '成田空港';
      }

      linkThroughTrips(srTrip, 'sobu_rapid', smTrip, 'sobu_main', {
        withLegacyObjects: true,
        legacyTrainNumber: trainNum,
      });
      srTrip.customDestination = '成田空港';

      linkThroughTrips(smTrip, 'sobu_main', nrtTrip, 'narita', {
        withLegacyObjects: true,
        legacyTrainNumber: trainNum,
      });

      console.log(`  ✓ 下り ${trainName} (${trainNum}) 完全直通: ${originName} -> 東京 -> 千葉 -> 佐倉 -> 成田空港`);
    }
  }

  // =========================================================================
  // 2. 成田エクスプレス（N'EX） 上り (成田空港 -> 佐倉 -> 千葉 -> 東京 -> 大船/新宿)
  // =========================================================================
  console.log('\n--- 2. 成田エクスプレス 上り直通リンク ---');

  for (const isHoliday of [false, true]) {
    const prefix = isHoliday ? 'HD' : 'WD';

    const nrtNexUpList = lineData.narita.filter(
      (t) => t.direction === 'inbound' && t.isHoliday === isHoliday && t.trainName && t.trainName.includes('成田エクスプレス')
    );
    const srNexUpList = lineData.sobu_rapid.filter(
      (t) => t.direction === 'inbound' && t.isHoliday === isHoliday && t.trainName && t.trainName.includes('成田エクスプレス')
    );
    const ykNexUpList = lineData.yokosuka.filter(
      (t) => t.direction === 'outbound' && t.isHoliday === isHoliday && t.trainName && t.trainName.includes('成田エクスプレス')
    );

    for (const nrtTrip of nrtNexUpList) {
      const trainNum = nrtTrip.trainNumber;
      const trainName = nrtTrip.trainName;
      const { isOfuna, terminalName: finalDest } = resolveNexTerminalName(trainNum);

      const nrtDepStop = nrtTrip.stops[0];
      const nrtDepSec = timeToSec(nrtDepStop.departureTime);

      const nr36Stop = nrtTrip.stops.find((s) => s.stationId === 'NR-36');
      const nr36ArrSec = nr36Stop ? timeToSec(nr36Stop.arrivalTime) : nrtDepSec + 120;
      const nr36DepSec = nr36Stop ? timeToSec(nr36Stop.departureTime || nr36Stop.arrivalTime) : nr36ArrSec + 60;

      let ykTrip = ykNexUpList.find((t) => t.trainNumber === trainNum);
      if (!ykTrip) {
        const matchName = trainName.match(/成田エクスプレス(\d+)号/);
        if (matchName) {
          ykTrip = ykNexUpList.find((t) => t.trainName && t.trainName.includes(`成田エクスプレス${matchName[1]}号`));
        }
      }

      let srTrip = srNexUpList.find((t) => t.trainNumber === trainNum);
      if (!srTrip) {
        const matchName = trainName.match(/成田エクスプレス(\d+)号/);
        if (matchName) {
          srTrip = srNexUpList.find(
            (t) => t.trainName && t.trainName.includes(`成田エクスプレス${matchName[1]}号`) && (isOfuna ? t.trainNumber.startsWith('20') : t.trainNumber.startsWith('22'))
          );
        }
      }

      if (!srTrip) {
        srTrip = srNexUpList.find((t) => {
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
        if (ykTrip) {
          const ykTokyoDep = timeToSec(ykTrip.stops[0].departureTime);
          tTokyoArrSec = ykTokyoDep - 120;
          chibaDepSec = tTokyoArrSec - 1680;
        } else {
          chibaDepSec = nrtDepSec + 1980;
          tTokyoArrSec = chibaDepSec + 1680;
        }

        const srTripId = `${prefix}_INB_JO-28_${secToTime(chibaDepSec).replace(/:/g, '').slice(0, 4)}_${nrtTrip.trainId || trainNum}`;
        srTrip = lineData.sobu_rapid.find((t) => t.tripId === srTripId);
        const srStops = buildPassingStopsWithDistances(SOBUR_UP_STATIONS, chibaDepSec, tTokyoArrSec, true, false);

        if (!srTrip) {
          srTrip = {
            tripId: srTripId,
            lineId: 'sobu_rapid',
            trainId: nrtTrip.trainId || trainNum,
            trainNumber: trainNum,
            trainType: 'limitedExp',
            trainName,
            direction: 'inbound',
            originStationId: 'JO-28',
            destinationStationId: 'JO-19',
            customOrigin: '成田空港',
            customDestination: finalDest,
            cars: nrtTrip.cars || 6,
            isHoliday,
            stops: srStops,
          };
          lineData.sobu_rapid.push(srTrip);
        } else {
          srTrip.stops = srStops;
        }
      }

      let nr36ToChibaDur = chibaDepSec - nr36DepSec;
      if (nr36ToChibaDur <= 300) {
        chibaDepSec = nr36DepSec + 1800;
        nr36ToChibaDur = 1800;
      }
      const sakuraPassSec = Math.round(nr36DepSec + nr36ToChibaDur * (20.4 / 36.5));

      const midNaritaUpStops = buildPassingStopsWithDistances(NARITA_UP_STATIONS, nr36DepSec, sakuraPassSec, false, true);
      const stops = [
        { stationId: 'NR-37', arrivalTime: secToTime(nrtDepSec), departureTime: secToTime(nrtDepSec), isPassing: false },
        { stationId: 'NR-36', arrivalTime: secToTime(nr36ArrSec), departureTime: secToTime(nr36DepSec), isPassing: false },
        ...midNaritaUpStops.slice(1),
      ];

      const origNr03 = nrtTrip.stops.find((s) => s.stationId === 'NR-03');
      if (origNr03 && !origNr03.isPassing) {
        const nr03 = stops.find((s) => s.stationId === 'NR-03');
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

      const smTripId = `${prefix}_INB_SM-06_${secToTime(sakuraPassSec).replace(/:/g, '').slice(0, 4)}_${nrtTrip.trainId || trainNum}`;
      let smTrip = lineData.sobu_main.find(
        (t) => t.tripId === smTripId || (t.direction === 'inbound' && t.isHoliday === isHoliday && t.trainNumber === trainNum)
      );
      const smStops = buildPassingStopsWithDistances(SOBUM_UP_STATIONS, sakuraPassSec, chibaDepSec, true, srTrip ? srTrip.stops[0].isPassing : true);

      if (!smTrip) {
        smTrip = {
          tripId: smTripId,
          lineId: 'sobu_main',
          trainId: nrtTrip.trainId || trainNum,
          trainNumber: trainNum,
          trainType: 'limitedExp',
          trainName,
          direction: 'inbound',
          originStationId: 'SM-06',
          destinationStationId: 'SM-01',
          customOrigin: '成田空港',
          customDestination: finalDest,
          cars: nrtTrip.cars || 6,
          isHoliday,
          stops: smStops,
        };
        lineData.sobu_main.push(smTrip);
      } else {
        smTrip.tripId = smTripId;
        smTrip.trainName = trainName;
        smTrip.trainType = 'limitedExp';
        smTrip.customOrigin = '成田空港';
        smTrip.customDestination = finalDest;
        smTrip.stops = smStops;
      }

      linkThroughTrips(nrtTrip, 'narita', smTrip, 'sobu_main', {
        withLegacyObjects: true,
        legacyTrainNumber: trainNum,
      });
      linkThroughTrips(smTrip, 'sobu_main', srTrip, 'sobu_rapid', {
        withLegacyObjects: true,
        legacyTrainNumber: trainNum,
      });
      srTrip.customOrigin = '成田空港';
      srTrip.customDestination = finalDest;

      if (ykTrip) {
        linkThroughTrips(srTrip, 'sobu_rapid', ykTrip, 'yokosuka', {
          withLegacyObjects: true,
          legacyTrainNumber: trainNum,
        });
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
    const resolvedTrips = [];

    for (const seg of AYAME_85_CONFIG.segments) {
      const tripId = `${prefix}_${seg.tripIdSuffix}`;
      const list = lineData[seg.lineId];
      let trip = list.find((t) => t.tripId === tripId);
      if (!trip) {
        trip = {
          tripId,
          lineId: seg.lineId,
          trainId: AYAME_85_CONFIG.trainId,
          trainNumber: AYAME_85_CONFIG.trainNumber,
          trainType: AYAME_85_CONFIG.trainType,
          trainName: AYAME_85_CONFIG.trainName,
          direction: AYAME_85_CONFIG.direction,
          originStationId: seg.originStationId,
          destinationStationId: seg.destinationStationId,
          customOrigin: AYAME_85_CONFIG.customOrigin,
          customDestination: AYAME_85_CONFIG.customDestination,
          cars: AYAME_85_CONFIG.cars,
          isHoliday,
          stops: JSON.parse(JSON.stringify(seg.stops)),
        };
        list.push(trip);
      }
      resolvedTrips.push({ lineId: seg.lineId, trip });
    }

    for (let i = 0; i < resolvedTrips.length - 1; i++) {
      linkThroughTrips(
        resolvedTrips[i].trip,
        resolvedTrips[i].lineId,
        resolvedTrips[i + 1].trip,
        resolvedTrips[i + 1].lineId,
        {
          withLegacyObjects: true,
          legacyTrainNumber: AYAME_85_CONFIG.trainNumber,
        }
      );
    }

    console.log(`  ✓ 特急あやめ85号 (${prefix}) 3線相互直通リンク完了 (新宿/錦糸町 -> 千葉 -> 佐倉 -> 佐原)`);
  }

  // =========================================================================
  // 4. 特急しおさい（東京 ↔ 銚子） 直通リンク補強
  // =========================================================================
  console.log('\n--- 4. 特急しおさい 直通リンク補強 ---');
  for (const isHoliday of [false, true]) {
    const srDownShiosai = lineData.sobu_rapid.filter(
      (t) => t.direction === 'outbound' && t.isHoliday === isHoliday && t.trainName && t.trainName.includes('しおさい')
    );
    const smDownShiosai = lineData.sobu_main.filter(
      (t) => t.direction === 'outbound' && t.isHoliday === isHoliday && t.trainName && t.trainName.includes('しおさい')
    );

    for (const sr of srDownShiosai) {
      const chibaStop = sr.stops.find((s) => s.stationId === 'JO-28');
      if (!chibaStop) continue;
      const tChiba = chibaStop.departureTime || chibaStop.arrivalTime;
      const sm = smDownShiosai.find((m) => {
        const mStop = m.stops.find((s) => s.stationId === 'SM-01');
        return mStop && Math.abs(timeToSec(mStop.departureTime || mStop.arrivalTime) - timeToSec(tChiba)) <= 300;
      });
      if (sm) {
        linkThroughTrips(sr, 'sobu_rapid', sm, 'sobu_main', {
          withLegacyObjects: true,
          legacyTrainNumber: sr.trainNumber,
        });
        sr.customDestination = '銚子';
        sm.customOrigin = '東京';
        console.log(`  ✓ 下り 特急しおさい (${sr.trainName || sr.trainNumber}) 直通リンク完了 (東京 -> 銚子)`);
      }
    }

    const smUpShiosai = lineData.sobu_main.filter(
      (t) => t.direction === 'inbound' && t.isHoliday === isHoliday && t.trainName && t.trainName.includes('しおさい')
    );
    const srUpShiosai = lineData.sobu_rapid.filter(
      (t) => t.direction === 'inbound' && t.isHoliday === isHoliday && t.trainName && t.trainName.includes('しおさい')
    );

    for (const sm of smUpShiosai) {
      const chibaStop = sm.stops.find((s) => s.stationId === 'SM-01');
      if (!chibaStop) continue;
      const tChiba = chibaStop.departureTime || chibaStop.arrivalTime;
      const sr = srUpShiosai.find((r) => {
        const rStop = r.stops.find((s) => s.stationId === 'JO-28');
        return rStop && Math.abs(timeToSec(rStop.departureTime || rStop.arrivalTime) - timeToSec(tChiba)) <= 300;
      });
      if (sr) {
        linkThroughTrips(sm, 'sobu_main', sr, 'sobu_rapid', {
          withLegacyObjects: true,
          legacyTrainNumber: sm.trainNumber,
        });
        sm.customDestination = '東京';
        sr.customOrigin = '銚子';
        console.log(`  ✓ 上り 特急しおさい (${sm.trainName || sm.trainNumber}) 直通リンク完了 (銚子 -> 東京)`);
      }
    }
  }

  for (const [key, trips] of Object.entries(lineData)) {
    safeWriteJson(LINE_PATHS[key], trips);
  }

  console.log('🎉 成田エクスプレス & 特急あやめ & 特急しおさい 直通・ダイヤ補完完了！');
}

module.exports = { bridgeNexAndAyame };

if (require.main === module) {
  bridgeNexAndAyame();
}
