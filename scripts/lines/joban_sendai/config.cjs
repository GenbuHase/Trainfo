// JR常磐線(いわき～仙台) Yahoo! 路線情報スクレイパー設定 (いわき 〜 仙台 全35駅)
module.exports = {
  lineId: 'joban_sendai',
  name: 'JR常磐線(いわき～仙台)',
  stationsFilePath: 'src/data/lines/joban_sendai/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/joban_sendai/stationTimetables.json',
    globalTimetable: 'src/data/lines/joban_sendai/globalTimetable.json',
  },
  stations: [
    { id: 'JSD-01', name: 'いわき', yahooStationId: '21435', inGroupId: null, outGroupId: '651' },
    { id: 'JSD-02', name: '草野', yahooStationId: '21480', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-03', name: '四ツ倉', yahooStationId: '21576', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-04', name: '久ノ浜', yahooStationId: '21545', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-05', name: '末続', yahooStationId: '21497', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-06', name: '広野', yahooStationId: '21548', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-07', name: 'Ｊヴィレッジ', yahooStationId: '29811', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-08', name: '木戸', yahooStationId: '21478', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-09', name: '竜田', yahooStationId: '21510', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-10', name: '富岡', yahooStationId: '21516', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-11', name: '夜ノ森', yahooStationId: '21577', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-12', name: '大野', yahooStationId: '21453', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-13', name: '双葉', yahooStationId: '21554', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-14', name: '浪江', yahooStationId: '21526', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-15', name: '桃内', yahooStationId: '21565', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-16', name: '小高', yahooStationId: '21458', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-17', name: '磐城太田', yahooStationId: '21439', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-18', name: '原ノ町', yahooStationId: '21539', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-19', name: '鹿島', yahooStationId: '21464', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-20', name: '日立木', yahooStationId: '21528', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-21', name: '相馬', yahooStationId: '21503', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-22', name: '駒ケ嶺', yahooStationId: '21484', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-23', name: '新地', yahooStationId: '21495', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-24', name: '坂元', yahooStationId: '21030', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-25', name: '山下', yahooStationId: '21107', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-26', name: '浜吉田', yahooStationId: '21075', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-27', name: '亘理', yahooStationId: '21133', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-28', name: '逢隈', yahooStationId: '20992', inGroupId: '650', outGroupId: '651' },
    { id: 'JSD-29', name: '岩沼', yahooStationId: '20985', inGroupId: '650', outGroupId: '611' },
    { id: 'JSD-30', name: '館腰', yahooStationId: '21050', inGroupId: '650', outGroupId: '611' },
    { id: 'JSD-31', name: '名取', yahooStationId: '21066', inGroupId: '650', outGroupId: '611' },
    { id: 'JSD-32', name: '南仙台', yahooStationId: '21101', inGroupId: '650', outGroupId: '611' },
    { id: 'JSD-33', name: '太子堂', yahooStationId: '29588', inGroupId: '650', outGroupId: '611' },
    { id: 'JSD-34', name: '長町', yahooStationId: '21063', inGroupId: '650', outGroupId: '611' },
    { id: 'JSD-35', name: '仙台', yahooStationId: '21044', inGroupId: '650', outGroupId: null },
  ],
  stationNameAliases: {},
  trainTypeMap: {
    '普通': 'local',
    '各駅停車': 'local',
    '快速': 'rapid',
    '特別快速': 'special_rapid',
    '特急': 'limited_express',
  },
  defaultCars: 5,
  baseSectionSeconds: {
    1: 360, // いわき -> 草野
    2: 360, // 草野 -> 四ツ倉
    3: 420, // 四ツ倉 -> 久ノ浜
    4: 300, // 久ノ浜 -> 末続
    5: 300, // 末続 -> 広野
    6: 240, // 広野 -> Ｊヴィレッジ
    7: 240, // Ｊヴィレッジ -> 木戸
    8: 240, // 木戸 -> 竜田
    9: 420, // 竜田 -> 富岡
    10: 300, // 富岡 -> 夜ノ森
    11: 420, // 夜ノ森 -> 大野
    12: 360, // 大野 -> 双葉
    13: 300, // 双葉 -> 浪江
    14: 360, // 浪江 -> 桃内
    15: 300, // 桃内 -> 小高
    16: 300, // 小高 -> 磐城太田
    17: 300, // 磐城太田 -> 原ノ町
    18: 480, // 原ノ町 -> 鹿島
    19: 420, // 鹿島 -> 日立木
    20: 360, // 日立木 -> 相馬
    21: 300, // 相馬 -> 駒ケ嶺
    22: 300, // 駒ケ嶺 -> 新地
    23: 300, // 新地 -> 坂元
    24: 300, // 坂元 -> 山下
    25: 240, // 山下 -> 浜吉田
    26: 300, // 浜吉田 -> 亘理
    27: 240, // 亘理 -> 逢隈
    28: 300, // 逢隈 -> 岩沼
    29: 240, // 岩沼 -> 館腰
    30: 240, // 館腰 -> 名取
    31: 180, // 名取 -> 南仙台
    32: 180, // 南仙台 -> 太子堂
    33: 120, // 太子堂 -> 長町
    34: 300, // 長町 -> 仙台
  },
};
