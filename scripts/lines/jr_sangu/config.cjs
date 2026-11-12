// scripts/lines/jr_sangu/config.cjs
module.exports = {
  lineId: 'jr_sangu',
  name: 'JR参宮線',
  stationsFilePath: 'src/data/lines/jr_sangu/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_sangu/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_sangu/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_sangu-01",
        "name": "多気",
        "yahooStationId": "25384",
        "inGroupId": null,
        "outGroupId": "1421"
    },
    {
        "id": "jr_sangu-02",
        "name": "外城田",
        "yahooStationId": "25396",
        "inGroupId": "1420",
        "outGroupId": "1421"
    },
    {
        "id": "jr_sangu-03",
        "name": "田丸",
        "yahooStationId": "25388",
        "inGroupId": null,
        "outGroupId": "1420"
    },
    {
        "id": "jr_sangu-04",
        "name": "宮川",
        "yahooStationId": "25459",
        "inGroupId": "1420",
        "outGroupId": "1421"
    },
    {
        "id": "jr_sangu-05",
        "name": "山田上口",
        "yahooStationId": "25465",
        "inGroupId": "1420",
        "outGroupId": "1421"
    },
    {
        "id": "jr_sangu-06",
        "name": "伊勢市",
        "yahooStationId": "25278",
        "inGroupId": null,
        "outGroupId": "3750"
    },
    {
        "id": "jr_sangu-07",
        "name": "五十鈴ケ丘",
        "yahooStationId": "25266",
        "inGroupId": null,
        "outGroupId": "1420"
    },
    {
        "id": "jr_sangu-08",
        "name": "二見浦",
        "yahooStationId": "25437",
        "inGroupId": null,
        "outGroupId": "1420"
    },
    {
        "id": "jr_sangu-09",
        "name": "松下",
        "yahooStationId": "25446",
        "inGroupId": null,
        "outGroupId": "1420"
    },
    {
        "id": "jr_sangu-10",
        "name": "鳥羽",
        "yahooStationId": "25400",
        "inGroupId": "3760",
        "outGroupId": null
    }
],
  stationNameAliases: {},
  trainTypeMap: {
    '普通': 'local',
    '各駅停車': 'local',
    '快速': 'rapid',
    '区間快速': 'semi_rapid',
    '快速みえ': 'rapid_mie',
    '特急': 'limitedExp',
  },
  defaultCars: 2,
};
