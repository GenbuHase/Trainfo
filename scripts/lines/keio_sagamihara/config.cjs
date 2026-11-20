module.exports = {
  lineId: 'keio_sagamihara',
  name: '京王相模原線',
  stationsFilePath: 'src/data/lines/keio_sagamihara/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/keio_sagamihara/stationTimetables.json',
    globalTimetable: 'src/data/lines/keio_sagamihara/globalTimetable.json',
  },
  stations: [
  {
    "id": "KOS-01",
    "name": "調布",
    "yahooStationId": "22816",
    "inGroupId": null,
    "outGroupId": "3041"
  },
  {
    "id": "KOS-02",
    "name": "京王多摩川",
    "yahooStationId": "22654",
    "inGroupId": "3040",
    "outGroupId": "3041"
  },
  {
    "id": "KOS-03",
    "name": "京王よみうりランド",
    "yahooStationId": "22659",
    "inGroupId": "3040",
    "outGroupId": "3041"
  },
  {
    "id": "KOS-04",
    "name": "稲城",
    "yahooStationId": "22522",
    "inGroupId": "3040",
    "outGroupId": "3041"
  },
  {
    "id": "KOS-05",
    "name": "京王永山",
    "yahooStationId": "22656",
    "inGroupId": "3040",
    "outGroupId": "3041"
  },
  {
    "id": "KOS-06",
    "name": "京王多摩センター",
    "yahooStationId": "22655",
    "inGroupId": "3040",
    "outGroupId": "3041"
  },
  {
    "id": "KOS-07",
    "name": "京王堀之内",
    "yahooStationId": "22658",
    "inGroupId": "3040",
    "outGroupId": "3041"
  },
  {
    "id": "KOS-08",
    "name": "南大沢",
    "yahooStationId": "22992",
    "inGroupId": "3040",
    "outGroupId": "3041"
  },
  {
    "id": "KOS-09",
    "name": "多摩境",
    "yahooStationId": "22806",
    "inGroupId": "3040",
    "outGroupId": "3041"
  },
  {
    "id": "KOS-10",
    "name": "京王稲田堤",
    "yahooStationId": "22652",
    "inGroupId": "3040",
    "outGroupId": "3041"
  },
  {
    "id": "KOS-11",
    "name": "若葉台",
    "yahooStationId": "23372",
    "inGroupId": "3040",
    "outGroupId": "3041"
  },
  {
    "id": "KOS-12",
    "name": "橋本",
    "yahooStationId": "23281",
    "inGroupId": "3040",
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
  "1": 120,
  "2": 210,
  "3": 120,
  "4": 480,
  "5": 180,
  "6": 180,
  "7": 180,
  "8": 150,
  "9": 1410,
  "10": 510,
  "11": 1080
},
};
