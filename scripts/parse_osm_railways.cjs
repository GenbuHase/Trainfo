const fs = require('fs');

const xml = fs.readFileSync('./scripts/osm_map.osm', 'utf8');

const nodes = new Map();
const nodeRegex = /<node\s+id="(\d+)"[^>]*lat="([^"]+)"[^>]*lon="([^"]+)"/g;
let match;
while ((match = nodeRegex.exec(xml)) !== null) {
  nodes.set(match[1], [parseFloat(match[2]), parseFloat(match[3])]);
}
console.log(`Parsed ${nodes.size} nodes`);

const wayRegex = /<way\s+id="(\d+)"[\s\S]*?<\/way>/g;
const ways = [];
while ((match = wayRegex.exec(xml)) !== null) {
  const wayStr = match[0];
  const wayId = match[1];
  if (!wayStr.includes('k="railway"')) continue;

  const ndRefs = [];
  const ndRegex = /<nd\s+ref="(\d+)"/g;
  let ndMatch;
  while ((ndMatch = ndRegex.exec(wayStr)) !== null) {
    ndRefs.push(ndMatch[1]);
  }

  const tags = {};
  const tagRegex = /<tag\s+k="([^"]+)"\s+v="([^"]+)"/g;
  let tagMatch;
  while ((tagMatch = tagRegex.exec(wayStr)) !== null) {
    tags[tagMatch[1]] = tagMatch[2];
  }

  const coords = ndRefs.map(id => nodes.get(id)).filter(Boolean);
  ways.push({
    wayId,
    tags,
    ndRefs,
    coords
  });
}

console.log(`Found ${ways.length} railway ways:`);
ways.filter(w => w.tags.railway === 'rail').forEach(w => {
  console.log(`Way ${w.wayId}: name="${w.tags.name || ''}", service="${w.tags.service || ''}", operator="${w.tags.operator || ''}", nodes=${w.coords.length}`);
  if (w.coords.length > 0) {
    console.log(`  first: [${w.coords[0][0]}, ${w.coords[0][1]}], last: [${w.coords[w.coords.length-1][0]}, ${w.coords[w.coords.length-1][1]}]`);
  }
});

fs.writeFileSync('./scripts/parsed_railways.json', JSON.stringify(ways.filter(w => w.tags.railway === 'rail'), null, 2));
