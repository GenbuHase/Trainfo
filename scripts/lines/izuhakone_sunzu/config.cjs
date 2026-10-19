module.exports = {
  "lineId": "izuhakone_sunzu",
  "name": "伊豆箱根鉄道駿豆線",
  "stationsFilePath": "src/data/lines/izuhakone_sunzu/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/izuhakone_sunzu/stationTimetables.json",
    "globalTimetable": "src/data/lines/izuhakone_sunzu/globalTimetable.json"
  },
  "stations": [
    {
      "id": "IS-01",
      "name": "三島",
      "yahooStationId": "23636",
      "inGroupId": null,
      "outGroupId": "4941"
    },
    {
      "id": "IS-02",
      "name": "三島広小路",
      "yahooStationId": "23638",
      "inGroupId": "4940",
      "outGroupId": "4941"
    },
    {
      "id": "IS-03",
      "name": "三島田町",
      "yahooStationId": "23637",
      "inGroupId": "4940",
      "outGroupId": "4941"
    },
    {
      "id": "IS-04",
      "name": "三島二日町",
      "yahooStationId": "23639",
      "inGroupId": "4940",
      "outGroupId": "4941"
    },
    {
      "id": "IS-05",
      "name": "大場",
      "yahooStationId": "23577",
      "inGroupId": "4940",
      "outGroupId": "4941"
    },
    {
      "id": "IS-06",
      "name": "伊豆仁田",
      "yahooStationId": "23466",
      "inGroupId": "4940",
      "outGroupId": "4941"
    },
    {
      "id": "IS-07",
      "name": "原木",
      "yahooStationId": "23610",
      "inGroupId": "4940",
      "outGroupId": "4941"
    },
    {
      "id": "IS-08",
      "name": "韮山",
      "yahooStationId": "23599",
      "inGroupId": "4940",
      "outGroupId": "4941"
    },
    {
      "id": "IS-09",
      "name": "伊豆長岡",
      "yahooStationId": "23467",
      "inGroupId": "4940",
      "outGroupId": "4941"
    },
    {
      "id": "IS-10",
      "name": "田京",
      "yahooStationId": "23572",
      "inGroupId": "4940",
      "outGroupId": "4941"
    },
    {
      "id": "IS-11",
      "name": "大仁",
      "yahooStationId": "23488",
      "inGroupId": "4940",
      "outGroupId": "4941"
    },
    {
      "id": "IS-12",
      "name": "牧之郷",
      "yahooStationId": "23632",
      "inGroupId": "4940",
      "outGroupId": "4941"
    },
    {
      "id": "IS-13",
      "name": "修善寺",
      "yahooStationId": "23542",
      "inGroupId": "4940",
      "outGroupId": null
    }
  ],
  "stationNameAliases": {},
  "trainTypeMap": {
    "各駅停車": "local",
    "普通": "local",
    "特急": "limitedExp"
  },
  "defaultCars": 3,
  "baseSectionSeconds": {
    "1": 100,
    "2": 90,
    "3": 90,
    "4": 180,
    "5": 120,
    "6": 120,
    "7": 120,
    "8": 120,
    "9": 150,
    "10": 150,
    "11": 120,
    "12": 120
  }
};
