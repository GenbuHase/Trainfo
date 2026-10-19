const fs = require('fs');

const chuo = JSON.parse(fs.readFileSync('src/data/lines/chuo/globalTimetable.json', 'utf8'));
const cm = JSON.parse(fs.readFileSync('src/data/lines/chuo_main/globalTimetable.json', 'utf8'));
const fj = JSON.parse(fs.readFileSync('src/data/lines/fujikyu/globalTimetable.json', 'utf8'));

const allTrips = new Map();
chuo.forEach(t => allTrips.set(t.tripId, t));
cm.forEach(t => allTrips.set(t.tripId, t));
fj.forEach(t => allTrips.set(t.tripId, t));

console.log('=== 🚆 富士回遊3号 (下り 新宿 -> 河口湖) 追尾シミュレーション ===');
let trip = chuo.find(t => t.tripId === 'WD_OUT_JC-05_0730_39461_fuji');
let hop = 1;
while (trip) {
  console.log(`[Hop ${hop}] 路線: ${trip.lineId || (trip.tripId.startsWith('cm_') ? 'chuo_main' : trip.tripId.includes('FJ') ? 'fujikyu' : 'chuo')}`);
  console.log(`  TripId: ${trip.tripId} | 列車番号: ${trip.trainNumber} | 行先: ${trip.customDestination}`);
  console.log(`  両数: ${trip.cars}両 | 併結: ${trip.coupling ? `${trip.coupling.role} (${trip.coupling.coupledDestination}行と併結, 他編成${trip.coupling.coupledCars}両)` : '単独'}`);
  console.log(`  区間: ${trip.stops[0].stationId}(${trip.stops[0].departureTime}) -> ${trip.stops[trip.stops.length-1].stationId}(${trip.stops[trip.stops.length-1].arrivalTime})`);
  
  if (!trip.throughTripId) {
    console.log('  終点到着！🎉');
    break;
  }
  trip = allTrips.get(trip.throughTripId);
  hop++;
}

console.log('\n=== 🚆 富士回遊32号 (上り 河口湖 -> 新宿) 追尾シミュレーション ===');
trip = fj.find(t => t.tripId === 'WD_INB_FJ-18_1408_39568');
hop = 1;
while (trip) {
  console.log(`[Hop ${hop}] 路線: ${trip.lineId || (trip.tripId.startsWith('cm_') ? 'chuo_main' : trip.tripId.includes('FJ') ? 'fujikyu' : 'chuo')}`);
  console.log(`  TripId: ${trip.tripId} | 列車番号: ${trip.trainNumber} | 行先: ${trip.customDestination}`);
  console.log(`  両数: ${trip.cars}両 | 併結: ${trip.coupling ? `${trip.coupling.role} (${trip.coupling.coupledDestination}行と併結, 他編成${trip.coupling.coupledCars}両)` : '単独'}`);
  console.log(`  区間: ${trip.stops[0].stationId}(${trip.stops[0].departureTime}) -> ${trip.stops[trip.stops.length-1].stationId}(${trip.stops[trip.stops.length-1].arrivalTime})`);
  
  if (!trip.throughTripId) {
    console.log('  終点到着！🎉');
    break;
  }
  trip = allTrips.get(trip.throughTripId);
  hop++;
}
