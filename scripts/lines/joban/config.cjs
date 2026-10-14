// JR常磐線（各駅停車） Yahoo! 路線情報スクレイパー設定 (綾瀬 〜 取手 全14駅)
module.exports = {
  lineId: 'joban',
  name: 'JR常磐線',
  stationsFilePath: 'src/data/lines/joban/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/joban/stationTimetables.json',
    globalTimetable: 'src/data/lines/joban/globalTimetable.json',
  },
  stations: [
    { id: 'JL-19', name: '綾瀬', yahooStationId: '22499', inGroupId: null, outGroupId: '1001' },
    { id: 'JL-20', name: '亀有', yahooStationId: '22611', inGroupId: '1000', outGroupId: '1001' },
    { id: 'JL-21', name: '金町', yahooStationId: '22598', inGroupId: '1000', outGroupId: '1001' },
    { id: 'JL-22', name: '松戸', yahooStationId: '22444', inGroupId: '1000', outGroupId: '1001' },
    { id: 'JL-23', name: '北松戸', yahooStationId: '22262', inGroupId: '1000', outGroupId: '1001' },
    { id: 'JL-24', name: '馬橋', yahooStationId: '22447', inGroupId: '1000', outGroupId: '1001' },
    { id: 'JL-25', name: '新松戸', yahooStationId: '22332', inGroupId: '1000', outGroupId: '1001' },
    { id: 'JL-26', name: '北小金', yahooStationId: '22258', inGroupId: '1000', outGroupId: '1001' },
    { id: 'JL-27', name: '南柏', yahooStationId: '22452', inGroupId: '1000', outGroupId: '1001' },
    { id: 'JL-28', name: '柏', yahooStationId: '22228', inGroupId: '1000', outGroupId: '1001' },
    { id: 'JL-29', name: '北柏', yahooStationId: '22257', inGroupId: '1000', outGroupId: '1001' },
    { id: 'JL-30', name: '我孫子', yahooStationId: '22183', inGroupId: '1000', outGroupId: '1001' },
    { id: 'JL-31', name: '天王台', yahooStationId: '22372', inGroupId: '1000', outGroupId: '1001' },
    { id: 'JL-32', name: '取手', yahooStationId: '21673', inGroupId: '1000', outGroupId: null },
  ],
  stationNameAliases: {
    '金町(東京都)': '金町',
    '赤坂(東京都)': '赤坂',
    '霞ケ関(東京都)': '霞ケ関',
    '大手町(東京都)': '大手町',
    '町屋(東京メトロ)': '町屋',
    '明治神宮前〈原宿〉': '明治神宮前',
    '二重橋前〈丸の内〉': '二重橋前',
  },
  trainTypeMap: {
    '各駅停車': 'local',
    '普通': 'local',
    '各停': 'local',
    '準急': 'semiExp',
    '通勤準急': 'commuter_semi',
    '急行': 'express',
    '通勤急行': 'commuter_exp',
  },
  defaultCars: 10,
  baseSectionSeconds: {
    19: 150, // 綾瀬 -> 亀有
    20: 120, // 亀有 -> 金町
    21: 240, // 金町 -> 松戸
    22: 120, // 松戸 -> 北松戸
    23: 120, // 北松戸 -> 馬橋
    24: 120, // 馬橋 -> 新松戸
    25: 150, // 新松戸 -> 北小金
    26: 150, // 北小金 -> 南柏
    27: 150, // 南柏 -> 柏
    28: 150, // 柏 -> 北柏
    29: 180, // 北柏 -> 我孫子
    30: 180, // 我孫子 -> 天王台
    31: 210, // 天王台 -> 取手
  },
};
