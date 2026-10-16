module.exports = {
  "lineId": "takasaki",
  "name": "JR高崎線",
  "stationsFilePath": "src/data/lines/takasaki/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/takasaki/stationTimetables.json",
    "globalTimetable": "src/data/lines/takasaki/globalTimetable.json"
  },
  "stations": [
    {
      "id": "TK-02",
      "name": "上野",
      "yahooStationId": "22528",
      "inGroupId": null,
      "outGroupId": "1011"
    },
    {
      "id": "TK-03",
      "name": "尾久",
      "yahooStationId": "22574",
      "inGroupId": "600",
      "outGroupId": "1011"
    },
    {
      "id": "TK-04",
      "name": "赤羽",
      "yahooStationId": "22487",
      "inGroupId": "600",
      "outGroupId": "1011"
    },
    {
      "id": "TK-05",
      "name": "浦和",
      "yahooStationId": "21982",
      "inGroupId": "600",
      "outGroupId": "1011"
    },
    {
      "id": "TK-06",
      "name": "さいたま新都心",
      "yahooStationId": "29315",
      "inGroupId": "600",
      "outGroupId": "1011"
    },
    {
      "id": "TK-07",
      "name": "大宮",
      "yahooStationId": "21987",
      "inGroupId": "1010",
      "outGroupId": "1011"
    },
    {
      "id": "TK-08",
      "name": "宮原",
      "yahooStationId": "22150",
      "inGroupId": "1010",
      "outGroupId": "1011"
    },
    {
      "id": "TK-09",
      "name": "上尾",
      "yahooStationId": "21968",
      "inGroupId": "1010",
      "outGroupId": "1011"
    },
    {
      "id": "TK-10",
      "name": "北上尾",
      "yahooStationId": "22015",
      "inGroupId": "1010",
      "outGroupId": "1011"
    },
    {
      "id": "TK-11",
      "name": "桶川",
      "yahooStationId": "21992",
      "inGroupId": "1010",
      "outGroupId": "1011"
    },
    {
      "id": "TK-12",
      "name": "北本",
      "yahooStationId": "22024",
      "inGroupId": "1010",
      "outGroupId": "1011"
    },
    {
      "id": "TK-13",
      "name": "鴻巣",
      "yahooStationId": "22033",
      "inGroupId": "1010",
      "outGroupId": "1011"
    },
    {
      "id": "TK-14",
      "name": "北鴻巣",
      "yahooStationId": "22020",
      "inGroupId": "1010",
      "outGroupId": "1011"
    },
    {
      "id": "TK-15",
      "name": "吹上",
      "yahooStationId": "22122",
      "inGroupId": "1010",
      "outGroupId": "1011"
    },
    {
      "id": "TK-16",
      "name": "行田",
      "yahooStationId": "22026",
      "inGroupId": "1010",
      "outGroupId": "1011"
    },
    {
      "id": "TK-17",
      "name": "熊谷",
      "yahooStationId": "22029",
      "inGroupId": "1010",
      "outGroupId": "1011"
    },
    {
      "id": "TK-18",
      "name": "籠原",
      "yahooStationId": "22000",
      "inGroupId": "1010",
      "outGroupId": "1011"
    },
    {
      "id": "TK-19",
      "name": "深谷",
      "yahooStationId": "22121",
      "inGroupId": "1010",
      "outGroupId": "1011"
    },
    {
      "id": "TK-20",
      "name": "岡部",
      "yahooStationId": "21990",
      "inGroupId": "1010",
      "outGroupId": "1011"
    },
    {
      "id": "TK-21",
      "name": "本庄",
      "yahooStationId": "22132",
      "inGroupId": "1010",
      "outGroupId": "1011"
    },
    {
      "id": "TK-22",
      "name": "神保原",
      "yahooStationId": "22063",
      "inGroupId": "1010",
      "outGroupId": "1011"
    },
    {
      "id": "TK-23",
      "name": "新町",
      "yahooStationId": "21899",
      "inGroupId": "1010",
      "outGroupId": "1011"
    },
    {
      "id": "TK-24",
      "name": "倉賀野",
      "yahooStationId": "21876",
      "inGroupId": "1010",
      "outGroupId": "1011"
    },
    {
      "id": "TK-25",
      "name": "高崎",
      "yahooStationId": "21913",
      "inGroupId": "1010",
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
    "1": 236,
    "2": 253,
    "3": 591,
    "4": 243,
    "5": 92,
    "6": 221,
    "7": 229,
    "8": 94,
    "9": 104,
    "10": 252,
    "11": 209,
    "12": 230,
    "13": 161,
    "14": 111,
    "15": 273,
    "16": 368,
    "17": 267,
    "18": 233,
    "19": 307,
    "20": 223,
    "21": 249,
    "22": 326,
    "23": 226
  }
};
