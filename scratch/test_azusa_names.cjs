const fs = require('fs');
const chuo = JSON.parse(fs.readFileSync('src/data/lines/chuo/globalTimetable.json', 'utf8'));
const chuoMain = JSON.parse(fs.readFileSync('src/data/lines/chuo_main/globalTimetable.json', 'utf8'));
const shinonoi = JSON.parse(fs.readFileSync('src/data/lines/shinonoi/globalTimetable.json', 'utf8'));

console.log('Chuo inbound express names:', [...new Set(chuo.filter(t => t.direction === 'inbound' && t.trainName).map(t => t.trainName))].slice(0, 10));
console.log('Chuo_main inbound express names:', [...new Set(chuoMain.filter(t => t.direction === 'inbound' && t.trainName).map(t => t.trainName))].slice(0, 10));
console.log('Shinonoi inbound express names:', [...new Set(shinonoi.filter(t => t.direction === 'inbound' && t.trainName).map(t => t.trainName))].slice(0, 10));
console.log('Shinonoi outbound express names:', [...new Set(shinonoi.filter(t => t.direction === 'outbound' && t.trainName).map(t => t.trainName))].slice(0, 10));
