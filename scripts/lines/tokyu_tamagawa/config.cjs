module.exports = {
  lineId: 'tokyu_tamagawa',
  name: '東急多摩川線',
  stationsFilePath: 'src/data/lines/tokyu_tamagawa/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tokyu_tamagawa/stationTimetables.json',
    globalTimetable: 'src/data/lines/tokyu_tamagawa/globalTimetable.json',
  },
  stations: [
  {
    "id": "TM-01",
    "name": "多摩川",
    "yahooStationId": "22803",
    "inGroupId": null,
    "outGroupId": "3191"
  },
  {
    "id": "TM-02",
    "name": "沼部",
    "yahooStationId": "22887",
    "inGroupId": "3190",
    "outGroupId": "3191"
  },
  {
    "id": "TM-03",
    "name": "鵜の木",
    "yahooStationId": "22535",
    "inGroupId": "3190",
    "outGroupId": "3191"
  },
  {
    "id": "TM-04",
    "name": "下丸子",
    "yahooStationId": "22726",
    "inGroupId": "3190",
    "outGroupId": "3191"
  },
  {
    "id": "TM-05",
    "name": "武蔵新田",
    "yahooStationId": "23011",
    "inGroupId": "3190",
    "outGroupId": "3191"
  },
  {
    "id": "TM-06",
    "name": "矢口渡",
    "yahooStationId": "23027",
    "inGroupId": "3190",
    "outGroupId": "3191"
  },
  {
    "id": "TM-07",
    "name": "蒲田",
    "yahooStationId": "22602",
    "inGroupId": "3190",
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
  
  defaultCars: 3,
  baseSectionSeconds: {
  "1": 60,
  "2": 90,
  "3": 60,
  "4": 60,
  "5": 60,
  "6": 90
},
};
