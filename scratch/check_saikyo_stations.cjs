const fs = require('fs');
const lines = JSON.parse(fs.readFileSync('src/data/lines.json', 'utf8'));
const saikyoLine = lines.find(l => l.lineId === 'saikyo');
console.log('saikyo stationIds:', saikyoLine?.stationIds);

const stations = JSON.parse(fs.readFileSync('src/data/stations.json', 'utf8'));
saikyoLine?.stationIds?.forEach(id => {
  const s = stations.find(x => x.stationId === id);
  console.log(id, s?.stationName);
});
