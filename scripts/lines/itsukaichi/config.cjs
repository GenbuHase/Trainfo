// JR五日市線 Yahoo! 路線情報スクレイパー設定 (拝島 〜 武蔵五日市 全7駅)
module.exports = {
  lineId: 'itsukaichi',
  name: 'JR五日市線',
  stationsFilePath: 'src/data/lines/itsukaichi/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/itsukaichi/stationTimetables.json',
    globalTimetable: 'src/data/lines/itsukaichi/globalTimetable.json',
  },
  // Yahoo! 駅・路線グループ定義 (上り 1120: 拝島・立川方面, 下り 1121: 武蔵五日市方面)
  // 拝島は五日市線の起点（五日市線下りの始発駅）。五日市線としての発車時刻表は下り(1121)のみ。
  // 武蔵五日市は終点。発車時刻表は上り(1120)のみ。
  stations: [
    { id: 'JC-55', name: '拝島', yahooStationId: '22895', inGroupId: null, outGroupId: '1121' },
    { id: 'JC-81', name: '熊川', yahooStationId: '22648', inGroupId: '1120', outGroupId: '1121' },
    { id: 'JC-82', name: '東秋留', yahooStationId: '22922', inGroupId: '1120', outGroupId: '1121' },
    { id: 'JC-83', name: '秋川', yahooStationId: '22489', inGroupId: '1120', outGroupId: '1121' },
    { id: 'JC-84', name: '武蔵引田', yahooStationId: '23013', inGroupId: '1120', outGroupId: '1121' },
    { id: 'JC-85', name: '武蔵増戸', yahooStationId: '23014', inGroupId: '1120', outGroupId: '1121' },
    { id: 'JC-86', name: '武蔵五日市', yahooStationId: '23005', inGroupId: '1120', outGroupId: null },
  ],
  stationNameAliases: {
    '武蔵五日市(東京都)': '武蔵五日市',
    '拝島(東京都)': '拝島',
  },
  trainTypeMap: {
    '普通': 'local',
    '各駅停車': 'local',
    '快速': 'rapid',
    '通勤快速': 'commuter',
    '特別快速': 'special_rapid',
    '青梅特快': 'ome_special_rapid',
    '通勤特快': 'commuter_special_rapid',
    'ホリデー快速': 'special_rapid',
  },
  defaultCars: 4,
  baseSectionSeconds: {
    1: 150, // 拝島 -> 熊川
    2: 180, // 熊川 -> 東秋留
    3: 180, // 東秋留 -> 秋川
    4: 120, // 秋川 -> 武蔵引田
    5: 150, // 武蔵引田 -> 武蔵増戸
    6: 260, // 武蔵増戸 -> 武蔵五日市
  },
};

