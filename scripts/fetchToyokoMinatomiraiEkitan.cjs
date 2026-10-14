const fs = require('fs');
const path = require('path');

const LINE_CONFIGS = {
  tokyu_toyoko: {
    lineCode: 216,
    stations: [
      { id: 'TY-01', name: '渋谷', index: 0 },
      { id: 'TY-02', name: '代官山', index: 1 },
      { id: 'TY-03', name: '中目黒', index: 2 },
      { id: 'TY-04', name: '祐天寺', index: 3 },
      { id: 'TY-05', name: '学芸大学', index: 4 },
      { id: 'TY-06', name: '都立大学', index: 5 },
      { id: 'TY-07', name: '自由が丘', index: 6 },
      { id: 'TY-08', name: '田園調布', index: 7 },
      { id: 'TY-09', name: '多摩川', index: 8 },
      { id: 'TY-10', name: '新丸子', index: 9 },
      { id: 'TY-11', name: '武蔵小杉', index: 10 },
      { id: 'TY-12', name: '元住吉', index: 11 },
      { id: 'TY-13', name: '日吉', index: 12 },
      { id: 'TY-14', name: '綱島', index: 13 },
      { id: 'TY-15', name: '大倉山', index: 14 },
      { id: 'TY-16', name: '菊名', index: 15 },
      { id: 'TY-17', name: '妙蓮寺', index: 16 },
      { id: 'TY-18', name: '白楽', index: 17 },
      { id: 'TY-19', name: '東白楽', index: 18 },
      { id: 'TY-20', name: '反町', index: 19 },
      { id: 'TY-21', name: '横浜', index: 20 },
    ],
    judgeDirection: (tabName) => {
      if (tabName.includes('渋谷') || tabName.includes('池袋') || tabName.includes('和光市')) return 'inbound';
      if (tabName.includes('横浜') || tabName.includes('元町・中華街')) return 'outbound';
      return null;
    }
  },
  minatomirai: {
    lineCode: 291,
    stations: [
      { id: 'MM-01', name: '横浜', index: 0 },
      { id: 'MM-02', name: '新高島', index: 1 },
      { id: 'MM-03', name: 'みなとみらい', index: 2 },
      { id: 'MM-04', name: '馬車道', index: 3 },
      { id: 'MM-05', name: '日本大通り', index: 4 },
      { id: 'MM-06', name: '元町・中華街', index: 5 },
    ],
    judgeDirection: (tabName) => {
      if (tabName.includes('横浜') || tabName.includes('渋谷') || tabName.includes('池袋')) return 'inbound';
      if (tabName.includes('元町・中華街')) return 'outbound';
      return null;
    }
  }
};

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

async function fetchEkitanStation(lineCode, stIdx, dw, judgeDirection) {
  const url = `https://ekitan.com/timetable/railway/line-station/${lineCode}-${stIdx}/d1?dw=${dw}`;
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
    const tabName = tabs[i] || '';
    const deps = parseTableChunk(tables[i]);
    const dir = judgeDirection(tabName);
    if (dir === 'inbound') {
      result.inbound.push(...deps);
    } else if (dir === 'outbound') {
      result.outbound.push(...deps);
    } else {
      console.warn(`[WARN] 方向判定不能: tabName="${tabName}"`);
    }
  }

  return result;
}

async function scrapeAll() {
  const allRows = [];
  const cacheDir = path.resolve(__dirname, 'cache');
  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
  const outPath = path.join(cacheDir, 'ekitan_toyoko_mm_train_numbers.json');

  for (const [lineKey, lineCfg] of Object.entries(LINE_CONFIGS)) {
    console.log(`\n=== Scraping Ekitan for line: ${lineKey} ===`);
    for (const st of lineCfg.stations) {
      for (const dw of [1, 2]) { // 1: 平日, 2: 休日
        const dayKey = dw === 1 ? 'weekday' : 'holiday';
        process.stdout.write(`  [${st.name} (${lineCfg.lineCode}-${st.index})] dw=${dw}... `);
        try {
          const res = await fetchEkitanStation(lineCfg.lineCode, st.index, dw, lineCfg.judgeDirection);
          for (const dep of res.inbound) {
            allRows.push({
              line: lineKey,
              stationId: st.id,
              stationName: st.name,
              direction: 'inbound',
              dayKey,
              dw,
              ...dep
            });
          }
          for (const dep of res.outbound) {
            allRows.push({
              line: lineKey,
              stationId: st.id,
              stationName: st.name,
              direction: 'outbound',
              dayKey,
              dw,
              ...dep
            });
          }
          console.log(`OK (in: ${res.inbound.length}, out: ${res.outbound.length})`);
        } catch (e) {
          console.error(`FAILED: ${e.message}`);
        }
        await sleep(120);
      }
    }
  }

  fs.writeFileSync(outPath, JSON.stringify(allRows, null, 2), 'utf8');
  console.log(`\n✅ Saved ${allRows.length} departure records to ${outPath}`);
}

scrapeAll().catch(console.error);
