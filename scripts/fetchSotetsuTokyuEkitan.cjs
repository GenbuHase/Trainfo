const fs = require('fs');
const path = require('path');

const LINE_CONFIGS = {
  tokyu_shin_yokohama: {
    lineCode: 753,
    stations: [
      { id: 'SH-03', name: '日吉', index: 0 },
      { id: 'SH-02', name: '新綱島', index: 1 },
      { id: 'SH-01', name: '新横浜', index: 2 },
    ],
    judgeDirection: (tabName) => {
      if (tabName.includes('日吉') || tabName.includes('渋谷') || tabName.includes('目黒')) return 'inbound';
      if (tabName.includes('新横浜') || tabName.includes('海老名') || tabName.includes('湘南台')) return 'outbound';
      return null;
    }
  },
  sotetsu_shin_yokohama: {
    lineCode: 259,
    stations: [
      { id: 'SO-08', name: '西谷', index: 0 },
      { id: 'SO-51', name: '羽沢横浜国大', index: 1 },
      { id: 'SO-52', name: '新横浜', index: 2 },
    ],
    judgeDirection: (tabName) => {
      if (tabName.includes('新横浜') || tabName.includes('新宿') || tabName.includes('渋谷') || tabName.includes('目黒')) return 'inbound';
      if (tabName.includes('西谷') || tabName.includes('海老名') || tabName.includes('湘南台')) return 'outbound';
      return null;
    }
  },
  sotetsu_main: {
    lineCode: 229,
    stations: [
      { id: 'SO-01', name: '横浜', index: 0 },
      { id: 'SO-02', name: '平沼橋', index: 1 },
      { id: 'SO-03', name: '西横浜', index: 2 },
      { id: 'SO-04', name: '天王町', index: 3 },
      { id: 'SO-05', name: '星川', index: 4 },
      { id: 'SO-06', name: '和田町', index: 5 },
      { id: 'SO-07', name: '上星川', index: 6 },
      { id: 'SO-08', name: '西谷', index: 7 },
      { id: 'SO-09', name: '鶴ヶ峰', index: 8 },
      { id: 'SO-10', name: '二俣川', index: 9 },
      { id: 'SO-11', name: '希望ヶ丘', index: 10 },
      { id: 'SO-12', name: '三ツ境', index: 11 },
      { id: 'SO-13', name: '瀬谷', index: 12 },
      { id: 'SO-14', name: '大和', index: 13 },
      { id: 'SO-15', name: '相模大塚', index: 14 },
      { id: 'SO-16', name: 'さがみ野', index: 15 },
      { id: 'SO-17', name: 'かしわ台', index: 16 },
      { id: 'SO-18', name: '海老名', index: 17 },
    ],
    judgeDirection: (tabName) => {
      if (tabName.includes('横浜')) return 'inbound';
      if (tabName.includes('海老名') || tabName.includes('湘南台')) return 'outbound';
      return null;
    }
  },
  sotetsu_izumino: {
    lineCode: 230,
    stations: [
      { id: 'SO-10', name: '二俣川', index: 0 },
      { id: 'SO-31', name: '南万騎が原', index: 1 },
      { id: 'SO-32', name: '緑園都市', index: 2 },
      { id: 'SO-33', name: '弥生台', index: 3 },
      { id: 'SO-34', name: 'いずみ野', index: 4 },
      { id: 'SO-35', name: 'いずみ中央', index: 5 },
      { id: 'SO-36', name: 'ゆめが丘', index: 6 },
      { id: 'SO-37', name: '湘南台', index: 7 },
    ],
    judgeDirection: (tabName) => {
      if (tabName.includes('二俣川') || tabName.includes('横浜')) return 'inbound';
      if (tabName.includes('湘南台')) return 'outbound';
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
    }
  }

  return result;
}

async function scrapeAll() {
  const allRows = [];
  const cacheDir = path.resolve(__dirname, 'cache');
  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
  const outPath = path.join(cacheDir, 'ekitan_sotetsu_tokyu.json');

  for (const [lineKey, lineCfg] of Object.entries(LINE_CONFIGS)) {
    console.log(`\n=== Scraping Ekitan for line: ${lineKey} ===`);
    for (const st of lineCfg.stations) {
      for (const dw of [1, 2]) { // 1: 平日, 2: 休日
        const dayKey = dw === 1 ? 'weekday' : 'holiday';
        process.stdout.write(`  [${st.name}] dw=${dw}... `);
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
        await sleep(150);
      }
    }
  }

  fs.writeFileSync(outPath, JSON.stringify(allRows, null, 2), 'utf8');
  console.log(`\n✅ Saved ${allRows.length} departure records to ${outPath}`);
}

scrapeAll().catch(console.error);
