// JR内房線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "uchibo",
  "name": "JR内房線",
  "stationsFilePath": "src/data/lines/uchibo/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/uchibo/stationTimetables.json",
    "globalTimetable": "src/data/lines/uchibo/globalTimetable.json"
  },
  "stations": [
    {
      "id": "UB-01",
      "name": "蘇我",
      "yahooStationId": "22341",
      "inGroupId": null,
      "outGroupId": "911"
    },
    {
      "id": "UB-02",
      "name": "浜野",
      "yahooStationId": "22406",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-03",
      "name": "八幡宿",
      "yahooStationId": "22473",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-04",
      "name": "五井",
      "yahooStationId": "22302",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-05",
      "name": "姉ケ崎",
      "yahooStationId": "22182",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-06",
      "name": "長浦",
      "yahooStationId": "22382",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-07",
      "name": "袖ケ浦",
      "yahooStationId": "22342",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-08",
      "name": "巌根",
      "yahooStationId": "22202",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-09",
      "name": "木更津",
      "yahooStationId": "22256",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-10",
      "name": "君津",
      "yahooStationId": "22264",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-11",
      "name": "青堀",
      "yahooStationId": "22175",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-12",
      "name": "大貫",
      "yahooStationId": "22215",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-13",
      "name": "佐貫町",
      "yahooStationId": "22310",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-14",
      "name": "上総湊",
      "yahooStationId": "22243",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-15",
      "name": "竹岡",
      "yahooStationId": "22349",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-16",
      "name": "浜金谷",
      "yahooStationId": "22405",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-17",
      "name": "保田",
      "yahooStationId": "22431",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-18",
      "name": "安房勝山",
      "yahooStationId": "22187",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-19",
      "name": "岩井",
      "yahooStationId": "22201",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-20",
      "name": "富浦",
      "yahooStationId": "22377",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-21",
      "name": "那古船形",
      "yahooStationId": "22385",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-22",
      "name": "館山",
      "yahooStationId": "22350",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-23",
      "name": "九重",
      "yahooStationId": "22298",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-24",
      "name": "千倉",
      "yahooStationId": "22357",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-25",
      "name": "千歳",
      "yahooStationId": "22360",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-26",
      "name": "南三原",
      "yahooStationId": "22456",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-27",
      "name": "和田浦",
      "yahooStationId": "22480",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-28",
      "name": "江見",
      "yahooStationId": "22210",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-29",
      "name": "太海",
      "yahooStationId": "22426",
      "inGroupId": "910",
      "outGroupId": "911"
    },
    {
      "id": "UB-30",
      "name": "安房鴨川",
      "yahooStationId": "22188",
      "inGroupId": "910",
      "outGroupId": null
    }
  ],
  "stationNameAliases": {
    "姉ヶ崎": "姉ケ崎",
    "袖ヶ浦": "袖ケ浦"
  },
  "trainTypeMap": {
    "普通": "local",
    "各駅停車": "local",
    "快速": "rapid",
    "通勤快速": "commuter_rapid",
    "特急": "limitedExp",
    "特急さざなみ": "limitedExp",
    "特急新宿さざなみ": "limitedExp"
  },
  "defaultCars": 8,
  "baseSectionSeconds": {
    "1": 180,
    "2": 180,
    "3": 180,
    "4": 180,
    "5": 180,
    "6": 180,
    "7": 180,
    "8": 180,
    "9": 180,
    "10": 180,
    "11": 180,
    "12": 180,
    "13": 180,
    "14": 180,
    "15": 180,
    "16": 180,
    "17": 180,
    "18": 180,
    "19": 180,
    "20": 180,
    "21": 180,
    "22": 180,
    "23": 180,
    "24": 180,
    "25": 180,
    "26": 180,
    "27": 180,
    "28": 180,
    "29": 180,
    "30": 180
  }
};
