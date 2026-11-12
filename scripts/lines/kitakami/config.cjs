// JR北上線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'kitakami',
  name: 'JR北上線',
  stationsFilePath: 'src/data/lines/kitakami/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/kitakami/stationTimetables.json',
    globalTimetable: 'src/data/lines/kitakami/globalTimetable.json',
  },
  stations: [
    {
        "id": "KT-01",
        "name": "北上",
        "yahooStationId": "20844",
        "inGroupId": null,
        "outGroupId": "461"
    },
    {
        "id": "KT-02",
        "name": "柳原",
        "yahooStationId": "20942",
        "inGroupId": "460",
        "outGroupId": "461"
    },
    {
        "id": "KT-03",
        "name": "江釣子",
        "yahooStationId": "20823",
        "inGroupId": "460",
        "outGroupId": "461"
    },
    {
        "id": "KT-04",
        "name": "藤根",
        "yahooStationId": "20919",
        "inGroupId": "460",
        "outGroupId": "461"
    },
    {
        "id": "KT-05",
        "name": "立川目",
        "yahooStationId": "20883",
        "inGroupId": "460",
        "outGroupId": "461"
    },
    {
        "id": "KT-06",
        "name": "横川目",
        "yahooStationId": "20949",
        "inGroupId": "460",
        "outGroupId": "461"
    },
    {
        "id": "KT-07",
        "name": "岩沢",
        "yahooStationId": "20810",
        "inGroupId": "460",
        "outGroupId": "461"
    },
    {
        "id": "KT-08",
        "name": "和賀仙人",
        "yahooStationId": "20969",
        "inGroupId": "460",
        "outGroupId": "461"
    },
    {
        "id": "KT-09",
        "name": "ゆだ錦秋湖",
        "yahooStationId": "20947",
        "inGroupId": "460",
        "outGroupId": "461"
    },
    {
        "id": "KT-10",
        "name": "ほっとゆだ",
        "yahooStationId": "20923",
        "inGroupId": "460",
        "outGroupId": "461"
    },
    {
        "id": "KT-11",
        "name": "ゆだ高原",
        "yahooStationId": "20948",
        "inGroupId": "460",
        "outGroupId": "461"
    },
    {
        "id": "KT-12",
        "name": "黒沢",
        "yahooStationId": "21192",
        "inGroupId": "460",
        "outGroupId": "461"
    },
    {
        "id": "KT-13",
        "name": "小松川",
        "yahooStationId": "21198",
        "inGroupId": "460",
        "outGroupId": "461"
    },
    {
        "id": "KT-14",
        "name": "相野々",
        "yahooStationId": "21136",
        "inGroupId": "460",
        "outGroupId": "461"
    },
    {
        "id": "KT-15",
        "name": "横手",
        "yahooStationId": "21269",
        "inGroupId": "460",
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
    "1": 160,
    "2": 244,
    "3": 242,
    "4": 291,
    "5": 172,
    "6": 300,
    "7": 174,
    "8": 654,
    "9": 500,
    "10": 306,
    "11": 407,
    "12": 413,
    "13": 298,
    "14": 596
},
};
