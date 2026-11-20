module.exports = {
  lineId: 'seibu_tamako',
  name: '西武多摩湖線',
  stationsFilePath: 'src/data/lines/seibu_tamako/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/seibu_tamako/stationTimetables.json',
    globalTimetable: 'src/data/lines/seibu_tamako/globalTimetable.json',
  },
  stations: [
  {
    "id": "SBT-01",
    "name": "国分寺",
    "yahooStationId": "22676",
    "inGroupId": null,
    "outGroupId": "2911"
  },
  {
    "id": "SBT-02",
    "name": "一橋学園",
    "yahooStationId": "22947",
    "inGroupId": "2910",
    "outGroupId": "2911"
  },
  {
    "id": "SBT-03",
    "name": "青梅街道",
    "yahooStationId": "22553",
    "inGroupId": "2910",
    "outGroupId": "2911"
  },
  {
    "id": "SBT-04",
    "name": "萩山",
    "yahooStationId": "22896",
    "inGroupId": "2910",
    "outGroupId": "2911"
  },
  {
    "id": "SBT-05",
    "name": "八坂",
    "yahooStationId": "23028",
    "inGroupId": "2910",
    "outGroupId": "2911"
  },
  {
    "id": "SBT-06",
    "name": "武蔵大和",
    "yahooStationId": "23015",
    "inGroupId": "2910",
    "outGroupId": "2911"
  },
  {
    "id": "SBT-07",
    "name": "多摩湖",
    "yahooStationId": "22771",
    "inGroupId": "2910",
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
  "1": 210,
  "2": 90,
  "3": 90,
  "4": 90,
  "5": 210,
  "6": 90
},
};
