const fs = require('fs');

const lines = [
  { name: '山形新幹線', id: 'yamagata_shinkansen', boundary: 'TS-09' },
  { name: '秋田新幹線', id: 'akita_shinkansen', boundary: 'TS-18' },
  { name: '富士急行線', id: 'fujikyu', boundary: 'JC-32' },
  { name: '御殿場線', id: 'gotemba', boundary: 'OH-41 / CB-04' },
  { name: '伊豆急行線', id: 'izukyu', boundary: 'JT-26' },
  { name: '伊豆箱根駿豆線', id: 'izuhakone_sunzu', boundary: 'CA-02 / IS-01' }
];

console.log("=== 直通接続状況の検証 ===");

for (const line of lines) {
  const p = `src/data/lines/${line.id}/globalTimetable.json`;
  if (!fs.existsSync(p)) {
    console.log(`[${line.name}] ファイルなし: ${p}`);
    continue;
  }
  const trips = JSON.parse(fs.readFileSync(p, 'utf8'));
  const throughTo = trips.filter(t => t.throughTripId);
  const throughFrom = trips.filter(t => t.prevTripId);
  console.log(`[${line.name} (${line.id})]`);
  console.log(`  全トリップ: ${trips.length} 本`);
  console.log(`  他路線へ直通 (throughTripId): ${throughTo.length} 本`);
  console.log(`  他路線から直通 (prevTripId): ${throughFrom.length} 本`);
  
  // 直通特急のサンプル
  const sampleThrough = trips.filter(t => t.throughTripId || t.prevTripId).slice(0, 3);
  sampleThrough.forEach(t => {
    console.log(`    Trip ${t.tripId}: ${t.trainNumber} [${t.trainName || t.trainType}] dir=${t.direction} prev=${t.prevTripId} through=${t.throughTripId} dest=${t.customDestination || t.destinationStationId}`);
  });
}
