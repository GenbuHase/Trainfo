// JR御殿場線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "gotemba",
  "name": "JR御殿場線",
  "stationsFilePath": "src/data/lines/gotemba/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/gotemba/stationTimetables.json",
    "globalTimetable": "src/data/lines/gotemba/globalTimetable.json"
  },
  "stations": [
    {
      "id": "CB-00",
      "name": "国府津",
      "yahooStationId": "23156",
      "inGroupId": null,
      "outGroupId": "1281"
    },
    {
      "id": "CB-01",
      "name": "下曽我",
      "yahooStationId": "23200",
      "inGroupId": "1280",
      "outGroupId": "1281"
    },
    {
      "id": "CB-02",
      "name": "上大井",
      "yahooStationId": "23118",
      "inGroupId": "1280",
      "outGroupId": "1281"
    },
    {
      "id": "CB-03",
      "name": "相模金子",
      "yahooStationId": "23173",
      "inGroupId": "1280",
      "outGroupId": "1281"
    },
    {
      "id": "CB-04",
      "name": "松田",
      "yahooStationId": "23323",
      "inGroupId": "1280",
      "outGroupId": "1281"
    },
    {
      "id": "CB-05",
      "name": "東山北",
      "yahooStationId": "23294",
      "inGroupId": "1280",
      "outGroupId": "1281"
    },
    {
      "id": "CB-06",
      "name": "山北",
      "yahooStationId": "23358",
      "inGroupId": "1280",
      "outGroupId": "1281"
    },
    {
      "id": "CB-07",
      "name": "谷峨",
      "yahooStationId": "23354",
      "inGroupId": "1280",
      "outGroupId": "1281"
    },
    {
      "id": "CB-08",
      "name": "駿河小山",
      "yahooStationId": "23565",
      "inGroupId": "1280",
      "outGroupId": "1281"
    },
    {
      "id": "CB-09",
      "name": "足柄",
      "yahooStationId": "23449",
      "inGroupId": "1280",
      "outGroupId": "1281"
    },
    {
      "id": "CB-10",
      "name": "御殿場",
      "yahooStationId": "23534",
      "inGroupId": "1280",
      "outGroupId": "1281"
    },
    {
      "id": "CB-11",
      "name": "南御殿場",
      "yahooStationId": "23641",
      "inGroupId": "1280",
      "outGroupId": "1281"
    },
    {
      "id": "CB-12",
      "name": "富士岡",
      "yahooStationId": "23621",
      "inGroupId": "1280",
      "outGroupId": "1281"
    },
    {
      "id": "CB-13",
      "name": "岩波",
      "yahooStationId": "23476",
      "inGroupId": "1280",
      "outGroupId": "1281"
    },
    {
      "id": "CB-14",
      "name": "裾野",
      "yahooStationId": "23563",
      "inGroupId": "1280",
      "outGroupId": "1281"
    },
    {
      "id": "CB-15",
      "name": "長泉なめり",
      "yahooStationId": "29432",
      "inGroupId": "1280",
      "outGroupId": "1281"
    },
    {
      "id": "CB-16",
      "name": "下土狩",
      "yahooStationId": "23551",
      "inGroupId": "1280",
      "outGroupId": "1281"
    },
    {
      "id": "CB-17",
      "name": "大岡",
      "yahooStationId": "23489",
      "inGroupId": "1280",
      "outGroupId": "1281"
    },
    {
      "id": "CB-18",
      "name": "沼津",
      "yahooStationId": "23600",
      "inGroupId": "1280",
      "outGroupId": null
    }
  ],
  "trainTypeMap": {
    "普通": "local",
    "各駅停車": "local",
    "快速": "rapid",
    "特急": "limitedExp",
    "ふじさん": "limitedExp"
  },
  "defaultCars": 3
};
