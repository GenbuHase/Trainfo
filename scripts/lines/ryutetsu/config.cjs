module.exports = {
  lineId: 'ryutetsu',
  name: '流鉄流山線',
  stationsFilePath: 'src/data/lines/ryutetsu/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/ryutetsu/stationTimetables.json',
    globalTimetable: 'src/data/lines/ryutetsu/globalTimetable.json',
  },
  stations: [
  {
    "id": "RN-01",
    "name": "馬橋",
    "yahooStationId": "22447",
    "inGroupId": null,
    "outGroupId": "4771"
  },
  {
    "id": "RN-02",
    "name": "幸谷",
    "yahooStationId": "22296",
    "inGroupId": "4770",
    "outGroupId": "4771"
  },
  {
    "id": "RN-03",
    "name": "小金城趾",
    "yahooStationId": "22297",
    "inGroupId": "4770",
    "outGroupId": "4771"
  },
  {
    "id": "RN-04",
    "name": "鰭ケ崎",
    "yahooStationId": "22420",
    "inGroupId": "4770",
    "outGroupId": "4771"
  },
  {
    "id": "RN-05",
    "name": "平和台",
    "yahooStationId": "22430",
    "inGroupId": "4770",
    "outGroupId": "4771"
  },
  {
    "id": "RN-06",
    "name": "流山",
    "yahooStationId": "22384",
    "inGroupId": "4770",
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
  "2": 90,
  "3": 60,
  "4": 120,
  "5": 60
},
};
