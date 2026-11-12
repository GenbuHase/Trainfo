// scripts/lines/jr_osaka_loop/config.cjs
module.exports = {
  lineId: 'jr_osaka_loop',
  name: 'JR大阪環状線',
  stationsFilePath: 'src/data/lines/jr_osaka_loop/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_osaka_loop/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_osaka_loop/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_osaka_loop-01",
        "name": "天王寺",
        "yahooStationId": "26062",
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "jr_osaka_loop-02",
        "name": "寺田町",
        "yahooStationId": "26057",
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "jr_osaka_loop-03",
        "name": "桃谷",
        "yahooStationId": "26218",
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "jr_osaka_loop-04",
        "name": "鶴橋",
        "yahooStationId": "26051",
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "jr_osaka_loop-05",
        "name": "玉造",
        "yahooStationId": "26035",
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "jr_osaka_loop-06",
        "name": "森ノ宮",
        "yahooStationId": "26224",
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "jr_osaka_loop-07",
        "name": "大阪城公園",
        "yahooStationId": "25858",
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "jr_osaka_loop-08",
        "name": "京橋",
        "yahooStationId": "25901",
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "jr_osaka_loop-09",
        "name": "桜ノ宮",
        "yahooStationId": "25950",
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "jr_osaka_loop-10",
        "name": "天満",
        "yahooStationId": "26064",
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "jr_osaka_loop-11",
        "name": "大阪",
        "yahooStationId": "25853",
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "jr_osaka_loop-12",
        "name": "福島",
        "yahooStationId": "26165",
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "jr_osaka_loop-13",
        "name": "野田",
        "yahooStationId": "26116",
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "jr_osaka_loop-14",
        "name": "西九条",
        "yahooStationId": "26104",
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "jr_osaka_loop-15",
        "name": "弁天町",
        "yahooStationId": "26176",
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "jr_osaka_loop-16",
        "name": "大正",
        "yahooStationId": "26011",
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "jr_osaka_loop-17",
        "name": "芦原橋",
        "yahooStationId": "25804",
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "jr_osaka_loop-18",
        "name": "今宮",
        "yahooStationId": "25977",
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "jr_osaka_loop-19",
        "name": "新今宮",
        "yahooStationId": "25977",
        "inGroupId": null,
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
