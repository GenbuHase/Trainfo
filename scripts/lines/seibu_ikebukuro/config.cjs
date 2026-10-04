// 西武池袋線・西武秩父線 Yahoo! 路線情報スクレイパー設定 (池袋 〜 西武秩父 全36駅)
module.exports = {
  lineId: 'seibu_ikebukuro',
  name: '西武池袋線',
  stationsFilePath: 'src/data/lines/seibu_ikebukuro/stations.ts',
  buildStationTimetablesFromTrips: true,
  outputPaths: {
    stationTimetables: 'src/data/lines/seibu_ikebukuro/stationTimetables.json',
    globalTimetable: 'src/data/lines/seibu_ikebukuro/globalTimetable.json',
  },
  stations: [
    { id: 'SI-01', name: '池袋', yahooStationId: '22513', inGroupId: null, outGroupId: '2811' },
    { id: 'SI-02', name: '椎名町', yahooStationId: '22707', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-03', name: '東長崎', yahooStationId: '22937', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-04', name: '江古田', yahooStationId: '22543', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-05', name: '桜台', yahooStationId: '22697', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-06', name: '練馬', yahooStationId: '22889', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-07', name: '中村橋', yahooStationId: '22854', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-08', name: '富士見台', yahooStationId: '22957', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-09', name: '練馬高野台', yahooStationId: '22891', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-10', name: '石神井公園', yahooStationId: '22704', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-11', name: '大泉学園', yahooStationId: '22555', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-12', name: '保谷', yahooStationId: '22970', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-13', name: 'ひばりヶ丘', yahooStationId: '22950', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-14', name: '東久留米', yahooStationId: '22931', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-15', name: '清瀬', yahooStationId: '22639', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-16', name: '秋津', yahooStationId: '22491', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-17', name: '所沢', yahooStationId: '22080', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-18', name: '西所沢', yahooStationId: '22096', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-19', name: '小手指', yahooStationId: '22036', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-20', name: '狭山ヶ丘', yahooStationId: '22044', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-21', name: '武蔵藤沢', yahooStationId: '22153', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-22', name: '稲荷山公園', yahooStationId: '21976', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-23', name: '入間市', yahooStationId: '21978', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-24', name: '仏子', yahooStationId: '22125', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-25', name: '元加治', yahooStationId: '22157', inGroupId: '2810', outGroupId: '2811' },
    { id: 'SI-26', name: '飯能', yahooStationId: '22106', inGroupId: '2810', outGroupId: '2821' },
    { id: 'SI-27', name: '東飯能', yahooStationId: '22114', inGroupId: '2820', outGroupId: '2821' },
    { id: 'SI-28', name: '高麗', yahooStationId: '22037', inGroupId: '2820', outGroupId: '2821' },
    { id: 'SI-29', name: '武蔵横手', yahooStationId: '22154', inGroupId: '2820', outGroupId: '2821' },
    { id: 'SI-30', name: '東吾野', yahooStationId: '22107', inGroupId: '2820', outGroupId: '2821' },
    { id: 'SI-31', name: '吾野', yahooStationId: '21966', inGroupId: '2820', outGroupId: '2831' },
    { id: 'SI-32', name: '西吾野', yahooStationId: '22091', inGroupId: '2830', outGroupId: '2831' },
    { id: 'SI-33', name: '正丸', yahooStationId: '22047', inGroupId: '2830', outGroupId: '2831' },
    { id: 'SI-34', name: '芦ヶ久保', yahooStationId: '21971', inGroupId: '2830', outGroupId: '2831' },
    { id: 'SI-35', name: '横瀬', yahooStationId: '22164', inGroupId: '2830', outGroupId: '2831' },
    { id: 'SI-36', name: '西武秩父', yahooStationId: '22066', inGroupId: '2830', outGroupId: null },
  ],
  stationNameAliases: {
    '森林公園(埼玉県)': '森林公園',
    '小川町(埼玉県)': '小川町',
    '大山(東京都)': '大山',
    '新富町(東京都)': '新富町',
    '平和台(東京都)': '平和台',
    '桜台(東京都)': '桜台',
    '狭山ケ丘': '狭山ヶ丘',
    '芦ケ久保': '芦ヶ久保',
    'ひばりケ丘(東京都)': 'ひばりヶ丘',
    'ひばりヶ丘(東京都)': 'ひばりヶ丘',
  },
  trainTypeMap: {
    '普通': 'local',
    '各駅停車': 'local',
    '各停': 'local',
    '準急': 'semiExp',
    '通勤準急': 'commuter_semi',
    '通準': 'commuter_semi',
    '快速': 'rapid',
    '急行': 'express',
    '通勤急行': 'commuter_exp',
    '通急': 'commuter_exp',
    '快速急行': 'rapidExp',
    '快急': 'rapidExp',
    'Ｆライナー': 'rapidExp',
    'Fライナー': 'rapidExp',
    'Ｓ−ＴＲＡＩＮ': 'strain',
    'S-TRAIN': 'strain',
    'Ｓ－ＴＲＡＩＮ': 'strain',
    '特急': 'limitedExp',
    'ちちぶ': 'limitedExp',
    'むさし': 'limitedExp',
    'ラビュー': 'limitedExp',
    'Laview': 'limitedExp',
  },
  defaultCars: 10,
  baseSectionSeconds: {
    1: 180, // 池袋 -> 椎名町
    2: 120, // 椎名町 -> 東長崎
    3: 120, // 東長崎 -> 江古田
    4: 120, // 江古田 -> 桜台
    5: 120, // 桜台 -> 練馬
    6: 120, // 練馬 -> 中村橋
    7: 120, // 中村橋 -> 富士見台
    8: 120, // 富士見台 -> 練馬高野台
    9: 120, // 練馬高野台 -> 石神井公園
    10: 180, // 石神井公園 -> 大泉学園
    11: 180, // 大泉学園 -> 保谷
    12: 180, // 保谷 -> ひばりヶ丘
    13: 180, // ひばりヶ丘 -> 東久留米
    14: 180, // 東久留米 -> 清瀬
    15: 180, // 清瀬 -> 秋津
    16: 180, // 秋津 -> 所沢
    17: 180, // 所沢 -> 西所沢
    18: 180, // 西所沢 -> 小手指
    19: 180, // 小手指 -> 狭山ヶ丘
    20: 180, // 狭山ヶ丘 -> 武蔵藤沢
    21: 180, // 武蔵藤沢 -> 稲荷山公園
    22: 180, // 稲荷山公園 -> 入間市
    23: 180, // 入間市 -> 仏子
    24: 180, // 仏子 -> 元加治
    25: 180, // 元加治 -> 飯能
    26: 180, // 飯能 -> 東飯能
    27: 300, // 東飯能 -> 高麗
    28: 240, // 高麗 -> 武蔵横手
    29: 240, // 武蔵横手 -> 東吾野
    30: 240, // 東吾野 -> 吾野
    31: 300, // 吾野 -> 西吾野
    32: 300, // 西吾野 -> 正丸
    33: 360, // 正丸 -> 芦ヶ久保
    34: 300, // 芦ヶ久保 -> 横瀬
    35: 300, // 横瀬 -> 西武秩父
  },
};
