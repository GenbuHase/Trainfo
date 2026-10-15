// JR両毛線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "ryomo",
  "name": "JR両毛線",
  "stationsFilePath": "src/data/lines/ryomo/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/ryomo/stationTimetables.json",
    "globalTimetable": "src/data/lines/ryomo/globalTimetable.json"
  },
  "stations": [
    {
      "id": "RY-01",
      "name": "小山",
      "yahooStationId": "21746",
      "inGroupId": null,
      "outGroupId": "811"
    },
    {
      "id": "RY-02",
      "name": "思川",
      "yahooStationId": "21744",
      "inGroupId": "810",
      "outGroupId": "811"
    },
    {
      "id": "RY-03",
      "name": "栃木",
      "yahooStationId": "21800",
      "inGroupId": "810",
      "outGroupId": "811"
    },
    {
      "id": "RY-04",
      "name": "大平下",
      "yahooStationId": "21740",
      "inGroupId": "810",
      "outGroupId": "811"
    },
    {
      "id": "RY-05",
      "name": "岩舟",
      "yahooStationId": "21734",
      "inGroupId": "810",
      "outGroupId": "811"
    },
    {
      "id": "RY-06",
      "name": "佐野",
      "yahooStationId": "21771",
      "inGroupId": "810",
      "outGroupId": "811"
    },
    {
      "id": "RY-07",
      "name": "富田",
      "yahooStationId": "21801",
      "inGroupId": "810",
      "outGroupId": "811"
    },
    {
      "id": "RY-08",
      "name": "あしかがフラワーパーク",
      "yahooStationId": "29791",
      "inGroupId": "810",
      "outGroupId": "811"
    },
    {
      "id": "RY-09",
      "name": "足利",
      "yahooStationId": "21727",
      "inGroupId": "810",
      "outGroupId": "811"
    },
    {
      "id": "RY-10",
      "name": "山前",
      "yahooStationId": "21835",
      "inGroupId": "810",
      "outGroupId": "811"
    },
    {
      "id": "RY-11",
      "name": "小俣",
      "yahooStationId": "21743",
      "inGroupId": "810",
      "outGroupId": "811"
    },
    {
      "id": "RY-12",
      "name": "桐生",
      "yahooStationId": "21874",
      "inGroupId": "810",
      "outGroupId": "811"
    },
    {
      "id": "RY-13",
      "name": "国定",
      "yahooStationId": "21875",
      "inGroupId": "810",
      "outGroupId": "811"
    },
    {
      "id": "RY-14",
      "name": "伊勢崎",
      "yahooStationId": "21845",
      "inGroupId": "810",
      "outGroupId": "811"
    },
    {
      "id": "RY-15",
      "name": "駒形",
      "yahooStationId": "21884",
      "inGroupId": "810",
      "outGroupId": "811"
    },
    {
      "id": "RY-16",
      "name": "前橋大島",
      "yahooStationId": "29259",
      "inGroupId": "810",
      "outGroupId": "811"
    },
    {
      "id": "RY-17",
      "name": "前橋",
      "yahooStationId": "21946",
      "inGroupId": "810",
      "outGroupId": "811"
    },
    {
      "id": "RY-18",
      "name": "新前橋",
      "yahooStationId": "21898",
      "inGroupId": "810",
      "outGroupId": null
    }
  ],
  "trainTypeMap": {
    "各駅停車": "local",
    "普通": "local",
    "快速": "rapid"
  },
  "defaultCars": 4,
  "baseSectionSeconds": {
    "1": 360,
    "2": 300,
    "3": 300,
    "4": 300,
    "5": 360,
    "6": 300,
    "7": 120,
    "8": 300,
    "9": 240,
    "10": 240,
    "11": 360,
    "12": 540,
    "13": 360,
    "14": 360,
    "15": 240,
    "16": 240,
    "17": 240
  }
};
