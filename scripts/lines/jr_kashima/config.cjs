module.exports = {
  lineId: 'jr_kashima',
  name: 'JR鹿島線',
  stationsFilePath: 'src/data/lines/jr_kashima/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_kashima/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_kashima/globalTimetable.json',
  },
  stations: [
  {
    "id": "KSJ-01",
    "name": "香取",
    "yahooStationId": "22248",
    "inGroupId": null,
    "outGroupId": "821"
  },
  {
    "id": "KSJ-02",
    "name": "十二橋",
    "yahooStationId": "22335",
    "inGroupId": "820",
    "outGroupId": "821"
  },
  {
    "id": "KSJ-03",
    "name": "潮来",
    "yahooStationId": "21588",
    "inGroupId": "820",
    "outGroupId": "821"
  },
  {
    "id": "KSJ-04",
    "name": "延方",
    "yahooStationId": "21683",
    "inGroupId": "820",
    "outGroupId": "821"
  },
  {
    "id": "KSJ-05",
    "name": "鹿島神宮",
    "yahooStationId": "21613",
    "inGroupId": "820",
    "outGroupId": "821"
  },
  {
    "id": "KSJ-06",
    "name": "鹿島サッカースタジアム",
    "yahooStationId": "21612",
    "inGroupId": "820",
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
  "1": 240,
  "2": 180,
  "3": 390,
  "4": 300,
  "5": 270
},
};
