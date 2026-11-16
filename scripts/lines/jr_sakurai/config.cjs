// scripts/lines/jr_sakurai/config.cjs
module.exports = {
  lineId: 'jr_sakurai',
  name: 'JR万葉まほろば線',
  stationsFilePath: 'src/data/lines/jr_sakurai/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_sakurai/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_sakurai/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_sakurai-01",
        "name": "奈良",
        "yahooStationId": "26669",
        "inGroupId": null,
        "outGroupId": "1661"
    },
    {
        "id": "jr_sakurai-02",
        "name": "京終",
        "yahooStationId": "26622",
        "inGroupId": "1661",
        "outGroupId": "1660"
    },
    {
        "id": "jr_sakurai-03",
        "name": "帯解",
        "yahooStationId": "26614",
        "inGroupId": "1661",
        "outGroupId": "1660"
    },
    {
        "id": "jr_sakurai-04",
        "name": "櫟本",
        "yahooStationId": "26601",
        "inGroupId": "1661",
        "outGroupId": "1660"
    },
    {
        "id": "jr_sakurai-05",
        "name": "天理",
        "yahooStationId": "26664",
        "inGroupId": "1661",
        "outGroupId": "1660"
    },
    {
        "id": "jr_sakurai-06",
        "name": "長柄",
        "yahooStationId": "26667",
        "inGroupId": "1661",
        "outGroupId": "1660"
    },
    {
        "id": "jr_sakurai-07",
        "name": "柳本",
        "yahooStationId": "26703",
        "inGroupId": "1661",
        "outGroupId": "1660"
    },
    {
        "id": "jr_sakurai-08",
        "name": "巻向",
        "yahooStationId": "26693",
        "inGroupId": "1661",
        "outGroupId": "1660"
    },
    {
        "id": "jr_sakurai-09",
        "name": "三輪",
        "yahooStationId": "26698",
        "inGroupId": "1661",
        "outGroupId": "1660"
    },
    {
        "id": "jr_sakurai-10",
        "name": "桜井",
        "yahooStationId": "26638",
        "inGroupId": "1661",
        "outGroupId": "1660"
    },
    {
        "id": "jr_sakurai-11",
        "name": "香久山",
        "yahooStationId": "26615",
        "inGroupId": "1661",
        "outGroupId": "1660"
    },
    {
        "id": "jr_sakurai-12",
        "name": "畝傍",
        "yahooStationId": "26606",
        "inGroupId": "1661",
        "outGroupId": "1660"
    },
    {
        "id": "jr_sakurai-13",
        "name": "金橋",
        "yahooStationId": "26620",
        "inGroupId": "1661",
        "outGroupId": "1660"
    },
    {
        "id": "jr_sakurai-14",
        "name": "高田",
        "yahooStationId": "26653",
        "inGroupId": "1660",
        "outGroupId": null
    }
],
  stationNameAliases: {},
  trainTypeMap: {
    "普通": "local",
    "各駅停車": "local",
    "快速": "rapid",
    "区間快速": "semi_rapid",
    "新快速": "special_rapid",
    "みやこ路快速": "miyako_rapid",
    "丹波路快速": "tambaji_rapid",
    "特急": "limitedExp"
},
  interpolatePassingStations: true,
};
