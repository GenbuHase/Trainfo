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
      "name": "谷村町",
      "yahooStationId": "23443",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-08",
      "name": "都留文科大学前",
      "yahooStationId": "29506",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-09",
      "name": "十日市場",
      "yahooStationId": "23429",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-10",
      "name": "東桂",
      "yahooStationId": "23434",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-11",
      "name": "三つ峠",
      "yahooStationId": "23440",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-12",
      "name": "寿",
      "yahooStationId": "23409",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-13",
      "name": "葭池温泉前",
      "yahooStationId": "23448",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-14",
      "name": "下吉田",
      "yahooStationId": "23414",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-15",
      "name": "月江寺",
      "yahooStationId": "23406",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-16",
      "name": "富士山",
      "yahooStationId": "23437",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-17",
      "name": "富士急ハイランド",
      "yahooStationId": "23436",
      "inGroupId": "5170",
      "outGroupId": "5171"
    },
    {
      "id": "FJ-18",
      "name": "河口湖",
      "yahooStationId": "23403",
      "inGroupId": "5170",
      "outGroupId": null
    }
  ],
  "stationNameAliases": {
    "赤坂(山梨県)": "赤坂",
    "十日市場(山梨県)": "十日市場"
  },
  "trainTypeMap": {
    "各駅停車": "local",
    "普通": "local",
    "快速": "rapid",
    "特急": "limitedExp"
  },
  "defaultCars": 3,
  "baseSectionSeconds": {
    "1": 120,
    "2": 150,
    "3": 150,
    "4": 120,
    "5": 120,
    "6": 120,
    "7": 120,
    "8": 120,
    "9": 150,
    "10": 180,
    "11": 180,
    "12": 120,
    "13": 120,
    "14": 100,
    "15": 120,
    "16": 120,
    "17": 120
  }
};
