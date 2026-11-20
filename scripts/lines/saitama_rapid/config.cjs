module.exports = {
  lineId: 'saitama_rapid',
  name: '埼玉高速鉄道埼玉スタジアム線',
  stationsFilePath: 'src/data/lines/saitama_rapid/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/saitama_rapid/stationTimetables.json',
    globalTimetable: 'src/data/lines/saitama_rapid/globalTimetable.json',
  },
  stations: [
  {
    "id": "SRG-01",
    "name": "赤羽岩淵",
    "yahooStationId": "22488",
    "inGroupId": null,
    "outGroupId": "6761"
  },
  {
    "id": "SRG-02",
    "name": "川口元郷",
    "yahooStationId": "29350",
    "inGroupId": "6760",
    "outGroupId": "6761"
  },
  {
    "id": "SRG-03",
    "name": "南鳩ケ谷",
    "yahooStationId": "29351",
    "inGroupId": "6760",
    "outGroupId": "6761"
  },
  {
    "id": "SRG-04",
    "name": "鳩ケ谷",
    "yahooStationId": "29352",
    "inGroupId": "6760",
    "outGroupId": "6761"
  },
  {
    "id": "SRG-05",
    "name": "新井宿",
    "yahooStationId": "29353",
    "inGroupId": "6760",
    "outGroupId": "6761"
  },
  {
    "id": "SRG-06",
    "name": "戸塚安行",
    "yahooStationId": "29354",
    "inGroupId": "6760",
    "outGroupId": "6761"
  },
  {
    "id": "SRG-07",
    "name": "東川口",
    "yahooStationId": "22111",
    "inGroupId": "6760",
    "outGroupId": "6761"
  },
  {
    "id": "SRG-08",
    "name": "浦和美園",
    "yahooStationId": "29355",
    "inGroupId": "6760",
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
  
  defaultCars: 8,
  baseSectionSeconds: {
  "1": 180,
  "2": 150,
  "3": 120,
  "4": 120,
  "5": 210,
  "6": 180,
  "7": 180
},
};
