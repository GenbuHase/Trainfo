// 伊豆急行線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "izukyu",
  "name": "伊豆急行線",
  "stationsFilePath": "src/data/lines/izukyu/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/izukyu/stationTimetables.json",
    "globalTimetable": "src/data/lines/izukyu/globalTimetable.json"
  },
  "stations": [
    {
      "id": "IZ-01",
      "name": "伊東",
      "yahooStationId": "23469",
      "inGroupId": null,
      "outGroupId": "5261"
    },
    {
      "id": "IZ-02",
      "name": "南伊東",
      "yahooStationId": "23640",
      "inGroupId": "5260",
      "outGroupId": "5261"
    },
    {
      "id": "IZ-03",
      "name": "川奈",
      "yahooStationId": "23511",
      "inGroupId": "5260",
      "outGroupId": "5261"
    },
    {
      "id": "IZ-04",
      "name": "富戸",
      "yahooStationId": "23626",
      "inGroupId": "5260",
      "outGroupId": "5261"
    },
    {
      "id": "IZ-05",
      "name": "城ヶ崎海岸",
      "yahooStationId": "23560",
      "inGroupId": "5260",
      "outGroupId": "5261"
    },
    {
      "id": "IZ-06",
      "name": "伊豆高原",
      "yahooStationId": "23463",
      "inGroupId": "5260",
      "outGroupId": "5261"
    },
    {
      "id": "IZ-07",
      "name": "伊豆大川",
      "yahooStationId": "23461",
      "inGroupId": "5260",
      "outGroupId": "5261"
    },
    {
      "id": "IZ-08",
      "name": "伊豆北川",
      "yahooStationId": "23467",
      "inGroupId": "5260",
      "outGroupId": "5261"
    },
    {
      "id": "IZ-09",
      "name": "伊豆熱川",
      "yahooStationId": "23459",
      "inGroupId": "5260",
      "outGroupId": "5261"
    },
    {
      "id": "IZ-10",
      "name": "片瀬白田",
      "yahooStationId": "23502",
      "inGroupId": "5260",
      "outGroupId": "5261"
    },
    {
      "id": "IZ-11",
      "name": "伊豆稲取",
      "yahooStationId": "23460",
      "inGroupId": "5260",
      "outGroupId": "5261"
    },
    {
      "id": "IZ-12",
      "name": "今井浜海岸",
      "yahooStationId": "23472",
      "inGroupId": "5260",
      "outGroupId": "5261"
    },
    {
      "id": "IZ-13",
      "name": "河津",
      "yahooStationId": "23510",
      "inGroupId": "5260",
      "outGroupId": "5261"
    },
    {
      "id": "IZ-14",
      "name": "稲梓",
      "yahooStationId": "23471",
      "inGroupId": "5260",
      "outGroupId": "5261"
    },
    {
      "id": "IZ-15",
      "name": "蓮台寺",
      "yahooStationId": "23652",
      "inGroupId": "5260",
      "outGroupId": "5261"
    },
    {
      "id": "IZ-16",
      "name": "伊豆急下田",
      "yahooStationId": "23462",
      "inGroupId": "5260",
      "outGroupId": null
    }
  ],
  "trainTypeMap": {
    "普通": "local",
    "各駅停車": "local",
    "特急": "limitedExp",
    "踊り子": "limitedExp",
    "サフィール踊り子": "limitedExp"
  },
  "defaultCars": 7
};
