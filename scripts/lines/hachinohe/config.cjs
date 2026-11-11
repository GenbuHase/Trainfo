// JR八戸線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'hachinohe',
  name: 'JR八戸線',
  stationsFilePath: 'src/data/lines/hachinohe/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/hachinohe/stationTimetables.json',
    globalTimetable: 'src/data/lines/hachinohe/globalTimetable.json',
  },
  stations: [
    {
        "id": "HC-01",
        "name": "八戸",
        "yahooStationId": "20750",
        "inGroupId": null,
        "outGroupId": "331"
    },
    {
        "id": "HC-02",
        "name": "長苗代",
        "yahooStationId": "20738",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-03",
        "name": "本八戸",
        "yahooStationId": "20767",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-04",
        "name": "小中野",
        "yahooStationId": "20679",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-05",
        "name": "陸奥湊",
        "yahooStationId": "20784",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-06",
        "name": "白銀",
        "yahooStationId": "20697",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-07",
        "name": "鮫",
        "yahooStationId": "20687",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-08",
        "name": "陸奥白浜",
        "yahooStationId": "20781",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-09",
        "name": "種差海岸",
        "yahooStationId": "20707",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-10",
        "name": "大久喜",
        "yahooStationId": "20641",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-11",
        "name": "金浜",
        "yahooStationId": "20659",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-12",
        "name": "大蛇",
        "yahooStationId": "20643",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-13",
        "name": "階上",
        "yahooStationId": "20749",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-14",
        "name": "角の浜",
        "yahooStationId": "20837",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-15",
        "name": "平内",
        "yahooStationId": "20918",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-16",
        "name": "種市",
        "yahooStationId": "20884",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-17",
        "name": "玉川",
        "yahooStationId": "20886",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-18",
        "name": "宿戸",
        "yahooStationId": "20865",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-19",
        "name": "陸中八木",
        "yahooStationId": "20966",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-20",
        "name": "有家",
        "yahooStationId": "20821",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-21",
        "name": "陸中中野",
        "yahooStationId": "20962",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-22",
        "name": "侍浜",
        "yahooStationId": "20863",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-23",
        "name": "陸中夏井",
        "yahooStationId": "20963",
        "inGroupId": "330",
        "outGroupId": "331"
    },
    {
        "id": "HC-24",
        "name": "久慈",
        "yahooStationId": "20849",
        "inGroupId": "330",
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
    "1": 262,
    "2": 166,
    "3": 146,
    "4": 124,
    "5": 100,
    "6": 126,
    "7": 452,
    "8": 158,
    "9": 169,
    "10": 192,
    "11": 122,
    "12": 135,
    "13": 154,
    "14": 201,
    "15": 162,
    "16": 306,
    "17": 152,
    "18": 239,
    "19": 217,
    "20": 202,
    "21": 470,
    "22": 567,
    "23": 245
},
};
