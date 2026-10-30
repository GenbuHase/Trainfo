const fs = require('fs');
const sr = JSON.parse(fs.readFileSync('src/data/lines/sobu_rapid/globalTimetable.json', 'utf8'));
const t = sr.find(x => x.tripId === 'WD_OUT_JO-19_0756_29325');
console.log(JSON.stringify(t, null, 2));
