// JR篠ノ井線 Yahoo! 路線情報スクレイパー設定 (塩尻 〜 松本 〜 篠ノ井 〜 長野 全19駅)
module.exports = {
  lineId: 'shinonoi',
  name: 'JR篠ノ井線',
  stationsFilePath: 'src/data/lines/shinonoi/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/shinonoi/stationTimetables.json',
    globalTimetable: 'src/data/lines/shinonoi/globalTimetable.json',
  },
  // Yahoo! 駅・路線グループ定義 (篠ノ井線区間: 上り 1321, 下り 1320 / 信越本線区間: 上り 760, 下り 761)
  stations: [
    { id: 'SN-01', name: '塩尻', yahooStationId: '24203', inGroupId: null, outGroupId: '1320' },
    { id: 'SN-02', name: '広丘', yahooStationId: '24314', inGroupId: '1321', outGroupId: '1320' },
    { id: 'SN-03', name: '村井', yahooStationId: '24341', inGroupId: '1321', outGroupId: '1320' },
    { id: 'SN-04', name: '平田', yahooStationId: '29590', inGroupId: '1321', outGroupId: '1320' },
    { id: 'SN-05', name: '南松本', yahooStationId: '24335', inGroupId: '1321', outGroupId: '1320' },
    { id: 'SN-06', name: '松本', yahooStationId: '24325', inGroupId: '1321', outGroupId: '1320' },
    { id: 'SN-07', name: '田沢', yahooStationId: '24251', inGroupId: '1321', outGroupId: '1320' },
    { id: 'SN-08', name: '明科', yahooStationId: '24099', inGroupId: '1321', outGroupId: '1320' },
    { id: 'SN-09', name: '西条', yahooStationId: '24292', inGroupId: '1321', outGroupId: '1320' },
    { id: 'SN-10', name: '坂北', yahooStationId: '24194', inGroupId: '1321', outGroupId: '1320' },
    { id: 'SN-11', name: '聖高原', yahooStationId: '24307', inGroupId: '1321', outGroupId: '1320' },
    { id: 'SN-12', name: '冠着', yahooStationId: '24161', inGroupId: '1321', outGroupId: '1320' },
    { id: 'SN-13', name: '姨捨', yahooStationId: '24146', inGroupId: '1321', outGroupId: '1320' },
    { id: 'SN-14', name: '稲荷山', yahooStationId: '24125', inGroupId: '1321', outGroupId: '1320' },
    { id: 'SN-15', name: '篠ノ井', yahooStationId: '24225', inGroupId: '1321', outGroupId: '761' },
    { id: 'SN-16', name: '今井', yahooStationId: '29211', inGroupId: '760', outGroupId: '761' },
    { id: 'SN-17', name: '川中島', yahooStationId: '24166', inGroupId: '760', outGroupId: '761' },
    { id: 'SN-18', name: '安茂里', yahooStationId: '24106', inGroupId: '760', outGroupId: '761' },
    { id: 'SN-19', name: '長野', yahooStationId: '24282', inGroupId: '760', outGroupId: null },
  ],
  // 駅名正規化エイリアス
  stationNameAliases: {
    '平田(長野県)': '平田',
    '西条(長野県)': '西条',
    '小野(長野県)': '小野',
    '高尾(東京都)': '高尾',
    '中野(東京都)': '中野',
    '神田(東京都)': '神田',
  },
  // 種別マッピング（最長一致スキャン対応）
  trainTypeMap: {
    '普通': 'regular',
    '各駅停車': 'local',
    '快速': 'rapid',
    '特急': 'limitedExp',
  },
  defaultCars: 6,
  // 駅間基準秒数 (通過駅補間用)
  baseSectionSeconds: {
    1: 240,  // 塩尻 -> 広丘
    2: 180,  // 広丘 -> 村井
    3: 120,  // 村井 -> 平田
    4: 180,  // 平田 -> 南松本
    5: 240,  // 南松本 -> 松本
    6: 480,  // 松本 -> 田沢
    7: 420,  // 田沢 -> 明科
    8: 480,  // 明科 -> 西条
    9: 240,  // 西条 -> 坂北
    10: 240, // 坂北 -> 聖高原
    11: 240, // 聖高原 -> 冠着
    12: 420, // 冠着 -> 姨捨
    13: 600, // 姨捨 -> 稲荷山
    14: 240, // 稲荷山 -> 篠ノ井
    15: 180, // 篠ノ井 -> 今井
    16: 180, // 今井 -> 川中島
    17: 180, // 川中島 -> 安茂里
    18: 240, // 安茂里 -> 長野
  },
};
