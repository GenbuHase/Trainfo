// scripts/probe_jr_central_exact.cjs
const fs = require('fs');
const path = require('path');
const YahooClient = require('./common/yahoo/YahooClient.cjs');

const CACHE_DIR = path.resolve(__dirname, 'cache/yahoo_probe_jr_central');
const client = new YahooClient({ cacheDir: CACHE_DIR, delayMs: 150 });

const JR_CENTRAL_LINES = {
  jr_chuo_west: {
    name: 'JR中央本線（名古屋～塩尻）',
    stations: [
      '名古屋', '金山', '鶴舞', '千種', '大曽根', '新守山', '勝川', '春日井', '神領', '高蔵寺',
      '定光寺', '古虎渓', '多治見', '土岐市', '瑞浪', '釜戸', '武並', '恵那', '美乃坂本', '中津川',
      '落合川', '坂下', '田立', '南木曽', '十二兼', '野尻', '大桑', '須原', '倉本', '上松',
      '木曽福島', '原野', '宮ノ越', '藪原', '奈良井', '木曽平沢', '贄川', '日出塩', '洗馬', '塩尻'
    ],
    hint: { company: '東海旅客鉄道', rail: '中央本線' }
  },
  jr_takayama: {
    name: 'JR高山本線',
    stations: [
      '岐阜', '長森', '那加', '蘇原', '各務ケ原', '鵜沼', '坂祝', '美濃太田', '古井', '中川辺',
      '下麻生', '上麻生', '白川口', '下油井', '飛騨金山', '焼石', '下呂', '禅昌寺', '飛騨萩原', '上呂',
      '飛騨宮田', '飛騨小坂', '渚', '久々野', '飛騨一ノ宮', '高山', '上枝', '飛騨国府', '飛騨古川', '杉崎',
      '飛騨細江', '角川', '坂上', '打保', '杉原', '猪谷', '楡原', '笹津', '東八尾', '越中八尾',
      '千里', '速星', '婦中鵜坂', '西富山', '富山'
    ],
    hint: { company: '東海旅客鉄道', rail: '高山本線' }
  },
  jr_kansai_nagoya_kameyama: {
    name: 'JR関西本線（名古屋～亀山）',
    stations: [
      '名古屋', '八田', '春田', '蟹江', '永和', '弥富', '長島', '桑名', '朝日', '富田',
      '富田浜', '四日市', '南四日市', '河原田', '河曲', '加佐登', '井田川', '亀山'
    ],
    hint: { company: '東海旅客鉄道', rail: '関西本線' }
  },
  jr_kisei_kameyama_shingu: {
    name: 'JR紀勢本線（亀山～新宮）',
    stations: [
      '亀山', '下庄', '一身田', '津', '阿漕', '高茶屋', '六軒', '松阪', '徳和', '多気',
      '相可', '佐奈', '栃原', '川添', '三瀬谷', '滝原', '阿曽', '伊勢柏崎', '大内山', '梅ケ谷',
      '紀伊長島', '三野瀬', '船津', '相賀', '尾鷲', '大曽根浦', '九鬼', '三木里', '賀田', '二木島',
      '新鹿', '波田須', '大泊', '熊野市', '有井', '神志山', '紀伊市木', '阿田和', '紀伊井田', '鵜殿', '新宮'
    ],
    hint: { company: '東海旅客鉄道', rail: '紀勢本線' }
  },
  jr_iida: {
    name: 'JR飯田線',
    stations: [
      '豊橋', '船町', '下地', '小坂井', '牛久保', '豊川', '三河一宮', '長山', '江島', '東上',
      '野田城', '新城', '東新町', '茶臼山', '三河東郷', '大海', '鳥居', '長篠城', '本長篠', '三河大野',
      '湯谷温泉', '三河槙原', '柿平', '三河川合', '池場', '東栄', '出馬', '上市場', '浦川', '早瀬',
      '下川合', '中部天竜', '佐久間', '相月', '城西', '向市場', '水窪', '大嵐', '小和田', '中井侍',
      '伊那小沢', '鶯巣', '平岡', '為栗', '温田', '田本', '門島', '唐笠', '金野', '千代',
      '天竜峡', '川路', '時又', '駄科', '毛賀', '伊那八幡', '下山村', '鼎', '切石', '飯田',
      '桜町', '伊那上郷', '元善光寺', '下市田', '市田', '下平', '山吹', '伊那大島', '上片桐', '伊那田島',
      '高遠原', '七久保', '伊那本郷', '飯島', '田切', '伊那福岡', '小町屋', '駒ケ根', '大田切', '宮田',
      '赤木', '沢渡', '下島', '伊那市', '伊那北', '田畑', '北殿', '木ノ下', '伊那松島', '沢',
      '羽場', '伊那新町', '宮木', '辰野'
    ],
    hint: { company: '東海旅客鉄道', rail: '飯田線' }
  },
  jr_minobu: {
    name: 'JR身延線',
    stations: [
      '富士', '柚木', '竪堀', '入山瀬', '富士根', '源道寺', '富士宮', '西富士宮', '沼久保', '芝川',
      '稲子', '十島', '井出', '寄畑', '内船', '甲斐大島', '身延', '塩之沢', '波高島', '下部温泉',
      '甲斐常葉', '市ノ瀬', '久那土', '甲斐岩間', '落居', '鰍沢口', '市川大門', '市川本町', '芦川', '甲斐上野',
      '東花輪', '小井川', '常永', '国母', '甲斐住吉', '南甲府', '善光寺', '金手', '甲府'
    ],
    hint: { company: '東海旅客鉄道', rail: '身延線' }
  },
  jr_taketoyo: {
    name: 'JR武豊線',
    stations: [
      '大府', '尾張森岡', '緒川', '石浜', '東浦', '亀崎', '乙川', '半田', '東成岩', '武豊'
    ],
    hint: { company: '東海旅客鉄道', rail: '武豊線' }
  },
  jr_taita: {
    name: 'JR太多線',
    stations: [
      '多治見', '根本', '姫', '下切', '可児', '美濃川合', '美濃太田'
    ],
    hint: { company: '東海旅客鉄道', rail: '太多線' }
  },
  jr_meisho: {
    name: 'JR名松線',
    stations: [
      '松阪', '上ノ庄', '権現前', '伊勢八太', '一志', '井関', '伊勢大井', '伊勢川口', '関ノ宮', '家城',
      '伊勢竹原', '伊勢鎌倉', '伊勢八知', '比津', '伊勢奥津'
    ],
    hint: { company: '東海旅客鉄道', rail: '名松線' }
  },
  jr_sangu: {
    name: 'JR参宮線',
    stations: [
      '多気', '外城田', '田丸', '宮川', '山田上口', '伊勢市', '五十鈴ケ丘', '二見浦', '松下', '鳥羽'
    ],
    hint: { company: '東海旅客鉄道', rail: '参宮線' }
  }
};

