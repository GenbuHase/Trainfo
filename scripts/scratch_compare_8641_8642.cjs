const ya = require('./cache/yahoo/yamagata_shinkansen/all_train_details.json');
const t8641 = ya.find(t => t.trainId === '8641');
const t8642 = ya.find(t => t.trainId === '8642');
console.log('8641:', {
  displayName: t8641?.displayName,
  first: t8641?.stopStation[0],
  last: t8641?.stopStation[t8641?.stopStation.length - 1]
});
console.log('8642:', {
  displayName: t8642?.displayName,
  first: t8642?.stopStation[0],
  last: t8642?.stopStation[t8642?.stopStation.length - 1]
});
