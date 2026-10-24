// Nominatim（OSM 公式地名検索）実駅座標取得スクリプト
// 白新線・羽越本線の全駅の実座標を取得し、
//   scripts/cache/station_coords_hakushin.json
//   scripts/cache/station_coords_uetsu_main.json
// に保存する（過去 phases でプレースホルダ座標が不正確だったため、
// ルートリレーション stop ノードとの整合検証も兼ねる）。
//
// ※ Nominatim 利用規約に従い User-Agent を明示し、1リクエスト/1.2秒 程度に制限する。
const https = require('https');
const fs = require('fs');
const path = require('path');

const UA = 'Trainfo/1.0 (https://github.com/GenbuHase/Trainfo)';

function getJson(p) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'nominatim.openstreetmap.org',
      port: 443,
      path: p,
      method: 'GET',
      headers: { 'User-Agent': UA, 'Accept-Language': 'ja' },
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    req.on('error', reject);
    req.setTimeout(60000, () => req.destroy(new Error('timeout')));
    req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function loadStations(lineId) {
  const rawTs = fs.readFileSync(path.resolve(`src/data/lines/${lineId}/stations.ts`), 'utf8');
  const sanitized = rawTs.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '');
  const js = require('typescript').transpileModule(sanitized, {
    compilerOptions: { module: require('typescript').ModuleKind.CommonJS, target: require('typescript').ScriptTarget.ES2020 },
  }).outputText;
  const sandbox = { exports: {}, require: () => ({}) };
  require('vm').createContext(sandbox);
  require('vm').runInContext(js, sandbox);
  for (const v of Object.values(sandbox.exports)) {
    if (Array.isArray(v) && v.length && v[0].id) return v;
  }
  return null;
}

async function probeStation(stationName) {
  const q = encodeURIComponent(stationName.replace(/(>|〇)/g, ''));
  const p = `/search?q=${q}&countrycodes=jp&format=json&limit=3&accept-language=ja`;
  const { status, body } = await getJson(p);
  if (status === 429) {
    await sleep(4000);
    return probeStation(stationName); // リトライ（無限ガードは呼び出し側で回数制限）
  }
  if (status !== 200) throw new Error(`HTTP ${status}: ${body.slice(0, 120)}`);
  const j = JSON.parse(body);
  // railway=station/station を優先、なければ最も名前が近いもの
  const relevant = j.filter(x => x.lat && x.lon);
  if (!relevant.length) return null;
  const preferred = relevant.find(x => x.type === 'station' || x['class'] === 'railway')
    || relevant.find(x => (x.name || '').includes(stationName))
    || relevant[0];
  return { lat: parseFloat(preferred.lat), lon: parseFloat(preferred.lon), displayName: preferred.name, type: preferred.type };
}

async function run() {
  for (const lineId of ['hakushin', 'uetsu_main']) {
    const stations = loadStations(lineId);
    const out = {};
    let fail = 0;
    console.log(`=== ${lineId}: ${stations.length} stations ===`);
    for (let i = 0; i < stations.length; i++) {
      const st = stations[i];
      let got = null;
      for (let attempt = 1; attempt <= 3 && !got; attempt++) {
        try {
          got = await probeStation(st.name);
        } catch (e) {
          console.log(`  [${i + 1}] ${st.name} err: ${e.message}`);
          await sleep(3000);
        }
        if (!got) await sleep(2000);
      }
      if (got) {
        out[st.name] = got;
        console.log(`  [${i + 1}/${stations.length}] ${st.name}: ${got.lat.toFixed(6)}, ${got.lon.toFixed(6)} (${got.displayName}, ${got.type})`);
      } else {
        fail++;
        console.log(`  [${i + 1}/${stations.length}] ${st.name}: проб FAILED`);
      }
      await sleep(1300);
    }
    const outPath = path.resolve(`scripts/cache/station_coords_${lineId}.json`);
    fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
    console.log(`Saved ${Object.keys(out).length} coords (${fail} failed) to ${outPath}`);
  }
}

run().catch(e => { console.error('FATAL', e); process.exitCode = 1; });
