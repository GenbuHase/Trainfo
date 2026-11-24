// JR左沢線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'jr_aterazawa',
  name: 'JR左沢線',
  stationsFilePath: 'src/data/lines/jr_aterazawa/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_aterazawa/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_aterazawa/globalTimetable.json',
  },
  stations: [
    {
        "id": "ATZ-01",
        "name": "山形",
        "yahooStationId": "21392",
        "inGroupId": null,
        "outGroupId": "571"
    },
    {
        "id": "ATZ-02",
        "name": "北山形",
        "yahooStationId": "21324",
        "inGroupId": null,
        "outGroupId": "571"
    },
    {
        "id": "ATZ-03",
        "name": "東金井",
        "yahooStationId": "21370",
        "inGroupId": "570",
        "outGroupId": "571"
    },
    {
        "id": "ATZ-04",
        "name": "羽前山辺",
        "yahooStationId": "21308",
        "inGroupId": "570",
        "outGroupId": "571"
    },
    {
        "id": "ATZ-05",
        "name": "羽前金沢",
        "yahooStationId": "21294",
        "inGroupId": "570",
        "outGroupId": "571"
    },
    {
        "id": "ATZ-06",
        "name": "羽前長崎",
        "yahooStationId": "21302",
        "inGroupId": "570",
        "outGroupId": "571"
    },
    {
        "id": "ATZ-07",
        "name": "南寒河江",
        "yahooStationId": "21381",
        "inGroupId": "570",
        "outGroupId": "571"
    },
    {
        "id": "ATZ-08",
        "name": "寒河江",
        "yahooStationId": "21331",
        "inGroupId": "570",
        "outGroupId": "571"
    },
    {
        "id": "ATZ-09",
        "name": "西寒河江",
        "yahooStationId": "21364",
        "inGroupId": "570",
        "outGroupId": "571"
    },
    {
        "id": "ATZ-10",
        "name": "羽前高松",
        "yahooStationId": "21297",
        "inGroupId": "570",
        "outGroupId": "571"
    },
    {
        "id": "ATZ-11",
        "name": "柴橋",
        "yahooStationId": "21336",
        "inGroupId": "570",
        "outGroupId": "571"
    },
    {
        "id": "ATZ-12",
        "name": "左沢",
        "yahooStationId": "21281",
        "inGroupId": "570",
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
    "1": 164,
    "2": 244,
    "3": 285,
    "4": 239,
    "5": 118,
    "6": 209,
    "7": 144,
    "8": 99,
    "9": 231,
    "10": 244,
    "11": 163
},
};
