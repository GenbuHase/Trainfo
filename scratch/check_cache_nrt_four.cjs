const fs = require('fs');
const nrtDetails = JSON.parse(fs.readFileSync('scripts/cache/yahoo/narita/all_train_details.json', 'utf8'));

['29248', '29250', '29258', '29259'].forEach(trainId => {
  const d = nrtDetails.find(x => x.trainId === trainId);
  console.log(`\n=== trainId ${trainId} in narita cache ===`);
  d?.stopStation?.forEach(s => console.log(s.stationName, s.arrivalTime, s.departureTime));
});
