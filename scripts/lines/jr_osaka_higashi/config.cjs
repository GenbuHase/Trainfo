// scripts/lines/jr_osaka_higashi/config.cjs
module.exports = {
  lineId: 'jr_osaka_higashi',
  name: 'JRおおさか東線',
  stationsFilePath: 'src/data/lines/jr_osaka_higashi/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_osaka_higashi/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_osaka_higashi/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_osaka_higashi-01",
        "name": "大阪",
        "yahooStationId": "25978",
        "inGroupId": null,
        "outGroupId": "4271"
    },
    {
        "id": "jr_osaka_higashi-02",
        "name": "新大阪",
        "yahooStationId": "25978",
        "inGroupId": "1670",
        "outGroupId": "4271"
    },
    {
        "id": "jr_osaka_higashi-03",
        "name": "南吹田",
        "yahooStationId": "29805",
        "inGroupId": "1670",
        "outGroupId": "1671"
    },
    {
        "id": "jr_osaka_higashi-04",
        "name": "JR淡路",
        "yahooStationId": "29806",
        "inGroupId": "1670",
        "outGroupId": "1671"
    },
    {
        "id": "jr_osaka_higashi-05",
        "name": "城北公園通",
        "yahooStationId": "29807",
        "inGroupId": "1670",
        "outGroupId": "1671"
    },
    {
        "id": "jr_osaka_higashi-06",
        "name": "JR野江",
        "yahooStationId": "29808",
        "inGroupId": "1670",
        "outGroupId": "1671"
    },
    {
        "id": "jr_osaka_higashi-07",
        "name": "鴫野",
        "yahooStationId": "25966",
        "inGroupId": "1670",
        "outGroupId": "1691"
    },
    {
        "id": "jr_osaka_higashi-08",
        "name": "放出",
        "yahooStationId": "26130",
        "inGroupId": "1670",
        "outGroupId": "1691"
    },
    {
        "id": "jr_osaka_higashi-09",
        "name": "高井田中央",
        "yahooStationId": "29602",
        "inGroupId": "1670",
        "outGroupId": "1671"
    },
    {
        "id": "jr_osaka_higashi-10",
        "name": "JR河内永和",
        "yahooStationId": "29603",
        "inGroupId": "1670",
        "outGroupId": "1671"
    },
    {
        "id": "jr_osaka_higashi-11",
        "name": "JR俊徳道",
        "yahooStationId": "29604",
        "inGroupId": "1670",
        "outGroupId": "1671"
    },
    {
        "id": "jr_osaka_higashi-12",
        "name": "JR長瀬",
        "yahooStationId": "29605",
        "inGroupId": "1670",
        "outGroupId": "1671"
    },
    {
        "id": "jr_osaka_higashi-13",
        "name": "衣摺加美北",
        "yahooStationId": "29787",
        "inGroupId": "1670",
        "outGroupId": "1671"
    },
    {
        "id": "jr_osaka_higashi-14",
        "name": "新加美",
        "yahooStationId": "29606",
        "inGroupId": "1670",
        "outGroupId": "1671"
    },
    {
        "id": "jr_osaka_higashi-15",
        "name": "久宝寺",
        "yahooStationId": "25898",
        "inGroupId": "1670",
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
  defaultCars: 6,
};
