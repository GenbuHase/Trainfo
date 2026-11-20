module.exports = {
  lineId: 'tokyu_meguro',
  name: '東急目黒線',
  stationsFilePath: 'src/data/lines/tokyu_meguro/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tokyu_meguro/stationTimetables.json',
    globalTimetable: 'src/data/lines/tokyu_meguro/globalTimetable.json',
  },
  stations: [
  {
    "id": "MG-01",
    "name": "目黒",
    "yahooStationId": "23018",
    "inGroupId": null,
    "outGroupId": "3151"
  },
  {
    "id": "MG-02",
    "name": "不動前",
    "yahooStationId": "22964",
    "inGroupId": "3150",
    "outGroupId": "3151"
  },
  {
    "id": "MG-03",
    "name": "武蔵小山",
    "yahooStationId": "23007",
    "inGroupId": "3150",
    "outGroupId": "3151"
  },
  {
    "id": "MG-04",
    "name": "西小山",
    "yahooStationId": "22873",
    "inGroupId": "3150",
    "outGroupId": "3151"
  },
  {
    "id": "MG-05",
    "name": "洗足",
    "yahooStationId": "22779",
    "inGroupId": "3150",
    "outGroupId": "3151"
  },
  {
    "id": "MG-06",
    "name": "大岡山",
    "yahooStationId": "22557",
    "inGroupId": "3150",
    "outGroupId": "3151"
  },
  {
    "id": "MG-07",
    "name": "奥沢",
    "yahooStationId": "22575",
    "inGroupId": "3150",
    "outGroupId": "3151"
  },
  {
    "id": "MG-08",
    "name": "田園調布",
    "yahooStationId": "22826",
    "inGroupId": "3150",
    "outGroupId": "3151"
  },
  {
    "id": "MG-09",
    "name": "多摩川",
    "yahooStationId": "22803",
    "inGroupId": "3150",
    "outGroupId": "3151"
  },
  {
    "id": "MG-10",
    "name": "新丸子",
    "yahooStationId": "23210",
    "inGroupId": "3150",
    "outGroupId": "3151"
  },
  {
    "id": "MG-11",
    "name": "武蔵小杉",
    "yahooStationId": "23345",
    "inGroupId": "3150",
    "outGroupId": "3151"
  },
  {
    "id": "MG-12",
    "name": "元住吉",
    "yahooStationId": "23353",
    "inGroupId": "3150",
    "outGroupId": "3151"
  },
  {
    "id": "MG-13",
    "name": "日吉",
    "yahooStationId": "23297",
    "inGroupId": "3150",
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
  "特急": "express",
  "急行": "express",
  "通勤特急": "express",
  "準急": "semi_exp",
  "各駅停車": "local",
  "普通": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 8,
  baseSectionSeconds: {
  "1": 60,
  "2": 60,
  "3": 60,
  "4": 60,
  "5": 90,
  "6": 90,
  "7": 90,
  "8": 60,
  "9": 90,
  "10": 60,
  "11": 120,
  "12": 120
},
};
