// JR陸羽西線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'rikuu_west',
  name: 'JR陸羽西線',
  stationsFilePath: 'src/data/lines/rikuu_west/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/rikuu_west/stationTimetables.json',
    globalTimetable: 'src/data/lines/rikuu_west/globalTimetable.json',
  },
  stations: [
    {
        "id": "RW-01",
        "name": "新庄",
        "yahooStationId": "21338",
        "inGroupId": null,
        "outGroupId": "531"
    },
    {
        "id": "RW-02",
        "name": "升形",
        "yahooStationId": "21378",
        "inGroupId": "530",
        "outGroupId": "531"
    },
    {
        "id": "RW-03",
        "name": "羽前前波",
        "yahooStationId": null,
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "RW-04",
        "name": "津谷",
        "yahooStationId": "21352",
        "inGroupId": "530",
        "outGroupId": "531"
    },
    {
        "id": "RW-05",
        "name": "古口",
        "yahooStationId": "21377",
        "inGroupId": "530",
        "outGroupId": "531"
    },
    {
        "id": "RW-06",
        "name": "高屋",
        "yahooStationId": null,
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "RW-07",
        "name": "清川",
        "yahooStationId": "21325",
        "inGroupId": "530",
        "outGroupId": "531"
    },
    {
        "id": "RW-08",
        "name": "狩川",
        "yahooStationId": "21321",
        "inGroupId": "530",
        "outGroupId": "531"
    },
    {
        "id": "RW-09",
        "name": "南野",
        "yahooStationId": "21386",
        "inGroupId": "530",
        "outGroupId": "531"
    },
    {
        "id": "RW-10",
        "name": "余目",
        "yahooStationId": "21282",
        "inGroupId": "530",
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
  defaultCars: 2,
  buildStationTimetablesFromTrips: true,
  // Yahoo路線情報上で平日154Dが二重登録(42833/42834)されているため、休日兼用の42833を残して42834を除外
  shouldExcludeTrip: (trainDetail) => String(trainDetail.trainId) === '42834',
  baseSectionSeconds: {
    "1": 413,
    "2": 228,
    "3": 173,
    "4": 265,
    "5": 502,
    "6": 449,
    "7": 285,
    "8": 293,
    "9": 308
},
};
