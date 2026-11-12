// scripts/lines/jr_maizuru/config.cjs
module.exports = {
  lineId: 'jr_maizuru',
  name: 'JR舞鶴線',
  stationsFilePath: 'src/data/lines/jr_maizuru/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_maizuru/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_maizuru/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_maizuru-01",
        "name": "綾部",
        "yahooStationId": "25588",
        "inGroupId": null,
        "outGroupId": "1861"
    },
    {
        "id": "jr_maizuru-02",
        "name": "淵垣",
        "yahooStationId": "25757",
        "inGroupId": "1861",
        "outGroupId": "1860"
    },
    {
        "id": "jr_maizuru-03",
        "name": "梅迫",
        "yahooStationId": "25606",
        "inGroupId": "1861",
        "outGroupId": "1860"
    },
    {
        "id": "jr_maizuru-04",
        "name": "真倉",
        "yahooStationId": "25762",
        "inGroupId": "1861",
        "outGroupId": "1860"
    },
    {
        "id": "jr_maizuru-05",
        "name": "西舞鶴",
        "yahooStationId": "25738",
        "inGroupId": "1861",
        "outGroupId": "1860"
    },
    {
        "id": "jr_maizuru-06",
        "name": "東舞鶴",
        "yahooStationId": "25746",
        "inGroupId": "1860",
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
