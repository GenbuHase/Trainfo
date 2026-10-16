module.exports = {
  "lineId": "hokuhoku",
  "name": "北越急行ほくほく線",
  "stationsFilePath": "src/data/lines/hokuhoku/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/hokuhoku/stationTimetables.json",
    "globalTimetable": "src/data/lines/hokuhoku/globalTimetable.json"
  },
  "stations": [
    {
      "id": "HK-01",
      "name": "六日町",
      "yahooStationId": "24078",
      "inGroupId": null,
      "outGroupId": "6701"
    },
    {
      "id": "HK-02",
      "name": "魚沼丘陵",
      "yahooStationId": "29174",
      "inGroupId": "6700",
      "outGroupId": "6701"
    },
    {
      "id": "HK-03",
      "name": "美佐島",
      "yahooStationId": "29173",
      "inGroupId": "6700",
      "outGroupId": "6701"
    },
    {
      "id": "HK-04",
      "name": "しんざ",
      "yahooStationId": "29172",
      "inGroupId": "6700",
      "outGroupId": "6701"
    },
    {
      "id": "HK-05",
      "name": "十日町",
      "yahooStationId": "24021",
      "inGroupId": "6700",
      "outGroupId": "6701"
    },
    {
      "id": "HK-06",
      "name": "まつだい",
      "yahooStationId": "29171",
      "inGroupId": "6700",
      "outGroupId": "6701"
    },
    {
      "id": "HK-07",
      "name": "ほくほく大島",
      "yahooStationId": "29170",
      "inGroupId": "6700",
      "outGroupId": "6701"
    },
    {
      "id": "HK-08",
      "name": "虫川大杉",
      "yahooStationId": "29169",
      "inGroupId": "6700",
      "outGroupId": "6701"
    },
    {
      "id": "HK-09",
      "name": "うらがわら",
      "yahooStationId": "29168",
      "inGroupId": "6700",
      "outGroupId": "6701"
    },
    {
      "id": "HK-10",
      "name": "大池いこいの森",
      "yahooStationId": "29167",
      "inGroupId": "6700",
      "outGroupId": "6701"
    },
    {
      "id": "HK-11",
      "name": "くびき",
      "yahooStationId": "29166",
      "inGroupId": "6700",
      "outGroupId": "6701"
    },
    {
      "id": "HK-12",
      "name": "犀潟",
      "yahooStationId": "23988",
      "inGroupId": "6700",
      "outGroupId": null
    }
  ],
  "trainTypeMap": {
    "各駅停車": "local",
    "普通": "local",
    "快速": "rapid",
    "超快速": "rapid"
  },
  "preserveAllStopsTypes": [
    "rapid"
  ],
  "defaultCars": 2,
  "baseSectionSeconds": {
    "1": 300,
    "2": 360,
    "3": 180,
    "4": 120,
    "5": 600,
    "6": 420,
    "7": 360,
    "8": 180,
    "9": 180,
    "10": 180,
    "11": 300
  }
};
