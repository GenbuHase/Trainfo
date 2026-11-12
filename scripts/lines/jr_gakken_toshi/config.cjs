// scripts/lines/jr_gakken_toshi/config.cjs
module.exports = {
  lineId: 'jr_gakken_toshi',
  name: 'JR学研都市線',
  stationsFilePath: 'src/data/lines/jr_gakken_toshi/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_gakken_toshi/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_gakken_toshi/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_gakken_toshi-01",
        "name": "木津",
        "yahooStationId": "25643",
        "inGroupId": null,
        "outGroupId": "1691"
    },
    {
        "id": "jr_gakken_toshi-02",
        "name": "西木津",
        "yahooStationId": "25737",
        "inGroupId": null,
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-03",
        "name": "祝園",
        "yahooStationId": "25759",
        "inGroupId": null,
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-04",
        "name": "下狛",
        "yahooStationId": "25687",
        "inGroupId": null,
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-05",
        "name": "JR三山木",
        "yahooStationId": "25628",
        "inGroupId": null,
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-06",
        "name": "同志社前",
        "yahooStationId": "25729",
        "inGroupId": null,
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-07",
        "name": "京田辺",
        "yahooStationId": "25704",
        "inGroupId": null,
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-08",
        "name": "大住",
        "yahooStationId": "25615",
        "inGroupId": null,
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-09",
        "name": "松井山手",
        "yahooStationId": "25763",
        "inGroupId": null,
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-10",
        "name": "長尾",
        "yahooStationId": "26091",
        "inGroupId": null,
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-11",
        "name": "藤阪",
        "yahooStationId": "26170",
        "inGroupId": null,
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-12",
        "name": "津田",
        "yahooStationId": "26048",
        "inGroupId": null,
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-13",
        "name": "河内磐船",
        "yahooStationId": "25880",
        "inGroupId": null,
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-14",
        "name": "星田",
        "yahooStationId": "26179",
        "inGroupId": null,
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-15",
        "name": "寝屋川公園",
        "yahooStationId": "26144",
        "inGroupId": null,
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-16",
        "name": "忍ケ丘",
        "yahooStationId": "25971",
        "inGroupId": null,
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-17",
        "name": "四条畷",
        "yahooStationId": "25967",
        "inGroupId": "1691",
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-18",
        "name": "野崎",
        "yahooStationId": "26115",
        "inGroupId": "1691",
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-19",
        "name": "住道",
        "yahooStationId": "25991",
        "inGroupId": "1691",
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-20",
        "name": "鴻池新田",
        "yahooStationId": "25931",
        "inGroupId": "1691",
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-21",
        "name": "徳庵",
        "yahooStationId": "26073",
        "inGroupId": "1691",
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-22",
        "name": "放出",
        "yahooStationId": "26130",
        "inGroupId": "1691",
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-23",
        "name": "鴫野",
        "yahooStationId": "25966",
        "inGroupId": "1691",
        "outGroupId": "1690"
    },
    {
        "id": "jr_gakken_toshi-24",
        "name": "京橋",
        "yahooStationId": "25901",
        "inGroupId": "7200",
        "outGroupId": null
    }
],
  stationNameAliases: {},
  trainTypeMap: {
    '普通': 'local',
    '各駅停車': 'local',
    '快速': 'rapid',
    '区間快速': 'semi_rapid',
    '直通快速': 'direct_rapid',
    '大和路快速': 'yamatoji_rapid',
    '関空快速': 'kanku_rapid',
    '紀州路快速': 'kishuji_rapid',
    '丹波路快速': 'tambaji_rapid',
    '新快速': 'new_rapid',
    '特急': 'limitedExp',
  },
  defaultCars: 7,
};
