const fs = require('fs');

const saikyo = JSON.parse(fs.readFileSync('src/data/lines/saikyo/globalTimetable.json', 'utf8'));

['HD_INB_JA-11_0658_39355', 'HD_INB_JA-11_0725_39356'].forEach(id => {
  const t = saikyo.find(x => x.tripId === id);
  console.log(`\n=== ${id} ===`);
  console.log('trainNumber:', t?.trainNumber, 'direction:', t?.direction, 'origin:', t?.originStationId, 'dest:', t?.destinationStationId);
  console.log('throughTripId:', t?.throughTripId, 'throughLineId:', t?.throughLineId, 'through:', t?.through);
  console.log('prevTripId:', t?.prevTripId, 'prevLineId:', t?.prevLineId, 'prev:', t?.previousTrip);
  console.log('stops:');
  t?.stops?.forEach(s => console.log(' ', s.stationId, s.arrivalTime, s.departureTime, s.isPassing));
});
