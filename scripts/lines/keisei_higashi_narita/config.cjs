module.exports = {
  lineId: 'keisei_higashi_narita',
  name: '京成東成田線',
  stationsFilePath: 'src/data/lines/keisei_higashi_narita/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/keisei_higashi_narita/stationTimetables.json',
    globalTimetable: 'src/data/lines/keisei_higashi_narita/globalTimetable.json',
  },
  stations: [
  {
    "id": "KSH-01",
    "name": "京成成田",
    "yahooStationId": "22284",
    "inGroupId": null,
    "outGroupId": "2961"
  },
  {
    "id": "KSH-02",
    "name": "東成田",
    "yahooStationId": "22413",
    "inGroupId": "2960",
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
  "1": 570
},
};
