module.exports = {
  lineId: 'yurikamome',
  name: 'ゆりかもめ',
  stationsFilePath: 'src/data/lines/yurikamome/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/yurikamome/stationTimetables.json',
    globalTimetable: 'src/data/lines/yurikamome/globalTimetable.json',
  },
  stations: [
  {
    "id": "U-01",
    "name": "新橋",
    "yahooStationId": "22751",
    "inGroupId": null,
    "outGroupId": "6671"
  },
  {
    "id": "U-02",
    "name": "汐留",
    "yahooStationId": "29438",
    "inGroupId": "6670",
    "outGroupId": "6671"
  },
  {
    "id": "U-03",
    "name": "竹芝",
    "yahooStationId": "29051",
    "inGroupId": "6670",
    "outGroupId": "6671"
  },
  {
    "id": "U-04",
    "name": "日の出",
    "yahooStationId": "29052",
    "inGroupId": "6670",
    "outGroupId": "6671"
  },
  {
    "id": "U-05",
    "name": "芝浦ふ頭",
    "yahooStationId": "29053",
    "inGroupId": "6670",
    "outGroupId": "6671"
  },
  {
    "id": "U-06",
    "name": "お台場海浜公園",
    "yahooStationId": "29054",
    "inGroupId": "6670",
    "outGroupId": "6671"
  },
  {
    "id": "U-07",
    "name": "台場",
    "yahooStationId": "29055",
    "inGroupId": "6670",
    "outGroupId": "6671"
  },
  {
    "id": "U-08",
    "name": "東京国際クルーズターミナル",
    "yahooStationId": "29056",
    "inGroupId": "6670",
    "outGroupId": "6671"
  },
  {
    "id": "U-09",
    "name": "テレコムセンター",
    "yahooStationId": "29057",
    "inGroupId": "6670",
    "outGroupId": "6671"
  },
  {
    "id": "U-10",
    "name": "青海",
    "yahooStationId": "29058",
    "inGroupId": "6670",
    "outGroupId": "6671"
  },
  {
    "id": "U-11",
    "name": "東京ビッグサイト",
    "yahooStationId": "29059",
    "inGroupId": "6670",
    "outGroupId": "6671"
  },
  {
    "id": "U-12",
    "name": "有明",
    "yahooStationId": "29060",
    "inGroupId": "6670",
    "outGroupId": "6671"
  },
  {
    "id": "U-13",
    "name": "有明テニスの森",
    "yahooStationId": "29554",
    "inGroupId": "6670",
    "outGroupId": "6671"
  },
  {
    "id": "U-14",
    "name": "市場前",
    "yahooStationId": "29555",
    "inGroupId": "6670",
    "outGroupId": "6671"
  },
  {
    "id": "U-15",
    "name": "新豊洲",
    "yahooStationId": "29556",
    "inGroupId": "6670",
    "outGroupId": "6671"
  },
  {
    "id": "U-16",
    "name": "豊洲",
    "yahooStationId": "22839",
    "inGroupId": "6670",
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
  
  defaultCars: 6,
  baseSectionSeconds: {
  "1": 60,
  "2": 90,
  "3": 60,
  "4": 60,
  "5": 240,
  "6": 60,
  "7": 60,
  "8": 60,
  "9": 90,
  "10": 90,
  "11": 60,
  "12": 60,
  "13": 60,
  "14": 60,
  "15": 60
},
};
