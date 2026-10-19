const fs = require('fs');
const path = require('path');

// 全併結ペアの定義を coupleTobuExpress.cjs から読み込む
const coupleScript = fs.readFileSync('scripts/common/throughLinker/coupleTobuExpress.cjs', 'utf8');

// 全路線の globalTimetable.json を確認
const skytree = JSON.parse(fs.readFileSync('src/data/lines/tobu_skytree/globalTimetable.json', 'utf8'));
const nikko = JSON.parse(fs.readFileSync('src/data/lines/tobu_nikko/globalTimetable.json', 'utf8'));
const kinugawa = JSON.parse(fs.readFileSync('src/data/lines/tobu_kinugawa/globalTimetable.json', 'utf8'));
const yagan = JSON.parse(fs.readFileSync('src/data/lines/yagan/globalTimetable.json', 'utf8'));
const aizu = JSON.parse(fs.readFileSync('src/data/lines/aizu/globalTimetable.json', 'utf8'));

console.log('=== 東武併結特急 coupling 監査 ===');

// 下りペア
const DOWN_PAIRS = [
  { name: 'けごん1号/会津101号', nikkoId: '25128', otherId: '25154', otherDest: '会津田島' },
  { name: 'けごん11号/会津111号', nikkoId: '25116', otherId: '25151', otherDest: '会津田島' },
  { name: 'けごん17号/会津117号', nikkoId: '25120', otherId: '25152', otherDest: '会津田島' },
  { name: 'けごん23号/きぬ123号', nikkoId: '25123', otherId: '116490', otherDest: '鬼怒川温泉' },
  { name: 'けごん29号/会津129号', nikkoId: '25124', otherId: '25153', otherDest: '会津田島' },
];

// 上りペア
const UP_PAIRS = [
  { name: 'けごん14号/きぬ114号', nikkoId: '38046', otherId: '116504' },
  { name: 'けごん22号/会津122号', nikkoId: '38050', otherId: '42865' },
  { name: 'けごん28号/会津128号', nikkoId: '38055', otherId: '42866' },
  { name: 'けごん40号/会津140号', nikkoId: '38065', otherId: '42868' },
  { name: 'けごん48号/きぬ148号', nikkoId: '38060', otherId: '116501' },
];

function findTrip(list, isHoliday, dir, targetId) {
  return list.find(t =>
    t.isHoliday === isHoliday &&
    t.direction === dir &&
    (t.trainId === targetId || t.trainNumber === targetId || (t.tripId && t.tripId.endsWith('_' + targetId)))
  );
}

