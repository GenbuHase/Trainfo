const fs = require('fs');
const sm = JSON.parse(fs.readFileSync('src/data/lines/sobu_main/globalTimetable.json', 'utf8'));

['29325', '29333', '29334'].forEach(id => {
  const t = sm.find(x => x.tripId.includes(id) && !x.isHoliday && x.direction === 'outbound');
  console.log(id, t?.tripId, t?.trainNumber, t?.trainName, t?.trainType, t?.stops?.[0]);
});
