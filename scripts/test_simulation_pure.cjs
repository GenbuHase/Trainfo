const fs = require('fs');
const seibuTT = JSON.parse(fs.readFileSync('./src/data/lines/seibu_ikebukuro/globalTimetable.json', 'utf8'));
const chichibuTT = JSON.parse(fs.readFileSync('./src/data/lines/chichibu/globalTimetable.json', 'utf8'));

const combined = [...seibuTT, ...chichibuTT];

function timeStringToSeconds(t) {
  const parts = t.split(':').map(Number);
  return parts[0] * 3600 + parts[1] * 60 + (parts[2] || 0);
}

function formatTrainNumber(trainNumber, trainId, tripId) {
  if (trainNumber) return trainNumber;
  if (trainId) return `${trainId}レ`;
  return tripId;
}

function resolveActiveTrainInfo(trip, currentStationId, nextStationId) {
  const trainId = trip.trainId || trip.trainNumber || (trip.tripId ? trip.tripId.split('_').pop() || '' : '');
  let resolvedNumber = trip.trainNumber;
  let resolvedType = trip.trainType;
  let isCoupledActive = false;
  let totalCars = trip.cars;
  let resolvedCustomDest = trip.customDestination;

  if (trip.coupling && currentStationId) {
    const fromIdx = trip.stops.findIndex((s) => s.stationId === trip.coupling.fromStationId);
    const toIdx = trip.stops.findIndex((s) => s.stationId === trip.coupling.toStationId);
    const curIdx = trip.stops.findIndex((s) => s.stationId === currentStationId);

    if (fromIdx !== -1 && toIdx !== -1 && curIdx !== -1) {
      const minIdx = Math.min(fromIdx, toIdx);
      const maxIdx = Math.max(fromIdx, toIdx);

      let inCoupledRange = false;
      if (nextStationId) {
        const nextIdx = trip.stops.findIndex((s) => s.stationId === nextStationId);
        if (nextIdx !== -1) {
          inCoupledRange = curIdx >= minIdx && nextIdx <= maxIdx;
        } else {
          inCoupledRange = curIdx >= minIdx && curIdx < maxIdx;
        }
      } else {
        inCoupledRange = curIdx >= minIdx && curIdx < maxIdx;
      }

      if (inCoupledRange) {
        isCoupledActive = true;
        totalCars = trip.cars + (trip.coupling.coupledCars || 0);
        if (resolvedNumber && trip.coupling.coupledTrainNumber) {
          if (!resolvedNumber.includes(trip.coupling.coupledTrainNumber)) {
            resolvedNumber = `${resolvedNumber} + ${trip.coupling.coupledTrainNumber}`;
          }
        }
        if (trip.coupling.coupledDestination && resolvedCustomDest) {
          if (!resolvedCustomDest.includes(trip.coupling.coupledDestination)) {
            resolvedCustomDest = `${trip.coupling.coupledDestination}・${resolvedCustomDest}`;
          }
        }
      }
    }
  }

  return {
    trainId,
    trainNumber: resolvedNumber,
    trainType: resolvedType,
    cars: isCoupledActive ? totalCars : trip.cars,
    isCoupledActive,
    totalCars: isCoupledActive ? totalCars : undefined,
    customDestination: resolvedCustomDest,
  };
}

