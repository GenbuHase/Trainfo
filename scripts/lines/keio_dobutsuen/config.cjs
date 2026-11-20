module.exports = {
  lineId: 'keio_dobutsuen',
  name: '京王動物園線',
  stationsFilePath: 'src/data/lines/keio_dobutsuen/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/keio_dobutsuen/stationTimetables.json',
    globalTimetable: 'src/data/lines/keio_dobutsuen/globalTimetable.json',
  },
  stations: [
  {
    "id": "KOD-01",
    "name": "高幡不動",
    "yahooStationId": "22793",
    "inGroupId": null,
    "outGroupId": "3061"
  },
  {
    "id": "KOD-02",
    "name": "多摩動物公園",
    "yahooStationId": "22808",
    "inGroupId": "3060",
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
  "京王ライナー": "liner",
  "Mt.TAKAO": "liner",
  "特急": "limited_exp",
  "準特急": "limited_exp",
  "急行": "express",
  "区間急行": "section_exp",
  "快速": "rapid",
  "各駅停車": "local",
  "普通": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 4,
  baseSectionSeconds: {
  "1": 150
},
};
