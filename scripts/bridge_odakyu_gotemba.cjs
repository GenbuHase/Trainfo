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
        let arrCB04 = '07:44:00';
        let depCB04 = '07:47:00';
        let name = 'ふじさん1号';
        if (t.trainNumber.includes('403')) {
          arrCB04 = '11:47:00';
          depCB04 = '11:58:00';
          name = 'ふじさん3号';
        } else if (t.trainNumber.includes('405')) {
          arrCB04 = '15:46:00';
          depCB04 = '15:57:00';
          name = 'ふじさん5号';
        }

        const depTime = lastStop.departureTime || lastStop.arrivalTime; // e.g. "07:35:00"
        const [h, m, s] = depTime.split(':').map(Number);
        
        // 渋沢 OH-40 (約4分後通過)
        const sec40 = (h * 3600 + m * 60 + (s || 0)) + 240;
        const time40 = `${String(Math.floor(sec40 / 3600) % 24).padStart(2, '0')}:${String(Math.floor((sec40 % 3600) / 60)).padStart(2, '0')}:${String(sec40 % 60).padStart(2, '0')}`;

        t.stops.push({
          stationId: 'OH-40',
          arrivalTime: time40,
          departureTime: time40,
          isPassing: true
        });
        t.stops.push({
          stationId: 'CB-04',
          arrivalTime: arrCB04,
          departureTime: depCB04,
          isPassing: false
        });
        t.trainName = name;
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
        let arrCB04 = '09:14:00';
        let depCB04 = '09:16:00';
        let name = 'ふじさん2号';
        if (t.trainNumber.includes('404')) {
          arrCB04 = '13:14:00';
          depCB04 = '13:17:00';
          name = 'ふじさん4号';
        } else if (t.trainNumber.includes('406')) {
          arrCB04 = '17:50:00';
          depCB04 = t.isHoliday ? '17:59:00' : '17:57:00';
          name = 'ふじさん6号';
        }

        const arrTime = firstStop.arrivalTime || firstStop.departureTime; // e.g. "09:25:00"
        const [h, m, s] = arrTime.split(':').map(Number);

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
          arrivalTime: arrCB04,
          departureTime: depCB04,
          isPassing: false
        });
        t.trainName = name;
        t.originStationId = 'CB-04';
        odakyuModified++;
      }
    }
  }

  // 2. 御殿場線側のふじさん号の公式番号、列車名、および松田駅着発時刻を整備
  let gotembaModified = 0;
  for (const t of gotembaTt) {
    if (t.stops && (t.stops[0].stationId === 'CB-04' || t.stops[t.stops.length - 1].stationId === 'CB-04')) {
      if (t.trainNumber === '1M' || t.tripId.includes('39000') || t.tripId.includes('39001')) {
        t.trainNumber = '0401M';
        t.trainName = 'ふじさん1号';
        t.trainType = 'limitedExp';
        t.stops[0].arrivalTime = '07:44:00';
        t.stops[0].departureTime = '07:47:00';
        gotembaModified++;
      } else if (t.trainNumber === '3M' || t.tripId.includes('39002') || t.tripId.includes('39003')) {
        t.trainNumber = '0403M';
        t.trainName = 'ふじさん3号';
        t.trainType = 'limitedExp';
        t.stops[0].arrivalTime = '11:47:00';
        t.stops[0].departureTime = '11:58:00';
        gotembaModified++;
      } else if (t.trainNumber === '5M' || t.tripId.includes('39004') || t.tripId.includes('39005')) {
        t.trainNumber = '0405M';
        t.trainName = 'ふじさん5号';
        t.trainType = 'limitedExp';
        t.stops[0].arrivalTime = '15:46:00';
        t.stops[0].departureTime = '15:57:00';
        gotembaModified++;
      } else if (t.trainNumber === '0402M' || t.tripId.includes('31304') || t.tripId.includes('31305')) {
        t.trainNumber = '0402M';
        t.trainName = 'ふじさん2号';
        t.trainType = 'limitedExp';
        const last = t.stops[t.stops.length - 1];
        last.arrivalTime = '09:14:00';
        last.departureTime = '09:16:00';
        gotembaModified++;
      } else if (t.trainNumber === '0404M' || t.tripId.includes('31306') || t.tripId.includes('31307')) {
        t.trainNumber = '0404M';
        t.trainName = 'ふじさん4号';
        t.trainType = 'limitedExp';
        const last = t.stops[t.stops.length - 1];
        last.arrivalTime = '13:14:00';
        last.departureTime = '13:17:00';
        gotembaModified++;
      } else if (t.trainNumber === '0406M' || t.tripId.includes('31308') || t.tripId.includes('31309')) {
        t.trainNumber = '0406M';
        t.trainName = 'ふじさん6号';
        t.trainType = 'limitedExp';
        const last = t.stops[t.stops.length - 1];
        last.arrivalTime = '17:50:00';
        last.departureTime = t.isHoliday ? '17:59:00' : '17:57:00';
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
