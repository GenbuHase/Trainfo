// scripts/lines/jr_kansai_kameyama_kamo/config.cjs
module.exports = {
  lineId: 'jr_kansai_kameyama_kamo',
  name: 'JR関西本線（亀山～加茂）',
  stationsFilePath: 'src/data/lines/jr_kansai_kameyama_kamo/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_kansai_kameyama_kamo/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_kansai_kameyama_kamo/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_kansai_kameyama_kamo-01",
        "name": "亀山",
        "yahooStationId": "25325",
        "inGroupId": "1400",
        "outGroupId": "1491"
    },
    {
        "id": "jr_kansai_kameyama_kamo-02",
        "name": "関",
        "yahooStationId": "25378",
        "inGroupId": "1491",
        "outGroupId": "1490"
    },
    {
        "id": "jr_kansai_kameyama_kamo-03",
        "name": "加太",
        "yahooStationId": "25321",
        "inGroupId": "1491",
        "outGroupId": "1490"
    },
    {
        "id": "jr_kansai_kameyama_kamo-04",
        "name": "柘植",
        "yahooStationId": "25393",
        "inGroupId": "1491",
        "outGroupId": "1490"
    },
    {
        "id": "jr_kansai_kameyama_kamo-05",
        "name": "佐那具",
        "yahooStationId": "25360",
        "inGroupId": "1491",
        "outGroupId": "1490"
    },
    {
        "id": "jr_kansai_kameyama_kamo-06",
        "name": "伊賀上野",
        "yahooStationId": "25261",
        "inGroupId": "1491",
        "outGroupId": "1490"
    },
    {
        "id": "jr_kansai_kameyama_kamo-07",
        "name": "島ヶ原",
        "yahooStationId": "25364",
        "inGroupId": "1491",
        "outGroupId": "1490"
    },
    {
        "id": "jr_kansai_kameyama_kamo-08",
        "name": "月ヶ瀬口",
        "yahooStationId": "25715",
        "inGroupId": "1491",
        "outGroupId": "1490"
    },
    {
        "id": "jr_kansai_kameyama_kamo-09",
        "name": "大河原",
        "yahooStationId": "25613",
        "inGroupId": "1491",
        "outGroupId": "1490"
    },
    {
        "id": "jr_kansai_kameyama_kamo-10",
        "name": "笠置",
        "yahooStationId": "25622",
        "inGroupId": "1491",
        "outGroupId": "1490"
    },
    {
        "id": "jr_kansai_kameyama_kamo-11",
        "name": "加茂",
        "yahooStationId": "25632",
        "inGroupId": "1490",
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
