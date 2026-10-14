// 東京メトロ千代田線 Yahoo! 路線情報スクレイパー設定 (代々木上原 〜 綾瀬・北綾瀬 全20駅)
module.exports = {
  lineId: 'chiyoda',
  name: '東京メトロ千代田線',
  stationsFilePath: 'src/data/lines/chiyoda/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/chiyoda/stationTimetables.json',
    globalTimetable: 'src/data/lines/chiyoda/globalTimetable.json',
  },
  stations: [
    { id: 'C-01', name: '代々木上原', yahooStationId: '23044', inGroupId: null, outGroupId: '3320' },
    { id: 'C-02', name: '代々木公園', yahooStationId: '23045', inGroupId: '3321', outGroupId: '3320' },
    { id: 'C-03', name: '明治神宮前〈原宿〉', yahooStationId: '23016', inGroupId: '3321', outGroupId: '3320' },
    { id: 'C-04', name: '表参道', yahooStationId: '22588', inGroupId: '3321', outGroupId: '3320' },
    { id: 'C-05', name: '乃木坂', yahooStationId: '22893', inGroupId: '3321', outGroupId: '3320' },
    { id: 'C-06', name: '赤坂', yahooStationId: '22485', inGroupId: '3321', outGroupId: '3320' },
    { id: 'C-07', name: '国会議事堂前', yahooStationId: '22668', inGroupId: '3321', outGroupId: '3320' },
    { id: 'C-08', name: '霞ケ関', yahooStationId: '22596', inGroupId: '3321', outGroupId: '3320' },
    { id: 'C-09', name: '日比谷', yahooStationId: '22951', inGroupId: '3321', outGroupId: '3320' },
    { id: 'C-10', name: '二重橋前〈丸の内〉', yahooStationId: '22883', inGroupId: '3321', outGroupId: '3320' },
    { id: 'C-11', name: '大手町', yahooStationId: '22564', inGroupId: '3321', outGroupId: '3320' },
    { id: 'C-12', name: '新御茶ノ水', yahooStationId: '22732', inGroupId: '3321', outGroupId: '3320' },
    { id: 'C-13', name: '湯島', yahooStationId: '23038', inGroupId: '3321', outGroupId: '3320' },
    { id: 'C-14', name: '根津', yahooStationId: '22888', inGroupId: '3321', outGroupId: '3320' },
    { id: 'C-15', name: '千駄木', yahooStationId: '22782', inGroupId: '3321', outGroupId: '3320' },
    { id: 'C-16', name: '西日暮里', yahooStationId: '22880', inGroupId: '3321', outGroupId: '3320' },
    { id: 'C-17', name: '町屋', yahooStationId: '22978', inGroupId: '3321', outGroupId: '3320' },
    { id: 'C-18', name: '北千住', yahooStationId: '22630', inGroupId: '3321', outGroupId: '3320' },
    { id: 'C-19', name: '綾瀬', yahooStationId: '22499', inGroupId: '3321', outGroupId: null },
    { id: 'C-20', name: '北綾瀬', yahooStationId: '22627', inGroupId: '3330', outGroupId: null },
  ],
  stationNameAliases: {
    '明治神宮前': '明治神宮前〈原宿〉',
    '二重橋前': '二重橋前〈丸の内〉',
    '赤坂(東京都)': '赤坂',
    '霞ケ関(東京都)': '霞ケ関',
    '大手町(東京都)': '大手町',
    '町屋(東京メトロ)': '町屋',
    '金町(東京都)': '金町',
  },
  trainTypeMap: {
    '各駅停車': 'local',
    '普通': 'local',
    '各停': 'local',
    '準急': 'semiExp',
    '通勤準急': 'commuter_semi',
    '急行': 'express',
    '通勤急行': 'commuter_exp',
    '特急': 'limitedExp',
    'メトロはこね': 'limitedExp',
    'メトロえのしま': 'limitedExp',
    'メトロモーニングウェイ': 'limitedExp',
    'メトロホームウェイ': 'limitedExp',
  },
  defaultCars: 10,
  baseSectionSeconds: {
    1: 120, // 代々木上原 -> 代々木公園
    2: 120, // 代々木公園 -> 明治神宮前〈原宿〉
    3: 120, // 明治神宮前〈原宿〉 -> 表参道
    4: 120, // 表参道 -> 乃木坂
    5: 120, // 乃木坂 -> 赤坂
    6: 120, // 赤坂 -> 国会議事堂前
    7: 60,  // 国会議事堂前 -> 霞ケ関
    8: 120, // 霞ケ関 -> 日比谷
    9: 60,  // 日比谷 -> 二重橋前〈丸の内〉
    10: 60, // 二重橋前〈丸の内〉 -> 大手町
    11: 120,// 大手町 -> 新御茶ノ水
    12: 120,// 新御茶ノ水 -> 湯島
    13: 60, // 湯島 -> 根津
    14: 60, // 根津 -> 千駄木
    15: 120,// 千駄木 -> 西日暮里
    16: 120,// 西日暮里 -> 町屋
    17: 180,// 町屋 -> 北千住
    18: 180,// 北千住 -> 綾瀬
    19: 180,// 綾瀬 -> 北綾瀬
  },
};
