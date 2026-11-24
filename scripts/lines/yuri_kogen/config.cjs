// 由利高原鉄道鳥海山ろく線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'yuri_kogen',
  name: '由利高原鉄道鳥海山ろく線',
  stationsFilePath: 'src/data/lines/yuri_kogen/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/yuri_kogen/stationTimetables.json',
    globalTimetable: 'src/data/lines/yuri_kogen/globalTimetable.json',
  },
  stations: [
    {
        "id": "YRK-01",
        "name": "羽後本荘",
        "yahooStationId": "21159",
        "inGroupId": null,
        "outGroupId": "4601"
    },
    {
        "id": "YRK-02",
        "name": "薬師堂",
        "yahooStationId": "21261",
        "inGroupId": "4600",
        "outGroupId": "4601"
    },
    {
        "id": "YRK-03",
        "name": "子吉",
        "yahooStationId": "21199",
        "inGroupId": "4600",
        "outGroupId": "4601"
    },
    {
        "id": "YRK-04",
        "name": "鮎川",
        "yahooStationId": "21142",
        "inGroupId": "4600",
        "outGroupId": "4601"
    },
    {
        "id": "YRK-05",
        "name": "黒沢",
        "yahooStationId": "21193",
        "inGroupId": "4600",
        "outGroupId": "4601"
    },
    {
        "id": "YRK-06",
        "name": "曲沢",
        "yahooStationId": "21254",
        "inGroupId": "4600",
        "outGroupId": "4601"
    },
    {
        "id": "YRK-07",
        "name": "前郷",
        "yahooStationId": "21251",
        "inGroupId": "4600",
        "outGroupId": "4601"
    },
    {
        "id": "YRK-08",
        "name": "久保田",
        "yahooStationId": "21191",
        "inGroupId": "4600",
        "outGroupId": "4601"
    },
    {
        "id": "YRK-09",
        "name": "西滝沢",
        "yahooStationId": "21234",
        "inGroupId": "4600",
        "outGroupId": "4601"
    },
    {
        "id": "YRK-10",
        "name": "吉沢",
        "yahooStationId": "21271",
        "inGroupId": "4600",
        "outGroupId": "4601"
    },
    {
        "id": "YRK-11",
        "name": "川辺",
        "yahooStationId": "21186",
        "inGroupId": "4600",
        "outGroupId": "4601"
    },
    {
        "id": "YRK-12",
        "name": "矢島",
        "yahooStationId": "21262",
        "inGroupId": "4600",
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
    "1": 181,
    "2": 186,
    "3": 240,
    "4": 173,
    "5": 70,
    "6": 114,
    "7": 157,
    "8": 172,
    "9": 108,
    "10": 246,
    "11": 240
},
};
