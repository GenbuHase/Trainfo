import fs from 'fs';
import path from 'path';

const linesDir = 'src/data/lines';
const lineFolders = fs.readdirSync(linesDir).filter(f => {
  const stat = fs.statSync(path.join(linesDir, f));
  return stat.isDirectory() && fs.existsSync(path.join(linesDir, f, 'globalTimetable.json'));
});

console.log(`Found ${lineFolders.length} lines with globalTimetable.json.`);

// 全トリップのロード
const allTrips = [];
const tripMap = new Map();
const lineTripsMap = new Map();

for (const lineId of lineFolders) {
  const filePath = path.join(linesDir, lineId, 'globalTimetable.json');
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const trips = JSON.parse(raw);
    lineTripsMap.set(lineId, trips);
    for (const t of trips) {
      allTrips.push(t);
      tripMap.set(t.tripId, t);
    }
  } catch (err) {
    console.error(`Error loading ${filePath}:`, err.message);
  }
}

console.log(`Loaded ${allTrips.length} trips in total.`);

// 1. throughTripId / prevTripId のリンク整合性チェック
const brokenThroughLinks = [];
const brokenPrevLinks = [];
const asymmetricThroughLinks = [];

for (const t of allTrips) {
  if (t.throughTripId) {
    const target = tripMap.get(t.throughTripId);
    if (!target) {
      brokenThroughLinks.push({ tripId: t.tripId, lineId: t.lineId, trainNumber: t.trainNumber, throughTripId: t.throughTripId });
    } else {
      // 相手の prevTripId が自分を指していない場合
      if (target.prevTripId && target.prevTripId !== t.tripId) {
        asymmetricThroughLinks.push({
          sourceTripId: t.tripId,
          sourceThrough: t.throughTripId,
          targetPrev: target.prevTripId,
          sourceTrainNumber: t.trainNumber,
          targetTrainNumber: target.trainNumber
        });
      }
    }
  }

  if (t.prevTripId) {
    const target = tripMap.get(t.prevTripId);
    if (!target) {
      brokenPrevLinks.push({ tripId: t.tripId, lineId: t.lineId, trainNumber: t.trainNumber, prevTripId: t.prevTripId });
    }
  }
}

console.log(`\n=== 1. Through / Prev Link Audit ===`);
console.log(`Broken throughTripId links: ${brokenThroughLinks.length}`);
if (brokenThroughLinks.length > 0) {
  console.log('Sample broken throughTripId:', brokenThroughLinks.slice(0, 10));
}

console.log(`Broken prevTripId links: ${brokenPrevLinks.length}`);
if (brokenPrevLinks.length > 0) {
  console.log('Sample broken prevTripId:', brokenPrevLinks.slice(0, 10));
}

console.log(`Asymmetric throughTripId links (target.prevTripId !== source): ${asymmetricThroughLinks.length}`);
if (asymmetricThroughLinks.length > 0) {
  console.log('Sample asymmetric throughTripId:', asymmetricThroughLinks.slice(0, 10));
}

// 2. Coupling 整合性チェック
const brokenCouplingLinks = [];
const asymmetricCoupling = [];
const invalidRolePair = [];
const couplingThroughDiscrepancies = [];

for (const t of allTrips) {
  if (!t.coupling) continue;

  const c = t.coupling;
  const partner = tripMap.get(c.coupledTripId);

  if (!partner) {
    brokenCouplingLinks.push({
      tripId: t.tripId,
      trainNumber: t.trainNumber,
      lineId: t.lineId,
      coupledTripId: c.coupledTripId
    });
    continue;
  }

  if (!partner.coupling) {
    asymmetricCoupling.push({
      tripId: t.tripId,
      partnerTripId: partner.tripId,
      reason: 'Partner has NO coupling object'
    });
    continue;
  }

  if (partner.coupling.coupledTripId !== t.tripId) {
    asymmetricCoupling.push({
      tripId: t.tripId,
      partnerTripId: partner.tripId,
      partnerTarget: partner.coupling.coupledTripId,
      reason: 'Partner points to different trip'
    });
  }

  if (c.role === partner.coupling.role) {
    invalidRolePair.push({
      tripId: t.tripId,
      partnerTripId: partner.tripId,
      role: c.role
    });
  }

  // 併結している列車同士の直通（throughTripId）の同期チェック
  // 片方だけ直通があり、もう片方が直通なし、または直通先で併結が切れている/片肺になっているか
  if (t.throughTripId || partner.throughTripId) {
    // 自トリップに throughTripId があるが、相手には無い場合
    if (t.throughTripId && !partner.throughTripId) {
      couplingThroughDiscrepancies.push({
        type: 'ONE_SIDED_THROUGH',
        tripWithThrough: t.tripId,
        trainNumber: t.trainNumber,
        throughTripId: t.throughTripId,
        partnerWithoutThrough: partner.tripId,
        partnerTrainNumber: partner.trainNumber,
        role: c.role
      });
    }
  }
}

console.log(`\n=== 2. Coupling Audit ===`);
console.log(`Broken coupling links (partner not found): ${brokenCouplingLinks.length}`);
if (brokenCouplingLinks.length > 0) {
  console.log('Broken coupling links:', brokenCouplingLinks);
}

console.log(`Asymmetric coupling (partner does not reciprocate): ${asymmetricCoupling.length}`);
if (asymmetricCoupling.length > 0) {
  console.log('Asymmetric coupling:', asymmetricCoupling);
}

console.log(`Invalid role pairs (same role for both): ${invalidRolePair.length}`);
if (invalidRolePair.length > 0) {
  console.log('Invalid role pairs:', invalidRolePair);
}

console.log(`Coupling through discrepancies: ${couplingThroughDiscrepancies.length}`);
if (couplingThroughDiscrepancies.length > 0) {
  console.log('Sample coupling through discrepancies:', couplingThroughDiscrepancies.slice(0, 10));
}
