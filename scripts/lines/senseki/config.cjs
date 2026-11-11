// JR仙石線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'senseki',
  name: 'JR仙石線',
  stationsFilePath: 'src/data/lines/senseki/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/senseki/stationTimetables.json',
    globalTimetable: 'src/data/lines/senseki/globalTimetable.json',
  },
  stations: [
    {
        "id": "SS-01",
        "name": "あおば通",
        "yahooStationId": "29311",
        "inGroupId": null,
        "outGroupId": "551"
    },
    {
        "id": "SS-02",
        "name": "仙台",
        "yahooStationId": "21044",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-03",
        "name": "榴ケ岡",
        "yahooStationId": "21055",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-04",
        "name": "宮城野原",
        "yahooStationId": "21102",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-05",
        "name": "陸前原ノ町",
        "yahooStationId": "21124",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-06",
        "name": "苦竹",
        "yahooStationId": "21069",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-07",
        "name": "小鶴新田",
        "yahooStationId": "29485",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-08",
        "name": "福田町",
        "yahooStationId": "21084",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-09",
        "name": "陸前高砂",
        "yahooStationId": "21118",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-10",
        "name": "中野栄",
        "yahooStationId": "21061",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-11",
        "name": "多賀城",
        "yahooStationId": "21048",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-12",
        "name": "下馬",
        "yahooStationId": "21023",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-13",
        "name": "西塩釜",
        "yahooStationId": "21071",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-14",
        "name": "本塩釜",
        "yahooStationId": "21090",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-15",
        "name": "東塩釜",
        "yahooStationId": "21077",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-16",
        "name": "陸前浜田",
        "yahooStationId": "21123",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-17",
        "name": "松島海岸",
        "yahooStationId": "21094",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-18",
        "name": "高城町",
        "yahooStationId": "21047",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-19",
        "name": "手樽",
        "yahooStationId": "21056",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-20",
        "name": "陸前富山",
        "yahooStationId": "21120",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-21",
        "name": "陸前大塚",
        "yahooStationId": "21112",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-22",
        "name": "東名",
        "yahooStationId": "21058",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-23",
        "name": "野蒜",
        "yahooStationId": "21074",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-24",
        "name": "陸前小野",
        "yahooStationId": "21114",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-25",
        "name": "鹿妻",
        "yahooStationId": "21001",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-26",
        "name": "矢本",
        "yahooStationId": "21108",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-27",
        "name": "東矢本",
        "yahooStationId": "21082",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-28",
        "name": "陸前赤井",
        "yahooStationId": "21110",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-29",
        "name": "石巻あゆみ野",
        "yahooStationId": "29773",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-30",
        "name": "蛇田",
        "yahooStationId": "21088",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-31",
        "name": "陸前山下",
        "yahooStationId": "21127",
        "inGroupId": "550",
        "outGroupId": "551"
    },
    {
        "id": "SS-32",
        "name": "石巻",
        "yahooStationId": "20980",
        "inGroupId": "550",
        "outGroupId": null
    }
],
  stationNameAliases: {
    '榴ヶ岡': '榴ケ岡',
    '北浦(宮城県)': '北浦',
    '升形(山形県)': '升形',
  },
  trainTypeMap: {
    '普通': 'regular',
    '各駅停車': 'regular',
    '特別快速': 'special_rapid',
    '快速おもいで湯けむり': 'rapid',
    '快速湯けむり': 'rapid',
    '快速風っこ女川シーパル号': 'rapid',
    '快速最上川': 'rapid',
    '最上川': 'rapid',
    '快速': 'rapid',
    '代行バス': 'substitution_bus',
    '特急': 'limitedExp',
  },
  preserveAllStopsTypes: ['regular', 'rapid', 'special_rapid', 'limitedExp'],
  defaultTrainType: 'regular',
  defaultCars: 4,
  baseSectionSeconds: {
    "1": 90,
    "2": 90,
    "3": 90,
    "4": 90,
    "5": 90,
    "6": 114,
    "7": 153,
    "8": 90,
    "9": 124,
    "10": 167,
    "11": 130,
    "12": 90,
    "13": 90,
    "14": 90,
    "15": 221,
    "16": 180,
    "17": 154,
    "18": 133,
    "19": 95,
    "20": 154,
    "21": 102,
    "22": 91,
    "23": 180,
    "24": 119,
    "25": 192,
    "26": 107,
    "27": 110,
    "28": 137,
    "29": 120,
    "30": 90,
    "31": 105
},
};
