// scripts/build_jr_west_wave4_dict.cjs
const fs = require('fs');
const meta = require('./jrWestWave4Metadata.cjs');

const targetStations = new Set();
meta.forEach(m => m.stationList.forEach(s => targetStations.add(s.name)));

const known = {};

// Wave 1, 2, 3 の辞書をマージ
for (const dictFile of ['jrCentralStationDictionary.cjs', 'jrWestWave2StationDictionary.cjs', 'jrWestWave3StationDictionary.cjs']) {
  if (fs.existsSync(`scripts/${dictFile}`)) {
    const d = require(`./${dictFile}`);
    Object.assign(known, d);
  }
}

// 全路線の stations.ts をマージ
const linesDir = 'src/data/lines';
if (fs.existsSync(linesDir)) {
  for (const dir of fs.readdirSync(linesDir)) {
    const stPath = `${linesDir}/${dir}/stations.ts`;
    if (fs.existsSync(stPath)) {
      const content = fs.readFileSync(stPath, 'utf8');
      const matches = content.matchAll(/"name":\s*"([^"]+)",[\s\S]*?"nameKana":\s*"([^"]+)",[\s\S]*?"nameEn":\s*"([^"]+)"/g);
      for (const m of matches) {
        if (!known[m[1]]) {
          known[m[1]] = { kana: m[2], english: m[3] };
        }
      }
    }
  }
}

const missing = [];
for (const st of targetStations) {
  if (!known[st] || !known[st].kana || !known[st].english) {
    missing.push(st);
  }
}

console.log(`Total target: ${targetStations.size}, Known: ${targetStations.size - missing.length}, Missing: ${missing.length}`);
console.log('Missing stations:', missing.join(', '));
