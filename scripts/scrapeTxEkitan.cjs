// 駅探から首都圏新都市鉄道つくばエクスプレス（全20駅）の平日・休日時刻表をスクレイピング
const fs = require('fs');

const STATIONS = [
  { id: 'TX-01', code: '292-0', name: '秋葉原', isOrigin: true },
  { id: 'TX-02', code: '292-1', name: '新御徒町' },
  { id: 'TX-03', code: '292-2', name: '浅草' },
  { id: 'TX-04', code: '292-3', name: '南千住' },
  { id: 'TX-05', code: '292-4', name: '北千住' },
  { id: 'TX-06', code: '292-5', name: '青井' },
  { id: 'TX-07', code: '292-6', name: '六町' },
  { id: 'TX-08', code: '292-7', name: '八潮' },
  { id: 'TX-09', code: '292-8', name: '三郷中央' },
  { id: 'TX-10', code: '292-9', name: '南流山' },
  { id: 'TX-11', code: '292-10', name: '流山セントラルパーク' },
  { id: 'TX-12', code: '292-11', name: '流山おおたかの森' },
  { id: 'TX-13', code: '292-12', name: '柏の葉キャンパス' },
  { id: 'TX-14', code: '292-13', name: '柏たなか' },
  { id: 'TX-15', code: '292-14', name: '守谷' },
  { id: 'TX-16', code: '292-15', name: 'みらい平' },
  { id: 'TX-17', code: '292-16', name: 'みどりの' },
  { id: 'TX-18', code: '292-17', name: '万博記念公園' },
  { id: 'TX-19', code: '292-18', name: '研究学園' },
  { id: 'TX-20', code: '292-19', name: 'つくば', isTerminus: true },
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mapTrainType(rawType) {
  if (!rawType) return 'local';
  if (rawType.includes('通勤快速') || rawType.includes('通快')) return 'commuter_rapid';
  if (rawType.includes('区間快速') || rawType.includes('区快')) return 'semi_rapid';
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
      const destination = destMatch ? destMatch[1].trim() : 'つくば';
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
  const url = `https://ekitan.com/timetable/railway/line-station/${st.code}/d1?dw=${dw}`;
  const html = await fetchEkitanPage(url);
  const parts = html.split(/<div[^>]*class="[^"]*tab-content-inner[^"]*"[^>]*>/i);

  let inbound = [];
  let outbound = [];

  if (st.isOrigin) {
    // 秋葉原: parts[1] がつくば方面（下り/outbound）
    outbound = parseTimetableChunk(parts[1] || '');
  } else if (st.isTerminus) {
    // つくば: parts[1] が秋葉原方面（上り/inbound）
    inbound = parseTimetableChunk(parts[1] || '');
  } else {
    // 中間駅: parts[1] が秋葉原方面（上り/inbound）、parts[2] がつくば方面（下り/outbound）
    inbound = parseTimetableChunk(parts[1] || '');
    outbound = parseTimetableChunk(parts[2] || '');
  }

  return { inbound, outbound };
}

async function main() {
  console.log(`Starting scraping for all ${STATIONS.length} Tsukuba Express stations...`);
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

  // 生データをバックアップ保存
  fs.writeFileSync('scripts/ekitan_tx_raw_timetables.json', JSON.stringify(result, null, 2), 'utf8');
  console.log('Saved raw data to scripts/ekitan_tx_raw_timetables.json');

  // stationTimetables.json のフォーマットに変換して保存
  fs.writeFileSync('src/data/lines/tsukuba_express/stationTimetables.json', JSON.stringify(result, null, 2), 'utf8');
  console.log('Saved src/data/lines/tsukuba_express/stationTimetables.json');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
