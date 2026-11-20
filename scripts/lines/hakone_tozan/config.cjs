module.exports = {
  lineId: 'hakone_tozan',
  name: '小田急箱根鉄道線（箱根登山電車）',
  stationsFilePath: 'src/data/lines/hakone_tozan/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/hakone_tozan/stationTimetables.json',
    globalTimetable: 'src/data/lines/hakone_tozan/globalTimetable.json',
  },
  stations: [
  {
    "id": "OHH-01",
    "name": "小田原",
    "yahooStationId": "23098",
    "inGroupId": null,
    "outGroupId": "4961"
  },
  {
    "id": "OHH-02",
    "name": "箱根板橋",
    "yahooStationId": "23279",
    "inGroupId": "4960",
    "outGroupId": "4961"
  },
  {
    "id": "OHH-03",
    "name": "風祭",
    "yahooStationId": "23103",
    "inGroupId": "4960",
    "outGroupId": "4961"
  },
  {
    "id": "OHH-04",
    "name": "入生田",
    "yahooStationId": "23078",
    "inGroupId": "4960",
    "outGroupId": "4961"
  },
  {
    "id": "OHH-05",
    "name": "箱根湯本",
    "yahooStationId": "23280",
    "inGroupId": "4960",
    "outGroupId": "4971"
  },
  {
    "id": "OHH-06",
    "name": "塔ノ沢",
    "yahooStationId": "23249",
    "inGroupId": "4970",
    "outGroupId": "4971"
  },
  {
    "id": "OHH-07",
    "name": "大平台",
    "yahooStationId": "23095",
    "inGroupId": "4970",
    "outGroupId": "4971"
  },
  {
    "id": "OHH-08",
    "name": "宮ノ下",
    "yahooStationId": "23339",
    "inGroupId": "4970",
    "outGroupId": "4971"
  },
  {
    "id": "OHH-09",
    "name": "小涌谷",
    "yahooStationId": "23167",
    "inGroupId": "4970",
    "outGroupId": "4971"
  },
  {
    "id": "OHH-10",
    "name": "彫刻の森",
    "yahooStationId": "23232",
    "inGroupId": "4970",
    "outGroupId": "4971"
  },
  {
    "id": "OHH-11",
    "name": "強羅",
    "yahooStationId": "23168",
    "inGroupId": "4970",
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
  "ロマンスカー": "limited_exp",
  "はこね": "limited_exp",
  "特急": "limited_exp",
  "各駅停車": "local",
  "普通": "local",
  "各停": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 3,
  baseSectionSeconds: {
  "1": 120,
  "2": 120,
  "3": 90,
  "4": 150,
  "5": 90,
  "6": 210,
  "7": 150,
  "8": 90,
  "9": 60,
  "10": 60
},
};
