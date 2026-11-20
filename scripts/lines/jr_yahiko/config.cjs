module.exports = {
  lineId: 'jr_yahiko',
  name: 'JR弥彦線',
  stationsFilePath: 'src/data/lines/jr_yahiko/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_yahiko/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_yahiko/globalTimetable.json',
  },
  stations: [
  {
    "id": "YH-01",
    "name": "弥彦",
    "yahooStationId": "24086",
    "inGroupId": null,
    "outGroupId": "751"
  },
  {
    "id": "YH-02",
    "name": "矢作",
    "yahooStationId": "24085",
    "inGroupId": "750",
    "outGroupId": "751"
  },
  {
    "id": "YH-03",
    "name": "吉田",
    "yahooStationId": "24089",
    "inGroupId": "750",
    "outGroupId": "751"
  },
  {
    "id": "YH-04",
    "name": "西燕",
    "yahooStationId": "24039",
    "inGroupId": "750",
    "outGroupId": "751"
  },
  {
    "id": "YH-05",
    "name": "燕",
    "yahooStationId": "24015",
    "inGroupId": "750",
    "outGroupId": "751"
  },
  {
    "id": "YH-06",
    "name": "燕三条",
    "yahooStationId": "24016",
    "inGroupId": "750",
    "outGroupId": "751"
  },
  {
    "id": "YH-07",
    "name": "北三条",
    "yahooStationId": "23970",
    "inGroupId": "750",
    "outGroupId": "751"
  },
  {
    "id": "YH-08",
    "name": "東三条",
    "yahooStationId": "24052",
    "inGroupId": "750",
    "outGroupId": null
  }
],
  stationNameAliases: {},
  trainTypeMap: {
  "普通": "regular",
  "各駅停車": "regular"
},
  preserveAllStopsTypes: [],
  defaultCars: 4,
  baseSectionSeconds: {
  "1": 180,
  "2": 180,
  "3": 240,
  "4": 180,
  "5": 210,
  "6": 180,
  "7": 120
},
};
