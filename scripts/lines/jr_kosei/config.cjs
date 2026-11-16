// scripts/lines/jr_kosei/config.cjs
module.exports = {
  lineId: 'jr_kosei',
  name: 'JR湖西線',
  stationsFilePath: 'src/data/lines/jr_kosei/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_kosei/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_kosei/globalTimetable.json',
  },
  stations: [
    {
        "id": "jr_kosei-01",
        "name": "山科",
        "yahooStationId": "25786",
        "inGroupId": null,
        "outGroupId": "1601"
    },
    {
        "id": "jr_kosei-02",
        "name": "大津京",
        "yahooStationId": "25553",
        "inGroupId": "1601",
        "outGroupId": "1600"
    },
    {
        "id": "jr_kosei-03",
        "name": "唐崎",
        "yahooStationId": "25504",
        "inGroupId": "1601",
        "outGroupId": "1600"
    },
    {
        "id": "jr_kosei-04",
        "name": "比叡山坂本",
        "yahooStationId": "25557",
        "inGroupId": "1601",
        "outGroupId": "1600"
    },
    {
        "id": "jr_kosei-05",
        "name": "おごと温泉",
        "yahooStationId": "25499",
        "inGroupId": "1601",
        "outGroupId": "1600"
    },
    {
        "id": "jr_kosei-06",
        "name": "堅田",
        "yahooStationId": "25502",
        "inGroupId": "1601",
        "outGroupId": "1600"
    },
    {
        "id": "jr_kosei-07",
        "name": "小野",
        "yahooStationId": "25500",
        "inGroupId": "1601",
        "outGroupId": "1600"
    },
    {
        "id": "jr_kosei-08",
        "name": "和邇",
        "yahooStationId": "25583",
        "inGroupId": "1601",
        "outGroupId": "1600"
    },
    {
        "id": "jr_kosei-09",
        "name": "蓬莱",
        "yahooStationId": "25564",
        "inGroupId": "1601",
        "outGroupId": "1600"
    },
    {
        "id": "jr_kosei-10",
        "name": "志賀",
        "yahooStationId": "25526",
        "inGroupId": "1601",
        "outGroupId": "1600"
    },
    {
        "id": "jr_kosei-11",
        "name": "比良",
        "yahooStationId": "25561",
        "inGroupId": "1601",
        "outGroupId": "1600"
    },
    {
        "id": "jr_kosei-12",
        "name": "近江舞子",
        "yahooStationId": "25496",
        "inGroupId": "1601",
        "outGroupId": "1600"
    },
    {
        "id": "jr_kosei-13",
        "name": "北小松",
        "yahooStationId": "25510",
        "inGroupId": "1601",
        "outGroupId": "1600"
    },
    {
        "id": "jr_kosei-14",
        "name": "近江高島",
        "yahooStationId": "25492",
        "inGroupId": "1601",
        "outGroupId": "1600"
    },
    {
        "id": "jr_kosei-15",
        "name": "安曇川",
        "yahooStationId": "25475",
        "inGroupId": "1601",
        "outGroupId": "1600"
    },
    {
        "id": "jr_kosei-16",
        "name": "新旭",
        "yahooStationId": "25532",
        "inGroupId": "1601",
        "outGroupId": "1600"
    },
    {
        "id": "jr_kosei-17",
        "name": "近江今津",
        "yahooStationId": "25489",
        "inGroupId": "1601",
        "outGroupId": "1600"
    },
    {
        "id": "jr_kosei-18",
        "name": "近江中庄",
        "yahooStationId": "25493",
        "inGroupId": "1601",
        "outGroupId": "1600"
    },
    {
        "id": "jr_kosei-19",
        "name": "マキノ",
        "yahooStationId": "25566",
        "inGroupId": "1601",
        "outGroupId": "1600"
    },
    {
        "id": "jr_kosei-20",
        "name": "永原",
        "yahooStationId": "25552",
        "inGroupId": "1601",
        "outGroupId": "1600"
    },
    {
        "id": "jr_kosei-21",
        "name": "近江塩津",
        "yahooStationId": "25490",
        "inGroupId": "1600",
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
