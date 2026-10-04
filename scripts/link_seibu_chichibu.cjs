const fs = require('fs');
const path = require('path');

const seibuPath = path.join(__dirname, '../src/data/lines/seibu_ikebukuro/globalTimetable.json');
const chichibuPath = path.join(__dirname, '../src/data/lines/chichibu/globalTimetable.json');

const seibu = JSON.parse(fs.readFileSync(seibuPath, 'utf8'));
const chichibu = JSON.parse(fs.readFileSync(chichibuPath, 'utf8'));

console.log('Seibu trips count:', seibu.length);
console.log('Chichibu trips count:', chichibu.length);

// 1. 西武池袋線側の更新
let seibuUpdated = 0;
for (const trip of seibu) {
  if (trip.tripId === 'HD_OUT_SI-26_0856_145187') {
    // 長瀞行 (4両, SECONDARY)
    trip.cars = 4;
    trip.customDestination = '長瀞';
    trip.destinationStationId = 'CR-31';
    trip.throughTripId = 'HD_INB_CR-31_0956_145187';
    trip.throughLineId = 'chichibu';
    trip.coupling = {
      coupledTripId: 'HD_OUT_SI-26_0856_145186',
      coupledTrainNumber: '6001レ',
      coupledCars: 4,
      fromStationId: 'SI-26',
      toStationId: 'SI-35',
      role: 'SECONDARY',
      coupledDestination: '三峰口'
    };
    // stops末尾に御花畑(CR-31)を追加（既に無ければ）
    if (!trip.stops.some(s => s.stationId === 'CR-31')) {
      trip.stops.push({
        stationId: 'CR-31',
        arrivalTime: '09:54:00',
        departureTime: '09:54:00',
        isPassing: false
      });
    }
    seibuUpdated++;
  } else if (trip.tripId === 'HD_OUT_SI-26_0856_145186') {
    // 三峰口行 (4両, PRIMARY)
    trip.cars = 4;
    trip.customDestination = '三峰口';
    trip.destinationStationId = 'CR-32';
    trip.throughTripId = 'HD_OUT_CR-32_1001_145186';
    trip.throughLineId = 'chichibu';
    trip.coupling = {
      coupledTripId: 'HD_OUT_SI-26_0856_145187',
      coupledTrainNumber: '6001レ',
      coupledCars: 4,
      fromStationId: 'SI-26',
      toStationId: 'SI-35',
      role: 'PRIMARY',
      coupledDestination: '長瀞'
    };
    // stops末尾に影森(CR-32)を追加（既に無ければ）
    if (!trip.stops.some(s => s.stationId === 'CR-32')) {
      trip.stops.push({
        stationId: 'CR-32',
        arrivalTime: '10:00:00',
        departureTime: '10:00:00',
        isPassing: false
      });
    }
    seibuUpdated++;
  }
}

// 2. 秩父鉄道側の更新
let chichibuUpdated = 0;
for (const trip of chichibu) {
  if (trip.tripId === 'HD_INB_CR-31_0956_145187') {
    trip.cars = 4;
    trip.customOrigin = '飯能';
    trip.customDestination = '長瀞';
    trip.throughTripId = 'HD_OUT_SI-26_0856_145187';
    trip.throughLineId = 'seibu_ikebukuro';
    chichibuUpdated++;
  } else if (trip.tripId === 'HD_OUT_CR-32_1001_145186') {
    trip.cars = 4;
    trip.customOrigin = '飯能';
    trip.customDestination = '三峰口';
    trip.throughTripId = 'HD_OUT_SI-26_0856_145186';
    trip.throughLineId = 'seibu_ikebukuro';
    chichibuUpdated++;
  } else if (trip.tripId === 'HD_INB_CR-37_1055_145189') {
    trip.cars = 4;
    trip.customDestination = '西武秩父';
    trip.destinationStationId = 'SI-36';
    trip.throughLineId = 'seibu_ikebukuro';
    if (!trip.stops.some(s => s.stationId === 'SI-36')) {
      trip.stops.push({
        stationId: 'SI-36',
        arrivalTime: '11:15:00',
        departureTime: '11:15:00',
        isPassing: false
      });
    }
    chichibuUpdated++;
  }
}

console.log(`Updated ${seibuUpdated} trips in Seibu Ikebukuro timetable.`);
console.log(`Updated ${chichibuUpdated} trips in Chichibu timetable.`);

fs.writeFileSync(seibuPath, JSON.stringify(seibu, null, 2), 'utf8');
fs.writeFileSync(chichibuPath, JSON.stringify(chichibu, null, 2), 'utf8');
console.log('Successfully saved updated timetable files.');
