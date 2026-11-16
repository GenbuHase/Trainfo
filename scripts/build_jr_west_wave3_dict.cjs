// scripts/build_jr_west_wave3_dict.cjs
const fs = require('fs');
const meta = require('./jrWestWave3Metadata.cjs');

// 1. 全ユニーク駅を抽出
const targetStations = new Set();
meta.forEach(m => m.stationList.forEach(s => targetStations.add(s.name)));

console.log(`Total target stations in Wave 3: ${targetStations.size}`);

// 2. 既存の駅定義から座標とかな・英語を収集
const knownStations = {};

// 既存の Wave 2 辞書
if (fs.existsSync('scripts/jrWestWave2StationDictionary.cjs')) {
  const dict2 = require('./jrWestWave2StationDictionary.cjs');
  Object.assign(knownStations, dict2);
}

// 既存のすべての lines/*.ts の駅定義から収集
const linesDir = 'src/data/lines';
if (fs.existsSync(linesDir)) {
  const dirs = fs.readdirSync(linesDir);
  for (const dir of dirs) {
    const stPath = `${linesDir}/${dir}/stations.ts`;
    if (fs.existsSync(stPath)) {
      const content = fs.readFileSync(stPath, 'utf8');
      const matches = content.matchAll(/"name":\s*"([^"]+)",[\s\S]*?"nameKana":\s*"([^"]+)",[\s\S]*?"nameEn":\s*"([^"]+)",[\s\S]*?"lat":\s*([0-9.]+),[\s\S]*?"lng":\s*([0-9.]+)/g);
      for (const m of matches) {
        const name = m[1];
        if (!knownStations[name]) {
          knownStations[name] = {
            kana: m[2],
            english: m[3],
            coordinates: [parseFloat(m[4]), parseFloat(m[5])]
          };
        }
      }
    }
  }
}

const missing = [];
for (const st of targetStations) {
  if (!knownStations[st] || !knownStations[st].kana || !knownStations[st].english) {
    missing.push(st);
  }
}

console.log(`Known: ${targetStations.size - missing.length}, Missing: ${missing.length}`);
if (missing.length > 0) {
  console.log('Missing stations:', missing.join(', '));
}
