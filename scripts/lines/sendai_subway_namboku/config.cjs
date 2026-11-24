// 仙台市地下鉄南北線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'sendai_subway_namboku',
  name: '仙台市地下鉄南北線',
  stationsFilePath: 'src/data/lines/sendai_subway_namboku/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/sendai_subway_namboku/stationTimetables.json',
    globalTimetable: 'src/data/lines/sendai_subway_namboku/globalTimetable.json',
  },
  stations: [
    {
        "id": "SNB-01",
        "name": "泉中央",
        "yahooStationId": "20981",
        "inGroupId": null,
        "outGroupId": "4561"
    },
    {
        "id": "SNB-02",
        "name": "八乙女",
        "yahooStationId": "21104",
        "inGroupId": "4560",
        "outGroupId": "4561"
    },
    {
        "id": "SNB-03",
        "name": "黒松",
        "yahooStationId": "21021",
        "inGroupId": "4560",
        "outGroupId": "4561"
    },
    {
        "id": "SNB-04",
        "name": "旭ケ丘",
        "yahooStationId": "20971",
        "inGroupId": "4560",
        "outGroupId": "4561"
    },
    {
        "id": "SNB-05",
        "name": "台原",
        "yahooStationId": "21051",
        "inGroupId": "4560",
        "outGroupId": "4561"
    },
    {
        "id": "SNB-06",
        "name": "北仙台",
        "yahooStationId": "21010",
        "inGroupId": "4560",
        "outGroupId": "4561"
    },
    {
        "id": "SNB-07",
        "name": "北四番丁",
        "yahooStationId": "21013",
        "inGroupId": "4560",
        "outGroupId": "4561"
    },
    {
        "id": "SNB-08",
        "name": "勾当台公園",
        "yahooStationId": "21024",
        "inGroupId": "4560",
        "outGroupId": "4561"
    },
    {
        "id": "SNB-09",
        "name": "広瀬通",
        "yahooStationId": "21083",
        "inGroupId": "4560",
        "outGroupId": "4561"
    },
    {
        "id": "SNB-10",
        "name": "仙台",
        "yahooStationId": "29312",
        "inGroupId": "4560",
        "outGroupId": "4561"
    },
    {
        "id": "SNB-11",
        "name": "五橋",
        "yahooStationId": "20982",
        "inGroupId": "4560",
        "outGroupId": "4561"
    },
    {
        "id": "SNB-12",
        "name": "愛宕橋",
        "yahooStationId": "20973",
        "inGroupId": "4560",
        "outGroupId": "4561"
    },
    {
        "id": "SNB-13",
        "name": "河原町",
        "yahooStationId": "21007",
        "inGroupId": "4560",
        "outGroupId": "4561"
    },
    {
        "id": "SNB-14",
        "name": "長町一丁目",
        "yahooStationId": "21064",
        "inGroupId": "4560",
        "outGroupId": "4561"
    },
    {
        "id": "SNB-15",
        "name": "長町",
        "yahooStationId": "21063",
        "inGroupId": "4560",
        "outGroupId": "4561"
    },
    {
        "id": "SNB-16",
        "name": "長町南",
        "yahooStationId": "21065",
        "inGroupId": "4560",
        "outGroupId": "4561"
    },
    {
        "id": "SNB-17",
        "name": "富沢",
        "yahooStationId": "21059",
        "inGroupId": "4560",
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
    "1": 119,
    "2": 129,
    "3": 86,
    "4": 98,
    "5": 107,
    "6": 120,
    "7": 70,
    "8": 70,
    "9": 70,
    "10": 92,
    "11": 70,
    "12": 95,
    "13": 73,
    "14": 70,
    "15": 91,
    "16": 149
},
};
