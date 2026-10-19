const fs = require('fs');

// 1. 武蔵野線の stations.ts の中央線駅座標を中央線本線と同期
const chuoStationsPath = 'src/data/lines/chuo/stations.ts';
const musaStationsPath = 'src/data/lines/musashino/stations.ts';

const chuoStText = fs.readFileSync(chuoStationsPath, 'utf8');
const chuoSt = JSON.parse(chuoStText.substring(chuoStText.indexOf('= [') + 2, chuoStText.lastIndexOf(']') + 1));
const chuoStationMap = new Map(chuoSt.map(s => [s.id, s]));

let musaStText = fs.readFileSync(musaStationsPath, 'utf8');
const eqBracket = musaStText.indexOf('= [');
const musaSt = JSON.parse(musaStText.substring(eqBracket + 2, musaStText.lastIndexOf(']') + 1));

for (const st of musaSt) {
  if (['JC-18', 'JC-19', 'JC-20', 'JC-21', 'JC-22'].includes(st.id)) {
    const c = chuoStationMap.get(st.id);
    if (c) {
      st.lat = c.lat;
      st.lng = c.lng;
    }
  }
}

fs.writeFileSync(musaStationsPath, musaStText.substring(0, eqBracket + 2) + JSON.stringify(musaSt, null, 2) + ';\n', 'utf8');
console.log('Updated musashino stations.ts coordinates for JC-18 ~ JC-22');

// 2. 武蔵野線の trackGeometry.ts の中央線区間セグメントを同期
const chuoGeomPath = 'src/data/lines/chuo/trackGeometry.ts';
const musaGeomPath = 'src/data/lines/musashino/trackGeometry.ts';

const chuoGeomText = fs.readFileSync(chuoGeomPath, 'utf8');
const chuoSegs = JSON.parse(chuoGeomText.substring(chuoGeomText.indexOf('= [') + 2, chuoGeomText.lastIndexOf(']') + 1));
const chuoSegMap = new Map(chuoSegs.map(s => [`${s.fromStationId}_${s.toStationId}`, s]));

let musaGeomText = fs.readFileSync(musaGeomPath, 'utf8');
const eqGeomBracket = musaGeomText.indexOf('= [');
const musaSegs = JSON.parse(musaGeomText.substring(eqGeomBracket + 2, musaGeomText.lastIndexOf(']') + 1));

// JM-32 -> JC-18 の終点を国立駅ホームまで延長
const jm32jc18 = musaSegs.find(s => s.fromStationId === 'JM-32' && s.toStationId === 'JC-18');
if (jm32jc18) {
  // 国立駅ホームへの接続
  const lastPt = jm32jc18.coordinates[jm32jc18.coordinates.length - 1];
  if (lastPt[1] > 139.447) {
    jm32jc18.coordinates.push([ 35.699238, 139.447129 ]);
    jm32jc18.coordinates.push([ 35.699222, 139.446532 ]);
  }
}

for (const pair of ['JC-18_JC-19', 'JC-19_JC-20', 'JC-20_JC-21', 'JC-21_JC-22']) {
  const [f, t] = pair.split('_');
  const chuoSeg = chuoSegMap.get(pair);
  const musaIdx = musaSegs.findIndex(s => s.fromStationId === f && s.toStationId === t);
  if (chuoSeg && musaIdx !== -1) {
    musaSegs[musaIdx].coordinates = [...chuoSeg.coordinates];
  }
}

fs.writeFileSync(musaGeomPath, musaGeomText.substring(0, eqGeomBracket + 2) + JSON.stringify(musaSegs, null, 2) + ';\n', 'utf8');
console.log('Updated musashino trackGeometry.ts Chuo segments');
