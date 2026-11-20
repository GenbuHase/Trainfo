module.exports = {
  lineId: 'yokohama_green',
  name: '横浜市営地下鉄グリーンライン',
  stationsFilePath: 'src/data/lines/yokohama_green/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/yokohama_green/stationTimetables.json',
    globalTimetable: 'src/data/lines/yokohama_green/globalTimetable.json',
  },
  stations: [
  {
    "id": "GR-01",
    "name": "中山",
    "yahooStationId": "23259",
    "inGroupId": null,
    "outGroupId": "4900"
  },
  {
    "id": "GR-02",
    "name": "川和町",
    "yahooStationId": "29629",
    "inGroupId": "4901",
    "outGroupId": "4900"
  },
  {
    "id": "GR-03",
    "name": "都筑ふれあいの丘",
    "yahooStationId": "29630",
    "inGroupId": "4901",
    "outGroupId": "4900"
  },
  {
    "id": "GR-04",
    "name": "センター南",
    "yahooStationId": "23220",
    "inGroupId": "4901",
    "outGroupId": "4900"
  },
  {
    "id": "GR-05",
    "name": "センター北",
    "yahooStationId": "23219",
    "inGroupId": "4901",
    "outGroupId": "4900"
  },
  {
    "id": "GR-06",
    "name": "北山田",
    "yahooStationId": "29631",
    "inGroupId": "4901",
    "outGroupId": "4900"
  },
  {
    "id": "GR-07",
    "name": "東山田",
    "yahooStationId": "29632",
    "inGroupId": "4901",
    "outGroupId": "4900"
  },
  {
    "id": "GR-08",
    "name": "高田",
    "yahooStationId": "29633",
    "inGroupId": "4901",
    "outGroupId": "4900"
  },
  {
    "id": "GR-09",
    "name": "日吉本町",
    "yahooStationId": "29634",
    "inGroupId": "4901",
    "outGroupId": "4900"
  },
  {
    "id": "GR-10",
    "name": "日吉",
    "yahooStationId": "23297",
    "inGroupId": "4901",
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
  "1": 150,
  "2": 120,
  "3": 120,
  "4": 90,
  "5": 120,
  "6": 120,
  "7": 120,
  "8": 90,
  "9": 120
},
};
