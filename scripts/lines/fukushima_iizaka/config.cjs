// 福島交通飯坂線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'fukushima_iizaka',
  name: '福島交通飯坂線',
  stationsFilePath: 'src/data/lines/fukushima_iizaka/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/fukushima_iizaka/stationTimetables.json',
    globalTimetable: 'src/data/lines/fukushima_iizaka/globalTimetable.json',
  },
  stations: [
    {
        "id": "FIZ-01",
        "name": "福島",
        "yahooStationId": "21551",
        "inGroupId": null,
        "outGroupId": "4631"
    },
    {
        "id": "FIZ-02",
        "name": "曽根田",
        "yahooStationId": "21504",
        "inGroupId": "4630",
        "outGroupId": "4631"
    },
    {
        "id": "FIZ-03",
        "name": "美術館図書館前",
        "yahooStationId": "21550",
        "inGroupId": "4630",
        "outGroupId": "4631"
    },
    {
        "id": "FIZ-04",
        "name": "岩代清水",
        "yahooStationId": "21444",
        "inGroupId": "4630",
        "outGroupId": "4631"
    },
    {
        "id": "FIZ-05",
        "name": "泉",
        "yahooStationId": "21431",
        "inGroupId": "4630",
        "outGroupId": "4631"
    },
    {
        "id": "FIZ-06",
        "name": "上松川",
        "yahooStationId": "21470",
        "inGroupId": "4630",
        "outGroupId": "4631"
    },
    {
        "id": "FIZ-07",
        "name": "笹谷",
        "yahooStationId": "21489",
        "inGroupId": "4630",
        "outGroupId": "4631"
    },
    {
        "id": "FIZ-08",
        "name": "桜水",
        "yahooStationId": "21487",
        "inGroupId": "4630",
        "outGroupId": "4631"
    },
    {
        "id": "FIZ-09",
        "name": "平野",
        "yahooStationId": "21546",
        "inGroupId": "4630",
        "outGroupId": "4631"
    },
    {
        "id": "FIZ-10",
        "name": "医王寺前",
        "yahooStationId": "21429",
        "inGroupId": "4630",
        "outGroupId": "4631"
    },
    {
        "id": "FIZ-11",
        "name": "花水坂",
        "yahooStationId": "21537",
        "inGroupId": "4630",
        "outGroupId": "4631"
    },
    {
        "id": "FIZ-12",
        "name": "飯坂温泉",
        "yahooStationId": "21428",
        "inGroupId": "4630",
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
  baseSectionSeconds: {
    "1": 70,
    "2": 70,
    "3": 104,
    "4": 70,
    "5": 70,
    "6": 70,
    "7": 77,
    "8": 87,
    "9": 103,
    "10": 107,
    "11": 70
},
};
