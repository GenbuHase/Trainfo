module.exports = {
  "lineId": "banetsu_east",
  "name": "JR磐越東線",
  "stationsFilePath": "src/data/lines/banetsu_east/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/banetsu_east/stationTimetables.json",
    "globalTimetable": "src/data/lines/banetsu_east/globalTimetable.json"
  },
  "stations": [
    {
      "id": "BE-01",
      "name": "いわき",
      "yahooStationId": "21435",
      "inGroupId": null,
      "outGroupId": "661"
    },
    {
      "id": "BE-02",
      "name": "赤井",
      "yahooStationId": "21421",
      "inGroupId": "660",
      "outGroupId": "661"
    },
    {
      "id": "BE-03",
      "name": "小川郷",
      "yahooStationId": "21454",
      "inGroupId": "660",
      "outGroupId": "661"
    },
    {
      "id": "BE-04",
      "name": "江田",
      "yahooStationId": "21448",
      "inGroupId": "660",
      "outGroupId": "661"
    },
    {
      "id": "BE-05",
      "name": "川前",
      "yahooStationId": "21474",
      "inGroupId": "660",
      "outGroupId": "661"
    },
    {
      "id": "BE-06",
      "name": "夏井",
      "yahooStationId": "21523",
      "inGroupId": "660",
      "outGroupId": "661"
    },
    {
      "id": "BE-07",
      "name": "小野新町",
      "yahooStationId": "21459",
      "inGroupId": "660",
      "outGroupId": "661"
    },
    {
      "id": "BE-08",
      "name": "神俣",
      "yahooStationId": "21475",
      "inGroupId": "660",
      "outGroupId": "661"
    },
    {
      "id": "BE-09",
      "name": "菅谷",
      "yahooStationId": "21499",
      "inGroupId": "660",
      "outGroupId": "661"
    },
    {
      "id": "BE-10",
      "name": "大越",
      "yahooStationId": "21452",
      "inGroupId": "660",
      "outGroupId": "661"
    },
    {
      "id": "BE-11",
      "name": "磐城常葉",
      "yahooStationId": "21441",
      "inGroupId": "660",
      "outGroupId": "661"
    },
    {
      "id": "BE-12",
      "name": "船引",
      "yahooStationId": "21555",
      "inGroupId": "660",
      "outGroupId": "661"
    },
    {
      "id": "BE-13",
      "name": "要田",
      "yahooStationId": "21465",
      "inGroupId": "660",
      "outGroupId": "661"
    },
    {
      "id": "BE-14",
      "name": "三春",
      "yahooStationId": "21561",
      "inGroupId": "660",
      "outGroupId": "661"
    },
    {
      "id": "BE-15",
      "name": "舞木",
      "yahooStationId": "21563",
      "inGroupId": "660",
      "outGroupId": "661"
    },
    {
      "id": "BE-16",
      "name": "郡山",
      "yahooStationId": "21483",
      "inGroupId": "660",
      "outGroupId": null
    }
  ],
  "trainTypeMap": {
    "各駅停車": "local",
    "普通": "local"
  },
  "defaultCars": 2,
  "baseSectionSeconds": {
    "1": 240
  }
};
