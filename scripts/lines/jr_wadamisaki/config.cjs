// scripts/lines/jr_wadamisaki/config.cjs
module.exports = {
  lineId: 'jr_wadamisaki',
  name: 'JR和田岬線',
  stationsFilePath: 'src/data/lines/jr_wadamisaki/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_wadamisaki/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_wadamisaki/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_wadamisaki-01",
        "name": "兵庫",
        "yahooStationId": "26514",
        "inGroupId": null,
        "outGroupId": "1851"
    },
    {
        "id": "jr_wadamisaki-02",
        "name": "和田岬",
        "yahooStationId": "26592",
        "inGroupId": "1850",
        "outGroupId": null
    }
],
  stationNameAliases: {},
  trainTypeMap: {
    "普通": "local",
    "各駅停車": "local",
    "快速": "rapid",
    "区間快速": "semi_rapid",
    "新快速": "special_rapid",
    "特急": "limitedExp"
},
  interpolatePassingStations: true,
};
