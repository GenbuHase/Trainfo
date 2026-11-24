// 弘南鉄道弘南線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'konan_konan',
  name: '弘南鉄道弘南線',
  stationsFilePath: 'src/data/lines/konan_konan/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/konan_konan/stationTimetables.json',
    globalTimetable: 'src/data/lines/konan_konan/globalTimetable.json',
  },
  stations: [
    {
        "id": "KNN-01",
        "name": "弘前",
        "yahooStationId": "20758",
        "inGroupId": null,
        "outGroupId": "4521"
    },
    {
        "id": "KNN-02",
        "name": "弘前東高前",
        "yahooStationId": "20753",
        "inGroupId": "4520",
        "outGroupId": "4521"
    },
    {
        "id": "KNN-03",
        "name": "運動公園前",
        "yahooStationId": "20636",
        "inGroupId": "4520",
        "outGroupId": "4521"
    },
    {
        "id": "KNN-04",
        "name": "新里",
        "yahooStationId": "20742",
        "inGroupId": "4520",
        "outGroupId": "4521"
    },
    {
        "id": "KNN-05",
        "name": "館田",
        "yahooStationId": "20705",
        "inGroupId": "4520",
        "outGroupId": "4521"
    },
    {
        "id": "KNN-06",
        "name": "平賀",
        "yahooStationId": "20756",
        "inGroupId": "4520",
        "outGroupId": "4521"
    },
    {
        "id": "KNN-07",
        "name": "柏農高校前",
        "yahooStationId": "20748",
        "inGroupId": "4520",
        "outGroupId": "4521"
    },
    {
        "id": "KNN-08",
        "name": "津軽尾上",
        "yahooStationId": "20716",
        "inGroupId": "4520",
        "outGroupId": "4521"
    },
    {
        "id": "KNN-09",
        "name": "尾上高校前",
        "yahooStationId": "29266",
        "inGroupId": "4520",
        "outGroupId": "4521"
    },
    {
        "id": "KNN-10",
        "name": "田んぼアート",
        "yahooStationId": "29719",
        "inGroupId": "4520",
        "outGroupId": "4521"
    },
    {
        "id": "KNN-11",
        "name": "田舎館",
        "yahooStationId": "20632",
        "inGroupId": "4520",
        "outGroupId": "4521"
    },
    {
        "id": "KNN-12",
        "name": "境松",
        "yahooStationId": "20685",
        "inGroupId": "4520",
        "outGroupId": "4521"
    },
    {
        "id": "KNN-13",
        "name": "黒石",
        "yahooStationId": "20673",
        "inGroupId": "4520",
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
    "2": 107,
    "3": 118,
    "4": 126,
    "5": 191,
    "6": 165,
    "7": 137,
    "8": 104,
    "9": 70,
    "10": 70,
    "11": 118,
    "12": 119
},
};
