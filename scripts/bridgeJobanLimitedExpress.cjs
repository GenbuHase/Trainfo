// JR常磐線 境界駅（取手駅）を通過する特急列車（ひたち・ときわ）の区間欠落補間スクリプト
// 品川/上野〜水戸/土浦間を通過する特急列車のstopsを境界駅（取手 JJ-13 / JTI-01）まで線形補間・延長し、完全な直通運転チェーンを形成します。

const fs = require('fs');
const path = require('path');

function timeToSec(t) {
  if (!t) return 0;
  const [h, m, s] = t.split(':').map(Number);
  let sec = h * 3600 + m * 60 + (s || 0);
  if (h < 4) sec += 86400;
  return sec;
}

function secToTime(sec) {
  const norm = (Math.floor(sec) + 86400 * 2) % 86400;
  const h = Math.floor(norm / 3600).toString().padStart(2, '0');
  const m = Math.floor((norm % 3600) / 60).toString().padStart(2, '0');
  const s = (norm % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

const rapidWeights = {
  1: 240, 2: 150, 3: 150, 4: 180, 5: 480, 6: 480, 7: 240, 8: 180, 9: 210,
};

const northWeights = {
  1: 360, 2: 240, 3: 300, 4: 240, 5: 180, 6: 300, 7: 300, 8: 360, 9: 240, 10: 360,
  11: 240, 12: 300, 13: 240, 14: 300, 15: 300, 16: 180,
};

function getSectionWeight(isRapid, fromNum, toNum) {
  const table = isRapid ? rapidWeights : northWeights;
  const isForward = fromNum < toNum;
  const step = isForward ? 1 : -1;
  let total = 0;
  for (let n = fromNum; n !== toNum; n += step) {
    const key = isForward ? n : n - 1;
    total += (table[key] || 180);
  }
  return total;
}

function bridgeJobanLimitedExpress() {
  const rapidPath = path.resolve(process.cwd(), 'src/data/lines/joban_rapid/globalTimetable.json');
  const northPath = path.resolve(process.cwd(), 'src/data/lines/joban_toride_iwaki/globalTimetable.json');

  if (!fs.existsSync(rapidPath) || !fs.existsSync(northPath)) {
    return;
  }

  const rapid = JSON.parse(fs.readFileSync(rapidPath, 'utf8'));
  const north = JSON.parse(fs.readFileSync(northPath, 'utf8'));

  const isLtd = (t) => t.trainType === 'limited_express' || t.trainType === 'limitedExp';
  const rLtd = rapid.filter(isLtd);
  const nLtd = north.filter(isLtd);

  let bridgedCount = 0;

  for (const r of rLtd) {
    let match = nLtd.find(n => n.trainNumber === r.trainNumber && n.isHoliday === r.isHoliday && n.direction === r.direction);
    if (!match && r.trainId) {
      match = nLtd.find(n => n.trainId === r.trainId && n.isHoliday === r.isHoliday && n.direction === r.direction);
    }
    if (!match) continue;

    bridgedCount++;
    if (r.trainType === 'limitedExp') r.trainType = 'limited_express';
    if (match.trainType === 'limitedExp') match.trainType = 'limited_express';

    if (r.direction === 'outbound') {
      const lastRStop = r.stops[r.stops.length - 1];
      const firstNStop = match.stops[0];

      const lastRNum = parseInt(lastRStop.stationId.replace('JJ-', ''), 10);
      const firstNNum = parseInt(firstNStop.stationId.replace('JTI-', ''), 10);

      const tDep = timeToSec(lastRStop.departureTime || lastRStop.arrivalTime);
      const tArr = timeToSec(firstNStop.arrivalTime || firstNStop.departureTime);

      const wRapidGap = lastRNum < 10 ? getSectionWeight(true, lastRNum, 10) : 0;
      const wNorthGap = firstNNum > 1 ? getSectionWeight(false, 1, firstNNum) : 0;
      const wTotal = wRapidGap + wNorthGap || 1;
      const deltaT = tArr - tDep;

      if (lastRNum < 10) {
        for (let num = lastRNum + 1; num <= 10; num++) {
          const w = getSectionWeight(true, lastRNum, num);
          const passSec = tDep + deltaT * (w / wTotal);
          const timeStr = secToTime(passSec);
          r.stops.push({
            stationId: `JJ-${num.toString().padStart(2, '0')}`,
            arrivalTime: timeStr,
            departureTime: timeStr,
            isPassing: true,
          });
        }
        r.destinationStationId = 'JJ-10';
      }

      if (firstNNum > 1) {
        const addedStops = [];
        for (let num = 1; num < firstNNum; num++) {
          const w = wRapidGap + getSectionWeight(false, 1, num);
          const passSec = tDep + deltaT * (w / wTotal);
          const timeStr = secToTime(passSec);
          addedStops.push({
            stationId: `JTI-${num.toString().padStart(2, '0')}`,
            arrivalTime: timeStr,
            departureTime: timeStr,
            isPassing: true,
          });
        }
        match.stops = [...addedStops, ...match.stops];
        match.originStationId = 'JTI-01';
      }

      // 境界駅（取手駅）の通過時刻を完全一致（通過駅ならarrivalTimeとdepartureTimeを通過時刻に一致）
      const finalLastR = r.stops[r.stops.length - 1];
      const finalFirstN = match.stops[0];
      if (finalLastR && finalFirstN) {
        const passTime = finalLastR.isPassing ? finalLastR.arrivalTime : (finalLastR.departureTime || finalLastR.arrivalTime);
        finalLastR.departureTime = passTime;
        finalFirstN.arrivalTime = passTime;
        finalFirstN.departureTime = passTime;
      }
    } else {
      const lastNStop = match.stops[match.stops.length - 1];
      const firstRStop = r.stops[0];

      const lastNNum = parseInt(lastNStop.stationId.replace('JTI-', ''), 10);
      const firstRNum = parseInt(firstRStop.stationId.replace('JJ-', ''), 10);

      const tDep = timeToSec(lastNStop.departureTime || lastNStop.arrivalTime);
      const tArr = timeToSec(firstRStop.arrivalTime || firstRStop.departureTime);

      const wNorthGap = lastNNum > 1 ? getSectionWeight(false, lastNNum, 1) : 0;
      const wRapidGap = firstRNum < 10 ? getSectionWeight(true, 10, firstRNum) : 0;
      const wTotal = wNorthGap + wRapidGap || 1;
      const deltaT = tArr - tDep;

      if (lastNNum > 1) {
        for (let num = lastNNum - 1; num >= 1; num--) {
          const w = getSectionWeight(false, lastNNum, num);
          const passSec = tDep + deltaT * (w / wTotal);
          const timeStr = secToTime(passSec);
          match.stops.push({
            stationId: `JTI-${num.toString().padStart(2, '0')}`,
            arrivalTime: timeStr,
            departureTime: timeStr,
            isPassing: true,
          });
        }
        match.destinationStationId = 'JTI-01';
      }

      if (firstRNum < 10) {
        const addedStops = [];
        for (let num = 10; num > firstRNum; num--) {
          const w = wNorthGap + getSectionWeight(true, 10, num);
          const passSec = tDep + deltaT * (w / wTotal);
          const timeStr = secToTime(passSec);
          addedStops.push({
            stationId: `JJ-${num.toString().padStart(2, '0')}`,
            arrivalTime: timeStr,
            departureTime: timeStr,
            isPassing: true,
          });
        }
        r.stops = [...addedStops, ...r.stops];
        r.originStationId = 'JJ-10';
      }

      // 境界駅（取手駅）の通過時刻を完全一致（通過駅ならarrivalTimeとdepartureTimeを通過時刻に一致）
      const finalLastN = match.stops[match.stops.length - 1];
      const finalFirstR = r.stops[0];
      if (finalLastN && finalFirstR) {
        const passTime = finalLastN.isPassing ? finalLastN.arrivalTime : (finalLastN.departureTime || finalLastN.arrivalTime);
        finalLastN.departureTime = passTime;
        finalFirstR.arrivalTime = passTime;
        finalFirstR.departureTime = passTime;
      }
    }
  }

  console.log(`[Joban Ltd Bridge] Processed and bridged ${bridgedCount} limited express trains across Toride boundary.`);
  
  function safeWrite(filePath, data) {
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

  safeWrite(rapidPath, rapid);
  safeWrite(northPath, north);
}

module.exports = { bridgeJobanLimitedExpress };

if (require.main === module) {
  bridgeJobanLimitedExpress();
}
