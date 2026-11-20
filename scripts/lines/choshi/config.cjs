module.exports = {
  lineId: 'choshi',
  name: '銚子電気鉄道線',
  stationsFilePath: 'src/data/lines/choshi/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/choshi/stationTimetables.json',
    globalTimetable: 'src/data/lines/choshi/globalTimetable.json',
  },
  stations: [
  {
    "id": "CD-01",
    "name": "銚子",
    "yahooStationId": "22354",
    "inGroupId": null,
    "outGroupId": "4871"
  },
  {
    "id": "CD-02",
    "name": "仲ノ町",
    "yahooStationId": "22381",
    "inGroupId": "4870",
    "outGroupId": "4871"
  },
  {
    "id": "CD-03",
    "name": "観音",
    "yahooStationId": "22254",
    "inGroupId": "4870",
    "outGroupId": "4871"
  },
  {
    "id": "CD-04",
    "name": "本銚子",
    "yahooStationId": "22461",
    "inGroupId": "4870",
    "outGroupId": "4871"
  },
  {
    "id": "CD-05",
    "name": "笠上黒生",
    "yahooStationId": "22227",
    "inGroupId": "4870",
    "outGroupId": "4871"
  },
  {
    "id": "CD-06",
    "name": "西海鹿島",
    "yahooStationId": "22395",
    "inGroupId": "4870",
    "outGroupId": "4871"
  },
  {
    "id": "CD-07",
    "name": "海鹿島",
    "yahooStationId": "22178",
    "inGroupId": "4870",
    "outGroupId": "4871"
  },
  {
    "id": "CD-08",
    "name": "君ケ浜",
    "yahooStationId": "22263",
    "inGroupId": "4870",
    "outGroupId": "4871"
  },
  {
    "id": "CD-09",
    "name": "犬吠",
    "yahooStationId": "22199",
    "inGroupId": "4870",
    "outGroupId": "4871"
  },
  {
    "id": "CD-10",
    "name": "外川",
    "yahooStationId": "22374",
    "inGroupId": "4870",
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
  "4": 90,
  "5": 60,
  "6": 60,
  "7": 90,
  "8": 90,
  "9": 60
},
};
