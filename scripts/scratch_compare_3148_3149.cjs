const th = require('./cache/yahoo/tohoku_shinkansen/all_train_details.json');
const t3148 = th.find(t => t.trainId === '3148');
const t3149 = th.find(t => t.trainId === '3149');
console.log('3148:', {
  displayName: t3148?.displayName,
  first: t3148?.stopStation[0],
  last: t3148?.stopStation[t3148?.stopStation.length - 1]
});
console.log('3149:', {
  displayName: t3149?.displayName,
  first: t3149?.stopStation[0],
  last: t3149?.stopStation[t3149?.stopStation.length - 1]
});
