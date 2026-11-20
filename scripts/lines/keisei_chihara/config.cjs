module.exports = {
  lineId: 'keisei_chihara',
  name: '京成千原線',
  stationsFilePath: 'src/data/lines/keisei_chihara/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/keisei_chihara/stationTimetables.json',
    globalTimetable: 'src/data/lines/keisei_chihara/globalTimetable.json',
  },
  stations: [
  {
    "id": "KSCH-01",
    "name": "千葉中央",
    "yahooStationId": "22363",
    "inGroupId": null,
    "outGroupId": "3001"
  },
  {
    "id": "KSCH-02",
    "name": "千葉寺",
    "yahooStationId": "22364",
    "inGroupId": "3000",
    "outGroupId": "3001"
  },
  {
    "id": "KSCH-03",
    "name": "大森台",
    "yahooStationId": "22218",
    "inGroupId": "3000",
    "outGroupId": "3001"
  },
  {
    "id": "KSCH-04",
    "name": "学園前",
    "yahooStationId": "29034",
    "inGroupId": "3000",
    "outGroupId": "3001"
  },
  {
    "id": "KSCH-05",
    "name": "おゆみ野",
    "yahooStationId": "29035",
    "inGroupId": "3000",
    "outGroupId": "3001"
  },
  {
    "id": "KSCH-06",
    "name": "ちはら台",
    "yahooStationId": "29036",
    "inGroupId": "3000",
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
  "1": 180,
  "2": 150,
  "3": 240,
  "4": 120,
  "5": 150
},
};
