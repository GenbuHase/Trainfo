const fs = require('fs');
const shinonoi = JSON.parse(fs.readFileSync('src/data/lines/shinonoi/globalTimetable.json', 'utf8'));

const ltd = shinonoi.filter(t => t.trainType === 'limitedExp' || (t.trainName && t.trainName.includes('あずさ')));
console.log('Shinonoi ltd count:', ltd.length);
for (const t of ltd) {
  console.log(t.tripId, t.trainName, t.trainNumber, t.direction, t.isHoliday ? '休日' : '平日', 'origin:', t.originStationId, 'dest:', t.destinationStationId, 'through:', t.throughTripId, 'prev:', t.prevTripId);
}
