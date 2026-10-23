// 東京メトロ日比谷線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "hibiya",
  "name": "東京メトロ日比谷線",
  "stationsFilePath": "src/data/lines/hibiya/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/hibiya/stationTimetables.json",
    "globalTimetable": "src/data/lines/hibiya/globalTimetable.json"
  },
  "stations": [
    {
      "id": "H-01",
      "name": "中目黒",
      "yahooStationId": "22855",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-02",
      "name": "恵比寿",
      "yahooStationId": "22548",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-03",
      "name": "広尾",
      "yahooStationId": "22954",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-04",
      "name": "六本木",
      "yahooStationId": "23049",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-05",
      "name": "神谷町",
      "yahooStationId": "22610",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-06",
      "name": "虎ノ門ヒルズ",
      "yahooStationId": "29819",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-07",
      "name": "霞ケ関",
      "yahooStationId": "22596",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-08",
      "name": "日比谷",
      "yahooStationId": "22951",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-09",
      "name": "銀座",
      "yahooStationId": "22641",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-10",
      "name": "東銀座",
      "yahooStationId": "22930",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-11",
      "name": "築地",
      "yahooStationId": "22821",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-12",
      "name": "八丁堀",
      "yahooStationId": "22894",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-13",
      "name": "茅場町",
      "yahooStationId": "22614",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-14",
      "name": "人形町",
      "yahooStationId": "22885",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-15",
      "name": "小伝馬町",
      "yahooStationId": "22681",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-16",
      "name": "秋葉原",
      "yahooStationId": "22492",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-17",
      "name": "仲御徒町",
      "yahooStationId": "22846",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-18",
      "name": "上野",
      "yahooStationId": "22528",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-19",
      "name": "入谷",
      "yahooStationId": "22526",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-20",
      "name": "三ノ輪",
      "yahooStationId": "22999",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-21",
      "name": "南千住",
      "yahooStationId": "22995",
      "inGroupId": "3301",
      "outGroupId": "3300"
    },
    {
      "id": "H-22",
      "name": "北千住",
      "yahooStationId": "22630",
      "inGroupId": "3301",
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
    "THライナー": "th_liner",
    "ＴＨライナー": "th_liner"
  },
  "defaultCars": 7,
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
    "18": 120,
    "19": 120,
    "20": 120,
    "21": 120
  }
};
