// 弘南鉄道大鰐線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'konan_owani',
  name: '弘南鉄道大鰐線',
  stationsFilePath: 'src/data/lines/konan_owani/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/konan_owani/stationTimetables.json',
    globalTimetable: 'src/data/lines/konan_owani/globalTimetable.json',
  },
  stations: [
    {
        "id": "KNW-01",
        "name": "中央弘前",
        "yahooStationId": "20709",
        "inGroupId": null,
        "outGroupId": "4510"
    },
    {
        "id": "KNW-02",
        "name": "弘高下",
        "yahooStationId": "20757",
        "inGroupId": "4511",
        "outGroupId": "4510"
    },
    {
        "id": "KNW-03",
        "name": "弘前学院大前",
        "yahooStationId": "20745",
        "inGroupId": "4511",
        "outGroupId": "4510"
    },
    {
        "id": "KNW-04",
        "name": "聖愛中高前",
        "yahooStationId": "20700",
        "inGroupId": "4511",
        "outGroupId": "4510"
    },
    {
        "id": "KNW-05",
        "name": "千年",
        "yahooStationId": "20711",
        "inGroupId": "4511",
        "outGroupId": "4510"
    },
    {
        "id": "KNW-06",
        "name": "小栗山",
        "yahooStationId": "20677",
        "inGroupId": "4511",
        "outGroupId": "4510"
    },
    {
        "id": "KNW-07",
        "name": "松木平",
        "yahooStationId": "20770",
        "inGroupId": "4511",
        "outGroupId": "4510"
    },
    {
        "id": "KNW-08",
        "name": "津軽大沢",
        "yahooStationId": "20715",
        "inGroupId": "4511",
        "outGroupId": "4510"
    },
    {
        "id": "KNW-09",
        "name": "義塾高校前",
        "yahooStationId": "20672",
        "inGroupId": "4511",
        "outGroupId": "4510"
    },
    {
        "id": "KNW-10",
        "name": "石川",
        "yahooStationId": "20630",
        "inGroupId": "4511",
        "outGroupId": "4510"
    },
    {
        "id": "KNW-11",
        "name": "石川プール前",
        "yahooStationId": "29440",
        "inGroupId": "4511",
        "outGroupId": "4510"
    },
    {
        "id": "KNW-12",
        "name": "鯖石",
        "yahooStationId": "20686",
        "inGroupId": "4511",
        "outGroupId": "4510"
    },
    {
        "id": "KNW-13",
        "name": "宿川原",
        "yahooStationId": "20690",
        "inGroupId": "4511",
        "outGroupId": "4510"
    },
    {
        "id": "KNW-14",
        "name": "大鰐",
        "yahooStationId": "20650",
        "inGroupId": "4511",
        "outGroupId": null
    }
],
  stationNameAliases: {
    '成島(山形県)': '成島',
    '中郡(山形県)': '中郡',
    '今泉(山形県)': '今泉',
    '青山(岩手県)': '青山',
    '黒松(宮城県)': '黒松',
    '旭ケ丘(宮城県)': '旭ケ丘',
    '旭ヶ丘': '旭ケ丘',
    '河原町(宮城県)': '河原町',
    '仙台(地下鉄)': '仙台',
    '川内(宮城県)': '川内',
    '国際センター(宮城県)': '国際センター',
    '薬師堂(宮城県)': '薬師堂',
    '卸町(宮城県)': '卸町',
    '荒井(宮城県)': '荒井',
    '吉浜(岩手県)': '吉浜',
    '平田(岩手県)': '平田',
    '十府ケ浦海岸': '十府ケ浦海岸',
    '十府ヶ浦海岸': '十府ケ浦海岸',
    '運動公園前(青森県)': '運動公園前',
    '新里(青森県)': '新里',
    '黒石(青森県)': '黒石',
    '石川(弘南鉄道線)': '石川',
    '十川(青森県)': '十川',
    '縄文小ケ田': '縄文小ケ田',
    '縄文小ヶ田': '縄文小ケ田',
    '鮎川(秋田県)': '鮎川',
    '黒沢(由利高原鉄道線)': '黒沢',
    '久保田(秋田県)': '久保田',
    '宮内(山形県)': '宮内',
    '福島(福島県)': '福島',
    '大泉(福島県)': '大泉',
    '新田(福島県)': '新田',
    '梁川(福島県)': '梁川',
    '横倉(宮城県)': '横倉',
    '泉(福島交通線)': '泉',
    '平野(福島県)': '平野',
  },
  trainTypeMap: {
    '普通': 'regular',
    '各駅停車': 'regular',
    '快速ひなび': 'rapid',
    '快速': 'rapid',
    '特別快速': 'special_rapid',
    '特急': 'limited_exp',
  },
  preserveAllStopsTypes: ["regular","rapid","limited_exp"],
  defaultTrainType: 'regular',
  defaultCars: 2,
  buildStationTimetablesFromTrips: true,
  shouldExcludeTrip: (d) => /(12月1日|１２月１日).*運休|4月1日.*運転/.test(d.driveComment || ''),
  baseSectionSeconds: {
    "1": 70,
    "2": 90,
    "3": 70,
    "4": 106,
    "5": 70,
    "6": 83,
    "7": 134,
    "8": 80,
    "9": 110,
    "10": 108,
    "11": 70,
    "12": 103,
    "13": 76
},
};
