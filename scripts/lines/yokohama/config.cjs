// JR横浜線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "yokohama",
  "name": "JR横浜線",
  "stationsFilePath": "src/data/lines/yokohama/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/yokohama/stationTimetables.json",
    "globalTimetable": "src/data/lines/yokohama/globalTimetable.json"
  },
  "stations": [
    {
      "id": "JH-13",
      "name": "東神奈川",
      "yahooStationId": "23289",
      "inGroupId": null,
      "outGroupId": "1231"
    },
    {
      "id": "JH-14",
      "name": "大口",
      "yahooStationId": "23094",
      "inGroupId": "1230",
      "outGroupId": "1231"
    },
    {
      "id": "JH-15",
      "name": "菊名",
      "yahooStationId": "23130",
      "inGroupId": "1230",
      "outGroupId": "1231"
    },
    {
      "id": "JH-16",
      "name": "新横浜",
      "yahooStationId": "23212",
      "inGroupId": "1230",
      "outGroupId": "1231"
    },
    {
      "id": "JH-17",
      "name": "小机",
      "yahooStationId": "23163",
      "inGroupId": "1230",
      "outGroupId": "1231"
    },
    {
      "id": "JH-18",
      "name": "鴨居",
      "yahooStationId": "23123",
      "inGroupId": "1230",
      "outGroupId": "1231"
    },
    {
      "id": "JH-19",
      "name": "中山",
      "yahooStationId": "23259",
      "inGroupId": "1230",
      "outGroupId": "1231"
    },
    {
      "id": "JH-20",
      "name": "十日市場",
      "yahooStationId": "23250",
      "inGroupId": "1230",
      "outGroupId": "1231"
    },
    {
      "id": "JH-21",
      "name": "長津田",
      "yahooStationId": "23260",
      "inGroupId": "1230",
      "outGroupId": "1231"
    },
    {
      "id": "JH-22",
      "name": "成瀬",
      "yahooStationId": "22861",
      "inGroupId": "1230",
      "outGroupId": "1231"
    },
    {
      "id": "JH-23",
      "name": "町田",
      "yahooStationId": "22976",
      "inGroupId": "1230",
      "outGroupId": "1231"
    },
    {
      "id": "JH-24",
      "name": "古淵",
      "yahooStationId": "23165",
      "inGroupId": "1230",
      "outGroupId": "1231"
    },
    {
      "id": "JH-25",
      "name": "淵野辺",
      "yahooStationId": "23311",
      "inGroupId": "1230",
      "outGroupId": "1231"
    },
    {
      "id": "JH-26",
      "name": "矢部",
      "yahooStationId": "23357",
      "inGroupId": "1230",
      "outGroupId": "1231"
    },
    {
      "id": "JH-27",
      "name": "相模原",
      "yahooStationId": "23177",
      "inGroupId": "1230",
      "outGroupId": "1231"
    },
    {
      "id": "JH-28",
      "name": "橋本",
      "yahooStationId": "23281",
      "inGroupId": "1230",
      "outGroupId": "1231"
    },
    {
      "id": "JH-29",
      "name": "相原",
      "yahooStationId": "22481",
      "inGroupId": "1230",
      "outGroupId": "1231"
    },
    {
      "id": "JH-30",
      "name": "八王子みなみ野",
      "yahooStationId": "29177",
      "inGroupId": "1230",
      "outGroupId": "1231"
    },
    {
      "id": "JH-31",
      "name": "片倉",
      "yahooStationId": "22597",
      "inGroupId": "1230",
      "outGroupId": "1231"
    },
    {
      "id": "JH-32",
      "name": "八王子",
      "yahooStationId": "22905",
      "inGroupId": "1230",
      "outGroupId": null
    }
  ],
  "stationNameAliases": {},
  "trainTypeMap": {
    "各駅停車": "local",
    "普通": "local",
    "快速": "rapid"
  },
  "defaultCars": 8,
  "baseSectionSeconds": {
    "1": 150,
    "2": 150,
    "3": 150,
    "4": 150,
    "5": 150,
    "6": 150,
    "7": 150,
    "8": 150,
    "9": 150,
    "10": 150,
    "11": 150,
    "12": 150,
    "13": 150,
    "14": 150,
    "15": 150,
    "16": 150,
    "17": 150,
    "18": 150,
    "19": 150,
    "20": 150
  }
};
