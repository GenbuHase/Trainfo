module.exports = {
  lineId: 'hitachinaka',
  name: 'ひたちなか海浜鉄道湊線',
  stationsFilePath: 'src/data/lines/hitachinaka/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/hitachinaka/stationTimetables.json',
    globalTimetable: 'src/data/lines/hitachinaka/globalTimetable.json',
  },
  stations: [
  {
    "id": "HNT-01",
    "name": "勝田",
    "yahooStationId": "21615",
    "inGroupId": null,
    "outGroupId": "4661"
  },
  {
    "id": "HNT-02",
    "name": "工機前",
    "yahooStationId": "29251",
    "inGroupId": "4660",
    "outGroupId": "4661"
  },
  {
    "id": "HNT-03",
    "name": "金上",
    "yahooStationId": "21616",
    "inGroupId": "4660",
    "outGroupId": "4661"
  },
  {
    "id": "HNT-04",
    "name": "中根",
    "yahooStationId": "21676",
    "inGroupId": "4660",
    "outGroupId": "4661"
  },
  {
    "id": "HNT-05",
    "name": "高田の鉄橋",
    "yahooStationId": "29727",
    "inGroupId": "4660",
    "outGroupId": "4661"
  },
  {
    "id": "HNT-06",
    "name": "那珂湊",
    "yahooStationId": "21678",
    "inGroupId": "4660",
    "outGroupId": "4661"
  },
  {
    "id": "HNT-07",
    "name": "殿山",
    "yahooStationId": "21669",
    "inGroupId": "4660",
    "outGroupId": "4661"
  },
  {
    "id": "HNT-08",
    "name": "平磯",
    "yahooStationId": "21702",
    "inGroupId": "4660",
    "outGroupId": "4661"
  },
  {
    "id": "HNT-09",
    "name": "美乃浜学園",
    "yahooStationId": "29858",
    "inGroupId": "4660",
    "outGroupId": "4661"
  },
  {
    "id": "HNT-10",
    "name": "磯崎",
    "yahooStationId": "21586",
    "inGroupId": "4660",
    "outGroupId": "4661"
  },
  {
    "id": "HNT-11",
    "name": "阿字ケ浦",
    "yahooStationId": "21580",
    "inGroupId": "4660",
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
  
  defaultCars: 1,
  baseSectionSeconds: {
  "1": 60,
  "2": 90,
  "3": 240,
  "4": 180,
  "5": 90,
  "6": 120,
  "7": 90,
  "8": 150,
  "9": 60,
  "10": 60
},
};
