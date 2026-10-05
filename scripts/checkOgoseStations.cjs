const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cache/osm_ogose_raw.json'), 'utf8'));

const rel = raw.elements.find(e => e.type === 'relation' && e.id === 11700879);
const ways = new Map();
const nodes = new Map();

for (const el of raw.elements) {
  if (el.type === 'way') ways.set(el.id, el);
  if (el.type === 'node') nodes.set(el.id, el);
}

const wayMembers = rel.members.filter(m => m.type === 'way');
const nodeMembers = rel.members.filter(m => m.type === 'node');

console.log('--- Relation Node Members ---');
nodeMembers.forEach(m => {
  const n = nodes.get(m.ref);
  console.log(`Role: ${m.role}, Node: ${m.ref}, Name: ${n && n.tags ? n.tags.name : 'no tags'}, Lat: ${n ? n.lat : ''}, Lon: ${n ? n.lon : ''}`);
});

let continuousNodes = [];
for (let i = 0; i < wayMembers.length; i++) {
  const member = wayMembers[i];
  const way = ways.get(member.ref);
  const wNodes = way.nodes;
  if (i === 0) {
    continuousNodes = [...wNodes];
  } else {
    const lastNode = continuousNodes[continuousNodes.length - 1];
    if (wNodes[0] === lastNode) {
      continuousNodes.push(...wNodes.slice(1));
    } else if (wNodes[wNodes.length - 1] === lastNode) {
      continuousNodes.push(...wNodes.slice().reverse().slice(1));
    }
  }
}

function getDistance(c1, c2) {
  const R = 6371000;
  const dLat = (c2[0] - c1[0]) * Math.PI / 180;
  const dLng = (c2[1] - c1[1]) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(c1[0] * Math.PI / 180) * Math.cos(c2[0] * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// 8駅の一覧
const stations = [
  { id: 'TJ-26', number: 26, name: '坂戸', nameKana: 'さかど', nameEn: 'Sakado' },
  { id: 'TJ-41', number: 41, name: '一本松', nameKana: 'いっぽんまつ', nameEn: 'Ippommatsu' },
  { id: 'TJ-42', number: 42, name: '西大家', nameKana: 'にしおおや', nameEn: 'Nishi-Oya' },
  { id: 'TJ-43', number: 43, name: '川角', nameKana: 'かわかど', nameEn: 'Kawakado' },
  { id: 'TJ-44', number: 44, name: '武州長瀬', nameKana: 'ぶしゅうながせ', nameEn: 'Bushu-Nagase' },
  { id: 'TJ-45', number: 45, name: '東毛呂', nameKana: 'ひがしもろ', nameEn: 'Higashi-Moro' },
  { id: 'TJ-46', number: 46, name: '武州唐沢', nameKana: 'ぶしゅうからさわ', nameEn: 'Bushu-Karasawa' },
  { id: 'TJ-47', number: 47, name: '越生', nameKana: 'おごせ', nameEn: 'Ogose' },
];

console.log('\n--- Finding nearest continuous node index for each station ---');
const continuousCoords = continuousNodes.map(id => {
  const n = nodes.get(id);
  return [n.lat, n.lon];
});

stations.forEach(st => {
  // nodeMembers または station nodes から探す
  let bestDist = Infinity;
  let bestIdx = -1;
  let bestNodeId = null;

  // まず nodeMembers にあるか
  const targetMember = nodeMembers.find(m => {
    const n = nodes.get(m.ref);
    return n && n.tags && n.tags.name && n.tags.name.includes(st.name);
  });

  let stCoord = null;
  if (targetMember) {
    const n = nodes.get(targetMember.ref);
    stCoord = [n.lat, n.lon];
  } else {
    // raw から探す
    const match = raw.elements.find(e => e.type === 'node' && e.tags && e.tags.name === st.name && e.lat > 35.8 && e.lat < 36.1 && e.lon > 139.2 && e.lon < 139.5);
    if (match) stCoord = [match.lat, match.lon];
  }

  if (stCoord) {
    for (let i = 0; i < continuousCoords.length; i++) {
      const d = getDistance(stCoord, continuousCoords[i]);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
        bestNodeId = continuousNodes[i];
      }
    }
    console.log(`${st.name}: stCoord=[${stCoord[0]}, ${stCoord[1]}], nearest continuous idx=${bestIdx}, node=${bestNodeId}, dist=${bestDist.toFixed(1)}m`);
  } else {
    console.log(`${st.name}: coordinate NOT FOUND`);
  }
});
