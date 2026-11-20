module.exports = {
  lineId: 'keio_keibajo',
  name: '京王競馬場線',
  stationsFilePath: 'src/data/lines/keio_keibajo/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/keio_keibajo/stationTimetables.json',
    globalTimetable: 'src/data/lines/keio_keibajo/globalTimetable.json',
  },
  stations: [
  {
    "id": "KOK-01",
    "name": "東府中",
    "yahooStationId": "22941",
    "inGroupId": null,
    "outGroupId": "3051"
  },
  {
    "id": "KOK-02",
    "name": "府中競馬正門前",
    "yahooStationId": "22962",
    "inGroupId": "3050",
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
  
  defaultCars: 8,
  baseSectionSeconds: {
  "1": 90
},
};
