// scripts/probe_jr_central_lines.cjs
// JR東海 在来線10路線の Yahoo! 駅ID・グループID・方面名抽出スクリプト
const fs = require('fs');
const path = require('path');
const YahooClient = require('./common/yahoo/YahooClient.cjs');

const CACHE_DIR = path.resolve(__dirname, 'cache/yahoo_probe_jr_central');
const client = new YahooClient({ cacheDir: CACHE_DIR, delayMs: 150 });

// 調査対象の代表駅一覧
const PROBE_STATIONS = [
  { name: '名古屋', ysid: '24944' },
  { name: '金山', ysid: '24855' },
  { name: '高蔵寺', ysid: '24888' },
  { name: '多治見', ysid: '24953' },
  { name: '中津川', ysid: '24996' },
  { name: '木曽福島', ysid: '23985' },
  { name: '塩尻', ysid: '24032' },
  { name: '岐阜', ysid: '24813' },
  { name: '美濃太田', ysid: '25164' },
  { name: '下呂', ysid: '24869' },
  { name: '高山', ysid: '24955' },
  { name: '猪谷', ysid: '24209' },
  { name: '富山', ysid: '24334' },
  { name: '大府', ysid: '24823' },
  { name: '武豊', ysid: '25010' },
  { name: '可児', ysid: '24847' },
  { name: '豊橋', ysid: '25032' },
  { name: '豊川', ysid: '25031' },
  { name: '天竜峡', ysid: '24115' },
  { name: '飯田', ysid: '23884' },
  { name: '伊那市', ysid: '23891' },
  { name: '辰野', ysid: '24076' },
  { name: '富士', ysid: '24536' },
  { name: '富士宮', ysid: '24541' },
  { name: '身延', ysid: '24095' },
  { name: '甲府', ysid: '23961' },
  { name: '桑名', ysid: '25264' },
  { name: '四日市', ysid: '25488' },
  { name: '亀山', ysid: '25244' },
  { name: '津', ysid: '25362' },
  { name: '松阪', ysid: '25442' },
  { name: '多気', ysid: '25361' },
  { name: '伊勢市', ysid: '25208' },
  { name: '鳥羽', ysid: '25389' },
  { name: '家城', ysid: '25215' },
  { name: '伊勢奥津', ysid: '25206' },
  { name: '尾鷲', ysid: '25235' },
  { name: '熊野市', ysid: '25272' },
  { name: '新宮', ysid: '26839' },
];

async function probeStation(st) {
  // まずは適当な gid または探索で駅ページ取得
  // Yahoo!乗換案内では gid が分からない場合でも、検索または既知のGIDから railGroup を辿れる
  // または https://transit.yahoo.co.jp/timetable/<ysid>/ でリダイレクトまたはHTMLを取得
  const url = `https://transit.yahoo.co.jp/timetable/${st.ysid}/`;
  try {
    const html = await client.fetchHtml(url, { cacheKey: `st_top_${st.ysid}`, subDir: 'probe_top' });
    // HTML内の timetableItem または a href="/timetable/<ysid>/<gid>" を抽出
    const regex = new RegExp(`/timetable/${st.ysid}/(\\d+)`, 'g');
    const gids = new Set();
    let m;
    while ((m = regex.exec(html)) !== null) {
      gids.add(m[1]);
    }

    const groups = [];
    for (const gid of gids) {
      try {
        const nextData = await client.fetchNextData(
          `https://transit.yahoo.co.jp/timetable/${st.ysid}/${gid}?kind=1`,
          { cacheKey: `st_${st.ysid}_${gid}_k1`, subDir: 'probe_pages' }
        );
        const tt = nextData?.timetableItem;
        if (tt) {
          const rg = tt.railGroup || [];
          for (const g of rg) {
            groups.push({
              gid: String(g.railGroupId),
              railName: g.railName,
              directionName: g.directionName,
            });
          }
          break; // 1回 railGroup が取れれば全グループが分かる
        }
      } catch (e) {}
    }

    return {
      name: st.name,
      ysid: st.ysid,
      groups: groups,
      foundGids: Array.from(gids),
    };
  } catch (err) {
    return { name: st.name, ysid: st.ysid, error: err.message };
  }
}

async function main() {
  console.log('Probing JR Central stations...');
  const results = {};
  for (const st of PROBE_STATIONS) {
    process.stdout.write(`Probing ${st.name} (${st.ysid})... `);
    const res = await probeStation(st);
    results[st.name] = res;
    console.log(`Found ${res.groups ? res.groups.length : 0} groups, gids: ${(res.foundGids || []).join(',')}`);
  }

  const outPath = path.resolve(__dirname, 'cache/jr_central_probe_results.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`Saved probe results to ${outPath}`);
}

main().catch(console.error);
