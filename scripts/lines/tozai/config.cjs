// 東京メトロ東西線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "tozai",
  "name": "東京メトロ東西線",
  "stationsFilePath": "src/data/lines/tozai/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/tozai/stationTimetables.json",
    "globalTimetable": "src/data/lines/tozai/globalTimetable.json"
  },
  "stations": [
    {
      "id": "T-01",
      "name": "中野",
      "yahooStationId": "22849",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-02",
      "name": "落合",
      "yahooStationId": "22583",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-03",
      "name": "高田馬場",
      "yahooStationId": "22790",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-04",
      "name": "早稲田",
      "yahooStationId": "23053",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-05",
      "name": "神楽坂",
      "yahooStationId": "22591",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-06",
      "name": "飯田橋",
      "yahooStationId": "22507",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-07",
      "name": "九段下",
      "yahooStationId": "22645",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-08",
      "name": "竹橋",
      "yahooStationId": "22797",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-09",
      "name": "大手町",
      "yahooStationId": "22564",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-10",
      "name": "日本橋",
      "yahooStationId": "22884",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-11",
      "name": "茅場町",
      "yahooStationId": "22614",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-12",
      "name": "門前仲町",
      "yahooStationId": "23024",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-13",
      "name": "木場",
      "yahooStationId": "22638",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-14",
      "name": "東陽町",
      "yahooStationId": "22830",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-15",
      "name": "南砂町",
      "yahooStationId": "22994",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-16",
      "name": "西葛西",
      "yahooStationId": "22868",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-17",
      "name": "葛西",
      "yahooStationId": "22592",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-18",
      "name": "浦安",
      "yahooStationId": "22206",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-19",
      "name": "南行徳",
      "yahooStationId": "22453",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-20",
      "name": "行徳",
      "yahooStationId": "22265",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-21",
      "name": "妙典",
      "yahooStationId": "29305",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-22",
      "name": "原木中山",
      "yahooStationId": "22407",
      "inGroupId": "3310",
      "outGroupId": "3311"
    },
    {
      "id": "T-23",
      "name": "西船橋",
      "yahooStationId": "22401",
      "inGroupId": "3310",
      "outGroupId": "3311"
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
    "快速": "rapid",
    "通勤快速": "commuter_rapid",
    "通快": "commuter_rapid",
    "東葉快速": "rapid"
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
    "13": 120,
    "14": 120,
    "15": 120,
    "16": 120,
    "17": 120,
    "18": 120,
    "19": 120,
    "20": 120,
    "21": 120,
    "22": 120
  }
};
