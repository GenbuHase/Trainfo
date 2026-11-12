// scripts/lines/jr_taita/config.cjs
module.exports = {
  lineId: 'jr_taita',
  name: 'JR太多線',
  stationsFilePath: 'src/data/lines/jr_taita/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_taita/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_taita/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_taita-01",
        "name": "多治見",
        "yahooStationId": "24496",
        "inGroupId": null,
        "outGroupId": "1391"
    },
    {
        "id": "jr_taita-02",
        "name": "根本",
        "yahooStationId": "24531",
        "inGroupId": "1390",
        "outGroupId": "1391"
    },
    {
        "id": "jr_taita-03",
        "name": "姫",
        "yahooStationId": "24557",
        "inGroupId": "1390",
        "outGroupId": "1391"
    },
    {
        "id": "jr_taita-04",
        "name": "下切",
        "yahooStationId": "24461",
        "inGroupId": "1390",
        "outGroupId": "1391"
    },
    {
        "id": "jr_taita-05",
        "name": "可児",
        "yahooStationId": "24403",
        "inGroupId": "1390",
        "outGroupId": "1391"
    },
    {
        "id": "jr_taita-06",
        "name": "美濃川合",
        "yahooStationId": "24587",
        "inGroupId": "1390",
        "outGroupId": "1391"
    },
    {
        "id": "jr_taita-07",
        "name": "美濃太田",
        "yahooStationId": "24586",
        "inGroupId": "1450",
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
  defaultCars: 2,
};
