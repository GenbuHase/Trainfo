// JR常磐線 境界駅（取手駅）を通過する特急列車（ひたち・ときわ）の区間欠落補間スクリプト（宣言的設定駆動）
const fs = require('fs');
const path = require('path');
const {
  timeToSec,
  secToTime,
  safeReadJson,
  safeWriteJson,
  isLimitedExpress,
} = require('./common/timetableUtils.cjs');

// 宣言的設定: 常磐快速線 (JJ-01..JJ-10) と常磐線取手〜いわき (JTI-01..JTI-17) の駅間標準所要秒数重み
const JOBAN_BRIDGE_CONFIG = {
  rapidPath: path.resolve(process.cwd(), 'src/data/lines/joban_rapid/globalTimetable.json'),
  northPath: path.resolve(process.cwd(), 'src/data/lines/joban_toride_iwaki/globalTimetable.json'),
  rapidPrefix: 'JJ-',
  northPrefix: 'JTI-',
  rapidBoundaryIndex: 10, // JJ-10 (取手)
  northBoundaryIndex: 1,  // JTI-01 (取手)
  rapidWeights: {
    1: 240, 2: 150, 3: 150, 4: 180, 5: 480, 6: 480, 7: 240, 8: 180, 9: 210,
  },
  northWeights: {
    1: 360, 2: 240, 3: 300, 4: 240, 5: 180, 6: 300, 7: 300, 8: 360, 9: 240, 10: 360,
    11: 240, 12: 300, 13: 240, 14: 300, 15: 300, 16: 180,
  },
};

function getSectionWeight(isRapid, fromNum, toNum) {
  const table = isRapid ? JOBAN_BRIDGE_CONFIG.rapidWeights : JOBAN_BRIDGE_CONFIG.northWeights;
  const isForward = fromNum < toNum;
  const step = isForward ? 1 : -1;
  let total = 0;
  for (let n = fromNum; n !== toNum; n += step) {
    const key = isForward ? n : n - 1;
    total += table[key] || 180;
  }
  return total;
}

