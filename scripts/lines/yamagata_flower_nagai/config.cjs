// 山形鉄道フラワー長井線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'yamagata_flower_nagai',
  name: '山形鉄道フラワー長井線',
  stationsFilePath: 'src/data/lines/yamagata_flower_nagai/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/yamagata_flower_nagai/stationTimetables.json',
    globalTimetable: 'src/data/lines/yamagata_flower_nagai/globalTimetable.json',
  },
  stations: [
    {
        "id": "YFN-01",
        "name": "赤湯",
        "yahooStationId": "21278",
        "inGroupId": null,
        "outGroupId": "4611"
    },
    {
        "id": "YFN-02",
        "name": "南陽市役所",
        "yahooStationId": "21362",
        "inGroupId": "4610",
        "outGroupId": "4611"
    },
    {
        "id": "YFN-03",
        "name": "宮内",
        "yahooStationId": "21388",
        "inGroupId": "4610",
        "outGroupId": "4611"
    },
    {
        "id": "YFN-04",
        "name": "おりはた",
        "yahooStationId": "21317",
        "inGroupId": "4610",
        "outGroupId": "4611"
    },
    {
        "id": "YFN-05",
        "name": "梨郷",
        "yahooStationId": "21397",
        "inGroupId": "4610",
        "outGroupId": "4611"
    },
    {
        "id": "YFN-06",
        "name": "西大塚",
        "yahooStationId": "21363",
        "inGroupId": "4610",
        "outGroupId": "4611"
    },
    {
        "id": "YFN-07",
        "name": "今泉",
        "yahooStationId": "21289",
        "inGroupId": "4610",
        "outGroupId": "4611"
    },
    {
        "id": "YFN-08",
        "name": "時庭",
        "yahooStationId": "21357",
        "inGroupId": "4610",
        "outGroupId": "4611"
    },
    {
        "id": "YFN-09",
        "name": "南長井",
        "yahooStationId": "21385",
        "inGroupId": "4610",
        "outGroupId": "4611"
    },
    {
        "id": "YFN-10",
        "name": "長井",
        "yahooStationId": "21359",
        "inGroupId": "4610",
        "outGroupId": "4611"
    },
    {
        "id": "YFN-11",
        "name": "あやめ公園",
        "yahooStationId": "29431",
        "inGroupId": "4610",
        "outGroupId": "4611"
    },
    {
        "id": "YFN-12",
        "name": "羽前成田",
        "yahooStationId": "21303",
        "inGroupId": "4610",
        "outGroupId": "4611"
    },
    {
        "id": "YFN-13",
        "name": "白兎",
        "yahooStationId": "21337",
        "inGroupId": "4610",
        "outGroupId": "4611"
    },
    {
        "id": "YFN-14",
        "name": "蚕桑",
        "yahooStationId": "21327",
        "inGroupId": "4610",
        "outGroupId": "4611"
    },
    {
        "id": "YFN-15",
        "name": "鮎貝",
        "yahooStationId": "21283",
        "inGroupId": "4610",
        "outGroupId": "4611"
    },
    {
        "id": "YFN-16",
        "name": "四季の郷",
        "yahooStationId": "29597",
        "inGroupId": "4610",
        "outGroupId": "4611"
    },
    {
        "id": "YFN-17",
        "name": "荒砥",
        "yahooStationId": "21284",
        "inGroupId": "4610",
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
  defaultCars: 1,
  baseSectionSeconds: {
    "1": 71,
    "2": 179,
    "3": 110,
    "4": 196,
    "5": 284,
    "6": 159,
    "7": 219,
    "8": 192,
    "9": 83,
    "10": 70,
    "11": 157,
    "12": 179,
    "13": 110,
    "14": 270,
    "15": 70,
    "16": 160
},
};
