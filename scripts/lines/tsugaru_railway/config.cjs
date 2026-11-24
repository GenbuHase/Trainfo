// 津軽鉄道線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'tsugaru_railway',
  name: '津軽鉄道線',
  stationsFilePath: 'src/data/lines/tsugaru_railway/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tsugaru_railway/stationTimetables.json',
    globalTimetable: 'src/data/lines/tsugaru_railway/globalTimetable.json',
  },
  stations: [
    {
        "id": "TRL-01",
        "name": "津軽五所川原",
        "yahooStationId": "20717",
        "inGroupId": null,
        "outGroupId": "4501"
    },
    {
        "id": "TRL-02",
        "name": "十川",
        "yahooStationId": "20729",
        "inGroupId": "4500",
        "outGroupId": "4501"
    },
    {
        "id": "TRL-03",
        "name": "五農校前",
        "yahooStationId": "20684",
        "inGroupId": "4500",
        "outGroupId": "4501"
    },
    {
        "id": "TRL-04",
        "name": "津軽飯詰",
        "yahooStationId": "20713",
        "inGroupId": "4500",
        "outGroupId": "4501"
    },
    {
        "id": "TRL-05",
        "name": "毘沙門",
        "yahooStationId": "20760",
        "inGroupId": "4500",
        "outGroupId": "4501"
    },
    {
        "id": "TRL-06",
        "name": "嘉瀬",
        "yahooStationId": "20654",
        "inGroupId": "4500",
        "outGroupId": "4501"
    },
    {
        "id": "TRL-07",
        "name": "金木",
        "yahooStationId": "20656",
        "inGroupId": "4500",
        "outGroupId": "4501"
    },
    {
        "id": "TRL-08",
        "name": "芦野公園",
        "yahooStationId": "20623",
        "inGroupId": "4500",
        "outGroupId": "4501"
    },
    {
        "id": "TRL-09",
        "name": "川倉",
        "yahooStationId": "20663",
        "inGroupId": "4500",
        "outGroupId": "4501"
    },
    {
        "id": "TRL-10",
        "name": "大沢内",
        "yahooStationId": "20642",
        "inGroupId": "4500",
        "outGroupId": "4501"
    },
    {
        "id": "TRL-11",
        "name": "深郷田",
        "yahooStationId": "20763",
        "inGroupId": "4500",
        "outGroupId": "4501"
    },
    {
        "id": "TRL-12",
        "name": "津軽中里",
        "yahooStationId": "20719",
        "inGroupId": "4500",
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
    '準急ストーブ列車': 'semi_exp',
    '準急 ストーブ列車': 'semi_exp',
    'ストーブ列車': 'semi_exp',
    '準急': 'semi_exp',
    '快速ひなび': 'rapid',
    '快速': 'rapid',
    '特別快速': 'special_rapid',
    '特急': 'limited_exp',
  },
  preserveAllStopsTypes: ["regular","semi_exp","rapid","limited_exp"],
  defaultTrainType: 'regular',
  defaultCars: 1,
  buildStationTimetablesFromTrips: true,
  shouldExcludeTrip: (d) => /(12月1日|１２月１日).*運休|4月1日.*運転/.test(d.driveComment || ''),
  baseSectionSeconds: {
    "1": 95,
    "2": 158,
    "3": 77,
    "4": 263,
    "5": 220,
    "6": 223,
    "7": 118,
    "8": 145,
    "9": 135,
    "10": 110,
    "11": 131
},
};
