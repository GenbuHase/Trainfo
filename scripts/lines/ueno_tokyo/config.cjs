// JR上野東京ライン Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "ueno_tokyo",
  "name": "JR上野東京ライン",
  "stationsFilePath": "src/data/lines/ueno_tokyo/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/ueno_tokyo/stationTimetables.json",
    "globalTimetable": "src/data/lines/ueno_tokyo/globalTimetable.json"
  },
  "stations": [
    {
      "id": "UT-01",
      "name": "大宮",
      "yahooStationId": "21987",
      "inGroupId": null,
      "outGroupId": "600"
    },
    {
      "id": "UT-02",
      "name": "さいたま新都心",
      "yahooStationId": "29315",
      "inGroupId": "601",
      "outGroupId": "600"
    },
    {
      "id": "UT-03",
      "name": "浦和",
      "yahooStationId": "21982",
      "inGroupId": "601",
      "outGroupId": "600"
    },
    {
      "id": "UT-04",
      "name": "赤羽",
      "yahooStationId": "22487",
      "inGroupId": "601",
      "outGroupId": "600"
    },
    {
      "id": "UT-05",
      "name": "尾久",
      "yahooStationId": "22574",
      "inGroupId": "601",
      "outGroupId": "600"
    },
    {
      "id": "UT-06",
      "name": "上野",
      "yahooStationId": "22528",
      "inGroupId": "601",
      "outGroupId": "7911"
    },
    {
      "id": "UT-07",
      "name": "東京",
      "yahooStationId": "22828",
      "inGroupId": "7910",
      "outGroupId": "1171"
    },
    {
      "id": "UT-08",
      "name": "新橋",
      "yahooStationId": "22751",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "UT-09",
      "name": "品川",
      "yahooStationId": "22709",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "UT-10",
      "name": "川崎",
      "yahooStationId": "23126",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "UT-11",
      "name": "横浜",
      "yahooStationId": "23368",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "UT-12",
      "name": "戸塚",
      "yahooStationId": "23251",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "UT-13",
      "name": "大船",
      "yahooStationId": "23096",
      "inGroupId": "1170",
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
    "1": 92,
    "2": 243,
    "3": 591,
    "4": 253,
    "5": 236,
    "6": 204,
    "7": 102,
    "8": 250,
    "9": 636,
    "10": 551,
    "11": 597,
    "12": 285
  }
};
