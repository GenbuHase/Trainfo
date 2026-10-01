// 駅探からJR埼京線・川越線（全24駅）の平日・休日時刻表をスクレイピング
const fs = require('fs');

const STATIONS = [
  { id: 'JA-08', code: '131-18', name: '大崎', line: 'saikyo', isOrigin: true },
  { id: 'JA-09', code: '131-0', name: '恵比寿', line: 'saikyo' },
  { id: 'JA-10', code: '131-1', name: '渋谷', line: 'saikyo' },
  { id: 'JA-11', code: '131-2', name: '新宿', line: 'saikyo' },
  { id: 'JA-12', code: '131-3', name: '池袋', line: 'saikyo' },
  { id: 'JA-13', code: '131-4', name: '板橋', line: 'saikyo' },
  { id: 'JA-14', code: '131-5', name: '十条', line: 'saikyo' },
  { id: 'JA-15', code: '131-6', name: '赤羽', line: 'saikyo' },
  { id: 'JA-16', code: '131-7', name: '北赤羽', line: 'saikyo' },
  { id: 'JA-17', code: '131-8', name: '浮間舟渡', line: 'saikyo' },
  { id: 'JA-18', code: '131-9', name: '戸田公園', line: 'saikyo' },
  { id: 'JA-19', code: '131-10', name: '戸田', line: 'saikyo' },
  { id: 'JA-20', code: '131-11', name: '北戸田', line: 'saikyo' },
  { id: 'JA-21', code: '131-12', name: '武蔵浦和', line: 'saikyo' },
  { id: 'JA-22', code: '131-13', name: '中浦和', line: 'saikyo' },
  { id: 'JA-23', code: '131-14', name: '南与野', line: 'saikyo' },
  { id: 'JA-24', code: '131-15', name: '与野本町', line: 'saikyo' },
  { id: 'JA-25', code: '131-16', name: '北与野', line: 'saikyo' },
  { id: 'JA-26', code: '131-17', name: '大宮', line: 'saikyo', isOmiya: true },
  { id: 'JA-27', code: '65-1', name: '日進', line: 'kawagoe' },
  { id: 'JA-28', code: '65-10', name: '西大宮', line: 'kawagoe' },
  { id: 'JA-29', code: '65-2', name: '指扇', line: 'kawagoe' },
  { id: 'JA-30', code: '65-3', name: '南古谷', line: 'kawagoe' },
  { id: 'JA-31', code: '65-4', name: '川越', line: 'kawagoe', isKawagoe: true },
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mapTrainType(rawType) {
  if (!rawType) return 'local';
  if (rawType.includes('通勤快速') || rawType.includes('通快')) return 'commuter';
  if (rawType.includes('快速')) return 'rapid';
  return 'local';
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
      const destination = destMatch ? destMatch[1].trim() : '大宮';
      const minute = minMatch[1];
      const href = hrefMatch ? hrefMatch[1] : '';

      let trainNo = '';
      const txMatch = href.match(/tx=[^-]+-[^-]+-([0-9a-zA-Z]+)/i);
      if (txMatch) {
        trainNo = txMatch[1];
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
        t: mapTrainType(rawType),
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
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8'
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

async function fetchStationData(st, dw) {
  // 基本ページを取得
  const url = `https://ekitan.com/timetable/railway/line-station/${st.code}/d1?dw=${dw}`;
  const html = await fetchEkitanPage(url);

  // tab-content-inner で分割
  const parts = html.split(/<div[^>]*class="[^"]*tab-content-inner[^"]*"[^>]*>/i);

  let inbound = [];
  let outbound = [];

  if (st.isOrigin) {
    // 大崎: parts[1] は海老名方面、parts[2] は新宿・大宮方面（下り/outbound）
    outbound = parseTimetableChunk(parts[2] || parts[1] || '');
  } else if (st.isOmiya) {
    // 大宮: 埼京線側（131-17）parts[1] は新宿・大崎方面（上り/inbound）
    inbound = parseTimetableChunk(parts[1] || '');
    // 大宮の川越方面（下り）は川越線（65-0/d1）から取得
    await sleep(100);
    const kawagoeUrl = `https://ekitan.com/timetable/railway/line-station/65-0/d1?dw=${dw}`;
    const kawagoeHtml = await fetchEkitanPage(kawagoeUrl);
    const kParts = kawagoeHtml.split(/<div[^>]*class="[^"]*tab-content-inner[^"]*"[^>]*>/i);
    outbound = parseTimetableChunk(kParts[1] || '');
  } else if (st.isKawagoe) {
    // 川越: parts[1] が大宮方面（上り/inbound）、parts[2] は高麗川方面
    inbound = parseTimetableChunk(parts[1] || '');
  } else if (st.line === 'kawagoe') {
    // 日進〜南古谷: parts[1] が大宮方面（上り/inbound）、parts[2] が川越方面（下り/outbound）
    inbound = parseTimetableChunk(parts[1] || '');
    outbound = parseTimetableChunk(parts[2] || '');
  } else {
    // 恵比寿〜北与野: parts[1] が新宿・大崎方面（上り/inbound）、parts[2] が大宮方面（下り/outbound）
    inbound = parseTimetableChunk(parts[1] || '');
    outbound = parseTimetableChunk(parts[2] || '');
  }

  return { inbound, outbound };
}

async function main() {
  console.log(`Starting scraping for all ${STATIONS.length} Saikyo/Kawagoe stations...`);
  const result = {
    weekday: {},
    holiday: {}
  };

  for (let i = 0; i < STATIONS.length; i++) {
    const st = STATIONS[i];
    console.log(`[${i + 1}/${STATIONS.length}] Fetching ${st.id} ${st.name} (${st.code})...`);

    try {
      // 平日 (dw=0)
      const wd = await fetchStationData(st, 0);
      result.weekday[st.id] = wd;
      console.log(`  Weekday: 上り ${wd.inbound.length}本 / 下り ${wd.outbound.length}本`);
      await sleep(150);

      // 休日 (dw=2)
      const hd = await fetchStationData(st, 2);
      result.holiday[st.id] = hd;
      console.log(`  Holiday: 上り ${hd.inbound.length}本 / 下り ${hd.outbound.length}本`);
      await sleep(150);
    } catch (e) {
      console.error(`  Error fetching ${st.name}:`, e.message);
    }
  }

  const outPath = 'scripts/ekitan_saikyo_raw_timetables.json';
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`Saved all station timetables to ${outPath}`);
}

main().catch(console.error);
