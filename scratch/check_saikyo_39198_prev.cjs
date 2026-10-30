const fs = require('fs');

const saikyo = JSON.parse(fs.readFileSync('src/data/lines/saikyo/globalTimetable.json', 'utf8'));
const t = saikyo.find(x => x.tripId === 'WD_OUT_JA-08_0721_39198');
console.log('saikyo 39198:');
console.log(t?.prevTripId, t?.prevLineId, t?.previousTrip);
