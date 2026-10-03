// 東京メトロ副都心線 Yahoo! 路線情報スクレイパー設定 (和光市 〜 渋谷 全16駅)
module.exports = {
  lineId: 'fukutoshin',
  name: '東京メトロ副都心線',
  stationsFilePath: 'src/data/lines/fukutoshin/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/fukutoshin/stationTimetables.json',
    globalTimetable: 'src/data/lines/fukutoshin/globalTimetable.json',
  },
  stations: [
    { id: 'F-01', name: '和光市', yahooStationId: '22171', inGroupId: null, outGroupId: '3341' },
    { id: 'F-02', name: '地下鉄成増', yahooStationId: '22541', inGroupId: '3340', outGroupId: '3341' },
    { id: 'F-03', name: '地下鉄赤塚', yahooStationId: '22540', inGroupId: '3340', outGroupId: '3341' },
    { id: 'F-04', name: '平和台', yahooStationId: '22968', inGroupId: '3340', outGroupId: '3341' },
    { id: 'F-05', name: '氷川台', yahooStationId: '22921', inGroupId: '3340', outGroupId: '3341' },
    { id: 'F-06', name: '小竹向原', yahooStationId: '22679', inGroupId: '3340', outGroupId: '3371' },
    { id: 'F-07', name: '千川', yahooStationId: '22774', inGroupId: '3370', outGroupId: '3371' },
    { id: 'F-08', name: '要町', yahooStationId: '22599', inGroupId: '3370', outGroupId: '3371' },
    { id: 'F-09', name: '池袋', yahooStationId: '22513', inGroupId: '3370', outGroupId: '3371' },
    { id: 'F-10', name: '雑司が谷', yahooStationId: '29635', inGroupId: '3370', outGroupId: '3371' },
    { id: 'F-11', name: '西早稲田', yahooStationId: '29636', inGroupId: '3370', outGroupId: '3371' },
    { id: 'F-12', name: '東新宿', yahooStationId: '29331', inGroupId: '3370', outGroupId: '3371' },
    { id: 'F-13', name: '新宿三丁目', yahooStationId: '22743', inGroupId: '3370', outGroupId: '3371' },
    { id: 'F-14', name: '北参道', yahooStationId: '29637', inGroupId: '3370', outGroupId: '3371' },
    { id: 'F-15', name: '明治神宮前〈原宿〉', yahooStationId: '23016', inGroupId: '3370', outGroupId: '3371' },
    { id: 'F-16', name: '渋谷', yahooStationId: '22715', inGroupId: '3370', outGroupId: null },
  ],
  stationNameAliases: {
    '平和台(東京都)': '平和台',
    '明治神宮前': '明治神宮前〈原宿〉',
    '明治神宮前(原宿)': '明治神宮前〈原宿〉',
    '森林公園(埼玉県)': '森林公園',
    '小川町(埼玉県)': '小川町',
    '坂戸(埼玉県)': '坂戸',
    '大山(東京都)': '大山',
  },
  trainTypeMap: {
    '普通': 'local',
    '各駅停車': 'local',
    '各停': 'local',
    '急行': 'express',
    '通勤急行': 'commuter_exp',
    'Ｆライナー': 'express',
    'Fライナー': 'express',
    'Ｓ－ＴＲＡＩＮ': 'local',
    'S-TRAIN': 'local',
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
    8: 120, // 要町 -> 池袋
    9: 180, // 池袋 -> 雑司が谷
    10: 120, // 雑司が谷 -> 西早稲田
    11: 120, // 西早稲田 -> 東新宿
    12: 120, // 東新宿 -> 新宿三丁目
    13: 120, // 新宿三丁目 -> 北参道
    14: 120, // 北参道 -> 明治神宮前
    15: 120, // 明治神宮前 -> 渋谷
  },
};
