// JR花輪線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'jr_hanawa',
  name: 'JR花輪線',
  stationsFilePath: 'src/data/lines/jr_hanawa/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_hanawa/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_hanawa/globalTimetable.json',
  },
  stations: [
    {
        "id": "HNW-01",
        "name": "盛岡",
        "yahooStationId": "20940",
        "inGroupId": null,
        "outGroupId": "381"
    },
    {
        "id": "HNW-02",
        "name": "青山",
        "yahooStationId": "29564",
        "inGroupId": null,
        "outGroupId": "381"
    },
    {
        "id": "HNW-03",
        "name": "厨川",
        "yahooStationId": "20850",
        "inGroupId": null,
        "outGroupId": "381"
    },
    {
        "id": "HNW-04",
        "name": "巣子",
        "yahooStationId": "29565",
        "inGroupId": null,
        "outGroupId": "381"
    },
    {
        "id": "HNW-05",
        "name": "滝沢",
        "yahooStationId": "20881",
        "inGroupId": null,
        "outGroupId": "381"
    },
    {
        "id": "HNW-06",
        "name": "渋民",
        "yahooStationId": "20868",
        "inGroupId": null,
        "outGroupId": "381"
    },
    {
        "id": "HNW-07",
        "name": "好摩",
        "yahooStationId": "20855",
        "inGroupId": null,
        "outGroupId": "381"
    },
    {
        "id": "HNW-08",
        "name": "東大更",
        "yahooStationId": "20912",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-09",
        "name": "大更",
        "yahooStationId": "20828",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-10",
        "name": "平館",
        "yahooStationId": "20880",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-11",
        "name": "北森",
        "yahooStationId": "20845",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-12",
        "name": "松尾八幡平",
        "yahooStationId": "20930",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-13",
        "name": "安比高原",
        "yahooStationId": "20794",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-14",
        "name": "赤坂田",
        "yahooStationId": "20796",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-15",
        "name": "小屋の畑",
        "yahooStationId": "20860",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-16",
        "name": "荒屋新町",
        "yahooStationId": "20803",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-17",
        "name": "横間",
        "yahooStationId": "20950",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-18",
        "name": "田山",
        "yahooStationId": "20887",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-19",
        "name": "兄畑",
        "yahooStationId": "20801",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-20",
        "name": "湯瀬温泉",
        "yahooStationId": "21268",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-21",
        "name": "八幡平",
        "yahooStationId": "21239",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-22",
        "name": "陸中大里",
        "yahooStationId": "21274",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-23",
        "name": "鹿角花輪",
        "yahooStationId": "21275",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-24",
        "name": "柴平",
        "yahooStationId": "21207",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-25",
        "name": "十和田南",
        "yahooStationId": "21230",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-26",
        "name": "末広",
        "yahooStationId": "21217",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-27",
        "name": "土深井",
        "yahooStationId": "21231",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-28",
        "name": "沢尻",
        "yahooStationId": "21204",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-29",
        "name": "十二所",
        "yahooStationId": "21212",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-30",
        "name": "大滝温泉",
        "yahooStationId": "21164",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-31",
        "name": "扇田",
        "yahooStationId": "21162",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-32",
        "name": "東大館",
        "yahooStationId": "21243",
        "inGroupId": "380",
        "outGroupId": "381"
    },
    {
        "id": "HNW-33",
        "name": "大館",
        "yahooStationId": "21165",
        "inGroupId": "380",
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
    "1": 270,
    "2": 196,
    "3": 380,
    "4": 162,
    "5": 356,
    "6": 384,
    "7": 403,
    "8": 330,
    "9": 385,
    "10": 108,
    "11": 230,
    "12": 587,
    "13": 411,
    "14": 293,
    "15": 319,
    "16": 217,
    "17": 725,
    "18": 556,
    "19": 324,
    "20": 353,
    "21": 164,
    "22": 288,
    "23": 388,
    "24": 270,
    "25": 368,
    "26": 193,
    "27": 171,
    "28": 248,
    "29": 201,
    "30": 528,
    "31": 377,
    "32": 302
},
};
