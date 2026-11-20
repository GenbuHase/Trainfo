module.exports = {
  lineId: 'keikyu_airport',
  name: '京急空港線',
  stationsFilePath: 'src/data/lines/keikyu_airport/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/keikyu_airport/stationTimetables.json',
    globalTimetable: 'src/data/lines/keikyu_airport/globalTimetable.json',
  },
  stations: [
  {
    "id": "KKA-01",
    "name": "京急蒲田",
    "yahooStationId": "22660",
    "inGroupId": null,
    "outGroupId": "3231"
  },
  {
    "id": "KKA-02",
    "name": "糀谷",
    "yahooStationId": "22674",
    "inGroupId": "3230",
    "outGroupId": "3231"
  },
  {
    "id": "KKA-03",
    "name": "大鳥居",
    "yahooStationId": "22565",
    "inGroupId": "3230",
    "outGroupId": "3231"
  },
  {
    "id": "KKA-04",
    "name": "穴守稲荷",
    "yahooStationId": "22498",
    "inGroupId": "3230",
    "outGroupId": "3231"
  },
  {
    "id": "KKA-05",
    "name": "天空橋",
    "yahooStationId": "22910",
    "inGroupId": "3230",
    "outGroupId": "3231"
  },
  {
    "id": "KKA-06",
    "name": "羽田空港第３ターミナル",
    "yahooStationId": "29672",
    "inGroupId": "3230",
    "outGroupId": "3231"
  },
  {
    "id": "KKA-07",
    "name": "羽田空港第１・第２ターミナル",
    "yahooStationId": "22911",
    "inGroupId": "3230",
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
  "モーニング・ウィング": "liner",
  "イブニング・ウィング": "liner",
  "ウィング": "liner",
  "エアポート快特": "access_exp",
  "アクセス特急": "access_exp",
  "快特": "rapid_exp",
  "快速特急": "rapid_exp",
  "特急": "limited_exp",
  "エアポート急行": "express",
  "急行": "express",
  "快速": "express",
  "普通": "local",
  "各駅停車": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 8,
  baseSectionSeconds: {
  "1": 90,
  "2": 90,
  "3": 60,
  "4": 60,
  "5": 90,
  "6": 150
},
};
