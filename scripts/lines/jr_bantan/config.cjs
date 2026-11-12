// scripts/lines/jr_bantan/config.cjs
module.exports = {
  lineId: 'jr_bantan',
  name: 'JR播但線',
  stationsFilePath: 'src/data/lines/jr_bantan/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_bantan/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_bantan/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_bantan-01",
        "name": "姫路",
        "yahooStationId": "26524",
        "inGroupId": null,
        "outGroupId": "1931"
    },
    {
        "id": "jr_bantan-02",
        "name": "京口",
        "yahooStationId": "26329",
        "inGroupId": "1931",
        "outGroupId": "1930"
    },
    {
        "id": "jr_bantan-03",
        "name": "野里",
        "yahooStationId": "26498",
        "inGroupId": "1931",
        "outGroupId": "1930"
    },
    {
        "id": "jr_bantan-04",
        "name": "砥堀",
        "yahooStationId": "26459",
        "inGroupId": "1931",
        "outGroupId": "1930"
    },
    {
        "id": "jr_bantan-05",
        "name": "仁豊野",
        "yahooStationId": "26495",
        "inGroupId": "1931",
        "outGroupId": "1930"
    },
    {
        "id": "jr_bantan-06",
        "name": "香呂",
        "yahooStationId": "26359",
        "inGroupId": "1931",
        "outGroupId": "1930"
    },
    {
        "id": "jr_bantan-07",
        "name": "溝口",
        "yahooStationId": "26561",
        "inGroupId": "1931",
        "outGroupId": "1930"
    },
    {
        "id": "jr_bantan-08",
        "name": "福崎",
        "yahooStationId": "26534",
        "inGroupId": "1931",
        "outGroupId": "1930"
    },
    {
        "id": "jr_bantan-09",
        "name": "甘地",
        "yahooStationId": "26262",
        "inGroupId": "1931",
        "outGroupId": "1930"
    },
    {
        "id": "jr_bantan-10",
        "name": "鶴居",
        "yahooStationId": "26454",
        "inGroupId": "1931",
        "outGroupId": "1930"
    },
    {
        "id": "jr_bantan-11",
        "name": "新野",
        "yahooStationId": "26475",
        "inGroupId": "1931",
        "outGroupId": "1930"
    },
    {
        "id": "jr_bantan-12",
        "name": "寺前",
        "yahooStationId": "26456",
        "inGroupId": "1931",
        "outGroupId": "1930"
    },
    {
        "id": "jr_bantan-13",
        "name": "長谷",
        "yahooStationId": "26499",
        "inGroupId": "1931",
        "outGroupId": "1930"
    },
    {
        "id": "jr_bantan-14",
        "name": "生野",
        "yahooStationId": "26268",
        "inGroupId": "1931",
        "outGroupId": "1930"
    },
    {
        "id": "jr_bantan-15",
        "name": "新井",
        "yahooStationId": "26474",
        "inGroupId": "1931",
        "outGroupId": "1930"
    },
    {
        "id": "jr_bantan-16",
        "name": "青倉",
        "yahooStationId": "26249",
        "inGroupId": "1931",
        "outGroupId": "1930"
    },
    {
        "id": "jr_bantan-17",
        "name": "竹田",
        "yahooStationId": "26433",
        "inGroupId": "1931",
        "outGroupId": "1930"
    },
    {
        "id": "jr_bantan-18",
        "name": "和田山",
        "yahooStationId": "26593",
        "inGroupId": "1930",
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
