// 東京メトロ南北線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "namboku",
  "name": "東京メトロ南北線",
  "stationsFilePath": "src/data/lines/namboku/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/namboku/stationTimetables.json",
    "globalTimetable": "src/data/lines/namboku/globalTimetable.json"
  },
  "stations": [
    {
      "id": "N-01",
      "name": "目黒",
      "yahooStationId": "23018",
      "inGroupId": "3360",
      "outGroupId": "3361"
    },
    {
      "id": "N-02",
      "name": "白金台",
      "yahooStationId": "29327",
      "inGroupId": "3360",
      "outGroupId": "3361"
    },
    {
      "id": "N-03",
      "name": "白金高輪",
      "yahooStationId": "29326",
      "inGroupId": "3360",
      "outGroupId": "3361"
    },
    {
      "id": "N-04",
      "name": "麻布十番",
      "yahooStationId": "29325",
      "inGroupId": "3360",
      "outGroupId": "3361"
    },
    {
      "id": "N-05",
      "name": "六本木一丁目",
      "yahooStationId": "29324",
      "inGroupId": "3360",
      "outGroupId": "3361"
    },
    {
      "id": "N-06",
      "name": "溜池山王",
      "yahooStationId": "29194",
      "inGroupId": "3360",
      "outGroupId": "3361"
    },
    {
      "id": "N-07",
      "name": "永田町",
      "yahooStationId": "22856",
      "inGroupId": "3360",
      "outGroupId": "3361"
    },
    {
      "id": "N-08",
      "name": "四ツ谷",
      "yahooStationId": "23041",
      "inGroupId": "3360",
      "outGroupId": "3361"
    },
    {
      "id": "N-09",
      "name": "市ケ谷",
      "yahooStationId": "22520",
      "inGroupId": "3360",
      "outGroupId": "3361"
    },
    {
      "id": "N-10",
      "name": "飯田橋",
      "yahooStationId": "22507",
      "inGroupId": "3360",
      "outGroupId": "3361"
    },
    {
      "id": "N-11",
      "name": "後楽園",
      "yahooStationId": "22675",
      "inGroupId": "3360",
      "outGroupId": "3361"
    },
    {
      "id": "N-12",
      "name": "東大前",
      "yahooStationId": "29075",
      "inGroupId": "3360",
      "outGroupId": "3361"
    },
    {
      "id": "N-13",
      "name": "本駒込",
      "yahooStationId": "29074",
      "inGroupId": "3360",
      "outGroupId": "3361"
    },
    {
      "id": "N-14",
      "name": "駒込",
      "yahooStationId": "22683",
      "inGroupId": "3360",
      "outGroupId": "3361"
    },
    {
      "id": "N-15",
      "name": "西ケ原",
      "yahooStationId": "22869",
      "inGroupId": "3360",
      "outGroupId": "3361"
    },
    {
      "id": "N-16",
      "name": "王子",
      "yahooStationId": "22549",
      "inGroupId": "3360",
      "outGroupId": "3361"
    },
    {
      "id": "N-17",
      "name": "王子神谷",
      "yahooStationId": "22551",
      "inGroupId": "3360",
      "outGroupId": "3361"
    },
    {
      "id": "N-18",
      "name": "志茂",
      "yahooStationId": "22718",
      "inGroupId": "3360",
      "outGroupId": "3361"
    },
    {
      "id": "N-19",
      "name": "赤羽岩淵",
      "yahooStationId": "22488",
      "inGroupId": "3360",
      "outGroupId": "3361"
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
    "急行": "express"
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
