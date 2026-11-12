// JR石巻線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'ishinomaki',
  name: 'JR石巻線',
  stationsFilePath: 'src/data/lines/ishinomaki/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/ishinomaki/stationTimetables.json',
    globalTimetable: 'src/data/lines/ishinomaki/globalTimetable.json',
  },
  stations: [
    {
        "id": "ISM-01",
        "name": "小牛田",
        "yahooStationId": "21026",
        "inGroupId": null,
        "outGroupId": ["501", "491"]
    },
    {
        "id": "ISM-02",
        "name": "上涌谷",
        "yahooStationId": "21005",
        "inGroupId": ["500", "490"],
        "outGroupId": ["501", "491"]
    },
    {
        "id": "ISM-03",
        "name": "涌谷",
        "yahooStationId": "21131",
        "inGroupId": ["500", "490"],
        "outGroupId": ["501", "491"]
    },
    {
        "id": "ISM-04",
        "name": "前谷地",
        "yahooStationId": "21091",
        "inGroupId": ["500", "490"],
        "outGroupId": "501"
    },
    {
        "id": "ISM-05",
        "name": "佳景山",
        "yahooStationId": "20999",
        "inGroupId": "500",
        "outGroupId": "501"
    },
    {
        "id": "ISM-06",
        "name": "鹿又",
        "yahooStationId": "21002",
        "inGroupId": "500",
        "outGroupId": "501"
    },
    {
        "id": "ISM-07",
        "name": "曽波神",
        "yahooStationId": "21046",
        "inGroupId": "500",
        "outGroupId": "501"
    },
    {
        "id": "ISM-08",
        "name": "石巻",
        "yahooStationId": "20980",
        "inGroupId": "500",
        "outGroupId": "501"
    },
    {
        "id": "ISM-09",
        "name": "陸前稲井",
        "yahooStationId": "21111",
        "inGroupId": "500",
        "outGroupId": "501"
    },
    {
        "id": "ISM-10",
        "name": "渡波",
        "yahooStationId": "21132",
        "inGroupId": "500",
        "outGroupId": "501"
    },
    {
        "id": "ISM-11",
        "name": "万石浦",
        "yahooStationId": "21097",
        "inGroupId": "500",
        "outGroupId": "501"
    },
    {
        "id": "ISM-12",
        "name": "沢田",
        "yahooStationId": "21032",
        "inGroupId": "500",
        "outGroupId": "501"
    },
    {
        "id": "ISM-13",
        "name": "浦宿",
        "yahooStationId": "20989",
        "inGroupId": "500",
        "outGroupId": "501"
    },
    {
        "id": "ISM-14",
        "name": "女川",
        "yahooStationId": "20996",
        "inGroupId": "500",
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
  // Yahoo路線情報上で同一列車(1631D/1633D)が石巻止まり重複版(30454/30455)と女川直通版(30461/30462)に二重登録されているため、女川直通版を残して除外し、BRT便も除外
  shouldExcludeDeparture: ({ rawKindName }) => /(ＢＲＴ|BRT)/.test(rawKindName || ''),
  shouldExcludeTrip: (trainDetail) => ['30454', '30455'].includes(String(trainDetail.trainId)) || /(ＢＲＴ|BRT)/.test(trainDetail.displayName || ''),
  baseSectionSeconds: {
    "1": 238,
    "2": 208,
    "3": 479,
    "4": 321,
    "5": 300,
    "6": 170,
    "7": 274,
    "8": 221,
    "9": 289,
    "10": 90,
    "11": 91,
    "12": 257,
    "13": 167
},
};
