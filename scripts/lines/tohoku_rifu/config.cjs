// JR東北本線（利府支線） Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'tohoku_rifu',
  name: 'JR東北本線（利府支線）',
  stationsFilePath: 'src/data/lines/tohoku_rifu/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tohoku_rifu/stationTimetables.json',
    globalTimetable: 'src/data/lines/tohoku_rifu/globalTimetable.json',
  },
  stations: [
      {
          "id": "TRF-01",
          "name": "岩切",
          "yahooStationId": "20983",
          "inGroupId": null,
          "outGroupId": "631"
      },
      {
          "id": "TRF-02",
          "name": "新利府",
          "yahooStationId": "21041",
          "inGroupId": "630",
          "outGroupId": "631"
      },
      {
          "id": "TRF-03",
          "name": "利府",
          "yahooStationId": "21129",
          "inGroupId": "630",
          "outGroupId": null
      }
  ],
  stationNameAliases: {
    '郡山(福島県)': '郡山',
    '本宮(福島県)': '本宮',
    '杉田(福島県)': '杉田',
    '福島(福島県)': '福島',
    '白石(宮城県)': '白石',
    '大河原(宮城県)': '大河原',
    '船岡(宮城県)': '船岡',
    '愛宕(宮城県)': '愛宕',
    '松山町(宮城県)': '松山町',
    '田尻(宮城県)': '田尻',
    '新田(宮城県)': '新田',
    '梅ヶ沢': '梅ケ沢',
    '金ヶ崎': '金ケ崎',
    '花巻空港(東北本線)': '花巻空港',
    '古館(岩手県)': '古館',
    '青山(岩手県)': '青山',
    '下田(青森県)': '下田',
    '三沢(青森県)': '三沢',
    '小柳(青森県)': '小柳',
    '筒井(青森県)': '筒井',
  },
  trainTypeMap: {
    '普通': 'regular',
    '各駅停車': 'regular',
    '特別快速館鼻岸壁朝市リレー号': 'special_rapid',
    '館鼻岸壁朝市リレー号': 'special_rapid',
    '特別快速': 'special_rapid',
    '特急イブニングウェイ': 'limitedExp',
    'イブニングウェイ': 'limitedExp',
    '特急': 'limitedExp',
    '快速はまゆり': 'rapid',
    '快速しもきた': 'rapid',
    '快速おもいで湯けむり': 'rapid',
    '快速風っこ女川シーパル号': 'rapid',
    '快速あさむし・あおもり': 'rapid',
    '快速ひなび': 'rapid',
    '快速ふるさと大湊': 'rapid',
    '快速': 'rapid',
  },
  preserveAllStopsTypes: ['regular', 'rapid', 'limitedExp', 'special_rapid'],
  defaultTrainType: 'regular',
  defaultCars: 4,
  baseSectionSeconds: {
      "1": 168,
      "2": 128
  },
};
