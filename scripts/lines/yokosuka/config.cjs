// JR横須賀線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "yokosuka",
  "name": "JR横須賀線",
  "stationsFilePath": "src/data/lines/yokosuka/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/yokosuka/stationTimetables.json",
    "globalTimetable": "src/data/lines/yokosuka/globalTimetable.json"
  },
  "stations": [
    {
      "id": "JO-19",
      "name": "東京",
      "yahooStationId": "22828",
      "inGroupId": null,
      "outGroupId": "1161"
    },
    {
      "id": "JO-18",
      "name": "新橋",
      "yahooStationId": "22751",
      "inGroupId": "1160",
      "outGroupId": "1161"
    },
    {
      "id": "JO-17",
      "name": "品川",
      "yahooStationId": "22709",
      "inGroupId": "1160",
      "outGroupId": "1161"
    },
    {
      "id": "JO-16",
      "name": "西大井",
      "yahooStationId": "22865",
      "inGroupId": "1160",
      "outGroupId": "1161"
    },
    {
      "id": "JO-15",
      "name": "武蔵小杉",
      "yahooStationId": "23345",
      "inGroupId": "1160",
      "outGroupId": "1161"
    },
    {
      "id": "JO-14",
      "name": "新川崎",
      "yahooStationId": "23204",
      "inGroupId": "1160",
      "outGroupId": "1161"
    },
    {
      "id": "JO-13",
      "name": "横浜",
      "yahooStationId": "23368",
      "inGroupId": "1160",
      "outGroupId": "1161"
    },
    {
      "id": "JO-12",
      "name": "保土ケ谷",
      "yahooStationId": "23316",
      "inGroupId": "1160",
      "outGroupId": "1161"
    },
    {
      "id": "JO-11",
      "name": "東戸塚",
      "yahooStationId": "23291",
      "inGroupId": "1160",
      "outGroupId": "1161"
    },
    {
      "id": "JO-10",
      "name": "戸塚",
      "yahooStationId": "23251",
      "inGroupId": "1160",
      "outGroupId": "1161"
    },
    {
      "id": "JO-09",
      "name": "大船",
      "yahooStationId": "23096",
      "inGroupId": "1160",
      "outGroupId": "1161"
    },
    {
      "id": "JO-08",
      "name": "北鎌倉",
      "yahooStationId": "23132",
      "inGroupId": "1160",
      "outGroupId": "1161"
    },
    {
      "id": "JO-07",
      "name": "鎌倉",
      "yahooStationId": "23116",
      "inGroupId": "1160",
      "outGroupId": "1161"
    },
    {
      "id": "JO-06",
      "name": "逗子",
      "yahooStationId": "23217",
      "inGroupId": "1160",
      "outGroupId": "1161"
    },
    {
      "id": "JO-05",
      "name": "東逗子",
      "yahooStationId": "23290",
      "inGroupId": "1160",
      "outGroupId": "1161"
    },
    {
      "id": "JO-04",
      "name": "田浦",
      "yahooStationId": "23224",
      "inGroupId": "1160",
      "outGroupId": "1161"
    },
    {
      "id": "JO-03",
      "name": "横須賀",
      "yahooStationId": "23366",
      "inGroupId": "1160",
      "outGroupId": "1161"
    },
    {
      "id": "JO-02",
      "name": "衣笠",
      "yahooStationId": "23135",
      "inGroupId": "1160",
      "outGroupId": "1161"
    },
    {
      "id": "JO-01",
      "name": "久里浜",
      "yahooStationId": "23141",
      "inGroupId": "1160",
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
    "1": 102,
    "2": 250,
    "3": 188,
    "4": 337,
    "5": 147,
    "6": 584,
    "7": 163,
    "8": 238,
    "9": 215,
    "10": 285,
    "11": 125,
    "12": 115,
    "13": 195,
    "14": 114,
    "15": 181,
    "16": 106,
    "17": 169,
    "18": 252
  }
};
