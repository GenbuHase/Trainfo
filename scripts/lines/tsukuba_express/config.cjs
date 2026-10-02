// つくばエクスプレス（TX）Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'tsukuba_express',
  name: '首都圏新都市鉄道つくばエクスプレス',
  stationsFilePath: 'src/data/lines/tsukuba_express/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tsukuba_express/stationTimetables.json',
    globalTimetable: 'src/data/lines/tsukuba_express/globalTimetable.json',
  },
  // Yahoo! 駅・路線グループ定義（上り: 6920, 下り: 6921）
  stations: [
    { id: 'TX-01', name: '秋葉原', yahooStationId: '22492', inGroupId: null, outGroupId: '6921' },
    { id: 'TX-02', name: '新御徒町', yahooStationId: '29336', inGroupId: '6920', outGroupId: '6921' },
    { id: 'TX-03', name: '浅草', yahooStationId: '29397', inGroupId: '6920', outGroupId: '6921' },
    { id: 'TX-04', name: '南千住', yahooStationId: '22995', inGroupId: '6920', outGroupId: '6921' },
    { id: 'TX-05', name: '北千住', yahooStationId: '22630', inGroupId: '6920', outGroupId: '6921' },
    { id: 'TX-06', name: '青井', yahooStationId: '29398', inGroupId: '6920', outGroupId: '6921' },
    { id: 'TX-07', name: '六町', yahooStationId: '29399', inGroupId: '6920', outGroupId: '6921' },
    { id: 'TX-08', name: '八潮', yahooStationId: '29400', inGroupId: '6920', outGroupId: '6921' },
    { id: 'TX-09', name: '三郷中央', yahooStationId: '29401', inGroupId: '6920', outGroupId: '6921' },
    { id: 'TX-10', name: '南流山', yahooStationId: '22455', inGroupId: '6920', outGroupId: '6921' },
    { id: 'TX-11', name: '流山セントラルパーク', yahooStationId: '29402', inGroupId: '6920', outGroupId: '6921' },
    { id: 'TX-12', name: '流山おおたかの森', yahooStationId: '29403', inGroupId: '6920', outGroupId: '6921' },
    { id: 'TX-13', name: '柏の葉キャンパス', yahooStationId: '29404', inGroupId: '6920', outGroupId: '6921' },
    { id: 'TX-14', name: '柏たなか', yahooStationId: '29405', inGroupId: '6920', outGroupId: '6921' },
    { id: 'TX-15', name: '守谷', yahooStationId: '21718', inGroupId: '6920', outGroupId: '6921' },
    { id: 'TX-16', name: 'みらい平', yahooStationId: '29406', inGroupId: '6920', outGroupId: '6921' },
    { id: 'TX-17', name: 'みどりの', yahooStationId: '29407', inGroupId: '6920', outGroupId: '6921' },
    { id: 'TX-18', name: '万博記念公園', yahooStationId: '29408', inGroupId: '6920', outGroupId: '6921' },
    { id: 'TX-19', name: '研究学園', yahooStationId: '29409', inGroupId: '6920', outGroupId: '6921' },
    { id: 'TX-20', name: 'つくば', yahooStationId: '29410', inGroupId: '6920', outGroupId: null },
  ],
  // 駅名正規化エイリアス
  stationNameAliases: {
    '浅草(ＴＸ)': '浅草',
    '万博記念公園(茨城県)': '万博記念公園',
  },
  // 種別マッピング
  trainTypeMap: {
    '普通': 'local',
    '区間快速': 'semi_rapid',
    '快速': 'rapid',
    '通勤快速': 'commuter_rapid',
  },
  // 車両編成
  defaultCars: 6,
  // 基準駅間秒数（通過駅補間用）
  baseSectionSeconds: {
    1: 120, // 秋葉原 -> 新御徒町
    2: 120, // 新御徒町 -> 浅草
    3: 180, // 浅草 -> 南千住
    4: 180, // 南千住 -> 北千住
    5: 180, // 北千住 -> 青井
    6: 120, // 青井 -> 六町
    7: 240, // 六町 -> 八潮
    8: 180, // 八潮 -> 三郷中央
    9: 180, // 三郷中央 -> 南流山
    10: 180, // 南流山 -> 流山セントラルパーク
    11: 120, // 流山セントラルパーク -> 流山おおたかの森
    12: 180, // 流山おおたかの森 -> 柏の葉キャンパス
    13: 180, // 柏の葉キャンパス -> 柏たなか
    14: 240, // 柏たなか -> 守谷
    15: 300, // 守谷 -> みらい平
    16: 180, // みらい平 -> みどりの
    17: 180, // みどりの -> 万博記念公園
    18: 180, // 万博記念公園 -> 研究学園
    19: 180, // 研究学園 -> つくば
  },
};
