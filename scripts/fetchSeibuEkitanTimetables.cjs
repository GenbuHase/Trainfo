// 西武有楽町線・西武池袋線の駅探時刻表スクレイピングスクリプト
const fs = require('fs');

const STATIONS_SEIBU_YURAKUCHO = [
  { id: 'SI-37', code: '232-0', name: '小竹向原', isOrigin: true },
  { id: 'SI-38', code: '232-1', name: '新桜台' },
  { id: 'SI-06', code: '232-2', name: '練馬', isTerminus: true },
];

const STATIONS_SEIBU_IKEBUKURO = [
  { id: 'SI-01', code: '235-0', name: '池袋', isOrigin: true },
  { id: 'SI-02', code: '235-1', name: '椎名町' },
  { id: 'SI-03', code: '235-2', name: '東長崎' },
  { id: 'SI-04', code: '235-3', name: '江古田' },
  { id: 'SI-05', code: '235-4', name: '桜台' },
  { id: 'SI-06', code: '235-5', name: '練馬' },
  { id: 'SI-07', code: '235-6', name: '中村橋' },
  { id: 'SI-08', code: '235-7', name: '富士見台' },
  { id: 'SI-09', code: '235-8', name: '練馬高野台' },
  { id: 'SI-10', code: '235-9', name: '石神井公園' },
  { id: 'SI-11', code: '235-10', name: '大泉学園' },
  { id: 'SI-12', code: '235-11', name: '保谷' },
  { id: 'SI-13', code: '235-12', name: 'ひばりヶ丘' },
  { id: 'SI-14', code: '235-13', name: '東久留米' },
  { id: 'SI-15', code: '235-14', name: '清瀬' },
  { id: 'SI-16', code: '235-15', name: '秋津' },
  { id: 'SI-17', code: '235-16', name: '所沢' },
  { id: 'SI-18', code: '235-17', name: '西所沢' },
  { id: 'SI-19', code: '235-18', name: '小手指' },
  { id: 'SI-20', code: '235-19', name: '狭山ヶ丘' },
  { id: 'SI-21', code: '235-20', name: '武蔵藤沢' },
  { id: 'SI-22', code: '235-21', name: '稲荷山公園' },
  { id: 'SI-23', code: '235-22', name: '入間市' },
  { id: 'SI-24', code: '235-23', name: '仏子' },
  { id: 'SI-25', code: '235-24', name: '元加治' },
  { id: 'SI-26', code: '235-25', name: '飯能' },
  { id: 'SI-27', code: '235-26', name: '東飯能' },
  { id: 'SI-28', code: '235-27', name: '高麗' },
  { id: 'SI-29', code: '235-28', name: '武蔵横手' },
  { id: 'SI-30', code: '235-29', name: '東吾野' },
  { id: 'SI-31', code: '235-30', name: '吾野' },
  { id: 'SI-32', code: '235-31', name: '西吾野' },
  { id: 'SI-33', code: '235-32', name: '正丸' },
  { id: 'SI-34', code: '235-33', name: '芦ヶ久保' },
  { id: 'SI-35', code: '235-34', name: '横瀬' },
  { id: 'SI-36', code: '235-35', name: '西武秩父', isTerminus: true },
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
        const code = parts[2] || parts[0];
        // 西武の列車番号ルール:
        // 純数字 (例: 5201, 6501, 1, 3) は「レ」を付与 (5201レ, 1レ等)
        // 英字付き (例: 502M) はそのまま
        if (/^\d+$/.test(code)) {
          trainNo = `${code}レ`;
        } else {
          trainNo = code;
        }
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
    // 池袋/小竹向原: parts[1] が下り (outbound)
    outbound = parseTimetableSection(parts[1] || '');
  } else if (st.isTerminus) {
    // 練馬(有楽町線)/西武秩父(池袋線): parts[1] が上り (inbound)
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
  await scrapeLine('西武有楽町線', STATIONS_SEIBU_YURAKUCHO, 'scripts/ekitan_seibu_yurakucho_timetables.json');
  await scrapeLine('西武池袋線', STATIONS_SEIBU_IKEBUKURO, 'scripts/ekitan_seibu_ikebukuro_timetables.json');
}

main().catch(console.error);
