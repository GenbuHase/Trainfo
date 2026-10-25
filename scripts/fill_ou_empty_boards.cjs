const fs = require('fs');
const path = require('path');
const YahooTimetableBuilder = require('./common/yahoo/YahooTimetableBuilder.cjs');

const lineId = 'ou_fukushima_shinjo';
const config = require(`./lines/${lineId}/config.cjs`);
const dir = path.resolve('src/data/lines', lineId);
const trips = JSON.parse(fs.readFileSync(path.join(dir, 'globalTimetable.json'), 'utf8'));
const store = JSON.parse(fs.readFileSync(path.join(dir, 'stationTimetables.json'), 'utf8'));
const builder = new YahooTimetableBuilder(config);
const derived = builder.buildStationTimetablesFromTrips(trips);

let filled = 0;
for (const day of ['weekday', 'holiday']) {
  for (const stId of Object.keys(store[day] || {})) {
    const current = store[day][stId];
    const incoming = derived[day]?.[stId];
    if (!current || !incoming) continue;
    for (const dirName of ['inbound', 'outbound']) {
      if ((current[dirName] || []).length === 0 && (incoming[dirName] || []).length > 0) {
        current[dirName] = incoming[dirName];
        filled += incoming[dirName].length;
        console.log(`filled ${day} ${stId} ${dirName} ${incoming[dirName].length}`);
      }
    }
  }
}
fs.writeFileSync(path.join(dir, 'stationTimetables.json'), JSON.stringify(store, null, 2));
console.log('filled departures', filled);
