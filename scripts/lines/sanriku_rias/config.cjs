// 三陸鉄道リアス線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'sanriku_rias',
  name: '三陸鉄道リアス線',
  stationsFilePath: 'src/data/lines/sanriku_rias/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/sanriku_rias/stationTimetables.json',
    globalTimetable: 'src/data/lines/sanriku_rias/globalTimetable.json',
  },
  stations: [
    {
        "id": "SNR-01",
        "name": "盛",
        "yahooStationId": "20861",
        "inGroupId": null,
        "outGroupId": "8111"
    },
    {
        "id": "SNR-02",
        "name": "陸前赤崎",
        "yahooStationId": "20954",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-03",
        "name": "綾里",
        "yahooStationId": "20953",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-04",
        "name": "恋し浜",
        "yahooStationId": "20853",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-05",
        "name": "甫嶺",
        "yahooStationId": "20926",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-06",
        "name": "三陸",
        "yahooStationId": "20864",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-07",
        "name": "吉浜",
        "yahooStationId": "20951",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-08",
        "name": "唐丹",
        "yahooStationId": "20891",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-09",
        "name": "平田",
        "yahooStationId": "20922",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-10",
        "name": "釜石",
        "yahooStationId": "20839",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-11",
        "name": "両石",
        "yahooStationId": "20952",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-12",
        "name": "鵜住居",
        "yahooStationId": "20822",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-13",
        "name": "大槌",
        "yahooStationId": "20826",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-14",
        "name": "吉里吉里",
        "yahooStationId": "20846",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-15",
        "name": "浪板海岸",
        "yahooStationId": "20897",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-16",
        "name": "岩手船越",
        "yahooStationId": "20817",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-17",
        "name": "織笠",
        "yahooStationId": "20834",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-18",
        "name": "陸中山田",
        "yahooStationId": "20967",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-19",
        "name": "豊間根",
        "yahooStationId": "20894",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-20",
        "name": "払川",
        "yahooStationId": "29796",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-21",
        "name": "津軽石",
        "yahooStationId": "20889",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-22",
        "name": "八木沢・宮古短大",
        "yahooStationId": "29797",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-23",
        "name": "磯鶏",
        "yahooStationId": "20879",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-24",
        "name": "宮古",
        "yahooStationId": "20936",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-25",
        "name": "山口団地",
        "yahooStationId": "29688",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-26",
        "name": "一の渡",
        "yahooStationId": "20808",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-27",
        "name": "佐羽根",
        "yahooStationId": "20862",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-28",
        "name": "田老",
        "yahooStationId": "20888",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-29",
        "name": "新田老",
        "yahooStationId": "29798",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-30",
        "name": "摂待",
        "yahooStationId": "20875",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-31",
        "name": "岩泉小本",
        "yahooStationId": "20832",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-32",
        "name": "島越",
        "yahooStationId": "20869",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-33",
        "name": "田野畑",
        "yahooStationId": "20885",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-34",
        "name": "普代",
        "yahooStationId": "20920",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-35",
        "name": "白井海岸",
        "yahooStationId": "20872",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-36",
        "name": "堀内",
        "yahooStationId": "20925",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-37",
        "name": "野田玉川",
        "yahooStationId": "20903",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-38",
        "name": "十府ケ浦海岸",
        "yahooStationId": "29781",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-39",
        "name": "陸中野田",
        "yahooStationId": "20964",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-40",
        "name": "陸中宇部",
        "yahooStationId": "20957",
        "inGroupId": "8110",
        "outGroupId": "8111"
    },
    {
        "id": "SNR-41",
        "name": "久慈",
        "yahooStationId": "20849",
        "inGroupId": "8110",
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
    "1": 304,
    "2": 431,
    "3": 241,
    "4": 188,
    "5": 219,
    "6": 370,
    "7": 509,
    "8": 440,
    "9": 292,
    "10": 487,
    "11": 186,
    "12": 315,
    "13": 288,
    "14": 147,
    "15": 525,
    "16": 304,
    "17": 103,
    "18": 909,
    "19": 336,
    "20": 166,
    "21": 445,
    "22": 147,
    "23": 156,
    "24": 136,
    "25": 380,
    "26": 233,
    "27": 296,
    "28": 70,
    "29": 677,
    "30": 302,
    "31": 681,
    "32": 173,
    "33": 764,
    "34": 280,
    "35": 246,
    "36": 373,
    "37": 133,
    "38": 192,
    "39": 276,
    "40": 624
},
};
