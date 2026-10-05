const fs = require('fs');
const path = require('path');

const STATIONS = [
  { id: 'TJ-26', code: '210-0', name: '坂戸' },
  { id: 'TJ-41', code: '210-1', name: '一本松' },
  { id: 'TJ-42', code: '210-2', name: '西大家' },
  { id: 'TJ-43', code: '210-3', name: '川角' },
  { id: 'TJ-44', code: '210-4', name: '武州長瀬' },
  { id: 'TJ-45', code: '210-5', name: '東毛呂' },
  { id: 'TJ-46', code: '210-6', name: '武州唐沢' },
  { id: 'TJ-47', code: '210-7', name: '越生' },
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
      const rawType = typeMatch ? typeMatch[1].trim() : '普通';
      const destination = destMatch ? destMatch[1].trim() : '';
      const minute = minMatch[1];
      const href = hrefMatch ? hrefMatch[1] : '';

      let trainNo = '';
      const txMatch = href.match(/tx=([0-9a-zA-Z\-_]+)/i);
      if (txMatch) {
        const rawCode = txMatch[1];
        if (rawCode.includes('-')) {
          const parts = rawCode.split('-');
          trainNo = parts[parts.length - 1];
        } else {
          trainNo = rawCode;
        }
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
      });
    }
  }

  departures.sort((a, b) => a.sec - b.sec);
  return departures;
}

async function fetchStationTimetable(st, dw) {
  const url = `https://ekitan.com/timetable/railway/line-station/${st.code}/d1?dw=${dw}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }

  const html = await res.text();

  // 方面タブの取得
  const directionTabs = [];
  const tabMatches = [...html.matchAll(/<li[^>]*data-ek-direction_name="([^"]+)"[^>]*>/gi)];
  for (const m of tabMatches) {
    directionTabs.push(m[1].trim());
  }

  // 時刻表テーブルの取得
  const tableMatches = [...html.matchAll(/<table[^>]*class="[^"]*search-result-data ek-search-result[^"]*"[^>]*>[\s\S]*?<\/table>/gi)];

  const result = {
    inbound: [],
    outbound: [],
  };

  for (let i = 0; i < tableMatches.length; i++) {
    const tabName = directionTabs[i] || '';
    const tableHtml = tableMatches[i][0];
    const departures = parseTimetableChunk(tableHtml);

    // 方面判定
    // 越生方面: 下り (outbound)
    // 坂戸方面: 上り (inbound)
    if (tabName.includes('越生') || tabName.includes('越生方面')) {
      result.outbound = departures;
    } else if (tabName.includes('坂戸') || tabName.includes('坂戸方面')) {
      result.inbound = departures;
    } else {
      console.warn(`[${st.name}] Unknown tab: "${tabName}"`);
    }
  }

  return result;
}

async function main() {
  console.log('=== Fetching Ekitan Timetables for Tobu Ogose Line ===');
  const store = {};

  for (const st of STATIONS) {
    console.log(`\nFetching ${st.id} ${st.name} (${st.code})...`);
    store[st.id] = {
      weekday: { inbound: [], outbound: [] },
      holiday: { inbound: [], outbound: [] },
    };

    // 平日 dw=0
    try {
      const wk = await fetchStationTimetable(st, 0);
      store[st.id].weekday = wk;
      console.log(`  Weekday: Inbound=${wk.inbound.length}, Outbound=${wk.outbound.length}`);
    } catch (e) {
      console.error(`  Weekday error:`, e.message);
    }
    await sleep(250);

    // 土休日 dw=2
    try {
      const hol = await fetchStationTimetable(st, 2);
      store[st.id].holiday = hol;
      console.log(`  Holiday: Inbound=${hol.inbound.length}, Outbound=${hol.outbound.length}`);
    } catch (e) {
      console.error(`  Holiday error:`, e.message);
    }
    await sleep(250);
  }

  const outPath = path.resolve(__dirname, 'cache/ekitan_ogose_timetables.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(store, null, 2), 'utf8');
  console.log(`\nSuccessfully saved all Ekitan timetables to: ${outPath}`);
}

main().catch(console.error);
