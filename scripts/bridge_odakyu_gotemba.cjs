const fs = require('fs');
const path = require('path');

function safeWriteJson(filePath, data) {
  const content = JSON.stringify(data, null, 2) + '\n';
  let attempts = 0;
  while (attempts < 5) {
    try {
      fs.writeFileSync(filePath, content, 'utf8');
      break;
    } catch (e) {
      attempts++;
      if (attempts >= 5) throw e;
      const start = Date.now();
      while (Date.now() - start < 100) {}
    }
  }
}

function bridgeOdakyuGotemba() {
  console.log("=== Bridging Odakyu Odawara <-> Gotemba (Fujisan Limited Express) ===");

  const odakyuPath = path.resolve('src/data/lines/odakyu_odawara/globalTimetable.json');
  const gotembaPath = path.resolve('src/data/lines/gotemba/globalTimetable.json');

  const odakyuTt = JSON.parse(fs.readFileSync(odakyuPath, 'utf8'));
  const gotembaTt = JSON.parse(fs.readFileSync(gotembaPath, 'utf8'));

  // 1. 小田急線側のふじさん号に OH-40 (渋沢・通過), CB-04 (松田・停車) を補間
  let odakyuModified = 0;
  for (const t of odakyuTt) {
    if (!t.trainNumber || !/0?40[1-6]/.test(t.trainNumber)) continue;
    if (t.trainType !== 'limitedExp') continue;

    // 下り (新宿 -> 御殿場方面)
    if (t.direction === 'outbound') {
      // 既存の OH-40 / OH-41 / CB-04 を除去して秦野(OH-39)まで巻き戻す（冪等性）
      while (t.stops.length > 0 && ['OH-40', 'OH-41', 'CB-04'].includes(t.stops[t.stops.length - 1].stationId)) {
        t.stops.pop();
      }
      const lastStop = t.stops[t.stops.length - 1];
      if (lastStop && lastStop.stationId === 'OH-39') {
        const depTime = lastStop.departureTime || lastStop.arrivalTime; // e.g. "07:35:00"
        const [h, m, s] = depTime.split(':').map(Number);
        
        // 渋沢 OH-40 (約4分後通過)
        const sec40 = (h * 3600 + m * 60 + (s || 0)) + 240;
        const time40 = `${String(Math.floor(sec40 / 3600) % 24).padStart(2, '0')}:${String(Math.floor((sec40 % 3600) / 60)).padStart(2, '0')}:${String(sec40 % 60).padStart(2, '0')}`;
        
        // 松田 CB-04 (約9分後着/発)
        const secCB04 = (h * 3600 + m * 60 + (s || 0)) + 540;
        const timeCB04 = `${String(Math.floor(secCB04 / 3600) % 24).padStart(2, '0')}:${String(Math.floor((secCB04 % 3600) / 60)).padStart(2, '0')}:${String(secCB04 % 60).padStart(2, '0')}`;

        t.stops.push({
          stationId: 'OH-40',
          arrivalTime: time40,
          departureTime: time40,
          isPassing: true
        });
        t.stops.push({
          stationId: 'CB-04',
          arrivalTime: timeCB04,
          departureTime: timeCB04,
          isPassing: false
        });
        t.destinationStationId = 'CB-04';
        odakyuModified++;
      }
    }

    // 上り (御殿場 -> 新宿方面)
    if (t.direction === 'inbound') {
      // 既存の CB-04 / OH-41 / OH-40 を除去して秦野(OH-39)まで巻き戻す（冪等性）
      while (t.stops.length > 0 && ['OH-40', 'OH-41', 'CB-04'].includes(t.stops[0].stationId)) {
        t.stops.shift();
      }
      const firstStop = t.stops[0];
      if (firstStop && firstStop.stationId === 'OH-39') {
        const arrTime = firstStop.arrivalTime || firstStop.departureTime; // e.g. "09:25:00"
        const [h, m, s] = arrTime.split(':').map(Number);

        // 松田 CB-04 (約9分前発)
        const secCB04 = (h * 3600 + m * 60 + (s || 0)) - 540;
        const timeCB04 = `${String(Math.floor(secCB04 / 3600) % 24).padStart(2, '0')}:${String(Math.floor((secCB04 % 3600) / 60)).padStart(2, '0')}:${String(secCB04 % 60).padStart(2, '0')}`;

        // 渋沢 OH-40 (約4分前通過)
        const sec40 = (h * 3600 + m * 60 + (s || 0)) - 240;
        const time40 = `${String(Math.floor(sec40 / 3600) % 24).padStart(2, '0')}:${String(Math.floor((sec40 % 3600) / 60)).padStart(2, '0')}:${String(sec40 % 60).padStart(2, '0')}`;

        t.stops.unshift({
          stationId: 'OH-40',
          arrivalTime: time40,
          departureTime: time40,
          isPassing: true
        });
        t.stops.unshift({
          stationId: 'CB-04',
          arrivalTime: timeCB04,
          departureTime: timeCB04,
          isPassing: false
        });
        t.originStationId = 'CB-04';
        odakyuModified++;
      }
    }
  }

  // 2. 御殿場線側のふじさん号の公式番号と列車名を整備
  let gotembaModified = 0;
  for (const t of gotembaTt) {
    if (t.stops && (t.stops[0].stationId === 'CB-04' || t.stops[t.stops.length - 1].stationId === 'CB-04')) {
      if (t.trainNumber === '1M' || t.tripId.includes('39000') || t.tripId.includes('39001')) {
        t.trainNumber = '0401M';
        t.trainName = 'ふじさん1号';
        t.trainType = 'limitedExp';
        gotembaModified++;
      } else if (t.trainNumber === '3M' || t.tripId.includes('39002') || t.tripId.includes('39003')) {
        t.trainNumber = '0403M';
        t.trainName = 'ふじさん3号';
        t.trainType = 'limitedExp';
        gotembaModified++;
      } else if (t.trainNumber === '5M' || t.tripId.includes('39004') || t.tripId.includes('39005')) {
        t.trainNumber = '0405M';
        t.trainName = 'ふじさん5号';
        t.trainType = 'limitedExp';
        gotembaModified++;
      } else if (t.trainNumber === '0402M' || t.tripId.includes('31304') || t.tripId.includes('31305')) {
        t.trainNumber = '0402M';
        t.trainName = 'ふじさん2号';
        t.trainType = 'limitedExp';
        gotembaModified++;
      } else if (t.trainNumber === '0404M' || t.tripId.includes('31306') || t.tripId.includes('31307')) {
        t.trainNumber = '0404M';
        t.trainName = 'ふじさん4号';
        t.trainType = 'limitedExp';
        gotembaModified++;
      } else if (t.trainNumber === '0406M' || t.tripId.includes('31308') || t.tripId.includes('31309')) {
        t.trainNumber = '0406M';
        t.trainName = 'ふじさん6号';
        t.trainType = 'limitedExp';
        gotembaModified++;
      }
    }
  }

  safeWriteJson(odakyuPath, odakyuTt);
  safeWriteJson(gotembaPath, gotembaTt);

  console.log(`Odakyu modified trips: ${odakyuModified}`);
  console.log(`Gotemba modified trips: ${gotembaModified}`);
}

module.exports = { bridgeOdakyuGotemba };

if (require.main === module) {
  bridgeOdakyuGotemba();
}
