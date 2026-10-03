// 東京臨海高速鉄道りんかい線 Yahoo! 路線情報スクレイパー設定 (新木場 〜 大崎 全8駅)
module.exports = {
  lineId: 'rinkai',
  name: '東京臨海高速鉄道りんかい線',
  stationsFilePath: 'src/data/lines/rinkai/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/rinkai/stationTimetables.json',
    globalTimetable: 'src/data/lines/rinkai/globalTimetable.json',
  },
  stations: [
    { id: 'R-01', name: '新木場', yahooStationId: '22733', inGroupId: null, outGroupId: '6681' },
    { id: 'R-02', name: '東雲', yahooStationId: '29071', inGroupId: '6680', outGroupId: '6681' },
    { id: 'R-03', name: '国際展示場', yahooStationId: '29072', inGroupId: '6680', outGroupId: '6681' },
    { id: 'R-04', name: '東京テレポート', yahooStationId: '29073', inGroupId: '6680', outGroupId: '6681' },
    { id: 'R-05', name: '天王洲アイル', yahooStationId: '22825', inGroupId: '6680', outGroupId: '6681' },
    { id: 'R-06', name: '品川シーサイド', yahooStationId: '29439', inGroupId: '6680', outGroupId: '6681' },
    { id: 'R-07', name: '大井町', yahooStationId: '22556', inGroupId: '6680', outGroupId: '6681' },
    { id: 'R-08', name: '大崎', yahooStationId: '22559', inGroupId: '6680', outGroupId: null },
  ],
  stationNameAliases: {
    '東雲(東京都)': '東雲',
    '大宮(埼玉県)': '大宮',
    '十条(東京都)': '十条',
    '戸田(埼玉県)': '戸田',
    '日進(埼玉県)': '日進',
  },
  trainTypeMap: {
    '普通': 'local',
    '各駅停車': 'local',
    '快速': 'rapid',
    '通勤快速': 'commuter',
  },
  defaultCars: 10,
  baseSectionSeconds: {
    1: 150, // 新木場 -> 東雲
    2: 120, // 東雲 -> 国際展示場
    3: 150, // 国際展示場 -> 東京テレポート
    4: 210, // 東京テレポート -> 天王洲アイル
    5: 120, // 天王洲アイル -> 品川シーサイド
    6: 150, // 品川シーサイド -> 大井町
    7: 210, // 大井町 -> 大崎
  },
};
