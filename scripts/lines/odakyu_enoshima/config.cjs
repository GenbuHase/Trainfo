// 小田急江ノ島線 Yahoo! 路線情報スクレイパー設定 (相模大野 〜 片瀬江ノ島 全17駅)
module.exports = {
  lineId: 'odakyu_enoshima',
  name: '小田急江ノ島線',
  stationsFilePath: 'src/data/lines/odakyu_enoshima/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/odakyu_enoshima/stationTimetables.json',
    globalTimetable: 'src/data/lines/odakyu_enoshima/globalTimetable.json',
  },
  stations: [
    { id: 'OH-28', name: '相模大野', yahooStationId: '23172', inGroupId: null, outGroupId: '3111' },
    { id: 'OE-01', name: '東林間', yahooStationId: '23295', inGroupId: '3110', outGroupId: '3111' },
    { id: 'OE-02', name: '中央林間', yahooStationId: '23231', inGroupId: '3110', outGroupId: '3111' },
    { id: 'OE-03', name: '南林間', yahooStationId: '23337', inGroupId: '3110', outGroupId: '3111' },
    { id: 'OE-04', name: '鶴間', yahooStationId: '23242', inGroupId: '3110', outGroupId: '3111' },
    { id: 'OE-05', name: '大和', yahooStationId: '23360', inGroupId: '3110', outGroupId: '3111' },
    { id: 'OE-06', name: '桜ヶ丘', yahooStationId: '23179', inGroupId: '3110', outGroupId: '3111' },
    { id: 'OE-07', name: '高座渋谷', yahooStationId: '23155', inGroupId: '3110', outGroupId: '3111' },
    { id: 'OE-08', name: '長後', yahooStationId: '23233', inGroupId: '3110', outGroupId: '3111' },
    { id: 'OE-09', name: '湘南台', yahooStationId: '23191', inGroupId: '3110', outGroupId: '3111' },
    { id: 'OE-10', name: '六会日大前', yahooStationId: '23350', inGroupId: '3110', outGroupId: '3111' },
    { id: 'OE-11', name: '善行', yahooStationId: '23221', inGroupId: '3110', outGroupId: '3111' },
    { id: 'OE-12', name: '藤沢本町', yahooStationId: '23305', inGroupId: '3110', outGroupId: '3111' },
    { id: 'OE-13', name: '藤沢', yahooStationId: '23304', inGroupId: '3110', outGroupId: '3111' },
    { id: 'OE-14', name: '本鵠沼', yahooStationId: '23319', inGroupId: '3110', outGroupId: '3111' },
    { id: 'OE-15', name: '鵠沼海岸', yahooStationId: '23138', inGroupId: '3110', outGroupId: '3111' },
    { id: 'OE-16', name: '片瀬江ノ島', yahooStationId: '23108', inGroupId: '3110', outGroupId: null },
  ],
  stationNameAliases: {
    '大和(神奈川県)': '大和',
    '桜ケ丘': '桜ヶ丘',
  },
  trainTypeMap: {
    '各駅停車': 'local',
    '普通': 'local',
    '急行': 'express',
    '快速急行': 'rapidExp',
    '特急': 'limitedExp',
    'えのしま': 'limitedExp',
    'メトロえのしま': 'limitedExp',
    'ホームウェイ': 'limitedExp',
    'モーニングウェイ': 'limitedExp',
  },
  defaultCars: 6,
  baseSectionSeconds: {
    1: 120, // 相模大野 -> 東林間
    2: 120, // 東林間 -> 中央林間
    3: 120, // 中央林間 -> 南林間
    4: 60,  // 南林間 -> 鶴間
    5: 180, // 鶴間 -> 大和
    6: 120, // 大和 -> 桜ヶ丘
    7: 120, // 桜ヶ丘 -> 高座渋谷
    8: 120, // 高座渋谷 -> 長後
    9: 120, // 長後 -> 湘南台
    10: 120, // 湘南台 -> 六会日大前
    11: 180, // 六会日大前 -> 善行
    12: 120, // 善行 -> 藤沢本町
    13: 120, // 藤沢本町 -> 藤沢
    14: 120, // 藤沢 -> 本鵠沼
    15: 120, // 本鵠沼 -> 鵠沼海岸
    16: 120, // 鵠沼海岸 -> 片瀬江ノ島
  },
};
