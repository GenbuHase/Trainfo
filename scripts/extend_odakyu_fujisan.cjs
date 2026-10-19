// 小田急小田原線 特急ふじさん 秦野〜新松田/松田間 延伸・御殿場線直通リンクスクリプト
const fs = require('fs');
const path = require('path');

const odakyuPath = path.resolve('src/data/lines/odakyu_odawara/globalTimetable.json');
const gotembaPath = path.resolve('src/data/lines/gotemba/globalTimetable.json');

if (!fs.existsSync(odakyuPath) || !fs.existsSync(gotembaPath)) {
  console.error('File not found:', odakyuPath, gotembaPath);
  process.exit(1);
}

const odakyuTrips = JSON.parse(fs.readFileSync(odakyuPath, 'utf8'));
const gotembaTrips = JSON.parse(fs.readFileSync(gotembaPath, 'utf8'));

function toSec(t) {
  if (!t) return 0;
  const [h, m, s] = t.split(':').map(Number);
  let norm = h < 4 ? h + 24 : h;
  return norm * 3600 + m * 60 + (s || 0);
}

function secToStr(sec) {
  const norm = (Math.floor(sec) + 86400 * 2) % 86400;
  const h = Math.floor(norm / 3600).toString().padStart(2, '0');
  const m = Math.floor((norm % 3600) / 60).toString().padStart(2, '0');
  const s = (norm % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
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

console.log('=== 🗻 特急ふじさん（小田急 ↔ 御殿場線）延伸・直通リンク開始 ===\n');

// 下り便のペアリング (新宿 -> 御殿場)
const downPairs = [
  // 平日
  { odakyuId: '38876', gotembaId: '39001', holiday: false, name: 'ふじさん1号' },
  { odakyuId: '38877', gotembaId: '39002', holiday: false, name: 'ふじさん3号' },
  { odakyuId: '38879', gotembaId: '39004', holiday: false, name: 'ふじさん5号' },
  // 土休日
  { odakyuId: '38875', gotembaId: '39000', holiday: true, name: 'ふじさん1号' },
  { odakyuId: '38878', gotembaId: '39003', holiday: true, name: 'ふじさん3号' },
  { odakyuId: '38880', gotembaId: '39005', holiday: true, name: 'ふじさん5号' },
];

let linkedDown = 0;
for (const pair of downPairs) {
  const odTrip = odakyuTrips.find(t => t.tripId.includes(pair.odakyuId) && t.isHoliday === pair.holiday);
  const gtTrip = gotembaTrips.find(t => t.tripId.includes(pair.gotembaId) && t.isHoliday === pair.holiday);

  if (!odTrip || !gtTrip) {
    console.warn(`[Skip] Pair not found for ${pair.name} (holiday: ${pair.holiday})`);
    continue;
  }

  // 1. 小田急側トリップを秦野(OH-39)から新松田(OH-41)へ延伸
  const hadanoStop = odTrip.stops.find(s => s.stationId === 'OH-39');
  const matsudaStop = gtTrip.stops.find(s => s.stationId === 'CB-04');

  if (hadanoStop && matsudaStop) {
    const hadanoDepSec = toSec(hadanoStop.departureTime || hadanoStop.arrivalTime);
    const matsudaArrSec = toSec(matsudaStop.arrivalTime || matsudaStop.departureTime);
    const shinMatsudaSec = Math.max(hadanoDepSec + 300, matsudaArrSec - 60);
    const shibusawaSec = Math.round((hadanoDepSec + shinMatsudaSec) / 2);

    // 既に OH-41 が含まれていなければ追加
    if (!odTrip.stops.some(s => s.stationId === 'OH-41')) {
      odTrip.stops.push({
        stationId: 'OH-40', // 渋沢
        arrivalTime: secToStr(shibusawaSec),
        departureTime: secToStr(shibusawaSec),
        isPassing: true,
      });
      odTrip.stops.push({
        stationId: 'OH-41', // 新松田
        arrivalTime: secToStr(shinMatsudaSec),
        departureTime: secToStr(shinMatsudaSec),
        isPassing: true,
      });
      odTrip.destinationStationId = 'OH-41';
    }

    // 2. 相互直通リンク & 行先設定
    odTrip.throughTripId = gtTrip.tripId;
    odTrip.throughLineId = 'gotemba';
    odTrip.customOrigin = '新宿';
    odTrip.customDestination = '御殿場';
    if (!odTrip.trainName) odTrip.trainName = pair.name;

    gtTrip.prevTripId = odTrip.tripId;
    gtTrip.prevLineId = 'odakyu_odawara';
    gtTrip.customOrigin = '新宿';
    gtTrip.customDestination = '御殿場';
    if (!gtTrip.trainName) gtTrip.trainName = pair.name;

    console.log(`  ✓ 下り ${pair.name} (${pair.holiday ? '休日' : '平日'}): 小田急(${odTrip.tripId}) -> 御殿場線(${gtTrip.tripId}) リンク完了`);
    linkedDown++;
  }
}

// 上り便のペアリング (御殿場 -> 新宿)
const upPairs = [
  // 平日
  { odakyuId: '31210', gotembaId: '31305', holiday: false, name: 'ふじさん2号' },
  { odakyuId: '31211', gotembaId: '31306', holiday: false, name: 'ふじさん4号' },
  { odakyuId: '31213', gotembaId: '31308', holiday: false, name: 'ふじさん6号' },
  // 土休日
  { odakyuId: '31209', gotembaId: '31304', holiday: true, name: 'ふじさん2号' },
  { odakyuId: '31212', gotembaId: '31307', holiday: true, name: 'ふじさん4号' },
  { odakyuId: '31214', gotembaId: '31309', holiday: true, name: 'ふじさん6号' },
];

let linkedUp = 0;
for (const pair of upPairs) {
  const odTrip = odakyuTrips.find(t => t.tripId.includes(pair.odakyuId) && t.isHoliday === pair.holiday);
  const gtTrip = gotembaTrips.find(t => t.tripId.includes(pair.gotembaId) && t.isHoliday === pair.holiday);

  if (!odTrip || !gtTrip) {
    console.warn(`[Skip] Pair not found for ${pair.name} (holiday: ${pair.holiday})`);
    continue;
  }

  // 1. 小田急側トリップを新松田(OH-41)から秦野(OH-39)へ延伸（先頭に追加）
  const hadanoStop = odTrip.stops.find(s => s.stationId === 'OH-39');
  const matsudaStop = gtTrip.stops.find(s => s.stationId === 'CB-04');

  if (hadanoStop && matsudaStop) {
    const matsudaDepSec = toSec(matsudaStop.departureTime || matsudaStop.arrivalTime);
    const hadanoArrSec = toSec(hadanoStop.arrivalTime || hadanoStop.departureTime);
    const shinMatsudaSec = Math.min(hadanoArrSec - 300, matsudaDepSec + 60);
    const shibusawaSec = Math.round((shinMatsudaSec + hadanoArrSec) / 2);

    // 既に OH-41 が含まれていなければ先頭に追加
    if (!odTrip.stops.some(s => s.stationId === 'OH-41')) {
      odTrip.stops.unshift({
        stationId: 'OH-40', // 渋沢
        arrivalTime: secToStr(shibusawaSec),
        departureTime: secToStr(shibusawaSec),
        isPassing: true,
      });
      odTrip.stops.unshift({
        stationId: 'OH-41', // 新松田
        arrivalTime: secToStr(shinMatsudaSec),
        departureTime: secToStr(shinMatsudaSec),
        isPassing: true,
      });
      odTrip.originStationId = 'OH-41';
    }

    // 2. 相互直通リンク & 行先設定
    gtTrip.throughTripId = odTrip.tripId;
    gtTrip.throughLineId = 'odakyu_odawara';
    gtTrip.customOrigin = '御殿場';
    gtTrip.customDestination = '新宿';
    if (!gtTrip.trainName) gtTrip.trainName = pair.name;

    odTrip.prevTripId = gtTrip.tripId;
    odTrip.prevLineId = 'gotemba';
    odTrip.customOrigin = '御殿場';
    odTrip.customDestination = '新宿';
    if (!odTrip.trainName) odTrip.trainName = pair.name;

    console.log(`  ✓ 上り ${pair.name} (${pair.holiday ? '休日' : '平日'}): 御殿場線(${gtTrip.tripId}) -> 小田急(${odTrip.tripId}) リンク完了`);
    linkedUp++;
  }
}

safeWriteJson(odakyuPath, odakyuTrips);
safeWriteJson(gotembaPath, gotembaTrips);
console.log(`\n🎉 特急ふじさん全12便（下り ${linkedDown} 便, 上り ${linkedUp} 便）の延伸・直通リンク完了！\n`);
