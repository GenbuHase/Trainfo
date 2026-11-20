module.exports = {
  lineId: 'moka',
  name: '真岡鐵道真岡線',
  stationsFilePath: 'src/data/lines/moka/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/moka/stationTimetables.json',
    globalTimetable: 'src/data/lines/moka/globalTimetable.json',
  },
  stations: [
  {
    "id": "MOK-01",
    "name": "下館",
    "yahooStationId": "21644",
    "inGroupId": null,
    "outGroupId": "4711"
  },
  {
    "id": "MOK-02",
    "name": "下館二高前",
    "yahooStationId": "21645",
    "inGroupId": "4710",
    "outGroupId": "4711"
  },
  {
    "id": "MOK-03",
    "name": "折本",
    "yahooStationId": "21608",
    "inGroupId": "4710",
    "outGroupId": "4711"
  },
  {
    "id": "MOK-04",
    "name": "ひぐち",
    "yahooStationId": "21815",
    "inGroupId": "4710",
    "outGroupId": "4711"
  },
  {
    "id": "MOK-05",
    "name": "久下田",
    "yahooStationId": "21761",
    "inGroupId": "4710",
    "outGroupId": "4711"
  },
  {
    "id": "MOK-06",
    "name": "寺内",
    "yahooStationId": "21794",
    "inGroupId": "4710",
    "outGroupId": "4711"
  },
  {
    "id": "MOK-07",
    "name": "真岡",
    "yahooStationId": "21827",
    "inGroupId": "4710",
    "outGroupId": "4711"
  },
  {
    "id": "MOK-08",
    "name": "北真岡",
    "yahooStationId": "21757",
    "inGroupId": "4710",
    "outGroupId": "4711"
  },
  {
    "id": "MOK-09",
    "name": "西田井",
    "yahooStationId": "21809",
    "inGroupId": "4710",
    "outGroupId": "4711"
  },
  {
    "id": "MOK-10",
    "name": "北山",
    "yahooStationId": "21758",
    "inGroupId": "4710",
    "outGroupId": "4711"
  },
  {
    "id": "MOK-11",
    "name": "益子",
    "yahooStationId": "21821",
    "inGroupId": "4710",
    "outGroupId": "4711"
  },
  {
    "id": "MOK-12",
    "name": "七井",
    "yahooStationId": "21805",
    "inGroupId": "4710",
    "outGroupId": "4711"
  },
  {
    "id": "MOK-13",
    "name": "多田羅",
    "yahooStationId": "21788",
    "inGroupId": "4710",
    "outGroupId": "4711"
  },
  {
    "id": "MOK-14",
    "name": "市塙",
    "yahooStationId": "21732",
    "inGroupId": "4710",
    "outGroupId": "4711"
  },
  {
    "id": "MOK-15",
    "name": "笹原田",
    "yahooStationId": "21770",
    "inGroupId": "4710",
    "outGroupId": "4711"
  },
  {
    "id": "MOK-16",
    "name": "天矢場",
    "yahooStationId": "21795",
    "inGroupId": "4710",
    "outGroupId": "4711"
  },
  {
    "id": "MOK-17",
    "name": "茂木",
    "yahooStationId": "21828",
    "inGroupId": "4710",
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
  "SLもおか": "sl",
  "ＳＬもおか": "sl",
  "各駅停車": "local",
  "普通": "local",
  "各停": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 1,
  baseSectionSeconds: {
  "1": 150,
  "2": 210,
  "3": 150,
  "4": 150,
  "5": 330,
  "6": 300,
  "7": 120,
  "8": 240,
  "9": 150,
  "10": 180,
  "11": 270,
  "12": 240,
  "13": 240,
  "14": 300,
  "15": 90,
  "16": 210
},
};
