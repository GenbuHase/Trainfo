module.exports = {
  lineId: 'keisei_kanamachi',
  name: '京成金町線',
  stationsFilePath: 'src/data/lines/keisei_kanamachi/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/keisei_kanamachi/stationTimetables.json',
    globalTimetable: 'src/data/lines/keisei_kanamachi/globalTimetable.json',
  },
  stations: [
  {
    "id": "KSK-01",
    "name": "京成高砂",
    "yahooStationId": "22665",
    "inGroupId": null,
    "outGroupId": "2981"
  },
  {
    "id": "KSK-02",
    "name": "柴又",
    "yahooStationId": "22714",
    "inGroupId": "2980",
    "outGroupId": "2981"
  },
  {
    "id": "KSK-03",
    "name": "京成金町",
    "yahooStationId": "22662",
    "inGroupId": "2980",
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
  
  defaultCars: 4,
  baseSectionSeconds: {
  "1": 90,
  "2": 120
},
};
