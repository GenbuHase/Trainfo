// JR気仙沼線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'kesennuma',
  name: 'JR気仙沼線',
  stationsFilePath: 'src/data/lines/kesennuma/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/kesennuma/stationTimetables.json',
    globalTimetable: 'src/data/lines/kesennuma/globalTimetable.json',
  },
  stations: [
    {
        "id": "KS-01",
        "name": "前谷地",
        "yahooStationId": "21091",
        "inGroupId": null,
        "outGroupId": "491"
    },
    {
        "id": "KS-02",
        "name": "和渕",
        "yahooStationId": "21134",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KS-03",
        "name": "のの岳",
        "yahooStationId": "21073",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KS-04",
        "name": "陸前豊里",
        "yahooStationId": "21121",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KS-05",
        "name": "御岳堂",
        "yahooStationId": "21098",
        "inGroupId": "490",
        "outGroupId": "491"
    },
    {
        "id": "KS-06",
        "name": "柳津",
        "yahooStationId": "21106",
        "inGroupId": "490",
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
    "1": 247,
    "2": 239,
    "3": 314,
    "4": 260,
    "5": 305
},
};
