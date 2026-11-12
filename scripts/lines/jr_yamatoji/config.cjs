// scripts/lines/jr_yamatoji/config.cjs
module.exports = {
  lineId: 'jr_yamatoji',
  name: 'JR大和路線',
  stationsFilePath: 'src/data/lines/jr_yamatoji/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_yamatoji/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_yamatoji/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_yamatoji-01",
        "name": "加茂",
        "yahooStationId": "25632",
        "inGroupId": null,
        "outGroupId": "1621"
    },
    {
        "id": "jr_yamatoji-02",
        "name": "木津",
        "yahooStationId": "25643",
        "inGroupId": null,
        "outGroupId": "1620"
    },
    {
        "id": "jr_yamatoji-03",
        "name": "平城山",
        "yahooStationId": "26670",
        "inGroupId": null,
        "outGroupId": "1620"
    },
    {
        "id": "jr_yamatoji-04",
        "name": "奈良",
        "yahooStationId": "26669",
        "inGroupId": null,
        "outGroupId": "1620"
    },
    {
        "id": "jr_yamatoji-05",
        "name": "郡山",
        "yahooStationId": "26633",
        "inGroupId": null,
        "outGroupId": "1620"
    },
    {
        "id": "jr_yamatoji-06",
        "name": "大和小泉",
        "yahooStationId": "26706",
        "inGroupId": null,
        "outGroupId": "1620"
    },
    {
        "id": "jr_yamatoji-07",
        "name": "法隆寺",
        "yahooStationId": "26691",
        "inGroupId": null,
        "outGroupId": "1620"
    },
    {
        "id": "jr_yamatoji-08",
        "name": "王寺",
        "yahooStationId": "26609",
        "inGroupId": null,
        "outGroupId": "1701"
    },
    {
        "id": "jr_yamatoji-09",
        "name": "三郷",
        "yahooStationId": "26640",
        "inGroupId": null,
        "outGroupId": "1620"
    },
    {
        "id": "jr_yamatoji-10",
        "name": "河内堅上",
        "yahooStationId": "25882",
        "inGroupId": null,
        "outGroupId": "1620"
    },
    {
        "id": "jr_yamatoji-11",
        "name": "高井田",
        "yahooStationId": "26014",
        "inGroupId": null,
        "outGroupId": "1620"
    },
    {
        "id": "jr_yamatoji-12",
        "name": "柏原",
        "yahooStationId": "25868",
        "inGroupId": null,
        "outGroupId": "1620"
    },
    {
        "id": "jr_yamatoji-13",
        "name": "志紀",
        "yahooStationId": "25964",
        "inGroupId": null,
        "outGroupId": "1620"
    },
    {
        "id": "jr_yamatoji-14",
        "name": "八尾",
        "yahooStationId": "26226",
        "inGroupId": null,
        "outGroupId": "1620"
    },
    {
        "id": "jr_yamatoji-15",
        "name": "久宝寺",
        "yahooStationId": "25898",
        "inGroupId": null,
        "outGroupId": "1670"
    },
    {
        "id": "jr_yamatoji-16",
        "name": "加美",
        "yahooStationId": "25874",
        "inGroupId": null,
        "outGroupId": "1620"
    },
    {
        "id": "jr_yamatoji-17",
        "name": "平野",
        "yahooStationId": "26157",
        "inGroupId": null,
        "outGroupId": "1620"
    },
    {
        "id": "jr_yamatoji-18",
        "name": "東部市場前",
        "yahooStationId": "26070",
        "inGroupId": null,
        "outGroupId": "1620"
    },
    {
        "id": "jr_yamatoji-19",
        "name": "天王寺",
        "yahooStationId": "26062",
        "inGroupId": null,
        "outGroupId": "4270"
    },
    {
        "id": "jr_yamatoji-20",
        "name": "新今宮",
        "yahooStationId": "25977",
        "inGroupId": null,
        "outGroupId": "3951"
    },
    {
        "id": "jr_yamatoji-21",
        "name": "今宮",
        "yahooStationId": "25977",
        "inGroupId": null,
        "outGroupId": "3951"
    },
    {
        "id": "jr_yamatoji-22",
        "name": "JR難波",
        "yahooStationId": "25984",
        "inGroupId": "1620",
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
  defaultCars: 8,
};
