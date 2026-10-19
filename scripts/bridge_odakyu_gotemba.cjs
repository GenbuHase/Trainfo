const fs = require('fs');
const path = require('path');

function safeWriteJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function bridgeOdakyuGotemba() {
  console.log("=== Bridging Odakyu Odawara <-> Gotemba (Fujisan Limited Express) ===");

  const odakyuPath = path.resolve('src/data/lines/odakyu_odawara/globalTimetable.json');
  const gotembaPath = path.resolve('src/data/lines/gotemba/globalTimetable.json');

  const odakyuTt = JSON.parse(fs.readFileSync(odakyuPath, 'utf8'));
  const gotembaTt = JSON.parse(fs.readFileSync(gotembaPath, 'utf8'));

  // 1. 小田急線側のふじさん号に OH-40 (渋沢), OH-41 (新松田) を補間
  let odakyuModified = 0;
  for (const t of odakyuTt) {
    if (!t.trainNumber || !/0?40[1-6]/.test(t.trainNumber)) continue;
    if (t.trainType !== 'limitedExp') continue;

    // 下り (新宿 -> 御殿場方面)
    if (t.direction === 'outbound') {
      const lastStop = t.stops[t.stops.length - 1];
      if (lastStop.stationId === 'OH-39') {
        const depTime = lastStop.departureTime || lastStop.arrivalTime; // e.g. "07:35:00"
        const [h, m, s] = depTime.split(':').map(Number);
        
        // 渋沢 OH-40 (約4分後通過)
        const sec40 = (h * 3600 + m * 60 + (s || 0)) + 240;
        const time40 = `${String(Math.floor(sec40 / 3600) % 24).padStart(2, '0')}:${String(Math.floor((sec40 % 3600) / 60)).padStart(2, '0')}:${String(sec40 % 60).padStart(2, '0')}`;
        
        // 新松田 OH-41 (約9分後着/発)
        const sec41 = (h * 3600 + m * 60 + (s || 0)) + 540;
        const time41 = `${String(Math.floor(sec41 / 3600) % 24).padStart(2, '0')}:${String(Math.floor((sec41 % 3600) / 60)).padStart(2, '0')}:${String(sec41 % 60).padStart(2, '0')}`;

        t.stops.push({
          stationId: 'OH-40',
          arrivalTime: time40,
          departureTime: time40,
          isPassing: true
        });
        t.stops.push({
          stationId: 'OH-41',
          arrivalTime: time41,
          departureTime: time41,
          isPassing: false
        });
        t.destinationStationId = 'OH-41';
        odakyuModified++;
      }
    }

    // 上り (御殿場 -> 新宿方面)
    if (t.direction === 'inbound') {
      const firstStop = t.stops[0];
      if (firstStop.stationId === 'OH-39') {
        const arrTime = firstStop.arrivalTime || firstStop.departureTime; // e.g. "09:25:00"
        const [h, m, s] = arrTime.split(':').map(Number);

        // 新松田 OH-41 (約8分前発)
        const sec41 = (h * 3600 + m * 60 + (s || 0)) - 480;
        const time41 = `${String(Math.floor(sec41 / 3600) % 24).padStart(2, '0')}:${String(Math.floor((sec41 % 3600) / 60)).padStart(2, '0')}:${String(sec41 % 60).padStart(2, '0')}`;

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
          stationId: 'OH-41',
          arrivalTime: time41,
          departureTime: time41,
          isPassing: false
        });
        t.originStationId = 'OH-41';
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
