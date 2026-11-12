// JR山田線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'yamada',
  name: 'JR山田線',
  stationsFilePath: 'src/data/lines/yamada/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/yamada/stationTimetables.json',
    globalTimetable: 'src/data/lines/yamada/globalTimetable.json',
  },
  stations: [
    {
        "id": "YM-01",
        "name": "盛岡",
        "yahooStationId": "20940",
        "inGroupId": null,
        "outGroupId": "421"
    },
    {
        "id": "YM-02",
        "name": "上盛岡",
        "yahooStationId": "20841",
        "inGroupId": "420",
        "outGroupId": "421"
    },
    {
        "id": "YM-03",
        "name": "山岸",
        "yahooStationId": "20944",
        "inGroupId": "420",
        "outGroupId": "421"
    },
    {
        "id": "YM-04",
        "name": "上米内",
        "yahooStationId": "20842",
        "inGroupId": "420",
        "outGroupId": "421"
    },
    {
        "id": "YM-05",
        "name": "区界",
        "yahooStationId": "20848",
        "inGroupId": "420",
        "outGroupId": "421"
    },
    {
        "id": "YM-06",
        "name": "松草",
        "yahooStationId": "20931",
        "inGroupId": "420",
        "outGroupId": "421"
    },
    {
        "id": "YM-07",
        "name": "川内",
        "yahooStationId": "20843",
        "inGroupId": "420",
        "outGroupId": "421"
    },
    {
        "id": "YM-08",
        "name": "箱石",
        "yahooStationId": "20904",
        "inGroupId": "420",
        "outGroupId": "421"
    },
    {
        "id": "YM-09",
        "name": "陸中川井",
        "yahooStationId": "20960",
        "inGroupId": "420",
        "outGroupId": "421"
    },
    {
        "id": "YM-10",
        "name": "腹帯",
        "yahooStationId": "20909",
        "inGroupId": "420",
        "outGroupId": "421"
    },
    {
        "id": "YM-11",
        "name": "茂市",
        "yahooStationId": "20939",
        "inGroupId": "420",
        "outGroupId": "421"
    },
    {
        "id": "YM-12",
        "name": "蟇目",
        "yahooStationId": "20913",
        "inGroupId": "420",
        "outGroupId": "421"
    },
    {
        "id": "YM-13",
        "name": "花原市",
        "yahooStationId": "20851",
        "inGroupId": "420",
        "outGroupId": "421"
    },
    {
        "id": "YM-14",
        "name": "千徳",
        "yahooStationId": "20876",
        "inGroupId": "420",
        "outGroupId": "421"
    },
    {
        "id": "YM-15",
        "name": "宮古",
        "yahooStationId": "20936",
        "inGroupId": "420",
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
    "1": 225,
    "2": 163,
    "3": 390,
    "4": 1911,
    "5": 625,
    "6": 1396,
    "7": 313,
    "8": 617,
    "9": 720,
    "10": 344,
    "11": 349,
    "12": 212,
    "13": 359,
    "14": 258
},
};
