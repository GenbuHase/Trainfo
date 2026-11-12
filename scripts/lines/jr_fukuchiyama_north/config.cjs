// scripts/lines/jr_fukuchiyama_north/config.cjs
module.exports = {
  lineId: 'jr_fukuchiyama_north',
  name: 'JR福知山線（篠山口～福知山）',
  stationsFilePath: 'src/data/lines/jr_fukuchiyama_north/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_fukuchiyama_north/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_fukuchiyama_north/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_fukuchiyama_north-01",
        "name": "篠山口",
        "yahooStationId": "26370",
        "inGroupId": null,
        "outGroupId": "1820"
    },
    {
        "id": "jr_fukuchiyama_north-02",
        "name": "丹波大山",
        "yahooStationId": "26445",
        "inGroupId": "1810",
        "outGroupId": "1811"
    },
    {
        "id": "jr_fukuchiyama_north-03",
        "name": "下滝",
        "yahooStationId": "26395",
        "inGroupId": "1810",
        "outGroupId": "1811"
    },
    {
        "id": "jr_fukuchiyama_north-04",
        "name": "谷川",
        "yahooStationId": "29928",
        "inGroupId": null,
        "outGroupId": null
    },
    {
        "id": "jr_fukuchiyama_north-05",
        "name": "柏原",
        "yahooStationId": "26313",
        "inGroupId": "1810",
        "outGroupId": "1811"
    },
    {
        "id": "jr_fukuchiyama_north-06",
        "name": "石生",
        "yahooStationId": "26273",
        "inGroupId": "1810",
        "outGroupId": "1811"
    },
    {
        "id": "jr_fukuchiyama_north-07",
        "name": "黒井",
        "yahooStationId": "26346",
        "inGroupId": "1810",
        "outGroupId": "1811"
    },
    {
        "id": "jr_fukuchiyama_north-08",
        "name": "市島",
        "yahooStationId": "26277",
        "inGroupId": "1810",
        "outGroupId": "1811"
    },
    {
        "id": "jr_fukuchiyama_north-09",
        "name": "丹波竹田",
        "yahooStationId": "26446",
        "inGroupId": "1810",
        "outGroupId": "1811"
    },
    {
        "id": "jr_fukuchiyama_north-10",
        "name": "福知山",
        "yahooStationId": "26274",
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
  defaultCars: 4,
};
