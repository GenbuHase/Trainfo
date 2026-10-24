// JR奥羽本線の Yahoo! 駅IDと方面グループを調査する
const fs = require('fs');
const path = require('path');
const YahooClient = require('./common/yahoo/YahooClient.cjs');

const client = new YahooClient({
  cacheDir: path.resolve(__dirname, 'cache/yahoo/ou_probe'),
  delayMs: 280,
});

const SECTIONS = {
  ou_fukushima_shinjo: [
    '福島', '笹木野', '庭坂', '赤岩', '板谷', '峠', '大沢', '関根', '米沢', '置賜',
    '高畠', '赤湯', '中川', '羽前中山', 'かみのやま温泉', '茂吉記念館前', '蔵王', '山形',
    '北山形', '羽前千歳', '南出羽', '漆山', '高擶', '天童', '乱川', '神町', 'さくらんぼ東根',
    '東根', '村山', '袖崎', '大石田', '北大石田', '芦沢', '舟形', '新庄',
  ],
  ou_shinjo_omagari: [
    '新庄', '泉田', '羽前豊里', '真室川', '釜淵', '大滝', '及位', '院内', '横堀', '三関',
    '上湯沢', '湯沢', '下湯沢', '十文字', '醍醐', '柳田', '横手', '後三年', '飯詰', '大曲',
  ],
  ou_omagari_akita: [
    '大曲', '神宮寺', '刈和野', '峰吉川', '羽後境', '大張野', '和田', '四ツ小屋', '秋田',
  ],
  ou_akita_aomori: [
    '秋田', '泉外旭川', '土崎', '上飯島', '追分', '大久保', '羽後飯塚', '井川さくら', '八郎潟',
    '鯉川', '鹿渡', '森岳', '北金岡', '東能代', '鶴形', '富根', '二ツ井', '前山', '鷹ノ巣',
    '糠沢', '早口', '下川沿', '大館', '白沢', '陣場', '津軽湯の沢', '碇ケ関', '長峰', '大鰐温泉',
    '石川', '弘前', '撫牛子', '川部', '北常盤', '浪岡', '大釈迦', '鶴ケ坂', '津軽新城', '新青森', '青森',
  ],
};

function isOuRail(name) {
  if (!name) return false;
  return name.includes('奥羽') || name.includes('山形線');
}

function normStationName(name) {
  return (name || '')
    .replace(/駅$/, '')
    .replace(/[（(].*$/, '')
    .trim();
}

function nameMatches(displayName, stationName) {
  return normStationName(displayName) === stationName;
}

async function probeStation(stationName) {
  const queries = [stationName, `${stationName}駅`];
  let last = null;
  for (const query of queries) {
    const data = await probeQuery(stationName, query);
    last = data;
    if (data && !data.error && data.stationId && nameMatches(data.displayName, stationName)) {
      return data;
    }
  }
  return last || { name: stationName, error: 'not found' };
}

async function probeQuery(stationName, query) {
  const url = 'https://transit.yahoo.co.jp/timetable/search?q=' + encodeURIComponent(query);
  await client.throttle();
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
    },
    redirect: 'follow',
  });
  const finalUrl = res.url;
  const html = await res.text();
  const m = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) throw new Error(`__NEXT_DATA__ not found for ${stationName} (${finalUrl})`);
  const pageProps = JSON.parse(m[1]).props?.pageProps;

  let stationId = null;
  let routes = [];
  let displayName = stationName;

  const urlIdMatch = finalUrl.match(/\/timetable\/(\d+)/);
  const redirectedName = pageProps?.directionDetail?.stationName || '';
  const redirectOk = urlIdMatch && pageProps?.directionDetail && nameMatches(redirectedName, stationName);
  if (redirectOk) {
    stationId = urlIdMatch[1];
    displayName = redirectedName || stationName;
    routes = pageProps.directionDetail.directionItem?.routeInfos || [];
  } else if (pageProps?.stationFeatures) {
    const candidates = [];
    for (const f of pageProps.stationFeatures) {
      const d = f.TransitSearchInfo?.Detail;
      if (!d) continue;
      const groups = d.StationInfo?.RailGroup || [];
      const railNames = groups.map(g => g.RailName).filter(Boolean);
      const company = d.CompanyName || '';
      candidates.push({
        stationId: d.StationId,
        displayName: d.DisplayStationName,
        company,
        railName: d.RailName,
        railNames,
      });
    }
    const named = candidates.filter(c => nameMatches(c.displayName, stationName));
    const pool = named.length > 0 ? named : candidates;
    const ou = pool.find(c =>
      (c.company || '').includes('東日本') &&
      (isOuRail(c.railName) || c.railNames.some(isOuRail))
    );
    const jr = pool.find(c => (c.company || '').includes('東日本'));
    const best = ou || jr || pool[0];
    if (!best?.stationId) {
      return { name: stationName, error: 'no candidate', candidates };
    }
    stationId = String(best.stationId);
    const ttProps = await client.fetchNextData(`https://transit.yahoo.co.jp/timetable/${stationId}/`, {
      cacheKey: `tt_${stationId}`,
      subDir: 'tt_direct',
    });
    displayName = ttProps.directionDetail?.stationName || best.displayName || stationName;
    routes = ttProps.directionDetail?.directionItem?.routeInfos || [];
  }

  const slimRoutes = (routes || []).map(r => ({
    railName: r.railName || '',
    groups: (r.railGroup || []).map(g => ({
      direction: g.direction,
      source: g.source,
      groupId: g.groupId,
    })),
  }));

  if (!nameMatches(displayName, stationName)) {
    return { name: stationName, error: `name mismatch: ${displayName}`, stationId, displayName, routes: slimRoutes };
  }

  return { name: stationName, stationId, displayName, routes: slimRoutes };
}

async function run() {
  const only = process.argv[2];
  const names = [];
  const seen = new Set();
  for (const [section, list] of Object.entries(SECTIONS)) {
    if (only && only !== section && only !== 'sample') continue;
    const slice = only === 'sample' ? list.slice(0, 2) : list;
    for (const n of slice) {
      if (seen.has(n)) continue;
      seen.add(n);
      names.push(n);
    }
  }
  if (only === 'sample') {
    names.length = 0;
    names.push('福島', '山形', '新庄', '大曲', '秋田', '東能代', '弘前', '青森', '大沢', '湯沢', '追分', '石川');
  }

  console.log(`Probing ${names.length} stations...`);
  const results = {};
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    try {
      const data = await probeStation(name);
      results[name] = data;
      const ou = (data.routes || []).filter(r => isOuRail(r.railName));
      console.log(`[${i + 1}/${names.length}] ${name} id=${data.stationId} display=${data.displayName} ouRoutes=${ou.length} err=${data.error || ''}`);
      for (const r of ou) {
        for (const g of r.groups || []) {
          console.log(`    ${r.railName} | ${g.source} -> ${g.direction} | group=${g.groupId}`);
        }
      }
    } catch (err) {
      results[name] = { name, error: err.message };
      console.error(`[${i + 1}/${names.length}] ERROR ${name}: ${err.message}`);
    }
  }
  const outPath = path.resolve(__dirname, 'cache/ou_yahoo_probed.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`Saved ${outPath}`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
