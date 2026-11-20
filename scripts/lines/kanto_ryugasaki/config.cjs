module.exports = {
  lineId: 'kanto_ryugasaki',
  name: '関東鉄道竜ヶ崎線',
  stationsFilePath: 'src/data/lines/kanto_ryugasaki/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/kanto_ryugasaki/stationTimetables.json',
    globalTimetable: 'src/data/lines/kanto_ryugasaki/globalTimetable.json',
  },
  stations: [
  {
    "id": "KRG-01",
    "name": "佐貫",
    "yahooStationId": "29829",
    "inGroupId": null,
    "outGroupId": "4681"
  },
  {
    "id": "KRG-02",
    "name": "入地",
    "yahooStationId": "21591",
    "inGroupId": "4680",
    "outGroupId": "4681"
  },
  {
    "id": "KRG-03",
    "name": "竜ケ崎",
    "yahooStationId": "21724",
    "inGroupId": "4680",
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
  
  defaultCars: 1,
  baseSectionSeconds: {
  "1": 180,
  "2": 180
},
};
