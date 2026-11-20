module.exports = {
  lineId: 'enoden',
  name: '江ノ島電鉄線',
  stationsFilePath: 'src/data/lines/enoden/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/enoden/stationTimetables.json',
    globalTimetable: 'src/data/lines/enoden/globalTimetable.json',
  },
  stations: [
  {
    "id": "EN-01",
    "name": "鎌倉",
    "yahooStationId": "23116",
    "inGroupId": null,
    "outGroupId": "4930"
  },
  {
    "id": "EN-02",
    "name": "和田塚",
    "yahooStationId": "23374",
    "inGroupId": "4931",
    "outGroupId": "4930"
  },
  {
    "id": "EN-03",
    "name": "由比ケ浜",
    "yahooStationId": "23362",
    "inGroupId": "4931",
    "outGroupId": "4930"
  },
  {
    "id": "EN-04",
    "name": "長谷",
    "yahooStationId": "23282",
    "inGroupId": "4931",
    "outGroupId": "4930"
  },
  {
    "id": "EN-05",
    "name": "極楽寺",
    "yahooStationId": "23169",
    "inGroupId": "4931",
    "outGroupId": "4930"
  },
  {
    "id": "EN-06",
    "name": "稲村ケ崎",
    "yahooStationId": "23077",
    "inGroupId": "4931",
    "outGroupId": "4930"
  },
  {
    "id": "EN-07",
    "name": "七里ケ浜",
    "yahooStationId": "23198",
    "inGroupId": "4931",
    "outGroupId": "4930"
  },
  {
    "id": "EN-08",
    "name": "鎌倉高校前",
    "yahooStationId": "23117",
    "inGroupId": "4931",
    "outGroupId": "4930"
  },
  {
    "id": "EN-09",
    "name": "腰越",
    "yahooStationId": "23161",
    "inGroupId": "4931",
    "outGroupId": "4930"
  },
  {
    "id": "EN-10",
    "name": "江ノ島",
    "yahooStationId": "23086",
    "inGroupId": "4931",
    "outGroupId": "4930"
  },
  {
    "id": "EN-11",
    "name": "湘南海岸公園",
    "yahooStationId": "23190",
    "inGroupId": "4931",
    "outGroupId": "4930"
  },
  {
    "id": "EN-12",
    "name": "鵠沼",
    "yahooStationId": "23137",
    "inGroupId": "4931",
    "outGroupId": "4930"
  },
  {
    "id": "EN-13",
    "name": "柳小路",
    "yahooStationId": "23356",
    "inGroupId": "4931",
    "outGroupId": "4930"
  },
  {
    "id": "EN-14",
    "name": "石上",
    "yahooStationId": "23068",
    "inGroupId": "4931",
    "outGroupId": "4930"
  },
  {
    "id": "EN-15",
    "name": "藤沢",
    "yahooStationId": "23304",
    "inGroupId": "4931",
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
  "2": 60,
  "3": 60,
  "4": 60,
  "5": 60,
  "6": 90,
  "7": 60,
  "8": 60,
  "9": 60,
  "10": 60,
  "11": 60,
  "12": 60,
  "13": 60,
  "14": 60
},
};
