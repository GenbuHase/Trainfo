// 東武東上線 Yahoo! 路線情報スクレイパー設定（共通基盤対応）
module.exports = {
  lineId: 'tojo',
  name: '東武東上線',
  stationsFilePath: 'src/data/lines/tojo/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tojo/stationTimetables.json',
    globalTimetable: 'src/data/lines/tojo/globalTimetable.json',
  },
  // Yahoo! 路線グループ定義: 東武東上線（下り: 2791, 上り: 2790）
  // 駅ごとの yahooStationId は必要に応じて解決・補完
  stations: [
    { id: 'TJ-01', name: '池袋', yahooStationId: '22513', inGroupId: null, outGroupId: '2791' },
    { id: 'TJ-02', name: '北池袋', yahooStationId: '22628', inGroupId: '2790', outGroupId: '2791' },
    { id: 'TJ-03', name: '下板橋', yahooStationId: '22721', inGroupId: '2790', outGroupId: '2791' },
    // 他駅も同様にマッピング可能
  ],
  stationNameAliases: {},
  trainTypeMap: {
    '普通': 'local',
    '準急': 'semiExp',
    '急行': 'express',
    '快速急行': 'rapidExp',
    '川越特急': 'kawagoeExp',
    'ＴＪライナー': 'tjLiner',
  },
  defaultCars: 10,
  baseSectionSeconds: {},
};
