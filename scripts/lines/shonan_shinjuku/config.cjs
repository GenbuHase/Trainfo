// JR湘南新宿ライン Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "shonan_shinjuku",
  "name": "JR湘南新宿ライン",
  "stationsFilePath": "src/data/lines/shonan_shinjuku/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/shonan_shinjuku/stationTimetables.json",
    "globalTimetable": "src/data/lines/shonan_shinjuku/globalTimetable.json"
  },
  "stations": [
    {
      "id": "JS-24",
      "name": "大宮",
      "yahooStationId": "21987",
      "inGroupId": null,
      "outGroupId": "1050"
    },
    {
      "id": "JS-23",
      "name": "浦和",
      "yahooStationId": "21982",
      "inGroupId": "1051",
      "outGroupId": "1050"
    },
    {
      "id": "JS-22",
      "name": "赤羽",
      "yahooStationId": "22487",
      "inGroupId": "1051",
      "outGroupId": "1050"
    },
    {
      "id": "JS-21",
      "name": "池袋",
      "yahooStationId": "22513",
      "inGroupId": "1051",
      "outGroupId": "1050"
    },
    {
      "id": "JS-20",
      "name": "新宿",
      "yahooStationId": "22741",
      "inGroupId": "1051",
      "outGroupId": "1050"
    },
    {
      "id": "JS-19",
      "name": "渋谷",
      "yahooStationId": "22715",
      "inGroupId": "1051",
      "outGroupId": "1050"
    },
    {
      "id": "JS-18",
      "name": "恵比寿",
      "yahooStationId": "22548",
      "inGroupId": "1051",
      "outGroupId": "1050"
    },
    {
      "id": "JS-17",
      "name": "大崎",
      "yahooStationId": "22559",
      "inGroupId": "1051",
      "outGroupId": "1050"
    },
    {
      "id": "JS-15",
      "name": "武蔵小杉",
      "yahooStationId": "23345",
      "inGroupId": "1051",
      "outGroupId": "1050"
    },
    {
      "id": "JS-08",
      "name": "横浜",
      "yahooStationId": "23368",
      "inGroupId": "1051",
      "outGroupId": "1050"
    },
    {
      "id": "JS-03",
      "name": "戸塚",
      "yahooStationId": "23251",
      "inGroupId": "1051",
      "outGroupId": "1050"
    },
    {
      "id": "JS-01",
      "name": "大船",
      "yahooStationId": "23096",
      "inGroupId": "1051",
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
    "1": 335,
    "2": 591,
    "3": 299,
    "4": 257,
    "5": 191,
    "6": 90,
    "7": 190,
    "8": 427,
    "9": 700,
    "10": 596,
    "11": 285
  }
};
