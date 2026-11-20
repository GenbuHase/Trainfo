module.exports = {
  lineId: 'seibu_tamagawa',
  name: '西武多摩川線',
  stationsFilePath: 'src/data/lines/seibu_tamagawa/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/seibu_tamagawa/stationTimetables.json',
    globalTimetable: 'src/data/lines/seibu_tamagawa/globalTimetable.json',
  },
  stations: [
  {
    "id": "SW-01",
    "name": "武蔵境",
    "yahooStationId": "23008",
    "inGroupId": null,
    "outGroupId": "2941"
  },
  {
    "id": "SW-02",
    "name": "新小金井",
    "yahooStationId": "22737",
    "inGroupId": "2940",
    "outGroupId": "2941"
  },
  {
    "id": "SW-03",
    "name": "多磨",
    "yahooStationId": "22809",
    "inGroupId": "2940",
    "outGroupId": "2941"
  },
  {
    "id": "SW-04",
    "name": "白糸台",
    "yahooStationId": "22632",
    "inGroupId": "2940",
    "outGroupId": "2941"
  },
  {
    "id": "SW-05",
    "name": "競艇場前",
    "yahooStationId": "22621",
    "inGroupId": "2940",
    "outGroupId": "2941"
  },
  {
    "id": "SW-06",
    "name": "是政",
    "yahooStationId": "22688",
    "inGroupId": "2940",
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
  "1": 150,
  "2": 180,
  "3": 90,
  "4": 120,
  "5": 90
},
};
