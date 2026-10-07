// 小田急小田原線 Yahoo! 路線情報スクレイパー設定 (新宿 〜 小田原 全47駅)
module.exports = {
  lineId: 'odakyu_odawara',
  name: '小田急小田原線',
  stationsFilePath: 'src/data/lines/odakyu_odawara/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/odakyu_odawara/stationTimetables.json',
    globalTimetable: 'src/data/lines/odakyu_odawara/globalTimetable.json',
  },
  stations: [
    { id: 'OH-01', name: '新宿', yahooStationId: '22741', inGroupId: null, outGroupId: '3091' },
    { id: 'OH-02', name: '南新宿', yahooStationId: '22993', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-03', name: '参宮橋', yahooStationId: '22702', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-04', name: '代々木八幡', yahooStationId: '23046', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-05', name: '代々木上原', yahooStationId: '23044', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-06', name: '東北沢', yahooStationId: '22929', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-07', name: '下北沢', yahooStationId: '22723', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-08', name: '世田谷代田', yahooStationId: '22773', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-09', name: '梅ヶ丘', yahooStationId: '22536', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-10', name: '豪徳寺', yahooStationId: '22689', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-11', name: '経堂', yahooStationId: '22622', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-12', name: '千歳船橋', yahooStationId: '22818', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-13', name: '祖師ヶ谷大蔵', yahooStationId: '22783', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-14', name: '成城学園前', yahooStationId: '22764', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-15', name: '喜多見', yahooStationId: '22636', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-16', name: '狛江', yahooStationId: '22682', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-17', name: '和泉多摩川', yahooStationId: '22516', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-18', name: '登戸', yahooStationId: '23275', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-19', name: '向ヶ丘遊園', yahooStationId: '23344', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-20', name: '生田', yahooStationId: '23065', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-21', name: '読売ランド前', yahooStationId: '23370', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-22', name: '百合ヶ丘', yahooStationId: '23364', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-23', name: '新百合ヶ丘', yahooStationId: '23211', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-24', name: '柿生', yahooStationId: '23101', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-25', name: '鶴川', yahooStationId: '22824', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-26', name: '玉川学園前', yahooStationId: '22804', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-27', name: '町田', yahooStationId: '22976', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-28', name: '相模大野', yahooStationId: '23172', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-29', name: '小田急相模原', yahooStationId: '23097', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-30', name: '相武台前', yahooStationId: '23223', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-31', name: '座間', yahooStationId: '23186', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-32', name: '海老名', yahooStationId: '23088', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-33', name: '厚木', yahooStationId: '23060', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-34', name: '本厚木', yahooStationId: '23318', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-35', name: '愛甲石田', yahooStationId: '23055', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-36', name: '伊勢原', yahooStationId: '23072', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-37', name: '鶴巻温泉', yahooStationId: '23243', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-38', name: '東海大学前', yahooStationId: '23248', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-39', name: '秦野', yahooStationId: '23283', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-40', name: '渋沢', yahooStationId: '23199', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-41', name: '新松田', yahooStationId: '23209', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-42', name: '開成', yahooStationId: '23099', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-43', name: '栢山', yahooStationId: '23125', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-44', name: '富水', yahooStationId: '23253', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-45', name: '螢田', yahooStationId: '23315', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-46', name: '足柄', yahooStationId: '23059', inGroupId: '3090', outGroupId: '3091' },
    { id: 'OH-47', name: '小田原', yahooStationId: '23098', inGroupId: '3090', outGroupId: null },
  ],
  stationNameAliases: {
    '生田(神奈川県)': '生田',
    '海老名(相鉄・小田急)': '海老名',
    '足柄(神奈川県)': '足柄',
    '梅ケ丘': '梅ヶ丘',
    '祖師ケ谷大蔵': '祖師ヶ谷大蔵',
    '向ケ丘遊園': '向ヶ丘遊園',
    '百合ケ丘': '百合ヶ丘',
    '新百合ケ丘': '新百合ヶ丘',
  },
  trainTypeMap: {
    '各駅停車': 'local',
    '普通': 'local',
    '準急': 'semiExp',
    '通勤準急': 'commuter_semi',
    '急行': 'express',
    '通勤急行': 'commuter_exp',
    '快速急行': 'rapidExp',
    '特急': 'limitedExp',
    'はこね': 'limitedExp',
    'スーパーはこね': 'limitedExp',
    'さがみ': 'limitedExp',
    'えのしま': 'limitedExp',
    'メトロはこね': 'limitedExp',
    'メトロえのしま': 'limitedExp',
    'メトロモーニングウェイ': 'limitedExp',
    'メトロホームウェイ': 'limitedExp',
    'ホームウェイ': 'limitedExp',
    'モーニングウェイ': 'limitedExp',
    'ふじさん': 'limitedExp',
  },
  defaultCars: 10,
  baseSectionSeconds: {
    1: 120, // 新宿 -> 南新宿
    2: 120, // 南新宿 -> 参宮橋
    3: 120, // 参宮橋 -> 代々木八幡
    4: 120, // 代々木八幡 -> 代々木上原
    5: 120, // 代々木上原 -> 東北沢
    6: 120, // 東北沢 -> 下北沢
    7: 120, // 下北沢 -> 世田谷代田
    8: 120, // 世田谷代田 -> 梅ヶ丘
    9: 120, // 梅ヶ丘 -> 豪徳寺
    10: 120, // 豪徳寺 -> 経堂
    11: 120, // 経堂 -> 千歳船橋
    12: 120, // 千歳船橋 -> 祖師ヶ谷大蔵
    13: 120, // 祖師ヶ谷大蔵 -> 成城学園前
    14: 120, // 成城学園前 -> 喜多見
    15: 120, // 喜多見 -> 狛江
    16: 120, // 狛江 -> 和泉多摩川
    17: 120, // 和泉多摩川 -> 登戸
    18: 120, // 登戸 -> 向ヶ丘遊園
    19: 180, // 向ヶ丘遊園 -> 生田
    20: 120, // 生田 -> 読売ランド前
    21: 120, // 読売ランド前 -> 百合ヶ丘
    22: 120, // 百合ヶ丘 -> 新百合ヶ丘
    23: 180, // 新百合ヶ丘 -> 柿生
    24: 120, // 柿生 -> 鶴川
    25: 180, // 鶴川 -> 玉川学園前
    26: 180, // 玉川学園前 -> 町田
    27: 120, // 町田 -> 相模大野
    28: 180, // 相模大野 -> 小田急相模原
    29: 180, // 小田急相模原 -> 相武台前
    30: 180, // 相武台前 -> 座間
    31: 180, // 座間 -> 海老名
    32: 120, // 海老名 -> 厚木
    33: 120, // 厚木 -> 本厚木
    34: 180, // 本厚木 -> 愛甲石田
    35: 180, // 愛甲石田 -> 伊勢原
    36: 240, // 伊勢原 -> 鶴巻温泉
    37: 120, // 鶴巻温泉 -> 東海大学前
    38: 240, // 東海大学前 -> 秦野
    39: 240, // 秦野 -> 渋沢
    40: 300, // 渋沢 -> 新松田
    41: 180, // 新松田 -> 開成
    42: 120, // 開成 -> 栢山
    43: 120, // 栢山 -> 富水
    44: 120, // 富水 -> 螢田
    45: 120, // 螢田 -> 足柄
    46: 120, // 足柄 -> 小田原
  },
};
