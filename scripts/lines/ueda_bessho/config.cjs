module.exports = {
  lineId: 'ueda_bessho',
  name: '上田電鉄別所線',
  stationsFilePath: 'src/data/lines/ueda_bessho/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/ueda_bessho/stationTimetables.json',
    globalTimetable: 'src/data/lines/ueda_bessho/globalTimetable.json',
  },
  stations: [
  {
    "id": "UDB-01",
    "name": "上田",
    "yahooStationId": "24129",
    "inGroupId": null,
    "outGroupId": "5211"
  },
  {
    "id": "UDB-02",
    "name": "城下",
    "yahooStationId": "24237",
    "inGroupId": "5210",
    "outGroupId": "5211"
  },
  {
    "id": "UDB-03",
    "name": "三好町",
    "yahooStationId": "24339",
    "inGroupId": "5210",
    "outGroupId": "5211"
  },
  {
    "id": "UDB-04",
    "name": "赤坂上",
    "yahooStationId": "24098",
    "inGroupId": "5210",
    "outGroupId": "5211"
  },
  {
    "id": "UDB-05",
    "name": "上田原",
    "yahooStationId": "24130",
    "inGroupId": "5210",
    "outGroupId": "5211"
  },
  {
    "id": "UDB-06",
    "name": "寺下",
    "yahooStationId": "24265",
    "inGroupId": "5210",
    "outGroupId": "5211"
  },
  {
    "id": "UDB-07",
    "name": "神畑",
    "yahooStationId": "24153",
    "inGroupId": "5210",
    "outGroupId": "5211"
  },
  {
    "id": "UDB-08",
    "name": "大学前",
    "yahooStationId": "24259",
    "inGroupId": "5210",
    "outGroupId": "5211"
  },
  {
    "id": "UDB-09",
    "name": "下之郷",
    "yahooStationId": "24234",
    "inGroupId": "5210",
    "outGroupId": "5211"
  },
  {
    "id": "UDB-10",
    "name": "中塩田",
    "yahooStationId": "24277",
    "inGroupId": "5210",
    "outGroupId": "5211"
  },
  {
    "id": "UDB-11",
    "name": "塩田町",
    "yahooStationId": "24204",
    "inGroupId": "5210",
    "outGroupId": "5211"
  },
  {
    "id": "UDB-12",
    "name": "中野",
    "yahooStationId": "24279",
    "inGroupId": "5210",
    "outGroupId": "5211"
  },
  {
    "id": "UDB-13",
    "name": "舞田",
    "yahooStationId": "24322",
    "inGroupId": "5210",
    "outGroupId": "5211"
  },
  {
    "id": "UDB-14",
    "name": "八木沢",
    "yahooStationId": "24347",
    "inGroupId": "5210",
    "outGroupId": "5211"
  },
  {
    "id": "UDB-15",
    "name": "別所温泉",
    "yahooStationId": "24318",
    "inGroupId": "5210",
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
  "5": 90,
  "6": 90,
  "7": 90,
  "8": 90,
  "9": 120,
  "10": 90,
  "11": 90,
  "12": 90,
  "13": 90,
  "14": 150
},
};
