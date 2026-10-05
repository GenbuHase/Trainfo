const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync('scripts/cache/osm_kawagoe_raw.json', 'utf8'));
const rel = raw.elements.find(e => e.type === 'relation' && e.id === 11953294);
const ways = new Map(raw.elements.filter(e => e.type === 'way').map(w => [w.id, w]));
const nodes = new Map(raw.elements.filter(e => e.type === 'node').map(n => [n.id, n]));

// 連続ノード配列の構築
let continuousNodes = [];
rel.members.filter(m => m.type === 'way').forEach((m, i) => {
  const w = ways.get(m.ref);
  if (i === 0) continuousNodes = [...w.nodes];
  else {
    const last = continuousNodes[continuousNodes.length - 1];
    if (w.nodes[0] === last) continuousNodes.push(...w.nodes.slice(1));
    else if (w.nodes[w.nodes.length - 1] === last) continuousNodes.push(...w.nodes.slice().reverse().slice(1));
  }
});

// stations.ts のロード
const stationsFile = fs.readFileSync('src/data/lines/kawagoe/stations.ts', 'utf8');
const match = stationsFile.match(/export const KAWAGOE_STATIONS: Station\[] =\s*(\[[\s\S]*?\]);\s*$/m);
const stations = eval(match[1]);
const stMap = new Map(stations.map(s => [s.id, s]));

// 区間定義: [fromId, toId, startIdx, endIdx]
const sections = [
  { fromId: 'JA-31', toId: 'JA-32', startIdx: 351, endIdx: 400 },
  { fromId: 'JA-32', toId: 'JA-33', startIdx: 400, endIdx: 432 },
  { fromId: 'JA-33', toId: 'JA-34', startIdx: 432, endIdx: 449 },
  { fromId: 'JA-34', toId: 'JA-35', startIdx: 449, endIdx: 485 },
  { fromId: 'JA-35', toId: 'JA-36', startIdx: 485, endIdx: 542 },
];

const newSegments = sections.map(sec => {
  const fromSt = stMap.get(sec.fromId);
  const toSt = stMap.get(sec.toId);

  const coords = [];
  // 始点（駅座標）
  coords.push([fromSt.lat, fromSt.lng]);

  // 中間ノード (startIdx+1 から endIdx-1)
  for (let i = sec.startIdx + 1; i < sec.endIdx; i++) {
    const n = nodes.get(continuousNodes[i]);
    coords.push([Number(n.lat.toFixed(6)), Number(n.lon.toFixed(6))]);
  }

  // 終点（駅座標）
  coords.push([toSt.lat, toSt.lng]);

  return {
    fromStationId: sec.fromId,
    toStationId: sec.toId,
    fromName: fromSt.name,
    toName: toSt.name,
    coordinates: coords,
  };
});

// 既存のセグメントを読み込み
const trackFile = fs.readFileSync('src/data/lines/kawagoe/trackGeometry.ts', 'utf8');
const trackMatch = trackFile.match(/export const KAWAGOE_TRACK_SEGMENTS: TrackSegment\[] =\s*(\[[\s\S]*?\]);\s*$/m);
const existingSegments = eval(trackMatch[1]);

// 最初の5セグメント（大宮〜川越）を維持
const eastSegments = existingSegments.filter(s => {
  const fromNum = parseInt(s.fromStationId.replace('JA-', ''), 10);
  return fromNum >= 26 && fromNum < 31;
});

const allSegments = [...eastSegments, ...newSegments];

console.log('Total segments:', allSegments.length);
allSegments.forEach(s => {
  console.log(`- ${s.fromName} (${s.fromStationId}) -> ${s.toName} (${s.toStationId}): ${s.coordinates.length} points`);
});

// trackGeometry.ts に書き出し
const outputTs = `import type { TrackSegment } from '../../../types';

// JR川越線 (大宮 〜 高麗川 全10区間)
export const KAWAGOE_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(allSegments, null, 2)};
`;

fs.writeFileSync('src/data/lines/kawagoe/trackGeometry.ts', outputTs, 'utf8');
console.log('Updated src/data/lines/kawagoe/trackGeometry.ts successfully!');
