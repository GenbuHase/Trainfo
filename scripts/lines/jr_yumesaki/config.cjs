// scripts/lines/jr_yumesaki/config.cjs
module.exports = {
  lineId: 'jr_yumesaki',
  name: 'JRゆめ咲線',
  stationsFilePath: 'src/data/lines/jr_yumesaki/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_yumesaki/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_yumesaki/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_yumesaki-01",
        "name": "西九条",
        "yahooStationId": "26104",
        "inGroupId": null,
        "outGroupId": "4240"
    },
    {
        "id": "jr_yumesaki-02",
        "name": "安治川口",
        "yahooStationId": "25805",
        "inGroupId": "1790",
        "outGroupId": "1791"
    },
    {
        "id": "jr_yumesaki-03",
        "name": "ユニバーサルシティ",
        "yahooStationId": "29343",
        "inGroupId": "1790",
        "outGroupId": "1791"
    },
    {
        "id": "jr_yumesaki-04",
        "name": "桜島",
        "yahooStationId": "25949",
        "inGroupId": "1790",
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
