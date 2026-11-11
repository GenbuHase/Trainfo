// JR田沢湖線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'tazawako',
  name: 'JR田沢湖線',
  stationsFilePath: 'src/data/lines/tazawako/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tazawako/stationTimetables.json',
    globalTimetable: 'src/data/lines/tazawako/globalTimetable.json',
  },
  stations: [
    {
        "id": "TZ-01",
        "name": "盛岡",
        "yahooStationId": "20940",
        "inGroupId": null,
        "outGroupId": "411"
    },
    {
        "id": "TZ-02",
        "name": "前潟",
        "yahooStationId": "29932",
        "inGroupId": "410",
        "outGroupId": "411"
    },
    {
        "id": "TZ-03",
        "name": "大釜",
        "yahooStationId": "20824",
        "inGroupId": "410",
        "outGroupId": "411"
    },
    {
        "id": "TZ-04",
        "name": "小岩井",
        "yahooStationId": "20854",
        "inGroupId": "410",
        "outGroupId": "411"
    },
    {
        "id": "TZ-05",
        "name": "雫石",
        "yahooStationId": "20866",
        "inGroupId": "410",
        "outGroupId": "411"
    },
    {
        "id": "TZ-06",
        "name": "春木場",
        "yahooStationId": "20910",
        "inGroupId": "410",
        "outGroupId": "411"
    },
    {
        "id": "TZ-07",
        "name": "赤渕",
        "yahooStationId": "20797",
        "inGroupId": "410",
        "outGroupId": "411"
    },
    {
        "id": "TZ-08",
        "name": "田沢湖",
        "yahooStationId": "21221",
        "inGroupId": "410",
        "outGroupId": "411"
    },
    {
        "id": "TZ-09",
        "name": "刺巻",
        "yahooStationId": "21202",
        "inGroupId": "410",
        "outGroupId": "411"
    },
    {
        "id": "TZ-10",
        "name": "神代",
        "yahooStationId": "21215",
        "inGroupId": "410",
        "outGroupId": "411"
    },
    {
        "id": "TZ-11",
        "name": "生田",
        "yahooStationId": "21206",
        "inGroupId": "410",
        "outGroupId": "411"
    },
    {
        "id": "TZ-12",
        "name": "角館",
        "yahooStationId": "21174",
        "inGroupId": "410",
        "outGroupId": "411"
    },
    {
        "id": "TZ-13",
        "name": "鶯野",
        "yahooStationId": "21149",
        "inGroupId": "410",
        "outGroupId": "411"
    },
    {
        "id": "TZ-14",
        "name": "羽後長野",
        "yahooStationId": "21158",
        "inGroupId": "410",
        "outGroupId": "411"
    },
    {
        "id": "TZ-15",
        "name": "鑓見内",
        "yahooStationId": "21266",
        "inGroupId": "410",
        "outGroupId": "411"
    },
    {
        "id": "TZ-16",
        "name": "羽後四ツ屋",
        "yahooStationId": "21160",
        "inGroupId": "410",
        "outGroupId": "411"
    },
    {
        "id": "TZ-17",
        "name": "北大曲",
        "yahooStationId": "21188",
        "inGroupId": "410",
        "outGroupId": "411"
    },
    {
        "id": "TZ-18",
        "name": "大曲",
        "yahooStationId": "21168",
        "inGroupId": "410",
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
  shouldExcludeDeparture: ({ rawKindName }) => /こまち|新幹線/.test(rawKindName || ''),
  shouldExcludeTrip: (d) => /こまち|新幹線/.test(`${d.displayName || ''} ${d.guideComment || ''}`),
  baseSectionSeconds: {
    "1": 273,
    "2": 203,
    "3": 354,
    "4": 428,
    "5": 209,
    "6": 266,
    "7": 1402,
    "8": 339,
    "9": 648,
    "10": 203,
    "11": 272,
    "12": 220,
    "13": 232,
    "14": 255,
    "15": 183,
    "16": 142,
    "17": 280
},
};
