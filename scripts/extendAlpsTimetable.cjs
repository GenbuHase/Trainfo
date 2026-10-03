const fs = require('fs');
const path = require('path');

// 1. 各路線のデータ読み込み
const chuoPath = 'src/data/lines/chuo/globalTimetable.json';
const chuoMainPath = 'src/data/lines/chuo_main/globalTimetable.json';
const shinonoiPath = 'src/data/lines/shinonoi/globalTimetable.json';
const shinonoiStPath = 'src/data/lines/shinonoi/stationTimetables.json';

const chuoTrips = JSON.parse(fs.readFileSync(chuoPath, 'utf8'));
const chuoMainTrips = JSON.parse(fs.readFileSync(chuoMainPath, 'utf8'));
const shinonoiTrips = JSON.parse(fs.readFileSync(shinonoiPath, 'utf8'));
const shinonoiSt = JSON.parse(fs.readFileSync(shinonoiStPath, 'utf8'));

// 2. chuo の 42781 トリップを更新 (高尾まで延伸)
for (const trip of chuoTrips) {
  if (trip.trainNumber === '42781') {
    const isHoliday = trip.isHoliday;
    const prefix = isHoliday ? 'cm_HD' : 'cm_WD';
    trip.destinationStationId = 'JC-24';
    trip.customDestination = '白馬';
    trip.cars = 9;
    trip.throughTripId = `${prefix}_OUT_JC-05_2358_42781`;
    trip.throughLineId = 'chuo_main';

    // 既に高尾まであれば更新、なければ八王子以降を追加
    const stops = trip.stops;
    if (!stops.some(s => s.stationId === 'JC-23')) {
      stops.push({
        stationId: 'JC-23',
        arrivalTime: '00:49:00',
        departureTime: '00:49:00',
        isPassing: true,
      });
    }
    if (!stops.some(s => s.stationId === 'JC-24')) {
      stops.push({
        stationId: 'JC-24',
        arrivalTime: '00:52:00',
        departureTime: '00:52:00',
        isPassing: true,
      });
    }
  }
}
fs.writeFileSync(chuoPath, JSON.stringify(chuoTrips, null, 2));
console.log('✓ Updated chuo trips for Alps 42781.');

// 3. chuo_main の 38駅通過時刻を計算
const cfg = require('./lines/chuo_main/config.cjs');
const stList = cfg.stations;
const baseTable = cfg.baseSectionSeconds;
let totalSec = 0;
Object.values(baseTable).forEach(s => totalSec += s);
const scale = (16200 - 3120) / totalSec; // 00:52:00 (3120s) -> 04:30:00 (16200s)

function s2t(s) {
  const norm = (s + 86400 * 2) % 86400;
  const h = Math.floor(norm / 3600);
  const m = Math.floor((norm % 3600) / 60);
  const sc = norm % 60;
  return [h, m, sc].map(v => v.toString().padStart(2, '0')).join(':');
}

let curSec = 3120;
const chuoMainStops = [];
for (let i = 0; i < stList.length; i++) {
  const st = stList[i];
  const timeStr = s2t(curSec);
  chuoMainStops.push({
    stationId: st.id,
    arrivalTime: timeStr,
    departureTime: timeStr,
    isPassing: true,
  });
  if (i < stList.length - 1) {
    curSec += Math.round((baseTable[i + 1] || 180) * scale);
  }
}
// 最終の塩尻駅を 04:30:00 ちょうどに微調整
chuoMainStops[chuoMainStops.length - 1].arrivalTime = '04:30:00';
chuoMainStops[chuoMainStops.length - 1].departureTime = '04:30:00';

for (const isHoliday of [false, true]) {
  const prefix = isHoliday ? 'HD' : 'WD';
  const tripId = `cm_${prefix}_OUT_JC-05_2358_42781`;
  const existingIdx = chuoMainTrips.findIndex(t => t.tripId === tripId);
  const tripData = {
    tripId,
    lineId: 'chuo_main',
    trainNumber: '42781',
    trainType: 'limitedExp',
    direction: 'outbound',
    originStationId: 'JC-24',
    destinationStationId: 'CO-61',
    customOrigin: '新宿',
    customDestination: '白馬',
    cars: 9,
    isHoliday,
    stops: JSON.parse(JSON.stringify(chuoMainStops)),
    throughTripId: `sn_${prefix}_OUT_JC-05_2358_42781`,
    throughLineId: 'shinonoi',
  };

  if (existingIdx !== -1) {
    chuoMainTrips[existingIdx] = tripData;
  } else {
    chuoMainTrips.push(tripData);
  }
}
fs.writeFileSync(chuoMainPath, JSON.stringify(chuoMainTrips, null, 2));
console.log('✓ Added chuo_main trips for Alps 42781.');

// 4. shinonoi の 6駅（塩尻〜松本）ダイヤを作成
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
  const existingIdx = shinonoiTrips.findIndex(t => t.tripId === tripId);
  const tripData = {
    tripId,
    lineId: 'shinonoi',
    trainNumber: '42781',
    trainType: 'limitedExp',
    direction: 'outbound',
    originStationId: 'SN-01',
    destinationStationId: 'SN-06',
    customOrigin: '新宿',
    customDestination: '白馬',
    cars: 9,
    isHoliday,
    stops: JSON.parse(JSON.stringify(shinonoiStops)),
    throughTripId: `cm_${prefix}_OUT_JC-05_2358_42781`,
    throughLineId: 'chuo_main',
  };

  if (existingIdx !== -1) {
    shinonoiTrips[existingIdx] = tripData;
  } else {
    shinonoiTrips.push(tripData);
  }
}
fs.writeFileSync(shinonoiPath, JSON.stringify(shinonoiTrips, null, 2));
console.log('✓ Added shinonoi trips for Alps 42781.');

// 5. shinonoi の松本駅 (SN-06) 発車標に 42781 (04:49発 白馬行) を追加
for (const day of ['weekday', 'holiday']) {
  const matsumoto = shinonoiSt[day]?.['SN-06'];
  if (matsumoto) {
    // 既存にあれば除外
    matsumoto.outbound = matsumoto.outbound.filter(d => d.no !== '42781');
    matsumoto.outbound.push({
      h: 4,
      m: 49,
      time: '49',
      sec: 4 * 3600 + 49 * 60,
      t: 'limitedExp',
      d: '白馬',
      no: '42781',
      track: '1',
    });
    // 時刻順にソート
    matsumoto.outbound.sort((a, b) => a.sec - b.sec);
  }
}
fs.writeFileSync(shinonoiStPath, JSON.stringify(shinonoiSt, null, 2));
console.log('✓ Added Alps 42781 to Matsumoto station timetable.');

console.log('\n🎉 Successfully extended Tokkyu Alps 42781 all the way to Matsumoto on Shinonoi Line!');
