const fs = require('fs');
const path = require('path');

console.log('=== 🚃 JR奥羽本線 直通・ハンドオーバー検証テスト ===\n');

const soPath = path.join(__dirname, '../src/data/lines/ou_shinjo_omagari/globalTimetable.json');
const oaPath = path.join(__dirname, '../src/data/lines/ou_omagari_akita/globalTimetable.json');
const aaPath = path.join(__dirname, '../src/data/lines/ou_akita_aomori/globalTimetable.json');

const soTrips = JSON.parse(fs.readFileSync(soPath, 'utf8'));
const oaTrips = JSON.parse(fs.readFileSync(oaPath, 'utf8'));
const aaTrips = JSON.parse(fs.readFileSync(aaPath, 'utf8'));

console.log(`総便数: 新庄〜大曲=${soTrips.length}, 大曲〜秋田=${oaTrips.length}, 秋田〜青森=${aaTrips.length}\n`);

// 1. 新庄〜大曲 -> 大曲〜秋田 (下り 大曲接続)
const soToOa = soTrips.filter(t => t.throughLineId === 'ou_omagari_akita');
console.log(`1. 新庄〜大曲 -> 大曲〜秋田 下り直通便数: ${soToOa.length} 便`);
let syncErrors1 = 0;
for (const t1 of soToOa) {
  const t2 = oaTrips.find(t => t.tripId === t1.throughTripId);
  if (!t2) {
    console.error(`  [ERROR: BROKEN_LINK] ${t1.tripId} -> ${t1.throughTripId} が見つかりません`);
    continue;
  }
  // 境界駅の時刻同期検証
  const arrTime = t1.stops[t1.stops.length - 1].arrivalTime;
  const depTime = t2.stops[0].departureTime;
  if (!arrTime || !depTime) {
    syncErrors1++;
  }
}
if (soToOa.length > 0) {
  const sample = soToOa[0];
  const linked = oaTrips.find(t => t.tripId === sample.throughTripId);
  console.log(`   サンプル: [新庄〜大曲 ${sample.tripId}] (列車番号: ${sample.trainNumber}) [始発: ${sample.customOrigin || sample.originStationId} -> 行先: ${sample.customDestination || sample.destinationStationId}] 大曲着:${sample.stops[sample.stops.length - 1].arrivalTime}`);
  console.log(`   -> [大曲〜秋田 ${linked?.tripId}] (列車番号: ${linked?.trainNumber}) [始発: ${linked?.customOrigin || linked?.originStationId} -> 行先: ${linked?.customDestination || linked?.destinationStationId}] 大曲発:${linked?.stops[0].departureTime}`);
}
console.log(`   境界駅時刻同期エラー: ${syncErrors1} 件\n`);

// 2. 大曲〜秋田 -> 新庄〜大曲 (上り 大曲接続)
const oaToSo = oaTrips.filter(t => t.throughLineId === 'ou_shinjo_omagari');
console.log(`2. 大曲〜秋田 -> 新庄〜大曲 上り直通便数: ${oaToSo.length} 便`);
let syncErrors2 = 0;
for (const t1 of oaToSo) {
  const t2 = soTrips.find(t => t.tripId === t1.throughTripId);
  if (!t2) {
    console.error(`  [ERROR: BROKEN_LINK] ${t1.tripId} -> ${t1.throughTripId} が見つかりません`);
    continue;
  }
  const arrTime = t1.stops[t1.stops.length - 1].arrivalTime;
  const depTime = t2.stops[0].departureTime;
  if (!arrTime || !depTime) {
    syncErrors2++;
  }
}
if (oaToSo.length > 0) {
  const sample = oaToSo[0];
  const linked = soTrips.find(t => t.tripId === sample.throughTripId);
  console.log(`   サンプル: [大曲〜秋田 ${sample.tripId}] (列車番号: ${sample.trainNumber}) [始発: ${sample.customOrigin || sample.originStationId} -> 行先: ${sample.customDestination || sample.destinationStationId}] 大曲着:${sample.stops[sample.stops.length - 1].arrivalTime}`);
  console.log(`   -> [新庄〜大曲 ${linked?.tripId}] (列車番号: ${linked?.trainNumber}) [始発: ${linked?.customOrigin || linked?.originStationId} -> 行先: ${linked?.customDestination || linked?.destinationStationId}] 大曲発:${linked?.stops[0].departureTime}`);
}
console.log(`   境界駅時刻同期エラー: ${syncErrors2} 件\n`);

// 3. 大曲〜秋田 -> 秋田〜青森 (下り 秋田接続)
const oaToAa = oaTrips.filter(t => t.throughLineId === 'ou_akita_aomori');
console.log(`3. 大曲〜秋田 -> 秋田〜青森 下り直通便数: ${oaToAa.length} 便`);
for (const sample of oaToAa) {
  const linked = aaTrips.find(t => t.tripId === sample.throughTripId);
  console.log(`   便: [大曲〜秋田 ${sample.tripId}] (列車番号: ${sample.trainNumber}) [始発: ${sample.customOrigin || sample.originStationId} -> 行先: ${sample.customDestination || sample.destinationStationId}] 秋田着:${sample.stops[sample.stops.length - 1].arrivalTime}`);
  console.log(`   -> [秋田〜青森 ${linked?.tripId}] (列車番号: ${linked?.trainNumber}) [始発: ${linked?.customOrigin || linked?.originStationId} -> 行先: ${linked?.customDestination || linked?.destinationStationId}] 秋田発:${linked?.stops[0].departureTime}`);
}

// 4. 3線貫通直通チェーン検証 (新庄〜大曲 -> 大曲〜秋田 -> 秋田〜青森)
console.log('\n4. 3線貫通直通チェーン検証 (新庄〜大曲 -> 大曲〜秋田 -> 秋田〜青森):');
let count3way = 0;
for (const t1 of soToOa) {
  const t2 = oaTrips.find(t => t.tripId === t1.throughTripId);
  if (t2 && t2.throughLineId === 'ou_akita_aomori') {
    const t3 = aaTrips.find(t => t.tripId === t2.throughTripId);
    count3way++;
    console.log(`   [3線貫通] 新庄〜大曲(${t1.tripId}, 列車番号:${t1.trainNumber})`);
    console.log(`     -> 大曲〜秋田(${t2.tripId}, 列車番号:${t2.trainNumber})`);
    console.log(`     -> 秋田〜青森(${t3?.tripId}, 列車番号:${t3?.trainNumber})`);
    console.log(`     [全区間始発: ${t1.customOrigin || t1.originStationId} -> 最終行先: ${t1.customDestination || t1.destinationStationId}]`);
  }
}
console.log(`   3線貫通便数: ${count3way} 便\n`);

console.log('✅ 奥羽本線 直通・ハンドオーバー検証テストが正常に完了しました！');
