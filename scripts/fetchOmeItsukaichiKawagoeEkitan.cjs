// 青梅線・五日市線・川越線（西区間）の駅探時刻表スクレイピングスクリプト
const fs = require('fs');
const path = require('path');

const STATIONS_ITSUKAICHI = [
  { id: 'JC-55', code: '44-0', name: '拝島' },
  { id: 'JC-81', code: '44-1', name: '熊川' },
  { id: 'JC-82', code: '44-2', name: '東秋留' },
  { id: 'JC-83', code: '44-3', name: '秋川' },
  { id: 'JC-84', code: '44-4', name: '武蔵引田' },
  { id: 'JC-85', code: '44-5', name: '武蔵増戸' },
  { id: 'JC-86', code: '44-6', name: '武蔵五日市' },
];

const STATIONS_OME = [
  { id: 'JC-19', code: '169-0', name: '立川' },
  { id: 'JC-51', code: '169-1', name: '西立川' },
  { id: 'JC-52', code: '169-2', name: '東中神' },
  { id: 'JC-53', code: '169-3', name: '中神' },
  { id: 'JC-54', code: '169-4', name: '昭島' },
  { id: 'JC-55', code: '169-5', name: '拝島' },
  { id: 'JC-56', code: '169-6', name: '牛浜' },
  { id: 'JC-57', code: '169-7', name: '福生' },
  { id: 'JC-58', code: '169-8', name: '羽村' },
  { id: 'JC-59', code: '169-9', name: '小作' },
  { id: 'JC-60', code: '169-10', name: '河辺' },
  { id: 'JC-61', code: '169-11', name: '東青梅' },
  { id: 'JC-62', code: '169-12', name: '青梅' },
  { id: 'JC-63', code: '169-13', name: '宮ノ平' },
  { id: 'JC-64', code: '169-14', name: '日向和田' },
  { id: 'JC-65', code: '169-15', name: '石神前' },
  { id: 'JC-66', code: '169-16', name: '二俣尾' },
  { id: 'JC-67', code: '169-17', name: '軍畑' },
  { id: 'JC-68', code: '169-18', name: '沢井' },
  { id: 'JC-69', code: '169-19', name: '御嶽' },
  { id: 'JC-70', code: '169-20', name: '川井' },
  { id: 'JC-71', code: '169-21', name: '古里' },
  { id: 'JC-72', code: '169-22', name: '鳩ノ巣' },
  { id: 'JC-73', code: '169-23', name: '白丸' },
  { id: 'JC-74', code: '169-24', name: '奥多摩' },
];

const STATIONS_KAWAGOE = [
  { id: 'JA-26', code: '65-0', name: '大宮' },
  { id: 'JA-27', code: '65-1', name: '日進' },
  { id: 'JA-28', code: '65-10', name: '西大宮' },
  { id: 'JA-29', code: '65-2', name: '指扇' },
  { id: 'JA-30', code: '65-3', name: '南古谷' },
  { id: 'JA-31', code: '65-4', name: '川越' },
  { id: 'JA-32', code: '65-5', name: '西川越' },
  { id: 'JA-33', code: '65-6', name: '的場' },
  { id: 'JA-34', code: '65-7', name: '笠幡' },
  { id: 'JA-35', code: '65-8', name: '武蔵高萩' },
  { id: 'JA-36', code: '65-9', name: '高麗川' },
];

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
  if (lineType === 'itsukaichi') {
    if (tabName.includes('武蔵五日市')) return 'outbound';
    if (tabName.includes('拝島') || tabName.includes('立川') || tabName.includes('東京')) return 'inbound';
  } else if (lineType === 'ome') {
    if (tabName.includes('拝島') || tabName.includes('奥多摩') || tabName.includes('青梅')) return 'outbound';
    if (tabName.includes('立川') || tabName.includes('東京') || tabName.includes('新宿')) return 'inbound';
  } else if (lineType === 'kawagoe') {
    if (tabName.includes('高麗川')) return 'outbound';
    if (tabName.includes('大宮')) return 'inbound';
    if (tabName.includes('川越')) {
      // 川越行き: 大宮側(JA-26〜JA-30)からは下り(outbound)、高麗川側(JA-32〜JA-36)からは上り(inbound)
      const stNum = parseInt(st.id.replace('JA-', ''), 10);
      return stNum <= 30 ? 'outbound' : 'inbound';
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
    process.stdout.write(`[${i + 1}/${stations.length}] ${st.id} (${st.name} / ${st.code})... `);

    // 平日 (dw=0)
    const wd = await scrapeStation(st, 0, lineType);
    await sleep(60);

    // 休日 (dw=2)
    const hd = await scrapeStation(st, 2, lineType);
    await sleep(60);

    result.weekday[st.id] = wd;
    result.holiday[st.id] = hd;

    const wdOut = wd.outbound.length;
    const wdIn = wd.inbound.length;
    const hdOut = hd.outbound.length;
    const hdIn = hd.inbound.length;
    console.log(`OK (WD: 下り${wdOut}/上り${wdIn}, HD: 下り${hdOut}/上り${hdIn})`);
  }

  const outPath = path.resolve('scripts', outFileName);
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`✅ ${lineName} 保存完了: ${outPath}`);
}

async function main() {
  const target = process.argv[2] || 'all';
  if (target === 'itsukaichi' || target === 'all') {
    await scrapeLine(STATIONS_ITSUKAICHI, 'ekitan_itsukaichi_timetables.json', 'JR五日市線', 'itsukaichi');
  }
  if (target === 'ome' || target === 'all') {
    await scrapeLine(STATIONS_OME, 'ekitan_ome_timetables.json', 'JR青梅線', 'ome');
  }
  if (target === 'kawagoe' || target === 'all') {
    await scrapeLine(STATIONS_KAWAGOE, 'ekitan_kawagoe_all_timetables.json', 'JR川越線', 'kawagoe');
  }
  console.log('\n🌟 全てのスクレイピング処理が完了しました！');
}

main().catch(console.error);
