module.exports = {
  lineId: 'keikyu_daishi',
  name: '京急大師線',
  stationsFilePath: 'src/data/lines/keikyu_daishi/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/keikyu_daishi/stationTimetables.json',
    globalTimetable: 'src/data/lines/keikyu_daishi/globalTimetable.json',
  },
  stations: [
  {
    "id": "KKD-01",
    "name": "京急川崎",
    "yahooStationId": "23147",
    "inGroupId": null,
    "outGroupId": "3241"
  },
  {
    "id": "KKD-02",
    "name": "港町",
    "yahooStationId": "23333",
    "inGroupId": "3240",
    "outGroupId": "3241"
  },
  {
    "id": "KKD-03",
    "name": "鈴木町",
    "yahooStationId": "23216",
    "inGroupId": "3240",
    "outGroupId": "3241"
  },
  {
    "id": "KKD-04",
    "name": "川崎大師",
    "yahooStationId": "23128",
    "inGroupId": "3240",
    "outGroupId": "3241"
  },
  {
    "id": "KKD-05",
    "name": "東門前",
    "yahooStationId": "23293",
    "inGroupId": "3240",
    "outGroupId": "3241"
  },
  {
    "id": "KKD-06",
    "name": "大師橋",
    "yahooStationId": "23185",
    "inGroupId": "3240",
    "outGroupId": "3241"
  },
  {
    "id": "KKD-07",
    "name": "小島新田",
    "yahooStationId": "23162",
    "inGroupId": "3240",
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
  
  defaultCars: 4,
  baseSectionSeconds: {
  "1": 90,
  "2": 60,
  "3": 60,
  "4": 60,
  "5": 60,
  "6": 60
},
};
