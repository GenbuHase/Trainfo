// JR常磐線快速 Yahoo! 路線情報スクレイパー設定 (品川 〜 取手 全13駅)
module.exports = {
  lineId: 'joban_rapid',
  name: 'JR常磐線快速',
  stationsFilePath: 'src/data/lines/joban_rapid/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/joban_rapid/stationTimetables.json',
    globalTimetable: 'src/data/lines/joban_rapid/globalTimetable.json',
  },
  stations: [
    { id: 'JJ-01', name: '品川', yahooStationId: '22709', inGroupId: null, outGroupId: '1170' },
    { id: 'JJ-02', name: '新橋', yahooStationId: '22751', inGroupId: '1171', outGroupId: '1170' },
    { id: 'JJ-03', name: '東京', yahooStationId: '22828', inGroupId: '1171', outGroupId: '7910' },
    { id: 'JJ-04', name: '上野', yahooStationId: '22528', inGroupId: '7911', outGroupId: '991' },
    { id: 'JJ-05', name: '日暮里', yahooStationId: '22862', inGroupId: '990', outGroupId: '991' },
    { id: 'JJ-06', name: '三河島', yahooStationId: '22983', inGroupId: '990', outGroupId: '991' },
    { id: 'JJ-07', name: '南千住', yahooStationId: '22995', inGroupId: '990', outGroupId: '991' },
    { id: 'JJ-08', name: '北千住', yahooStationId: '22630', inGroupId: '990', outGroupId: '991' },
    { id: 'JJ-09', name: '松戸', yahooStationId: '22444', inGroupId: '990', outGroupId: '991' },
    { id: 'JJ-10', name: '柏', yahooStationId: '22228', inGroupId: '990', outGroupId: '991' },
    { id: 'JJ-11', name: '我孫子', yahooStationId: '22183', inGroupId: '990', outGroupId: '991' },
    { id: 'JJ-12', name: '天王台', yahooStationId: '22372', inGroupId: '990', outGroupId: '991' },
    { id: 'JJ-13', name: '取手', yahooStationId: '21673', inGroupId: '990', outGroupId: null },
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
    1: 300, // 品川 -> 新橋
    2: 240, // 新橋 -> 東京
    3: 300, // 東京 -> 上野
    4: 240, // 上野 -> 日暮里
    5: 150, // 日暮里 -> 三河島
    6: 150, // 三河島 -> 南千住
    7: 180, // 南千住 -> 北千住
    8: 480, // 北千住 -> 松戸
    9: 480, // 松戸 -> 柏
    10: 240, // 柏 -> 我孫子
    11: 180, // 我孫子 -> 天王台
    12: 210, // 天王台 -> 取手
  },
};
