// JR山形新幹線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "yamagata_shinkansen",
  "name": "JR山形新幹線",
  "stationsFilePath": "src/data/lines/yamagata_shinkansen/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/yamagata_shinkansen/stationTimetables.json",
    "globalTimetable": "src/data/lines/yamagata_shinkansen/globalTimetable.json"
  },
  "stations": [
    {
      "id": "YS-01",
      "name": "福島",
      "yahooStationId": "21551",
      "inGroupId": null,
      "outGroupId": "271"
    },
    {
      "id": "YS-02",
      "name": "米沢",
      "yahooStationId": "21396",
      "inGroupId": "270",
      "outGroupId": "271"
    },
    {
      "id": "YS-03",
      "name": "高畠",
      "yahooStationId": "21345",
      "inGroupId": "270",
      "outGroupId": "271"
    },
    {
      "id": "YS-04",
      "name": "赤湯",
      "yahooStationId": "21278",
      "inGroupId": "270",
      "outGroupId": "271"
    },
    {
      "id": "YS-05",
      "name": "かみのやま温泉",
      "yahooStationId": "21320",
      "inGroupId": "270",
      "outGroupId": "271"
    },
    {
      "id": "YS-06",
      "name": "山形",
      "yahooStationId": "21392",
      "inGroupId": "270",
      "outGroupId": "271"
    },
    {
      "id": "YS-07",
      "name": "天童",
      "yahooStationId": "21355",
      "inGroupId": "270",
      "outGroupId": "271"
    },
    {
      "id": "YS-08",
      "name": "さくらんぼ東根",
      "yahooStationId": "21318",
      "inGroupId": "270",
      "outGroupId": "271"
    },
    {
      "id": "YS-09",
      "name": "村山",
      "yahooStationId": "21348",
      "inGroupId": "270",
      "outGroupId": "271"
    },
    {
      "id": "YS-10",
      "name": "大石田",
      "yahooStationId": "21311",
      "inGroupId": "270",
      "outGroupId": "271"
    },
    {
      "id": "YS-11",
      "name": "新庄",
      "yahooStationId": "21338",
      "inGroupId": "270",
      "outGroupId": null
    }
  ],
  "trainTypeMap": {
    "つばさ": "tsubasa",
    "やまびこ": "yamabiko",
    "特急": "tsubasa"
  },
  "defaultCars": 7
};
