// scripts/lines/jr_kansai_nagoya_kameyama/config.cjs
module.exports = {
  lineId: 'jr_kansai_nagoya_kameyama',
  name: 'JR関西本線（名古屋～亀山）',
  stationsFilePath: 'src/data/lines/jr_kansai_nagoya_kameyama/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_kansai_nagoya_kameyama/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_kansai_nagoya_kameyama/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_kansai_nagoya_kameyama-01",
        "name": "名古屋",
        "yahooStationId": "25077",
        "inGroupId": null,
        "outGroupId": "1401"
    },
    {
        "id": "jr_kansai_nagoya_kameyama-02",
        "name": "八田",
        "yahooStationId": "25102",
        "inGroupId": "1400",
        "outGroupId": "1401"
    },
    {
        "id": "jr_kansai_nagoya_kameyama-03",
        "name": "春田",
        "yahooStationId": "29345",
        "inGroupId": "1400",
        "outGroupId": "1401"
    },
    {
        "id": "jr_kansai_nagoya_kameyama-04",
        "name": "蟹江",
        "yahooStationId": "24878",
        "inGroupId": "1400",
        "outGroupId": "1401"
    },
    {
        "id": "jr_kansai_nagoya_kameyama-05",
        "name": "永和",
        "yahooStationId": "24833",
        "inGroupId": "1400",
        "outGroupId": "1401"
    },
    {
        "id": "jr_kansai_nagoya_kameyama-06",
        "name": "弥富",
        "yahooStationId": "25227",
        "inGroupId": "1400",
        "outGroupId": "1401"
    },
    {
        "id": "jr_kansai_nagoya_kameyama-07",
        "name": "長島",
        "yahooStationId": "25410",
        "inGroupId": "1400",
        "outGroupId": "1401"
    },
    {
        "id": "jr_kansai_nagoya_kameyama-08",
        "name": "桑名",
        "yahooStationId": "25348",
        "inGroupId": "3721",
        "outGroupId": "1401"
    },
    {
        "id": "jr_kansai_nagoya_kameyama-09",
        "name": "朝日",
        "yahooStationId": "25251",
        "inGroupId": "1400",
        "outGroupId": "1401"
    },
    {
        "id": "jr_kansai_nagoya_kameyama-10",
        "name": "富田",
        "yahooStationId": "25403",
        "inGroupId": "1400",
        "outGroupId": "1401"
    },
    {
        "id": "jr_kansai_nagoya_kameyama-11",
        "name": "富田浜",
        "yahooStationId": "25404",
        "inGroupId": "1400",
        "outGroupId": "1401"
    },
    {
        "id": "jr_kansai_nagoya_kameyama-12",
        "name": "四日市",
        "yahooStationId": "25467",
        "inGroupId": "1400",
        "outGroupId": "1401"
    },
    {
        "id": "jr_kansai_nagoya_kameyama-13",
        "name": "南四日市",
        "yahooStationId": "25456",
        "inGroupId": "1400",
        "outGroupId": "1401"
    },
    {
        "id": "jr_kansai_nagoya_kameyama-14",
        "name": "河原田",
        "yahooStationId": "25332",
        "inGroupId": "1400",
        "outGroupId": "1401"
    },
    {
        "id": "jr_kansai_nagoya_kameyama-15",
        "name": "河曲",
        "yahooStationId": "25331",
        "inGroupId": "1400",
        "outGroupId": "1401"
    },
    {
        "id": "jr_kansai_nagoya_kameyama-16",
        "name": "加佐登",
        "yahooStationId": "25317",
        "inGroupId": "1400",
        "outGroupId": "1401"
    },
    {
        "id": "jr_kansai_nagoya_kameyama-17",
        "name": "井田川",
        "yahooStationId": "25288",
        "inGroupId": "1400",
        "outGroupId": "1401"
    },
    {
        "id": "jr_kansai_nagoya_kameyama-18",
        "name": "亀山",
        "yahooStationId": "25325",
        "inGroupId": "1411",
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
