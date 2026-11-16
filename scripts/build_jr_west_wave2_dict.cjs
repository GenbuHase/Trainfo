const fs = require('fs');
const path = require('path');
const { LINE_SPECS_WAVE2 } = require('./jrWestWave2Metadata.cjs');

const repoRoot = path.resolve(__dirname, '..');
const existingDict = {};

// 既存路線から駅名辞書を自動収集
const linesDir = path.join(repoRoot, 'src/data/lines');
for (const lDir of fs.readdirSync(linesDir)) {
  const stPath = path.join(linesDir, lDir, 'stations.ts');
  if (fs.existsSync(stPath)) {
    const content = fs.readFileSync(stPath, 'utf8');
    const matches = content.matchAll(/"name":\s*"([^"]+)",\s*"nameKana":\s*"([^"]+)",\s*"nameEn":\s*"([^"]+)"/g);
    for (const m of matches) {
      if (!existingDict[m[1]]) {
        existingDict[m[1]] = { kana: m[2], en: m[3] };
      }
    }
  }
}

// Wave 2 に必要な駅の辞書
const wave2Dict = {};
const missing = [];

for (const spec of Object.values(LINE_SPECS_WAVE2)) {
  for (const s of spec.stations) {
    if (existingDict[s]) {
      wave2Dict[s] = existingDict[s];
    } else {
      missing.push(s);
    }
  }
}

console.log('Existing stations matched:', Object.keys(wave2Dict).length);
console.log('Missing stations:', missing.length, missing);
