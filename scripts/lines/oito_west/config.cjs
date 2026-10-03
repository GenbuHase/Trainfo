// JR西日本 大糸線 Yahoo! 路線情報スクレイパー設定 (南小谷 〜 糸魚川 全9駅)
module.exports = {
  lineId: 'oito_west',
  name: 'JR大糸線（南小谷～糸魚川）',
  stationsFilePath: 'src/data/lines/oito_west/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/oito_west/stationTimetables.json',
    globalTimetable: 'src/data/lines/oito_west/globalTimetable.json',
  },
  // Yahoo! 駅・路線グループ定義 (上り: 1480, 下り: 1481)
  stations: [
    { id: 'OW-01', name: '南小谷', yahooStationId: '24332', inGroupId: null, outGroupId: '1481' },
    { id: 'OW-02', name: '中土', yahooStationId: '24278', inGroupId: '1480', outGroupId: '1481' },
    { id: 'OW-03', name: '北小谷', yahooStationId: '24172', inGroupId: '1480', outGroupId: '1481' },
    { id: 'OW-04', name: '平岩', yahooStationId: '24058', inGroupId: '1480', outGroupId: '1481' },
    { id: 'OW-05', name: '小滝', yahooStationId: '23985', inGroupId: '1480', outGroupId: '1481' },
    { id: 'OW-06', name: '根知', yahooStationId: '24043', inGroupId: '1480', outGroupId: '1481' },
    { id: 'OW-07', name: '頸城大野', yahooStationId: '23978', inGroupId: '1480', outGroupId: '1481' },
    { id: 'OW-08', name: '姫川', yahooStationId: '24057', inGroupId: '1480', outGroupId: '1481' },
    { id: 'OW-09', name: '糸魚川', yahooStationId: '23901', inGroupId: '1480', outGroupId: null },
  ],
  // 駅名正規化エイリアス
  stationNameAliases: {
    '姫川(新潟県)': '姫川',
  },
  // 種別マッピング（最長一致スキャン対応）
  trainTypeMap: {
    '普通': 'regular',
    '各駅停車': 'local',
  },
  defaultCars: 1, // キハ120形単行（1両）または2両
  // 駅間基準秒数 (通過駅補間用)
  baseSectionSeconds: {
    1: 360, // 南小谷 -> 中土
    2: 360, // 中土 -> 北小谷
    3: 420, // 北小谷 -> 平岩
    4: 480, // 平岩 -> 小滝
    5: 360, // 小滝 -> 根知
    6: 420, // 根知 -> 頸城大野
    7: 240, // 頸城大野 -> 姫川
    8: 300, // 姫川 -> 糸魚川
  },
};
