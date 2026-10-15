// JR東海道線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "tokaido",
  "name": "JR東海道線",
  "stationsFilePath": "src/data/lines/tokaido/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/tokaido/stationTimetables.json",
    "globalTimetable": "src/data/lines/tokaido/globalTimetable.json"
  },
  "stations": [
    {
      "id": "JT-01",
      "name": "東京",
      "yahooStationId": "22828",
      "inGroupId": null,
      "outGroupId": "1171"
    },
    {
      "id": "JT-02",
      "name": "新橋",
      "yahooStationId": "22751",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "JT-03",
      "name": "品川",
      "yahooStationId": "22709",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "JT-04",
      "name": "川崎",
      "yahooStationId": "23126",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "JT-05",
      "name": "横浜",
      "yahooStationId": "23368",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "JT-06",
      "name": "戸塚",
      "yahooStationId": "23251",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "JT-07",
      "name": "大船",
      "yahooStationId": "23096",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "JT-08",
      "name": "藤沢",
      "yahooStationId": "23304",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "JT-09",
      "name": "辻堂",
      "yahooStationId": "23238",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "JT-10",
      "name": "茅ケ崎",
      "yahooStationId": "23234",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "JT-11",
      "name": "平塚",
      "yahooStationId": "23298",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "JT-12",
      "name": "大磯",
      "yahooStationId": "23091",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "JT-13",
      "name": "二宮",
      "yahooStationId": "23269",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "JT-14",
      "name": "国府津",
      "yahooStationId": "23156",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "JT-15",
      "name": "鴨宮",
      "yahooStationId": "23124",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "JT-16",
      "name": "小田原",
      "yahooStationId": "23098",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "JT-17",
      "name": "早川",
      "yahooStationId": "23285",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "JT-18",
      "name": "根府川",
      "yahooStationId": "23271",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "JT-19",
      "name": "真鶴",
      "yahooStationId": "23324",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "JT-20",
      "name": "湯河原",
      "yahooStationId": "23363",
      "inGroupId": "1170",
      "outGroupId": "1171"
    },
    {
      "id": "JT-21",
      "name": "熱海",
      "yahooStationId": "23452",
      "inGroupId": "1170",
      "outGroupId": "1361"
    },
    {
      "id": "CA-01",
      "name": "函南",
      "yahooStationId": "23515",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-02",
      "name": "三島",
      "yahooStationId": "23636",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-03",
      "name": "沼津",
      "yahooStationId": "23600",
      "inGroupId": "1360",
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
    "3": 636,
    "4": 551,
    "5": 597,
    "6": 285,
    "7": 246,
    "8": 201,
    "9": 199,
    "10": 294,
    "11": 205,
    "12": 291,
    "13": 243,
    "14": 174,
    "15": 172,
    "16": 117,
    "17": 227,
    "18": 283,
    "19": 165,
    "20": 288,
    "21": 540,
    "22": 300,
    "23": 300
  }
};
