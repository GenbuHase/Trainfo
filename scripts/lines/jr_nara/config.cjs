// scripts/lines/jr_nara/config.cjs
module.exports = {
  lineId: 'jr_nara',
  name: 'JR奈良線',
  stationsFilePath: 'src/data/lines/jr_nara/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_nara/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_nara/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_nara-01",
        "name": "京都",
        "yahooStationId": "25647",
        "inGroupId": null,
        "outGroupId": "1631"
    },
    {
        "id": "jr_nara-02",
        "name": "東福寺",
        "yahooStationId": "25720",
        "inGroupId": "1631",
        "outGroupId": "1630"
    },
    {
        "id": "jr_nara-03",
        "name": "稲荷",
        "yahooStationId": "25597",
        "inGroupId": "1631",
        "outGroupId": "1630"
    },
    {
        "id": "jr_nara-04",
        "name": "JR藤森",
        "yahooStationId": "29165",
        "inGroupId": "1631",
        "outGroupId": "1630"
    },
    {
        "id": "jr_nara-05",
        "name": "桃山",
        "yahooStationId": "25779",
        "inGroupId": "1631",
        "outGroupId": "1630"
    },
    {
        "id": "jr_nara-06",
        "name": "六地蔵",
        "yahooStationId": "25796",
        "inGroupId": "1631",
        "outGroupId": "1630"
    },
    {
        "id": "jr_nara-07",
        "name": "木幡",
        "yahooStationId": "25666",
        "inGroupId": "1631",
        "outGroupId": "1630"
    },
    {
        "id": "jr_nara-08",
        "name": "黄檗",
        "yahooStationId": "25608",
        "inGroupId": "1631",
        "outGroupId": "1630"
    },
    {
        "id": "jr_nara-09",
        "name": "宇治",
        "yahooStationId": "25601",
        "inGroupId": "1631",
        "outGroupId": "1630"
    },
    {
        "id": "jr_nara-10",
        "name": "JR小倉",
        "yahooStationId": "29344",
        "inGroupId": "1631",
        "outGroupId": "1630"
    },
    {
        "id": "jr_nara-11",
        "name": "新田",
        "yahooStationId": "25691",
        "inGroupId": "1631",
        "outGroupId": "1630"
    },
    {
        "id": "jr_nara-12",
        "name": "城陽",
        "yahooStationId": "25695",
        "inGroupId": "1631",
        "outGroupId": "1630"
    },
    {
        "id": "jr_nara-13",
        "name": "長池",
        "yahooStationId": "25730",
        "inGroupId": "1631",
        "outGroupId": "1630"
    },
    {
        "id": "jr_nara-14",
        "name": "山城青谷",
        "yahooStationId": "25787",
        "inGroupId": "1631",
        "outGroupId": "1630"
    },
    {
        "id": "jr_nara-15",
        "name": "山城多賀",
        "yahooStationId": "25788",
        "inGroupId": "1631",
        "outGroupId": "1630"
    },
    {
        "id": "jr_nara-16",
        "name": "玉水",
        "yahooStationId": "25705",
        "inGroupId": "1631",
        "outGroupId": "1630"
    },
    {
        "id": "jr_nara-17",
        "name": "棚倉",
        "yahooStationId": "25703",
        "inGroupId": "1631",
        "outGroupId": "1630"
    },
    {
        "id": "jr_nara-18",
        "name": "上狛",
        "yahooStationId": "25627",
        "inGroupId": "1631",
        "outGroupId": "1630"
    },
    {
        "id": "jr_nara-19",
        "name": "木津",
        "yahooStationId": "25643",
        "inGroupId": "1630",
        "outGroupId": "1630"
    },
    {
        "id": "jr_nara-20",
        "name": "平城山",
        "yahooStationId": "26670",
        "inGroupId": "1630",
        "outGroupId": "1630"
    },
    {
        "id": "jr_nara-21",
        "name": "奈良",
        "yahooStationId": "26628",
        "inGroupId": "3790",
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
