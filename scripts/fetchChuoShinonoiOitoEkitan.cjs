// 中央線快速、中央本線、篠ノ井線、大糸線の駅探時刻表スクレイピングスクリプト
const fs = require('fs');
const path = require('path');

// 1. 中央線快速 (JC-01 〜 JC-24)
const STATIONS_CHUO = [];
for (let i = 0; i <= 23; i++) {
  const num = (i + 1).toString().padStart(2, '0');
  STATIONS_CHUO.push({ id: `JC-${num}`, code: `180-${i}` });
}

// 2. 中央本線 (JC-24 〜 CO-42)
const chuoMainTs = fs.readFileSync(path.resolve('src/data/lines/chuo_main/stations.ts'), 'utf8');
const cmMatches = [...chuoMainTs.matchAll(/"id":\s*"([^"]+)",[\s\S]*?"name":\s*"([^"]+)"/g)];
const STATIONS_CHUO_MAIN = cmMatches.map((m, idx) => ({ id: m[1], name: m[2], code: `9-${idx + 5}` }));

// 3. 篠ノ井線 (SN-01 〜 SN-19)
const STATIONS_SHINONOI = [
  { id: 'SN-01', code: '128-0', name: '塩尻' },
  { id: 'SN-02', code: '128-1', name: '広丘' },
  { id: 'SN-03', code: '128-2', name: '村井' },
  { id: 'SN-04', code: '128-14', name: '平田' },
  { id: 'SN-05', code: '128-3', name: '南松本' },
  { id: 'SN-06', code: '128-4', name: '松本' },
  { id: 'SN-07', code: '128-5', name: '田沢' },
  { id: 'SN-08', code: '128-6', name: '明科' },
  { id: 'SN-09', code: '128-7', name: '西条' },
  { id: 'SN-10', code: '128-8', name: '坂北' },
  { id: 'SN-11', code: '128-9', name: '聖高原' },
  { id: 'SN-12', code: '128-10', name: '冠着' },
  { id: 'SN-13', code: '128-11', name: '姨捨' },
  { id: 'SN-14', code: '128-12', name: '稲荷山' },
  { id: 'SN-15', code: '128-13', name: '篠ノ井' },
  { id: 'SN-16', code: '127-1', name: '今井' },
  { id: 'SN-17', code: '127-2', name: '川中島' },
  { id: 'SN-18', code: '127-3', name: '安茂里' },
  { id: 'SN-19', code: '127-4', name: '長野' },
];

// 4. 大糸線 (OE-01 〜 OE-33, OW-01 〜 OW-09)
const STATIONS_OITO = [];
for (let i = 0; i <= 32; i++) {
  const num = (i + 1).toString().padStart(2, '0');
  STATIONS_OITO.push({ id: `OE-${num}`, code: `168-${i}` });
}
for (let i = 0; i <= 8; i++) {
  const num = (i + 1).toString().padStart(2, '0');
  STATIONS_OITO.push({ id: `OW-${num}`, code: `168-${i + 32}` });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseTableChunk(tableHtml) {
  const departures = [];
  const trMatches = tableHtml.match(/<tr[^>]*class="[^"]*ek-hour_line[^"]*"[^>]*>[\s\S]*?<\/tr>/gi) || [];

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
        rawType,
      });
    }
  }

  departures.sort((a, b) => a.sec - b.sec);
  return departures;
}

