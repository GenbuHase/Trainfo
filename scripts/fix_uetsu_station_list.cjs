// uetsu_main 駅リスト訂正スクリプト
// 旧 stations.ts には奥羽本線の「土崎」駅が羽越本線の駅 (UE-54) として混入しており、
// 実在順序も「羽後亀田 → 岩城みなと → … → 新屋 → 羽後牛島 → 秋田」と異なっていた。
// Wikipedia 羽越本線路線図（羽後亀田 243.7 → 岩城みなと 250.2 → 道川 251.8 →
// 下浜 258.4 → 桂根 261.7 → 新屋 265.7 → 羽後牛島 269.0 → 秋田 271.7 km、計60駅）に
// 合わせて 土崎 を削除し、以降の UE-ID を順序どおり再採番する。
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const vm = require('vm');

function loadStations() {
  const rawTs = fs.readFileSync(path.resolve('src/data/lines/uetsu_main/stations.ts'), 'utf8');
  const sanitized = rawTs.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '');
  const js = ts.transpileModule(sanitized, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const sandbox = { exports: {}, require: () => ({}) };
  vm.createContext(sandbox);
  vm.runInContext(js, sandbox);
  for (const v of Object.values(sandbox.exports)) {
    if (Array.isArray(v) && v.length && v[0].id) return v;
  }
  throw new Error('stations load failed');
}

const stations = loadStations();
console.log('loaded:', stations.length, 'stations');
const before = stations.map(s => `${s.id}:${s.name}`).slice(-10).join(', ');
console.log('tail before:', before);

// 土崎削除（奥羽本線の駅、羽越本線非所属）
const filtered = stations.filter(s => s.name !== '土崎');
console.log('removed 土崎 ->', filtered.length, 'stations');

// 順序訂正: 羽後牛島 (269.0km) は新屋 (265.7km) と秋田 (271.7km) の間に位置するため、
// 旧リストの「土崎の直後」から正しい位置へ移動する
const ushijimaIdx = filtered.findIndex(s => s.name === '羽後牛島');
if (ushijimaIdx < 0) throw new Error('羽後牛島 not found');
const ushijima = filtered.splice(ushijimaIdx, 1)[0];
const akitaIdx = filtered.findIndex(s => s.name === '秋田');
if (akitaIdx < 0) throw new Error('秋田 not found');
filtered.splice(akitaIdx, 0, ushijima);
console.log('moved 羽後牛島 to just before 秋田');

// UE-54 以降を新しい位置に再採番（UE-01〜UE-53 は不変）
const TARGET_COUNT = 60;
if (filtered.length !== TARGET_COUNT) throw new Error(`.stereotype unexpected count ${filtered.length} != ${TARGET_COUNT}`);
for (let i = 53; i < filtered.length; i++) {
  const newId = `UE-${String(i + 1).padStart(2, '0')}`;
  if (filtered[i].id !== newId) {
    console.log(`  renumber index ${i + 1}: ${filtered[i].id} (${filtered[i].name}) -> ${newId}`);
    filtered[i].id = newId;
  }
  filtered[i].number = i + 1;
}
console.log('tail after:', filtered.map(s => `${s.id}:${s.name}`).slice(-10).join(', '));

const header = `import type { Station } from '../../../types';

/**
 * JR羽越本線 駅メタデータ（新津 → 秋田、60駅）
 *
 * 【駅リスト訂正済み】旧リストに奥羽本線の土崎駅が混入していたため削除し、
 * Wikipedia 羽越本線路線図の正規順序（羽後亀田 243.7 → 岩城みなと 250.2 →
 * 道川 251.8 → 下浜 258.4 → 桂根 261.7 → 新屋 265.7 → 羽後牛島 269.0 →
 * 秋田 271.7 km）に UE-ID を再採番済みです。
 * lat/lng は暫定値（ROUTE_EXPANSION_PLAYBOOK.md Phase 2 で OSM 実軌道の
 * パス端点座標に置き換え済み／置き換え予定）であり、
 * 公式駅ナンバリングは羽越本線に導入されていないため
 * 内部管理用IDのみ保持します（プレイブック 第33条）。
 */
export const UETSU_MAIN_STATIONS: Station[] = ${JSON.stringify(filtered, null, 2)};
`;

fs.writeFileSync(path.resolve('src/data/lines/uetsu_main/stations.ts'), header, 'utf8');
console.log('✅ wrote src/data/lines/uetsu_main/stations.ts (60 stations, renumbered)');
