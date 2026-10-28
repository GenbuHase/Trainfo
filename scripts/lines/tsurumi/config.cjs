// JR鶴見線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "tsurumi",
  "name": "JR鶴見線",
  "directStops": true,
  "stationsFilePath": "src/data/lines/tsurumi/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/tsurumi/stationTimetables.json",
    "globalTimetable": "src/data/lines/tsurumi/globalTimetable.json"
  },
  "stations": [
    {
      "id": "JI-01",
      "name": "鶴見",
      "yahooStationId": "23244",
      "inGroupId": null,
      "outGroupId": "1181"
    },
    {
      "id": "JI-02",
      "name": "国道",
      "yahooStationId": "23160",
      "inGroupId": "1180",
      "outGroupId": "1181"
    },
    {
      "id": "JI-03",
      "name": "鶴見小野",
      "yahooStationId": "23246",
      "inGroupId": "1180",
      "outGroupId": "1181"
    },
    {
      "id": "JI-04",
      "name": "弁天橋",
      "yahooStationId": "23313",
      "inGroupId": "1180",
      "outGroupId": "1181"
    },
    {
      "id": "JI-05",
      "name": "浅野",
      "yahooStationId": "23057",
      "inGroupId": "1180",
      "outGroupId": "1191"
    },
    {
      "id": "JI-06",
      "name": "安善",
      "yahooStationId": "23063",
      "inGroupId": "1180",
      "outGroupId": "7251"
    },
    {
      "id": "JI-07",
      "name": "武蔵白石",
      "yahooStationId": "23346",
      "inGroupId": "1180",
      "outGroupId": "1181"
    },
    {
      "id": "JI-08",
      "name": "浜川崎",
      "yahooStationId": "23284",
      "inGroupId": "1180",
      "outGroupId": "1181"
    },
    {
      "id": "JI-09",
      "name": "昭和",
      "yahooStationId": "23194",
      "inGroupId": "1180",
      "outGroupId": "1181"
    },
    {
      "id": "JI-10",
      "name": "扇町",
      "yahooStationId": "23090",
      "inGroupId": "1180",
      "outGroupId": null
    },
    {
      "id": "JI-51",
      "name": "新芝浦",
      "yahooStationId": "23206",
      "inGroupId": "1190",
      "outGroupId": "1191"
    },
    {
      "id": "JI-52",
      "name": "海芝浦",
      "yahooStationId": "23081",
      "inGroupId": "1190",
      "outGroupId": null
    },
    {
      "id": "JI-61",
      "name": "大川",
      "yahooStationId": "23092",
      "inGroupId": "7250",
      "outGroupId": null
    }
  ],
  "stationNameAliases": {},
  "trainTypeMap": {
    "各駅停車": "local",
    "普通": "local"
  },
  "defaultCars": 3,
  "baseSectionSeconds": {
    "1": 120,
    "2": 120,
    "3": 120,
    "4": 120,
    "5": 120,
    "6": 120,
    "7": 120,
    "8": 120,
    "9": 120,
    "10": 120,
    "11": 120,
    "12": 120,
    "13": 120
  }
};
