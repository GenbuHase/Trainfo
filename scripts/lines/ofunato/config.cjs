// JR大船渡線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'ofunato',
  name: 'JR大船渡線',
  stationsFilePath: 'src/data/lines/ofunato/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/ofunato/stationTimetables.json',
    globalTimetable: 'src/data/lines/ofunato/globalTimetable.json',
  },
  stations: [
    {
        "id": "OF-01",
        "name": "一ノ関",
        "yahooStationId": "20806",
        "inGroupId": null,
        "outGroupId": "471"
    },
    {
        "id": "OF-02",
        "name": "真滝",
        "yahooStationId": "20929",
        "inGroupId": "470",
        "outGroupId": "471"
    },
    {
        "id": "OF-03",
        "name": "陸中門崎",
        "yahooStationId": "20961",
        "inGroupId": "470",
        "outGroupId": "471"
    },
    {
        "id": "OF-04",
        "name": "岩ノ下",
        "yahooStationId": "20820",
        "inGroupId": "470",
        "outGroupId": "471"
    },
    {
        "id": "OF-05",
        "name": "陸中松川",
        "yahooStationId": "20965",
        "inGroupId": "470",
        "outGroupId": "471"
    },
    {
        "id": "OF-06",
        "name": "猊鼻渓",
        "yahooStationId": "20852",
        "inGroupId": "470",
        "outGroupId": "471"
    },
    {
        "id": "OF-07",
        "name": "柴宿",
        "yahooStationId": "20867",
        "inGroupId": "470",
        "outGroupId": "471"
    },
    {
        "id": "OF-08",
        "name": "摺沢",
        "yahooStationId": "20874",
        "inGroupId": "470",
        "outGroupId": "471"
    },
    {
        "id": "OF-09",
        "name": "千厩",
        "yahooStationId": "20878",
        "inGroupId": "470",
        "outGroupId": "471"
    },
    {
        "id": "OF-10",
        "name": "小梨",
        "yahooStationId": "20859",
        "inGroupId": "470",
        "outGroupId": "471"
    },
    {
        "id": "OF-11",
        "name": "矢越",
        "yahooStationId": "20941",
        "inGroupId": "470",
        "outGroupId": "471"
    },
    {
        "id": "OF-12",
        "name": "折壁",
        "yahooStationId": "20835",
        "inGroupId": "470",
        "outGroupId": "471"
    },
    {
        "id": "OF-13",
        "name": "新月",
        "yahooStationId": "20898",
        "inGroupId": "470",
        "outGroupId": "471"
    },
    {
        "id": "OF-14",
        "name": "気仙沼",
        "yahooStationId": "21022",
        "inGroupId": "470",
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
  shouldExcludeDeparture: ({ rawKindName }) => /(ＢＲＴ|BRT)/.test(rawKindName || ''),
  shouldExcludeTrip: (d) => /(ＢＲＴ|BRT)/.test(d.displayName || ''),
  baseSectionSeconds: {
    "1": 446,
    "2": 620,
    "3": 301,
    "4": 295,
    "5": 160,
    "6": 222,
    "7": 347,
    "8": 723,
    "9": 281,
    "10": 325,
    "11": 164,
    "12": 442,
    "13": 516
},
};
