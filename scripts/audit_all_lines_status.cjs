const fs = require('fs');
const path = require('path');

const linesDir = path.resolve('src/data/lines');
const lineDirs = fs.readdirSync(linesDir).filter(f => fs.statSync(path.join(linesDir, f)).isDirectory());

console.log(`=== 全 ${lineDirs.length} 路線 列車番号 & 時刻表網羅的ステータス監査 ===\n`);

const results = [];

for (const lineId of lineDirs) {
  const globalPath = path.join(linesDir, lineId, 'globalTimetable.json');
  const stationPath = path.join(linesDir, lineId, 'stationTimetables.json');

  if (!fs.existsSync(globalPath)) {
    results.push({ lineId, status: 'NO_GLOBAL_TIMETABLE', total: 0, official: 0, fallback: 0, rate: 0 });
    continue;
  }

  const trips = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
  const total = trips.length;

  let officialCount = 0;
  let fallbackCount = 0;
  const samples = [];

  for (const t of trips) {
    const origId = t.trainId || t.tripId.split('_').pop();
    const no = t.trainNumber;

    // 公式列車番号判定:
    // 1. レ または M, T, K, S, E, A, B, C, D, H, F, G, Y 等の英字を含む
    // 2. または origId と異なる番号
    // 3. または 相鉄や東急のように純数字だが origId と異なり公式形式（例: 東急6桁 022241、相鉄4桁 6287 等）
    const isOfficial = Boolean(no && (no !== origId || /[A-Za-zレ]/.test(no) || /^\d{6}$/.test(no)));

    if (isOfficial) {
      officialCount++;
    } else {
      fallbackCount++;
    }

    if (samples.length < 3 && no) {
      samples.push(`${no}${no === origId ? '(YahooID)' : ''}`);
    }
  }

  const rate = total > 0 ? ((officialCount / total) * 100).toFixed(1) : '0';
  const hasStationTimetables = fs.existsSync(stationPath);

  results.push({
    lineId,
    total,
    official: officialCount,
    fallback: fallbackCount,
    rate: Number(rate),
    hasStationTimetables,
    samples: samples.join(', ')
  });
}

// レート順（低い順）にソートしてボトルネックを可視化
results.sort((a, b) => a.rate - b.rate);

console.log('| 路線ID | トリップ数 | 公式列車番号 | フォールバック | 反映率 | 駅時刻表 | サンプル |');
console.log('| :--- | :---: | :---: | :---: | :---: | :---: | :--- |');
for (const r of results) {
  const mark = r.rate >= 90 ? '🟢' : r.rate >= 40 ? '🟡' : '🔴';
  console.log(`| ${mark} \`${r.lineId}\` | ${r.total} | ${r.official} | ${r.fallback} | ${r.rate}% | ${r.hasStationTimetables ? 'あり' : 'なし'} | ${r.samples} |`);
}
