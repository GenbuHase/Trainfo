const fs = require('fs');
const path = require('path');

const linesDir = path.resolve(__dirname, '../src/data/lines');
const entries = fs.readdirSync(linesDir, { withFileTypes: true });

const idMap = new Map(); // id -> [{ lineId, name }]

for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  const lineId = entry.name;
  const stFile = path.join(linesDir, lineId, 'stations.ts');
  if (!fs.existsSync(stFile)) continue;

  const content = fs.readFileSync(stFile, 'utf8');
  const regex = /["']?id["']?\s*:\s*['"]([^'"]+)['"][\s\S]*?["']?name["']?\s*:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const id = m[1];
    const name = m[2];
    if (!idMap.has(id)) idMap.set(id, []);
    idMap.get(id).push({ lineId, name });
  }
}

console.log('Total unique station IDs:', idMap.size);

const duplicates = [];
for (const [id, list] of idMap.entries()) {
  if (list.length > 1) {
    const names = new Set(list.map(x => x.name));
    duplicates.push({ id, count: list.length, names: Array.from(names), lines: list.map(x => `${x.lineId}(${x.name})`) });
  }
}

console.log(`\nFound ${duplicates.length} duplicate station IDs:`);
for (const d of duplicates) {
  // 同名駅以外（別名駅でIDが重複している致命的衝突）をハイライト
  const isDifferentStation = d.names.length > 1;
  const flag = isDifferentStation ? '❌ FATAL COLLISION:' : '⚠️ Shared Node:';
  console.log(`${flag} ID '${d.id}' -> ${d.lines.join(', ')}`);
}
