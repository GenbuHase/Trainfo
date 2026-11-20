module.exports = {
  lineId: 'keikyu_kurihama',
  name: '京急久里浜線',
  stationsFilePath: 'src/data/lines/keikyu_kurihama/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/keikyu_kurihama/stationTimetables.json',
    globalTimetable: 'src/data/lines/keikyu_kurihama/globalTimetable.json',
  },
  stations: [
  {
    "id": "KKK-01",
    "name": "堀ノ内",
    "yahooStationId": "23317",
    "inGroupId": null,
    "outGroupId": "3261"
  },
  {
    "id": "KKK-02",
    "name": "新大津",
    "yahooStationId": "23203",
    "inGroupId": "3260",
    "outGroupId": "3261"
  },
  {
    "id": "KKK-03",
    "name": "北久里浜",
    "yahooStationId": "23133",
    "inGroupId": "3260",
    "outGroupId": "3261"
  },
  {
    "id": "KKK-04",
    "name": "京急久里浜",
    "yahooStationId": "23148",
    "inGroupId": "3260",
    "outGroupId": "3261"
  },
  {
    "id": "KKK-05",
    "name": "ＹＲＰ野比",
    "yahooStationId": "23274",
    "inGroupId": "3260",
    "outGroupId": "3261"
  },
  {
    "id": "KKK-06",
    "name": "京急長沢",
    "yahooStationId": "23153",
    "inGroupId": "3260",
    "outGroupId": "3261"
  },
  {
    "id": "KKK-07",
    "name": "津久井浜",
    "yahooStationId": "23237",
    "inGroupId": "3260",
    "outGroupId": "3261"
  },
  {
    "id": "KKK-08",
    "name": "三浦海岸",
    "yahooStationId": "23326",
    "inGroupId": "3260",
    "outGroupId": "3261"
  },
  {
    "id": "KKK-09",
    "name": "三崎口",
    "yahooStationId": "23327",
    "inGroupId": "3260",
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
  "モーニング・ウィング": "liner",
  "イブニング・ウィング": "liner",
  "ウィング": "liner",
  "エアポート快特": "access_exp",
  "アクセス特急": "access_exp",
  "快特": "rapid_exp",
  "快速特急": "rapid_exp",
  "特急": "limited_exp",
  "エアポート急行": "express",
  "急行": "express",
  "快速": "express",
  "普通": "local",
  "各駅停車": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 8,
  baseSectionSeconds: {
  "1": 60,
  "2": 90,
  "3": 210,
  "4": 210,
  "5": 120,
  "6": 90,
  "7": 120,
  "8": 180
},
};
