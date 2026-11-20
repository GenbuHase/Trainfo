module.exports = {
  lineId: 'jr_karasuyama',
  name: 'JR烏山線',
  stationsFilePath: 'src/data/lines/jr_karasuyama/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_karasuyama/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_karasuyama/globalTimetable.json',
  },
  stations: [
  {
    "id": "KRS-01",
    "name": "宝積寺",
    "yahooStationId": "21819",
    "inGroupId": null,
    "outGroupId": "781"
  },
  {
    "id": "KRS-02",
    "name": "下野花岡",
    "yahooStationId": "21777",
    "inGroupId": "780",
    "outGroupId": "781"
  },
  {
    "id": "KRS-03",
    "name": "仁井田",
    "yahooStationId": "21807",
    "inGroupId": "780",
    "outGroupId": "781"
  },
  {
    "id": "KRS-04",
    "name": "鴻野山",
    "yahooStationId": "21766",
    "inGroupId": "780",
    "outGroupId": "781"
  },
  {
    "id": "KRS-05",
    "name": "大金",
    "yahooStationId": "21738",
    "inGroupId": "780",
    "outGroupId": "781"
  },
  {
    "id": "KRS-06",
    "name": "小塙",
    "yahooStationId": "21769",
    "inGroupId": "780",
    "outGroupId": "781"
  },
  {
    "id": "KRS-07",
    "name": "滝",
    "yahooStationId": "21786",
    "inGroupId": "780",
    "outGroupId": "781"
  },
  {
    "id": "KRS-08",
    "name": "烏山",
    "yahooStationId": "21753",
    "inGroupId": "780",
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
  
  defaultCars: 2,
  baseSectionSeconds: {
  "1": 300,
  "2": 180,
  "3": 180,
  "4": 360,
  "5": 210,
  "6": 180,
  "7": 240
},
};
