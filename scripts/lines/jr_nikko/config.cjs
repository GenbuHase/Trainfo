module.exports = {
  lineId: 'jr_nikko',
  name: 'JR日光線',
  stationsFilePath: 'src/data/lines/jr_nikko/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_nikko/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_nikko/globalTimetable.json',
  },
  stations: [
  {
    "id": "NK-01",
    "name": "宇都宮",
    "yahooStationId": "21736",
    "inGroupId": null,
    "outGroupId": "791"
  },
  {
    "id": "NK-02",
    "name": "鶴田",
    "yahooStationId": "21793",
    "inGroupId": "790",
    "outGroupId": "791"
  },
  {
    "id": "NK-03",
    "name": "鹿沼",
    "yahooStationId": "21749",
    "inGroupId": "790",
    "outGroupId": "791"
  },
  {
    "id": "NK-04",
    "name": "文挾",
    "yahooStationId": "21818",
    "inGroupId": "790",
    "outGroupId": "791"
  },
  {
    "id": "NK-05",
    "name": "下野大沢",
    "yahooStationId": "21776",
    "inGroupId": "790",
    "outGroupId": "791"
  },
  {
    "id": "NK-06",
    "name": "今市",
    "yahooStationId": "21733",
    "inGroupId": "790",
    "outGroupId": "791"
  },
  {
    "id": "NK-07",
    "name": "日光",
    "yahooStationId": "21806",
    "inGroupId": "790",
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
  "草津・四万": "limited_exp",
  "普通": "regular",
  "各駅停車": "regular",
  "快速": "rapid",
  "アキュム": "regular"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 4,
  baseSectionSeconds: {
  "1": 390,
  "2": 780,
  "3": 630,
  "4": 480,
  "5": 450,
  "6": 540
},
};
