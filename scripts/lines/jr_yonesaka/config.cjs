// JR米坂線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'jr_yonesaka',
  name: 'JR米坂線',
  stationsFilePath: 'src/data/lines/jr_yonesaka/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_yonesaka/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_yonesaka/globalTimetable.json',
  },
  stations: [
    {
        "id": "YN-01",
        "name": "米沢",
        "yahooStationId": "21396",
        "inGroupId": null,
        "outGroupId": "641"
    },
    {
        "id": "YN-02",
        "name": "南米沢",
        "yahooStationId": "21387",
        "inGroupId": "640",
        "outGroupId": "641"
    },
    {
        "id": "YN-03",
        "name": "西米沢",
        "yahooStationId": "21366",
        "inGroupId": "640",
        "outGroupId": "641"
    },
    {
        "id": "YN-04",
        "name": "成島",
        "yahooStationId": "21361",
        "inGroupId": "640",
        "outGroupId": "641"
    },
    {
        "id": "YN-05",
        "name": "中郡",
        "yahooStationId": "21351",
        "inGroupId": "640",
        "outGroupId": "641"
    },
    {
        "id": "YN-06",
        "name": "羽前小松",
        "yahooStationId": "21295",
        "inGroupId": "640",
        "outGroupId": "641"
    },
    {
        "id": "YN-07",
        "name": "犬川",
        "yahooStationId": "21288",
        "inGroupId": "640",
        "outGroupId": "641"
    },
    {
        "id": "YN-08",
        "name": "今泉",
        "yahooStationId": "21289",
        "inGroupId": "640",
        "outGroupId": "641"
    },
    {
        "id": "YN-09",
        "name": "萩生",
        "yahooStationId": "21369",
        "inGroupId": "640",
        "outGroupId": "641"
    },
    {
        "id": "YN-10",
        "name": "羽前椿",
        "yahooStationId": "21299",
        "inGroupId": "640",
        "outGroupId": "641"
    },
    {
        "id": "YN-11",
        "name": "手ノ子",
        "yahooStationId": "21354",
        "inGroupId": "640",
        "outGroupId": "641"
    },
    {
        "id": "YN-12",
        "name": "羽前沼沢",
        "yahooStationId": "21304",
        "inGroupId": "640",
        "outGroupId": "641"
    },
    {
        "id": "YN-13",
        "name": "伊佐領",
        "yahooStationId": "21285",
        "inGroupId": "640",
        "outGroupId": "641"
    },
    {
        "id": "YN-14",
        "name": "羽前松岡",
        "yahooStationId": "21305",
        "inGroupId": "640",
        "outGroupId": "641"
    },
    {
        "id": "YN-15",
        "name": "小国",
        "yahooStationId": "21315",
        "inGroupId": "640",
        "outGroupId": "641"
    },
    {
        "id": "YN-16",
        "name": "越後金丸",
        "yahooStationId": "23922",
        "inGroupId": "640",
        "outGroupId": "641"
    },
    {
        "id": "YN-17",
        "name": "越後片貝",
        "yahooStationId": "23921",
        "inGroupId": "640",
        "outGroupId": "641"
    },
    {
        "id": "YN-18",
        "name": "越後下関",
        "yahooStationId": "23926",
        "inGroupId": "640",
        "outGroupId": "641"
    },
    {
        "id": "YN-19",
        "name": "越後大島",
        "yahooStationId": "23919",
        "inGroupId": "640",
        "outGroupId": "641"
    },
    {
        "id": "YN-20",
        "name": "坂町",
        "yahooStationId": "23989",
        "inGroupId": "640",
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
    '代行バス': 'substitution_bus',
    '快速ひなび': 'rapid',
    '快速': 'rapid',
    '特別快速': 'special_rapid',
    '特急': 'limited_exp',
  },
  preserveAllStopsTypes: ["regular","substitution_bus","rapid","limited_exp"],
  defaultTrainType: 'regular',
  defaultCars: 2,
  baseSectionSeconds: {
    "1": 243,
    "2": 283,
    "3": 254,
    "4": 242,
    "5": 358,
    "6": 202,
    "7": 296,
    "8": 349,
    "9": 227,
    "10": 378,
    "11": 754,
    "12": 493,
    "13": 383,
    "14": 302,
    "15": 771,
    "16": 437,
    "17": 539,
    "18": 312,
    "19": 579
},
};
