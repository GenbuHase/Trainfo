// scripts/probe_jr_west_wave4.cjs
const fs = require('fs');
const path = require('path');
const YahooClient = require('./common/yahoo/YahooClient.cjs');
const wave4Metadata = require('./jrWestWave4Metadata.cjs');

const CACHE_DIR = path.resolve(__dirname, 'cache/yahoo_probe_jr_west_wave4');
const client = new YahooClient({ cacheDir: CACHE_DIR, delayMs: 120 });
const OUTPUT_FILE = path.resolve(__dirname, 'cache/jr_west_wave4_probe.json');

const HINTS = {
  jr_kinokuni: { company: '西日本旅客鉄道', rail: '紀勢本線' },
  jr_kansai_kameyama_kamo: { company: '西日本旅客鉄道', rail: '関西本線' },
  jr_sanyo_himeji_kamigori: { company: '西日本旅客鉄道', rail: '山陽本線' },
  jr_ako: { company: '西日本旅客鉄道', rail: '赤穂線' },
  jr_kakogawa: { company: '西日本旅客鉄道', rail: '加古川線' },
  jr_kishin: { company: '西日本旅客鉄道', rail: '姫新線' },
  jr_bantan: { company: '西日本旅客鉄道', rail: '播但線' },
  jr_maizuru: { company: '西日本旅客鉄道', rail: '舞鶴線' },
  jr_obama: { company: '西日本旅客鉄道', rail: '小浜線' },
  jr_wadamisaki: { company: '西日本旅客鉄道', rail: '和田岬線' }
};

// 同名駅の検索クエリ上書き
const QUERY_OVERRIDE = {
  '市場': '市場(兵庫県)',
  '滝': '滝(兵庫県)',
  '新野': '新野(兵庫県)',
  '白木': '白木(和歌山県)',
  '黒江': '黒江',
  '余部': '余部(JR)'
};

async function fetchWithCache(url, cacheKey) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const cacheFile = path.join(CACHE_DIR, `${cacheKey}.html`);
  if (fs.existsSync(cacheFile)) {
    return fs.readFileSync(cacheFile, 'utf8');
  }
  await client.throttle();
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
    }
  });
  const html = await res.text();
  fs.writeFileSync(cacheFile, html, 'utf8');
  return html;
}

async function searchYahooStation(stationName, hint) {
  const qName = QUERY_OVERRIDE[stationName] || stationName;
  const searchUrl = 'https://transit.yahoo.co.jp/timetable/search?q=' + encodeURIComponent(qName);
  const searchHtml = await fetchWithCache(searchUrl, `search_${encodeURIComponent(qName)}`);
  const m = searchHtml.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) return null;

  const data = JSON.parse(m[1]);
  const pageProps = data.props?.pageProps;
  if (!pageProps) return null;

  let ysid = null;

  if (pageProps.directionDetail) {
    const stUrlMatch = searchHtml.match(/\/timetable\/(\d+)/);
    if (stUrlMatch) ysid = stUrlMatch[1];
  } else if (pageProps.stationFeatures) {
    let matched = null;
    for (const f of pageProps.stationFeatures) {
      const d = f.TransitSearchInfo?.Detail;
      if (!d) continue;
      const comp = d.CompanyName || '';
      const rName = d.RailName || '';
      const groups = d.StationInfo?.RailGroup || [];
      const hasRail = hint.rail && (groups.some(g => g.RailName && g.RailName.includes(hint.rail)) || rName.includes(hint.rail));
      const hasComp = hint.company && comp.includes(hint.company);

      if (hasRail || (hasComp && rName.includes(hint.rail || ''))) {
        matched = d;
        break;
      }
    }
    if (!matched) {
      matched = pageProps.stationFeatures.find(f => {
        const d = f.TransitSearchInfo?.Detail;
        return d && (d.CompanyName?.includes('JR') || d.CompanyName?.includes('旅客鉄道'));
      })?.TransitSearchInfo?.Detail || pageProps.stationFeatures[0]?.TransitSearchInfo?.Detail;
    }
    if (matched) {
      ysid = String(matched.StationId);
    }
  }

  if (!ysid) return null;

  // 駅詳細ページから路線・グループID（routes）を取得
  const stUrl = `https://transit.yahoo.co.jp/timetable/${ysid}`;
  const stHtml = await fetchWithCache(stUrl, `station_${ysid}`);
  const stMatch = stHtml.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  let routes = [];
  if (stMatch) {
    const stData = JSON.parse(stMatch[1]);
    routes = stData.props?.pageProps?.directionDetail?.directionItem?.routeInfos || [];
  }

  return { ysid, name: stationName, routes };
}

async function main() {
  console.log('Starting exact station probe for JR West Wave 4 (10 lines)...');
  const lineResults = {};

  for (const spec of wave4Metadata) {
    const lineKey = spec.id;
    console.log(`\n=== Processing ${spec.name} (${lineKey}) [${spec.stationList.length} stations] ===`);
    const stationsData = [];
    const hint = HINTS[lineKey] || { company: '西日本旅客鉄道' };

    for (const st of spec.stationList) {
      const sname = st.name;
      process.stdout.write(`  Probing ${sname}... `);
      try {
        const info = await searchYahooStation(sname, hint);
        if (info) {
          console.log(`ysid: ${info.ysid}, routes: ${info.routes.length}`);
          stationsData.push(info);
        } else {
          console.log(`FAILED to resolve`);
          stationsData.push({ name: sname, ysid: null, routes: [] });
        }
      } catch (e) {
        console.log(`ERROR: ${e.message}`);
        stationsData.push({ name: sname, ysid: null, error: e.message, routes: [] });
      }
    }
    lineResults[lineKey] = {
      name: spec.name,
      stations: stationsData
    };
  }

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(lineResults, null, 2), 'utf8');
  console.log(`\nAll done! Saved to ${OUTPUT_FILE}`);
}

main().catch(console.error);
