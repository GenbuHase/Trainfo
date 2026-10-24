const fs = require('fs');
const path = require('path');

const lines = [
  'ou_fukushima_shinjo',
  'ou_shinjo_omagari',
  'ou_omagari_akita',
  'ou_akita_aomori',
];

function load(lineId) {
  const dir = path.resolve('src/data/lines', lineId);
  return {
    trips: JSON.parse(fs.readFileSync(path.join(dir, 'globalTimetable.json'), 'utf8')),
    stations: JSON.parse(fs.readFileSync(path.join(dir, 'stationTimetables.json'), 'utf8')),
  };
}

const banned = ['つばさ', 'やまびこ', 'こまち', 'はやぶさ', '新幹線'];
for (const lineId of lines) {
  const { trips, stations } = load(lineId);
  const bad = trips.filter(t => banned.some(b => `${t.trainName || ''} ${t.trainNumber || ''}`.includes(b)));
  const types = {};
  const nums = { M: 0, D: 0, other: 0 };
  for (const t of trips) {
    types[t.trainType] = (types[t.trainType] || 0) + 1;
    if (/M$/.test(t.trainNumber)) nums.M++;
    else if (/D$/.test(t.trainNumber)) nums.D++;
    else nums.other++;
  }
  const emptyBoards = [];
  for (const day of ['weekday', 'holiday']) {
    for (const [id, tt] of Object.entries(stations[day] || {})) {
      const n = (tt.inbound || []).length + (tt.outbound || []).length;
      if (n === 0) emptyBoards.push(`${day}:${id}`);
    }
  }
  console.log(`\n${lineId} trips=${trips.length} types=${JSON.stringify(types)} numbers=${JSON.stringify(nums)} banned=${bad.length} emptyBoards=${emptyBoards.length}`);
  if (emptyBoards.length) console.log('  empty', emptyBoards.slice(0, 12).join(', '));
  const samples = trips.filter(t => t.trainName).slice(0, 8).map(t => `${t.trainNumber} ${t.trainName} ${t.customOrigin || ''}→${t.customDestination || t.destinationStationId}`);
  if (samples.length) console.log('  named', samples.join(' | '));
}

const north = load('ou_akita_aomori');
const named = new Map();
for (const t of north.trips) {
  if (!t.trainName) continue;
  const key = `${t.isHoliday ? 'H' : 'W'} ${t.trainNumber} ${t.trainName}`;
  if (!named.has(key)) named.set(key, []);
  named.get(key).push(t);
}
console.log('\nAkita-Aomori named trains:');
for (const [k, list] of named) {
  const segs = list.map(t => `${t.originStationId}→${t.destinationStationId}${t.customDestination ? '(' + t.customDestination + ')' : ''}`).join(' + ');
  console.log(`  ${k}: ${segs}`);
}

const yama = JSON.parse(fs.readFileSync('src/data/lines/yamagata_shinkansen/globalTimetable.json', 'utf8'));
const yNums = new Set(yama.map(t => t.trainNumber));
const ou1 = load('ou_fukushima_shinjo').trips;
const overlap = ou1.filter(t => yNums.has(t.trainNumber));
console.log(`\ntrainNumber overlap with yamagata shinkansen: ${overlap.length}`);
if (overlap.length) console.log(overlap.slice(0, 5).map(t => t.trainNumber).join(', '));

const akita = JSON.parse(fs.readFileSync('src/data/lines/akita_shinkansen/globalTimetable.json', 'utf8'));
const aNums = new Set(akita.map(t => t.trainNumber));
const ou3 = load('ou_omagari_akita').trips;
const overlapA = ou3.filter(t => aNums.has(t.trainNumber));
console.log(`trainNumber overlap with akita shinkansen: ${overlapA.length}`);
