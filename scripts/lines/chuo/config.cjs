// JR中央線・中央本線 Yahoo! 路線情報スクレイパー設定 (東京 〜 高尾 〜 大月 〜 甲府 全43駅)
module.exports = {
  lineId: 'chuo',
  name: 'JR中央線・中央本線',
  stationsFilePath: 'src/data/lines/chuo/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/chuo/stationTimetables.json',
    globalTimetable: 'src/data/lines/chuo/globalTimetable.json',
  },
  // Yahoo! 駅・路線グループ定義
  // 東京〜西八王子: 上り 1090, 下り 1091
  // 高尾: 上り 1090, 下り 1071 (中央本線下り)
  // 相模湖〜酒折: 上り 1070 (中央本線上り), 下り 1071
  // 甲府: 上り 1070, 下り null
  stations: [
    // 1. 東京 〜 高尾 (JC-01 〜 JC-24)
    { id: 'JC-01', name: '東京', yahooStationId: '22828', inGroupId: null, outGroupId: '1091' },
    { id: 'JC-02', name: '神田', yahooStationId: '22617', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-03', name: '御茶ノ水', yahooStationId: '22582', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-04', name: '四ツ谷', yahooStationId: '23041', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-05', name: '新宿', yahooStationId: '22741', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-06', name: '中野', yahooStationId: '22849', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-07', name: '高円寺', yahooStationId: '22671', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-08', name: '阿佐ケ谷', yahooStationId: '22494', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-09', name: '荻窪', yahooStationId: '22573', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-10', name: '西荻窪', yahooStationId: '22867', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-11', name: '吉祥寺', yahooStationId: '22637', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-12', name: '三鷹', yahooStationId: '22986', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-13', name: '武蔵境', yahooStationId: '23008', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-14', name: '東小金井', yahooStationId: '22933', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-15', name: '武蔵小金井', yahooStationId: '23006', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-16', name: '国分寺', yahooStationId: '22676', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-17', name: '西国分寺', yahooStationId: '22872', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-18', name: '国立', yahooStationId: '22646', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-19', name: '立川', yahooStationId: '22799', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-20', name: '日野', yahooStationId: '22949', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-21', name: '豊田', yahooStationId: '22840', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-22', name: '八王子', yahooStationId: '22905', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-23', name: '西八王子', yahooStationId: '22881', inGroupId: '1090', outGroupId: '1091' },
    { id: 'JC-24', name: '高尾', yahooStationId: '22787', inGroupId: '1090', outGroupId: '1071' },

    // 2. 高尾 〜 大月 (JC-25 〜 JC-32)
    { id: 'JC-25', name: '相模湖', yahooStationId: '23174', inGroupId: '1070', outGroupId: '1071' },
    { id: 'JC-26', name: '藤野', yahooStationId: '23306', inGroupId: '1070', outGroupId: '1071' },
    { id: 'JC-27', name: '上野原', yahooStationId: '23384', inGroupId: '1070', outGroupId: '1071' },
    { id: 'JC-28', name: '四方津', yahooStationId: '23416', inGroupId: '1070', outGroupId: '1071' },
    { id: 'JC-29', name: '梁川', yahooStationId: '23441', inGroupId: '1070', outGroupId: '1071' },
    { id: 'JC-30', name: '鳥沢', yahooStationId: '23427', inGroupId: '1070', outGroupId: '1071' },
    { id: 'JC-31', name: '猿橋', yahooStationId: '23414', inGroupId: '1070', outGroupId: '1071' },
    { id: 'JC-32', name: '大月', yahooStationId: '23387', inGroupId: '1070', outGroupId: '1071' },

    // 3. 大月 〜 甲府 (CO-33 〜 CO-43)
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

    // 4. 甲府 〜 塩尻 (CO-44 〜 CO-61)
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
    '神田(東京都)': '神田',
    '中野(東京都)': '中野',
    '日野(東京都)': '日野',
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
    '通勤特別快速': 'commuter_special_rapid',
    '特急': 'limitedExp',
    '特急あずさ': 'limitedExp',
    '特急かいじ': 'limitedExp',
    '特急富士回遊': 'limitedExp',
    '特急はちおうじ': 'limitedExp',
    '特急おうめ': 'limitedExp',
  },
  // 車両編成
  defaultCars: 10,
  // 全駅停車時に維持すべき種別（平日の中野〜高尾で各駅停車区間となる快速等を維持）
  preserveAllStopsTypes: ['rapid', 'commuter', 'special_rapid', 'chuo_special_rapid', 'ome_special_rapid', 'commuter_special_rapid'],
  // 基準駅間秒数（通過駅補間用）
  baseSectionSeconds: {
    1: 120, // 東京 -> 神田
    2: 120, // 神田 -> 御茶ノ水
    3: 300, // 御茶ノ水 -> 四ツ谷
    4: 300, // 四ツ谷 -> 新宿
    5: 240, // 新宿 -> 中野
    6: 120, // 中野 -> 高円寺
    7: 120, // 高円寺 -> 阿佐ケ谷
    8: 120, // 阿佐ケ谷 -> 荻窪
    9: 120, // 荻窪 -> 西荻窪
    10: 120, // 西荻窪 -> 吉祥寺
    11: 180, // 吉祥寺 -> 三鷹
    12: 120, // 三鷹 -> 武蔵境
    13: 120, // 武蔵境 -> 東小金井
    14: 120, // 東小金井 -> 武蔵小金井
    15: 180, // 武蔵小金井 -> 国分寺
    16: 120, // 国分寺 -> 西国分寺
    17: 120, // 西国分寺 -> 国立
    18: 180, // 国立 -> 立川
    19: 180, // 立川 -> 日野
    20: 180, // 日野 -> 豊田
    21: 240, // 豊田 -> 八王子
    22: 180, // 八王子 -> 西八王子
    23: 240, // 西八王子 -> 高尾
    24: 540, // 高尾 -> 相模湖
    25: 240, // 相模湖 -> 藤野
    26: 240, // 藤野 -> 上野原
    27: 240, // 上野原 -> 四方津
    28: 240, // 四方津 -> 梁川
    29: 240, // 梁川 -> 鳥沢
    30: 240, // 鳥沢 -> 猿橋
    31: 240, // 猿橋 -> 大月
    32: 360, // 大月 -> 初狩
    33: 360, // 初狩 -> 笹子
    34: 480, // 笹子 -> 甲斐大和 (笹子トンネル越え)
    35: 420, // 甲斐大和 -> 勝沼ぶどう郷
    36: 300, // 勝沼ぶどう郷 -> 塩山
    37: 180, // 塩山 -> 東山梨
    38: 180, // 東山梨 -> 山梨市
    39: 240, // 山梨市 -> 春日居町
    40: 180, // 春日居町 -> 石和温泉
    41: 240, // 石和温泉 -> 酒折
    42: 240, // 酒折 -> 甲府
    43: 300, // 甲府 -> 竜王
    44: 240, // 竜王 -> 塩崎
    45: 300, // 塩崎 -> 韮崎
    46: 300, // 韮崎 -> 新府
    47: 240, // 新府 -> 穴山
    48: 360, // 穴山 -> 日野春
    49: 360, // 日野春 -> 長坂
    50: 360, // 長坂 -> 小淵沢
    51: 300, // 小淵沢 -> 信濃境
    52: 300, // 信濃境 -> 富士見
    53: 240, // 富士見 -> すずらんの里
    54: 180, // すずらんの里 -> 青柳
    55: 360, // 青柳 -> 茅野
    56: 360, // 茅野 -> 上諏訪
    57: 240, // 上諏訪 -> 下諏訪
    58: 300, // 下諏訪 -> 岡谷
    59: 360, // 岡谷 -> みどり湖 (塩嶺トンネル越え)
    60: 300, // みどり湖 -> 塩尻
  },
};
