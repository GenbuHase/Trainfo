// 相鉄いずみ野線 Yahoo! 路線情報スクレイパー設定 (二俣川 〜 湘南台 全8駅)
module.exports = {
  lineId: 'sotetsu_izumino',
  name: '相鉄いずみ野線',
  stationsFilePath: 'src/data/lines/sotetsu_izumino/stations.ts',
  buildStationTimetablesFromTrips: true,
  outputPaths: {
    stationTimetables: 'src/data/lines/sotetsu_izumino/stationTimetables.json',
    globalTimetable: 'src/data/lines/sotetsu_izumino/globalTimetable.json',
  },
  stations: [
    { id: 'SO-10', name: '二俣川', yahooStationId: '23310', inGroupId: null, outGroupId: '3451' },
    { id: 'SO-31', name: '南万騎が原', yahooStationId: '23336', inGroupId: '3450', outGroupId: '3451' },
    { id: 'SO-32', name: '緑園都市', yahooStationId: '23371', inGroupId: '3450', outGroupId: '3451' },
    { id: 'SO-33', name: '弥生台', yahooStationId: '23361', inGroupId: '3450', outGroupId: '3451' },
    { id: 'SO-34', name: 'いずみ野', yahooStationId: '23070', inGroupId: '3450', outGroupId: '3451' },
    { id: 'SO-35', name: 'いずみ中央', yahooStationId: '23069', inGroupId: '3450', outGroupId: '3451' },
    { id: 'SO-36', name: 'ゆめが丘', yahooStationId: '29256', inGroupId: '3450', outGroupId: '3451' },
    { id: 'SO-37', name: '湘南台', yahooStationId: '23191', inGroupId: '3450', outGroupId: null },
  ],
  stationNameAliases: {
    //
  },
  trainTypeMap: {
    '各駅停車': 'local',
    '各停': 'local',
    '普通': 'local',
    '快速': 'rapid',
    '通勤急行': 'commuter_exp',
    '通急': 'commuter_exp',
    '特急': 'limitedExp',
    '通勤特急': 'commuter_ltd_exp',
    '通特': 'commuter_ltd_exp',
  },
  defaultCars: 10,
  baseSectionSeconds: {
    1: 120, // 二俣川 -> 南万騎が原
    2: 120, // 南万騎が原 -> 緑園都市
    3: 120, // 緑園都市 -> 弥生台
    4: 120, // 弥生台 -> いずみ野
    5: 120, // いずみ野 -> いずみ中央
    6: 120, // いずみ中央 -> ゆめが丘
    7: 150, // ゆめが丘 -> 湘南台
  },
};
