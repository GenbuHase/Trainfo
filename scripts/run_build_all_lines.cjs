const { buildLineData } = require('./build_metropolitan_lines_geometry.cjs');

// 1. 東海道線 (JT-01 〜 JT-21)
const tokaidoStations = [
  { id: 'JT-01', name: '東京', stoppingTypes: ['local', 'rapid', 'rapid_acty', 'commuter_rapid', 'special_rapid', 'limitedExp'], isMajor: true },
  { id: 'JT-02', name: '新橋', stoppingTypes: ['local', 'rapid', 'rapid_acty', 'commuter_rapid', 'special_rapid', 'limitedExp'], isMajor: true },
  { id: 'JT-03', name: '品川', stoppingTypes: ['local', 'rapid', 'rapid_acty', 'commuter_rapid', 'special_rapid', 'limitedExp'], isMajor: true },
  { id: 'JT-04', name: '川崎', stoppingTypes: ['local', 'rapid', 'rapid_acty', 'commuter_rapid', 'special_rapid'], isMajor: true },
  { id: 'JT-05', name: '横浜', stoppingTypes: ['local', 'rapid', 'rapid_acty', 'commuter_rapid', 'special_rapid', 'limitedExp'], isMajor: true },
  { id: 'JT-06', name: '戸塚', stoppingTypes: ['local', 'rapid', 'rapid_acty', 'commuter_rapid', 'special_rapid'], isMajor: true },
  { id: 'JT-07', name: '大船', stoppingTypes: ['local', 'rapid', 'rapid_acty', 'commuter_rapid', 'special_rapid', 'limitedExp'], isMajor: true },
  { id: 'JT-08', name: '藤沢', stoppingTypes: ['local', 'rapid', 'rapid_acty', 'commuter_rapid', 'special_rapid', 'limitedExp'], isMajor: true },
  { id: 'JT-09', name: '辻堂', stoppingTypes: ['local', 'rapid', 'rapid_acty'] },
  { id: 'JT-10', name: '茅ケ崎', stoppingTypes: ['local', 'rapid', 'rapid_acty', 'commuter_rapid', 'special_rapid', 'limitedExp'], isMajor: true },
  { id: 'JT-11', name: '平塚', stoppingTypes: ['local', 'rapid', 'rapid_acty', 'commuter_rapid', 'special_rapid'], isMajor: true },
  { id: 'JT-12', name: '大磯', stoppingTypes: ['local', 'rapid', 'rapid_acty'] },
  { id: 'JT-13', name: '二宮', stoppingTypes: ['local', 'rapid', 'rapid_acty'] },
  { id: 'JT-14', name: '国府津', stoppingTypes: ['local', 'rapid', 'rapid_acty', 'commuter_rapid', 'special_rapid'], isMajor: true },
  { id: 'JT-15', name: '鴨宮', stoppingTypes: ['local', 'rapid', 'rapid_acty'] },
  { id: 'JT-16', name: '小田原', stoppingTypes: ['local', 'rapid', 'rapid_acty', 'commuter_rapid', 'special_rapid', 'limitedExp'], isMajor: true },
  { id: 'JT-17', name: '早川', stoppingTypes: ['local', 'rapid', 'rapid_acty'] },
  { id: 'JT-18', name: '根府川', stoppingTypes: ['local', 'rapid', 'rapid_acty'] },
  { id: 'JT-19', name: '真鶴', stoppingTypes: ['local', 'rapid', 'rapid_acty'] },
  { id: 'JT-20', name: '湯河原', stoppingTypes: ['local', 'rapid', 'rapid_acty', 'limitedExp'], isMajor: true },
  { id: 'JT-21', name: '熱海', stoppingTypes: ['local', 'rapid', 'rapid_acty', 'limitedExp'], isMajor: true },
];

// 2. 伊東線 (JT-21 〜 JT-26)
const itoStations = [
  { id: 'JT-21', name: '熱海', stoppingTypes: ['local', 'rapid', 'limitedExp'], isMajor: true },
  { id: 'JT-22', name: '来宮', stoppingTypes: ['local', 'rapid'] },
  { id: 'JT-23', name: '伊豆多賀', stoppingTypes: ['local', 'rapid'] },
  { id: 'JT-24', name: '網代', stoppingTypes: ['local', 'rapid', 'limitedExp'], isMajor: true },
  { id: 'JT-25', name: '宇佐美', stoppingTypes: ['local', 'rapid'] },
  { id: 'JT-26', name: '伊東', stoppingTypes: ['local', 'rapid', 'limitedExp'], isMajor: true },
];

