// JR南武線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "nambu",
  "name": "JR南武線",
  "directStops": true,
  "stationsFilePath": "src/data/lines/nambu/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/nambu/stationTimetables.json",
    "globalTimetable": "src/data/lines/nambu/globalTimetable.json"
  },
  "stations": [
    {
      "id": "JN-01",
      "name": "川崎",
      "yahooStationId": "23126",
      "inGroupId": null,
      "outGroupId": "1211"
    },
    {
      "id": "JN-02",
      "name": "尻手",
      "yahooStationId": "23195",
      "inGroupId": "1210",
      "outGroupId": "1221"
    },
    {
      "id": "JN-03",
      "name": "矢向",
      "yahooStationId": "23355",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-04",
      "name": "鹿島田",
      "yahooStationId": "23104",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-05",
      "name": "平間",
      "yahooStationId": "23300",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-06",
      "name": "向河原",
      "yahooStationId": "23343",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-07",
      "name": "武蔵小杉",
      "yahooStationId": "23345",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-08",
      "name": "武蔵中原",
      "yahooStationId": "23348",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-09",
      "name": "武蔵新城",
      "yahooStationId": "23347",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-10",
      "name": "武蔵溝ノ口",
      "yahooStationId": "23349",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-11",
      "name": "津田山",
      "yahooStationId": "23239",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-12",
      "name": "久地",
      "yahooStationId": "23139",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-13",
      "name": "宿河原",
      "yahooStationId": "23188",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-14",
      "name": "登戸",
      "yahooStationId": "23275",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-15",
      "name": "中野島",
      "yahooStationId": "23257",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-16",
      "name": "稲田堤",
      "yahooStationId": "23076",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-17",
      "name": "矢野口",
      "yahooStationId": "23029",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-18",
      "name": "稲城長沼",
      "yahooStationId": "22523",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-19",
      "name": "南多摩",
      "yahooStationId": "22996",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-20",
      "name": "府中本町",
      "yahooStationId": "22963",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-21",
      "name": "分倍河原",
      "yahooStationId": "22966",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-22",
      "name": "西府",
      "yahooStationId": "29639",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-23",
      "name": "谷保",
      "yahooStationId": "23031",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-24",
      "name": "矢川",
      "yahooStationId": "23025",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-25",
      "name": "西国立",
      "yahooStationId": "22871",
      "inGroupId": "1210",
      "outGroupId": "1211"
    },
    {
      "id": "JN-26",
      "name": "立川",
      "yahooStationId": "22799",
      "inGroupId": "1210",
      "outGroupId": null
    },
    {
      "id": "JN-51",
      "name": "八丁畷",
      "yahooStationId": "23277",
      "inGroupId": "1220",
      "outGroupId": "1221"
    },
    {
      "id": "JN-52",
      "name": "川崎新町",
      "yahooStationId": "23127",
      "inGroupId": "1220",
      "outGroupId": "1221"
    },
    {
      "id": "JN-53",
      "name": "小田栄",
      "yahooStationId": "29768",
      "inGroupId": "1220",
      "outGroupId": "1221"
    },
    {
      "id": "JN-54",
      "name": "浜川崎",
      "yahooStationId": "23284",
      "inGroupId": "1220",
      "outGroupId": null
    }
  ],
  "stationNameAliases": {},
  "trainTypeMap": {
    "各駅停車": "local",
    "普通": "local",
    "快速": "rapid"
  },
  "defaultCars": 6,
  "baseSectionSeconds": {
    "1": 130,
    "2": 130,
    "3": 130,
    "4": 130,
    "5": 130,
    "6": 130,
    "7": 130,
    "8": 130,
    "9": 130,
    "10": 130,
    "11": 130,
    "12": 130,
    "13": 130,
    "14": 130,
    "15": 130,
    "16": 130,
    "17": 130,
    "18": 130,
    "19": 130,
    "20": 130,
    "21": 130,
    "22": 130,
    "23": 130,
    "24": 130,
    "25": 130,
    "26": 130,
    "27": 130,
    "28": 130,
    "29": 130,
    "30": 130
  }
};
