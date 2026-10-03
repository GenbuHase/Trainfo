// JR東日本 大糸線 Yahoo! 路線情報スクレイパー設定 (松本 〜 南小谷 全33駅)
module.exports = {
  lineId: 'oito_east',
  name: 'JR東日本 大糸線',
  stationsFilePath: 'src/data/lines/oito_east/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/oito_east/stationTimetables.json',
    globalTimetable: 'src/data/lines/oito_east/globalTimetable.json',
  },
  // Yahoo! 駅・路線グループ定義 (上り: 1330, 下り: 1331)
  stations: [
    { id: 'OE-01', name: '松本', yahooStationId: '24325', inGroupId: null, outGroupId: '1331' },
    { id: 'OE-02', name: '北松本', yahooStationId: '24179', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-03', name: '島内', yahooStationId: '24226', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-04', name: '島高松', yahooStationId: '24227', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-05', name: '梓橋', yahooStationId: '24102', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-06', name: '一日市場', yahooStationId: '24309', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-07', name: '中萱', yahooStationId: '24274', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-08', name: '南豊科', yahooStationId: '24334', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-09', name: '豊科', yahooStationId: '24270', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-10', name: '柏矢町', yahooStationId: '24299', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-11', name: '穂高', yahooStationId: '24320', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-12', name: '有明', yahooStationId: '24107', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-13', name: '安曇追分', yahooStationId: '24103', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-14', name: '細野', yahooStationId: '24319', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-15', name: '北細野', yahooStationId: '24178', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-16', name: '信濃松川', yahooStationId: '24221', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-17', name: '安曇沓掛', yahooStationId: '24104', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-18', name: '信濃常盤', yahooStationId: '24220', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-19', name: '南大町', yahooStationId: '24331', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-20', name: '信濃大町', yahooStationId: '24211', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-21', name: '北大町', yahooStationId: '24171', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-22', name: '信濃木崎', yahooStationId: '24215', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-23', name: '稲尾', yahooStationId: '24113', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-24', name: '海ノ口', yahooStationId: '24134', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-25', name: '簗場', yahooStationId: '24352', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-26', name: '南神城', yahooStationId: '24333', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-27', name: '神城', yahooStationId: '24158', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-28', name: '飯森', yahooStationId: '24110', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-29', name: '白馬', yahooStationId: '24297', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-30', name: '信濃森上', yahooStationId: '24222', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-31', name: '白馬大池', yahooStationId: '24298', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-32', name: '千国', yahooStationId: '24261', inGroupId: '1330', outGroupId: '1331' },
    { id: 'OE-33', name: '南小谷', yahooStationId: '24332', inGroupId: '1330', outGroupId: null },
  ],
  // 駅名正規化エイリアス
  stationNameAliases: {
    '有明(長野県)': '有明',
  },
  // 種別マッピング（最長一致スキャン対応）
  trainTypeMap: {
    '快速リゾートビューふるさと': 'rapid',
    '特急あずさ': 'limitedExp',
    '特急アルプス': 'limitedExp',
    '特急はくば': 'limitedExp',
    '特急': 'limitedExp',
    '快速': 'rapid',
    '普通': 'regular',
    '各駅停車': 'local',
  },
  defaultCars: 3,
  // 駅間基準秒数 (通過駅補間用)
  baseSectionSeconds: {
    1: 180,  // 松本 -> 北松本
    2: 180,  // 北松本 -> 島内
    3: 180,  // 島内 -> 島高松
    4: 120,  // 島高松 -> 梓橋
    5: 240,  // 梓橋 -> 一日市場
    6: 120,  // 一日市場 -> 中萱
    7: 180,  // 中萱 -> 南豊科
    8: 180,  // 南豊科 -> 豊科
    9: 180,  // 豊科 -> 柏矢町
    10: 240, // 柏矢町 -> 穂高
    11: 180, // 穂高 -> 有明
    12: 180, // 有明 -> 安曇追分
    13: 180, // 安曇追分 -> 細野
    14: 120, // 細野 -> 北細野
    15: 240, // 北細野 -> 信濃松川
    16: 240, // 信濃松川 -> 安曇沓掛
    17: 240, // 安曇沓掛 -> 信濃常盤
    18: 240, // 信濃常盤 -> 南大町
    19: 180, // 南大町 -> 信濃大町
    20: 180, // 信濃大町 -> 北大町
    21: 240, // 北大町 -> 信濃木崎
    22: 180, // 信濃木崎 -> 稲尾
    23: 180, // 稲尾 -> 海ノ口
    24: 300, // 海ノ口 -> 簗場
    25: 360, // 簗場 -> 南神城
    26: 240, // 南神城 -> 神城
    27: 180, // 神城 -> 飯森
    28: 240, // 飯森 -> 白馬
    29: 240, // 白馬 -> 信濃森上
    30: 360, // 信濃森上 -> 白馬大池
    31: 300, // 白馬大池 -> 千国
    32: 300, // 千国 -> 南小谷
  },
};
