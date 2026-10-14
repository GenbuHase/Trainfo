// JR常磐線(取手以北) Yahoo! 路線情報スクレイパー設定 (取手 〜 勝田 全18駅)
module.exports = {
  lineId: 'joban_north',
  name: 'JR常磐線(取手以北)',
  stationsFilePath: 'src/data/lines/joban_north/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/joban_north/stationTimetables.json',
    globalTimetable: 'src/data/lines/joban_north/globalTimetable.json',
  },
  stations: [
    { id: 'JN-01', name: '取手', yahooStationId: '21673', inGroupId: null, outGroupId: '651' },
    { id: 'JN-02', name: '藤代', yahooStationId: '21705', inGroupId: '650', outGroupId: '651' },
    { id: 'JN-03', name: '龍ケ崎市', yahooStationId: '21637', inGroupId: '650', outGroupId: '651' },
    { id: 'JN-04', name: '牛久', yahooStationId: '21594', inGroupId: '650', outGroupId: '651' },
    { id: 'JN-05', name: 'ひたち野うしく', yahooStationId: '29220', inGroupId: '650', outGroupId: '651' },
    { id: 'JN-06', name: '荒川沖', yahooStationId: '21582', inGroupId: '650', outGroupId: '651' },
    { id: 'JN-07', name: '土浦', yahooStationId: '21663', inGroupId: '650', outGroupId: '651' },
    { id: 'JN-08', name: '神立', yahooStationId: '21625', inGroupId: '650', outGroupId: '651' },
    { id: 'JN-09', name: '高浜', yahooStationId: '21656', inGroupId: '650', outGroupId: '651' },
    { id: 'JN-10', name: '石岡', yahooStationId: '21583', inGroupId: '650', outGroupId: '651' },
    { id: 'JN-11', name: '羽鳥', yahooStationId: '21685', inGroupId: '650', outGroupId: '651' },
    { id: 'JN-12', name: '岩間', yahooStationId: '21593', inGroupId: '650', outGroupId: '651' },
    { id: 'JN-13', name: '友部', yahooStationId: '21672', inGroupId: '650', outGroupId: '651' },
    { id: 'JN-14', name: '内原', yahooStationId: '21595', inGroupId: '650', outGroupId: '651' },
    { id: 'JN-15', name: '赤塚', yahooStationId: '21579', inGroupId: '650', outGroupId: '651' },
    { id: 'JN-16', name: '偕楽園', yahooStationId: '21687', inGroupId: null, outGroupId: null },
    { id: 'JN-17', name: '水戸', yahooStationId: '21710', inGroupId: '650', outGroupId: '651' },
    { id: 'JN-18', name: '勝田', yahooStationId: '21615', inGroupId: '650', outGroupId: null },
  ],
  stationNameAliases: {},
  trainTypeMap: {
    '普通': 'local',
    '各駅停車': 'local',
    '快速': 'rapid',
    '特別快速': 'special_rapid',
    '特急': 'limited_express',
  },
  defaultCars: 10,
  baseSectionSeconds: {
    1: 360, // 取手 -> 藤代
    2: 240, // 藤代 -> 龍ケ崎市
    3: 300, // 龍ケ崎市 -> 牛久
    4: 240, // 牛久 -> ひたち野うしく
    5: 240, // ひたち野うしく -> 荒川沖
    6: 360, // 荒川沖 -> 土浦
    7: 360, // 土浦 -> 神立
    8: 360, // 神立 -> 高浜
    9: 240, // 高浜 -> 石岡
    10: 360, // 石岡 -> 羽鳥
    11: 360, // 羽鳥 -> 岩間
    12: 420, // 岩間 -> 友部
    13: 300, // 友部 -> 内原
    14: 360, // 内原 -> 赤塚
    15: 240, // 赤塚 -> 偕楽園
    16: 180, // 偕楽園 -> 水戸
    17: 360, // 水戸 -> 勝田
  },
};
