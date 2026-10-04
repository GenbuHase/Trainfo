const fs = require('fs');

const omeContent = JSON.parse(fs.readFileSync('./src/data/lines/ome/globalTimetable.json', 'utf8'));
const throughTrips = omeContent.filter(t => t.throughTripId || t.throughLineId);
console.log('ome throughTrips count:', throughTrips.length);
if (throughTrips.length > 0) {
  console.log('Sample ome throughTrip:', throughTrips[0]);
}

const chuoContent = JSON.parse(fs.readFileSync('./src/data/lines/chuo/globalTimetable.json', 'utf8'));
const chuoThrough = chuoContent.filter(t => t.throughTripId || t.throughLineId);
console.log('chuo throughTrips count:', chuoThrough.length);
if (chuoThrough.length > 0) {
  console.log('Sample chuo throughTrip:', chuoThrough[0]);
}
