const fs = require('fs');
const path = require('path');

const STATIONS = [
  { id: 'OH-23', code: '245-0', name: '新百合ヶ丘' },
  { id: 'OT-01', code: '245-1', name: '五月台' },
  { id: 'OT-02', code: '245-2', name: '栗平' },
  { id: 'OT-03', code: '245-3', name: '黒川' },
  { id: 'OT-04', code: '245-7', name: 'はるひ野' },
  { id: 'OT-05', code: '245-4', name: '小田急永山' },
  { id: 'OT-06', code: '245-5', name: '小田急多摩センター' },
  { id: 'OT-07', code: '245-6', name: '唐木田' },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseTimetableChunk(htmlChunk) {
  const departures = [];
  const trMatches = htmlChunk.match(/<tr[^>]*class="[^"]*ek-hour_line[^"]*"[^>]*>[\s\S]*?<\/tr>/gi) || [];

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
      const rawType = typeMatch ? typeMatch[1].trim() : '各駅停車';
      const destination = destMatch ? destMatch[1].trim() : '';
      const minute = minMatch[1];
      const href = hrefMatch ? hrefMatch[1] : '';

      let trainNo = '';
      const txMatch = href.match(/tx=([0-9a-zA-Z\-_]+)/i);
      if (txMatch) {
        const rawCode = txMatch[1];
        const parts = rawCode.split('-');
        trainNo = parts[parts.length - 1];
      } else {
        trainNo = `${hour}${minute}`;
      }

      const hNum = parseInt(hour, 10);
      const mNum = parseInt(minute, 10);
      departures.push({
        h: hNum,
        m: mNum,
        time: minute,
        sec: hNum * 3600 + mNum * 60,
        t: rawType,
        d: destination,
        no: trainNo,
        rawType,
      });
    }
  }

  departures.sort((a, b) => a.sec - b.sec);
  return departures;
}

function judgeDirection(tabName, st) {
  if (tabName.includes('唐木田方面')) return 'outbound';
  if (tabName.includes('新百合ヶ丘方面') || tabName.includes('新百合ケ丘方面') || tabName.includes('新宿方面') || tabName.includes('代々木上原方面') || tabName.includes('北綾瀬方面') || tabName.includes('我孫子方面') || tabName.includes('取手方面')) return 'inbound';
  return null;
}

async function scrapeStation(st, dw) {
  let outbound = [];
  let inbound = [];

  const url = `https://ekitan.com/timetable/railway/line-station/${st.code}/d1?dw=${dw}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

    const tabs = [...html.matchAll(/class="[^"]*ek-direction_tab[^"]*"[^>]*data-ek-direction_name="([^"]+)"/gi)].map((m) => m[1]);
    const tables = [...html.matchAll(/<table[^>]*class="[^"]*ek-search-result[^"]*"[^>]*>([\s\S]*?)<\/table>/gi)].map((m) => m[1]);

    for (let i = 0; i < tables.length; i++) {
      const tabName = tabs[i] || '';
      const deps = parseTimetableChunk(tables[i]);
      const dir = judgeDirection(tabName, st);

      if (dir === 'outbound') outbound = deps;
      else if (dir === 'inbound') inbound = deps;
      else {
        console.warn(`Unknown tab: "${tabName}" for ${st.name}`);
      }
    }
  } catch (e) {
    console.error(`Error fetching ${st.id} (${st.name}): ${e.message}`);
  }

  return { outbound, inbound };
}

async function main() {
  const result = {
    weekday: {},
    holiday: {},
  };

  console.log('=== Fetching Odakyu Tama Line from Ekitan ===');

  for (const day of [
    { key: 'weekday', dw: 0 },
    { key: 'holiday', dw: 2 },
  ]) {
    console.log(`\nFetching ${day.key} (dw=${day.dw})...`);
    for (const st of STATIONS) {
      process.stdout.write(`  Station: ${st.name} (${st.code})... `);
      const data = await scrapeStation(st, day.dw);
      result[day.key][st.id] = data;
      console.log(`Outbound: ${data.outbound.length}, Inbound: ${data.inbound.length}`);
      await sleep(200);
    }
  }

  const outPath = path.resolve(__dirname, 'ekitan_odakyu_tama_timetables.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\nSaved Ekitan data to: ${outPath}`);
}

main().catch(console.error);
