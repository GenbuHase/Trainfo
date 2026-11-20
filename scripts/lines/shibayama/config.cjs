module.exports = {
  lineId: 'shibayama',
  name: '芝山鉄道線',
  stationsFilePath: 'src/data/lines/shibayama/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/shibayama/stationTimetables.json',
    globalTimetable: 'src/data/lines/shibayama/globalTimetable.json',
  },
  stations: [
  {
    "id": "SBY-01",
    "name": "東成田",
    "yahooStationId": "22413",
    "inGroupId": null,
    "outGroupId": "6791"
  },
  {
    "id": "SBY-02",
    "name": "芝山千代田",
    "yahooStationId": "29437",
    "inGroupId": "6790",
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
  
  defaultCars: 6,
  baseSectionSeconds: {
  "1": 180
},
};
