const fs = require('fs');
const gt = JSON.parse(fs.readFileSync('src/data/lines/tohoku_shinkansen/globalTimetable.json', 'utf8'));

const t8642 = gt.filter(t => t.tripId.includes('8642'));
console.log('8642 trips:', t8642.map(t => ({ tripId: t.tripId, trainNumber: t.trainNumber, coupling: t.coupling })));

const t3149 = gt.filter(t => t.tripId.includes('3149') || (t.trainId && t.trainId.includes('3149')) || t.trainNumber === '3149');
console.log('3149 trips:', t3149.map(t => ({ tripId: t.tripId, trainNumber: t.trainNumber, trainId: t.trainId, coupling: t.coupling })));

// 19:16 departure from TS-01
const t1916 = gt.filter(t => t.stops[0]?.stationId === 'TS-01' && t.stops[0]?.departureTime.startsWith('19:16'));
console.log('19:16 departures from TS-01:', t1916.map(t => ({ tripId: t.tripId, trainNumber: t.trainNumber, trainType: t.trainType, coupling: t.coupling })));
