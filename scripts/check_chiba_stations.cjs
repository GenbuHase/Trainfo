const fs = require('fs');
const path = require('path');
const linesDir = 'src/data/lines';
const dirs = fs.readdirSync(linesDir);

for (const d of dirs) {
  const stPath = path.join(linesDir, d, 'stations.ts');
  if (!fs.existsSync(stPath)) continue;
  const content = fs.readFileSync(stPath, 'utf8');
  const m = content.match(/\[[\s\S]*\]/);
  if (!m) continue;
  try {
    const sts = eval(m[0]);
    const chiba = sts.find(s => s.name === '千葉');
    if (chiba) {
      console.log(`[${d}] ${chiba.id} (${chiba.name}): lat=${chiba.lat}, lng=${chiba.lng}`);
    }
  } catch (e) {}
}
