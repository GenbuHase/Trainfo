module.exports = {
  lineId: 'keio_inokashira',
  name: '京王井の頭線',
  stationsFilePath: 'src/data/lines/keio_inokashira/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/keio_inokashira/stationTimetables.json',
    globalTimetable: 'src/data/lines/keio_inokashira/globalTimetable.json',
  },
  stations: [
  {
    "id": "IN-01",
    "name": "渋谷",
    "yahooStationId": "22715",
    "inGroupId": null,
    "outGroupId": "3081"
  },
  {
    "id": "IN-02",
    "name": "神泉",
    "yahooStationId": "22745",
    "inGroupId": "3080",
    "outGroupId": "3081"
  },
  {
    "id": "IN-03",
    "name": "駒場東大前",
    "yahooStationId": "22685",
    "inGroupId": "3080",
    "outGroupId": "3081"
  },
  {
    "id": "IN-04",
    "name": "池ノ上",
    "yahooStationId": "22512",
    "inGroupId": "3080",
    "outGroupId": "3081"
  },
  {
    "id": "IN-05",
    "name": "下北沢",
    "yahooStationId": "22723",
    "inGroupId": "3080",
    "outGroupId": "3081"
  },
  {
    "id": "IN-06",
    "name": "新代田",
    "yahooStationId": "22747",
    "inGroupId": "3080",
    "outGroupId": "3081"
  },
  {
    "id": "IN-07",
    "name": "東松原",
    "yahooStationId": "22942",
    "inGroupId": "3080",
    "outGroupId": "3081"
  },
  {
    "id": "IN-08",
    "name": "明大前",
    "yahooStationId": "23017",
    "inGroupId": "3080",
    "outGroupId": "3081"
  },
  {
    "id": "IN-09",
    "name": "永福町",
    "yahooStationId": "22542",
    "inGroupId": "3080",
    "outGroupId": "3081"
  },
  {
    "id": "IN-10",
    "name": "西永福",
    "yahooStationId": "22864",
    "inGroupId": "3080",
    "outGroupId": "3081"
  },
  {
    "id": "IN-11",
    "name": "浜田山",
    "yahooStationId": "22912",
    "inGroupId": "3080",
    "outGroupId": "3081"
  },
  {
    "id": "IN-12",
    "name": "高井戸",
    "yahooStationId": "22786",
    "inGroupId": "3080",
    "outGroupId": "3081"
  },
  {
    "id": "IN-13",
    "name": "富士見ケ丘",
    "yahooStationId": "22956",
    "inGroupId": "3080",
    "outGroupId": "3081"
  },
  {
    "id": "IN-14",
    "name": "久我山",
    "yahooStationId": "22644",
    "inGroupId": "3080",
    "outGroupId": "3081"
  },
  {
    "id": "IN-15",
    "name": "三鷹台",
    "yahooStationId": "22987",
    "inGroupId": "3080",
    "outGroupId": "3081"
  },
  {
    "id": "IN-16",
    "name": "井の頭公園",
    "yahooStationId": "22525",
    "inGroupId": "3080",
    "outGroupId": "3081"
  },
  {
    "id": "IN-17",
    "name": "吉祥寺",
    "yahooStationId": "22637",
    "inGroupId": "3080",
    "outGroupId": null
  }
],
  stationNameAliases: {
    '新鎌ケ谷': '新鎌ヶ谷',
    '空港第２ビル': '空港第2ビル',
    '幡ケ谷': '幡ヶ谷',
    '長者ケ浜潮騒はまなす公園前': '長者ヶ浜潮騒はまなす公園前',
  },
  trainTypeMap: {
  "急行": "express",
  "各駅停車": "local",
  "普通": "local",
  "各停": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 5,
  baseSectionSeconds: {
  "1": 60,
  "2": 60,
  "3": 90,
  "4": 60,
  "5": 60,
  "6": 60,
  "7": 90,
  "8": 90,
  "9": 60,
  "10": 60,
  "11": 90,
  "12": 60,
  "13": 60,
  "14": 90,
  "15": 60,
  "16": 60
},
};