// 下りペアの確認
console.log('\n--- 下りペア確認 ---');
for (const isHoliday of [false, true]) {
  const day = isHoliday ? '休日' : '平日';
  console.log(`\n【${day}】`);
  for (const pair of DOWN_PAIRS) {
    // スカイツリーライン
    const skyN = findTrip(skytree, isHoliday, 'outbound', pair.nikkoId);
    const skyO = findTrip(skytree, isHoliday, 'outbound', pair.otherId);
    // 日光線
    const nikkoN = findTrip(nikko, isHoliday, 'outbound', pair.nikkoId);
    const nikkoO = findTrip(nikko, isHoliday, 'outbound', pair.otherId);
    // 鬼怒川線 (other の直通先)
    const kinuO = findTrip(kinugawa, isHoliday, 'outbound', pair.otherId);
    const yaganO = findTrip(yagan, isHoliday, 'outbound', pair.otherId);
    const aizuO = findTrip(aizu, isHoliday, 'outbound', pair.otherId);

    console.log(`[下り] ${pair.name}:`);
    console.log(`  浅草発車(スカイツリーライン):`);
    console.log(`    本編成: ${skyN?.trainNumber} (${skyN?.customDestination}) cars=${skyN?.cars}, coupling=${skyN?.coupling?.role}, 相手=${skyN?.coupling?.coupledTrainNumber}(${skyN?.coupling?.coupledDestination})`);
    console.log(`    相手編成: ${skyO?.trainNumber} (${skyO?.customDestination}) cars=${skyO?.cars}, coupling=${skyO?.coupling?.role}, 相手=${skyO?.coupling?.coupledTrainNumber}(${skyO?.coupling?.coupledDestination})`);
    console.log(`  日光線内:`);
    console.log(`    本編成: ${nikkoN?.trainNumber} (${nikkoN?.customDestination}) cars=${nikkoN?.cars}, coupling=${nikkoN?.coupling?.role}, 相手=${nikkoN?.coupling?.coupledTrainNumber}`);
    console.log(`    相手編成: ${nikkoO?.trainNumber} (${nikkoO?.customDestination}) cars=${nikkoO?.cars}, coupling=${nikkoO?.coupling?.role}, 相手=${nikkoO?.coupling?.coupledTrainNumber}`);
    console.log(`  鬼怒川線内(相手編成): ${kinuO?.trainNumber} (${kinuO?.customDestination}) cars=${kinuO?.cars}`);
    if (yaganO) console.log(`  野岩鉄道内(相手編成): ${yaganO?.trainNumber} (${yaganO?.customDestination}) cars=${yaganO?.cars}`);
    if (aizuO) console.log(`  会津鉄道内(相手編成): ${aizuO?.trainNumber} (${aizuO?.customDestination}) cars=${aizuO?.cars}`);
  }
}

// 上りペアの確認
console.log('\n--- 上りペア確認 ---');
for (const isHoliday of [false, true]) {
  const day = isHoliday ? '休日' : '平日';
  console.log(`\n【${day}】`);
  for (const pair of UP_PAIRS) {
    // 日光線
    const nikkoN = findTrip(nikko, isHoliday, 'inbound', pair.nikkoId);
    const nikkoO = findTrip(nikko, isHoliday, 'inbound', pair.otherId);
    // スカイツリーライン
    const skyN = findTrip(skytree, isHoliday, 'inbound', pair.nikkoId);
    const skyO = findTrip(skytree, isHoliday, 'inbound', pair.otherId);
    // 鬼怒川線 (other の直通元)
    const kinuO = findTrip(kinugawa, isHoliday, 'inbound', pair.otherId);
    const yaganO = findTrip(yagan, isHoliday, 'inbound', pair.otherId);
    const aizuO = findTrip(aizu, isHoliday, 'inbound', pair.otherId);

    console.log(`[上り] ${pair.name}:`);
    if (aizuO) console.log(`  会津鉄道内(相手編成): ${aizuO?.trainNumber} (${aizuO?.customDestination}) cars=${aizuO?.cars}`);
    if (yaganO) console.log(`  野岩鉄道内(相手編成): ${yaganO?.trainNumber} (${yaganO?.customDestination}) cars=${yaganO?.cars}`);
    console.log(`  鬼怒川線内(相手編成): ${kinuO?.trainNumber} (${kinuO?.customDestination}) cars=${kinuO?.cars}`);
    console.log(`  日光線内:`);
    console.log(`    本編成: ${nikkoN?.trainNumber} (${nikkoN?.customDestination}) cars=${nikkoN?.cars}, coupling=${nikkoN?.coupling?.role}`);
    console.log(`    相手編成: ${nikkoO?.trainNumber} (${nikkoO?.customDestination}) cars=${nikkoO?.cars}, coupling=${nikkoO?.coupling?.role}`);
    console.log(`  スカイツリーライン内:`);
    console.log(`    本編成: ${skyN?.trainNumber} (${skyN?.customDestination}) cars=${skyN?.cars}, coupling=${skyN?.coupling?.role}`);
    console.log(`    相手編成: ${skyO?.trainNumber} (${skyO?.customDestination}) cars=${skyO?.cars}, coupling=${skyO?.coupling?.role}`);
  }
}
