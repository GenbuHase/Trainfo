const fs = require('fs');
const path = require('path');

const STATIONS = [
  { id: 'OH-01', code: '246-0', name: '新宿' },
  { id: 'OH-02', code: '246-1', name: '南新宿' },
  { id: 'OH-03', code: '246-2', name: '参宮橋' },
  { id: 'OH-04', code: '246-3', name: '代々木八幡' },
  { id: 'OH-05', code: '246-4', name: '代々木上原' },
  { id: 'OH-06', code: '246-5', name: '東北沢' },
  { id: 'OH-07', code: '246-6', name: '下北沢' },
  { id: 'OH-08', code: '246-7', name: '世田谷代田' },
  { id: 'OH-09', code: '246-8', name: '梅ヶ丘' },
  { id: 'OH-10', code: '246-9', name: '豪徳寺' },
  { id: 'OH-11', code: '246-10', name: '経堂' },
  { id: 'OH-12', code: '246-11', name: '千歳船橋' },
  { id: 'OH-13', code: '246-12', name: '祖師ヶ谷大蔵' },
  { id: 'OH-14', code: '246-13', name: '成城学園前' },
  { id: 'OH-15', code: '246-14', name: '喜多見' },
  { id: 'OH-16', code: '246-15', name: '狛江' },
  { id: 'OH-17', code: '246-16', name: '和泉多摩川' },
  { id: 'OH-18', code: '246-17', name: '登戸' },
  { id: 'OH-19', code: '246-18', name: '向ヶ丘遊園' },
  { id: 'OH-20', code: '246-19', name: '生田' },
  { id: 'OH-21', code: '246-20', name: '読売ランド前' },
  { id: 'OH-22', code: '246-21', name: '百合ヶ丘' },
  { id: 'OH-23', code: '246-22', name: '新百合ヶ丘' },
  { id: 'OH-24', code: '246-23', name: '柿生' },
  { id: 'OH-25', code: '246-24', name: '鶴川' },
  { id: 'OH-26', code: '246-25', name: '玉川学園前' },
  { id: 'OH-27', code: '246-26', name: '町田' },
  { id: 'OH-28', code: '246-27', name: '相模大野' },
  { id: 'OH-29', code: '246-28', name: '小田急相模原' },
  { id: 'OH-30', code: '246-29', name: '相武台前' },
  { id: 'OH-31', code: '246-30', name: '座間' },
  { id: 'OH-32', code: '246-31', name: '海老名' },
  { id: 'OH-33', code: '246-32', name: '厚木' },
  { id: 'OH-34', code: '246-33', name: '本厚木' },
  { id: 'OH-35', code: '246-34', name: '愛甲石田' },
  { id: 'OH-36', code: '246-35', name: '伊勢原' },
  { id: 'OH-37', code: '246-36', name: '鶴巻温泉' },
  { id: 'OH-38', code: '246-37', name: '東海大学前' },
  { id: 'OH-39', code: '246-38', name: '秦野' },
  { id: 'OH-40', code: '246-39', name: '渋沢' },
  { id: 'OH-41', code: '246-40', name: '新松田' },
  { id: 'OH-42', code: '246-41', name: '開成' },
  { id: 'OH-43', code: '246-42', name: '栢山' },
  { id: 'OH-44', code: '246-43', name: '富水' },
  { id: 'OH-45', code: '246-44', name: '螢田' },
  { id: 'OH-46', code: '246-45', name: '足柄' },
  { id: 'OH-47', code: '246-46', name: '小田原' },
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
  if (tabName.includes('小田原方面') || tabName.includes('本厚木方面') || tabName.includes('相模大野方面') || tabName.includes('町田方面') || tabName.includes('藤沢方面') || tabName.includes('唐木田方面') || tabName.includes('箱根湯本方面')) return 'outbound';
  if (tabName.includes('新宿方面') || tabName.includes('代々木上原方面') || tabName.includes('北綾瀬方面') || tabName.includes('我孫子方面') || tabName.includes('取手方面')) return 'inbound';
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

  console.log('=== Fetching Odakyu Odawara Line from Ekitan ===');

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
      await sleep(150);
    }
  }

  const outPath = path.resolve(__dirname, 'ekitan_odakyu_odawara_timetables.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\nSaved Ekitan data to: ${outPath}`);
}

main().catch(console.error);
