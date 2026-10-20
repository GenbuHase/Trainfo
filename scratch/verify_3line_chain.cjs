const fs = require('fs');

const chuo = JSON.parse(fs.readFileSync('src/data/lines/chuo/globalTimetable.json', 'utf8'));
const chuoMain = JSON.parse(fs.readFileSync('src/data/lines/chuo_main/globalTimetable.json', 'utf8'));
const shinonoi = JSON.parse(fs.readFileSync('src/data/lines/shinonoi/globalTimetable.json', 'utf8'));

console.log('=== 下り あずさ1号 (平日) チェーン検証 ===');
const c1 = chuo.find(t => t.trainName === 'あずさ1号' && !t.isHoliday && t.direction === 'outbound');
const cm1 = chuoMain.find(t => t.trainName === 'あずさ1号' && !t.isHoliday && t.direction === 'outbound');
const sn1 = shinonoi.find(t => t.trainName === 'あずさ1号' && !t.isHoliday && t.direction === 'outbound');

console.log('1. chuo (新宿 -> 高尾):');
console.log('   tripId:', c1?.tripId);
console.log('   throughTripId:', c1?.throughTripId);
console.log('   throughLineId:', c1?.throughLineId);
console.log('   lastStop:', c1?.stops[c1.stops.length - 1]);

console.log('2. chuo_main (高尾 -> 塩尻):');
console.log('   tripId:', cm1?.tripId);
console.log('   prevTripId:', cm1?.prevTripId);
console.log('   throughTripId:', cm1?.throughTripId);
console.log('   throughLineId:', cm1?.throughLineId);
console.log('   firstStop:', cm1?.stops[0]);
console.log('   lastStop:', cm1?.stops[cm1.stops.length - 1]);

console.log('3. shinonoi (塩尻 -> 松本):');
console.log('   tripId:', sn1?.tripId);
console.log('   prevTripId:', sn1?.prevTripId);
console.log('   prevLineId:', sn1?.prevLineId);
console.log('   firstStop:', sn1?.stops[0]);
console.log('   lastStop:', sn1?.stops[sn1.stops.length - 1]);

const isDownChainValid =
  c1?.throughTripId === cm1?.tripId &&
  cm1?.prevTripId === c1?.tripId &&
  cm1?.throughTripId === sn1?.tripId &&
  sn1?.prevTripId === cm1?.tripId;
console.log('\n>>> 下りあずさ1号 3線完全連結:', isDownChainValid ? '✅ OK' : '❌ NG');


console.log('\n=== 上り あずさ4号 (平日) チェーン検証 ===');
const sn4 = shinonoi.find(t => t.trainName === 'あずさ4号' && !t.isHoliday && t.direction === 'inbound');
const cm4 = chuoMain.find(t => t.trainName === 'あずさ4号' && !t.isHoliday && t.direction === 'inbound');
const c4 = chuo.find(t => t.trainName === 'あずさ4号' && !t.isHoliday && t.direction === 'inbound' && t.trainType === 'limitedExp');

console.log('1. shinonoi (松本 -> 塩尻):');
console.log('   tripId:', sn4?.tripId);
console.log('   throughTripId:', sn4?.throughTripId);
console.log('   throughLineId:', sn4?.throughLineId);
console.log('   firstStop:', sn4?.stops[0]);
console.log('   lastStop:', sn4?.stops[sn4.stops.length - 1]);

console.log('2. chuo_main (塩尻 -> 高尾):');
console.log('   tripId:', cm4?.tripId);
console.log('   prevTripId:', cm4?.prevTripId);
console.log('   throughTripId:', cm4?.throughTripId);
console.log('   throughLineId:', cm4?.throughLineId);
console.log('   firstStop:', cm4?.stops[0]);
console.log('   lastStop:', cm4?.stops[cm4.stops.length - 1]);

console.log('3. chuo (高尾 -> 新宿/東京):');
console.log('   tripId:', c4?.tripId);
console.log('   prevTripId:', c4?.prevTripId);
console.log('   prevLineId:', c4?.prevLineId);
console.log('   firstStop:', c4?.stops[0]);
console.log('   lastStop:', c4?.stops[c4.stops.length - 1]);

const isUpChainValid =
  sn4?.throughTripId === cm4?.tripId &&
  cm4?.prevTripId === sn4?.tripId &&
  cm4?.throughTripId === c4?.tripId &&
  c4?.prevTripId === cm4?.tripId;
console.log('\n>>> 上りあずさ4号 3線完全連結:', isUpChainValid ? '✅ OK' : '❌ NG');
