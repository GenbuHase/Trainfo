// 東京メトロ有楽町線・副都心線の駅探時刻表スクレイピングスクリプト
const fs = require('fs');

const STATIONS_YURAKUCHO = [
  { id: 'Y-01', code: '675-0', name: '和光市', isOrigin: true },
  { id: 'Y-02', code: '675-1', name: '地下鉄成増' },
  { id: 'Y-03', code: '675-2', name: '地下鉄赤塚' },
  { id: 'Y-04', code: '675-3', name: '平和台' },
  { id: 'Y-05', code: '675-4', name: '氷川台' },
  { id: 'Y-06', code: '676-0', name: '小竹向原' },
  { id: 'Y-07', code: '271-6', name: '千川' },
  { id: 'Y-08', code: '271-7', name: '要町' },
  { id: 'Y-09', code: '271-8', name: '池袋' },
  { id: 'Y-10', code: '271-9', name: '東池袋' },
  { id: 'Y-11', code: '271-10', name: '護国寺' },
  { id: 'Y-12', code: '271-11', name: '江戸川橋' },
  { id: 'Y-13', code: '271-12', name: '飯田橋' },
  { id: 'Y-14', code: '271-13', name: '市ケ谷' },
  { id: 'Y-15', code: '271-14', name: '麹町' },
  { id: 'Y-16', code: '271-15', name: '永田町' },
  { id: 'Y-17', code: '271-16', name: '桜田門' },
  { id: 'Y-18', code: '271-17', name: '有楽町' },
  { id: 'Y-19', code: '271-18', name: '銀座一丁目' },
  { id: 'Y-20', code: '271-19', name: '新富町' },
  { id: 'Y-21', code: '271-20', name: '月島' },
  { id: 'Y-22', code: '271-21', name: '豊洲' },
  { id: 'Y-23', code: '271-22', name: '辰巳' },
  { id: 'Y-24', code: '271-23', name: '新木場', isTerminus: true },
];

const STATIONS_FUKUTOSHIN = [
  { id: 'F-01', code: '675-0', name: '和光市', isOrigin: true },
  { id: 'F-02', code: '675-1', name: '地下鉄成増' },
  { id: 'F-03', code: '675-2', name: '地下鉄赤塚' },
  { id: 'F-04', code: '675-3', name: '平和台' },
  { id: 'F-05', code: '675-4', name: '氷川台' },
  { id: 'F-06', code: '677-0', name: '小竹向原' },
  { id: 'F-07', code: '674-6', name: '千川' },
  { id: 'F-08', code: '674-7', name: '要町' },
  { id: 'F-09', code: '674-8', name: '池袋' },
  { id: 'F-10', code: '674-9', name: '雑司が谷' },
  { id: 'F-11', code: '674-10', name: '西早稲田' },
  { id: 'F-12', code: '674-11', name: '東新宿' },
  { id: 'F-13', code: '674-12', name: '新宿三丁目' },
  { id: 'F-14', code: '674-13', name: '北参道' },
  { id: 'F-15', code: '674-14', name: '明治神宮前' },
  { id: 'F-16', code: '674-15', name: '渋谷', isTerminus: true },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseTimetableSection(htmlChunk) {
  const departures = [];
  const trMatches = htmlChunk.match(/<tr[^>]*class="[^"]*ek-hour_line[^"]*"[^>]*>[\s\S]*?<\/tr>/gi) || [];

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
      const minute = parseInt(minMatch[1], 10);
      const rawType = typeMatch ? typeMatch[1].trim() : '';
      const destination = destMatch ? destMatch[1].trim() : '';
      const href = hrefMatch ? hrefMatch[1] : '';

      let trainNo = '';
      const txMatch = href.match(/tx=([0-9a-zA-Z\-_]+)/i);
      if (txMatch) {
        const parts = txMatch[1].split('-');
        const rawNo = parts[2] || parts[0];
        // 接頭辞 [HK][YF] の除去 (例: HYA521S -> A521S, KFB501S -> B501S)
        trainNo = rawNo.replace(/^[HK][YF]/, '');
      }

      departures.push({
        hour,
        minute,
        rawType,
        destination,
        trainNo,
      });
    }
  }

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
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const html = await res.text();

  const parts = html.split(/<div[^>]*class="[^"]*tab-content-inner[^"]*"[^>]*>/i);

  let inbound = [];
  let outbound = [];

  if (st.isOrigin) {
    // 和光市: parts[1] が下り (outbound)
    outbound = parseTimetableSection(parts[1] || '');
  } else if (st.isTerminus) {
    // 新木場/渋谷: parts[1] が上り (inbound)
    inbound = parseTimetableSection(parts[1] || '');
  } else {
    // 途中駅: parts[1] が上り (inbound)、parts[2] が下り (outbound)
    inbound = parseTimetableSection(parts[1] || '');
    outbound = parseTimetableSection(parts[2] || '');
  }

  return { inbound, outbound };
}

async function scrapeLine(lineName, stations, outPath) {
  console.log(`\n=== ${lineName} 駅探時刻表取得開始 (全 ${stations.length} 駅) ===`);
  const result = {
    weekday: {},
    holiday: {},
  };

  for (let i = 0; i < stations.length; i++) {
    const st = stations[i];
    console.log(`[${i + 1}/${stations.length}] ${st.id} ${st.name} (${st.code}) 取得中...`);

    try {
      // 平日 (dw=0)
      const weekdayData = await fetchStationTimetable(st, 0);
      result.weekday[st.id] = weekdayData;
      await sleep(150);

      // 休日 (dw=2)
      const holidayData = await fetchStationTimetable(st, 2);
      result.holiday[st.id] = holidayData;
      await sleep(150);

      console.log(`  -> 平日: 上り ${weekdayData.inbound.length}本 / 下り ${weekdayData.outbound.length}本`);
      console.log(`  -> 休日: 上り ${holidayData.inbound.length}本 / 下り ${holidayData.outbound.length}本`);
    } catch (err) {
      console.error(`  ❌ エラー (${st.name}):`, err.message);
    }
  }

  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`✅ ${lineName} 保存完了: ${outPath}`);
}

async function main() {
  await scrapeLine('東京メトロ有楽町線', STATIONS_YURAKUCHO, 'scripts/ekitan_yurakucho_timetables.json');
  await scrapeLine('東京メトロ副都心線', STATIONS_FUKUTOSHIN, 'scripts/ekitan_fukutoshin_timetables.json');
}

main().catch(console.error);
