// Yahoo station timetable キャッシュの UE-ID リマップ
// 旧: UE-54=土崎(削除), UE-55=羽後牛島, UE-56=岩城みなと, UE-57=道川, UE-58=下浜,
//     UE-59=桂根, UE-60=新屋, UE-61=秋田
// 新: UE-54=岩城みなと, UE-55=道川, UE-56=下浜, UE-57=桂根, UE-58=新屋,
//     UE-59=羽後牛島, UE-60=秋田 (土崎なし)
const fs = require('fs');
const path = require('path');

const DIR = path.resolve('scripts/cache/yahoo/uetsu_main/stations');
const MAP = {
  'UE-54': null, // 土崎 → 削除
  'UE-55': 'UE-59',
  'UE-56': 'UE-54',
  'UE-57': 'UE-55',
  'UE-58': 'UE-56',
  'UE-59': 'UE-57',
  'UE-60': 'UE-58',
  'UE-61': 'UE-60',
};

const files = fs.readdirSync(DIR).filter(f => f.startsWith('station_UE-'));
console.log('cache files:', files.length);

// 衝突回避のため 1st pass は tmp 接頭辞へ、2nd pass で正式名へ
const plan = [];
for (const f of files) {
  const m = f.match(/^station_(UE-\d+)_(.+)$/);
  if (!m) continue;
  const [, oldId, rest] = m;
  const newId = MAP[oldId];
  if (newId === null) {
    fs.unlinkSync(path.join(DIR, f));
    console.log('deleted (土崎):', f);
    continue;
  }
  if (newId && newId !== oldId) plan.push([f, `station_${newId}_${rest}`, oldId, newId]);
}
for (const [from, to] of plan) fs.renameSync(path.join(DIR, from), path.join(DIR, `tmp_${to}`));
for (const [, to] of plan) fs.renameSync(path.join(DIR, `tmp_${to}`), path.join(DIR, to));
console.log(`renamed ${plan.length} files`);
const after = fs.readdirSync(DIR).filter(f => f.startsWith('station_UE-'));
const ids = new Set(after.map(f => f.match(/^station_(UE-\d+)_/)[1]));
console.log('final id set:', [...ids].sort().join(', '));
