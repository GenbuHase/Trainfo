// JR陸羽東線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'rikuu_east',
  name: 'JR陸羽東線',
  stationsFilePath: 'src/data/lines/rikuu_east/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/rikuu_east/stationTimetables.json',
    globalTimetable: 'src/data/lines/rikuu_east/globalTimetable.json',
  },
  stations: [
    {
        "id": "RE-01",
        "name": "小牛田",
        "yahooStationId": "21026",
        "inGroupId": null,
        "outGroupId": "511"
    },
    {
        "id": "RE-02",
        "name": "北浦",
        "yahooStationId": "21008",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-03",
        "name": "陸前谷地",
        "yahooStationId": "21126",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-04",
        "name": "古川",
        "yahooStationId": "21087",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-05",
        "name": "塚目",
        "yahooStationId": "21052",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-06",
        "name": "西古川",
        "yahooStationId": "21072",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-07",
        "name": "東大崎",
        "yahooStationId": "21076",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-08",
        "name": "西大崎",
        "yahooStationId": "21003",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-09",
        "name": "岩出山",
        "yahooStationId": "20984",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-10",
        "name": "有備館",
        "yahooStationId": "29066",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-11",
        "name": "上野目",
        "yahooStationId": "21070",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-12",
        "name": "池月",
        "yahooStationId": "20978",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-13",
        "name": "川渡温泉",
        "yahooStationId": "21006",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-14",
        "name": "鳴子御殿湯",
        "yahooStationId": "21080",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-15",
        "name": "鳴子温泉",
        "yahooStationId": "21067",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-16",
        "name": "中山平温泉",
        "yahooStationId": "21062",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-17",
        "name": "堺田",
        "yahooStationId": "21329",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-18",
        "name": "赤倉温泉",
        "yahooStationId": "21292",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-19",
        "name": "立小路",
        "yahooStationId": "21347",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-20",
        "name": "最上",
        "yahooStationId": "21307",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-21",
        "name": "大堀",
        "yahooStationId": "21314",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-22",
        "name": "鵜杉",
        "yahooStationId": "21291",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-23",
        "name": "瀬見温泉",
        "yahooStationId": "21341",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-24",
        "name": "東長沢",
        "yahooStationId": "21372",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-25",
        "name": "長沢",
        "yahooStationId": "21360",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-26",
        "name": "南新庄",
        "yahooStationId": "21382",
        "inGroupId": "510",
        "outGroupId": "511"
    },
    {
        "id": "RE-27",
        "name": "新庄",
        "yahooStationId": "21338",
        "inGroupId": "510",
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
  preserveAllStopsTypes: ['regular', 'rapid', 'special_rapid', 'limitedExp', 'substitution_bus'],
  defaultTrainType: 'regular',
  defaultCars: 2,
  baseSectionSeconds: {
    "1": 314,
    "2": 153,
    "3": 214,
    "4": 202,
    "5": 276,
    "6": 230,
    "7": 209,
    "8": 217,
    "9": 90,
    "10": 186,
    "11": 286,
    "12": 427,
    "13": 286,
    "14": 138,
    "15": 343,
    "16": 361,
    "17": 390,
    "18": 120,
    "19": 202,
    "20": 281,
    "21": 141,
    "22": 235,
    "23": 391,
    "24": 129,
    "25": 337,
    "26": 349
},
};
