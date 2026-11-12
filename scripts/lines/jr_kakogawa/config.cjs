// scripts/lines/jr_kakogawa/config.cjs
module.exports = {
  lineId: 'jr_kakogawa',
  name: 'JR加古川線',
  stationsFilePath: 'src/data/lines/jr_kakogawa/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_kakogawa/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_kakogawa/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_kakogawa-01",
        "name": "加古川",
        "yahooStationId": "26314",
        "inGroupId": null,
        "outGroupId": "1871"
    },
    {
        "id": "jr_kakogawa-02",
        "name": "日岡",
        "yahooStationId": "26516",
        "inGroupId": "1871",
        "outGroupId": "1870"
    },
    {
        "id": "jr_kakogawa-03",
        "name": "神野",
        "yahooStationId": "26327",
        "inGroupId": "1871",
        "outGroupId": "1870"
    },
    {
        "id": "jr_kakogawa-04",
        "name": "厄神",
        "yahooStationId": "26578",
        "inGroupId": "1871",
        "outGroupId": "1870"
    },
    {
        "id": "jr_kakogawa-05",
        "name": "市場",
        "yahooStationId": "26279",
        "inGroupId": "1871",
        "outGroupId": "1870"
    },
    {
        "id": "jr_kakogawa-06",
        "name": "小野町",
        "yahooStationId": "26311",
        "inGroupId": "1871",
        "outGroupId": "1870"
    },
    {
        "id": "jr_kakogawa-07",
        "name": "粟生",
        "yahooStationId": "26248",
        "inGroupId": "1871",
        "outGroupId": "1870"
    },
    {
        "id": "jr_kakogawa-08",
        "name": "河合西",
        "yahooStationId": "26324",
        "inGroupId": "1871",
        "outGroupId": "1870"
    },
    {
        "id": "jr_kakogawa-09",
        "name": "青野ヶ原",
        "yahooStationId": "26250",
        "inGroupId": "1871",
        "outGroupId": "1870"
    },
    {
        "id": "jr_kakogawa-10",
        "name": "社町",
        "yahooStationId": "26579",
        "inGroupId": "1871",
        "outGroupId": "1870"
    },
    {
        "id": "jr_kakogawa-11",
        "name": "滝野",
        "yahooStationId": "26430",
        "inGroupId": "1871",
        "outGroupId": "1870"
    },
    {
        "id": "jr_kakogawa-12",
        "name": "滝",
        "yahooStationId": "26429",
        "inGroupId": "1871",
        "outGroupId": "1870"
    },
    {
        "id": "jr_kakogawa-13",
        "name": "西脇市",
        "yahooStationId": "26494",
        "inGroupId": "1871",
        "outGroupId": "1870"
    },
    {
        "id": "jr_kakogawa-14",
        "name": "新西脇",
        "yahooStationId": "26406",
        "inGroupId": "1871",
        "outGroupId": "1870"
    },
    {
        "id": "jr_kakogawa-15",
        "name": "比延",
        "yahooStationId": "26515",
        "inGroupId": "1871",
        "outGroupId": "1870"
    },
    {
        "id": "jr_kakogawa-16",
        "name": "日本へそ公園",
        "yahooStationId": "26496",
        "inGroupId": "1871",
        "outGroupId": "1870"
    },
    {
        "id": "jr_kakogawa-17",
        "name": "黒田庄",
        "yahooStationId": "26347",
        "inGroupId": "1871",
        "outGroupId": "1870"
    },
    {
        "id": "jr_kakogawa-18",
        "name": "本黒田",
        "yahooStationId": "26544",
        "inGroupId": "1871",
        "outGroupId": "1870"
    },
    {
        "id": "jr_kakogawa-19",
        "name": "船町口",
        "yahooStationId": "26536",
        "inGroupId": "1871",
        "outGroupId": "1870"
    },
    {
        "id": "jr_kakogawa-20",
        "name": "久下村",
        "yahooStationId": "26339",
        "inGroupId": "1871",
        "outGroupId": "1870"
    },
    {
        "id": "jr_kakogawa-21",
        "name": "谷川",
        "yahooStationId": "29928",
        "inGroupId": "8550",
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
