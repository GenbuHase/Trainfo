// JR上越線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "joetsu",
  "name": "JR上越線",
  "stationsFilePath": "src/data/lines/joetsu/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/joetsu/stationTimetables.json",
    "globalTimetable": "src/data/lines/joetsu/globalTimetable.json"
  },
  "stations": [
    {
      "id": "JOE-01",
      "name": "高崎",
      "yahooStationId": "21913",
      "inGroupId": null,
      "outGroupId": "871"
    },
    {
      "id": "JOE-02",
      "name": "高崎問屋町",
      "yahooStationId": "29494",
      "inGroupId": "870",
      "outGroupId": "871"
    },
    {
      "id": "JOE-03",
      "name": "井野",
      "yahooStationId": "21848",
      "inGroupId": "870",
      "outGroupId": "871"
    },
    {
      "id": "JOE-04",
      "name": "新前橋",
      "yahooStationId": "21898",
      "inGroupId": "870",
      "outGroupId": "871"
    },
    {
      "id": "JOE-05",
      "name": "群馬総社",
      "yahooStationId": "21878",
      "inGroupId": "870",
      "outGroupId": "871"
    },
    {
      "id": "JOE-06",
      "name": "八木原",
      "yahooStationId": "21957",
      "inGroupId": "870",
      "outGroupId": "871"
    },
    {
      "id": "JOE-07",
      "name": "渋川",
      "yahooStationId": "21893",
      "inGroupId": "870",
      "outGroupId": "871"
    },
    {
      "id": "JOE-08",
      "name": "敷島",
      "yahooStationId": "21891",
      "inGroupId": "870",
      "outGroupId": "871"
    },
    {
      "id": "JOE-09",
      "name": "津久田",
      "yahooStationId": "21917",
      "inGroupId": "870",
      "outGroupId": "871"
    },
    {
      "id": "JOE-10",
      "name": "岩本",
      "yahooStationId": "21851",
      "inGroupId": "870",
      "outGroupId": "871"
    },
    {
      "id": "JOE-11",
      "name": "沼田",
      "yahooStationId": "21934",
      "inGroupId": "870",
      "outGroupId": "871"
    },
    {
      "id": "JOE-12",
      "name": "後閑",
      "yahooStationId": "21888",
      "inGroupId": "870",
      "outGroupId": "871"
    },
    {
      "id": "JOE-13",
      "name": "上牧",
      "yahooStationId": "21867",
      "inGroupId": "870",
      "outGroupId": "871"
    },
    {
      "id": "JOE-14",
      "name": "水上",
      "yahooStationId": "21953",
      "inGroupId": "870",
      "outGroupId": null
    }
  ],
  "trainTypeMap": {
    "各駅停車": "local",
    "普通": "local",
    "快速": "rapid",
    "特急": "limitedExp",
    "特急草津・四万": "limitedExp",
    "草津・四万": "limitedExp",
    "草津": "limitedExp",
    "水上": "limitedExp"
  },
  "defaultCars": 4,
  "baseSectionSeconds": {
    "1": 180,
    "2": 120,
    "3": 240,
    "4": 300,
    "5": 300,
    "6": 240,
    "7": 360,
    "8": 240,
    "9": 360,
    "10": 300,
    "11": 300,
    "12": 420,
    "13": 360
  }
};
