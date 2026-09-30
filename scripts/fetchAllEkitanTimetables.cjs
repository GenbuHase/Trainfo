const fs = require('fs');

const STATIONS = [
  { id: 'TJ-01', code: '204-0', name: '池袋', isOrigin: true },
  { id: 'TJ-02', code: '204-1', name: '北池袋' },
  { id: 'TJ-03', code: '204-2', name: '下板橋' },
  { id: 'TJ-04', code: '204-3', name: '大山' },
  { id: 'TJ-05', code: '204-4', name: '中板橋' },
  { id: 'TJ-06', code: '204-5', name: 'ときわ台' },
  { id: 'TJ-07', code: '204-6', name: '上板橋' },
  { id: 'TJ-08', code: '204-7', name: '東武練馬' },
  { id: 'TJ-09', code: '204-8', name: '下赤塚' },
  { id: 'TJ-10', code: '204-9', name: '成増' },
  { id: 'TJ-11', code: '204-10', name: '和光市' },
  { id: 'TJ-12', code: '204-11', name: '朝霞' },
  { id: 'TJ-13', code: '204-12', name: '朝霞台' },
  { id: 'TJ-14', code: '204-13', name: '志木' },
  { id: 'TJ-15', code: '204-14', name: '柳瀬川' },
  { id: 'TJ-16', code: '204-15', name: 'みずほ台' },
  { id: 'TJ-17', code: '204-16', name: '鶴瀬' },
  { id: 'TJ-18', code: '204-17', name: 'ふじみ野' },
  { id: 'TJ-19', code: '204-18', name: '上福岡' },
  { id: 'TJ-20', code: '204-19', name: '新河岸' },
  { id: 'TJ-21', code: '204-20', name: '川越' },
  { id: 'TJ-22', code: '204-21', name: '川越市' },
  { id: 'TJ-23', code: '204-22', name: '霞ヶ関' },
  { id: 'TJ-24', code: '204-23', name: '鶴ヶ島' },
  { id: 'TJ-25', code: '204-24', name: '若葉' },
  { id: 'TJ-26', code: '204-25', name: '坂戸' },
  { id: 'TJ-27', code: '204-26', name: '北坂戸' },
  { id: 'TJ-28', code: '204-27', name: '高坂' },
  { id: 'TJ-29', code: '204-28', name: '東松山' },
  { id: 'TJ-30', code: '204-29', name: '森林公園' },
  { id: 'TJ-31', code: '204-37', name: 'つきのわ' },
  { id: 'TJ-32', code: '204-30', name: '武蔵嵐山' },
  { id: 'TJ-33', code: '204-31', name: '小川町' },
  { id: 'TJ-34', code: '204-32', name: '東武竹沢' },
  { id: 'TJ-35', code: '204-38', name: 'みなみ寄居' },
  { id: 'TJ-36', code: '204-33', name: '男衾' },
  { id: 'TJ-37', code: '204-34', name: '鉢形' },
  { id: 'TJ-38', code: '204-35', name: '玉淀' },
  { id: 'TJ-39', code: '204-36', name: '寄居', isTerminus: true },
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mapTrainType(rawType) {
  if (!rawType) return 'local';
  if (rawType.includes('TJ') || rawType.includes('ＴＪ')) return 'tjLiner';
  if (rawType.includes('川越特急') || rawType.includes('川特')) return 'kawagoeExp';
  if (rawType.includes('快速急行') || rawType.includes('快急')) return 'rapidExp';
  if (rawType.includes('急行')) return 'express';
  if (rawType.includes('準急')) return 'semiExp';
  return 'local';
}

function parseTimetableSection(htmlChunk) {
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
      const destination = destMatch ? destMatch[1].trim() : '小川町';
      const minute = minMatch[1];
      const href = hrefMatch ? hrefMatch[1] : '';

      let trainNo = '';
      const txMatch = href.match(/tx=[^-]+-[^-]+-(\d+[a-zA-Z]?)/i);
      if (txMatch) {
        trainNo = `${txMatch[1]}レ`;
      } else {
        trainNo = `${hour}${minute}レ`;
      }

      departures.push({
        hour: parseInt(hour, 10),
        minute: parseInt(minute, 10),
        time: `${minute}`, // MM文字列
        fullTime: `${hour}:${minute}:00`,
        rawType,
        type: mapTrainType(rawType),
        destination,
        trainNo
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
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8'
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const html = await res.text();

  const parts = html.split(/<div[^>]*class="[^"]*tab-content-inner[^"]*"[^>]*>/i);

  let inbound = [];
  let outbound = [];

  if (st.isOrigin) {
    // 池袋: parts[1] が下り (outbound)
    outbound = parseTimetableSection(parts[1] || '');
  } else if (st.isTerminus) {
    // 寄居: parts[1] が上り (inbound)
    inbound = parseTimetableSection(parts[1] || '');
  } else {
    // 途中駅: parts[1] が上り (inbound)、parts[2] が下り (outbound)
    inbound = parseTimetableSection(parts[1] || '');
    outbound = parseTimetableSection(parts[2] || '');
  }

  return { inbound, outbound };
}

async function main() {
  console.log('Starting full Ekitan timetable scraping for all 39 stations...');
  const result = {
    weekday: {},
    holiday: {}
  };

  for (let i = 0; i < STATIONS.length; i++) {
    const st = STATIONS[i];
    console.log(`[${i + 1}/${STATIONS.length}] Fetching ${st.id} ${st.name} (${st.code})...`);

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
      console.error(`Error fetching ${st.name}:`, err.message);
    }
  }

  const outPath = 'scripts/ekitan_all_stations_timetables.json';
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\nSuccessfully saved all station timetables to ${outPath}!`);
}

main().catch(console.error);
