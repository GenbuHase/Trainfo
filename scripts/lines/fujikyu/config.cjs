// 富士急行線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "fujikyu",
  "name": "富士急行線",
  "stationsFilePath": "src/data/lines/fujikyu/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/fujikyu/stationTimetables.json",
    "globalTimetable": "src/data/lines/fujikyu/globalTimetable.json"
  },
  "stations": [
    {
      "id": "FJ-01",
      "name": "大月",
      "yahooStationId": "23387",
      "inGroupId": null,
      "outGroupId": "5171"
    },
    {
      "id": "FJ-02",
      "name": "上大月",
      "yahooStationId": "23402",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-03",
      "name": "田野倉",
      "yahooStationId": "23423",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-04",
      "name": "禾生",
      "yahooStationId": "23399",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-05",
      "name": "赤坂",
      "yahooStationId": "23376",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-06",
      "name": "都留市",
      "yahooStationId": "23424",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-07",
      "name": "都留文科大学前",
      "yahooStationId": "29506",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-08",
      "name": "十日市場",
      "yahooStationId": "23425",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-09",
      "name": "東桂",
      "yahooStationId": "23432",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-10",
      "name": "三つ峠",
      "yahooStationId": "23438",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-11",
      "name": "寿",
      "yahooStationId": "23410",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-12",
      "name": "葭池温泉前",
      "yahooStationId": "23444",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-13",
      "name": "下吉田",
      "yahooStationId": "23419",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-14",
      "name": "月江寺",
      "yahooStationId": "23406",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-15",
      "name": "富士山",
      "yahooStationId": "23437",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-16",
      "name": "富士急ハイランド",
      "yahooStationId": "23436",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-17",
      "name": "河口湖",
      "yahooStationId": "23403",
      "inGroupId": "5170",
      "outGroupId": null
    }
  ],
  "trainTypeMap": {
    "普通": "local",
    "各駅停車": "local",
    "快速": "rapid",
    "特急": "limitedExp",
    "富士回遊": "limitedExp",
    "フジサン特急": "limitedExp",
    "富士山ビュー特急": "limitedExp"
  },
  "defaultCars": 3
};
