// 東京メトロ半蔵門線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "hanzomon",
  "name": "東京メトロ半蔵門線",
  "stationsFilePath": "src/data/lines/hanzomon/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/hanzomon/stationTimetables.json",
    "globalTimetable": "src/data/lines/hanzomon/globalTimetable.json"
  },
  "stations": [
    {
      "id": "Z-01",
      "name": "渋谷",
      "yahooStationId": "22715",
      "inGroupId": "3350",
      "outGroupId": "3351"
    },
    {
      "id": "Z-02",
      "name": "表参道",
      "yahooStationId": "22588",
      "inGroupId": "3350",
      "outGroupId": "3351"
    },
    {
      "id": "Z-03",
      "name": "青山一丁目",
      "yahooStationId": "22484",
      "inGroupId": "3350",
      "outGroupId": "3351"
    },
    {
      "id": "Z-04",
      "name": "永田町",
      "yahooStationId": "22856",
      "inGroupId": "3350",
      "outGroupId": "3351"
    },
    {
      "id": "Z-05",
      "name": "半蔵門",
      "yahooStationId": "22917",
      "inGroupId": "3350",
      "outGroupId": "3351"
    },
    {
      "id": "Z-06",
      "name": "九段下",
      "yahooStationId": "22645",
      "inGroupId": "3350",
      "outGroupId": "3351"
    },
    {
      "id": "Z-07",
      "name": "神保町",
      "yahooStationId": "22756",
      "inGroupId": "3350",
      "outGroupId": "3351"
    },
    {
      "id": "Z-08",
      "name": "大手町",
      "yahooStationId": "22564",
      "inGroupId": "3350",
      "outGroupId": "3351"
    },
    {
      "id": "Z-09",
      "name": "三越前",
      "yahooStationId": "22989",
      "inGroupId": "3350",
      "outGroupId": "3351"
    },
    {
      "id": "Z-10",
      "name": "水天宮前",
      "yahooStationId": "22757",
      "inGroupId": "3350",
      "outGroupId": "3351"
    },
    {
      "id": "Z-11",
      "name": "清澄白河",
      "yahooStationId": "29338",
      "inGroupId": "3350",
      "outGroupId": "3351"
    },
    {
      "id": "Z-12",
      "name": "住吉",
      "yahooStationId": "22763",
      "inGroupId": "3350",
      "outGroupId": "3351"
    },
    {
      "id": "Z-13",
      "name": "錦糸町",
      "yahooStationId": "22640",
      "inGroupId": "3350",
      "outGroupId": "3351"
    },
    {
      "id": "Z-14",
      "name": "押上",
      "yahooStationId": "22578",
      "inGroupId": "3350",
      "outGroupId": null
    }
  ],
  "stationNameAliases": {
    "霞ケ関(東京都)": "霞ケ関",
    "八丁堀(東京都)": "八丁堀",
    "入谷(東京都)": "入谷",
    "新宿(東京メトロ)": "新宿",
    "大手町(東京都)": "大手町",
    "住吉(東京都)": "住吉",
    "京橋(東京都)": "京橋",
    "日本橋(東京都)": "日本橋",
    "神田(東京都)": "神田",
    "末広町(東京都)": "末広町",
    "稲荷町(東京都)": "稲荷町",
    "田原町(東京都)": "田原町",
    "中野(東京都)": "中野",
    "落合(東京都)": "落合",
    "早稲田(東京メトロ)": "早稲田",
    "木場(東京都)": "木場",
    "浦安(千葉県)": "浦安",
    "押上〈スカイツリー前〉": "押上"
  },
  "trainTypeMap": {
    "各駅停車": "local",
    "普通": "local",
    "各停": "local",
    "準急": "semiExp",
    "急行": "express"
  },
  "defaultCars": 10,
  "baseSectionSeconds": {
    "1": 120,
    "2": 120,
    "3": 120,
    "4": 120,
    "5": 120,
    "6": 120,
    "7": 120,
    "8": 120,
    "9": 120,
    "10": 120,
    "11": 120,
    "12": 120,
    "13": 120
  }
};
