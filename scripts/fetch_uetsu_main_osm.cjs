// 羽越本線 OSM 軌道データ取得スクリプト（Overpass API）
// 新津 → 秋田の全区間（新潟県・山形県・秋田県）の実線路ウェイを取得し、
// scripts/cache/osm_uetsu_main_raw.json に保存する。
// ※ route リレーションは route="railway" 型のため、名前正規引きの代わりに
//    リレーション ID 直接指定(1876848)で取得する。
// Overpass は容量過負荷時 502 を返すため、複数ミラー + 指数バックオフでリトライする。
const https = require('https');
const fs = require('fs');
const path = require('path');

const LINE_NAME = '羽越本線';
const RELATION_IDS = [1876848];
const OUT_PATH = path.resolve('scripts/cache/osm_uetsu_main_raw.json');

const MIRRORS = [
  'overpass-api.de',
  'overpass.kumi.systems',
  'overpass.private.coffee',
];

const query = `
[out:json][timeout:180];
(
  relation(${RELATION_IDS.join(');relation(')});
);
out body;
>;
out skel qt;
`;

function postQuery(hostname, q) {
  return new Promise((resolve, reject) => {
    const post = 'data=' + encodeURIComponent(q);
    const req = https.request({
      hostname,
      port: 443,
      path: '/api/interpreter',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(post),
        'User-Agent': 'Trainfo/1.0 (https://github.com/GenbuHase/Trainfo)'
      }
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    req.on('error', reject);
    req.setTimeout(180000, () => req.destroy(new Error('timeout')));
    req.write(post);
    req.end();
  });
}

async function fetchOverpass() {
  console.log(`Querying Overpass API for ${LINE_NAME} (relations: ${RELATION_IDS.join(', ')})...`);
  for (const mirror of MIRRORS) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const { status, body } = await postQuery(mirror, query);
        if (status !== 200) {
          console.log(`  ${mirror} HTTP ${status}, retry ${attempt}/3...`);
          await new Promise(r => setTimeout(r, attempt * 4000));
          continue;
        }
        const parsed = JSON.parse(body);
        console.log(`  Success via ${mirror}.`);
        return parsed;
      } catch (e) {
        console.log(`  ${mirror} error: ${e.message.slice(0, 120)}`);
        await new Promise(r => setTimeout(r, attempt * 4000));
      }
    }
  }
  throw new Error('All mirrors failed');
}

fetchOverpass()
  .then((data) => {
    fs.writeFileSync(OUT_PATH, JSON.stringify(data), 'utf8');
    console.log(`Saved ${data.elements.length} elements to ${OUT_PATH}`);
    const rels = data.elements.filter(e => e.type === 'relation');
    console.log('Relations:', rels.map(r => ({ id: r.id, name: r.tags && r.tags.name, members: r.members && r.members.length })));
    const ways = data.elements.filter(e => e.type === 'way');
    const nodes = data.elements.filter(e => e.type === 'node');
    console.log('Ways count:', ways.length, 'Nodes count:', nodes.length);
    if (!rels.length) process.exitCode = 1;
  })
  .catch((err) => {
    console.error('Error fetching Overpass data:', err.message);
    process.exitCode = 1;
  });
