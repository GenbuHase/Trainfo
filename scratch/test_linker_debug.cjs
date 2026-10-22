const fs = require('fs');

const chuo = JSON.parse(fs.readFileSync('src/data/lines/chuo/globalTimetable.json', 'utf8'));
const cm = JSON.parse(fs.readFileSync('src/data/lines/chuo_main/globalTimetable.json', 'utf8'));

const c6906 = chuo.find(t => t.tripId.includes('6906'));
const cm39449 = cm.find(t => t.tripId.includes('39449'));
const cm6906 = cm.find(t => t.tripId.includes('6906'));

console.log('c6906:', c6906.tripId, 'prev:', c6906.prevTripId, 'stops[0]:', c6906.stops[0]);
console.log('cm39449:', cm39449.tripId, 'through:', cm39449.throughTripId, 'stops[last]:', cm39449.stops[cm39449.stops.length-1]);
console.log('cm6906:', cm6906.tripId, 'through:', cm6906.throughTripId, 'stops[last]:', cm6906.stops[cm6906.stops.length-1]);
