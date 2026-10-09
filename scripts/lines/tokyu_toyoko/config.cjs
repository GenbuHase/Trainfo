// 東急東横線 Yahoo! 路線情報スクレイパー設定 (渋谷 〜 横浜 全21駅)
module.exports = {
  lineId: 'tokyu_toyoko',
  name: '東急東横線',
  stationsFilePath: 'src/data/lines/tokyu_toyoko/stations.ts',
  buildStationTimetablesFromTrips: true,
  outputPaths: {
    stationTimetables: 'src/data/lines/tokyu_toyoko/stationTimetables.json',
    globalTimetable: 'src/data/lines/tokyu_toyoko/globalTimetable.json',
  },
  stations: [
    { id: 'TY-01', name: '渋谷', yahooStationId: '22715', inGroupId: null, outGroupId: '3141' },
    { id: 'TY-02', name: '代官山', yahooStationId: '22812', inGroupId: '3140', outGroupId: '3141' },
    { id: 'TY-03', name: '中目黒', yahooStationId: '22855', inGroupId: '3140', outGroupId: '3141' },
    { id: 'TY-04', name: '祐天寺', yahooStationId: '23035', inGroupId: '3140', outGroupId: '3141' },
    { id: 'TY-05', name: '学芸大学', yahooStationId: '22619', inGroupId: '3140', outGroupId: '3141' },
    { id: 'TY-06', name: '都立大学', yahooStationId: '22843', inGroupId: '3140', outGroupId: '3141' },
    { id: 'TY-07', name: '自由が丘', yahooStationId: '22755', inGroupId: '3140', outGroupId: '3141' },
    { id: 'TY-08', name: '田園調布', yahooStationId: '22826', inGroupId: '3140', outGroupId: '3141' },
    { id: 'TY-09', name: '多摩川', yahooStationId: '22803', inGroupId: '3140', outGroupId: '3141' },
    { id: 'TY-10', name: '新丸子', yahooStationId: '23210', inGroupId: '3140', outGroupId: '3141' },
    { id: 'TY-11', name: '武蔵小杉', yahooStationId: '23345', inGroupId: '3140', outGroupId: '3141' },
    { id: 'TY-12', name: '元住吉', yahooStationId: '23353', inGroupId: '3140', outGroupId: '3141' },
    { id: 'TY-13', name: '日吉', yahooStationId: '23297', inGroupId: '3140', outGroupId: '3141' },
    { id: 'TY-14', name: '綱島', yahooStationId: '23240', inGroupId: '3140', outGroupId: '3141' },
    { id: 'TY-15', name: '大倉山', yahooStationId: '23093', inGroupId: '3140', outGroupId: '3141' },
    { id: 'TY-16', name: '菊名', yahooStationId: '23130', inGroupId: '3140', outGroupId: '3141' },
    { id: 'TY-17', name: '妙蓮寺', yahooStationId: '23342', inGroupId: '3140', outGroupId: '3141' },
    { id: 'TY-18', name: '白楽', yahooStationId: '23278', inGroupId: '3140', outGroupId: '3141' },
    { id: 'TY-19', name: '東白楽', yahooStationId: '23292', inGroupId: '3140', outGroupId: '3141' },
    { id: 'TY-20', name: '反町', yahooStationId: '23229', inGroupId: '3140', outGroupId: '3141' },
    { id: 'TY-21', name: '横浜', yahooStationId: '23368', inGroupId: '3140', outGroupId: null },
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
    1: 120, // 渋谷 -> 代官山
    2: 120, // 代官山 -> 中目黒
    3: 120, // 中目黒 -> 祐天寺
    4: 120, // 祐天寺 -> 学芸大学
    5: 120, // 学芸大学 -> 都立大学
    6: 120, // 都立大学 -> 自由が丘
    7: 120, // 自由が丘 -> 田園調布
    8: 120, // 田園調布 -> 多摩川
    9: 120, // 多摩川 -> 新丸子
    10: 120, // 新丸子 -> 武蔵小杉
    11: 120, // 武蔵小杉 -> 元住吉
    12: 120, // 元住吉 -> 日吉
    13: 120, // 日吉 -> 綱島
    14: 120, // 綱島 -> 大倉山
    15: 120, // 大倉山 -> 菊名
    16: 120, // 菊名 -> 妙蓮寺
    17: 120, // 妙蓮寺 -> 白楽
    18: 120, // 白楽 -> 東白楽
    19: 120, // 東白楽 -> 反町
    20: 120, // 反町 -> 横浜
  },
};
