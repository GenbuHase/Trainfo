// JR常磐線 境界駅（取手駅）を通過する特急列車（ひたち・ときわ）の区間欠落補間スクリプト
// 品川/上野〜水戸/土浦間を通過する特急列車のstopsを境界駅（取手 JJ-13 / JN-01）まで線形補間・延長し、完全な直通運転チェーンを形成します。

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
  4: 240, 5: 150, 6: 150, 7: 180, 8: 480, 9: 480, 10: 240, 11: 180, 12: 210,
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

  const rLtd = rapid.filter(t => t.trainType === 'limited_express');
  const nLtd = north.filter(t => t.trainType === 'limited_express');

  let bridgedCount = 0;

  for (const r of rLtd) {
    let match = nLtd.find(n => n.trainNumber === r.trainNumber && n.isHoliday === r.isHoliday && n.direction === r.direction);
    if (!match && r.trainId) {
      match = nLtd.find(n => n.trainId === r.trainId && n.isHoliday === r.isHoliday && n.direction === r.direction);
    }
    if (!match) continue;

    bridgedCount++;

    if (r.direction === 'outbound') {
      const lastRStop = r.stops[r.stops.length - 1];
      const firstNStop = match.stops[0];

      const lastRNum = parseInt(lastRStop.stationId.replace('JJ-', ''), 10);
      const firstNNum = parseInt(firstNStop.stationId.replace('JN-', ''), 10);

      if (lastRNum === 13 && firstNNum === 1) {
        continue;
      }

      const tDep = timeToSec(lastRStop.departureTime || lastRStop.arrivalTime);
      const tArr = timeToSec(firstNStop.arrivalTime || firstNStop.departureTime);

      const wRapidGap = lastRNum < 13 ? getSectionWeight(true, lastRNum, 13) : 0;
      const wNorthGap = firstNNum > 1 ? getSectionWeight(false, 1, firstNNum) : 0;
      const wTotal = wRapidGap + wNorthGap;
      const deltaT = tArr - tDep;

      if (lastRNum < 13) {
        for (let num = lastRNum + 1; num <= 13; num++) {
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
        r.destinationStationId = 'JJ-13';
      }

      if (firstNNum > 1) {
        const addedStops = [];
        for (let num = 1; num < firstNNum; num++) {
          const w = wRapidGap + getSectionWeight(false, 1, num);
          const passSec = tDep + deltaT * (w / wTotal);
          const timeStr = secToTime(passSec);
          addedStops.push({
            stationId: `JN-${num.toString().padStart(2, '0')}`,
            arrivalTime: timeStr,
            departureTime: timeStr,
            isPassing: true,
          });
        }
        match.stops = [...addedStops, ...match.stops];
        match.originStationId = 'JN-01';
      }
    } else {
      const lastNStop = match.stops[match.stops.length - 1];
      const firstRStop = r.stops[0];

      const lastNNum = parseInt(lastNStop.stationId.replace('JN-', ''), 10);
      const firstRNum = parseInt(firstRStop.stationId.replace('JJ-', ''), 10);

      if (lastNNum === 1 && firstRNum === 13) {
        continue;
      }

      const tDep = timeToSec(lastNStop.departureTime || lastNStop.arrivalTime);
      const tArr = timeToSec(firstRStop.arrivalTime || firstRStop.departureTime);

      const wNorthGap = lastNNum > 1 ? getSectionWeight(false, lastNNum, 1) : 0;
      const wRapidGap = firstRNum < 13 ? getSectionWeight(true, 13, firstRNum) : 0;
      const wTotal = wNorthGap + wRapidGap;
      const deltaT = tArr - tDep;

      if (lastNNum > 1) {
        for (let num = lastNNum - 1; num >= 1; num--) {
          const w = getSectionWeight(false, lastNNum, num);
          const passSec = tDep + deltaT * (w / wTotal);
          const timeStr = secToTime(passSec);
          match.stops.push({
            stationId: `JN-${num.toString().padStart(2, '0')}`,
            arrivalTime: timeStr,
            departureTime: timeStr,
            isPassing: true,
          });
        }
        match.destinationStationId = 'JN-01';
      }

      if (firstRNum < 13) {
        const addedStops = [];
        for (let num = 13; num > firstRNum; num--) {
          const w = wNorthGap + getSectionWeight(true, 13, num);
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
        r.originStationId = 'JJ-13';
      }
    }
  }

  console.log(`[Joban Ltd Bridge] Processed and bridged ${bridgedCount} limited express trains across Toride boundary.`);
  fs.writeFileSync(rapidPath, JSON.stringify(rapid, null, 2), 'utf8');
  fs.writeFileSync(northPath, JSON.stringify(north, null, 2), 'utf8');
}

module.exports = { bridgeJobanLimitedExpress };

if (require.main === module) {
  bridgeJobanLimitedExpress();
}
