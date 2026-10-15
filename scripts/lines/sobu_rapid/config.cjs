// JR総武快速線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "sobu_rapid",
  "name": "JR総武快速線",
  "stationsFilePath": "src/data/lines/sobu_rapid/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/sobu_rapid/stationTimetables.json",
    "globalTimetable": "src/data/lines/sobu_rapid/globalTimetable.json"
  },
  "stations": [
    {
      "id": "JO-19",
      "name": "東京",
      "yahooStationId": "22828",
      "inGroupId": null,
      "outGroupId": "941"
    },
    {
      "id": "JO-20",
      "name": "新日本橋",
      "yahooStationId": "22750",
      "inGroupId": "940",
      "outGroupId": "941"
    },
    {
      "id": "JO-21",
      "name": "馬喰町",
      "yahooStationId": "22918",
      "inGroupId": "940",
      "outGroupId": "941"
    },
    {
      "id": "JO-22",
      "name": "錦糸町",
      "yahooStationId": "22640",
      "inGroupId": "940",
      "outGroupId": "941"
    },
    {
      "id": "JO-23",
      "name": "新小岩",
      "yahooStationId": "22734",
      "inGroupId": "940",
      "outGroupId": "941"
    },
    {
      "id": "JO-24",
      "name": "市川",
      "yahooStationId": "22193",
      "inGroupId": "940",
      "outGroupId": "941"
    },
    {
      "id": "JO-25",
      "name": "船橋",
      "yahooStationId": "22427",
      "inGroupId": "940",
      "outGroupId": "941"
    },
    {
      "id": "JO-26",
      "name": "津田沼",
      "yahooStationId": "22370",
      "inGroupId": "940",
      "outGroupId": "941"
    },
    {
      "id": "JO-27",
      "name": "稲毛",
      "yahooStationId": "22197",
      "inGroupId": "940",
      "outGroupId": "941"
    },
    {
      "id": "JO-28",
      "name": "千葉",
      "yahooStationId": "22361",
      "inGroupId": "940",
      "outGroupId": null
    }
  ],
  "trainTypeMap": {
    "各駅停車": "local",
    "普通": "local",
    "快速": "rapid",
    "特別快速": "special_rapid",
    "通勤快速": "commuter_rapid",
    "快速アクティー": "rapid_acty",
    "快速ラビット": "rapid_rabbit",
    "快速アーバン": "rapid_urban",
    "特急": "limitedExp",
    "成田エクスプレス": "limitedExp",
    "踊り子": "limitedExp",
    "サフィール踊り子": "limitedExp",
    "湘南": "limitedExp",
    "草津・四万": "limitedExp",
    "あかぎ": "limitedExp",
    "しおさい": "limitedExp"
  },
  "defaultCars": 15,
  "baseSectionSeconds": {
    "1": 90,
    "2": 90,
    "3": 159,
    "4": 252,
    "5": 262,
    "6": 420,
    "7": 187,
    "8": 493,
    "9": 175
  }
};
