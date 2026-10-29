// JR総武本線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "sobu_main",
  "name": "JR総武本線",
  "stationsFilePath": "src/data/lines/sobu_main/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/sobu_main/stationTimetables.json",
    "globalTimetable": "src/data/lines/sobu_main/globalTimetable.json"
  },
  "stations": [
    {
      "id": "SM-01",
      "name": "千葉",
      "yahooStationId": "22361",
      "inGroupId": null,
      "outGroupId": [
        "931",
        "831"
      ]
    },
    {
      "id": "SM-02",
      "name": "東千葉",
      "yahooStationId": "22411",
      "inGroupId": "930",
      "outGroupId": [
        "931",
        "831"
      ]
    },
    {
      "id": "SM-03",
      "name": "都賀",
      "yahooStationId": "22368",
      "inGroupId": "930",
      "outGroupId": [
        "931",
        "831"
      ]
    },
    {
      "id": "SM-04",
      "name": "四街道",
      "yahooStationId": "22479",
      "inGroupId": "930",
      "outGroupId": [
        "931",
        "831"
      ]
    },
    {
      "id": "SM-05",
      "name": "物井",
      "yahooStationId": "22465",
      "inGroupId": "930",
      "outGroupId": [
        "931",
        "831"
      ]
    },
    {
      "id": "SM-06",
      "name": "佐倉",
      "yahooStationId": "22306",
      "inGroupId": "930",
      "outGroupId": "931"
    },
    {
      "id": "SM-07",
      "name": "南酒々井",
      "yahooStationId": "22454",
      "inGroupId": "930",
      "outGroupId": "931"
    },
    {
      "id": "SM-08",
      "name": "榎戸",
      "yahooStationId": "22209",
      "inGroupId": "930",
      "outGroupId": "931"
    },
    {
      "id": "SM-09",
      "name": "八街",
      "yahooStationId": "22468",
      "inGroupId": "930",
      "outGroupId": "931"
    },
    {
      "id": "SM-10",
      "name": "日向",
      "yahooStationId": "22408",
      "inGroupId": "930",
      "outGroupId": "931"
    },
    {
      "id": "SM-11",
      "name": "成東",
      "yahooStationId": "22393",
      "inGroupId": "930",
      "outGroupId": "931"
    },
    {
      "id": "SM-12",
      "name": "松尾",
      "yahooStationId": "22442",
      "inGroupId": "930",
      "outGroupId": "931"
    },
    {
      "id": "SM-13",
      "name": "横芝",
      "yahooStationId": "22477",
      "inGroupId": "930",
      "outGroupId": "931"
    },
    {
      "id": "SM-14",
      "name": "飯倉",
      "yahooStationId": "22191",
      "inGroupId": "930",
      "outGroupId": "931"
    },
    {
      "id": "SM-15",
      "name": "八日市場",
      "yahooStationId": "22475",
      "inGroupId": "930",
      "outGroupId": "931"
    },
    {
      "id": "SM-16",
      "name": "干潟",
      "yahooStationId": "22418",
      "inGroupId": "930",
      "outGroupId": "931"
    },
    {
      "id": "SM-17",
      "name": "旭",
      "yahooStationId": "22177",
      "inGroupId": "930",
      "outGroupId": "931"
    },
    {
      "id": "SM-18",
      "name": "飯岡",
      "yahooStationId": "22190",
      "inGroupId": "930",
      "outGroupId": "931"
    },
    {
      "id": "SM-19",
      "name": "倉橋",
      "yahooStationId": "22272",
      "inGroupId": "930",
      "outGroupId": "931"
    },
    {
      "id": "SM-20",
      "name": "猿田",
      "yahooStationId": "22311",
      "inGroupId": "930",
      "outGroupId": "931"
    },
    {
      "id": "SM-21",
      "name": "松岸",
      "yahooStationId": "22443",
      "inGroupId": "930",
      "outGroupId": "931"
    },
    {
      "id": "SM-22",
      "name": "銚子",
      "yahooStationId": "22354",
      "inGroupId": "930",
      "outGroupId": null
    }
  ],
  "stationNameAliases": {
    "成田空港(鉄道)": "成田空港",
    "空港第2ビル(鉄道)": "空港第2ビル",
    "空港第２ビル(鉄道)": "空港第2ビル"
  },
  "trainTypeMap": {
    "普通": "local",
    "各駅停車": "local",
    "快速": "rapid",
    "通勤快速": "rapid",
    "特急": "limitedExp",
    "しおさい": "limitedExp",
    "成田エクスプレス": "limitedExp"
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
    "22": 180
  }
};
