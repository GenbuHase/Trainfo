module.exports = {
  lineId: 'seibu_sayama',
  name: '西武狭山線',
  stationsFilePath: 'src/data/lines/seibu_sayama/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/seibu_sayama/stationTimetables.json',
    globalTimetable: 'src/data/lines/seibu_sayama/globalTimetable.json',
  },
  stations: [
  {
    "id": "SIS-01",
    "name": "西所沢",
    "yahooStationId": "22096",
    "inGroupId": null,
    "outGroupId": "2871"
  },
  {
    "id": "SIS-02",
    "name": "下山口",
    "yahooStationId": "22050",
    "inGroupId": "2870",
    "outGroupId": "2871"
  },
  {
    "id": "SIS-03",
    "name": "西武球場前",
    "yahooStationId": "22065",
    "inGroupId": "2870",
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
  
  defaultCars: 8,
  baseSectionSeconds: {
  "1": 150,
  "2": 180
},
};
