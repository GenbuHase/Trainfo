// JR山手線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  "lineId": "yamanote",
  "name": "JR山手線",
  "stationsFilePath": "src/data/lines/yamanote/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/yamanote/stationTimetables.json",
    "globalTimetable": "src/data/lines/yamanote/globalTimetable.json"
  },
  "stations": [
    {
      "id": "JY-01",
      "name": "東京",
      "yahooStationId": "22828",
      "inGroupId": "7181",
      "outGroupId": "7180"
    },
    {
      "id": "JY-02",
      "name": "神田",
      "yahooStationId": "22617",
      "inGroupId": "7181",
      "outGroupId": "7180"
    },
    {
      "id": "JY-03",
      "name": "秋葉原",
      "yahooStationId": "22492",
      "inGroupId": "7181",
      "outGroupId": "7180"
    },
    {
      "id": "JY-04",
      "name": "御徒町",
      "yahooStationId": "22570",
      "inGroupId": "7181",
      "outGroupId": "7180"
    },
    {
      "id": "JY-05",
      "name": "上野",
      "yahooStationId": "22528",
      "inGroupId": "7181",
      "outGroupId": "7180"
    },
    {
      "id": "JY-06",
      "name": "鶯谷",
      "yahooStationId": "22531",
      "inGroupId": "7181",
      "outGroupId": "7180"
    },
    {
      "id": "JY-07",
      "name": "日暮里",
      "yahooStationId": "22862",
      "inGroupId": "7181",
      "outGroupId": "7180"
    },
    {
      "id": "JY-08",
      "name": "西日暮里",
      "yahooStationId": "22880",
      "inGroupId": "7181",
      "outGroupId": "7180"
    },
    {
      "id": "JY-09",
      "name": "田端",
      "yahooStationId": "22802",
      "inGroupId": "7181",
      "outGroupId": "7170"
    },
    {
      "id": "JY-10",
      "name": "駒込",
      "yahooStationId": "22683",
      "inGroupId": "7171",
      "outGroupId": "7170"
    },
    {
      "id": "JY-11",
      "name": "巣鴨",
      "yahooStationId": "22760",
      "inGroupId": "7171",
      "outGroupId": "7170"
    },
    {
      "id": "JY-12",
      "name": "大塚",
      "yahooStationId": "22562",
      "inGroupId": "7171",
      "outGroupId": "7170"
    },
    {
      "id": "JY-13",
      "name": "池袋",
      "yahooStationId": "22513",
      "inGroupId": "7171",
      "outGroupId": "7170"
    },
    {
      "id": "JY-14",
      "name": "目白",
      "yahooStationId": "23019",
      "inGroupId": "7171",
      "outGroupId": "7170"
    },
    {
      "id": "JY-15",
      "name": "高田馬場",
      "yahooStationId": "22790",
      "inGroupId": "7171",
      "outGroupId": "7170"
    },
    {
      "id": "JY-16",
      "name": "新大久保",
      "yahooStationId": "22730",
      "inGroupId": "7171",
      "outGroupId": "7170"
    },
    {
      "id": "JY-17",
      "name": "新宿",
      "yahooStationId": "22741",
      "inGroupId": "7171",
      "outGroupId": "7170"
    },
    {
      "id": "JY-18",
      "name": "代々木",
      "yahooStationId": "23043",
      "inGroupId": "7171",
      "outGroupId": "7170"
    },
    {
      "id": "JY-19",
      "name": "原宿",
      "yahooStationId": "22916",
      "inGroupId": "7171",
      "outGroupId": "7170"
    },
    {
      "id": "JY-20",
      "name": "渋谷",
      "yahooStationId": "22715",
      "inGroupId": "7171",
      "outGroupId": "7170"
    },
    {
      "id": "JY-21",
      "name": "恵比寿",
      "yahooStationId": "22548",
      "inGroupId": "7171",
      "outGroupId": "7170"
    },
    {
      "id": "JY-22",
      "name": "目黒",
      "yahooStationId": "23018",
      "inGroupId": "7171",
      "outGroupId": "7170"
    },
    {
      "id": "JY-23",
      "name": "五反田",
      "yahooStationId": "22691",
      "inGroupId": "7171",
      "outGroupId": "7170"
    },
    {
      "id": "JY-24",
      "name": "大崎",
      "yahooStationId": "22559",
      "inGroupId": "7171",
      "outGroupId": "7170"
    },
    {
      "id": "JY-25",
      "name": "品川",
      "yahooStationId": "22709",
      "inGroupId": "7171",
      "outGroupId": "7180"
    },
    {
      "id": "JY-26",
      "name": "高輪ゲートウェイ",
      "yahooStationId": "29818",
      "inGroupId": "7181",
      "outGroupId": "7180"
    },
    {
      "id": "JY-27",
      "name": "田町",
      "yahooStationId": "22807",
      "inGroupId": "7181",
      "outGroupId": "7180"
    },
    {
      "id": "JY-28",
      "name": "浜松町",
      "yahooStationId": "22914",
      "inGroupId": "7181",
      "outGroupId": "7180"
    },
    {
      "id": "JY-29",
      "name": "新橋",
      "yahooStationId": "22751",
      "inGroupId": "7181",
      "outGroupId": "7180"
    },
    {
      "id": "JY-30",
      "name": "有楽町",
      "yahooStationId": "23036",
      "inGroupId": "7181",
      "outGroupId": "7180"
    }
  ],
  "stationNameAliases": {},
  "trainTypeMap": {
    "各駅停車": "local",
    "普通": "local"
  },
  "defaultCars": 11,
  "baseSectionSeconds": {
    "1": 150,
    "2": 150,
    "3": 150,
    "4": 150,
    "5": 150,
    "6": 150,
    "7": 150,
    "8": 150,
    "9": 150,
    "10": 150,
    "11": 150,
    "12": 150,
    "13": 150,
    "14": 150,
    "15": 150,
    "16": 150,
    "17": 150,
    "18": 150,
    "19": 150,
    "20": 150,
    "21": 150,
    "22": 150,
    "23": 150,
    "24": 150,
    "25": 150,
    "26": 150,
    "27": 150,
    "28": 150,
    "29": 150,
    "30": 150
  },
  directStops: true,
  resolveDirection: (_firstSt, _lastSt, trainDetail) => {
    return trainDetail.direction || 'outbound';
  }
};
