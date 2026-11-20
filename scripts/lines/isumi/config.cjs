module.exports = {
  lineId: 'isumi',
  name: 'いすみ鉄道いすみ線',
  stationsFilePath: 'src/data/lines/isumi/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/isumi/stationTimetables.json',
    globalTimetable: 'src/data/lines/isumi/globalTimetable.json',
  },
  stations: [
  {
    "id": "ISU-01",
    "name": "大原",
    "yahooStationId": "22216",
    "inGroupId": null,
    "outGroupId": "4861"
  },
  {
    "id": "ISU-02",
    "name": "西大原",
    "yahooStationId": "22396",
    "inGroupId": "4860",
    "outGroupId": "4861"
  },
  {
    "id": "ISU-03",
    "name": "上総東",
    "yahooStationId": "22229",
    "inGroupId": "4860",
    "outGroupId": "4861"
  },
  {
    "id": "ISU-04",
    "name": "新田野",
    "yahooStationId": "22394",
    "inGroupId": "4860",
    "outGroupId": "4861"
  },
  {
    "id": "ISU-05",
    "name": "国吉",
    "yahooStationId": "22270",
    "inGroupId": "4860",
    "outGroupId": "4861"
  },
  {
    "id": "ISU-06",
    "name": "上総中川",
    "yahooStationId": "22239",
    "inGroupId": "4860",
    "outGroupId": "4861"
  },
  {
    "id": "ISU-07",
    "name": "城見ケ丘",
    "yahooStationId": "29647",
    "inGroupId": "4860",
    "outGroupId": "4861"
  },
  {
    "id": "ISU-08",
    "name": "大多喜",
    "yahooStationId": "22213",
    "inGroupId": "4860",
    "outGroupId": "4861"
  },
  {
    "id": "ISU-09",
    "name": "小谷松",
    "yahooStationId": "22223",
    "inGroupId": "4860",
    "outGroupId": "4861"
  },
  {
    "id": "ISU-10",
    "name": "東総元",
    "yahooStationId": "22414",
    "inGroupId": "4860",
    "outGroupId": "4861"
  },
  {
    "id": "ISU-11",
    "name": "久我原",
    "yahooStationId": "22268",
    "inGroupId": "4860",
    "outGroupId": "4861"
  },
  {
    "id": "ISU-12",
    "name": "総元",
    "yahooStationId": "22423",
    "inGroupId": "4860",
    "outGroupId": "4861"
  },
  {
    "id": "ISU-13",
    "name": "西畑",
    "yahooStationId": "22400",
    "inGroupId": "4860",
    "outGroupId": "4861"
  },
  {
    "id": "ISU-14",
    "name": "上総中野",
    "yahooStationId": "22240",
    "inGroupId": "4860",
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
  "各駅停車": "local",
  "普通": "local",
  "各停": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 1,
  baseSectionSeconds: {
  "1": 150,
  "2": 270,
  "3": 180,
  "4": 120,
  "5": 240,
  "6": 210,
  "7": 90,
  "8": 180,
  "9": 120,
  "10": 90,
  "11": 120,
  "12": 240,
  "13": 150
},
};
