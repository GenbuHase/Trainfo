// JR五能線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'gono',
  name: 'JR五能線',
  stationsFilePath: 'src/data/lines/gono/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/gono/stationTimetables.json',
    globalTimetable: 'src/data/lines/gono/globalTimetable.json',
  },
  stations: [
    {
        "id": "GN-01",
        "name": "東能代",
        "yahooStationId": "21244",
        "inGroupId": null,
        "outGroupId": "291"
    },
    {
        "id": "GN-02",
        "name": "能代",
        "yahooStationId": "21237",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-03",
        "name": "向能代",
        "yahooStationId": "21259",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-04",
        "name": "北能代",
        "yahooStationId": "21190",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-05",
        "name": "鳥形",
        "yahooStationId": "21229",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-06",
        "name": "沢目",
        "yahooStationId": "21205",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-07",
        "name": "東八森",
        "yahooStationId": "21245",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-08",
        "name": "八森",
        "yahooStationId": "21240",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-09",
        "name": "滝ノ間",
        "yahooStationId": "21220",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-10",
        "name": "あきた白神",
        "yahooStationId": "29210",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-11",
        "name": "岩館",
        "yahooStationId": "21146",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-12",
        "name": "大間越",
        "yahooStationId": "20648",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-13",
        "name": "白神岳登山口",
        "yahooStationId": "20779",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-14",
        "name": "松神",
        "yahooStationId": "20769",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-15",
        "name": "十二湖",
        "yahooStationId": "20699",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-16",
        "name": "陸奥岩崎",
        "yahooStationId": "20778",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-17",
        "name": "陸奥沢辺",
        "yahooStationId": "20780",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-18",
        "name": "ウェスパ椿山",
        "yahooStationId": "29377",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-19",
        "name": "艫作",
        "yahooStationId": "20766",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-20",
        "name": "横磯",
        "yahooStationId": "20792",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-21",
        "name": "深浦",
        "yahooStationId": "20762",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-22",
        "name": "広戸",
        "yahooStationId": "20759",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-23",
        "name": "追良瀬",
        "yahooStationId": "20639",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-24",
        "name": "驫木",
        "yahooStationId": "20730",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-25",
        "name": "風合瀬",
        "yahooStationId": "20655",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-26",
        "name": "大戸瀬",
        "yahooStationId": "20645",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-27",
        "name": "千畳敷",
        "yahooStationId": "20703",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-28",
        "name": "北金ケ沢",
        "yahooStationId": "20666",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-29",
        "name": "陸奥柳田",
        "yahooStationId": "20786",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-30",
        "name": "陸奥赤石",
        "yahooStationId": "20776",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-31",
        "name": "鰺ケ沢",
        "yahooStationId": "20624",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-32",
        "name": "鳴沢",
        "yahooStationId": "20741",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-33",
        "name": "越水",
        "yahooStationId": "20678",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-34",
        "name": "陸奥森田",
        "yahooStationId": "20785",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-35",
        "name": "中田",
        "yahooStationId": "20736",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-36",
        "name": "木造",
        "yahooStationId": "20670",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-37",
        "name": "五所川原",
        "yahooStationId": "20683",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-38",
        "name": "陸奥鶴田",
        "yahooStationId": "20783",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-39",
        "name": "鶴泊",
        "yahooStationId": "20727",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-40",
        "name": "板柳",
        "yahooStationId": "20631",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-41",
        "name": "林崎",
        "yahooStationId": "20751",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-42",
        "name": "藤崎",
        "yahooStationId": "20764",
        "inGroupId": "290",
        "outGroupId": "291"
    },
    {
        "id": "GN-43",
        "name": "川部",
        "yahooStationId": "20665",
        "inGroupId": "290",
        "outGroupId": null
    }
],
  stationNameAliases: {
    '北山(宮城県)': '北山',
    '国見(宮城県)': '国見',
    '高瀬(山形県)': '高瀬',
    '仙台空港(鉄道)': '仙台空港',
    '柳原(岩手県)': '柳原',
    '黒沢(北上線)': '黒沢',
    '内湾入口（八日町）': '内湾入口',
    '内湾入口(八日町)': '内湾入口',
    '八幡大橋（東陵高校）': '八幡大橋',
    '八幡大橋(東陵高校)': '八幡大橋',
    '柳津(宮城県)': '柳津',
    '栃ヶ沢公園': '栃ケ沢公園',
    '花巻空港(東北本線)': '花巻空港',
    '神代(秋田県)': '神代',
    '生田(秋田県)': '生田',
    '大曲(秋田県)': '大曲',
    '川内(岩手県)': '川内',
    '玉川(岩手県)': '玉川',
    '有家(岩手県)': '有家',
    '中田(青森県)': '中田',
    '藤崎(青森県)': '藤崎',
    '追分(秋田県)': '追分',
    '熊ヶ根': '熊ケ根',
    '足ヶ瀬': '足ケ瀬',
    '千畳敷(青森県)': '千畳敷',
    '北金ヶ沢': '北金ケ沢',
    '鰺ヶ沢': '鰺ケ沢',
  },
  trainTypeMap: {
    '普通': 'regular',
    '各駅停車': 'regular',
    'リゾートしらかみ': 'limitedExp',
    '特別快速': 'special_rapid',
    '快速はまゆり': 'rapid',
    '快速ひなび': 'rapid',
    '快速しもきた': 'rapid',
    '快速リゾートしらかみ': 'limitedExp',
    '快速': 'rapid',
    '特急': 'limitedExp',
  },
  preserveAllStopsTypes: ['regular', 'rapid', 'limitedExp'],
  defaultTrainType: 'regular',
  defaultCars: 2,
  baseSectionSeconds: {
    "1": 305,
    "2": 171,
    "3": 252,
    "4": 148,
    "5": 223,
    "6": 308,
    "7": 368,
    "8": 149,
    "9": 113,
    "10": 236,
    "11": 847,
    "12": 179,
    "13": 192,
    "14": 150,
    "15": 335,
    "16": 213,
    "17": 186,
    "18": 148,
    "19": 279,
    "20": 430,
    "21": 306,
    "22": 156,
    "23": 243,
    "24": 232,
    "25": 391,
    "26": 160,
    "27": 361,
    "28": 213,
    "29": 311,
    "30": 496,
    "31": 351,
    "32": 212,
    "33": 272,
    "34": 187,
    "35": 210,
    "36": 475,
    "37": 466,
    "38": 190,
    "39": 379,
    "40": 231,
    "41": 223,
    "42": 196
},
};