async function searchYahooStation(stationName, hint) {
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
  if (!m) return null;

  const data = JSON.parse(m[1]);
  const pageProps = data.props?.pageProps;
  if (!pageProps) return null;

  // 1. 直接駅ページに飛んだ場合
  const urlIdMatch = finalUrl.match(/\/timetable\/(\d+)/);
  if (urlIdMatch && pageProps.directionDetail) {
    const ysid = urlIdMatch[1];
    const routes = pageProps.directionDetail.directionItem?.routeInfos || [];
    return { ysid, name: stationName, routes };
  }

  // 2. 検索候補一覧の場合
  if (pageProps.stationFeatures) {
    let matched = null;
    for (const f of pageProps.stationFeatures) {
      const d = f.TransitSearchInfo?.Detail;
      if (!d) continue;
      const comp = d.CompanyName || '';
      const rName = d.RailName || '';
      const groups = d.StationInfo?.RailGroup || [];
      const hasRail = hint.rail && groups.some(g => g.RailName && g.RailName.includes(hint.rail));
      const hasComp = hint.company && comp.includes(hint.company);

      if (hasRail || (hasComp && rName.includes(hint.rail || ''))) {
        matched = d;
        break;
      }
    }
    if (!matched) {
      // フォールバック: JRグループ
      matched = pageProps.stationFeatures.find(f => {
        const d = f.TransitSearchInfo?.Detail;
        return d && (d.CompanyName?.includes('JR') || d.CompanyName?.includes('旅客鉄道'));
      })?.TransitSearchInfo?.Detail || pageProps.stationFeatures[0]?.TransitSearchInfo?.Detail;
    }
    if (matched) {
      const ysid = String(matched.StationId);
      // GID一覧を取るために、その駅のページを取得
      const stUrl = `https://transit.yahoo.co.jp/timetable/${ysid}`;
      const stHtml = await (await fetch(stUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
        }
      })).text();
      const stMatch = stHtml.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
      let routes = [];
      if (stMatch) {
        const stData = JSON.parse(stMatch[1]);
        routes = stData.props?.pageProps?.directionDetail?.directionItem?.routeInfos || [];
      }
      return { ysid, name: stationName, routes };
    }
  }

  return null;
}

async function main() {
  console.log('Starting exact station probe for JR Central 10 lines...');
  const lineResults = {};

  for (const [lineKey, lineDef] of Object.entries(JR_CENTRAL_LINES)) {
    console.log(`\n=== Processing ${lineDef.name} (${lineKey}) [${lineDef.stations.length} stations] ===`);
    const stationsData = [];
    for (const sname of lineDef.stations) {
      process.stdout.write(`  Probing ${sname}... `);
      try {
        const info = await searchYahooStation(sname, lineDef.hint);
        if (info) {
          console.log(`ysid: ${info.ysid}, routes: ${info.routes.length}`);
          stationsData.push(info);
        } else {
          console.log(`FAILED to resolve`);
          stationsData.push({ name: sname, ysid: null, routes: [] });
        }
      } catch (e) {
        console.log(`ERROR: ${e.message}`);
        stationsData.push({ name: sname, ysid: null, error: e.message, routes: [] });
      }
    }
    lineResults[lineKey] = {
      name: lineDef.name,
      stations: stationsData
    };
  }

  const outPath = path.resolve(__dirname, 'cache/jr_central_exact_probe.json');
  fs.writeFileSync(outPath, JSON.stringify(lineResults, null, 2), 'utf8');
  console.log(`\nAll done! Saved to ${outPath}`);
}

main().catch(console.error);
