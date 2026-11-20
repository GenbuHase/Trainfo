module.exports = {
  lineId: 'keikyu_zushi',
  name: '京急逗子線',
  stationsFilePath: 'src/data/lines/keikyu_zushi/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/keikyu_zushi/stationTimetables.json',
    globalTimetable: 'src/data/lines/keikyu_zushi/globalTimetable.json',
  },
  stations: [
  {
    "id": "KKZ-01",
    "name": "金沢八景",
    "yahooStationId": "23113",
    "inGroupId": null,
    "outGroupId": "3251"
  },
  {
    "id": "KKZ-02",
    "name": "六浦",
    "yahooStationId": "23351",
    "inGroupId": "3250",
    "outGroupId": "3251"
  },
  {
    "id": "KKZ-03",
    "name": "神武寺",
    "yahooStationId": "23214",
    "inGroupId": "3250",
    "outGroupId": "3251"
  },
  {
    "id": "KKZ-04",
    "name": "逗子・葉山",
    "yahooStationId": "23208",
    "inGroupId": "3250",
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
  
  defaultCars: 6,
  baseSectionSeconds: {
  "1": 120,
  "2": 210,
  "3": 150
},
};
