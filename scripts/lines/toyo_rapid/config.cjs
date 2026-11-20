module.exports = {
  lineId: 'toyo_rapid',
  name: '東葉高速鉄道東葉高速線',
  stationsFilePath: 'src/data/lines/toyo_rapid/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/toyo_rapid/stationTimetables.json',
    globalTimetable: 'src/data/lines/toyo_rapid/globalTimetable.json',
  },
  stations: [
  {
    "id": "TR-01",
    "name": "西船橋",
    "yahooStationId": "22401",
    "inGroupId": null,
    "outGroupId": "6691"
  },
  {
    "id": "TR-02",
    "name": "東海神",
    "yahooStationId": "29078",
    "inGroupId": "6690",
    "outGroupId": "6691"
  },
  {
    "id": "TR-03",
    "name": "飯山満",
    "yahooStationId": "29079",
    "inGroupId": "6690",
    "outGroupId": "6691"
  },
  {
    "id": "TR-04",
    "name": "北習志野",
    "yahooStationId": "22260",
    "inGroupId": "6690",
    "outGroupId": "6691"
  },
  {
    "id": "TR-05",
    "name": "船橋日大前",
    "yahooStationId": "29080",
    "inGroupId": "6690",
    "outGroupId": "6691"
  },
  {
    "id": "TR-06",
    "name": "八千代緑が丘",
    "yahooStationId": "29081",
    "inGroupId": "6690",
    "outGroupId": "6691"
  },
  {
    "id": "TR-07",
    "name": "八千代中央",
    "yahooStationId": "29082",
    "inGroupId": "6690",
    "outGroupId": "6691"
  },
  {
    "id": "TR-08",
    "name": "村上",
    "yahooStationId": "29083",
    "inGroupId": "6690",
    "outGroupId": "6691"
  },
  {
    "id": "TR-09",
    "name": "東葉勝田台",
    "yahooStationId": "29084",
    "inGroupId": "6690",
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
  "快速": "rapid",
  "各駅停車": "local",
  "普通": "local",
  "各停": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 10,
  baseSectionSeconds: {
  "1": 150,
  "2": 300,
  "3": 180,
  "4": 150,
  "5": 90,
  "6": 210,
  "7": 120,
  "8": 90
},
};
