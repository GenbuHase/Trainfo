// JR釜石線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'kamaishi',
  name: 'JR釜石線',
  stationsFilePath: 'src/data/lines/kamaishi/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/kamaishi/stationTimetables.json',
    globalTimetable: 'src/data/lines/kamaishi/globalTimetable.json',
  },
  stations: [
    {
        "id": "KM-01",
        "name": "花巻",
        "yahooStationId": "20906",
        "inGroupId": null,
        "outGroupId": "441"
    },
    {
        "id": "KM-02",
        "name": "似内",
        "yahooStationId": "20900",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-03",
        "name": "新花巻",
        "yahooStationId": "20873",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-04",
        "name": "小山田",
        "yahooStationId": "20833",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-05",
        "name": "土沢",
        "yahooStationId": "20890",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-06",
        "name": "晴山",
        "yahooStationId": "20911",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-07",
        "name": "岩根橋",
        "yahooStationId": "20819",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-08",
        "name": "宮守",
        "yahooStationId": "20937",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-09",
        "name": "柏木平",
        "yahooStationId": "20836",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-10",
        "name": "鱒沢",
        "yahooStationId": "20928",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-11",
        "name": "荒谷前",
        "yahooStationId": "20804",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-12",
        "name": "岩手二日町",
        "yahooStationId": "20816",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-13",
        "name": "綾織",
        "yahooStationId": "20802",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-14",
        "name": "遠野",
        "yahooStationId": "20892",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-15",
        "name": "青笹",
        "yahooStationId": "20795",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-16",
        "name": "岩手上郷",
        "yahooStationId": "20813",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-17",
        "name": "平倉",
        "yahooStationId": "20916",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-18",
        "name": "足ケ瀬",
        "yahooStationId": "20800",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-19",
        "name": "上有住",
        "yahooStationId": "20840",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-20",
        "name": "陸中大橋",
        "yahooStationId": "20958",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-21",
        "name": "洞泉",
        "yahooStationId": "20895",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-22",
        "name": "松倉",
        "yahooStationId": "20932",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-23",
        "name": "小佐野",
        "yahooStationId": "20856",
        "inGroupId": "440",
        "outGroupId": "441"
    },
    {
        "id": "KM-24",
        "name": "釜石",
        "yahooStationId": "20839",
        "inGroupId": "440",
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
    "1": 276,
    "2": 223,
    "3": 147,
    "4": 348,
    "5": 241,
    "6": 460,
    "7": 264,
    "8": 484,
    "9": 178,
    "10": 217,
    "11": 227,
    "12": 146,
    "13": 379,
    "14": 339,
    "15": 274,
    "16": 218,
    "17": 353,
    "18": 333,
    "19": 640,
    "20": 466,
    "21": 285,
    "22": 256,
    "23": 278
},
};
