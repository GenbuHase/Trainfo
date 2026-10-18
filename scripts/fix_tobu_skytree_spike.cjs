const fs = require('fs');
const geomPath = 'src/data/lines/tobu_skytree/trackGeometry.ts';
let content = fs.readFileSync(geomPath, 'utf8');
const eqBracket = content.indexOf('= [');
const segs = JSON.parse(content.substring(eqBracket + 2, content.lastIndexOf(']') + 1));

const s23 = segs.find(s => s.id === 'tobu_skytree_TSK-02_TSK-03');
if (s23) {
  const coords0204 = s23.coordinates.slice(0, 58);

  const seg0204 = {
    id: 'tobu_skytree_TSK-02_TSK-04',
    fromStationId: 'TSK-02',
    toStationId: 'TSK-04',
    coordinates: coords0204
  };

  const idx = segs.findIndex(s => s.id === 'tobu_skytree_TSK-02_TSK-03');
  segs.splice(idx, 1, seg0204);

  const newContent = content.substring(0, eqBracket + 2) + JSON.stringify(segs, null, 2) + ';\n';
  fs.writeFileSync(geomPath, newContent, 'utf8');
  console.log('Successfully updated tobu_skytree trackGeometry.ts');
}

// globalTimetable.json の更新
const ttPath = 'src/data/lines/tobu_skytree/globalTimetable.json';
const tt = JSON.parse(fs.readFileSync(ttPath, 'utf8'));
let cleaned = 0;
for (const t of tt) {
  const idx02 = t.stops.findIndex(s => s.stationId === 'TSK-02');
  const idx03 = t.stops.findIndex(s => s.stationId === 'TSK-03');
  const idx04 = t.stops.findIndex(s => s.stationId === 'TSK-04');
  if (idx02 !== -1 && idx03 !== -1 && idx04 !== -1 && t.stops[idx03].isPassing) {
    t.stops.splice(idx03, 1);
    cleaned++;
  }
}
fs.writeFileSync(ttPath, JSON.stringify(tt, null, 2), 'utf8');
console.log('Cleaned passing TSK-03 from ' + cleaned + ' trips in globalTimetable.json');
