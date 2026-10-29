// JR久留里線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "kururi",
  "name": "JR久留里線",
  "stationsFilePath": "src/data/lines/kururi/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/kururi/stationTimetables.json",
    "globalTimetable": "src/data/lines/kururi/globalTimetable.json"
  },
  "stations": [
    {
      "id": "KR-01",
      "name": "木更津",
      "yahooStationId": "22256",
      "inGroupId": null,
      "outGroupId": "921"
    },
    {
      "id": "KR-02",
      "name": "祇園",
      "yahooStationId": "22266",
      "inGroupId": "920",
      "outGroupId": "921"
    },
    {
      "id": "KR-03",
      "name": "上総清川",
      "yahooStationId": "22236",
      "inGroupId": "920",
      "outGroupId": "921"
    },
    {
      "id": "KR-04",
      "name": "東清川",
      "yahooStationId": "22410",
      "inGroupId": "920",
      "outGroupId": "921"
    },
    {
      "id": "KR-05",
      "name": "横田",
      "yahooStationId": "22478",
      "inGroupId": "920",
      "outGroupId": "921"
    },
    {
      "id": "KR-06",
      "name": "東横田",
      "yahooStationId": "22417",
      "inGroupId": "920",
      "outGroupId": "921"
    },
    {
      "id": "KR-07",
      "name": "馬来田",
      "yahooStationId": "22437",
      "inGroupId": "920",
      "outGroupId": "921"
    },
    {
      "id": "KR-08",
      "name": "下郡",
      "yahooStationId": "22322",
      "inGroupId": "920",
      "outGroupId": "921"
    },
    {
      "id": "KR-09",
      "name": "小櫃",
      "yahooStationId": "22221",
      "inGroupId": "920",
      "outGroupId": "921"
    },
    {
      "id": "KR-10",
      "name": "俵田",
      "yahooStationId": "22351",
      "inGroupId": "920",
      "outGroupId": "921"
    },
    {
      "id": "KR-11",
      "name": "久留里",
      "yahooStationId": "22273",
      "inGroupId": "920",
      "outGroupId": "921"
    },
    {
      "id": "KR-12",
      "name": "平山",
      "yahooStationId": "22419",
      "inGroupId": "920",
      "outGroupId": "921"
    },
    {
      "id": "KR-13",
      "name": "上総松丘",
      "yahooStationId": "22241",
      "inGroupId": "920",
      "outGroupId": "921"
    },
    {
      "id": "KR-14",
      "name": "上総亀山",
      "yahooStationId": "22234",
      "inGroupId": "920",
      "outGroupId": null
    }
  ],
  "stationNameAliases": {},
  "trainTypeMap": {
    "普通": "local"
  },
  "defaultCars": 2,
  "baseSectionSeconds": {
    "1": 200,
    "2": 200,
    "3": 200,
    "4": 200,
    "5": 200,
    "6": 200,
    "7": 200,
    "8": 200,
    "9": 200,
    "10": 200,
    "11": 200,
    "12": 200,
    "13": 200,
    "14": 200
  }
};
