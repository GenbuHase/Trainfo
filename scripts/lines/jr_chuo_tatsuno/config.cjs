module.exports = {
  lineId: 'jr_chuo_tatsuno',
  name: 'JR中央本線（岡谷～辰野～塩尻）',
  stationsFilePath: 'src/data/lines/jr_chuo_tatsuno/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_chuo_tatsuno/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_chuo_tatsuno/globalTimetable.json',
  },
  stations: [
  {
    "id": "CT-01",
    "name": "岡谷",
    "yahooStationId": "24143",
    "inGroupId": null,
    "outGroupId": "1081"
  },
  {
    "id": "CT-02",
    "name": "川岸",
    "yahooStationId": "24164",
    "inGroupId": "1080",
    "outGroupId": "1081"
  },
  {
    "id": "CT-03",
    "name": "辰野",
    "yahooStationId": "24254",
    "inGroupId": "1080",
    "outGroupId": "1081"
  },
  {
    "id": "CT-04",
    "name": "信濃川島",
    "yahooStationId": "24213",
    "inGroupId": "1080",
    "outGroupId": "1081"
  },
  {
    "id": "CT-05",
    "name": "小野",
    "yahooStationId": "24145",
    "inGroupId": "1080",
    "outGroupId": "1081"
  },
  {
    "id": "CT-06",
    "name": "塩尻",
    "yahooStationId": "24203",
    "inGroupId": "1080",
    "outGroupId": null
  }
],
  stationNameAliases: {},
  trainTypeMap: {
  "普通": "regular",
  "各駅停車": "regular",
  "快速": "rapid"
},
  preserveAllStopsTypes: ["rapid"],
  defaultCars: 2,
  baseSectionSeconds: {
  "1": 270,
  "2": 450,
  "3": 330,
  "4": 300,
  "5": 720
},
};
