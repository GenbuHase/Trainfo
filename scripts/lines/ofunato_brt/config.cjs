// JR大船渡線BRT Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'ofunato_brt',
  name: 'JR大船渡線BRT',
  stationsFilePath: 'src/data/lines/ofunato_brt/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/ofunato_brt/stationTimetables.json',
    globalTimetable: 'src/data/lines/ofunato_brt/globalTimetable.json',
  },
  stations: [
    {
        "id": "OBRT-01",
        "name": "気仙沼",
        "yahooStationId": "21022",
        "inGroupId": null,
        "outGroupId": "7751"
    },
    {
        "id": "OBRT-02",
        "name": "内湾入口",
        "yahooStationId": "29891",
        "inGroupId": "7750",
        "outGroupId": "7751"
    },
    {
        "id": "OBRT-03",
        "name": "鹿折唐桑",
        "yahooStationId": "21035",
        "inGroupId": "7750",
        "outGroupId": [
            "7751",
            "7761"
        ]
    },
    {
        "id": "OBRT-04",
        "name": "八幡大橋",
        "yahooStationId": "29782",
        "inGroupId": "7750",
        "outGroupId": "7751"
    },
    {
        "id": "OBRT-05",
        "name": "唐桑大沢",
        "yahooStationId": "29815",
        "inGroupId": "7750",
        "outGroupId": "7751"
    },
    {
        "id": "OBRT-06",
        "name": "長部",
        "yahooStationId": "29715",
        "inGroupId": "7750",
        "outGroupId": "7751"
    },
    {
        "id": "OBRT-07",
        "name": "陸前今泉",
        "yahooStationId": "29843",
        "inGroupId": "7750",
        "outGroupId": "7751"
    },
    {
        "id": "OBRT-08",
        "name": "奇跡の一本松",
        "yahooStationId": "29726",
        "inGroupId": "7750",
        "outGroupId": "7751"
    },
    {
        "id": "OBRT-09",
        "name": "陸前高田",
        "yahooStationId": "20955",
        "inGroupId": "7750",
        "outGroupId": [
            "7751",
            "7770"
        ]
    },
    {
        "id": "OBRT-10",
        "name": "高田高校前",
        "yahooStationId": "29747",
        "inGroupId": "7750",
        "outGroupId": "7751"
    },
    {
        "id": "OBRT-11",
        "name": "高田病院",
        "yahooStationId": "29716",
        "inGroupId": "7750",
        "outGroupId": "7751"
    },
    {
        "id": "OBRT-12",
        "name": "脇ノ沢",
        "yahooStationId": "20970",
        "inGroupId": "7750",
        "outGroupId": "7751"
    },
    {
        "id": "OBRT-13",
        "name": "西下",
        "yahooStationId": "29816",
        "inGroupId": "7750",
        "outGroupId": "7751"
    },
    {
        "id": "OBRT-14",
        "name": "小友",
        "yahooStationId": "20831",
        "inGroupId": "7750",
        "outGroupId": "7751"
    },
    {
        "id": "OBRT-15",
        "name": "碁石海岸口",
        "yahooStationId": "29720",
        "inGroupId": "7750",
        "outGroupId": "7751"
    },
    {
        "id": "OBRT-16",
        "name": "細浦",
        "yahooStationId": "20924",
        "inGroupId": "7750",
        "outGroupId": "7751"
    },
    {
        "id": "OBRT-17",
        "name": "大船渡丸森",
        "yahooStationId": "29844",
        "inGroupId": "7750",
        "outGroupId": "7751"
    },
    {
        "id": "OBRT-18",
        "name": "下船渡",
        "yahooStationId": "20871",
        "inGroupId": "7750",
        "outGroupId": "7751"
    },
    {
        "id": "OBRT-19",
        "name": "大船渡魚市場前",
        "yahooStationId": "29772",
        "inGroupId": "7750",
        "outGroupId": "7751"
    },
    {
        "id": "OBRT-20",
        "name": "大船渡",
        "yahooStationId": "20827",
        "inGroupId": "7750",
        "outGroupId": "7751"
    },
    {
        "id": "OBRT-21",
        "name": "地ノ森",
        "yahooStationId": "29845",
        "inGroupId": "7750",
        "outGroupId": "7751"
    },
    {
        "id": "OBRT-22",
        "name": "田茂山",
        "yahooStationId": "29846",
        "inGroupId": "7750",
        "outGroupId": "7751"
    },
    {
        "id": "OBRT-23",
        "name": "盛",
        "yahooStationId": "20861",
        "inGroupId": "7750",
        "outGroupId": null
    },
    {
        "id": "OBRT-51",
        "name": "上鹿折",
        "yahooStationId": "21004",
        "inGroupId": "7760",
        "outGroupId": null
    },
    {
        "id": "OBRT-61",
        "name": "栃ケ沢公園",
        "yahooStationId": "29792",
        "inGroupId": "7771",
        "outGroupId": "7770"
    },
    {
        "id": "OBRT-62",
        "name": "竹駒",
        "yahooStationId": "20882",
        "inGroupId": "7771",
        "outGroupId": "7770"
    },
    {
        "id": "OBRT-63",
        "name": "陸前矢作",
        "yahooStationId": "20956",
        "inGroupId": "7771",
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
  resolveDirection: (firstSt, lastSt) => {
    const a = firstSt.stationId;
    const b = lastSt.stationId;
    if (b === 'OBRT-51' || a === 'OBRT-01') return 'outbound';
    if (a === 'OBRT-51' || b === 'OBRT-01') return 'inbound';
    if (b === 'OBRT-63' || b === 'OBRT-62' || b === 'OBRT-61') return 'outbound';
    if (a === 'OBRT-63' || a === 'OBRT-62' || a === 'OBRT-61') return 'inbound';
    return firstSt.number <= lastSt.number ? 'outbound' : 'inbound';
  },
  baseSectionSeconds: {
    "1": 119,
    "2": 135,
    "3": 103,
    "4": 931,
    "5": 403,
    "6": 326,
    "7": 180,
    "8": 156,
    "9": 198,
    "10": 113,
    "11": 781,
    "12": 205,
    "13": 228,
    "14": 296,
    "15": 181,
    "16": 201,
    "17": 151,
    "18": 171,
    "19": 151,
    "20": 114,
    "21": 112,
    "22": 90,
    "23": 388,
    "24": 552,
    "25": 603,
    "26": 216
},
};
