// 横浜高速鉄道みなとみらい線 Yahoo! 路線情報スクレイパー設定 (横浜 〜 元町・中華街 全6駅)
module.exports = {
  lineId: 'minatomirai',
  name: '横浜高速鉄道みなとみらい線',
  stationsFilePath: 'src/data/lines/minatomirai/stations.ts',
  buildStationTimetablesFromTrips: true,
  outputPaths: {
    stationTimetables: 'src/data/lines/minatomirai/stationTimetables.json',
    globalTimetable: 'src/data/lines/minatomirai/globalTimetable.json',
  },
  stations: [
    { id: 'MM-01', name: '横浜', yahooStationId: '23368', inGroupId: null, outGroupId: '6871' },
    { id: 'MM-02', name: '新高島', yahooStationId: '29479', inGroupId: '6870', outGroupId: '6871' },
    { id: 'MM-03', name: 'みなとみらい', yahooStationId: '29480', inGroupId: '6870', outGroupId: '6871' },
    { id: 'MM-04', name: '馬車道', yahooStationId: '29481', inGroupId: '6870', outGroupId: '6871' },
    { id: 'MM-05', name: '日本大通り', yahooStationId: '29482', inGroupId: '6870', outGroupId: '6871' },
    { id: 'MM-06', name: '元町・中華街', yahooStationId: '29483', inGroupId: '6870', outGroupId: null },
  ],
  stationNameAliases: {
    '日吉(神奈川県)': '日吉',
    '大倉山(神奈川県)': '大倉山',
    '森林公園(埼玉県)': '森林公園',
    '小川町(埼玉県)': '小川町',
    '武蔵小杉(神奈川県)': '武蔵小杉',
  },
  trainTypeMap: {
    '普通': 'local',
    '各駅停車': 'local',
    '各停': 'local',
    '急行': 'express',
    '通勤特急': 'commuter_ltd_exp',
    '通特': 'commuter_ltd_exp',
    '特急': 'ltd_exp',
    'Ｆライナー': 'ltd_exp',
    'Fライナー': 'ltd_exp',
    'Ｓ−ＴＲＡＩＮ': 'strain',
    'S-TRAIN': 'strain',
    'Ｓ－ＴＲＡＩＮ': 'strain',
  },
  defaultCars: 8,
  baseSectionSeconds: {
    1: 60,  // 横浜 -> 新高島
    2: 60,  // 新高島 -> みなとみらい
    3: 60,  // みなとみらい -> 馬車道
    4: 60,  // 馬車道 -> 日本大通り
    5: 120, // 日本大通り -> 元町・中華街
  },
};
