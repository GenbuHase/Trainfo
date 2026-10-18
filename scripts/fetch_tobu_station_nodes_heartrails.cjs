const fs = require('fs');
const path = require('path');
const { LINES_STATIONS_CONFIG } = require('./common/tobuLinesStationConfigs.cjs');

// 各路線の主要キーワード（HeartRails line名フィルタ用）
const LINE_KEYWORDS = {
  tobu_skytree: ['東武', '伊勢崎', 'スカイツリー'],
  tobu_isesaki: ['東武', '伊勢崎'],
  tobu_kameido: ['東武', '亀戸'],
  tobu_daishi: ['東武', '大師'],
  tobu_sano: ['東武', '佐野'],
  tobu_koizumi: ['東武', '小泉'],
  tobu_kiryu: ['東武', '桐生'],
  tobu_nikko: ['東武', '日光'],
  tobu_utsunomiya: ['東武', '宇都宮'],
  tobu_kinugawa: ['東武', '鬼怒川'],
  tobu_urban_park: ['東武', '野田', 'アーバンパーク'],
  yagan: ['野岩', '会津鬼怒川'],
  aizu: ['会津鉄道', '会津線', 'JR只見線', '会津'],
};

async function fetchStationFromHeartRails(name) {
  const url = `http://express.heartrails.com/api/json?method=getStations&name=${encodeURIComponent(name)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data?.response?.station || [];
}

async function main() {
  const allStations = new Map(); // name -> { lat, lon, prefecture, line }

  // 1. 各路線を走査してユニークな駅名を収集
  const targetStations = [];
  for (const [lineId, stations] of Object.entries(LINES_STATIONS_CONFIG)) {
    for (const st of stations) {
      targetStations.push({ name: st.name, lineId });
    }
  }

  // 重複排除（路線IDのリストを保持）
  const uniqueStations = new Map();
  for (const { name, lineId } of targetStations) {
    if (!uniqueStations.has(name)) {
      uniqueStations.set(name, new Set());
    }
    uniqueStations.get(name).add(lineId);
  }

  console.log(`Fetching ${uniqueStations.size} unique stations from HeartRails Express...`);

  let count = 0;
  for (const [name, lineIds] of uniqueStations.entries()) {
    count++;
    try {
      const results = await fetchStationFromHeartRails(name);
      if (results.length === 0) {
        console.warn(`[${count}/${uniqueStations.size}] Not found in HeartRails: ${name}`);
        continue;
      }

      // 最適なエントリを選択
      // 1. 路線キーワードに一致するもの
      const validKeywords = [];
      for (const lid of lineIds) {
        validKeywords.push(...(LINE_KEYWORDS[lid] || []));
      }

      let bestMatch = results.find(st => validKeywords.some(kw => st.line?.includes(kw)));
      if (!bestMatch) {
        // キーワードに合わなければ先頭
        bestMatch = results[0];
      }

      allStations.set(name, {
        lat: bestMatch.y,
        lon: bestMatch.x,
        prefecture: bestMatch.prefecture,
        line: bestMatch.line,
        postal: bestMatch.postal,
      });

      if (count % 20 === 0 || count === uniqueStations.size) {
        console.log(`Fetched [${count}/${uniqueStations.size}] stations... (latest: ${name} -> lat: ${bestMatch.y}, lon: ${bestMatch.x})`);
      }
    } catch (e) {
      console.error(`Error fetching ${name}: ${e.message}`);
    }
    // APIレートリミット配慮
    await new Promise(r => setTimeout(r, 60));
  }

  // 特殊駅名などの手動フォールバック（とうきょうスカイツリー、南栗橋などもし見つからなかった場合）
  // チェック
  const missing = [];
  for (const name of uniqueStations.keys()) {
    if (!allStations.has(name)) {
      missing.push(name);
    }
  }

  console.log(`\nFetch complete! Missing stations: ${missing.length}`);
  if (missing.length > 0) {
    console.log('Missing names:', missing);
  }

  const outObj = Object.fromEntries(allStations.entries());
  fs.writeFileSync(path.resolve(__dirname, 'cache/tobu_stations_coords.json'), JSON.stringify(outObj, null, 2), 'utf8');
  console.log(`Saved coordinates for ${allStations.size} stations to scripts/cache/tobu_stations_coords.json`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
