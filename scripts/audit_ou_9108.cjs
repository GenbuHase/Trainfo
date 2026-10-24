const details = require('./cache/yahoo/ou_fukushima_shinjo/all_train_details.json');
const hits = details.filter(d => String(d.trainId) === '9108');
for (const d of hits) {
  console.log(d.dayKey, d.displayName, d.direction);
  for (const s of d.stopStation || []) {
    console.log(`  ${s.stationName}\t${s.arrivalTime || ''}\t${s.departureTime || ''}`);
  }
}
