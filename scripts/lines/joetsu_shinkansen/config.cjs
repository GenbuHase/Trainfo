const JOETSU_SYSTEM_NAMES = ['とき', 'たにがわ'];

module.exports = {
  lineId: 'joetsu_shinkansen',
  name: 'JR上越新幹線',
  stationsFilePath: 'src/data/lines/joetsu_shinkansen/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/joetsu_shinkansen/stationTimetables.json',
    globalTimetable: 'src/data/lines/joetsu_shinkansen/globalTimetable.json',
  },
  stations: [
    { id: 'JOS-01', name: '東京', yahooStationId: '22828', inGroupId: null, outGroupId: '241' },
    { id: 'JOS-02', name: '上野', yahooStationId: '22528', inGroupId: '230', outGroupId: '241' },
    { id: 'JOS-03', name: '大宮', yahooStationId: '21987', inGroupId: '230', outGroupId: '241' },
    { id: 'JOS-04', name: '熊谷', yahooStationId: '22029', inGroupId: '240', outGroupId: '241' },
    { id: 'JOS-05', name: '本庄早稲田', yahooStationId: '29484', inGroupId: '240', outGroupId: '241' },
    { id: 'JOS-06', name: '高崎', yahooStationId: '21913', inGroupId: '240', outGroupId: '241' },
    { id: 'JOS-07', name: '上毛高原', yahooStationId: '21907', inGroupId: '240', outGroupId: '241' },
    { id: 'JOS-08', name: '越後湯沢', yahooStationId: '23938', inGroupId: '240', outGroupId: '241' },
    { id: 'JOS-09', name: '浦佐', yahooStationId: '23913', inGroupId: '240', outGroupId: '241' },
    { id: 'JOS-10', name: '長岡', yahooStationId: '24029', inGroupId: '240', outGroupId: '241' },
    { id: 'JOS-11', name: '燕三条', yahooStationId: '24016', inGroupId: '240', outGroupId: '241' },
    { id: 'JOS-12', name: '新潟', yahooStationId: '24033', inGroupId: '240', outGroupId: null },
  ],
  stationNameAliases: {
    '大宮(埼玉県)': '大宮',
  },
  // 東北・北陸新幹線など、上越新幹線系統以外の列車を除外（大宮・上野等の上り東京行きや熊谷等に混入する別線区新幹線）
  shouldExcludeDeparture: ({ rawKindName }) => {
    return !JOETSU_SYSTEM_NAMES.some(name => rawKindName.includes(name));
  },
  shouldExcludeTrip: (trainDetail) => {
    const name = trainDetail.displayName || '';
    return !JOETSU_SYSTEM_NAMES.some(trainName => name.includes(trainName));
  },
  trainTypeMap: {
    'とき': 'toki',
    'たにがわ': 'tanigawa',
    '特急': 'limitedExp',
  },
  // たにがわ等、区間全駅停車となる新幹線列車の種別を保持（各停/localへの強制書き換えを防止）
  preserveAllStopsTypes: [
    'toki',
    'tanigawa',
    'limitedExp',
  ],
  defaultCars: 12,
  baseSectionSeconds: {
    1: 300,  // 東京 -> 上野
    2: 1200, // 上野 -> 大宮
    3: 780,  // 大宮 -> 熊谷
    4: 540,  // 熊谷 -> 本庄早稲田
    5: 540,  // 本庄早稲田 -> 高崎
    6: 900,  // 高崎 -> 上毛高原
    7: 840,  // 上毛高原 -> 越後湯沢
    8: 720,  // 越後湯沢 -> 浦佐
    9: 780,  // 浦佐 -> 長岡
    10: 600, // 長岡 -> 燕三条
    11: 720, // 燕三条 -> 新潟
  },
};
