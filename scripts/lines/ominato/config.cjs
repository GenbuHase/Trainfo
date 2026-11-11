// JR大湊線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'ominato',
  name: 'JR大湊線',
  stationsFilePath: 'src/data/lines/ominato/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/ominato/stationTimetables.json',
    globalTimetable: 'src/data/lines/ominato/globalTimetable.json',
  },
  stations: [
    {
        "id": "OM-01",
        "name": "野辺地",
        "yahooStationId": "20747",
        "inGroupId": null,
        "outGroupId": "311"
    },
    {
        "id": "OM-02",
        "name": "北野辺地",
        "yahooStationId": "20671",
        "inGroupId": "310",
        "outGroupId": "311"
    },
    {
        "id": "OM-03",
        "name": "有戸",
        "yahooStationId": "20626",
        "inGroupId": "310",
        "outGroupId": "311"
    },
    {
        "id": "OM-04",
        "name": "吹越",
        "yahooStationId": "20761",
        "inGroupId": "310",
        "outGroupId": "311"
    },
    {
        "id": "OM-05",
        "name": "陸奥横浜",
        "yahooStationId": "20787",
        "inGroupId": "310",
        "outGroupId": "311"
    },
    {
        "id": "OM-06",
        "name": "有畑",
        "yahooStationId": "20627",
        "inGroupId": "310",
        "outGroupId": "311"
    },
    {
        "id": "OM-07",
        "name": "近川",
        "yahooStationId": "20710",
        "inGroupId": "310",
        "outGroupId": "311"
    },
    {
        "id": "OM-08",
        "name": "金谷沢",
        "yahooStationId": "20657",
        "inGroupId": "310",
        "outGroupId": "311"
    },
    {
        "id": "OM-09",
        "name": "赤川",
        "yahooStationId": "20621",
        "inGroupId": "310",
        "outGroupId": "311"
    },
    {
        "id": "OM-10",
        "name": "下北",
        "yahooStationId": "20695",
        "inGroupId": "310",
        "outGroupId": "311"
    },
    {
        "id": "OM-11",
        "name": "大湊",
        "yahooStationId": "20649",
        "inGroupId": "310",
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
    '特別快速': 'special_rapid',
    '快速はまゆり': 'rapid',
    '快速ひなび': 'rapid',
    '快速しもきた': 'rapid',
    '快速リゾートしらかみ': 'rapid',
    '快速': 'rapid',
    '特急': 'limitedExp',
  },
  preserveAllStopsTypes: ['regular', 'rapid', 'limitedExp'],
  defaultTrainType: 'regular',
  defaultCars: 2,
  baseSectionSeconds: {
    "1": 221,
    "2": 533,
    "3": 1044,
    "4": 560,
    "5": 457,
    "6": 529,
    "7": 390,
    "8": 424,
    "9": 182,
    "10": 208
},
};
