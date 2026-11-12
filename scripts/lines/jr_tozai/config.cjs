// scripts/lines/jr_tozai/config.cjs
module.exports = {
  lineId: 'jr_tozai',
  name: 'JR東西線',
  stationsFilePath: 'src/data/lines/jr_tozai/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_tozai/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_tozai/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_tozai-01",
        "name": "京橋",
        "yahooStationId": "25901",
        "inGroupId": null,
        "outGroupId": "1761"
    },
    {
        "id": "jr_tozai-02",
        "name": "大阪城北詰",
        "yahooStationId": "29158",
        "inGroupId": null,
        "outGroupId": "1760"
    },
    {
        "id": "jr_tozai-03",
        "name": "大阪天満宮",
        "yahooStationId": "29159",
        "inGroupId": null,
        "outGroupId": "1760"
    },
    {
        "id": "jr_tozai-04",
        "name": "北新地",
        "yahooStationId": "29160",
        "inGroupId": null,
        "outGroupId": "1760"
    },
    {
        "id": "jr_tozai-05",
        "name": "新福島",
        "yahooStationId": "29161",
        "inGroupId": null,
        "outGroupId": "1760"
    },
    {
        "id": "jr_tozai-06",
        "name": "海老江",
        "yahooStationId": "29162",
        "inGroupId": null,
        "outGroupId": "1760"
    },
    {
        "id": "jr_tozai-07",
        "name": "御幣島",
        "yahooStationId": "29163",
        "inGroupId": null,
        "outGroupId": "1760"
    },
    {
        "id": "jr_tozai-08",
        "name": "加島",
        "yahooStationId": "29164",
        "inGroupId": null,
        "outGroupId": "1760"
    },
    {
        "id": "jr_tozai-09",
        "name": "尼崎",
        "yahooStationId": "26259",
        "inGroupId": "1800",
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
