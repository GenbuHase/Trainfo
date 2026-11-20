module.exports = {
  lineId: 'alpico_kamikochi',
  name: 'アルピコ交通上高地線',
  stationsFilePath: 'src/data/lines/alpico_kamikochi/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/alpico_kamikochi/stationTimetables.json',
    globalTimetable: 'src/data/lines/alpico_kamikochi/globalTimetable.json',
  },
  stations: [
  {
    "id": "AK-01",
    "name": "松本",
    "yahooStationId": "24325",
    "inGroupId": null,
    "outGroupId": "5221"
  },
  {
    "id": "AK-02",
    "name": "西松本",
    "yahooStationId": "24293",
    "inGroupId": "5220",
    "outGroupId": "5221"
  },
  {
    "id": "AK-03",
    "name": "渚",
    "yahooStationId": "24283",
    "inGroupId": "5220",
    "outGroupId": "5221"
  },
  {
    "id": "AK-04",
    "name": "信濃荒井",
    "yahooStationId": "24209",
    "inGroupId": "5220",
    "outGroupId": "5221"
  },
  {
    "id": "AK-05",
    "name": "大庭",
    "yahooStationId": "24140",
    "inGroupId": "5220",
    "outGroupId": "5221"
  },
  {
    "id": "AK-06",
    "name": "下新",
    "yahooStationId": "24233",
    "inGroupId": "5220",
    "outGroupId": "5221"
  },
  {
    "id": "AK-07",
    "name": "北新・松本大学前",
    "yahooStationId": "24177",
    "inGroupId": "5220",
    "outGroupId": "5221"
  },
  {
    "id": "AK-08",
    "name": "新村",
    "yahooStationId": "24288",
    "inGroupId": "5220",
    "outGroupId": "5221"
  },
  {
    "id": "AK-09",
    "name": "三溝",
    "yahooStationId": "24199",
    "inGroupId": "5220",
    "outGroupId": "5221"
  },
  {
    "id": "AK-10",
    "name": "森口",
    "yahooStationId": "24345",
    "inGroupId": "5220",
    "outGroupId": "5221"
  },
  {
    "id": "AK-11",
    "name": "下島",
    "yahooStationId": "24230",
    "inGroupId": "5220",
    "outGroupId": "5221"
  },
  {
    "id": "AK-12",
    "name": "波田",
    "yahooStationId": "24301",
    "inGroupId": "5220",
    "outGroupId": "5221"
  },
  {
    "id": "AK-13",
    "name": "渕東",
    "yahooStationId": "24136",
    "inGroupId": "5220",
    "outGroupId": "5221"
  },
  {
    "id": "AK-14",
    "name": "新島々",
    "yahooStationId": "24239",
    "inGroupId": "5220",
    "outGroupId": null
  }
],
  stationNameAliases: {},
  trainTypeMap: {
  "普通": "local",
  "各駅停車": "local"
},
  preserveAllStopsTypes: [],
  defaultCars: 2,
  baseSectionSeconds: {
  "1": 90,
  "2": 90,
  "3": 90,
  "4": 90,
  "5": 150,
  "6": 90,
  "7": 90,
  "8": 120,
  "9": 90,
  "10": 90,
  "11": 150,
  "12": 150,
  "13": 180
},
};