async function fetchEkitanPage(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

function judgeDirection(tabName, lineType, st) {
  if (lineType === 'chuo') {
    // 中央線快速
    if (tabName.includes('高尾') || tabName.includes('八王子') || tabName.includes('立川') || tabName.includes('青梅') || tabName.includes('豊田')) {
      return 'outbound';
    }
    if (tabName.includes('東京') || tabName.includes('新宿') || tabName.includes('御茶ノ水')) {
      return 'inbound';
    }
  } else if (lineType === 'chuo_main') {
    // 中央本線: 下りはすべて「松本方面」、上りはすべて「新宿・高尾方面」
    if (tabName.includes('松本')) {
      return 'outbound';
    }
    if (tabName.includes('新宿') || tabName.includes('高尾')) {
      return 'inbound';
    }
  } else if (lineType === 'shinonoi') {
    // 篠ノ井線:
    // SN-01〜SN-15 (塩尻〜篠ノ井): 下り=篠ノ井方面, 上り=塩尻方面
    // SN-16〜SN-19 (今井〜長野): 下り=長野方面, 上り=篠ノ井方面
    const stNum = parseInt(st.id.replace('SN-', ''), 10);
    if (stNum <= 15) {
      if (tabName.includes('篠ノ井')) return 'outbound';
      if (tabName.includes('塩尻')) return 'inbound';
    } else {
      if (tabName.includes('長野')) return 'outbound';
      if (tabName.includes('篠ノ井')) return 'inbound';
    }
  } else if (lineType === 'oito') {
    // 大糸線: 下り=糸魚川方面, 上り=松本方面
    if (tabName.includes('糸魚川')) {
      return 'outbound';
    }
    if (tabName.includes('松本')) {
      return 'inbound';
    }
  }
  return null;
}

async function scrapeStation(st, dw, lineType) {
  let outbound = [];
  let inbound = [];

  const url = `https://ekitan.com/timetable/railway/line-station/${st.code}/d1?dw=${dw}`;
  try {
    const html = await fetchEkitanPage(url);
    const tabs = [...html.matchAll(/class="[^"]*ek-direction_tab[^"]*"[^>]*data-ek-direction_name="([^"]+)"/gi)].map(m => m[1]);
    const tables = [...html.matchAll(/<table[^>]*class="[^"]*ek-search-result[^"]*"[^>]*>([\s\S]*?)<\/table>/gi)].map(m => m[1]);

    for (let i = 0; i < tables.length; i++) {
      const tabName = tabs[i] || '';
      const deps = parseTableChunk(tables[i]);
      const dir = judgeDirection(tabName, lineType, st);

      if (dir === 'outbound') {
        outbound = deps;
      } else if (dir === 'inbound') {
        inbound = deps;
      } else {
        // 対象外方面（例: 各停、辰野支線、中央西線）
      }
    }
  } catch (e) {
    console.error(`\n[ERROR] Failed to fetch ${st.id} (${st.code}):`, e.message);
  }

  return { outbound, inbound };
}

async function scrapeLine(stations, outFileName, lineName, lineType) {
  console.log(`\n=== ${lineName} 駅探時刻表スクレイピング開始 (全${stations.length}駅) ===`);
  const result = { weekday: {}, holiday: {} };

  for (let i = 0; i < stations.length; i++) {
    const st = stations[i];
    process.stdout.write(`[${i + 1}/${stations.length}] ${st.id} (${st.code})... `);

    // 平日 (dw=0)
    const wd = await scrapeStation(st, 0, lineType);
    await sleep(60);

    // 休日 (dw=2)
    const hd = await scrapeStation(st, 2, lineType);
    await sleep(60);

    result.weekday[st.id] = wd;
    result.holiday[st.id] = hd;

    console.log(`完了 (下り:平日${wd.outbound.length}/休${hd.outbound.length}, 上り:平日${wd.inbound.length}/休${hd.inbound.length})`);
  }

  const outPath = path.resolve(__dirname, outFileName);
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`✅ ${lineName} 保存完了: ${outPath}`);
}

async function main() {
  const lineArg = process.argv[2] || 'all';

  if (lineArg === 'chuo' || lineArg === 'all') {
    await scrapeLine(STATIONS_CHUO, 'ekitan_chuo_timetables.json', 'JR中央線快速', 'chuo');
  }
  if (lineArg === 'chuo_main' || lineArg === 'all') {
    await scrapeLine(STATIONS_CHUO_MAIN, 'ekitan_chuo_main_timetables.json', 'JR中央本線', 'chuo_main');
  }
  if (lineArg === 'shinonoi' || lineArg === 'all') {
    await scrapeLine(STATIONS_SHINONOI, 'ekitan_shinonoi_timetables.json', 'JR篠ノ井線', 'shinonoi');
  }
  if (lineArg === 'oito' || lineArg === 'all') {
    await scrapeLine(STATIONS_OITO, 'ekitan_oito_timetables.json', 'JR大糸線', 'oito');
  }
}

main().catch((err) => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
