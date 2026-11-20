module.exports = {
  lineId: 'chiba_monorail_1',
  name: '千葉都市モノレール1号線',
  stationsFilePath: 'src/data/lines/chiba_monorail_1/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/chiba_monorail_1/stationTimetables.json',
    globalTimetable: 'src/data/lines/chiba_monorail_1/globalTimetable.json',
  },
  stations: [
  {
    "id": "CM1-01",
    "name": "千葉みなと",
    "yahooStationId": "22366",
    "inGroupId": null,
    "outGroupId": "4831"
  },
  {
    "id": "CM1-02",
    "name": "市役所前",
    "yahooStationId": "29044",
    "inGroupId": "4830",
    "outGroupId": "4831"
  },
  {
    "id": "CM1-03",
    "name": "千葉",
    "yahooStationId": "22361",
    "inGroupId": "4830",
    "outGroupId": "4831"
  },
  {
    "id": "CM1-04",
    "name": "栄町",
    "yahooStationId": "29262",
    "inGroupId": "4830",
    "outGroupId": "4831"
  },
  {
    "id": "CM1-05",
    "name": "葭川公園",
    "yahooStationId": "29263",
    "inGroupId": "4830",
    "outGroupId": "4831"
  },
  {
    "id": "CM1-06",
    "name": "県庁前",
    "yahooStationId": "29264",
    "inGroupId": "4830",
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
  "各駅停車": "local",
  "普通": "local",
  "各停": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 2,
  baseSectionSeconds: {
  "1": 60,
  "2": 60,
  "3": 60,
  "4": 60,
  "5": 60
},
};
