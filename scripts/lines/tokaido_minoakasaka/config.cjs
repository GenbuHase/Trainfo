// JR東海道本線（美濃赤坂線） Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: "tokaido_minoakasaka",
  name: "JR東海道本線（美濃赤坂線）",
  stationsFilePath: "src/data/lines/tokaido_minoakasaka/stations.ts",
  outputPaths: {
    "stationTimetables": "src/data/lines/tokaido_minoakasaka/stationTimetables.json",
    "globalTimetable": "src/data/lines/tokaido_minoakasaka/globalTimetable.json"
  },
  stations: [
    {
      "id": "MA-01",
      "name": "大垣",
      "yahooStationId": "24388",
      "inGroupId": null,
      "outGroupId": "1381"
    },
    {
      "id": "MA-02",
      "name": "荒尾",
      "yahooStationId": "24368",
      "inGroupId": "1380",
      "outGroupId": "1381"
    },
    {
      "id": "MA-03",
      "name": "美濃赤坂",
      "yahooStationId": "24585",
      "inGroupId": "1380",
      "outGroupId": null
    }
  ],
  trainTypeMap: {
    "普通": "local",
    "各駅停車": "local"
  },
  defaultCars: 2,
  baseSectionSeconds: {
    "1": 240,
    "2": 240
  },
};
