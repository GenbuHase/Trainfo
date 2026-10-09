// 東急新横浜線 Yahoo! 路線情報スクレイパー設定 (日吉 〜 新横浜 全3駅)
module.exports = {
  lineId: 'tokyu_shin_yokohama',
  name: '東急新横浜線',
  stationsFilePath: 'src/data/lines/tokyu_shin_yokohama/stations.ts',
  buildStationTimetablesFromTrips: true,
  outputPaths: {
    stationTimetables: 'src/data/lines/tokyu_shin_yokohama/stationTimetables.json',
    globalTimetable: 'src/data/lines/tokyu_shin_yokohama/globalTimetable.json',
  },
  stations: [
    { id: 'SH-03', name: '日吉', yahooStationId: '23297', inGroupId: null, outGroupId: '8631' },
    { id: 'SH-02', name: '新綱島', yahooStationId: '29939', inGroupId: '8630', outGroupId: '8631' },
    { id: 'SH-01', name: '新横浜', yahooStationId: '23212', inGroupId: '8630', outGroupId: null },
  ],
  stationNameAliases: {
    '日吉(神奈川県)': '日吉',
  },
  trainTypeMap: {
    '各駅停車': 'local',
    '各停': 'local',
    '普通': 'local',
    '急行': 'express',
  },
  defaultCars: 8,
  baseSectionSeconds: {
    1: 150, // 日吉 -> 新綱島
    2: 180, // 新綱島 -> 新横浜
  },
};
