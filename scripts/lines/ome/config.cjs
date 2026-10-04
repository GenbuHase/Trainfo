// JR青梅線 Yahoo! 路線情報スクレイパー設定 (立川 〜 奥多摩 全25駅)
module.exports = {
  lineId: 'ome',
  name: 'JR青梅線',
  stationsFilePath: 'src/data/lines/ome/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/ome/stationTimetables.json',
    globalTimetable: 'src/data/lines/ome/globalTimetable.json',
  },
  // Yahoo! 駅・路線グループ定義 (上り 1110, 下り 1111)
  stations: [
    { id: 'JC-19', name: '立川', yahooStationId: '22799', inGroupId: null, outGroupId: '1111' },
    { id: 'JC-51', name: '西立川', yahooStationId: '22877', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-52', name: '東中神', yahooStationId: '22935', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-53', name: '中神', yahooStationId: '22847', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-54', name: '昭島', yahooStationId: '22490', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-55', name: '拝島', yahooStationId: '22895', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-56', name: '牛浜', yahooStationId: '22533', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-57', name: '福生', yahooStationId: '22955', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-58', name: '羽村', yahooStationId: '22915', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-59', name: '小作', yahooStationId: '22577', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-60', name: '河辺', yahooStationId: '22601', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-61', name: '東青梅', yahooStationId: '22926', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-62', name: '青梅', yahooStationId: '22552', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-63', name: '宮ノ平', yahooStationId: '23002', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-64', name: '日向和田', yahooStationId: '22948', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-65', name: '石神前', yahooStationId: '22515', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-66', name: '二俣尾', yahooStationId: '22959', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-67', name: '軍畑', yahooStationId: '22509', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-68', name: '沢井', yahooStationId: '22701', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-69', name: '御嶽', yahooStationId: '22988', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-70', name: '川井', yahooStationId: '22616', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-71', name: '古里', yahooStationId: '22687', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-72', name: '鳩ノ巣', yahooStationId: '22908', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-73', name: '白丸', yahooStationId: '22727', inGroupId: '1110', outGroupId: '1111' },
    { id: 'JC-74', name: '奥多摩', yahooStationId: '22576', inGroupId: '1110', outGroupId: null },
  ],
  stationNameAliases: {
    '立川(東京都)': '立川',
    '川井(東京都)': '川井',
    '白丸(東京都)': '白丸',
  },
  trainTypeMap: {
    '普通': 'local',
    '各駅停車': 'local',
    '快速': 'rapid',
    '通勤快速': 'commuter',
    '特別快速': 'special_rapid',
    '中央特快': 'chuo_special_rapid',
    '青梅特快': 'ome_special_rapid',
    '通勤特快': 'commuter_special_rapid',
    'ホリデー快速': 'special_rapid',
    '特急': 'limitedExp',
  },
  defaultCars: 10,
  baseSectionSeconds: {
    1: 180,  // 立川 -> 西立川
    2: 120,  // 西立川 -> 東中神
    3: 120,  // 東中神 -> 中神
    4: 120,  // 中神 -> 昭島
    5: 180,  // 昭島 -> 拝島
    6: 180,  // 拝島 -> 牛浜
    7: 120,  // 牛浜 -> 福生
    8: 180,  // 福生 -> 羽村
    9: 180,  // 羽村 -> 小作
    10: 180, // 小作 -> 河辺
    11: 120, // 河辺 -> 東青梅
    12: 120, // 東青梅 -> 青梅
    13: 180, // 青梅 -> 宮ノ平
    14: 120, // 宮ノ平 -> 日向和田
    15: 180, // 日向和田 -> 石神前
    16: 120, // 石神前 -> 二俣尾
    17: 180, // 二俣尾 -> 軍畑
    18: 180, // 軍畑 -> 沢井
    19: 180, // 沢井 -> 御嶽
    20: 240, // 御嶽 -> 川井
    21: 180, // 川井 -> 古里
    22: 240, // 古里 -> 鳩ノ巣
    23: 180, // 鳩ノ巣 -> 白丸
    24: 180, // 白丸 -> 奥多摩
  },
};
