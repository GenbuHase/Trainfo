import fs from 'fs';
import path from 'path';

const linesDir = 'src/data/lines';
const tripMap = new Map();

for (const lineId of fs.readdirSync(linesDir)) {
  const p = path.join(linesDir, lineId, 'globalTimetable.json');
  if (fs.existsSync(p)) {
    const trips = JSON.parse(fs.readFileSync(p, 'utf8'));
    for (const t of trips) tripMap.set(t.tripId, t);
  }
}

console.log('=== All Coupling Pairs in the Entire Project ===');
const coupledTrips = Array.from(tripMap.values()).filter(t => t.coupling);
console.log(`Total trips with coupling: ${coupledTrips.length}`);

// ユニークなペアをグループ化
const pairMap = new Map();
for (const t of coupledTrips) {
  const partnerId = t.coupling.coupledTripId;
  const key = [t.tripId, partnerId].sort().join(' <-> ');
  if (!pairMap.has(key)) {
    pairMap.set(key, { tripA: t, tripB: tripMap.get(partnerId) });
  }
}

console.log(`Total unique coupling pairs: ${pairMap.size}`);

// 各ペアの直通状況をチェック
const issues = [];
for (const [key, { tripA, tripB }] of pairMap) {
  if (!tripB) {
    issues.push({ key, error: 'Partner not found' });
    continue;
  }

  // 直通先（throughTripId）がある場合の同期チェック
  const throughA = tripA.throughTripId ? tripMap.get(tripA.throughTripId) : null;
  const throughB = tripB.throughTripId ? tripMap.get(tripB.throughTripId) : null;

  // 直通元（prevTripId）がある場合の同期チェック
  const prevA = tripA.prevTripId ? tripMap.get(tripA.prevTripId) : null;
  const prevB = tripB.prevTripId ? tripMap.get(tripB.prevTripId) : null;

  // A が直通先で併結しているのに、B が直通先で併結していない、あるいは相手が違う
  if (throughA && throughA.coupling) {
    if (!throughB) {
      issues.push({
        pair: `${tripA.trainNumber || tripA.tripId} & ${tripB.trainNumber || tripB.tripId}`,
        line: tripA.lineId,
        error: `tripA continues to throughTripId (${throughA.tripId}) with coupling, but tripB has NO throughTripId!`
      });
    } else if (!throughB.coupling) {
      issues.push({
        pair: `${tripA.trainNumber || tripA.tripId} & ${tripB.trainNumber || tripB.tripId}`,
        line: tripA.lineId,
        error: `tripA continues to throughTripId (${throughA.tripId}) with coupling, but tripB's throughTripId (${throughB.tripId}) has NO coupling!`
      });
    } else if (throughA.coupling.coupledTripId !== throughB.tripId) {
      issues.push({
        pair: `${tripA.trainNumber || tripA.tripId} & ${tripB.trainNumber || tripB.tripId}`,
        line: tripA.lineId,
        error: `throughA (${throughA.tripId}) coupled with ${throughA.coupling.coupledTripId}, but throughB is ${throughB.tripId}!`
      });
    }
  }

  // 逆に B が直通先で併結しているのに A が直通していない場合
  if (throughB && throughB.coupling) {
    if (!throughA) {
      issues.push({
        pair: `${tripA.trainNumber || tripA.tripId} & ${tripB.trainNumber || tripB.tripId}`,
        line: tripB.lineId,
        error: `tripB continues to throughTripId (${throughB.tripId}) with coupling, but tripA has NO throughTripId!`
      });
    }
  }
}

console.log(`\nFound ${issues.length} coupling issues:`);
for (const iss of issues) {
  console.log(`- [${iss.line}] ${iss.pair}: ${iss.error}`);
}
