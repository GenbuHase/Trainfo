const { shouldExcludeFromYurakucho } = require('../../common/metroFilters.cjs');

// 東京メトロ有楽町線 Yahoo! 路線情報スクレイパー設定 (和光市 〜 新木場 全24駅)
module.exports = {
  lineId: 'yurakucho',
  name: '東京メトロ有楽町線',
  stationsFilePath: 'src/data/lines/yurakucho/stations.ts',
  buildStationTimetablesFromTrips: true,
  shouldExcludeTrip: shouldExcludeFromYurakucho,
  outputPaths: {
    stationTimetables: 'src/data/lines/yurakucho/stationTimetables.json',
    globalTimetable: 'src/data/lines/yurakucho/globalTimetable.json',
  },
  stations: [
    { id: 'Y-01', name: '和光市', yahooStationId: '22171', inGroupId: null, outGroupId: '3341' },
    { id: 'Y-02', name: '地下鉄成増', yahooStationId: '22541', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-03', name: '地下鉄赤塚', yahooStationId: '22540', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-04', name: '平和台', yahooStationId: '22968', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-05', name: '氷川台', yahooStationId: '22921', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-06', name: '小竹向原', yahooStationId: '22679', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-07', name: '千川', yahooStationId: '22774', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-08', name: '要町', yahooStationId: '22599', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-09', name: '池袋', yahooStationId: '22513', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-10', name: '東池袋', yahooStationId: '22924', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-11', name: '護国寺', yahooStationId: '22690', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-12', name: '江戸川橋', yahooStationId: '22545', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-13', name: '飯田橋', yahooStationId: '22507', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-14', name: '市ケ谷', yahooStationId: '22520', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-15', name: '麹町', yahooStationId: '22673', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-16', name: '永田町', yahooStationId: '22856', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-17', name: '桜田門', yahooStationId: '22698', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-18', name: '有楽町', yahooStationId: '23036', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-19', name: '銀座一丁目', yahooStationId: '22642', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-20', name: '新富町', yahooStationId: '22748', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-21', name: '月島', yahooStationId: '22820', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-22', name: '豊洲', yahooStationId: '22839', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-23', name: '辰巳', yahooStationId: '22800', inGroupId: '3340', outGroupId: '3341' },
    { id: 'Y-24', name: '新木場', yahooStationId: '22733', inGroupId: '3340', outGroupId: null },
  ],
  stationNameAliases: {
    '平和台(東京都)': '平和台',
    '新富町(東京都)': '新富町',
    '森林公園(埼玉県)': '森林公園',
    '小川町(埼玉県)': '小川町',
    '坂戸(埼玉県)': '坂戸',
    '大山(東京都)': '大山',
  },
  trainTypeMap: {
    '普通': 'local',
    '各駅停車': 'local',
    '各停': 'local',
    'Ｓ−ＴＲＡＩＮ': 'strain',
    'S-TRAIN': 'strain',
    'Ｓ－ＴＲＡＩＮ': 'strain',
  },
  defaultCars: 10,
  baseSectionSeconds: {
    1: 180, // 和光市 -> 地下鉄成増
    2: 120, // 地下鉄成増 -> 地下鉄赤塚
    3: 180, // 地下鉄赤塚 -> 平和台
    4: 120, // 平和台 -> 氷川台
    5: 120, // 氷川台 -> 小竹向原
    6: 120, // 小竹向原 -> 千川
    7: 120, // 千川 -> 要町
    8: 180, // 要町 -> 池袋
    9: 120, // 池袋 -> 東池袋
    10: 120, // 東池袋 -> 護国寺
    11: 180, // 護国寺 -> 江戸川橋
    12: 180, // 江戸川橋 -> 飯田橋
    13: 120, // 飯田橋 -> 市ケ谷
    14: 120, // 市ケ谷 -> 麹町
    15: 120, // 麹町 -> 永田町
    16: 120, // 永田町 -> 桜田門
    17: 120, // 桜田門 -> 有楽町
    18: 120, // 有楽町 -> 銀座一丁目
    19: 120, // 銀座一丁目 -> 新富町
    20: 180, // 新富町 -> 月島
    21: 120, // 月島 -> 豊洲
    22: 120, // 豊洲 -> 辰巳
    23: 180, // 辰巳 -> 新木場
  },
};
