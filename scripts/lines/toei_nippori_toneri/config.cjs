module.exports = {
  lineId: 'toei_nippori_toneri',
  name: '日暮里・舎人ライナー',
  stationsFilePath: 'src/data/lines/toei_nippori_toneri/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/toei_nippori_toneri/stationTimetables.json',
    globalTimetable: 'src/data/lines/toei_nippori_toneri/globalTimetable.json',
  },
  stations: [
  {
    "id": "NT-01",
    "name": "日暮里",
    "yahooStationId": "29616",
    "inGroupId": null,
    "outGroupId": "3431"
  },
  {
    "id": "NT-02",
    "name": "西日暮里",
    "yahooStationId": "29617",
    "inGroupId": "3430",
    "outGroupId": "3431"
  },
  {
    "id": "NT-03",
    "name": "赤土小学校前",
    "yahooStationId": "29618",
    "inGroupId": "3430",
    "outGroupId": "3431"
  },
  {
    "id": "NT-04",
    "name": "熊野前",
    "yahooStationId": "29619",
    "inGroupId": "3430",
    "outGroupId": "3431"
  },
  {
    "id": "NT-05",
    "name": "足立小台",
    "yahooStationId": "29620",
    "inGroupId": "3430",
    "outGroupId": "3431"
  },
  {
    "id": "NT-06",
    "name": "扇大橋",
    "yahooStationId": "29621",
    "inGroupId": "3430",
    "outGroupId": "3431"
  },
  {
    "id": "NT-07",
    "name": "高野",
    "yahooStationId": "29622",
    "inGroupId": "3430",
    "outGroupId": "3431"
  },
  {
    "id": "NT-08",
    "name": "江北",
    "yahooStationId": "29623",
    "inGroupId": "3430",
    "outGroupId": "3431"
  },
  {
    "id": "NT-09",
    "name": "西新井大師西",
    "yahooStationId": "29624",
    "inGroupId": "3430",
    "outGroupId": "3431"
  },
  {
    "id": "NT-10",
    "name": "谷在家",
    "yahooStationId": "29625",
    "inGroupId": "3430",
    "outGroupId": "3431"
  },
  {
    "id": "NT-11",
    "name": "舎人公園",
    "yahooStationId": "29626",
    "inGroupId": "3430",
    "outGroupId": "3431"
  },
  {
    "id": "NT-12",
    "name": "舎人",
    "yahooStationId": "29627",
    "inGroupId": "3430",
    "outGroupId": "3431"
  },
  {
    "id": "NT-13",
    "name": "見沼代親水公園",
    "yahooStationId": "29628",
    "inGroupId": "3430",
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
  
  defaultCars: 5,
  baseSectionSeconds: {
  "1": 60,
  "2": 90,
  "3": 60,
  "4": 60,
  "5": 90,
  "6": 60,
  "7": 60,
  "8": 60,
  "9": 60,
  "10": 60,
  "11": 90,
  "12": 90
},
};
