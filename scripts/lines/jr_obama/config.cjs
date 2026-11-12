// scripts/lines/jr_obama/config.cjs
module.exports = {
  lineId: 'jr_obama',
  name: 'JR小浜線',
  stationsFilePath: 'src/data/lines/jr_obama/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_obama/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_obama/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_obama-01",
        "name": "敦賀",
        "yahooStationId": "23831",
        "inGroupId": null,
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-02",
        "name": "西敦賀",
        "yahooStationId": "23840",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-03",
        "name": "粟野",
        "yahooStationId": "23763",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-04",
        "name": "東美浜",
        "yahooStationId": "23853",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-05",
        "name": "美浜",
        "yahooStationId": "23876",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-06",
        "name": "気山",
        "yahooStationId": "23806",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-07",
        "name": "三方",
        "yahooStationId": "23868",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-08",
        "name": "藤井",
        "yahooStationId": "23859",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-09",
        "name": "十村",
        "yahooStationId": "23833",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-10",
        "name": "大鳥羽",
        "yahooStationId": "23792",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-11",
        "name": "若狭有田",
        "yahooStationId": "23881",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-12",
        "name": "上中",
        "yahooStationId": "23800",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-13",
        "name": "新平野",
        "yahooStationId": "23822",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-14",
        "name": "東小浜",
        "yahooStationId": "23850",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-15",
        "name": "小浜",
        "yahooStationId": "23794",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-16",
        "name": "勢浜",
        "yahooStationId": "23826",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-17",
        "name": "加斗",
        "yahooStationId": "23797",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-18",
        "name": "若狭本郷",
        "yahooStationId": "23883",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-19",
        "name": "若狭和田",
        "yahooStationId": "23884",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-20",
        "name": "若狭高浜",
        "yahooStationId": "23882",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-21",
        "name": "三松",
        "yahooStationId": "23874",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-22",
        "name": "青郷",
        "yahooStationId": "23760",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-23",
        "name": "松尾寺",
        "yahooStationId": "25765",
        "inGroupId": "1581",
        "outGroupId": "1580"
    },
    {
        "id": "jr_obama-24",
        "name": "東舞鶴",
        "yahooStationId": "25746",
        "inGroupId": "1581",
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
    "特急": "limitedExp"
},
  interpolatePassingStations: true,
};
