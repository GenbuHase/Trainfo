// 小田急小田原線 ↔ JR御殿場線 特急ふじさん（松田連絡線経由）直通リンクスクリプト（宣言的設定駆動）
const fs = require('fs');
const path = require('path');
const {
  timeToSec,
  secToTime,
  safeReadJson,
  safeWriteJson,
  linkThroughTrips,
} = require('./common/timetableUtils.cjs');

// 宣言的設定: 特急ふじさん号 連絡線経由直通ペア定義
const FUJISAN_BRIDGE_CONFIG = {
  odakyuPath: path.resolve('src/data/lines/odakyu_odawara/globalTimetable.json'),
  gotembaPath: path.resolve('src/data/lines/gotemba/globalTimetable.json'),
  hadanoStationId: 'OH-39',
  shibusawaStationId: 'OH-40',
  matsudaStationId: 'CB-04',
  rewindStationIds: ['OH-40', 'OH-41', 'CB-04'],
  downShibusawaRatio: 0.45,
  upShibusawaRatio: 0.55,
  downPairs: [
    // 平日
    { odakyuId: '38876', gotembaId: '39001', holiday: false, name: 'ふじさん1号', trainNum: '0401M' },
    { odakyuId: '38877', gotembaId: '39002', holiday: false, name: 'ふじさん3号', trainNum: '0403M' },
    { odakyuId: '38879', gotembaId: '39004', holiday: false, name: 'ふじさん5号', trainNum: '0405M' },
    // 土休日
    { odakyuId: '38875', gotembaId: '39000', holiday: true, name: 'ふじさん1号', trainNum: '0401M' },
    { odakyuId: '38878', gotembaId: '39003', holiday: true, name: 'ふじさん3号', trainNum: '0403M' },
    { odakyuId: '38880', gotembaId: '39005', holiday: true, name: 'ふじさん5号', trainNum: '0405M' },
  ],
  upPairs: [
    // 平日
    { odakyuId: '31210', gotembaId: '31305', holiday: false, name: 'ふじさん2号', trainNum: '0402M' },
    { odakyuId: '31211', gotembaId: '31306', holiday: false, name: 'ふじさん4号', trainNum: '0404M' },
    { odakyuId: '31213', gotembaId: '31308', holiday: false, name: 'ふじさん6号', trainNum: '0406M' },
    // 土休日
    { odakyuId: '31209', gotembaId: '31304', holiday: true, name: 'ふじさん2号', trainNum: '0402M' },
    { odakyuId: '31212', gotembaId: '31307', holiday: true, name: 'ふじさん4号', trainNum: '0404M' },
    { odakyuId: '31214', gotembaId: '31309', holiday: true, name: 'ふじさん6号', trainNum: '0406M' },
  ],
};

