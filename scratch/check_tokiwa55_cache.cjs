const fs = require('fs');

if (fs.existsSync('scripts/cache/yahoo/joban_toride_iwaki/all_train_details.json')) {
  const jtiDetails = JSON.parse(fs.readFileSync('scripts/cache/yahoo/joban_toride_iwaki/all_train_details.json', 'utf8'));
  const d = jtiDetails.find(x => x.trainId === '7115');
  console.log('7115 in joban_toride_iwaki cache:');
  d?.stopStation?.slice(0, 5).forEach(s => console.log(s.stationName, s.arrivalTime, s.departureTime));
} else {
  console.log('cache not found');
}
