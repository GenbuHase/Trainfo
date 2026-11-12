// JR男鹿線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'oga',
  name: 'JR男鹿線',
  stationsFilePath: 'src/data/lines/oga/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/oga/stationTimetables.json',
    globalTimetable: 'src/data/lines/oga/globalTimetable.json',
  },
  stations: [
    {
        "id": "OG-01",
        "name": "追分",
        "yahooStationId": "21161",
        "inGroupId": null,
        "outGroupId": "361"
    },
    {
        "id": "OG-02",
        "name": "出戸浜",
        "yahooStationId": "21226",
        "inGroupId": "360",
        "outGroupId": "361"
    },
    {
        "id": "OG-03",
        "name": "上二田",
        "yahooStationId": "21182",
        "inGroupId": "360",
        "outGroupId": "361"
    },
    {
        "id": "OG-04",
        "name": "二田",
        "yahooStationId": "21248",
        "inGroupId": "360",
        "outGroupId": "361"
    },
    {
        "id": "OG-05",
        "name": "天王",
        "yahooStationId": "21225",
        "inGroupId": "360",
        "outGroupId": "361"
    },
    {
        "id": "OG-06",
        "name": "船越",
        "yahooStationId": "21250",
        "inGroupId": "360",
        "outGroupId": "361"
    },
    {
        "id": "OG-07",
        "name": "脇本",
        "yahooStationId": "21276",
        "inGroupId": "360",
        "outGroupId": "361"
    },
    {
        "id": "OG-08",
        "name": "羽立",
        "yahooStationId": "21238",
        "inGroupId": "360",
        "outGroupId": "361"
    },
    {
        "id": "OG-09",
        "name": "男鹿",
        "yahooStationId": "21170",
        "inGroupId": "360",
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
    "1": 400,
    "2": 254,
    "3": 157,
    "4": 219,
    "5": 131,
    "6": 315,
    "7": 373,
    "8": 201
},
};
