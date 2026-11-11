// JR気仙沼線BRT Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'kesennuma_brt',
  name: 'JR気仙沼線BRT',
  stationsFilePath: 'src/data/lines/kesennuma_brt/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/kesennuma_brt/stationTimetables.json',
    globalTimetable: 'src/data/lines/kesennuma_brt/globalTimetable.json',
  },
  stations: [
    {
        "id": "KBRT-01",
        "name": "前谷地",
        "yahooStationId": "21091",
        "inGroupId": null,
        "outGroupId": "491"
    },
    {
        "id": "KBRT-02",
        "name": "柳津",
        "yahooStationId": "21106",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-03",
        "name": "陸前横山",
        "yahooStationId": "21128",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-04",
        "name": "陸前戸倉",
        "yahooStationId": "21119",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-05",
        "name": "志津川",
        "yahooStationId": "21037",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-06",
        "name": "南三陸町役場・病院前",
        "yahooStationId": "29705",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-07",
        "name": "志津川中央団地",
        "yahooStationId": "29795",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-08",
        "name": "清水浜",
        "yahooStationId": "21036",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-09",
        "name": "歌津",
        "yahooStationId": "20987",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-10",
        "name": "陸前港",
        "yahooStationId": "21125",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-11",
        "name": "蔵内",
        "yahooStationId": "21017",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-12",
        "name": "陸前小泉",
        "yahooStationId": "21115",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-13",
        "name": "本吉",
        "yahooStationId": "21103",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-14",
        "name": "小金沢",
        "yahooStationId": "21025",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-15",
        "name": "大谷海岸",
        "yahooStationId": "20993",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-16",
        "name": "大谷まち",
        "yahooStationId": "29908",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-17",
        "name": "陸前階上",
        "yahooStationId": "21122",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-18",
        "name": "最知",
        "yahooStationId": "21029",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-19",
        "name": "岩月",
        "yahooStationId": "29814",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-20",
        "name": "松岩",
        "yahooStationId": "21092",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-21",
        "name": "赤岩港",
        "yahooStationId": "29842",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-22",
        "name": "南気仙沼",
        "yahooStationId": "21100",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-23",
        "name": "不動の沢",
        "yahooStationId": "21085",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-24",
        "name": "東新城",
        "yahooStationId": "29909",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KBRT-25",
        "name": "気仙沼",
        "yahooStationId": "21022",
        "inGroupId": "490",
        "outGroupId": null
    },
    {
        "id": "KBRT-51",
        "name": "気仙沼市立病院",
        "yahooStationId": "29786",
        "inGroupId": "490",
        "outGroupId": "491"
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
    'ＢＲＴ快速': 'rapid',
    'BRT快速': 'rapid',
    'ＢＲＴ': 'brt',
    'BRT': 'brt',
  },
  preserveAllStopsTypes: ['brt', 'rapid', 'regular'],
  defaultTrainType: 'brt',
  defaultCars: 1,
  directStops: true,
  buildStationTimetablesFromTrips: true,
  shouldExcludeDeparture: ({ rawKindName }) => !/(ＢＲＴ|BRT)/.test(rawKindName || ''),
  shouldExcludeTrip: (d) => !/(ＢＲＴ|BRT)/.test(d.displayName || '') && d.trainType !== 'brt',
  baseSectionSeconds: {
    "1": 2150,
    "2": 527,
    "3": 818,
    "4": 541,
    "5": 258,
    "6": 217,
    "7": 454,
    "8": 447,
    "9": 289,
    "10": 198,
    "11": 221,
    "12": 313,
    "13": 388,
    "14": 334,
    "15": 180,
    "16": 244,
    "17": 199,
    "18": 112,
    "19": 149,
    "20": 142,
    "21": 157,
    "22": 502,
    "23": 300,
    "24": 139,
    "25": 157
},
};
