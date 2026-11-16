// scripts/lines/jr_kishin/config.cjs
module.exports = {
  lineId: 'jr_kishin',
  name: 'JR姫新線',
  stationsFilePath: 'src/data/lines/jr_kishin/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_kishin/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_kishin/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_kishin-01",
        "name": "姫路",
        "yahooStationId": "26524",
        "inGroupId": null,
        "outGroupId": "1951"
    },
    {
        "id": "jr_kishin-02",
        "name": "播磨高岡",
        "yahooStationId": "26508",
        "inGroupId": "1951",
        "outGroupId": "1950"
    },
    {
        "id": "jr_kishin-03",
        "name": "余部",
        "yahooStationId": "26588",
        "inGroupId": "1951",
        "outGroupId": "1950"
    },
    {
        "id": "jr_kishin-04",
        "name": "太市",
        "yahooStationId": "26298",
        "inGroupId": "1951",
        "outGroupId": "1950"
    },
    {
        "id": "jr_kishin-05",
        "name": "本竜野",
        "yahooStationId": "26545",
        "inGroupId": "1951",
        "outGroupId": "1950"
    },
    {
        "id": "jr_kishin-06",
        "name": "東觜崎",
        "yahooStationId": "26521",
        "inGroupId": "1951",
        "outGroupId": "1950"
    },
    {
        "id": "jr_kishin-07",
        "name": "播磨新宮",
        "yahooStationId": "26507",
        "inGroupId": "1951",
        "outGroupId": "1950"
    },
    {
        "id": "jr_kishin-08",
        "name": "千本",
        "yahooStationId": "26418",
        "inGroupId": "1951",
        "outGroupId": "1950"
    },
    {
        "id": "jr_kishin-09",
        "name": "西栗栖",
        "yahooStationId": "26480",
        "inGroupId": "1951",
        "outGroupId": "1950"
    },
    {
        "id": "jr_kishin-10",
        "name": "三日月",
        "yahooStationId": "26557",
        "inGroupId": "1951",
        "outGroupId": "1950"
    },
    {
        "id": "jr_kishin-11",
        "name": "播磨徳久",
        "yahooStationId": "26510",
        "inGroupId": "1951",
        "outGroupId": "1950"
    },
    {
        "id": "jr_kishin-12",
        "name": "佐用",
        "yahooStationId": "26372",
        "inGroupId": "1951",
        "outGroupId": "1950"
    },
    {
        "id": "jr_kishin-13",
        "name": "上月",
        "yahooStationId": "26354",
        "inGroupId": "1951",
        "outGroupId": "1950"
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
