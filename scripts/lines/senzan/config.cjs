// JR仙山線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'senzan',
  name: 'JR仙山線',
  stationsFilePath: 'src/data/lines/senzan/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/senzan/stationTimetables.json',
    globalTimetable: 'src/data/lines/senzan/globalTimetable.json',
  },
  stations: [
    {
        "id": "SZ-01",
        "name": "仙台",
        "yahooStationId": "21044",
        "inGroupId": null,
        "outGroupId": "561"
    },
    {
        "id": "SZ-02",
        "name": "東照宮",
        "yahooStationId": "21057",
        "inGroupId": "560",
        "outGroupId": "561"
    },
    {
        "id": "SZ-03",
        "name": "北仙台",
        "yahooStationId": "21010",
        "inGroupId": "560",
        "outGroupId": "561"
    },
    {
        "id": "SZ-04",
        "name": "北山",
        "yahooStationId": "21012",
        "inGroupId": "560",
        "outGroupId": "561"
    },
    {
        "id": "SZ-05",
        "name": "東北福祉大前",
        "yahooStationId": "29589",
        "inGroupId": "560",
        "outGroupId": "561"
    },
    {
        "id": "SZ-06",
        "name": "国見",
        "yahooStationId": "21015",
        "inGroupId": "560",
        "outGroupId": "561"
    },
    {
        "id": "SZ-07",
        "name": "葛岡",
        "yahooStationId": "21014",
        "inGroupId": "560",
        "outGroupId": "561"
    },
    {
        "id": "SZ-08",
        "name": "陸前落合",
        "yahooStationId": "21113",
        "inGroupId": "560",
        "outGroupId": "561"
    },
    {
        "id": "SZ-09",
        "name": "愛子",
        "yahooStationId": "20975",
        "inGroupId": "560",
        "outGroupId": "561"
    },
    {
        "id": "SZ-10",
        "name": "陸前白沢",
        "yahooStationId": "21117",
        "inGroupId": "560",
        "outGroupId": "561"
    },
    {
        "id": "SZ-11",
        "name": "熊ケ根",
        "yahooStationId": "21016",
        "inGroupId": "560",
        "outGroupId": "561"
    },
    {
        "id": "SZ-12",
        "name": "作並",
        "yahooStationId": "21031",
        "inGroupId": "560",
        "outGroupId": "561"
    },
    {
        "id": "SZ-13",
        "name": "奥新川",
        "yahooStationId": "20995",
        "inGroupId": "560",
        "outGroupId": "561"
    },
    {
        "id": "SZ-14",
        "name": "面白山高原",
        "yahooStationId": "21316",
        "inGroupId": "560",
        "outGroupId": "561"
    },
    {
        "id": "SZ-15",
        "name": "山寺",
        "yahooStationId": "21394",
        "inGroupId": "560",
        "outGroupId": "561"
    },
    {
        "id": "SZ-16",
        "name": "高瀬",
        "yahooStationId": "21343",
        "inGroupId": "560",
        "outGroupId": "561"
    },
    {
        "id": "SZ-17",
        "name": "楯山",
        "yahooStationId": "21349",
        "inGroupId": "560",
        "outGroupId": "561"
    },
    {
        "id": "SZ-18",
        "name": "羽前千歳",
        "yahooStationId": "21298",
        "inGroupId": "560",
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
  defaultCars: 4,
  baseSectionSeconds: {
    "1": 249,
    "2": 122,
    "3": 135,
    "4": 90,
    "5": 90,
    "6": 120,
    "7": 208,
    "8": 197,
    "9": 421,
    "10": 240,
    "11": 389,
    "12": 395,
    "13": 674,
    "14": 493,
    "15": 289,
    "16": 187,
    "17": 247
},
};