// 3. 横須賀線 (JO-19 〜 JO-01)
const yokosukaStations = [
  { id: 'JO-19', name: '東京', stoppingTypes: ['local', 'rapid', 'limitedExp'], isMajor: true },
  { id: 'JO-18', name: '新橋', stoppingTypes: ['local', 'rapid'], isMajor: true },
  { id: 'JO-17', name: '品川', stoppingTypes: ['local', 'rapid', 'limitedExp'], isMajor: true },
  { id: 'JO-16', name: '西大井', stoppingTypes: ['local', 'rapid'] },
  { id: 'JO-15', name: '武蔵小杉', stoppingTypes: ['local', 'rapid', 'limitedExp'], isMajor: true },
  { id: 'JO-14', name: '新川崎', stoppingTypes: ['local', 'rapid'] },
  { id: 'JO-13', name: '横浜', stoppingTypes: ['local', 'rapid', 'limitedExp'], isMajor: true },
  { id: 'JO-12', name: '保土ケ谷', stoppingTypes: ['local', 'rapid'] },
  { id: 'JO-11', name: '東戸塚', stoppingTypes: ['local', 'rapid'] },
  { id: 'JO-10', name: '戸塚', stoppingTypes: ['local', 'rapid'], isMajor: true },
  { id: 'JO-09', name: '大船', stoppingTypes: ['local', 'rapid', 'limitedExp'], isMajor: true },
  { id: 'JO-08', name: '北鎌倉', stoppingTypes: ['local', 'rapid'] },
  { id: 'JO-07', name: '鎌倉', stoppingTypes: ['local', 'rapid', 'limitedExp'], isMajor: true },
  { id: 'JO-06', name: '逗子', stoppingTypes: ['local', 'rapid', 'limitedExp'], isMajor: true },
  { id: 'JO-05', name: '東逗子', stoppingTypes: ['local', 'rapid'] },
  { id: 'JO-04', name: '田浦', stoppingTypes: ['local', 'rapid'] },
  { id: 'JO-03', name: '横須賀', stoppingTypes: ['local', 'rapid'], isMajor: true },
  { id: 'JO-02', name: '衣笠', stoppingTypes: ['local', 'rapid'] },
  { id: 'JO-01', name: '久里浜', stoppingTypes: ['local', 'rapid'], isMajor: true },
];

// 4. 総武快速線 (JO-19 〜 JO-28)
const sobuRapidStations = [
  { id: 'JO-19', name: '東京', stoppingTypes: ['rapid', 'commuter_rapid', 'limitedExp', 'local'], isMajor: true },
  { id: 'JO-20', name: '新日本橋', stoppingTypes: ['rapid', 'commuter_rapid', 'local'] },
  { id: 'JO-21', name: '馬喰町', stoppingTypes: ['rapid', 'commuter_rapid', 'local'] },
  { id: 'JO-22', name: '錦糸町', stoppingTypes: ['rapid', 'commuter_rapid', 'limitedExp', 'local'], isMajor: true },
  { id: 'JO-23', name: '新小岩', stoppingTypes: ['rapid', 'local'] },
  { id: 'JO-24', name: '市川', stoppingTypes: ['rapid', 'local'], isMajor: true },
  { id: 'JO-25', name: '船橋', stoppingTypes: ['rapid', 'commuter_rapid', 'limitedExp', 'local'], isMajor: true },
  { id: 'JO-26', name: '津田沼', stoppingTypes: ['rapid', 'local'], isMajor: true },
  { id: 'JO-27', name: '稲毛', stoppingTypes: ['rapid', 'local'] },
  { id: 'JO-28', name: '千葉', stoppingTypes: ['rapid', 'commuter_rapid', 'limitedExp', 'local'], isMajor: true },
];

