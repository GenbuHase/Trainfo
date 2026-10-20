// 特急アルプス（9011M: 新宿 23:58発 -> 松本 04:46着/04:49発 -> 白馬 05:50着）ダイヤ補間・4線相互直通リンクスクリプト
const fs = require('fs');
const path = require('path');

function s2t(s) {
  const norm = (Math.floor(s) + 86400 * 2) % 86400;
  const h = Math.floor(norm / 3600);
  const m = Math.floor((norm % 3600) / 60);
  const sc = norm % 60;
  return [h, m, sc].map(v => v.toString().padStart(2, '0')).join(':');
}

function safeWriteJson(filePath, data) {
  const content = JSON.stringify(data, null, 2);
  let attempts = 0;
  while (attempts < 10) {
    try {
      fs.writeFileSync(filePath, content, 'utf8');
      return;
    } catch (e) {
      attempts++;
      if (attempts >= 10) throw e;
      const start = Date.now();
      while (Date.now() - start < 150) {}
    }
  }
}

function extendAlpsTimetable() {
  console.log('=== 🏔️ 特急アルプス ダイヤ補間・4線貫通リンク開始 ===\n');

  const chuoPath = path.resolve('src/data/lines/chuo/globalTimetable.json');
  const chuoMainPath = path.resolve('src/data/lines/chuo_main/globalTimetable.json');
  const shinonoiPath = path.resolve('src/data/lines/shinonoi/globalTimetable.json');
  const shinonoiStPath = path.resolve('src/data/lines/shinonoi/stationTimetables.json');
  const oitoPath = path.resolve('src/data/lines/oito_east/globalTimetable.json');

  if (!fs.existsSync(chuoPath) || !fs.existsSync(chuoMainPath) || !fs.existsSync(shinonoiPath)) {
    console.error('Line files not found!');
    return;
  }

  const chuoTrips = JSON.parse(fs.readFileSync(chuoPath, 'utf8'));
  const chuoMainTrips = JSON.parse(fs.readFileSync(chuoMainPath, 'utf8'));
  const shinonoiTrips = JSON.parse(fs.readFileSync(shinonoiPath, 'utf8'));
  const shinonoiSt = fs.existsSync(shinonoiStPath) ? JSON.parse(fs.readFileSync(shinonoiStPath, 'utf8')) : {};
  const oitoTrips = fs.existsSync(oitoPath) ? JSON.parse(fs.readFileSync(oitoPath, 'utf8')) : [];

  // ========================================================
  // 1. 中央線快速 (chuo): 新宿 23:58発 -> 高尾 00:53通過
  // ========================================================
  for (const trip of chuoTrips) {
    if (trip.trainId === '42781' || trip.trainNumber === '42781' || trip.trainNumber === '9011M' || (trip.tripId && trip.tripId.includes('42781'))) {
      const isHoliday = trip.isHoliday;
      const prefix = isHoliday ? 'HD' : 'WD';
      trip.trainNumber = '9011M';
      trip.trainName = 'アルプス';
      trip.destinationStationId = 'JC-24';
      trip.customOrigin = '新宿';
      trip.customDestination = '白馬';
      trip.cars = 9;
      trip.throughTripId = `cm_${prefix}_OUT_JC-05_2358_42781`;
      trip.throughLineId = 'chuo_main';

      // 八王子以降の通過stopsを確認・同期
      const stops = trip.stops;
      let takaoStop = stops.find(s => s.stationId === 'JC-24');
      if (!takaoStop) {
        if (!stops.some(s => s.stationId === 'JC-23')) {
          stops.push({
            stationId: 'JC-23',
            arrivalTime: '00:49:30',
            departureTime: '00:49:30',
            isPassing: true,
          });
        }
        stops.push({
          stationId: 'JC-24',
          arrivalTime: '00:53:00',
          departureTime: '00:53:00',
          isPassing: true,
        });
      } else {
        takaoStop.arrivalTime = '00:53:00';
        takaoStop.departureTime = '00:53:00';
        takaoStop.isPassing = true;
      }
      console.log(`  ✓ chuo ${trip.tripId} を高尾(00:53通過)まで整備・直通設定`);
    }
  }

  // ========================================================
  // 2. 中央本線 (chuo_main): 高尾 00:53通過 -> 塩尻 04:30通過
  // ========================================================
  const cfg = require('./lines/chuo_main/config.cjs');
  const stList = cfg.stations;
  const baseTable = cfg.baseSectionSeconds;

  let totalBase = 0;
  for (let i = 1; i <= 37; i++) {
    totalBase += (baseTable[i] || 240);
  }
  const startSec = 53 * 60; // 00:53:00 = 3180
  const endSec = 4 * 3600 + 30 * 60; // 04:30:00 = 16200
  const scale = (endSec - startSec) / totalBase;

  let curSec = startSec;
  const chuoMainStops = [];
  for (let i = 0; i < stList.length; i++) {
    const st = stList[i];
    const timeStr = s2t(Math.round(curSec));
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
  // 塩尻を 04:30:00 ちょうどに微調整
  chuoMainStops[chuoMainStops.length - 1].arrivalTime = '04:30:00';
  chuoMainStops[chuoMainStops.length - 1].departureTime = '04:30:00';

  for (const isHoliday of [false, true]) {
    const prefix = isHoliday ? 'HD' : 'WD';
    const tripId = `cm_${prefix}_OUT_JC-05_2358_42781`;
    const existingIdx = chuoMainTrips.findIndex(t => t.tripId === tripId || (t.trainId === '42781' && t.isHoliday === isHoliday));
    const tripData = {
      tripId,
      lineId: 'chuo_main',
      trainId: '42781',
      trainNumber: '9011M',
      trainName: 'アルプス',
      trainType: 'limitedExp',
      direction: 'outbound',
      originStationId: 'JC-24',
      destinationStationId: 'CO-61',
      customOrigin: '新宿',
      customDestination: '白馬',
      cars: 9,
      isHoliday,
      stops: JSON.parse(JSON.stringify(chuoMainStops)),
      prevTripId: `${prefix}_OUT_JC-05_2358_42781`,
      prevLineId: 'chuo',
      throughTripId: `sn_${prefix}_OUT_JC-05_2358_42781`,
      throughLineId: 'shinonoi',
    };

    if (existingIdx !== -1) {
      chuoMainTrips[existingIdx] = tripData;
    } else {
      chuoMainTrips.push(tripData);
    }
    console.log(`  ✓ chuo_main ${tripId} を全38駅(高尾00:53〜塩尻04:30)通過時刻補間・直通設定`);
  }

  // ========================================================
  // 3. 篠ノ井線 (shinonoi): 塩尻 04:30通過 -> 松本 04:46着/04:49発
  // ========================================================
  const shinonoiStops = [
    { stationId: 'SN-01', arrivalTime: '04:30:00', departureTime: '04:30:00', isPassing: true },
    { stationId: 'SN-02', arrivalTime: '04:34:00', departureTime: '04:34:00', isPassing: true },
    { stationId: 'SN-03', arrivalTime: '04:37:00', departureTime: '04:37:00', isPassing: true },
    { stationId: 'SN-04', arrivalTime: '04:39:00', departureTime: '04:39:00', isPassing: true },
    { stationId: 'SN-05', arrivalTime: '04:42:00', departureTime: '04:42:00', isPassing: true },
    { stationId: 'SN-06', arrivalTime: '04:46:00', departureTime: '04:49:00', isPassing: false },
  ];

  for (const isHoliday of [false, true]) {
    const prefix = isHoliday ? 'HD' : 'WD';
    const tripId = `sn_${prefix}_OUT_JC-05_2358_42781`;
    const existingIdx = shinonoiTrips.findIndex(t => t.tripId === tripId || (t.trainId === '42781' && t.isHoliday === isHoliday));
    const tripData = {
      tripId,
      lineId: 'shinonoi',
      trainId: '42781',
      trainNumber: '9011M',
      trainName: 'アルプス',
      trainType: 'limitedExp',
      direction: 'outbound',
      originStationId: 'SN-01',
      destinationStationId: 'SN-06',
      customOrigin: '新宿',
      customDestination: '白馬',
      cars: 9,
      isHoliday,
      stops: JSON.parse(JSON.stringify(shinonoiStops)),
      prevTripId: `cm_${prefix}_OUT_JC-05_2358_42781`,
      prevLineId: 'chuo_main',
      throughTripId: `${prefix}_OUT_OIE-01_0449_42781`,
      throughLineId: 'oito_east',
    };

    if (existingIdx !== -1) {
      shinonoiTrips[existingIdx] = tripData;
    } else {
      shinonoiTrips.push(tripData);
    }
    console.log(`  ✓ shinonoi ${tripId} を新設(塩尻04:30通過〜松本04:46着/04:49発)・直通設定`);
  }

  // 松本駅発車標 (SN-06) に 42781 を追加
  for (const day of ['weekday', 'holiday']) {
    const matsumoto = shinonoiSt[day]?.['SN-06'];
    if (matsumoto) {
      matsumoto.outbound = matsumoto.outbound.filter(d => d.no !== '42781' && d.no !== '9011M');
      matsumoto.outbound.push({
        h: 4,
        m: 49,
        time: '49',
        sec: 4 * 3600 + 49 * 60,
        t: 'limitedExp',
        d: '白馬',
        no: '9011M',
        track: '1',
      });
      matsumoto.outbound.sort((a, b) => a.sec - b.sec);
    }
  }

  // ========================================================
  // 4. 大糸線 (oito_east): 松本 04:49発 -> 白馬 05:50着
  // ========================================================
  for (const trip of oitoTrips) {
    if (trip.tripId && trip.tripId.includes('42781')) {
      const isHoliday = trip.isHoliday;
      const prefix = isHoliday ? 'HD' : 'WD';
      trip.trainNumber = '9011M';
      trip.trainName = 'アルプス';
      trip.customOrigin = '新宿';
      trip.customDestination = '白馬';
      trip.cars = 9;
      trip.prevTripId = `sn_${prefix}_OUT_JC-05_2358_42781`;
      trip.prevLineId = 'shinonoi';
      console.log(`  ✓ oito_east ${trip.tripId} に先行リンク (shinonoi) を設定`);
    }
  }

  // 5. 保存
  safeWriteJson(chuoPath, chuoTrips);
  safeWriteJson(chuoMainPath, chuoMainTrips);
  safeWriteJson(shinonoiPath, shinonoiTrips);
  safeWriteJson(shinonoiStPath, shinonoiSt);
  safeWriteJson(oitoPath, oitoTrips);

  console.log('\n🎉 特急アルプスの4線貫通ダイヤ・直通リンク整備が完了しました！');
}

module.exports = { extendAlpsTimetable };

if (require.main === module) {
  extendAlpsTimetable();
}
