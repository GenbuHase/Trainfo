// 東北13鉄道線＋BRT2路線（計15路線）の OSM トポロジー・駅／停留所座標取得スクリプト
const fs = require('fs');
const path = require('path');

const CACHE_DIR = path.resolve(__dirname, 'cache/osm_tohoku_15lines');
fs.mkdirSync(CACHE_DIR, { recursive: true });

// Overpass リクエスト（複数ミラーでリトライ対応）
const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
];

async function queryOverpass(query, cacheName) {
  const cachePath = path.join(CACHE_DIR, `${cacheName}.json`);
  if (fs.existsSync(cachePath)) {
    const stat = fs.statSync(cachePath);
    if (stat.size > 100) {
      return JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    }
  }

  for (let attempt = 0; attempt < 6; attempt++) {
    const endpoint = OVERPASS_ENDPOINTS[attempt % OVERPASS_ENDPOINTS.length];
    try {
      console.log(`  [Overpass] Fetching ${cacheName} via ${endpoint} (attempt ${attempt + 1})...`);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'User-Agent': 'Trainfo-OSM-Builder/1.0',
        },
        body: `data=${encodeURIComponent(query)}`,
      });
      if (!res.ok) {
        console.warn(`    HTTP ${res.status} from ${endpoint}`);
        await new Promise((r) => setTimeout(r, 3000 + attempt * 2000));
        continue;
      }
      const data = await res.json();
      if (data && Array.isArray(data.elements) && data.elements.length > 0) {
        fs.writeFileSync(cachePath, JSON.stringify(data), 'utf8');
        console.log(`    -> Saved ${cacheName}.json (${data.elements.length} elements)`);
        return data;
      }
      console.warn(`    Empty elements for ${cacheName}`);
    } catch (e) {
      console.warn(`    Fetch error (${endpoint}): ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 3000 + attempt * 2000));
  }
  throw new Error(`Failed Overpass query: ${cacheName}`);
}

async function main() {
  // グループ1: 仙山線・仙台空港線・北上線・大船渡線(鉄)・気仙沼線(鉄)・釜石線
  await queryOverpass(
    `[out:json][timeout:180];
    (
      relation(1862833);
      relation(5262910);
      relation(12467356);
      relation(12467357);
      relation(1862834);
      relation(1872664);
      relation(5766142);
      relation(1476378);
      relation(1872665);
    );
    out body;
    >;
    out skel qt;`,
    'group1_rail_relations'
  );

  // グループ1 周辺駅ノード（railway=station|halt）
  await queryOverpass(
    `[out:json][timeout:120];
    (
      rel(id:1862833,5262910,12467356,12467357,1862834,1872664,5766142,1476378,1872665);
    )->.rels;
    node(r.rels);
    out body;
    (
      node["railway"~"^(station|halt)$"](37.9,140.0,39.6,142.1);
    );
    out body;`,
    'group1_stations'
  );

  // グループ2: 田沢湖線・山田線・八戸線・大湊線・津軽線(青森～蟹田)・五能線・男鹿線
  await queryOverpass(
    `[out:json][timeout:180];
    (
      relation(1934364);
      relation(1934362);
      relation(1934360);
      relation(1934637);
      relation(1828078);
      relation(1830475);
      relation(1830476);
    );
    out body;
    >;
    out skel qt;`,
    'group2_rail_relations'
  );

  // グループ2 周辺駅ノード + 津軽線蟹田〜三厩の鉄路・廃線・休止線および駅ノード
  await queryOverpass(
    `[out:json][timeout:120];
    (
      way["railway"~"^(rail|disused|abandoned)$"]["name"~"津軽"](40.95,140.35,41.25,140.70);
      way["railway"~"^(rail|disused)$"](41.00,140.40,41.22,140.66);
      node["railway"~"^(station|halt|disused)$"](39.4,139.6,41.3,142.1);
    );
    out body;
    >;
    out skel qt;`,
    'group2_stations_and_tsugaru_north'
  );

  // グループ3: BRT バスリレーション（気仙沼線BRT & 大船渡線BRT）および周辺停留所
  await queryOverpass(
    `[out:json][timeout:180];
    (
      relation(3295713);
      relation(12433479);
      relation(4145066);
      relation(12445937);
      relation(3299117);
    );
    out body;
    >;
    out skel qt;`,
    'group3_brt_relations'
  );

  // BRT 停留所タグ・ノード詳細（highway=bus_stop / public_transport=platform|stop_position / railway=station）
  await queryOverpass(
    `[out:json][timeout:120];
    (
      node["public_transport"](38.50,141.15,39.15,141.80);
      node["highway"="bus_stop"](38.50,141.15,39.15,141.80);
      node["railway"~"^(station|halt)$"](38.50,141.15,39.15,141.80);
    );
    out body;`,
    'group3_brt_stops'
  );

  // グループ4: 大船渡線BRT 鹿折唐桑〜上鹿折支線（道路・廃線網）および 五能線 広戸駅ピン補完
  await queryOverpass(
    `[out:json][timeout:120];
    (
      relation["route"~"^(bus|train|railway)$"](38.91,141.55,38.97,141.59);
      way["highway"~"^(trunk|primary|secondary|tertiary|unclassified|busway)$"](38.912,141.560,38.966,141.586);
      way["railway"~"^(rail|disused|abandoned)$"](38.912,141.560,38.966,141.586);
      node["railway"~"^(station|halt)$"](40.64,139.92,40.70,139.99);
      node["name"~"広戸"](40.64,139.92,40.70,139.99);
    );
    out body;
    >;
    out skel qt;`,
    'group4_extras'
  );

  console.log('\n🎉 All OSM Overpass queries completed!');
}

main().catch((err) => {
  console.error('❌ OSM Fetch Failed:', err);
  process.exit(1);
});
