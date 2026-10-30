const fs = require('fs');

const srPath = 'src/data/lines/sobu_rapid/globalTimetable.json';
const sr = JSON.parse(fs.readFileSync(srPath, 'utf8'));

const srDetails = JSON.parse(fs.readFileSync('scripts/cache/yahoo/sobu_rapid/all_train_details.json', 'utf8'));

let fixedCount = 0;

for (const t of sr) {
  if (t.direction !== 'outbound') continue;
  if (!t.trainName || !t.trainName.includes('成田エクスプレス')) continue;

  const chibaStop = t.stops.find(s => s.stationId === 'JO-28');
  if (!chibaStop) continue;

  // Yahooキャッシュを検索
  const d = srDetails.find(x => x.trainId === t.trainId || (t.trainNumber && x.trainNo && x.trainNo.includes(t.trainNumber)));
  const cachedChiba = d?.stopStation?.find(s => s.stationName === '千葉');

  if (cachedChiba && cachedChiba.departureTime) {
    const rawDep = cachedChiba.departureTime.toString().padStart(4, '0');
    const expectedDep = `${rawDep.slice(0, 2)}:${rawDep.slice(2, 4)}:00`;
    if (chibaStop.departureTime !== expectedDep) {
      console.log(`Fixing [${t.tripId}] ${t.trainNumber} 千葉 departureTime: ${chibaStop.departureTime} -> ${expectedDep}`);
      chibaStop.departureTime = expectedDep;
      fixedCount++;
    }
  } else if (chibaStop.departureTime !== chibaStop.arrivalTime) {
    // キャッシュがない場合、到着時刻と発車時刻の差が5分以上あれば到着時刻にリセット
    const [ah, am] = chibaStop.arrivalTime.split(':').map(Number);
    const [dh, dm] = chibaStop.departureTime.split(':').map(Number);
    const diff = (dh * 60 + dm) - (ah * 60 + am);
    if (diff > 5) {
      console.log(`Fixing [${t.tripId}] ${t.trainNumber} 千葉 departureTime: ${chibaStop.departureTime} -> ${chibaStop.arrivalTime}`);
      chibaStop.departureTime = chibaStop.arrivalTime;
      fixedCount++;
    }
  }

  // 誤った through / throughTripId (普通列車への結合など) のリセット
  if (t.through && t.through.trainNumber && !t.through.trainNumber.endsWith('M')) {
    console.log(`Clearing invalid through on [${t.tripId}]:`, t.through);
    delete t.through;
    delete t.throughTripId;
    delete t.throughLineId;
  }
}

fs.writeFileSync(srPath, JSON.stringify(sr, null, 2), 'utf8');
console.log(`Total fixed sobu_rapid N'EX trips: ${fixedCount}`);
