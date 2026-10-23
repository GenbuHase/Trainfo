// 東京メトロ丸ノ内線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "marunouchi",
  "name": "東京メトロ丸ノ内線",
  "stationsFilePath": "src/data/lines/marunouchi/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/marunouchi/stationTimetables.json",
    "globalTimetable": "src/data/lines/marunouchi/globalTimetable.json"
  },
  "stations": [
    {
      "id": "M-01",
      "name": "荻窪",
      "yahooStationId": "22573",
      "inGroupId": null,
      "outGroupId": "3280"
    },
    {
      "id": "M-02",
      "name": "南阿佐ケ谷",
      "yahooStationId": "22991",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-03",
      "name": "新高円寺",
      "yahooStationId": "22735",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-04",
      "name": "東高円寺",
      "yahooStationId": "22932",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-05",
      "name": "新中野",
      "yahooStationId": "22749",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-06",
      "name": "中野坂上",
      "yahooStationId": "22850",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-07",
      "name": "西新宿",
      "yahooStationId": "29085",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-08",
      "name": "新宿",
      "yahooStationId": "29342",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-09",
      "name": "新宿三丁目",
      "yahooStationId": "22743",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-10",
      "name": "新宿御苑前",
      "yahooStationId": "22742",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-11",
      "name": "四谷三丁目",
      "yahooStationId": "23042",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-12",
      "name": "四ツ谷",
      "yahooStationId": "23041",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-13",
      "name": "赤坂見附",
      "yahooStationId": "22486",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-14",
      "name": "国会議事堂前",
      "yahooStationId": "22668",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-15",
      "name": "霞ケ関",
      "yahooStationId": "22596",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-16",
      "name": "銀座",
      "yahooStationId": "22641",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-17",
      "name": "東京",
      "yahooStationId": "22828",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-18",
      "name": "大手町",
      "yahooStationId": "22564",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-19",
      "name": "淡路町",
      "yahooStationId": "22506",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-20",
      "name": "御茶ノ水",
      "yahooStationId": "22582",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-21",
      "name": "本郷三丁目",
      "yahooStationId": "22973",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-22",
      "name": "後楽園",
      "yahooStationId": "22675",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-23",
      "name": "茗荷谷",
      "yahooStationId": "22982",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-24",
      "name": "新大塚",
      "yahooStationId": "22731",
      "inGroupId": "3281",
      "outGroupId": "3280"
    },
    {
      "id": "M-25",
      "name": "池袋",
      "yahooStationId": "22513",
      "inGroupId": "3281",
      "outGroupId": null
    },
    {
      "id": "Mb-03",
      "name": "方南町",
      "yahooStationId": "22969",
      "inGroupId": null,
      "outGroupId": "3290"
    },
    {
      "id": "Mb-04",
      "name": "中野富士見町",
      "yahooStationId": "22852",
      "inGroupId": "3291",
      "outGroupId": "3290"
    },
    {
      "id": "Mb-05",
      "name": "中野新橋",
      "yahooStationId": "22851",
      "inGroupId": "3291",
      "outGroupId": "3290"
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
    "18": 120,
    "19": 120,
    "20": 120,
    "21": 120,
    "22": 120,
    "23": 120,
    "24": 120,
    "25": 120,
    "26": 120,
    "27": 120
  },
  "directStops": true
};
