// JR東海道線（熱海～沼津 / JR東海区間） Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "tokaido_shizuoka",
  "name": "JR東海道線（静岡地区）",
  "stationsFilePath": "src/data/lines/tokaido_shizuoka/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/tokaido_shizuoka/stationTimetables.json",
    "globalTimetable": "src/data/lines/tokaido_shizuoka/globalTimetable.json"
  },
  "stations": [
    {
      "id": "CA-00",
      "name": "熱海",
      "yahooStationId": "23452",
      "inGroupId": null,
      "outGroupId": "1361"
    },
    {
      "id": "CA-01",
      "name": "函南",
      "yahooStationId": "23515",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-02",
      "name": "三島",
      "yahooStationId": "23636",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-03",
      "name": "沼津",
      "yahooStationId": "23600",
      "inGroupId": "1360",
      "outGroupId": null
    }
  ],
  "trainTypeMap": {
    "各駅停車": "local",
    "普通": "local",
    "快速": "rapid",
    "ホームライナー": "homeliner",
    "特急": "limitedExp"
  },
  "defaultCars": 3,
  "baseSectionSeconds": {
    "1": 540,
    "2": 300,
    "3": 300
  }
};
