const fs = require('fs');
const path = require('path');

function stationNames(file) {
  const text = fs.readFileSync(file, 'utf8');
  const names = new Set();
  for (const m of text.matchAll(/"name": "([^"]+)"/g)) names.add(m[1]);
  return names;
}

const files = {
  ou_fukushima_shinjo: 'src/data/lines/ou_fukushima_shinjo/stations.ts',
  ou_shinjo_omagari: 'src/data/lines/ou_shinjo_omagari/stations.ts',
  ou_omagari_akita: 'src/data/lines/ou_omagari_akita/stations.ts',
  ou_akita_aomori: 'src/data/lines/ou_akita_aomori/stations.ts',
};

function norm(name) {
  return (name || '').replace(/[（(].*$/, '').replace(/ヶ/g, 'ケ');
}

for (const [lineId, stationFile] of Object.entries(files)) {
  const known = stationNames(path.resolve(stationFile));
  const detailsPath = path.resolve('scripts/cache/yahoo', lineId, 'all_train_details.json');
  if (!fs.existsSync(detailsPath)) continue;
  const details = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));
  const unknown = new Map();
  for (const d of details) {
    for (const s of d.stopStation || []) {
      const n = norm(s.stationName);
      if (known.has(n)) continue;
      unknown.set(n, (unknown.get(n) || 0) + 1);
    }
  }
  const rows = [...unknown.entries()].sort((a, b) => b[1] - a[1]);
  console.log(`\n${lineId} unknown stop names:`);
  for (const [n, c] of rows.slice(0, 30)) console.log(`  ${c}\t${n}`);
}
