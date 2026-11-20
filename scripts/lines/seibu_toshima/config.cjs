module.exports = {
  lineId: 'seibu_toshima',
  name: '西武豊島線',
  stationsFilePath: 'src/data/lines/seibu_toshima/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/seibu_toshima/stationTimetables.json',
    globalTimetable: 'src/data/lines/seibu_toshima/globalTimetable.json',
  },
  stations: [
  {
    "id": "SIT-01",
    "name": "練馬",
    "yahooStationId": "22889",
    "inGroupId": null,
    "outGroupId": "2861"
  },
  {
    "id": "SIT-02",
    "name": "豊島園",
    "yahooStationId": "22835",
    "inGroupId": "2860",
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
  "1": 60
},
};