function bridgeOdakyuGotemba() {
  console.log('=== 🗻 Bridging Odakyu Odawara <-> Gotemba (Fujisan Limited Express via Connection Track) ===');

  const {
    odakyuPath,
    gotembaPath,
    hadanoStationId,
    shibusawaStationId,
    matsudaStationId,
    rewindStationIds,
    downShibusawaRatio,
    upShibusawaRatio,
    downPairs,
    upPairs,
  } = FUJISAN_BRIDGE_CONFIG;

  if (!fs.existsSync(odakyuPath) || !fs.existsSync(gotembaPath)) {
    console.error('File not found:', odakyuPath, gotembaPath);
    return;
  }

  const odakyuTrips = safeReadJson(odakyuPath);
  const gotembaTrips = safeReadJson(gotembaPath);

  let linkedDown = 0;
  for (const pair of downPairs) {
    const odTrip = odakyuTrips.find((t) => t.tripId.includes(pair.odakyuId) && t.isHoliday === pair.holiday);
    const gtTrip = gotembaTrips.find((t) => t.tripId.includes(pair.gotembaId) && t.isHoliday === pair.holiday);
    if (!odTrip || !gtTrip) {
      console.warn(`[Skip] Pair not found for ${pair.name} (holiday: ${pair.holiday})`);
      continue;
    }

    while (odTrip.stops.length > 0 && rewindStationIds.includes(odTrip.stops[odTrip.stops.length - 1].stationId)) {
      odTrip.stops.pop();
    }

    const hadanoStop = odTrip.stops.find((s) => s.stationId === hadanoStationId);
    const matsudaStop = gtTrip.stops.find((s) => s.stationId === matsudaStationId);

    if (hadanoStop && matsudaStop) {
      const hadanoDepSec = timeToSec(hadanoStop.departureTime || hadanoStop.arrivalTime);
      const matsudaArrSec = timeToSec(matsudaStop.arrivalTime || matsudaStop.departureTime);
      const shibusawaSec = Math.round(hadanoDepSec + (matsudaArrSec - hadanoDepSec) * downShibusawaRatio);

      odTrip.stops.push(
        { stationId: shibusawaStationId, arrivalTime: secToTime(shibusawaSec), departureTime: secToTime(shibusawaSec), isPassing: true },
        { stationId: matsudaStationId, arrivalTime: matsudaStop.arrivalTime, departureTime: matsudaStop.departureTime, isPassing: false }
      );
      odTrip.destinationStationId = matsudaStationId;

      linkThroughTrips(odTrip, 'odakyu_odawara', gtTrip, 'gotemba', {
        customOrigin: '新宿',
        customDestination: '御殿場',
      });
      if (!odTrip.trainName) odTrip.trainName = pair.name;
      if (!gtTrip.trainName) gtTrip.trainName = pair.name;
      if (pair.trainNum) gtTrip.trainNumber = pair.trainNum;

      linkedDown++;
    }
  }

  let linkedUp = 0;
  for (const pair of upPairs) {
    const odTrip = odakyuTrips.find((t) => t.tripId.includes(pair.odakyuId) && t.isHoliday === pair.holiday);
    const gtTrip = gotembaTrips.find((t) => t.tripId.includes(pair.gotembaId) && t.isHoliday === pair.holiday);
    if (!odTrip || !gtTrip) {
      console.warn(`[Skip] Pair not found for ${pair.name} (holiday: ${pair.holiday})`);
      continue;
    }

    while (odTrip.stops.length > 0 && rewindStationIds.includes(odTrip.stops[0].stationId)) {
      odTrip.stops.shift();
    }

    const hadanoStop = odTrip.stops.find((s) => s.stationId === hadanoStationId);
    const matsudaStop = gtTrip.stops.find((s) => s.stationId === matsudaStationId);

    if (hadanoStop && matsudaStop) {
      const matsudaDepSec = timeToSec(matsudaStop.departureTime || matsudaStop.arrivalTime);
      const hadanoArrSec = timeToSec(hadanoStop.arrivalTime || hadanoStop.departureTime);
      const shibusawaSec = Math.round(matsudaDepSec + (hadanoArrSec - matsudaDepSec) * upShibusawaRatio);

      odTrip.stops.unshift({ stationId: shibusawaStationId, arrivalTime: secToTime(shibusawaSec), departureTime: secToTime(shibusawaSec), isPassing: true });
      odTrip.stops.unshift({ stationId: matsudaStationId, arrivalTime: matsudaStop.arrivalTime, departureTime: matsudaStop.departureTime, isPassing: false });
      odTrip.originStationId = matsudaStationId;

      linkThroughTrips(gtTrip, 'gotemba', odTrip, 'odakyu_odawara', {
        customOrigin: '御殿場',
        customDestination: '新宿',
      });
      if (!gtTrip.trainName) gtTrip.trainName = pair.name;
      if (pair.trainNum) gtTrip.trainNumber = pair.trainNum;
      if (!odTrip.trainName) odTrip.trainName = pair.name;

      linkedUp++;
    }
  }

  safeWriteJson(odakyuPath, odakyuTrips);
  safeWriteJson(gotembaPath, gotembaTrips);
  console.log(`🎉 特急ふじさん全12便（下り ${linkedDown} 便, 上り ${linkedUp} 便）の連絡線経由・直通リンク完了！\n`);
}

module.exports = { bridgeOdakyuGotemba };

if (require.main === module) {
  bridgeOdakyuGotemba();
}
