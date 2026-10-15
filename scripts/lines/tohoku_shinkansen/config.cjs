// JR東北新幹線 Yahoo! 路線情報スクレイパー設定 (東京 〜 新青森 全23駅)
module.exports = {
  lineId: 'tohoku_shinkansen',
  name: 'JR東北新幹線',
  stationsFilePath: 'src/data/lines/tohoku_shinkansen/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tohoku_shinkansen/stationTimetables.json',
    globalTimetable: 'src/data/lines/tohoku_shinkansen/globalTimetable.json',
  },
  stations: [
    { id: 'TS-01', name: '東京', yahooStationId: '22828', inGroupId: null, outGroupId: '231' },
    { id: 'TS-02', name: '上野', yahooStationId: '22528', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-03', name: '大宮', yahooStationId: '21987', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-04', name: '小山', yahooStationId: '21746', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-05', name: '宇都宮', yahooStationId: '21736', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-06', name: '那須塩原', yahooStationId: '21804', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-07', name: '新白河', yahooStationId: '21494', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-08', name: '郡山', yahooStationId: '21483', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-09', name: '福島', yahooStationId: '21551', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-10', name: '白石蔵王', yahooStationId: '21040', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-11', name: '仙台', yahooStationId: '21044', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-12', name: '古川', yahooStationId: '21087', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-13', name: 'くりこま高原', yahooStationId: '21019', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-14', name: '一ノ関', yahooStationId: '20806', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-15', name: '水沢江刺', yahooStationId: '20934', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-16', name: '北上', yahooStationId: '20844', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-17', name: '新花巻', yahooStationId: '20873', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-18', name: '盛岡', yahooStationId: '20940', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-19', name: 'いわて沼宮内', yahooStationId: '20902', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-20', name: '二戸', yahooStationId: '20901', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-21', name: '八戸', yahooStationId: '20750', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-22', name: '七戸十和田', yahooStationId: '29388', inGroupId: '230', outGroupId: '231' },
    { id: 'TS-23', name: '新青森', yahooStationId: '20698', inGroupId: '230', outGroupId: null },
  ],
  stationNameAliases: {
    '大宮(埼玉県)': '大宮',
    '郡山(福島県)': '郡山',
    '福島(福島県)': '福島',
  },
  trainTypeMap: {
    'はやぶさ': 'hayabusa',
    'はやて': 'hayate',
    'やまびこ': 'yamabiko',
    'なすの': 'nasuno',
    'こまち': 'komachi',
    'つばさ': 'tsubasa',
    '特急': 'limitedExp',
  },
  defaultCars: 10,
  baseSectionSeconds: {
    1: 300,  // 東京 -> 上野
    2: 1200, // 上野 -> 大宮
    3: 1020, // 大宮 -> 小山
    4: 660,  // 小山 -> 宇都宮
    5: 840,  // 宇都宮 -> 那須塩原
    6: 600,  // 那須塩原 -> 新白河
    7: 720,  // 新白河 -> 郡山
    8: 780,  // 郡山 -> 福島
    9: 720,  // 福島 -> 白石蔵王
    10: 840, // 白石蔵王 -> 仙台
    11: 780, // 仙台 -> 古川
    12: 540, // 古川 -> くりこま高原
    13: 540, // くりこま高原 -> 一ノ関
    14: 660, // 一ノ関 -> 水沢江刺
    15: 540, // 水沢江刺 -> 北上
    16: 480, // 北上 -> 新花巻
    17: 660, // 新花巻 -> 盛岡
    18: 720, // 盛岡 -> いわて沼宮内
    19: 720, // いわて沼宮内 -> 二戸
    20: 720, // 二戸 -> 八戸
    21: 840, // 八戸 -> 七戸十和田
    22: 900, // 七戸十和田 -> 新青森
  },
};
