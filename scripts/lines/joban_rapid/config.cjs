// JR常磐線快速 Yahoo! 路線情報スクレイパー設定 (上野 〜 取手 全10駅)
module.exports = {
  lineId: 'joban_rapid',
  name: 'JR常磐線快速',
  stationsFilePath: 'src/data/lines/joban_rapid/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/joban_rapid/stationTimetables.json',
    globalTimetable: 'src/data/lines/joban_rapid/globalTimetable.json',
  },
  stations: [
    { id: 'JJ-01', name: '上野', yahooStationId: '22528', inGroupId: '7911', outGroupId: '991' },
    { id: 'JJ-02', name: '日暮里', yahooStationId: '22862', inGroupId: '990', outGroupId: '991' },
    { id: 'JJ-03', name: '三河島', yahooStationId: '22983', inGroupId: '990', outGroupId: '991' },
    { id: 'JJ-04', name: '南千住', yahooStationId: '22995', inGroupId: '990', outGroupId: '991' },
    { id: 'JJ-05', name: '北千住', yahooStationId: '22630', inGroupId: '990', outGroupId: '991' },
    { id: 'JJ-06', name: '松戸', yahooStationId: '22444', inGroupId: '990', outGroupId: '991' },
    { id: 'JJ-07', name: '柏', yahooStationId: '22228', inGroupId: '990', outGroupId: '991' },
    { id: 'JJ-08', name: '我孫子', yahooStationId: '22183', inGroupId: '990', outGroupId: '991' },
    { id: 'JJ-09', name: '天王台', yahooStationId: '22372', inGroupId: '990', outGroupId: '991' },
    { id: 'JJ-10', name: '取手', yahooStationId: '21673', inGroupId: '990', outGroupId: null },
  ],
  stationNameAliases: {
    '金町(東京都)': '金町',
    '町屋(東京メトロ)': '町屋',
  },
  trainTypeMap: {
    '各駅停車': 'local',
    '普通': 'local',
    '快速': 'rapid',
    '特別快速': 'special_rapid',
    '特急': 'limited_express',
  },
  defaultCars: 15,
  baseSectionSeconds: {
    1: 240, // 上野 -> 日暮里
    2: 150, // 日暮里 -> 三河島
    3: 150, // 三河島 -> 南千住
    4: 180, // 南千住 -> 北千住
    5: 480, // 北千住 -> 松戸
    6: 480, // 松戸 -> 柏
    7: 240, // 柏 -> 我孫子
    8: 180, // 我孫子 -> 天王台
    9: 210, // 天王台 -> 取手
  },
  buildStationTimetablesFromTrips: true,
  singleStopRescueRules: [
    {
      singleStationId: 'JJ-01',
      boundaryStationId: 'JJ-10',
      estimatedSectionSeconds: 1560, // 上野〜取手 特急で約26分
      throughStations: ['土浦', '石岡', '友部', '水戸', '勝田', '日立', '高萩', 'いわき', '仙台'],
    },
  ],
};
