module.exports = {
  lineId: 'keisei_oshiage',
  name: '京成押上線',
  stationsFilePath: 'src/data/lines/keisei_oshiage/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/keisei_oshiage/stationTimetables.json',
    globalTimetable: 'src/data/lines/keisei_oshiage/globalTimetable.json',
  },
  stations: [
  {
    "id": "KSO-01",
    "name": "押上",
    "yahooStationId": "22578",
    "inGroupId": null,
    "outGroupId": "2971"
  },
  {
    "id": "KSO-02",
    "name": "京成曳舟",
    "yahooStationId": "22667",
    "inGroupId": "2970",
    "outGroupId": "2971"
  },
  {
    "id": "KSO-03",
    "name": "八広",
    "yahooStationId": "23030",
    "inGroupId": "2970",
    "outGroupId": "2971"
  },
  {
    "id": "KSO-04",
    "name": "四ツ木",
    "yahooStationId": "23040",
    "inGroupId": "2970",
    "outGroupId": "2971"
  },
  {
    "id": "KSO-05",
    "name": "京成立石",
    "yahooStationId": "22666",
    "inGroupId": "2970",
    "outGroupId": "2971"
  },
  {
    "id": "KSO-06",
    "name": "青砥",
    "yahooStationId": "22482",
    "inGroupId": "2970",
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
  "スカイライナー": "limited_exp",
  "モーニングライナー": "limited_exp",
  "イブニングライナー": "limited_exp",
  "イブニング": "limited_exp",
  "モーニング": "limited_exp",
  "ライナー": "limited_exp",
  "アクセス特急": "access_exp",
  "エアポート快特": "rapid_exp",
  "快速特急": "rapid_exp",
  "快特": "rapid_exp",
  "通勤特急": "commuter_limited_exp",
  "特急": "express",
  "快速": "rapid",
  "急行": "rapid",
  "普通": "local",
  "各駅停車": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 8,
  baseSectionSeconds: {
  "1": 90,
  "2": 90,
  "3": 60,
  "4": 120,
  "5": 90
},
};
