const fs = require('fs');
const saikyo = JSON.parse(fs.readFileSync('src/data/lines/saikyo/globalTimetable.json', 'utf8'));
const t = saikyo.find(x => x.tripId === 'HD_INB_JA-26_0743_39251');
console.log(JSON.stringify(t, null, 2));
