// scripts/lines/jr_hokuriku_maibara_tsuruga/config.cjs
module.exports = {
  lineId: 'jr_hokuriku_maibara_tsuruga',
  name: 'JR北陸本線（米原～敦賀）',
  stationsFilePath: 'src/data/lines/jr_hokuriku_maibara_tsuruga/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_hokuriku_maibara_tsuruga/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_hokuriku_maibara_tsuruga/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_hokuriku_maibara_tsuruga-01",
        "name": "米原",
        "yahooStationId": "25565",
        "inGroupId": null,
        "outGroupId": "1521"
    },
    {
        "id": "jr_hokuriku_maibara_tsuruga-02",
        "name": "坂田",
        "yahooStationId": "25522",
        "inGroupId": "1520",
        "outGroupId": "1521"
    },
    {
        "id": "jr_hokuriku_maibara_tsuruga-03",
        "name": "田村",
        "yahooStationId": "25540",
        "inGroupId": "1520",
        "outGroupId": "1521"
    },
    {
        "id": "jr_hokuriku_maibara_tsuruga-04",
        "name": "長浜",
        "yahooStationId": "25551",
        "inGroupId": "1520",
        "outGroupId": "1521"
    },
    {
        "id": "jr_hokuriku_maibara_tsuruga-05",
        "name": "虎姫",
        "yahooStationId": "25547",
        "inGroupId": "1520",
        "outGroupId": "1521"
    },
    {
        "id": "jr_hokuriku_maibara_tsuruga-06",
        "name": "河毛",
        "yahooStationId": "25506",
        "inGroupId": "1520",
        "outGroupId": "1521"
    },
    {
        "id": "jr_hokuriku_maibara_tsuruga-07",
        "name": "高月",
        "yahooStationId": "25537",
        "inGroupId": "1520",
        "outGroupId": "1521"
    },
    {
        "id": "jr_hokuriku_maibara_tsuruga-08",
        "name": "木ノ本",
        "yahooStationId": "25511",
        "inGroupId": "1520",
        "outGroupId": "1521"
    },
    {
        "id": "jr_hokuriku_maibara_tsuruga-09",
        "name": "余呉",
        "yahooStationId": "25581",
        "inGroupId": "1520",
        "outGroupId": "1521"
    },
    {
        "id": "jr_hokuriku_maibara_tsuruga-10",
        "name": "近江塩津",
        "yahooStationId": "25490",
        "inGroupId": "1520",
        "outGroupId": "1521"
    },
    {
        "id": "jr_hokuriku_maibara_tsuruga-11",
        "name": "新疋田",
        "yahooStationId": "23821",
        "inGroupId": "1520",
        "outGroupId": "1521"
    },
    {
        "id": "jr_hokuriku_maibara_tsuruga-12",
        "name": "敦賀",
        "yahooStationId": "23831",
        "inGroupId": "1520",
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
  defaultCars: 4,
};
