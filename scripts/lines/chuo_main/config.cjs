// JR中央本線 Yahoo! 路線情報スクレイパー設定 (高尾 〜 大月 〜 甲府 〜 塩尻 全38駅)
module.exports = {
  lineId: 'chuo_main',
  name: 'JR中央本線',
  stationsFilePath: 'src/data/lines/chuo_main/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/chuo_main/stationTimetables.json',
    globalTimetable: 'src/data/lines/chuo_main/globalTimetable.json',
  },
  // Yahoo! 駅・路線グループ定義 (高尾〜塩尻: 上り 1070, 下り 1071)
  stations: [
    // 1. 高尾 〜 大月 (JC-24 〜 JC-32)
    { id: 'JC-24', name: '高尾', yahooStationId: '22787', inGroupId: null, outGroupId: '1071' },
    { id: 'JC-25', name: '相模湖', yahooStationId: '23174', inGroupId: '1070', outGroupId: '1071' },
    { id: 'JC-26', name: '藤野', yahooStationId: '23306', inGroupId: '1070', outGroupId: '1071' },
    { id: 'JC-27', name: '上野原', yahooStationId: '23384', inGroupId: '1070', outGroupId: '1071' },
    { id: 'JC-28', name: '四方津', yahooStationId: '23416', inGroupId: '1070', outGroupId: '1071' },
    { id: 'JC-29', name: '梁川', yahooStationId: '23441', inGroupId: '1070', outGroupId: '1071' },
    { id: 'JC-30', name: '鳥沢', yahooStationId: '23427', inGroupId: '1070', outGroupId: '1071' },
    { id: 'JC-31', name: '猿橋', yahooStationId: '23414', inGroupId: '1070', outGroupId: '1071' },
    { id: 'JC-32', name: '大月', yahooStationId: '23387', inGroupId: '1070', outGroupId: '1071' },

    // 2. 大月 〜 甲府 (CO-33 〜 CO-43)
    { id: 'CO-33', name: '初狩', yahooStationId: '23431', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-34', name: '笹子', yahooStationId: '23413', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-35', name: '甲斐大和', yahooStationId: '23396', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-36', name: '勝沼ぶどう郷', yahooStationId: '23400', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-37', name: '塩山', yahooStationId: '23386', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-38', name: '東山梨', yahooStationId: '23434', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-39', name: '山梨市', yahooStationId: '23442', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-40', name: '春日居町', yahooStationId: '23398', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-41', name: '石和温泉', yahooStationId: '23379', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-42', name: '酒折', yahooStationId: '23412', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-43', name: '甲府', yahooStationId: '23408', inGroupId: '1070', outGroupId: '1071' },

    // 3. 甲府 〜 塩尻 (CO-44 〜 CO-61)
    { id: 'CO-44', name: '竜王', yahooStationId: '23446', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-45', name: '塩崎', yahooStationId: '23415', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-46', name: '韮崎', yahooStationId: '23429', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-47', name: '新府', yahooStationId: '23420', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-48', name: '穴山', yahooStationId: '23378', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-49', name: '日野春', yahooStationId: '23435', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-50', name: '長坂', yahooStationId: '23428', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-51', name: '小淵沢', yahooStationId: '23411', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-52', name: '信濃境', yahooStationId: '24216', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-53', name: '富士見', yahooStationId: '24315', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-54', name: 'すずらんの里', yahooStationId: '24242', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-55', name: '青柳', yahooStationId: '24095', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-56', name: '茅野', yahooStationId: '24262', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-57', name: '上諏訪', yahooStationId: '24160', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-58', name: '下諏訪', yahooStationId: '24231', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-59', name: '岡谷', yahooStationId: '24143', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-60', name: 'みどり湖', yahooStationId: '24330', inGroupId: '1070', outGroupId: '1071' },
    { id: 'CO-61', name: '塩尻', yahooStationId: '24203', inGroupId: '1070', outGroupId: null },
  ],
  // 駅名正規化エイリアス
  stationNameAliases: {
    '高尾(東京都)': '高尾',
    '梁川(山梨県)': '梁川',
    '塩尻(長野県)': '塩尻',
  },
  // 種別マッピング（最長一致スキャン対応）
  trainTypeMap: {
    '普通': 'regular',
    '各駅停車': 'local',
    '快速': 'rapid',
    '通勤快速': 'commuter',
    '特別快速': 'special_rapid',
    '中央特快': 'chuo_special_rapid',
    '青梅特快': 'ome_special_rapid',
    '通勤特快': 'commuter_special_rapid',
    '特急': 'limitedExp',
  },
  defaultCars: 6,
  // 駅間基準秒数 (通過駅補間用)
  baseSectionSeconds: {
    1: 540, // 高尾 -> 相模湖
    2: 240, // 相模湖 -> 藤野
    3: 240, // 藤野 -> 上野原
    4: 240, // 上野原 -> 四方津
    5: 240, // 四方津 -> 梁川
    6: 240, // 梁川 -> 鳥沢
    7: 240, // 鳥沢 -> 猿橋
    8: 240, // 猿橋 -> 大月
    9: 360, // 大月 -> 初狩
    10: 360, // 初狩 -> 笹子
    11: 480, // 笹子 -> 甲斐大和 (笹子トンネル越え)
    12: 420, // 甲斐大和 -> 勝沼ぶどう郷
    13: 300, // 勝沼ぶどう郷 -> 塩山
    14: 180, // 塩山 -> 東山梨
    15: 180, // 東山梨 -> 山梨市
    16: 240, // 山梨市 -> 春日居町
    17: 180, // 春日居町 -> 石和温泉
    18: 240, // 石和温泉 -> 酒折
    19: 240, // 酒折 -> 甲府
    20: 300, // 甲府 -> 竜王
    21: 240, // 竜王 -> 塩崎
    22: 300, // 塩崎 -> 韮崎
    23: 300, // 韮崎 -> 新府
    24: 240, // 新府 -> 穴山
    25: 360, // 穴山 -> 日野春
    26: 360, // 日野春 -> 長坂
    27: 360, // 長坂 -> 小淵沢
    28: 300, // 小淵沢 -> 信濃境
    29: 300, // 信濃境 -> 富士見
    30: 240, // 富士見 -> すずらんの里
    31: 180, // すずらんの里 -> 青柳
    32: 360, // 青柳 -> 茅野
    33: 360, // 茅野 -> 上諏訪
    34: 240, // 上諏訪 -> 下諏訪
    35: 300, // 下諏訪 -> 岡谷
    36: 360, // 岡谷 -> みどり湖 (塩嶺トンネル越え)
    37: 300, // みどり湖 -> 塩尻
  },
};
