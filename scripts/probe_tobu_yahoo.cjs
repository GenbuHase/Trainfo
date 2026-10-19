const fs = require('fs');
const path = require('path');
const YahooClient = require('./common/yahoo/YahooClient.cjs');

const client = new YahooClient({
  cacheDir: path.resolve(__dirname, 'cache/yahoo/probe'),
  delayMs: 200,
});

const TARGET_LINES = {
  tobu_skytree: [
    '浅草', 'とうきょうスカイツリー', '押上', '曳舟', '東向島', '鐘ヶ淵', '堀切', '牛田',
    '北千住', '小菅', '五反野', '梅島', '西新井', '竹ノ塚', '谷塚', '草加', '獨協大学前',
    '新田', '蒲生', '新越谷', '越谷', '北越谷', '大袋', 'せんげん台', '武里',
    '一ノ割', '春日部', '北春日部', '姫宮', '東武動物公園'
  ],
  tobu_isesaki: [
    '東武動物公園', '和戸', '久喜', '鷲宮', '花崎', '加須', '南羽生', '羽生',
    '川俣', '茂林寺前', '館林', '多々良', '県', '福居', '東武和泉', '足利市',
    '野州山辺', '韮川', '太田', '細谷', '木崎', '世良田', '境町',
    '剛志', '新伊勢崎', '伊勢崎'
  ],
  tobu_kameido: [
    '曳舟', '小村井', '東あずま', '亀戸水神', '亀戸'
  ],
  tobu_daishi: [
    '西新井', '大師前'
  ],
  tobu_sano: [
    '館林', '渡瀬', '田島', '佐野市', '佐野', '堀米', '吉水', '田沼', '多田', '葛生'
  ],
  tobu_koizumi_main: [
    '館林', '成島', '本中野', '篠塚', '東小泉', '小泉町', '西小泉'
  ],
  tobu_koizumi_branch: [
    '太田', '竜舞', '東小泉'
  ],
  tobu_kiryu: [
    '太田', '三枚橋', '治良門橋', '藪塚', '阿左美', '新桐生', '相老', '赤城'
  ],
  tobu_nikko: [
    '東武動物公園', '杉戸高野台', '幸手', '南栗橋', '栗橋', '新古河', '柳生', '板倉東洋大前',
    '藤岡', '静和', '新大平下', '栃木', '新栃木', '合戦場', '家中', '東武金崎', '楡木',
    '樅山', '新鹿沼', '北鹿沼', '板荷', '下小代', '明神', '下今市', '上今市', '東武日光'
  ],
  tobu_utsunomiya: [
    '新栃木', '野州平川', '野州大塚', '壬生', '国谷', 'おもちゃのまち', '安塚', '西川田', '江曽島', '南宇都宮', '東武宇都宮'
  ],
  tobu_kinugawa: [
    '下今市', '大谷向', '大桑', '新高徳', '小佐越', '東武ワールドスクウェア', '鬼怒川温泉', '鬼怒川公園', '新藤原'
  ],
  tobu_urban_park: [
    '大宮', '北大宮', '大宮公園', '大和田', '七里', '岩槻', '東岩槻', '豊春', '八木崎',
    '春日部', '藤の牛島', '南桜井', '川間', '七光台', '清水公園', '愛宕', '野田市',
    '梅郷', '運河', '江戸川台', '初石', '流山おおたかの森', '豊四季', '柏', '新柏', '増尾',
    '逆井', '高柳', '六実', '新鎌ヶ谷', '鎌ヶ谷', '馬込沢', '塚田', '新船橋', '船橋'
  ],
  yagan: [
    '新藤原', '龍王峡', '川治温泉', '川治湯元', '湯西川温泉', '中三依温泉', '上三依塩原温泉口', '男鹿高原', '会津高原尾瀬口'
  ],
  aizu: [
    '会津高原尾瀬口', '七ヶ岳登山口', '会津山村道場', '会津荒海', '中荒井', '会津田島', '田島高校前',
    '会津長野', '養鱒公園', 'ふるさと公園', '会津下郷', '弥五島', '塔のへつり', '湯野上温泉',
    '芦ノ牧温泉南', '大川ダム公園', '芦ノ牧温泉', 'あまや', '門田', '南若松', '西若松', '会津若松'
  ]
};

// 重複除去した駅名リスト
const ALL_STATIONS = new Set();
for (const list of Object.values(TARGET_LINES)) {
  for (const s of list) ALL_STATIONS.add(s);
}

