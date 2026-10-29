// JR京葉線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "keiyo",
  "name": "JR京葉線",
  "stationsFilePath": "src/data/lines/keiyo/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/keiyo/stationTimetables.json",
    "globalTimetable": "src/data/lines/keiyo/globalTimetable.json"
  },
  "stations": [
    {
      "id": "JE-01",
      "name": "東京",
      "yahooStationId": "22828",
      "inGroupId": null,
      "outGroupId": "951"
    },
    {
      "id": "JE-02",
      "name": "八丁堀",
      "yahooStationId": "22894",
      "inGroupId": "950",
      "outGroupId": "951"
    },
    {
      "id": "JE-03",
      "name": "越中島",
      "yahooStationId": "22539",
      "inGroupId": "950",
      "outGroupId": "951"
    },
    {
      "id": "JE-04",
      "name": "潮見",
      "yahooStationId": "22708",
      "inGroupId": "950",
      "outGroupId": "951"
    },
    {
      "id": "JE-05",
      "name": "新木場",
      "yahooStationId": "22733",
      "inGroupId": "950",
      "outGroupId": "951"
    },
    {
      "id": "JE-06",
      "name": "葛西臨海公園",
      "yahooStationId": "22593",
      "inGroupId": "950",
      "outGroupId": "951"
    },
    {
      "id": "JE-07",
      "name": "舞浜",
      "yahooStationId": "22435",
      "inGroupId": "950",
      "outGroupId": "951"
    },
    {
      "id": "JE-08",
      "name": "新浦安",
      "yahooStationId": "22324",
      "inGroupId": "950",
      "outGroupId": "951"
    },
    {
      "id": "JE-09",
      "name": "市川塩浜",
      "yahooStationId": "22195",
      "inGroupId": "950",
      "outGroupId": "951"
    },
    {
      "id": "JE-10",
      "name": "二俣新町",
      "yahooStationId": "22424",
      "inGroupId": "950",
      "outGroupId": "951"
    },
    {
      "id": "JE-11",
      "name": "南船橋",
      "yahooStationId": "22457",
      "inGroupId": "950",
      "outGroupId": "951"
    },
    {
      "id": "JE-12",
      "name": "新習志野",
      "yahooStationId": "22330",
      "inGroupId": "950",
      "outGroupId": "951"
    },
    {
      "id": "JE-13",
      "name": "幕張豊砂",
      "yahooStationId": "29914",
      "inGroupId": "950",
      "outGroupId": "951"
    },
    {
      "id": "JE-14",
      "name": "海浜幕張",
      "yahooStationId": "22226",
      "inGroupId": "950",
      "outGroupId": "951"
    },
    {
      "id": "JE-15",
      "name": "検見川浜",
      "yahooStationId": "22291",
      "inGroupId": "950",
      "outGroupId": "951"
    },
    {
      "id": "JE-16",
      "name": "稲毛海岸",
      "yahooStationId": "22198",
      "inGroupId": "950",
      "outGroupId": "951"
    },
    {
      "id": "JE-17",
      "name": "千葉みなと",
      "yahooStationId": "22366",
      "inGroupId": "950",
      "outGroupId": "951"
    },
    {
      "id": "JE-18",
      "name": "蘇我",
      "yahooStationId": "22341",
      "inGroupId": "950",
      "outGroupId": null
    }
  ],
  "stationNameAliases": {},
  "trainTypeMap": {
    "各駅停車": "local",
    "普通": "local",
    "快速": "rapid",
    "通勤快速": "commuter_rapid",
    "特急": "limitedExp",
    "わかしお": "limitedExp",
    "さざなみ": "limitedExp"
  },
  "defaultCars": 10,
  "baseSectionSeconds": {
    "1": 150,
    "2": 150,
    "3": 150,
    "4": 150,
    "5": 150,
    "6": 150,
    "7": 150,
    "8": 150,
    "9": 150,
    "10": 150,
    "11": 150,
    "12": 150,
    "13": 150,
    "14": 150,
    "15": 150,
    "16": 150,
    "17": 150,
    "18": 150
  }
};
