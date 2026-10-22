const fs = require('fs');

// runThroughLinker.cjs の前と後でどう変化しているか
const chuo = JSON.parse(fs.readFileSync('src/data/lines/chuo/globalTimetable.json', 'utf8'));
const cm = JSON.parse(fs.readFileSync('src/data/lines/chuo_main/globalTimetable.json', 'utf8'));

const c6906 = chuo.find(t => t.tripId.includes('6906'));
const cm6906 = cm.find(t => t.tripId.includes('6906'));

console.log('c6906:', c6906 ? { tripId: c6906.tripId, prev: c6906.prevTripId, through: c6906.throughTripId } : 'none');
console.log('cm6906:', cm6906 ? { tripId: cm6906.tripId, prev: cm6906.prevTripId, through: cm6906.throughTripId } : 'none');
