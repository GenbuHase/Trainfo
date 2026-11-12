// scripts/lines/jr_kusatsu/config.cjs
module.exports = {
  lineId: 'jr_kusatsu',
  name: 'JR草津線',
  stationsFilePath: 'src/data/lines/jr_kusatsu/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_kusatsu/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_kusatsu/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_kusatsu-01",
        "name": "柘植",
        "yahooStationId": "25393",
        "inGroupId": null,
        "outGroupId": "1611"
    },
    {
        "id": "jr_kusatsu-02",
        "name": "油日",
        "yahooStationId": "25477",
        "inGroupId": "1611",
        "outGroupId": "1610"
    },
    {
        "id": "jr_kusatsu-03",
        "name": "甲賀",
        "yahooStationId": "25518",
        "inGroupId": "1611",
        "outGroupId": "1610"
    },
    {
        "id": "jr_kusatsu-04",
        "name": "寺庄",
        "yahooStationId": "25545",
        "inGroupId": "1611",
        "outGroupId": "1610"
    },
    {
        "id": "jr_kusatsu-05",
        "name": "甲南",
        "yahooStationId": "25520",
        "inGroupId": "1611",
        "outGroupId": "1610"
    },
    {
        "id": "jr_kusatsu-06",
        "name": "貴生川",
        "yahooStationId": "25512",
        "inGroupId": "1611",
        "outGroupId": "1610"
    },
    {
        "id": "jr_kusatsu-07",
        "name": "三雲",
        "yahooStationId": "25569",
        "inGroupId": "1611",
        "outGroupId": "1610"
    },
    {
        "id": "jr_kusatsu-08",
        "name": "甲西",
        "yahooStationId": "25519",
        "inGroupId": "1611",
        "outGroupId": "1610"
    },
    {
        "id": "jr_kusatsu-09",
        "name": "石部",
        "yahooStationId": "25481",
        "inGroupId": "1611",
        "outGroupId": "1610"
    },
    {
        "id": "jr_kusatsu-10",
        "name": "手原",
        "yahooStationId": "25544",
        "inGroupId": "1611",
        "outGroupId": "1610"
    },
    {
        "id": "jr_kusatsu-11",
        "name": "草津",
        "yahooStationId": "25514",
        "inGroupId": "1610",
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
    "みやこ路快速": "miyako_rapid",
    "丹波路快速": "tambaji_rapid",
    "特急": "limitedExp"
},
  interpolatePassingStations: true,
};
