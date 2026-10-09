const fs = require('fs');
const groups = JSON.parse(fs.readFileSync('scripts/scratch_groups.json', 'utf8'));

console.log('=== Checking all stations ===');
for (const [code, data] of Object.entries(groups)) {
  const sName = data.name;
  const sGroups = [];
  for (const r of data.routes) {
    for (const g of (r.railGroup || [])) {
      sGroups.push(`${r.railName}: ${g.groupId} (${g.direction})`);
    }
  }
  console.log(`${sName} (${code}):`, sGroups.join(' | '));
}
