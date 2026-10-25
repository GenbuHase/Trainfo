const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, 'cache/yahoo/ou_fukushima_shinjo/stations');

function summarize(file) {
  const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  const tt = data.timetableItem;
  if (!tt) {
    console.log(file, 'no timetable');
    return;
  }
  const dest = new Map((tt.master?.destination || []).map(d => [d.id, d.name]));
  const kind = new Map((tt.master?.kind || []).map(k => [k.id, k.name]));
  const counts = new Map();
  let n = 0;
  for (const h of tt.hourTimeTable || []) {
    for (const t of h.minTimeTable || []) {
      n++;
      const name = `${kind.get(t.kindId) || t.kindId} -> ${dest.get(t.destinationId) || t.dest || '?'}`;
      counts.set(name, (counts.get(name) || 0) + 1);
    }
  }
  console.log(`\n${file} trains=${n}`);
  const rows = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  for (const [k, v] of rows.slice(0, 25)) console.log(`  ${v}\t${k}`);
}

summarize('station_OFS-18_341_k1.json');
summarize('station_OFS-18_340_k1.json');
summarize('station_OFS-17_341_k1.json');
summarize('station_OFS-19_341_k1.json');
