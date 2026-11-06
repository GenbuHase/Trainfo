// 特急アルプス（9011M: 新宿 23:58発 -> 松本 04:46着/04:49発 -> 白馬 05:50着）ダイヤ補間・4線相互直通リンクスクリプト（宣言的設定駆動）
const fs = require('fs');
const path = require('path');
const {
  secToTime,
  safeReadJson,
  safeWriteJson,
} = require('./common/timetableUtils.cjs');

const LINE_PATHS = {
  chuo: path.resolve('src/data/lines/chuo/globalTimetable.json'),
  chuo_main: path.resolve('src/data/lines/chuo_main/globalTimetable.json'),
  shinonoi: path.resolve('src/data/lines/shinonoi/globalTimetable.json'),
  shinonoiSt: path.resolve('src/data/lines/shinonoi/stationTimetables.json'),
  oito_east: path.resolve('src/data/lines/oito_east/globalTimetable.json'),
};

// 宣言的設定: 特急アルプス (42781 / 9011M) の運行パラメータ
const ALPS_CONFIG = {
  trainId: '42781',
  trainNumber: '9011M',
  trainName: 'アルプス',
  trainType: 'limitedExp',
  cars: 9,
  customOrigin: '新宿',
  customDestination: '白馬',
  nishiHachiojiPassTime: '00:49:30',
  takaoPassTime: '00:53:00',
  takaoPassSec: 53 * 60, // 00:53:00
  shiojiriPassTime: '04:30:00',
  shiojiriPassSec: 4 * 3600 + 30 * 60, // 04:30:00
  shinonoiStops: [
    { stationId: 'SN-01', arrivalTime: '04:30:00', departureTime: '04:30:00', isPassing: true },
    { stationId: 'SN-02', arrivalTime: '04:34:00', departureTime: '04:34:00', isPassing: true },
    { stationId: 'SN-03', arrivalTime: '04:37:00', departureTime: '04:37:00', isPassing: true },
    { stationId: 'SN-04', arrivalTime: '04:39:00', departureTime: '04:39:00', isPassing: true },
    { stationId: 'SN-05', arrivalTime: '04:42:00', departureTime: '04:42:00', isPassing: true },
    { stationId: 'SN-06', arrivalTime: '04:46:00', departureTime: '04:49:00', isPassing: false },
  ],
  matsumotoDepBoard: {
    h: 4,
    m: 49,
    time: '49',
    sec: 4 * 3600 + 49 * 60,
    t: 'limitedExp',
    d: '白馬',
    no: '9011M',
    track: '1',
  },
};

