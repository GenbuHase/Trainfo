const fs = require('fs');
const ways = JSON.parse(fs.readFileSync('./scripts/parsed_railways.json', 'utf8'));

console.log('=== TRACK CONNECTIONS ===\n');

ways.forEach(w => {
  console.log(`WAY ${w.wayId} (${w.tags.name || 'unnamed'}, service: ${w.tags.service || 'none'}):`);
  w.coords.forEach((c, idx) => {
    console.log(`  node ${w.ndRefs[idx]}: [${c[0]}, ${c[1]}]`);
  });
});
