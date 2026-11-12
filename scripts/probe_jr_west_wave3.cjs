// scripts/probe_jr_west_wave3.cjs
const fs = require('fs');
const path = require('path');
const YahooClient = require('./common/yahoo/YahooClient.cjs');
const wave3Metadata = require('./jrWestWave3Metadata.cjs');

const CACHE_DIR = path.resolve(__dirname, 'cache/yahoo_probe_jr_west_wave3');
const client = new YahooClient({ cacheDir: CACHE_DIR, delayMs: 120 });
const OUTPUT_FILE = path.resolve(__dirname, 'cache/jr_west_wave3_probe.json');

const HINTS = {
  jr_sagano: { company: '西日本旅客鉄道', rail: '山陰本線' },
  jr_sanin_sonobe_kinosaki: { company: '西日本旅客鉄道', rail: '山陰本線' },
  jr_kosei: { company: '西日本旅客鉄道', rail: '湖西線' },
  jr_kusatsu: { company: '西日本旅客鉄道', rail: '草津線' },
  jr_nara: { company: '西日本旅客鉄道', rail: '奈良線' },
  jr_sakurai: { company: '西日本旅客鉄道', rail: '万葉まほろば線' },
  jr_wakayama: { company: '西日本旅客鉄道', rail: '和歌山線' }
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
  console.log('Starting exact station probe for JR West Wave 3 (7 lines)...');
  const lineResults = {};

  for (const spec of wave3Metadata) {
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