// 5. 宇都宮線 (JU-01 〜 JU-34)
const utsunomiyaStations = [
  { id: 'JU-01', name: '東京', stoppingTypes: ['local', 'rapid', 'rapid_rabbit', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'JU-02', name: '上野', stoppingTypes: ['local', 'rapid', 'rapid_rabbit', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'JU-03', name: '尾久', stoppingTypes: ['local'] },
  { id: 'JU-04', name: '赤羽', stoppingTypes: ['local', 'rapid', 'rapid_rabbit', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'JU-05', name: '浦和', stoppingTypes: ['local', 'rapid', 'rapid_rabbit', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'JU-06', name: 'さいたま新都心', stoppingTypes: ['local'] },
  { id: 'JU-07', name: '大宮', stoppingTypes: ['local', 'rapid', 'rapid_rabbit', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'JU-08', name: '土呂', stoppingTypes: ['local'] },
  { id: 'JU-09', name: '東大宮', stoppingTypes: ['local'] },
  { id: 'JU-10', name: '蓮田', stoppingTypes: ['local', 'rapid', 'rapid_rabbit', 'commuter_rapid'], isMajor: true },
  { id: 'JU-11', name: '白岡', stoppingTypes: ['local'] },
  { id: 'JU-12', name: '新白岡', stoppingTypes: ['local'] },
  { id: 'JU-13', name: '久喜', stoppingTypes: ['local', 'rapid', 'rapid_rabbit', 'commuter_rapid'], isMajor: true },
  { id: 'JU-14', name: '東鷲宮', stoppingTypes: ['local'] },
  { id: 'JU-15', name: '栗橋', stoppingTypes: ['local'] },
  { id: 'JU-16', name: '古河', stoppingTypes: ['local', 'rapid', 'rapid_rabbit', 'commuter_rapid'], isMajor: true },
  { id: 'JU-17', name: '野木', stoppingTypes: ['local'] },
  { id: 'JU-18', name: '間々田', stoppingTypes: ['local'] },
  { id: 'JU-19', name: '小山', stoppingTypes: ['local', 'rapid', 'rapid_rabbit', 'commuter_rapid'], isMajor: true },
  { id: 'JU-20', name: '小金井', stoppingTypes: ['local', 'rapid', 'rapid_rabbit', 'commuter_rapid'], isMajor: true },
  { id: 'JU-21', name: '自治医大', stoppingTypes: ['local', 'rapid', 'rapid_rabbit', 'commuter_rapid'] },
  { id: 'JU-22', name: '石橋', stoppingTypes: ['local', 'rapid', 'rapid_rabbit', 'commuter_rapid'] },
  { id: 'JU-23', name: '雀宮', stoppingTypes: ['local', 'rapid', 'rapid_rabbit', 'commuter_rapid'] },
  { id: 'JU-24', name: '宇都宮', stoppingTypes: ['local', 'rapid', 'rapid_rabbit', 'commuter_rapid'], isMajor: true },
  { id: 'JU-25', name: '岡本', stoppingTypes: ['local'] },
  { id: 'JU-26', name: '宝積寺', stoppingTypes: ['local'], isMajor: true },
  { id: 'JU-27', name: '氏家', stoppingTypes: ['local'], isMajor: true },
  { id: 'JU-28', name: '蒲須坂', stoppingTypes: ['local'] },
  { id: 'JU-29', name: '片岡', stoppingTypes: ['local'] },
  { id: 'JU-30', name: '矢板', stoppingTypes: ['local'], isMajor: true },
  { id: 'JU-31', name: '野崎', stoppingTypes: ['local'] },
  { id: 'JU-32', name: '西那須野', stoppingTypes: ['local'], isMajor: true },
  { id: 'JU-33', name: '那須塩原', stoppingTypes: ['local'], isMajor: true },
  { id: 'JU-34', name: '黒磯', stoppingTypes: ['local'], isMajor: true },
];

// 6. 高崎線 (TK-01 〜 TK-25)
const takasakiStations = [
  { id: 'TK-01', name: '東京', stoppingTypes: ['local', 'rapid', 'rapid_urban', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'TK-02', name: '上野', stoppingTypes: ['local', 'rapid', 'rapid_urban', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'TK-03', name: '尾久', stoppingTypes: ['local'] },
  { id: 'TK-04', name: '赤羽', stoppingTypes: ['local', 'rapid', 'rapid_urban', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'TK-05', name: '浦和', stoppingTypes: ['local', 'rapid', 'rapid_urban', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'TK-06', name: 'さいたま新都心', stoppingTypes: ['local'] },
  { id: 'TK-07', name: '大宮', stoppingTypes: ['local', 'rapid', 'rapid_urban', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'TK-08', name: '宮原', stoppingTypes: ['local'] },
  { id: 'TK-09', name: '上尾', stoppingTypes: ['local', 'rapid', 'rapid_urban', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'TK-10', name: '北上尾', stoppingTypes: ['local'] },
  { id: 'TK-11', name: '桶川', stoppingTypes: ['local', 'rapid', 'rapid_urban', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'TK-12', name: '北本', stoppingTypes: ['local'] },
  { id: 'TK-13', name: '鴻巣', stoppingTypes: ['local', 'rapid', 'rapid_urban', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'TK-14', name: '北鴻巣', stoppingTypes: ['local'] },
  { id: 'TK-15', name: '吹上', stoppingTypes: ['local'] },
  { id: 'TK-16', name: '行田', stoppingTypes: ['local'] },
  { id: 'TK-17', name: '熊谷', stoppingTypes: ['local', 'rapid', 'rapid_urban', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'TK-18', name: '籠原', stoppingTypes: ['local', 'rapid', 'rapid_urban', 'commuter_rapid'], isMajor: true },
  { id: 'TK-19', name: '深谷', stoppingTypes: ['local', 'rapid', 'rapid_urban', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'TK-20', name: '岡部', stoppingTypes: ['local', 'rapid', 'rapid_urban', 'commuter_rapid'] },
  { id: 'TK-21', name: '本庄', stoppingTypes: ['local', 'rapid', 'rapid_urban', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'TK-22', name: '神保原', stoppingTypes: ['local', 'rapid', 'rapid_urban', 'commuter_rapid'] },
  { id: 'TK-23', name: '新町', stoppingTypes: ['local', 'rapid', 'rapid_urban', 'commuter_rapid'], isMajor: true },
  { id: 'TK-24', name: '倉賀野', stoppingTypes: ['local', 'rapid', 'rapid_urban', 'commuter_rapid'] },
  { id: 'TK-25', name: '高崎', stoppingTypes: ['local', 'rapid', 'rapid_urban', 'commuter_rapid', 'limitedExp'], isMajor: true },
];

// 7. 湘南新宿ライン (JS-24 〜 JS-01)
const shonanShinjukuStations = [
  { id: 'JS-24', name: '大宮', stoppingTypes: ['local', 'rapid', 'special_rapid', 'limitedExp'], isMajor: true },
  { id: 'JS-23', name: '浦和', stoppingTypes: ['local', 'rapid', 'special_rapid', 'limitedExp'], isMajor: true },
  { id: 'JS-22', name: '赤羽', stoppingTypes: ['local', 'rapid', 'special_rapid', 'limitedExp'], isMajor: true },
  { id: 'JS-21', name: '池袋', stoppingTypes: ['local', 'rapid', 'special_rapid', 'limitedExp'], isMajor: true },
  { id: 'JS-20', name: '新宿', stoppingTypes: ['local', 'rapid', 'special_rapid', 'limitedExp'], isMajor: true },
  { id: 'JS-19', name: '渋谷', stoppingTypes: ['local', 'rapid', 'special_rapid', 'limitedExp'], isMajor: true },
  { id: 'JS-18', name: '恵比寿', stoppingTypes: ['local', 'rapid'] },
  { id: 'JS-17', name: '大崎', stoppingTypes: ['local', 'rapid', 'special_rapid'], isMajor: true },
  { id: 'JS-15', name: '武蔵小杉', stoppingTypes: ['local', 'rapid', 'special_rapid', 'limitedExp'], isMajor: true },
  { id: 'JS-08', name: '横浜', stoppingTypes: ['local', 'rapid', 'special_rapid', 'limitedExp'], isMajor: true },
  { id: 'JS-03', name: '戸塚', stoppingTypes: ['local', 'rapid', 'special_rapid'], isMajor: true },
  { id: 'JS-01', name: '大船', stoppingTypes: ['local', 'rapid', 'special_rapid', 'limitedExp'], isMajor: true },
];

// 8. 上野東京ライン (UT-01 〜 UT-13)
const uenoTokyoStations = [
  { id: 'UT-01', name: '大宮', stoppingTypes: ['local', 'rapid', 'special_rapid', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'UT-02', name: 'さいたま新都心', stoppingTypes: ['local'] },
  { id: 'UT-03', name: '浦和', stoppingTypes: ['local', 'rapid', 'special_rapid', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'UT-04', name: '赤羽', stoppingTypes: ['local', 'rapid', 'special_rapid', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'UT-05', name: '尾久', stoppingTypes: ['local'] },
  { id: 'UT-06', name: '上野', stoppingTypes: ['local', 'rapid', 'special_rapid', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'UT-07', name: '東京', stoppingTypes: ['local', 'rapid', 'special_rapid', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'UT-08', name: '新橋', stoppingTypes: ['local', 'rapid', 'special_rapid', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'UT-09', name: '品川', stoppingTypes: ['local', 'rapid', 'special_rapid', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'UT-10', name: '川崎', stoppingTypes: ['local', 'rapid', 'special_rapid', 'commuter_rapid'], isMajor: true },
  { id: 'UT-11', name: '横浜', stoppingTypes: ['local', 'rapid', 'special_rapid', 'commuter_rapid', 'limitedExp'], isMajor: true },
  { id: 'UT-12', name: '戸塚', stoppingTypes: ['local', 'rapid', 'special_rapid', 'commuter_rapid'], isMajor: true },
  { id: 'UT-13', name: '大船', stoppingTypes: ['local', 'rapid', 'special_rapid', 'commuter_rapid', 'limitedExp'], isMajor: true },
];

async function main() {
  // 1. 東海道線
  buildLineData({
    lineId: 'tokaido',
    osmFiles: [
      'scripts/cache/osm_rel_12200093_ueno_tokyo_down.json',
      'scripts/cache/osm_rel_4673470_shonan_shinjuku_down.json',
      'scripts/cache/osm_rel_1943302_odoriko_tokyo_ito.json',
      'scripts/cache/osm_rel_11680902_tokaido_tokyo_atami.json',
    ],
    stationsConfig: tokaidoStations,
    stationPrefix: 'JT',
    outputDir: 'src/data/lines/tokaido',
  });

  // 2. 伊東線
  buildLineData({
    lineId: 'ito',
    osmFiles: [
      'scripts/cache/osm_rel_1943302_odoriko_tokyo_ito.json',
      'scripts/cache/osm_rel_1943299_ito_line.json',
    ],
    stationsConfig: itoStations,
    stationPrefix: 'JT',
    outputDir: 'src/data/lines/ito',
  });

  // 3. 横須賀線
  buildLineData({
    lineId: 'yokosuka',
    osmFiles: [
      'scripts/cache/osm_rel_9477155_yokosuka_down.json',
      'scripts/cache/osm_rel_4673470_shonan_shinjuku_down.json',
      'scripts/cache/osm_rel_12200093_ueno_tokyo_down.json',
    ],
    stationsConfig: yokosukaStations,
    stationPrefix: 'JO',
    outputDir: 'src/data/lines/yokosuka',
  });

  // 4. 総武快速線
  buildLineData({
    lineId: 'sobu_rapid',
    osmFiles: [
      'scripts/cache/osm_rel_9475339_sobu_rapid_down.json',
    ],
    stationsConfig: sobuRapidStations,
    stationPrefix: 'JO',
    outputDir: 'src/data/lines/sobu_rapid',
  });

  // 5. 宇都宮線
  buildLineData({
    lineId: 'utsunomiya',
    osmFiles: [
      'scripts/cache/osm_rel_12210362_utsunomiya_down.json',
    ],
    stationsConfig: utsunomiyaStations,
    stationPrefix: 'JU',
    outputDir: 'src/data/lines/utsunomiya',
  });

  // 6. 高崎線
  buildLineData({
    lineId: 'takasaki',
    osmFiles: [
      'scripts/cache/osm_rel_5430810_takasaki_down.json',
      'scripts/cache/osm_rel_4673470_shonan_shinjuku_down.json',
      'scripts/cache/osm_rel_12200093_ueno_tokyo_down.json',
      'scripts/cache/osm_rel_12210362_utsunomiya_down.json',
    ],
    stationsConfig: takasakiStations,
    stationPrefix: 'TK',
    outputDir: 'src/data/lines/takasaki',
  });

  // 7. 湘南新宿ライン
  buildLineData({
    lineId: 'shonan_shinjuku',
    osmFiles: [
      'scripts/cache/osm_rel_4673470_shonan_shinjuku_down.json',
    ],
    stationsConfig: shonanShinjukuStations,
    stationPrefix: 'JS',
    outputDir: 'src/data/lines/shonan_shinjuku',
  });

  // 8. 上野東京ライン
  buildLineData({
    lineId: 'ueno_tokyo',
    osmFiles: [
      'scripts/cache/osm_rel_12200093_ueno_tokyo_down.json',
    ],
    stationsConfig: uenoTokyoStations,
    stationPrefix: 'UT',
    outputDir: 'src/data/lines/ueno_tokyo',
  });

  console.log('\n🎉 ALL 8 LINES GEOMETRY & STATIONS BUILT SUCCESSFULLY!');
}

main().catch(err => {
  console.error('\n❌ Fatal build error:', err);
  process.exit(1);
});
