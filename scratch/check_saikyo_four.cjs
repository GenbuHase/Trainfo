const fs = require('fs');

const saikyo = JSON.parse(fs.readFileSync('src/data/lines/saikyo/globalTimetable.json', 'utf8'));

const tripIds = [
  'HD_INB_JA-11_0658_39355',
  'HD_INB_JA-21_0723_39253',
  'HD_INB_JA-11_0725_39356',
  'HD_INB_JA-26_0743_39251'
];

tripIds.forEach(id => {
  const t = saikyo.find(x => x.tripId === id);
  console.log(`\n=== ${id} ===`);
  console.log('trainNumber:', t?.trainNumber, 'direction:', t?.direction, 'origin:', t?.originStationId, 'dest:', t?.destinationStationId);
  console.log('through:', t?.through, 'prev:', t?.previousTrip);
  console.log('stops:');
  t?.stops?.forEach(s => console.log(' ', s.stationId, s.arrivalTime, s.departureTime, s.isPassing));
});
