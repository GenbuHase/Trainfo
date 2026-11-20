module.exports = {
  lineId: 'keio_takao',
  name: '京王高尾線',
  stationsFilePath: 'src/data/lines/keio_takao/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/keio_takao/stationTimetables.json',
    globalTimetable: 'src/data/lines/keio_takao/globalTimetable.json',
  },
  stations: [
  {
    "id": "KOT-01",
    "name": "北野",
    "yahooStationId": "22633",
    "inGroupId": null,
    "outGroupId": "3071"
  },
  {
    "id": "KOT-02",
    "name": "京王片倉",
    "yahooStationId": "22653",
    "inGroupId": "3070",
    "outGroupId": "3071"
  },
  {
    "id": "KOT-03",
    "name": "山田",
    "yahooStationId": "23033",
    "inGroupId": "3070",
    "outGroupId": "3071"
  },
  {
    "id": "KOT-04",
    "name": "めじろ台",
    "yahooStationId": "23020",
    "inGroupId": "3070",
    "outGroupId": "3071"
  },
  {
    "id": "KOT-05",
    "name": "狭間",
    "yahooStationId": "22900",
    "inGroupId": "3070",
    "outGroupId": "3071"
  },
  {
    "id": "KOT-06",
    "name": "高尾",
    "yahooStationId": "22787",
    "inGroupId": "3070",
    "outGroupId": "3071"
  },
  {
    "id": "KOT-07",
    "name": "高尾山口",
    "yahooStationId": "22788",
    "inGroupId": "3070",
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
  "京王ライナー": "liner",
  "Mt.TAKAO": "liner",
  "特急": "limited_exp",
  "準特急": "limited_exp",
  "急行": "express",
  "区間急行": "section_exp",
  "快速": "rapid",
  "各駅停車": "local",
  "普通": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 10,
  baseSectionSeconds: {
  "1": 150,
  "2": 120,
  "3": 90,
  "4": 120,
  "5": 90,
  "6": 150
},
};
