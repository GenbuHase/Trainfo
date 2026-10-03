const fs = require('fs');
const path = require('path');

const stationNames = [
  '八王子', '北八王子', '小宮', '拝島', '東福生', '箱根ケ崎', '金子', '東飯能',
  '高麗川', '毛呂', '越生', '明覚', '小川町', '竹沢', '折原', '寄居',
  '用土', '松久', '児玉', '丹荘', '群馬藤岡', '北藤岡', '倉賀野', '高崎'
];

async function fetchStations() {
  const nameFilter = stationNames.map(n => `node["railway"~"station|stop"]["name"="${n}"];`).join('\n  ');
  const query = `
[out:json][timeout:60];
(
  ${nameFilter}
);
out body;
`;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
  console.log('Fetching Hachiko stations from Overpass...');
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Trainfo/1.0 (https://github.com/GenbuHase/Trainfo)' }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  console.log(`Fetched ${json.elements.length} station elements.`);
  
  const outPath = path.resolve(__dirname, 'cache/osm_hachiko_stations.json');
  fs.writeFileSync(outPath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Saved to ${outPath}`);

  // 各駅の検出状況
  for (const name of stationNames) {
    const matched = json.elements.filter(e => e.tags?.name === name);
    console.log(`Station ${name}: ${matched.length} candidates found.`);
  }
}

fetchStations().catch(err => {
  console.error(err);
  process.exit(1);
});
