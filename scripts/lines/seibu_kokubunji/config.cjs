module.exports = {
  lineId: 'seibu_kokubunji',
  name: '西武国分寺線',
  stationsFilePath: 'src/data/lines/seibu_kokubunji/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/seibu_kokubunji/stationTimetables.json',
    globalTimetable: 'src/data/lines/seibu_kokubunji/globalTimetable.json',
  },
  stations: [
  {
    "id": "SK-01",
    "name": "国分寺",
    "yahooStationId": "22676",
    "inGroupId": null,
    "outGroupId": "2921"
  },
  {
    "id": "SK-02",
    "name": "恋ケ窪",
    "yahooStationId": "22669",
    "inGroupId": "2920",
    "outGroupId": "2921"
  },
  {
    "id": "SK-03",
    "name": "鷹の台",
    "yahooStationId": "22792",
    "inGroupId": "2920",
    "outGroupId": "2921"
  },
  {
    "id": "SK-04",
    "name": "小川",
    "yahooStationId": "22571",
    "inGroupId": "2920",
    "outGroupId": "2921"
  },
  {
    "id": "SK-05",
    "name": "東村山",
    "yahooStationId": "22944",
    "inGroupId": "2920",
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
  
  defaultCars: 6,
  baseSectionSeconds: {
  "1": 180,
  "2": 120,
  "3": 120,
  "4": 210
},
};
