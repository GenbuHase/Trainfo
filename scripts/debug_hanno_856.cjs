const fs = require('fs');

const seibuTrips = JSON.parse(fs.readFileSync('src/data/lines/seibu_ikebukuro/globalTimetable.json', 'utf8'));
const hanno856 = seibuTrips.filter(t => {
  const hStop = t.stops.find(s => s.stationId === 'SI-26'); // 飯能
  return hStop && hStop.departureTime && hStop.departureTime.startsWith('08:56');
});

console.log('Hanno 8:56 trips count in Seibu:', hanno856.length);
for (const t of hanno856) {
  console.log({
    tripId: t.tripId,
    trainId: t.trainId,
    trainNumber: t.trainNumber,
    trainType: t.trainType,
    isHoliday: t.isHoliday,
    origin: t.originStationId,
    dest: t.destinationStationId,
    customDestination: t.customDestination,
    customOrigin: t.customOrigin,
    driveComment: t.driveComment,
    guideComment: t.guideComment,
    throughTripId: t.throughTripId,
    throughLineId: t.throughLineId,
    stopsCount: t.stops.length,
    firstStop: t.stops[0],
    lastStop: t.stops[t.stops.length - 1],
  });
}

// 飯能駅の発車標も確認
const seibuStationTt = JSON.parse(fs.readFileSync('src/data/lines/seibu_ikebukuro/stationTimetables.json', 'utf8'));
const hannoTt = seibuStationTt.holiday?.['SI-26'] || seibuStationTt['SI-26']?.outbound || {};
console.log('Hanno stationTimetable (holiday outbound):');
const hannoDeps = (seibuStationTt.holiday?.['SI-26']?.outbound || seibuStationTt['SI-26']?.outbound?.holidays || []).filter(d => d.h === 8);
console.log('Departures at 8 oclock:', hannoDeps);
