// JR仙石東北ライン Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'senseki_tohoku',
  name: 'JR仙石東北ライン',
  stationsFilePath: 'src/data/lines/senseki_tohoku/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/senseki_tohoku/stationTimetables.json',
    globalTimetable: 'src/data/lines/senseki_tohoku/globalTimetable.json',
  },
  stations: [
    {
        "id": "SST-01",
        "name": "塩釜",
        "yahooStationId": "21034",
        "inGroupId": null,
        "outGroupId": "7961"
    },
    {
        "id": "SST-02",
        "name": "高城町",
        "yahooStationId": "21047",
        "inGroupId": "7960",
        "outGroupId": null
    }
],
  stationNameAliases: {
    '榴ヶ岡': '榴ケ岡',
    '北浦(宮城県)': '北浦',
    '升形(山形県)': '升形',
  },
  trainTypeMap: {
    '普通': 'regular',
    '各駅停車': 'regular',
    '特別快速': 'special_rapid',
    '快速おもいで湯けむり': 'rapid',
    '快速湯けむり': 'rapid',
    '快速風っこ女川シーパル号': 'rapid',
    '快速最上川': 'rapid',
    '最上川': 'rapid',
    '快速': 'rapid',
    '代行バス': 'substitution_bus',
    '特急': 'limitedExp',
  },
  preserveAllStopsTypes: ['regular', 'rapid', 'special_rapid', 'limitedExp'],
  defaultTrainType: 'regular',
  defaultCars: 4,
  buildStationTimetablesFromTrips: true,
  baseSectionSeconds: {
    "1": 737
},
};
