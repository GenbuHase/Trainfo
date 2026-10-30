const fs = require('fs');

const srDetails = JSON.parse(fs.readFileSync('scripts/cache/yahoo/sobu_rapid/all_train_details.json', 'utf8'));

['29323', '29325', '29333', '29334'].forEach(trainId => {
  const d = srDetails.find(x => x.trainId === trainId);
  console.log(`\n=== trainId ${trainId} in sobu_rapid cache ===`);
  d?.stopStation?.slice(-4).forEach(s => console.log(s.stationName, s.arrivalTime, s.departureTime));
});
