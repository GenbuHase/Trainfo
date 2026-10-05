const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cache/osm_ogose_raw.json'), 'utf8'));

const rel = raw.elements.find(e => e.type === 'relation' && e.id === 11700879);
console.log('Relation 11700879 members count:', rel.members.length);

const wayMembers = rel.members.filter(m => m.type === 'way');
const nodeMembers = rel.members.filter(m => m.type === 'node');
console.log('Way members:', wayMembers.length);
console.log('Node members:', nodeMembers.length);

const ways = new Map();
const nodes = new Map();

for (const el of raw.elements) {
  if (el.type === 'way') ways.set(el.id, el);
  if (el.type === 'node') nodes.set(el.id, el);
}

// 連続ノード探索
let continuousNodes = [];
let currentWayId = null;

for (let i = 0; i < wayMembers.length; i++) {
  const member = wayMembers[i];
  const way = ways.get(member.ref);
  if (!way) {
    console.warn(`Way ${member.ref} not found!`);
    continue;
  }
  const wNodes = way.nodes;
  if (i === 0) {
    continuousNodes = [...wNodes];
  } else {
    const lastNode = continuousNodes[continuousNodes.length - 1];
    if (wNodes[0] === lastNode) {
      continuousNodes.push(...wNodes.slice(1));
    } else if (wNodes[wNodes.length - 1] === lastNode) {
      continuousNodes.push(...wNodes.slice().reverse().slice(1));
    } else {
      console.log(`Gap between way ${wayMembers[i-1].ref} and ${member.ref}: lastNode=${lastNode}, way starts=${wNodes[0]}, ends=${wNodes[wNodes.length - 1]}`);
      // 距離を計算してみる
      const lastCoord = nodes.get(lastNode);
      const startCoord = nodes.get(wNodes[0]);
      const endCoord = nodes.get(wNodes[wNodes.length - 1]);
      console.log(`  lastCoord: ${lastCoord.lat}, ${lastCoord.lon}`);
      console.log(`  startCoord: ${startCoord ? startCoord.lat + ',' + startCoord.lon : 'missing'}`);
      console.log(`  endCoord: ${endCoord ? endCoord.lat + ',' + endCoord.lon : 'missing'}`);
      // 単線/複線分岐などでギャップがあるか
    }
  }
}

console.log('Total continuous nodes collected:', continuousNodes.length);
const startNode = nodes.get(continuousNodes[0]);
const endNode = nodes.get(continuousNodes[continuousNodes.length - 1]);
console.log('Start node:', continuousNodes[0], startNode ? `${startNode.lat}, ${startNode.lon}` : 'N/A');
console.log('End node:', continuousNodes[continuousNodes.length - 1], endNode ? `${endNode.lat}, ${endNode.lon}` : 'N/A');
