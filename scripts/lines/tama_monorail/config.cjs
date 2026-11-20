module.exports = {
  lineId: 'tama_monorail',
  name: '多摩都市モノレール線',
  stationsFilePath: 'src/data/lines/tama_monorail/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tama_monorail/stationTimetables.json',
    globalTimetable: 'src/data/lines/tama_monorail/globalTimetable.json',
  },
  stations: [
  {
    "id": "TT-01",
    "name": "上北台",
    "yahooStationId": "29232",
    "inGroupId": null,
    "outGroupId": "6731"
  },
  {
    "id": "TT-02",
    "name": "桜街道",
    "yahooStationId": "29233",
    "inGroupId": "6730",
    "outGroupId": "6731"
  },
  {
    "id": "TT-03",
    "name": "玉川上水",
    "yahooStationId": "22805",
    "inGroupId": "6730",
    "outGroupId": "6731"
  },
  {
    "id": "TT-04",
    "name": "砂川七番",
    "yahooStationId": "29234",
    "inGroupId": "6730",
    "outGroupId": "6731"
  },
  {
    "id": "TT-05",
    "name": "泉体育館",
    "yahooStationId": "29235",
    "inGroupId": "6730",
    "outGroupId": "6731"
  },
  {
    "id": "TT-06",
    "name": "立飛",
    "yahooStationId": "29236",
    "inGroupId": "6730",
    "outGroupId": "6731"
  },
  {
    "id": "TT-07",
    "name": "高松",
    "yahooStationId": "29237",
    "inGroupId": "6730",
    "outGroupId": "6731"
  },
  {
    "id": "TT-08",
    "name": "立川北",
    "yahooStationId": "29238",
    "inGroupId": "6730",
    "outGroupId": "6731"
  },
  {
    "id": "TT-09",
    "name": "立川南",
    "yahooStationId": "29302",
    "inGroupId": "6730",
    "outGroupId": "6731"
  },
  {
    "id": "TT-10",
    "name": "柴崎体育館",
    "yahooStationId": "29301",
    "inGroupId": "6730",
    "outGroupId": "6731"
  },
  {
    "id": "TT-11",
    "name": "甲州街道",
    "yahooStationId": "29300",
    "inGroupId": "6730",
    "outGroupId": "6731"
  },
  {
    "id": "TT-12",
    "name": "万願寺",
    "yahooStationId": "29299",
    "inGroupId": "6730",
    "outGroupId": "6731"
  },
  {
    "id": "TT-13",
    "name": "高幡不動",
    "yahooStationId": "22793",
    "inGroupId": "6730",
    "outGroupId": "6731"
  },
  {
    "id": "TT-14",
    "name": "程久保",
    "yahooStationId": "29298",
    "inGroupId": "6730",
    "outGroupId": "6731"
  },
  {
    "id": "TT-15",
    "name": "多摩動物公園",
    "yahooStationId": "22808",
    "inGroupId": "6730",
    "outGroupId": "6731"
  },
  {
    "id": "TT-16",
    "name": "中央大学・明星大学",
    "yahooStationId": "29297",
    "inGroupId": "6730",
    "outGroupId": "6731"
  },
  {
    "id": "TT-17",
    "name": "大塚・帝京大学",
    "yahooStationId": "29296",
    "inGroupId": "6730",
    "outGroupId": "6731"
  },
  {
    "id": "TT-18",
    "name": "松が谷",
    "yahooStationId": "29295",
    "inGroupId": "6730",
    "outGroupId": "6731"
  },
  {
    "id": "TT-19",
    "name": "多摩センター",
    "yahooStationId": "29294",
    "inGroupId": "6730",
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
  "1": 60,
  "2": 60,
  "3": 60,
  "4": 60,
  "5": 60,
  "6": 60,
  "7": 90,
  "8": 60,
  "9": 60,
  "10": 120,
  "11": 90,
  "12": 90,
  "13": 60,
  "14": 90,
  "15": 90,
  "16": 60,
  "17": 60,
  "18": 60
},
};
