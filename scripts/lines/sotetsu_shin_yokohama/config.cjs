// 相鉄新横浜線 Yahoo! 路線情報スクレイパー設定 (新横浜 〜 西谷 全3駅)
module.exports = {
  lineId: 'sotetsu_shin_yokohama',
  name: '相鉄新横浜線',
  stationsFilePath: 'src/data/lines/sotetsu_shin_yokohama/stations.ts',
  buildStationTimetablesFromTrips: true,
  outputPaths: {
    stationTimetables: 'src/data/lines/sotetsu_shin_yokohama/stationTimetables.json',
    globalTimetable: 'src/data/lines/sotetsu_shin_yokohama/globalTimetable.json',
  },
  stations: [
    { id: 'SO-52', name: '新横浜', yahooStationId: '23212', inGroupId: null, outGroupId: '8131' },
    { id: 'SO-51', name: '羽沢横浜国大', yahooStationId: '29682', inGroupId: '8130', outGroupId: '8131' },
    { id: 'SO-08', name: '西谷', yahooStationId: '23267', inGroupId: '8130', outGroupId: null },
  ],
  stationNameAliases: {
    '羽沢横浜国大': '羽沢横浜国大',
  },
  trainTypeMap: {
    '各駅停車': 'local',
    '各停': 'local',
    '普通': 'local',
    '急行': 'express',
    '通勤急行': 'commuter_exp',
    '通急': 'commuter_exp',
    '特急': 'limitedExp',
    '通勤特急': 'commuter_ltd_exp',
    '通特': 'commuter_ltd_exp',
  },
  defaultCars: 10,
  baseSectionSeconds: {
    1: 240, // 新横浜 -> 羽沢横浜国大
    2: 180, // 羽沢横浜国大 -> 西谷
  },
};
