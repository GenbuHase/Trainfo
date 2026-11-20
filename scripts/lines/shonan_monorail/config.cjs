module.exports = {
  lineId: 'shonan_monorail',
  name: '湘南モノレール江の島線',
  stationsFilePath: 'src/data/lines/shonan_monorail/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/shonan_monorail/stationTimetables.json',
    globalTimetable: 'src/data/lines/shonan_monorail/globalTimetable.json',
  },
  stations: [
  {
    "id": "SMR-01",
    "name": "大船",
    "yahooStationId": "23096",
    "inGroupId": null,
    "outGroupId": "4921"
  },
  {
    "id": "SMR-02",
    "name": "富士見町",
    "yahooStationId": "23308",
    "inGroupId": "4920",
    "outGroupId": "4921"
  },
  {
    "id": "SMR-03",
    "name": "湘南町屋",
    "yahooStationId": "23193",
    "inGroupId": "4920",
    "outGroupId": "4921"
  },
  {
    "id": "SMR-04",
    "name": "湘南深沢",
    "yahooStationId": "23192",
    "inGroupId": "4920",
    "outGroupId": "4921"
  },
  {
    "id": "SMR-05",
    "name": "西鎌倉",
    "yahooStationId": "23266",
    "inGroupId": "4920",
    "outGroupId": "4921"
  },
  {
    "id": "SMR-06",
    "name": "片瀬山",
    "yahooStationId": "23109",
    "inGroupId": "4920",
    "outGroupId": "4921"
  },
  {
    "id": "SMR-07",
    "name": "目白山下",
    "yahooStationId": "23352",
    "inGroupId": "4920",
    "outGroupId": "4921"
  },
  {
    "id": "SMR-08",
    "name": "湘南江の島",
    "yahooStationId": "23189",
    "inGroupId": "4920",
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
  
  defaultCars: 3,
  baseSectionSeconds: {
  "1": 90,
  "2": 90,
  "3": 60,
  "4": 180,
  "5": 60,
  "6": 60,
  "7": 60
},
};
