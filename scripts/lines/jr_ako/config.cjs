// scripts/lines/jr_ako/config.cjs
module.exports = {
  lineId: 'jr_ako',
  name: 'JR赤穂線',
  stationsFilePath: 'src/data/lines/jr_ako/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_ako/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_ako/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_ako-01",
        "name": "相生",
        "yahooStationId": "26242",
        "inGroupId": null,
        "outGroupId": "1841"
    },
    {
        "id": "jr_ako-02",
        "name": "西相生",
        "yahooStationId": "26477",
        "inGroupId": "1841",
        "outGroupId": "1840"
    },
    {
        "id": "jr_ako-03",
        "name": "坂越",
        "yahooStationId": "26368",
        "inGroupId": "1841",
        "outGroupId": "1840"
    },
    {
        "id": "jr_ako-04",
        "name": "播州赤穂",
        "yahooStationId": "26513",
        "inGroupId": "1841",
        "outGroupId": "1840"
    },
    {
        "id": "jr_ako-05",
        "name": "天和",
        "yahooStationId": "26457",
        "inGroupId": "1841",
        "outGroupId": "1840"
    },
    {
        "id": "jr_ako-06",
        "name": "備前福河",
        "yahooStationId": "26532",
        "inGroupId": "1841",
        "outGroupId": "1840"
    },
    {
        "id": "jr_ako-07",
        "name": "寒河",
        "yahooStationId": "27096",
        "inGroupId": "1841",
        "outGroupId": "1840"
    },
    {
        "id": "jr_ako-08",
        "name": "日生",
        "yahooStationId": "27142",
        "inGroupId": "1841",
        "outGroupId": "1840"
    },
    {
        "id": "jr_ako-09",
        "name": "伊里",
        "yahooStationId": "27040",
        "inGroupId": "1841",
        "outGroupId": "1840"
    },
    {
        "id": "jr_ako-10",
        "name": "備前片上",
        "yahooStationId": "27152",
        "inGroupId": "1841",
        "outGroupId": "1840"
    },
    {
        "id": "jr_ako-11",
        "name": "西片上",
        "yahooStationId": "27124",
        "inGroupId": "1841",
        "outGroupId": "1840"
    },
    {
        "id": "jr_ako-12",
        "name": "伊部",
        "yahooStationId": "27043",
        "inGroupId": "1841",
        "outGroupId": "1840"
    },
    {
        "id": "jr_ako-13",
        "name": "香登",
        "yahooStationId": "27058",
        "inGroupId": "1841",
        "outGroupId": "1840"
    },
    {
        "id": "jr_ako-14",
        "name": "長船",
        "yahooStationId": "27056",
        "inGroupId": "1841",
        "outGroupId": "1840"
    },
    {
        "id": "jr_ako-15",
        "name": "邑久",
        "yahooStationId": "27054",
        "inGroupId": "1841",
        "outGroupId": "1840"
    },
    {
        "id": "jr_ako-16",
        "name": "大富",
        "yahooStationId": "27048",
        "inGroupId": "1841",
        "outGroupId": "1840"
    },
    {
        "id": "jr_ako-17",
        "name": "西大寺",
        "yahooStationId": "27083",
        "inGroupId": "1841",
        "outGroupId": "1840"
    },
    {
        "id": "jr_ako-18",
        "name": "大多羅",
        "yahooStationId": "27047",
        "inGroupId": "1841",
        "outGroupId": "1840"
    },
    {
        "id": "jr_ako-19",
        "name": "東岡山",
        "yahooStationId": "27137",
        "inGroupId": "1840",
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