// 曖昧な駅名の優先企業/路線ヒント
const AMBIGUOUS_HINTS = {
  '成島': { company: '東武', rail: '小泉' },
  '田島': { company: '東武', rail: '佐野' },
  '渡瀬': { company: '東武', rail: '佐野' },
  '多田': { company: '東武', rail: '佐野' },
  '小泉町': { company: '東武', rail: '小泉' },
  '大桑': { company: '東武', rail: '鬼怒川' },
  '細谷': { company: '東武', rail: '伊勢崎' },
  '愛宕': { company: '東武', rail: '野田' },
  '南桜井': { company: '東武', rail: '野田' },
  '大和田': { company: '東武', rail: '野田' },
  '新田': { company: '東武', rail: 'スカイツリー' },
  '鎌ヶ谷': { company: '東武', rail: '野田' },
  '新鎌ヶ谷': { company: '東武', rail: '野田' },
  '芦ノ牧温泉': { company: '会津鉄道', rail: '会津' },
  '船橋': { company: '東武', rail: '野田' },
  '柏': { company: '東武', rail: '野田' },
  '大宮': { company: '東武', rail: '野田' },
  '栃木': { company: '東武', rail: '日光' },
  '太田': { company: '東武', rail: '伊勢崎' },
  '館林': { company: '東武', rail: '伊勢崎' },
  '久喜': { company: '東武', rail: '伊勢崎' },
  '栗橋': { company: '東武', rail: '日光' },
  '相老': { company: '東武', rail: '桐生' },
  '赤城': { company: '東武', rail: '桐生' },
  '佐野': { company: '東武', rail: '佐野' },
  '新藤原': { company: '東武', rail: '鬼怒川' },
  '会津高原尾瀬口': { company: '野岩', rail: '会津鬼怒川' },
  '西若松': { company: '会津鉄道', rail: '会津' },
  '会津若松': { company: '東日本旅客鉄道', rail: '只見' },
};

async function probeStation(stationName) {
  const url = 'https://transit.yahoo.co.jp/timetable/search?q=' + encodeURIComponent(stationName);
  
  await client.throttle();
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
    }
  });

  const finalUrl = res.url;
  const html = await res.text();
  const m = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) {
    throw new Error(`__NEXT_DATA__ not found for ${stationName}`);
  }

  const data = JSON.parse(m[1]);
  const pageProps = data.props?.pageProps;

  // 1. 直通で駅時刻表にリダイレクトされた場合
  const urlIdMatch = finalUrl.match(/\/timetable\/(\d+)/);
  if (urlIdMatch && pageProps.directionDetail) {
    const stationId = urlIdMatch[1];
    return {
      stationId,
      name: stationName,
      displayName: pageProps.directionDetail.stationName,
      routes: pageProps.directionDetail.directionItem?.routeInfos || [],
    };
  }

  // 2. 複数候補が出た場合 (stationFeatures)
  if (pageProps.stationFeatures) {
    const hint = AMBIGUOUS_HINTS[stationName] || { company: '東武', rail: '' };
    let best = null;

    // まずヒントの会社または路線名で探す
    for (const f of pageProps.stationFeatures) {
      const d = f.TransitSearchInfo?.Detail;
      if (!d) continue;
      const comp = d.CompanyName || '';
      const rName = d.RailName || '';
      const groups = d.StationInfo?.RailGroup || [];
      const hasRail = groups.some(g => g.RailName.includes(hint.rail));
      const hasCompany = groups.some(g => g.RailName.includes(hint.company));

      if (
        (hint.company && comp.includes(hint.company)) ||
        (hint.rail && rName.includes(hint.rail)) ||
        hasRail || hasCompany
      ) {
        best = d;
        break;
      }
    }

    // 候補駅名が完全一致するものをフォールバック探索
    if (!best) {
      for (const f of pageProps.stationFeatures) {
        const d = f.TransitSearchInfo?.Detail;
        if (!d) continue;
        const dName = (d.DisplayStationName || '').replace(/駅$/, '').replace(/\(.*\)$/, '');
        if (dName === stationName) {
          best = d;
          break;
        }
      }
    }

    if (!best && pageProps.stationFeatures.length > 0) {
      best = pageProps.stationFeatures[0].TransitSearchInfo?.Detail;
    }

    if (best && best.StationId) {
      const stId = best.StationId;
      // この駅IDの時刻表を取得
      const ttUrl = `https://transit.yahoo.co.jp/timetable/${stId}/`;
      const ttProps = await client.fetchNextData(ttUrl, { cacheKey: `tt_${stId}`, subDir: 'tt_direct' });
      return {
        stationId: stId,
        name: stationName,
        displayName: ttProps.directionDetail?.stationName || best.DisplayStationName || stationName,
        routes: ttProps.directionDetail?.directionItem?.routeInfos || [],
      };
    }
  }

  return null;
}

async function run() {
  const stationNames = Array.from(ALL_STATIONS);
  console.log(`Starting probe for ${stationNames.length} stations...`);

  const results = {};
  let success = 0;
  let failed = 0;

  for (let i = 0; i < stationNames.length; i++) {
    const sName = stationNames[i];
    try {
      const data = await probeStation(sName);
      if (data && data.stationId) {
        results[sName] = data;
        success++;
        console.log(`[${i + 1}/${stationNames.length}] ✅ ${sName} -> ID: ${data.stationId} (${data.displayName}) [routes: ${data.routes.length}]`);
      } else {
        failed++;
        console.warn(`[${i + 1}/${stationNames.length}] ❌ Failed to probe: ${sName}`);
      }
    } catch (err) {
      failed++;
      console.error(`[${i + 1}/${stationNames.length}] 💥 Error for ${sName}:`, err.message);
    }
  }

  const outPath = path.resolve(__dirname, 'cache/tobu_yahoo_probed.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\n🎉 Probe completed! Success: ${success}, Failed: ${failed}. Saved to ${outPath}`);
}

run().catch(console.error);
