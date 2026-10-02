const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/ekitan_musashino_raw_timetables.json', 'utf8'));

// 武蔵野線本線（JM-35〜JM-10）
const MAINLINE_STATIONS = [
  'JM-35', 'JM-34', 'JM-33', 'JM-32', 'JM-31', 'JM-30', 'JM-29', 'JM-28', 'JM-27', 'JM-26',
  'JM-25', 'JM-24', 'JM-23', 'JM-22', 'JM-21', 'JM-20', 'JM-19', 'JM-18', 'JM-17', 'JM-16',
  'JM-15', 'JM-14', 'JM-13', 'JM-12', 'JM-11', 'JM-10'
];

console.log('--- Analyzing Outbound Trains by trainNo ---');
const outboundTrains = new Map(); // trainNo -> Map<stationId, sec>

MAINLINE_STATIONS.forEach(stId => {
  const list = raw.weekday[stId]?.outbound || [];
  list.forEach(t => {
    if (!outboundTrains.has(t.no)) {
      outboundTrains.set(t.no, {
        trainNo: t.no,
        type: t.t,
        dest: t.d,
        times: new Map(),
      });
    }
    outboundTrains.get(t.no).times.set(stId, t.sec);
  });
});

console.log(`Total unique outbound train numbers on mainline: ${outboundTrains.size}`);

// 各列車が何駅で捕捉されたかの分布
const stationCountDist = {};
for (const [trainNo, info] of outboundTrains.entries()) {
  const count = info.times.size;
  stationCountDist[count] = (stationCountDist[count] || 0) + 1;
}
console.log('Station count distribution for outbound trains:', stationCountDist);

console.log('--- Analyzing Inbound Trains by trainNo ---');
const inboundTrains = new Map();
MAINLINE_STATIONS.forEach(stId => {
  const list = raw.weekday[stId]?.inbound || [];
  list.forEach(t => {
    if (!inboundTrains.has(t.no)) {
      inboundTrains.set(t.no, {
        trainNo: t.no,
        type: t.t,
        dest: t.d,
        times: new Map(),
      });
    }
    inboundTrains.get(t.no).times.set(stId, t.sec);
  });
});

console.log(`Total unique inbound train numbers on mainline: ${inboundTrains.size}`);
const inStationCountDist = {};
for (const [trainNo, info] of inboundTrains.entries()) {
  const count = info.times.size;
  inStationCountDist[count] = (inStationCountDist[count] || 0) + 1;
}
console.log('Station count distribution for inbound trains:', inStationCountDist);
