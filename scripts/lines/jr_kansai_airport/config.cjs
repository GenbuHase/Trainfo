// scripts/lines/jr_kansai_airport/config.cjs
module.exports = {
  lineId: 'jr_kansai_airport',
  name: 'JR関西空港線',
  stationsFilePath: 'src/data/lines/jr_kansai_airport/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_kansai_airport/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_kansai_airport/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_kansai_airport-01",
        "name": "日根野",
        "yahooStationId": "26151",
        "inGroupId": null,
        "outGroupId": "1720"
    },
    {
        "id": "jr_kansai_airport-02",
        "name": "りんくうタウン",
        "yahooStationId": "26240",
        "inGroupId": null,
        "outGroupId": "4001"
    },
    {
        "id": "jr_kansai_airport-03",
        "name": "関西空港",
        "yahooStationId": "25891",
        "inGroupId": "1710",
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
