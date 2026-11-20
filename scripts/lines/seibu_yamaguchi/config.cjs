module.exports = {
  lineId: 'seibu_yamaguchi',
  name: '西武山口線（レオライナー）',
  stationsFilePath: 'src/data/lines/seibu_yamaguchi/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/seibu_yamaguchi/stationTimetables.json',
    globalTimetable: 'src/data/lines/seibu_yamaguchi/globalTimetable.json',
  },
  stations: [
  {
    "id": "SY-01",
    "name": "多摩湖",
    "yahooStationId": "22771",
    "inGroupId": null,
    "outGroupId": "2931"
  },
  {
    "id": "SY-02",
    "name": "西武園ゆうえんち",
    "yahooStationId": "23034",
    "inGroupId": "2930",
    "outGroupId": "2931"
  },
  {
    "id": "SY-03",
    "name": "西武球場前",
    "yahooStationId": "22065",
    "inGroupId": "2930",
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
  "1": 60,
  "2": 210
},
};
