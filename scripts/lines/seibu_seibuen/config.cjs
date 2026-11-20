module.exports = {
  lineId: 'seibu_seibuen',
  name: '西武西武園線',
  stationsFilePath: 'src/data/lines/seibu_seibuen/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/seibu_seibuen/stationTimetables.json',
    globalTimetable: 'src/data/lines/seibu_seibuen/globalTimetable.json',
  },
  stations: [
  {
    "id": "SKW-01",
    "name": "東村山",
    "yahooStationId": "22944",
    "inGroupId": null,
    "outGroupId": "2891"
  },
  {
    "id": "SKW-02",
    "name": "西武園",
    "yahooStationId": "22767",
    "inGroupId": "2890",
    "outGroupId": null
  }
],
  stationNameAliases: {
    '新鎌ケ谷': '新鎌ヶ谷',
    '空港第２ビル': '空港第2ビル',
    '幡ケ谷': '幡ヶ谷',
    '長者ケ浜潮騒はまなす公園前': '長者ヶ浜潮騒はまなす公園前',
  },
  trainTypeMap: {
  "特急": "limited_exp",
  "小江戸": "limited_exp",
  "拝島ライナー": "liner",
  "快速急行": "rapid_exp",
  "通勤急行": "commuter_exp",
  "急行": "express",
  "準急": "semi_exp",
  "各駅停車": "local",
  "普通": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 4,
  baseSectionSeconds: {
  "1": 180
},
};
