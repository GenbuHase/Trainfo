// JR中央線快速 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'chuo',
  name: 'JR中央線快速',
  stationsFilePath: 'src/data/lines/chuo/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/chuo/stationTimetables.json',
    globalTimetable: 'src/data/lines/chuo/globalTimetable.json',
  },
  // Yahoo! 駅・路線グループ定義（上り: 1090, 下り: 1091）
  stations: [
    { id: 'JC-01', name: '東京', yahooStationId: '22828', inGroupId: null, outGroupId: '1091' },
    { id: 'JC-02', name: '神田', yahooStationId: '22617', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-03', name: '御茶ノ水', yahooStationId: '22582', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-04', name: '四ツ谷', yahooStationId: '23041', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-05', name: '新宿', yahooStationId: '22741', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-06', name: '中野', yahooStationId: '22849', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-07', name: '高円寺', yahooStationId: '22671', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-08', name: '阿佐ケ谷', yahooStationId: '22494', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-09', name: '荻窪', yahooStationId: '22573', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-10', name: '西荻窪', yahooStationId: '22867', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-11', name: '吉祥寺', yahooStationId: '22637', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-12', name: '三鷹', yahooStationId: '22986', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-13', name: '武蔵境', yahooStationId: '23008', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-14', name: '東小金井', yahooStationId: '22933', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-15', name: '武蔵小金井', yahooStationId: '23006', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-16', name: '国分寺', yahooStationId: '22676', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-17', name: '西国分寺', yahooStationId: '22872', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-18', name: '国立', yahooStationId: '22646', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-19', name: '立川', yahooStationId: '22799', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-20', name: '日野', yahooStationId: '22949', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-21', name: '豊田', yahooStationId: '22840', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-22', name: '八王子', yahooStationId: '22905', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-23', name: '西八王子', yahooStationId: '22881', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-24', name: '高尾', yahooStationId: '22787', inGroupId: '1090', outGroupId: null },
  ],
  // 駅名正規化エイリアス
  stationNameAliases: {
    '神田(東京都)': '神田',
    '中野(東京都)': '中野',
    '日野(東京都)': '日野',
    '高尾(東京都)': '高尾',
  },
  // 種別マッピング（最長一致スキャン対応）
  trainTypeMap: {
    '普通': 'local',
    '各駅停車': 'local',
    '快速': 'rapid',
    '通勤快速': 'commuter',
    '特別快速': 'special_rapid',
    '中央特快': 'chuo_special_rapid',
    '青梅特快': 'ome_special_rapid',
    '通勤特快': 'commuter_special_rapid',
    '特急': 'limitedExp',
    '特急あずさ': 'limitedExp',
    '特急かいじ': 'limitedExp',
    '特急富士回遊': 'limitedExp',
    '特急はちおうじ': 'limitedExp',
    '特急おうめ': 'limitedExp',
  },
  // 車両編成
  defaultCars: 10,
  // 基準駅間秒数（通過駅補間用）
  baseSectionSeconds: {
    1: 120, // 東京 -> 神田
    2: 120, // 神田 -> 御茶ノ水
    3: 300, // 御茶ノ水 -> 四ツ谷
    4: 300, // 四ツ谷 -> 新宿
    5: 240, // 新宿 -> 中野
    6: 120, // 中野 -> 高円寺
    7: 120, // 高円寺 -> 阿佐ケ谷
    8: 120, // 阿佐ケ谷 -> 荻窪
    9: 120, // 荻窪 -> 西荻窪
    10: 120, // 西荻窪 -> 吉祥寺
    11: 180, // 吉祥寺 -> 三鷹
    12: 120, // 三鷹 -> 武蔵境
    13: 120, // 武蔵境 -> 東小金井
    14: 120, // 東小金井 -> 武蔵小金井
    15: 180, // 武蔵小金井 -> 国分寺
    16: 120, // 国分寺 -> 西国分寺
    17: 120, // 西国分寺 -> 国立
    18: 180, // 国立 -> 立川
    19: 180, // 立川 -> 日野
    20: 180, // 日野 -> 豊田
    21: 240, // 豊田 -> 八王子
    22: 180, // 八王子 -> 西八王子
    23: 240, // 西八王子 -> 高尾
  },
};
