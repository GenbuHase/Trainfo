const fs = require('fs');

// linesRegistry からデータを読み込んでシミュレーションを再現
const musashinoGlobal = JSON.parse(fs.readFileSync('src/data/lines/musashino/globalTimetable.json', 'utf8'));
const musashinoStations = JSON.parse(fs.readFileSync('src/data/lines/musashino/stations.ts', 'utf8')
  .match(/export const MUSASHINO_STATIONS: Station\[] =\s*(\[[\s\S]*?\]);\s*$/m)[1]);
const musashinoSegments = JSON.parse(fs.readFileSync('src/data/lines/musashino/trackGeometry.ts', 'utf8')
  .match(/export const MUSASHINO_TRACK_SEGMENTS: TrackSegment\[] =\s*(\[[\s\S]*?\]);\s*$/m)[1]);

const stationMap = new Map(musashinoStations.map(s => [s.id, s]));

function timeStringToSeconds(t) {
  const parts = t.split(':').map(Number);
  return parts[0] * 3600 + parts[1] * 60 + (parts[2] || 0);
}

function getDistanceMeters(p1, p2) {
  const R = 6371000;
  const dLat = ((p2[0] - p1[0]) * Math.PI) / 180;
  const dLon = ((p2[1] - p1[1]) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((p1[0] * Math.PI) / 180) *
      Math.cos((p2[0] * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function interpolateTrackPosition(fromStationId, toStationId, ratio) {
  let seg = musashinoSegments.find(s => s.fromStationId === fromStationId && s.toStationId === toStationId);
  let isReverse = false;
  if (!seg) {
    seg = musashinoSegments.find(s => s.fromStationId === toStationId && s.toStationId === fromStationId);
    isReverse = true;
  }
  if (!seg || seg.coordinates.length < 2) {
    return null;
  }

  const coords = isReverse ? [...seg.coordinates].reverse() : seg.coordinates;
  const distances = [];
  let totalDist = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    const d = getDistanceMeters(coords[i], coords[i + 1]);
    distances.push(d);
    totalDist += d;
  }
  if (totalDist === 0) return { lat: coords[0][0], lng: coords[0][1] };

  const targetDist = Math.max(0, Math.min(1, ratio)) * totalDist;
  let acc = 0;
  for (let i = 0; i < distances.length; i++) {
    const nextAcc = acc + distances[i];
    if (targetDist <= nextAcc || i === distances.length - 1) {
      const segRatio = distances[i] > 0 ? (targetDist - acc) / distances[i] : 0;
      return {
        lat: coords[i][0] + (coords[i + 1][0] - coords[i][0]) * segRatio,
        lng: coords[i][1] + (coords[i + 1][1] - coords[i][1]) * segRatio,
      };
    }
    acc = nextAcc;
  }
  return { lat: coords[coords.length - 1][0], lng: coords[coords.length - 1][1] };
}

console.log('--- Test 1: Testing Active Trains at 08:30 (Weekday) ---');
const testSec = 8 * 3600 + 30 * 60; // 08:30:00
let activeCount = 0;
let stoppingCount = 0;
let runningCount = 0;
let failedInterpolation = 0;

const sampleActive = [];

musashinoGlobal.filter(t => !t.isHoliday).forEach(trip => {
  const startSec = timeStringToSeconds(trip.stops[0].departureTime);
  const endSec = timeStringToSeconds(trip.stops[trip.stops.length - 1].arrivalTime);

  if (testSec < startSec || testSec > endSec) return;
  activeCount++;

  for (let i = 0; i < trip.stops.length; i++) {
    const curStop = trip.stops[i];
    const arrSec = timeStringToSeconds(curStop.arrivalTime);
    const depSec = timeStringToSeconds(curStop.departureTime);

    if (testSec >= arrSec && testSec <= depSec) {
      stoppingCount++;
      const st = stationMap.get(curStop.stationId);
      if (sampleActive.length < 5) {
        sampleActive.push({
          tripId: trip.tripId,
          type: trip.trainType,
          status: 'STOPPING',
          dest: trip.customDestination,
          at: st ? st.name : curStop.stationId,
          lat: st ? st.lat : 0,
          lng: st ? st.lng : 0,
        });
      }
      break;
    }

    if (i < trip.stops.length - 1) {
      const nextStop = trip.stops[i + 1];
      const nextArrSec = timeStringToSeconds(nextStop.arrivalTime);
      if (testSec > depSec && testSec < nextArrSec) {
        runningCount++;
        const ratio = (testSec - depSec) / (nextArrSec - depSec);
        const pos = interpolateTrackPosition(curStop.stationId, nextStop.stationId, ratio);
        if (!pos) {
          failedInterpolation++;
          console.error(`Failed interpolation between ${curStop.stationId} and ${nextStop.stationId} on trip ${trip.tripId}`);
        } else if (sampleActive.length < 5) {
          sampleActive.push({
            tripId: trip.tripId,
            type: trip.trainType,
            status: 'RUNNING',
            dest: trip.customDestination,
            between: `${curStop.stationId} -> ${nextStop.stationId}`,
            lat: pos.lat,
            lng: pos.lng,
          });
        }
        break;
      }
    }
  }
});

console.log(`Active trains at 08:30: ${activeCount} (Stopping: ${stoppingCount}, Running: ${runningCount})`);
console.log(`Interpolation failures: ${failedInterpolation}`);
console.log('Sample trains:', sampleActive);

console.log('\n--- Test 2: Testing Full Line Coverage for All Trips ---');
let allTripsPassed = true;
let totalSegmentsChecked = 0;

musashinoGlobal.forEach(trip => {
  for (let i = 0; i < trip.stops.length - 1; i++) {
    const fromId = trip.stops[i].stationId;
    const toId = trip.stops[i + 1].stationId;
    totalSegmentsChecked++;
    const pos = interpolateTrackPosition(fromId, toId, 0.5);
    if (!pos || isNaN(pos.lat) || isNaN(pos.lng)) {
      console.error(`Error: Segment ${fromId} -> ${toId} in trip ${trip.tripId} could not be interpolated!`);
      allTripsPassed = false;
      break;
    }
  }
});

console.log(`Checked ${totalSegmentsChecked} trip station segments across ${musashinoGlobal.length} trips.`);
console.log(`All segments valid and interpolation verified: ${allTripsPassed}`);
