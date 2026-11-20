module.exports = {
  lineId: 'tokyu_kodomonokuni',
  name: '東急こどもの国線',
  stationsFilePath: 'src/data/lines/tokyu_kodomonokuni/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tokyu_kodomonokuni/stationTimetables.json',
    globalTimetable: 'src/data/lines/tokyu_kodomonokuni/globalTimetable.json',
  },
  stations: [
  {
    "id": "KD-01",
    "name": "長津田",
    "yahooStationId": "23260",
    "inGroupId": null,
    "outGroupId": "3211"
  },
  {
    "id": "KD-02",
    "name": "恩田",
    "yahooStationId": "29314",
    "inGroupId": "3210",
    "outGroupId": "3211"
  },
  {
    "id": "KD-03",
    "name": "こどもの国",
    "yahooStationId": "23164",
    "inGroupId": "3210",
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
  
  defaultCars: 2,
  baseSectionSeconds: {
  "1": 120,
  "2": 120
},
};
