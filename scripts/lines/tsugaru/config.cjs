// JR津軽線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'tsugaru',
  name: 'JR津軽線',
  stationsFilePath: 'src/data/lines/tsugaru/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tsugaru/stationTimetables.json',
    globalTimetable: 'src/data/lines/tsugaru/globalTimetable.json',
  },
  stations: [
    {
        "id": "TSG-01",
        "name": "青森",
        "yahooStationId": "20619",
        "inGroupId": null,
        "outGroupId": "301"
    },
    {
        "id": "TSG-02",
        "name": "油川",
        "yahooStationId": "20625",
        "inGroupId": "300",
        "outGroupId": "301"
    },
    {
        "id": "TSG-03",
        "name": "津軽宮田",
        "yahooStationId": "20722",
        "inGroupId": "300",
        "outGroupId": "301"
    },
    {
        "id": "TSG-04",
        "name": "奥内",
        "yahooStationId": "20652",
        "inGroupId": "300",
        "outGroupId": "301"
    },
    {
        "id": "TSG-05",
        "name": "左堰",
        "yahooStationId": "20755",
        "inGroupId": "300",
        "outGroupId": "301"
    },
    {
        "id": "TSG-06",
        "name": "後潟",
        "yahooStationId": "20634",
        "inGroupId": "300",
        "outGroupId": "301"
    },
    {
        "id": "TSG-07",
        "name": "中沢",
        "yahooStationId": "20735",
        "inGroupId": "300",
        "outGroupId": "301"
    },
    {
        "id": "TSG-08",
        "name": "蓬田",
        "yahooStationId": "20793",
        "inGroupId": "300",
        "outGroupId": "301"
    },
    {
        "id": "TSG-09",
        "name": "郷沢",
        "yahooStationId": "20682",
        "inGroupId": "300",
        "outGroupId": "301"
    },
    {
        "id": "TSG-10",
        "name": "瀬辺地",
        "yahooStationId": "20702",
        "inGroupId": "300",
        "outGroupId": "301"
    },
    {
        "id": "TSG-11",
        "name": "蟹田",
        "yahooStationId": "20658",
        "inGroupId": "300",
        "outGroupId": "301"
    },
    {
        "id": "TSG-12",
        "name": "中小国",
        "yahooStationId": "20734",
        "inGroupId": "300",
        "outGroupId": "301"
    },
    {
        "id": "TSG-13",
        "name": "大平",
        "yahooStationId": "20644",
        "inGroupId": "300",
        "outGroupId": "301"
    },
    {
        "id": "TSG-14",
        "name": "津軽二股",
        "yahooStationId": "20721",
        "inGroupId": "300",
        "outGroupId": "301"
    },
    {
        "id": "TSG-15",
        "name": "大川平",
        "yahooStationId": "20640",
        "inGroupId": "300",
        "outGroupId": "301"
    },
    {
        "id": "TSG-16",
        "name": "今別",
        "yahooStationId": "20633",
        "inGroupId": "300",
        "outGroupId": "301"
    },
    {
        "id": "TSG-17",
        "name": "津軽浜名",
        "yahooStationId": "20720",
        "inGroupId": "300",
        "outGroupId": "301"
    },
    {
        "id": "TSG-18",
        "name": "三厩",
        "yahooStationId": "20774",
        "inGroupId": "300",
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
    '代行バス': 'substitution_bus',
    '特急': 'limitedExp',
  },
  preserveAllStopsTypes: ['regular', 'rapid', 'limitedExp', 'substitution_bus'],
  defaultTrainType: 'regular',
  defaultCars: 2,
  baseSectionSeconds: {
    "1": 485,
    "2": 281,
    "3": 142,
    "4": 128,
    "5": 131,
    "6": 160,
    "7": 176,
    "8": 162,
    "9": 177,
    "10": 283,
    "11": 342,
    "12": 285,
    "13": 900,
    "14": 161,
    "15": 186,
    "16": 136,
    "17": 220
},
};
