// scripts/lines/jr_takarazuka/config.cjs
module.exports = {
  lineId: 'jr_takarazuka',
  name: 'JR宝塚線',
  stationsFilePath: 'src/data/lines/jr_takarazuka/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_takarazuka/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_takarazuka/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_takarazuka-01",
        "name": "尼崎",
        "yahooStationId": "26259",
        "inGroupId": null,
        "outGroupId": "1821"
    },
    {
        "id": "jr_takarazuka-02",
        "name": "塚口",
        "yahooStationId": "26449",
        "inGroupId": null,
        "outGroupId": "1820"
    },
    {
        "id": "jr_takarazuka-03",
        "name": "猪名寺",
        "yahooStationId": "26281",
        "inGroupId": null,
        "outGroupId": "1820"
    },
    {
        "id": "jr_takarazuka-04",
        "name": "伊丹",
        "yahooStationId": "26274",
        "inGroupId": null,
        "outGroupId": "1820"
    },
    {
        "id": "jr_takarazuka-05",
        "name": "北伊丹",
        "yahooStationId": "26331",
        "inGroupId": null,
        "outGroupId": "1820"
    },
    {
        "id": "jr_takarazuka-06",
        "name": "川西池田",
        "yahooStationId": "26325",
        "inGroupId": null,
        "outGroupId": "1820"
    },
    {
        "id": "jr_takarazuka-07",
        "name": "中山寺",
        "yahooStationId": "26467",
        "inGroupId": null,
        "outGroupId": "1820"
    },
    {
        "id": "jr_takarazuka-08",
        "name": "宝塚",
        "yahooStationId": "26427",
        "inGroupId": null,
        "outGroupId": "4180"
    },
    {
        "id": "jr_takarazuka-09",
        "name": "生瀬",
        "yahooStationId": "26471",
        "inGroupId": null,
        "outGroupId": "1820"
    },
    {
        "id": "jr_takarazuka-10",
        "name": "西宮名塩",
        "yahooStationId": "26489",
        "inGroupId": null,
        "outGroupId": "1820"
    },
    {
        "id": "jr_takarazuka-11",
        "name": "武田尾",
        "yahooStationId": "26434",
        "inGroupId": null,
        "outGroupId": "1820"
    },
    {
        "id": "jr_takarazuka-12",
        "name": "道場",
        "yahooStationId": "26461",
        "inGroupId": null,
        "outGroupId": "1820"
    },
    {
        "id": "jr_takarazuka-13",
        "name": "三田",
        "yahooStationId": "26373",
        "inGroupId": null,
        "outGroupId": "1820"
    },
    {
        "id": "jr_takarazuka-14",
        "name": "新三田",
        "yahooStationId": "26401",
        "inGroupId": null,
        "outGroupId": "1820"
    },
    {
        "id": "jr_takarazuka-15",
        "name": "広野",
        "yahooStationId": "26529",
        "inGroupId": null,
        "outGroupId": "1820"
    },
    {
        "id": "jr_takarazuka-16",
        "name": "相野",
        "yahooStationId": "26244",
        "inGroupId": null,
        "outGroupId": "1820"
    },
    {
        "id": "jr_takarazuka-17",
        "name": "藍本",
        "yahooStationId": "26245",
        "inGroupId": null,
        "outGroupId": "1820"
    },
    {
        "id": "jr_takarazuka-18",
        "name": "草野",
        "yahooStationId": "26341",
        "inGroupId": null,
        "outGroupId": "1820"
    },
    {
        "id": "jr_takarazuka-19",
        "name": "古市",
        "yahooStationId": "26538",
        "inGroupId": null,
        "outGroupId": "1820"
    },
    {
        "id": "jr_takarazuka-20",
        "name": "南矢代",
        "yahooStationId": "26567",
        "inGroupId": null,
        "outGroupId": "1820"
    },
    {
        "id": "jr_takarazuka-21",
        "name": "篠山口",
        "yahooStationId": "26370",
        "inGroupId": "1820",
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
