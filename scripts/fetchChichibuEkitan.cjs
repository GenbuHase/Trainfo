// 駅探 時刻表スクレイパー (秩父鉄道秩父本線)
const fs = require('fs');
const path = require('path');

const STATIONS = [
  { id: 'CR-01', name: '羽生', code: '226-0' },
  { id: 'CR-02', name: '西羽生', code: '226-1' },
  { id: 'CR-03', name: '新郷', code: '226-2' },
  { id: 'CR-04', name: '武州荒木', code: '226-3' },
  { id: 'CR-05', name: '東行田', code: '226-4' },
  { id: 'CR-06', name: '行田市', code: '226-5' },
  { id: 'CR-07', name: '持田', code: '226-6' },
  { id: 'CR-08', name: 'ソシオ流通センター', code: '226-35' },
  { id: 'CR-09', name: '熊谷', code: '226-7' },
  { id: 'CR-10', name: '上熊谷', code: '226-8' },
  { id: 'CR-11', name: '石原', code: '226-9' },
  { id: 'CR-12', name: 'ひろせ野鳥の森', code: '226-34' },
  { id: 'CR-13', name: '大麻生', code: '226-10' },
  { id: 'CR-14', name: '明戸', code: '226-11' },
  { id: 'CR-15', name: '武川', code: '226-12' },
  { id: 'CR-16', name: '永田', code: '226-13' },
  { id: 'CR-17', name: 'ふかや花園', code: '226-36' },
  { id: 'CR-18', name: '小前田', code: '226-14' },
  { id: 'CR-19', name: '桜沢', code: '226-15' },
  { id: 'CR-20', name: '寄居', code: '226-16' },
  { id: 'CR-21', name: '波久礼', code: '226-17' },
  { id: 'CR-22', name: '樋口', code: '226-18' },
  { id: 'CR-23', name: '野上', code: '226-19' },
  { id: 'CR-24', name: '長瀞', code: '226-20' },
  { id: 'CR-25', name: '上長瀞', code: '226-21' },
  { id: 'CR-26', name: '親鼻', code: '226-22' },
  { id: 'CR-27', name: '皆野', code: '226-23' },
  { id: 'CR-28', name: '和銅黒谷', code: '226-24' },
  { id: 'CR-29', name: '大野原', code: '226-25' },
  { id: 'CR-30', name: '秩父', code: '226-26' },
  { id: 'CR-31', name: '御花畑', code: '226-27' },
  { id: 'CR-32', name: '影森', code: '226-28' },
  { id: 'CR-33', name: '浦山口', code: '226-29' },
  { id: 'CR-34', name: '武州中川', code: '226-30' },
  { id: 'CR-35', name: '武州日野', code: '226-31' },
  { id: 'CR-36', name: '白久', code: '226-32' },
  { id: 'CR-37', name: '三峰口', code: '226-33' },
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function parseTableChunk(tableHtml) {
  const departures = [];
  const trMatches = tableHtml.match(/<tr[^>]*class="[^"]*ek-hour_line[^"]*"[^>]*>[\s\S]*?<\/tr>/gi) || [];

  for (const tr of trMatches) {
    const hourMatch = tr.match(/<td>\s*(\d{1,2})\s*<\/td>/i);
    if (!hourMatch) continue;
    const hour = hourMatch[1].padStart(2, '0');

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
  if (st.id === 'CR-01') return 'outbound';
  if (st.id === 'CR-37') return 'inbound';

  if (
    tabName.includes('三峰口') ||
    tabName.includes('影森') ||
    tabName.includes('寄居') ||
    tabName.includes('秩父') ||
    tabName.includes('長瀞')
  ) {
    return 'outbound';
  }
  if (tabName.includes('羽生') || tabName.includes('熊谷') || tabName.includes('行田')) {
    return 'inbound';
  }
  return null;
}

async function scrapeStation(st, dw) {
  let outbound = [];
  let inbound = [];

  const url = `https://ekitan.com/timetable/railway/line-station/${st.code}/d1?dw=${dw}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

    const tabs = [...html.matchAll(/class="[^"]*ek-direction_tab[^"]*"[^>]*data-ek-direction_name="([^"]+)"/gi)].map(
      (m) => m[1]
    );
    const tables = [...html.matchAll(/<table[^>]*class="[^"]*ek-search-result[^"]*"[^>]*>([\s\S]*?)<\/table>/gi)].map(
      (m) => m[1]
    );

    for (let i = 0; i < tables.length; i++) {
      const tabName = tabs[i] || '';
      const deps = parseTableChunk(tables[i]);
      const dir = judgeDirection(tabName, st);

      if (dir === 'outbound') outbound = deps;
      else if (dir === 'inbound') inbound = deps;
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

  console.log('=== 駅探 秩父鉄道 時刻表収集開始 ===');

  for (const day of [
    { key: 'weekday', dw: 0 },
    { key: 'holiday', dw: 2 },
  ]) {
    console.log(`\n--- ${day.key} (dw=${day.dw}) 収集開始 ---`);
    for (let i = 0; i < STATIONS.length; i++) {
      const st = STATIONS[i];
      process.stdout.write(`[${i + 1}/${STATIONS.length}] ${st.id} ${st.name}... `);
      const data = await scrapeStation(st, day.dw);
      result[day.key][st.id] = data;
      console.log(`下り: ${data.outbound.length}本, 上り: ${data.inbound.length}本`);
      await sleep(150);
    }
  }

  const outPath = path.resolve('scripts/ekitan_chichibu_timetables.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 駅探時刻表データを保存しました: ${outPath}`);
}

main().catch(console.error);
