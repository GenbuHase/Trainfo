// JR八高線 Yahoo! 路線情報スクレイパー設定 (八王子 〜 高崎 全24駅)
module.exports = {
  lineId: 'hachiko',
  name: 'JR八高線',
  stationsFilePath: 'src/data/lines/hachiko/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/hachiko/stationTimetables.json',
    globalTimetable: 'src/data/lines/hachiko/globalTimetable.json',
  },
  // Yahoo! 駅・路線グループ定義
  // 八王子〜高麗川（電化区間）: 上り 1020, 下り 1021
  // 高麗川〜高崎（非電化区間）: 上り 1030, 下り 1031
  stations: [
    { id: 'HA-01', name: '八王子', yahooStationId: '22905', inGroupId: null, outGroupId: '1021' },
    { id: 'HA-02', name: '北八王子', yahooStationId: '22634', inGroupId: '1020', outGroupId: '1021' },
    { id: 'HA-03', name: '小宮', yahooStationId: '22686', inGroupId: '1020', outGroupId: '1021' },
    { id: 'HA-04', name: '拝島', yahooStationId: '22895', inGroupId: '1020', outGroupId: '1021' },
    { id: 'HA-05', name: '東福生', yahooStationId: '22939', inGroupId: '1020', outGroupId: '1021' },
    { id: 'HA-06', name: '箱根ケ崎', yahooStationId: '22899', inGroupId: '1020', outGroupId: '1021' },
    { id: 'HA-07', name: '金子', yahooStationId: '22005', inGroupId: '1020', outGroupId: '1021' },
    { id: 'HA-08', name: '東飯能', yahooStationId: '22114', inGroupId: '1020', outGroupId: '1021' },
    { id: 'HA-09', name: '高麗川', yahooStationId: '22038', inGroupId: '1020', outGroupId: '1031' },
    { id: 'HA-10', name: '毛呂', yahooStationId: '22158', inGroupId: '1030', outGroupId: '1031' },
    { id: 'HA-11', name: '越生', yahooStationId: '21993', inGroupId: '1030', outGroupId: '1031' },
    { id: 'HA-12', name: '明覚', yahooStationId: '22137', inGroupId: '1030', outGroupId: '1031' },
    { id: 'HA-13', name: '小川町', yahooStationId: '21991', inGroupId: '1030', outGroupId: '1031' },
    { id: 'HA-14', name: '竹沢', yahooStationId: '22072', inGroupId: '1030', outGroupId: '1031' },
    { id: 'HA-15', name: '折原', yahooStationId: '21998', inGroupId: '1030', outGroupId: '1031' },
    { id: 'HA-16', name: '寄居', yahooStationId: '22169', inGroupId: '1030', outGroupId: '1031' },
    { id: 'HA-17', name: '用土', yahooStationId: '22163', inGroupId: '1030', outGroupId: '1031' },
    { id: 'HA-18', name: '松久', yahooStationId: '22134', inGroupId: '1030', outGroupId: '1031' },
    { id: 'HA-19', name: '児玉', yahooStationId: '22035', inGroupId: '1030', outGroupId: '1031' },
    { id: 'HA-20', name: '丹荘', yahooStationId: '22074', inGroupId: '1030', outGroupId: '1031' },
    { id: 'HA-21', name: '群馬藤岡', yahooStationId: '21880', inGroupId: '1030', outGroupId: '1031' },
    { id: 'HA-22', name: '北藤岡', yahooStationId: '21873', inGroupId: '1030', outGroupId: '1031' },
    { id: 'HA-23', name: '倉賀野', yahooStationId: '21876', inGroupId: '1030', outGroupId: '1031' },
    { id: 'HA-24', name: '高崎', yahooStationId: '21913', inGroupId: '1030', outGroupId: null },
  ],
  stationNameAliases: {
    '小川町(埼玉県)': '小川町',
  },
  trainTypeMap: {
    '普通': 'regular',
    '各駅停車': 'local',
  },
  defaultCars: 4,
  baseSectionSeconds: {
    1: 180,  // 八王子 -> 北八王子
    2: 180,  // 北八王子 -> 小宮
    3: 240,  // 小宮 -> 拝島
    4: 180,  // 拝島 -> 東福生
    5: 240,  // 東福生 -> 箱根ケ崎
    6: 240,  // 箱根ケ崎 -> 金子
    7: 300,  // 金子 -> 東飯能
    8: 300,  // 東飯能 -> 高麗川
    9: 300,  // 高麗川 -> 毛呂
    10: 240, // 毛呂 -> 越生
    11: 300, // 越生 -> 明覚
    12: 360, // 明覚 -> 小川町
    13: 240, // 小川町 -> 竹沢
    14: 300, // 竹沢 -> 折原
    15: 240, // 折原 -> 寄居
    16: 240, // 寄居 -> 用土
    17: 240, // 用土 -> 松久
    18: 300, // 松久 -> 児玉
    19: 240, // 児玉 -> 丹荘
    20: 300, // 丹荘 -> 群馬藤岡
    21: 240, // 群馬藤岡 -> 北藤岡
    22: 240, // 北藤岡 -> 倉賀野
    23: 300, // 倉賀野 -> 高崎
  },
};
