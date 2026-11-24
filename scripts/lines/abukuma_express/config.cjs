// 阿武隈急行線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'abukuma_express',
  name: '阿武隈急行線',
  stationsFilePath: 'src/data/lines/abukuma_express/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/abukuma_express/stationTimetables.json',
    globalTimetable: 'src/data/lines/abukuma_express/globalTimetable.json',
  },
  stations: [
    {
        "id": "ABK-01",
        "name": "福島",
        "yahooStationId": "21551",
        "inGroupId": null,
        "outGroupId": "4621"
    },
    {
        "id": "ABK-02",
        "name": "卸町",
        "yahooStationId": "21461",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-03",
        "name": "福島学院前",
        "yahooStationId": "29308",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-04",
        "name": "瀬上",
        "yahooStationId": "21502",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-05",
        "name": "向瀬上",
        "yahooStationId": "21562",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-06",
        "name": "高子",
        "yahooStationId": "21505",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-07",
        "name": "上保原",
        "yahooStationId": "21469",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-08",
        "name": "保原",
        "yahooStationId": "21556",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-09",
        "name": "大泉",
        "yahooStationId": "21450",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-10",
        "name": "二井田",
        "yahooStationId": "21529",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-11",
        "name": "新田",
        "yahooStationId": "21527",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-12",
        "name": "梁川",
        "yahooStationId": "21569",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-13",
        "name": "やながわ希望の森公園前",
        "yahooStationId": "21479",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-14",
        "name": "富野",
        "yahooStationId": "21517",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-15",
        "name": "兜",
        "yahooStationId": "21467",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-16",
        "name": "あぶくま",
        "yahooStationId": "20974",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-17",
        "name": "丸森",
        "yahooStationId": "21096",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-18",
        "name": "北丸森",
        "yahooStationId": "21011",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-19",
        "name": "南角田",
        "yahooStationId": "21099",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-20",
        "name": "角田",
        "yahooStationId": "20998",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-21",
        "name": "横倉",
        "yahooStationId": "21109",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-22",
        "name": "岡",
        "yahooStationId": "20994",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-23",
        "name": "東船岡",
        "yahooStationId": "21081",
        "inGroupId": "4620",
        "outGroupId": "4621"
    },
    {
        "id": "ABK-24",
        "name": "槻木",
        "yahooStationId": "21053",
        "inGroupId": "4620",
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
    "1": 463,
    "2": 75,
    "3": 73,
    "4": 92,
    "5": 125,
    "6": 115,
    "7": 107,
    "8": 90,
    "9": 121,
    "10": 127,
    "11": 104,
    "12": 138,
    "13": 176,
    "14": 258,
    "15": 339,
    "16": 661,
    "17": 138,
    "18": 201,
    "19": 133,
    "20": 160,
    "21": 206,
    "22": 294,
    "23": 296
},
};
