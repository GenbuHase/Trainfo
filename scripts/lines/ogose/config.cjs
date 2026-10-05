// 東武越生線 Yahoo! 路線情報スクレイパー設定 (坂戸 〜 越生 全8駅)
module.exports = {
  lineId: 'ogose',
  name: '東武越生線',
  stationsFilePath: 'src/data/lines/ogose/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/ogose/stationTimetables.json',
    globalTimetable: 'src/data/lines/ogose/globalTimetable.json',
  },
  // Yahoo! 駅・路線グループ定義 (上り 2800: 坂戸方面, 下り 2801: 越生方面)
  // 坂戸は越生線の起点（越生線下りの始発駅）。越生線としての発車時刻表は下り(2801)のみ。
  // 越生は終点。発車時刻表は上り(2800)のみ。
  stations: [
    { id: 'TJ-26', name: '坂戸', yahooStationId: '22041', inGroupId: null, outGroupId: '2801' },
    { id: 'TJ-41', name: '一本松', yahooStationId: '21972', inGroupId: '2800', outGroupId: '2801' },
    { id: 'TJ-42', name: '西大家', yahooStationId: '22093', inGroupId: '2800', outGroupId: '2801' },
    { id: 'TJ-43', name: '川角', yahooStationId: '22010', inGroupId: '2800', outGroupId: '2801' },
    { id: 'TJ-44', name: '武州長瀬', yahooStationId: '22129', inGroupId: '2800', outGroupId: '2801' },
    { id: 'TJ-45', name: '東毛呂', yahooStationId: '22117', inGroupId: '2800', outGroupId: '2801' },
    { id: 'TJ-46', name: '武州唐沢', yahooStationId: '22127', inGroupId: '2800', outGroupId: '2801' },
    { id: 'TJ-47', name: '越生', yahooStationId: '21993', inGroupId: '2800', outGroupId: null },
  ],
  stationNameAliases: {
    '坂戸(埼玉県)': '坂戸',
    '一本松(埼玉県)': '一本松',
  },
  trainTypeMap: {
    '普通': 'local',
    '各駅停車': 'local',
  },
  defaultCars: 4,
  baseSectionSeconds: {
    1: 180, // 坂戸 -> 一本松
    2: 180, // 一本松 -> 西大家
    3: 120, // 西大家 -> 川角
    4: 180, // 川角 -> 武州長瀬
    5: 120, // 武州長瀬 -> 東毛呂
    6: 120, // 東毛呂 -> 武州唐沢
    7: 120, // 武州唐沢 -> 越生
  },
};
