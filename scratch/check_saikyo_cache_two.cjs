const fs = require('fs');

if (fs.existsSync('scripts/cache/yahoo/saikyo/all_train_details.json')) {
  const saikyoDetails = JSON.parse(fs.readFileSync('scripts/cache/yahoo/saikyo/all_train_details.json', 'utf8'));
  ['39355', '39356'].forEach(id => {
    const d = saikyoDetails.find(x => x.trainId === id);
    console.log(`\n=== trainId ${id} in saikyo cache ===`);
    d?.stopStation?.forEach(s => console.log(s.stationName, s.arrivalTime, s.departureTime));
  });
} else {
  console.log('saikyo cache not found');
}
