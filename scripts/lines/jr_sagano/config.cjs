// scripts/lines/jr_sagano/config.cjs
module.exports = {
  lineId: 'jr_sagano',
  name: 'JR嵯峨野線',
  stationsFilePath: 'src/data/lines/jr_sagano/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_sagano/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_sagano/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_sagano-01",
        "name": "京都",
        "yahooStationId": "25647",
        "inGroupId": null,
        "outGroupId": "1831"
    },
    {
        "id": "jr_sagano-02",
        "name": "梅小路京都西",
        "yahooStationId": "29804",
        "inGroupId": "1831",
        "outGroupId": "1830"
    },
    {
        "id": "jr_sagano-03",
        "name": "丹波口",
        "yahooStationId": "25710",
        "inGroupId": "1831",
        "outGroupId": "1830"
    },
    {
        "id": "jr_sagano-04",
        "name": "二条",
        "yahooStationId": "25740",
        "inGroupId": "1831",
        "outGroupId": "1830"
    },
    {
        "id": "jr_sagano-05",
        "name": "円町",
        "yahooStationId": "29323",
        "inGroupId": "1831",
        "outGroupId": "1830"
    },
    {
        "id": "jr_sagano-06",
        "name": "花園",
        "yahooStationId": "25745",
        "inGroupId": "1831",
        "outGroupId": "1830"
    },
    {
        "id": "jr_sagano-07",
        "name": "太秦",
        "yahooStationId": "25603",
        "inGroupId": "1831",
        "outGroupId": "1830"
    },
    {
        "id": "jr_sagano-08",
        "name": "嵯峨嵐山",
        "yahooStationId": "25674",
        "inGroupId": "1831",
        "outGroupId": "1830"
    },
    {
        "id": "jr_sagano-09",
        "name": "保津峡",
        "yahooStationId": "25760",
        "inGroupId": "1831",
        "outGroupId": "1830"
    },
    {
        "id": "jr_sagano-10",
        "name": "馬堀",
        "yahooStationId": "25605",
        "inGroupId": "1831",
        "outGroupId": "1830"
    },
    {
        "id": "jr_sagano-11",
        "name": "亀岡",
        "yahooStationId": "25631",
        "inGroupId": "1831",
        "outGroupId": "1830"
    },
    {
        "id": "jr_sagano-12",
        "name": "並河",
        "yahooStationId": "25732",
        "inGroupId": "1831",
        "outGroupId": "1830"
    },
    {
        "id": "jr_sagano-13",
        "name": "千代川",
        "yahooStationId": "25714",
        "inGroupId": "1831",
        "outGroupId": "1830"
    },
    {
        "id": "jr_sagano-14",
        "name": "八木",
        "yahooStationId": "25782",
        "inGroupId": "1831",
        "outGroupId": "1830"
    },
    {
        "id": "jr_sagano-15",
        "name": "吉富",
        "yahooStationId": "25792",
        "inGroupId": "1831",
        "outGroupId": "1830"
    },
    {
        "id": "jr_sagano-16",
        "name": "園部",
        "yahooStationId": "25697",
        "inGroupId": "1830",
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
