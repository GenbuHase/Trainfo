const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/cache/osm_sotetsu_tokyu_raw.json', 'utf8'));

const nodeMap = new Map();
const wayMap = new Map();
for (const el of raw.elements) {
  if (el.type === 'node') nodeMap.set(el.id, [el.lat, el.lon]);
  else if (el.type === 'way') wayMap.set(el.id, el);
}

function dist(p1, p2) {
  const dy = (p1[0] - p2[0]) * 111320;
  const dx = (p1[1] - p2[1]) * 111320 * Math.cos((p1[0] * Math.PI) / 180);
  return Math.sqrt(dx * dx + dy * dy);
}

const rel = raw.elements.find(e => e.id === 1968180);
const wayMembers = rel.members.filter(m => m.type === 'way');
// Ways 37 through 65 are Futamatagawa to Shonandai
const trackWays = wayMembers.slice(37, 66).map(m => wayMap.get(m.ref));

const continuousNodes = [];
for (let i = 0; i < trackWays.length; i++) {
  const w = trackWays[i];
  const nodes = w.nodes;
  if (i === 0) {
    continuousNodes.push(...nodes);
  } else {
    const lastNode = continuousNodes[continuousNodes.length - 1];
    if (nodes[0] === lastNode) {
      continuousNodes.push(...nodes.slice(1));
    } else if (nodes[nodes.length - 1] === lastNode) {
      continuousNodes.push(...[...nodes].reverse().slice(1));
    } else {
      console.warn(`Way ${i} does not connect!`);
    }
  }
}

console.log(`Continuous nodes: ${continuousNodes.length}`);
const coords = continuousNodes.map(nid => nodeMap.get(nid)).filter(Boolean);
console.log(`Start coord:`, coords[0], `End coord:`, coords[coords.length - 1]);

const izuminoStations = [
  { name: '二俣川', coord: [35.4633846, 139.5322757] },
  { name: '南万騎が原', coord: [35.4525798, 139.5263862] },
  { name: '緑園都市', coord: [35.4394513, 139.5219084] },
  { name: '弥生台', coord: [35.4299039, 139.5062629] },
  { name: 'いずみ野', coord: [35.4295908, 139.495126] },
  { name: 'いずみ中央', coord: [35.4152581, 139.4873447] },
  { name: 'ゆめが丘', coord: [35.4056861, 139.4825083] },
  { name: '湘南台', coord: [35.3962433, 139.4664505] },
];

console.log('--- Snapping Izumino stations ---');
let lastIdx = 0;
izuminoStations.forEach(st => {
  let bestIdx = 0;
  let bestDist = Infinity;
  for (let idx = 0; idx < coords.length; idx++) {
    const d = dist(st.coord, coords[idx]);
    if (d < bestDist) {
      bestDist = d;
      bestIdx = idx;
    }
  }
  console.log(`${st.name}: idx=${bestIdx}/${coords.length}, dist=${bestDist.toFixed(1)}m, advance=${bestIdx >= lastIdx}`);
  lastIdx = bestIdx;
});
