const fs = require('fs');

async function fetchOsm(name, query, outFile) {
  if (fs.existsSync(outFile) && fs.statSync(outFile).size > 1000) {
    console.log(`[Skip] ${outFile} already exists and has size ${fs.statSync(outFile).size}`);
    return;
  }

  console.log(`Fetching OSM data for ${name}...`);
  const endpoints = [
    'https://overpass.osm.ch/api/interpreter',
    'https://overpass-api.de/api/interpreter',
    'https://lz4.overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
  ];

  for (const endpoint of endpoints) {
    try {
      const url = `${endpoint}?data=${encodeURIComponent(query)}`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60000);
      const res = await fetch(url, {
        headers: { 'User-Agent': 'TrainfoApp/1.0 (contact@trainfo.app)' },
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (res.ok) {
        const data = await res.json();
        if (data.elements && data.elements.length > 0) {
          fs.writeFileSync(outFile, JSON.stringify(data, null, 2), 'utf8');
          console.log(`[Success] Saved ${data.elements.length} elements to ${outFile}`);
          return data;
        } else {
          console.warn(`[Warn] ${endpoint} returned 0 elements`);
        }
      } else {
        console.warn(`[Warn] ${endpoint} returned status ${res.status}`);
      }
    } catch (e) {
      console.warn(`[Warn] Error querying ${endpoint}: ${e.message}`);
    }
  }
  throw new Error(`Failed to fetch OSM data for ${name}`);
}

async function main() {
  // 1. 伊豆急行線 (すでに取得済み scripts/cache/osm_izukyu.json)
  const qIzukyu = `[out:json][timeout:60];(relation["name"~"伊豆急行線"]["route"~"train|railway"];way["name"~"伊豆急行線"]["railway"~"rail|narrow_gauge"];way["operator"~"伊豆急行"]["railway"~"rail|narrow_gauge"];);out body;>;out skel qt;`;
  await fetchOsm('izukyu', qIzukyu, 'scripts/cache/osm_izukyu.json');

  // 2. 富士急行線 (すでに取得済み scripts/cache/osm_fujikyu.json)
  const qFujikyu = `[out:json][timeout:60];(relation["name"~"富士急行|大月線|河口湖線"]["route"~"train|railway"];way["name"~"富士急行|大月線|河口湖線"]["railway"~"rail|narrow_gauge"];way["operator"~"富士急行|富士山麓電気鉄道"]["railway"~"rail|narrow_gauge"];);out body;>;out skel qt;`;
  await fetchOsm('fujikyu', qFujikyu, 'scripts/cache/osm_fujikyu.json');

  // 3. 御殿場線 (国府津〜沼津 bbox: 35.08,138.80, 35.40,139.25)
  const qGotemba = `[out:json][timeout:60];(relation["name"~"御殿場線"]["route"~"train|railway"](35.08,138.80,35.40,139.25);way["name"~"御殿場線"]["railway"~"rail|narrow_gauge"](35.08,138.80,35.40,139.25);way["railway"="rail"](35.08,138.80,35.40,139.25)["operator"~"東海旅客鉄道|JR東海"];);out body;>;out skel qt;`;
  await fetchOsm('gotemba', qGotemba, 'scripts/cache/osm_gotemba.json');

  // 4. 山形新幹線（奥羽本線 福島〜新庄 bbox: 37.70,140.0, 38.85,140.55）
  const qYamagata = `[out:json][timeout:60];(way["name"~"山形新幹線|奥羽本線|山形線"]["railway"~"rail|narrow_gauge"](37.70,140.0,38.85,140.55);way["railway"="rail"](37.70,140.0,38.85,140.55)["operator"~"東日本旅客鉄道|JR東日本"];);out body;>;out skel qt;`;
  await fetchOsm('yamagata_shinkansen', qYamagata, 'scripts/cache/osm_yamagata_shinkansen.json');

  // 5. 秋田新幹線（田沢湖線 盛岡〜大曲、奥羽本線 大曲〜秋田 bbox: 39.40,140.0, 39.80,141.20）
  const qAkita = `[out:json][timeout:60];(way["name"~"秋田新幹線|田沢湖線|奥羽本線"]["railway"~"rail|narrow_gauge"](39.40,140.0,39.80,141.20);way["railway"="rail"](39.40,140.0,39.80,141.20)["operator"~"東日本旅客鉄道|JR東日本"];);out body;>;out skel qt;`;
  await fetchOsm('akita_shinkansen', qAkita, 'scripts/cache/osm_akita_shinkansen.json');

  console.log('All OSM data fetched successfully!');
}

main().catch(console.error);
