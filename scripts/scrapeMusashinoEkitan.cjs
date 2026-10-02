// 駅探からJR武蔵野線および直通区間の平日・休日時刻表をスクレイピング
const fs = require('fs');

const STATIONS = [
  // 武蔵野線本線
  { id: 'JM-35', code: '91-0', name: '府中本町', isOrigin: true },
  { id: 'JM-34', code: '91-1', name: '北府中' },
  { id: 'JM-33', code: '91-2', name: '西国分寺' },
  { id: 'JM-32', code: '91-3', name: '新小平' },
  { id: 'JM-31', code: '91-4', name: '新秋津' },
  { id: 'JM-30', code: '91-5', name: '東所沢' },
  { id: 'JM-29', code: '91-6', name: '新座' },
  { id: 'JM-28', code: '91-7', name: '北朝霞' },
  { id: 'JM-27', code: '91-8', name: '西浦和' },
  { id: 'JM-26', code: '91-9', name: '武蔵浦和' },
  { id: 'JM-25', code: '91-10', name: '南浦和' },
  { id: 'JM-24', code: '91-11', name: '東浦和' },
  { id: 'JM-23', code: '91-12', name: '東川口' },
  { id: 'JM-22', code: '91-13', name: '南越谷' },
  { id: 'JM-21', code: '91-24', name: '越谷レイクタウン' },
  { id: 'JM-20', code: '91-14', name: '吉川' },
  { id: 'JM-19', code: '91-25', name: '吉川美南' },
  { id: 'JM-18', code: '91-15', name: '新三郷' },
  { id: 'JM-17', code: '91-16', name: '三郷' },
  { id: 'JM-16', code: '91-17', name: '南流山' },
  { id: 'JM-15', code: '91-18', name: '新松戸' },
  { id: 'JM-14', code: '91-19', name: '新八柱' },
  { id: 'JM-13', code: '91-20', name: '東松戸' },
  { id: 'JM-12', code: '91-21', name: '市川大野' },
  { id: 'JM-11', code: '91-22', name: '船橋法典' },
  { id: 'JM-10', code: '91-23', name: '西船橋', isNishiFunabashi: true },

  // 京葉線直通区間（東京方面）
  { id: 'JE-09', code: '66-8', name: '市川塩浜', isKeiyo: true },
  { id: 'JE-08', code: '66-7', name: '新浦安', isKeiyo: true },
  { id: 'JE-07', code: '66-6', name: '舞浜', isKeiyo: true },
  { id: 'JE-06', code: '66-5', name: '葛西臨海公園', isKeiyo: true },
  { id: 'JE-05', code: '66-4', name: '新木場', isKeiyo: true },
  { id: 'JE-04', code: '66-3', name: '潮見', isKeiyo: true },
  { id: 'JE-03', code: '66-2', name: '越中島', isKeiyo: true },
  { id: 'JE-02', code: '66-1', name: '八丁堀', isKeiyo: true },
  { id: 'JE-01', code: '66-0', name: '東京', isTokyoKeiyo: true },

  // 京葉線直通区間（海浜幕張方面）
  { id: 'JE-11', code: '66-10', name: '南船橋', isKeiyo: true },
  { id: 'JE-12', code: '66-11', name: '新習志野', isKeiyo: true },
  { id: 'JE-13', code: '66-18', name: '幕張豊砂', isKeiyo: true },
  { id: 'JE-14', code: '66-12', name: '海浜幕張', isKaihinMakuhari: true },

  // 中央線直通区間（むさしの号）
  { id: 'JC-18', code: '180-17', name: '国立', isChuo: true },
  { id: 'JC-19', code: '180-18', name: '立川', isChuo: true },
  { id: 'JC-20', code: '180-19', name: '日野', isChuo: true },
  { id: 'JC-21', code: '180-20', name: '豊田', isChuo: true },
  { id: 'JC-22', code: '180-21', name: '八王子', isHachioji: true },

  // 大宮
  { id: 'JA-26', code: '131-17', name: '大宮', isOmiya: true },
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 種別判定（ユーザー指示: 通常は各駅停車 local, むさしの号・しもうさ号は普通 regular）
function mapTrainType(rawType, dest, trainName) {
  const combined = `${rawType} ${dest} ${trainName || ''}`;
  if (combined.includes('むさしの') || combined.includes('しもうさ')) {
    return 'regular';
  }
  return 'local';
}

function parseTimetableChunk(htmlChunk, filterMusashinoOnly = false) {
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
      const trainNameMatch = li.match(/data-train-name="([^"]+)"/i);

      if (!minMatch) continue;
      const rawType = typeMatch ? typeMatch[1].trim() : '普通';
      const destination = destMatch ? destMatch[1].trim() : '';
      const minute = minMatch[1];
      const href = hrefMatch ? hrefMatch[1] : '';
      const trainName = trainNameMatch ? trainNameMatch[1].trim() : '';

      // 京葉線や中央線・大宮等の共用駅で武蔵野線直通列車のみをフィルタリング
      if (filterMusashinoOnly) {
        const isMusashinoTrain =
          ['府中本町', '東所沢', '西船橋', '新松戸', '南越谷', '八王子', '大宮'].includes(destination) ||
          trainName.includes('むさしの') || trainName.includes('しもうさ') ||
          rawType.includes('むさしの') || rawType.includes('しもうさ');
        if (!isMusashinoTrain) continue;
      }

      let trainNo = '';
      const txMatch = href.match(/tx=[^-]+-[^-]+-([0-9a-zA-Z]+)/i);
      if (txMatch) {
        trainNo = txMatch[1];
      } else {
        trainNo = `${hour}${minute}E`;
      }

      const hNum = parseInt(hour, 10);
      const mNum = parseInt(minute, 10);
      departures.push({
        h: hNum,
        m: mNum,
        time: minute,
        sec: hNum * 3600 + mNum * 60,
        t: mapTrainType(rawType, destination, trainName),
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
    // 府中本町: parts[1] は下り（西船橋・東京方面）
    outbound = parseTimetableChunk(parts[1] || '');
  } else if (st.isNishiFunabashi) {
    // 西船橋: parts[1] は上り（府中本町方面）
    inbound = parseTimetableChunk(parts[1] || '');
    // 西船橋の下り（東京・南船橋方面）は京葉線側（66-17）
    await sleep(80);
    try {
      const keiyoNishiUrl = `https://ekitan.com/timetable/railway/line-station/66-17/d1?dw=${dw}`;
      const kHtml = await fetchEkitanPage(keiyoNishiUrl);
      const kParts = kHtml.split(/<div[^>]*class="[^"]*tab-content-inner[^"]*"[^>]*>/i);
      outbound = parseTimetableChunk(kParts[1] || '');
    } catch {
      // ignore
    }
  } else if (st.isTokyoKeiyo) {
    // 東京（京葉線）: parts[1] のうち武蔵野線直通（府中本町方面/下り）のみ
    outbound = parseTimetableChunk(parts[1] || '', true);
  } else if (st.isKaihinMakuhari) {
    // 海浜幕張: parts[1] のうち武蔵野線直通（府中本町・大宮方面）
    inbound = parseTimetableChunk(parts[1] || '', true);
  } else if (st.isKeiyo) {
    // 京葉線各駅: parts[1] 上り（東京方面）、parts[2] 下り（蘇我・海浜幕張方面）
    inbound = parseTimetableChunk(parts[1] || '');
    outbound = parseTimetableChunk(parts[2] || '');
  } else if (st.isHachioji) {
    // 八王子: parts[1] 上りのうちむさしの号（大宮行）
    outbound = parseTimetableChunk(parts[1] || '', true);
  } else if (st.isChuo) {
    // 中央線各駅: むさしの号のみ抽出
    inbound = parseTimetableChunk(parts[2] || '', true);
    outbound = parseTimetableChunk(parts[1] || '', true);
  } else if (st.isOmiya) {
    // 大宮: むさしの号（八王子行/上り）、しもうさ号（海浜幕張行/下り）
    inbound = parseTimetableChunk(parts[1] || '', true);
    outbound = parseTimetableChunk(parts[2] || '', true);
  } else {
    // 武蔵野線本線各駅: parts[1] 上り（府中本町方面）、parts[2] 下り（西船橋・東京・海浜幕張方面）
    inbound = parseTimetableChunk(parts[1] || '');
    outbound = parseTimetableChunk(parts[2] || '');
  }

  return { inbound, outbound };
}

async function main() {
  console.log(`Starting real Ekitan scraping for all ${STATIONS.length} Musashino line stations...`);
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
      await sleep(100);

      // 休日 (dw=2)
      const hd = await fetchStationData(st, 2);
      result.holiday[st.id] = hd;
      console.log(`  Holiday: 上り ${hd.inbound.length}本 / 下り ${hd.outbound.length}本`);
      await sleep(100);
    } catch (e) {
      console.error(`  Error fetching ${st.name}:`, e.message);
    }
  }

  const outPath = 'scripts/ekitan_musashino_raw_timetables.json';
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\nSuccessfully saved all scraped station timetables to ${outPath}!`);
}

main().catch(console.error);
