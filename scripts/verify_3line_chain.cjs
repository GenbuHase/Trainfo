const fs = require('fs');

const fujikyu = JSON.parse(fs.readFileSync('src/data/lines/fujikyu/globalTimetable.json', 'utf8'));
const cm = JSON.parse(fs.readFileSync('src/data/lines/chuo_main/globalTimetable.json', 'utf8'));
const chuo = JSON.parse(fs.readFileSync('src/data/lines/chuo/globalTimetable.json', 'utf8'));

const cmMap = new Map();
cm.forEach(t => cmMap.set(t.tripId, t));
const chuoMap = new Map();
chuo.forEach(t => chuoMap.set(t.tripId, t));
const fjMap = new Map();
fujikyu.forEach(t => fjMap.set(t.tripId, t));

console.log('=== Checking 3-Line Through Chain (Fujikyu <-> Chuo Main <-> Chuo) ===');

// 1. 上り富士回遊 (河口湖 -> 新宿)
const inbFujikaiyu = fujikyu.filter(t => t.direction === 'inbound' && t.trainNumber && ['2132M', '2136M', '2144M', '2148M', '8194M', '9178M'].includes(t.trainNumber));
console.log(`\nInbound Fujikaiyu count in Fujikyu: ${inbFujikaiyu.length}`);
inbFujikaiyu.forEach(tFJ => {
  const tCM = tFJ.throughTripId ? cmMap.get(tFJ.throughTripId) : null;
  const tChuo = tCM && tCM.throughTripId ? chuoMap.get(tCM.throughTripId) : null;

  console.log(`\n[Inbound] ${tFJ.trainNumber} (${tFJ.isHoliday ? 'Holiday' : 'Weekday'}):`);
  console.log(`  1. Fujikyu : ${tFJ.tripId} | dest: ${tFJ.customDestination} | ${tFJ.stops[0].stationId}(${tFJ.stops[0].departureTime}) -> ${tFJ.stops[tFJ.stops.length - 1].stationId}(${tFJ.stops[tFJ.stops.length - 1].arrivalTime})`);
  if (tCM) {
    console.log(`  2. ChuoMain: ${tCM.tripId} | dest: ${tCM.customDestination} | ${tCM.stops[0].stationId}(${tCM.stops[0].departureTime}) -> ${tCM.stops[tCM.stops.length - 1].stationId}(${tCM.stops[tCM.stops.length - 1].arrivalTime})`);
  } else {
    console.log(`  2. ChuoMain: NOT LINKED! throughTripId=${tFJ.throughTripId}`);
  }
  if (tChuo) {
    console.log(`  3. Chuo    : ${tChuo.tripId} | dest: ${tChuo.customDestination} | ${tChuo.stops[0].stationId}(${tChuo.stops[0].departureTime}) -> ${tChuo.stops[tChuo.stops.length - 1].stationId}(${tChuo.stops[tChuo.stops.length - 1].arrivalTime})`);
  } else {
    console.log(`  3. Chuo    : NOT LINKED! (CM throughTripId=${tCM?.throughTripId})`);
  }
});

// 2. 下り富士回遊 (新宿 -> 河口湖)
const outbFujikaiyu = chuo.filter(t => t.direction === 'outbound' && t.trainNumber && ['2103M', '2107M', '2111M', '2115M', '8111M', '9193M'].includes(t.trainNumber));
console.log(`\nOutbound Fujikaiyu count in Chuo: ${outbFujikaiyu.length}`);
outbFujikaiyu.forEach(tChuo => {
  const tCM = tChuo.throughTripId ? cmMap.get(tChuo.throughTripId) : null;
  const tFJ = tCM && tCM.throughTripId ? fjMap.get(tCM.throughTripId) : null;

  console.log(`\n[Outbound] ${tChuo.trainNumber} (${tChuo.isHoliday ? 'Holiday' : 'Weekday'}):`);
  console.log(`  1. Chuo    : ${tChuo.tripId} | dest: ${tChuo.customDestination} | ${tChuo.stops[0].stationId}(${tChuo.stops[0].departureTime}) -> ${tChuo.stops[tChuo.stops.length - 1].stationId}(${tChuo.stops[tChuo.stops.length - 1].arrivalTime})`);
  if (tCM) {
    console.log(`  2. ChuoMain: ${tCM.tripId} | dest: ${tCM.customDestination} | ${tCM.stops[0].stationId}(${tCM.stops[0].departureTime}) -> ${tCM.stops[tCM.stops.length - 1].stationId}(${tCM.stops[tCM.stops.length - 1].arrivalTime})`);
  } else {
    console.log(`  2. ChuoMain: NOT LINKED! throughTripId=${tChuo.throughTripId}`);
  }
  if (tFJ) {
    console.log(`  3. Fujikyu : ${tFJ.tripId} | dest: ${tFJ.customDestination} | ${tFJ.stops[0].stationId}(${tFJ.stops[0].departureTime}) -> ${tFJ.stops[tFJ.stops.length - 1].stationId}(${tFJ.stops[tFJ.stops.length - 1].arrivalTime})`);
  } else {
    console.log(`  3. Fujikyu : NOT LINKED! (CM throughTripId=${tCM?.throughTripId})`);
  }
});