function bridgeJobanLimitedExpress() {
  const { rapidPath, northPath, rapidPrefix, northPrefix, rapidBoundaryIndex, northBoundaryIndex } = JOBAN_BRIDGE_CONFIG;
  if (!fs.existsSync(rapidPath) || !fs.existsSync(northPath)) return;

  const rapid = safeReadJson(rapidPath);
  const north = safeReadJson(northPath);

  const rLtd = rapid.filter((t) => isLimitedExpress(t.trainType));
  const nLtd = north.filter((t) => isLimitedExpress(t.trainType));

  let bridgedCount = 0;

  for (const r of rLtd) {
    let match = nLtd.find((n) => n.trainNumber === r.trainNumber && n.isHoliday === r.isHoliday && n.direction === r.direction);
    if (!match && r.trainId) {
      match = nLtd.find((n) => n.trainId === r.trainId && n.isHoliday === r.isHoliday && n.direction === r.direction);
    }
    if (!match) continue;

    bridgedCount++;
    if (r.trainType === 'limitedExp') r.trainType = 'limited_express';
    if (match.trainType === 'limitedExp') match.trainType = 'limited_express';

    if (r.direction === 'outbound') {
      const lastRStop = r.stops[r.stops.length - 1];
      const firstNStop = match.stops[0];

      const lastRNum = parseInt(lastRStop.stationId.replace(rapidPrefix, ''), 10);
      const firstNNum = parseInt(firstNStop.stationId.replace(northPrefix, ''), 10);

      const tDep = timeToSec(lastRStop.departureTime || lastRStop.arrivalTime);
      const tArr = timeToSec(firstNStop.arrivalTime || firstNStop.departureTime);

      const wRapidGap = lastRNum < rapidBoundaryIndex ? getSectionWeight(true, lastRNum, rapidBoundaryIndex) : 0;
      const wNorthGap = firstNNum > northBoundaryIndex ? getSectionWeight(false, northBoundaryIndex, firstNNum) : 0;
      const wTotal = wRapidGap + wNorthGap || 1;
      const deltaT = tArr - tDep;

      if (lastRNum < rapidBoundaryIndex) {
        for (let num = lastRNum + 1; num <= rapidBoundaryIndex; num++) {
          const w = getSectionWeight(true, lastRNum, num);
          const timeStr = secToTime(tDep + deltaT * (w / wTotal));
          r.stops.push({
            stationId: `${rapidPrefix}${num.toString().padStart(2, '0')}`,
            arrivalTime: timeStr,
            departureTime: timeStr,
            isPassing: true,
          });
        }
        r.destinationStationId = `${rapidPrefix}${rapidBoundaryIndex.toString().padStart(2, '0')}`;
      }

      if (firstNNum > northBoundaryIndex) {
        const addedStops = [];
        for (let num = northBoundaryIndex; num < firstNNum; num++) {
          const w = wRapidGap + getSectionWeight(false, northBoundaryIndex, num);
          const timeStr = secToTime(tDep + deltaT * (w / wTotal));
          addedStops.push({
            stationId: `${northPrefix}${num.toString().padStart(2, '0')}`,
            arrivalTime: timeStr,
            departureTime: timeStr,
            isPassing: true,
          });
        }
        match.stops = [...addedStops, ...match.stops];
        match.originStationId = `${northPrefix}${northBoundaryIndex.toString().padStart(2, '0')}`;
      }

      const finalLastR = r.stops[r.stops.length - 1];
      const finalFirstN = match.stops[0];
      if (finalLastR && finalFirstN) {
        const passTime = finalLastR.isPassing ? finalLastR.arrivalTime : finalLastR.departureTime || finalLastR.arrivalTime;
        finalLastR.departureTime = passTime;
        finalFirstN.arrivalTime = passTime;
        finalFirstN.departureTime = passTime;
      }
    } else {
      const lastNStop = match.stops[match.stops.length - 1];
      const firstRStop = r.stops[0];

      const lastNNum = parseInt(lastNStop.stationId.replace(northPrefix, ''), 10);
      const firstRNum = parseInt(firstRStop.stationId.replace(rapidPrefix, ''), 10);

      const tDep = timeToSec(lastNStop.departureTime || lastNStop.arrivalTime);
      const tArr = timeToSec(firstRStop.arrivalTime || firstRStop.departureTime);

      const wNorthGap = lastNNum > northBoundaryIndex ? getSectionWeight(false, lastNNum, northBoundaryIndex) : 0;
      const wRapidGap = firstRNum < rapidBoundaryIndex ? getSectionWeight(true, rapidBoundaryIndex, firstRNum) : 0;
      const wTotal = wNorthGap + wRapidGap || 1;
      const deltaT = tArr - tDep;

      if (lastNNum > northBoundaryIndex) {
        for (let num = lastNNum - 1; num >= northBoundaryIndex; num--) {
          const w = getSectionWeight(false, lastNNum, num);
          const timeStr = secToTime(tDep + deltaT * (w / wTotal));
          match.stops.push({
            stationId: `${northPrefix}${num.toString().padStart(2, '0')}`,
            arrivalTime: timeStr,
            departureTime: timeStr,
            isPassing: true,
          });
        }
        match.destinationStationId = `${northPrefix}${northBoundaryIndex.toString().padStart(2, '0')}`;
      }

      if (firstRNum < rapidBoundaryIndex) {
        const addedStops = [];
        for (let num = rapidBoundaryIndex; num > firstRNum; num--) {
          const w = wNorthGap + getSectionWeight(true, rapidBoundaryIndex, num);
          const timeStr = secToTime(tDep + deltaT * (w / wTotal));
          addedStops.push({
            stationId: `${rapidPrefix}${num.toString().padStart(2, '0')}`,
            arrivalTime: timeStr,
            departureTime: timeStr,
            isPassing: true,
          });
        }
        r.stops = [...addedStops, ...r.stops];
        r.originStationId = `${rapidPrefix}${rapidBoundaryIndex.toString().padStart(2, '0')}`;
      }

      const finalLastN = match.stops[match.stops.length - 1];
      const finalFirstR = r.stops[0];
      if (finalLastN && finalFirstR) {
        const passTime = finalLastN.isPassing ? finalLastN.arrivalTime : finalLastN.departureTime || finalLastN.arrivalTime;
        finalLastN.departureTime = passTime;
        finalFirstR.arrivalTime = passTime;
        finalFirstR.departureTime = passTime;
      }
    }
  }

  console.log(`[Joban Ltd Bridge] Processed and bridged ${bridgedCount} limited express trains across Toride boundary.`);
  safeWriteJson(rapidPath, rapid);
  safeWriteJson(northPath, north);
}

module.exports = { bridgeJobanLimitedExpress };

if (require.main === module) {
  bridgeJobanLimitedExpress();
}
