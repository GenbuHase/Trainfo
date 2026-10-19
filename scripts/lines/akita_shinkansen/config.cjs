// JR秋田新幹線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "akita_shinkansen",
  "name": "JR秋田新幹線",
  "stationsFilePath": "src/data/lines/akita_shinkansen/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/akita_shinkansen/stationTimetables.json",
    "globalTimetable": "src/data/lines/akita_shinkansen/globalTimetable.json"
  },
  "stations": [
    {
      "id": "AS-01",
      "name": "盛岡",
      "yahooStationId": "20940",
      "inGroupId": null,
      "outGroupId": "281"
    },
    {
      "id": "AS-02",
      "name": "雫石",
      "yahooStationId": "20866",
      "inGroupId": "280",
      "outGroupId": "281"
    },
    {
      "id": "AS-03",
      "name": "田沢湖",
      "yahooStationId": "21221",
      "inGroupId": "280",
      "outGroupId": "281"
    },
    {
      "id": "AS-04",
      "name": "角館",
      "yahooStationId": "21174",
      "inGroupId": "280",
      "outGroupId": "281"
    },
    {
      "id": "AS-05",
      "name": "大曲",
      "yahooStationId": "21168",
      "inGroupId": "280",
      "outGroupId": "281"
    },
    {
      "id": "AS-06",
      "name": "秋田",
      "yahooStationId": "21137",
      "inGroupId": "280",
      "outGroupId": null
    }
  ],
  "trainTypeMap": {
    "こまち": "komachi",
    "はやぶさ": "hayabusa",
    "特急": "komachi"
  },
  "defaultCars": 7
};
