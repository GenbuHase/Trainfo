// scripts/probe_jr_west_wave2.cjs
const fs = require('fs');
const path = require('path');
const YahooClient = require('./common/yahoo/YahooClient.cjs');
const { LINE_SPECS_WAVE2 } = require('./jrWestWave2Metadata.cjs');

const CACHE_DIR = path.resolve(__dirname, 'cache/yahoo_probe_jr_west');
const client = new YahooClient({ cacheDir: CACHE_DIR, delayMs: 120 });
const OUTPUT_FILE = path.resolve(__dirname, 'cache/jr_west_wave2_probe.json');

const HINTS = {
  jr_osaka_loop: { company: '西日本旅客鉄道', rail: '大阪環状線' },
  jr_yumesaki: { company: '西日本旅客鉄道', rail: 'ゆめ咲線' },
  jr_tozai: { company: '西日本旅客鉄道', rail: 'ＪＲ東西線' },
  jr_gakken_toshi: { company: '西日本旅客鉄道', rail: '学研都市線' },
  jr_takarazuka: { company: '西日本旅客鉄道', rail: 'ＪＲ宝塚線' },
  jr_fukuchiyama_north: { company: '西日本旅客鉄道', rail: '福知山線' },
  jr_yamatoji: { company: '西日本旅客鉄道', rail: '大和路線' },
  jr_osaka_higashi: { company: '西日本旅客鉄道', rail: 'おおさか東線' },
  jr_hanwa: { company: '西日本旅客鉄道', rail: '阪和線' },
  jr_kansai_airport: { company: '西日本旅客鉄道', rail: '関西空港線' },
  jr_hokuriku_maibara_tsuruga: { company: '西日本旅客鉄道', rail: '北陸本線' }
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
  const searchUrl = 'https://transit.yahoo.co.jp/timetable/search?q=' + encodeURIComponent(stationName);
  const searchHtml = await fetchWithCache(searchUrl, `search_${encodeURIComponent(stationName)}`);
  const m = searchHtml.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) return null;

  const data = JSON.parse(m[1]);
  const pageProps = data.props?.pageProps;
  if (!pageProps) return null;

  let ysid = null;

  if (pageProps.directionDetail) {
    // 直接駅ページに遷移した場合
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
      const hasRail = hint.rail && groups.some(g => g.RailName && g.RailName.includes(hint.rail));
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
  console.log('Starting exact station probe for JR West Wave 2 (11 lines)...');
  const lineResults = {};

  for (const [lineKey, spec] of Object.entries(LINE_SPECS_WAVE2)) {
    console.log(`\n=== Processing ${spec.name} (${lineKey}) [${spec.stations.length} stations] ===`);
    const stationsData = [];
    const hint = HINTS[lineKey] || { company: '西日本旅客鉄道' };

    for (const sname of spec.stations) {
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
