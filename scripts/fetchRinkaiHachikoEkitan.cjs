// りんかい線・八高線の駅探時刻表スクレイピングスクリプト
const fs = require('fs');
const path = require('path');

const STATIONS_RINKAI = [
  { id: 'R-01', code: '213-0', name: '新木場', isOrigin: true },
  { id: 'R-02', code: '213-1', name: '東雲' },
  { id: 'R-03', code: '213-2', name: '国際展示場' },
  { id: 'R-04', code: '213-3', name: '東京テレポート' },
  { id: 'R-05', code: '213-4', name: '天王洲アイル' },
  { id: 'R-06', code: '213-5', name: '品川シーサイド' },
  { id: 'R-07', code: '213-6', name: '大井町' },
  { id: 'R-08', code: '213-7', name: '大崎', isTerminus: true },
];

const STATIONS_HACHIKO = [
  { id: 'HA-01', code: '25-0', name: '八王子', isOrigin: true },
  { id: 'HA-02', code: '25-1', name: '北八王子' },
  { id: 'HA-03', code: '25-2', name: '小宮' },
  { id: 'HA-04', code: '25-3', name: '拝島' },
  { id: 'HA-05', code: '25-4', name: '東福生' },
  { id: 'HA-06', code: '25-5', name: '箱根ケ崎' },
  { id: 'HA-07', code: '25-6', name: '金子' },
  { id: 'HA-08', code: '25-7', name: '東飯能' },
  { id: 'HA-09', code: '25-8', name: '高麗川' },
  { id: 'HA-10', code: '25-9', name: '毛呂' },
  { id: 'HA-11', code: '25-10', name: '越生' },
  { id: 'HA-12', code: '25-11', name: '明覚' },
  { id: 'HA-13', code: '25-12', name: '小川町' },
  { id: 'HA-14', code: '25-13', name: '竹沢' },
  { id: 'HA-15', code: '25-14', name: '折原' },
  { id: 'HA-16', code: '25-15', name: '寄居' },
  { id: 'HA-17', code: '25-16', name: '用土' },
  { id: 'HA-18', code: '25-17', name: '松久' },
  { id: 'HA-19', code: '25-18', name: '児玉' },
  { id: 'HA-20', code: '25-19', name: '丹荘' },
  { id: 'HA-21', code: '25-20', name: '群馬藤岡' },
  { id: 'HA-22', code: '25-21', name: '北藤岡' },
  { id: 'HA-23', code: '25-22', name: '倉賀野' },
  { id: 'HA-24', code: '25-23', name: '高崎', isTerminus: true },
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

async function scrapeDirectionalStation(st, dw, isRinkai) {
  let outbound = [];
  let inbound = [];

  for (const d of ['d1', 'd2']) {
    const url = `https://ekitan.com/timetable/railway/line-station/${st.code}/${d}?dw=${dw}`;
    try {
      const html = await fetchEkitanPage(url);
      const title = html.match(/<title>([^<]+)<\/title>/)?.[1] || '';
      const deps = parseTimetableChunk(html);

      if (isRinkai) {
        // りんかい線: 大崎・川越方面 -> outbound, 新木場方面 -> inbound
        if (title.includes('大崎方面') || title.includes('川越方面') || title.includes('大宮方面') || title.includes('赤羽方面')) {
          outbound = deps;
        } else if (title.includes('新木場方面') || title.includes('東京テレポート方面')) {
          inbound = deps;
        }
      } else {
        // 八高線: 高麗川・高崎・川越方面 -> outbound, 八王子方面 -> inbound
        if (title.includes('高麗川方面') || title.includes('高崎方面') || title.includes('寄居方面') || title.includes('川越方面')) {
          outbound = deps;
        } else if (title.includes('八王子方面') || title.includes('拝島方面') || title.includes('東飯能方面')) {
          inbound = deps;
        }
      }
    } catch (e) {
      // 404等は正常（終着駅）
    }
    await sleep(120);
  }

  return { outbound, inbound };
}

async function scrapeLine(stations, outFileName, lineName, isRinkai) {
  console.log(`\n=== ${lineName} 駅探時刻表スクレイピング開始 (全${stations.length}駅) ===`);
  const result = { weekday: {}, holiday: {} };

  for (let i = 0; i < stations.length; i++) {
    const st = stations[i];
    process.stdout.write(`[${i + 1}/${stations.length}] ${st.id} ${st.name} (${st.code})... `);

    // 平日 (dw=0)
    const wd = await scrapeDirectionalStation(st, 0, isRinkai);
    // 休日 (dw=2)
    const hd = await scrapeDirectionalStation(st, 2, isRinkai);

    result.weekday[st.id] = wd;
    result.holiday[st.id] = hd;

    const totalDeps =
      wd.outbound.length + wd.inbound.length + hd.outbound.length + hd.inbound.length;
    console.log(`完了 (下り:${wd.outbound.length}/${hd.outbound.length}, 上り:${wd.inbound.length}/${hd.inbound.length})`);
  }

  const outPath = path.resolve(__dirname, outFileName);
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`✅ ${lineName} 保存完了: ${outPath}`);
}

async function main() {
  await scrapeLine(STATIONS_RINKAI, 'ekitan_rinkai_timetables.json', '東京臨海高速鉄道りんかい線', true);
  await scrapeLine(STATIONS_HACHIKO, 'ekitan_hachiko_timetables.json', 'JR八高線', false);
}

main().catch((err) => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
