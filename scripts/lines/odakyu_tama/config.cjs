// 小田急多摩線 Yahoo! 路線情報スクレイパー設定 (新百合ヶ丘 〜 唐木田 全8駅)
module.exports = {
  lineId: 'odakyu_tama',
  name: '小田急多摩線',
  stationsFilePath: 'src/data/lines/odakyu_tama/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/odakyu_tama/stationTimetables.json',
    globalTimetable: 'src/data/lines/odakyu_tama/globalTimetable.json',
  },
  stations: [
    { id: 'OH-23', name: '新百合ヶ丘', yahooStationId: '23211', inGroupId: null, outGroupId: '3131' },
    { id: 'OT-01', name: '五月台', yahooStationId: '23182', inGroupId: '3130', outGroupId: '3131' },
    { id: 'OT-02', name: '栗平', yahooStationId: '23142', inGroupId: '3130', outGroupId: '3131' },
    { id: 'OT-03', name: '黒川', yahooStationId: '23143', inGroupId: '3130', outGroupId: '3131' },
    { id: 'OT-04', name: 'はるひ野', yahooStationId: '29505', inGroupId: '3130', outGroupId: '3131' },
    { id: 'OT-05', name: '小田急永山', yahooStationId: '22581', inGroupId: '3130', outGroupId: '3131' },
    { id: 'OT-06', name: '小田急多摩センター', yahooStationId: '22580', inGroupId: '3130', outGroupId: '3131' },
    { id: 'OT-07', name: '唐木田', yahooStationId: '22615', inGroupId: '3130', outGroupId: null },
  ],
  stationNameAliases: {
    '新百合ケ丘': '新百合ヶ丘',
    '黒川(神奈川県)': '黒川',
  },
  trainTypeMap: {
    '各駅停車': 'local',
    '普通': 'local',
    '準急': 'semiExp',
    '通勤準急': 'commuter_semi',
    '急行': 'express',
    '通勤急行': 'commuter_exp',
    '快速急行': 'rapidExp',
  },
  defaultCars: 8,
  baseSectionSeconds: {
    1: 120, // 新百合ヶ丘 -> 五月台
    2: 120, // 五月台 -> 栗平
    3: 120, // 栗平 -> 黒川
    4: 120, // 黒川 -> はるひ野
    5: 180, // はるひ野 -> 小田急永山
    6: 180, // 小田急永山 -> 小田急多摩センター
    7: 120, // 小田急多摩センター -> 唐木田
  },
};
