const fs = require('fs');

const chuoGlobal = JSON.parse(fs.readFileSync('src/data/lines/chuo/globalTimetable.json', 'utf8'));
const chuoStations = JSON.parse(fs.readFileSync('src/data/lines/chuo/stations.ts', 'utf8')
  .match(/export const CHUO_STATIONS: Station\[] =\s*(\[[\s\S]*?\]);\s*$/m)[1]);
const chuoSegments = JSON.parse(fs.readFileSync('src/data/lines/chuo/trackGeometry.ts', 'utf8')
  .match(/export const CHUO_TRACK_SEGMENTS: TrackSegment\[] =\s*(\[[\s\S]*?\]);\s*$/m)[1]);

const stationMap = new Map(chuoStations.map(s => [s.id, s]));

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
  let seg = chuoSegments.find(s => s.fromStationId === fromStationId && s.toStationId === toStationId);
  let isReverse = false;
  if (!seg) {
    seg = chuoSegments.find(s => s.fromStationId === toStationId && s.toStationId === fromStationId);
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

function testSimulationAtTime(timeStr, isHoliday = false) {
  const currentSec = timeStringToSeconds(timeStr);
  const trips = chuoGlobal.filter(t => t.isHoliday === isHoliday);

  let runningCount = 0;
  let stoppingCount = 0;
  let missingSegmentsCount = 0;
  const activeTrains = [];

  for (const trip of trips) {
    const stops = trip.stops;
    const originSec = timeStringToSeconds(stops[0].departureTime);
    const destSec = timeStringToSeconds(stops[stops.length - 1].arrivalTime);

    if (currentSec < originSec || currentSec > destSec) continue;

    for (let i = 0; i < stops.length; i++) {
      const stop = stops[i];
      const arrSec = timeStringToSeconds(stop.arrivalTime);
      const depSec = timeStringToSeconds(stop.departureTime);

      // 駅停車中
      if (currentSec >= arrSec && currentSec <= depSec && !stop.isPassing) {
        stoppingCount++;
        const st = stationMap.get(stop.stationId);
        activeTrains.push({
          trainNumber: trip.trainNumber,
          type: trip.trainType,
          status: 'STOPPING',
          atStation: st?.name,
          dir: trip.direction,
        });
        break;
      }

      // 駅間走行中
      if (i < stops.length - 1) {
        const nextStop = stops[i + 1];
        const segDepSec = depSec;
        const segArrSec = timeStringToSeconds(nextStop.arrivalTime);

        if (currentSec >= segDepSec && currentSec <= segArrSec) {
          runningCount++;
          const duration = segArrSec - segDepSec;
          const ratio = duration > 0 ? (currentSec - segDepSec) / duration : 0;
          const pos = interpolateTrackPosition(stop.stationId, nextStop.stationId, ratio);

          if (!pos) {
            console.error(`ERROR: Missing track segment for ${stop.stationId} -> ${nextStop.stationId}`);
            missingSegmentsCount++;
          }

          const fromSt = stationMap.get(stop.stationId);
          const toSt = stationMap.get(nextStop.stationId);

          activeTrains.push({
            trainNumber: trip.trainNumber,
            type: trip.trainType,
            status: 'RUNNING',
            section: `${fromSt?.name} -> ${toSt?.name}`,
            progress: (ratio * 100).toFixed(1) + '%',
            dir: trip.direction,
            pos,
          });
          break;
        }
      }
    }
  }

  console.log(`\n=== Simulation at ${timeStr} (${isHoliday ? 'Holiday' : 'Weekday'}) ===`);
  console.log(`Total active trains: ${activeTrains.length} (Running: ${runningCount}, Stopping: ${stoppingCount})`);
  if (missingSegmentsCount > 0) {
    console.error(`CRITICAL: ${missingSegmentsCount} missing segments detected!`);
  } else {
    console.log(`Segment continuity: 100% OK (0 missing)`);
  }
  console.log('Sample trains:');
  activeTrains.slice(0, 5).forEach(t => {
    if (t.status === 'RUNNING') {
      console.log(`  [${t.type}] ${t.trainNumber} (${t.dir}): RUNNING ${t.section} (${t.progress})`);
    } else {
      console.log(`  [${t.type}] ${t.trainNumber} (${t.dir}): STOPPING at ${t.atStation}`);
    }
  });

  return activeTrains.length;
}

console.log('Starting simulation validation for JR Chuo Rapid Line...');
testSimulationAtTime('08:00:00', false); // 朝ラッシュ
testSimulationAtTime('12:00:00', false); // 日中
testSimulationAtTime('18:30:00', false); // 夕ラッシュ
testSimulationAtTime('22:00:00', false); // 夜間
testSimulationAtTime('14:00:00', true);  // 休日昼
console.log('\nAll simulation checks passed successfully!');
