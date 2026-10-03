// 西武有楽町線 Yahoo! 路線情報スクレイパー設定 (小竹向原 〜 練馬 全3駅)
module.exports = {
  lineId: 'seibu_yurakucho',
  name: '西武有楽町線',
  stationsFilePath: 'src/data/lines/seibu_yurakucho/stations.ts',
  buildStationTimetablesFromTrips: true,
  outputPaths: {
    stationTimetables: 'src/data/lines/seibu_yurakucho/stationTimetables.json',
    globalTimetable: 'src/data/lines/seibu_yurakucho/globalTimetable.json',
  },
  stations: [
    { id: 'SI-37', name: '小竹向原', yahooStationId: '22679', inGroupId: null, outGroupId: '2850' },
    { id: 'SI-38', name: '新桜台', yahooStationId: '22739', inGroupId: '2851', outGroupId: '2850' },
    { id: 'SI-06', name: '練馬', yahooStationId: '22889', inGroupId: '2851', outGroupId: null },
  ],
  stationNameAliases: {
    '森林公園(埼玉県)': '森林公園',
    '小川町(埼玉県)': '小川町',
    '大山(東京都)': '大山',
    '新富町(東京都)': '新富町',
    '平和台(東京都)': '平和台',
    '元木(埼玉県)': '元木',
  },
  trainTypeMap: {
    '普通': 'local',
    '各駅停車': 'local',
    '各停': 'local',
    '準急': 'semiExp',
    '快速': 'rapid',
    '急行': 'express',
    '快速急行': 'rapidExp',
    'Ｆライナー': 'rapidExp',
    'Fライナー': 'rapidExp',
    'Ｓ−ＴＲＡＩＮ': 'strain',
    'S-TRAIN': 'strain',
    'Ｓ－ＴＲＡＩＮ': 'strain',
  },
  defaultCars: 10,
  baseSectionSeconds: {
    1: 90,  // 小竹向原 -> 新桜台
    2: 120, // 新桜台 -> 練馬
  },
};
