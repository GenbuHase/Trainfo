const fs = require('fs');
const path = require('path');

console.log('=== 🚇 小田急 ↔ 千代田 ↔ 常磐 3線直通ハンドオーバー検証テスト ===\n');

const odakyuPath = path.join(__dirname, '../src/data/lines/odakyu_odawara/globalTimetable.json');
const chiyodaPath = path.join(__dirname, '../src/data/lines/chiyoda/globalTimetable.json');
const jobanPath = path.join(__dirname, '../src/data/lines/joban/globalTimetable.json');

const odakyu = JSON.parse(fs.readFileSync(odakyuPath, 'utf8'));
const chiyoda = JSON.parse(fs.readFileSync(chiyodaPath, 'utf8'));
const joban = JSON.parse(fs.readFileSync(jobanPath, 'utf8'));

console.log(`総便数: 小田急=${odakyu.length}, 千代田=${chiyoda.length}, 常磐=${joban.length}\n`);

// 1. 小田急 -> 千代田 直通便
const odakyuToChiyoda = odakyu.filter(t => t.throughLineId === 'chiyoda');
console.log(`1. 小田急 -> 千代田 直通リンク便数: ${odakyuToChiyoda.length}`);
if (odakyuToChiyoda.length > 0) {
  const sample = odakyuToChiyoda[0];
  const linkedTrip = chiyoda.find(t => t.tripId === sample.throughTripId);
  console.log(`   サンプル: [小田急 ${sample.tripId}] (列車番号: ${sample.trainNumber}) 行先: ${sample.destination} / custom: ${sample.customDestination}`);
  console.log(`   -> [千代田 ${linkedTrip?.tripId}] (列車番号: ${linkedTrip?.trainNumber}) 行先: ${linkedTrip?.destination} / custom: ${linkedTrip?.customDestination}`);
}

// 2. 千代田 -> 常磐 直通便
const chiyodaToJoban = chiyoda.filter(t => t.throughLineId === 'joban');
console.log(`\n2. 千代田 -> 常磐 直通リンク便数: ${chiyodaToJoban.length}`);
if (chiyodaToJoban.length > 0) {
  const sample = chiyodaToJoban[0];
  const linkedTrip = joban.find(t => t.tripId === sample.throughTripId);
  console.log(`   サンプル: [千代田 ${sample.tripId}] (列車番号: ${sample.trainNumber}) 行先: ${sample.destination} / custom: ${sample.customDestination}`);
  console.log(`   -> [常磐 ${linkedTrip?.tripId}] (列車番号: ${linkedTrip?.trainNumber}) 行先: ${linkedTrip?.destination} / custom: ${linkedTrip?.customDestination}`);
}

// 3. 常磐 -> 千代田 直通便
const jobanToChiyoda = joban.filter(t => t.throughLineId === 'chiyoda');
console.log(`\n3. 常磐 -> 千代田 直通リンク便数: ${jobanToChiyoda.length}`);
if (jobanToChiyoda.length > 0) {
  const sample = jobanToChiyoda[0];
  const linkedTrip = chiyoda.find(t => t.tripId === sample.throughTripId);
  console.log(`   サンプル: [常磐 ${sample.tripId}] (列車番号: ${sample.trainNumber}) 行先: ${sample.destination} / custom: ${sample.customDestination}`);
  console.log(`   -> [千代田 ${linkedTrip?.tripId}] (列車番号: ${linkedTrip?.trainNumber}) 行先: ${linkedTrip?.destination} / custom: ${linkedTrip?.customDestination}`);
}

// 4. 千代田 -> 小田急 直通便
const chiyodaToOdakyu = chiyoda.filter(t => t.throughLineId === 'odakyu_odawara');
console.log(`\n4. 千代田 -> 小田急 直通リンク便数: ${chiyodaToOdakyu.length}`);
if (chiyodaToOdakyu.length > 0) {
  const sample = chiyodaToOdakyu[0];
  const linkedTrip = odakyu.find(t => t.tripId === sample.throughTripId);
  console.log(`   サンプル: [千代田 ${sample.tripId}] (列車番号: ${sample.trainNumber}) 行先: ${sample.destination} / custom: ${sample.customDestination}`);
  console.log(`   -> [小田急 ${linkedTrip?.tripId}] (列車番号: ${linkedTrip?.trainNumber}) 行先: ${linkedTrip?.destination} / custom: ${linkedTrip?.customDestination}`);
}

// 5. 3線直通チェーン (小田急 -> 千代田 -> 常磐)
console.log('\n5. 3線直通チェーン検証 (小田急 -> 千代田 -> 常磐):');
let count3wayDown = 0;
for (const t1 of odakyuToChiyoda) {
  const t2 = chiyoda.find(t => t.tripId === t1.throughTripId);
  if (t2 && t2.throughLineId === 'joban') {
    const t3 = joban.find(t => t.tripId === t2.throughTripId);
    count3wayDown++;
    if (count3wayDown <= 3) {
      console.log(`   [3線直通] 小田急(${t1.tripId}, 列車番号:${t1.trainNumber}) -> 千代田(${t2.tripId}, 列車番号:${t2.trainNumber}) -> 常磐(${t3?.tripId}, 列車番号:${t3?.trainNumber}) [最終行先: ${t1.customDestination || t1.destination}]`);
    }
  }
}
console.log(`   小田急 -> 千代田 -> 常磐 3線直通便数: ${count3wayDown} 便`);

// 6. 3線直通チェーン (常磐 -> 千代田 -> 小田急)
console.log('\n6. 3線直通チェーン検証 (常磐 -> 千代田 -> 小田急):');
let count3wayUp = 0;
for (const t1 of jobanToChiyoda) {
  const t2 = chiyoda.find(t => t.tripId === t1.throughTripId);
  if (t2 && t2.throughLineId === 'odakyu_odawara') {
    const t3 = odakyu.find(t => t.tripId === t2.throughTripId);
    count3wayUp++;
    if (count3wayUp <= 3) {
      console.log(`   [3線直通] 常磐(${t1.tripId}, 列車番号:${t1.trainNumber}) -> 千代田(${t2.tripId}, 列車番号:${t2.trainNumber}) -> 小田急(${t3?.tripId}, 列車番号:${t3?.trainNumber}) [最終行先: ${t1.customDestination || t1.destination}]`);
    }
  }
}
console.log(`   常磐 -> 千代田 -> 小田急 3線直通便数: ${count3wayUp} 便`);

console.log('\n✅ ハンドオーバー検証完了！');
