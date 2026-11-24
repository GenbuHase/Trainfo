// 仙台市地下鉄東西線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'sendai_subway_tozai',
  name: '仙台市地下鉄東西線',
  stationsFilePath: 'src/data/lines/sendai_subway_tozai/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/sendai_subway_tozai/stationTimetables.json',
    globalTimetable: 'src/data/lines/sendai_subway_tozai/globalTimetable.json',
  },
  stations: [
    {
        "id": "STZ-01",
        "name": "八木山動物公園",
        "yahooStationId": "29754",
        "inGroupId": null,
        "outGroupId": "4571"
    },
    {
        "id": "STZ-02",
        "name": "青葉山",
        "yahooStationId": "29755",
        "inGroupId": "4570",
        "outGroupId": "4571"
    },
    {
        "id": "STZ-03",
        "name": "川内",
        "yahooStationId": "29756",
        "inGroupId": "4570",
        "outGroupId": "4571"
    },
    {
        "id": "STZ-04",
        "name": "国際センター",
        "yahooStationId": "29757",
        "inGroupId": "4570",
        "outGroupId": "4571"
    },
    {
        "id": "STZ-05",
        "name": "大町西公園",
        "yahooStationId": "29758",
        "inGroupId": "4570",
        "outGroupId": "4571"
    },
    {
        "id": "STZ-06",
        "name": "青葉通一番町",
        "yahooStationId": "29759",
        "inGroupId": "4570",
        "outGroupId": "4571"
    },
    {
        "id": "STZ-07",
        "name": "仙台",
        "yahooStationId": "29312",
        "inGroupId": "4570",
        "outGroupId": "4571"
    },
    {
        "id": "STZ-08",
        "name": "宮城野通",
        "yahooStationId": "29760",
        "inGroupId": "4570",
        "outGroupId": "4571"
    },
    {
        "id": "STZ-09",
        "name": "連坊",
        "yahooStationId": "29761",
        "inGroupId": "4570",
        "outGroupId": "4571"
    },
    {
        "id": "STZ-10",
        "name": "薬師堂",
        "yahooStationId": "29762",
        "inGroupId": "4570",
        "outGroupId": "4571"
    },
    {
        "id": "STZ-11",
        "name": "卸町",
        "yahooStationId": "29763",
        "inGroupId": "4570",
        "outGroupId": "4571"
    },
    {
        "id": "STZ-12",
        "name": "六丁の目",
        "yahooStationId": "29764",
        "inGroupId": "4570",
        "outGroupId": "4571"
    },
    {
        "id": "STZ-13",
        "name": "荒井",
        "yahooStationId": "29765",
        "inGroupId": "4570",
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
    '普通': 'local',
    '各駅停車': 'local',
    '快速ひなび': 'rapid',
    '快速': 'rapid',
    '特別快速': 'special_rapid',
    '特急': 'limited_exp',
  },
  preserveAllStopsTypes: ["regular","local","rapid","limited_exp"],
  defaultTrainType: 'local',
  defaultCars: 4,
  baseSectionSeconds: {
    "1": 206,
    "2": 155,
    "3": 70,
    "4": 70,
    "5": 70,
    "6": 79,
    "7": 70,
    "8": 122,
    "9": 112,
    "10": 151,
    "11": 129,
    "12": 165
},
};
