const fs = require('fs');
const path = require('path');

const stationNames = [
  '新宿', '南新宿', '参宮橋', '代々木八幡', '代々木上原', '東北沢', '下北沢', '世田谷代田', '梅ヶ丘', '梅ケ丘',
  '豪徳寺', '経堂', '千歳船橋', '祖師ヶ谷大蔵', '祖師ケ谷大蔵', '成城学園前', '喜多見', '狛江', '和泉多摩川',
  '登戸', '向ヶ丘遊園', '向ケ丘遊園', '生田', '読売ランド前', '百合ヶ丘', '百合ケ丘', '新百合ヶ丘', '新百合ケ丘',
  '柿生', '鶴川', '玉川学園前', '町田', '相模大野', '小田急相模原', '相武台前', '座間', '海老名',
  '厚木', '本厚木', '愛甲石田', '伊勢原', '鶴巻温泉', '東海大学前', '秦野', '渋沢', '新松田',
  '開成', '栢山', '富水', '螢田', '足柄', '小田原',
  '東林間', '中央林間', '南林間', '鶴間', '大和', '桜ヶ丘', '桜ケ丘', '高座渋谷', '長後', '湘南台',
  '六会日大前', '善行', '藤沢本町', '藤沢', '本鵠沼', '鵠沼海岸', '片瀬江ノ島',
  '五月台', '栗平', '黒川', 'はるひ野', '小田急永山', '小田急多摩センター', '唐木田'
];

async function fetchAllStations() {
  const nameRegex = stationNames.join('|');
  const query = `
[out:json][timeout:30];
(
  node["railway"~"station|halt"]["name"~"^(${nameRegex})$"](35.2,139.0,35.8,139.8);
);
out body;
`;

  console.log('Fetching stations from Overpass API...');
  const endpoints = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://lz4.overpass-api.de/api/interpreter',
  ];

  for (const ep of endpoints) {
    try {
      console.log(`Trying ${ep}...`);
      const res = await fetch(`${ep}?data=${encodeURIComponent(query)}`, {
        headers: { 'User-Agent': 'Trainfo/1.0 (https://github.com/GenbuHase/Trainfo)' }
      });
      if (res.ok) {
        const json = await res.json();
        console.log(`Success! Fetched ${json.elements.length} station nodes`);
        const outPath = path.resolve(__dirname, 'cache/osm_all_odakyu_stations.json');
        fs.writeFileSync(outPath, JSON.stringify(json, null, 2), 'utf8');
        return;
      }
    } catch (e) {
      console.warn(e.message);
    }
  }
}

fetchAllStations().catch(console.error);
