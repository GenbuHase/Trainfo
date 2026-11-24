// 仙台市地下鉄（南北・東西）・弘南鉄道（弘南・大鰐）・津軽鉄道・福島交通飯坂線向け
// 駅探（ekitan.com）時刻表から公式列車番号をスクレイピングしてキャッシュ保存するスクリプト
const fs = require('fs');
const path = require('path');

const TARGET_LINES = [
  { lineId: 'sendai_subway_namboku', ekitanLineCode: '48900', stripPrefixRegex: /^$/, },
  { lineId: 'sendai_subway_tozai', ekitanLineCode: '58900', stripPrefixRegex: /^$/, },
  { lineId: 'konan_konan', ekitanLineCode: '45800', stripPrefixRegex: /^$/, },
  { lineId: 'konan_owani', ekitanLineCode: '45700', stripPrefixRegex: /^$/, },
  { lineId: 'tsugaru_railway', ekitanLineCode: '48500', stripPrefixRegex: /^$/, },
  { lineId: 'fukushima_iizaka', ekitanLineCode: '45100', stripPrefixRegex: /^FI/, },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchHtml(url) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
        },
        signal: AbortSignal.timeout(20000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      if (attempt === 4) throw e;
      await sleep(1000 * attempt);
    }
  }
}

function normStationName(s) {
  return (s || '')
    .replace(/\([^)]*\)/g, '')
    .replace(/（[^）]*）/g, '')
    .replace(/ヶ/g, 'ケ')
    .replace(/駅$/g, '')
    .trim();
}

function parseLineStations(html) {
  const result = [];
  const dlMatches = html.match(/<dl[^>]*class="[^"]*clearfix[^"]*"[^>]*>[\s\S]*?<\/dl>/gi) || [];
  for (const dl of dlMatches) {
    const dtMatch = dl.match(/<dt[^>]*>[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/dt>/i);
    if (!dtMatch) continue;
    const stationName = normStationName(dtMatch[1].replace(/<[^>]+>/g, ''));
    const dirLinks = [...dl.matchAll(/<a[^>]*href="([^"]*\/timetable\/railway\/line-station\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
    for (const m of dirLinks) {
      result.push({
        stationName,
        href: m[1],
        dirLabel: m[2].replace(/<[^>]+>/g, '').trim(),
      });
    }
  }
  return result;
}

function parseTimetableHtml(html, stripPrefixRegex) {
  const departures = [];
  const trMatches = html.match(/<tr[^>]*class="[^"]*ek-hour_line[^"]*"[^>]*>[\s\S]*?<\/tr>/gi) || [];
  for (const tr of trMatches) {
    const hourMatch = tr.match(/<td>\s*(\d{2})\s*<\/td>/i);
    if (!hourMatch) continue;
    const hour = hourMatch[1];

    const liMatches = tr.match(/<li[^>]*class="[^"]*ek-train-tooltip[^"]*"[\s\S]*?<\/li>/gi) || [];
    for (const li of liMatches) {
      const typeMatch = li.match(/data-tr-type="([^"]+)"/i);
      const destMatch = li.match(/data-dest="([^"]+)"/i);
      const minMatch = li.match(/<span[^>]*class="[^"]*time-min[^"]*"[^>]*>\s*(\d{2})\s*<\/span>/i);
      const hrefMatch = li.match(/href="([^"]+)"/i);
      if (!minMatch) continue;
      const minute = minMatch[1];
      const href = hrefMatch ? hrefMatch[1] : '';
      let rawTrainNo = '';
      const txMatch = href.match(/tx=([0-9a-zA-Z\-_]+)/i);
      if (txMatch) {
        const parts = txMatch[1].split('-');
        rawTrainNo = (parts[2] || parts[0]).replace(stripPrefixRegex, '');
      }
      departures.push({
        departureTime: `${hour}:${minute}`,
        rawType: typeMatch ? typeMatch[1].trim() : '',
        destination: normStationName(destMatch ? destMatch[1].trim() : ''),
        rawTrainNo,
      });
    }
  }
  return departures;
}

async function main() {
  const out = {};
  for (const target of TARGET_LINES) {
    console.log(`\n🚆 Fetching Ekitan line index: ${target.lineId} (${target.ekitanLineCode})`);
    const indexHtml = await fetchHtml(`https://ekitan.com/timetable/railway/line/${target.ekitanLineCode}`);
    const endpoints = parseLineStations(indexHtml);
    console.log(`  Found ${endpoints.length} direction-station endpoints.`);
    out[target.lineId] = { weekday: {}, holiday: {} };

    for (let i = 0; i < endpoints.length; i++) {
      const ep = endpoints[i];
      for (const [dayKey, dw] of [['weekday', 0], ['holiday', 2]]) {
        const html = await fetchHtml(`https://ekitan.com${ep.href}?dw=${dw}`);
        const deps = parseTimetableHtml(html, target.stripPrefixRegex);
        if (!out[target.lineId][dayKey][ep.stationName]) {
          out[target.lineId][dayKey][ep.stationName] = [];
        }
        for (const d of deps) {
          out[target.lineId][dayKey][ep.stationName].push({
            ...d,
            dirLabel: ep.dirLabel,
          });
        }
        await sleep(80);
      }
    }
    const wdCount = Object.values(out[target.lineId].weekday).reduce((a, b) => a + b.length, 0);
    const hdCount = Object.values(out[target.lineId].holiday).reduce((a, b) => a + b.length, 0);
    console.log(`  ✅ ${target.lineId}: weekday=${wdCount} entries, holiday=${hdCount} entries`);
  }

  const outPath = path.resolve(__dirname, 'cache/ekitan_tohoku_6lines.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
  console.log(`\n🎉 Saved all Ekitan data to ${outPath}`);
}

main().catch((e) => {
  console.error('❌ Ekitan fetch failed:', e);
  process.exit(1);
});
