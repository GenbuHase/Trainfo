const fs = require('fs');
const yk = JSON.parse(fs.readFileSync('src/data/lines/yokosuka/globalTimetable.json', 'utf8'));
const list = yk.filter(x => x.tripId.includes('29323'));
console.log(list.map(t => ({ tripId: t.tripId, trainNumber: t.trainNumber, trainName: t.trainName, trainType: t.trainType, through: t.through })));
