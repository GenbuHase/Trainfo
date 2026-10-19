const th = require('./cache/yahoo/tohoku_shinkansen/all_train_details.json');
const found = th.find(t => t.trainId === '3149');
console.log('3149 in cache:', found ? found.displayName : 'Not found');
