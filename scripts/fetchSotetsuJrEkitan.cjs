const fs = require('fs');
const path = require('path');

const STATIONS = [
  { id: 'SO-51', name: '羽沢横浜国大', index: 21 },
  { id: 'JS-15', name: '武蔵小杉', index: 20 },
  { id: 'JS-16', name: '西大井', index: 19 },
  { id: 'JS-17', name: '大崎', index: 18 },
  { id: 'JS-18', name: '恵比寿', index: 0 },
  { id: 'JS-19', name: '渋谷', index: 1 },
  { id: 'JS-20', name: '新宿', index: 2 },
];

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function parseTableChunk(tableHtml) {
  const departures = [];
  const trMatches = tableHtml.match(/<tr[^>]*class="[^"]*ek-hour_line[^"]*"[^>]*>[\s\S]*?<\/tr>/gi) || [];

  for (const tr of trMatches) {
    const hourMatch = tr.match(/<td>\s*(\d{2})\s*<\/td>/i);
    if (!hourMatch) continue;
    const hour = parseInt(hourMatch[1], 10);

    const liMatches = tr.match(/<li[^>]*class="[^"]*ek-train-tooltip[^"]*"[\s\S]*?<\/li>/gi) || [];
    for (const li of liMatches) {
      const typeMatch = li.match(/data-tr-type="([^"]+)"/i);
      const destMatch = li.match(/data-dest="([^"]+)"/i);
      const minMatch = li.match(/<span[^>]*class="[^"]*time-min[^"]*"[^>]*>\s*(\d{2})\s*<\/span>/i);
      const hrefMatch = li.match(/href="([^"]+)"/i);

      if (!minMatch) continue;
      const rawType = typeMatch ? typeMatch[1].trim() : '普通';
      const destination = destMatch ? destMatch[1].trim() : '';
      const minute = parseInt(minMatch[1], 10);
      const href = hrefMatch ? hrefMatch[1] : '';

      let trainNo = '';
      const txMatch = href.match(/tx=([0-9a-zA-Z\-_]+)/i);
      if (txMatch) {
        const rawCode = txMatch[1];
        const parts = rawCode.split('-');
        trainNo = parts[parts.length - 1];
      }

      departures.push({
        hour,
        minute,
        sec: hour * 3600 + minute * 60,
        type: rawType,
        destination,
        trainNo,
      });
    }
  }

  departures.sort((a, b) => a.sec - b.sec);
  return departures;
}

function judgeDirection(tabName) {
  if (tabName.includes('新宿') || tabName.includes('大宮') || tabName.includes('川越') || tabName.includes('赤羽')) {
    return 'inbound';
  }
  if (tabName.includes('羽沢') || tabName.includes('海老名') || tabName.includes('相鉄') || tabName.includes('大崎') || tabName.includes('新木場')) {
    return 'outbound';
  }
  return null;
}

async function fetchEkitanStation(stIdx, dw) {
  const url = `https://ekitan.com/timetable/railway/line-station/131-${stIdx}/d1?dw=${dw}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    }
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const html = await res.text();

  const tabs = [...html.matchAll(/class="[^"]*ek-direction_tab[^"]*"[^>]*data-ek-direction_name="([^"]+)"/gi)].map(m => m[1]);
  const tables = [...html.matchAll(/<table[^>]*class="[^"]*ek-search-result[^"]*"[^>]*>([\s\S]*?)<\/table>/gi)].map(m => m[1]);

  const result = { inbound: [], outbound: [] };
  for (let i = 0; i < tables.length; i++) {
    const tabName = tabs[i] || html.match(/<title>([^<]+)<\/title>/)?.[1] || '';
    const deps = parseTableChunk(tables[i]);
    const dir = judgeDirection(tabName);
    if (dir === 'inbound') {
      result.inbound.push(...deps);
    } else if (dir === 'outbound') {
      result.outbound.push(...deps);
    }
  }

  return result;
}

async function run() {
  console.log('=== Scraping Ekitan for line: sotetsu_jr_direct ===');
  const allRecords = [];

  for (const st of STATIONS) {
    for (const dw of [1, 2]) {
      const dayKey = dw === 1 ? 'weekday' : 'holiday';
      try {
        await sleep(300);
        const res = await fetchEkitanStation(st.index, dw);
        console.log(`  [${st.name}] dw=${dw}... OK (in: ${res.inbound.length}, out: ${res.outbound.length})`);

        for (const dir of ['inbound', 'outbound']) {
          for (const dep of res[dir]) {
            allRecords.push({
              line: 'sotetsu_jr_direct',
              stationId: st.id,
              stationName: st.name,
              direction: dir,
              dayKey,
              dw,
              hour: dep.hour,
              minute: dep.minute,
              sec: dep.sec,
              type: dep.type,
              destination: dep.destination,
              trainNo: dep.trainNo,
            });
          }
        }
      } catch (err) {
        console.warn(`  [${st.name}] dw=${dw} FAILED:`, err.message);
      }
    }
  }

  const outPath = path.resolve(__dirname, 'cache/ekitan_sotetsu_jr.json');
  fs.writeFileSync(outPath, JSON.stringify(allRecords, null, 2), 'utf8');
  console.log(`\n✅ Saved ${allRecords.length} departure records to ${outPath}`);
}

run().catch(console.error);
