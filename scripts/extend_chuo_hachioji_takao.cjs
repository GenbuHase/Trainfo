const fs = require('fs');
const path = require('path');

const chuoPath = path.resolve('src/data/lines/chuo/globalTimetable.json');
const chuoMainPath = path.resolve('src/data/lines/chuo_main/globalTimetable.json');

const chuoTrips = JSON.parse(fs.readFileSync(chuoPath, 'utf8'));
const chuoMainTrips = JSON.parse(fs.readFileSync(chuoMainPath, 'utf8'));

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

const cmMap = new Map();
for (const t of chuoMainTrips) {
  cmMap.set(t.trainId, t);
}

let extendedOutbound = 0;
let extendedInbound = 0;

for (const trip of chuoTrips) {
  if (trip.trainType !== 'limitedExp') continue;
  const cm = cmMap.get(trip.trainId);

  if (trip.direction === 'outbound') {
    const last = trip.stops[trip.stops.length - 1];
    if (last.stationId === 'JC-22') {
      const hachiojiSec = toSec(last.departureTime || last.arrivalTime);
      let takaoSec = cm ? toSec(cm.stops[0].departureTime || cm.stops[0].arrivalTime) : hachiojiSec + 420;
      if (takaoSec <= hachiojiSec) takaoSec = hachiojiSec + 360;
      const nishiSec = Math.round((hachiojiSec + takaoSec) / 2);

      // 西八王子(JC-23) と 高尾(JC-24) を追加
      trip.stops.push({
        stationId: 'JC-23',
        arrivalTime: secToStr(nishiSec),
        departureTime: secToStr(nishiSec),
        isPassing: true,
      });
      trip.stops.push({
        stationId: 'JC-24',
        arrivalTime: secToStr(takaoSec),
        departureTime: secToStr(takaoSec),
        isPassing: true,
      });
      trip.destinationStationId = 'JC-24';
      extendedOutbound++;
    }
  } else if (trip.direction === 'inbound') {
    const first = trip.stops[0];
    if (first.stationId === 'JC-22') {
      const hachiojiSec = toSec(first.arrivalTime || first.departureTime);
      let takaoSec = cm ? toSec(cm.stops[cm.stops.length - 1].arrivalTime || cm.stops[cm.stops.length - 1].departureTime) : hachiojiSec - 420;
      if (takaoSec >= hachiojiSec) takaoSec = hachiojiSec - 360;
      const nishiSec = Math.round((takaoSec + hachiojiSec) / 2);

      // 高尾(JC-24) と 西八王子(JC-23) を先頭に追加
      trip.stops.unshift({
        stationId: 'JC-23',
        arrivalTime: secToStr(nishiSec),
        departureTime: secToStr(nishiSec),
        isPassing: true,
      });
      trip.stops.unshift({
        stationId: 'JC-24',
        arrivalTime: secToStr(takaoSec),
        departureTime: secToStr(takaoSec),
        isPassing: true,
      });
      trip.originStationId = 'JC-24';
      extendedInbound++;
    }
  }
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

safeWriteJson(chuoPath, chuoTrips);
console.log(`✅ [chuo] 中央線快速特急を高尾へ延伸完了: 下り ${extendedOutbound} 便, 上り ${extendedInbound} 便`);
