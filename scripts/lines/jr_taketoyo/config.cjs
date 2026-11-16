// scripts/lines/jr_taketoyo/config.cjs
module.exports = {
  lineId: 'jr_taketoyo',
  name: 'JR武豊線',
  stationsFilePath: 'src/data/lines/jr_taketoyo/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_taketoyo/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_taketoyo/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_taketoyo-01",
        "name": "大府",
        "yahooStationId": "24848",
        "inGroupId": null,
        "outGroupId": "1430"
    },
    {
        "id": "jr_taketoyo-02",
        "name": "尾張森岡",
        "yahooStationId": "24865",
        "inGroupId": "1431",
        "outGroupId": "1430"
    },
    {
        "id": "jr_taketoyo-03",
        "name": "緒川",
        "yahooStationId": "24854",
        "inGroupId": "1431",
        "outGroupId": "1430"
    },
    {
        "id": "jr_taketoyo-04",
        "name": "石浜",
        "yahooStationId": "24807",
        "inGroupId": "1431",
        "outGroupId": "1430"
    },
    {
        "id": "jr_taketoyo-05",
        "name": "東浦",
        "yahooStationId": "25110",
        "inGroupId": "1431",
        "outGroupId": "1430"
    },
    {
        "id": "jr_taketoyo-06",
        "name": "亀崎",
        "yahooStationId": "24890",
        "inGroupId": "1431",
        "outGroupId": "1430"
    },
    {
        "id": "jr_taketoyo-07",
        "name": "乙川",
        "yahooStationId": "24838",
        "inGroupId": "1431",
        "outGroupId": "1430"
    },
    {
        "id": "jr_taketoyo-08",
        "name": "半田",
        "yahooStationId": "25107",
        "inGroupId": "1431",
        "outGroupId": "1430"
    },
    {
        "id": "jr_taketoyo-09",
        "name": "東成岩",
        "yahooStationId": "25117",
        "inGroupId": "1431",
        "outGroupId": "1430"
    },
    {
        "id": "jr_taketoyo-10",
        "name": "武豊",
        "yahooStationId": "25020",
        "inGroupId": "1431",
        "outGroupId": null
    }
],
  stationNameAliases: {},
  trainTypeMap: {
    '普通': 'local',
    '各駅停車': 'local',
    '快速': 'rapid',
    '区間快速': 'semi_rapid',
    '快速みえ': 'rapid_mie',
    '特急': 'limitedExp',
  },
  defaultCars: 4,
};
