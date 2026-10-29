// JR成田線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "narita",
  "name": "JR成田線",
  "directStops": true,
  "stationsFilePath": "src/data/lines/narita/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/narita/stationTimetables.json",
    "globalTimetable": "src/data/lines/narita/globalTimetable.json"
  },
  "stations": [
    {
      "id": "NR-01",
      "name": "佐倉",
      "yahooStationId": "22306",
      "inGroupId": null,
      "outGroupId": "831"
    },
    {
      "id": "NR-02",
      "name": "酒々井",
      "yahooStationId": "22314",
      "inGroupId": "830",
      "outGroupId": "831"
    },
    {
      "id": "NR-03",
      "name": "成田",
      "yahooStationId": "22391",
      "inGroupId": "830",
      "outGroupId": [
        "831",
        "851"
      ]
    },
    {
      "id": "NR-04",
      "name": "久住",
      "yahooStationId": "22269",
      "inGroupId": "830",
      "outGroupId": "831"
    },
    {
      "id": "NR-05",
      "name": "滑河",
      "yahooStationId": "22388",
      "inGroupId": "830",
      "outGroupId": "831"
    },
    {
      "id": "NR-06",
      "name": "下総神崎",
      "yahooStationId": "22317",
      "inGroupId": "830",
      "outGroupId": "831"
    },
    {
      "id": "NR-07",
      "name": "大戸",
      "yahooStationId": "22214",
      "inGroupId": "830",
      "outGroupId": "831"
    },
    {
      "id": "NR-08",
      "name": "佐原",
      "yahooStationId": "22312",
      "inGroupId": "830",
      "outGroupId": "831"
    },
    {
      "id": "NR-09",
      "name": "香取",
      "yahooStationId": "22248",
      "inGroupId": "830",
      "outGroupId": "831"
    },
    {
      "id": "NR-10",
      "name": "水郷",
      "yahooStationId": "22337",
      "inGroupId": "830",
      "outGroupId": "831"
    },
    {
      "id": "NR-11",
      "name": "小見川",
      "yahooStationId": "22222",
      "inGroupId": "830",
      "outGroupId": "831"
    },
    {
      "id": "NR-12",
      "name": "笹川",
      "yahooStationId": "22308",
      "inGroupId": "830",
      "outGroupId": "831"
    },
    {
      "id": "NR-13",
      "name": "下総橘",
      "yahooStationId": "22318",
      "inGroupId": "830",
      "outGroupId": "831"
    },
    {
      "id": "NR-14",
      "name": "下総豊里",
      "yahooStationId": "22319",
      "inGroupId": "830",
      "outGroupId": "831"
    },
    {
      "id": "NR-15",
      "name": "椎柴",
      "yahooStationId": "22313",
      "inGroupId": "830",
      "outGroupId": "831"
    },
    {
      "id": "NR-16",
      "name": "松岸",
      "yahooStationId": "22443",
      "inGroupId": "930",
      "outGroupId": "931"
    },
    {
      "id": "NR-17",
      "name": "銚子",
      "yahooStationId": "22354",
      "inGroupId": "830",
      "outGroupId": null
    },
    {
      "id": "NR-36",
      "name": "空港第2ビル",
      "yahooStationId": "22267",
      "inGroupId": "850",
      "outGroupId": "851"
    },
    {
      "id": "NR-37",
      "name": "成田空港",
      "yahooStationId": "22392",
      "inGroupId": "850",
      "outGroupId": null
    },
    {
      "id": "NR-20",
      "name": "我孫子",
      "yahooStationId": "22183",
      "inGroupId": null,
      "outGroupId": "841"
    },
    {
      "id": "NR-21",
      "name": "東我孫子",
      "yahooStationId": "22409",
      "inGroupId": "840",
      "outGroupId": "841"
    },
    {
      "id": "NR-22",
      "name": "湖北",
      "yahooStationId": "22300",
      "inGroupId": "840",
      "outGroupId": "841"
    },
    {
      "id": "NR-23",
      "name": "新木",
      "yahooStationId": "22185",
      "inGroupId": "840",
      "outGroupId": "841"
    },
    {
      "id": "NR-24",
      "name": "布佐",
      "yahooStationId": "22422",
      "inGroupId": "840",
      "outGroupId": "841"
    },
    {
      "id": "NR-25",
      "name": "木下",
      "yahooStationId": "22255",
      "inGroupId": "840",
      "outGroupId": "841"
    },
    {
      "id": "NR-26",
      "name": "小林",
      "yahooStationId": "22299",
      "inGroupId": "840",
      "outGroupId": "841"
    },
    {
      "id": "NR-27",
      "name": "安食",
      "yahooStationId": "22179",
      "inGroupId": "840",
      "outGroupId": "841"
    },
    {
      "id": "NR-28",
      "name": "下総松崎",
      "yahooStationId": "22321",
      "inGroupId": "840",
      "outGroupId": "841"
    }
  ],
  "stationNameAliases": {
    "空港第２ビル(鉄道)": "空港第2ビル",
    "空港第2ビル(鉄道)": "空港第2ビル",
    "成田空港(鉄道)": "成田空港"
  },
  "trainTypeMap": {
    "普通": "local",
    "各駅停車": "local",
    "快速": "rapid",
    "通勤快速": "rapid",
    "特急": "limitedExp",
    "成田エクスプレス": "limitedExp"
  },
  "defaultCars": 10,
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
    "28": 180
  }
};
