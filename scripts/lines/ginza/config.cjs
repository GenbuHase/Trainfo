// 東京メトロ銀座線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "ginza",
  "name": "東京メトロ銀座線",
  "stationsFilePath": "src/data/lines/ginza/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/ginza/stationTimetables.json",
    "globalTimetable": "src/data/lines/ginza/globalTimetable.json"
  },
  "stations": [
    {
      "id": "G-01",
      "name": "渋谷",
      "yahooStationId": "22715",
      "inGroupId": null,
      "outGroupId": "3270"
    },
    {
      "id": "G-02",
      "name": "表参道",
      "yahooStationId": "22588",
      "inGroupId": "3271",
      "outGroupId": "3270"
    },
    {
      "id": "G-03",
      "name": "外苑前",
      "yahooStationId": "22618",
      "inGroupId": "3271",
      "outGroupId": "3270"
    },
    {
      "id": "G-04",
      "name": "青山一丁目",
      "yahooStationId": "22484",
      "inGroupId": "3271",
      "outGroupId": "3270"
    },
    {
      "id": "G-05",
      "name": "赤坂見附",
      "yahooStationId": "22486",
      "inGroupId": "3271",
      "outGroupId": "3270"
    },
    {
      "id": "G-06",
      "name": "溜池山王",
      "yahooStationId": "29194",
      "inGroupId": "3271",
      "outGroupId": "3270"
    },
    {
      "id": "G-07",
      "name": "虎ノ門",
      "yahooStationId": "22841",
      "inGroupId": "3271",
      "outGroupId": "3270"
    },
    {
      "id": "G-08",
      "name": "新橋",
      "yahooStationId": "22751",
      "inGroupId": "3271",
      "outGroupId": "3270"
    },
    {
      "id": "G-09",
      "name": "銀座",
      "yahooStationId": "22641",
      "inGroupId": "3271",
      "outGroupId": "3270"
    },
    {
      "id": "G-10",
      "name": "京橋",
      "yahooStationId": "22623",
      "inGroupId": "3271",
      "outGroupId": "3270"
    },
    {
      "id": "G-11",
      "name": "日本橋",
      "yahooStationId": "22884",
      "inGroupId": "3271",
      "outGroupId": "3270"
    },
    {
      "id": "G-12",
      "name": "三越前",
      "yahooStationId": "22989",
      "inGroupId": "3271",
      "outGroupId": "3270"
    },
    {
      "id": "G-13",
      "name": "神田",
      "yahooStationId": "22617",
      "inGroupId": "3271",
      "outGroupId": "3270"
    },
    {
      "id": "G-14",
      "name": "末広町",
      "yahooStationId": "22759",
      "inGroupId": "3271",
      "outGroupId": "3270"
    },
    {
      "id": "G-15",
      "name": "上野広小路",
      "yahooStationId": "22529",
      "inGroupId": "3271",
      "outGroupId": "3270"
    },
    {
      "id": "G-16",
      "name": "上野",
      "yahooStationId": "22528",
      "inGroupId": "3271",
      "outGroupId": "3270"
    },
    {
      "id": "G-17",
      "name": "稲荷町",
      "yahooStationId": "22524",
      "inGroupId": "3271",
      "outGroupId": "3270"
    },
    {
      "id": "G-18",
      "name": "田原町",
      "yahooStationId": "22811",
      "inGroupId": "3271",
      "outGroupId": "3270"
    },
    {
      "id": "G-19",
      "name": "浅草",
      "yahooStationId": "22495",
      "inGroupId": "3271",
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
    "各停": "local"
  },
  "defaultCars": 6,
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
    "13": 120,
    "14": 120,
    "15": 120,
    "16": 120,
    "17": 120,
    "18": 120
  }
};
