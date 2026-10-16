module.exports = {
  "lineId": "myoko_haneuma",
  "name": "えちごトキめき鉄道妙高はねうまライン",
  "stationsFilePath": "src/data/lines/myoko_haneuma/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/myoko_haneuma/stationTimetables.json",
    "globalTimetable": "src/data/lines/myoko_haneuma/globalTimetable.json"
  },
  "stations": [
    {
      "id": "ETM-01",
      "name": "妙高高原",
      "yahooStationId": "24071",
      "inGroupId": null,
      "outGroupId": "7861"
    },
    {
      "id": "ETM-02",
      "name": "関山",
      "yahooStationId": "24003",
      "inGroupId": "7860",
      "outGroupId": "7861"
    },
    {
      "id": "ETM-03",
      "name": "二本木",
      "yahooStationId": "24042",
      "inGroupId": "7860",
      "outGroupId": "7861"
    },
    {
      "id": "ETM-04",
      "name": "新井",
      "yahooStationId": "23891",
      "inGroupId": "7860",
      "outGroupId": "7861"
    },
    {
      "id": "ETM-05",
      "name": "北新井",
      "yahooStationId": "23968",
      "inGroupId": "7860",
      "outGroupId": "7861"
    },
    {
      "id": "ETM-06",
      "name": "上越妙高",
      "yahooStationId": "24093",
      "inGroupId": "7860",
      "outGroupId": "7861"
    },
    {
      "id": "ETM-07",
      "name": "南高田",
      "yahooStationId": "24075",
      "inGroupId": "7860",
      "outGroupId": "7861"
    },
    {
      "id": "ETM-08",
      "name": "高田",
      "yahooStationId": "24005",
      "inGroupId": "7860",
      "outGroupId": "7861"
    },
    {
      "id": "ETM-09",
      "name": "春日山",
      "yahooStationId": "23957",
      "inGroupId": "7860",
      "outGroupId": "7861"
    },
    {
      "id": "ETM-10",
      "name": "直江津",
      "yahooStationId": "24026",
      "inGroupId": "7860",
      "outGroupId": null
    }
  ],
  "trainTypeMap": {
    "各駅停車": "local",
    "普通": "local",
    "快速": "rapid",
    "特急": "limitedExp",
    "特急しらゆき": "limitedExp",
    "しらゆき": "limitedExp"
  },
  "preserveAllStopsTypes": [
    "rapid",
    "limitedExp"
  ],
  "defaultCars": 2,
  "baseSectionSeconds": {
    "1": 420,
    "2": 480,
    "3": 420,
    "4": 180,
    "5": 240,
    "6": 180,
    "7": 180,
    "8": 240,
    "9": 300
  }
};
