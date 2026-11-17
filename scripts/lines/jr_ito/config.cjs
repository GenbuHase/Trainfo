// JR伊東線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "jr_ito",
  "name": "JR伊東線",
  "stationsFilePath": "src/data/lines/jr_ito/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/jr_ito/stationTimetables.json",
    "globalTimetable": "src/data/lines/jr_ito/globalTimetable.json"
  },
  "stations": [
    {
      "id": "JT-21",
      "name": "熱海",
      "yahooStationId": "23452",
      "inGroupId": null,
      "outGroupId": "1291"
    },
    {
      "id": "JT-22",
      "name": "来宮",
      "yahooStationId": "23526",
      "inGroupId": "1290",
      "outGroupId": "1291"
    },
    {
      "id": "JT-23",
      "name": "伊豆多賀",
      "yahooStationId": "23464",
      "inGroupId": "1290",
      "outGroupId": "1291"
    },
    {
      "id": "JT-24",
      "name": "網代",
      "yahooStationId": "23450",
      "inGroupId": "1290",
      "outGroupId": "1291"
    },
    {
      "id": "JT-25",
      "name": "宇佐美",
      "yahooStationId": "23477",
      "inGroupId": "1290",
      "outGroupId": "1291"
    },
    {
      "id": "JT-26",
      "name": "伊東",
      "yahooStationId": "23469",
      "inGroupId": "1290",
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
    "特急": "limited_exp",
    "成田エクスプレス": "limited_exp",
    "踊り子": "limited_exp",
    "サフィール踊り子": "limited_exp",
    "湘南": "limited_exp",
    "草津・四万": "limited_exp",
    "あかぎ": "limited_exp",
    "しおさい": "limited_exp"
  },
  "defaultCars": 6,
  "baseSectionSeconds": {
    "1": 90,
    "2": 246,
    "3": 118,
    "4": 233,
    "5": 197
  }
};
