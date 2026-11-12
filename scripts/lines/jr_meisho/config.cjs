// scripts/lines/jr_meisho/config.cjs
module.exports = {
  lineId: 'jr_meisho',
  name: 'JR名松線',
  stationsFilePath: 'src/data/lines/jr_meisho/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_meisho/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_meisho/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_meisho-01",
        "name": "松阪",
        "yahooStationId": "25445",
        "inGroupId": null,
        "outGroupId": "3750"
    },
    {
        "id": "jr_meisho-02",
        "name": "上ノ庄",
        "yahooStationId": "25324",
        "inGroupId": "1440",
        "outGroupId": "1441"
    },
    {
        "id": "jr_meisho-03",
        "name": "権現前",
        "yahooStationId": "25354",
        "inGroupId": "1440",
        "outGroupId": "1441"
    },
    {
        "id": "jr_meisho-04",
        "name": "伊勢八太",
        "yahooStationId": "25283",
        "inGroupId": "1440",
        "outGroupId": "1441"
    },
    {
        "id": "jr_meisho-05",
        "name": "一志",
        "yahooStationId": "25290",
        "inGroupId": "1440",
        "outGroupId": "1441"
    },
    {
        "id": "jr_meisho-06",
        "name": "井関",
        "yahooStationId": "25277",
        "inGroupId": "1440",
        "outGroupId": "1441"
    },
    {
        "id": "jr_meisho-07",
        "name": "伊勢大井",
        "yahooStationId": "25271",
        "inGroupId": "1440",
        "outGroupId": "1441"
    },
    {
        "id": "jr_meisho-08",
        "name": "伊勢川口",
        "yahooStationId": "25275",
        "inGroupId": "1440",
        "outGroupId": "1441"
    },
    {
        "id": "jr_meisho-09",
        "name": "関ノ宮",
        "yahooStationId": "25379",
        "inGroupId": "1440",
        "outGroupId": "1441"
    },
    {
        "id": "jr_meisho-10",
        "name": "家城",
        "yahooStationId": "25260",
        "inGroupId": "1440",
        "outGroupId": "1441"
    },
    {
        "id": "jr_meisho-11",
        "name": "伊勢竹原",
        "yahooStationId": "25279",
        "inGroupId": "1440",
        "outGroupId": "1441"
    },
    {
        "id": "jr_meisho-12",
        "name": "伊勢鎌倉",
        "yahooStationId": "25274",
        "inGroupId": "1440",
        "outGroupId": "1441"
    },
    {
        "id": "jr_meisho-13",
        "name": "伊勢八知",
        "yahooStationId": "25285",
        "inGroupId": "1440",
        "outGroupId": "1441"
    },
    {
        "id": "jr_meisho-14",
        "name": "比津",
        "yahooStationId": "25432",
        "inGroupId": "1440",
        "outGroupId": "1441"
    },
    {
        "id": "jr_meisho-15",
        "name": "伊勢奥津",
        "yahooStationId": "25272",
        "inGroupId": "1440",
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
  defaultCars: 1,
};
