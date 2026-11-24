// 秋田内陸縦貫鉄道秋田内陸線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'akita_nairiku',
  name: '秋田内陸縦貫鉄道秋田内陸線',
  stationsFilePath: 'src/data/lines/akita_nairiku/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/akita_nairiku/stationTimetables.json',
    globalTimetable: 'src/data/lines/akita_nairiku/globalTimetable.json',
  },
  stations: [
    {
        "id": "ANR-01",
        "name": "鷹巣",
        "yahooStationId": "21219",
        "inGroupId": null,
        "outGroupId": "4591"
    },
    {
        "id": "ANR-02",
        "name": "西鷹巣",
        "yahooStationId": "21233",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-03",
        "name": "縄文小ケ田",
        "yahooStationId": "21171",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-04",
        "name": "大野台",
        "yahooStationId": "21166",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-05",
        "name": "合川",
        "yahooStationId": "21135",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-06",
        "name": "上杉",
        "yahooStationId": "21179",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-07",
        "name": "米内沢",
        "yahooStationId": "21273",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-08",
        "name": "桂瀬",
        "yahooStationId": "21175",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-09",
        "name": "阿仁前田温泉",
        "yahooStationId": "21140",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-10",
        "name": "前田南",
        "yahooStationId": "21252",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-11",
        "name": "小渕",
        "yahooStationId": "21197",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-12",
        "name": "阿仁合",
        "yahooStationId": "21139",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-13",
        "name": "荒瀬",
        "yahooStationId": "21143",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-14",
        "name": "萱草",
        "yahooStationId": "21184",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-15",
        "name": "笑内",
        "yahooStationId": "21169",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-16",
        "name": "岩野目",
        "yahooStationId": "21147",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-17",
        "name": "比立内",
        "yahooStationId": "21246",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-18",
        "name": "奥阿仁",
        "yahooStationId": "21172",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-19",
        "name": "阿仁マタギ",
        "yahooStationId": "21141",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-20",
        "name": "戸沢",
        "yahooStationId": "21227",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-21",
        "name": "上桧木内",
        "yahooStationId": "21181",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-22",
        "name": "左通",
        "yahooStationId": "21203",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-23",
        "name": "羽後中里",
        "yahooStationId": "21156",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-24",
        "name": "松葉",
        "yahooStationId": "21255",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-25",
        "name": "羽後長戸呂",
        "yahooStationId": "21157",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-26",
        "name": "八津",
        "yahooStationId": "21263",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-27",
        "name": "西明寺",
        "yahooStationId": "21201",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-28",
        "name": "羽後太田",
        "yahooStationId": "21153",
        "inGroupId": "4590",
        "outGroupId": "4591"
    },
    {
        "id": "ANR-29",
        "name": "角館",
        "yahooStationId": "21174",
        "inGroupId": "4590",
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
    '急行もりよし': 'express',
    'もりよし': 'express',
    '急行': 'express',
    '快速ひなび': 'rapid',
    '快速': 'rapid',
    '特別快速': 'special_rapid',
    '特急': 'limited_exp',
  },
  preserveAllStopsTypes: ["regular","express","rapid","limited_exp"],
  defaultTrainType: 'regular',
  defaultCars: 1,
  baseSectionSeconds: {
    "1": 110,
    "2": 194,
    "3": 193,
    "4": 305,
    "5": 193,
    "6": 235,
    "7": 449,
    "8": 383,
    "9": 156,
    "10": 170,
    "11": 315,
    "12": 199,
    "13": 219,
    "14": 224,
    "15": 199,
    "16": 221,
    "17": 307,
    "18": 188,
    "19": 746,
    "20": 383,
    "21": 150,
    "22": 325,
    "23": 268,
    "24": 233,
    "25": 413,
    "26": 324,
    "27": 251,
    "28": 348
},
};
