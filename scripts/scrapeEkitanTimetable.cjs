// Ekitanから東武東上線の本物の時刻表（平日・土休日、全発車便）を取得・解析するスクリプト
const fs = require('fs');

async function fetchEkitanPage(url) {
  console.log('Fetching:', url);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

// HTMLから発車列車一覧を抽出
function parseTimetableHtml(html) {
  const departures = [];

  // 各時間帯の行: <tr class="ek-hour_line"> ... <td>05</td> ... <li>...</li>
  const trMatches = html.match(/<tr[^>]*class="[^"]*ek-hour_line[^"]*"[^>]*>[\s\S]*?<\/tr>/gi) || [];

  for (const tr of trMatches) {
    const hourMatch = tr.match(/<td>\s*(\d{2})\s*<\/td>/i);
    if (!hourMatch) continue;
    const hour = hourMatch[1];

    // li elements
    const liMatches = tr.match(/<li[^>]*class="[^"]*ek-train-tooltip[^"]*"[\s\S]*?<\/li>/gi) || [];

    for (const li of liMatches) {
      const typeMatch = li.match(/data-tr-type="([^"]+)"/i);
      const destMatch = li.match(/data-dest="([^"]+)"/i);
      const minMatch = li.match(/<span[^>]*class="[^"]*time-min[^"]*"[^>]*>\s*(\d{2})\s*<\/span>/i);
      const hrefMatch = li.match(/href="([^"]+)"/i);

      if (!minMatch) continue;

      const rawType = typeMatch ? typeMatch[1].trim() : '普通';
      const dest = destMatch ? destMatch[1].trim() : '小川町';
      const minute = minMatch[1];
      const href = hrefMatch ? hrefMatch[1] : '';

      // 列車番号の抽出 (tx=... または URLパラメータ)
      let trainNo = '';
      const txMatch = href.match(/tx=[^-]+-[^-]+-(\d+[a-zA-Z]?)/i);
      if (txMatch) {
        trainNo = `${txMatch[1]}レ`;
      } else {
        trainNo = `${hour}${minute}レ`;
      }

      // 種別マッピング
      let trainType = 'local';
      if (rawType.includes('TJ') || rawType.includes('ＴＪ')) trainType = 'tjLiner';
      else if (rawType.includes('川越特急') || rawType.includes('川特')) trainType = 'kawagoeExp';
      else if (rawType.includes('快速急行') || rawType.includes('快急')) trainType = 'rapidExp';
      else if (rawType.includes('急行')) trainType = 'express';
      else if (rawType.includes('準急')) trainType = 'semiExp';
      else trainType = 'local';

      departures.push({
        hour,
        minute,
        departureTime: `${hour}:${minute}:00`,
        rawType,
        trainType,
        destination: dest,
        trainNo,
        href
      });
    }
  }

  return departures;
}

async function main() {
  const targets = [
    // 池袋発 (下り)
    { name: 'ikebukuro_outbound_weekday', url: 'https://ekitan.com/timetable/railway/line-station/204-0/d1?dw=0', isHoliday: false, originId: 'TJ-01', direction: 'outbound' },
    { name: 'ikebukuro_outbound_holiday', url: 'https://ekitan.com/timetable/railway/line-station/204-0/d1?dw=2', isHoliday: true, originId: 'TJ-01', direction: 'outbound' },
    // 森林公園発 (上り 池袋方面)
    { name: 'shinrinkoen_inbound_weekday', url: 'https://ekitan.com/timetable/railway/line-station/204-29/d1?dw=0', isHoliday: false, originId: 'TJ-30', direction: 'inbound' },
    { name: 'shinrinkoen_inbound_holiday', url: 'https://ekitan.com/timetable/railway/line-station/204-29/d1?dw=2', isHoliday: true, originId: 'TJ-30', direction: 'inbound' },
    // 川越市発 (上り 池袋方面)
    { name: 'kawagoeshi_inbound_weekday', url: 'https://ekitan.com/timetable/railway/line-station/204-21/d1?dw=0', isHoliday: false, originId: 'TJ-22', direction: 'inbound' },
    { name: 'kawagoeshi_inbound_holiday', url: 'https://ekitan.com/timetable/railway/line-station/204-21/d1?dw=2', isHoliday: true, originId: 'TJ-22', direction: 'inbound' },
    // 小川町発 (上り 池袋方面)
    { name: 'ogawamachi_inbound_weekday', url: 'https://ekitan.com/timetable/railway/line-station/204-31/d1?dw=0', isHoliday: false, originId: 'TJ-33', direction: 'inbound' },
    { name: 'ogawamachi_inbound_holiday', url: 'https://ekitan.com/timetable/railway/line-station/204-31/d1?dw=2', isHoliday: true, originId: 'TJ-33', direction: 'inbound' },
    // 小川町〜寄居 ワンマンシャトル (下り 寄居方面)
    { name: 'ogawamachi_to_yorii_weekday', url: 'https://ekitan.com/timetable/railway/line-station/204-31/d2?dw=0', isHoliday: false, originId: 'TJ-33', direction: 'outbound' },
    { name: 'ogawamachi_to_yorii_holiday', url: 'https://ekitan.com/timetable/railway/line-station/204-31/d2?dw=2', isHoliday: true, originId: 'TJ-33', direction: 'outbound' },
    // 寄居発 (上り 小川町方面)
    { name: 'yorii_to_ogawamachi_weekday', url: 'https://ekitan.com/timetable/railway/line-station/204-36/d1?dw=0', isHoliday: false, originId: 'TJ-39', direction: 'inbound' },
    { name: 'yorii_to_ogawamachi_holiday', url: 'https://ekitan.com/timetable/railway/line-station/204-36/d1?dw=2', isHoliday: true, originId: 'TJ-39', direction: 'inbound' },
  ];

  const allResults = {};

  for (const t of targets) {
    const html = await fetchEkitanPage(t.url);
    const deps = parseTimetableHtml(html);
    console.log(`Parsed ${deps.length} departures for ${t.name}`);
    allResults[t.name] = {
      ...t,
      departures: deps
    };
    // サーバーに負荷をかけないよう少し待機
    await new Promise(r => setTimeout(r, 600));
  }

  fs.writeFileSync('scripts/ekitan_scraped_timetables.json', JSON.stringify(allResults, null, 2), 'utf8');
  console.log('Saved all scraped timetables to scripts/ekitan_scraped_timetables.json');
}

main().catch(console.error);
