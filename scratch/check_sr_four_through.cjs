const fs = require('fs');
const sr = JSON.parse(fs.readFileSync('src/data/lines/sobu_rapid/globalTimetable.json', 'utf8'));

['29323', '29325', '29333', '29334'].forEach(id => {
  const t = sr.find(x => x.tripId.includes(id) && !x.isHoliday && x.direction === 'outbound');
  console.log(id, t?.trainNumber, t?.trainName, 'through:', t?.through, 'prev:', t?.previousTrip);
});