function extendAlpsTimetable() {
  console.log('=== 🏔️ 特急アルプス ダイヤ補間・4線貫通リンク開始 ===\n');

  if (!fs.existsSync(LINE_PATHS.chuo) || !fs.existsSync(LINE_PATHS.chuo_main) || !fs.existsSync(LINE_PATHS.shinonoi)) {
    console.error('Line files not found!');
    return;
  }

  const chuoTrips = safeReadJson(LINE_PATHS.chuo);
  const chuoMainTrips = safeReadJson(LINE_PATHS.chuo_main);
  const shinonoiTrips = safeReadJson(LINE_PATHS.shinonoi);
  const shinonoiSt = safeReadJson(LINE_PATHS.shinonoiSt, {});
  const oitoTrips = safeReadJson(LINE_PATHS.oito_east);

  // 1. 中央線快速 (chuo): 新宿 23:58発 -> 高尾 00:53通過
  for (const trip of chuoTrips) {
    if (
      trip.trainId === ALPS_CONFIG.trainId ||
      trip.trainNumber === ALPS_CONFIG.trainId ||
      trip.trainNumber === ALPS_CONFIG.trainNumber ||
      (trip.tripId && trip.tripId.includes(ALPS_CONFIG.trainId))
    ) {
      const prefix = trip.isHoliday ? 'HD' : 'WD';
      trip.trainNumber = ALPS_CONFIG.trainNumber;
      trip.trainName = ALPS_CONFIG.trainName;
      trip.destinationStationId = 'JC-24';
      trip.customOrigin = ALPS_CONFIG.customOrigin;
      trip.customDestination = ALPS_CONFIG.customDestination;
      trip.cars = ALPS_CONFIG.cars;
      trip.throughTripId = `cm_${prefix}_OUT_JC-05_2358_${ALPS_CONFIG.trainId}`;
      trip.throughLineId = 'chuo_main';

      const stops = trip.stops;
      let takaoStop = stops.find((s) => s.stationId === 'JC-24');
      if (!takaoStop) {
        if (!stops.some((s) => s.stationId === 'JC-23')) {
          stops.push({
            stationId: 'JC-23',
            arrivalTime: ALPS_CONFIG.nishiHachiojiPassTime,
            departureTime: ALPS_CONFIG.nishiHachiojiPassTime,
            isPassing: true,
          });
        }
        stops.push({
          stationId: 'JC-24',
          arrivalTime: ALPS_CONFIG.takaoPassTime,
          departureTime: ALPS_CONFIG.takaoPassTime,
          isPassing: true,
        });
      } else {
        takaoStop.arrivalTime = ALPS_CONFIG.takaoPassTime;
        takaoStop.departureTime = ALPS_CONFIG.takaoPassTime;
        takaoStop.isPassing = true;
      }
      console.log(`  ✓ chuo ${trip.tripId} を高尾(00:53通過)まで整備・直通設定`);
    }
  }

  // 2. 中央本線 (chuo_main): 高尾 00:53通過 -> 塩尻 04:30通過 (区間標準所要秒数比で補間)
  const cfg = require('./lines/chuo_main/config.cjs');
  const stList = cfg.stations;
  const baseTable = cfg.baseSectionSeconds;

  let totalBase = 0;
  for (let i = 1; i <= 37; i++) {
    totalBase += baseTable[i] || 240;
  }
  const scale = (ALPS_CONFIG.shiojiriPassSec - ALPS_CONFIG.takaoPassSec) / totalBase;

  let curSec = ALPS_CONFIG.takaoPassSec;
  const chuoMainStops = [];
  for (let i = 0; i < stList.length; i++) {
    const st = stList[i];
    const timeStr = secToTime(Math.round(curSec));
    chuoMainStops.push({
      stationId: st.id,
      arrivalTime: timeStr,
      departureTime: timeStr,
      isPassing: true,
    });
    if (i < stList.length - 1) {
      curSec += (baseTable[i + 1] || 240) * scale;
    }
  }
  chuoMainStops[chuoMainStops.length - 1].arrivalTime = ALPS_CONFIG.shiojiriPassTime;
  chuoMainStops[chuoMainStops.length - 1].departureTime = ALPS_CONFIG.shiojiriPassTime;

  for (const isHoliday of [false, true]) {
    const prefix = isHoliday ? 'HD' : 'WD';
    const tripId = `cm_${prefix}_OUT_JC-05_2358_${ALPS_CONFIG.trainId}`;
    const existingIdx = chuoMainTrips.findIndex((t) => t.tripId === tripId || (t.trainId === ALPS_CONFIG.trainId && t.isHoliday === isHoliday));
    const tripData = {
      tripId,
      lineId: 'chuo_main',
      trainId: ALPS_CONFIG.trainId,
      trainNumber: ALPS_CONFIG.trainNumber,
      trainName: ALPS_CONFIG.trainName,
      trainType: ALPS_CONFIG.trainType,
      direction: 'outbound',
      originStationId: 'JC-24',
      destinationStationId: 'CO-61',
      customOrigin: ALPS_CONFIG.customOrigin,
      customDestination: ALPS_CONFIG.customDestination,
      cars: ALPS_CONFIG.cars,
      isHoliday,
      stops: JSON.parse(JSON.stringify(chuoMainStops)),
      prevTripId: `${prefix}_OUT_JC-05_2358_${ALPS_CONFIG.trainId}`,
      prevLineId: 'chuo',
      throughTripId: `sn_${prefix}_OUT_JC-05_2358_${ALPS_CONFIG.trainId}`,
      throughLineId: 'shinonoi',
    };

    if (existingIdx !== -1) chuoMainTrips[existingIdx] = tripData;
    else chuoMainTrips.push(tripData);
    console.log(`  ✓ chuo_main ${tripId} を全38駅(高尾00:53〜塩尻04:30)通過時刻補間・直通設定`);
  }

  // 3. 篠ノ井線 (shinonoi): 塩尻 04:30通過 -> 松本 04:46着/04:49発
  for (const isHoliday of [false, true]) {
    const prefix = isHoliday ? 'HD' : 'WD';
    const tripId = `sn_${prefix}_OUT_JC-05_2358_${ALPS_CONFIG.trainId}`;
    const existingIdx = shinonoiTrips.findIndex((t) => t.tripId === tripId || (t.trainId === ALPS_CONFIG.trainId && t.isHoliday === isHoliday));
    const tripData = {
      tripId,
      lineId: 'shinonoi',
      trainId: ALPS_CONFIG.trainId,
      trainNumber: ALPS_CONFIG.trainNumber,
      trainName: ALPS_CONFIG.trainName,
      trainType: ALPS_CONFIG.trainType,
      direction: 'outbound',
      originStationId: 'SN-01',
      destinationStationId: 'SN-06',
      customOrigin: ALPS_CONFIG.customOrigin,
      customDestination: ALPS_CONFIG.customDestination,
      cars: ALPS_CONFIG.cars,
      isHoliday,
      stops: JSON.parse(JSON.stringify(ALPS_CONFIG.shinonoiStops)),
      prevTripId: `cm_${prefix}_OUT_JC-05_2358_${ALPS_CONFIG.trainId}`,
      prevLineId: 'chuo_main',
      throughTripId: `${prefix}_OUT_OIE-01_0449_${ALPS_CONFIG.trainId}`,
      throughLineId: 'oito_east',
    };

    if (existingIdx !== -1) shinonoiTrips[existingIdx] = tripData;
    else shinonoiTrips.push(tripData);
    console.log(`  ✓ shinonoi ${tripId} を新設(塩尻04:30通過〜松本04:46着/04:49発)・直通設定`);
  }

  for (const day of ['weekday', 'holiday']) {
    const matsumoto = shinonoiSt[day]?.['SN-06'];
    if (matsumoto) {
      matsumoto.outbound = matsumoto.outbound.filter((d) => d.no !== ALPS_CONFIG.trainId && d.no !== ALPS_CONFIG.trainNumber);
      matsumoto.outbound.push({ ...ALPS_CONFIG.matsumotoDepBoard });
      matsumoto.outbound.sort((a, b) => a.sec - b.sec);
    }
  }

  // 4. 大糸線 (oito_east): 松本 04:49発 -> 白馬 05:50着
  for (const trip of oitoTrips) {
    if (trip.tripId && trip.tripId.includes(ALPS_CONFIG.trainId)) {
      const prefix = trip.isHoliday ? 'HD' : 'WD';
      trip.trainNumber = ALPS_CONFIG.trainNumber;
      trip.trainName = ALPS_CONFIG.trainName;
      trip.customOrigin = ALPS_CONFIG.customOrigin;
      trip.customDestination = ALPS_CONFIG.customDestination;
      trip.cars = ALPS_CONFIG.cars;
      trip.prevTripId = `sn_${prefix}_OUT_JC-05_2358_${ALPS_CONFIG.trainId}`;
      trip.prevLineId = 'shinonoi';
      console.log(`  ✓ oito_east ${trip.tripId} に先行リンク (shinonoi) を設定`);
    }
  }

  safeWriteJson(LINE_PATHS.chuo, chuoTrips);
  safeWriteJson(LINE_PATHS.chuo_main, chuoMainTrips);
  safeWriteJson(LINE_PATHS.shinonoi, shinonoiTrips);
  safeWriteJson(LINE_PATHS.shinonoiSt, shinonoiSt);
  safeWriteJson(LINE_PATHS.oito_east, oitoTrips);

  console.log('\n🎉 特急アルプスの4線貫通ダイヤ・直通リンク整備が完了しました！');
}

module.exports = { extendAlpsTimetable };

if (require.main === module) {
  extendAlpsTimetable();
}
