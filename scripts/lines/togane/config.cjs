// JR東金線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "togane",
  "name": "JR東金線",
  "stationsFilePath": "src/data/lines/togane/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/togane/stationTimetables.json",
    "globalTimetable": "src/data/lines/togane/globalTimetable.json"
  },
  "stations": [
    {
      "id": "TG-01",
      "name": "大網",
      "yahooStationId": "22211",
      "inGroupId": null,
      "outGroupId": "891"
    },
    {
      "id": "TG-02",
      "name": "福俵",
      "yahooStationId": "22421",
      "inGroupId": "890",
      "outGroupId": "891"
    },
    {
      "id": "TG-03",
      "name": "東金",
      "yahooStationId": "22373",
      "inGroupId": "890",
      "outGroupId": "891"
    },
    {
      "id": "TG-04",
      "name": "求名",
      "yahooStationId": "22274",
      "inGroupId": "890",
      "outGroupId": "891"
    },
    {
      "id": "TG-05",
      "name": "成東",
      "yahooStationId": "22393",
      "inGroupId": "890",
      "outGroupId": null
    }
  ],
  "stationNameAliases": {},
  "trainTypeMap": {
    "普通": "local",
    "各駅停車": "local",
    "快速": "rapid",
    "通勤快速": "rapid"
  },
  "defaultCars": 6,
  "baseSectionSeconds": {
    "1": 180,
    "2": 180,
    "3": 180,
    "4": 180,
    "5": 180
  }
};
