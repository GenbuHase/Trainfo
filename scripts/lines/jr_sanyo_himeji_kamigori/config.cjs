// scripts/lines/jr_sanyo_himeji_kamigori/config.cjs
module.exports = {
  lineId: 'jr_sanyo_himeji_kamigori',
  name: 'JR山陽本線（姫路～上郡）',
  stationsFilePath: 'src/data/lines/jr_sanyo_himeji_kamigori/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_sanyo_himeji_kamigori/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_sanyo_himeji_kamigori/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_sanyo_himeji_kamigori-01",
        "name": "姫路",
        "yahooStationId": "26524",
        "inGroupId": "1461",
        "outGroupId": "1460"
    },
    {
        "id": "jr_sanyo_himeji_kamigori-02",
        "name": "英賀保",
        "yahooStationId": "26252",
        "inGroupId": "1981",
        "outGroupId": "1980"
    },
    {
        "id": "jr_sanyo_himeji_kamigori-03",
        "name": "はりま勝原",
        "yahooStationId": "29609",
        "inGroupId": "1981",
        "outGroupId": "1980"
    },
    {
        "id": "jr_sanyo_himeji_kamigori-04",
        "name": "網干",
        "yahooStationId": "26258",
        "inGroupId": "1981",
        "outGroupId": "1980"
    },
    {
        "id": "jr_sanyo_himeji_kamigori-05",
        "name": "竜野",
        "yahooStationId": "26440",
        "inGroupId": "1981",
        "outGroupId": "1980"
    },
    {
        "id": "jr_sanyo_himeji_kamigori-06",
        "name": "相生",
        "yahooStationId": "26242",
        "inGroupId": "1461",
        "outGroupId": "1460"
    },
    {
        "id": "jr_sanyo_himeji_kamigori-07",
        "name": "有年",
        "yahooStationId": "26290",
        "inGroupId": "1981",
        "outGroupId": "1980"
    },
    {
        "id": "jr_sanyo_himeji_kamigori-08",
        "name": "上郡",
        "yahooStationId": "26320",
        "inGroupId": "1981",
        "outGroupId": "1980"
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
