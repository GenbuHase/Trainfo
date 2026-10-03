const fs = require('fs');

const raw1 = JSON.parse(fs.readFileSync('scripts/osm_musashino_raw.json', 'utf8'));
const raw2 = JSON.parse(fs.readFileSync('scripts/osm_musashino_branches.json', 'utf8'));

const stMap = {};

function addStations(elements) {
  elements.filter(e => e.tags && (e.tags.railway === 'station' || e.tags.railway === 'halt')).forEach(s => {
    const name = s.tags.name;
    if (!name) return;
    if (!stMap[name]) stMap[name] = [];
    stMap[name].push({ lat: s.lat, lon: s.lon, id: s.id, tags: s.tags });
  });
}

addStations(raw1.elements);
addStations(raw2.elements);

console.log('Total station names found:', Object.keys(stMap).length);
fs.writeFileSync('scripts/osm_station_coords.json', JSON.stringify(stMap, null, 2), 'utf8');

const targetStations = [
  // 本線
  '府中本町', '北府中', '西国分寺', '新小平', '新秋津', '東所沢', '新座', '北朝霞', '西浦和', '武蔵浦和',
  '南浦和', '東浦和', '東川口', '南越谷', '越谷レイクタウン', '吉川', '吉川美南', '新三郷', '三郷',
  '南流山', '新松戸', '新八柱', '東松戸', '市川大野', '船橋法典', '西船橋',
  // 京葉線東京方面
  '市川塩浜', '新浦安', '舞浜', '葛西臨海公園', '新木場', '潮見', '越中島', '八丁堀', '東京',
  // 京葉線海浜幕張方面
  '南船橋', '新習志野', '幕張豊砂', '海浜幕張',
  // 大宮
  '大宮',
  // 中央線
  '国立', '立川', '日野', '豊田', '八王子'
];

const missing = [];
const resolved = {};
targetStations.forEach(name => {
  if (stMap[name] && stMap[name].length > 0) {
    // 首都圏（緯度35〜36.2, 経度139〜140.2）に絞る
    const valid = stMap[name].filter(p => p.lat >= 35.5 && p.lat <= 36.2 && p.lon >= 139.2 && p.lon <= 140.2);
    if (valid.length > 0) {
      resolved[name] = valid[0];
    } else {
      resolved[name] = stMap[name][0];
    }
  } else {
    missing.push(name);
  }
});

console.log('Resolved target stations:', Object.keys(resolved).length, 'Missing:', missing);
fs.writeFileSync('scripts/resolved_musashino_stations.json', JSON.stringify(resolved, null, 2), 'utf8');
