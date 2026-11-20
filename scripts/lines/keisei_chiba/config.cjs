module.exports = {
  lineId: 'keisei_chiba',
  name: '京成千葉線',
  stationsFilePath: 'src/data/lines/keisei_chiba/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/keisei_chiba/stationTimetables.json',
    globalTimetable: 'src/data/lines/keisei_chiba/globalTimetable.json',
  },
  stations: [
  {
    "id": "KSC-01",
    "name": "京成津田沼",
    "yahooStationId": "22282",
    "inGroupId": null,
    "outGroupId": "2991"
  },
  {
    "id": "KSC-02",
    "name": "京成幕張本郷",
    "yahooStationId": "22288",
    "inGroupId": "2990",
    "outGroupId": "2991"
  },
  {
    "id": "KSC-03",
    "name": "京成幕張",
    "yahooStationId": "22287",
    "inGroupId": "2990",
    "outGroupId": "2991"
  },
  {
    "id": "KSC-04",
    "name": "検見川",
    "yahooStationId": "22290",
    "inGroupId": "2990",
    "outGroupId": "2991"
  },
  {
    "id": "KSC-05",
    "name": "京成稲毛",
    "yahooStationId": "22275",
    "inGroupId": "2990",
    "outGroupId": "2991"
  },
  {
    "id": "KSC-06",
    "name": "みどり台",
    "yahooStationId": "22451",
    "inGroupId": "2990",
    "outGroupId": "2991"
  },
  {
    "id": "KSC-07",
    "name": "西登戸",
    "yahooStationId": "22399",
    "inGroupId": "2990",
    "outGroupId": "2991"
  },
  {
    "id": "KSC-08",
    "name": "新千葉",
    "yahooStationId": "22328",
    "inGroupId": "2990",
    "outGroupId": "2991"
  },
  {
    "id": "KSC-09",
    "name": "京成千葉",
    "yahooStationId": "22281",
    "inGroupId": "2990",
    "outGroupId": "2991"
  },
  {
    "id": "KSC-10",
    "name": "千葉中央",
    "yahooStationId": "22363",
    "inGroupId": "2990",
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
  "1": 150,
  "2": 150,
  "3": 120,
  "4": 240,
  "5": 150,
  "6": 90,
  "7": 60,
  "8": 60,
  "9": 60
},
};
