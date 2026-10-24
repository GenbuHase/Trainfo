module.exports = {
  lineId: 'shinetsu_takasaki',
  name: 'JR信越本線',
  stationsFilePath: 'src/data/lines/shinetsu_takasaki/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/shinetsu_takasaki/stationTimetables.json',
    globalTimetable: 'src/data/lines/shinetsu_takasaki/globalTimetable.json',
  },
  // Yahoo! 路線情報の駅IDと方向グループID
  // 信越本線(高崎〜横川): 上り(高崎方面)=770 / 下り(横川方面)=771
  // 終着駅は進行方向のみ保持（境界駅の発車標重複防止）
  stations: [
    { id: 'ST-01', name: '高崎', yahooStationId: '21913', inGroupId: null, outGroupId: '771' },
    { id: 'ST-02', name: '北高崎', yahooStationId: '21871', inGroupId: '770', outGroupId: '771' },
    { id: 'ST-03', name: '群馬八幡', yahooStationId: '21881', inGroupId: '770', outGroupId: '771' },
    { id: 'ST-04', name: '安中', yahooStationId: '21844', inGroupId: '770', outGroupId: '771' },
    { id: 'ST-05', name: '磯部', yahooStationId: '21846', inGroupId: '770', outGroupId: '771' },
    { id: 'ST-06', name: '松井田', yahooStationId: '21947', inGroupId: '770', outGroupId: '771' },
    { id: 'ST-07', name: '西松井田', yahooStationId: '21930', inGroupId: '770', outGroupId: '771' },
    { id: 'ST-08', name: '横川', yahooStationId: '21962', inGroupId: '770', outGroupId: null },
  ],
  stationNameAliases: {},
  trainTypeMap: {
    '各駅停車': 'local',
    '普通': 'local',
    '快速': 'rapid',
    '特急': 'limitedExp',
  },
  defaultCars: 4,
  // 観測ダイヤ（高崎発横川行 普通）の駅間所要時間を参考にした基準秒数
  baseSectionSeconds: {
    1: 180, // 高崎 -> 北高崎
    2: 240, // 北高崎 -> 群馬八幡
    3: 300, // 群馬八幡 -> 安中
    4: 360, // 安中 -> 磯部
    5: 360, // 磯部 -> 松井田
    6: 120, // 松井田 -> 西松井田
    7: 480, // 西松井田 -> 横川
  },
};
