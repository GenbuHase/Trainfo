// JR外房線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "sotobo",
  "name": "JR外房線",
  "stationsFilePath": "src/data/lines/sotobo/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/sotobo/stationTimetables.json",
    "globalTimetable": "src/data/lines/sotobo/globalTimetable.json"
  },
  "stations": [
    {
      "id": "SB-01",
      "name": "千葉",
      "yahooStationId": "22361",
      "inGroupId": null,
      "outGroupId": "901"
    },
    {
      "id": "SB-02",
      "name": "本千葉",
      "yahooStationId": "22433",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-03",
      "name": "蘇我",
      "yahooStationId": "22341",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-04",
      "name": "鎌取",
      "yahooStationId": "22251",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-05",
      "name": "誉田",
      "yahooStationId": "22432",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-06",
      "name": "土気",
      "yahooStationId": "22376",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-07",
      "name": "大網",
      "yahooStationId": "22211",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-08",
      "name": "永田",
      "yahooStationId": "22383",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-09",
      "name": "本納",
      "yahooStationId": "22434",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-10",
      "name": "新茂原",
      "yahooStationId": "22333",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-11",
      "name": "茂原",
      "yahooStationId": "22466",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-12",
      "name": "八積",
      "yahooStationId": "22471",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-13",
      "name": "上総一ノ宮",
      "yahooStationId": "22230",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-14",
      "name": "東浪見",
      "yahooStationId": "22379",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-15",
      "name": "太東",
      "yahooStationId": "22343",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-16",
      "name": "長者町",
      "yahooStationId": "22355",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-17",
      "name": "三門",
      "yahooStationId": "22448",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-18",
      "name": "大原",
      "yahooStationId": "22216",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-19",
      "name": "浪花",
      "yahooStationId": "22387",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-20",
      "name": "御宿",
      "yahooStationId": "22224",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-21",
      "name": "勝浦",
      "yahooStationId": "22246",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-22",
      "name": "鵜原",
      "yahooStationId": "22203",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-23",
      "name": "上総興津",
      "yahooStationId": "22233",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-24",
      "name": "行川アイランド",
      "yahooStationId": "22389",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-25",
      "name": "安房小湊",
      "yahooStationId": "22189",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-26",
      "name": "安房天津",
      "yahooStationId": "22186",
      "inGroupId": "900",
      "outGroupId": "901"
    },
    {
      "id": "SB-27",
      "name": "安房鴨川",
      "yahooStationId": "22188",
      "inGroupId": "900",
      "outGroupId": null
    }
  ],
  "stationNameAliases": {},
  "trainTypeMap": {
    "普通": "local",
    "各駅停車": "local",
    "快速": "rapid",
    "通勤快速": "rapid",
    "特急": "limitedExp",
    "わかしお": "limitedExp",
    "新宿わかしお": "limitedExp"
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
    "22": 180,
    "23": 180,
    "24": 180,
    "25": 180,
    "26": 180,
    "27": 180
  }
};
