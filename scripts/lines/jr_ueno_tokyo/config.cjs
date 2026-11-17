// JR上野東京ライン Yahoo! 路線情報スクレイパー設定 (東京〜上野 全2駅)
module.exports = {
  lineId: 'jr_ueno_tokyo',
  name: 'JR上野東京ライン',
  stationsFilePath: 'src/data/lines/jr_ueno_tokyo/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_ueno_tokyo/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_ueno_tokyo/globalTimetable.json',
  },
  stations: [
    {
      id: 'UT-01',
      name: '東京',
      yahooStationId: '22828',
      inGroupId: null,
      outGroupId: '7910', // 下り: 東京発 上野・大宮方面
    },
    {
      id: 'UT-02',
      name: '上野',
      yahooStationId: '22528',
      inGroupId: '7911',  // 上り: 上野発 東京・品川方面
      outGroupId: null,
    },
  ],
  trainTypeMap: {
    '各駅停車': 'local',
    '普通': 'local',
    '快速': 'rapid',
    '特別快速': 'special_rapid',
    '通勤快速': 'commuter_rapid',
    '快速アクティー': 'rapid_acty',
    '快速ラビット': 'rapid_rabbit',
    '快速アーバン': 'rapid_urban',
    '特急': 'limited_exp',
    '成田エクスプレス': 'limited_exp',
    '踊り子': 'limited_exp',
    'サフィール踊り子': 'limited_exp',
    '湘南': 'limited_exp',
    '草津・四万': 'limited_exp',
    'あかぎ': 'limited_exp',
    'しおさい': 'limited_exp',
  },
  defaultCars: 15,
  baseSectionSeconds: {
    1: 300, // 東京 -> 上野 約5分
  },
  buildStationTimetablesFromTrips: true,
};