function simulate(currentSec) {
  const activeTrains = [];

  for (const trip of combined) {
    if (!trip.isHoliday) continue;
    if (trip.stops.length < 2) continue;

    let prevStopSec = -1;
    let dayOffset = 0;
    const stopTimes = [];
    for (let i = 0; i < trip.stops.length; i++) {
      const s = trip.stops[i];
      let arrSec = timeStringToSeconds(s.arrivalTime) + dayOffset;
      let depSec = timeStringToSeconds(s.departureTime) + dayOffset;
      if (prevStopSec >= 0 && arrSec < prevStopSec) {
        dayOffset += 86400;
        arrSec += 86400;
        depSec += 86400;
      } else if (prevStopSec >= 0 && depSec < arrSec) {
        dayOffset += 86400;
        depSec += 86400;
      }
      prevStopSec = depSec;
      stopTimes.push({ arrSec, depSec });
    }

    const tripStartSec = stopTimes[0].depSec;
    const tripEndSec = stopTimes[stopTimes.length - 1].depSec || stopTimes[stopTimes.length - 1].arrSec;

    let checkSec = currentSec;
    if (tripStartSec >= 20 * 3600 || tripEndSec >= 86400) {
      if (checkSec < 12 * 3600 && checkSec + 86400 <= tripEndSec + 3600) {
        checkSec += 86400;
      }
    }

    if (checkSec < tripStartSec || checkSec > tripEndSec) {
      continue;
    }

    for (let i = 0; i < trip.stops.length; i++) {
      const curStop = trip.stops[i];
      const curStopTimes = stopTimes[i];
      const curArrSec = curStopTimes.arrSec;
      const curDepSec = curStopTimes.depSec;

      if (checkSec >= curArrSec && checkSec <= curDepSec) {
        const trainInfo = resolveActiveTrainInfo(trip, curStop.stationId);
        activeTrains.push({
          tripId: trip.tripId,
          lineId: trip.lineId,
          trainId: trainInfo.trainId,
          trainNumber: trainInfo.trainNumber,
          coupling: trip.coupling,
          isCoupledActive: trainInfo.isCoupledActive,
          totalCars: trainInfo.totalCars,
          cars: trainInfo.cars,
          customDestination: trainInfo.customDestination,
          destinationStationId: trip.destinationStationId,
          status: 'STOPPING',
          currentStationId: curStop.stationId,
          stops: trip.stops,
          direction: trip.direction,
          throughTripId: trip.throughTripId,
          throughLineId: trip.throughLineId
        });
        break;
      }

      if (i < trip.stops.length - 1) {
        const nextStop = trip.stops[i + 1];
        const nextStopTimes = stopTimes[i + 1];
        const nextArrSec = nextStopTimes.arrSec;

        if (checkSec > curDepSec && checkSec < nextArrSec) {
          const trainInfo = resolveActiveTrainInfo(trip, curStop.stationId, nextStop.stationId);
          activeTrains.push({
            tripId: trip.tripId,
            lineId: trip.lineId,
            trainId: trainInfo.trainId,
            trainNumber: trainInfo.trainNumber,
            coupling: trip.coupling,
            isCoupledActive: trainInfo.isCoupledActive,
            totalCars: trainInfo.totalCars,
            cars: trainInfo.cars,
            customDestination: trainInfo.customDestination,
            destinationStationId: trip.destinationStationId,
            status: 'RUNNING',
            currentStationId: curStop.stationId,
            nextStationId: nextStop.stationId,
            stops: trip.stops,
            direction: trip.direction,
            throughTripId: trip.throughTripId,
            throughLineId: trip.throughLineId
          });
          break;
        }
      }
    }
  }

  // 1. 併結運転中の従属編成（SECONDARY）のマップピン重複描画を排除
  const coupledFilteredTrains = activeTrains.filter((train) => {
    if (train.isCoupledActive && train.coupling?.role === 'SECONDARY') {
      return false;
    }
    return true;
  });

  // 2. 複数路線選択時の直通列車（むさしの号等）の重複排除
  const candidateTrains = [];
  for (const train of coupledFilteredTrains) {
    const formattedNo = formatTrainNumber(train.trainNumber, train.trainId, train.tripId);
    if (!formattedNo) {
      candidateTrains.push(train);
      continue;
    }

    const stationIds = new Set(train.stops.map((s) => s.stationId));
    const hasBetterThroughTrain = coupledFilteredTrains.some((other) => {
      if (other === train) return false;
      const otherFormattedNo = formatTrainNumber(other.trainNumber, other.trainId, other.tripId);
      if (otherFormattedNo !== formattedNo) return false;

      const destA = train.customDestination || train.destinationStationId;
      const destB = other.customDestination || other.destinationStationId;
      if (destA !== destB) return false;
      if (train.trainId && other.trainId && train.trainId !== other.trainId) return false;

      const hasSharedStation = other.stops.some((s) => stationIds.has(s.stationId));
      if (!hasSharedStation) return false;

      if (other.stops.length > train.stops.length) return true;
      if (other.stops.length === train.stops.length && other.tripId < train.tripId) return true;
      return false;
    });

    if (!hasBetterThroughTrain) {
      candidateTrains.push(train);
    }
  }

  // 3. 同一運行（路線・進行方向・同一列車ID・行先）の重複表示を安全に排除
  const uniqueTrains = [];
  const seenTrainKeys = new Set();

  for (const train of candidateTrains) {
    const primaryId = train.trainId || train.trainNumber || formatTrainNumber(train.trainNumber, train.trainId, train.tripId);
    const dest = train.customDestination || train.destinationStationId;
    const key = `${train.lineId}_${train.direction}_${primaryId}_${dest}`;

    if (seenTrainKeys.has(key)) {
      continue;
    }
    seenTrainKeys.add(key);
    uniqueTrains.push(train);
  }

  return uniqueTrains;
}

const testTimes = [
  { time: '08:56:30', desc: '飯能発車直後（飯能〜東飯能間 併結走行）' },
  { time: '09:20:00', desc: '飯能〜横瀬 併結走行中（吾野付近）' },
  { time: '09:41:00', desc: '横瀬駅停車中（解結・分割作業中）' },
  { time: '09:46:00', desc: '三峰口行 横瀬発車／長瀞行 横瀬停車中' },
  { time: '09:52:00', desc: '長瀞行 横瀬発車（御花畑へ連絡線走行中）／三峰口行 西武秩父停車中' },
  { time: '09:58:30', desc: '三峰口行 西武秩父発車（影森へ連絡線走行中）／長瀞行 御花畑発車（長瀞へ）' },
  { time: '10:05:00', desc: '両便とも秩父鉄道線内を走行中（三峰口行・長瀞行）' },
];

for (const t of testTimes) {
  const currentSec = timeStringToSeconds(t.time);
  const trains = simulate(currentSec);
  const targets = trains.filter(tr => ['145186', '145187'].includes(tr.trainId) || tr.trainNumber?.includes('6001') || tr.trainNumber === 'S1' || tr.trainNumber === 'S2');
  console.log(`\n========================================`);
  console.log(`[時刻: ${t.time}] ${t.desc}`);
  console.log(`描画対象列車数: ${targets.length}`);
  targets.forEach(tr => {
    console.log(`  - Trip: ${tr.tripId}`);
    console.log(`    種別/番号: ${tr.trainNumber}, 行先: ${tr.customDestination}`);
    console.log(`    状態: ${tr.status}, 現在駅/次駅: ${tr.currentStationId} -> ${tr.nextStationId || '終点'}`);
    console.log(`    両数: ${tr.cars}両 (totalCars: ${tr.totalCars || tr.cars}両, 併結中: ${tr.isCoupledActive})`);
    console.log(`    直通先: ${tr.throughTripId || 'なし'} (${tr.throughLineId || ''})`);
  });
}
