module.exports = {
  lineId: 'izuhakone_daiyuzan',
  name: '伊豆箱根鉄道大雄山線',
  stationsFilePath: 'src/data/lines/izuhakone_daiyuzan/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/izuhakone_daiyuzan/stationTimetables.json',
    globalTimetable: 'src/data/lines/izuhakone_daiyuzan/globalTimetable.json',
  },
  stations: [
  {
    "id": "ID-01",
    "name": "小田原",
    "yahooStationId": "23098",
    "inGroupId": null,
    "outGroupId": "4951"
  },
  {
    "id": "ID-02",
    "name": "緑町",
    "yahooStationId": "23332",
    "inGroupId": "4950",
    "outGroupId": "4951"
  },
  {
    "id": "ID-03",
    "name": "井細田",
    "yahooStationId": "23066",
    "inGroupId": "4950",
    "outGroupId": "4951"
  },
  {
    "id": "ID-04",
    "name": "五百羅漢",
    "yahooStationId": "23170",
    "inGroupId": "4950",
    "outGroupId": "4951"
  },
  {
    "id": "ID-05",
    "name": "穴部",
    "yahooStationId": "23061",
    "inGroupId": "4950",
    "outGroupId": "4951"
  },
  {
    "id": "ID-06",
    "name": "飯田岡",
    "yahooStationId": "23064",
    "inGroupId": "4950",
    "outGroupId": "4951"
  },
  {
    "id": "ID-07",
    "name": "相模沼田",
    "yahooStationId": "23175",
    "inGroupId": "4950",
    "outGroupId": "4951"
  },
  {
    "id": "ID-08",
    "name": "岩原",
    "yahooStationId": "23080",
    "inGroupId": "4950",
    "outGroupId": "4951"
  },
  {
    "id": "ID-09",
    "name": "塚原",
    "yahooStationId": "23235",
    "inGroupId": "4950",
    "outGroupId": "4951"
  },
  {
    "id": "ID-10",
    "name": "和田河原",
    "yahooStationId": "23373",
    "inGroupId": "4950",
    "outGroupId": "4951"
  },
  {
    "id": "ID-11",
    "name": "富士フイルム前",
    "yahooStationId": "23307",
    "inGroupId": "4950",
    "outGroupId": "4951"
  },
  {
    "id": "ID-12",
    "name": "大雄山",
    "yahooStationId": "23230",
    "inGroupId": "4950",
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
  "1": 60,
  "2": 90,
  "3": 60,
  "4": 60,
  "5": 90,
  "6": 60,
  "7": 60,
  "8": 60,
  "9": 150,
  "10": 60,
  "11": 60
},
};
